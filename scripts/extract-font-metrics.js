#!/usr/bin/env node

/**
 * Font Metrics Extraction Script (v3 - Multiple Methods)
 * 
 * Extracts stem width measurements from the Geologica variable font
 * using multiple techniques to find the actual stem width.
 */

import * as fontkit from 'fontkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultFontPath = path.join(__dirname, '..', '.cursor', 'Geologica-VariableFont_CRSV,SHRP,slnt,wght.ttf');
const fontPath = process.argv[2] || defaultFontPath;

const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

/**
 * Collect all x-coordinates from glyph path
 */
function collectPathPoints(glyph) {
  if (!glyph || !glyph.path) return { xCoords: [], yCoords: [] };
  
  const xCoords = [];
  const yCoords = [];
  
  // Try to access path data
  try {
    const pathData = glyph.path;
    
    // fontkit paths have a toSVG() method - parse that
    const svgPath = pathData.toSVG();
    
    // Parse SVG path commands to extract coordinates
    const coordRegex = /[-]?\d+\.?\d*/g;
    const commands = svgPath.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi) || [];
    
    let currentX = 0;
    let currentY = 0;
    
    for (const cmd of commands) {
      const type = cmd[0].toUpperCase();
      const coords = cmd.slice(1).match(coordRegex)?.map(Number) || [];
      
      switch (type) {
        case 'M':
        case 'L':
          for (let i = 0; i < coords.length; i += 2) {
            currentX = coords[i];
            currentY = coords[i + 1];
            xCoords.push(currentX);
            yCoords.push(currentY);
          }
          break;
        case 'H':
          currentX = coords[0];
          xCoords.push(currentX);
          break;
        case 'V':
          currentY = coords[0];
          yCoords.push(currentY);
          break;
        case 'C':
          for (let i = 0; i < coords.length; i += 6) {
            xCoords.push(coords[i], coords[i + 2], coords[i + 4]);
            yCoords.push(coords[i + 1], coords[i + 3], coords[i + 5]);
            currentX = coords[i + 4];
            currentY = coords[i + 5];
          }
          break;
        case 'Q':
          for (let i = 0; i < coords.length; i += 4) {
            xCoords.push(coords[i], coords[i + 2]);
            yCoords.push(coords[i + 1], coords[i + 3]);
            currentX = coords[i + 2];
            currentY = coords[i + 3];
          }
          break;
      }
    }
  } catch (e) {
    // Fallback to bbox
  }
  
  return { xCoords, yCoords };
}

/**
 * Find clusters of x-coordinates and measure gaps
 */
function measureFromClusters(xCoords) {
  if (xCoords.length < 4) return null;
  
  // Sort and remove duplicates (within tolerance)
  const sorted = [...new Set(xCoords.map(x => Math.round(x)))].sort((a, b) => a - b);
  
  if (sorted.length < 2) return null;
  
  // Find significant gaps (these are the "inside" of the glyph)
  const gaps = [];
  for (let i = 1; i < sorted.length; i++) {
    const gap = sorted[i] - sorted[i - 1];
    if (gap > 2) {
      gaps.push({ start: sorted[i - 1], end: sorted[i], width: gap });
    }
  }
  
  if (gaps.length === 0) return null;
  
  // For a simple glyph like 'l' or 'I', there should be one main gap (the stem width)
  // The stem width is typically the SMALLEST significant gap
  gaps.sort((a, b) => a.width - b.width);
  
  // Return the smallest gap that's likely a stem
  return gaps[0].width;
}

/**
 * Estimate stem width from glyph metrics
 * For a simple vertical stem glyph, the advance width minus side bearings 
 * gives an approximation of the visible width
 */
function estimateFromMetrics(glyph, font) {
  if (!glyph) return null;
  
  try {
    const advanceWidth = glyph.advanceWidth;
    const bbox = glyph.bbox;
    
    if (!bbox) return null;
    
    // Visible width (excluding side bearings)
    const visibleWidth = bbox.maxX - bbox.minX;
    
    // For simple stem glyphs, visible width ≈ stem width
    return visibleWidth;
  } catch (e) {
    return null;
  }
}

/**
 * Use SVG path analysis for more accurate measurement
 */
function measureFromSVGPath(glyph) {
  if (!glyph || !glyph.path) return null;
  
  try {
    const svgPath = glyph.path.toSVG();
    
    // Parse all X coordinates from the path
    const allCoords = [];
    const regex = /([MLHVCSQTA])([^MLHVCSQTAZ]*)/gi;
    let match;
    let lastX = 0, lastY = 0;
    
    while ((match = regex.exec(svgPath)) !== null) {
      const cmd = match[1].toUpperCase();
      const args = match[2].trim().split(/[\s,]+/).filter(s => s).map(Number);
      
      switch (cmd) {
        case 'M':
        case 'L':
          for (let i = 0; i < args.length; i += 2) {
            allCoords.push(args[i]);
            lastX = args[i];
            lastY = args[i + 1];
          }
          break;
        case 'H':
          allCoords.push(args[0]);
          lastX = args[0];
          break;
        case 'C': // Cubic bezier
          for (let i = 0; i < args.length; i += 6) {
            allCoords.push(args[i], args[i + 2], args[i + 4]);
            lastX = args[i + 4];
            lastY = args[i + 5];
          }
          break;
        case 'Q': // Quadratic bezier
          for (let i = 0; i < args.length; i += 4) {
            allCoords.push(args[i], args[i + 2]);
            lastX = args[i + 2];
            lastY = args[i + 3];
          }
          break;
      }
    }
    
    return measureFromClusters(allCoords);
  } catch (e) {
    return null;
  }
}

async function main() {
  console.log('📊 Font Metrics Extraction (v3)\n');
  console.log(`Font: ${fontPath}\n`);

  if (!fs.existsSync(fontPath)) {
    console.error(`❌ Font file not found: ${fontPath}`);
    process.exit(1);
  }

  let font;
  try {
    font = fontkit.openSync(fontPath);
  } catch (error) {
    console.error(`❌ Failed to load font: ${error.message}`);
    process.exit(1);
  }

  const unitsPerEm = font.unitsPerEm;
  console.log(`Font Family: ${font.familyName}`);
  console.log(`Units per Em: ${unitsPerEm}`);
  
  if (font.variationAxes) {
    console.log('\nVariation Axes:');
    for (const [tag, axis] of Object.entries(font.variationAxes)) {
      console.log(`  ${tag}: ${axis.min} - ${axis.max} (default: ${axis.default})`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('Measuring stem widths...\n');

  const results = {};
  const testChars = ['l', 'I', 'i', 'H', 'n'];

  for (const weight of weights) {
    let fontAtWeight;
    try {
      fontAtWeight = font.getVariation({ wght: weight });
    } catch (e) {
      fontAtWeight = font;
    }

    const measurements = [];
    
    for (const char of testChars) {
      try {
        const glyph = fontAtWeight.glyphForCodePoint(char.charCodeAt(0));
        
        // Method 1: SVG path analysis
        const pathWidth = measureFromSVGPath(glyph);
        
        // Method 2: Metrics-based estimate
        const metricsWidth = estimateFromMetrics(glyph, fontAtWeight);
        
        // Method 3: Path point clusters
        const { xCoords } = collectPathPoints(glyph);
        const clusterWidth = measureFromClusters(xCoords);
        
        // For simple stems (l, I, i), use the smallest measurement
        // For compound glyphs (H, n), metrics width is glyph width, not stem
        const isSimpleStem = ['l', 'I', 'i'].includes(char);
        
        let finalWidth;
        if (isSimpleStem) {
          // For simple stems, visible width ≈ stem width
          finalWidth = metricsWidth;
        } else {
          // For compound glyphs, try path analysis first
          finalWidth = pathWidth || clusterWidth;
        }
        
        if (finalWidth && finalWidth > 0) {
          measurements.push({
            char,
            width: finalWidth,
            pathWidth,
            metricsWidth,
            clusterWidth,
            isSimpleStem
          });
        }
      } catch (e) {
        // Skip
      }
    }

    // For simple stem glyphs, take the average
    const simpleStemMeasurements = measurements.filter(m => m.isSimpleStem);
    let stemWidth = null;
    
    if (simpleStemMeasurements.length > 0) {
      stemWidth = simpleStemMeasurements.reduce((sum, m) => sum + m.width, 0) / simpleStemMeasurements.length;
    }

    const percentage = stemWidth ? (stemWidth / unitsPerEm) * 100 : null;
    const strokeFor32px = stemWidth ? (stemWidth / unitsPerEm) * 32 : null;

    results[weight] = {
      stemWidth: stemWidth ? Math.round(stemWidth * 10) / 10 : null,
      percentage: percentage ? Math.round(percentage * 100) / 100 : null,
      strokeFor32pxViewBox: strokeFor32px ? Math.round(strokeFor32px * 100) / 100 : null,
      rawMeasurements: measurements.map(m => ({
        char: m.char,
        width: Math.round(m.width),
        isSimpleStem: m.isSimpleStem
      }))
    };

    const weightName = getWeightName(weight);
    console.log(`Weight ${weight} (${weightName}):`);
    console.log(`  Stem Width: ${stemWidth ? stemWidth.toFixed(1) : 'N/A'} units`);
    console.log(`  Percentage of Em: ${percentage ? percentage.toFixed(2) : 'N/A'}%`);
    console.log(`  Stroke for 32px icon: ${strokeFor32px ? strokeFor32px.toFixed(2) : 'N/A'}px`);
    console.log(`  Raw: ${measurements.map(m => `${m.char}=${Math.round(m.width)}`).join(', ')}`);
    console.log('');
  }

  // Summary
  console.log('='.repeat(70));
  console.log('\n📋 Summary Table:\n');
  
  console.log('| Weight | Name       | Stem (units) | % of Em | Stroke (32px) |');
  console.log('|--------|------------|--------------|---------|---------------|');
  
  for (const weight of weights) {
    const r = results[weight];
    const name = getWeightName(weight).padEnd(10);
    const stem = (r.stemWidth?.toFixed(1) || 'N/A').padStart(12);
    const pct = (r.percentage?.toFixed(2) || 'N/A').padStart(7);
    const stroke = (r.strokeFor32pxViewBox?.toFixed(2) || 'N/A').padStart(13);
    console.log(`| ${weight}    | ${name} | ${stem} | ${pct}% | ${stroke} |`);
  }

  // Show ratios
  console.log('\n📈 Weight Progression (relative to 400):');
  const baseStroke = results[400]?.strokeFor32pxViewBox;
  if (baseStroke) {
    for (const weight of weights) {
      const stroke = results[weight]?.strokeFor32pxViewBox;
      if (stroke) {
        const ratio = stroke / baseStroke;
        console.log(`  ${weight}: ${stroke.toFixed(2)}px (${ratio.toFixed(2)}x)`);
      }
    }
  }

  // Save outputs
  const outputDir = path.join(__dirname, '..', 'src', 'config');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // JSON output
  const jsonOutput = {
    fontFamily: font.familyName,
    unitsPerEm,
    generatedAt: new Date().toISOString(),
    note: "These are VISIBLE WIDTH measurements, not true stem widths. Use visual calibration for final values.",
    weights: results,
    recommendedStrokeWidths: Object.fromEntries(
      weights.map(w => [w, results[w].strokeFor32pxViewBox])
    )
  };

  fs.writeFileSync(path.join(outputDir, 'fontMetrics.json'), JSON.stringify(jsonOutput, null, 2));

  // TypeScript output
  const tsContent = `/**
 * Icon Stroke Width Configuration
 * 
 * IMPORTANT: These are initial values based on glyph measurements.
 * They represent the VISIBLE WIDTH of simple stem glyphs (l, I, i),
 * which is an approximation of stem width.
 * 
 * Use the visual calibration page to fine-tune these values.
 * 
 * Generated: ${new Date().toISOString()}
 * Font: ${font.familyName}
 * Units per Em: ${unitsPerEm}
 */

export const strokeWidths: Record<number, number> = {
${weights.map(w => `  ${w}: ${results[w].strokeFor32pxViewBox?.toFixed(2) || '1.5'}, // ${getWeightName(w)}`).join('\n')}
};

/**
 * Get the stroke width for a given font weight
 */
export function getStrokeWidth(weight: number): number {
  weight = Math.max(100, Math.min(900, weight));
  
  if (strokeWidths[weight] !== undefined) {
    return strokeWidths[weight];
  }
  
  const sortedWeights = Object.keys(strokeWidths).map(Number).sort((a, b) => a - b);
  let lower = sortedWeights[0], upper = sortedWeights[sortedWeights.length - 1];
  
  for (const w of sortedWeights) {
    if (w <= weight) lower = w;
    if (w >= weight) { upper = w; break; }
  }
  
  if (lower === upper) return strokeWidths[lower];
  
  const t = (weight - lower) / (upper - lower);
  return strokeWidths[lower] + t * (strokeWidths[upper] - strokeWidths[lower]);
}

/**
 * Stroke widths as percentage of icon size
 */
export const strokePercentages: Record<number, number> = {
${weights.map(w => `  ${w}: ${results[w].percentage ? (results[w].percentage / 100).toFixed(4) : '0.05'}, // ${results[w].percentage?.toFixed(2) || 'N/A'}%`).join('\n')}
};
`;

  fs.writeFileSync(path.join(outputDir, 'iconWeights.ts'), tsContent);

  console.log(`\n✅ Results saved to src/config/`);
  console.log('\n⚠️  NOTE: These values are based on visible glyph width, not true stem width.');
  console.log('   Use the visual calibration page (Phase 2) to fine-tune for optimal matching.');
}

function getWeightName(weight) {
  return {
    100: 'Thin', 200: 'ExtraLight', 300: 'Light', 400: 'Regular',
    500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold', 900: 'Black'
  }[weight] || 'Unknown';
}

main().catch(console.error);
