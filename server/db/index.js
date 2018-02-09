const config = require('config')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const lodashId = require('lodash-id')

const dataDir = config.get('dataDir')
const { join } = require('path')

exports.getInstance = name => {
  const adapter = new FileSync(join(dataDir, name + '.json'))
  const db = lowdb(adapter)
  db._.mixin(lodashId)
  return db
}

