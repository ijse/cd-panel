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
app.server = server

// middlewares
// app.use(morgan('dev'))
app.use(static('./dist'))

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

// load services
require('./setting').call(app, app)
require('./mr').call(app, app)
require('./build').call(app, app)
require('./stats').call(app, app)
require('./monitor').call(app, app)

app.use(app.router.routes())

module.exports = app
