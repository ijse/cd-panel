const db = require('../db').getInstance('queue')

/**
 * task: {
 *    pr,
 *    cmd
 * }
 */
db.defaults({
  queue: []
}).write()

module.exports = {
  get queue () {
    return db.get('queue').value()
  },

  get current () {
    return this.queue[0]
  },

  append (task) {
    db.get('queue').push(task).write()
  },

  clear () {
    db.set('queue', []).write()
  },

  nextTask () {
    db.get('queue')
      .remove(x => x === this.current)
      .write()

    return this.current
  }
}
