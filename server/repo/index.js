const github = require('app/server/github')

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
}
