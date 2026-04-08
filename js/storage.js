// [MIG-050] Persistence Abstraction — swappable DataStore backend
// Currently uses LocalStore (localStorage). Future: ApiStore for cloud sync.
//
// The global `store` instance is used by loadUserData/saveUserData wrappers
// in platform.js. Tool scripts call those wrappers, not the store directly.

// ── SCHEMA VERSION ──
// Increment when USER_DATA_DEFAULTS structure changes.
// Migration functions run automatically on load when version mismatches.
var SCHEMA_VERSION = 2;

var SCHEMA_MIGRATIONS = {
  // v1 → v2: Add schema version field + ensure profile.favoriteProjects exists
  1: function(data) {
    if (data.profile && !data.profile.favoriteProjects) {
      data.profile.favoriteProjects = [];
    }
    // Ensure all profiles have the full default shape
    if (data.profiles) {
      data.profiles = data.profiles.map(function(p) {
        return Object.assign({}, USER_DATA_DEFAULTS.profiles[0], p);
      });
    }
    return data;
  }
};

// ── LOCAL STORE ──
// localStorage-backed implementation with schema versioning

var LocalStore = {
  key: 'nfg_userData',

  load: function() {
    try {
      var raw = localStorage.getItem(this.key);
      if (raw) {
        var data = JSON.parse(raw);
        // Merge with defaults for forward-compat
        var result = Object.assign({}, USER_DATA_DEFAULTS, data);
        result.profiles = (data.profiles || USER_DATA_DEFAULTS.profiles).map(function(p) {
          return Object.assign({}, USER_DATA_DEFAULTS.profiles[0], p);
        });
        // Migrate: seed app-level profile from profiles[0] if missing
        if (!data.profile && result.profiles.length) {
          var p0 = result.profiles[0];
          result.profile = {
            name: p0.name || 'You',
            skill: p0.skill || 'intermediate',
            ownedTools: p0.ownedTools || { machines: [], cutting: [], measuring: [], pressing: [], marking: [] }
          };
        } else {
          result.profile = Object.assign({}, USER_DATA_DEFAULTS.profile, data.profile || {});
        }
        // Run schema migrations
        result = this._migrate(result);
        return result;
      }
    } catch (e) { console.warn('LocalStore: failed to load:', e); }
    var fresh = JSON.parse(JSON.stringify(USER_DATA_DEFAULTS));
    fresh._schemaVersion = SCHEMA_VERSION;
    return fresh;
  },

  save: function(data) {
    try {
      data._schemaVersion = SCHEMA_VERSION;
      localStorage.setItem(this.key, JSON.stringify(data));
    } catch (e) { console.warn('LocalStore: failed to save:', e); }
  },

  export: function(data) {
    data.lastExport = new Date().toISOString();
    this.save(data);
    try {
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'natural-fabrics-data-' + new Date().toISOString().split('T')[0] + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Export failed — this may be a browser sandbox limitation. Error: ' + err.message);
    }
  },

  import: function(file, callback) {
    var self = this;
    var reader = new FileReader();
    reader.onload = function(e) {
      try {
        var data = JSON.parse(e.target.result);
        if (data.profiles && Array.isArray(data.profiles)) {
          data = self._migrate(data);
          self.save(data);
          if (callback) callback(data);
        } else {
          alert('Invalid data file — missing profiles array.');
        }
      } catch (err) { alert('Could not parse file: ' + err.message); }
    };
    reader.readAsText(file);
  },

  _migrate: function(data) {
    var currentVersion = data._schemaVersion || 1;
    while (currentVersion < SCHEMA_VERSION) {
      var migrator = SCHEMA_MIGRATIONS[currentVersion];
      if (migrator) {
        data = migrator(data);
        console.log('[DataStore] Migrated schema v' + currentVersion + ' → v' + (currentVersion + 1));
      }
      currentVersion++;
    }
    data._schemaVersion = SCHEMA_VERSION;
    return data;
  }
};

// [MIG-050-API] Future: API-backed store
// Uncomment and configure when backend is ready.
//
// var ApiStore = {
//   baseUrl: '/api/v1',
//   authToken: null,
//
//   load: function() {
//     return fetch(this.baseUrl + '/user-data', {
//       headers: { 'Authorization': 'Bearer ' + this.authToken }
//     }).then(function(r) { return r.json(); });
//   },
//
//   save: function(data) {
//     return fetch(this.baseUrl + '/user-data', {
//       method: 'PUT',
//       headers: {
//         'Authorization': 'Bearer ' + this.authToken,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });
//   },
//
//   export: function(data) {
//     // Same as LocalStore — download as JSON file
//     LocalStore.export.call(this, data);
//   },
//
//   import: function(file, callback) {
//     // Parse file, then save via API
//     var self = this;
//     LocalStore.import.call({ save: function(d) { self.save(d); } }, file, callback);
//   }
// };

// ── GLOBAL STORE INSTANCE ──
// Swap this line to change backends:
var store = LocalStore;

// To switch to API: store = ApiStore;
// To switch to offline-first: store = new OfflineFirstStore(LocalStore, ApiStore);
