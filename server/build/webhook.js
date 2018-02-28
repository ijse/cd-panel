const service = require('./service')
const mr = require('app/server/mr/db')
const fetchList = require('app/server/mr/fetchList')
const jdb = require('app/server/journal/db')

function handlePRUpdate (payload) {
  // update pr list
  fetchList()

  // pull request update due to a new push in the branch
  // that the pull request is tracking

  service.createBuild(payload.number)
}

function handlePRClose (payload) {
  service.closePR(payload.number)

  // update pr list
  fetchList()
}

module.exports = async ctx => {
  ctx.status = 200
  ctx.body = 'ok'

  const payload = ctx.request.body

  if (ctx.get('X-GitHub-Event') === 'pull_request') {
    if (payload.action === 'synchronize' || payload.action === 'opened') {
      handlePRUpdate(payload)
      ctx.body = 'update pr build'
      jdb.logTask({
        number: payload.number,
        desc: `Webhook that #${payload.number} update`
      })
    }
    if (payload.action === 'closed') {
      handlePRClose(payload)
      ctx.body = 'clean pr'
      jdb.logTask({
        number: payload.number,
        desc: `Webhook that #${payload.number} close`
      })
    }
  }
}
