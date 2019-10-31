import React from 'react'
import ReactDOM from 'react-dom'
import {getDataType} from '../src/index'

describe('properly determines data types', () => {

  it('detects Array', () => {
    const a = ['a','b','c']
    expect(getDataType(a)).toBe('Array')
  })

  it('detects Boolean', () => {
    const b = false
    expect(getDataType(b)).toBe('Boolean')
  })

  it('detects Date', () => {
    const d = new Date(2014, 1, 1)
    expect(getDataType(d)).toBe('Date')
  })

  it('detects Error', () => {
    const e = new Error('Whoops!')
    expect(getDataType(e)).toBe('Error')
  })

  it('detects Function', () => {
    const f = function () {}
    expect(getDataType(f)).toBe('Function')
  })

  it('detects Math', () => {
    const m = Math
    expect(getDataType(m)).toBe('Math')
  })

  it('detects Null', () => {
    let n = null
    expect(getDataType(n)).toBe('Null')
  })

  it('detects Number', () => {
    let n = Math.PI
    expect(getDataType(n)).toBe('Number')
  })

  it('detects Object', () => {
    let o = { }
    expect(getDataType(o)).toBe('Object')
  })

  it('detects RegExp', () => {
    let r = new RegExp(/ab+c/)
    expect(getDataType(r)).toBe('RegExp')
  })

  it('detects String', () => {
    let s = 'hello world'
    expect(getDataType(s)).toBe('String')
  })

  it('detects Undefined', () => {
    let u
    expect(getDataType(u)).toBe('Undefined')
  })

  it('returns "Unknown" when the dataType is not known and the unknown flag is true', () => {
    let m = new Map()
    expect(getDataType(m, true)).toBe('Unknown')
  })

    it('returns the name of an "unknown" dataType when the unknown flag is false', () => {
      let m = new Map()
      expect(getDataType(m, false)).toBe('Map')
    })

})
