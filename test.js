const config = require('config')
const shell = require('shelljs')
const { join } = require('path')

describe('Prepare for test', function () {
  it('should create test repo', () => {
    const dataDir = config.get('dataDir')
    shell.exec(`mkdir -p ${dataDir}`)
    shell.cd(dataDir)
    shell.mkdir('repo')
    shell.cd('repo')
    shell.exec('git init')
    shell.cp('-R', join(__dirname, 'test/repo'), dataDir)
    shell.exec('git add .')
    shell.exec('git commit -m "init"')
  })
})
