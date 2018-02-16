const assert = require('assert')

describe('server/mr', function () {
  const pr = require('app/test/pr')
  const db = require('./db')

  it('should add mr list', () => {
    assert.equal(db.list.length, 0)
    db.list = [ pr ]
    assert.equal(db.list.length, 1)
  })

  it('should update pr status', () => {
    assert.equal(db.list[0].buildStats, 'waiting')
    db.updateStatus(pr, 'download')
    assert.equal(db.list[0].buildStats, 'download')
  })
})
