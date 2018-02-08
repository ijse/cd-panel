const config = require('config')
const Koa = require('koa')
const static = require('koa-static')
const morgan = require('koa-morgan')

const app = new Koa()

app.use(morgan('dev'))
app.use(static('./dist'))

module.exports = app
