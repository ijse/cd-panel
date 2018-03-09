const config = require('config')
const Octokit = require('@octokit/rest')

const github = new Octokit()

const token = config.get('ghToken')

github.authenticate({
  type: 'token',
  token
})

Object.defineProperties(github, {
  $repo: {
    get () {
      return { ...config.get('ghRepo') }
    }
  }
})

module.exports = github
