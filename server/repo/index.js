const github = require('app/server/github')
const service = require('app/server/build/service')
const statsDB = require('app/server/stats/db')

module.exports = app => {
  let cached = null
  app.router.get('/repo/master', ctx => {
    let fetchData = github.repos.getCommits({
      ...github.$repo,
      sha: 'heads/master'
    })
    .then(ret => {
      if (!cached) ctx.body = ret.data
      cached = ret.data
    })
    if (cached) {
      ctx.body = cached
    } else {
      return fetchData
    }
  })

  app.router.post('/repo/merge', app.auth, async ctx => {
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

  app.router.post('/repo/release', app.auth, async ctx => {
    if (release) {
      ctx.status = 501
      return
    }

    const { data: repo } = await github.repos.get({
      ...github.$repo
    })

    const { sha } = ctx.request.body
    const { data: refData } = await github.repos.getCommit({
      ...github.$repo,
      sha
    })
    refData.repo = repo
    refData.ref = sha
    release = service.makeRelease(refData)
    release.on('status', stats => {
      releaseStatus = stats
      if (stats === 'success' || stats === 'fail') {
        releaseStatus = 'Release'
        release = null
      }
      app.io.emit('releasing', [releaseStatus, sha])
    })
    statsDB.increase('releases')
    ctx.status = 200
  })

  app.router.post('/repo/master/deploy', app.auth, async ctx => {
    if (release) {
      ctx.status = 501
      return
    }

    const { data: repo } = await github.repos.get({
      ...github.$repo
    })

    const { sha } = ctx.request.body
    const { data: refData } = await github.repos.getCommit({
      ...github.$repo,
      sha
    })
    refData.repo = repo
    refData.ref = sha
    release = service.makePreRelease(refData)
    release.on('status', stats => {
      releaseStatus = stats
      if (stats === 'success' || stats === 'fail') {
        releaseStatus = 'Release'
        release = null
      }
      app.io.emit('prereleasing', [releaseStatus, sha])
    })
    statsDB.increase('prereleases')
    ctx.status = 200
  })
}
