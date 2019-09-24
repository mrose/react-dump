import React from "react";
import { renderElement, Row, Table } from "../format";

export const Arr = ({ obj, opts, children = [] }) => {
  const { expand = true, label = "Array" } = opts;
  const className = "reactdump reactdump-Array";

  let rows = [];
  // nb 'of' returns the element, 'for' returns the index
  for (let element of children) {
    let { opts, name, index } = element;
    rows.push(
      <Row
        key={index}
        id={"reactdump" + index}
        className="reactdump-label reactdump-Array"
        label={name}
        title={name}
        expand={opts.expand}
      >
        {renderElement(element)}
      </Row>
    );
  }

  return <Table {...{ className, label, expand }}>{rows}</Table>;
};
