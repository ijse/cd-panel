const db = require('../db').getInstance('queue')
const Emitter = require('events')

/**
 * task: {
 *  id,
 *  number,
 *  name,
 *  ...
 * }
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
    return db.get('queue').cloneDeep().value()
  }

  append (task) {
    // check duplicate
    const exist = db.get('queue').find(({ number, name}) => {
      return task.number === number && task.name === name
    }).value()
    if (exist) return
    db.get('queue').insert(task).write()
    this.emit('append', task)
  }

  prepend (task) {
    Object.assign(task, { id: db._.createId() })
    db.get('queue').splice(1, 0, task).write()
    this.emit('prepend', task)
  }

  startNext () {
    this.current = this.list[0]
    this.emit('start', this.current)
    return this.current
  }

  // when task finish, remove from queue
  finish (task, success = true) {
    const result = db.get('queue')
      .remove(x => x.id === task.id)
      .write()

    this.emit('finish', success)
    if (this.list.length === 0) {
      this.emit('empty')
    }
    this.current = null
    return result
  }

  removeTask (fn) {
    return db.get('queue').remove(fn).write()
  }

  clear () {
    db.set('queue', []).write()
  }
}

module.exports = new Queue()
