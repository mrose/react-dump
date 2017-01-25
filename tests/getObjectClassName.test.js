import React from 'react'
import ReactDOM from 'react-dom'
import getObjectClassName from '../src/components/getObjectClassName'

describe('properly determines Object Class names', () => {

  it('detects Array', () => {
    const a = ['a','b','c']
    expect(getObjectClassName(a)).toBe('Array')
  })

  it('detects Boolean', () => {
    const b = false
    expect(getObjectClassName(b)).toBe('Boolean')
  })

  it('detects Date', () => {
    const d = new Date(2014, 1, 1)
    expect(getObjectClassName(d)).toBe('Date')
  })

  it('detects Error', () => {
    const e = new Error('Whoops!')
    expect(getObjectClassName(e)).toBe('Error')
  })

  it('detects Function', () => {
    const f = function () {}
    expect(getObjectClassName(f)).toBe('Function')
  })

  it('detects Math', () => {
    const m = Math
    expect(getObjectClassName(m)).toBe('Math')
  })

  it('detects Null', () => {
    let n = null
    expect(getObjectClassName(n)).toBe('Null')
  })

  it('detects Number', () => {
    let n = Math.PI
    expect(getObjectClassName(n)).toBe('Number')
  })

  it('detects Object', () => {
    let o = { }
    expect(getObjectClassName(o)).toBe('Object')
  })

  it('detects RegExp', () => {
    let r = new RegExp(/ab+c/)
    expect(getObjectClassName(r)).toBe('RegExp')
  })

  it('detects String', () => {
    let s = 'hello world'
    expect(getObjectClassName(s)).toBe('String')
  })

  it('detects Undefined', () => {
    let u
    expect(getObjectClassName(u)).toBe('Undefined')
  })

})
