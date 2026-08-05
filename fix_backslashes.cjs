const fs = require('fs');
let content = fs.readFileSync('src/pages/Products.jsx', 'utf8');
content = content.replace(/\\`/g, '`');
content = content.replace(/\\\$/g, '$');
fs.writeFileSync('src/pages/Products.jsx', content);
console.log('Fixed backslashes.');
