const path = require('path')
const os = require('os')

const config = {
  pkg: require('../package.json'),
  port: process.env.PORT || 3000,
  ghToken: process.env.GH_TOKEN,
  ghRepo: {
    owner: 'tigerbrokers',
    repo: 'gem'
  },
  dataDir: path.join(os.homedir(), '.cdpanel'),
  workDir: path.join(os.homedir(), '.cdpanel', 'workspace')
}

module.exports = config
