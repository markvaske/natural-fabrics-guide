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

  // Shared init sequence for both navigate and ensureLoaded
  async _initTool(toolId) {
    var config = this.tools[toolId];
    await DataLoader.preload(...config.data);
    this._assignGlobals();
    if (!window._sewingUtilsReady) {
      initSewingUtils();
      window._sewingUtilsReady = true;
    }
    await this._loadScript(config.script);
    this._initialized[toolId] = true;
  },

  async navigate(hash) {
    var toolId = (hash || '').replace('#', '').replace('/', '') || 'reference';
    if (!this.tools[toolId]) toolId = 'reference';

    if (typeof shellCloseEditor === 'function') shellCloseEditor();

    if (toolId === this._currentTool && this._initialized[toolId]) {
      var el = document.getElementById(this.tools[toolId].container);
      if (el) el.style.display = '';
      return;
    }

    if (this._currentTool) {
      var oldEl = document.getElementById('tool-' + this._currentTool);
      if (oldEl) oldEl.style.display = 'none';
    }

    var appEd = document.getElementById('app-editors');
    if (appEd) appEd.style.display = 'none';

    this._currentTool = toolId;
    var config = this.tools[toolId];

    var el = document.getElementById(config.container);
    if (el) el.style.display = '';

    if (!this._initialized[toolId]) {
      initShell(config.shellId);
      await this._initTool(toolId);
    } else {
      initShell(config.shellId);
    }

    if (location.hash !== '#' + toolId) {
      history.replaceState(null, '', '#' + toolId);
    }
  },

  async ensureLoaded(toolId) {
    if (this._initialized[toolId]) return;
    var config = this.tools[toolId];
    if (!config) return;
    await this._initTool(toolId);
  },

  _assignGlobals: function() {
    // Assign from all loaded data modules — safe to call multiple times
    // as new data files load (different tools need different data)
    Object.entries(_GLOBAL_MAP).forEach(function(entry) {
      var module = entry[0], keys = entry[1];
      if (window.NFG_DATA[module]) {
        keys.forEach(function(k) { window[k] = window.NFG_DATA[module][k]; });
      }
    });
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

// Data module → global variable names (all keys mirror exactly)
var _GLOBAL_MAP = {
  fibers:   ['FIBERS','PROP_INVERTED','PROP_TOOLTIPS','FIBER_PROS_CONS','FILTER_TAGS',
             'FIBER_ENV_ALLERGEN','WEIGHT_TECHNIQUES','BLEND_NOTES','CARE_EXTENDED','CARE_SECTIONS'],
  projects: ['PROJECT_AUDIENCES','PROJECT_CATALOG','CONSTRUCTION_DETAILS','YARDAGE_DATA',
             'YARDAGE_SIZE_MULTIPLIERS','YARDAGE_HEIGHT_ADJUST','YARDAGE_WIDTH_MULTIPLIERS',
             'YARDAGE_ADDONS','MEASUREMENT_PRESETS','MEASUREMENT_GROUPS','BASE_YARDAGE'],
  tools:    ['NEEDLE_DATA','TECHNIQUE_DATA','SEAM_FINISHES','INTERFACING_TYPES',
             'FIBER_INTERFACING_RECS','GLOSSARY_DATA','WEAVE_DATA','TROUBLESHOOT_DATA'],
  machines: ['MACHINE_TYPES','TOOL_INVENTORY_LABELS','MACHINE_TROUBLESHOOT','MACHINE_MAINTENANCE']
};

// Boot
window.addEventListener('DOMContentLoaded', function() {
  Router.navigate(location.hash || '#reference');
});

window.addEventListener('hashchange', function() {
  Router.navigate(location.hash);
});
