const config = require('config')
const server = require('./server')

const port = config.get('port')
server.listen(port, () => {
  console.log('Server start at port ' + port)
})
