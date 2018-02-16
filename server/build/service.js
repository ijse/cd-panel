const queue = require('./queue')
const Build = require('./Build')
const mr = require('app/server/mr/db')

const setStatus = (type, [pr, [ step ]]) => {
  const map = {
    start: {
      download: 'Downloading',
      prepare: 'Processing',
      build: 'Building',
      release: 'Releasing'
    },
    finish: {
      download: 'Downloaded',
      prepare: 'Prepared',
      build: 'Ready',
      release: 'Released'
    }
  }
  if (type === 'fail') {
    return mr.updateStatus(pr, 'Error')
  }
  const stats = map[type][step]
  return mr.updateStatus(pr, stats)
}

const tick = async () => {
  // task is running
  if (queue.current) return

  const task = queue.startNext()
  // queue is empty
  if (!task) return

  setStatus('start', task)
  // run next task
  queue.current.promise = Build.runTask(task)
    .then(() => {
      queue.finish(task, true)
      setStatus('finish', task)
    })
    .catch(() => {
      queue.finish(task, false)
      setStatus('fail', task)
    })
    // always call next tick()
    .then(tick)
}

exports.createBuild = async pr => {
  queue.append([pr, ['download']])
  queue.append([pr, ['prepare']])
  queue.append([pr, ['build']])
  mr.updateStatus(pr, 'Waiting')
  tick()
  return pr
}

exports.makeRelease = async (pr, target) => {
  queue.append([pr, ['release', target]])
  tick()
}

exports.tick = tick
