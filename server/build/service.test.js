const shelljs = require('shelljs')
const config = require('config')
const { join } = require('path')

describe('server/build/service', function () {
  const pr = {
    number: 100,
    head: {
      ref: 'master',
      repo: {
        clone_url: join(__dirname, '../..')
      }
    }
  }

  const service = require('./service')

  const workspace = join(config.get('workDir'), '' + pr.number)

  it('should create build and run queue', async () => {
    await service.createBuild(pr)
    // check dependences installed
    assert.ok(shelljs.test('-d', join(workspace, 'node_modules')))
    // check run build
    assert.ok(shelljs.test('-d', join(workspace, 'dist')))
  })

  it('should run release', () => {
    service.makeRelease(pr, 'test')
  })
})
