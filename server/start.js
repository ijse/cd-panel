#!/usr/bin/env node
const { join } = require('path')
process.env['NODE_CONFIG_DIR'] = join(__dirname, '../config')

const config = require('config')
const app = require('./server')

const port = config.get('port')
app.server.listen(port, () => {
  console.log('Server start at port ' + port)
  console.log('Debug on http://localhost:' + port)
})
