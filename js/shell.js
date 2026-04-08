// [MIG-030] Unified Shell — renders sidebar from config
// SPA-aware: uses hash links, attaches Router click handlers.

// ── SVG ICON LIBRARY ──
var SHELL_ICONS = {
  reference: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  planner: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
  tools: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  machines: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>',
  people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  stash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  profile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
};

// ── TOOL CONFIG ──
var SHELL_TOOLS = [
  { id: 'reference', label: 'Reference', hash: '#reference' },
  { id: 'planner',   label: 'Projects',  hash: '#projects' },
  { id: 'tools',     label: 'Tools',     hash: '#tools' }
];

var SHELL_MODES = {
  reference: [
    { id: 'browse',       label: 'Fibers',        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="9" y1="7" x2="16" y2="7"/><line x1="9" y1="11" x2="14" y2="11"/></svg>' },
    { id: 'weaves',       label: 'Weaves & Knits', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16"/><path d="M4 8h16"/><path d="M4 12h16"/><path d="M4 16h16"/><path d="M4 20h16"/><path d="M8 4v16"/><path d="M12 4v16"/><path d="M16 4v16"/></svg>' },
    { id: 'techniques',   label: 'Techniques',     icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3L4 13l3 3L17 6z"/><path d="M7 16l-3 5 5-3"/><line x1="10" y1="10" x2="15" y2="5"/><path d="M17 6l3-3"/></svg>' },
    { id: 'construction', label: 'Construction',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h8"/><circle cx="18" cy="18" r="3"/><path d="M18 16v4M16 18h4"/></svg>' },
    { id: 'glossary',     label: 'Glossary',       icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/><line x1="8" y1="9" x2="14" y2="9"/><line x1="8" y1="12" x2="12" y2="12"/></svg>' }
  ],
  planner: [
    { id: 'needle',       label: 'Needle',        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="18"/><circle cx="12" cy="20.5" r="1.5" fill="currentColor" stroke="none"/><line x1="12" y1="5" x2="15" y2="8"/><line x1="12" y1="9" x2="9" y2="12"/><line x1="12" y1="13" x2="15" y2="16"/></svg>' },
    { id: 'seams',        label: 'Seams',          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3L4 13l3 3L17 6z"/><path d="M7 16l-3 5 5-3"/><line x1="10" y1="10" x2="15" y2="5"/><path d="M17 6l3-3"/></svg>' },
    { id: 'interfacing',  label: 'Interfacing',    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 3v18"/></svg>' },
    { id: 'yardage',      label: 'Yardage',        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3H3v18h18V3z"/><path d="M3 7h2"/><path d="M3 11h4"/><path d="M3 15h2"/><path d="M3 19h4"/><path d="M7 3v2"/><path d="M11 3v4"/><path d="M15 3v2"/><path d="M19 3v4"/></svg>' },
    { id: 'troubleshoot', label: 'Fix It',          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' }
  ],
  tools: [
    { id: 'machines',     label: 'Machines',       icon: SHELL_ICONS.machines },
    { id: 'cutting',      label: 'Cutting',        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.59 15.41L20 4"/><path d="M15.41 15.41L4 4"/></svg>' },
    { id: 'measuring',    label: 'Measuring',      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"/><path d="M6 8v8"/><path d="M10 10v4"/><path d="M14 10v4"/><path d="M18 8v8"/></svg>' },
    { id: 'pressing',     label: 'Pressing',       icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c1-3 6-5 6-10a6 6 0 1 0-12 0c0 5 5 7 6 10z"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></svg>' },
    { id: 'marking',      label: 'Marking',        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>' },
    { id: 'needles',      label: 'Needles',        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v14"/><circle cx="12" cy="19" r="2.5" fill="none"/><path d="M8 5l4 3 4-3"/><path d="M8 10l4 3 4-3"/></svg>' }
  ]
};

var SHELL_BOTTOM = [
  { id: 'people',  label: 'People',  icon: SHELL_ICONS.people },
  { id: 'stash',   label: 'Stash',   icon: SHELL_ICONS.stash },
  { id: 'profile', label: 'Profile', icon: SHELL_ICONS.profile }
];

// ── Per-tool callbacks registered by tool scripts ──
// Tool scripts call shellRegisterTool() to register their initModes and homeClick
var _toolCallbacks = {};

function shellRegisterTool(toolId, callbacks) {
  _toolCallbacks[toolId] = callbacks;
}

// ── RENDER SIDEBAR ──
function initShell(activeToolId) {
  var sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  var modes = SHELL_MODES[activeToolId] || [];

  // ── Tool Switcher ──
  var html = '<div class="sidebar-tool-switcher">';
  SHELL_TOOLS.forEach(function(tool) {
    var toolShellId = tool.id === 'planner' ? 'planner' : tool.id;
    var isActive = toolShellId === activeToolId;
    html += '<a href="' + tool.hash + '" class="sidebar-tool-btn' + (isActive ? ' active' : '') + '" data-tool="' + tool.id + '">';
    html += SHELL_ICONS[tool.id] || '';
    html += '<span class="sidebar-tool-label">' + tool.label + '</span>';
    html += '</a>';
  });
  html += '</div>';

  // ── Mode Buttons ──
  if (modes.length > 0) {
    html += '<div class="sidebar-modes">';
    modes.forEach(function(mode, i) {
      html += '<button class="sidebar-mode-btn' + (i === 0 ? ' active' : '') + '" data-mode="' + mode.id + '">';
      html += mode.icon;
      html += '<span class="sidebar-mode-label">' + mode.label + '</span>';
      html += '</button>';
    });
    html += '</div>';
  }

  // ── Bottom Buttons ──
  html += '<div class="sidebar-bottom">';
  SHELL_BOTTOM.forEach(function(btn) {
    var extraId = btn.id === 'profile' ? ' id="gpOpenBtn"' : '';
    html += '<button class="sidebar-bottom-btn" data-bottom="' + btn.id + '" title="' + btn.label + '"' + extraId + '>';
    html += btn.icon;
    html += '<span>' + btn.label + '</span>';
    html += '</button>';
  });
  html += '</div>';

  sidebar.innerHTML = html;

  // ── Attach tool switcher click handlers ──
  sidebar.querySelectorAll('.sidebar-tool-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var toolId = btn.dataset.tool;
      var routeId = toolId === 'planner' ? 'projects' : toolId;
      // If clicking the active tool, trigger home callback
      if (btn.classList.contains('active') && _toolCallbacks[activeToolId] && _toolCallbacks[activeToolId].homeClick) {
        _toolCallbacks[activeToolId].homeClick();
      } else {
        Router.navigate('#' + routeId);
      }
    });
  });

  // ── Attach mode button click handlers ──
  // These call the registered initModes callback OR use the generic showView
  var modeButtons = sidebar.querySelectorAll('.sidebar-mode-btn');
  modeButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var mode = btn.dataset.mode;
      modeButtons.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      // Call the tool's showView if registered
      if (_toolCallbacks[activeToolId] && _toolCallbacks[activeToolId].showView) {
        _toolCallbacks[activeToolId].showView(mode);
      }
    });
  });

  // ── Bottom button handlers — app-wide ──
  sidebar.querySelectorAll('.sidebar-bottom-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      shellOpenEditor(btn.dataset.bottom);
    });
  });
}

// ── APP-WIDE EDITOR MANAGEMENT ──
var _editorActive = null;

function shellOpenEditor(target) {
  if (_editorActive === target) {
    shellCloseEditor();
    return;
  }

  // Load planner script on demand (editors need its rendering functions)
  var loadPromise = Router._initialized.projects
    ? Promise.resolve()
    : Router.ensureLoaded('projects');

  loadPromise.then(function() {
    // Hide all tool containers
    document.querySelectorAll('.main-content').forEach(function(el) {
      el.style.display = 'none';
    });

    // Show app-editors
    var editors = document.getElementById('app-editors');
    if (editors) editors.style.display = '';

    // Show the target editor view
    ['gpView', 'peopleSaView', 'stashSaView'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.classList.remove('active');
    });

    var data = loadUserData();

    if (target === 'people') {
      document.getElementById('peopleSaView').classList.add('active');
      if (typeof window.renderProfileCards === 'function') {
        window.renderProfileCards(data);
      }
    } else if (target === 'stash') {
      document.getElementById('stashSaView').classList.add('active');
      if (typeof window.renderStashWorkshop === 'function') {
        window.renderStashWorkshop(data);
      } else if (typeof window.renderStashView === 'function') {
        window.renderStashView(data);
      }
    } else if (target === 'profile') {
      document.getElementById('gpView').classList.add('active');
      if (typeof window.renderGpProfile === 'function') {
        window.renderGpProfile();
        if (typeof window.renderGpTools === 'function') window.renderGpTools();
        if (typeof window.renderGpPlans === 'function') window.renderGpPlans();
      }
    }

    _editorActive = target;
    document.querySelectorAll('.sidebar-bottom-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.bottom === target);
    });
    document.querySelectorAll('.sidebar-mode-btn').forEach(function(b) {
      b.classList.remove('active');
    });
  });
}

function shellCloseEditor() {
  if (!_editorActive) return;
  document.getElementById('app-editors').style.display = 'none';
  _editorActive = null;
  document.querySelectorAll('.sidebar-bottom-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  if (Router._currentTool) {
    var el = document.getElementById('tool-' + Router._currentTool);
    if (el) el.style.display = '';
  }
}
