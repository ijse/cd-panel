const db = require('../db').getInstance('mr')

/*
mr = {
  buildStats: halt|building|ready|deploying
}
*/

const defaults = {
  list: []
}

db.defaults(defaults).write()

module.exports = {
  get list () {
    return db.get('list').value()
  },
  set list (list) {
    const curList = this.list
    const newList = list.map(item => {
      const old = curList.find(t => t.number === item.number) || {}

      // merge with old
      item.buildStats = old.buildStats || 'halt'
      return item
    })
    db.set('list', newList).write()
  }
}
