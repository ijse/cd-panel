const statsDB= require('./db')

module.exports = app => {
  statsDB.update('Online', 0)

  statsDB.on('update', () => {
    const data = statsDB.getAll()
    app.io.emit('stats-refresh', data)
  })

  app.io.on('connect', socket => {
    socket.on('load-stats', () => {
      const data = statsDB.getAll()
      socket.emit('stats-refresh', data)
    })

    statsDB.increase('Visit')
    statsDB.increase('Online')

    socket.once('disconnect', () => {
      statsDB.decrease('Online')
    })
  })
}
