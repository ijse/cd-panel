const { Base } = require('app/server/db')
const github = require('app/server/github')

class Repo extends Base {
  get defaults () {
    return {}
  }

  constructor () {
    this.data = await github.repos.get(github.$repo)
  }

  get data () {
    return this.db.getState()
  }

  set data (data) {
    this.db.setState(data)
  }
}

module.exports = new Repo('repo')
