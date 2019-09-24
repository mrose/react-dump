import React from "react";
import { Row, Table } from "../format";

export const CircularReference = ({
  obj,
  opts,
  children = [],
  path = [],
  documentFragment = ""
}) => {
  const { expand = true, label = "Circular Reference" } = opts;
  const className = "reactdump reactdump-Circular-Reference";
  const rowClassName = "reactdump-label reactdump-Circular-Reference";

  // TODO needs mo loving:   <a href='#{props.documentFragment}'>{path.join( '>>' )}</a>
  // specially when target is collapsed

  return (
    <Table {...{ className, expand }}>
      <Row {...{ className: rowClassName, label, expand, cols: "2" }}>
        <a href={documentFragment}>{path.join(">>")}</a>
      </Row>
    </Table>
  );
};
