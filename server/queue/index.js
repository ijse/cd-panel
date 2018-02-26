const mrdb = require('app/server/mr/db')
const queue = require('./queue')

module.exports = app => {
  app.router.get('/queue', async ctx => {
    ctx.body = queue.list.map(task => {
      const number = task[0]
      const pr = mrdb.find({ number })
      task.push(pr)
      return task
    })
  })
}
