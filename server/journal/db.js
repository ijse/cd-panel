const { Base } = require('app/server/db')

/**
 * log = {
 *   timestamp,
 *   type: task|system
 *   number,
 *   desc
 * }
 */
class Journal extends Base {
  get defaults () {
    return { list: [] }
  }

  clear () {
    this.db.setState({ list: [] })
  }

  get list () {
    return this.db.get('list')
      .sortBy('ts')
      .reverse()
      .value()
  }

  getTaskLogs () {
    return this.db.get('list')
      .find(t => t.type === 'task')
      .sortBy('ts')
      .reverse()
      .value()
  }

  logTask ({ number, desc }) {
    const data = {
      ts: Date.now(),
      type: 'task',
      number,
      desc
    }
    this.db.get('list')
      .push(data).write()
  }
}

module.exports = new Journal('journal')
