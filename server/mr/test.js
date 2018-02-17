const assert = require('assert')

describe('server/mr', function () {
  const pr = require('app/test/pr')
  const db = require('./db')

  before(() => {
    db.list = []
    delete pr.buildStats
  })

  it('should add mr list', () => {
    assert.equal(db.list.length, 0)
    db.list = [ pr ]
    assert.equal(db.list.length, 1)
  })

  it('should update pr status', () => {
    assert.equal(db.list[0].buildStats, 'halt')
    db.updateStatus(pr.number, 'download')
    assert.equal(db.list[0].buildStats, 'download')
  })

  it('should find the mr', () => {
    const number = pr.number
    const result1 = db.find({ number })
    assert.equal(result1.number, pr.number)
    const result2 = db.find({ number: 123 })
    assert.equal(result2, null)
  })
})
