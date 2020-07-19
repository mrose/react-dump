import React, { useState } from 'react';
import { createUseStyles, useTheme, ThemeProvider } from "react-jss";
import { getObjectType } from "./index";
import escapeHtml from "escape-html";
import theme from "./theme.json";

import _includes from 'lodash-es/includes';
import _map from 'lodash-es/map';
import _uniqueId from 'lodash-es/uniqueId';


const Table = (props) => {
    const {
        children = [],
        className = 'reactDump',
        cols = 2,
        expand:exp = true,
        label = "",
    } = props;
    const [expand, setExpand] = useState(exp);

    const handleClick = () => setExpand(!expand);

    return (
        <table {...{className}}>
            <Thead  {...{className, colSpan:cols, label, onClick:handleClick }} />
            <tbody {...{ style: !expand ? {display:"none"} : {} }}>
                {props.children}
            </tbody>
        </table>
    )
};

const Thead = ({className, colSpan, label, onClick}) => {
    if (!label.length) { return null; }
    return (
        <thead>
        <tr>
            <th {...{className, colSpan, onClick}}>
                {label}
            </th>
        </tr>
        </thead>
    );
};

const Row = (props) => {
    const {
        className = '',
        cols = 2,
        expand:exp = true,
        id = _uniqueId('reactdump'),
        label = '',
        title = '',
    } = props;
    const [expand, setExpand] = useState(exp);

    const handleClick = () => setExpand(!expand);
    const key = id;
    return (
        <tr {...{id, key}}>
            { cols === 2 &&
                <td {...{ className, key:_uniqueId('reactdump'), onClick:handleClick, style: !expand ? {fontStyle:'italic'} : {}, title }}>
                    {label}
                </td>
            }
            <td {...{ className:'reactdump-data', key:_uniqueId('reactdump'), style: !expand ? {display:"none"} : {} }}>
                {props.children}
            </td>
        </tr>
    );

};

// simple, complex, + function
// function = simple with flex-direction: column
const useStyles = (objType, cl) => {
    const theme = useTheme();
    const dtt = (objType in theme) ? theme[objType] : { container:{}, label:{}, content: {} };
    const container = {...theme.simpleContainer, ...dtt.container };
    const label = { ...theme.label, ...dtt.label };
    const content = (cl)
      ? { ...theme.content, ...dtt.content, ...{"grid-template-rows": `repeat(${cl}, 1fr)`} }
      : { ...theme.content, ...dtt.content }
      ;
    return createUseStyles((theme) => ({container, label, content}))();
};

const formatComplexChildren = (children, expand, format) => {
  let i = 0;
  return _map(children, (child) => {
    child.expand = expand;
    child.format = format;
    return (
      <>
        <div style={{'gridRow':++i, 'gridColumn':1 }}>{child.name}</div>
        <div style={{'gridRow':i, 'gridColumn':2 }}>{renderElement(child)}</div>
      </>
    );
  });
}

/*
NaN, Infinity, -Infinity, Symbol
*/
// TODO: circularRef needs mo loving:   <a href='#{props.documentFragment}'>{path.join( '>>' )}</a>
// (circularRef) specially when target is collapsed

// TODO: string:  var val = '<pre><code class="lang-html">' + hljs.highlight('xml', obj).value + '</code></pre>';
const formatObjectType = (objectType, obj, expand, format, documentFragment, path) => {
    const t = {
        "Array": formatComplexChildren,
        "Boolean": (obj) => obj ? <span style={{color: '#008800'}}>{obj.toString()}</span> : <span style={{color: '#aa0000'}}>{obj.toString()}</span>,
        "CircularReference": () => <a href={documentFragment}>{path.join('>>')}</a>,
        "Date": (obj) => obj.toString(),
        "Error": (obj) => obj.toString(),
        "Function:": (obj) => <pre><code className="lang-javascript">{escapeHtml(obj.toString().replace(/\t/g, ""))}</code></pre>,
        "Math": (obj) => obj,
        "Null": () => "[null]",
        "Number": (obj) => obj.toString(),
        "Object": formatComplexChildren,
        "RegExp": (obj) => `${obj.toString()} ${obj.flags}`,
        "String": (obj) => obj.length ? escapeHtml(obj) : "[empty]",
        "Undefined": () => "[?]",
        "Unknown": () => `[${getObjectType(obj, false)}]`
    };
    return (objectType in t) ? t[objectType](obj, expand) : `${objectType} not found`;
};

const renderElement = (props={}) => {
    let {
        children = [],
        objType = 'Unknown',
        documentFragment = '',
        index = 0,
        obj,
        expand = true,
        format = 'htmlTable',
        id = _uniqueId('reactdump'),
        label = 'Unknown',
        name = 'Unknown',
        path = [],
    } = props;

    switch (format) {
        case 'htmlTable':
          const { tableClassName, labelClassName, contentCols } = (objType in theme) ? theme[objType] : { tableClassName:"", labelClassName:"" };
          const isComplex = _includes( ['Object','Array'], objType);
          const tblProps = isComplex ? { className:tableClassName, label, expand } : { className:tableClassName, expand };
          return (
            <Table {...tblProps}>
              { isComplex
              ? (
                  _map(children, (element) => {
                    let { expand, label, name, index } = element;
                    element.format = 'htmlTable';
                    return (
                      <Row
                        key={index}
                        id={"reactdump" + index}
                        className={labelClassName}
                        label={name}
                        title={name}
                        expand={expand}
                      >
                        {renderElement(element)}
                      </Row>
                    );
                  })
                )
              : <Row {...{ className:labelClassName, label, expand, cols:contentCols }}>{formatObjectType(objType, isComplex ? children : obj, expand, 'htmlTable', documentFragment, path)}</Row>
              }
            </Table>
          );
          break;

        case 'htmlFlex':
          return <FlexElement {...{objType, obj, children, label, name, expand, documentFragment, path}} />;
          break;
    }

};

const FlexElement = ({objType, obj, children=[], label, name, expand=true, documentFragment, path}) => {
  const classes = useStyles(objType, children.length);
  const [isExpanded, setIsExpanded] = useState(expand);
  const handleClick = () => setIsExpanded(!isExpanded);
  const isComplex = _includes( ['Object','Array'], objType);
  return (
    <div className={classes.container}>
      <div className={classes.label} onClick={handleClick}>{label}</div>
      <div style={!isExpanded ? {display:"none"} : {}} className={classes.content}>
        { formatObjectType(objType, isComplex ? children : obj, isExpanded, 'htmlFlex', documentFragment, path) }
      </div>
    </div>
  );
}

export { renderElement };
