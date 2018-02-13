const { join } = require('path')
const config = require('config')
const shelljs = require('shelljs')

const workDir = config.get('workDir')

// ensure workspace and return
function ensureWorkspace (number) {
  const workspace = join(workDir, number)
  shelljs.mkdir('-p', workspace)
  return workspace
}

// clone or pull latest commits
function updateCodes (repoUrl, workspace) {
  const curFiles = shelljs.ls('.git')
  if (!curFiles.length) {
    // clone project
    shelljs.exec(`git clone --depth=1 ${repoUrl} .`)
  } else {
    shelljs.exec(`git pull`)
  }
}

module.exports = function (pr) {
  const repoUrl = pr.head.repo.clone_url
  const number = pr.number

  const workspace = ensureWorkspace(number)

  shelljs.cd(workspace)
  updateCodes(repoUrl, workspace)
}
