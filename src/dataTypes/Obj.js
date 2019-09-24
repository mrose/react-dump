import React from "react";
import { renderElement, Row, Table } from "../format";

export const Obj = ({ obj, opts, children = [] }) => {
  const { expand = true, label = "Object" } = opts;
  const className = "reactdump reactdump-Object";

  let rows = [];
  for (let element of children) {
    let { opts, name, index } = element;
    rows.push(
      <Row
        key={index}
        id={"reactdump" + index}
        className="reactdump-label reactdump-Object"
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
