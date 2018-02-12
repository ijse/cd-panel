const db = require('./db')
const github = require('../github')
const setting = require('../setting/db')

module.exports = async function () {
  const params = {
    owner: 'tigerbrokers',
    repo: 'gem'
  }
  const result = await github.pullRequests.getAll(params)
    .catch(e => console.log(e) )

  db.list = result.data
  return result
}
