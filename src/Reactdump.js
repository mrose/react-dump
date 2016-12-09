import React, { Component } from 'react';
import '../assets/reactdump.css'; // Tell Webpack that Reactdump.js uses these styles
import '../assets/toggly.js'; // tell webpack to include toggly
import { format } from 'util';

// Default options
var DEFAULTOPTS = {
  collapse: false
  ,dumpFunctionName: 'reactdump'
  ,expand: true
  ,hide:null
  ,hideTypes:null
  ,label:null
  ,levels: null
  ,show:null
  ,sortKeys: true
  ,syntaxHighlight:true
  ,top:null
};

// used to figure out the datatype of a variable
var toClass = {}.toString;

// list of simple types
var SIMPLETYPES = ['String','Number','Boolean','Undefined','Null','Date','Math'];

// output related constants
var TABLE = '<table class="reactdump reactdump-%s"><tbody>%s</tbody></table>';
var ROWHEADER = '<tr><th colspan="2" class="reactdump-label reactdump-%s"%s onclick="reactdump.toggleTable(this);">%s</th></tr>';
var ROW = '<tr%s><td class="reactdump-label reactdump-%s"%s onclick="reactdump.toggleRow(this);">%s</td><td class="reactdump-data"%s>%s</td></tr>';
var ROWHEADER1COL = '<tr><th class="reactdump-label reactdump-%s"%s onclick="reactdump.toggleTable(this);">%s</th></tr>';
var ROW1COL = '<tr%s><td class="reactdump-data">%s</td></tr>';
var EMPTY = ' [empty]';
var ROWHEADEREMPTY = '<tr><th class="reactdump-%s">%s%s</th></tr>';
var ROWEMPTY = '<tr><td class="reactdump-%s">%s%s</td></tr>';
var ERRORDATATYPE = 'Error-thrown';
var TITLEEXPANDED = '';
var TITLECOLLAPSED = '';
var TITLEFILTERED = ' [Filtered - %s]';
var TITLEFILTEREDSHOWN = '%d of %d items shown';
var TITLEFILTEREDHIDDEN = '%d of %d items hidden';
var TITLEFILTEREDTOP = 'Top %d of %d items shown';
var TITLEFILTEREDLEVELS = '%d levels shown';
var EXPANDEDLABELSTYLE = ' title="' +  TITLEEXPANDED + '"';
var COLLAPSEDLABELSTYLE = ' style="font-style: italic;" title="' + TITLECOLLAPSED + '"';
var COLLAPSEDSTYLE = ' style="display:none"';
var CIRCULARREFERENCE = 'Circular-Reference';
var CIRCULARSPLITSTRING = ' &raquo; ';
var CIRCULARTOPSTRINGLIMIT = 12;
var TOP = '[TOP]';

// exports.dump = dump;
export default class Reactdump extends Component {

  constructor(props) {
    super(props);
    this.dump = this.dump.bind(this);
    this.clone = this.clone.bind(this);
    this.doTable = this.doTable.bind(this);
    this.doHeaderStyle = this.doHeaderStyle.bind(this);
    this.doRowStyle = this.doRowStyle.bind(this);
    this.doCellLabelStyle = this.doCellLabelStyle.bind(this);
    this.doCellStyle = this.doCellStyle.bind(this);
    this.doRowHeader = this.doRowHeader.bind(this);
    this.doRow = this.doRow.bind(this);
    this.doRowHeader1Col = this.doRowHeader1Col.bind(this);
    this.doRow1Col = this.doRow1Col.bind(this);
    this.doRowEmpty = this.doRowEmpty.bind(this);
    this.doRowHeaderEmpty = this.doRowHeaderEmpty.bind(this);
    this.doInitialOutput = this.doInitialOutput.bind(this);
    this.escapeHtml = this.escapeHtml.bind(this);
    this.getDataType = this.getDataType.bind(this);
    this.getPathToCircularRef = this.getPathToCircularRef.bind(this);
    this.dumpObject = this.dumpObject.bind(this);
  }

  // prevent unnecessary render calls by adding conditional rendering logic
  // inside of shouldComponentUpdate()
  shouldComponentUpdate() {

  }

  render() {
    const d = {__html: this.dump(this.props.obj, this.props.opts) }
    return (
      <div dangerouslySetInnerHTML={d} />
    )
  }

  /*
   * Methods for building the output
   */

  /*
   * Creates tables
   *
   * @param {string} dataType
   * @param {string} data body for the table
   * @returns the output for the table
   */
  doTable(dataType, data) {
    return format(TABLE, dataType, data);
  }

  /*
   * Builds the style tag for the headers of tables
   *
   * @param {string} dataType
   * @param {Boolean} expand
   * @returns {String|EXPANDEDLABELSTYLE|COLLAPSEDLABELSTYLE}
   */
  doHeaderStyle(dataType, expand) {
    return expand ? EXPANDEDLABELSTYLE : COLLAPSEDLABELSTYLE;
  }

  /*
   * Builds the style tag for a row
   *
   * @param {string} dataType
   * @param {Boolean} expand
   * @returns {COLLAPSEDSTYLE|String}
   */
  doRowStyle(dataType, expand) {
    return expand ? '' : COLLAPSEDSTYLE;
  }

  /*
   * Builds the style tag for the label cell
   *
   * @param {Boolean} expand
   * @returns {String|COLLAPSEDLABELSTYLE|EXPANDEDLABELSTYLE}
   */
  doCellLabelStyle(expand) {
    return expand ? EXPANDEDLABELSTYLE : COLLAPSEDLABELSTYLE;
  }

  /*
   * Builds the style tag for the data cell
   *
   * @param {Boolean} expand
   * @returns {String|COLLAPSEDSTYLE}
   */
  doCellStyle(expand) {
    return expand ? '' : COLLAPSEDSTYLE;
  }

  /*
   * Builds the header row of a table
   *
   * @param {string} dataType
   * @param {string} data
   * @param {Boolean} expand
   * @returns {string}
   */
  doRowHeader(dataType, data, expand) {
    return format(ROWHEADER, dataType, this.doHeaderStyle(dataType, expand), data);
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
  doRow(dataType, key, data, expand, expandCell) {
    return format(
      ROW
      , this.doRowStyle(dataType, expand)
      , dataType
      , this.doCellLabelStyle(expandCell)
      , key
      , this.doCellStyle(expandCell)
      , data
    );
  }

  /*
   * Builds the header row for a 1 column table
   *
   * @param {string} dataType
   * @param {string} data
   * @param {Boolean} expand
   * @returns {string}
   */
  doRowHeader1Col(dataType, data, expand) {
    return format(ROWHEADER1COL, dataType, this.doHeaderStyle(dataType, expand), data);
  }

  /*
   * Builds the 1 column row
   * @param {string} dataType
   * @param {string} data
   * @param {Boolean} expand
   * @returns {string}
   */
  doRow1Col(dataType, data, expand) {
    return format(ROW1COL, this.doRowStyle(dataType, expand), data);
  }

  /*
   * Builds the empty row
   *
   * @param {string} dataType
   * @param {string} data
   * @returns {string}
   */
  doRowEmpty(dataType, data) {
    return format(ROWEMPTY, dataType, data, EMPTY);
  }

  /*
   * Builds the header row for empty vars
   *
   * @param {string} dataType
   * @param {string} data
   * @returns {string}
   */
  doRowHeaderEmpty(dataType, data) {
    format(ROWHEADEREMPTY, dataType, data, EMPTY);
  }

  /*
   * Outputs the initial markup necessary
   * @param {object} options
   * @returns {CSS|JS|SYNTAXHIGHLIGHTCSS|String}
   */
  doInitialOutput(options) {
// no syntax highlighting feature; see imports
//    return (options.syntaxHighlight? SYNTAXHIGHLIGHTCSS : '') + CSS + JS;
  }

  /*
   * Encodes HTML strings so they are displayed as such
   *
   * @param {string} html
   * @returns {string}
   */
  escapeHtml(html) {
    return String(html)
      .replace(/&(?!\w+;)/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  /*
   * Figures out the datatype of a variable
   * @param {any} obj
   * @returns {string|getDataType.dataType}
   */
  getDataType(obj) {
    var dataType = toClass.call( obj );
    dataType = dataType.split(' ')[1];
    dataType = dataType.substring(0, dataType.length-1);

    return dataType;
  }

  // tbd use immmutables?
  /*
   * Clones variables to avoid pass by reference issues
   *
   * @param {any} orig
   * @param {optional|string} dataType
   * @returns {clone.newArray|Array|clone.orig}
   */
  clone(orig, dataType) {
    if(!dataType)
      dataType = this.getDataType(orig);

    if(dataType == 'Array'){
      var newArray = [];
      for(var i = 0; i < orig.length; i++)
        newArray.push(orig[i]);

      return newArray;

    } else if(dataType == 'Object') {
      var newObject = {};
      for(var key in orig)
        newObject[key] = this.clone(orig[key]);

      return newObject;

    } else
      return orig;
  }

  /*
   * Returns a path to the original variable if the current one is a circular reference
   *
   * @param {any} obj
   * @param {object} cache
   * @param {array} currentPath
   * @returns {Array}
   */
  getPathToCircularRef(obj, cache, currentPath) {
    var circPath = [];
    if(typeof obj != 'object')
      return circPath;

    if(!cache.objects){
      cache.objects = [];
      cache.paths = [];
    }
    var pos = cache.objects.indexOf(obj);
    if(pos >= 0)
      circPath = cache.paths[pos];

    cache.objects.push(obj);
    cache.paths.push(currentPath);

    return circPath;
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
  dumpObject(obj, cache, currentPath, options) {
    // do this on the first call
    var data = '';
    var dataType = this.getDataType(obj);
    var isSimpleType = (SIMPLETYPES.indexOf(dataType) >= 0);
    var bFirstCall = (currentPath.length == 0);
    var label = dataType;
    var expand = true;
    var expandCells = true;

    if(bFirstCall){
      var topPath = TOP;
      cache.bFilteredLevel = false;
      if(options.label){
        label = options.label + ' - ' + label;
        /*topPath += ' ' + options.label;
        if(topPath.length > CIRCULARTOPSTRINGLIMIT)
          topPath = topPath.substr(0, CIRCULARTOPSTRINGLIMIT) + '...';
        topPath += ' - ' + dataType;*/
      }
      currentPath = [topPath];
    }

    var bEmpty = false;
    var bHeader = !isSimpleType;

    if(isSimpleType){ // Simple types

      switch(dataType){
        case 'Boolean':
          var val = '<span class="'+(obj ? 'reactdump-yes' : 'reactdump-no')+'">' + obj + '</span>';
          data = this.doRow(dataType, label, val, expand, expandCells);
        break;
        case 'String':
          if(obj.length === 0)
            bEmpty = true;
          else {
            var val = this.escapeHtml(obj);
            //var val = '<pre><code class="lang-html">' + hljs.highlight('xml', obj).value + '</code></pre>';
            data = this.doRow(dataType, label, val, expand, expandCells);
          }
        break;
        case 'Math':
        case 'Undefined':
        case 'Null':
          data = this.doRow1Col(dataType, label, expand);
        break;
        default:
          data = this.doRow(dataType, label, obj.toString(), expand, expandCells);
        break;
      }

    } else { // Non-Simple types

      // figure out if it should be expanded/collapsed
      expand = options.expand;
      if(typeof options.expand == 'object'){
        expand = expand.indexOf(dataType) > -1 || expand.indexOf(dataType.toLowerCase()) > -1;
      }
      if(expand){
        if(options.collapse == true || (
            typeof options.collapse == 'object'
            && (options.collapse.indexOf(dataType) > -1 || options.collapse.indexOf(dataType.toLowerCase()) > -1)
          )
        )
          expand = false;
      }

      switch(dataType){
        case 'RegExp':
        case 'Error':
          data += this.doRowHeader1Col(dataType, label, expand);
          data += this.doRow1Col(dataType, obj.toString(), expand);
        break;
        case 'Function':
          bHeader = true;
          data += this.doRowHeader1Col(dataType, label, expand);
          var txt = obj.toString();
/*
          if(options.syntaxHighlight){
            var purtyText = hljs.highlight('javascript', txt);
            //var purtyText = hljs.highlightAuto(txt);
            txt = purtyText.value;
          } else {
            var txt = this.escapeHtml(obj.toString());
          }
*/
          var txt = this.escapeHtml(obj.toString());

          data += this.doRow1Col(dataType, '<pre><code class="lang-javascript">'+txt+'</code></pre>', expand);
          //data += doRow1Col(dataType, '<pre><code>'+escapeHtml(obj.toString())+'</code></pre>', expand);
        break;
        case 'Array':
        case 'Object':
        default:
          // set keys to collapse if an array of types was passed for expand and the current data-type is one of them
          expandCells = expand;
          if(typeof options.expand == 'object' && expand)
            expandCells = false;

          // check for circular references
          var circPath = this.getPathToCircularRef(obj, cache, currentPath);
          if(circPath.length > 0){
            dataType = CIRCULARREFERENCE;
            data = this.doRow(dataType, dataType, circPath.join(CIRCULARSPLITSTRING), expand);
          } else {
            var subPath;
            var loopObj = [];
            for(var key in obj)
              loopObj.push(key);
            if(dataType != 'Array' && options.sortKeys){
              loopObj.sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
              });
            }

            cache.level++;
            var filtered = [];
            var bFilteredTop = false;
            var numTotalKeys = loopObj.length;
            var key, val;
            var numKeysShown = 0;
            var numKeysHidden = 0;
            var errThrown;
            for (var i = 0; i < loopObj.length; i++) {
              key = loopObj[i];
              errThrown = '';
              try{
                val = obj[key];
              } catch(err){
                errThrown = err.toString();
              }
              if(bFirstCall){
                if(!(!options.show || (options.show.length && (options.show.indexOf(key) >= 0 || options.show.indexOf(Number(key)) >= 0)))){
                  numKeysHidden++;
                  continue;
                  } else if (options.hide && options.hide.length && (options.hide.indexOf(key) >= 0 || options.hide.indexOf(Number(key)) >= 0 || options.hide.filter(util.isRegExp).some(function (regExp) {
                    return regExp.test(key);
                  }))) {
                  numKeysHidden++;
                  continue;
                }
                if(options.top > 0 && numKeysShown === options.top){
                  bFilteredTop = true;
                  break;
                }
              }
              // skip any data types that should be hidden
              if(options.hideTypes){
                var subDataType = this.getDataType(val);
                if(options.hideTypes.indexOf(subDataType) > -1 || options.hideTypes.indexOf(subDataType.toLowerCase()) > -1){
                  numKeysHidden++;
                  continue;
                }
              }

              numKeysShown++;
              if(options.levels !== null && currentPath.length > options.levels){
                cache.bFilteredLevel = true;
                data += this.doRow(dataType, key, '', true);
                continue;
              }

              if(errThrown.length > 0){
                var errorRow = this.doRowHeader1Col(ERRORDATATYPE, ERRORDATATYPE, true)
//                        + this.doRow1Col(ERRORDATATYPE, '<pre><code class="lang-javascript">'+hljs.highlight('javascript', errThrown).value+'</code></pre>', true);
                        + this.doRow1Col(ERRORDATATYPE, errThrown, true);
                data += this.doRow(dataType, key, this.doTable(ERRORDATATYPE, errorRow), expandCells);
                continue;
              }
              subPath = this.clone(currentPath, 'Array');
              subPath.push(key);

              data += this.doRow(dataType, key, this.dumpObject(val, cache, subPath, options), expand, expandCells);
            }

            if(numTotalKeys === 0)
              bEmpty = true;
            else {
              if(bFirstCall){
                if(numKeysShown !== numTotalKeys){
                  if(options.show || options.hideTypes){
                    filtered.push(format(TITLEFILTEREDSHOWN, numKeysShown, numTotalKeys));
                  } else if(options.hide){
                    filtered.push(format(TITLEFILTEREDHIDDEN, numKeysHidden, numTotalKeys));
                    numTotalKeys = numTotalKeys - numKeysHidden;
                  }
                  if(!(options.show || options.hideTypes) && bFilteredTop)
                    filtered.push(format(TITLEFILTEREDTOP, numKeysShown, numTotalKeys));
                }
                if(cache.bFilteredLevel)
                  filtered.push(format(TITLEFILTEREDLEVELS, options.levels));

              } else if(options.hideTypes && numKeysShown !== numTotalKeys){
                // show the filtered label for types being hidden
                filtered.push(format(TITLEFILTEREDSHOWN, numKeysShown, numTotalKeys));
              }
              if(filtered.length > 0)
                label += format(TITLEFILTERED, filtered.join(', '));

              data = this.doRowHeader(dataType, label, expand) + data;
            }
          }
        break;
      }

    }

      if(bEmpty)
              data = bHeader ? this.doRowHeaderEmpty(dataType, label) : this.doRowEmpty(dataType, label);

      return this.doTable(dataType, data);
  }

  /*
   * Function called to start the dump of a variable
   *
   * @param {object} obj
   * @param {object} currentOptions
   * @returns {JS|CSS|SYNTAXHIGHLIGHTCSS|String}
   */
  dump(obj, currentOptions) {
    var options = this.clone(DEFAULTOPTS);
    for(var opt in currentOptions){
      options[opt] = currentOptions[opt];
    }

  //    return doInitialOutput(options) + dumpObject(obj, {}, [], options);
    return this.dumpObject(obj, {}, [], options);

  }

  /*
   * Sets the name of the global function that can be used to reactdump vars
   *
   * @param {string} fnName
    */
/* nn
  function setDumpFunctionName(fnName){
    if(fnName)
      DEFAULTOPTS.dumpFunctionName = fnName;

    global[DEFAULTOPTS.dumpFunctionName] = dump;
  }

  setDumpFunctionName(); // set the name of the global nodedump function to the default
*/

}

Reactdump.defaultProps = {
  obj: ''
  , opts: { }
};
