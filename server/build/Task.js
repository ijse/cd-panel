const Build = require('./Build')

class Task {
  constructor (pr, [cmd, ...args]) {
    this.pr = pr
    this.cmd = cmd
    this.args = args
  }

  run () {
    const build = new Build(pr)
    return build[cmd](...args)
  }
}

module.exports = Task
