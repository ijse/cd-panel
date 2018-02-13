
module.exports = function () {
  this.router.get('/hook', async ctx => {
    ctx.status = 200
    ctx.body = 'ok'
  })
}
