import React from 'react'
import Arr from './classes/Arr'
import Boolean from './classes/Boolean'
import CircularReference from './classes/CircularReference'
import Date from './classes/Date'
import Error from './classes/Error'
import Function from './classes/Function'
import Math from './classes/Math'
import Null from './classes/Null'
import Number from './classes/Number'
import Obj from './classes/Obj'
import RegExp from './classes/RegExp'
import String from './classes/String'
import Undefined from './classes/Undefined'


const renderElement = ( objProps={ } ) => {
  let { objectClassName, obj, opts, index, children, path } = defaults( objProps )
  const classProps = { key:opts.id, obj, opts, children, path }
  const Classes = { Array:Arr
                  , Boolean
                  , CircularReference
                  , Date
                  , Error
                  , Function
                  , Math
                  , Null
                  , Number
                  , Object:Obj
                  , RegExp
                  , String
                  , Undefined
                  }

  if ( Object.keys(Classes).indexOf(objectClassName) !== -1 ) {
    const Tag = Classes[objectClassName]
    return <Tag {...classProps} />
  }

  opts.label = 'Unknown Class'
  return <Classes.Error {...classProps} />


  function defaults( objProps ) {
    const objectClassName = objProps.objectClassName || 'Error'
    const obj = objProps.obj || new Error('No object provided')
    let opts = objProps.opts || { }
        opts.expand = opts.expand || true
        opts.format = opts.format || 'html'
        opts.id = opts.id || 'reactdump999999'
        opts.label = opts.label || ''
    const index = objProps.index || 0
    const children = objProps.children || [ ]
    const path = objProps.path || [ ]
    return { objectClassName, obj, opts, index, children, path }
  }

}
export default renderElement
