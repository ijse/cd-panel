const ANSIConverter = require('ansi-to-html')
const hookStream = require('./hookStream')
const converter = new ANSIConverter()
const moment = require('moment')
const rollBuffer = require('./cache')

function hookStd (callback) {
  const unhookStdout = hookStream(process.stdout, callback)
  const unhookStdErr = hookStream(process.stderr, callback)
  return () => unhookStdout() || unhookStdErr()
}

function genLog (output) {
  let html = `<div class="timestamp"
        ><time>${moment().format('YYYY-MM-DD HH:mm:ss')}</time
      ></div>`
  html += converter.toHtml(output)
  return html
}

module.exports = function (app) {
  app.io.on('connect', socket => {
    socket.on('open-monitor', callback => {
      socket.emit('stdout', rollBuffer.read().join(''))
    })
    const emitOutput = output => {
      const result = genLog(output)
      socket.emit('stdout', result)
    }

    const unhook = hookStd(emitOutput)
    socket.on('disconnect', unhook)
  })

  // save last several logs
  hookStd(output => {
    const result = genLog(output)
    rollBuffer.roll(result)
  })
}
