// returns cache of elements & root props for later rendering

const getElementProps = ( args={ } ) => {
  // default to sensible params when necessary
  let { obj, opts, cache, currentPath, objName, dataType } = defaults( args )

  // if the current object is a complex object which exists in cache, return a circular reference
  if ( ['Object','Array'].indexOf(dataType) !== -1 ) {
    const pathToCircularReference = getPathToCircularRef( obj, cache.objects, cache.paths )
    if ( pathToCircularReference.length ) {
      let elementProps = mapElementProps( 'CircularReference', obj, opts, objName, cache.index, [ ], pathToCircularReference )
      return { cache, elementProps }
    }
  }

  currentPath.push( objName )
  // update the label with the number of elements if a collection
  let { updatedLabel, sparseKeys } = appendElementsLengthToLabel( obj, dataType, opts.label )
  opts.label = updatedLabel

  // add to cache
  cache.objects.push( obj )
  cache.paths.push( currentPath )
  let elementProps = mapElementProps( dataType, obj, opts, objName, cache.index, [ ], currentPath )

  // recurse through complex objects
  if ( ['Object','Array'].indexOf(dataType) !== -1 ) {
    cache.level++  // for level throttling later
    for ( let i of sparseKeys ) {
      let elementArgs = { obj:obj[i]
                        , opts:opts={expand:opts.expand}
                        , cache
                        , currentPath:[...currentPath]
                        , objName:i
                        }
      let { elementProps:child } = getElementProps( elementArgs )
      elementProps.children.push(child)
    }
  }

  return { cache, elementProps }



  function defaults( args={ } ) {
    const obj = args.obj || new Error('No object provided') // Error when no object provided
    const dataType = getDataType( obj )
    const cache = args.cache || { bFilteredLevel: false
                                , level: 0
                                , index: -1
                                , objects: [ ]
                                , paths: [ ]
                                }
    const opts = args.opts || { }
          opts.expand = opts.expand || true
          opts.format = opts.format || 'html'
          opts.id = 'reactdump' + ++cache.index
          opts.label = opts.label || ''
          opts.label =  opts.label.length ? opts.label : dataType
    const currentPath = args.currentPath || [ ]
    const objName = args.objName || opts.label

    return { obj, opts, cache, currentPath, objName, dataType }
  }


  function getDataType( obj ) {
    const toString = Object.prototype.toString
    let dataType = toString.call( obj )
    dataType = dataType.split(' ')[1]
    dataType = dataType.substring(0, dataType.length-1)
    return dataType
  }


  function getPathToCircularRef( obj, objectsCache, pathsCache ) {
    let pathToCircularReference = []

    if ( typeof obj !== 'object' ) {
      return pathToCircularReference
    }

    let pos = objectsCache.indexOf( obj )
    if (pos !== -1) {
      pathToCircularReference = pathsCache[pos]
      return pathToCircularReference
    }

    return pathToCircularReference
  }


  function appendElementsLengthToLabel( obj, dataType, label ) {
    let sparseKeys = [ ]
    let updatedLabel = label

    // not an Object or Array
    if ( ['Object','Array'].indexOf( dataType ) === -1 ) {
      return { updatedLabel, sparseKeys }
    }

    // label should show number of elements for complex objects, not in currentPath
    if ( dataType === 'Object' ) {
      sparseKeys = Object.keys(obj).sort()
    } else {
      sparseKeys = Object.keys(obj)
    }
    updatedLabel+= ` [${sparseKeys.length}]`
    return { updatedLabel, sparseKeys }
  }


  function mapElementProps( dataType, obj, opts, name, index, children, path ) {
    return { dataType, obj, opts, name, index, children, path }
  }

}

export default getElementProps
