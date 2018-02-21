const statsDB= require('./db')

module.exports = app => {
  statsDB.update('Online', 0)

  app.io.on('connect', socket => {
    const sendStatsData = () => {
      const data = statsDB.getAll()
      socket.emit('stats-refresh', data)
    }

    socket.on('load-stats', sendStatsData)
    statsDB.on('update', sendStatsData)

    statsDB.increase('Visit')

    statsDB.increase('Online')

    socket.on('disconnect', socket => {
      statsDB.decrease('Online')
    })
  })
}
