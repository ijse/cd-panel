const mrdb = require('./db')
const fetchList = require('./fetchList')
const axios = require('axios')


const team = {
    ijse: { login: 'ijse', name: '李毅' },
    liushumei: { login: 'liushumei', name: '刘淑美' },
    'wang-jia': { login: 'wang-jia', name: '王佳' },
    'gao-jx': { login: 'gao-jx', name: '高建勋' },
    'JeannieMa': { login: 'JeannieMa', name: '马柳菁' },
    'pengcui123': { login: 'pengcui123', name: '彭翠' },
    'zhangsundanfeng': { login: 'zhangsundanfeng', name: '长孙丹凤' },
    'huihongzhou': { login: 'huihongzhou', name: '周汇虹' }
}


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
      to: 'publish',
      atAll: false
    })

    ctx.body = msg
  })
}
