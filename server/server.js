const config = require('config')
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

app.use(app.router.routes())

module.exports = app
