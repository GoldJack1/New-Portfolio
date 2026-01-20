# SVG Icon Processing Script

This script processes SVG files exported from Illustrator to prepare them for use in the icon system.

## Features

- ✅ Adds `vector-effect="non-scaling-stroke"` to all stroke paths
- ✅ Converts hardcoded stroke colors (`#000`, `#fff`, etc.) to `currentColor`
- ✅ Cleans up unnecessary attributes (UUIDs, data-name, XML declarations)
- ✅ **Makes SVGs responsive by default** (removes fixed width/height)
- ✅ Adds `preserveAspectRatio` for better responsive behavior
- ✅ Optional `--fixed-size` flag to keep width/height attributes

## Usage

### Basic Usage (process files in place)
```bash
node scripts/process-svg-icons.js .cursor/Test/2
```

### Process and output to different directory
```bash
node scripts/process-svg-icons.js .cursor/Test/2 --output src/assets/icons/processed
```

### Process recursively (subdirectories)
```bash
node scripts/process-svg-icons.js .cursor/Test --recursive
```

### Combine options
```bash
node scripts/process-svg-icons.js .cursor/Test/2 --output src/assets/icons --recursive
```

### Keep fixed size (not responsive)
```bash
node scripts/process-svg-icons.js .cursor/Test/2 --fixed-size
```

## Options

- `--output <dir>` - Output directory (default: processes files in place)
- `--recursive` - Process subdirectories recursively
- `--fixed-size` - Keep width/height attributes (default: removes them for responsive scaling)

## Example Workflow

1. Export icons from Illustrator to `.cursor/Test/2/`
2. Run the script:
   ```bash
   node scripts/process-svg-icons.js .cursor/Test/2 --scale
   ```
3. Icons are now ready with:
   - `vector-effect="non-scaling-stroke"` added
   - `stroke="currentColor"` instead of hardcoded colors
   - Cleaned up attributes
   - **Responsive scaling** (no fixed width/height, uses viewBox)
   - `preserveAspectRatio="xMidYMid meet"` for proper scaling
   - Original viewBox preserved (e.g., `0 0 32 32`)
