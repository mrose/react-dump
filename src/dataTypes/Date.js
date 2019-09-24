import React from 'react';
import { Row, Table } from '../format';


export const Date = ( { obj, opts } ) => {
    const {
        expand = true,
        label = 'Date'
    } = opts;
    const className = 'reactdump reactdump-Date';
    const rowClassName = 'reactdump-label reactdump-Date';

  return <Table {...{ className, expand }}>
      <Row
        {...{ className: rowClassName, label, expand, expandCells: expand }}
      >
        {obj.toString()}
      </Row>
    </Table>;
};
