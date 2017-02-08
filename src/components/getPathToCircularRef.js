/*
 * Returns a path to the original variable if the current one is a circular reference
 *
 * @param {any} obj
 * @param {array} cacheObjects
 * @param {array} cachePaths
 * @returns {Array}
 *
 */
const getPathToCircularRef = (obj, cacheObjects, cachePaths) => {
    let pathToCircularReference = []

    if (typeof obj !== 'object') {
      return pathToCircularReference
    }

    let pos = cacheObjects.indexOf(obj)
    if (pos !== -1) {
      pathToCircularReference = cachePaths[pos]
      return pathToCircularReference
    }

    return pathToCircularReference
  }

export default getPathToCircularRef
