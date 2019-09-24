import React from "react";
import { Row, Table } from "../format";

export const Number = ({ obj, opts }) => {
  const { expand = true, label = "Number" } = opts;
  const className = "reactdump reactdump-Number";
  const rowClassName = "reactdump-label reactdump-Number";

  return (
    <Table {...{ className, expand }}>
      <Row {...{ className: rowClassName, label, expand, expandCells: expand }}>
        {obj.toString()}
      </Row>
    </Table>
  );
};
