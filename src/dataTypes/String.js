import React from "react";
import { renderElement, Row, Table } from "../format";
import escapeHtml from "escape-html";


export const String = ({ obj, opts }) => {
  const { expand = true, format, label = "String" } = opts;
  const className = "reactdump reactdump-String";
  const rowClassName = "reactdump-label reactdump-String";

  let row = obj.length
    ? { className: rowClassName, label, expand }
    : { className: rowClassName, label };

  // TODO var val = '<pre><code class="lang-html">' + hljs.highlight('xml', obj).value + '</code></pre>';
    return (
      <Table {...{ className, expand }}>
        <Row {...row}>{obj.length ? escapeHtml(obj) : "[empty]"}</Row>
      </Table>
    );
};
