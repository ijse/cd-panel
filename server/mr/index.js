const db = require('./db')
const fetchList = require('./fetchList')

module.exports = function () {
  fetchList()
  this.router.get('/mr', async ctx => {
    ctx.body = db.list

    fetchList().then(result => {
      this.io.emit('mrs', result.data)
    })
  })
}
