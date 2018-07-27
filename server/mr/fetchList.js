const db = require('./db')
const github = require('../github')
const setting = require('../setting/db')
const statsDB = require('app/server/stats/db')
const team = require('config').team

// check pr review status

async function updateReviewStatus(pr) {
  const { data } = await github.pullRequests
    .getReviews({
      ...github.$repo,
      number: pr.number,
      per_page: 100
    })

  // const reviewers = pr.requested_reviewers.map(r => r.login)

  /*
  const reviewResult = {}
  const tss = data
    // since last update
    .filter(d => - (new Date(pr.updated_at)) + (new Date(d.submitted_at)))
    .filter(d => d.user.login !== pr.user.login)
    .filter(d => d.state !== 'COMMENTED')
    .filter(d => d.state !== 'DISMISSED')
  tss.forEach(d => reviewResult[d.user.login] = d.state === 'APPROVED')
  */

  const reviewStatus = {}
  pr.requested_reviewers.forEach(user => {
    reviewStatus[user.login] = {
      login: user.login,
      state: 'UNREVIEWED',
      ...team[user.login]
    }
  })

  data.map(t => ({
    login: t.user.login,
    state: t.state,
    ...team[t.user.login]
  }))
    .filter(d => d.login !== pr.user.login)
    .forEach(user => {
      reviewStatus[user.login] = user
    })

  const unreviewers = Object.entries(reviewStatus)
    .filter(([login, { state }]) => state !== 'APPROVED')
    .map(([login, { state }]) => ({
      state,
      ...team[login]
    }))

  if (pr.number === 3286) {
    console.log('>>>>', data)
    console.log(reviewStatus, unreviewers)
    console.log('>>>', pr.requested_reviewers)
  }

  /*
  const unreviewers = Array.from(reviewStatus)
    .filter(t => t.state !== 'APPROVED')
  */

  // const reviewers = Object.keys(reviewResult)
  // if (pr.number === 3283) {
    // console.log(data)
    // console.log(tss, reviewers, reviewResult)
    // console.log(pr.requested_reviewers)
    // console.log('>>', reviewStatus)
  // }

  // pr.isApproved = !!reviewers.length && reviewers.every(r => reviewResult[r])
    //
  pr.reviewers = reviewStatus
  pr.isApproved = unreviewers.length === 0
  pr.unreviewers = unreviewers

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
    pr.user = { ...pr.user, ...team[pr.user.login] }
  }
  db.list = newList

  statsDB.update('pr count', db.list.length)
  return result
}
