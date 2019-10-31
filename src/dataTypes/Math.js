import React from "react";
import { Row, Table } from "../format";

export const Math = ({ obj, expand, label }) => {
  const className = "reactdump reactdump-Math";
  const rowClassName = "reactdump-label reactdump-Math";

  return (
    <Table {...{ className, expand }}>
      <Row {...{ className: rowClassName, label, expand, cols: "1" }}>
        {obj}
      </Row>
    </Table>
  );
};
