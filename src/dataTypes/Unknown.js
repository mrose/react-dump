import React from "react";
import { Row, Table } from "../format";

export const Unknown = ({ obj, expand, label }) => {
  const className = "reactdump reactdump-Unknown";
  const rowClassName = "reactdump-label reactdump-Unknown";

  return (
    <Table {...{ className, expand }}>
      <Row {...{ className: rowClassName, label, expand, cols: "1" }}>
        {obj}
      </Row>
    </Table>
  );
};
