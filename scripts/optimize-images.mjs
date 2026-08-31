import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

const directoriesToScan = [
  path.join(publicDir, 'images'),
  path.join(publicDir, 'images', 'projects'),
  path.join(publicDir, 'images', 'students'),
  path.join(publicDir, 'images', 'testimonials'),
  path.join(publicDir, 'assets'),
];

// Target responsive widths
const RESPONSIVE_WIDTHS = [480, 768, 1200];

async function getImagesInDir(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name) && !/-\d+w\./i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  console.log('=== SHORAI PERFORMANCE: IMAGE OPTIMIZATION PIPELINE ===\n');

  let allImages = [];
  for (const dir of directoriesToScan) {
    const imgs = await getImagesInDir(dir);
    allImages.push(...imgs);
  }

  // Also include root public/shorai-vr-student.png
  const vrStudent = path.join(publicDir, 'shorai-vr-student.png');
  if (fs.existsSync(vrStudent)) allImages.push(vrStudent);

  console.log(`Found ${allImages.length} base photographic & graphic assets.\n`);

  let totalOriginalSize = 0;
  let totalOptimizedWebpSize = 0;
  let totalOptimizedAvifSize = 0;
  let totalCompressedFallbackSize = 0;
  let convertedCount = 0;
  let responsiveVariantsCount = 0;

  const results = [];

  for (const imgPath of allImages) {
    const inputBuffer = fs.readFileSync(imgPath);
    const originalBytes = inputBuffer.length;
    totalOriginalSize += originalBytes;

    const ext = path.extname(imgPath);
    const baseName = path.basename(imgPath, ext);
    const dir = path.dirname(imgPath);
    const isPng = ext.toLowerCase() === '.png';

    const image = sharp(inputBuffer);
    const metadata = await image.metadata();
    const width = metadata.width || 1200;
    const height = metadata.height || 800;

    // 1. Generate full-resolution WebP
    const webpPath = path.join(dir, `${baseName}.webp`);
    let webpBuffer;
    if (isPng) {
      webpBuffer = await sharp(inputBuffer)
        .webp({ quality: 85, effort: 6, alphaQuality: 90 })
        .toBuffer();
    } else {
      webpBuffer = await sharp(inputBuffer)
        .webp({ quality: 82, effort: 6 })
        .toBuffer();
    }
    fs.writeFileSync(webpPath, webpBuffer);
    totalOptimizedWebpSize += webpBuffer.length;

    // 2. Generate full-resolution AVIF
    const avifPath = path.join(dir, `${baseName}.avif`);
    let avifBuffer;
    if (isPng) {
      avifBuffer = await sharp(inputBuffer)
        .avif({ quality: 78, effort: 6 })
        .toBuffer();
    } else {
      avifBuffer = await sharp(inputBuffer)
        .avif({ quality: 74, effort: 6 })
        .toBuffer();
    }
    fs.writeFileSync(avifPath, avifBuffer);
    totalOptimizedAvifSize += avifBuffer.length;
    convertedCount++;

    // 3. Compress original fallback format
    let compressedFallback;
    if (isPng) {
      compressedFallback = await sharp(inputBuffer)
        .png({ quality: 85, compressionLevel: 9, effort: 7 })
        .toBuffer();
    } else {
      compressedFallback = await sharp(inputBuffer)
        .jpeg({ quality: 82, mozjpeg: true, progressive: true })
        .toBuffer();
    }
    fs.writeFileSync(imgPath, compressedFallback);
    totalCompressedFallbackSize += compressedFallback.length;

    // 4. Generate responsive width variants if image is wide enough
    if (width > 600) {
      for (const targetW of RESPONSIVE_WIDTHS) {
        if (targetW < width) {
          // WebP variant
          const varWebpPath = path.join(dir, `${baseName}-${targetW}w.webp`);
          const varWebp = await sharp(inputBuffer)
            .resize(targetW, null, { withoutEnlargement: true })
            .webp({ quality: 80, effort: 5 })
            .toBuffer();
          fs.writeFileSync(varWebpPath, varWebp);

          // AVIF variant
          const varAvifPath = path.join(dir, `${baseName}-${targetW}w.avif`);
          const varAvif = await sharp(inputBuffer)
            .resize(targetW, null, { withoutEnlargement: true })
            .avif({ quality: 72, effort: 5 })
            .toBuffer();
          fs.writeFileSync(varAvifPath, varAvif);

          responsiveVariantsCount += 2;
        }
      }
    }

    results.push({
      file: path.relative(publicDir, imgPath).replace(/\\/g, '/'),
      dimensions: `${width}x${height}`,
      originalKb: (originalBytes / 1024).toFixed(1),
      fallbackKb: (compressedFallback.length / 1024).toFixed(1),
      webpKb: (webpBuffer.length / 1024).toFixed(1),
      avifKb: (avifBuffer.length / 1024).toFixed(1),
      savingsPct: (((originalBytes - avifBuffer.length) / originalBytes) * 100).toFixed(1),
    });
  }

  console.log('Processed Assets Summary:');
  console.table(results.slice(0, 20));

  const origMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
  const fallbackMB = (totalCompressedFallbackSize / (1024 * 1024)).toFixed(2);
  const webpMB = (totalOptimizedWebpSize / (1024 * 1024)).toFixed(2);
  const avifMB = (totalOptimizedAvifSize / (1024 * 1024)).toFixed(2);

  console.log('\n=== GLOBAL ASSET METRICS ===');
  console.log(`Original total payload: ${origMB} MB`);
  console.log(`Compressed Fallbacks:   ${fallbackMB} MB (-${(((totalOriginalSize - totalCompressedFallbackSize) / totalOriginalSize) * 100).toFixed(1)}%)`);
  console.log(`WebP Payload:           ${webpMB} MB (-${(((totalOriginalSize - totalOptimizedWebpSize) / totalOriginalSize) * 100).toFixed(1)}%)`);
  console.log(`AVIF Payload:           ${avifMB} MB (-${(((totalOriginalSize - totalOptimizedAvifSize) / totalOriginalSize) * 100).toFixed(1)}%)`);
  console.log(`Total images converted to AVIF/WebP: ${convertedCount}`);
  console.log(`Total responsive variants generated: ${responsiveVariantsCount}\n`);
}

main().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
