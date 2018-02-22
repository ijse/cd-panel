const assert = require('assert')

describe('server/monitor/cache', function () {
  const db = require('./cache')
  before(() => {
    db.clear()
  })

  it('should roll-in data to cache', () => {
    db.roll('text 1')
    const r = db.read()
    assert.ok(r)
    assert.equal(r.length, 1)
    assert.equal(r[0], 'text 1')
  })

  it('should keep roll size to 3 last', () => {
    db.roll('text 2')
    db.roll('text 3')
    db.roll('text 4')
    db.roll('text 5')
    const r = db.read()
    assert.ok(r)
    assert.equal(r.length, 5)
    assert.equal(r.pop(), 'text 5')
  })
})
