import React, { useState } from 'react';
import { createUseStyles, useTheme, ThemeProvider } from "react-jss";
import { getDataType } from "./index";
import { dataTypes } from "./dataTypes/index";
import escapeHtml from "escape-html";

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
        className="",
        cols = 2,
        expand:exp = true,
        id=_uniqueId('reactdump'),
        label = "",
        title = "",
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
const useStyles = (dataType) => {
    const theme = useTheme();
    const dtt = (dataType in theme) ? theme[dataType] : { container:{}, label:{}, content: {} };
    return createUseStyles((theme) => ({
        container: {...theme.simpleContainer, ...dtt.container },
        label: { ...theme.label, ...dtt.label },
        content: { ...theme.content, ...dtt.content }
    }))();
};
/*
NaN, Infinity, -Infinity, Symbol
*/
const formatDataType = (dataType, el) => {
    const t = {
        "Array": () => "array",
        "Boolean": (elem) => elem ? <span style={{color: '#008800'}}>{elem.toString()}</span> : <span style={{color: '#aa0000'}}>{elem.toString()}</span>,
        "Circular-ref": () => "<a href={documentFragment}>{path.join('>>')}</a>",
        "Date": (elem) => elem.toString(),
        "Error": (elem) => elem.toString(),
        "Function:": (elem) => escapeHtml(elem.toString().replace(/\t/g, "")),
        "Math": (elem) => elem,
        "Null": () => "[null]",
        "Number": (elem) => elem.toString(),
        "Object": () => "object",
        "RegExp": (elem) => elem.toString(),
        "String": (elem) => elem.length ? escapeHtml(elem) : "[empty]",
        "Undefined": () => "[?]",
        "Unknown": () => `[${getDataType(el, false)}]`
    };
    return (dataType in t) ? t[dataType](el) : `${dataType} not found`;
};

const renderElement = (props={}) => {
    let {
        children = [],
        dataType = 'Unknown',
        documentFragment = '',
        index = 0,
        obj,
        expand = false,
        format = 'htmlTable',
        id = _uniqueId('reactdump'),
        label = 'Unknown',
        path = [],
    } = props;

    switch (format) {
        case 'htmlTable':
            const Element = dataTypes[dataType];
            return <Element {...{ key:id, obj, id, expand, label, children, path, documentFragment }} />;
            break;

        case 'htmlFlex':
            return <SimpleElement {...{dataType, obj, label, expanded:expand}} />;
            break;
    }

};

const SimpleElement = ({dataType, obj, label, expanded=true}) => {
    const classes = useStyles(dataType);
    const [isExpanded, setIsExpanded] = useState(expanded);
    const handleClick = () => setIsExpanded(!isExpanded);
    return (
        <div className={classes.container}>
            <div className={classes.label} onClick={handleClick}>{label}</div>
            <div style={!isExpanded ? {display:"none"} : {}} className={classes.content}>
                { formatDataType(dataType, obj) }
            </div>
        </div>
    );
};

export { renderElement, Row, Table };
