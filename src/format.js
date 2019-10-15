import React, { useState } from 'react';
import { createUseStyles, useTheme, ThemeProvider } from "react-jss";
import escapeHtml from "escape-html";
import _indexOf from "lodash-es/indexOf";
import _keys from "lodash-es/keys";
import _uniqueId from 'lodash-es/uniqueId';
import { dataTypes } from "./dataTypes/index";


const Table = (props) => {
    const {
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
        id="",
        label = "",
        title = "",
    } = props;
    const [expand, setExpand] = useState(exp);

    const handleClick = () => setExpand(!expand);
    const key = _uniqueId('reactdump');
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

const formatDataType = (dataType, obj) => {
    const t = {
        "Boolean": obj ? <span style={{color: '#008800'}}>{obj.toString()}</span> : <span style={{color: '#aa0000'}}>{obj.toString()}</span>,
        "String": obj.length ? escapeHtml(obj) : "[empty]",
    };
    return (dataType in t) ? t[dataType] : obj;
};

const renderElement = (props) => {
    const {
        children = [],
        dataType = "Error",
        documentFragment = "",
        index = 0,
        obj,
        opts = {},
        path = [],
    } = props;

    const isKnownElement =  _indexOf(_keys(dataTypes), dataType) !== -1;

    opts.expand = opts.expand || true;
    opts.format = opts.format || 'htmlTable';
    opts.id = opts.id || _uniqueId('reactdump');
    opts.label = isKnownElement ? opts.label || '' : 'Unknown DataType';

    switch (opts.format) {
        case 'htmlTable':
            const Element = isKnownElement ? dataTypes[dataType] : dataTypes('error');
            return <Element {...{ key:opts.id, obj, opts, children, path, documentFragment }} />;
            break;

        case 'htmlFlex':
            return <SimpleElement {...{dataType, obj, label:opts.label}} />;
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
