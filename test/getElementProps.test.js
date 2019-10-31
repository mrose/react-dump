import {getElementProps} from '../src/index'

describe('recurses through complex objects and returns a structure used for rendering', () => {

  it('returns Undefined when no props are provided', () => {
    const expected = {
      children:[],
      dataType:'Undefined',
      documentFragment:'',
      id:'reactdump1',
      index:1,
      label:'Undefined',
      name:'Undefined',
      obj:undefined,
      path:['Undefined']
    };
    const received = getElementProps();
    expect(received).toEqual(expected)
  })

  it('returns a provided label at the top level when no props are provided', () => {
    const expected = {
      children:[],
      dataType:'Undefined',
      documentFragment:'',
      id:'reactdump1',
      index:1,
      label:'Helloooo',
      name:'Undefined',
      obj:undefined,
      path:['Undefined']
    };
    const received = getElementProps({label:expected.label});
    expect(received).toEqual(expected)
  })

/*
  it('creates the object class name as the default cache options label when no top label is provided', () => {
    const obj = 'Hello, world'
    const cache = {
        bFilteredLevel: false
      , level:0
      , objects: [obj]
      , paths: [["String"]]
      , opts: [{"expand": true, "label": "String"}]
    }
    expect(getElementProps(obj)).toEqual(cache)
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
    expect(getElementProps(obj, opts)).toEqual(cache)
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
    expect(getElementProps(obj)).toEqual(cache)
  })
*/
})
