const mrdb = require('app/server/mr/db')
const queue = require('./queue')

module.exports = app => {
  app.router.get('/queue', async ctx => {
    ctx.body = queue.list.map(task => {
      const number = task.number
      const pr = mrdb.find({ number })
      return Object.assign({}, task, { pr })
    })
  })
}
