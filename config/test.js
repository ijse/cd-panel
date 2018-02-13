const { join } = require('path')
const { exec } = require('child_process')

const config = {
  port: 4000,
  dataDir: join(__dirname, '../.test'),
  workDir: join(__dirname, '../.test', 'workspace'),
}

exec(`mkdir -p ${config.workDir}`)

module.exports = config
