import React from 'react'
import Arr from './Arr'
import Boolean from './Boolean'
import CircularReference from './CircularReference'
import Date from './Date'
import Error from './Error'
import Function from './Function'
import Math from './Math'
import Null from './Null'
import Number from './Number'
import Obj from './Obj'
import RegExp from './RegExp'
import String from './String'
import Undefined from './Undefined'

const sortingHat = ( objProps={ } ) => {
  objProps.objectClassName = objProps.objectClassName || 'Error'
  objProps.obj = objProps.obj || new Error('No object provided')
  objProps.opts = objProps.opts || { }
  objProps.opts.expand = objProps.opts.expand || true
  objProps.opts.format = objProps.opts.format || 'html'
  objProps.opts.id = objProps.opts.id || 'reactdump999999'
  objProps.opts.label = objProps.opts.label || ''
  objProps.index = objProps.index || 0
  objProps.children = objProps.children || [ ]
  objProps.path = objProps.path || [ ]
  const { objectClassName, obj, opts={}, name, index, children, path } = objProps
/*
  const classNames =  [ 'Array'
                      , 'Boolean'
                      , 'CircularReference'
                      , 'Date'
                      , 'Error'
                      , 'Functions'
                      , 'Math'
                      , 'Null'
                      , 'Number'
                      , 'Object'
                      , 'RegExp'
                      , 'String'
                      , 'Undefined'
                      ]
  let c
*/
  let classes = {
      Array: <Arr key={opts.id} obj={obj} opts={opts} children={children} />
    , Boolean: <Boolean key={opts.id} obj={obj} opts={opts} />
    , CircularReference: <CircularReference key={opts.id} expand={opts.expand} circPath={path} />
    , Date: <Date key={opts.id} obj={obj} opts={opts} />
    , Error: <Error key={opts.id} obj={obj} opts={opts} />
    , Function: <Function key={opts.id} obj={obj} opts={opts} />
    , Math: <Math key={opts.id} obj={obj} opts={opts} />
    , Null: <Null key={opts.id} obj={obj} opts={opts} />
    , Number: <Number key={opts.id} obj={obj} opts={opts} />
    , Object: <Obj key={opts.id} obj={obj} opts={opts} children={children} />
    , RegExp: <RegExp key={opts.id} obj={obj} opts={opts} />
    , String: <String key={opts.id} obj={obj} opts={opts} />
    , Undefined: <Undefined key={opts.id} obj={obj} opts={opts} />
  }

  // when found in the classes array:
  if ( Object.keys(classes).indexOf(objectClassName) >= 0 ) {
    return classes[objectClassName]
  }
  opts.label = 'Unknown Class'
  return <Error key={opts.id} obj={obj} opts={opts} />

}
export default sortingHat
