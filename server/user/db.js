const { Base } = require('app/server/db')

class User extends Base {
  get defaults () {
    return { list: [] }
  }

  add (user) {
    this.db.get('list')
      .push(user)
      .write()
  }

  findByName (name) {
    return  this.db.get('list')
      .find(u => u.name === name)
      .value()
  }
}

module.exports = new User('user')
