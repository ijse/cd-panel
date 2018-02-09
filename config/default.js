const path = require('path')
const { exec } = require('child_process')
const os = require('os')

const config = {
  port: process.env.PORT || 3000,
  dataDir: path.join(os.homedir(), '.cdpanel')
}

exec(`mkdir -p ${config.dataDir}`)

module.exports = config
