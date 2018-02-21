const assert = require('assert')

describe('server/stats/db', function () {

  const db = require('./db')
  before(() => {
    db.clear()
  })

  it('should get stats db instance', () => {
    assert.ok(db)
  })

  it('should default as empty', () => {
    assert.equal(typeof db.getAll(), 'object')
    assert.equal(Object.keys(db.getAll()).length, 0)
  })

  it('should set queue size stats', () => {
    db.update('queue size', 1)
    assert.equal(db.get('queue size'), 1)
    assert.equal(Object.keys(db.getAll()).length, 1)
  })

  it('should increase stats by 1', () => {
    db.increase('visits')
    assert.equal(db.get('visits'), 1)
  })

  it('should decrease stats by 1', () => {
    db.decrease('visits')
    assert.equal(db.get('visits'), 0)
  })
})
