const userdb = require('./db')
const passport = require('koa-passport')
const config = require('config')

config.get('users').forEach(user => {
  userdb.add(user)
})

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
  try {
    const user = await userdb.findById(id)
    done(null, user)
  } catch(err) {
    done(err)
  }
})

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(function(username, password, done) {
  const user = userdb.findByName(username)
  if (!user) return done(null, false)
  if (username === user.username && password === user.password) {
    done(null, user)
  } else {
    done(null, false)
  }
}))

module.exports = app => {
  app.router.post('/login',
    passport.authenticate('local'),
    async ctx => {
      const isAuth = ctx.isAuthenticated()
      ctx.status = 200
    })
}
