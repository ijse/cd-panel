const service = require('./service')
const mr = require('app/server/mr/db')
const fetchList = require('app/server/mr/fetchList')

module.exports = async ctx => {
  ctx.status = 200
  ctx.body = 'ok'

  const payload = ctx.request.body

  if (ctx.get('X-GitHub-Event') !== 'pull_request') {
    return
  }

  // update pr list
  fetchList()

  const pr = payload.pull_request
  if (payload.action === 'synchronize') {
    // pull request update due to a new push in the branch
    // that the pull request is tracking

    service.createBuild(pr.number)
    // ensure to start processLoop
    service.tick()
  }
}
