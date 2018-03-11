const service = require('./service')
const mr = require('app/server/mr/db')
const webhook = require('./webhook')
const github = require('app/server/github')

module.exports = function () {
  service.tick()

  // bind webhook
  this.router.post('/hook', webhook)

  // broadcast changes of mr status
  mr.on('mrStatus', ([number, stats]) => {
    this.io.emit('mr.buildStats', [number, stats])
  })

  this.router.post('/restart', async ctx => {
    const { number } = ctx.request.body
    const pr = mr.find({ number })

    ctx.status = 200
    ctx.body = service.createBuild(pr.number)
  })

  this.router.post('/deploy', async ctx => {
    const { number, target } = ctx.request.body
    const pr = mr.find({ number })

    if (pr.buildStats !== 'Ready') {
      return await ctx.throw(500)
    }

    service.makeDeploy(number, target)
    ctx.status = 200
  })
}
