const db = require('./db')
const github = require('../github')
const setting = require('../setting/db')
const statsDB = require('app/server/stats/db')

// check pr review status

async function updateReviewStatus(pr) {
  const { data } = await github.pullRequests
    .getReviews({
      ...github.$repo,
      number: pr.number
    })

  pr.isApproved = !!data.length && data.every(d => d.state === 'APPROVED')
  return pr
}

module.exports = async function () {
  const result = await github.pullRequests
    .getAll(github.$repo)
    .catch(e => console.log(e) )

  // db.list = result.data.map(updateReviewStatus)

  const newList = []
  for(let pr of result.data) {
    newList.push(await updateReviewStatus(pr))
  }
  db.list = newList

  statsDB.update('pr count', db.list.length)
  return result
}
