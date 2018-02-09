const dbManager = require('../db')
const db = dbManager.getInstance('repo')

// schema
const defaults = {
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
  }
}
