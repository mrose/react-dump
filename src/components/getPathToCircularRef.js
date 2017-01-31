/*
 * Returns a path to the original variable if the current one is a circular reference
 *
 * @param {any} obj
 * @param {object} cache
 * @param {array} currentPath
 * @returns {Array}
 *
 * cache = {
 *   bFilteredLevel: false
 *   , level:0
 *   , objects: []
 *   , paths: []
 *   }
 */

const getPathToCircularRef = (obj, cache, currentPath) => {
    let circPath = []

    if (typeof obj !== 'object') {
      return circPath
    }

    let pos = cache.objects.indexOf(obj)
    if (pos !== -1) {
      circPath = cache.paths[pos]
      return circPath
    }

    cache.objects.push(obj)
    cache.paths.push(currentPath)

    return circPath
  }
export default getPathToCircularRef
