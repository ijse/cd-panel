const mrdb = require('app/server/mr/db')
const queue = require('./queue')

module.exports = app => {

  const fn = () => {
    const list = queue.list
    const result = list.map(task => {
      const pr = mrdb.find({ number: task.number })
      return Object.assign({}, task, { pr })
    })
    app.io.emit('queue-update', result)
  }
  queue.on('append', fn)
  queue.on('prepend', fn)
  queue.on('finish', fn)
  queue.on('start', fn)

  app.router.get('/queue', async ctx => {
    ctx.body = queue.list.map(task => {
      const number = task.number
      const pr = mrdb.find({ number })
      return Object.assign({}, task, { pr })
    })
  })

  app.router.del('/queue/remove/:id', async ctx => {
    const taskId = ctx.params.id
    if (taskId === queue.current.id) {
      console.log('Kill the process of %s', taskId)
      queue.current.build.kill()
    }
    const [{ number}] = queue.finish({ id: taskId }, false)
    mrdb.updateStatus(number, 'Waiting')
    ctx.status = 200
  })
}
