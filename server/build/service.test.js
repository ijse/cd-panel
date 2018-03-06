const shelljs = require('shelljs')
const config = require('config')
const { join } = require('path')
const assert = require('assert')
const queue = require('app/server/queue/queue')

describe('server/build/service', function () {
  const mr = require('app/server/mr/db')
  const pr = require('app/test/pr')

  const service = require('./service')

  const workspace = join(config.get('workDir'), '' + pr.number)

  this.timeout(10000)

  before(() => {
    mr.list = [ pr ]
  })

  it('should create build and run queue', done => {
    service.createBuild(pr.number)

    queue.once('empty', () => {
      // check dependences installed
      assert.ok(shelljs.test('-d', join(workspace, 'node_modules')))
      // check run build
      assert.ok(shelljs.test('-d', join(workspace, 'dist')))

      done()
    })
  })

  it('should run release', done => {
    service.makeDeploy(pr.number, 'test')
    queue.once('empty', () => {
      const str = shelljs.cat(join(workspace, 'dist/release')).toString()
      assert.equal(str, 'test\n')
      done()
    })
  })
})
