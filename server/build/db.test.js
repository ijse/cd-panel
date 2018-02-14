const assert = require('assert')
const { join } = require('path')
const fs = require('fs')
const config = require('config')

describe('server/build/db', function () {
  const db = require('./db.js')

  it('should create build queue data file', () => {
    const dbfile = join(config.get('dataDir'), 'queue.json')
    fs.accessSync(dbfile)
  })

  it('should save queue content right', () => {
    db.clear()
    db.append('task1')
    db.append('task2')

    assert.notStrictEqual(db.queue, ['task1', 'task2'])
    assert.equal(db.current, 'task1')
  })

  it('should move to next task', () => {
    db.clear()
    db.append({ name: 'task1' })
    db.append({ name: 'task2' })

    db.nextTask()
    assert.notStrictEqual(db.current, { name: 'task2' })
  })
})
