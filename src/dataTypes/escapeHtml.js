// Encodes HTML strings so they are displayed as such
const escapeHtml = (html) => {
 return String(html)
   .replace(/&(?!\w+;)/g, '&amp;')
   .replace(/</g, '&lt;')
   .replace(/>/g, '&gt;')
   .replace(/"/g, '&quot;')
};
export default escapeHtml;
