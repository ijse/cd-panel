const queue = require('./queue')
const Build = require('./Build')
const Task = require('./Task')

const tick = async () => {
  // task is running
  if (queue.current) return

  const task = queue.startNext()
  // queue is empty
  if (!task) return

  // run next task
  const rep = await Build.runTask(task)
  queue.finish(task)
  tick()
}

exports.createBuild = async pr => {
  queue.append([pr, ['download']])
  queue.append([pr, ['prepare']])
  queue.append([pr, ['build']])
  tick()
}

exports.makeRelease = async (pr, target) => {
  queue.append([pr, ['release', target]])
}

exports.tick = tick
