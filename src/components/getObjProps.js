// returns cache of elements & root props for later rendering
import getObjectClassName from './getObjectClassName'
import getPathToCircularRef from './getPathToCircularRef'


const getObjProps = ( obj, opts={}, cache, currentPath, objName ) => {

  obj = obj || new Error('No object provided') // Error when no object provided
  opts.label = opts.label || '' // string label for object
  opts.expand = opts.expand || true // boolean, expands/collapses cells
  cache = cache ||  { bFilteredLevel: false
                    , level: 0
                    , index: -1
                    , objects: [ ]
                    , paths: [ ]
                    }
  currentPath = currentPath || [ ]
  objName = objName || opts.label

  opts.id = 'reactdump' + ++cache.index
  const objectClassName = getObjectClassName( obj )

  // if a complex object exists in cache, return a circular reference
  if ( ['Object','Array'].indexOf(objectClassName) !== -1 ) {
    const pathToCircularReference = getPathToCircularRef( obj, cache.objects, cache.paths )
    if ( pathToCircularReference.length ) {
      let objProps = mapObjProps( objName, cache.index, 'CircularReference', opts, [ ], pathToCircularReference )
      return { cache, objProps }
    }
  }

  // create a label for the current object and apply it
  currentPath.push( createLabel( opts.label, objectClassName, currentPath.length ) )
  let { updatedLabel, sparseKeys } = appendElementsLengthToLabel( obj, objectClassName, currentPath.slice(-1)[0] )
  opts.label = updatedLabel

  // add to cache
  cache.objects.push( obj )
  cache.paths.push( currentPath )
  let objProps = mapObjProps( objName, cache.index, objectClassName, opts, [ ], currentPath )

  // recurse through complex objects
  if ( ['Object','Array'].indexOf(objectClassName) !== -1 ) {
    cache.level++  // for level throttling later
    for ( let i of sparseKeys ) {
      let { objProps:child } = getObjProps( obj[i], opts={expand:opts.expand}, cache, [...currentPath], i )
      objProps.children.push(child)
    }
  }

  return { cache, objProps }


   // top label only can be passed in for convenience
  function createLabel(label, objectClassName, len ) {
    let nl = objectClassName
    if ( len !== 0 ) {
      return nl
    }
    if ( !label.length ) {
      return nl
    }
    return label + ' - ' + nl
  }


  function appendElementsLengthToLabel( obj, objectClassname, label ) {
    let sparseKeys = [ ]
    let updatedLabel = label

    // not an Object or Array
    if ( ['Object','Array'].indexOf(objectClassName) === -1 ) {
      return { updatedLabel, sparseKeys }
    }

    // label should show number of elements for complex objects, not in currentPath
    if ( objectClassName === 'Object' ) {
      sparseKeys = Object.keys(obj).sort()
    } else {
      sparseKeys = Object.keys(obj)
    }
    updatedLabel+= `[${sparseKeys.length}]`
    return { updatedLabel, sparseKeys }
  }


  function mapObjProps( name, index, objectClassName, opts, children, path ) {
    return {name, index, objectClassName, opts, children, path }
  }

}

export default getObjProps
