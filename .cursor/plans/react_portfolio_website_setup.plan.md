# React Portfolio Website Setup

## Overview

Create a modern React portfolio website using Vite, React Router, and Tailwind CSS with full design control and seamless responsive scaling from mobile to desktop. Features a monochrome color system with a subtle blue hue for a sophisticated, cohesive design. **No borders will be used** - separation and hierarchy will be achieved through background colors, spacing, and shadows. **All buttons and text inputs are pill-shaped** (rounded-full), and **icon-only buttons are circular** (perfect circles with equal width/height).

## React Version & Package Recommendations

### Recommended React Version

- **React 18.3.x** (RECOMMENDED for maximum package compatibility as of January 2026)
  - **Best choice for package compatibility**: While React 19.2.1 is the latest stable release, many third-party packages still have compatibility issues
  - React 18.3.x has been widely adopted with broad ecosystem support
  - Most libraries (including react-router-dom, react-icons, framer-motion) fully support React 18.3.x
  - Avoids peer dependency errors and `--legacy-peer-deps` workarounds needed with React 19
  - Strong security track record with all security patches applied
  - Concurrent rendering features
  - Stable and battle-tested

**Note**: React 19.2.1 exists but many packages still require workarounds. React 18.3.x is the safer choice for a new project.

### Core Packages

- `react@^18.3.1` & `react-dom@^18.3.1` - Core React library (best package compatibility)
- `react-router-dom@^6.28.0` - Client-side routing (latest as of 2026)
- `tailwindcss@^3.4.0` - Utility-first CSS framework
- `autoprefixer@^10.4.0` & `postcss@^8.4.0` - Tailwind CSS dependencies

### Useful Additional Packages

- `@headlessui/react@^2.0.0` - Accessible UI components (dropdowns, modals, transitions)
- `framer-motion@^11.0.0` - Smooth animations and transitions (for slider, toggle animations)
- `react-icons@^5.3.0` - Icon library (for social media icons and UI component icons)
- `@tailwindcss/typography@^0.5.0` - Enhanced typography plugin
- `@tailwindcss/forms@^0.5.0` - Better form styling (for inputs, checkboxes, radios)

## Monochrome Color System with Slight Blue Hue

### Color Palette Structure

All colors use a monochrome grayscale system with a subtle blue tint for sophistication:

**Grayscale with Blue Hue (50-900 scale):**

- **50** - Lightest blue-gray (almost white with blue tint) - `#F8F9FA` → `#F0F4F8`
- **100** - Very light blue-gray - `#E9ECEF` → `#D9E2EC`
- **200** - Light blue-gray - `#DEE2E6` → `#C5D4E3`
- **300** - Light-medium blue-gray - `#CED4DA` → `#A8B8CC`
- **400** - Medium-light blue-gray - `#ADB5BD` → `#7A8FA8`
- **500** - Base medium blue-gray - `#6C757D` → `#5A6B7F`
- **600** - Medium-dark blue-gray - `#495057` → `#4A5A6B`
- **700** - Dark blue-gray - `#343A40` → `#3A4757`
- **800** - Darker blue-gray - `#212529` → `#2A3442`
- **900** - Darkest blue-gray (almost black with blue tint) - `#0D1117` → `#1A2332`

### Color Variants (All Monochrome with Blue Hue)

- **Primary** - Darkest blue-grays (800-900) for main content, primary buttons, headings
- **Secondary** - Medium blue-grays (500-600) for secondary content, secondary buttons
- **Tertiary** - Light blue-grays (300-400) for subtle accents, tertiary buttons

### Text Colors

- **Text Primary** - 900 or 800 (main body text, headings) - High contrast
- **Text Secondary** - 600-700 (secondary text, captions) - Medium contrast
- **Text Tertiary** - 400-500 (tertiary text, hints) - Lower contrast
- **Text Muted** - 300-400 (disabled text, placeholders) - Lowest contrast
- **Text Inverse** - 50-100 (text on dark backgrounds)

### Background Colors

- **Background Primary** - White or 50 (main page background)
- **Background Secondary** - 100-200 (card backgrounds, sections)
- **Background Tertiary** - 200-300 (subtle backgrounds, hover states)
- **Background Overlay** - 900 with opacity (modal/overlay backgrounds)

### Component States (All Monochrome with Blue Hue)

- **Hover** - Slightly darker/lighter blue-grays (shift by 100-200 in scale)
- **Active** - Darker blue-grays (shift by 200-300 in scale)
- **Disabled** - Light blue-grays (300-400) with reduced opacity (50-60%)
- **Focus** - Focus ring in darker blue-grays (600-700) with ring effect (no borders)
- **Success** - Slightly lighter blue-gray (500-600) for positive states
- **Warning** - Medium blue-gray (400-500) for warning states
- **Error** - Darker blue-gray (700-800) for error states
- **Info** - Base blue-gray (500-600) for informational states

### Tailwind Configuration

The color system will be configured in `tailwind.config.js`:

```javascript
colors: {
  gray: {
    50: '#F0F4F8',   // Lightest blue-gray
    100: '#D9E2EC',  // Very light blue-gray
    200: '#C5D4E3',  // Light blue-gray
    300: '#A8B8CC',  // Light-medium blue-gray
    400: '#7A8FA8',  // Medium-light blue-gray
    500: '#5A6B7F',  // Base medium blue-gray
    600: '#4A5A6B',  // Medium-dark blue-gray
    700: '#3A4757',  // Dark blue-gray
    800: '#2A3442',  // Darker blue-gray
    900: '#1A2332',  // Darkest blue-gray
  },
  primary: {
    DEFAULT: '#2A3442', // 800
    light: '#3A4757',   // 700
    dark: '#1A2332',    // 900
  },
  secondary: {
    DEFAULT: '#5A6B7F', // 500
    light: '#7A8FA8',   // 400
    dark: '#4A5A6B',    // 600
  },
  tertiary: {
    DEFAULT: '#A8B8CC', // 300
    light: '#C5D4E3',   // 200
    dark: '#7A8FA8',    // 400
  },
}
```

## Project Structure

```
/
├── public/
│   └── (static assets)
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── Toggle.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Radio.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Alert.tsx
│   │   │   └── Progress.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx (pill navigation header)
│   │   └── DesignSystem/
│   │       ├── ColorPalette.tsx
│   │       ├── TypographyShowcase.tsx
│   │       ├── ButtonShowcase.tsx
│   │       ├── FormControlsShowcase.tsx
│   │       └── ComponentShowcase.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── SiteDesignSystem.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── routes.tsx (or routing config)
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── package.json
```

## Implementation Steps

### 1. Project Initialization

- Initialize Vite + React + TypeScript project
- Install core dependencies (React, React Router, Tailwind CSS)
- Configure Tailwind CSS with PostCSS
- Set up Tailwind config with monochrome blue-hued color system

### 2. Color System Configuration

- Define monochrome color palette with blue hue in `tailwind.config.js`
- Set up primary, secondary, tertiary color variants
- Configure text colors (primary, secondary, tertiary, muted)
- Configure background colors (primary, secondary, tertiary)
- Set up component state colors (hover, active, disabled, focus)
- Note: No borders will be used on the website
- Ensure proper contrast ratios for accessibility (WCAG AA compliance)

### 3. Font Integration

- Add Geologica Cursive font from Google Fonts
- Configure in `index.css` using `@import`
- Extend Tailwind config to include `font-geologica` utility class
- Set as default font family or create custom font classes

### 4. Routing Setup

- Configure React Router in `App.tsx`
- Set up routes for: `/`, `/projects`, `/about`, `/contact`, `/design-system`
- Create pill navigation header component

### 4.5. Pill Navigation Header Component

Create `Navigation.tsx` with pill-style navigation:

- **Design**: Rounded pill-shaped navigation buttons/links
- **Layout**: 
  - Centered horizontal layout on desktop
  - Responsive: Stack vertically on mobile, horizontal on tablet/desktop
  - Fixed or sticky positioning option at top of page
- **Navigation Items**: 
  - Home, Projects, About, Contact, Site Design System
  - Active state highlighting (current page)
  - Hover states with smooth transitions
- **Styling**:
  - Pill-shaped buttons with rounded-full styling
  - Monochrome blue-hued color system
  - Active pill: Darker blue-gray background (800-900)
  - Inactive pills: Lighter blue-gray background (200-300) or transparent
  - Hover: Slightly darker/lighter blue-gray transition
  - Smooth transitions using framer-motion or CSS transitions
- **Features**:
  - Active route detection using React Router's `useLocation` hook
  - Smooth scroll behavior
  - Accessible (keyboard navigation, ARIA labels)
  - Responsive breakpoints (mobile: stacked, tablet/desktop: horizontal row)
  - Optional: Mobile hamburger menu if needed for very small screens
- **Color Usage**:
  - Background: Light blue-gray (100-200) for container
  - Active pill: Dark blue-gray (800-900) with white/light text
  - Inactive pills: Transparent or light blue-gray (200-300) with dark text
  - No borders used - separation achieved through background colors and spacing

### 5. Pill Navigation Header Integration

- Add Navigation component to `App.tsx` or layout wrapper
- Ensure Navigation appears on all pages (except optionally hidden on certain pages)
- Test active state highlighting with route changes
- Verify responsive behavior across all breakpoints
- Ensure proper spacing between navigation and page content

### 6. Footer Component

Create `Footer.tsx` with responsive layout:

- **Left side**: "Jack Wingate" text
- **Below name**: Copyright text (e.g., "© 2026 Jack Wingate. All rights reserved.")
- **Social media row**: Icons for social platforms (using react-icons)
- **Footer links row**: Links to Home, Projects, About, Contact pages
- Responsive: Stack on mobile, horizontal on desktop
- Use monochrome blue-hued color system

### 7. Page Components

Create placeholder pages with basic structure:

- **Home.tsx**: Landing page with hero section
- **Projects.tsx**: Portfolio projects showcase
- **About.tsx**: About section
- **Contact.tsx**: Contact form/information
- All pages include Navigation header and Footer component
- All pages use monochrome blue-hued color system

### 8. UI Components Library

Create reusable UI components in `src/components/ui/`:

- **Button.tsx**: Multiple variants (primary, secondary, tertiary, ghost - no outline variant as borders aren't used), sizes (sm, md, lg), states (disabled, loading)
  - **All buttons are pill-shaped** (rounded-full styling)
  - **Icon-only buttons are circular** (rounded-full with equal width/height, perfect circles)
  - **Drop shadows**: All buttons include drop shadows for depth and visual hierarchy
  - Shadow intensity may vary by variant (primary buttons may have stronger shadows)
- **Slider.tsx**: Range slider component with customizable min/max, step, value display
- **Toggle.tsx**: Toggle switch component (on/off states) with smooth animations
- **Checkbox.tsx**: Checkbox with label, checked/unchecked/indeterminate states
- **Radio.tsx**: Radio button group component
- **Input.tsx**: Text input with variants (default, error, success), placeholder, disabled states
  - **All text inputs are pill-shaped** (rounded-full styling)
- **Textarea.tsx**: Multi-line text input with resize options
  - **All textareas are pill-shaped** (rounded-full styling)
- **Select.tsx**: Dropdown select component
  - **Pill-shaped**: Select dropdowns use `rounded-full` for pill shape
- **Card.tsx**: Card container with header, body, footer sections
- **Badge.tsx**: Badge/tag component with color variants
- **Alert.tsx**: Alert/notification component (info, success, warning, error)
- **Progress.tsx**: Progress bar component (linear and circular variants)

All components should:

- Be fully responsive
- Use monochrome blue-hued color system exclusively
- Use Tailwind CSS for styling
- Be accessible (ARIA labels, keyboard navigation)
- Accept className prop for custom styling
- Have TypeScript types/interfaces

**Component Specifications:**

- **Button**: Variants (primary, secondary, tertiary, ghost - no outline variant as borders aren't used), sizes (sm, md, lg), disabled/loading states, icon support - all using blue-hued grays with background colors only
  - **Pill-shaped**: All buttons use `rounded-full` for pill shape
  - **Icon-only buttons**: Circular buttons with equal width/height (`w-10 h-10`, `w-12 h-12`, etc.) and `rounded-full` for perfect circles
  - Text buttons have horizontal padding, icon-only buttons are square/circular
  - **Drop shadows**: All buttons include drop shadows using Tailwind's shadow utilities (e.g., `shadow-md`, `shadow-lg`)
  - Shadow variants: Primary buttons may use stronger shadows (`shadow-lg`), secondary/tertiary use medium shadows (`shadow-md`), ghost buttons use subtle shadows (`shadow-sm`)
  - Hover states may include slightly elevated shadows for interactive feedback
  - Disabled buttons may have reduced or no shadows
- **Slider**: Controlled/uncontrolled, min/max/step props, value display, custom styling, onChange handler - blue-gray track and thumb
- **Toggle**: Controlled component, on/off states, size variants, disabled state, onChange handler, smooth animations - blue-gray colors
- **Checkbox**: Single and group support, checked/unchecked/indeterminate states, label positioning, disabled state - blue-gray styling
- **Radio**: Group component with name prop, selected value, disabled options, label support - blue-gray colors
- **Input**: Text, email, password, number types, error/success states, placeholder, disabled, icon support (left/right) - blue-gray text and backgrounds (no borders)
  - **Pill-shaped**: All inputs use `rounded-full` for pill shape
  - Horizontal padding for comfortable text input
- **Textarea**: Rows prop, resize options, same states as Input - blue-gray styling
  - **Pill-shaped**: All textareas use `rounded-full` for pill shape
  - Padding for comfortable multi-line text input
- **Select**: Options array, placeholder, disabled state, searchable option, custom styling - blue-gray colors
  - **Pill-shaped**: All select dropdowns use `rounded-full` for pill shape
- **Card**: Header, body, footer slots, shadow variants, hover effects, clickable option - blue-gray backgrounds (no borders)
- **Badge**: Variants using primary/secondary/tertiary blue-grays, sizes, rounded/pill shapes
- **Alert**: Types (info, success, warning, error) all using blue-gray variants, dismissible option, icon support, custom content
- **Progress**: Linear and circular variants, percentage display, blue-gray color variants, animated transitions

### 9. Site Design System Page

Create `SiteDesignSystem.tsx` showcasing all design elements:

- **Color Palette**: 
  - Full grayscale with blue hue (50-900) with hex codes
  - Primary, Secondary, Tertiary variants
  - Text colors (primary, secondary, tertiary, muted)
  - Background colors
  - Component state colors
  - Note: No borders used in the design system
  - Usage examples for each
- **Typography**: Show font sizes, weights, line heights using Geologica font with examples
- **Buttons**: All button variants, sizes, and states (interactive examples) - all monochrome blue-hued
  - Showcase pill-shaped text buttons with drop shadows
  - Showcase circular icon-only buttons with drop shadows
  - Demonstrate different sizes and states
  - Show shadow variations across button variants
- **Form Controls**: 
  - Sliders (with different configurations) - blue-gray styling
  - Toggles (on/off states) - blue-gray colors
  - Checkboxes (single, group, indeterminate) - blue-gray styling
  - Radio buttons (group examples) - blue-gray colors
  - Inputs (all variants and states) - pill-shaped, blue-gray text and backgrounds (no borders)
  - Textareas - pill-shaped, blue-gray styling
  - Select dropdowns - pill-shaped, blue-gray colors
- **Components**: 
  - Navigation (pill navigation header) - blue-gray styling with active/inactive states
  - Cards (various layouts) - blue-gray backgrounds (no borders)
  - Badges (all variants using blue-gray scale) - blue-gray colors
  - Alerts (all types using blue-gray variants) - blue-gray styling
  - Progress bars (linear and circular) - blue-gray colors
- Organized in sections with clear labels and code examples
- Interactive examples where applicable (e.g., clickable buttons, working sliders)
- All examples use the monochrome blue-hued color system

### 9. Responsive Design

- Implement mobile-first approach using Tailwind breakpoints
- Ensure all components scale: `sm:`, `md:`, `lg:`, `xl:` breakpoints
- Test responsive layouts for Footer, navigation, and page content
- Use Tailwind's responsive utilities throughout
- Maintain color consistency across all breakpoints

### 11. Styling & Customization

- Configure Tailwind theme in `tailwind.config.js` with monochrome blue-hued colors
- Set up custom colors, spacing, typography scales
- Create reusable component classes if needed
- Ensure Geologica font is applied consistently
- Verify accessibility contrast ratios for all color combinations
- Test color system across all components
- **Shape Requirements**:
  - All buttons: Pill-shaped using `rounded-full`
  - Icon-only buttons: Circular (equal width/height with `rounded-full`)
  - All text inputs: Pill-shaped using `rounded-full`
  - All textareas: Pill-shaped using `rounded-full`
  - All select dropdowns: Pill-shaped using `rounded-full`
- **Button Shadows**:
  - All buttons include drop shadows for depth
  - Primary buttons: Stronger shadows (`shadow-lg`)
  - Secondary/Tertiary buttons: Medium shadows (`shadow-md`)
  - Ghost buttons: Subtle shadows (`shadow-sm`)
  - Hover states: Slightly elevated shadows for interactive feedback
  - Disabled buttons: Reduced or no shadows

## Key Files to Create/Modify

1. **`package.json`** - Dependencies and scripts
2. **`vite.config.ts`** - Vite configuration
3. **`tailwind.config.js`** - Tailwind customization with monochrome blue-hued color system
4. **`postcss.config.js`** - PostCSS configuration
5. **`src/index.css`** - Global styles and font imports
6. **`src/App.tsx`** - Main app with routing
7. **`src/components/Navigation.tsx`** - Pill navigation header component
8. **`src/components/Footer.tsx`** - Footer component
9. **`src/components/ui/*.tsx`** - All reusable UI components (Button, Slider, Toggle, etc.) - all using monochrome blue-hued colors
10. **`src/pages/*.tsx`** - All page components
11. **`src/pages/SiteDesignSystem.tsx`** - Design system showcase with all components and color system

## Design Control Features

- Full Tailwind utility classes for granular control
- Custom Tailwind config for monochrome blue-hued color system
- CSS variables support for dynamic theming
- Ability to add custom CSS alongside Tailwind
- Component-level styling flexibility
- Consistent color system across all components
- **No borders**: Separation achieved through background colors, spacing, shadows, and visual hierarchy
- **Shape Consistency**: 
  - All buttons and text inputs are pill-shaped (`rounded-full`)
  - Icon-only buttons are circular (equal width/height with `rounded-full`)
  - Creates cohesive, modern aesthetic throughout the site
- **Button Shadows**: 
  - Drop shadows on all buttons for depth and visual hierarchy
  - Shadow intensity varies by button variant (primary = strongest, ghost = subtle)
  - Hover states include elevated shadows for interactive feedback

## Responsive Breakpoints

- Mobile: Base (default, < 640px)
- Tablet: `sm:` (640px+), `md:` (768px+)
- Desktop: `lg:` (1024px+), `xl:` (1280px+), `2xl:` (1536px+)

## Color System Benefits

- **Cohesive Design**: Monochrome with blue hue creates sophisticated, unified appearance
- **Easy Maintenance**: Single color system to manage
- **Accessibility**: Clear contrast ratios with grayscale + blue tint
- **Scalability**: Easy to add new components using existing color tokens
- **Professional**: Monochrome design is timeless and elegant
- **Flexibility**: Blue hue adds subtle warmth while maintaining neutrality