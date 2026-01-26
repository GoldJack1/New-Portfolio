# Icon Generator Logic Documentation

## Overview

The Icon Variant Generator is an Adobe Illustrator script that creates stroke-based icon variants at multiple sizes and weights. The stroke widths are calibrated to match Geologica font weights, ensuring visual consistency between icons and typography.

### Purpose
- Generate multiple icon variants from a single source artboard
- Create variants at different sizes (e.g., 16px, 24px, 32px, 48px)
- Apply different stroke weights (100-900, matching font weights)
- Support two output modes: Artboard generation and SVG export

### Base Calibration
All stroke width calculations are based on a **32x32 pixel artboard** as the reference size. This ensures proportional scaling across all sizes.

---

## Configuration Constants

### STROKE_WIDTHS
Base stroke widths for each font weight at 32px size. These values are calibrated to match Geologica font weights.

```javascript
{
   100: 2.22,   // Thin
   200: 2.78,   // ExtraLight
   300: 3.35,   // Light
   400: 3.91,   // Regular
   500: 4.48,   // Medium
   600: 5.05,   // SemiBold
   700: 5.61,   // Bold
   800: 6.18,   // ExtraBold
   900: 6.74    // Black
}
```

**Usage**: These values are used as the base for proportional stroke width calculation at any size.

### WEIGHT_NAMES
Human-readable names for each weight value.

```javascript
{
   100: 'Thin',
   200: 'ExtraLight',
   300: 'Light',
   400: 'Regular',
   500: 'Medium',
   600: 'SemiBold',
   700: 'Bold',
   800: 'ExtraBold',
   900: 'Black'
}
```

### PRESET_SIZES
Common size presets for quick selection.

```javascript
{
   'Common': [16, 24, 32, 48],
   'All Standard': [16, 18, 20, 24, 32, 48, 64, 128],
   'Small': [12, 14, 16, 18, 20],
   'Medium': [24, 32, 40, 48],
   'Large': [48, 64, 96, 128, 256]
}
```

### PRESET_WEIGHTS
Common weight presets for quick selection.

```javascript
{
   'Regular Only': [400],
   'Regular + Bold': [400, 700],
   'Light to Bold': [300, 400, 500, 700],
   'All Weights': [100, 200, 300, 400, 500, 600, 700, 800, 900]
}
```

---

## Core Utility Functions

### calculateStroke(weight, size)

Calculates the stroke width for a given weight and size using proportional scaling from the 32px base.

**Formula:**
```
strokeWidth = (baseStroke / 32) * size
```

**Parameters:**
- `weight` (number): Font weight (100-900)
- `size` (number): Target icon size in pixels

**Returns:**
- `number`: Calculated stroke width

**Algorithm:**
1. Look up base stroke width from `STROKE_WIDTHS[weight]`
2. If weight not found, default to Regular (400) weight
3. Scale proportionally: `(baseStroke / 32) * size`
4. Return calculated stroke width

**Example:**
- Weight: 400 (Regular), Size: 64px
- Base stroke: 3.91
- Calculation: `(3.91 / 32) * 64 = 7.82`

---

## Artboard Generation Logic

### generateArtboards(options)

Main function that creates new artboards with icon variants. This is the core generation logic.

#### Input Processing

**Options Object Structure:**
```javascript
{
   name: string,                    // Base name for artboards
   sizes: [number],                 // Array of sizes to generate
   weights: [number],               // Array of weights to generate
   spacing: number,                 // Spacing between artboards
   sourceArtboardIndex: number,     // Index of source artboard
   fillArtboard: boolean,           // Scale to fill artboard vs proportional
   padding: number,                 // Padding value
   paddingIsPercent: boolean,       // Whether padding is percentage
   isOutsideStroke: boolean,        // Whether stroke is outside path
   shrinkInnerShapes: boolean        // Scale inner elements for compound paths
}
```

**Initial Steps:**
1. Extract source artboard dimensions from `artboardRect`
2. Select all items on the source artboard
3. Group source items for safe duplication
4. Sort sizes and weights arrays (ascending)
5. Calculate source icon dimensions from grouped bounds
6. Extract original stroke width for compound path handling

#### Positioning Algorithm

**Grid Layout:**
- **Rows**: One row per size (sizes sorted ascending)
- **Columns**: One column per weight (weights sorted ascending)
- **Starting Position**: Below the lowest existing artboard

**Position Calculation:**
```javascript
// Find lowest Y coordinate of all existing artboards
lowestY = sourceBottom
for each artboard:
   if artboard.bottom < lowestY:
      lowestY = artboard.bottom

// Start positioning below existing artboards
currentY = lowestY - spacing

// For each size (row):
   currentY -= size
   currentX = sourceLeft
   
   // For each weight (column):
      // Create artboard at [currentX, currentY, currentX + size, currentY + size]
      currentX += size + spacing
   
   currentY -= spacing  // Row spacing
```

**Artboard Rect Format:**
Illustrator uses `[left, top, right, bottom]` format where:
- `left`: X coordinate of left edge
- `top`: Y coordinate of top edge (higher Y = higher on canvas)
- `right`: X coordinate of right edge
- `bottom`: Y coordinate of bottom edge (lower Y = lower on canvas)

#### Scaling Logic

The script supports two scaling modes:

##### 1. Fill Artboard Mode (`fillArtboard: true`)

Scales the icon to fill the artboard while respecting padding and stroke width.

**Padding Calculation:**
```javascript
if (paddingIsPercent):
   paddingPx = (size * padding / 100)
else:
   // Scale pixel padding proportionally (base size is 32px)
   paddingPx = (padding / 32) * size
```

**Stroke Width Calculation:**
```javascript
baseStroke = STROKE_WIDTHS[weight] || STROKE_WIDTHS[400]
strokeWidth = (baseStroke / 32) * size
```

**Stroke Adjustment:**
```javascript
if (isOutsideStroke):
   strokeAdjustment = strokeWidth * 2  // Full width on both sides
else:
   strokeAdjustment = strokeWidth      // Centered stroke
```

**Available Space:**
```javascript
availableSize = size - (paddingPx * 2) - strokeAdjustment
```

**Scale Factor:**
```javascript
scaleToFitWidth = availableSize / sourceIconWidth
scaleToFitHeight = availableSize / sourceIconHeight
scaleFactor = Math.min(scaleToFitWidth, scaleToFitHeight)

// Safety check
if (scaleFactor <= 0):
   scaleFactor = 0.1
```

##### 2. Proportional Mode (`fillArtboard: false`)

Simple proportional scaling based on artboard size ratio.

```javascript
scaleFactor = size / sourceWidth
strokeWidth = calculateStroke(weight, size)
```

#### Icon Transformation Process

For each size/weight combination:

1. **Create Artboard:**
   ```javascript
   artboardRect = [currentX, currentY + size, currentX + size, currentY]
   newArtboard = doc.artboards.add(artboardRect)
   newArtboard.name = name + '_' + weight + '_' + size + 'x' + size
   ```

2. **Duplicate Source Group:**
   ```javascript
   newGroup = sourceGroup.duplicate()
   ```

3. **Scale Icon:**
   ```javascript
   newGroup.resize(
      scaleFactor * 100, scaleFactor * 100,  // X and Y scale
      true, true, true, true,                 // Scale all properties
      scaleFactor * 100,                      // Line scale
      Transformation.CENTER                    // Scale from center
   )
   ```

4. **Center Icon:**
   ```javascript
   artboardCenterX = currentX + (size / 2)
   artboardCenterY = currentY + (size / 2)
   
   groupWidth = groupBounds[2] - groupBounds[0]
   groupHeight = groupBounds[1] - groupBounds[3]
   
   newLeft = artboardCenterX - (groupWidth / 2)
   newTop = artboardCenterY + (groupHeight / 2)
   
   newGroup.position = [newLeft, newTop]
   ```

5. **Apply Stroke Width:**
   ```javascript
   applyStrokeWidth(newGroup, strokeWidth)
   ```

6. **Handle Compound Paths (if enabled):**
   See [Compound Path Handling](#compound-path-handling) section below.

#### Cleanup

After all variants are created:

1. Restore original items from temporary group
2. Remove temporary group
3. Clear selection

---

## SVG Export Logic

### exportToSVG(options)

Exports icon variants as SVG files. Uses similar logic to artboard generation but creates temporary documents for each variant.

#### Key Differences from Artboard Generation

1. **Temporary Documents**: Creates a new document for each variant
2. **File System**: Exports to specified folder with naming pattern
3. **Cleanup**: Closes temporary documents after export
4. **Error Handling**: Collects errors and reports at end

#### Export Process

For each size/weight combination:

1. **Calculate Scale and Stroke** (same as artboard generation)

2. **Create Temporary Document:**
   ```javascript
   tempDoc = app.documents.add(DocumentColorSpace.RGB, size, size)
   // Unlock all layers
   for each layer:
      layer.locked = false
   ```

3. **Duplicate and Transform Icon:**
   ```javascript
   tempGroup = sourceGroup.duplicate(tempDoc.layers[0], ElementPlacement.PLACEATEND)
   unlockItems(tempGroup)
   // Scale, center, and apply stroke (same as artboard generation)
   ```

4. **Generate Filename:**
   ```javascript
   fileName = namingPattern
      .replace('{name}', options.name)
      .replace('{weight}', weight)
      .replace('{size}', size + 'x' + size)
   ```

5. **Handle Folder-Based Naming:**
   ```javascript
   // If fileName contains '/', create subdirectories
   fileNameParts = fileName.split('/')
   if (fileNameParts.length > 1):
      for each part except last:
         create subdirectory if it doesn't exist
      fileName = last part
   ```

6. **Export SVG:**
   ```javascript
   svgOptions = new ExportOptionsSVG()
   svgOptions.embedRasterImages = false
   svgOptions.cssProperties = SVGCSSPropertyLocation.PRESENTATIONATTRIBUTES
   svgOptions.fontSubsetting = SVGFontSubsetting.None
   svgOptions.documentEncoding = SVGDocumentEncoding.UTF8
   svgOptions.coordinatePrecision = 2
   
   tempDoc.exportFile(svgFile, ExportType.SVG, svgOptions)
   ```

7. **Close Temporary Document:**
   ```javascript
   tempDoc.close(SaveOptions.DONOTSAVECHANGES)
   ```

#### Folder Path Resolution

```javascript
exportPath = options.exportFolder
if (exportPath starts with '~'):
   exportPath = Folder.userData.parent.fsName + exportPath.substring(1)

exportFolder = new Folder(exportPath)
if (!exportFolder.exists):
   exportFolder.create()
```

---

## Helper Functions

### applyStrokeWidth(item, strokeWidth)

Recursively applies stroke width to all path items in a group.

**Algorithm:**
1. Check item type:
   - **PathItem**: Set `strokeWidth` if item has stroke
   - **CompoundPathItem**: Set stroke width on all path items
   - **GroupItem**: Recursively call on all page items
2. Handle errors gracefully (locked/unmodifiable items)

**Implementation:**
```javascript
if (item.typename === 'PathItem'):
   if (item.stroked):
      item.strokeWidth = strokeWidth
else if (item.typename === 'CompoundPathItem'):
   for each pathItem:
      if (pathItem.stroked):
         pathItem.strokeWidth = strokeWidth
else if (item.typename === 'GroupItem'):
   for each pageItem:
      applyStrokeWidth(pageItem, strokeWidth)
```

### getOriginalStrokeWidth(item)

Recursively extracts the original stroke width from the source icon.

**Purpose**: Used for compound path scaling to determine how much the stroke increased.

**Algorithm:**
1. Check item type:
   - **PathItem**: Return `strokeWidth` if stroked and > 0
   - **CompoundPathItem**: Return first found stroke width
   - **GroupItem**: Recursively search, return first found
2. Return `null` if no stroke found

**Fallback**: If no stroke found, defaults to Regular weight (400) at 32px: `3.91`

### getLargestElementSize(item)

Finds the size of the largest element to identify the outer shape in compound paths.

**Algorithm:**
1. For **GroupItem**: Recursively find max size of all children
2. For **PathItem/CompoundPathItem**: Calculate size from bounds
   ```javascript
   width = bounds[2] - bounds[0]
   height = bounds[1] - bounds[3]
   size = Math.max(width, height)
   ```
3. Return maximum size found

**Purpose**: Used to distinguish outer shapes from inner shapes (95% threshold).

### scaleInnerElements(item, scaleFactor, isTopLevel, outerSize)

Recursively scales inner elements in compound paths to compensate for stroke width increase.

**Parameters:**
- `item`: Item to process
- `scaleFactor`: Scale factor to apply (0.5 to 1.0)
- `isTopLevel`: Whether this is the top-level group (don't scale top level)
- `outerSize`: Size of the largest element (outer shape)

**Algorithm:**

1. **Top-Level Group** (`isTopLevel: true`):
   - Don't scale the group itself
   - Recursively scale all direct children with `isTopLevel: false`

2. **Nested Group** (`isTopLevel: false`):
   - Calculate element size from bounds
   - If element size < `outerSize * 0.95` (it's an inner element):
     - Scale the group
   - Continue recursively scaling children

3. **PathItem/CompoundPathItem** (`isTopLevel: false`):
   - Calculate path size from bounds
   - If path size < `outerSize * 0.95` (it's an inner path):
     - Scale the path

**95% Threshold**: Elements smaller than 95% of the outer size are considered "inner" and will be scaled.

**Scaling:**
```javascript
item.resize(
   scaleFactor * 100, scaleFactor * 100,
   true, true, true, true,  // Scale all properties
   scaleFactor * 100,        // Line scale
   Transformation.CENTER     // Scale from center
)
```

### unlockItems(item)

Recursively unlocks locked items.

**Algorithm:**
1. Unlock the item itself if locked
2. For **GroupItem**: Recursively unlock all page items
3. For **CompoundPathItem**: Unlock all path items
4. Handle errors gracefully

**Purpose**: Required for SVG export when duplicating to temporary documents, as some items may be locked.

---

## Compound Path Handling

### Overview

When stroke weight increases, the stroke takes up more space. For compound paths (icons with inner shapes), this can cause visual issues where inner elements appear too close to the outer stroke. The script can automatically shrink inner elements to compensate.

### Detection

1. **Get Original Stroke Width:**
   ```javascript
   originalStrokeWidth = getOriginalStrokeWidth(sourceGroup)
   if (!originalStrokeWidth):
      originalStrokeWidth = STROKE_WIDTHS[400]  // Default to Regular
   ```

2. **Calculate Stroke Increase:**
   ```javascript
   // Scale original stroke to current size for comparison
   originalStrokeScaled = originalStrokeWidth * (size / sourceWidth)
   
   // Calculate increase
   strokeIncrease = strokeWidth - originalStrokeScaled
   ```

3. **Only Process if Stroke Increased:**
   ```javascript
   if (strokeIncrease > 0.001):  // Threshold to avoid floating point issues
      // Process inner element scaling
   ```

### Inner Element Scaling Calculation

**Mathematical Approach:**

1. **Find Outer Shape Size:**
   ```javascript
   outerSize = getLargestElementSize(newGroup)
   ```

2. **Calculate Stroke Increase Per Side:**
   ```javascript
   strokeIncreasePerSide = strokeIncrease / 2
   ```
   (For centered strokes, the increase affects both sides equally)

3. **Calculate Reduction Ratio:**
   ```javascript
   if (outerSize > 0):
      reductionRatio = strokeIncreasePerSide / outerSize
   else:
      // Fallback: use conservative ratio
      reductionRatio = strokeIncrease / size
   ```

4. **Calculate Inner Scale Factor:**
   ```javascript
   innerScaleFactor = Math.max(0.5, 1 - reductionRatio)
   ```
   (Minimum scale of 0.5 to prevent excessive shrinking)

5. **Apply Scaling:**
   ```javascript
   scaleInnerElements(newGroup, innerScaleFactor, true, outerSize)
   ```

6. **Re-center After Scaling:**
   ```javascript
   // Recalculate bounds and center position
   updatedBounds = newGroup.geometricBounds
   updatedWidth = updatedBounds[2] - updatedBounds[0]
   updatedHeight = updatedBounds[1] - updatedBounds[3]
   updatedLeft = artboardCenterX - (updatedWidth / 2)
   updatedTop = artboardCenterY + (updatedHeight / 2)
   newGroup.position = [updatedLeft, updatedTop]
   ```

### Example

**Scenario:**
- Original stroke: 3.91 (Regular at 32px)
- New stroke: 5.61 (Bold at 32px)
- Size: 32px
- Outer size: 28px

**Calculation:**
```
originalStrokeScaled = 3.91 * (32 / 32) = 3.91
strokeIncrease = 5.61 - 3.91 = 1.70
strokeIncreasePerSide = 1.70 / 2 = 0.85
reductionRatio = 0.85 / 28 = 0.0304
innerScaleFactor = Math.max(0.5, 1 - 0.0304) = 0.9696
```

Inner elements are scaled to 96.96% of their original size to compensate for the thicker stroke.

---

## Key Algorithms Summary

### 1. Stroke Width Calculation
```
strokeWidth = (STROKE_WIDTHS[weight] / 32) * size
```
Proportional scaling from 32px base.

### 2. Padding Calculation
**Percentage:**
```
paddingPx = (size * padding / 100)
```

**Pixel (scaled):**
```
paddingPx = (padding / 32) * size
```
Pixel padding scales proportionally with size (base: 32px).

### 3. Scale Factor (Fill Mode)
```
availableSize = size - (paddingPx * 2) - strokeAdjustment
scaleToFitWidth = availableSize / sourceIconWidth
scaleToFitHeight = availableSize / sourceIconHeight
scaleFactor = Math.min(scaleToFitWidth, scaleToFitHeight)
```

### 4. Scale Factor (Proportional Mode)
```
scaleFactor = size / sourceWidth
```

### 5. Inner Element Scaling
```
originalStrokeScaled = originalStrokeWidth * (size / sourceWidth)
strokeIncrease = strokeWidth - originalStrokeScaled
strokeIncreasePerSide = strokeIncrease / 2
reductionRatio = strokeIncreasePerSide / outerSize
innerScaleFactor = Math.max(0.5, 1 - reductionRatio)
```

### 6. Grid Layout Positioning
```
// Find starting position
lowestY = min(all artboard bottoms)
currentY = lowestY - spacing

// For each size (row):
   currentY -= size
   currentX = sourceLeft
   
   // For each weight (column):
      create artboard at [currentX, currentY + size, currentX + size, currentY]
      currentX += size + spacing
   
   currentY -= spacing
```

---

## Data Flow

### Artboard Generation Workflow

```
User Options
    ↓
Extract Source Artboard
    ↓
Group Source Items
    ↓
Sort Sizes & Weights
    ↓
Calculate Original Stroke Width
    ↓
Find Starting Position (below existing artboards)
    ↓
┌─────────────────────────────────────┐
│ For each size:                      │
│   For each weight:                  │
│     ├─ Calculate scale factor       │
│     ├─ Calculate stroke width        │
│     ├─ Create artboard              │
│     ├─ Duplicate & scale icon       │
│     ├─ Center icon                  │
│     ├─ Apply stroke width           │
│     ├─ Scale inner elements (if enabled)
│     └─ Position next artboard       │
└─────────────────────────────────────┘
    ↓
Restore Original Items
    ↓
Cleanup
```

### SVG Export Workflow

```
User Options
    ↓
Extract Source Artboard
    ↓
Group Source Items
    ↓
Create/Verify Export Folder
    ↓
Sort Sizes & Weights
    ↓
Calculate Original Stroke Width
    ↓
┌─────────────────────────────────────┐
│ For each size:                      │
│   For each weight:                  │
│     ├─ Calculate scale factor       │
│     ├─ Calculate stroke width        │
│     ├─ Create temporary document    │
│     ├─ Duplicate icon to temp doc   │
│     ├─ Unlock items                 │
│     ├─ Scale icon                   │
│     ├─ Center icon                  │
│     ├─ Apply stroke width           │
│     ├─ Scale inner elements (if enabled)
│     ├─ Generate filename            │
│     ├─ Create subdirectories (if needed)
│     ├─ Export SVG                   │
│     └─ Close temp document          │
└─────────────────────────────────────┘
    ↓
Restore Original Items
    ↓
Report Results
```

### Options Resolution

The script supports both global options and per-artboard overrides:

```
For each selected artboard:
   options = {
      name: artboardOptions.name || global default,
      sizes: artboardOptions.sizes || global selected sizes,
      weights: artboardOptions.weights || global selected weights,
      fillArtboard: artboardOptions.fillArtboard ?? global fillArtboard,
      padding: artboardOptions.padding ?? global padding,
      paddingIsPercent: artboardOptions.paddingIsPercent ?? global paddingIsPercent,
      isOutsideStroke: artboardOptions.isOutsideStroke ?? global isOutsideStroke,
      shrinkInnerShapes: artboardOptions.shrinkInnerShapes ?? global shrinkInnerShapes
   }
```

**Resolution Logic:**
- If per-artboard option is set (not `null`), use it
- Otherwise, use global option
- Boolean options use `!== undefined` check (allows `false` to override)
- Other options use `??` (nullish coalescing)

---

## Error Handling

### Graceful Degradation

The script handles errors gracefully in several areas:

1. **Locked Items:**
   - `applyStrokeWidth`: Skips locked/unmodifiable items
   - `getOriginalStrokeWidth`: Returns `null` if item can't be accessed
   - `unlockItems`: Skips items that can't be unlocked

2. **Missing Strokes:**
   - If no original stroke found, defaults to Regular (400) weight
   - Uses `STROKE_WIDTHS[400] || 3.91` as fallback

3. **Invalid Scale Factors:**
   - If `scaleFactor <= 0`, sets to `0.1` to prevent errors

4. **SVG Export Errors:**
   - Collects errors in array
   - Continues processing remaining variants
   - Reports errors at end (first 5, then count of remaining)

5. **Missing Items:**
   - Validates source artboard has items before processing
   - Shows alert and returns early if no items found

---

## Coordinate System Notes

### Illustrator Coordinate System

Illustrator uses a coordinate system where:
- **Origin**: Top-left corner (0, 0)
- **X-axis**: Increases to the right
- **Y-axis**: Increases downward (opposite of typical screen coordinates)
- **Artboard Rect**: `[left, top, right, bottom]`
  - `left`: X of left edge
  - `top`: Y of top edge (smaller Y = higher on canvas)
  - `right`: X of right edge
  - `bottom`: Y of bottom edge (larger Y = lower on canvas)

### Geometric Bounds

`geometricBounds` returns `[left, top, right, bottom]`:
- Width: `right - left`
- Height: `top - bottom` (note: top > bottom in Illustrator)

### Positioning

When centering an icon:
```javascript
centerX = artboardLeft + (artboardWidth / 2)
centerY = artboardTop - (artboardHeight / 2)  // Note: subtract because Y increases downward

iconLeft = centerX - (iconWidth / 2)
iconTop = centerY + (iconHeight / 2)  // Note: add because top > bottom
```

---

## Performance Considerations

### Optimization Strategies

1. **Single Group Creation:**
   - Groups source items once, duplicates for each variant
   - Avoids repeated grouping operations

2. **Sorted Processing:**
   - Sorts sizes and weights once at start
   - Ensures consistent output order

3. **Batch Operations:**
   - Processes all variants in single pass
   - Minimizes document operations

4. **Temporary Document Cleanup:**
   - Closes temp documents immediately after export
   - Prevents memory buildup during large batch exports

### Limitations

- **Large Batches**: Processing many variants (e.g., 9 weights × 8 sizes = 72 variants) can be slow
- **Complex Compound Paths**: Inner element scaling requires recursive traversal, slower for deeply nested groups
- **Memory**: SVG export creates temporary documents, uses more memory than artboard generation

---

## Extension Points

### Customization Opportunities

1. **Stroke Width Calibration:**
   - Modify `STROKE_WIDTHS` to match different fonts
   - Recalibrate by measuring font stroke widths at 32px

2. **Size Presets:**
   - Add custom presets to `PRESET_SIZES`
   - Modify existing presets for common use cases

3. **Weight Presets:**
   - Add custom presets to `PRESET_WEIGHTS`
   - Create project-specific weight combinations

4. **Naming Patterns:**
   - SVG export supports custom naming patterns
   - Use `{name}`, `{weight}`, `{size}` placeholders

5. **Export Options:**
   - Modify `svgOptions` for different SVG output formats
   - Adjust `coordinatePrecision` for file size vs quality tradeoff

---

## Conclusion

The Icon Variant Generator provides a robust system for generating icon variants with consistent stroke weights across multiple sizes. The core logic focuses on:

1. **Proportional Scaling**: All calculations scale from a 32px base
2. **Flexible Output**: Supports both artboard generation and SVG export
3. **Compound Path Support**: Intelligent inner element scaling for complex icons
4. **Error Resilience**: Graceful handling of edge cases and locked items

The separation of UI and logic allows the core algorithms to be understood and potentially reused in other contexts.
