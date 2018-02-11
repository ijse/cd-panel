const config = require('config')
const fs = require('fs')
const Koa = require('koa')
const static = require('koa-static')
const morgan = require('koa-morgan')
const Router = require('koa-router')

const app = new Koa()

app.config = config
app.router = new Router()

app.use(morgan('dev'))
app.use(static('./dist'))

// load services
require('./repo').call(app, app)

// fallback
app.router.get('/*', async ctx => {
  ctx.response.type = 'html'
  ctx.body = fs.createReadStream('./dist/index.html')
})
app.use(app.router.routes())


module.exports = app
