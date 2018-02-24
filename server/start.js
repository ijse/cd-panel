#!/usr/bin/env node

const config = require('config')
const app = require('./server')

const port = config.get('port')
app.server.listen(port, () => {
  console.log('Server start at port ' + port)
  console.log('Debug on http://localhost:' + port)
})
