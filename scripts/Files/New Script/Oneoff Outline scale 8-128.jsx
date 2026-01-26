/**
 * Icon Variant Generator for Adobe Illustrator (v2)
 * 
 * Creates stroke-based icon variants at multiple sizes and weights.
 * Stroke widths are calibrated to match Geologica font weights.
 * 
 * Usage:
 * 1. Open your icon in Illustrator (stroke-based paths)
 * 2. File > Scripts > Other Script... > select this file
 * 3. Configure options in tabs and click Generate
 */

// Check if we're in Illustrator
if (app.name !== "Adobe Illustrator") {
   alert("This script is designed for Adobe Illustrator.");
} else {

// ============================================================================
// CONFIGURATION - Stroke widths calibrated to Geologica font at 32x32
// ============================================================================

var STROKE_WIDTHS = {
  100: 2.22,   // Thin
  200: 2.78,   // ExtraLight
  300: 3.35,   // Light
  400: 3.91,   // Regular
  500: 4.48,   // Medium
  600: 5.05,   // SemiBold
  700: 5.61,   // Bold
  800: 6.18,   // ExtraBold
  900: 6.74    // Black
};

var WEIGHT_NAMES = {
  100: 'Thin',
  200: 'ExtraLight', 
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black'
};

var PRESET_SIZES = {
  'Common': [16, 24, 32, 48],
  'All Standard': [16, 18, 20, 24, 32, 48, 64, 128],
  'Small': [12, 14, 16, 18, 20],
  'Medium': [24, 32, 40, 48],
  'Large': [48, 64, 96, 128, 256]
};

// Common sizes to show as individual checkboxes - All sizes from 8-128px
var AVAILABLE_SIZES = [];
for (var i = 8; i <= 128; i++) {
    AVAILABLE_SIZES.push(i);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function calculateStroke(weight, size) {
  var baseStroke = STROKE_WIDTHS[weight] || STROKE_WIDTHS[400];
  return (baseStroke / 32) * size;
}

function applyStrokeWidth(item, strokeWidth) {
  try {
      if (item.typename === 'PathItem') {
          if (item.stroked) item.strokeWidth = strokeWidth;
      } else if (item.typename === 'CompoundPathItem') {
          for (var i = 0; i < item.pathItems.length; i++) {
              if (item.pathItems[i].stroked) item.pathItems[i].strokeWidth = strokeWidth;
          }
      } else if (item.typename === 'GroupItem') {
          for (var j = 0; j < item.pageItems.length; j++) {
              applyStrokeWidth(item.pageItems[j], strokeWidth);
          }
      }
  } catch (e) {
      // Item may be locked or unmodifiable, skip it
  }
}

function getOriginalStrokeWidth(item) {
  try {
      if (item.typename === 'PathItem') {
          if (item.stroked && item.strokeWidth > 0) {
              return item.strokeWidth;
          }
      } else if (item.typename === 'CompoundPathItem') {
          for (var i = 0; i < item.pathItems.length; i++) {
              if (item.pathItems[i].stroked && item.pathItems[i].strokeWidth > 0) {
                  return item.pathItems[i].strokeWidth;
              }
          }
      } else if (item.typename === 'GroupItem') {
          for (var j = 0; j < item.pageItems.length; j++) {
              var stroke = getOriginalStrokeWidth(item.pageItems[j]);
              if (stroke > 0) return stroke;
          }
      }
  } catch (e) {
      // Item may be locked or unmodifiable, skip it
  }
  return null;
}

function getLargestElementSize(item) {
  var maxSize = 0;
  try {
      if (item.typename === 'GroupItem') {
          for (var j = 0; j < item.pageItems.length; j++) {
              var childSize = getLargestElementSize(item.pageItems[j]);
              if (childSize > maxSize) maxSize = childSize;
          }
      } else if (item.typename === 'PathItem' || item.typename === 'CompoundPathItem') {
          var bounds = item.geometricBounds;
          if (bounds && bounds.length === 4) {
              var width = bounds[2] - bounds[0];
              var height = bounds[1] - bounds[3];
              maxSize = Math.max(width, height);
          }
      }
  } catch (e) {
      // Item may be locked or unmodifiable, skip it
  }
  return maxSize;
}

function scaleInnerElements(item, scaleFactor, isTopLevel, outerSize) {
  try {
      if (item.typename === 'GroupItem') {
          if (isTopLevel) {
              for (var j = 0; j < item.pageItems.length; j++) {
                  scaleInnerElements(item.pageItems[j], scaleFactor, false, outerSize);
              }
          } else {
              var bounds = item.geometricBounds;
              if (bounds && bounds.length === 4) {
                  var width = bounds[2] - bounds[0];
                  var height = bounds[1] - bounds[3];
                  var elementSize = Math.max(width, height);
                  
                  if (outerSize > 0 && elementSize < outerSize * 0.95) {
                      item.resize(
                          scaleFactor * 100, scaleFactor * 100,
                          true, true, true, true,
                          scaleFactor * 100,
                          Transformation.CENTER
                      );
                  }
                  
                  for (var k = 0; k < item.pageItems.length; k++) {
                      scaleInnerElements(item.pageItems[k], scaleFactor, false, outerSize);
                  }
              }
          }
      } else if (item.typename === 'PathItem' || item.typename === 'CompoundPathItem') {
          if (!isTopLevel) {
              var pathBounds = item.geometricBounds;
              if (pathBounds && pathBounds.length === 4) {
                  var pathWidth = pathBounds[2] - pathBounds[0];
                  var pathHeight = pathBounds[1] - pathBounds[3];
                  var pathSize = Math.max(pathWidth, pathHeight);
                  
                  if (outerSize > 0 && pathSize < outerSize * 0.95) {
                      item.resize(
                          scaleFactor * 100, scaleFactor * 100,
                          true, true, true, true,
                          scaleFactor * 100,
                          Transformation.CENTER
                      );
                  }
              }
          }
      }
  } catch (e) {
      // Item may be locked or unmodifiable, skip it
  }
}

function unlockItems(item) {
  try {
      if (item.locked) item.locked = false;
      
      if (item.typename === 'GroupItem') {
          for (var i = 0; i < item.pageItems.length; i++) {
              unlockItems(item.pageItems[i]);
          }
      } else if (item.typename === 'CompoundPathItem') {
          for (var j = 0; j < item.pathItems.length; j++) {
              if (item.pathItems[j].locked) item.pathItems[j].locked = false;
          }
      }
  } catch (e) {
      // Skip items that can't be unlocked
  }
}

// ============================================================================
// DIALOG UI
// ============================================================================

function showDialog() {
  if (app.documents.length === 0) {
      alert('Please open an icon document first.');
      return;
  }
  
  var doc = app.activeDocument;
  
  if (doc.artboards.length === 0) {
      alert('No artboards found in the document.');
      return;
  }
  
  // ============================================================================
  // SCREEN SIZE DETECTION
  // ============================================================================
  var screenWidth = $.screens[0].right - $.screens[0].left;
  var screenHeight = $.screens[0].bottom - $.screens[0].top;
  var maxWidth = Math.floor(screenWidth * 0.9);
  var maxHeight = Math.floor(screenHeight * 0.9);
  var minWidth = 400;
  var minHeight = 300;
  var desiredWidth = 650;
  var desiredHeight = 700;
  var windowWidth = Math.max(minWidth, Math.min(desiredWidth, maxWidth));
  var windowHeight = Math.max(minHeight, Math.min(desiredHeight, maxHeight));
  
  // ============================================================================
  // CREATE DIALOG WINDOW
  // ============================================================================
  var win = new Window("dialog", "Icon Variant Generator");
  win.orientation = "column";
  win.alignChildren = ["fill", "top"];
  win.spacing = 10;
  win.margins = 12;
  win.preferredSize = [windowWidth, windowHeight];
  
  // Create the tabbed panel
  var tabbedPanel = win.add("tabbedpanel");
  tabbedPanel.alignment = ["fill", "fill"];
  tabbedPanel.preferredSize = [-1, -1];
  
  // Store UI element references
  var artboardCheckboxes = [];
  var weightCheckboxes = [];
  var sizeCheckboxes = [];
  var customSizeInputs = [];
  var customSizeAddBtn, customSizeContainer;
  var fillCb, outsideStrokeCb, shrinkInnerCb;
  var artboardOutputCb, svgOutputCb;
  var spacingInput, layoutDropdown, rowsInput, colsInput;
  var exportFolderInput, namingInput, embedRasterCb, organizeByFoldersCb, cssLocationDropdown, fontSubsettingDropdown, coordPrecisionInput;
  var generateBtn;
  
  // ============================================================================
  // TAB 1: ARTBOARD SELECTION
  // ============================================================================
  var tab1 = tabbedPanel.add("tab", undefined, "Artboard Selection");
  tab1.orientation = "column";
  tab1.alignChildren = ["fill", "top"];
  tab1.spacing = 10;
  tab1.margins = 12;
  
  var artboardPanel = tab1.add("panel", undefined, "Select Artboards");
  artboardPanel.orientation = "column";
  artboardPanel.alignChildren = ["fill", "top"];
  artboardPanel.spacing = 6;
  artboardPanel.margins = 10;
  
  // Container for artboard checkboxes in a 4-wide grid format
  var artboardScrollGroup = artboardPanel.add("group");
  artboardScrollGroup.orientation = "column";
  artboardScrollGroup.alignChildren = ["left", "top"];
  artboardScrollGroup.spacing = 4;
  
  // Calculate the maximum width needed for any artboard name
  var maxNameLength = 0;
  for (var calcA = 0; calcA < doc.artboards.length; calcA++) {
      var testName = (calcA + 1) + ". " + doc.artboards[calcA].name;
      if (testName.length > maxNameLength) {
          maxNameLength = testName.length;
      }
  }
  // Set a fixed column width (add some padding for checkbox + spacing)
  var columnWidth = Math.max(120, maxNameLength * 6 + 25);
  
  // Create rows with 4 checkboxes per row in a grid format
  var artboardInputsPerRow = 4;
  var currentArtboardRow = null;
  var artboardRows = [];
  
  // First, create all rows needed
  var numRows = Math.ceil(doc.artboards.length / artboardInputsPerRow);
  for (var r = 0; r < numRows; r++) {
      var row = artboardScrollGroup.add("group");
      row.orientation = "row";
      row.spacing = 6;
      row.alignChildren = ["left", "center"];
      row.alignment = ["fill", "center"];
      artboardRows.push(row);
  }
  
  // Now populate the grid with checkboxes
  for (var a = 0; a < doc.artboards.length; a++) {
      var artboard = doc.artboards[a];
      var artboardName = (a + 1) + ". " + artboard.name;
      
      // Determine which row this checkbox belongs to
      var rowIndex = Math.floor(a / artboardInputsPerRow);
      currentArtboardRow = artboardRows[rowIndex];
      
      // Create checkbox with fixed width for proper grid alignment
      var artboardCb = currentArtboardRow.add("checkbox", undefined, artboardName);
      artboardCb.artboardIndex = a;
      artboardCb.value = false; // No default selection
      artboardCb.preferredSize = [columnWidth, -1]; // Fixed width for column alignment
      artboardCb.alignment = ["left", "center"]; // Left align within fixed width
      artboardCheckboxes.push(artboardCb);
  }
  
  // Fill remaining slots in last row with empty space holders for proper grid alignment
  var lastRowIndex = artboardRows.length - 1;
  var itemsInLastRow = doc.artboards.length % artboardInputsPerRow;
  if (itemsInLastRow > 0 && itemsInLastRow < artboardInputsPerRow) {
      for (var fill = itemsInLastRow; fill < artboardInputsPerRow; fill++) {
          var spacer = artboardRows[lastRowIndex].add("statictext", undefined, "");
          spacer.preferredSize = [columnWidth, -1];
          spacer.alignment = ["left", "center"];
      }
  }
  
  // Select All / Deselect All buttons
  var artboardButtonRow = artboardPanel.add("group");
  artboardButtonRow.orientation = "row";
  artboardButtonRow.spacing = 8;
  artboardButtonRow.alignment = ["center", "center"];
  
  var selectAllBtn = artboardButtonRow.add("button", undefined, "Select All");
  selectAllBtn.preferredSize = [80, 24];
  var deselectAllBtn = artboardButtonRow.add("button", undefined, "Deselect All");
  deselectAllBtn.preferredSize = [80, 24];
  
  selectAllBtn.onClick = function() {
      for (var i = 0; i < artboardCheckboxes.length; i++) {
          artboardCheckboxes[i].value = true;
      }
  };
  
  deselectAllBtn.onClick = function() {
      for (var i = 0; i < artboardCheckboxes.length; i++) {
          artboardCheckboxes[i].value = false;
      }
  };
  
  // ============================================================================
  // TAB 2: WEIGHT AND SIZING
  // ============================================================================
  var tab2 = tabbedPanel.add("tab", undefined, "Weight and Sizing");
  tab2.orientation = "column";
  tab2.alignChildren = ["fill", "top"];
  tab2.spacing = 10;
  tab2.margins = 12;
  
  // Weights Section
  var weightsPanel = tab2.add("panel", undefined, "Weights");
  weightsPanel.orientation = "column";
  weightsPanel.alignChildren = ["fill", "top"];
  weightsPanel.spacing = 6;
  weightsPanel.margins = 10;
  
  var weightValues = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  var weightGrid = weightsPanel.add("group");
  weightGrid.orientation = "column";
  weightGrid.alignChildren = ["left", "top"];
  weightGrid.spacing = 4;
  
  // Create rows of 4 checkboxes each
  for (var row = 0; row < Math.ceil(weightValues.length / 4); row++) {
      var weightRow = weightGrid.add("group");
      weightRow.orientation = "row";
      weightRow.spacing = 8;
      for (var col = 0; col < 4; col++) {
          var idx = row * 4 + col;
          if (idx < weightValues.length) {
              var wv = weightValues[idx];
              var wcb = weightRow.add("checkbox", undefined, wv + " (" + WEIGHT_NAMES[wv] + ")");
              wcb.weightValue = wv;
              wcb.value = false; // No default selection
              weightCheckboxes.push(wcb);
          }
      }
  }
  
  // Weight Select All / Deselect All buttons
  var weightButtonRow = weightsPanel.add("group");
  weightButtonRow.orientation = "row";
  weightButtonRow.spacing = 8;
  weightButtonRow.alignment = ["center", "center"];
  
  var weightSelectAllBtn = weightButtonRow.add("button", undefined, "Select All");
  weightSelectAllBtn.preferredSize = [80, 24];
  var weightDeselectAllBtn = weightButtonRow.add("button", undefined, "Deselect All");
  weightDeselectAllBtn.preferredSize = [80, 24];
  
  weightSelectAllBtn.onClick = function() {
      for (var i = 0; i < weightCheckboxes.length; i++) {
          weightCheckboxes[i].value = true;
      }
  };
  
  weightDeselectAllBtn.onClick = function() {
      for (var i = 0; i < weightCheckboxes.length; i++) {
          weightCheckboxes[i].value = false;
      }
  };
  
  // Sizes Section
  var sizesPanel = tab2.add("panel", undefined, "Sizes");
  sizesPanel.orientation = "column";
  sizesPanel.alignChildren = ["fill", "top"];
  sizesPanel.spacing = 6;
  sizesPanel.margins = 10;
  
  // Size Select All / Deselect All buttons (at top)
  var sizeButtonRow = sizesPanel.add("group");
  sizeButtonRow.orientation = "row";
  sizeButtonRow.spacing = 8;
  sizeButtonRow.alignment = ["center", "center"];
  
  var sizeSelectAllBtn = sizeButtonRow.add("button", undefined, "Select All");
  sizeSelectAllBtn.preferredSize = [80, 24];
  var sizeDeselectAllBtn = sizeButtonRow.add("button", undefined, "Deselect All");
  sizeDeselectAllBtn.preferredSize = [80, 24];
  
  sizeSelectAllBtn.onClick = function() {
      for (var i = 0; i < sizeCheckboxes.length; i++) {
          sizeCheckboxes[i].value = true;
      }
  };
  
  sizeDeselectAllBtn.onClick = function() {
      for (var i = 0; i < sizeCheckboxes.length; i++) {
          sizeCheckboxes[i].value = false;
      }
  };
  
  // Size checkboxes in a grid layout
  var sizeGrid = sizesPanel.add("group");
  sizeGrid.orientation = "column";
  sizeGrid.alignChildren = ["left", "top"];
  sizeGrid.spacing = 4;
  
  // Create rows of 10 checkboxes each
  for (var row = 0; row < Math.ceil(AVAILABLE_SIZES.length / 10); row++) {
      var sizeRow = sizeGrid.add("group");
      sizeRow.orientation = "row";
      sizeRow.spacing = 8;
      for (var col = 0; col < 10; col++) {
          var idx = row * 10 + col;
          if (idx < AVAILABLE_SIZES.length) {
              var size = AVAILABLE_SIZES[idx];
              var sizeCb = sizeRow.add("checkbox", undefined, size + "px");
              sizeCb.sizeValue = size;
              sizeCb.value = false; // No default selection
              sizeCheckboxes.push(sizeCb);
          }
      }
  }
  
  // Custom Sizes Section
  var customSizesPanel = tab2.add("panel", undefined, "Custom Sizes");
  customSizesPanel.orientation = "column";
  customSizesPanel.alignChildren = ["fill", "top"];
  customSizesPanel.spacing = 6;
  customSizesPanel.margins = 10;
  
  // Container for custom size input rows (column that holds rows)
  customSizeContainer = customSizesPanel.add("group");
  customSizeContainer.orientation = "column";
  customSizeContainer.alignChildren = ["left", "top"];
  customSizeContainer.spacing = 4;
  customSizeContainer.alignment = ["fill", "top"];
  
  // Pre-create up to 10 inputs with wrapping (5 per row)
  var maxCustomInputs = 10;
  var inputsPerRow = 5;
  var customSizeRows = []; // Array of row groups
  var customSizeInputGroups = []; // Array of individual input groups (label + input)
  
  // Create first row
  var currentRow = customSizeContainer.add("group");
  currentRow.orientation = "row";
  currentRow.spacing = 6;
  currentRow.alignChildren = ["left", "center"];
  currentRow.alignment = ["fill", "center"];
  customSizeRows.push(currentRow);
  
  // Pre-create all input groups
  for (var preIdx = 0; preIdx < maxCustomInputs; preIdx++) {
      // Check if we need a new row (every 5 inputs)
      if (preIdx > 0 && preIdx % inputsPerRow === 0) {
          currentRow = customSizeContainer.add("group");
          currentRow.orientation = "row";
          currentRow.spacing = 6;
          currentRow.alignChildren = ["left", "center"];
          currentRow.alignment = ["fill", "center"];
          currentRow.visible = false; // Hide new rows initially
          customSizeRows.push(currentRow);
      }
      
      // Create input group (label + input)
      var inputGroup = currentRow.add("group");
      inputGroup.orientation = "row";
      inputGroup.spacing = 4;
      inputGroup.alignChildren = ["left", "center"];
      inputGroup.visible = (preIdx === 0); // Show first one only
      
      var label = inputGroup.add("statictext", undefined, "Size:");
      label.preferredSize = [35, 22];
      
      var sizeInput = inputGroup.add("edittext", undefined, "");
      sizeInput.characters = 6;
      sizeInput.alignment = ["left", "center"];
      sizeInput.preferredSize = [50, 22];
      
      customSizeInputs.push(sizeInput);
      customSizeInputGroups.push(inputGroup);
  }
  
  // Track how many are visible
  var visibleCustomInputs = 1;
  
  // Add button row
  var addButtonRow = customSizesPanel.add("group");
  addButtonRow.orientation = "row";
  addButtonRow.spacing = 8;
  addButtonRow.alignChildren = ["left", "center"];
  customSizeAddBtn = addButtonRow.add("button", undefined, "+ Add Another");
  customSizeAddBtn.preferredSize = [100, 22];
  customSizeAddBtn.enabled = (visibleCustomInputs < maxCustomInputs);
  
  // Add button handler - shows the next input field
  customSizeAddBtn.onClick = function() {
      if (visibleCustomInputs < maxCustomInputs) {
          // Show the next input group
          customSizeInputGroups[visibleCustomInputs].visible = true;
          
          // If this is the first item in a new row, show the row too
          if (visibleCustomInputs % inputsPerRow === 0) {
              var rowIndex = Math.floor(visibleCustomInputs / inputsPerRow);
              if (rowIndex < customSizeRows.length) {
                  customSizeRows[rowIndex].visible = true;
              }
          }
          
          visibleCustomInputs++;
          
          // Disable button if we've reached max
          if (visibleCustomInputs >= maxCustomInputs) {
              customSizeAddBtn.enabled = false;
          }
          
          // Focus the newly shown input
          try {
              customSizeInputs[visibleCustomInputs - 1].active = true;
          } catch (e) {
              // Focus may fail
          }
      }
  };
  
  // ============================================================================
  // TAB 3: ARTBOARD OPTIONS
  // ============================================================================
  var tab3 = tabbedPanel.add("tab", undefined, "Artboard Options");
  tab3.orientation = "column";
  tab3.alignChildren = ["fill", "top"];
  tab3.spacing = 10;
  tab3.margins = 12;
  
  // Scaling Options
  var scalingPanel = tab3.add("panel", undefined, "Scaling Options");
  scalingPanel.orientation = "column";
  scalingPanel.alignChildren = ["fill", "top"];
  scalingPanel.spacing = 6;
  scalingPanel.margins = 10;
  
  fillCb = scalingPanel.add("checkbox", undefined, "Scale to fill artboard");
  fillCb.value = false; // No default selection
  
  // Stroke Options
  var strokePanel = tab3.add("panel", undefined, "Stroke Options");
  strokePanel.orientation = "column";
  strokePanel.alignChildren = ["fill", "top"];
  strokePanel.spacing = 6;
  strokePanel.margins = 10;
  
  outsideStrokeCb = strokePanel.add("checkbox", undefined, "Is outline stroke");
  outsideStrokeCb.value = false;
  
  // Compound Path Options
  var compoundPanel = tab3.add("panel", undefined, "Compound Path Options");
  compoundPanel.orientation = "column";
  compoundPanel.alignChildren = ["fill", "top"];
  compoundPanel.spacing = 6;
  compoundPanel.margins = 10;
  
  shrinkInnerCb = compoundPanel.add("checkbox", undefined, "Shrink inner shapes for compound paths");
  shrinkInnerCb.value = false;
  
  var compoundInfoText = compoundPanel.add("statictext", undefined, "Inner Shape must be grouped for it effect to work", {multiline: true});
  compoundInfoText.preferredSize = [-1, 30];
  
  // ============================================================================
  // TAB 4: OUTPUT TYPE
  // ============================================================================
  var tab4 = tabbedPanel.add("tab", undefined, "Output Type");
  tab4.orientation = "column";
  tab4.alignChildren = ["fill", "top"];
  tab4.spacing = 10;
  tab4.margins = 12;
  
  // Output Selection
  var outputSelectionPanel = tab4.add("panel", undefined, "Output Selection");
  outputSelectionPanel.orientation = "column";
  outputSelectionPanel.alignChildren = ["fill", "top"];
  outputSelectionPanel.spacing = 6;
  outputSelectionPanel.margins = 10;
  
  artboardOutputCb = outputSelectionPanel.add("checkbox", undefined, "Generate Artboards");
  svgOutputCb = outputSelectionPanel.add("checkbox", undefined, "Export to SVG");
  
  // Artboard Generation Options (shown when Generate Artboards is checked)
  var artboardOptionsPanel = tab4.add("panel", undefined, "Artboard Generation Options");
  artboardOptionsPanel.orientation = "column";
  artboardOptionsPanel.alignChildren = ["fill", "top"];
  artboardOptionsPanel.spacing = 8;
  artboardOptionsPanel.margins = 10;
  artboardOptionsPanel.visible = false;
  
  var spacingRow = artboardOptionsPanel.add("group");
  spacingRow.orientation = "row";
  spacingRow.spacing = 8;
  spacingRow.alignChildren = ["left", "center"];
  spacingRow.add("statictext", undefined, "Spacing between artboards:");
  spacingInput = spacingRow.add("edittext", undefined, "20");
  spacingInput.characters = 6;
  spacingRow.add("statictext", undefined, "px");
  
  var layoutRow = artboardOptionsPanel.add("group");
  layoutRow.orientation = "row";
  layoutRow.spacing = 8;
  layoutRow.alignChildren = ["left", "center"];
  layoutRow.add("statictext", undefined, "Layout arrangement:");
  layoutDropdown = layoutRow.add("dropdownlist", undefined, ["Grid (Rows by Columns)", "Horizontal", "Vertical"]);
  layoutDropdown.selection = 0;
  layoutDropdown.preferredSize = [180, 22];
  
  var rowsRow = artboardOptionsPanel.add("group");
  rowsRow.orientation = "row";
  rowsRow.spacing = 8;
  rowsRow.alignChildren = ["left", "center"];
  rowsRow.visible = false; // Only visible for Grid layout
  rowsRow.add("statictext", undefined, "Rows:");
  rowsInput = rowsRow.add("edittext", undefined, "");
  rowsInput.characters = 6;
  
  var colsRow = artboardOptionsPanel.add("group");
  colsRow.orientation = "row";
  colsRow.spacing = 8;
  colsRow.alignChildren = ["left", "center"];
  colsRow.visible = false; // Only visible for Grid layout
  colsRow.add("statictext", undefined, "Columns:");
  colsInput = colsRow.add("edittext", undefined, "");
  colsInput.characters = 6;
  
  // SVG Export Options (shown when Export to SVG is checked)
  var svgOptionsPanel = tab4.add("panel", undefined, "SVG Export Options");
  svgOptionsPanel.orientation = "column";
  svgOptionsPanel.alignChildren = ["fill", "top"];
  svgOptionsPanel.spacing = 8;
  svgOptionsPanel.margins = 10;
  svgOptionsPanel.visible = false;
  
  var exportFolderRow = svgOptionsPanel.add("group");
  exportFolderRow.orientation = "row";
  exportFolderRow.spacing = 8;
  exportFolderRow.alignChildren = ["left", "center"];
  exportFolderRow.add("statictext", undefined, "Export folder path:");
  exportFolderInput = exportFolderRow.add("edittext", undefined, "~/Desktop/icons");
  exportFolderInput.characters = 30;
  exportFolderInput.alignment = ["fill", "center"];
  var browseBtn = exportFolderRow.add("button", undefined, "Browse...");
  browseBtn.preferredSize = [70, 22];
  
  var namingRow = svgOptionsPanel.add("group");
  namingRow.orientation = "row";
  namingRow.spacing = 8;
  namingRow.alignChildren = ["left", "center"];
  namingRow.add("statictext", undefined, "Naming pattern:");
  namingInput = namingRow.add("edittext", undefined, "{name}_{weight}_{size}");
  namingInput.characters = 30;
  namingInput.alignment = ["fill", "center"];
  
  var embedRasterRow = svgOptionsPanel.add("group");
  embedRasterRow.orientation = "row";
  embedRasterRow.spacing = 8;
  embedRasterRow.alignChildren = ["left", "center"];
  embedRasterCb = embedRasterRow.add("checkbox", undefined, "Embed raster images");
  embedRasterCb.value = false;
  
  var organizeFoldersRow = svgOptionsPanel.add("group");
  organizeFoldersRow.orientation = "row";
  organizeFoldersRow.spacing = 8;
  organizeFoldersRow.alignChildren = ["left", "center"];
  organizeByFoldersCb = organizeFoldersRow.add("checkbox", undefined, "Organize by folders (name/size)");
  organizeByFoldersCb.value = false;
  
  var cssLocationRow = svgOptionsPanel.add("group");
  cssLocationRow.orientation = "row";
  cssLocationRow.spacing = 8;
  cssLocationRow.alignChildren = ["left", "center"];
  cssLocationRow.add("statictext", undefined, "CSS properties location:");
  cssLocationDropdown = cssLocationRow.add("dropdownlist", undefined, ["Presentation Attributes", "Style Elements", "Entities"]);
  cssLocationDropdown.selection = 0;
  cssLocationDropdown.preferredSize = [180, 22];
  
  var fontSubsettingRow = svgOptionsPanel.add("group");
  fontSubsettingRow.orientation = "row";
  fontSubsettingRow.spacing = 8;
  fontSubsettingRow.alignChildren = ["left", "center"];
  fontSubsettingRow.add("statictext", undefined, "Font subsetting:");
  fontSubsettingDropdown = fontSubsettingRow.add("dropdownlist", undefined, ["None", "Glyphs Used", "Common English", "All Glyphs"]);
  fontSubsettingDropdown.selection = 0;
  fontSubsettingDropdown.preferredSize = [180, 22];
  
  var coordPrecisionRow = svgOptionsPanel.add("group");
  coordPrecisionRow.orientation = "row";
  coordPrecisionRow.spacing = 8;
  coordPrecisionRow.alignChildren = ["left", "center"];
  coordPrecisionRow.add("statictext", undefined, "Coordinate precision:");
  coordPrecisionInput = coordPrecisionRow.add("edittext", undefined, "2");
  coordPrecisionInput.characters = 3;
  
  // Event handlers for output type checkboxes
  function updateOutputPanels() {
      artboardOptionsPanel.visible = artboardOutputCb.value;
      svgOptionsPanel.visible = svgOutputCb.value;
      updateGenerateButton();
  }
  
  artboardOutputCb.onClick = function() {
      updateOutputPanels();
  };
  
  svgOutputCb.onClick = function() {
      updateOutputPanels();
  };
  
  // Layout dropdown handler
  layoutDropdown.onChange = function() {
      var isGrid = (this.selection && this.selection.index === 0);
      rowsRow.visible = isGrid;
      colsRow.visible = isGrid;
  };
  
  // Browse button handler
  browseBtn.onClick = function() {
      var folder = Folder.selectDialog("Select export folder");
      if (folder) {
          exportFolderInput.text = folder.fsName;
      }
  };
  
  // ============================================================================
  // BUTTONS (Outside tabs, at bottom of window)
  // ============================================================================
  var buttonGroup = win.add("group");
  buttonGroup.orientation = "row";
  buttonGroup.spacing = 8;
  buttonGroup.alignment = ["right", "center"];
  
  generateBtn = buttonGroup.add("button", undefined, "Generate");
  generateBtn.preferredSize = [80, 24];
  generateBtn.enabled = false;
  
  var cancelBtn = buttonGroup.add("button", undefined, "Cancel");
  cancelBtn.preferredSize = [80, 24];
  
  // Function to update Generate button state
  function updateGenerateButton() {
      var hasOutput = artboardOutputCb.value || svgOutputCb.value;
      generateBtn.enabled = hasOutput;
  }
  
  // Initial update
  updateGenerateButton();
  
  // ============================================================================
  // VALIDATION AND DATA COLLECTION
  // ============================================================================
  
  function getSelectedArtboards() {
      var selected = [];
      for (var i = 0; i < artboardCheckboxes.length; i++) {
          if (artboardCheckboxes[i].value) {
              selected.push(artboardCheckboxes[i].artboardIndex);
          }
      }
      return selected;
  }
  
  function getSelectedWeights() {
      var weights = [];
      for (var i = 0; i < weightCheckboxes.length; i++) {
          if (weightCheckboxes[i].value) {
              weights.push(weightCheckboxes[i].weightValue);
          }
      }
      return weights;
  }
  
  function getSelectedSizes() {
      var sizes = [];
      // Get sizes from checkboxes
      for (var i = 0; i < sizeCheckboxes.length; i++) {
          if (sizeCheckboxes[i].value) {
              sizes.push(sizeCheckboxes[i].sizeValue);
          }
      }
      // Get sizes from custom size inputs
      for (var j = 0; j < customSizeInputs.length; j++) {
          try {
              var inputText = customSizeInputs[j].text;
              if (inputText) {
                  var sizeValue = parseInt(String(inputText).replace(/^\s+|\s+$/g, ''), 10);
                  if (sizeValue > 0 && !isNaN(sizeValue)) {
                      sizes.push(sizeValue);
                  }
              }
          } catch (e) {
              // Skip invalid inputs
          }
      }
      // Deduplicate
      var uniqueSizes = [];
      var seen = {};
      for (var k = 0; k < sizes.length; k++) {
          var size = sizes[k];
          if (!seen[size]) {
              seen[size] = true;
              uniqueSizes.push(size);
          }
      }
      return uniqueSizes;
  }
  
  function validateInputs() {
      var selectedArtboards = getSelectedArtboards();
      if (selectedArtboards.length === 0) {
          alert("Please select at least one artboard.");
          return false;
      }
      
      var selectedWeights = getSelectedWeights();
      if (selectedWeights.length === 0) {
          alert("Please select at least one weight.");
          return false;
      }
      
      var selectedSizes = getSelectedSizes();
      if (selectedSizes.length === 0) {
          alert("Please select at least one size (from checkboxes or custom sizes).");
          return false;
      }
      
      if (!artboardOutputCb.value && !svgOutputCb.value) {
          alert("Please select at least one output type.");
          return false;
      }
      
      if (artboardOutputCb.value) {
          var spacingText = spacingInput.text;
          var spacing = (spacingText && !isNaN(parseFloat(spacingText))) ? parseFloat(spacingText) : NaN;
          if (isNaN(spacing) || spacing < 0) {
              alert("Please enter a valid spacing value (positive number).");
              return false;
          }
      }
      
      if (svgOutputCb.value) {
          var exportFolderText = exportFolderInput.text;
          // Safely convert to string and check if it's empty
          var exportFolderStr = (exportFolderText != null) ? String(exportFolderText) : "";
          if (!exportFolderStr || exportFolderStr.replace(/^\s+|\s+$/g, '') === '') {
              alert("Please enter an export folder path.");
              return false;
          }
      }
      
      return true;
  }
  
  // ============================================================================
  // GENERATE BUTTON HANDLER
  // ============================================================================
  generateBtn.onClick = function() {
      try {
          if (!validateInputs()) {
              return;
          }
          
          var selectedArtboards = getSelectedArtboards();
          var selectedWeights = getSelectedWeights();
          var selectedSizes = getSelectedSizes();
          
          // Sort sizes and weights
          selectedSizes.sort(function(a, b) { return a - b; });
          selectedWeights.sort(function(a, b) { return a - b; });
          
          var totalProcessed = 0;
          var errors = [];
          
          for (var ab = 0; ab < selectedArtboards.length; ab++) {
              var artboardIndex = selectedArtboards[ab];
              var artboard = doc.artboards[artboardIndex];
              var baseName = artboard.name.match(/^Artboard \d+$/) ? doc.name.replace(/\.[^.]+$/, '') : artboard.name;
              
              var options = {
                  name: baseName,
                  sizes: selectedSizes,
                  weights: selectedWeights,
                  sourceArtboardIndex: artboardIndex,
                  fillArtboard: fillCb.value,
                  padding: 0,
                  paddingIsPercent: false,
                  isOutsideStroke: outsideStrokeCb.value,
                  shrinkInnerShapes: shrinkInnerCb.value
              };
              
              if (artboardOutputCb.value) {
                  var spacingText = spacingInput.text;
                  options.spacing = (spacingText && !isNaN(parseFloat(spacingText))) ? parseFloat(spacingText) : 20;
                  options.layout = layoutDropdown.selection ? layoutDropdown.selection.index : 0;
                  var rowsText = rowsInput.text;
                  options.rows = (rowsText && typeof rowsText === 'string' && rowsText.trim()) ? parseInt(rowsText, 10) : null;
                  var colsText = colsInput.text;
                  options.columns = (colsText && typeof colsText === 'string' && colsText.trim()) ? parseInt(colsText, 10) : null;
                  
                  try {
                      generateArtboards(options);
                      totalProcessed += selectedSizes.length * selectedWeights.length;
                  } catch (e) {
                      errors.push("Artboard " + artboard.name + ": " + (e.message || e.toString()));
                  }
              }
              
              if (svgOutputCb.value) {
                  var exportFolderText = exportFolderInput.text;
                  // Safely convert to string and trim
                  var exportFolderStr = (exportFolderText != null) ? String(exportFolderText) : "";
                  options.exportFolder = exportFolderStr.replace(/^\s+|\s+$/g, '');
                  var namingText = namingInput.text;
                  // Safely convert to string and trim
                  var namingStr = (namingText != null) ? String(namingText) : "";
                  var namingTrimmed = namingStr.replace(/^\s+|\s+$/g, '');
                  options.namingPattern = namingTrimmed || "{name}_{weight}_{size}";
                  options.embedRasterImages = embedRasterCb.value;
                  options.organizeByFolders = organizeByFoldersCb.value;
                  options.cssProperties = cssLocationDropdown.selection ? cssLocationDropdown.selection.index : 0;
                  options.fontSubsetting = fontSubsettingDropdown.selection ? fontSubsettingDropdown.selection.index : 0;
                  var coordPrecisionText = coordPrecisionInput.text;
                  options.coordinatePrecision = (coordPrecisionText && !isNaN(parseInt(coordPrecisionText, 10))) ? parseInt(coordPrecisionText, 10) : 2;
                  
                  try {
                      var exportResult = exportToSVG(options);
                      if (exportResult) {
                          totalProcessed += exportResult.count;
                          if (exportResult.errors && exportResult.errors.length > 0) {
                              for (var errIdx = 0; errIdx < exportResult.errors.length; errIdx++) {
                                  errors.push(exportResult.errors[errIdx]);
                              }
                          }
                      } else {
                          totalProcessed += selectedSizes.length * selectedWeights.length;
                      }
                  } catch (e) {
                      errors.push("SVG Export " + artboard.name + ": " + (e.message || e.toString()));
                  }
              }
          }
          
          // Show single summary at the end
          if (totalProcessed > 0 || errors.length > 0) {
              var message = "Done!\n\n";
              if (totalProcessed > 0) {
                  message += "Processed " + totalProcessed + " variant" + (totalProcessed !== 1 ? "s" : "");
                  if (svgOutputCb.value && selectedArtboards.length > 0) {
                      // Get export folder from first artboard's result
                      try {
                          var firstExportFolderText = exportFolderInput.text;
                          var firstExportFolderStr = (firstExportFolderText != null) ? String(firstExportFolderText) : "";
                          var firstExportFolder = firstExportFolderStr.replace(/^\s+|\s+$/g, '');
                          if (firstExportFolder.indexOf('~') === 0) {
                              firstExportFolder = Folder.userData.parent.fsName + firstExportFolder.substring(1);
                          }
                          message += "\n\nExported to:\n" + firstExportFolder;
                      } catch (e) {
                          // Skip if we can't get folder path
                      }
                  }
              }
              if (errors.length > 0) {
                  message += "\n\nErrors (" + errors.length + "):\n" + errors.slice(0, 5).join("\n");
                  if (errors.length > 5) {
                      message += "\n... and " + (errors.length - 5) + " more";
                  }
              }
              alert(message);
          }
          
          win.close(1);
      } catch (e) {
          alert("Error: " + (e.message || e.toString()) + "\n\nLine: " + (e.line || "unknown"));
      }
  };
  
  cancelBtn.onClick = function() {
      win.close(0);
  };
  
  // Set initial tab selection
  tabbedPanel.selection = tab1;
  
  // Force layout update before showing
  if (win.layout) {
      win.layout.layout();
  }
  
  // Center and show the window
  win.center();
  var result = win.show();
}

// ============================================================================
// ARTBOARD GENERATION
// ============================================================================

function generateArtboards(options) {
  var doc = app.activeDocument;
  var sourceIndex = options.sourceArtboardIndex || 0;
  
  var sourceArtboard = doc.artboards[sourceIndex];
  var sourceRect = sourceArtboard.artboardRect;
  var sourceLeft = sourceRect[0];
  var sourceTop = sourceRect[1];
  var sourceRight = sourceRect[2];
  var sourceBottom = sourceRect[3];
  var sourceWidth = sourceRight - sourceLeft;
  var sourceHeight = sourceTop - sourceBottom;
  
  doc.artboards.setActiveArtboardIndex(sourceIndex);
  doc.selectObjectsOnActiveArtboard();
  
  var sourceItems = doc.selection;
  
  if (sourceItems.length === 0) {
      alert('No items found on artboard "' + sourceArtboard.name + '".\n\nMake sure your icon paths are on this artboard.');
      return;
  }
  
  // Group source items for duplication
  var sourceGroup = doc.groupItems.add();
  for (var i = sourceItems.length - 1; i >= 0; i--) {
      sourceItems[i].move(sourceGroup, ElementPlacement.PLACEATBEGINNING);
  }
  
  var sourceGroupBounds = sourceGroup.geometricBounds;
  var sourceIconWidth = sourceGroupBounds[2] - sourceGroupBounds[0];
  var sourceIconHeight = sourceGroupBounds[1] - sourceGroupBounds[3];
  
  // Get original stroke width for compound shape scaling
  var originalStrokeWidth = getOriginalStrokeWidth(sourceGroup);
  if (!originalStrokeWidth || originalStrokeWidth <= 0) {
      originalStrokeWidth = STROKE_WIDTHS[400] || 3.91;
  }
  
  var spacing = options.spacing || 20;
  var count = 0;
  
  // Find the lowest point of all existing artboards
  var lowestY = sourceBottom;
  for (var ab = 0; ab < doc.artboards.length; ab++) {
      var abRect = doc.artboards[ab].artboardRect;
      var abBottom = abRect[3];
      if (abBottom < lowestY) {
          lowestY = abBottom;
      }
  }
  
  var currentX = sourceLeft;
  var currentY = lowestY - spacing;
  
  // Grid layout: sizes as rows, weights as columns
  for (var s = 0; s < options.sizes.length; s++) {
      var size = options.sizes[s];
      currentY -= size;
      currentX = sourceLeft;
      
      for (var w = 0; w < options.weights.length; w++) {
          var weight = options.weights[w];
          var scaleFactor;
          var strokeWidth;
          
          if (options.fillArtboard) {
              var paddingPx = options.paddingIsPercent 
                  ? (size * options.padding / 100) 
                  : (options.padding / 32) * size;
              
              var baseStroke = STROKE_WIDTHS[weight] || STROKE_WIDTHS[400];
              strokeWidth = (baseStroke / 32) * size;
              
              var strokeAdjustment = options.isOutsideStroke ? strokeWidth * 2 : strokeWidth;
              var availableSize = size - (paddingPx * 2) - strokeAdjustment;
              var scaleToFitWidth = availableSize / sourceIconWidth;
              var scaleToFitHeight = availableSize / sourceIconHeight;
              scaleFactor = Math.min(scaleToFitWidth, scaleToFitHeight);
              
              if (scaleFactor <= 0) scaleFactor = 0.1;
          } else {
              // For outline strokes, even when not filling artboard, we need to account for stroke extending outside
              if (options.isOutsideStroke) {
                  var baseStroke = STROKE_WIDTHS[weight] || STROKE_WIDTHS[400];
                  strokeWidth = (baseStroke / 32) * size;
                  // Scale down to account for stroke extending outside (strokeWidth * 2 on both sides)
                  var strokeAdjustment = strokeWidth * 2;
                  var availableSize = size - strokeAdjustment;
                  // Use sourceIconWidth and sourceIconHeight (icon bounds) and take minimum for consistency
                  var scaleToFitWidth = availableSize / sourceIconWidth;
                  var scaleToFitHeight = availableSize / sourceIconHeight;
                  scaleFactor = Math.min(scaleToFitWidth, scaleToFitHeight);
                  // strokeWidth already calculated above, don't recalculate
              } else {
                  scaleFactor = size / sourceWidth;
                  strokeWidth = calculateStroke(weight, size);
              }
          }
          
          var artboardTop = currentY + size;
          var artboardBottom = currentY;
          var artboardRect = [currentX, artboardTop, currentX + size, artboardBottom];
          
          var newArtboard = doc.artboards.add(artboardRect);
          newArtboard.name = options.name + '_' + weight + '_' + size + 'x' + size;
          
          var newGroup = sourceGroup.duplicate();
          newGroup.resize(
              scaleFactor * 100, scaleFactor * 100,
              true, true, true, true,
              scaleFactor * 100,
              Transformation.CENTER
          );
          
          var groupBounds = newGroup.geometricBounds;
          var groupWidth = groupBounds[2] - groupBounds[0];
          var groupHeight = groupBounds[1] - groupBounds[3];
          
          var artboardCenterX = currentX + (size / 2);
          var artboardCenterY = currentY + (size / 2);
          
          var newLeft = artboardCenterX - (groupWidth / 2);
          var newTop = artboardCenterY + (groupHeight / 2);
          
          newGroup.position = [newLeft, newTop];
          applyStrokeWidth(newGroup, strokeWidth);
          
          // Scale inner elements for compound shapes if enabled
          if (options.shrinkInnerShapes && originalStrokeWidth > 0 && strokeWidth > 0) {
              var originalStrokeScaled = originalStrokeWidth * (size / sourceWidth);
              var strokeIncrease = strokeWidth - originalStrokeScaled;
              if (strokeIncrease > 0.001) {
                  var outerSize = getLargestElementSize(newGroup);
                  var strokeIncreasePerSide = strokeIncrease / 2;
                  var innerScaleFactor;
                  // Multiply reduction ratio by 1.3 to shrink inner elements more aggressively
                  var shrinkMultiplier = 1.3;
                  if (outerSize > 0) {
                      var reductionRatio = (strokeIncreasePerSide / outerSize) * shrinkMultiplier;
                      innerScaleFactor = Math.max(0.5, 1 - reductionRatio);
                  } else {
                      var reductionRatio = (strokeIncrease / size) * shrinkMultiplier;
                      innerScaleFactor = Math.max(0.5, 1 - reductionRatio);
                  }
                  
                  scaleInnerElements(newGroup, innerScaleFactor, true, outerSize);
                  var updatedBounds = newGroup.geometricBounds;
                  var updatedWidth = updatedBounds[2] - updatedBounds[0];
                  var updatedHeight = updatedBounds[1] - updatedBounds[3];
                  var updatedLeft = artboardCenterX - (updatedWidth / 2);
                  var updatedTop = artboardCenterY + (updatedHeight / 2);
                  newGroup.position = [updatedLeft, updatedTop];
              }
          }
          
          currentX += size + spacing;
          count++;
      }
      
      currentY -= spacing;
  }
  
  // Restore original items
  while (sourceGroup.pageItems.length > 0) {
      sourceGroup.pageItems[0].move(doc, ElementPlacement.PLACEATEND);
  }
  sourceGroup.remove();
  
  doc.selection = null;
}

// ============================================================================
// SVG EXPORT
// ============================================================================

function exportToSVG(options) {
  var doc = app.activeDocument;
  var sourceIndex = options.sourceArtboardIndex || 0;
  
  var sourceArtboard = doc.artboards[sourceIndex];
  var sourceRect = sourceArtboard.artboardRect;
  var sourceWidth = sourceRect[2] - sourceRect[0];
  var sourceHeight = sourceRect[1] - sourceRect[3];
  
  doc.artboards.setActiveArtboardIndex(sourceIndex);
  doc.selectObjectsOnActiveArtboard();
  
  var sourceItems = doc.selection;
  
  if (sourceItems.length === 0) {
      alert('No items found on artboard "' + sourceArtboard.name + '".');
      return;
  }
  
  // Create or verify export folder
  var exportPath = options.exportFolder;
  if (exportPath.indexOf('~') === 0) {
      exportPath = Folder.userData.parent.fsName + exportPath.substring(1);
  }
  
  var exportFolder = new Folder(exportPath);
  if (!exportFolder.exists) {
      var created = exportFolder.create();
      if (!created) {
          alert('Could not create export folder:\n' + exportPath);
          return;
      }
  }
  
  // Group source items for duplication
  var sourceGroup = doc.groupItems.add();
  for (var i = sourceItems.length - 1; i >= 0; i--) {
      sourceItems[i].move(sourceGroup, ElementPlacement.PLACEATBEGINNING);
  }
  
  var sourceGroupBounds = sourceGroup.geometricBounds;
  var sourceIconWidth = sourceGroupBounds[2] - sourceGroupBounds[0];
  var sourceIconHeight = sourceGroupBounds[1] - sourceGroupBounds[3];
  
  // Get original stroke width for compound shape scaling
  var originalStrokeWidth = getOriginalStrokeWidth(sourceGroup);
  if (!originalStrokeWidth || originalStrokeWidth <= 0) {
      originalStrokeWidth = STROKE_WIDTHS[400] || 3.91;
  }
  
  var count = 0;
  var errors = [];
  
  // Create a temporary document for each export
  for (var s = 0; s < options.sizes.length; s++) {
      var size = options.sizes[s];
      
      for (var w = 0; w < options.weights.length; w++) {
          var weight = options.weights[w];
          var scaleFactor;
          var strokeWidth;
          
          if (options.fillArtboard) {
              var paddingPx = options.paddingIsPercent 
                  ? (size * options.padding / 100) 
                  : (options.padding / 32) * size;
              
              var baseStroke = STROKE_WIDTHS[weight] || STROKE_WIDTHS[400];
              strokeWidth = (baseStroke / 32) * size;
              
              var strokeAdjustment = options.isOutsideStroke ? strokeWidth * 2 : strokeWidth;
              var availableSize = size - (paddingPx * 2) - strokeAdjustment;
              var scaleToFitWidth = availableSize / sourceIconWidth;
              var scaleToFitHeight = availableSize / sourceIconHeight;
              scaleFactor = Math.min(scaleToFitWidth, scaleToFitHeight);
              
              if (scaleFactor <= 0) scaleFactor = 0.1;
          } else {
              // For outline strokes, even when not filling artboard, we need to account for stroke extending outside
              if (options.isOutsideStroke) {
                  var baseStroke = STROKE_WIDTHS[weight] || STROKE_WIDTHS[400];
                  strokeWidth = (baseStroke / 32) * size;
                  // Scale down to account for stroke extending outside (strokeWidth * 2 on both sides)
                  var strokeAdjustment = strokeWidth * 2;
                  var availableSize = size - strokeAdjustment;
                  // Use sourceIconWidth and sourceIconHeight (icon bounds) and take minimum for consistency
                  var scaleToFitWidth = availableSize / sourceIconWidth;
                  var scaleToFitHeight = availableSize / sourceIconHeight;
                  scaleFactor = Math.min(scaleToFitWidth, scaleToFitHeight);
                  
                  if (scaleFactor <= 0) scaleFactor = 0.1;
              } else {
                  scaleFactor = size / sourceWidth;
                  strokeWidth = calculateStroke(weight, size);
              }
          }
          
          // Create temporary document
          var tempDoc = app.documents.add(DocumentColorSpace.RGB, size, size);
          
          // Unlock all layers in temp doc
          for (var li = 0; li < tempDoc.layers.length; li++) {
              tempDoc.layers[li].locked = false;
          }
          
          // Copy and paste the icon
          var tempGroup = sourceGroup.duplicate(tempDoc.layers[0], ElementPlacement.PLACEATEND);
          
          // Unlock the duplicated items
          unlockItems(tempGroup);
          
          // Scale it
          tempGroup.resize(
              scaleFactor * 100, scaleFactor * 100,
              true, true, true, true,
              scaleFactor * 100,
              Transformation.CENTER
          );
          
          // Center it
          var groupBounds = tempGroup.geometricBounds;
          var groupWidth = groupBounds[2] - groupBounds[0];
          var groupHeight = groupBounds[1] - groupBounds[3];
          
          var centerX = size / 2;
          var centerY = size / 2;
          
          var newLeft = centerX - (groupWidth / 2);
          var newTop = centerY + (groupHeight / 2);
          
          tempGroup.position = [newLeft, newTop];
          
          // Apply stroke width
          applyStrokeWidth(tempGroup, strokeWidth);
          
          // Scale inner elements for compound shapes if enabled
          if (options.shrinkInnerShapes && originalStrokeWidth > 0 && strokeWidth > 0) {
              var originalStrokeScaled = originalStrokeWidth * (size / sourceWidth);
              var strokeIncrease = strokeWidth - originalStrokeScaled;
              if (strokeIncrease > 0.001) {
                  var outerSize = getLargestElementSize(tempGroup);
                  var strokeIncreasePerSide = strokeIncrease / 2;
                  var innerScaleFactor;
                  // Multiply reduction ratio by 1.3 to shrink inner elements more aggressively
                  var shrinkMultiplier = 1.3;
                  if (outerSize > 0) {
                      var reductionRatio = (strokeIncreasePerSide / outerSize) * shrinkMultiplier;
                      innerScaleFactor = Math.max(0.5, 1 - reductionRatio);
                  } else {
                      var reductionRatio = (strokeIncrease / size) * shrinkMultiplier;
                      innerScaleFactor = Math.max(0.5, 1 - reductionRatio);
                  }
                  
                  scaleInnerElements(tempGroup, innerScaleFactor, true, outerSize);
                  var updatedBounds = tempGroup.geometricBounds;
                  var updatedWidth = updatedBounds[2] - updatedBounds[0];
                  var updatedHeight = updatedBounds[1] - updatedBounds[3];
                  var updatedLeft = centerX - (updatedWidth / 2);
                  var updatedTop = centerY + (updatedHeight / 2);
                  tempGroup.position = [updatedLeft, updatedTop];
              }
          }
          
          // Generate filename based on pattern
          // Replace all occurrences of each placeholder
          var sizeStr = size + 'x' + size;
          var fileName = options.namingPattern;
          // Use regex with global flag to replace all occurrences
          fileName = fileName.replace(/\{name\}/g, options.name);
          fileName = fileName.replace(/\{weight\}/g, weight);
          fileName = fileName.replace(/\{size\}/g, sizeStr);
          
          // Build file path
          var filePath = exportFolder.fsName;
          
          // If organize by folders is enabled, create name/size folder structure
          if (options.organizeByFolders) {
              // Create folder structure: exportFolder/name/size/
              filePath += '/' + options.name;
              var nameFolder = new Folder(filePath);
              if (!nameFolder.exists) {
                  nameFolder.create();
              }
              
              filePath += '/' + (size + 'x' + size);
              var sizeFolder = new Folder(filePath);
              if (!sizeFolder.exists) {
                  sizeFolder.create();
              }
          } else {
              // Handle folder-based naming from pattern (create subdirectories if pattern contains /)
              var fileNameParts = fileName.split('/');
              if (fileNameParts.length > 1) {
                  for (var p = 0; p < fileNameParts.length - 1; p++) {
                      filePath += '/' + fileNameParts[p];
                      var subFolder = new Folder(filePath);
                      if (!subFolder.exists) {
                          subFolder.create();
                      }
                  }
                  fileName = fileNameParts[fileNameParts.length - 1];
              }
          }
          
          var svgFile = new File(filePath + '/' + fileName + '.svg');
          
          // SVG export options
          var svgOptions = new ExportOptionsSVG();
          svgOptions.embedRasterImages = options.embedRasterImages || false;
          
          // Map CSS properties location
          try {
              var cssIndex = options.cssProperties || 0;
              if (cssIndex === 0) {
                  svgOptions.cssProperties = SVGCSSPropertyLocation.PRESENTATIONATTRIBUTES;
              } else if (cssIndex === 1) {
                  svgOptions.cssProperties = SVGCSSPropertyLocation.STYLEELEMENTS;
              } else if (cssIndex === 2) {
                  svgOptions.cssProperties = SVGCSSPropertyLocation.ENTITIES;
              } else {
                  svgOptions.cssProperties = SVGCSSPropertyLocation.PRESENTATIONATTRIBUTES;
              }
          } catch (e) {
              svgOptions.cssProperties = SVGCSSPropertyLocation.PRESENTATIONATTRIBUTES;
          }
          
          // Map font subsetting (using numeric values for compatibility)
          try {
              var fontIndex = options.fontSubsetting || 0;
              if (fontIndex === 0) {
                  svgOptions.fontSubsetting = SVGFontSubsetting.None;
              } else if (fontIndex === 1) {
                  svgOptions.fontSubsetting = SVGFontSubsetting.GLYPHSUSED;
              } else if (fontIndex === 2) {
                  svgOptions.fontSubsetting = SVGFontSubsetting.COMMONENGLISH;
              } else if (fontIndex === 3) {
                  svgOptions.fontSubsetting = SVGFontSubsetting.ALLGLYPHS;
              } else {
                  svgOptions.fontSubsetting = SVGFontSubsetting.None;
              }
          } catch (e) {
              svgOptions.fontSubsetting = SVGFontSubsetting.None;
          }
          
          svgOptions.documentEncoding = SVGDocumentEncoding.UTF8;
          svgOptions.coordinatePrecision = options.coordinatePrecision || 2;
          
          try {
              tempDoc.exportFile(svgFile, ExportType.SVG, svgOptions);
              count++;
          } catch (e) {
              errors.push(fileName + ': ' + e.message);
          }
          
          // Close temp document without saving
          tempDoc.close(SaveOptions.DONOTSAVECHANGES);
      }
  }
  
  // Restore original items
  while (sourceGroup.pageItems.length > 0) {
      sourceGroup.pageItems[0].move(doc, ElementPlacement.PLACEATEND);
  }
  sourceGroup.remove();
  
  doc.selection = null;
  
  // Return results instead of showing alert (caller will show summary)
  return {
      count: count,
      errors: errors,
      exportFolder: exportFolder.fsName
  };
}

// Run the script
showDialog();

} // End of Illustrator check
