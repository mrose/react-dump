// returns tree cache of elements
import getObjectClassName from './getObjectClassName'
import uuid from 'uuid'


const getCacheForObj = (obj, opts={}, cache, currentPath, objName ) => {
//  const id = uuid.v4()

  obj = obj || new Error('No object provided') // Error when no object provided
  opts.label = opts.label || '' // string label for object
  opts.expand = opts.expand || true // boolean, expands/collapses cells
  opts.id = uuid.v4()
  cache = cache || {
                        bFilteredLevel: false
                      , level: 0
                      , index: -1
                      , objects: [ ]
                      , paths: [ ]
                      , children: [ ]
                    }
  currentPath = currentPath || [ ]
  objName = objName || ''

  // create a label for the current object and apply it
  const objectClassName = getObjectClassName( obj )
  currentPath.push( createLabel( opts.label, objectClassName, currentPath.length ) )
  let { updatedLabel, sparseKeys } = appendElementsLengthToLabel( obj, objectClassName, currentPath.slice(-1)[0] )
  opts.label = updatedLabel

  // push
  cache.index++
  cache.objects.push( obj )
  cache.paths.push( currentPath )

  let thisObj =  { name:objName
                 , index:cache.index
//                 , obj:obj
                 , objectClassName:objectClassName
                 , opts:opts
                 , children:[ ]
                 , currentPath:currentPath
               }

console.log( thisObj )
   cache.children.push( thisObj )
//   cache.children = thisObj.children

  // recurse
  if ( ['Object','Array'].indexOf(objectClassName) !== -1 ) {
    cache.level++
    for ( let i of sparseKeys ) {
      cache = getCacheForObj(obj[i], opts={expand:opts.expand}, cache, [...currentPath], i )
    }
  }

  return cache


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



}

export default getCacheForObj
