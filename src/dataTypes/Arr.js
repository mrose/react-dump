import React from "react";
import { renderElement, Row, Table } from "../format";

export const Arr = ({ obj, expand, label, children = [] }) => {
  const className = "reactdump reactdump-Array";

  let rows = [];
  // nb 'of' returns the element, 'for' returns the index
  for (let element of children) {
    let { expand, name, index } = element;
    rows.push(
      <Row
        key={index}
        id={"reactdump" + index}
        className="reactdump-label reactdump-Array"
        label={name}
        title={name}
        expand={expand}
      >
        {renderElement(element)}
      </Row>
    );
  }

  return <Table {...{ className, label, expand }}>{rows}</Table>;
};
