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

const sortingHat = ( objectClassName, obj, opts={}, name, index, children, path ) => {
  objectClassName = objectClassName || 'Error'
  obj = obj || new Error('No object provided')
  opts.expand = opts.expand || true
  opts.format = opts.format || 'html'
  opts.id = opts.id || 'reactdump999999'
  opts.label = opts.label || ''
  index = index || 0
  children = children || [ ]
  path = path || [ ]

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
