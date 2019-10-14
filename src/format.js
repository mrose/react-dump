import React, { useState } from 'react';
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

    const Element = isKnownElement ? dataTypes[dataType] : dataTypes('error');
    return <Element {...{ key:opts.id, obj, opts, children, path, documentFragment }} />;
};

export { renderElement, Row, Table };
