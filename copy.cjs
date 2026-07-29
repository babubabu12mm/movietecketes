const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\LENOVO\\Desktop\\notification wed';
const destDir = 'C:\\Users\\LENOVO\\Desktop\\notification wed\\TEAM_3_IC_MERN_STACK';
const excludes = ['node_modules', '.git', 'TEAM_3_IC_MERN_STACK', 'copy.js', 'copy.cjs'];

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      if (excludes.includes(childItemName)) return;
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    // Overwrite destination file if it exists
    fs.copyFileSync(src, dest);
  }
}

console.log('Starting file copy...');
copyRecursiveSync(srcDir, destDir);
console.log('Copy complete!');
