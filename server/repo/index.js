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

  app.router.post('/repo/release', async ctx => {
    const { sha } = ctx.request.body
    const commit = await github.repos.getCommit({
      ...github.$repo,
      sha
    })
    const release = service.makeRelease(commit)
    release.on('download', stats => app.io.emit('releasing', 'download'))
    release.on('install', stats => app.io.emit('releasing', 'install'))
    release.on('build', stats => app.io.emit('releasing', 'build'))
    release.on('deploy', stats => app.io.emit('releasing', 'deploy'))
    release.on('success', stats => app.io.emit('releasing', 'success'))
    statsDB.increase('releases')
  })
}
