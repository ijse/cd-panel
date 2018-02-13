const db = require('./db')
const fetchList = require('./fetchList')

module.exports = function () {
  this.router.get('/mr', async ctx => {
    ctx.body = db.list
    fetchList()
  })
}
