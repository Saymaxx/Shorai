const fs = require('fs');
const path = require('path');

function scanDir(dir, exts) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const full = path.join(dir, item.name);
    if (item.isDirectory() && item.name !== 'node_modules' && item.name !== '.git' && item.name !== 'dist') {
      results.push(...scanDir(full, exts));
    } else if (item.isFile() && exts.some(e => item.name.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

const srcFiles = scanDir('src', ['.tsx', '.ts']);
const imgRegex = /['"](\/images\/[^'"]+?\.(jpg|jpeg|png|webp|avif))['"]/g;
const referencedImages = new Set();

for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    referencedImages.add(match[1]);
  }
}

console.log('Total unique local images referenced in src:', referencedImages.size);
let missingBase = 0;
let missingWebp = 0;
let missing1200w = 0;

for (const imgUrl of referencedImages) {
  const localRel = imgUrl.replace(/^\//, '');
  const localPath = path.join('public', localRel);
  if (!fs.existsSync(localPath)) {
    console.log('❌ MISSING BASE IMAGE:', imgUrl);
    missingBase++;
  }
  
  const ext = path.extname(localPath);
  const webpPath = localPath.replace(ext, '.webp');
  if (!fs.existsSync(webpPath)) {
    console.log('⚠️ MISSING WEBP:', webpPath);
    missingWebp++;
  }

  // Small logos or QRs don't need 1200w
  if (!localPath.includes('logo') && !localPath.includes('qr')) {
    const w1200Path = localPath.replace(ext, '-1200w.webp');
    if (!fs.existsSync(w1200Path)) {
      console.log('⚠️ MISSING 1200W:', w1200Path);
      missing1200w++;
    }
  }
}

console.log(`\nAudit Results:`);
console.log(`- Missing base assets: ${missingBase}`);
console.log(`- Missing WebP base assets: ${missingWebp}`);
console.log(`- Missing 1200w variants: ${missing1200w}`);

if (missingBase === 0 && missingWebp === 0 && missing1200w === 0) {
  console.log('\n🎉 ALL 100% OF REFERENCED IMAGES AND VARIANTS ARE VERIFIED ON DISK!');
}
