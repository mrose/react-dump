import React from "react";
import { Row, Table } from "../format";

export const Undefined = ({ obj, expand, label }) => {
  const className = "reactdump reactdump-Undefined";
  const rowClassName = "reactdump-label reactdump-Undefined";

  return (
    <Table {...{ className, expand }}>
      <Row {...{ className: rowClassName, label, expand, cols: "1" }}>
        {obj}
      </Row>
    </Table>
  );
};
