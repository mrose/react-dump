import React from 'react'
import '../reactdump.css'
//import './toggly'
import { format, isRegExp } from 'util'

const defaultProps = {
    // the variable to be dumped
    obj: null
  , collapse: false
    // quack. sometimes an array of types which should appear expanded
  , expand: true
  , hide: null
    // data types that should be hidden
  , hideTypes: null
    // an arbitrary string label to display as a header
  , label: null
    // number of nested levels to display
  , levels: null
  , show: null
    // boolean that determines whether keys are sorted when an object is a struct
  , sortKeys: true
    // maximum number of rows to be shown
  , top: null
} // assigned to component after component definition, no hoisting within

/*
const applicableCFOPTS = {
    var: null // Variable to display
  , output: 'browser' // where to send results browser|console|file
  , expand: true // expands views
  , format: 'html' // output text or HTML format
  , hide: null // hide column or keys
  , keys: null // For a structure, number of keys to display
  , label: null // string header for the dump output
  , show: null // show column or keys
  , top: null // The number of rows to display. For a structure, this is the number of nested levels to display (useful for large stuctures)
}
*/
/*
const reactdumptoggleSource = (source) => {
  if (source.style.fontStyle === 'italic') {
    source.style.fontStyle='normal'
    source.title='" + TITLEEXPANDED + "'
    return 'open'
  }

  source.style.fontStyle='italic'
  source.title='" + TITLECOLLAPSED + "'
  return 'closed'
}

const reactdumptoggleTarget = (target,switchToState) => {
  target.style.display = (switchToState === 'open') ? '' : 'none'
}

const reactdumptoggleRow = (source) => {
  this.reactdumptoggleTarget(source.parentNode.lastChild,this.reactdumptoggleSource(source))
}

const reactdumptoggleTable = (source) => {
  let switchToState=this.reactdumptoggleSource(source)
  let table=source.parentNode.parentNode
  for (let i=1;i<table.childNodes.length;i++) {
    let target=table.childNodes[i]
    if( target.style) {
      this.reactdumptoggleTarget(target,switchToState)
    }
  }
}
*/
// output related constants
const TABLE = '<table class="reactdump reactdump-%s"><tbody>%s</tbody></table>'
const ROWHEADER = '<tr><th colspan="2" class="reactdump-label reactdump-%s"%s onclick="reactdumptoggleTable(this)">%s</th></tr>'
const ROW = '<tr%s><td class="reactdump-label reactdump-%s"%s onclick="{toggleRow}">%s</td><td class="reactdump-data"%s>%s</td></tr>'
const ROWHEADER1COL = '<tr><th class="reactdump-label reactdump-%s"%s onclick="reactdumptoggleTable(this)">%s</th></tr>'
const ROW1COL = '<tr%s><td class="reactdump-data">%s</td></tr>'
const EMPTY = ' [empty]'
const ROWHEADEREMPTY = '<tr><th class="reactdump-%s">%s%s</th></tr>'
const ROWEMPTY = '<tr><td class="reactdump-%s">%s%s</td></tr>'
const TITLEEXPANDED = ''
const TITLECOLLAPSED = ''
const TITLEFILTERED = ' [Filtered - %s]'
const TITLEFILTEREDSHOWN = '%d of %d items shown'
const TITLEFILTEREDHIDDEN = '%d of %d items hidden'
const TITLEFILTEREDTOP = 'Top %d of %d items shown'
const TITLEFILTEREDLEVELS = '%d levels shown'
const EXPANDEDLABELSTYLE = ' title="' +  TITLEEXPANDED + '"'
const COLLAPSEDLABELSTYLE = ' style="font-style: italic;" title="' + TITLECOLLAPSED + '"'
const COLLAPSEDSTYLE = ' style="display:none"'
const CIRCULARSPLITSTRING = ' &raquo; '
const CIRCULARTOPSTRINGLIMIT = 12
const TOP = '[TOP]'
// below 2 are used as literals in the CSS
const CIRCULARREFERENCE = 'Circular-Reference'
const ERRORDATATYPE = 'Error-thrown'


export default class Dump extends React.Component {

  toggleRow = (e) => {
    alert('got here')
  }

  render() {
    // dangerouslySetInnerHTML renders the generated output within the inner
    // not using it just outputs the generated output as <pre>
    const h = this.dump( this.props )
    return (
      <div dangerouslySetInnerHTML={{__html: h }} />
    )
  }
//      <pre>{this.dump(this.props.opts)}</pre>


   // @returns {html|String}
  dump = ({obj, ...opts}) => {
    let cache = { bFilteredLevel: false }
    let topPath = TOP
    if (opts.label) {
      opts.label += ' - ' + this.getDataType(obj)
      /*
      topPath += ' ' + options.label;
      if(topPath.length > CIRCULARTOPSTRINGLIMIT)
        topPath = topPath.substr(0, CIRCULARTOPSTRINGLIMIT) + '...';
        topPath += ' - ' + dataType;
      */
    }
    return this.dumpObject(obj, opts, cache, [topPath])
  }


   /*
    * Captures output recursively
    *
    * @param {any} obj
    * @param {object} options
    * @param {object} cache
    * @param {array} currentPath
    * @returns {string}
    */
// consider using a generator function???
  dumpObject = (obj, options, cache = {}, currentPath=[]) => {
    let data = ''
    let dataType = this.getDataType(obj)
    let isSimpleType = (['String','Number','Boolean','Undefined','Null','Date','Math'].indexOf(dataType) >= 0)
    let label = dataType
    let expand = true
    let expandCells = true

    switch (dataType) {

      case 'Boolean':
        data += this.doBooleanDataType(obj, dataType, label, expand, expandCells)
        break;

      case 'String':
        data += this.doStringDataType(obj, dataType, label, expand, expandCells)
        break;

      case 'Math':
      case 'Undefined':
      case 'Null':
        data += this.doRow1Col(dataType, label, expand)
        break;

      case 'Date':
      case 'Number':
        data += this.doRow(dataType, label, obj.toString(), expand, expandCells)
        break;

      case 'RegExp':
      case 'Error':
        data += this.doRowHeader1Col(dataType, label, this.expandedOrCollapsed(options, dataType) )
        data += this.doRow1Col(dataType, obj.toString(), this.expandedOrCollapsed(options, dataType) )
        break;

      case 'Function':
        data += this.doFunctionDataType(obj, dataType, label, this.expandedOrCollapsed(options, dataType) )
        break;

      default:
        if (isSimpleType) {
          data += this.doRow(dataType, label, obj.toString(), expand, expandCells)
        } else {
          // case 'Array':
          // case 'Object':
          // default complex type
          data += this.doComplexDataType(obj, dataType, label, expand, options, cache, currentPath)
        }

    } // switch

    return this.doTable( dataType, data )
  }

  doBooleanDataType = (obj, dataType, label, expand, expandCells) => {
    let val = '<span class="'+(obj ? 'reactdump-yes' : 'reactdump-no')+'">' + obj + '</span>'
    return this.doRow(dataType, label, val, expand, expandCells)
  }

  doStringDataType = (obj, dataType, label, expand, expandCells) => {
    if (obj.length !== 0) {
      let val = this.escapeHtml(obj)
      //var val = '<pre><code class="lang-html">' + hljs.highlight('xml', obj).value + '</code></pre>';
      return this.doRow(dataType, label, val, expand, expandCells)
    }
    return this.doRowEmpty(dataType, label)
  }

  doFunctionDataType = (obj, dataType, label, expand) => {
    let txt = this.escapeHtml(obj.toString().replace(/\t/g, ''))
    return this.doRowHeader1Col(dataType, label, expand) + this.doRow1Col(dataType, '<pre><code class="lang-javascript">' + txt + '</code></pre>', expand)
  }

  doComplexDataType = (obj, dataType, label, expand, options, cache, currentPath) => {

    // check for circular references
    let circPath = this.getPathToCircularRef(obj, cache, currentPath)
    if (circPath.length > 0) {
      return this.doRow(CIRCULARREFERENCE, CIRCULARREFERENCE, circPath.join(CIRCULARSPLITSTRING), expand)
    }

    // set keys to collapse if an array of types was passed for expand and the current data-type is one of them
    let expandCells = (typeof options.expand === 'object' && expand) ? false : expand
    let data = ''
    let key, val
    let loopObj = this.newLoopObj(obj, dataType, options.sortKeys)
    let filtered = []
    let bFilteredTop = false
    let numTotalKeys = loopObj.length
    let numKeysShown = 0
    let numKeysHidden = 0
    let bIsFirstCall = (currentPath.length === 0)

    cache.level++

    if (numTotalKeys === 0) {
      return this.doRowHeaderEmpty(dataType, label)
    }

    for (let i = 0; i < loopObj.length; i++) {
      key = loopObj[i]
// todo don't like data updated by reference
      val = this.resolveObjKey(obj, key, dataType, expandCells, data)
      let { bContinue, numKeysHidden, bFilteredTop } = this.doComplexObjFirstCall(currentPath, numKeysHidden, numKeysShown, options, key)
      if (!bContinue) break;

      // increment numKeysHidden when hiding requested types
      numKeysHidden = this.skipComplexObjHiddenTypes(obj, options, numKeysHidden )

      // numKeysShown is incremented regardless of hidden or not
      numKeysShown++

      // update cache & write row if requested level exists and is exceeded
// todo: ddon't like data updated by reference
      cache = this.cacheFilteredLevel(options, currentPath, cache, dataType, key, data)

      let subPath = this.clone(currentPath, 'Array').push(key)

      // recursively dump...
      data += this.doRow(dataType, key, this.dumpObject(val, options, cache, subPath), expand, expandCells)
    } // loop dun

    if (bIsFirstCall) {
      if (numKeysShown !== numTotalKeys) {
        if (options.show || options.hideTypes) {
          filtered.push(format(TITLEFILTEREDSHOWN, numKeysShown, numTotalKeys))
        } else if(options.hide) {
          filtered.push(format(TITLEFILTEREDHIDDEN, numKeysHidden, numTotalKeys))
          numTotalKeys -= numKeysHidden
        }
        if (!(options.show || options.hideTypes) && bFilteredTop) {
          filtered.push(format(TITLEFILTEREDTOP, numKeysShown, numTotalKeys))
        }
      }
      if (cache.bFilteredLevel) {
        filtered.push(format(TITLEFILTEREDLEVELS, options.levels))
      }
    } else if (options.hideTypes && numKeysShown !== numTotalKeys) {
      // show the filtered label for types being hidden
      filtered.push(format(TITLEFILTEREDSHOWN, numKeysShown, numTotalKeys))
    }

    if (filtered.length > 0) {
      label += format(TITLEFILTERED, filtered.join(', '))
    }

    return this.doRowHeader(dataType, label, expand) + data
  }

  // hard to understand when this would ever happen...
  doComplexObjFirstCall = (currentPath, numKeysHidden, numKeysShown, options, key) => {
    let bIsFirstCall = (currentPath.length === 0)
    let r = {
        bContinue: true
      , numKeysHidden: numKeysHidden
      , bFilteredTop: false
    }

    if (bIsFirstCall) {
      // hide when:
      // options.show is false when options.show is boolean
      // or when options.show is struct and the key is found
      // or when options.show is an array and the numeric key is found
      if(!(!options.show || (options.show.length && (options.show.indexOf(key) >= 0 || options.show.indexOf(Number(key)) >= 0)))){
        r.numKeysHidden = numKeysHidden++
      } else if (options.hide && options.hide.length && (options.hide.indexOf(key) >= 0 || options.hide.indexOf(Number(key)) >= 0 || options.hide.filter(isRegExp).some( (regExp) => regExp.test(key) ))) {
        r.numKeysHidden = numKeysHidden++
      }
      if(options.top > 0 && numKeysShown === options.top){
        r.bFilteredTop = true
        r.bContinue = false
      }
    }
    return r
  }

  //  skip any data types that should be hidden
  skipComplexObjHiddenTypes = (obj, options, numKeysHidden ) => {
    let r = numKeysHidden
    let dataType = this.getDataType(obj)

    if (options.hideTypes &&
       (options.hideTypes.indexOf(dataType) > -1 || options.hideTypes.indexOf(dataType.toLowerCase()) > -1) ) {
      r++
    }

    return r
  }


  newLoopObj = (obj, dataType, sortKeys) => {
    let loopObj = []
    for (let key in obj) {
      loopObj.push(key)
    }

    if (dataType !== 'Array' && sortKeys) {
      // note implicit return on fat arrow fn
      loopObj.sort( (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()) )
    }

    return loopObj
  }

  resolveObjKey = (obj, key, dataType, expandCells, data) => {
    let val
    try {
      val = obj[key]
    } catch(err) {
      let errorRow = this.doRowHeader1Col(ERRORDATATYPE, ERRORDATATYPE, true) + this.doRow1Col(ERRORDATATYPE, err.toString(), true)
        // + this.doRow1Col(ERRORDATATYPE, '<pre><code class="lang-javascript">'+hljs.highlight('javascript', errThrown).value+'</code></pre>', true);
        data += this.doRow(dataType, key, this.doTable( ERRORDATATYPE, errorRow), expandCells)
    }
    return val
  }

  // figure out if it should be expanded/collapsed
  expandedOrCollapsed = (options, dataType) => {
    let {expand} = options
    let ret = expand

    if (typeof options.expand === 'object') {
      ret = expand.indexOf(dataType) > -1 || expand.indexOf(dataType.toLowerCase()) > -1;
    }

    if (ret) {
      if ( options.collapse === true
        || ( typeof options.collapse === 'object'
             && (options.collapse.indexOf(dataType) > -1
             || options.collapse.indexOf(dataType.toLowerCase()) > -1)
           )
      ) {
        ret = false
      }
    }

    return ret
  }

  cacheFilteredLevel = (options, currentPath, cache, dataType, key, data) => {
    let r = cache
    if (options.levels !== null && currentPath.length > options.levels) {
      r.bFilteredLevel = true
      data += this.doRow(dataType, key, '', true)
    }
    return r
  }

  doTable = (dataType, data) => {
    return format(TABLE, dataType, data)
  }

  // Builds the style tag for the headers of tables
  doHeaderStyle = (dataType, expand) => {
    return expand ? EXPANDEDLABELSTYLE : COLLAPSEDLABELSTYLE
  }

   // Builds the style tag for a row
  doRowStyle = (dataType, expand) => {
    return expand ? '' : COLLAPSEDSTYLE
  }

   // Builds the style tag for the label cell
  doCellLabelStyle = (expand) => {
    return expand ? EXPANDEDLABELSTYLE : COLLAPSEDLABELSTYLE
  }

   // Builds the style tag for the data cell
  doCellStyle = (expand) => {
    return expand ? '' : COLLAPSEDSTYLE
  }

  /*
   * Builds the header row of a table
   *
   * @param {string} dataType
   * @param {string} data
   * @param {Boolean} expand
   * @returns {string}
   */
  doRowHeader = (dataType, data, expand) => {
    return format(ROWHEADER, dataType, this.doHeaderStyle(dataType, expand), data)
  }

  /*
   * Builds a regular two column row
   *
   * @param {string} dataType
   * @param {string} label
   * @param {string} data
   * @param {Boolean} expand
   * @param {Boolean} expandCell
   * @returns {string}
   */
  doRow = (dataType, label, data, expand, expandCell) => {
    return format(
        ROW
      , this.doRowStyle(dataType, expand)
      , dataType
      , this.doCellLabelStyle(expandCell)
      , label
      , this.doCellStyle(expandCell)
      , data
    )
  }

  /*
   * Builds the header row for a 1 column table
   *
   * @param {string} dataType
   * @param {string} data
   * @param {Boolean} expand
   * @returns {string}
   */
  doRowHeader1Col = (dataType, data, expand) => {
    return format(ROWHEADER1COL, dataType, this.doHeaderStyle(dataType, expand), data)
  }

  /*
   * Builds the 1 column row
   * @param {string} dataType
   * @param {string} data
   * @param {Boolean} expand
   * @returns {string}
   */
  doRow1Col = (dataType, data, expand) => {
    return format(ROW1COL, this.doRowStyle(dataType, expand), data)
  }

  // Builds the empty row
  doRowEmpty = (dataType, data) => {
    return format(ROWEMPTY, dataType, data, EMPTY)
  }

   // Builds the header row for empty vars
  doRowHeaderEmpty = (dataType, data) => {
    format(ROWHEADEREMPTY, dataType, data, EMPTY)
  }

   // Encodes HTML strings so they are displayed as such
  escapeHtml = (html) => {
    return String(html)
      .replace(/&(?!\w+;)/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  /*
   * Figures out the datatype of a variable
   * @param {any} obj
   * @returns {string|getDataType.dataType}
   */
  getDataType = (obj) => {
    // used to figure out the datatype of a variable
    const toClass = {}.toString
    let dataType = toClass.call( obj )
    dataType = dataType.split(' ')[1]
    dataType = dataType.substring(0, dataType.length-1)
    return dataType
  }

  // todo - deepcopy issues???
  /*
   * Clones variables to avoid pass by reference issues
   *
   * @param {any} orig
   * @param {optional|string} dataType
   * @returns {clone.newArray|Array|clone.orig}
   */
  clone = (orig, dataType) => {
    if (!dataType) {
      dataType = this.getDataType(orig)
    }

    if (dataType === 'Array') {
      // let newArray = [...orig]
      let newArray = []
      for (let i = 0; i < orig.length; i++) {
        newArray.push(orig[i])
      }
      return newArray
    }

    if (dataType === 'Object') {
      let newObject = {}
      for (let key in orig) {
        newObject[key] = this.clone(orig[key])
      }
      return newObject
    }

    return orig
  }

  /*
   * Returns a path to the original variable if the current one is a circular reference
   *
   * @param {any} obj
   * @param {object} cache
   * @param {array} currentPath
   * @returns {Array}
   */
  getPathToCircularRef = (obj, cache, currentPath) => {
    let circPath = []

    if (typeof obj !== 'object') {
      return circPath
    }

    if (!cache.objects) {
      cache.objects = []
      cache.paths = []
    }

    let pos = cache.objects.indexOf(obj)
    if (pos >= 0) {
      circPath = cache.paths[pos]
    }

    cache.objects.push(obj)
    cache.paths.push(currentPath)

    return circPath
  }

}

Dump.defaultProps = defaultProps
