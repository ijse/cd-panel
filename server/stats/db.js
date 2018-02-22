const { Base } = require('app/server/db')

class StatsDB extends Base {
  get defaults () {
    return {}
  }

  update (name, value) {
    const oldValue = this.db.get(name).value()
    if (oldValue !== value) {
      this.db.set(name, value).write()
      this.emit('update', [name, value])
    }
    return this.db.getState()
  }

  increase (name) {
    const value = +this.db.get(name).value() || 0
    return this.update(name, value + 1)
  }

  decrease (name) {
    const value = +this.db.get(name).value() || 0
    return this.update(name, value - 1)
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

const rt = new StatsDB('stats')
// rt.setMaxListeners(0)
module.exports = rt

