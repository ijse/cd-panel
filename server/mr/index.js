const db = require('./db')
const fetchList = require('./fetchList')

module.exports = function () {
  this.router.get('/mr', async ctx => {
    const result  = await fetchList()
    ctx.body = result.data
  })
}
