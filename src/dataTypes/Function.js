import React from "react";
import { Row, Table } from "../format";
import escapeHtml from "./escapeHtml";

export const Function = ({ obj, opts }) => {
  const { expand = true, label = "Function" } = opts;
  const className = "reactdump reactdump-Function";
  const rowClassName = "reactdump-label reactdump-Function";

  return (
    <Table {...{ className, expand, cols: "1", label: "Function" }}>
      <Row {...{ className: rowClassName, label, expand, cols: "1" }}>
        <pre>
          <code className="lang-javascript">
            {escapeHtml(obj.toString().replace(/\t/g, ""))}
          </code>
        </pre>
      </Row>
    </Table>
  );
};
