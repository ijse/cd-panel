const path = require('path')
const os = require('os')

const isDebug = process.argv.includes('--debug')

const config = {
  debug: isDebug,
  pkg: require('../package.json'),
  port: process.env.PORT || 3000,
  ghToken: process.env.GH_TOKEN,
  ghRepo: {
    owner: 'tigerbrokers',
    repo: 'gem'
  },
  users: [{
    username: 'admin',
    password: 'tiger'
  }],
  execTimeout: 3 * 60 * 1000,
  dataDir: path.join(os.homedir(), '.cdpanel'),
  workDir: path.join(os.homedir(), '.cdpanel', 'workspace')
}

module.exports = config
