const getDataType = (obj) => {
  const toClass = {}.toString
  let dataType = toClass.call( obj )
  dataType = dataType.split(' ')[1]
  dataType = dataType.substring(0, dataType.length-1)
  return dataType
}
export default getDataType
