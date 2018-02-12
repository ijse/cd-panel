const db = require('./db')
const fetchList = require('./fetchList')

module.exports = function () {
  this.router.get('/mr', async ctx => {
    // first load data in local db
    ctx.body = db.list
    // refetch
    fetchList()
  })
}
