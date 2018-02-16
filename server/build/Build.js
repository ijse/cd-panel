const { join } = require('path')
const fs = require('fs')
const config = require('config')
const shelljs = require('shelljs')
const github = require('../github')

const workDir = config.get('workDir')

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
class Build {
  static runTask ([pr, [step, ...args]]) {
    const build = new Build(pr)
    return build[step](...args)
  }

  constructor (pr) {
    this.pr = pr
    this.repoUrl = pr.head.repo.clone_url
    this.branch = pr.head.ref
    this.number = pr.number
    this.workspace = join(workDir, '' + this.number)

    shelljs.mkdir('-p', this.workspace)
  }

  exec (cmd, opts = {}) {
    if (this.worker) {
      this.kill()
    }
    return new Promise(resolve => {
      shelljs.cd(this.workspace)
      this.worker = shelljs.exec(cmd, opts, resolve)
      return this.worker
    })
    .then((code, stdout, stderr) => {
      this.worker = null
      return [ code, stdout, stderr ]
    })
  }

  kill () {
    if (this.worker) {
      this.worker.kill()
      this.worker = null
    }
  }

  download () {
    const repoExist = shelljs.test('-d', join(this.workspace, '.git'))
    const cmd = !repoExist ?
      `git clone --depth=1 --single-branch -b ${this.branch} ${this.repoUrl} .`
      : `git pull`
    return this.exec(cmd)
  }

  prepare (env = {}) {
    const hasYarn = shelljs.which('yarn')
    const cmd = hasYarn ? 'yarn' : 'npm install'

    this.setEnv(env)
    return this.exec(cmd)
  }

  setEnv (value) {
    Object.assign(shelljs.env, value)
    return Promise.resolve()
  }

  build () {
    return this.exec('npm run build')
  }

  release (target) {
    return this.exec(`TARGET=${target} npm run release`)
  }
}

module.exports = Build
