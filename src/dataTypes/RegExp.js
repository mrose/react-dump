import React from 'react';
import { Row, Table } from '../format';


export const RegExp = ({ obj, expand, label }) => {
    const className = 'reactdump reactdump-RegExp';
    const rowClassName = 'reactdump-label reactdump-RegExp';

  return <Table {...{ className, label, cols: "1", expand }}>
      <Row
        {...{ className: rowClassName, label, expand, expandCells: expand }}
      >
        {obj.toString()}
      </Row>
    </Table>;
};
