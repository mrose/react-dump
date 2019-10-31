import React from "react";
import { renderElement, Row, Table } from "../format";


export const Obj = ({ obj, expand, label, children = [] }) => {
  const className = "reactdump reactdump-Object";

  let rows = [];
  for (let element of children) {
    let { expand, name, index } = element;
    rows.push(
      <Row
        key={index}
        id={"reactdump" + index}
        className="reactdump-label reactdump-Object"
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
