const db = require('../db').getInstance('mr')
const Emitter = require('events')

/*
mr = {
  buildStats: waiting|init|installing|building|ready|error
}
*/

const defaults = {
  list: []
}

db.defaults(defaults).write()

class MR extends Emitter {
  updateStatus (number, stats) {
    db.get('list')
      .find({ number })
      .set('buildStats', stats)
      .write()
    this.emit('mrStatus', [number, stats])
  }
  find (crit) {
    return db.get('list')
      .find(crit)
      .value()
  }
  get list () {
    return db.get('list').value()
  }
  set list (list) {
    const curList = this.list
    const newList = list.map(item => {
      const old = curList.find(t => t.number === item.number) || {}

      // merge with old
      item.buildStats = old.buildStats || 'Halt'
      return item
    })
    db.set('list', newList).write()
  }
}
module.exports = new MR()
