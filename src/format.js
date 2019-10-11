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

    return (
        <tr id={id} key={_uniqueId()}>
            { cols === 2 &&
                <td {...{ className, key:_uniqueId(), onClick:handleClick, style: !expand ? {fontStyle:'italic'} : {}, title }}>
                    {label}
                </td>
            }
            <td {...{ className:'reactdump-data', key:_uniqueId(), style: !expand ? {display:"none"} : {} }}>
                {props.children}
            </td>
        </tr>
    );

};

const renderElement = (props) => {
    const {
        dataType = "Error",
        obj,
        opts = {},
        index = 0,
        children = [],
        path = [],
        documentFragment = "",
    } = props;
    opts.expand = opts.expand || true;
    opts.label = opts.label || '';
    opts.id = opts.id || _uniqueId();
    const key = opts.id;
    let Element;

    if ( _indexOf(_keys(dataTypes), dataType) !== -1 ) {
        Element = dataTypes[dataType];
        return <Element {...{ key, obj, opts, children, path, documentFragment }} />;
    }

    opts.label = 'Unknown DataType';
    Element = dataTypes('error');
    return <Element {...{ key, obj, opts, children, path, documentFragment }} />
};

export { renderElement, Row, Table };
