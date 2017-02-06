// returns tree cache of elements
import getObjectClassName from './getObjectClassName'

const getCacheForObj = (obj, opts={}, cache, currentPath) => {
  var sparseKeys = []

  obj = obj || new Error('No object provided') // Error when no object provided
  opts.label = opts.label || '' // string label for object
  opts.expand = opts.expand || true // boolean, expands/collapses cells
  cache = cache || {
                        bFilteredLevel: false
                      , level:0
                      , objects: []
                      , paths: []
                      , opts: []
                    }
  currentPath = currentPath || []
/*
// in previous versions, opts.expand could be an array of object class names to expand
, opts.output: 'browser' // NOT IMPLEMENTED where to send results browser|console|file
, opts.format: 'html' // NOT IMPLEMENTED output text or HTML format
, opts.hide: null // NOT IMPLEMENTED hide column or keys
, opts.keys: null // NOT IMPLEMENTED For a structure, number of keys to display
, opts.show: null // NOT IMPLEMENTED show column or keys
, opts.top: null // NOT IMPLEMENTED The number of rows to display. For a structure, this is the number of nested levels to display (useful for large stuctures)
*/

  const objectClassName = getObjectClassName(obj)
  opts.label = createLabel(opts.label, objectClassName, currentPath )
  currentPath.push(opts.label)

  // for complex objects, label will show number of elements
  if ( ['Object','Array'].indexOf(objectClassName) !== -1 ) {
    if ( objectClassName === 'Object' ) {
      sparseKeys = Object.keys(obj).sort()
    } else {
      sparseKeys = Object.keys(obj)
    }
    opts.label+= ` (${sparseKeys.length})`
  }

  // push
  cache.objects.push( obj )
  cache.paths.push( currentPath )
  cache.opts.push( opts )

  // recurse
  if ( ['Object','Array'].indexOf(objectClassName) !== -1 ) {
    cache.level++

    for ( let i of sparseKeys ) {
      let element = obj[i]
      getCacheForObj(element, opts={expand:opts.expand}, cache, [...currentPath])
    }

  }

  return cache

   // top label only can be passed in for convenience
  function createLabel(label, objectClassName, currentPath ) {
    let nl = objectClassName
    if ( currentPath.length !== 0 ) {
      return nl
    }
    if ( !label.length ) {
      return nl
    }
    return label + ' - ' + nl
  }

}

export default getCacheForObj
