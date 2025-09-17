const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');

// Create output directory if it doesn't exist
async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

// Image optimization settings
const SIZES = {
  small: { width: 640 },
  medium: { width: 1024 },
  large: { width: 1920 }
};

const WEBP_QUALITY = 85;
const PNG_QUALITY = 90;

async function optimizeImage(inputPath, outputDir, filename) {
  const basename = path.basename(filename, path.extname(filename));

  // Create WebP versions at different sizes
  for (const [sizeName, size] of Object.entries(SIZES)) {
    const webpOutput = path.join(outputDir, `${basename}-${sizeName}.webp`);

    await sharp(inputPath)
      .resize(size.width, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpOutput);

    console.log(`✓ Created: ${path.basename(webpOutput)}`);
  }

  // Create optimized PNG fallback (medium size only)
  const pngOutput = path.join(outputDir, `${basename}-optimized.png`);

  await sharp(inputPath)
    .resize(SIZES.medium.width, null, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .png({
      quality: PNG_QUALITY,
      compressionLevel: 9,
      effort: 10
    })
    .toFile(pngOutput);

  console.log(`✓ Created: ${path.basename(pngOutput)}`);

  // Get file sizes for comparison
  const originalStats = await fs.stat(inputPath);
  const webpStats = await fs.stat(path.join(outputDir, `${basename}-medium.webp`));
  const pngStats = await fs.stat(pngOutput);

  const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);
  const webpSize = (webpStats.size / 1024 / 1024).toFixed(2);
  const pngSize = (pngStats.size / 1024 / 1024).toFixed(2);
  const webpSaving = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);
  const pngSaving = ((1 - pngStats.size / originalStats.size) * 100).toFixed(1);

  console.log(`  Original: ${originalSize}MB → WebP: ${webpSize}MB (${webpSaving}% saved), PNG: ${pngSize}MB (${pngSaving}% saved)`);
  console.log('');
}

async function main() {
  try {
    console.log('🖼️  Starting image optimization...\n');

    // Ensure output directory exists
    await ensureDir(OUTPUT_DIR);

    // Get all PNG files
    const files = await fs.readdir(INPUT_DIR);
    const pngFiles = files.filter(file => file.endsWith('.png'));

    if (pngFiles.length === 0) {
      console.log('No PNG files found to optimize.');
      return;
    }

    console.log(`Found ${pngFiles.length} images to optimize\n`);

    // Process each image
    for (const file of pngFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      console.log(`Processing: ${file}`);
      await optimizeImage(inputPath, OUTPUT_DIR, file);
    }

    console.log('✅ Image optimization complete!\n');

    // Calculate total savings
    const originalFiles = await Promise.all(
      pngFiles.map(async (file) => {
        const stats = await fs.stat(path.join(INPUT_DIR, file));
        return stats.size;
      })
    );

    const optimizedFiles = await fs.readdir(OUTPUT_DIR);
    const optimizedSizes = await Promise.all(
      optimizedFiles
        .filter(file => file.endsWith('-medium.webp'))
        .map(async (file) => {
          const stats = await fs.stat(path.join(OUTPUT_DIR, file));
          return stats.size;
        })
    );

    const totalOriginal = originalFiles.reduce((a, b) => a + b, 0) / 1024 / 1024;
    const totalOptimized = optimizedSizes.reduce((a, b) => a + b, 0) / 1024 / 1024;
    const totalSaving = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);

    console.log(`📊 Total size reduction:`);
    console.log(`   Original: ${totalOriginal.toFixed(2)}MB`);
    console.log(`   Optimized (WebP): ${totalOptimized.toFixed(2)}MB`);
    console.log(`   Saved: ${totalSaving}%`);

  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

main();