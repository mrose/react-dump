import getObjProps from '../src/components/getObjProps'

describe('creates a cache for rendering', () => {

  it('creates a default cache when no object is provided', () => {
    const e = new Error('No object provided')
    const cache = {
        bFilteredLevel: false
      , level:0
      , objects: [e]
      , paths: [["Error"]]
      , opts: [{"expand": true, "label": "Error"}]
    }
    expect(getObjProps()).toEqual(cache)
  })

  it('creates a default cache when an object is provided', () => {
    const obj = 'Hello, world'
    const cache = {
        bFilteredLevel: false
      , level:0
      , objects: [obj]
      , paths: [["String"]]
      , opts: [{"expand": true, "label": "String"}]
    }
    expect(getObjProps(obj)).toEqual(cache)
  })

  it('creates the object class name as the default cache options label when no top label is provided', () => {
    const obj = 'Hello, world'
    const cache = {
        bFilteredLevel: false
      , level:0
      , objects: [obj]
      , paths: [["String"]]
      , opts: [{"expand": true, "label": "String"}]
    }
    expect(getObjProps(obj)).toEqual(cache)
  })

  it('appends the object class name to the default cache options label when a top label is provided', () => {
    const obj = 'Hello, world'
    const opts = { label: 'Toppy' }
    const cache = {
        bFilteredLevel: false
      , level:0
      , objects: [obj]
      , paths: [['Toppy - String']]
      , opts: [{"expand": true, "label": "Toppy - String"}]
    }
    expect(getObjProps(obj, opts)).toEqual(cache)
  })

  it('can recurse if the provided object is Array', () => {
    const obj = ['a','b']
    const cache = {
        bFilteredLevel: false
      , level:1
      , objects: [['a', 'b'], 'a', 'b']
      , paths: [['Array'], ['Array','String'], ['Array','String']]
      , opts: [{'expand': true, 'label': 'Array (2)'}, {'expand': true, 'label': 'String'}, {'expand': true, 'label': 'String'}]
    }
    expect(getObjProps(obj)).toEqual(cache)
  })


})
