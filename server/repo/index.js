const github = require('app/server/github')
const service = require('app/server/build/service')
const statsDB = require('app/server/stats/db')

module.exports = app => {
  let cached = null
  app.router.get('/repo/master', ctx => {
    github.repos.getCommits({
      ...github.$repo,
      sha: 'heads/master'
    })
    .then(ret => {
      if (!cached) ctx.body = ret.data
      cached = ret.data
    })
    if (cached) ctx.body = cached
  })

  app.router.post('/repo/merge', async ctx => {
    const { number } = ctx.request.body
    try {
      const ret = await github.pullRequests.merge({
        ...github.$repo,
        merge_method: 'squash',
        number
      })
    } catch (e) {
      console.error(e)
    }

    ctx.status = 200
  })

  let release, releaseStatus = 'Release'
  app.router.get('/repo/release/status', async ctx => {
    ctx.body = { status: releaseStatus }
  })

  app.router.post('/repo/release', async ctx => {
    if (release) {
      ctx.status = 501
      return
    }

    const { data: repo } = await github.repos.get({
      ...github.$repo
    })

    const { sha } = ctx.request.body || 'master'
    const { data: refData } = await github.repos.getCommit({
      ...github.$repo,
      sha
    })
    refData.repo = repo
    refData.ref = 'master'
    release = service.makeRelease(refData)
    release.on('status', stats => {
      releaseStatus = stats
      if (stats === 'success') {
        releaseStatus = 'Release'
      }
      app.io.emit('releasing', releaseStatus)
    })
    statsDB.increase('releases')
  })
}
