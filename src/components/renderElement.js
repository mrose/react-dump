import React from 'react'
import Arr from './dataTypes/Arr'
import Boolean from './dataTypes/Boolean'
import CircularReference from './dataTypes/CircularReference'
import Date from './dataTypes/Date'
import Error from './dataTypes/Error'
import Function from './dataTypes/Function'
import Math from './dataTypes/Math'
import Null from './dataTypes/Null'
import Number from './dataTypes/Number'
import Obj from './dataTypes/Obj'
import RegExp from './dataTypes/RegExp'
import String from './dataTypes/String'
import Undefined from './dataTypes/Undefined'


const renderElement = ( elementProps={ } ) => {
  let { dataType, obj, opts, index, children, path } = defaults( elementProps )
  const classProps = { key:opts.id, obj, opts, children, path }
  const DataTypes = { Array:Arr
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

  if ( Object.keys(DataTypes).indexOf(dataType) !== -1 ) {
    const Tag = DataTypes[dataType]
    return <Tag {...classProps} />
  }

  opts.label = 'Unknown DataType'
  return <DataTypes.Error {...classProps} />


  function defaults( elementProps ) {
    const dataType = elementProps.dataType || 'Error'
    const obj = elementProps.obj || new Error('No object provided')
    let opts = elementProps.opts || { }
        opts.expand = opts.expand || true
        opts.format = opts.format || 'html'
        opts.id = opts.id || 'reactdump999999'
        opts.label = opts.label || ''
    const index = elementProps.index || 0
    const children = elementProps.children || [ ]
    const path = elementProps.path || [ ]
    return { dataType, obj, opts, index, children, path }
  }

}
export default renderElement
