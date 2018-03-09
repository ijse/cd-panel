const mrdb = require('./db')
const fetchList = require('./fetchList')

module.exports = function () {
  fetchList()

  mrdb.on('mrList', list => {
    this.io.emit('mrs', list)
  })

  this.router.get('/mr', async ctx => {
    ctx.body = mrdb.list
    fetchList()
  })
}
