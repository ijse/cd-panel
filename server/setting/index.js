const db = require('./db.js')

module.exports = function () {
  this.router.get('/setting', async ctx => {
    ctx.body = db.state
  })

  this.router.post('/setting', async ctx => {
    const newSetting = ctx.request.body
    db.state = newSetting
    ctx.body = { success: true }
  })
}
