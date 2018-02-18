const assert = require('assert')
const { join } = require('path')
const fs = require('fs')
const config = require('config')

describe('server/build/queue', function () {
  const db = require('./queue.js')

  it('should create build queue data file', () => {
    const dbfile = join(config.get('dataDir'), 'queue.json')
    fs.accessSync(dbfile)
  })

  it('should save queue content right', () => {
    db.clear()
    db.append([100, ['task1']])
    db.append([100, ['task2']])

    assert.equal(db.list[0][1][0], 'task1')
    assert.equal(db.list[1][1][0], 'task2')
  })

  it('should start the first item', () => {
    db.clear()
    db.append([100, ['task1']])
    db.append([100, ['task2']])

    assert.equal(db.current, null)

    const task = db.startNext()
    assert.ok(db.current)
    assert.equal(db.current[1][0], 'task1')

    // check queue list
    assert.equal(db.list.length, 2)
    assert.equal(db.list[0][1][0], 'task1')
  })

  it('should remove the first item when finish', () => {
    db.finish(db.current)
    assert.equal(db.current, null)

    // check queue list
    assert.equal(db.list.length, 1)
    assert.equal(db.list[0][1][0], 'task2')
  })

  it('should not append duplicate tasks', () => {
    db.clear()
    const task = [ 100, [ 'download' ] ]
    db.append(task)
    assert.equal(db.list.length, 1)
    db.append(task)
    assert.equal(db.list.length, 1)
  })

  after(() => {
    db.clear()
  })
})
