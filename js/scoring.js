// [MIG-010] Scoring Engine
// Requires: NFG_DATA.fibers and NFG_DATA.projects to be loaded first.
// FINDER_PROP_INTERPS contains functions so it lives here, not in data files.

const FINDER_PROPS = ['breathability','absorbency','drape','wrinkleResistance','durability','shrinkage','heatTolerance','stretch','pillingResistance','colorfastness','structure','washability','softness'];
const FINDER_PROP_LABELS = { breathability:'Breathability', absorbency:'Absorbency', drape:'Drape', wrinkleResistance:'Wrinkle', durability:'Durability', shrinkage:'Shrinkage', heatTolerance:'Heat Tol.', stretch:'Stretch', pillingResistance:'Pilling', colorfastness:'Color', structure:'Structure', washability:'Washability', softness:'Softness' };
const FINDER_PROP_SHORT = { breathability:'Breath.', absorbency:'Absorb.', drape:'Drape', wrinkleResistance:'Wrinkle', durability:'Durable', shrinkage:'Shrink.', heatTolerance:'Heat', stretch:'Stretch', pillingResistance:'Pill.', colorfastness:'Color', structure:'Struct.', washability:'Wash', softness:'Soft' };
const FINDER_PROP_INTERPS = {
  breathability: function(v) { return v >= 85 ? 'Excellent airflow' : v >= 70 ? 'Good breathability' : v >= 55 ? 'Moderate' : 'Limited airflow'; },
  absorbency: function(v) { return v >= 85 ? 'Highly absorbent' : v >= 70 ? 'Good absorption' : v >= 50 ? 'Moderate' : 'Low absorption'; },
  drape: function(v) { return v >= 85 ? 'Fluid, flowing fall' : v >= 65 ? 'Soft drape' : v >= 40 ? 'Moderate body' : 'Stiff, structured'; },
  wrinkleResistance: function(v) { return v >= 80 ? 'Resists wrinkles well' : v >= 55 ? 'Moderate resistance' : v >= 30 ? 'Wrinkles noticeably' : 'Wrinkles heavily'; },
  durability: function(v) { return v >= 85 ? 'Very durable' : v >= 65 ? 'Good durability' : v >= 40 ? 'Moderate wear' : 'Delicate, handle with care'; },
  shrinkage: function(v) { var dv = 100 - v; return dv >= 75 ? 'Very stable — minimal shrinkage' : dv >= 55 ? 'Good resistance — slight shrinkage' : dv >= 35 ? 'Moderate — pre-wash recommended' : 'Shrinks significantly — always pre-wash'; },
  heatTolerance: function(v) { return v >= 85 ? 'Handles high heat' : v >= 60 ? 'Medium heat safe' : v >= 40 ? 'Low heat only' : 'Very sensitive to heat'; },
  stretch: function(v) { return v >= 55 ? 'Good stretch' : v >= 30 ? 'Some give' : v >= 15 ? 'Minimal stretch' : 'No stretch'; },
  pillingResistance: function(v) { return v >= 80 ? 'Resists pilling well' : v >= 55 ? 'Moderate pilling' : v >= 30 ? 'Pills noticeably' : 'Pills heavily'; },
  colorfastness: function(v) { return v >= 85 ? 'Excellent color retention' : v >= 65 ? 'Good colorfastness' : v >= 45 ? 'Moderate — some fading' : 'Fades easily'; },
  structure: function(v) { return v >= 80 ? 'Very structured, holds shape' : v >= 55 ? 'Good body and structure' : v >= 30 ? 'Moderate drape with some body' : 'Soft and fluid, little structure'; },
  washability: function(v) { return v >= 80 ? 'Machine wash friendly' : v >= 55 ? 'Gentle machine wash' : v >= 30 ? 'Hand wash recommended' : 'Dry clean only'; },
  softness: function(v) { return v >= 85 ? 'Exceptionally soft hand' : v >= 65 ? 'Soft and pleasant' : v >= 40 ? 'Moderate hand feel' : 'Coarse or rough texture'; }
};

// Data Integrity Validator
function validateScoringData(opts) {
  opts = opts || {};
  var FIBERS = window.NFG_DATA.fibers.FIBERS;
  var PROJECT_CATALOG = window.NFG_DATA.projects.PROJECT_CATALOG;
  var issues = [];
  var warn = function(area, msg) { issues.push({ area: area, msg: msg }); };

  Object.entries(FIBERS).forEach(function(entry) {
    var key = entry[0], fiber = entry[1];
    if (!fiber.properties) {
      warn('fiber-props', (fiber.name || key) + ': missing properties object');
      return;
    }
    FINDER_PROPS.forEach(function(prop) {
      if (fiber.properties[prop] === undefined) {
        warn('fiber-props', fiber.name + ': missing property "' + prop + '"');
      } else {
        var v = fiber.properties[prop].value;
        if (typeof v !== 'number' || v < 0 || v > 100) {
          warn('fiber-props', fiber.name + '.' + prop + ': value ' + v + ' out of range 0-100');
        }
      }
    });

    if (!fiber.varieties || !fiber.varieties.length) {
      warn('variety-props', fiber.name + ': no varieties defined');
      return;
    }
    fiber.varieties.forEach(function(v) {
      if (!v.props) {
        warn('variety-props', fiber.name + ' → ' + v.name + ': missing props object');
        return;
      }
      FINDER_PROPS.forEach(function(prop) {
        if (v.props[prop] === undefined) {
          warn('variety-props', fiber.name + ' → ' + v.name + ': missing prop "' + prop + '"');
        } else if (typeof v.props[prop] !== 'number' || v.props[prop] < 0 || v.props[prop] > 100) {
          warn('variety-props', fiber.name + ' → ' + v.name + '.' + prop + ': value ' + v.props[prop] + ' out of range');
        }
      });
    });
  });

  FINDER_PROPS.forEach(function(prop) {
    if (!FINDER_PROP_LABELS[prop]) warn('finder-refs', 'FINDER_PROP_LABELS missing "' + prop + '"');
    if (!FINDER_PROP_SHORT[prop]) warn('finder-refs', 'FINDER_PROP_SHORT missing "' + prop + '"');
    if (!FINDER_PROP_INTERPS[prop]) warn('finder-refs', 'FINDER_PROP_INTERPS missing "' + prop + '"');
  });

  if (!PROJECT_CATALOG || !PROJECT_CATALOG.length) {
    warn('catalog', 'PROJECT_CATALOG is empty or missing');
  } else {
    PROJECT_CATALOG.forEach(function(proj, i) {
      if (!proj.name) warn('catalog', 'PROJECT_CATALOG[' + i + ']: missing name');
      if (!proj.requirements || Object.keys(proj.requirements).length === 0) {
        warn('catalog', (proj.name || 'PROJECT_CATALOG[' + i + ']') + ': no requirements defined');
      }
      if (proj.requirements) {
        Object.keys(proj.requirements).forEach(function(prop) {
          if (!FINDER_PROPS.includes(prop)) {
            warn('catalog', proj.name + ': requirement "' + prop + '" not in FINDER_PROPS');
          }
          var req = proj.requirements[prop];
          if (req.min !== undefined && (typeof req.min !== 'number' || req.min < 0 || req.min > 100)) {
            warn('catalog', proj.name + '.' + prop + ': min ' + req.min + ' out of range 0-100');
          }
          if (req.weight !== undefined && (typeof req.weight !== 'number' || req.weight <= 0)) {
            warn('catalog', proj.name + '.' + prop + ': weight ' + req.weight + ' must be positive');
          }
        });
      }
    });
  }

  var summary = {
    total: issues.length,
    byArea: issues.reduce(function(acc, i) { acc[i.area] = (acc[i.area] || 0) + 1; return acc; }, {}),
    issues: issues
  };

  if (opts.log !== false && issues.length > 0) {
    console.warn('[validateScoringData] ' + issues.length + ' issue(s) found:');
    issues.forEach(function(i) { console.warn('  [' + i.area + '] ' + i.msg); });
  } else if (opts.log !== false) {
    console.log('[validateScoringData] All scoring data valid ✓');
  }

  return summary;
}

// Score a single fiber against a set of requirements.
function computeScore(fiberKey, requirements, context) {
  var FIBERS = window.NFG_DATA.fibers.FIBERS;
  var fiber = FIBERS[fiberKey];
  if (!fiber || !fiber.properties || !requirements) return { score: 0, passed: false, details: {}, failedProps: ['missing-data'] };

  var details = {};
  var failedProps = [];
  var totalWeightedSurplus = 0;
  var totalWeight = 0;

  for (var prop in requirements) {
    if (!requirements.hasOwnProperty(prop)) continue;
    var req = requirements[prop];
    var fiberProp = fiber.properties[prop];
    var fiberVal = fiberProp ? fiberProp.value : undefined;
    if (fiberVal === undefined) { failedProps.push(prop); continue; }

    var min = req.min || 0;
    var weight = req.weight || 1.0;
    var effective = prop === 'shrinkage' ? (100 - fiberVal) : fiberVal;
    var surplus = effective - min;

    details[prop] = { value: effective, min: min, surplus: surplus, weight: weight };

    if (surplus < 0) {
      failedProps.push(prop);
    } else {
      totalWeightedSurplus += surplus * weight;
      totalWeight += weight;
    }
  }

  var passed = failedProps.length === 0;

  var score = 0;
  if (passed && totalWeight > 0) {
    var rawScore = totalWeightedSurplus / (totalWeight * 100);
    score = Math.round(40 + rawScore * 55);
  } else if (!passed) {
    var reqCount = Object.keys(requirements).length;
    var passCount = reqCount - failedProps.length;
    score = Math.round(5 + (passCount / Math.max(reqCount, 1)) * 30);
  }

  if (context) {
    if (context.favoriteFibers && context.favoriteFibers.includes(fiberKey)) {
      score = Math.round(score * 1.15);
    }
    if (context.sensitivities && context.sensitivities.length > 0) {
      var fiberName = fiber.name.toLowerCase();
      var hasSens = context.sensitivities.some(function(s) {
        return fiberName.includes(s.toLowerCase()) || s.toLowerCase().includes(fiberName);
      });
      if (hasSens) score -= 20;
    }
  }

  score = Math.max(1, Math.min(99, score));
  return { score: score, passed: passed, details: details, failedProps: failedProps };
}

// Score ALL fibers against a project's requirements.
function scoreFibersForProject(projectId, context) {
  var FIBERS = window.NFG_DATA.fibers.FIBERS;
  var PROJECT_CATALOG = window.NFG_DATA.projects.PROJECT_CATALOG;
  var project = PROJECT_CATALOG.find(function(p) { return p.id === projectId; });
  if (!project || !project.requirements) return [];

  var results = Object.keys(FIBERS).map(function(fk) {
    var result = computeScore(fk, project.requirements, context);
    return Object.assign({ fiberKey: fk, fiber: FIBERS[fk] }, result);
  });

  results.sort(function(a, b) {
    if (a.passed !== b.passed) return a.passed ? -1 : 1;
    return b.score - a.score;
  });

  return results;
}

// Score ALL projects against a fiber's properties.
function scoreProjectsForFiber(fiberKey, context) {
  var FIBERS = window.NFG_DATA.fibers.FIBERS;
  var PROJECT_CATALOG = window.NFG_DATA.projects.PROJECT_CATALOG;
  var fiber = FIBERS[fiberKey];
  if (!fiber) return [];

  return PROJECT_CATALOG.map(function(project) {
    if (!project.requirements) return { project: project, score: 0, passed: false, failedProps: ['no-requirements'] };
    var result = computeScore(fiberKey, project.requirements, context);
    return Object.assign({ project: project }, result);
  }).filter(function(r) { return r.passed; })
    .sort(function(a, b) { return b.score - a.score; });
}
