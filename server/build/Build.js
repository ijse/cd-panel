const { join } = require('path')
const fs = require('fs')
const config = require('config')
const shelljs = require('shelljs')

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
  static runTask (task) {
    const pr = mr.find({ number: task.number })
    const build = new Build(pr)
    build.promise = build[task.name](task)
    return build
  }

  constructor (pr) {
    this.pr = pr
    this.repoUrl = pr.head.repo.clone_url
      .replace(/\/\//, `//${config.ghToken}@`)
    this.branch = pr.head.ref
    this.mainBranch = pr.head.repo.default_branch
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
      console.log(`>>>> Run task for #${this.number}@${this.branch}:`, cmd)
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
    let cmd = !repoExist ?
      // first download
      `git clone -b ${this.branch} ${this.repoUrl} .`
      // update
      : `git fetch && git reset --hard FETCH_HEAD && git clean -df `

    cmd += ` && git merge origin/${this.mainBranch} --no-edit`
    return this.exec(cmd)
  }

  prepare (params = {}) {
    const hasYarn = shelljs.which('yarn')
    const cmd = hasYarn ? 'yarn' : 'npm install'

    this.setEnv(params)
    return this.exec(cmd)
  }

  setEnv ({ env = {} }) {
    Object.assign(shelljs.env, env)
    return Promise.resolve()
  }

  build () {
    return this.exec('npm run build')
  }

  deploy ({ target }) {
    return this.exec(`TARGET=${target} npm run deploy`)
  }

  clean () {
    return this.exec(`cd .. && rm -rf ${this.workspace}`)
  }
}

module.exports = Build
