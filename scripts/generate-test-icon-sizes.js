#!/usr/bin/env node

/**
 * Generate Test Icon Sizes
 * 
 * Takes SVG icons from .cursor/Test and generates scaled versions:
 * - 16x16 (for button icons)
 * - 18x18 (for font-size matching)
 * - 20x20 (for larger icons)
 * - 32x32 (original size)
 * 
 * Usage:
 *   node scripts/generate-test-icon-sizes.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../.cursor/Test');
const outputDir = path.join(__dirname, '../src/assets/icons/test-icons');

const sizes = [
  { name: '16x16', size: 16, scale: 0.5 },  // 16/32 = 0.5
  { name: '18x18', size: 18, scale: 0.5625 }, // 18/32 = 0.5625
  { name: '20x20', size: 20, scale: 0.625 },  // 20/32 = 0.625
  { name: '32x32', size: 32, scale: 1.0 },   // Original
];

/**
 * Scale SVG coordinates
 */
function scaleSVGPath(pathData, scale) {
  return pathData.replace(/([-\d.]+)/g, (numStr) => {
    const num = parseFloat(numStr);
    if (isNaN(num)) return numStr;
    const scaledNum = (num * scale).toFixed(3).replace(/\.?0+$/, '');
    return scaledNum;
  });
}

/**
 * Process a single SVG file
 */
function processSVG(filePath, sizeConfig) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath, '.svg');
    
    // Scale viewBox
    content = content.replace(/viewBox="0 0 32 32"/g, `viewBox="0 0 ${sizeConfig.size} ${sizeConfig.size}"`);
    
    // Scale path coordinates
    content = content.replace(/d="([^"]*)"/g, (_match, pathData) => {
      const scaled = scaleSVGPath(pathData, sizeConfig.scale);
      return `d="${scaled}"`;
    });
    
    // Remove width/height for responsive scaling
    content = content.replace(/\s+width="[^"]*"/g, '');
    content = content.replace(/\s+height="[^"]*"/g, '');
    
    // Remove vector-effect="non-scaling-stroke" so strokes scale
    content = content.replace(/\s+vector-effect="non-scaling-stroke"/g, '');
    
    // Clean up unnecessary attributes
    content = content.replace(/<\?xml[^>]*\?>\s*/g, '');
    content = content.replace(/\sid="[^"]*"/g, '');
    content = content.replace(/\sdata-name="[^"]*"/g, '');
    
    // Convert stroke colors to currentColor
    content = content.replace(/stroke="(#[0-9a-fA-F]{3,6}|rgb\([^)]+\)|rgba\([^)]+\)|black|white)"/g, 'stroke="currentColor"');
    
    // Ensure fill="currentColor" is on SVG element
    if (!content.includes('fill=')) {
      content = content.replace(/<svg([^>]*)>/, `<svg$1 fill="currentColor">`);
    }
    
    // Add preserveAspectRatio if not present
    if (!content.includes('preserveAspectRatio')) {
      content = content.replace(/<svg([^>]*)>/, `<svg$1 preserveAspectRatio="xMidYMid meet">`);
    }
    
    // Create output filename with size suffix
    const outputFileName = `${fileName}_${sizeConfig.name}.svg`;
    const outputPath = path.join(outputDir, outputFileName);
    
    fs.writeFileSync(outputPath, content, 'utf8');
    return { fileName, outputFileName, success: true };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return { fileName: path.basename(filePath), success: false, error: error.message };
  }
}

/**
 * Main function
 */
function main() {
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Get all SVG files from input directory
  const files = fs.readdirSync(inputDir)
    .filter(file => file.endsWith('.svg'))
    .map(file => path.join(inputDir, file));
  
  if (files.length === 0) {
    console.log('No SVG files found in .cursor/Test');
    return;
  }
  
  console.log(`Found ${files.length} SVG file(s)\n`);
  console.log(`Generating ${sizes.length} sizes for each icon...\n`);
  
  const results = {
    processed: 0,
    errors: 0,
    files: [],
  };
  
  // Process each file at each size
  for (const filePath of files) {
    const baseFileName = path.basename(filePath);
    const fileResults = [];
    
    for (const sizeConfig of sizes) {
      const result = processSVG(filePath, sizeConfig);
      fileResults.push(result);
      
      if (result.success) {
        results.processed++;
        console.log(`✅ ${baseFileName} → ${result.outputFileName}`);
      } else {
        results.errors++;
        console.error(`❌ ${baseFileName} (${sizeConfig.name}): ${result.error}`);
      }
    }
    
    results.files.push({
      base: baseFileName,
      sizes: fileResults,
    });
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Generated: ${results.processed} icon files`);
  console.log(`   ❌ Errors: ${results.errors}`);
  console.log(`\n📁 Output directory: ${outputDir}`);
}

main();
