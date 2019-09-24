import React from 'react';
import { Row, Table } from '../format';
import escapeHtml from './escapeHtml';


export const String = ({ obj, opts }) => {
         const { expand = true, label = "String" } = opts;
         const className = "reactdump reactdump-String";
         const rowClassName = "reactdump-label reactdump-String";

         let row = obj.len ? { className: rowClassName, label, expand } : { className: rowClassName };

         // TODO var val = '<pre><code class="lang-html">' + hljs.highlight('xml', obj).value + '</code></pre>';
         return <Table {...{ className, expand }}>
             <Row {...row}>
               {obj.length ? escapeHtml(obj) : "[empty]"}
             </Row>
           </Table>;
       };
