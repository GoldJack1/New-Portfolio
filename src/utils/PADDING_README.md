# Universal Padding System

A centralized padding system for consistent spacing across the entire site.

## Files

- `padding.ts` - Padding constants and utility functions
- `paddingClasses.ts` - Pre-defined Tailwind class combinations

## Usage

### Using Padding Classes (Recommended)

Import and use pre-defined class combinations:

```tsx
import { PADDING_CLASSES } from '../utils/paddingClasses'

// Page content padding
<section className={`w-full ${PADDING_CLASSES.page.full} bg-gray-50`}>
  {/* Content */}
</section>

// Header padding
<div className={PADDING_CLASSES.header.horizontal}>
  {/* Header content */}
</div>

// Footer padding
<div className={PADDING_CLASSES.footer.horizontal}>
  {/* Footer content */}
</div>

// Custom combinations
<div className={`${PADDING_CLASSES.horizontal} ${PADDING_CLASSES.vertical.large}`}>
  {/* Content */}
</div>
```

### Available Padding Classes

#### Horizontal Padding
- `PADDING_CLASSES.horizontal` - `px-4 md:px-8` (responsive)

#### Vertical Padding
- `PADDING_CLASSES.vertical.small` - `py-4`
- `PADDING_CLASSES.vertical.medium` - `py-8`
- `PADDING_CLASSES.vertical.large` - `py-16`
- `PADDING_CLASSES.vertical.xlarge` - `py-24`

#### Bottom Padding
- `PADDING_CLASSES.bottom.small` - `pb-4`
- `PADDING_CLASSES.bottom.medium` - `pb-8`
- `PADDING_CLASSES.bottom.large` - `pb-16`
- `PADDING_CLASSES.bottom.xlarge` - `pb-24`

#### Top Padding
- `PADDING_CLASSES.top.small` - `pt-4`
- `PADDING_CLASSES.top.medium` - `pt-8`
- `PADDING_CLASSES.top.large` - `pt-16`
- `PADDING_CLASSES.top.xlarge` - `pt-24`

#### Page Content
- `PADDING_CLASSES.page.horizontal` - `px-4 md:px-8`
- `PADDING_CLASSES.page.vertical` - `pb-16 md:pb-24`
- `PADDING_CLASSES.page.full` - `px-4 md:px-8 pb-16 md:pb-24`

#### Header
- `PADDING_CLASSES.header.horizontal` - `px-4 md:px-8`
- `PADDING_CLASSES.header.container` - `px-4 md:px-8`

#### Footer
- `PADDING_CLASSES.footer.horizontal` - `px-4 md:px-8`
- `PADDING_CLASSES.footer.container` - `px-4 md:px-8`

#### Section
- `PADDING_CLASSES.section.horizontal` - `px-4 md:px-8`
- `PADDING_CLASSES.section.vertical` - `py-16 md:py-24`
- `PADDING_CLASSES.section.full` - `px-4 md:px-8 py-16 md:py-24`

### Using Padding Constants

For inline styles or custom calculations:

```tsx
import { PADDING } from '../utils/padding'

// Access padding values
const mobilePadding = PADDING.page.horizontal.mobile // '1rem'
const desktopPadding = PADDING.page.horizontal.desktop // '2rem'
```

### Using Utility Functions

```tsx
import { getPagePadding, getHeaderPadding, getFooterPadding } from '../utils/padding'

// Get class strings
const pageClasses = getPagePadding() // 'px-4 md:px-8 pb-16 md:pb-24'
const headerClasses = getHeaderPadding() // 'px-4 md:px-8'
```

## Updating Padding Values

To change padding across the entire site:

1. **Update constants** in `padding.ts` - Change the rem values
2. **Update classes** in `paddingClasses.ts` - Change the Tailwind classes
3. All components using these utilities will automatically update

## Examples

### Page Content
```tsx
<section className={`w-full ${PADDING_CLASSES.page.full} bg-gray-50`}>
  <h1>Page Title</h1>
  <p>Content here</p>
</section>
```

### Header
```tsx
<nav className="fixed top-0">
  <div className={PADDING_CLASSES.header.horizontal}>
    {/* Navigation items */}
  </div>
</nav>
```

### Footer
```tsx
<footer>
  <div className={PADDING_CLASSES.footer.horizontal}>
    {/* Footer content */}
  </div>
</footer>
```

### Custom Section
```tsx
<div className={`${PADDING_CLASSES.section.full} bg-gray-100`}>
  {/* Section content */}
</div>
```

## Benefits

1. **Consistency** - All padding values are centralized
2. **Maintainability** - Change padding site-wide by updating one file
3. **Type Safety** - TypeScript ensures correct usage
4. **Documentation** - Clear naming makes intent obvious
5. **Flexibility** - Mix and match classes as needed
