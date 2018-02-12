const dbManager = require('../db')
const db = dbManager.getInstance('setting')

// schema
const defaults = {
  repo: null,
  master: 'master',

  callTimes: 0
}

db.defaults(defaults).write()

module.exports = {
  bumpTimes () {
    this.times = this.times + 1
  },
  get times () {
    return db.get('callTimes').value()
  },
  set times (value) {
    db.set('callTimes', value).write()
  },
  get state () {
    return db.getState()
  },
  set state (data) {
    db.setState(data)
    db.write()
  }
}
