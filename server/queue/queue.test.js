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
    db.append({ number: 100, name: 'task1' })
    db.append({ number: 100, name: 'task2' })

    assert.equal(db.list[0].name, 'task1')
    assert.equal(db.list[1].name, 'task2')
  })

  it('should insert task at index 1', () => {
    db.clear()
    db.append({ number: 100, name: 'task1' })
    db.append({ number: 100, name: 'task2' })
    db.append({ number: 100, name: 'task3' })
    db.prepend({ number: 101, name: 'task0' })

    assert.equal(db.list.length, 4)
    assert.equal(db.list[1].number, 101)
  })

  it('should start the first item', () => {
    db.clear()
    db.append({ number: 100, name: 'task1' })
    db.append({ number: 100, name: 'task2' })

    assert.equal(db.current, null)

    const task = db.startNext()
    assert.ok(db.current)
    assert.equal(db.current.name, 'task1')

    // check queue list
    assert.equal(db.list.length, 2)
    assert.equal(db.list[0].name, 'task1')
  })

  it('should remove the first item when finish', () => {
    db.finish(db.current)
    assert.equal(db.current, null)

    // check queue list
    assert.equal(db.list.length, 1)
    assert.equal(db.list[0].name, 'task2')
  })

  it('should not append duplicate tasks', () => {
    db.clear()
    const task = { number: 100, name: 'task1' }

    db.append(task)
    assert.equal(db.list.length, 1)

    db.append(task)
    assert.equal(db.list.length, 1)
  })

  it('should remove all items which number is this', () => {
    db.clear()
    db.append({ number: 100, name: 'download' })
    db.append({ number: 100, name: 'prepare' })
    db.append({ number: 101, name: 'prepare' })
    db.append({ number: 101, name: 'deploy' })
    db.append({ number: 100, name: 'deploy' })

    assert.equal(db.list.length, 5)
    db.removeTask(t => t.number === 100)
    assert.equal(db.list.length, 2)
  })

  after(() => {
    db.clear()
  })
})
