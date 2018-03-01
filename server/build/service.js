const queue = require('app/server/queue/queue')
const Build = require('./Build')
const mr = require('app/server/mr/db')
const statsDB = require('app/server/stats/db')
const jdb = require('app/server/journal/db')

const setStatus = (type, { number, name }) => {
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
  const stats = map[type][name]
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
  statsDB.increase('Run Tasks')

  // run next task
  const build = Build.runTask(task)
  queue.current.build = build
  return build.promise
    .then(stdout => {
      queue.finish(task, true)
      setStatus('finish', task)
      jdb.logTask({
        number: task.number,
        desc: `Success of task ${task.name}`
      })
      return stdout
    })
    .catch(stderr => {
      queue.finish(task, false)
      setStatus('fail', task)
      jdb.logTask({
        number: task.number,
        desc: `Error of task ${task.name}: ${stderr}`
      })
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
  if (queue.current && queue.current.number === number) {
    // stop current task
    queue.current.build.kill()
  }
  // clear all this number task
  queue.removeTask(t => t.number === number)

  queue.append({ number, name: 'download' })
  queue.append({ number, name: 'prepare' })
  queue.append({ number, name: 'build' })
  mr.updateStatus(number, 'Pending')

  statsDB.increase('Build Time')
  jdb.logTask({ number, desc: 'Create new build' })
  tick()
}

exports.makeRelease = async (number, target) => {
  queue.removeTask(t => t.number === number && t.name === 'deploy')
  queue.prepend({ number, name: 'deploy', target })
  mr.updateStatus(number, 'Pending')

  statsDB.increase('Deploy Time')
  jdb.logTask({ number, desc: 'Create new deploy' })
  tick()
}

exports.closePR = async number => {
  // check if exist task for this number
  if (queue.current && queue.current.number === number) {
    // stop current task
    queue.current.build.kill()
  }
  queue.removeTask(number)
  queue.append({ number, name: 'clean' })
  mr.updateStatus(number, 'Pending')
  tick()
}

exports.tick = tick
