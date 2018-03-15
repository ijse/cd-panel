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

  const reviewers = pr.requested_reviewers.map(r => r.login)

  const reviewResult = {}
  data.forEach(d => reviewResult[d.user.login] = d.state === 'APPROVED')

  pr.isApproved = reviewers.every(r => reviewResult[r])

  if (pr.number == 3065) {
    console.log('>>>', pr.isApproved, data)
  }
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
