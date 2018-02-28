const { Base } = require('app/server/db')
const TIME_30_DAY_BEFORE = Date.now() - 30 * 24 * 60 * 60

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

  log (data) {
    this.db.get('list')
      .push(data)
      // remove data before 30day
      .remove(t => {
        return t.ts < TIME_30_DAY_BEFORE
      })
      .write()
  }

  logTask ({ number, desc }) {
    const data = {
      ts: Date.now(),
      type: 'task',
      number,
      desc
    }
    this.log(data)
  }
}

module.exports = new Journal('journal')
