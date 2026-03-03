const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'portfolio.ts');
let content = fs.readFileSync(file, 'utf8');

// The regex previously failed because some objects don't have trailing commas.
// This matches "gallery: [...]," or "gallery: [...]" up to the next "}"
content = content.replace(/,\s*gallery:\s*\[[\s\S]*?\](?=\s*\})/g, '');
content = content.replace(/\s*gallery:\s*\[[\s\S]*?\](?=\s*\})/g, '');
content = content.replace(/,\s*gallery:\s*\[\](?=\s*\})/g, '');

fs.writeFileSync(file, content);
console.log("Stripped remaining gallery arrays from portfolio.ts");
