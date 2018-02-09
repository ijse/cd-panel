const db = require('./db.js')

module.exports = function () {
  this.router.get('/hook', async ctx => {
    db.bumpTimes()
    ctx.body = 'ok, call times is ' + db.times
  })
}
