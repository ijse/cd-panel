const { join } = require('path')
const fs = require('fs')
const config = require('config')
const shelljs = require('shelljs')

const mr = require('app/server/mr/db')
const workDir = config.get('workDir')
const Emitter = require('events')

/**
 * Steps:
 * 1. download
 * 2. prepare
 * 3. build
 * 4. release
 *
 * processes:
 *   - mkdir -p $workspace
 *   - git clone | git pull
 *   - npm install | yarn
 *   - npm run build
 *   - npm run release
 *   - merge branch
 */
class Build extends Emitter {
  static runTask (task) {
    const pr = mr.find({ number: task.number })
    let build
    if (!pr) {
      build = null
    } else {
      build = new Build(task.number, pr.head)
      build.promise = build[task.name](task)
    }
    return build
  }

  constructor (id, head) {
    super()
    this.id = id
    this.repoUrl = head.repo.clone_url
      .replace(/\/\//, `//${config.ghToken}@`)
    this.branch = head.ref
    this.mainBranch = head.repo.default_branch
    this.workspace = join(workDir, '' + this.id)

    shelljs.mkdir('-p', this.workspace)
    this.emit('status', 'init')
  }

  exec (cmd, opts = {
    async: true,
    timeout: config.get('execTimeout')
  }) {
    if (this.worker) {
      this.kill()
    }
    return new Promise(resolve => {
      shelljs.cd(this.workspace)
      console.log(`>>>> Run task for #${this.id}@${this.branch}:`, cmd)
      this.worker = shelljs.exec(cmd, opts, (code, stdout, stderr) => {
        resolve([code, stdout, stderr])
      })
    })
    .then(([code, stdout, stderr]) => {
      this.worker = null
      if (code !== 0) throw new Error(stderr)
      return stdout
    })
  }

  kill () {
    if (this.worker) {
      this.worker.kill()
      this.worker = null
    }
    this.emit('status', 'kill')
  }

  download () {
    const repoExist = shelljs.test('-d', join(this.workspace, '.git'))
    let cmd = !repoExist ?
      // first download
      `git clone -b ${this.branch} ${this.repoUrl} .`
      // update
      : `git fetch && git reset --hard FETCH_HEAD && git clean -df `

    cmd += ` && git merge origin/${this.mainBranch} --no-edit`
    this.emit('status', 'download')
    return this.exec(cmd)
  }

  prepare (params = {}) {
    const hasYarn = shelljs.which('yarn')
    const cmd = hasYarn ? 'yarn' : 'npm install'

    this.setEnv(params)
    this.emit('status', 'install')
    return this.exec(cmd)
  }

  setEnv ({ env = {} }) {
    Object.assign(shelljs.env, env)
    return Promise.resolve()
  }

  build () {
    this.emit('status', 'build')
    return this.exec('npm run build')
  }

  deploy ({ target }) {
    this.emit('status', 'deploy')
    return this.exec(`TARGET=${target} npm run deploy`)
      .then((...args) => {
        this.emit('status', 'success')
        return args
      })
  }

  clean () {
    this.emit('status', 'clean')
    return this.exec(`cd .. && rm -rf ${this.workspace}`)
  }
}

module.exports = Build
