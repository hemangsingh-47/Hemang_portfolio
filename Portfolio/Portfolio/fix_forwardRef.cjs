const fs = require('fs');
const path = require('path');
const uiDir = path.join(__dirname, 'src', 'components', 'ui');
const files = fs.readdirSync(uiDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(uiDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix React.forwardRef leftovers
  content = content.replace(/React\.forwardRef,[\s\S]*?>\(/g, 'React.forwardRef(');
  
  // Fix forwardRef leftovers
  content = content.replace(/forwardRef,[\s\S]*?>\(/g, 'forwardRef(');
  
  fs.writeFileSync(filePath, content, 'utf8');
});
