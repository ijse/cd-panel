const { join } = require('path')
const fs = require('fs')
const config = require('config')
const shelljs = require('shelljs')
const github = require('../github')

const mr = require('app/server/mr/db')
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
  static runTask ([number, [step, ...args]]) {
    const pr = mr.find({ number })
    const build = new Build(pr)
    return build[step](...args)
  }

  constructor (pr) {
    this.pr = pr
    this.repoUrl = pr.head.repo.clone_url
      .replace(/\/\//, `//${config.ghToken}@`)
    this.branch = pr.head.ref
    this.number = pr.number
    this.workspace = join(workDir, '' + this.number)

    shelljs.mkdir('-p', this.workspace)
  }

  exec (cmd, opts = { async: true }) {
    if (this.worker) {
      this.kill()
    }
    return new Promise(resolve => {
      shelljs.cd(this.workspace)
      console.log(`>>>> Run task for #${this.number}:`, cmd)
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

  deploy (target) {
    return this.exec(`TARGET=${target} npm run deploy`)
  }
}

module.exports = Build
