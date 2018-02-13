const { join } = require('path')
const fs = require('fs')
const config = require('config')
const shelljs = require('shelljs')

const workDir = config.get('workDir')

class Build {
  constructor (pr) {
    this.pr = pr
    this.repoUrl = pr.head.repo.clone_url
    this.branch = pr.head.ref
    this.number = pr.number

    this.workspace = join(workDir, '' + this.number)

    this.stats = 'init'
  }

  ensureWorkspace () {
    shelljs.mkdir('-p', this.workspace)
  }

  async update () {
    // const curFiles = shelljs.ls('.git')
    shelljs.cd(this.workspace)
    const notExist = await new Promise(resolve => fs.access(join(this.workspace, '.git'), resolve))
    if (notExist) {
      shelljs.exec(`git clone --depth=1 --single-branch -b ${this.branch} ${this.repoUrl} .`)
    } else {
      shelljs.exec(`git pull`)
    }
  }
}

module.exports = Build
