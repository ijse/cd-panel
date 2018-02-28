const jdb = require('./db')

module.exports = app => {
  app.router.get('/journal', async ctx => {
    ctx.body = jdb.list
  })
}
