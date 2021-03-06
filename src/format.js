import React, { useState } from 'react';
import _indexOf from "lodash-es/indexOf";
import _keys from "lodash-es/keys";
import _uniqueId from 'lodash-es/uniqueId';
import { dataTypes } from "./dataTypes/index";


const THead = (props) => {
  const {
      className = 'reactDump',
      cols = 2,
      expand:exp = true,
      handleClick,
      label = "",
  } = props;

  if (!label.length) return null;

  return (
    <thead>
        <tr>
            <th {...{className, colSpan:cols, onClick:handleClick }}>
                {label}
            </th>
        </tr>
    </thead>
  );
};

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
          <THead handleClick={handleClick} {...props} />
          <tbody {...{ style: !expand ? {display:"none"} : {} }}>
              {props.children}
          </tbody>
        </table>
    )
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
    opts.format = opts.format || 'html';
    opts.label = opts.label || '';

    if ( _indexOf(_keys(dataTypes), dataType) !== -1 ) {
        const Tag = dataTypes[dataType];
        return <Tag {...{ key:opts.id, obj, opts, children, path, documentFragment }} />;
    }

    opts.label = 'Unknown DataType';
    return <DataTypes.Error {...{ key:opts.id, obj, opts, children, path, documentFragment }} />
};

export { renderElement, Row, Table };
