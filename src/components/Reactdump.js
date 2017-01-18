import React from 'react'
import '../reactdump.css'
import { format, isRegExp } from 'util'

// Default options at bottom see Dump.defaultProps

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

// output related constants
const TABLE = '<table class="reactdump reactdump-%s"><tbody>%s</tbody></table>'
let ROWHEADER = '<tr><th colspan="2" class="reactdump-label reactdump-%s"%s onclick="{this.reactdumptoggleTable(this)}">%s</th></tr>'
let ROW = '<tr%s><td class="reactdump-label reactdump-%s"%s onclick="{this.reactdumptoggleRow()}">%s</td><td class="reactdump-data"%s>%s</td></tr>'
let ROWHEADER1COL = '<tr><th class="reactdump-label reactdump-%s"%s onclick="{this.reactdumptoggleTable(this)}">%s</th></tr>'
let ROW1COL = '<tr%s><td class="reactdump-data">%s</td></tr>'
let EMPTY = ' [empty]'
let ROWHEADEREMPTY = '<tr><th class="reactdump-%s">%s%s</th></tr>'
let ROWEMPTY = '<tr><td class="reactdump-%s">%s%s</td></tr>'
let TITLEEXPANDED = ''
let TITLECOLLAPSED = ''
let TITLEFILTERED = ' [Filtered - %s]'
let TITLEFILTEREDSHOWN = '%d of %d items shown'
let TITLEFILTEREDHIDDEN = '%d of %d items hidden'
let TITLEFILTEREDTOP = 'Top %d of %d items shown'
let TITLEFILTEREDLEVELS = '%d levels shown'
let EXPANDEDLABELSTYLE = ' title="' +  TITLEEXPANDED + '"'
let COLLAPSEDLABELSTYLE = ' style="font-style: italic;" title="' + TITLECOLLAPSED + '"'
let COLLAPSEDSTYLE = ' style="display:none"'
let CIRCULARSPLITSTRING = ' &raquo; '
let CIRCULARTOPSTRINGLIMIT = 12
const TOP = '[TOP]'
// below 2 are used as literals in the CSS
let CIRCULARREFERENCE = 'Circular-Reference'
let ERRORDATATYPE = 'Error-thrown'


export default class Dump extends React.Component {

  reactdumptoggleSource = (source) => {
    if (source.style.fontStyle === 'italic') {
      source.style.fontStyle='normal'
      source.title='" + TITLEEXPANDED + "'
      return 'open'
    }

    source.style.fontStyle='italic'
    source.title='" + TITLECOLLAPSED + "'
    return 'closed'
  }

  reactdumptoggleTarget = (target,switchToState) => {
    target.style.display = (switchToState === 'open') ? '' : 'none'
  }

  reactdumptoggleRow = (source) => {
    this.reactdumptoggleTarget(source.parentNode.lastChild,this.reactdumptoggleSource(source))
  }

  reactdumptoggleTable = (source) => {
    let switchToState=this.reactdumptoggleSource(source)
    let table=source.parentNode.parentNode
    for (let i=1;i<table.childNodes.length;i++) {
      let target=table.childNodes[i]
      if( target.style) {
        this.reactdumptoggleTarget(target,switchToState)
      }
    }
  }

  render() {
    // dangerouslySetInnerHTML renders the generated output within the inner
    // not using it just outputs the generated output as <pre>
    const h = this.dump( this.props )
    return (
      <div dangerouslySetInnerHTML={{__html: h }} >
      </div>
    )
  }
//      <pre>{this.dump(this.props.opts)}</pre>


  /*
   * dump a variable
   *
   * @param {options} options
   * @returns {html|String}
   */
  dump = (obj, ...opts) => {
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
    let currentPath = [topPath]

    return this.dumpObject(obj, opts, cache, currentPath)
  }


   /*
    * Does all the dirty laundry of capturing variable output, recursively
    *
    * @param {any} obj
    * @param {objects} cache
    * @param {array} currentPath
    * @param {objects} options
    * @returns {string}
    */
  dumpObject = (obj, options, cache = {}, currentPath=[]) => {
    var data = ''
    let dataType = this.getDataType(obj)
    let isSimpleType = (['String','Number','Boolean','Undefined','Null','Date','Math'].indexOf(dataType) >= 0)
    let label = dataType
    let expand = true
    let expandCells = true
    let bEmpty = false
    let bHeader = !isSimpleType


    switch (dataType) {

      case 'Boolean':
        data = this.doBooleanDataType(obj, dataType, label, expand, expandCells)
        break;

      case 'String':
        data = this.doStringDataType(obj, dataType, label, expand, expandCells)
        break;

      case 'Math':
      case 'Undefined':
      case 'Null':
        data = this.doRow1Col(dataType, label, expand)
        break;

      case 'Date':
      case 'Number':
        data = this.doRow(dataType, label, obj.toString(), expand, expandCells)
        break;

      case 'RegExp':
      case 'Error':
        data += this.doRowHeader1Col(dataType, label, this.expandOrCollapse(options, dataType) )
        data += this.doRow1Col(dataType, obj.toString(), this.expandOrCollapse(options, dataType) )
        break;

      case 'Function':
        data += this.doFunctionDataType(obj, dataType, label, this.expandOrCollapse(options, dataType) )
        break;

      default:
        if (isSimpleType) {
          data = this.doRow(dataType, label, obj.toString(), expand, expandCells)
        } else {
          // case 'Array':
          // case 'Object':
          // default complex type
          data += this.doComplexDataType(obj, dataType, label, expand, options)



        }

    } // switch

/*

     // Non-Simple types
     if (!isSimpleType) {


       switch (dataType) {


         case 'Array':
         case 'Object':
         default:

           // check for circular references
           let circPath = this.getPathToCircularRef(obj, cache, currentPath)
           if (circPath.length > 0) {
             dataType = CIRCULARREFERENCE
             data = this.doRow(dataType, dataType, circPath.join(CIRCULARSPLITSTRING), expand)
           } else {
             let subPath
             let loopObj = []
             for (let key in obj) {
               loopObj.push(key)
             }

             if (dataType !== 'Array' && options.sortKeys) {
               // note implicit return on fat arrow fn
               loopObj.sort( (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()) )
             }

             cache.level++
             let filtered = []
             let bFilteredTop = false
             let numTotalKeys = loopObj.length
             let key, val
             let numKeysShown = 0
             let numKeysHidden = 0ß
             let errThrown
             for (let i = 0; i < loopObj.length; i++) {
               key = loopObj[i]
               errThrown = ''
               try {
                 val = obj[key]
               } catch(err) {
                 errThrown = err.toString()
               }

               if (bIsFirstCall) {
                 if(!(!options.show || (options.show.length && (options.show.indexOf(key) >= 0 || options.show.indexOf(Number(key)) >= 0)))){
                   numKeysHidden++
                   continue
                 } else if (options.hide && options.hide.length && (options.hide.indexOf(key) >= 0 || options.hide.indexOf(Number(key)) >= 0 || options.hide.filter(util.isRegExp).some( (regExp) => regExp.test(key) ))) {
                   numKeysHidden++
                   continue
                 }
                 if(options.top > 0 && numKeysShown === options.top){
                   bFilteredTop = true;
                   break;
                 }
               }
               // skip any data types that should be hidden
               if (options.hideTypes) {
                 let subDataType = this.getDataType(val)
                 if (options.hideTypes.indexOf(subDataType) > -1 || options.hideTypes.indexOf(subDataType.toLowerCase()) > -1) {
                   numKeysHidden++
                   continue
                 }
               }

               numKeysShown++
               if (options.levels !== null && currentPath.length > options.levels) {
                 cache.bFilteredLevel = true
                 data += this.doRow(dataType, key, '', true)
                 continue
               }

               if (errThrown.length > 0) {
                 let errorRow = this.doRowHeader1Col(ERRORDATATYPE, ERRORDATATYPE, true)
                 + this.doRow1Col(ERRORDATATYPE, errThrown, true)
 //                        + this.doRow1Col(ERRORDATATYPE, '<pre><code class="lang-javascript">'+hljs.highlight('javascript', errThrown).value+'</code></pre>', true);
                 data += this.doRow(dataType, key, doTable({ERRORDATATYPE}, {errorRow}), expandCells)
                 continue
               }

               subPath = this.clone(currentPath, 'Array')
               subPath.push(key)

               data += this.doRow(dataType, key, this.dumpObject(val, cache, ß, options), expand, expandCells)
             }

             if (numTotalKeys === 0) {
               bEmpty = true
             } else {
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
               data = this.doRowHeader(dataType, label, expand) + data
             }
           }
         break;
       }

     }

       if (bEmpty) {
         data = bHeader ? this.doRowHeaderEmpty(dataType, label) : this.doRowEmpty(dataType, label);
       }
*/
        return this.doTable( dataType, data )
   }

  /*
   * output simple boolean datatype
   *
   */
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
      let data = ''
      let txt = obj.toString()
      data += this.doRowHeader1Col(dataType, label, expand)
/*
//           if(options.syntaxHighlight){
//             var purtyText = hljs.highlight('javascript', txt);
//             //var purtyText = hljs.highlightAuto(txt);
//             txt = purtyText.value;
//           } else {
//             var txt = this.escapeHtml(obj.toString());
//           }
*/
      txt = this.escapeHtml(obj.toString())

      data += this.doRow1Col(dataType, '<pre><code class="lang-javascript">'+txt+'</code></pre>', expand)
      //data += doRow1Col(dataType, '<pre><code>'+escapeHtml(obj.toString())+'</code></pre>', expand)
    return data
  }

  doComplexDataType = (obj, dataType, label, expand, options, cache, currentPath) => {

    // check for circular references
    let circPath = this.getPathToCircularRef(obj, cache, currentPath)
    if (circPath.length > 0) {
      dataType = CIRCULARREFERENCE
      return this.doRow(dataType, dataType, circPath.join(CIRCULARSPLITSTRING), expand)
    }

    // set keys to collapse if an array of types was passed for expand and the current data-type is one of them
    let expandCells = (typeof options.expand === 'object' && expand) ? false : expand

    let key, val, errThrown, subPath
    let loopObj = this.newLoopObj(obj, dataType, options.sortKeys)
    let filtered = []
    let bFilteredTop = false
    let numTotalKeys = loopObj.length
    let numKeysShown = 0
    let numKeysHidden = 0
    let bIsFirstCall = (currentPath.length === 0)

    cache.level++

    for (let i = 0; i < loopObj.length; i++) {
      key = loopObj[i]
      let { errThrown, val } = this.resolveObjKey(obj, key)
      let { bContinue, numKeysHidden, bFilteredTop, bIsFirstCall } = this.doComplexObjFirstCall(currentPath, numKeysHidden, numKeysShown, options, key)
      if (!bContinue) break;

      let { numKeysHidden } = this.skipComplexObjHiddenTypes(obj, options, numKeysHidden )

      numKeysShown++
      if (options.levels !== null && currentPath.length > options.levels) {
        cache.bFilteredLevel = true
        data += this.doRow(dataType, key, '', true)
        continue
      }

      if (errThrown.length > 0) {
        let errorRow = this.doRowHeader1Col(ERRORDATATYPE, ERRORDATATYPE, true)
        + this.doRow1Col(ERRORDATATYPE, errThrown, true)
//                        + this.doRow1Col(ERRORDATATYPE, '<pre><code class="lang-javascript">'+hljs.highlight('javascript', errThrown).value+'</code></pre>', true);
        data += this.doRow(dataType, key, this.doTable({ERRORDATATYPE}, {errorRow}), expandCells)
        continue
      }

      subPath = this.clone(currentPath, 'Array')
      subPath.push(key)

      data += this.doRow(dataType, key, this.dumpObject(val, cache, subPath, options), expand, expandCells)
    }

    if (numTotalKeys === 0) {
      bEmpty = true
    } else {
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
      data = this.doRowHeader(dataType, label, expand) + data
    }
  }

//break;
//}



  // }

  // hard to understand when this would ever happen...
  doComplexObjFirstCall = (currentPath, numKeysHidden, numKeysShown, options, key) => {
    let r = {
        bContinue: true
      , numKeysHidden: numKeysHidden
      , bFilteredTop: false
      , bIsFirstCall: (currentPath.length === 0)
    }

    if (r.bIsFirstCall) {
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
    let r = { numKeysHidden: numKeysHidden }
    let dataType = this.getDataType(obj)

    if (options.hideTypes &&
       (options.hideTypes.indexOf(dataType) > -1 || options.hideTypes.indexOf(dataType.toLowerCase()) > -1) ) {
      r.numKeysHidden++
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

  resolveObjKey = (obj, key) => {
    let r = { errThrown:'' }
    try {
      r.val = obj[key]
    } catch(err) {
      r.errThrown = err.toString()
    }
    return r
  }


  // figure out if it should be expanded/collapsed
  expandOrCollapse = (options, dataType) => {
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


  /*
   * Creates tables
   *
   * @param {string} dataType
   * @param {string} data body for the table
   * @returns the output for the table
   */
  doTable = (dataType, data) => {
    return format(TABLE, dataType, data)
  }

  /*
   * Builds the style tag for the headers of tables
   *
   * @param {string} dataType
   * @param {Boolean} expand
   * @returns {String|EXPANDEDLABELSTYLE|COLLAPSEDLABELSTYLE}
   */
  doHeaderStyle = (dataType, expand) => {
    return expand ? EXPANDEDLABELSTYLE : COLLAPSEDLABELSTYLE
  }

  /*
   * Builds the style tag for a row
   *
   * @param {string} dataType
   * @param {Boolean} expand
   * @returns {COLLAPSEDSTYLE|String}
   */
  doRowStyle = (dataType, expand) => {
    return expand ? '' : COLLAPSEDSTYLE
  }

  /*
   * Builds the style tag for the label cell
   *
   * @param {Boolean} expand
   * @returns {String|COLLAPSEDLABELSTYLE|EXPANDEDLABELSTYLE}
   */
  doCellLabelStyle = (expand) => {
    return expand ? EXPANDEDLABELSTYLE : COLLAPSEDLABELSTYLE
  }

  /*
   * Builds the style tag for the data cell
   *
   * @param {Boolean} expand
   * @returns {String|COLLAPSEDSTYLE}
   */
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
   * @param {string} key
   * @param {string} data
   * @param {Boolean} expand
   * @param {Boolean} expandCell
   * @returns {string}
   */
  doRow = (dataType, key, data, expand, expandCell) => {
    return format(
      ROW
      , this.doRowStyle(dataType, expand)
      , dataType
      , this.doCellLabelStyle(expandCell)
      , key
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

  /*
   * Builds the empty row
   *
   * @param {string} dataType
   * @param {string} data
   * @returns {string}
   */
  doRowEmpty = (dataType, data) => {
    return format(ROWEMPTY, dataType, data, EMPTY)
  }

  /*
   * Builds the header row for empty vars
   *
   * @param {string} dataType
   * @param {string} data
   * @returns {string}
   */
  doRowHeaderEmpty = (dataType, data) => {
    format(ROWHEADEREMPTY, dataType, data, EMPTY)
  }

  /*
   * Encodes HTML strings so they are displayed as such
   *
   * @param {string} html
   * @returns {string}
   */
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

  // tbd use immmutables?
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

Dump.defaultProps = {
    obj: null
  , collapse: false
  , expand: true // quack. sometimes an array of types which should appear expanded
  , hide: null
  , hideTypes: null // data types that should be hidden
  , label: null
  , levels: null
  , show: null
  , sortKeys: true
  , syntaxHighlight: false
  , top: null
}
