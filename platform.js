// ═══════════════════════════════════════════════════════════════
// PLATFORM JS — Shared user data model & utilities
// Loaded as <script> in index.html. Craft-specific data lives
// in data/*.js files loaded by DataLoader.
// ═══════════════════════════════════════════════════════════════

// ── USER DATA DEFAULTS ──

const USER_DATA_DEFAULTS = {
  // App-level user profile (singleton — the sewist using this app)
  profile: {
    name: 'You',
    skill: 'intermediate',
    sewistTypes: [],
    preferredFit: 'standard',
    tailorMode: false,
    ownedTools: { machines: [], cutting: [], measuring: [], pressing: [], marking: [] },
    toolUrls: {},
    onboarded: false,
    savedPlans: [],
    favoriteProjects: [],
    hidden: [],
    linkedPersonId: 'default'
  },
  // People roster — everyone you sew for (including yourself)
  profiles: [
    {
      id: 'default',
      name: 'You',
      avatar: { letter: 'Y', color: '#5B8C6B' },
      measurements: {},
      preferredSize: '',
      topSize: '',
      bottomSize: '',
      shoeSize: '',
      cupSize: '',
      fit: 'standard',
      favoriteFibers: [],
      gender: '',
      ageGroup: '',
      favoriteColors: [],
      sensitivities: [],
      favorites: [],
      wantToMake: [],
      savedPlans: [],
      projectHistory: []
    }
  ],
  // Groups — collections of people for batch projects
  groups: [],
  nextGroupId: 1,
  stash: [],
  nextBoltId: 1,
  pipelineState: null,
  lastExport: null
};

// ── WEIGHT CATEGORIES & CONVERSIONS ──

const WEIGHT_CATEGORIES = [
  { key: 'sheer',        label: 'Sheer',        min: 0,   max: 2,   gsmRange: '0–60' },
  { key: 'light',        label: 'Light',        min: 2,   max: 3,   gsmRange: '60–100' },
  { key: 'light-medium', label: 'Light-Med',    min: 3,   max: 4,   gsmRange: '100–135' },
  { key: 'medium',       label: 'Medium',       min: 4,   max: 5.5, gsmRange: '135–185' },
  { key: 'medium-heavy', label: 'Med-Heavy',    min: 5.5, max: 7,   gsmRange: '185–235' },
  { key: 'heavy',        label: 'Heavy',        min: 7,   max: 99,  gsmRange: '235+' }
];

// Weight unit conversions: 1 oz/yd² ≈ 33.906 GSM
function ozToGsm(oz) { return Math.round(oz * 33.906); }
function gsmToOz(gsm) { return +(gsm / 33.906).toFixed(1); }

function getWeightCategory(ozYd2) {
  if (!ozYd2 || ozYd2 <= 0) return null;
  return WEIGHT_CATEGORIES.find(c => ozYd2 >= c.min && ozYd2 < c.max) || WEIGHT_CATEGORIES[WEIGHT_CATEGORIES.length - 1];
}

// ── PERSISTENCE ──
// Thin wrappers delegating to the global `store` instance (js/storage.js).
// All 58+ call sites in tool scripts use these function names unchanged.

function loadUserData() {
  return store.load();
}

function saveUserData(data) {
  store.save(data);
}

function exportUserData(data) {
  store.export(data);
}

function importUserData(file, callback) {
  store.import(file, callback);
}

// ── PROFILE HELPERS ──

function getProfile(userData, id) {
  return userData.profiles.find(p => p.id === id) || userData.profiles[0];
}

function addProfile(userData, profile) {
  const id = 'person_' + Date.now();
  const newProfile = { ...USER_DATA_DEFAULTS.profiles[0], ...profile, id };
  userData.profiles.push(newProfile);
  saveUserData(userData);
  return id;
}

function updateProfile(userData, id, updates) {
  const idx = userData.profiles.findIndex(p => p.id === id);
  if (idx >= 0) {
    userData.profiles[idx] = { ...userData.profiles[idx], ...updates };
    saveUserData(userData);
  }
}

// ── STASH HELPERS ──

function addStashEntry(userData, entry) {
  const id = 'bolt_' + (userData.nextBoltId++);
  userData.stash.push({ ...entry, id, dateAdded: new Date().toISOString() });
  saveUserData(userData);
  return id;
}

function updateStashEntry(userData, id, updates) {
  const idx = userData.stash.findIndex(e => e.id === id);
  if (idx >= 0) {
    userData.stash[idx] = { ...userData.stash[idx], ...updates };
    saveUserData(userData);
  }
}

function removeStashEntry(userData, id) {
  userData.stash = userData.stash.filter(e => e.id !== id);
  saveUserData(userData);
}

function getStashGroups(stash) {
  const groups = {};
  stash.forEach(entry => {
    const groupKey = entry.fiber + '|' + (entry.variety || '');
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(entry);
  });
  const result = [];
  Object.entries(groups).forEach(([key, entries]) => {
    const [fiber, variety] = key.split('|');
    result.push({ type: entries.length > 1 ? 'group' : 'single', fiber, variety, entries, totalYardage: entries.reduce((s, e) => s + (e.yardage || 0), 0) });
  });
  return result;
}

function getStashFibers(stash) {
  const fibers = {};
  stash.forEach(entry => {
    if (!fibers[entry.fiber]) fibers[entry.fiber] = { colors: new Set(), count: 0, yardage: 0 };
    fibers[entry.fiber].count++;
    fibers[entry.fiber].yardage += entry.yardage || 0;
    if (entry.colorHex) fibers[entry.fiber].colors.add(entry.colorHex);
  });
  return fibers;
}

// ── GROUP HELPERS ──

const GROUP_DEFAULTS = {
  id: '', name: '', icon: '📋', notes: '',
  status: 'active', // active | completed | archived
  deadline: '',
  memberIds: [],
  projects: [],
  template: 'blank', // personal | event | client | blank
  contactInfo: '',
  created: ''
};

function addGroup(userData, group) {
  const id = 'group_' + (userData.nextGroupId || 1);
  userData.nextGroupId = (userData.nextGroupId || 1) + 1;
  const newGroup = { ...GROUP_DEFAULTS, ...group, id, created: new Date().toISOString() };
  if (!userData.groups) userData.groups = [];
  userData.groups.push(newGroup);
  saveUserData(userData);
  return id;
}

function updateGroup(userData, id, updates) {
  if (!userData.groups) return;
  const idx = userData.groups.findIndex(g => g.id === id);
  if (idx >= 0) {
    userData.groups[idx] = { ...userData.groups[idx], ...updates };
    saveUserData(userData);
  }
}

function removeGroup(userData, id) {
  if (!userData.groups) return;
  userData.groups = userData.groups.filter(g => g.id !== id);
  saveUserData(userData);
}

function getGroupsForPerson(userData, personId) {
  if (!userData.groups) return [];
  return userData.groups.filter(g => g.memberIds && g.memberIds.includes(personId));
}

function addPersonToGroup(userData, groupId, personId) {
  if (!userData.groups) return;
  const group = userData.groups.find(g => g.id === groupId);
  if (group && !group.memberIds.includes(personId)) {
    group.memberIds.push(personId);
    saveUserData(userData);
  }
}

function removePersonFromGroup(userData, groupId, personId) {
  if (!userData.groups) return;
  const group = userData.groups.find(g => g.id === groupId);
  if (group) {
    group.memberIds = group.memberIds.filter(id => id !== personId);
    saveUserData(userData);
  }
}

// ── PIPELINE STATE ──

function savePipelineState(userData, state) {
  userData.pipelineState = state;
  saveUserData(userData);
}

function clearPipelineState(userData) {
  userData.pipelineState = null;
  saveUserData(userData);
}
