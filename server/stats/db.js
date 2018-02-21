const { Base } = require('app/server/db')

class StatsDB extends Base {
  get defaults () {
    return {}
  }

  update (name, value) {
    const oldValue = this.db.get(name).value()
    if (oldValue !== value) {
      this.emit('update', [name, value])
      this.db.set(name, value).write()
    }
    return this.db.getState()
  }

  increase (name) {
    const value = +this.db.get(name).value() || 0
    return this.update(name, value + 1)
  }

  getAll () {
    return this.db.getState()
  }

  get (name) {
    return this.db.get(name).value()
  }

  clear () {
    this.db.setState({})
  }
}

module.exports = new StatsDB('stats')

