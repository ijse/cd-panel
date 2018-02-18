const db = require('../db').getInstance('queue')
const Emitter = require('events')

/**
 * task: [
 *    pr,
 *    [ step, args]
 * ]
 */
db.defaults({
  queue: []
}).write()

class Queue extends Emitter {
  constructor () {
    super()
    this.current = null
  }

  get list () {
    return db.get('queue').value()
  }

  append (task) {
    const [ number, [step] ] = task
    // check duplicate
    const exist = db.get('queue').find(([_number, [_step]]) => {
      return number === number && step === _step
    }).value()
    if (exist) return
    db.get('queue').insert(task).write()
    this.emit('append', task)
  }

  startNext () {
    this.current = this.list[0]
    this.emit('start', this.current)
    return this.current
  }

  // when task finish, remove from queue
  finish (task, success = true) {
    db.get('queue')
      .remove(x => x.id === task.id)
      .write()

    this.emit('finish', task, success)
    if (this.list.length === 0) {
      this.emit('empty')
    }
    this.current = null
  }

  clear () {
    db.set('queue', []).write()
  }
}

module.exports = new Queue()
