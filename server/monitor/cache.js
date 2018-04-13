const Base = require('app/server/db').Base

// keep the last 5 data
const SIZE = 50

class Cache extends Base {
  get defaults () {
    return { roll: [] }
  }

  roll (data) {
    const d = this.db.get('roll')
    if (d.size().value() > SIZE - 1) {
      d.remove((value, index) => {
        return index === 0
      }).write()
    }
    d.push(data).write()
  }

  read () {
    return this.db.get('roll').value()
  }

  clear () {
    this.db.setState({ roll: [] })
  }
}

module.exports = new Cache('std-buffer')
