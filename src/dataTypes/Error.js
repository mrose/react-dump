import React from "react";
import { Row, Table } from "../format";

export const Error = ({ obj = "whoops! :)", opts }) => {
  const { expand = true, label = "Error" } = opts;
  const className = "reactdump reactdump-Error";
  const rowClassName = "reactdump-label reactdump-Error";
  return (
    <Table {...{ className, expand }}>
      <Row {...{ className: rowClassName, label, expand, expandCells: expand }}>
        {obj.toString()}
      </Row>
    </Table>
  );
};
