/*
 * Returns a path to the original variable if the current one is a circular reference
 *
 * @param {any} obj
 * @param {object} cache
 * @param {array} currentPath
 * @returns {Array}
 */
const getPathToCircularRef = (obj, cache, currentPath) => {
    let circPath = []

    if (typeof obj !== 'object') {
      return circPath
    }

    let pos = cache.objects.indexOf(obj)
    if (pos >= 0) {
      circPath = cache.paths[pos]
    }

    cache.objects.push(obj)
    cache.paths.push(currentPath)

    return circPath
  }
export default getPathToCircularRef
