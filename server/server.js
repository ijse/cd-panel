require('promise.prototype.finally')
const config = require('config')
const { join } = require('path')
const fs = require('fs')
const Koa = require('koa')
const static = require('koa-static')
const morgan = require('koa-morgan')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.config = config
app.router = new Router()

// init db
app.db = require('./db')

// init socket.io
const server = require('http').createServer(app.callback())
app.io = require('socket.io')(server)
app.io.on('connect', socket => {
  app.io.emit('version', config.get('pkg.version'))
})
app.server = server

// middlewares
if (config.get('debug')) {
  app.use(morgan('dev'))
}
app.use(static(join(__dirname, '../dist')))

app.use(bodyParser())

// fallback requests to index.html
app.router.get('/*', async (ctx, next) => {
  if (ctx.accepts('html', 'json') !== 'json') {
    ctx.response.type = 'html'
    const indexFile = join(__dirname, '../dist/index.html')
    ctx.body = fs.createReadStream(indexFile)
  } else {
    await next()
  }
})

const session = require('koa-session')
app.keys = ['secret']
app.use(session(app))

const passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())

app.auth = (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.throw(401)
  }
}

// load services
require('./setting').call(app, app)
require('./mr').call(app, app)
require('./queue').call(app, app)
require('./journal').call(app, app)
require('./build').call(app, app)
require('./stats').call(app, app)
require('./monitor').call(app, app)
require('./repo').call(app, app)
require('./user').call(app, app)

app.use(app.router.routes())

module.exports = app
