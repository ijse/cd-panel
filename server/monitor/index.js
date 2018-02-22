const ANSIConverter = require('ansi-to-html')
const hookStream = require('./hookStream')
const converter = new ANSIConverter()
const moment = require('moment')

module.exports = function (app) {
  app.io.on('connect', socket => {
    const emitOutput = output => {
      let html = `<div class="timestamp"
        ><time>${moment().format('YYYY-MM-DD HH:mm:ss')}</time
      ></div>`
      html += converter.toHtml(output)
      socket.emit('stdout', html)
    }

    hookStream(process.stdout, emitOutput)
    hookStream(process.stderr, emitOutput)
  })
}
