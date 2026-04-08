// [MIG-011] Data Loader — async script loading with cache
// Loads data files on demand via <script> tag injection.
// Data files register themselves on window.NFG_DATA.

window.NFG_DATA = window.NFG_DATA || {};

const DataLoader = {
  _loaded: new Set(),
  _loading: {},

  // Load a data file by name (e.g., 'fibers' loads data/fibers.js)
  async load(name) {
    if (this._loaded.has(name)) return window.NFG_DATA[name];
    if (this._loading[name]) return this._loading[name];

    this._loading[name] = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'data/' + name + '.js';
      script.onload = () => {
        this._loaded.add(name);
        delete this._loading[name];
        if (!window.NFG_DATA[name]) {
          console.warn('DataLoader: ' + name + '.js loaded but did not register data');
        }
        resolve(window.NFG_DATA[name]);
      };
      script.onerror = () => {
        delete this._loading[name];
        reject(new Error('DataLoader: failed to load data/' + name + '.js'));
      };
      document.head.appendChild(script);
    });

    return this._loading[name];
  },

  // Preload multiple data files in parallel
  async preload() {
    var names = Array.prototype.slice.call(arguments);
    return Promise.all(names.map(function(n) { return DataLoader.load(n); }));
  },

  // Check if data is already loaded
  has(name) {
    return this._loaded.has(name);
  }

  // [MIG-011-API] Future: swap to fetch-based JSON loading
  // To migrate to API, replace load() body with:
  //   const resp = await fetch(this._baseUrl + name);
  //   window.NFG_DATA[name] = await resp.json();
  //   return window.NFG_DATA[name];
};
