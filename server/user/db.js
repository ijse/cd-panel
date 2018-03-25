const { Base } = require('app/server/db')

class User extends Base {
  get defaults () {
    return { list: [] }
  }

  add (user) {
    if (this.findByName(user.username)) return
    this.db.get('list')
      .insert(user)
      .write()
  }

  findById (id) {
    return this.db.get('list')
      .find(u => u.id === id)
      .value()
  }

  findByName (name) {
    return this.db.get('list')
      .find(u => u.username === name)
      .value()
  }
}

module.exports = new User('user')
