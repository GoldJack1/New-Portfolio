/**
 * Comprehensive ScriptUI Elements Example for Adobe Illustrator
 * 
 * This example demonstrates ALL ScriptUI elements from the reference documentation:
 * 
 * Container Elements:
 * - Window (dialog type - only option that works in Illustrator)
 * - Group
 * - Panel
 * - TabbedPanel
 * - Tab
 * 
 * Control Elements:
 * - Button
 * - Checkbox
 * - EditText (single-line and multiline)
 * - StaticText
 * - DropdownList
 * - RadioButton
 * - Slider
 * - Scrollbar
 * - ProgressBar
 * - ListBox
 * - TreeView
 * - Image
 * - IconButton
 * 
 * Note: Palette windows do NOT work in Illustrator. Only dialog windows are supported.
 * Dialog windows are modal and not resizable, but they work reliably.
 * 
 * Usage:
 * 1. Open this file in Illustrator
 * 2. File > Scripts > Other Script... > select this file
 */

// Check if we're in Illustrator
if (app.name !== "Adobe Illustrator") {
    alert("This script is designed for Adobe Illustrator.");
} else {
// ============================================================================
// SCREEN SIZE DETECTION
// ============================================================================
// Get screen dimensions to ensure window fits on screen
// Use 90% of screen size as maximum, leaving 10% for margins and taskbars
var screenWidth = $.screens[0].right - $.screens[0].left;
var screenHeight = $.screens[0].bottom - $.screens[0].top;

// Calculate maximum safe window size (90% of screen with padding)
var maxWidth = Math.floor(screenWidth * 0.9);
var maxHeight = Math.floor(screenHeight * 0.9);

// Minimum usable window size (ensures window is never too small)
var minWidth = 400;
var minHeight = 300;

// Desired window size (larger to accommodate all elements)
var desiredWidth = 650;
var desiredHeight = 700;

// Calculate final window size:
// - Use desired size if it fits within max bounds
// - Use max size if desired is too large
// - Use min size if screen is too small (ensures usability)
var windowWidth = Math.max(minWidth, Math.min(desiredWidth, maxWidth));
var windowHeight = Math.max(minHeight, Math.min(desiredHeight, maxHeight));

// ============================================================================
// CREATE DIALOG WINDOW
// ============================================================================
// Create dialog window
// Note: Only "dialog" type works in Illustrator. Palette windows do not appear.
// Dialog windows are modal (block interaction) and not resizable, but work reliably.
var win = new Window("dialog", "ScriptUI Elements Showcase");
win.orientation = "column";
win.alignChildren = ["fill", "top"];
win.spacing = 10;
win.margins = 12;

// Set preferred size for initial window dimensions
// Note: Dialog windows are not resizable in Illustrator
// Size is constrained to fit on screen
win.preferredSize = [windowWidth, windowHeight];

// Create the tabbed panel
var tabbedPanel = win.add("tabbedpanel");
tabbedPanel.alignment = ["fill", "fill"];
tabbedPanel.preferredSize = [-1, -1]; // Let it fill available space

// ============================================================================
// TAB 1: Basic Controls
// ============================================================================
var tab1 = tabbedPanel.add("tab", undefined, "Basic Controls");
tab1.orientation = "column";
tab1.alignChildren = ["fill", "top"];
tab1.spacing = 10;
tab1.margins = 12;

// Title
var title1 = tab1.add("statictext", undefined, "Basic Control Elements", {
    multiline: false
});

// EditText - Single line
var nameGroup = tab1.add("group");
nameGroup.orientation = "row";
nameGroup.spacing = 8;
nameGroup.alignChildren = ["left", "center"];

var nameLabel = nameGroup.add("statictext", undefined, "Name:");
nameLabel.preferredSize.width = 100;

var nameInput = nameGroup.add("edittext", undefined, "My Document");
nameInput.characters = 25;
nameInput.alignment = ["fill", "center"];

// EditText - Multiline
var descGroup = tab1.add("group");
descGroup.orientation = "column";
descGroup.spacing = 4;
descGroup.alignChildren = ["fill", "top"];

var descLabel = descGroup.add("statictext", undefined, "Description (multiline):");
var descInput = descGroup.add("edittext", undefined, "Enter description here...", {
    multiline: true,
    scrollable: true
});
descInput.preferredSize = [-1, 80];
descInput.alignment = ["fill", "fill"];

// Checkboxes
var checkboxPanel = tab1.add("panel", undefined, "Checkboxes");
checkboxPanel.orientation = "column";
checkboxPanel.spacing = 6;
checkboxPanel.margins = 10;
checkboxPanel.alignment = ["fill", "top"];

var opt1 = checkboxPanel.add("checkbox", undefined, "Enable feature A");
opt1.value = true;

var opt2 = checkboxPanel.add("checkbox", undefined, "Enable feature B");
opt2.value = false;

var opt3 = checkboxPanel.add("checkbox", undefined, "Enable feature C");
opt3.value = true;

// RadioButtons
var radioPanel = tab1.add("panel", undefined, "Radio Buttons");
radioPanel.orientation = "row";
radioPanel.spacing = 12;
radioPanel.margins = 10;
radioPanel.alignChildren = ["left", "center"];

var radioLabel = radioPanel.add("statictext", undefined, "Style:");
radioLabel.preferredSize.width = 60;

var radio1 = radioPanel.add("radiobutton", undefined, "Option 1");
var radio2 = radioPanel.add("radiobutton", undefined, "Option 2");
var radio3 = radioPanel.add("radiobutton", undefined, "Option 3");
radio1.value = true; // Default selection

// ============================================================================
// TAB 2: Lists & Selection
// ============================================================================
var tab2 = tabbedPanel.add("tab", undefined, "Lists & Selection");
tab2.orientation = "column";
tab2.alignChildren = ["fill", "top"];
tab2.spacing = 10;
tab2.margins = 12;

// Title
var title2 = tab2.add("statictext", undefined, "List and Selection Controls", {
    multiline: false
});

// DropdownList
var dropdownGroup = tab2.add("group");
dropdownGroup.orientation = "row";
dropdownGroup.spacing = 8;
dropdownGroup.alignChildren = ["left", "center"];

var dropdownLabel = dropdownGroup.add("statictext", undefined, "Dropdown:");
dropdownLabel.preferredSize.width = 100;

var colorDropdown = dropdownGroup.add("dropdownlist", undefined, [
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Purple",
    "Orange",
    "Cyan",
    "Magenta"
]);
colorDropdown.selection = 0;
colorDropdown.alignment = ["fill", "center"];

// ListBox - Single selection
var listboxPanel = tab2.add("panel", undefined, "ListBox (Single Selection)");
listboxPanel.orientation = "column";
listboxPanel.spacing = 8;
listboxPanel.margins = 10;
listboxPanel.alignment = ["fill", "top"];

var listboxLabel = listboxPanel.add("statictext", undefined, "Select an item:");
var listbox = listboxPanel.add("listbox", undefined, [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5"
]);
listbox.preferredSize = [-1, 100];
listbox.alignment = ["fill", "fill"];
listbox.selection = 0;

// ListBox - Multi selection
var multiselectPanel = tab2.add("panel", undefined, "ListBox (Multi Selection)");
multiselectPanel.orientation = "column";
multiselectPanel.spacing = 8;
multiselectPanel.margins = 10;
multiselectPanel.alignment = ["fill", "top"];

var multiselectLabel = multiselectPanel.add("statictext", undefined, "Select multiple items:");
var multiselectListbox = multiselectPanel.add("listbox", undefined, [
    "Option A",
    "Option B",
    "Option C",
    "Option D",
    "Option E"
]);
multiselectListbox.preferredSize = [-1, 80];
multiselectListbox.alignment = ["fill", "fill"];
multiselectListbox.multiselect = true;
multiselectListbox.selection = [0, 2]; // Select first and third items

// TreeView
var treeviewPanel = tab2.add("panel", undefined, "TreeView (Hierarchical List)");
treeviewPanel.orientation = "column";
treeviewPanel.spacing = 8;
treeviewPanel.margins = 10;
treeviewPanel.alignment = ["fill", "top"];

var treeviewLabel = treeviewPanel.add("statictext", undefined, "Hierarchical structure:");
var treeview = treeviewPanel.add("treeview", undefined, [
    "Folder 1",
    "Folder 2",
    "Folder 3"
]);
treeview.preferredSize = [-1, 100];
treeview.alignment = ["fill", "fill"];

// Add child items to tree nodes (if supported)
try {
    if (treeview.items.length > 0) {
        // Note: TreeView child items may require different syntax
        // This is a basic example
    }
} catch (e) {
    // TreeView implementation may vary
}

// ============================================================================
// TAB 3: Sliders & Progress
// ============================================================================
var tab3 = tabbedPanel.add("tab", undefined, "Sliders & Progress");
tab3.orientation = "column";
tab3.alignChildren = ["fill", "top"];
tab3.spacing = 10;
tab3.margins = 12;

// Title
var title3 = tab3.add("statictext", undefined, "Slider and Progress Controls", {
    multiline: false
});

// Slider
var sliderPanel = tab3.add("panel", undefined, "Slider");
sliderPanel.orientation = "column";
sliderPanel.spacing = 8;
sliderPanel.margins = 10;
sliderPanel.alignment = ["fill", "top"];

var sliderLabel = sliderPanel.add("statictext", undefined, "Quality: 50%");
var qualitySlider = sliderPanel.add("slider", undefined, 50, 0, 100);
qualitySlider.alignment = ["fill", "center"];

// Update label when slider changes
qualitySlider.onChange = function() {
    sliderLabel.text = "Quality: " + this.value + "%";
};

// Scrollbar
var scrollbarPanel = tab3.add("panel", undefined, "Scrollbar");
scrollbarPanel.orientation = "column";
scrollbarPanel.spacing = 8;
scrollbarPanel.margins = 10;
scrollbarPanel.alignment = ["fill", "top"];

var scrollbarLabel = scrollbarPanel.add("statictext", undefined, "Position: 25");
var scrollbar = scrollbarPanel.add("scrollbar", undefined, 25, 0, 100);
scrollbar.alignment = ["fill", "center"];
scrollbar.stepdelta = 5; // Increment for stepper buttons
scrollbar.jumpdelta = 20; // Increment for clicking bar

// Update label when scrollbar changes
scrollbar.onChange = function() {
    scrollbarLabel.text = "Position: " + this.value;
};

// ProgressBar
var progressPanel = tab3.add("panel", undefined, "ProgressBar");
progressPanel.orientation = "column";
progressPanel.spacing = 8;
progressPanel.margins = 10;
progressPanel.alignment = ["fill", "top"];

var progressLabel = progressPanel.add("statictext", undefined, "Progress: 0%");
var progressBar = progressPanel.add("progressbar", undefined, 0, 0, 100);
progressBar.alignment = ["fill", "center"];

// Simulate progress (for demonstration)
var progressValue = 0;
var progressInterval = null;

var progressBtn = progressPanel.add("button", undefined, "Start Progress");
progressBtn.onClick = function() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
        this.text = "Start Progress";
        progressValue = 0;
        progressBar.value = 0;
        progressLabel.text = "Progress: 0%";
    } else {
        this.text = "Stop Progress";
        progressInterval = setInterval(function() {
            progressValue += 5;
            if (progressValue > 100) progressValue = 100;
            progressBar.value = progressValue;
            progressLabel.text = "Progress: " + progressValue + "%";
            if (progressValue >= 100) {
                clearInterval(progressInterval);
                progressInterval = null;
                progressBtn.text = "Start Progress";
            }
        }, 200);
    }
};

// ============================================================================
// TAB 4: Images & Icons
// ============================================================================
var tab4 = tabbedPanel.add("tab", undefined, "Images & Icons");
tab4.orientation = "column";
tab4.alignChildren = ["fill", "top"];
tab4.spacing = 10;
tab4.margins = 12;

// Title
var title4 = tab4.add("statictext", undefined, "Image and Icon Controls", {
    multiline: false
});

// Image control
var imagePanel = tab4.add("panel", undefined, "Image Control");
imagePanel.orientation = "column";
imagePanel.spacing = 8;
imagePanel.margins = 10;
imagePanel.alignment = ["fill", "top"];

var imageLabel = imagePanel.add("statictext", undefined, "Image display (placeholder):");
// Note: Image control requires a ScriptUIImage object or resource
// This is a placeholder - actual image loading may require additional setup
try {
    var imageControl = imagePanel.add("image", undefined, undefined);
    imageControl.preferredSize = [200, 100];
    imageControl.alignment = ["center", "center"];
    // imageControl.image = ... (would set actual image here)
} catch (e) {
    var imagePlaceholder = imagePanel.add("statictext", undefined, "[Image control - requires ScriptUIImage]");
    imagePlaceholder.alignment = ["center", "center"];
}

// IconButton
var iconButtonPanel = tab4.add("panel", undefined, "IconButton");
iconButtonPanel.orientation = "row";
iconButtonPanel.spacing = 8;
iconButtonPanel.margins = 10;
iconButtonPanel.alignChildren = ["left", "center"];

var iconButtonLabel = iconButtonPanel.add("statictext", undefined, "Icon buttons:");
// Note: IconButton requires an icon resource
// This is a placeholder - actual icon loading may require additional setup
try {
    var iconBtn1 = iconButtonPanel.add("iconbutton", undefined, undefined);
    iconBtn1.text = "Icon 1";
    iconBtn1.preferredSize = [80, 24];
    
    var iconBtn2 = iconButtonPanel.add("iconbutton", undefined, undefined);
    iconBtn2.text = "Icon 2";
    iconBtn2.preferredSize = [80, 24];
} catch (e) {
    var iconPlaceholder = iconButtonPanel.add("statictext", undefined, "[IconButton - requires icon resource]");
}

// About section
var aboutPanel = tab4.add("panel", undefined, "About This Example");
aboutPanel.orientation = "column";
aboutPanel.spacing = 6;
aboutPanel.margins = 10;
aboutPanel.alignment = ["fill", "top"];

// Info text
// Note: Using ASCII characters (-) instead of Unicode bullets (•) for better compatibility
var infoText = aboutPanel.add("statictext", undefined, 
    "This example demonstrates ALL ScriptUI elements:\n\n" +
    "Container Elements:\n" +
    "- Window (dialog type)\n" +
    "- Group\n" +
    "- Panel\n" +
    "- TabbedPanel\n" +
    "- Tab\n\n" +
    "Control Elements:\n" +
    "- Button, Checkbox, EditText, StaticText\n" +
    "- DropdownList, RadioButton\n" +
    "- Slider, Scrollbar, ProgressBar\n" +
    "- ListBox, TreeView\n" +
    "- Image, IconButton\n\n" +
    "Note: Palette windows do not work in Illustrator.",
    {
        multiline: true,
        scrolling: true
    }
);
infoText.preferredSize = [-1, 150];
infoText.alignment = ["fill", "fill"];

// Version info
var versionInfo = aboutPanel.add("statictext", undefined, "Version: 2.0.0 - Complete Elements Showcase");

// ============================================================================
// BUTTONS (Outside tabs, at bottom of window)
// ============================================================================
var buttonGroup = win.add("group");
buttonGroup.orientation = "row";
buttonGroup.spacing = 8;
buttonGroup.alignment = ["right", "center"];

var applyBtn = buttonGroup.add("button", undefined, "Apply");
applyBtn.preferredSize = [80, 24];

var resetBtn = buttonGroup.add("button", undefined, "Reset");
resetBtn.preferredSize = [80, 24];

var closeBtn = buttonGroup.add("button", undefined, "Close");
closeBtn.preferredSize = [80, 24];

// ============================================================================
// EVENT HANDLERS
// ============================================================================

// Apply button
// For dialog windows, you can close with a return value
applyBtn.onClick = function() {
    var currentTab = tabbedPanel.selection;
    var tabName = currentTab ? currentTab.text : "Unknown";
    
    var message = "Settings applied from tab: " + tabName + "\n\n";
    
    // Collect values from current tab
    if (currentTab === tab1) {
        message += "Name: " + nameInput.text + "\n";
        message += "Description: " + descInput.text + "\n";
        message += "Checkboxes: " + (opt1.value ? "A " : "") + (opt2.value ? "B " : "") + (opt3.value ? "C" : "") + "\n";
    } else if (currentTab === tab2) {
        message += "Dropdown: " + (colorDropdown.selection ? colorDropdown.selection.text : "None") + "\n";
        message += "ListBox: " + (listbox.selection ? listbox.selection.text : "None") + "\n";
    } else if (currentTab === tab3) {
        message += "Slider: " + qualitySlider.value + "%\n";
        message += "Scrollbar: " + scrollbar.value + "\n";
        message += "Progress: " + progressBar.value + "%\n";
    } else if (currentTab === tab4) {
        message += "Images & Icons tab\n";
    }
    
    alert(message);
    // Close dialog with return value 1 to indicate "applied"
    win.close(1);
};

// Reset button
resetBtn.onClick = function() {
    if (confirm("Reset all settings to defaults?")) {
        // Reset Tab 1
        nameInput.text = "My Document";
        descInput.text = "Enter description here...";
        opt1.value = true;
        opt2.value = false;
        opt3.value = true;
        
        // Reset Tab 2
        colorDropdown.selection = 0;
        listbox.selection = 0;
        multiselectListbox.selection = [0, 2];
        
        // Reset Tab 3
        qualitySlider.value = 50;
        sliderLabel.text = "Quality: 50%";
        scrollbar.value = 25;
        scrollbarLabel.text = "Position: 25";
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
        progressBar.value = 0;
        progressLabel.text = "Progress: 0%";
        if (progressBtn) progressBtn.text = "Start Progress";
        
        alert("All settings have been reset to defaults.");
    }
};

// Close button
// For dialog windows, close() can return a value to show()
closeBtn.onClick = function() {
    win.close(0); // Return 0 to indicate closed without applying
};

// Tab change handler
tabbedPanel.onChange = function() {
    // Optional: Handle tab changes
    // This fires when user switches tabs
};

// ============================================================================
// SHOW WINDOW
// ============================================================================

// Set initial tab selection
tabbedPanel.selection = tab1;

// Force layout update before showing
if (win.layout) {
    win.layout.layout();
}

// Center and show the window
win.center();

// For dialog windows, show() blocks until window is closed
// It returns the value passed to close() method
var result = win.show();

// Optional: Handle the result
if (result === 0) {
    // Window was closed (e.g., via Close button)
} else if (result === 1) {
    // Window was closed with Apply (if you add that functionality)
}
} // End of Illustrator check
