module.exports = function () {
  this.router.get('/hook', async ctx => {
    ctx.body = 'ok'
  })
}
