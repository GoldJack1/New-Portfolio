# ScriptUI Elements Reference

## Introduction

ScriptUI is a component that works with the ExtendScript JavaScript interpreter to provide JavaScript scripts with the ability to create and interact with user interface elements. It provides an object model for windows and user-interface control elements within Adobe applications.

### What is ScriptUI?

ScriptUI enables you to create custom dialogs, palettes, and windows for Adobe applications including:
- Adobe Illustrator
- Adobe InDesign
- Adobe Photoshop
- Adobe After Effects
- Adobe Bridge

### Purpose and Use Cases

ScriptUI allows you to:
- Create custom user interfaces for ExtendScript scripts
- Build modal dialogs for user input
- Create floating palettes for tools and panels
- Design complex multi-step wizards
- Build interactive forms and data entry interfaces

### Relationship to ExtendScript

ScriptUI is part of the ExtendScript toolkit. It uses JavaScript (ExtendScript) as its scripting language and integrates with the Adobe application's object model to create native-looking user interfaces.

---

## Core Concepts

### Container Hierarchy

ScriptUI uses a hierarchical structure where containers can contain other containers and controls:

```
Window (dialog/palette/window)
  └── Container (Panel/Group/TabbedPanel)
      └── Container or Control
          └── Control
```

### Automatic Layout System

ScriptUI provides an automatic layout system that:
- Calculates element sizes and positions automatically
- Adapts to different font sizes and platforms
- Handles spacing and alignment
- Supports nested containers with different orientations

### Coordinate System

- **Screen coordinates**: Used for Window elements
- **Parent-relative coordinates**: Used for child elements (relative to immediate parent)
- **Bounds format**: `[left, top, right, bottom]` where:
  - `left`: X coordinate of left edge
  - `top`: Y coordinate of top edge (higher Y = higher on canvas in Illustrator)
  - `right`: X coordinate of right edge
  - `bottom`: Y coordinate of bottom edge

### Event Handling Model

ScriptUI supports two event handling approaches:
1. **Callback properties**: Direct assignment (e.g., `button.onClick = function() {...}`)
2. **Event listeners**: W3C DOM-compliant event system using `addEventListener()`

### Property Inheritance

Container properties like `orientation`, `alignChildren`, `spacing`, and `margins` affect all child elements unless overridden by individual element properties.

---

## Container Elements

### Window

The top-level container that represents platform-specific windows.

#### Types

- **`dialog`**: Modal dialog window (blocks interaction with application until closed)
  - **Not resizable** in Illustrator
  - **Always shows reliably**
  - Returns value from `show()` when closed
  - Use for: User input dialogs, confirmation dialogs, settings that must be completed
  
- **`palette`**: Floating palette window (non-modal, can stay open)
  - **⚠️ DOES NOT WORK in Illustrator** - palette windows will not appear
  - Works in other Adobe applications (Photoshop, InDesign, etc.)
  - `show()` doesn't return (window stays open)
  - Use for: Tool panels, resizable interfaces, non-blocking dialogs (but NOT in Illustrator)
  
- **`window`**: Standard window (platform-dependent behavior)
  - Behavior varies by platform and application

#### Creation Syntax

```javascript
var dialog = new Window("dialog", "Window Title");
// or
var palette = new Window("palette", "Palette Title");
// or
var window = new Window("window", "Window Title");
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | String | Window title text |
| `orientation` | String | Layout orientation: `"row"`, `"column"`, or `"stack"` |
| `alignChildren` | String or Array | Alignment of child elements |
| `margins` | Number or Array | Margins around container edges |
| `spacing` | Number | Spacing between child elements |
| `preferredSize` | Array | `[width, height]` preferred dimensions |
| `defaultElement` | Control | Button that responds to ENTER key |
| `cancelElement` | Control | Button that responds to ESC key |

#### Methods

- **`add(type, bounds, text, options)`**: Creates and adds a child element
- **`show()`**: Displays the window (modal dialogs block until closed)
- **`hide()`**: Hides the window
- **`close(value)`**: Closes modal dialog and returns value to `show()` call
- **`center()`**: Centers the window on screen

#### Events

- **`onShow`**: Called when window is shown
- **`onClose`**: Called when window is closed (return `false` to prevent closing)
- **`onMove`**: Called after window is moved
- **`onMoving`**: Called while window is being moved
- **`onResize`**: Called after window is resized
- **`onResizing`**: Called while window is being resized

#### Example from ScriptUI Dialog Builder

```javascript
// From Export Layers example
var dialog = new Window("dialog"); 
dialog.text = "Export Layers Inside Selected Group"; 
dialog.orientation = "column"; 
dialog.alignChildren = ["center","top"]; 
dialog.spacing = 10; 
dialog.margins = 16;
```

#### Modal Dialog Behavior

Modal dialogs created with `new Window("dialog")` block execution until closed:

```javascript
var result = dialog.show();
// Code here executes only after dialog is closed
// result contains the value passed to close() method
```

Default and cancel elements:
- Button with `name: "ok"` becomes defaultElement (responds to ENTER)
- Button with `name: "cancel"` becomes cancelElement (responds to ESC)

#### Palette Window Behavior

**⚠️ CRITICAL: Palette windows DO NOT WORK in Adobe Illustrator.**

Palette windows created with `new Window("palette")` will not appear in Illustrator, regardless of configuration. Always use `"dialog"` type windows for Illustrator scripts.

```javascript
// ❌ This will NOT work in Illustrator - window won't appear
var palette = new Window("palette", "My Palette");
palette.show(); // Nothing happens in Illustrator
```

**For Illustrator:**
- **Always use `"dialog"` type windows**
- Dialog windows are modal and not resizable, but they work reliably
- If you need resizing, you cannot use ScriptUI in Illustrator - consider alternative approaches

---

### Group

A container for organizing related controls without a visible border or title.

#### Overview

Groups are used for:
- Creating layout hierarchies
- Organizing controls logically
- Fine control over layout attributes
- Nesting within panels for complex arrangements

#### Creation Syntax

```javascript
var group = parent.add("group");
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `orientation` | String | `"row"`, `"column"`, or `"stack"` |
| `alignChildren` | String or Array | Alignment strategy for children |
| `spacing` | Number | Pixels between child elements |
| `margins` | Number or Array | Margins: number or `[top, right, bottom, left]` |
| `preferredSize` | Array | `[width, height]` preferred dimensions |

#### Methods

- **`add(type, bounds, text, options)`**: Adds child elements

#### Example from ScriptUI Dialog Builder

```javascript
// From Export Layers example
var group1 = dialog.add("group"); 
group1.orientation = "column"; 
group1.alignChildren = ["fill","top"]; 
group1.spacing = 10; 
group1.margins = 0;
```

#### Common Patterns

**Row of controls:**
```javascript
var row = parent.add("group");
row.orientation = "row";
row.spacing = 6;
row.add("statictext", undefined, "Label:");
row.add("edittext", undefined, "Value");
```

**Column of controls:**
```javascript
var col = parent.add("group");
col.orientation = "column";
col.spacing = 4;
col.add("checkbox", undefined, "Option 1");
col.add("checkbox", undefined, "Option 2");
```

---

### Panel

A container with an optional title and border, used to visually organize related controls.

#### Overview

Panels are used for:
- Grouping related controls visually
- Creating sections with titles
- Using as separators (with width/height of 0)
- Organizing complex dialogs into logical sections

#### Creation Syntax

```javascript
var panel = parent.add("panel", bounds, "Panel Title", options);
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | String | Title text displayed at top of panel |
| `orientation` | String | `"row"`, `"column"`, or `"stack"` |
| `alignChildren` | String or Array | Alignment strategy for children |
| `spacing` | Number | Pixels between child elements |
| `margins` | Number or Array | Margins around panel edges |
| `preferredSize` | Array | `[width, height]` preferred dimensions |

#### Creation Properties

| Property | Type | Description |
|----------|------|-------------|
| `borderStyle` | String | Border appearance: `"black"`, `"etched"`, `"gray"`, `"raised"`, `"sunken"`, `"topDivider"` |

#### Methods

- **`add(type, bounds, text, options)`**: Adds child elements

#### Example from ScriptUI Dialog Builder

```javascript
// From Export Layers example
var panel1 = group1.add("panel"); 
panel1.text = "File name options"; 
panel1.orientation = "column"; 
panel1.alignChildren = ["left","top"]; 
panel1.spacing = 10; 
panel1.margins = 10;
```

#### Using Panels as Dividers

Panels can be used as visual separators:

```javascript
// Horizontal divider (height = 0)
var divider = panel.add("panel");
divider.preferredSize = [0, 0];
divider.alignment = "fill";

// Vertical divider (width = 0)
var vDivider = panel.add("panel");
vDivider.preferredSize = [0, 0];
vDivider.alignment = "fill";
```

---

### TabbedPanel

A container that contains only Tab elements as direct children, with selectable tabs.

#### Overview

TabbedPanels are used for:
- Organizing content into multiple pages
- Creating tabbed interfaces
- Switching between different views in the same space

#### Creation Syntax

```javascript
var tabbedPanel = parent.add("tabbedpanel", bounds, "Title", options);
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | String | Optional label for the panel |
| `selection` | Tab | Currently active Tab child |
| `orientation` | String | Layout orientation for tabs |
| `alignChildren` | String or Array | Alignment of tab content |

#### Methods

- **`add("tab", bounds, text, options)`**: Adds a new tab (must be Tab type)

#### Events

- **`onChange`**: Called when selection changes

#### Example

```javascript
var tabs = dialog.add("tabbedpanel");
var tab1 = tabs.add("tab", undefined, "Tab 1");
var tab2 = tabs.add("tab", undefined, "Tab 2");

// Set initial selection
tabs.selection = tab1;

// Handle tab changes
tabs.onChange = function() {
    // React to tab selection change
};
```

---

### Tab

A container that must be a direct child of a TabbedPanel, with a selectable tab showing text.

#### Overview

Tabs are used within TabbedPanels to create separate content areas.

#### Creation Syntax

```javascript
var tab = tabbedPanel.add("tab", bounds, "Tab Title", options);
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | String | Text shown in the tab |
| `orientation` | String | Layout orientation for tab content |
| `alignChildren` | String or Array | Alignment of tab content |
| `spacing` | Number | Spacing between child elements |
| `margins` | Number or Array | Margins around tab content |

#### Methods

- **`add(type, bounds, text, options)`**: Adds child elements to the tab

#### Example

```javascript
var tabs = dialog.add("tabbedpanel");
var generalTab = tabs.add("tab", undefined, "General");
generalTab.orientation = "column";
generalTab.spacing = 10;

var nameLabel = generalTab.add("statictext", undefined, "Name:");
var nameInput = generalTab.add("edittext", undefined, "");
```

---

## Control Elements

### Button

A pushbutton with a text string that triggers an action when clicked.

#### Overview

Buttons are used to:
- Initiate actions
- Accept or cancel dialogs
- Trigger functions
- Navigate between steps

#### Creation Syntax

```javascript
var button = parent.add("button", bounds, "Button Text", options);
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | String | Button label text |
| `justify` | String | Text justification: `"left"`, `"center"`, `"right"` |
| `preferredSize` | Array | `[width, height]` preferred dimensions |
| `enabled` | Boolean | Whether button accepts clicks |
| `visible` | Boolean | Whether button is visible |

#### Creation Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | String | Unique name. Special values: `"ok"` (defaultElement), `"cancel"` (cancelElement) |

#### Methods

- Inherited from Control: `show()`, `hide()`, `notify()`, `addEventListener()`, etc.

#### Events

- **`onClick`**: Called when button is clicked or `notify()` is called

#### Example from ScriptUI Dialog Builder

```javascript
// From Export Layers example
var button1 = group6.add("button"); 
button1.text = "Cancel"; 
button1.justify = "center";

var button2 = group6.add("button"); 
button2.text = "Save"; 
button2.justify = "center";
```

#### Default and Cancel Buttons

```javascript
// OK button (responds to ENTER)
var okBtn = dialog.add("button", undefined, "OK", {name: "ok"});

// Cancel button (responds to ESC)
var cancelBtn = dialog.add("button", undefined, "Cancel", {name: "cancel"});

// Event handlers
okBtn.onClick = function() {
    this.parent.close(1); // Return 1 for OK
};

cancelBtn.onClick = function() {
    this.parent.close(2); // Return 2 for Cancel
};
```

---

### Checkbox

A dual-state control showing a box with a checkmark when selected.

#### Overview

Checkboxes are used for:
- Boolean options
- Multiple independent selections
- Enabling/disabling features
- Toggling states

#### Creation Syntax

```javascript
var checkbox = parent.add("checkbox", bounds, "Label Text", options);
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | String | Label text next to checkbox |
| `value` | Boolean | `true` when checked, `false` when unchecked |
| `preferredSize` | Array | `[width, height]` preferred dimensions |
| `enabled` | Boolean | Whether checkbox accepts clicks |
| `visible` | Boolean | Whether checkbox is visible |

#### Creation Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | String | Unique name for the control |

#### Methods

- Inherited from Control: `show()`, `hide()`, `notify()`, etc.

#### Events

- **`onClick`**: Called when checkbox is clicked
- **`onChange`**: Called when value changes

#### Example from ScriptUI Dialog Builder

```javascript
// From Export Layers example
var checkbox1 = panel1.add("checkbox"); 
checkbox1.text = "Use layer name";

// From Import PDF example
var checkbox2 = panel1.add("checkbox"); 
checkbox2.text = "Reverse Page Order";

var checkbox3 = panel2.add("checkbox"); 
checkbox3.text = "Bleed the Fit Page"; 
checkbox3.value = true; // Pre-checked
```

#### Using Checkboxes

```javascript
// Create checkbox
var optionCb = dialog.add("checkbox", undefined, "Enable feature");
optionCb.value = true; // Pre-checked

// Handle click
optionCb.onClick = function() {
    // Enable/disable related controls
    relatedControl.enabled = this.value;
};

// Read value after dialog closes
if (optionCb.value) {
    // Feature is enabled
}
```

---

### EditText

An editable text field that allows users to enter and modify text.

#### Overview

EditText controls are used for:
- Text input
- Numeric input (with validation)
- Multi-line text entry
- Password fields (with `noecho: true`)

#### Creation Syntax

```javascript
var edittext = parent.add("edittext", bounds, "Initial Text", options);
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | String | Current text content |
| `textselection` | String | Currently selected text (read/write) |
| `preferredSize` | Array | `[width, height]` preferred dimensions |
| `minimumSize` | Array | `[width, height]` minimum dimensions |
| `characters` | Number | Width in character count |
| `justify` | String | Text justification: `"left"`, `"center"`, `"right"` |
| `enabled` | Boolean | Whether field accepts input |
| `visible` | Boolean | Whether field is visible |

#### Creation Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | String | Unique name for the control |
| `readonly` | Boolean | When `true`, field is read-only |
| `noecho` | Boolean | When `true`, hides input (for passwords) |
| `multiline` | Boolean | When `true`, allows multiple lines |
| `scrollable` | Boolean | When `true`, adds scrollbar for multiline |
| `enterKeySignalsOnChange` | Boolean | When `true`, onChange only fires on ENTER |
| `borderless` | Boolean | When `true`, no border is drawn |

#### Methods

- Inherited from Control: `show()`, `hide()`, `notify()`, etc.

#### Events

- **`onChange`**: Called when text changes and control loses focus or ENTER is pressed
- **`onChanging`**: Called for each keypress while typing
- **`onEnterKey`**: Called when ENTER key is pressed

#### Example from ScriptUI Dialog Builder

```javascript
// From Export Layers example
var edittext1 = group3.add("edittext"); 
edittext1.minimumSize.width = 90;

var edittext2 = group4.add("edittext"); 
edittext2.text = "File Name "; 
edittext2.minimumSize.width = 160;

// From Import PDF example
var edittext1 = group2.add("edittext"); 
edittext1.text = "1"; 
edittext1.minimumSize.width = 60;
```

#### Single-line Text Input

```javascript
var nameInput = dialog.add("edittext", undefined, "Default value");
nameInput.characters = 30; // Width for 30 characters
nameInput.onChange = function() {
    // Validate input
    if (this.text.length < 3) {
        alert("Name must be at least 3 characters");
    }
};
```

#### Multi-line Text Input

```javascript
var descriptionInput = dialog.add("edittext", undefined, "", {
    multiline: true,
    scrollable: true
});
descriptionInput.preferredSize = [300, 100];
```

#### Password Field

```javascript
var passwordInput = dialog.add("edittext", undefined, "", {
    noecho: true
});
```

---

### StaticText

A read-only text field used to display labels, instructions, or information.

#### Overview

StaticText is used for:
- Labels for other controls
- Instructions and help text
- Displaying information
- Creating text separators

#### Creation Syntax

```javascript
var statictext = parent.add("statictext", bounds, "Text Content", options);
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | String | Text to display |
| `justify` | String | Text justification: `"left"`, `"center"`, `"right"` |
| `preferredSize` | Array | `[width, height]` preferred dimensions |
| `characters` | Number | Width in character count |
| `visible` | Boolean | Whether text is visible |

#### Creation Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | String | Unique name for the control |
| `multiline` | Boolean | When `true`, displays multiple lines |
| `scrolling` | Boolean | When `true`, enables vertical scrolling |
| `truncate` | String | Truncation behavior: `"middle"`, `"end"`, `"none"` |

#### Methods

- Limited methods (read-only display)

#### Font Styling Limitations

**Important:** ScriptUI does not support setting bold, italic, or custom fonts on StaticText elements. The following will cause an error:

```javascript
// ❌ This does NOT work - will cause "newFont is not a function" error
var label = dialog.add("statictext", undefined, "Bold Text");
label.graphics.font = label.graphics.newFont(label.graphics.font.name, label.graphics.font.size, "bold");
```

**Workaround:** Use plain text or Panel titles for visual hierarchy. StaticText uses the system default font.

#### Character Encoding Limitations

**Important:** ExtendScript has limited Unicode support. Avoid Unicode characters like bullet points (•), em dashes (—), or smart quotes. Use ASCII characters instead:

```javascript
// ❌ Unicode characters may display incorrectly
var text = dialog.add("statictext", undefined, "Features:\n• Item 1\n• Item 2");

// ✅ Use ASCII characters for reliability
var text = dialog.add("statictext", undefined, "Features:\n- Item 1\n- Item 2");
```

**Safe ASCII alternatives:**
- Use `-` or `*` instead of `•` for bullet points
- Use `--` instead of `—` for em dashes
- Use `"` and `'` instead of smart quotes
- Use `...` instead of `…` for ellipsis

#### Example from ScriptUI Dialog Builder

```javascript
// From Export Layers example
var statictext1 = group3.add("statictext"); 
statictext1.text = "Prefix:";

var statictext2 = group4.add("statictext"); 
statictext2.text = "Custom name:";

// From Import PDF example
var statictext1 = panel1.add("statictext"); 
statictext1.text = "Import PDF Pages:";
```

#### Common Patterns

**Label for input field:**
```javascript
var label = dialog.add("statictext", undefined, "Name:");
var input = dialog.add("edittext", undefined, "");
```

**Multi-line instructions:**
```javascript
var instructions = dialog.add("statictext", undefined, 
    "Enter your information below.\nAll fields are required.", 
    {multiline: true}
);
instructions.preferredSize = [300, 40];
```

---

### DropdownList

A drop-down list control that displays a single visible item and expands to show all items when clicked.

#### Overview

DropdownLists are used for:
- Single selection from a list
- Choosing from predefined options
- Reducing space usage compared to ListBox
- Creating menus

#### Creation Syntax

```javascript
// With items array
var dropdown = parent.add("dropdownlist", bounds, itemsArray, options);

// Without items (add later)
var dropdown = parent.add("dropdownlist", bounds, undefined, options);
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `selection` | ListItem | Currently selected item (or `null`) |
| `items` | Array | Collection of ListItem objects |
| `preferredSize` | Array | `[width, height]` preferred dimensions |
| `enabled` | Boolean | Whether dropdown accepts selection |
| `visible` | Boolean | Whether dropdown is visible |
| `title` | String | Optional label for the dropdown |
| `titleLayout` | Object | Layout options for title |

#### Creation Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | String | Unique name for the control |
| `items` | Array | Array of strings for list items |

#### Methods

- **`add(type, text, index)`**: Adds item to list (`type` = `"item"` or `"separator"`)
- **`remove(index)`**: Removes item by index
- **`removeAll()`**: Removes all items
- **`find(text)`**: Finds item by text, returns ListItem or `null`

#### Events

- **`onChange`**: Called when selection changes

#### Example from ScriptUI Dialog Builder

```javascript
// From Import PDF example
var dropdown1_array = [
    "Top Left", "Top Center", "Top Right",
    "Center Left", "Center", "Center Right",
    "Bottom Left", "Bottom Center", "Bottom Right",
    "-",
    "Top - Relative to spine",
    "Center - Relative to spine",
    "Right - Relative to spine"
];
var dropdown1 = panel3.add("dropdownlist", undefined, dropdown1_array); 
dropdown1.selection = 0;

var dropdown2_array = ["0", "90", "180", "270"];
var dropdown2 = panel3.add("dropdownlist", undefined, dropdown2_array); 
dropdown2.selection = 0; 
dropdown2.text = "Rotation:";
```

#### Using DropdownLists

```javascript
// Create with items
var formatDropdown = dialog.add("dropdownlist", undefined, 
    ["JPEG", "PNG", "TIFF", "PDF"]
);
formatDropdown.selection = 0; // Select first item

// Add items dynamically
var sizeDropdown = dialog.add("dropdownlist");
sizeDropdown.add("item", "Small");
sizeDropdown.add("item", "Medium");
sizeDropdown.add("item", "Large");
sizeDropdown.add("separator"); // Visual separator
sizeDropdown.add("item", "Custom");

// Handle selection change
sizeDropdown.onChange = function() {
    if (this.selection) {
        alert("Selected: " + this.selection.text);
    }
};

// Get selected value
var selectedText = dropdown.selection ? dropdown.selection.text : null;
var selectedIndex = dropdown.selection ? dropdown.selection.index : -1;
```

#### Separator Items

```javascript
var dropdown = dialog.add("dropdownlist");
dropdown.add("item", "Option 1");
dropdown.add("item", "Option 2");
dropdown.add("separator"); // Creates horizontal line
dropdown.add("item", "Option 3");
```

---

### RadioButton

A dual-state control grouped with other radio buttons, where only one can be selected at a time.

#### Overview

RadioButtons are used for:
- Single selection from multiple options
- Mutually exclusive choices
- Option groups
- Settings with discrete values

#### Creation Syntax

```javascript
var radiobutton = parent.add("radiobutton", bounds, "Label Text", options);
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | String | Label text next to radio button |
| `value` | Boolean | `true` when selected, `false` when not |
| `preferredSize` | Array | `[width, height]` preferred dimensions |
| `enabled` | Boolean | Whether radio button accepts clicks |
| `visible` | Boolean | Whether radio button is visible |

#### Creation Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | String | Unique name for the control |

#### Methods

- Inherited from Control: `show()`, `hide()`, `notify()`, etc.

#### Events

- **`onClick`**: Called when radio button is clicked
- **`onChange`**: Called when value changes

#### Important Notes

- **Grouping**: Radio buttons are grouped by creating them sequentially with no intervening elements
- **Single selection**: Only one radio button in a group can be `true` at a time
- **Initial state**: Set one radio button to `value = true` when creating the group

#### Example from Official Documentation

```javascript
var dlg = new Window("dialog", "Alert Box Builder");
dlg.alertBtnsPnl = dlg.add("panel", undefined, "Button alignment");
dlg.alertBtnsPnl.alignLeftRb = dlg.alertBtnsPnl.add("radiobutton", undefined, "Left");
dlg.alertBtnsPnl.alignCenterRb = dlg.alertBtnsPnl.add("radiobutton", undefined, "Center");
dlg.alertBtnsPnl.alignRightRb = dlg.alertBtnsPnl.add("radiobutton", undefined, "Right");
dlg.alertBtnsPnl.alignCenterRb.value = true; // Set initial selection
```

#### Using RadioButtons

```javascript
// Create radio button group
var modeGroup = dialog.add("group");
modeGroup.orientation = "column";
modeGroup.spacing = 4;

var mode1 = modeGroup.add("radiobutton", undefined, "Mode 1");
var mode2 = modeGroup.add("radiobutton", undefined, "Mode 2");
var mode3 = modeGroup.add("radiobutton", undefined, "Mode 3");

mode1.value = true; // Set initial selection

// Handle selection change
mode1.onClick = function() {
    // React to mode 1 selection
};
mode2.onClick = function() {
    // React to mode 2 selection
};

// Get selected value after dialog closes
var selectedMode = mode1.value ? "Mode 1" : 
                   mode2.value ? "Mode 2" : "Mode 3";
```

---

### Additional Control Elements

The following controls are available in ScriptUI but were not found in the ScriptUI Dialog Builder examples. They are documented here based on official Adobe ExtendScript documentation.

#### Slider

A horizontal slider with a draggable indicator for selecting values within a range.

**Creation:**
```javascript
var slider = parent.add("slider", bounds, value, minvalue, maxvalue, options);
```

**Properties:**
- `value`: Current position (Number)
- `minvalue`: Minimum value (default: 0)
- `maxvalue`: Maximum value (default: 100)

**Events:**
- `onChange`: Called when user finishes dragging
- `onChanging`: Called repeatedly while dragging

#### Scrollbar

A scrollbar with draggable indicator and stepper buttons.

**Creation:**
```javascript
var scrollbar = parent.add("scrollbar", bounds, value, minvalue, maxvalue, options);
```

**Properties:**
- `value`: Current position
- `minvalue`: Minimum value
- `maxvalue`: Maximum value
- `stepdelta`: Increment for stepper buttons (default: 1)
- `jumpdelta`: Increment for clicking bar (default: 20% of range)

**Events:**
- `onChange`: Called when position changes
- `onChanging`: Called while dragging

#### ProgressBar

A horizontal progress indicator showing completion percentage.

**Creation:**
```javascript
var progressbar = parent.add("progressbar", bounds, value, minvalue, maxvalue, options);
```

**Properties:**
- `value`: Current progress (0 to maxvalue)
- `minvalue`: Always 0 (cannot be changed)
- `maxvalue`: Maximum value (default: 100)

#### ListBox

A list control displaying multiple items, allowing single or multiple selection.

**Creation:**
```javascript
var listbox = parent.add("listbox", bounds, itemsArray, options);
```

**Properties:**
- `selection`: Selected item(s) - ListItem for single, Array for multi-select
- `items`: Collection of ListItem objects
- `multiselect`: Boolean (default: false)

**Events:**
- `onChange`: Called when selection changes
- `onDoubleClick`: Called when item is double-clicked

#### TreeView

A hierarchical list where items can contain child items.

**Creation:**
```javascript
var treeview = parent.add("treeview", bounds, itemsArray, options);
```

**Properties:**
- `selection`: Selected ListItem
- `items`: Collection of ListItem objects (can be nodes with children)

**Events:**
- `onChange`: Called when selection changes
- `onExpand`: Called when node is expanded
- `onCollapse`: Called when node is collapsed

#### Image

Displays an icon or image.

**Creation:**
```javascript
var image = parent.add("image", bounds, icon, options);
```

**Properties:**
- `image`: ScriptUIImage, resource name, or File path
- `title`: Optional label
- `titleLayout`: Layout options for title

#### IconButton

A button that displays an icon, with or without text.

**Creation:**
```javascript
var iconbutton = parent.add("iconbutton", bounds, icon, options);
```

**Properties:**
- `image`: Icon image
- `text` or `title`: Optional label
- `style`: `"button"` or `"toolbutton"`
- `toggle`: Boolean for toggle button behavior

**Events:**
- `onClick`: Called when clicked

#### EditNumber

An editable field for decimal numbers (Photoshop CC 2019+).

**Creation:**
```javascript
var editnumber = parent.add("editnumber", bounds, text, minValue, maxValue, options);
```

**Properties:**
- `text`: Current number value as string
- Similar to EditText but validates numeric input

**Events:**
- `onChange`: Called when value changes and loses focus
- `onChanging`: Called while typing

---

## Layout System

### Orientation

The `orientation` property controls how child elements are arranged within a container.

#### Values

- **`"row"`**: Children arranged horizontally (left to right)
- **`"column"`**: Children arranged vertically (top to bottom)
- **`"stack"`**: Children overlap in the same space (only top element fully visible)

#### Container Dimensions

**Row orientation:**
- Width: Sum of all child widths + spacing
- Height: Height of tallest child

**Column orientation:**
- Width: Width of widest child
- Height: Sum of all child heights + spacing

**Stack orientation:**
- Width: Width of widest child
- Height: Height of tallest child

#### Example

```javascript
// Row layout
var rowGroup = dialog.add("group");
rowGroup.orientation = "row";
rowGroup.spacing = 10;
rowGroup.add("button", undefined, "Button 1");
rowGroup.add("button", undefined, "Button 2");
rowGroup.add("button", undefined, "Button 3");

// Column layout
var colGroup = dialog.add("group");
colGroup.orientation = "column";
colGroup.spacing = 6;
colGroup.add("checkbox", undefined, "Option 1");
colGroup.add("checkbox", undefined, "Option 2");
colGroup.add("checkbox", undefined, "Option 3");
```

---

### Alignment

Alignment controls how child elements are positioned within their container.

#### alignChildren (Container Property)

Sets the default alignment strategy for all children in a container.

**For row orientation:**
- `"top"`: Align to top edge
- `"bottom"`: Align to bottom edge
- `"center"`: Center vertically (default)
- `"fill"`: Fill container height

**For column orientation:**
- `"left"`: Align to left edge
- `"right"`: Align to right edge
- `"center"`: Center horizontally (default)
- `"fill"`: Fill container width

**For stack orientation:**
- `"top"`, `"bottom"`, `"left"`, `"right"`, `"center"`, `"fill"`

**Two-dimensional alignment:**
```javascript
// [horizontal, vertical]
container.alignChildren = ["left", "center"];
container.alignChildren = ["fill", "top"];
```

#### alignment (Child Property)

Overrides the parent's `alignChildren` for a specific element.

```javascript
var group = dialog.add("group");
group.orientation = "column";
group.alignChildren = "left"; // Default for all children

var specialBtn = group.add("button", undefined, "Special");
specialBtn.alignment = "right"; // Override: align this one to right
```

#### Example from ScriptUI Dialog Builder

```javascript
// From Export Layers example
dialog.alignChildren = ["center","top"]; // Center horizontally, top vertically

var group2 = panel1.add("group"); 
group2.orientation = "row"; 
group2.alignChildren = ["left","center"]; // Left horizontally, center vertically
```

---

### Spacing

The `spacing` property specifies the number of pixels between adjacent child elements.

#### Usage

```javascript
var group = dialog.add("group");
group.orientation = "row";
group.spacing = 10; // 10 pixels between children
```

#### Example from ScriptUI Dialog Builder

```javascript
// From Export Layers example
dialog.spacing = 10; // 10 pixels between all children
group1.spacing = 10; // 10 pixels between group1's children
group2.spacing = 10; // 10 pixels between group2's children
```

---

### Margins

The `margins` property specifies the space between container edges and child elements.

#### Single Value

Sets equal margins on all sides:

```javascript
container.margins = 16; // 16 pixels on all sides
```

#### Array Value

Sets different margins for each edge: `[top, right, bottom, left]`

```javascript
container.margins = [10, 15, 10, 15]; // top, right, bottom, left
```

#### Example from ScriptUI Dialog Builder

```javascript
// From Export Layers example
dialog.margins = 16; // 16 pixels on all sides

panel1.margins = 10; // 10 pixels on all sides

// From Import PDF example
panel1.margins = 10; // 10 pixels on all sides
```

---

### Preferred Size

The `preferredSize` property hints to the layout manager about desired element dimensions.

#### Format

```javascript
element.preferredSize = [width, height];
```

#### Automatic Calculation

If not set, ScriptUI calculates preferred size based on:
- Control type
- Text content
- Font and font size
- Icon/image dimensions

#### Partial Specification

Use `-1` to let layout manager calculate one dimension:

```javascript
// Width specified, height calculated
element.preferredSize = [200, -1];

// Height specified, width calculated
element.preferredSize = [-1, 30];
```

#### Minimum and Maximum Size

```javascript
element.minimumSize = [100, 20]; // Minimum dimensions
element.maximumSize = [500, 200]; // Maximum dimensions
```

#### Example from ScriptUI Dialog Builder

```javascript
// From Import PDF example
panel1.preferredSize.height = 205; // Fixed height, width calculated
panel2.preferredSize.height = 160; // Fixed height, width calculated

// Using minimumSize for EditText
edittext1.minimumSize.width = 60; // Minimum width of 60 pixels
```

---

## Event Handling

### Event Callbacks

Event callbacks are properties that you assign function references to.

#### Basic Syntax

```javascript
control.onClick = function() {
    // Handle click event
};
```

#### Named Functions

```javascript
function handleClick() {
    // Handle click event
}

button.onClick = handleClick;
```

### Available Events

#### onClick

Fired when user clicks a control.

**Supported controls:**
- Button
- Checkbox
- IconButton
- RadioButton

**Example:**
```javascript
var button = dialog.add("button", undefined, "Click Me");
button.onClick = function() {
    alert("Button clicked!");
};
```

#### onChange

Fired when a control's value changes.

**Supported controls:**
- DropDownList
- EditNumber
- EditText
- ListBox
- Scrollbar
- Slider
- TreeView
- Checkbox (value change)
- RadioButton (value change)

**Example:**
```javascript
var dropdown = dialog.add("dropdownlist", undefined, ["Option 1", "Option 2"]);
dropdown.onChange = function() {
    if (this.selection) {
        alert("Selected: " + this.selection.text);
    }
};
```

#### onChanging

Fired repeatedly while a value is being changed.

**Supported controls:**
- EditNumber
- EditText
- Scrollbar
- Slider

**Example:**
```javascript
var slider = dialog.add("slider", undefined, 50, 0, 100);
slider.onChanging = function() {
    // Update display in real-time
    valueLabel.text = this.value.toString();
};
```

#### onEnterKey

Fired when ENTER key is pressed in an EditText control.

**Example:**
```javascript
var input = dialog.add("edittext", undefined, "");
input.onEnterKey = function() {
    // Process input when ENTER is pressed
    processInput(this.text);
};
```

#### onDoubleClick

Fired when user double-clicks an item in a ListBox.

**Example:**
```javascript
var listbox = dialog.add("listbox", undefined, ["Item 1", "Item 2"]);
listbox.onDoubleClick = function() {
    if (this.selection) {
        // Open or process selected item
        openItem(this.selection.text);
    }
};
```

### Event Listeners (W3C DOM)

ScriptUI also supports W3C DOM-compliant event listeners.

#### addEventListener()

```javascript
control.addEventListener("click", function(e) {
    // Handle event
    // e is a UIEvent object
});
```

#### Event Types

- `"click"` (detail = 1 for single, 2 for double)
- `"change"`
- `"changing"`
- `"enterKey"`
- `"focus"` (onActivate)
- `"blur"` (onDeactivate)
- `"mousedown"`, `"mouseup"`, `"mousemove"`, `"mouseover"`, `"mouseout"`
- `"keyup"`, `"keydown"`

#### Event Propagation

Events propagate through three phases:
1. **Capture phase**: From window down to target
2. **At-target phase**: At the target element
3. **Bubble phase**: From target back up to window

```javascript
// Capture phase only
dialog.addEventListener("click", handler, true);

// Bubble phase (default)
dialog.addEventListener("click", handler, false);
```

#### removeEventListener()

```javascript
control.removeEventListener("click", handlerFunction);
```

---

## Common Patterns & Best Practices

### Form Layouts

**Pattern: Label + Input Row**

```javascript
function createLabeledInput(parent, labelText, defaultValue) {
    var row = parent.add("group");
    row.orientation = "row";
    row.spacing = 6;
    row.alignChildren = ["left", "center"];
    
    var label = row.add("statictext", undefined, labelText + ":");
    var input = row.add("edittext", undefined, defaultValue);
    input.characters = 20;
    
    return input;
}

var nameInput = createLabeledInput(dialog, "Name", "");
var emailInput = createLabeledInput(dialog, "Email", "");
```

### Button Groups

**Pattern: Action Buttons**

```javascript
function createButtonGroup(parent, buttons) {
    var group = parent.add("group");
    group.orientation = "row";
    group.spacing = 8;
    group.alignment = ["right", "center"];
    
    var result = {};
    for (var i = 0; i < buttons.length; i++) {
        var btn = group.add("button", undefined, buttons[i].text, buttons[i].options);
        if (buttons[i].onClick) {
            btn.onClick = buttons[i].onClick;
        }
        result[buttons[i].name] = btn;
    }
    
    return result;
}

var buttons = createButtonGroup(dialog, [
    {name: "ok", text: "OK", options: {name: "ok"}},
    {name: "cancel", text: "Cancel", options: {name: "cancel"}}
]);
```

### Checkbox Groups

**Pattern: Multiple Options**

```javascript
function createCheckboxGroup(parent, options, initialValues) {
    var group = parent.add("group");
    group.orientation = "column";
    group.spacing = 4;
    
    var checkboxes = [];
    for (var i = 0; i < options.length; i++) {
        var cb = group.add("checkbox", undefined, options[i].text);
        cb.value = initialValues && initialValues[i] || false;
        if (options[i].onClick) {
            cb.onClick = options[i].onClick;
        }
        checkboxes.push(cb);
    }
    
    return checkboxes;
}

var formatCbs = createCheckboxGroup(panel, [
    {text: "JPEG"},
    {text: "PNG"},
    {text: "TIFF"},
    {text: "PDF"}
], [true, false, false, false]);
```

### Dynamic Content with Stack

**Pattern: Show/Hide Panels**

```javascript
// Create container with stack orientation
var stackContainer = dialog.add("group");
stackContainer.orientation = "stack";

// Create multiple content panels
var panel1 = stackContainer.add("panel", undefined, "Panel 1");
var panel2 = stackContainer.add("panel", undefined, "Panel 2");

// Initially show panel1, hide panel2
panel1.visible = true;
panel2.visible = false;

// Switch panels based on selection
dropdown.onChange = function() {
    if (this.selection.index === 0) {
        panel1.visible = true;
        panel2.visible = false;
    } else {
        panel1.visible = false;
        panel2.visible = true;
    }
};
```

### Validation Patterns

**Pattern: Input Validation**

```javascript
var nameInput = dialog.add("edittext", undefined, "");
nameInput.onChange = function() {
    if (this.text.length < 3) {
        alert("Name must be at least 3 characters");
        this.active = true; // Return focus
    }
};

// Validate on dialog close
dialog.onClose = function() {
    if (nameInput.text.length < 3) {
        alert("Please enter a valid name");
        return false; // Prevent closing
    }
    return true; // Allow closing
};
```

### Error Handling

**Pattern: Graceful Error Handling**

```javascript
function safeGetText(edittext) {
    try {
        return edittext.text || "";
    } catch (e) {
        return "";
    }
}

function safeGetValue(checkbox) {
    try {
        return checkbox.value || false;
    } catch (e) {
        return false;
    }
}
```

---

## Code Examples Library

### Simple Dialog

**From ScriptUI Dialog Builder - Export Layers Example:**

```javascript
// DIALOG
var dialog = new Window("dialog"); 
dialog.text = "Export Layers Inside Selected Group"; 
dialog.orientation = "column"; 
dialog.alignChildren = ["center","top"]; 
dialog.spacing = 10; 
dialog.margins = 16; 

// GROUP1
var group1 = dialog.add("group"); 
group1.orientation = "column"; 
group1.alignChildren = ["fill","top"]; 
group1.spacing = 10; 
group1.margins = 0; 

// PANEL1
var panel1 = group1.add("panel"); 
panel1.text = "File name options"; 
panel1.orientation = "column"; 
panel1.alignChildren = ["left","top"]; 
panel1.spacing = 10; 
panel1.margins = 10; 

var checkbox1 = panel1.add("checkbox"); 
checkbox1.text = "Use layer name"; 

// GROUP2
var group2 = panel1.add("group"); 
group2.orientation = "row"; 
group2.alignChildren = ["left","center"]; 
group2.spacing = 10; 
group2.margins = 0; 

// GROUP3
var group3 = group2.add("group"); 
group3.orientation = "column"; 
group3.alignChildren = ["left","top"]; 
group3.spacing = 10; 
group3.margins = 0; 

var statictext1 = group3.add("statictext"); 
statictext1.text = "Prefix:"; 

var edittext1 = group3.add("edittext"); 
edittext1.minimumSize.width = 90; 

// GROUP6
var group6 = dialog.add("group"); 
group6.orientation = "row"; 
group6.alignChildren = ["left","top"]; 
group6.spacing = 10; 
group6.margins = 0; 

var button1 = group6.add("button"); 
button1.text = "Cancel"; 
button1.justify = "center"; 

var button2 = group6.add("button"); 
button2.text = "Save"; 
button2.justify = "center"; 

dialog.show();
```

### Complex Layout

**From ScriptUI Dialog Builder - Import PDF Example:**

```javascript
// DIALOG
var dialog = new Window("dialog"); 
dialog.text = "Import Multiple PDF pages"; 
dialog.orientation = "row"; 
dialog.alignChildren = ["left","top"]; 
dialog.spacing = 10; 
dialog.margins = 16; 

// GROUP1
var group1 = dialog.add("group"); 
group1.orientation = "column"; 
group1.alignChildren = ["fill","top"]; 
group1.spacing = 10; 
group1.margins = 0; 

// PANEL1
var panel1 = group1.add("panel"); 
panel1.text = "Page Selection"; 
panel1.preferredSize.height = 205; 
panel1.orientation = "column"; 
panel1.alignChildren = ["left","top"]; 
panel1.spacing = 10; 
panel1.margins = 10; 

var statictext1 = panel1.add("statictext"); 
statictext1.text = "Import PDF Pages:"; 

// GROUP2
var group2 = panel1.add("group"); 
group2.orientation = "row"; 
group2.alignChildren = ["left","center"]; 
group2.spacing = 10; 
group2.margins = 0; 

var edittext1 = group2.add("edittext"); 
edittext1.text = "1"; 
edittext1.minimumSize.width = 60; 

var statictext2 = group2.add("statictext"); 
statictext2.text = "thru"; 

var edittext2 = group2.add("edittext"); 
edittext2.text = "1"; 
edittext2.minimumSize.width = 60; 

// DROPDOWN EXAMPLE
var dropdown1_array = [
    "Top Left", "Top Center", "Top Right",
    "Center Left", "Center", "Center Right",
    "Bottom Left", "Bottom Center", "Bottom Right",
    "-",
    "Top - Relative to spine",
    "Center - Relative to spine",
    "Right - Relative to spine"
];
var dropdown1 = panel3.add("dropdownlist", undefined, dropdown1_array); 
dropdown1.selection = 0;

// GROUP6
var group6 = dialog.add("group"); 
group6.orientation = "column"; 
group6.alignChildren = ["fill","top"]; 
group6.spacing = 10; 
group6.margins = 0; 

var button1 = group6.add("button"); 
button1.text = "OK"; 
button1.justify = "center"; 

var button2 = group6.add("button"); 
button2.text = "Cancel"; 
button2.justify = "center"; 

dialog.show();
```

### Example from Official Documentation

**Alert Box Builder Example:**

```javascript
var dlg = new Window("dialog", "Alert Box Builder");
dlg.orientation = "column";
dlg.alignChildren = ["fill", "top"];
dlg.spacing = 10;
dlg.margins = 16;

// Panel for messages
dlg.msgPnl = dlg.add("panel", undefined, "Messages");
dlg.msgPnl.orientation = "column";
dlg.msgPnl.spacing = 8;
dlg.msgPnl.margins = 10;

dlg.msgPnl.titleSt = dlg.msgPnl.add("statictext", undefined, "Alert box title:");
dlg.msgPnl.titleEt = dlg.msgPnl.add("edittext", undefined, "Sample Alert");
dlg.msgPnl.titleEt.characters = 30;

dlg.msgPnl.msgSt = dlg.msgPnl.add("statictext", undefined, "Alert message:");
dlg.msgPnl.msgEt = dlg.msgPnl.add("edittext", undefined, "<your message here>", {
    multiline: true
});
dlg.msgPnl.msgEt.preferredSize = [300, 80];

// Panel for buttons
dlg.btnPnl = dlg.add("panel", undefined, "Build it");
dlg.btnPnl.orientation = "row";
dlg.btnPnl.spacing = 8;
dlg.btnPnl.alignment = ["center", "center"];

dlg.btnPnl.testBtn = dlg.btnPnl.add("button", undefined, "Test");
dlg.btnPnl.buildBtn = dlg.btnPnl.add("button", undefined, "Build", {name: "ok"});
dlg.btnPnl.cancelBtn = dlg.btnPnl.add("button", undefined, "Cancel", {name: "cancel"});

// Event handlers
dlg.btnPnl.testBtn.onClick = function() {
    alert(dlg.msgPnl.titleEt.text + "\n\n" + dlg.msgPnl.msgEt.text);
};

dlg.btnPnl.buildBtn.onClick = function() {
    this.parent.parent.close(1);
};

dlg.btnPnl.cancelBtn.onClick = function() {
    this.parent.parent.close(2);
};

dlg.show();
```

---

## Illustrator-Specific Issues and Limitations

### Font Styling Limitations

**Problem:** ScriptUI has very limited font styling capabilities in Illustrator. You cannot directly set bold, italic, or custom fonts on StaticText or other text elements.

**What Doesn't Work:**
```javascript
// ❌ This will cause an error: "newFont is not a function"
var label = dialog.add("statictext", undefined, "Bold Text");
label.graphics.font = label.graphics.newFont(label.graphics.font.name, label.graphics.font.size, "bold");
```

**Why:** The `graphics.newFont()` method is not available on ScriptUI graphics objects. Font styling is controlled by the system and application defaults.

**Workarounds:**
- Use plain text without styling
- Use different text formatting (e.g., ALL CAPS, symbols, spacing) to emphasize
- Accept system default fonts
- Use Panel titles for visual hierarchy instead of styled text

**Example:**
```javascript
// ✅ Correct: Plain text
var title = dialog.add("statictext", undefined, "Settings");

// ✅ Alternative: Use panel title for emphasis
var settingsPanel = dialog.add("panel", undefined, "Settings");
```

### Window Type Issues

#### ⚠️ CRITICAL: Palette Windows Do NOT Work in Illustrator

**Palette windows (`"palette"`) will NOT appear in Adobe Illustrator.** This is a known limitation of ScriptUI in Illustrator. The window will be created but will not be visible to the user, regardless of any configuration or workarounds.

**Dialog Windows (`"dialog"`) - The Only Option for Illustrator:**
- **Pros:** Reliable, always shows, modal (blocks interaction)
- **Cons:** Not resizable, must be closed to continue
- **Use for:** All ScriptUI windows in Illustrator - this is your only option

```javascript
// ✅ This works in Illustrator
var dialog = new Window("dialog", "My Dialog");
dialog.show(); // Blocks until closed, returns value
```

**Palette Windows (`"palette"`) - Does NOT Work in Illustrator:**
- **❌ Will not appear in Illustrator** - window is created but invisible
- Works in other Adobe applications (Photoshop, InDesign, After Effects)
- If you need palettes, you must use a different Adobe application

```javascript
// ❌ This will NOT work in Illustrator - window won't appear
var palette = new Window("palette", "My Palette");
palette.minimumSize = [400, 300];
palette.maximumSize = [1200, 800];
palette.show(); // Nothing happens - window is invisible
```

**Important Notes:**
- There are no workarounds to make palette windows work in Illustrator
- All ScriptUI windows in Illustrator must use `"dialog"` type
- Dialog windows are not resizable in Illustrator
- If you need resizable windows, ScriptUI in Illustrator cannot provide this functionality

### Resizing Considerations

**⚠️ IMPORTANT: Resizing is NOT available in Illustrator.**

Dialog windows in Illustrator are **not resizable**. Only palette windows support resizing, but palette windows do not work in Illustrator.

**For Other Adobe Applications (Photoshop, InDesign, etc.):**

If you're building for applications where palettes work, you can use these techniques:

1. **Use fill alignment** for elements that should grow/shrink:
```javascript
container.alignChildren = ["fill", "fill"];
element.alignment = ["fill", "fill"];
```

2. **Set preferredSize to -1** to let layout manager calculate:
```javascript
element.preferredSize = [-1, -1]; // Fill available space
element.preferredSize = [200, -1]; // Fixed width, calculated height
```

3. **Handle layout updates on resize:**
```javascript
win.onResize = function() {
    if (this.layout) {
        this.layout.layout(true); // Force full recalculation
    }
};
```

4. **Set reasonable size constraints:**
```javascript
win.minimumSize = [400, 300]; // Prevent too small
win.maximumSize = [1200, 800]; // Prevent too large
```

**For Illustrator:**
- Windows are fixed size based on content and `preferredSize`
- Use `preferredSize` to set initial window dimensions
- Layout will adapt to content, but window cannot be manually resized by user

### Character Encoding Issues

**Problem:** ExtendScript/ScriptUI has limited Unicode character support. Special Unicode characters (like bullet points, em dashes, special symbols) may display incorrectly as garbled characters.

**What Doesn't Work:**
```javascript
// ❌ Unicode bullet character may display as garbled text
var text = dialog.add("statictext", undefined, 
    "Features:\n" +
    "• Feature 1\n" +  // May show as ",A" or "„Ä¢"
    "• Feature 2\n"
);
```

**Why:** ExtendScript uses a limited character encoding that doesn't fully support all Unicode characters. Some characters may be misinterpreted or not render correctly.

**Solution:**
- Use ASCII characters instead of Unicode symbols
- Use simple characters like `-`, `*`, `>` for bullet points
- Avoid special Unicode characters (em dashes, en dashes, smart quotes, etc.)

**Example:**
```javascript
// ✅ Correct: Use ASCII characters
var text = dialog.add("statictext", undefined, 
    "Features:\n" +
    "- Feature 1\n" +  // ASCII hyphen works reliably
    "- Feature 2\n" +
    "- Feature 3\n"
);

// ✅ Alternative: Use asterisk or other ASCII characters
var text2 = dialog.add("statictext", undefined, 
    "Options:\n" +
    "* Option A\n" +
    "* Option B\n"
);
```

**Safe ASCII Characters for Lists:**
- `-` (hyphen) - Most common and reliable
- `*` (asterisk) - Good alternative
- `>` (greater than) - Can work for indented lists
- Numbers: `1.`, `2.`, `3.` - Always safe

**Avoid These Unicode Characters:**
- `•` (bullet point, U+2022)
- `—` (em dash, U+2014)
- `–` (en dash, U+2013)
- `"` `"` (smart quotes, U+201C, U+201D)
- `'` `'` (smart apostrophes, U+2018, U+2019)
- `…` (ellipsis, U+2026)

### Window Sizing Best Practices

**Problem:** Dialog windows in Illustrator are not resizable, so you must set an appropriate size that fits on all screen sizes. Windows that are too large may be cut off or positioned off-screen.

**Solution:** Always detect screen size and constrain window dimensions to fit within available screen space.

**Screen Size Detection:**
```javascript
// Get primary screen dimensions
var screenWidth = $.screens[0].right - $.screens[0].left;
var screenHeight = $.screens[0].bottom - $.screens[0].top;

// Calculate maximum safe window size (90% of screen)
// Leave 10% for margins, taskbars, and window chrome
var maxWidth = Math.floor(screenWidth * 0.9);
var maxHeight = Math.floor(screenHeight * 0.9);
```

**Complete Window Sizing Pattern:**
```javascript
// Screen size detection
var screenWidth = $.screens[0].right - $.screens[0].left;
var screenHeight = $.screens[0].bottom - $.screens[0].top;

// Maximum safe size (90% of screen)
var maxWidth = Math.floor(screenWidth * 0.9);
var maxHeight = Math.floor(screenHeight * 0.9);

// Minimum usable size (ensures window is never too small)
var minWidth = 400;
var minHeight = 300;

// Desired window size
var desiredWidth = 500;
var desiredHeight = 550;

// Calculate final size: constrain between min and max
var windowWidth = Math.max(minWidth, Math.min(desiredWidth, maxWidth));
var windowHeight = Math.max(minHeight, Math.min(desiredHeight, maxHeight));

// Create window with constrained size
var dialog = new Window("dialog", "My Dialog");
dialog.preferredSize = [windowWidth, windowHeight];
```

**Why This Matters:**
- Prevents windows from being cut off on smaller screens
- Ensures windows fit on all common display sizes
- Maintains usability on very small screens (laptops, tablets)
- Prevents windows from exceeding screen bounds

**Recommended Size Constraints:**
- **Maximum:** 90% of screen size (leaves room for margins/taskbars)
- **Minimum:** 400x300 pixels (ensures basic usability)
- **Default:** 500x550 pixels (good for most dialogs)

**Example with Error Handling:**
```javascript
function getSafeWindowSize(desiredWidth, desiredHeight) {
    try {
        var screenWidth = $.screens[0].right - $.screens[0].left;
        var screenHeight = $.screens[0].bottom - $.screens[0].top;
        
        var maxWidth = Math.floor(screenWidth * 0.9);
        var maxHeight = Math.floor(screenHeight * 0.9);
        var minWidth = 400;
        var minHeight = 300;
        
        var width = Math.max(minWidth, Math.min(desiredWidth, maxWidth));
        var height = Math.max(minHeight, Math.min(desiredHeight, maxHeight));
        
        return [width, height];
    } catch (e) {
        // Fallback to safe defaults if screen detection fails
        return [500, 550];
    }
}

var dialog = new Window("dialog", "My Dialog");
var size = getSafeWindowSize(500, 550);
dialog.preferredSize = size;
```

### Other Illustrator-Specific Notes

1. **Window Type:**
   - **ONLY `"dialog"` type works in Illustrator**
   - Palette windows will not appear - do not use them
   - Always call `win.center()` before `win.show()`

2. **Window Sizing:**
   - Dialog windows are NOT resizable in Illustrator
   - Set `preferredSize` to control initial window size
   - Window size is fixed once shown
   - **Always detect screen size** and constrain window dimensions
   - Use 90% of screen size as maximum, with minimum of 400x300

3. **Character Encoding:**
   - **Use ASCII characters only** - avoid Unicode symbols
   - Use `-` or `*` for bullet points, not `•`
   - Avoid smart quotes, em dashes, and other Unicode characters

4. **Layout Updates:**
   - Layout may not update automatically when content changes
   - Call `win.layout.layout()` to force update if needed
   - This is mainly for dynamic content updates, not resizing

5. **Error Handling:**
   - Wrap window creation in try-catch blocks
   - Always use `"dialog"` type - no fallback needed
   - Provide fallback sizes if screen detection fails

6. **Performance:**
   - Complex layouts with many elements may be slow
   - Consider lazy loading or progressive disclosure
   - Use tabs or panels to organize complex interfaces

### Recommended Patterns for Illustrator

**⚠️ IMPORTANT: Only Pattern 1 works in Illustrator. Patterns 2 and 3 are for other Adobe applications.**

**Pattern 1: Dialog Window (ONLY Option for Illustrator)**
```javascript
// ✅ This is the ONLY window type that works in Illustrator

// Screen size detection for safe window sizing
var screenWidth = $.screens[0].right - $.screens[0].left;
var screenHeight = $.screens[0].bottom - $.screens[0].top;
var maxWidth = Math.floor(screenWidth * 0.9);
var maxHeight = Math.floor(screenHeight * 0.9);
var minWidth = 400;
var minHeight = 300;
var desiredWidth = 450;
var desiredHeight = 500;
var windowWidth = Math.max(minWidth, Math.min(desiredWidth, maxWidth));
var windowHeight = Math.max(minHeight, Math.min(desiredHeight, maxHeight));

var dialog = new Window("dialog", "Settings");
dialog.orientation = "column";
dialog.alignChildren = ["fill", "top"];
dialog.spacing = 10;
dialog.margins = 16;
dialog.preferredSize = [windowWidth, windowHeight]; // Constrained to screen size

// ... add controls ...

dialog.center();
var result = dialog.show(); // Blocks until closed, returns value
```

**Pattern 2: Resizable Palette (For Photoshop/InDesign/After Effects ONLY)**
```javascript
// ⚠️ This does NOT work in Illustrator - use only for other Adobe apps
var palette = new Window("palette", "Tool Panel");
palette.orientation = "column";
palette.alignChildren = ["fill", "top"];
palette.minimumSize = [300, 200];
palette.preferredSize = [400, 500];
palette.maximumSize = [1000, 800];

// Use fill alignment for resizable content
var content = palette.add("group");
content.alignment = ["fill", "fill"];

palette.onResize = function() {
    if (this.layout) {
        this.layout.layout();
    }
};

palette.center();
palette.show();
```

**Pattern 3: Application Detection (For Multi-App Scripts)**
```javascript
// Detect which Adobe application is running
function createWindow(title) {
    var appName = app.name;
    
    if (appName === "Adobe Illustrator") {
        // Illustrator: Must use dialog
        var win = new Window("dialog", title);
        win.preferredSize = [450, 500];
        return win;
    } else {
        // Other apps: Can use palette for resizable windows
        var win = new Window("palette", title);
        win.minimumSize = [400, 300];
        win.preferredSize = [450, 500];
        win.maximumSize = [1200, 800];
        return win;
    }
}

var win = createWindow("My Window");
// ... setup ...
win.center();
win.show();
```

---

## Summary

This reference covers the core ScriptUI elements and features:

### Container Elements
- **Window**: Top-level container (dialog, palette, window)
- **Group**: Invisible container for layout
- **Panel**: Container with title and border
- **TabbedPanel**: Container with selectable tabs
- **Tab**: Individual tab within TabbedPanel

### Control Elements
- **Button**: Push button for actions
- **Checkbox**: Dual-state checkbox
- **EditText**: Text input field
- **StaticText**: Read-only text label
- **DropdownList**: Drop-down selection list
- **RadioButton**: Mutually exclusive option buttons
- **Slider**: Horizontal value selector
- **Scrollbar**: Scrollable bar control
- **ProgressBar**: Progress indicator
- **ListBox**: Multi-item list
- **TreeView**: Hierarchical list
- **Image**: Image display
- **IconButton**: Button with icon
- **EditNumber**: Numeric input (Photoshop CC 2019+)

### Layout System
- **Orientation**: `row`, `column`, or `stack`
- **Alignment**: `alignChildren` (container) and `alignment` (child)
- **Spacing**: Pixels between children
- **Margins**: Space around container edges
- **Preferred Size**: Hints for element dimensions

### Event Handling
- **Callbacks**: Direct property assignment (`onClick`, `onChange`, etc.)
- **Event Listeners**: W3C DOM-compliant system (`addEventListener`)

### Best Practices
- Use automatic layout when possible
- Group related controls in Panels
- Use Groups for fine layout control
- Set `name: "ok"` and `name: "cancel"` for dialog buttons
- Validate input in `onChange` or `onClose` handlers
- Use `preferredSize` sparingly, let ScriptUI calculate when possible
- **For Illustrator:** **ONLY use `"dialog"` type windows** - palette windows do not work
- **For Illustrator:** Don't attempt font styling (newFont doesn't work)
- **For Illustrator:** Always call `center()` before `show()` for all windows
- **For Illustrator:** Dialog windows are NOT resizable - set `preferredSize` for initial size
- **For Illustrator:** **Always detect screen size** and constrain window dimensions (max 90% of screen)
- **For Illustrator:** **Use ASCII characters only** - avoid Unicode symbols (use `-` not `•` for bullets)
- **For Illustrator:** If you need resizing, ScriptUI cannot provide this in Illustrator

---

## References

- **Official Documentation**: https://extendscript.docsforadobe.dev/user-interface-tools/
- **ScriptUI Dialog Builder**: https://scriptui.joonas.me
- **Repository Examples**: 
  - Export Layers: https://gist.github.com/joonaspaakko/29c8bc6321fdb76b8fd6daa32745724e
  - Import PDF: https://gist.github.com/joonaspaakko/3752836f282819949d5d0ab7268007dd
