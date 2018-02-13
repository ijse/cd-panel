const { join } = require('path')
const fs = require('fs')
const config = require('config')
const shelljs = require('shelljs')
const github = require('../github')

const workDir = config.get('workDir')

/**
 * processes:
 *   - mkdir -p $workspace
 *   - git clone | git pull
 *   - npm install | yarn
 *   - npm run build
 *   - npm run release
 *   - merge branch
 */
class Build {
  constructor (pr) {
    this.pr = pr
    this.repoUrl = pr.head.repo.clone_url
    this.branch = pr.head.ref
    this.number = pr.number
    this.workspace = join(workDir, '' + this.number)

    // waiting|init|installing|building|ready|error
    this.stats = 'init'
    this.ensureWorkspace()
  }

  exec (cmd) {
    if (this.worker) {
      this.kill()
    }
    return new Promise(resolve => {
      this.worker = shelljs.exec(cmd, resolve)
      return this.worker
    })
    .catch(() => this.stats = 'error')
    .then(() => this.worker = null)
  }

  kill () {
    if (this.worker) {
      this.worker.kill()
      this.worker = null
    }
  }

  ensureWorkspace () {
    shelljs.mkdir('-p', this.workspace)
  }

  async update () {
    // const curFiles = shelljs.ls('.git')
    shelljs.cd(this.workspace)
    const notExist = await new Promise(resolve => {
      fs.access(join(this.workspace, '.git'), resolve)
    })
    const cmd = notExist ?
      `git clone --depth=1 --single-branch -b ${this.branch} ${this.repoUrl} .`
      : `git pull`
    return this.exec(cmd)
  }

  installDeps () {
    shelljs.cd(this.workspace)
    const hasYarn = shelljs.which('yarn')
    const cmd = hasYarn ? 'yarn' : 'npm install'

    return this.exec(cmd)
  }

  runBuild () {
    shelljs.cd(this.workspace)
    return this.exec('npm run build')
  }

  runRelease () {
    shelljs.cd(this.workspace)
    return this.exec('npm run release')
  }
}

module.exports = Build
