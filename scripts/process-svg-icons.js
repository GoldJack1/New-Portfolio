#!/usr/bin/env node

/**
 * SVG Icon Processor
 * 
 * Processes SVG files exported from Illustrator to:
 * 1. Add vector-effect="non-scaling-stroke" to all stroke paths
 * 2. Convert hardcoded stroke colors to currentColor
 * 3. Clean up unnecessary attributes
 * 4. Make SVGs responsive by removing fixed width/height
 * 
 * Usage:
 *   node scripts/process-svg-icons.js <input-directory> [options]
 * 
 * Options:
 *   --output <dir>   Output directory (default: same as input)
 *   --recursive      Process subdirectories recursively
 *   --fixed-size     Keep fixed width/height (default: responsive, no fixed size)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const inputDir = args[0];
const options = {
  output: args[args.indexOf('--output') + 1] || null,
  recursive: args.includes('--recursive'),
  fixedSize: args.includes('--fixed-size'),
};

if (!inputDir) {
  console.error('Usage: node scripts/process-svg-icons.js <input-directory> [--scale] [--output <dir>] [--recursive]');
  process.exit(1);
}

if (!fs.existsSync(inputDir)) {
  console.error(`Error: Directory "${inputDir}" does not exist`);
  process.exit(1);
}

/**
 * Process a single SVG file
 */
function processSVG(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Add vector-effect="non-scaling-stroke" to paths with stroke attributes
    // Handle both self-closing and regular tags
    const strokePathRegex = /(<path[^>]*stroke="[^"]*"[^>]*?)(\s*\/?>)/g;
    if (strokePathRegex.test(content)) {
      content = content.replace(strokePathRegex, (match, before, closing) => {
        // Check if vector-effect already exists
        if (!match.includes('vector-effect')) {
          modified = true;
          return `${before} vector-effect="non-scaling-stroke"${closing}`;
        }
        return match;
      });
    }

    // 2. Convert hardcoded stroke colors to currentColor
    const strokeColorRegex = /stroke="(#[0-9a-fA-F]{3,6}|rgb\([^)]+\)|rgba\([^)]+\)|black|white)"/g;
    if (strokeColorRegex.test(content)) {
      content = content.replace(strokeColorRegex, () => {
        modified = true;
        return 'stroke="currentColor"';
      });
    }

    // 3. Clean up unnecessary attributes
    // Remove XML declaration (optional, but cleaner)
    content = content.replace(/<\?xml[^>]*\?>\s*/g, '');
    
    // Remove id attributes with UUIDs
    content = content.replace(/\sid="uuid-[^"]*"/g, '');
    
    // Remove data-name attributes
    content = content.replace(/\sdata-name="[^"]*"/g, '');

    // 4. Handle responsive vs fixed size
    if (options.fixedSize) {
      // Ensure width/height are set for fixed size
      if (!content.includes('width=') && !content.includes('height=')) {
        // Try to get viewBox size to set matching width/height
        const viewBoxMatch = content.match(/viewBox="0 0 (\d+) (\d+)"/);
        if (viewBoxMatch) {
          const [, width, height] = viewBoxMatch;
          content = content.replace(/<svg([^>]*)>/, (match, attrs) => {
            modified = true;
            return `<svg${attrs} width="${width}" height="${height}">`;
          });
        }
      }
    } else {
      // Remove width/height for responsive scaling (default behavior)
      content = content.replace(/\s+width="[^"]*"/g, () => {
        modified = true;
        return '';
      });
      content = content.replace(/\s+height="[^"]*"/g, () => {
        modified = true;
        return '';
      });
    }

    // 5. Ensure fill="currentColor" is on the SVG element for proper theming
    if (!content.includes('fill=')) {
      content = content.replace(/<svg([^>]*)>/, (match, attrs) => {
        modified = true;
        return `<svg${attrs} fill="currentColor">`;
      });
    }

    // 6. Add preserveAspectRatio for better responsive behavior (if not present)
    if (!content.includes('preserveAspectRatio')) {
      content = content.replace(/<svg([^>]*)>/, (match, attrs) => {
        modified = true;
        return `<svg${attrs} preserveAspectRatio="xMidYMid meet">`;
      });
    }

    if (modified) {
      return content;
    }
    
    return null; // No changes needed
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Get all SVG files in a directory
 */
function getSVGFiles(dir, recursive = false) {
  const files = [];
  
  function scanDir(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory() && recursive) {
        scanDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.svg')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDir(dir);
  return files;
}

/**
 * Main processing function
 */
function main() {
  const svgFiles = getSVGFiles(inputDir, options.recursive);
  
  if (svgFiles.length === 0) {
    console.log(`No SVG files found in "${inputDir}"`);
    return;
  }

  console.log(`Found ${svgFiles.length} SVG file(s) to process...\n`);

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  for (const filePath of svgFiles) {
    const processedContent = processSVG(filePath);
    
    if (processedContent === null) {
      console.log(`⏭️  Skipped: ${filePath} (no changes needed)`);
      skipped++;
      continue;
    }

    try {
      const outputPath = options.output
        ? path.join(options.output, path.relative(inputDir, filePath))
        : filePath;

      // Create output directory if it doesn't exist
      if (options.output) {
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
      }

      fs.writeFileSync(outputPath, processedContent, 'utf8');
      console.log(`✅ Processed: ${filePath}`);
      processed++;
    } catch (error) {
      console.error(`❌ Error writing ${filePath}:`, error.message);
      errors++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Processed: ${processed}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
}

main();
