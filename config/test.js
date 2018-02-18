const { join } = require('path')

const config = {
  port: 4000,
  dataDir: join(__dirname, '../.test'),
  workDir: join(__dirname, '../.test', 'workspace'),
}

module.exports = config
