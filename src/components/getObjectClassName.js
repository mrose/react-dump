const getObjectClassName = (obj) => {
  const toString = Object.prototype.toString
  let c = toString.call( obj )
  c = c.split(' ')[1]
  c = c.substring(0, c.length-1)
  return c
}
export default getObjectClassName
