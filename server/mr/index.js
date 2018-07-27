const mrdb = require('./db')
const fetchList = require('./fetchList')
const axios = require('axios')

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
    const { title, user, html_url, number } = ctx.request.body

    const msg = `QA嗺大家Review代码: \n #${number}-${title}(by ${user.login}) \n ${html_url}\n`

    await axios.post('http://bot.ijser.cn/api/ding', {
      msg,
      to: 'feed',
      atAll: true
    })

    ctx.body = 'ok'
  })
}
