const mrdb = require('./db')
const fetchList = require('./fetchList')
const axios = require('axios')

const team = require('config').team

module.exports = function () {
  fetchList()

  mrdb.on('mrList', list => {
    this.io.emit('mrs', list)
  })

  this.router.get('/mr', async ctx => {
    ctx.body = mrdb.list
    fetchList()
  })

  this.router.post('/request-review', async ctx => {
    const { title, user, html_url, number, unreviewers } = ctx.request.body

    const reviewers = unreviewers
      .map(r => r.login)
      .map(name => '@' + team[name].name)
      .join(',')

    const msg = `QA催大家Review代码: \n #${number}-${title}(by ${team[user.login].name}) \n ${html_url}\n ${reviewers}`

    await axios.post('http://bot.ijser.cn/api/ding', {
      msg,
      to: 'fe',
      atAll: false
    })

    ctx.body = msg
  })
}
