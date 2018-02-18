const service = require('./service')
const mr = require('app/server/mr/db')

module.exports = function () {
  service.tick()
  // broadcast changes of mr status
  mr.on('mrStatus', ([number, stats]) => {
    this.io.emit('mr.buildStats', [number, stats])
  })

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
