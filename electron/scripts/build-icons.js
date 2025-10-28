#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const BASE_DIR = path.resolve(__dirname, '..', 'electron-assets');
const OUTPUT_DIR = path.join(BASE_DIR, 'icons');
const ICON_SIZES = [16, 32, 48, 64, 128, 256, 512];

// Check if icon.png exists, if not, use icon.jpg
async function getSourceImage() {
  const possibleSources = [
    path.join(BASE_DIR, 'icon.png'),
    path.join(BASE_DIR, 'icon.jpg'),
    path.join(BASE_DIR, 'icon.jpeg')
  ];
  
  for (const src of possibleSources) {
    try {
      await fs.access(src);
      return src;
    } catch {
      continue;
    }
  }
  
  throw new Error('No source image found. Please place icon.png, icon.jpg, or icon.jpeg in electron/electron-assets/');
}

async function ensureDirectoryExists(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function buildIcons() {
  try {
    console.log('Building app icons...\n');
    
    const sourceImage = await getSourceImage();
    console.log(`Using source image: ${sourceImage}`);
    
    await ensureDirectoryExists(OUTPUT_DIR);
    
    const sourceBuffer = await sharp(sourceImage)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
    
    console.log('\nGenerating PNG icons...');
    for (const size of ICON_SIZES) {
      const outputPath = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`);
      await sharp(sourceBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`✓ Created ${outputPath}`);
    }
    
    // Create main icon.png (512x512)
    const iconPngPath = path.join(OUTPUT_DIR, 'icon.png');
    await fs.writeFile(iconPngPath, sourceBuffer);
    console.log(`✓ Created ${iconPngPath}`);
    
    console.log('\nNote: ICO file generation requires additional tools.');
    console.log('Please use an online converter or tools like ImageMagick to create icon.ico');
    console.log('Recommended sizes for icon.ico: 16x16, 32x32, 48x48, 256x256');
    
    console.log('\nGenerating ICNS file for macOS...');
    const tempDir = path.join(OUTPUT_DIR, 'icon.iconset');
    await ensureDirectoryExists(tempDir);
    
    const icnsSizes = [
      { name: 'icon_16x16.png', size: 16 },
      { name: 'icon_16x16@2x.png', size: 32 },
      { name: 'icon_32x32.png', size: 32 },
      { name: 'icon_32x32@2x.png', size: 64 },
      { name: 'icon_128x128.png', size: 128 },
      { name: 'icon_128x128@2x.png', size: 256 },
      { name: 'icon_256x256.png', size: 256 },
      { name: 'icon_256x256@2x.png', size: 512 },
      { name: 'icon_512x512.png', size: 512 },
      { name: 'icon_512x512@2x.png', size: 1024 }
    ];
    
    for (const { name, size } of icnsSizes) {
      const outputPath = path.join(tempDir, name);
      await sharp(sourceBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
    }
    
    // Use iconutil on macOS to create ICNS
    if (process.platform === 'darwin') {
      try {
        await execAsync(`iconutil -c icns "${tempDir}" -o "${path.join(OUTPUT_DIR, 'icon.icns')}"`);
        console.log(`✓ Created icon.icns`);
      } catch (error) {
        console.log('Note: Could not run iconutil. Using PNG fallback.');
        await fs.copyFile(
          path.join(OUTPUT_DIR, 'icon-512x512.png'),
          path.join(OUTPUT_DIR, 'icon.icns')
        );
        console.log(`✓ Created icon.icns (PNG fallback)`);
      }
    } else {
      console.log('Note: ICNS generation requires macOS. Creating icon.icns as PNG fallback.');
      await fs.copyFile(
        path.join(OUTPUT_DIR, 'icon-512x512.png'),
        path.join(OUTPUT_DIR, 'icon.icns')
      );
      console.log(`✓ Created icon.icns (PNG fallback)`);
    }
    
    console.log('\n✓ All icons built successfully!');
    
  } catch (error) {
    console.error('Error building icons:', error.message);
    process.exit(1);
  }
}

buildIcons();
