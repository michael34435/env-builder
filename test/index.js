const { stub } = require('sinon')
const fs = require('fs')
const builder = require('..')
const assert = require('assert')

let content = {}
stub(fs, 'writeFileSync')
  .callsFake((path, value) => {
    content[path] = value
  })
stub(fs, 'readFileSync')
  .callsFake(path => content[path])

describe('Test env-build', () => {
  it('Should write env file', () => {
    fs.writeFileSync('input', 'TEST=')

    const value = 'bar'
    process.env.TEST = 'bar'
    assert.equal(process.env.TEST, value)

    builder('input', 'output')

    assert.equal(fs.readFileSync('output'), 'TEST=bar')
  })
})
