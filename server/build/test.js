const { join } = require('path')
const assert = require('assert')
const fs = require('fs')

const shelljs = require('shelljs')
const config = require('config')

describe('server/build', () => {
  const createBuild = require('./createBuild.js')

  const pr = {
    number: 102,
    head: {
      ref: 'master',
      repo: {
        clone_url: join(__dirname, '../..')
      }
    }
  }
  const workspace = join(config.get('workDir'), '100')

  before(() => {
    createBuild(pr)
  })

  it('should create workspace directory', done => {
    fs.access(workspace, fs.constants.R_OK, err => {
      assert.ifError(err)
      done(err)
    })
  })

  it('should have project cloned in workspace', done => {
    fs.access(join(workspace, '.git'), fs.constants.R_OK, err => {
      assert.ifError(err)
      done(err)
    })
  })
})
