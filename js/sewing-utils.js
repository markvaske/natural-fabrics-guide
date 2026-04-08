// [MIG-009] Sewing utility functions
// Requires: NFG_DATA.fibers (data/fibers.js) and NFG_DATA.projects (data/projects.js)
// to be loaded before calling initSewingUtils().

// Derived property constants — computed from FIBERS after data loads
var COMPARE_PROPS, PROP_LABELS, PROP_DISPLAY_LABELS;

// Cached reference — set by initSewingUtils, avoids repeated property chain lookups
var _propInverted = null;

function initSewingUtils() {
  var FIBERS = window.NFG_DATA.fibers.FIBERS;
  _propInverted = window.NFG_DATA.fibers.PROP_INVERTED;
  COMPARE_PROPS = Object.keys(FIBERS.cotton.properties);
  PROP_LABELS = Object.fromEntries(
    COMPARE_PROPS.map(function(k) {
      return [k, k.replace(/([A-Z])/g, ' $1').replace(/^./, function(c) { return c.toUpperCase(); })];
    })
  );
  PROP_DISPLAY_LABELS = Object.assign({}, PROP_LABELS, {
    shrinkage: 'Shrinkage Resistance',
    wrinkleResistance: 'Wrinkle Resistance',
    heatTolerance: 'Heat Tolerance',
    pillingResistance: 'Pilling Resistance',
    colorfastness: 'Colorfastness'
  });

  // Also compute ALL_MEAS_KEYS from projects data
  if (window.NFG_DATA.projects) {
    window.ALL_MEAS_KEYS = window.NFG_DATA.projects.MEASUREMENT_GROUPS.tailor.keys;
  }
}

// Round to nearest quarter-yard
function roundToQuarter(n) { return Math.ceil(n * 4) / 4; }

// Convert stored value to display value (inverts bad-high properties)
function propDisplayValue(key, storedValue) {
  return _propInverted[key] ? 100 - storedValue : storedValue;
}

// Yardage estimation — requires BASE_YARDAGE from projects data
function estimateYardage(projectId, widthInches, size, directional, preShrunk, shrinkagePercent) {
  var BASE_YARDAGE = window.NFG_DATA.projects.BASE_YARDAGE;
  var widthKey = widthInches >= 58 ? 60 : widthInches >= 52 ? 54 : 45;
  var lookup = BASE_YARDAGE[projectId];
  if (!lookup) return null;
  var widthData = lookup[widthKey];
  if (!widthData) return null;
  var base = widthData[size] || widthData['M'];

  // Directional layout adds ~15%
  if (directional) base = roundToQuarter(base * 1.15);

  // Shrinkage buffer if not pre-shrunk
  var shrinkBuffer = 0;
  if (!preShrunk && shrinkagePercent) {
    var pct = parseFloat(shrinkagePercent) || 4;
    shrinkBuffer = roundToQuarter(base * (pct / 100));
  }

  return { base: base, directionalAdd: directional ? base - (widthData[size] || widthData['M']) : 0, shrinkBuffer: shrinkBuffer, total: base + shrinkBuffer };
}
