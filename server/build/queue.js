const db = require('../db').getInstance('queue')

/**
 * task: {
 *    pr,
 *    cmd,
 *    running
 * }
 */
db.defaults({
  queue: []
}).write()

const queue = {
  // current handling task
  // when task done, remove from queue
  current: null,

  get list () {
    return db.get('queue').value()
  },

  append (task) {
    db.get('queue').insert(task).write()
  },

  startNext () {
    this.current = this.list[0]
    return this.current
  },

  // when task finish, remove from queue
  finish (task) {
    db.get('queue')
      .remove(x => x.id === task.id)
      .write()
    this.current = null
  },

  clear () {
    db.set('queue', []).write()
  }
}

module.exports = queue
