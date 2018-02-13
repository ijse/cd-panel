const { join } = require('path')
const assert = require('assert')
const fs = require('fs')

const shelljs = require('shelljs')
const config = require('config')

const isFileExist = file => new Promise(resolve => {
  fs.access(file, err => resolve(!err))
})

describe('server/build', () => {
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
    this.build.ensureWorkspace()
    const exist = await isFileExist(workspace)
    assert(exist)
  })

  it('should have project cloned in workspace', async () => {
    await this.build.update()
    const exist = await isFileExist(join(workspace, '.git'))
    assert(exist)
  })
})
