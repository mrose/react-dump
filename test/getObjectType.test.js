import React from 'react'
import ReactDOM from 'react-dom'
import {getObjectType} from '../src/index'

describe('properly determines data types', () => {

  it('detects Array', () => {
    const a = ['a','b','c']
    expect(getObjectType(a)).toBe('Array')
  })

  it('detects Boolean', () => {
    const b = false
    expect(getObjectType(b)).toBe('Boolean')
  })

  it('detects Date', () => {
    const d = new Date(2014, 1, 1)
    expect(getObjectType(d)).toBe('Date')
  })

  it('detects Error', () => {
    const e = new Error('Whoops!')
    expect(getObjectType(e)).toBe('Error')
  })

  it('detects Function', () => {
    const f = function () {}
    expect(getObjectType(f)).toBe('Function')
  })

  it('detects Math', () => {
    const m = Math
    expect(getObjectType(m)).toBe('Math')
  })

  it('detects Null', () => {
    let n = null
    expect(getObjectType(n)).toBe('Null')
  })

  it('detects Number', () => {
    let n = Math.PI
    expect(getObjectType(n)).toBe('Number')
  })

  it('detects Object', () => {
    let o = { }
    expect(getObjectType(o)).toBe('Object')
  })

  it('detects RegExp', () => {
    let r = new RegExp(/ab+c/)
    expect(getObjectType(r)).toBe('RegExp')
  })

  it('detects String', () => {
    let s = 'hello world'
    expect(getObjectType(s)).toBe('String')
  })

  it('detects Undefined', () => {
    let u
    expect(getObjectType(u)).toBe('Undefined')
  })

  it('returns "Unknown" when the dataType is not known and the unknown flag is true', () => {
    let m = new Map()
    expect(getObjectType(m, true)).toBe('Unknown')
  })

    it('returns the name of an "unknown" dataType when the unknown flag is false', () => {
      let m = new Map()
      expect(getObjectType(m, false)).toBe('Map')
    })

})
