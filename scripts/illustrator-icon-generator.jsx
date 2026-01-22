/**
 * Icon Variant Generator for Adobe Illustrator
 * 
 * Creates stroke-based icon variants at multiple sizes and weights.
 * Stroke widths are calibrated to match Geologica font weights.
 * 
 * Usage:
 * 1. Open your icon in Illustrator (stroke-based paths)
 * 2. File > Scripts > Other Script... > select this file
 * 3. Configure options and click Generate
 */

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

var PRESET_WEIGHTS = {
    'Regular Only': [400],
    'Regular + Bold': [400, 700],
    'Light to Bold': [300, 400, 500, 700],
    'All Weights': [100, 200, 300, 400, 500, 600, 700, 800, 900]
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function calculateStroke(weight, size) {
    var baseStroke = STROKE_WIDTHS[weight] || STROKE_WIDTHS[400];
    return (baseStroke / 32) * size;
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
    
    // ---- Main Dialog ----
    var dialog = new Window('dialog', 'Icon Variant Generator');
    dialog.orientation = 'column';
    dialog.alignChildren = ['fill', 'top'];
    dialog.margins = 16;
    dialog.spacing = 12;
    
    // ---- Source Row (compact) ----
    var sourceRow = dialog.add('group');
    sourceRow.spacing = 16;
    
    sourceRow.add('statictext', undefined, 'Artboard:');
    var artboardDropdown = sourceRow.add('dropdownlist');
    artboardDropdown.preferredSize = [160, 24];
    
    for (var a = 0; a < doc.artboards.length; a++) {
        artboardDropdown.add('item', (a + 1) + '. ' + doc.artboards[a].name);
    }
    artboardDropdown.selection = 0;
    
    sourceRow.add('statictext', undefined, 'Name:');
    var nameInput = sourceRow.add('edittext', undefined, doc.name.replace(/\.[^.]+$/, ''));
    nameInput.preferredSize = [160, 24];
    
    artboardDropdown.onChange = function() {
        if (artboardDropdown.selection) {
            var name = doc.artboards[artboardDropdown.selection.index].name;
            if (name && !name.match(/^Artboard \d+$/)) {
                nameInput.text = name;
            }
        }
    };
    
    // ---- Main Options (Two Columns) ----
    var mainRow = dialog.add('group');
    mainRow.alignChildren = ['fill', 'top'];
    mainRow.spacing = 12;
    
    // ---- Left Column: Sizes ----
    var sizesPanel = mainRow.add('panel', undefined, 'Sizes (px)');
    sizesPanel.alignChildren = ['fill', 'top'];
    sizesPanel.margins = [10, 14, 10, 10];
    sizesPanel.spacing = 8;
    
    // Size presets
    var sizePresetGroup = sizesPanel.add('group');
    sizePresetGroup.spacing = 6;
    sizePresetGroup.add('statictext', undefined, 'Preset:');
    var sizePresetDropdown = sizePresetGroup.add('dropdownlist');
    sizePresetDropdown.preferredSize = [120, 22];
    sizePresetDropdown.add('item', '- Select -');
    for (var presetName in PRESET_SIZES) {
        sizePresetDropdown.add('item', presetName);
    }
    sizePresetDropdown.selection = 0;
    
    // Size checkboxes in a grid
    var sizeCheckboxes = [];
    var allSizes = [12, 14, 16, 18, 20, 24, 32, 40, 48, 64, 96, 128];
    
    var sizeGrid = sizesPanel.add('group');
    sizeGrid.orientation = 'column';
    sizeGrid.alignChildren = ['left', 'top'];
    sizeGrid.spacing = 2;
    
    for (var row = 0; row < 3; row++) {
        var sizeRow = sizeGrid.add('group');
        sizeRow.spacing = 4;
        for (var col = 0; col < 4; col++) {
            var idx = row * 4 + col;
            if (idx < allSizes.length) {
                var size = allSizes[idx];
                var cb = sizeRow.add('checkbox', undefined, size + '');
                cb.preferredSize = [48, 18];
                cb.sizeValue = size;
                cb.value = (size === 24 || size === 32 || size === 48);
                sizeCheckboxes.push(cb);
            }
        }
    }
    
    // Custom size
    var customSizeRow = sizesPanel.add('group');
    customSizeRow.spacing = 6;
    var customSizeCb = customSizeRow.add('checkbox', undefined, 'Custom:');
    var customSizeInput = customSizeRow.add('edittext', undefined, '');
    customSizeInput.preferredSize = [60, 22];
    customSizeRow.add('statictext', undefined, 'px');
    
    // Size quick buttons
    var sizeButtonRow = sizesPanel.add('group');
    sizeButtonRow.spacing = 6;
    var sizeAllBtn = sizeButtonRow.add('button', undefined, 'All');
    var sizeNoneBtn = sizeButtonRow.add('button', undefined, 'None');
    sizeAllBtn.preferredSize = [55, 22];
    sizeNoneBtn.preferredSize = [55, 22];
    
    // ---- Right Column: Weights (two columns) ----
    var weightsPanel = mainRow.add('panel', undefined, 'Weights');
    weightsPanel.alignChildren = ['fill', 'top'];
    weightsPanel.margins = [10, 14, 10, 10];
    weightsPanel.spacing = 8;
    
    // Weight presets
    var weightPresetGroup = weightsPanel.add('group');
    weightPresetGroup.spacing = 6;
    weightPresetGroup.add('statictext', undefined, 'Preset:');
    var weightPresetDropdown = weightPresetGroup.add('dropdownlist');
    weightPresetDropdown.preferredSize = [130, 22];
    weightPresetDropdown.add('item', '- Select -');
    for (var wPresetName in PRESET_WEIGHTS) {
        weightPresetDropdown.add('item', wPresetName);
    }
    weightPresetDropdown.selection = 0;
    
    // Weight checkboxes - two columns
    var weightCheckboxes = [];
    var weightValues = [100, 200, 300, 400, 500, 600, 700, 800, 900];
    
    var weightGrid = weightsPanel.add('group');
    weightGrid.spacing = 8;
    
    var weightCol1 = weightGrid.add('group');
    weightCol1.orientation = 'column';
    weightCol1.alignChildren = ['left', 'top'];
    weightCol1.spacing = 2;
    
    var weightCol2 = weightGrid.add('group');
    weightCol2.orientation = 'column';
    weightCol2.alignChildren = ['left', 'top'];
    weightCol2.spacing = 2;
    
    for (var wi = 0; wi < weightValues.length; wi++) {
        var wv = weightValues[wi];
        var targetCol = wi < 5 ? weightCol1 : weightCol2;
        var wcb = targetCol.add('checkbox', undefined, wv + ' ' + WEIGHT_NAMES[wv]);
        wcb.preferredSize = [100, 18];
        wcb.weightValue = wv;
        wcb.value = (wv === 400);
        weightCheckboxes.push(wcb);
    }
    
    // Weight quick buttons
    var weightButtonRow = weightsPanel.add('group');
    weightButtonRow.spacing = 6;
    var weightAllBtn = weightButtonRow.add('button', undefined, 'All');
    var weightNoneBtn = weightButtonRow.add('button', undefined, 'None');
    weightAllBtn.preferredSize = [55, 22];
    weightNoneBtn.preferredSize = [55, 22];
    
    // ---- Output & Options Row ----
    var outputOptionsRow = dialog.add('group');
    outputOptionsRow.alignChildren = ['fill', 'top'];
    outputOptionsRow.spacing = 12;
    
    // ---- Output Panel ----
    var outputPanel = outputOptionsRow.add('panel', undefined, 'Output');
    outputPanel.alignChildren = ['left', 'top'];
    outputPanel.margins = [10, 14, 10, 10];
    outputPanel.spacing = 8;
    
    // Output mode selection
    var outputModeRow = outputPanel.add('group');
    outputModeRow.spacing = 12;
    
    var artboardRadio = outputModeRow.add('radiobutton', undefined, 'Artboards');
    artboardRadio.value = true;
    var exportRadio = outputModeRow.add('radiobutton', undefined, 'Export SVG');
    
    // Export folder (only shown when export is selected)
    var exportFolderRow = outputPanel.add('group');
    exportFolderRow.spacing = 6;
    exportFolderRow.add('statictext', undefined, 'Folder:');
    var exportFolderInput = exportFolderRow.add('edittext', undefined, '~/Desktop/icons');
    exportFolderInput.preferredSize = [140, 22];
    var browseFolderBtn = exportFolderRow.add('button', undefined, '...');
    browseFolderBtn.preferredSize = [30, 22];
    
    // Naming convention for export
    var namingRow = outputPanel.add('group');
    namingRow.spacing = 6;
    namingRow.add('statictext', undefined, 'Naming:');
    var namingDropdown = namingRow.add('dropdownlist');
    namingDropdown.add('item', '{name}_{weight}_{size}');
    namingDropdown.add('item', '{name}-{weight}-{size}');
    namingDropdown.add('item', '{name}/{weight}/{size}');
    namingDropdown.selection = 0;
    namingDropdown.preferredSize = [140, 22];
    
    // Initially hide export options
    exportFolderRow.visible = false;
    namingRow.visible = false;
    
    // Toggle export options visibility
    artboardRadio.onClick = function() {
        exportRadio.value = false;
        exportFolderRow.visible = false;
        namingRow.visible = false;
        spacingGroup.visible = true;
        updatePreview();
    };
    
    exportRadio.onClick = function() {
        artboardRadio.value = false;
        exportFolderRow.visible = true;
        namingRow.visible = true;
        spacingGroup.visible = false;
        updatePreview();
    };
    
    browseFolderBtn.onClick = function() {
        var folder = Folder.selectDialog('Select export folder');
        if (folder) {
            exportFolderInput.text = folder.fsName;
        }
    };
    
    // ---- Options Panel ----
    var optionsPanel = outputOptionsRow.add('panel', undefined, 'Options');
    optionsPanel.alignChildren = ['left', 'top'];
    optionsPanel.margins = [10, 14, 10, 10];
    optionsPanel.spacing = 8;
    
    var fillCb = optionsPanel.add('checkbox', undefined, 'Scale to fill');
    fillCb.value = true;
    
    var outsideStrokeCb = optionsPanel.add('checkbox', undefined, 'Is outside stroke');
    outsideStrokeCb.value = false;
    
    var shrinkInnerCb = optionsPanel.add('checkbox', undefined, 'Shrink inner shapes for compound paths');
    shrinkInnerCb.value = false;
    
    var spacingGroup = optionsPanel.add('group');
    spacingGroup.spacing = 6;
    spacingGroup.add('statictext', undefined, 'Spacing:');
    var spacingInput = spacingGroup.add('edittext', undefined, '20');
    spacingInput.preferredSize = [40, 22];
    spacingGroup.add('statictext', undefined, 'px');
    
    var paddingGroup = optionsPanel.add('group');
    paddingGroup.spacing = 6;
    paddingGroup.add('statictext', undefined, 'Padding:');
    var paddingInput = paddingGroup.add('edittext', undefined, '0');
    paddingInput.preferredSize = [40, 22];
    
    var paddingUnitDropdown = paddingGroup.add('dropdownlist');
    paddingUnitDropdown.add('item', 'px@32');
    paddingUnitDropdown.add('item', '%');
    paddingUnitDropdown.selection = 0;
    paddingUnitDropdown.preferredSize = [60, 22];
    
    // ---- Summary & Buttons Row ----
    var bottomRow = dialog.add('group');
    bottomRow.alignment = ['fill', 'top'];
    bottomRow.spacing = 12;
    bottomRow.margins = [0, 8, 0, 0];
    
    var previewText = bottomRow.add('statictext', undefined, 'Select sizes and weights', {multiline: true});
    previewText.preferredSize = [300, 32];
    previewText.alignment = ['left', 'center'];
    
    // Spacer
    var spacer = bottomRow.add('group');
    spacer.alignment = ['fill', 'center'];
    
    var cancelBtn = bottomRow.add('button', undefined, 'Cancel', {name: 'cancel'});
    cancelBtn.preferredSize = [80, 28];
    var generateBtn = bottomRow.add('button', undefined, 'Generate', {name: 'ok'});
    generateBtn.preferredSize = [100, 28];
    
    // ============================================================================
    // EVENT HANDLERS
    // ============================================================================
    
    function updatePreview() {
        var selectedSizes = getSelectedSizes();
        var selectedWeights = getSelectedWeights();
        var total = selectedSizes.length * selectedWeights.length;
        var isExport = exportRadio.value;
        
        if (total === 0) {
            previewText.text = 'Select at least one size and one weight';
        } else {
            var sizeText = selectedSizes.length + ' size' + (selectedSizes.length !== 1 ? 's' : '');
            var weightText = selectedWeights.length + ' weight' + (selectedWeights.length !== 1 ? 's' : '');
            var actionText = isExport ? 'export' : 'create';
            var targetText = isExport ? 'SVG file' : 'artboard';
            previewText.text = 'Will ' + actionText + ' ' + total + ' ' + targetText + (total !== 1 ? 's' : '') + 
                ' (' + sizeText + ' × ' + weightText + ')\n' +
                'Sizes: ' + selectedSizes.join(', ') + 'px  |  Weights: ' + selectedWeights.join(', ');
        }
    }
    
    function getSelectedSizes() {
        var sizes = [];
        for (var i = 0; i < sizeCheckboxes.length; i++) {
            if (sizeCheckboxes[i].value) {
                sizes.push(sizeCheckboxes[i].sizeValue);
            }
        }
        if (customSizeCb.value && customSizeInput.text) {
            var customSizes = customSizeInput.text.split(/[,\s]+/);
            for (var j = 0; j < customSizes.length; j++) {
                var cs = parseInt(customSizes[j], 10);
                if (cs > 0) sizes.push(cs);
            }
        }
        return sizes;
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
    
    function setAllSizes(value) {
        for (var i = 0; i < sizeCheckboxes.length; i++) {
            sizeCheckboxes[i].value = value;
        }
        updatePreview();
    }
    
    function setAllWeights(value) {
        for (var i = 0; i < weightCheckboxes.length; i++) {
            weightCheckboxes[i].value = value;
        }
        updatePreview();
    }
    
    function applySizePreset(presetName) {
        var sizes = PRESET_SIZES[presetName];
        if (!sizes) return;
        for (var i = 0; i < sizeCheckboxes.length; i++) {
            var inPreset = false;
            for (var j = 0; j < sizes.length; j++) {
                if (sizeCheckboxes[i].sizeValue === sizes[j]) {
                    inPreset = true;
                    break;
                }
            }
            sizeCheckboxes[i].value = inPreset;
        }
        updatePreview();
    }
    
    function applyWeightPreset(presetName) {
        var weights = PRESET_WEIGHTS[presetName];
        if (!weights) return;
        for (var i = 0; i < weightCheckboxes.length; i++) {
            var inPreset = false;
            for (var j = 0; j < weights.length; j++) {
                if (weightCheckboxes[i].weightValue === weights[j]) {
                    inPreset = true;
                    break;
                }
            }
            weightCheckboxes[i].value = inPreset;
        }
        updatePreview();
    }
    
    // Wire up events
    for (var si = 0; si < sizeCheckboxes.length; si++) {
        sizeCheckboxes[si].onClick = updatePreview;
    }
    for (var wi = 0; wi < weightCheckboxes.length; wi++) {
        weightCheckboxes[wi].onClick = updatePreview;
    }
    customSizeCb.onClick = updatePreview;
    customSizeInput.onChanging = updatePreview;
    
    sizeAllBtn.onClick = function() { setAllSizes(true); };
    sizeNoneBtn.onClick = function() { setAllSizes(false); };
    weightAllBtn.onClick = function() { setAllWeights(true); };
    weightNoneBtn.onClick = function() { setAllWeights(false); };
    
    sizePresetDropdown.onChange = function() {
        if (sizePresetDropdown.selection && sizePresetDropdown.selection.index > 0) {
            applySizePreset(sizePresetDropdown.selection.text);
        }
    };
    
    weightPresetDropdown.onChange = function() {
        if (weightPresetDropdown.selection && weightPresetDropdown.selection.index > 0) {
            applyWeightPreset(weightPresetDropdown.selection.text);
        }
    };
    
    updatePreview();
    
    // ============================================================================
    // SHOW DIALOG & PROCESS
    // ============================================================================
    
    if (dialog.show() === 1) {
        var selectedSizes = getSelectedSizes();
        var selectedWeights = getSelectedWeights();
        
        if (selectedSizes.length === 0) {
            alert('Please select at least one size.');
            return;
        }
        if (selectedWeights.length === 0) {
            alert('Please select at least one weight.');
            return;
        }
        
        var sourceArtboardIndex = artboardDropdown.selection ? artboardDropdown.selection.index : 0;
        var padding = parseFloat(paddingInput.text) || 0;
        var paddingIsPercent = (paddingUnitDropdown.selection && paddingUnitDropdown.selection.index === 1);
        var isExport = exportRadio.value;
        
        // Get naming pattern
        var namingPattern = '{name}_{weight}_{size}';
        if (namingDropdown.selection) {
            namingPattern = namingDropdown.selection.text;
        }
        
        var options = {
            name: nameInput.text,
            sizes: selectedSizes,
            weights: selectedWeights,
            spacing: parseInt(spacingInput.text, 10) || 20,
            sourceArtboardIndex: sourceArtboardIndex,
            fillArtboard: fillCb.value,
            padding: padding,
            paddingIsPercent: paddingIsPercent,
            isOutsideStroke: outsideStrokeCb.value,
            shrinkInnerShapes: shrinkInnerCb.value,
            exportToSVG: isExport,
            exportFolder: exportFolderInput.text,
            namingPattern: namingPattern
        };
        
        if (isExport) {
            exportToSVG(options);
        } else {
            generateArtboards(options);
        }
    }
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
    
    options.sizes.sort(function(a, b) { return a - b; });
    options.weights.sort(function(a, b) { return a - b; });
    
    var spacing = options.spacing;
    var count = 0;
    
    var sourceGroupBounds = sourceGroup.geometricBounds;
    var sourceIconWidth = sourceGroupBounds[2] - sourceGroupBounds[0];
    var sourceIconHeight = sourceGroupBounds[1] - sourceGroupBounds[3];
    
    // Get original stroke width for compound shape scaling
    var originalStrokeWidth = getOriginalStrokeWidth(sourceGroup);
    // If no stroke found, use Regular weight at 32px as default reference
    if (!originalStrokeWidth || originalStrokeWidth <= 0) {
        originalStrokeWidth = STROKE_WIDTHS[400] || 3.91;
    }
    
    // Find the lowest point of all existing artboards to avoid overlap
    var lowestY = sourceBottom;
    for (var ab = 0; ab < doc.artboards.length; ab++) {
        var abRect = doc.artboards[ab].artboardRect;
        var abBottom = abRect[3]; // Bottom edge (lower Y value in Illustrator coords)
        if (abBottom < lowestY) {
            lowestY = abBottom;
        }
    }
    
    var currentX = sourceLeft;
    var currentY = lowestY - spacing;
    
    for (var s = 0; s < options.sizes.length; s++) {
        var size = options.sizes[s];
        currentY -= size;
        currentX = sourceLeft;
        
        for (var w = 0; w < options.weights.length; w++) {
            var weight = options.weights[w];
            var scaleFactor;
            var strokeWidth;
            
            if (options.fillArtboard) {
                // Calculate padding - both px and % scale proportionally with size
                // px padding is relative to 32px base (e.g., 2px padding at 32px = 4px at 64px)
                var paddingPx;
                if (options.paddingIsPercent) {
                    paddingPx = (size * options.padding / 100);
                } else {
                    // Scale pixel padding proportionally (base size is 32px)
                    paddingPx = (options.padding / 32) * size;
                }
                
                var baseStroke = STROKE_WIDTHS[weight] || STROKE_WIDTHS[400];
                strokeWidth = (baseStroke / 32) * size;
                
                // If stroke is outside, account for full stroke width on both sides
                var strokeAdjustment = options.isOutsideStroke ? strokeWidth * 2 : strokeWidth;
                var availableSize = size - (paddingPx * 2) - strokeAdjustment;
                var scaleToFitWidth = availableSize / sourceIconWidth;
                var scaleToFitHeight = availableSize / sourceIconHeight;
                scaleFactor = Math.min(scaleToFitWidth, scaleToFitHeight);
                
                if (scaleFactor <= 0) scaleFactor = 0.1;
            } else {
                scaleFactor = size / sourceWidth;
                strokeWidth = calculateStroke(weight, size);
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
                // Scale original stroke width to current size for comparison
                var originalStrokeScaled = originalStrokeWidth * (size / sourceWidth);
                // Calculate how much thicker the stroke got
                var strokeIncrease = strokeWidth - originalStrokeScaled;
                // Only shrink if stroke got thicker
                if (strokeIncrease > 0.001) {
                    // Find the outer shape size (largest element)
                    var outerSize = getLargestElementSize(newGroup);
                    
                    // Mathematical approach: the stroke increase reduces available space
                    // For centered strokes, the increase affects both sides, so we account for half on each side
                    // The inner elements need to shrink to compensate for this space reduction
                    var strokeIncreasePerSide = strokeIncrease / 2;
                    // Calculate how much the inner should shrink based on available space
                    // If outer size is known, shrink inner proportionally to stroke increase relative to outer
                    if (outerSize > 0) {
                        var reductionRatio = strokeIncreasePerSide / outerSize;
                        var innerScaleFactor = Math.max(0.5, 1 - reductionRatio);
                    } else {
                        // Fallback: use a conservative ratio based on size
                        var reductionRatio = strokeIncrease / size;
                        var innerScaleFactor = Math.max(0.5, 1 - reductionRatio);
                    }
                    
                    scaleInnerElements(newGroup, innerScaleFactor, true, outerSize);
                    // Re-center after scaling inner elements
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
    
    alert('Done!\n\nCreated ' + count + ' artboard' + (count !== 1 ? 's' : '') + '.\nOriginal preserved on "' + sourceArtboard.name + '".');
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
    // Get the original stroke width from the source item as a reference
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
    // Find the largest element size to identify the outer shape
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
    // Recursively scale nested elements, but not the outer shape
    // outerSize: size of the largest element (outer shape) - don't scale elements this size
    // isTopLevel=true: don't scale this item, but scale all its children
    // isTopLevel=false: scale this item if it's smaller than outerSize
    try {
        if (item.typename === 'GroupItem') {
            if (isTopLevel) {
                // Top level: scale all direct children that are smaller than outer
                for (var j = 0; j < item.pageItems.length; j++) {
                    scaleInnerElements(item.pageItems[j], scaleFactor, false, outerSize);
                }
            } else {
                // Check if this group is smaller than outer (it's an inner element)
                var bounds = item.geometricBounds;
                if (bounds && bounds.length === 4) {
                    var width = bounds[2] - bounds[0];
                    var height = bounds[1] - bounds[3];
                    var elementSize = Math.max(width, height);
                    
                    // Only scale if this element is significantly smaller than outer (it's inner)
                    if (outerSize > 0 && elementSize < outerSize * 0.95) {
                        item.resize(
                            scaleFactor * 100, scaleFactor * 100,
                            true, true, true, true,
                            scaleFactor * 100,
                            Transformation.CENTER
                        );
                    }
                    
                    // Continue scaling nested children
                    for (var k = 0; k < item.pageItems.length; k++) {
                        scaleInnerElements(item.pageItems[k], scaleFactor, false, outerSize);
                    }
                }
            }
        } else if (item.typename === 'PathItem' || item.typename === 'CompoundPathItem') {
            // Scale individual paths only if they're smaller than outer
            if (!isTopLevel) {
                var pathBounds = item.geometricBounds;
                if (pathBounds && pathBounds.length === 4) {
                    var pathWidth = pathBounds[2] - pathBounds[0];
                    var pathHeight = pathBounds[1] - pathBounds[3];
                    var pathSize = Math.max(pathWidth, pathHeight);
                    
                    // Only scale if this path is significantly smaller than outer (it's inner)
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
// SVG EXPORT
// ============================================================================

function exportToSVG(options) {
    var doc = app.activeDocument;
    var sourceIndex = options.sourceArtboardIndex || 0;
    
    var sourceArtboard = doc.artboards[sourceIndex];
    var sourceRect = sourceArtboard.artboardRect;
    var sourceWidth = sourceRect[2] - sourceRect[0];
    var sourceHeight = sourceRect[1] - sourceRect[3];
    
    // Select and group source items
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
    // If no stroke found, use Regular weight at 32px as default reference
    if (!originalStrokeWidth || originalStrokeWidth <= 0) {
        originalStrokeWidth = STROKE_WIDTHS[400] || 3.91;
    }
    
    options.sizes.sort(function(a, b) { return a - b; });
    options.weights.sort(function(a, b) { return a - b; });
    
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
                
                // If stroke is outside, account for full stroke width on both sides
                var strokeAdjustment = options.isOutsideStroke ? strokeWidth * 2 : strokeWidth;
                var availableSize = size - (paddingPx * 2) - strokeAdjustment;
                var scaleToFitWidth = availableSize / sourceIconWidth;
                var scaleToFitHeight = availableSize / sourceIconHeight;
                scaleFactor = Math.min(scaleToFitWidth, scaleToFitHeight);
                
                if (scaleFactor <= 0) scaleFactor = 0.1;
            } else {
                scaleFactor = size / sourceWidth;
                strokeWidth = calculateStroke(weight, size);
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
                // Scale original stroke width to current size for comparison
                var originalStrokeScaled = originalStrokeWidth * (size / sourceWidth);
                // Calculate how much thicker the stroke got
                var strokeIncrease = strokeWidth - originalStrokeScaled;
                // Only shrink if stroke got thicker
                if (strokeIncrease > 0.001) {
                    // Find the outer shape size (largest element)
                    var outerSize = getLargestElementSize(tempGroup);
                    
                    // Mathematical approach: the stroke increase reduces available space
                    // For centered strokes, the increase affects both sides, so we account for half on each side
                    // The inner elements need to shrink to compensate for this space reduction
                    var strokeIncreasePerSide = strokeIncrease / 2;
                    // Calculate how much the inner should shrink based on available space
                    // If outer size is known, shrink inner proportionally to stroke increase relative to outer
                    if (outerSize > 0) {
                        var reductionRatio = strokeIncreasePerSide / outerSize;
                        var innerScaleFactor = Math.max(0.5, 1 - reductionRatio);
                    } else {
                        // Fallback: use a conservative ratio based on size
                        var reductionRatio = strokeIncrease / size;
                        var innerScaleFactor = Math.max(0.5, 1 - reductionRatio);
                    }
                    
                    scaleInnerElements(tempGroup, innerScaleFactor, true, outerSize);
                    // Re-center after scaling inner elements
                    var updatedBounds = tempGroup.geometricBounds;
                    var updatedWidth = updatedBounds[2] - updatedBounds[0];
                    var updatedHeight = updatedBounds[1] - updatedBounds[3];
                    var updatedLeft = centerX - (updatedWidth / 2);
                    var updatedTop = centerY + (updatedHeight / 2);
                    tempGroup.position = [updatedLeft, updatedTop];
                }
            }
            
            // Generate filename based on pattern
            var fileName = options.namingPattern
                .replace('{name}', options.name)
                .replace('{weight}', weight)
                .replace('{size}', size + 'x' + size);
            
            // Handle folder-based naming (create subdirectories)
            var filePath = exportFolder.fsName;
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
            
            var svgFile = new File(filePath + '/' + fileName + '.svg');
            
            // SVG export options
            var svgOptions = new ExportOptionsSVG();
            svgOptions.embedRasterImages = false;
            svgOptions.cssProperties = SVGCSSPropertyLocation.PRESENTATIONATTRIBUTES;
            svgOptions.fontSubsetting = SVGFontSubsetting.None;
            svgOptions.documentEncoding = SVGDocumentEncoding.UTF8;
            svgOptions.coordinatePrecision = 2;
            
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
    
    // Show results
    var message = 'Done!\n\nExported ' + count + ' SVG file' + (count !== 1 ? 's' : '') + ' to:\n' + exportFolder.fsName;
    if (errors.length > 0) {
        message += '\n\nErrors (' + errors.length + '):\n' + errors.slice(0, 5).join('\n');
        if (errors.length > 5) {
            message += '\n... and ' + (errors.length - 5) + ' more';
        }
    }
    alert(message);
}

// Run the script
showDialog();
