const { exec } = require('child_process')
const config = require('config')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const lodashId = require('lodash-id')

const dataDir = config.get('dataDir')
const { join } = require('path')

exec(`mkdir -p ${config.dataDir}`)

exports.getInstance = name => {
  const adapter = new FileSync(join(dataDir, name + '.json'))
  const db = lowdb(adapter)
  db._.mixin(lodashId)
  return db
}

const Emitter = require('events')
class dbBase extends Emitter {
  constructor (name) {
    super()
    const adapter = new FileSync(join(dataDir, name + '.json'))
    const db = lowdb(adapter)
    db._.mixin(lodashId)
    db.defaults(this.defaults).write()
    this.db = db
  }

  clear () {
    this.db.setState(this.defaults)
  }
}

exports.Base = dbBase

