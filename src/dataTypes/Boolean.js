import React from 'react';
import { Row, Table } from '../format';


export const Boolean = ({ obj, expand, label }) => {
    const className = 'reactdump reactdump-Boolean';
    const rowClassName = 'reactdump-label reactdump-Boolean';
    return <Table {...{ className, expand }}>
        <Row {...{ className: rowClassName, label, expand, expandCells: expand }}>
          <span className={obj ? "reactdump-yes" : "reactdump-no"}>
            {obj.toString()}
          </span>
        </Row>
      </Table>;
};
