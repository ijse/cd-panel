const db = require('../db').getInstance('mr')

const defaults = {
  list: []
}

db.defaults(defaults).write()

module.exports = {
  get list () {
    return db.get('list').value()
  },
  set list (list) {
    db.set('list', list).write()
  }
}
