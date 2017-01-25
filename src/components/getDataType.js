const getDataType = (obj) => {
  const toString = Object.prototype.toString
  let dataType = toString.call( obj )
  dataType = dataType.split(' ')[1]
  dataType = dataType.substring(0, dataType.length-1)
  return dataType
}
export default getDataType
