import React from "react";
import { Row, Table } from "../format";

export const Null = ({ obj, opts }) => {
  const { expand = true, label = "Null" } = opts;
  const className = "reactdump reactdump-Null";
  const rowClassName = "reactdump-label reactdump-Null";

  return (
    <Table {...{ className, expand }}>
      <Row {...{ className: rowClassName, label, expand, cols: "1" }}>
        {obj}
      </Row>
    </Table>
  );
};
