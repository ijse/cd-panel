const service = require('./service')
const mr = require('app/server/mr/db')

module.exports = function () {
  service.tick()
  this.router.post('/hook', async ctx => {
    ctx.status = 200
    ctx.body = 'ok'
  })

  this.router.post('/build/restart', async ctx => {
    const { number } = ctx.request.body
    const pr = mr.find({ number })

    ctx.status = 200
    ctx.body = service.createBuild(pr.number)
  })
}
