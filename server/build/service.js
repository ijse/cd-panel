const queue = require('app/server/queue/queue')
const Build = require('./Build')
const mr = require('app/server/mr/db')
const statsDB = require('app/server/stats/db')

const setStatus = (type, [number, [ step ]]) => {
  const map = {
    start: {
      download: 'Downloading',
      prepare: 'Processing',
      build: 'Building',
      deploy: 'Deploying'
    },
    finish: {
      download: 'Downloaded',
      prepare: 'Prepared',
      build: 'Ready',
      deploy: 'Ready'
    }
  }
  if (type === 'fail') {
    return mr.updateStatus(number, 'Error')
  }
  const stats = map[type][step]
  return mr.updateStatus(number, stats)
}

const tick = () => {
  statsDB.update('queue size', queue.list.length)

  // task is running
  if (queue.current) return

  const task = queue.startNext()
  // queue is empty
  if (!task) return

  setStatus('start', task)
  // run next task
  const build = Build.runTask(task)
  queue.current.build = build
  return build.promise
    .then(stdout => {
      queue.finish(task, true)
      setStatus('finish', task)
      return stdout
    })
    .catch(stderr => {
      queue.finish(task, false)
      setStatus('fail', task)
      return stderr
    })
    // always call next tick()
    .then((output) => {
      tick()
      return output
    })
}

exports.createBuild = async number => {
  // check if exist task for this number
  if (queue.current && queue.current[0] === number) {
    // stop current task
    queue.current.build.kill()
  }
  // clear all this number task
  queue.removeTask(number)

  queue.append([number, ['download']])
  queue.append([number, ['prepare']])
  queue.append([number, ['build']])
  mr.updateStatus(number, 'Waiting')
  tick()
}

exports.makeRelease = async (number, target) => {
  queue.removeTask(number, 'deploy')
  queue.prepend([number, ['deploy', target]])
  tick()
}

exports.tick = tick
