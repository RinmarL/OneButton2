const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf-8');

content = content.replace('<title>FACTORY ESCAPE</title>', '<title>OneButton</title>');

fs.writeFileSync('index.html', content, 'utf-8');
console.log('Title updated to OneButton');
