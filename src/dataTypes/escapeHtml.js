// Encodes HTML strings so they are displayed as such
export const escapeHtml = (html) => {
 return String(html)
   .replace(/&(?!\w+;)/g, '&amp;')
   .replace(/</g, '&lt;')
   .replace(/>/g, '&gt;')
   .replace(/"/g, '&quot;')
};
