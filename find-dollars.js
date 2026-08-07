const fs = require('fs');
const path = require('path');

function findDollarSigns(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findDollarSigns(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Match $ that is not followed by {
        if (line.match(/\$(?!\{)/)) {
          console.log(`[MATCH] ${fullPath}:${i + 1}: ${line.trim()}`);
        }
      }
    }
  }
}

findDollarSigns(path.join(__dirname, 'src'));
