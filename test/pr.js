const { join } = require('path')
const config = require('config')

module.exports = {
  number: 100,
  head: {
    ref: 'master',
    repo: {
      default_branch: 'master',
      clone_url: join(config.get('dataDir'), 'repo')
    }
  }
}
