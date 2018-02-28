const assert = require('assert')

describe('server/journal/db', function () {

  const jdb = require('./db')

  it('should add one task log', () => {
    jdb.clear()

    jdb.logTask({ number: 100, desc: 'create new build.'})

    assert.ok(jdb.list)
    assert.ok(jdb.getTaskLogs())
  })

  it('should add one task log', () => {
    jdb.clear()

    jdb.logTask({ number: 100, desc: 'msg1'})
    jdb.logTask({ number: 100, desc: 'msg2'})
    jdb.logTask({ number: 100, desc: 'msg3'})

    assert.ok(jdb.list)
    assert.ok(jdb.getTaskLogs())

    assert.equal(jdb.list[0].desc, 'msg3')
    assert.equal(jdb.list[1].desc, 'msg2')
    assert.equal(jdb.list[2].desc, 'msg1')
  })
})
