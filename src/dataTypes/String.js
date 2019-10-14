import React from "react";
import {createUseStyles, useTheme, ThemeProvider} from 'react-jss'
import {renderElement, Row, Table} from "../format";
import escapeHtml from "escape-html";


let useStyles = createUseStyles((theme) => ({
    container: {
        borderSpacing: theme.borderSpacing,
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
        padding: theme.padding,
        ...theme.simpleContainer,
        borderColor: theme.string.borderColor
    },
    label: {
        padding: theme.padding,
        ...theme.label,
        backgroundColor: theme.string.label.backgroundColor,
        color: theme.string.label.color,
    },
    data: {
        padding: theme.padding,
        ...theme.string.data
    }
}));


export const String = ({ obj, opts }) => {
  const { expand = true, format, label = "String" } = opts;
  const className = "reactdump reactdump-String";
  const rowClassName = "reactdump-label reactdump-String";

  let row = obj.length
    ? { className: rowClassName, label, expand }
    : { className: rowClassName, label };

  // TODO var val = '<pre><code class="lang-html">' + hljs.highlight('xml', obj).value + '</code></pre>';
    if (format === 'htmlTable') {
        return (
            <Table {...{ className, expand }}>
                <Row {...row}>{obj.length ? escapeHtml(obj) : "[empty]"}</Row>
            </Table>
        );
    }

  const theme = useTheme();
  const classes = useStyles({...opts, theme});
  return (
      <div className={classes.container}>
        <div className={classes.label}>{label}</div>
        <div className={classes.data}>{obj.length ? escapeHtml(obj) : "[empty]"}</div>
      </div>
  );
};
