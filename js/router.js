// [MIG-040] SPA Router — hash-based tool switching
// Routes: #reference, #projects, #tools (default: #reference)

var Router = {
  _initialized: {},
  _currentTool: null,

  tools: {
    reference: {
      data: ['fibers', 'projects', 'tools'],
      script: 'js/tool-reference.js',
      container: 'tool-reference',
      shellId: 'reference'
    },
    projects: {
      data: ['fibers', 'projects', 'tools', 'machines'],
      script: 'js/tool-planner.js',
      container: 'tool-projects',
      shellId: 'planner'
    },
    tools: {
      data: ['fibers', 'tools', 'machines'],
      script: 'js/tool-tools.js',
      container: 'tool-tools',
      shellId: 'tools'
    }
  },

  async navigate(hash) {
    var toolId = (hash || '').replace('#', '').replace('/', '') || 'reference';
    if (!this.tools[toolId]) toolId = 'reference';

    // Close any open editor
    if (typeof shellCloseEditor === 'function') shellCloseEditor();

    // If same tool and already loaded, just make sure it's visible
    if (toolId === this._currentTool && this._initialized[toolId]) {
      var el = document.getElementById(this.tools[toolId].container);
      if (el) el.style.display = '';
      return;
    }

    // Hide current tool container
    if (this._currentTool) {
      var oldEl = document.getElementById('tool-' + this._currentTool);
      if (oldEl) oldEl.style.display = 'none';
    }

    // Also hide app-editors
    var appEd = document.getElementById('app-editors');
    if (appEd) appEd.style.display = 'none';

    this._currentTool = toolId;
    var config = this.tools[toolId];

    // Show target tool container
    var el = document.getElementById(config.container);
    if (el) el.style.display = '';

    // Load data + script on first visit
    if (!this._initialized[toolId]) {
      await DataLoader.preload.apply(DataLoader, config.data);
      this._assignGlobals();

      if (!window._sewingUtilsReady) {
        initSewingUtils();
        window._sewingUtilsReady = true;
      }

      // Render sidebar BEFORE loading tool script
      // (tool script's initModes needs sidebar buttons to exist)
      initShell(config.shellId);

      await this._loadScript(config.script);
      this._initialized[toolId] = true;
    } else {
      // Already loaded — re-render sidebar and re-attach mode listeners
      initShell(config.shellId);
    }

    // Update hash
    if (location.hash !== '#' + toolId) {
      history.replaceState(null, '', '#' + toolId);
    }
  },

  // Load a tool's data + script without showing it
  async ensureLoaded(toolId) {
    if (this._initialized[toolId]) return;
    var config = this.tools[toolId];
    if (!config) return;
    await DataLoader.preload.apply(DataLoader, config.data);
    this._assignGlobals();
    if (!window._sewingUtilsReady) {
      initSewingUtils();
      window._sewingUtilsReady = true;
    }
    await this._loadScript(config.script);
    this._initialized[toolId] = true;
  },

  _assignGlobals: function() {
    if (window.NFG_DATA.fibers) {
      var fd = window.NFG_DATA.fibers;
      window.FIBERS = fd.FIBERS;
      window.PROP_INVERTED = fd.PROP_INVERTED;
      window.PROP_TOOLTIPS = fd.PROP_TOOLTIPS;
      window.FIBER_PROS_CONS = fd.FIBER_PROS_CONS;
      window.FILTER_TAGS = fd.FILTER_TAGS;
      window.FIBER_ENV_ALLERGEN = fd.FIBER_ENV_ALLERGEN;
      window.WEIGHT_TECHNIQUES = fd.WEIGHT_TECHNIQUES;
      window.BLEND_NOTES = fd.BLEND_NOTES;
      window.CARE_EXTENDED = fd.CARE_EXTENDED;
      window.CARE_SECTIONS = fd.CARE_SECTIONS;
    }
    if (window.NFG_DATA.projects) {
      var pd = window.NFG_DATA.projects;
      window.PROJECT_AUDIENCES = pd.PROJECT_AUDIENCES;
      window.PROJECT_CATALOG = pd.PROJECT_CATALOG;
      window.CONSTRUCTION_DETAILS = pd.CONSTRUCTION_DETAILS;
      window.YARDAGE_DATA = pd.YARDAGE_DATA;
      window.YARDAGE_SIZE_MULTIPLIERS = pd.YARDAGE_SIZE_MULTIPLIERS;
      window.YARDAGE_HEIGHT_ADJUST = pd.YARDAGE_HEIGHT_ADJUST;
      window.YARDAGE_WIDTH_MULTIPLIERS = pd.YARDAGE_WIDTH_MULTIPLIERS;
      window.YARDAGE_ADDONS = pd.YARDAGE_ADDONS;
      window.MEASUREMENT_PRESETS = pd.MEASUREMENT_PRESETS;
      window.MEASUREMENT_GROUPS = pd.MEASUREMENT_GROUPS;
      window.BASE_YARDAGE = pd.BASE_YARDAGE;
    }
    if (window.NFG_DATA.tools) {
      var td = window.NFG_DATA.tools;
      window.NEEDLE_DATA = td.NEEDLE_DATA;
      window.TECHNIQUE_DATA = td.TECHNIQUE_DATA;
      window.SEAM_FINISHES = td.SEAM_FINISHES;
      window.INTERFACING_TYPES = td.INTERFACING_TYPES;
      window.FIBER_INTERFACING_RECS = td.FIBER_INTERFACING_RECS;
      window.GLOSSARY_DATA = td.GLOSSARY_DATA;
      window.WEAVE_DATA = td.WEAVE_DATA;
      window.TROUBLESHOOT_DATA = td.TROUBLESHOOT_DATA;
    }
    if (window.NFG_DATA.machines) {
      var md = window.NFG_DATA.machines;
      window.MACHINE_TYPES = md.MACHINE_TYPES;
      window.TOOL_INVENTORY_LABELS = md.TOOL_INVENTORY_LABELS;
      window.MACHINE_TROUBLESHOOT = md.MACHINE_TROUBLESHOOT;
      window.MACHINE_MAINTENANCE = md.MACHINE_MAINTENANCE;
    }
  },

  _loadScript: function(src) {
    return new Promise(function(resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = function() { reject(new Error('Failed to load ' + src)); };
      document.head.appendChild(script);
    });
  }
};

// Boot
window.addEventListener('DOMContentLoaded', function() {
  Router.navigate(location.hash || '#reference');
});

window.addEventListener('hashchange', function() {
  Router.navigate(location.hash);
});
