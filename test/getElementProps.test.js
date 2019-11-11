import {getElementProps} from '../src/index'

describe('recurses through complex objects and returns a structure used for rendering', () => {

  it('returns an object representing "Undefined" when no object is provided', () => {
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

  it('returns an object which includes the provided top level label when no object is provided', () => {
    const expected = {
      children:[],
      dataType:'Undefined',
      documentFragment:'',
      id:'reactdump2',
      index:1,
      label:'Helloooo',
      name:'Undefined',
      obj:undefined,
      path:['Undefined']
    };
    const received = getElementProps({label:expected.label});
    expect(received).toEqual(expected)
  })

  it('returns a provided label at the top level', () => {
    const expected = {
      children:[],
      dataType:'String',
      documentFragment:'',
      id:'reactdump3',
      index:1,
      label:'Helloooo',
      name:'String',
      obj:'World',
      path:['String']
    };
    const received = getElementProps({obj:expected.obj,label:expected.label});
    expect(received).toEqual(expected)
  })

  it('returns an object with children element props when an object is provided', () => {
      const obj = {'Item':'helloooo'};
      const expected = {
        children:[{
          children:[],
          dataType:'String',
          documentFragment:'',
          id:'reactdump5',
          index:2,
          label:'String',
          name:'Item',
          obj:'helloooo',
          path:['Object','String']
        }],
        dataType:'Object',
        documentFragment:'',
        id:'reactdump4',
        index:1,
        label:'Object [1]',
        name:'Object',
        obj:obj,
        path:['Object']
      };
      const received = getElementProps({obj});
      expect(received).toEqual(expected)
    })

  it('returns an object with children element props when an array is provided', () => {
      const obj = ['hello','young','lovers'];
      const expected = {
        children:[
          { children:[],
            dataType:'String',
            documentFragment:'',
            id:'reactdump7',
            index:2,
            label:'String',
            name:'0',
            obj:'hello',
            path:['Array','String']
          },
          { children:[],
            dataType:'String',
            documentFragment:'',
            id:'reactdump8',
            index:3,
            label:'String',
            name:'1',
            obj:'young',
            path:['Array','String']
          },
          { children:[],
            dataType:'String',
            documentFragment:'',
            id:'reactdump9',
            index:4,
            label:'String',
            name:'3',
            obj:'lovers',
            path:['Array','String']
          }
        ],
        dataType:'Array',
        documentFragment:'',
        id:'reactdump6',
        index:1,
        label:'Array [3]',
        name:'Array',
        obj:obj,
        path:['Array']
      };
      const received = getElementProps({obj});
      expect(received).toEqual(expected)
    })

/*
  it('parses an object correctly finding child element props with circular references', () => {
    const a = ['world'];
    const obj = {one:'helloooo', two:a, three:a};
    const expected = {
      children:[
        {
          children:[],
          dataType:'String',
          documentFragment:'',
          id:'reactdump5',
          index:2,
          label:'String',
          name:'String',
          obj:'helloooo',
          path:['Object','String']
        },
        {
          children:[
            {
              children:[],
              dataType:'String',
              documentFragment:'',
              id:'reactdump5',
              index:3,
              label:'String',
              name:'String',
              obj:'world',
              path:['Object','Array','String']
            },
          ],
          dataType:'Array',
          documentFragment:'',
          id:'reactdump5',
          index:2,
          label:'Array [1]',
          name:'Array',
          obj:['world'],
          path:['Object','Array']
        },
        {
          children:[],
          dataType:'CircularReference',
          documentFragment:'',
          id:'reactdump5',
          index:2,
          label:'CircularReference',
          name:'CircularReference',
          obj:['world'],
          path:['Object','Array']
        }

      ],
      dataType:'Object',
      documentFragment:'',
      id:'reactdump6',
      index:1,
      label:'Object [3]',
      name:'Object',
      obj:obj,
      path:['Object']
    };
    const received = getElementProps(obj);
    expect(received).toEqual(expected)
  })
*/
})
