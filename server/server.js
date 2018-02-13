require('promise.prototype.finally')
const config = require('config')
const fs = require('fs')
const Koa = require('koa')
const static = require('koa-static')
const morgan = require('koa-morgan')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.config = config
app.router = new Router()

app.use(morgan('dev'))
app.use(static('./dist'))

app.use(bodyParser())

// fallback
app.router.get('/*', async (ctx, next) => {
  if (ctx.accepts('html', 'json') !== 'json') {
    ctx.response.type = 'html'
    ctx.body = fs.createReadStream('./dist/index.html')
  } else {
    await next()
  }
})

// load services
require('./setting').call(app, app)
require('./mr').call(app, app)

app.use(app.router.routes())

module.exports = app
