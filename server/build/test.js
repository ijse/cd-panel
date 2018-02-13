const { join } = require('path')
const assert = require('assert')
const fs = require('fs')

const shelljs = require('shelljs')
const config = require('config')

const isFileExist = file => new Promise(resolve => {
  fs.access(file, err => resolve(!err))
})

describe('server/build', function () {
  this.timeout(5000)
  const Build = require('./Build.js')

  const pr = {
    number: 100,
    head: {
      ref: 'master',
      repo: {
        clone_url: join(__dirname, '../..')
      }
    }
  }
  const workspace = join(config.get('workDir'), '' + pr.number)

  before(() => {
    this.build = new Build(pr)
  })

  it('should create workspace directory', async () => {
    const exist = await isFileExist(workspace)
    assert(exist)
  })

  it('should have project cloned in workspace', async () => {
    await this.build.update()
    const exist = await isFileExist(join(workspace, '.git'))
    assert(exist)
  })

  it('should install project dependences by creating node_modules', done => {
    this.build.installDeps()
    // wait 3sec to check node_modules folder exist
    setTimeout(async () => {
      const exist = await isFileExist(join(workspace, 'node_modules'))
      assert(exist)
      this.build.worker.kill()
      done()
    }, 3000)
  })
})
