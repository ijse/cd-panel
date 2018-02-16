const { join } = require('path')
const assert = require('assert')

const shelljs = require('shelljs')
const config = require('config')

describe('server/build/build', function () {
  this.timeout(5000)
  const Build = require('./Build.js')

  const pr = require('app/test/pr')
  const workspace = join(config.get('workDir'), '' + pr.number)

  before(() => {
    this.build = new Build(pr)
  })

  it('should create workspace directory', () => {
    assert.ok(shelljs.test('-d', workspace))
  })

  it('should have project cloned in workspace', async () => {
    await this.build.download()
    assert.ok(shelljs.test('-d', join(workspace, '.git')))
  })

  it('should install project dependences by creating node_modules', async () => {
    await this.build.prepare()
    const exist = shelljs.test('-d', join(workspace, 'node_modules'))
    assert.ok(exist)
  })

  it('should successful call npm command', async () => {
    this.build.exec('npm version > /dev/null')
    assert.ok(this.build.worker)
    this.build.kill()
    assert.ok(!this.build.worker)
  })
})
