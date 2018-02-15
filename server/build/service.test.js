const shelljs = require('shelljs')
const config = require('config')
const { join } = require('path')
const assert = require('assert')
const queue = require('./queue')

describe('server/build/service', function () {
  const pr = require('app/test/pr')

  const service = require('./service')

  const workspace = join(config.get('workDir'), '' + pr.number)

  this.timeout(10000)
  it('should create build and run queue', done => {
    queue.once('empty', () => {
      // check dependences installed
      assert.ok(shelljs.test('-d', join(workspace, 'node_modules')))
      // check run build
      assert.ok(shelljs.test('-d', join(workspace, 'dist')))

      done()
    })

    service.createBuild(pr)
  })

  it('should run release', done => {
    service.makeRelease(pr, 'test')
    queue.once('empty', () => {
      const str = shelljs.cat(join(workspace, 'dist/release')).toString()
      assert.equal(str, 'test\n')
      done()
    })
  })
})
