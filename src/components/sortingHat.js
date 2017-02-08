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

const sortingHat = ( objectClassName, obj, opts, name, index, children, path ) => {
  objectClassName = objectClassName || 'Error'
  obj = obj || new Error('No object provided')
  opts.expand = opts.expand || true
  opts.format = opts.format || 'html'
  opts.id = opts.it || 'reactdump999999'
  opts.label = opts.label || ''
  index = index || 0
  children = children || [ ]
  path = path || [ ]

  let classes = {
      Array: <Arr { obj, opts, children } />
    , Boolean: <Boolean { obj, opts } />
    , CircularReference: <CircularReference expand={opts.expand} circPath={path} />
    , Date: <Date { obj, opts } />
    , Error: <Error { obj, opts } />
    , Function: <Function { obj, opts } />
    , Math: <Math { obj, opts } />
    , Null: <Null { obj, opts } />
    , Number: <Number { obj, opts } />
    , Object: <Obj { obj, opts, children } />
    , RegExp: <RegExp { obj, opts } />
    , String: <String { obj, opts } />
    , Undefined: <Undefined { obj, opts } />
  }

  // when found in the classes array:
  if ( Object.keys(classes).indexOf(objectClassName) >= 0 ) {
    return classes[objectClassName]
  }
  opts.label = 'Unknown Class'
  return <Error { obj, opts } />

}
export default sortingHat
