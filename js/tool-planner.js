// Tool: Planner (Projects) — loaded by router on first visit to #projects
// Data globals (FIBERS, PROJECT_CATALOG, etc.) are assigned by router before this runs.
(function() {

// Expose critical functions to window immediately (hoisted declarations available)
// Each assignment wrapped individually so one failure doesn't block the rest.
var _expose = function(name, fn) { try { window[name] = fn; } catch(e) {} };
_expose('renderProfileCards', renderProfileCards);
_expose('renderStashView', renderStashView);
_expose('renderStashWorkshop', renderStashWorkshop);
_expose('renderGpProfile', renderGpProfile);
_expose('renderGpTools', renderGpTools);
_expose('renderGpPlans', renderGpPlans);
_expose('showHome', showHome);
_expose('showView', showView);
_expose('plShowView', showView);
_expose('openPeopleEditor', openPeopleEditor);
_expose('openStashEditor', openStashEditor);
_expose('openGlobalProfile', openGlobalProfile);
_expose('plShowNewGroupModal', plShowNewGroupModal);
_expose('plAddMemberToGroup', plAddMemberToGroup);
_expose('plAddPersonToGroupPrompt', plAddPersonToGroupPrompt);
_expose('plShowModal', plShowModal);
_expose('plCloseModal', plCloseModal);
_expose('navigateToTechnique', navigateToTechnique);
_expose('ffSetSort', ffSetSort);
_expose('ffToggleVariety', ffToggleVariety);
_expose('ffToggleFiber', ffToggleFiber);
_expose('ffSelectVariety', ffSelectVariety);
_expose('togglePropLegend', togglePropLegend);
_expose('ffResetFilters', ffResetFilters);
_expose('ffUpdateFilter', ffUpdateFilter);
_expose('activatePipeline', activatePipeline);
_expose('plAddProfile', plAddProfile);
_expose('plShowEditForm', plShowEditForm);
_expose('plDeleteProfile', plDeleteProfile);
_expose('plSaveProfile', plSaveProfile);
_expose('plCancelEdit', plCancelEdit);
_expose('plDeleteStashEntry', plDeleteStashEntry);
_expose('plGoToTab', plGoToTab);
_expose('renderFabricRecommendations', renderFabricRecommendations);

// ═══════════════════════════════════════════════════════════════
// MODE CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const MODE_INFO = {
  home:         { title: 'Projects Home',     desc: 'Your projects at a glance — open, saved, and ready to start',          view: 'projectsView' },
  needle:       { title: 'Needle & Thread',   desc: 'Needle types, thread weights, and machine settings for every fiber',   view: 'needleView' },
  seams:        { title: 'Seam Finder',       desc: 'Choose the right seam finish for your fabric and project',             view: 'seamsView' },
  interfacing:  { title: 'Interfacing',       desc: 'Structure, support, and shape — choose the right interfacing',         view: 'interfacingView' },
  yardage:      { title: 'Yardage',            desc: 'Estimate how much fabric you need for your project',                  view: 'yardageView' },
  troubleshoot: { title: 'Fix It',              desc: 'Diagnose and fix common sewing problems',                            view: 'troubleshootView' }
};

const ALL_VIEW_IDS = [...Object.values(MODE_INFO).map(m => m.view), 'peopleSaView', 'stashSaView'];

// ═══════════════════════════════════════════════════════════════
// VIEW SWITCHING
// ═══════════════════════════════════════════════════════════════

function showView(mode) {
  const info = MODE_INFO[mode];
  if (!info) return;
  if (gpActive) closeGlobalProfile();
  if (plActive) deactivatePipeline();
  if (peopleSaActive) closePeopleEditor();
  if (stashSaActive) closeStashEditor();
  ALL_VIEW_IDS.forEach(id => document.getElementById(id).classList.remove('active'));
  document.getElementById(info.view).classList.add('active');
}

function showHome() {
  if (gpActive) closeGlobalProfile();
  if (plActive) deactivatePipeline();
  if (peopleSaActive) closePeopleEditor();
  if (stashSaActive) closeStashEditor();
  document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active'));
  ALL_VIEW_IDS.forEach(id => document.getElementById(id).classList.remove('active'));
  document.getElementById('projectsView').classList.add('active');
  renderProjectHome();
}

function initModes() {
  // Register with shell for mode switching and home click
  shellRegisterTool('planner', { showView: showView, homeClick: showHome });
}

// ═══════════════════════════════════════════════════════════════
// PROJECT CATALOG
// ═══════════════════════════════════════════════════════════════

const AUDIENCE_SVGS = {
  dress: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6h12l3 14-9 4-9-4z"/><path d="M15 20L8 42h32l-7-22"/><path d="M20 6c0-2 2-3 4-3s4 1 4 3"/><line x1="24" y1="24" x2="24" y2="42"/></svg>',
  shirt: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M16 6l-8 8 5 4 3-5v29h16V13l3 5 5-4-8-8"/><path d="M16 6c0 0 2 3 8 3s8-3 8-3"/><line x1="24" y1="9" x2="24" y2="20"/></svg>',
  onesie: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8l-6 6 4 3 2-3v18c0 2 1 3 3 3h2v5h6v-5h2c2 0 3-1 3-3V14l2 3 4-3-6-6"/><path d="M16 8c0 0 2 2 8 2s8-2 8-2"/><circle cx="21" cy="18" r="1" fill="currentColor" stroke="none"/><circle cx="27" cy="18" r="1" fill="currentColor" stroke="none"/><circle cx="24" cy="24" r="1" fill="currentColor" stroke="none"/></svg>',
  pillow: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="12" width="36" height="24" rx="4"/><path d="M6 20c4-2 8 2 12 0s8 2 12 0s8 2 12 0"/><line x1="6" y1="30" x2="42" y2="30" stroke-dasharray="3 3"/></svg>',
  scarf: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6c0 0-2 10 4 16s2 14 2 20"/><path d="M20 6c0 0-2 10 4 16s2 14 2 20"/><path d="M12 6h8"/><line x1="16" y1="42" x2="18" y2="46"/><line x1="18" y1="42" x2="22" y2="46"/><line x1="14" y1="42" x2="14" y2="46"/></svg>',
  bag: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="16" width="28" height="26" rx="2"/><path d="M18 16v-4c0-3 3-6 6-6s6 3 6 6v4"/><line x1="10" y1="24" x2="38" y2="24"/></svg>'
};

const SKILL_LABELS = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
const SKILL_COLORS = { beginner: '#5B8C6B', intermediate: '#B8860B', advanced: '#A0522D' };

let catalogView = 'categories'; // 'categories' | 'category' | 'project'
let catalogAudience = null;
let catalogProject = null;

function renderCatalog() {
  const wrap = document.getElementById('catalogContent');
  if (catalogView === 'categories') {
    renderCategoryGrid(wrap);
  } else if (catalogView === 'category') {
    renderProjectCards(wrap);
  } else if (catalogView === 'project') {
    renderProjectDetail(wrap);
  }
}

function renderCategoryGrid(wrap) {
  const counts = {};
  PROJECT_AUDIENCES.forEach(a => counts[a.key] = 0);
  PROJECT_CATALOG.forEach(p => p.audiences.forEach(a => { if (counts[a] !== undefined) counts[a]++; }));

  wrap.innerHTML = `
    <div class="cat-grid">
      ${PROJECT_AUDIENCES.map(a => `
        <button class="cat-card" data-audience="${a.key}" ${counts[a.key] === 0 ? 'disabled' : ''}>
          <div class="cat-card-icon">${AUDIENCE_SVGS[a.icon] || ''}</div>
          <div class="cat-card-info">
            <h3>${a.label}</h3>
            <p>${a.desc}</p>
            <span class="cat-card-count">${counts[a.key]} project${counts[a.key] !== 1 ? 's' : ''}</span>
          </div>
        </button>
      `).join('')}
    </div>
  `;

  wrap.querySelectorAll('.cat-card:not([disabled])').forEach(card => {
    card.addEventListener('click', () => {
      catalogAudience = card.dataset.audience;
      catalogView = 'category';
      renderCatalog();
    });
  });
}

function renderProjectCards(wrap) {
  const audience = PROJECT_AUDIENCES.find(a => a.key === catalogAudience);
  const projects = PROJECT_CATALOG.filter(p => p.audiences.includes(catalogAudience));

  wrap.innerHTML = `
    <button class="cat-back-btn" id="catBackBtn"><span class="back-arrow">←</span> All Categories</button>
    <div class="cat-header">
      <div class="cat-header-icon">${AUDIENCE_SVGS[audience.icon] || ''}</div>
      <div>
        <h3>${audience.label}</h3>
        <p>${projects.length} project${projects.length !== 1 ? 's' : ''}</p>
      </div>
    </div>
    <div class="proj-grid">
      ${projects.map(p => `
        <button class="proj-card" data-project="${p.id}">
          <div class="proj-card-top">
            <span class="proj-card-skill" style="background:${SKILL_COLORS[p.skill]}20;color:${SKILL_COLORS[p.skill]}">${SKILL_LABELS[p.skill]}</span>
            <span class="proj-card-time">${p.timeLabel}</span>
          </div>
          <h4>${p.name}</h4>
          <p class="proj-card-overview">${p.overview.split('.').slice(0, 2).join('.') + '.'}</p>
          <div class="proj-card-fibers">
            ${(() => { const passed = scoreFibersForProject(p.id).filter(r => r.passed); return passed.slice(0, 4).map(r => `<span class="proj-fiber-dot" style="background:${r.fiber.accent}" title="${r.fiber.name}"></span>`).join('') + (passed.length > 4 ? `<span class="proj-fiber-more">+${passed.length - 4}</span>` : ''); })()}
          </div>
        </button>
      `).join('')}
    </div>
  `;

  document.getElementById('catBackBtn').addEventListener('click', () => {
    catalogView = 'categories';
    catalogAudience = null;
    renderCatalog();
  });

  wrap.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('click', () => {
      catalogProject = card.dataset.project;
      catalogView = 'project';
      renderCatalog();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function renderProjectDetail(wrap) {
  const p = PROJECT_CATALOG.find(pr => pr.id === catalogProject);
  if (!p) { catalogView = 'categories'; renderCatalog(); return; }

  const audienceLabel = catalogAudience
    ? (PROJECT_AUDIENCES.find(a => a.key === catalogAudience)?.label || 'Projects')
    : 'Projects';

  wrap.innerHTML = `
    <button class="cat-back-btn" id="projBackBtn"><span class="back-arrow">←</span> ${audienceLabel}</button>

    <div class="proj-detail">
      <div class="proj-detail-header">
        <h3>${p.name}</h3>
        <div class="proj-detail-meta">
          <span class="proj-detail-skill" style="background:${SKILL_COLORS[p.skill]}20;color:${SKILL_COLORS[p.skill]}">${SKILL_LABELS[p.skill]}</span>
          <span class="proj-detail-time">⏱ ${p.timeLabel}</span>
          ${p.audiences.length > 1 ? `<span class="proj-detail-audiences">${p.audiences.map(a => {
            const aud = PROJECT_AUDIENCES.find(x => x.key === a);
            return aud ? aud.label.replace("'s Clothing", '').replace(' & Baby', '/Baby').replace(' & Living', '') : a;
          }).join(' · ')}</span>` : ''}
        </div>
      </div>

      <div class="proj-section">
        <p class="proj-overview-text">${p.overview}</p>
      </div>

      ${p.whyItWorks ? `
      <div class="proj-section proj-why">
        <h4>Why this project works</h4>
        <p>${p.whyItWorks}</p>
      </div>` : ''}

      <div class="proj-section">
        <h4>Fabric guidance</h4>
        <p>${p.fabricAdvice}</p>
        ${p.fabricWarning ? `<div class="proj-warning">⚠ ${p.fabricWarning}</div>` : ''}
        ${(() => { const topFibers = scoreFibersForProject(p.id).filter(r => r.passed).slice(0, 8); return topFibers.length > 0 ? `
        <div class="proj-best-fibers">
          <span class="proj-bf-label">Top fibers:</span>
          ${topFibers.map(r => {
            return `<a href="#reference?fiber=${r.fiberKey}" class="proj-fiber-chip" style="border-color:${r.fiber.accent};color:${r.fiber.accent}"><span class="proj-fiber-swatch" style="background:${r.fiber.accent}"></span>${r.fiber.name} <span style="opacity:0.7;font-size:0.85em">${r.score}%</span></a>`;
          }).join('')}
        </div>` : ''; })()}
      </div>

      <div class="proj-section">
        <h4>Construction roadmap</h4>
        <div class="proj-steps">
          ${p.construction.map((s, i) => `
            <div class="proj-step">
              <div class="proj-step-num">${i + 1}</div>
              <div class="proj-step-content">
                <div class="proj-step-title">${s.step}</div>
                <p class="proj-step-detail">${s.detail}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      ${p.techniques && p.techniques.length > 0 ? `
      <div class="proj-section">
        <h4>Techniques you'll use</h4>
        <div class="proj-techniques">
          ${p.techniques.map(t => {
            const tech = findTechnique(t);
            if (tech) return `<a href="#reference?mode=techniques" class="proj-tech-chip">${tech.name}</a>`;
            return `<span class="proj-tech-chip">${formatTechName(t)}</span>`;
          }).join('')}
        </div>
      </div>` : ''}

      ${p.mistakes && p.mistakes.length > 0 ? `
      <div class="proj-section">
        <h4>Common mistakes</h4>
        <div class="proj-mistakes">
          ${p.mistakes.map(m => `
            <div class="proj-mistake">
              <div class="proj-mistake-title">✕ ${m.mistake}</div>
              <p>${m.why}</p>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      ${p.supplies && p.supplies.length > 0 ? `
      <div class="proj-section">
        <h4>Tools & supplies checklist</h4>
        <div class="proj-supplies">
          ${p.supplies.map(s => `
            <label class="proj-supply ${s.essential ? 'essential' : 'optional'}">
              <input type="checkbox" class="proj-supply-check">
              <span class="proj-supply-box"></span>
              <span class="proj-supply-info">
                <span class="proj-supply-name">${s.item}${s.essential ? '' : ' <em>(optional)</em>'}</span>
                ${s.qty ? `<span class="proj-supply-qty">${s.qty}</span>` : ''}
                ${s.note ? `<span class="proj-supply-note">${s.note}</span>` : ''}
              </span>
            </label>
          `).join('')}
        </div>
      </div>` : ''}

      ${p.variations && p.variations.length > 0 ? `
      <div class="proj-section">
        <h4>Variations & next steps</h4>
        <ul class="proj-variations">
          ${p.variations.map(v => `<li>${v}</li>`).join('')}
        </ul>
      </div>` : ''}

      ${p.relatedProjects && p.relatedProjects.length > 0 ? `
      <div class="proj-section proj-related">
        <h4>Related projects</h4>
        <div class="proj-related-grid">
          ${p.relatedProjects.map(rId => {
            const rp = PROJECT_CATALOG.find(x => x.id === rId);
            if (!rp) return '';
            return `<button class="proj-related-card" data-project="${rp.id}">
              <span class="proj-related-skill" style="color:${SKILL_COLORS[rp.skill]}">${SKILL_LABELS[rp.skill]}</span>
              <span class="proj-related-name">${rp.name}</span>
            </button>`;
          }).join('')}
        </div>
      </div>` : ''}

    </div>
  `;

  document.getElementById('projBackBtn').addEventListener('click', () => {
    if (catalogAudience) {
      catalogView = 'category';
    } else {
      catalogView = 'categories';
    }
    catalogProject = null;
    renderCatalog();
  });

  wrap.querySelectorAll('.proj-related-card').forEach(card => {
    card.addEventListener('click', () => {
      catalogProject = card.dataset.project;
      renderCatalog();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function findTechnique(techId) {
  if (typeof TECHNIQUE_DATA === 'undefined') return null;
  for (const cat of Object.values(TECHNIQUE_DATA)) {
    const found = cat.techniques.find(t => t.id === techId);
    if (found) return found;
  }
  return null;
}

function formatTechName(id) {
  return id.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim();
}




// ═══════════════════════════════════════════════════════════════
// NEEDLE & THREAD
// ═══════════════════════════════════════════════════════════════

let selectedNeedleFiber = null;
let needleWeightTab = 'medium';

function renderNeedlePicker() {
  const wrap = document.getElementById('needleFiberPicker');
  wrap.innerHTML = Object.entries(FIBERS).map(([key, f]) =>
    `<div class="fiber-checkbox" data-fiber="${key}">
      <div class="swatch" style="background:${f.accent}"></div>
      ${f.name}
    </div>`
  ).join('');

  wrap.addEventListener('click', e => {
    const el = e.target.closest('.fiber-checkbox');
    if (!el) return;
    const key = el.dataset.fiber;
    wrap.querySelectorAll('.fiber-checkbox').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    selectedNeedleFiber = key;
    needleWeightTab = 'medium';
    renderNeedleDetail();
  });
}

function renderNeedleDetail() {
  const results = document.getElementById('needleResults');
  if (!selectedNeedleFiber) {
    results.innerHTML = '<div class="rec-empty">Choose a fiber above to see needle, thread, and machine settings.</div>';
    return;
  }

  const f = FIBERS[selectedNeedleFiber];
  const nd = NEEDLE_DATA[selectedNeedleFiber];
  if (!nd) {
    results.innerHTML = '<div class="rec-empty">Needle data not yet available for this fiber.</div>';
    return;
  }

  const weights = Object.keys(nd.machineSettings);
  if (!weights.includes(needleWeightTab)) needleWeightTab = weights[0];
  const ms = nd.machineSettings[needleWeightTab];
  const weightLabels = { lightweight: 'Lightweight', medium: 'Medium Weight', heavy: 'Heavy Weight' };

  results.innerHTML = `
    <div class="needle-detail">
      <div class="needle-fiber-header">
        <div class="swatch-lg" style="background:${f.accent}"></div>
        <h3>${f.name}</h3>
        <span class="fiber-type-badge">${f.fiberType} fiber</span>
      </div>

      <div class="needle-card">
        <h4>Recommended Needles</h4>
        ${nd.needleTypes.map(n => `
          <div class="setting-row">
            <span class="setting-label">${n.name}<br><span class="setting-note">${n.sizes}</span></span>
            <span class="setting-value" style="font-weight:400;font-size:0.88rem">${n.use}</span>
          </div>
        `).join('')}
      </div>

      <div class="needle-card">
        <h4>Thread Recommendations</h4>
        ${nd.threadRecs.map(t => `
          <div class="setting-row">
            <span class="setting-label">${t.weight}<br><span class="setting-note">${t.brand}</span></span>
            <span class="setting-value" style="font-weight:400;font-size:0.88rem">${t.use}</span>
          </div>
        `).join('')}
      </div>

      <div class="needle-card full-width">
        <h4>Machine Settings by Fabric Weight</h4>
        <div class="needle-weight-tabs">
          ${weights.map(w => `
            <button class="needle-weight-tab${w === needleWeightTab ? ' active' : ''}" data-weight="${w}">${weightLabels[w] || w}</button>
          `).join('')}
        </div>
        <div class="setting-row">
          <span class="setting-label">Stitch Length</span>
          <span class="setting-value">${ms.stitch}</span>
        </div>
        <div class="setting-row">
          <span class="setting-label">Tension</span>
          <span class="setting-value">${ms.tension}</span>
        </div>
        <div class="setting-row">
          <span class="setting-label">Presser Foot</span>
          <span class="setting-value">${ms.foot}</span>
        </div>
        <div class="setting-row">
          <span class="setting-label">Speed</span>
          <span class="setting-value">${ms.speed}</span>
        </div>
        <div class="needle-tip-box">
          <p>${ms.notes}</p>
        </div>
      </div>

      <div class="needle-card full-width">
        <h4>Pro Tips for ${f.name}</h4>
        ${nd.tips.map(t => `
          <div class="setting-row" style="border-bottom:none; padding:5px 0;">
            <span class="setting-value" style="font-weight:400;font-size:0.88rem;text-align:left;">· ${t}</span>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:12px;font-size:0.82rem">
        <a href="#reference?fiber=${selectedNeedleFiber}" style="color:${f.accent};text-decoration:none;font-style:italic">View ${f.name} in Fabric Reference →</a>
      </div>
    </div>
  `;

  // Weight tab switching
  results.querySelectorAll('.needle-weight-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      needleWeightTab = btn.dataset.weight;
      renderNeedleDetail();
    });
  });
}


// ═══════════════════════════════════════════════════════════════
// SEAM FINDER
// ═══════════════════════════════════════════════════════════════

function getFrayTendency(fiberKey) {
  if (!fiberKey) return 50;
  const f = FIBERS[fiberKey];
  if (!f) return 50;
  const map = {
    cotton: 60, linen: 85, hemp: 80, ramie: 90, jute: 70,
    silk: 75, wool: 40, alpaca: 35, mohair: 30, angora: 25, cashmere: 35, camel: 40,
    bamboo: 55, tencel: 65, viscose: 80, modal: 70, cupro: 75
  };
  return map[fiberKey] || 50;
}

function scoreSeamFinish(finish, weight, garmentType, fiberKey) {
  let score = 0;

  // Weight score (40% weight)
  score += finish.scores[weight] * 0.4;

  // Fray handling (25% weight)
  const fray = getFrayTendency(fiberKey);
  if (fray > 70) score += finish.scores.frays * 0.25;
  else if (fray > 40) score += (finish.scores.frays * 0.5 + 50 * 0.5) * 0.25;
  else score += 60 * 0.25;

  // Garment type bonuses (20% weight)
  const typeScore = (() => {
    switch (garmentType) {
      case 'sheer': return finish.scores.sheer;
      case 'casual': return finish.scores.speed * 0.6 + finish.scores.strength * 0.4;
      case 'tailored': return finish.scores.frays * 0.4 + finish.scores.curves * 0.3 + (100 - finish.scores.speed) * 0.3;
      case 'activewear': return finish.scores.strength * 0.5 + finish.scores.speed * 0.3 + finish.scores.curves * 0.2;
      case 'homedec': return finish.scores.strength * 0.5 + finish.scores.speed * 0.3 + finish.scores.frays * 0.2;
      default: return 50;
    }
  })();
  score += typeScore * 0.2;

  // Curve friendliness tiebreaker (15% weight)
  score += finish.scores.curves * 0.15;

  return Math.round(score);
}

function navigateToTechnique(catSlug, techName) {
  window.location.href = `#reference`;
}

function renderSeamFinder() {
  const container = document.getElementById('seamFinderContent');
  const fiberKeys = Object.keys(FIBERS);

  const weights = [
    { key: 'lightweight', label: 'Lightweight' },
    { key: 'medium', label: 'Medium' },
    { key: 'heavy', label: 'Heavy' },
    { key: 'sheer', label: 'Sheer' }
  ];

  const garmentTypes = [
    { key: 'casual', label: 'Casual / Everyday' },
    { key: 'tailored', label: 'Tailored / Formal' },
    { key: 'sheer', label: 'Sheer / Delicate' },
    { key: 'activewear', label: 'Activewear / Stretch' },
    { key: 'homedec', label: 'Home Décor' }
  ];

  container.innerHTML = `
    <p class="seam-finder-intro">
      Not sure which seam finish to use? Select your fabric and project details below —
      we'll recommend the best options and explain why.
    </p>

    <div class="seam-finder-step">
      <h4>1 · Fiber (optional)</h4>
      <div class="seam-finder-options" id="sfFiber">
        <button class="seam-finder-opt selected" data-val="">Any fiber</button>
        ${fiberKeys.map(k => `<button class="seam-finder-opt" data-val="${k}">${FIBERS[k].name}</button>`).join('')}
      </div>
    </div>

    <div class="seam-finder-step">
      <h4>2 · Fabric weight</h4>
      <div class="seam-finder-options" id="sfWeight">
        ${weights.map((w, i) => `<button class="seam-finder-opt${i === 0 ? ' selected' : ''}" data-val="${w.key}">${w.label}</button>`).join('')}
      </div>
    </div>

    <div class="seam-finder-step">
      <h4>3 · Project type</h4>
      <div class="seam-finder-options" id="sfType">
        ${garmentTypes.map((g, i) => `<button class="seam-finder-opt${i === 0 ? ' selected' : ''}" data-val="${g.key}">${g.label}</button>`).join('')}
      </div>
    </div>

    <div class="seam-finder-results" id="sfResults"></div>
  `;

  function getSelection(groupId) {
    const btn = container.querySelector('#' + groupId + ' .seam-finder-opt.selected');
    return btn ? btn.dataset.val : '';
  }

  function updateResults() {
    const fiber = getSelection('sfFiber');
    const weight = getSelection('sfWeight');
    const garmentType = getSelection('sfType');

    const scored = SEAM_FINISHES.map(f => ({
      ...f,
      score: scoreSeamFinish(f, weight, garmentType, fiber)
    })).sort((a, b) => b.score - a.score);

    const results = document.getElementById('sfResults');
    results.innerHTML = scored.map((f, i) => {
      const isTop = i === 0;
      const allTraits = [
        ...f.traits.pros.map(t => `<span class="seam-result-trait pro">${t}</span>`),
        ...f.traits.neutral.map(t => `<span class="seam-result-trait neutral">${t}</span>`),
        ...f.traits.cons.map(t => `<span class="seam-result-trait con">${t}</span>`)
      ].join('');

      const linkHtml = f.techCat
        ? `<span class="seam-result-link" onclick="navigateToTechnique('${f.techCat}','${f.techName}')">See full technique guide →</span>`
        : '';

      return `
        <div class="seam-result-card${isTop ? ' top-pick' : ''}">
          <div class="seam-result-rank">${isTop ? 'Best match' : '#' + (i + 1)}</div>
          <div class="seam-result-name">${f.name}</div>
          <div class="seam-result-why">${f.desc}</div>
          <div class="seam-result-traits">${allTraits}</div>
          ${linkHtml}
        </div>
      `;
    }).join('');
  }

  // Wire up option buttons
  ['sfFiber', 'sfWeight', 'sfType'].forEach(groupId => {
    container.querySelectorAll('#' + groupId + ' .seam-finder-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('#' + groupId + ' .seam-finder-opt').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        updateResults();
      });
    });
  });

  updateResults();
}


// ═══════════════════════════════════════════════════════════════
// INTERFACING GUIDE
// ═══════════════════════════════════════════════════════════════

function renderInterfacingGuide() {
  const container = document.getElementById('interfacingContent');

  container.innerHTML = `
    <p class="interfacing-guide-intro">
      Interfacing is the hidden skeleton of a garment — it adds structure, support, and shape
      where fabric alone would be too soft. Collars, cuffs, waistbands, button plackets, and facings
      almost always need interfacing. Choosing the right type matters as much as choosing the right fabric.
    </p>

    <div class="interfacing-types" id="interfacingTypes">
      ${INTERFACING_TYPES.map((t, i) => `
        <div class="interfacing-type-card${i === 0 ? ' selected' : ''}" data-id="${t.id}">
          <span class="interfacing-type-badge ${t.type}">${t.type === 'fusible' ? 'Iron-On' : 'Sew-In'}</span>
          <h4>${t.name}</h4>
          <p>${t.desc}</p>
        </div>
      `).join('')}
    </div>

    <div id="interfacingDetail"></div>

    <div class="interfacing-fiber-rec">
      <h4>Fiber-Specific Recommendations</h4>
      <div class="seam-finder-step" style="margin-top:0">
        <div class="seam-finder-options" id="ifFiberPicker">
          ${Object.keys(FIBERS).map(k => `<button class="seam-finder-opt" data-val="${k}">${FIBERS[k].name}</button>`).join('')}
        </div>
      </div>
      <div id="interfacingFiberDetail"></div>
    </div>
  `;

  function showTypeDetail(id) {
    const t = INTERFACING_TYPES.find(x => x.id === id);
    if (!t) return;

    document.getElementById('interfacingDetail').innerHTML = `
      <div class="interfacing-detail">
        <h3>${t.name}</h3>
        <div class="interfacing-detail-grid">
          <div class="interfacing-detail-section">
            <h5>Best For</h5>
            <ul>${t.bestFor.map(b => `<li>${b}</li>`).join('')}</ul>
            <h5 style="margin-top:12px">Available Weights</h5>
            <ul>${t.weights.map(w => `<li>${w.charAt(0).toUpperCase() + w.slice(1)}</li>`).join('')}</ul>
          </div>
          <div class="interfacing-detail-section">
            <h5>Avoid When</h5>
            <ul>${t.avoid.map(a => `<li>${a}</li>`).join('')}</ul>
            <h5 style="margin-top:12px">How to Apply</h5>
            <ul><li>${t.application}</li></ul>
          </div>
        </div>
        <div class="interfacing-tip">${t.tip}</div>
      </div>
    `;
  }

  // Wire up type cards
  container.querySelectorAll('.interfacing-type-card').forEach(card => {
    card.addEventListener('click', () => {
      container.querySelectorAll('.interfacing-type-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      showTypeDetail(card.dataset.id);
    });
  });

  // Wire up fiber picker
  container.querySelectorAll('#ifFiberPicker .seam-finder-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('#ifFiberPicker .seam-finder-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const rec = FIBER_INTERFACING_RECS[btn.dataset.val];
      if (rec) {
        document.getElementById('interfacingFiberDetail').innerHTML = `
          <div class="interfacing-detail" style="margin-top:12px">
            <div class="interfacing-rec-row"><span>Recommended type</span><strong>${rec.primary}</strong></div>
            <div class="interfacing-rec-row"><span>Weight</span><strong>${rec.weight}</strong></div>
            <div class="interfacing-tip" style="margin-top:10px">${rec.notes}</div>
          </div>
        `;
      }
    });
  });

  showTypeDetail('fusible-woven');
}


// ═══════════════════════════════════════════════════════════════
// YARDAGE ESTIMATOR
// ═══════════════════════════════════════════════════════════════

let yardCategory = null;
let yardItem = null;
let yardLength = null;
let yardSize = 'M';
let yardHeight = 'average';
let yardWidth = 45;
let yardAddons = new Set();

function calculateYardage() {
  if (!yardCategory || !yardItem || !yardLength) return null;

  const cat = YARDAGE_DATA[yardCategory];
  const item = cat.items[yardItem];
  const lengthAdj = item.lengths[yardLength];

  let base = item.base + lengthAdj;

  // Apply size multiplier
  base *= YARDAGE_SIZE_MULTIPLIERS[yardSize];

  // Apply height adjustment
  base += YARDAGE_HEIGHT_ADJUST[yardHeight];

  // Apply fabric width multiplier
  base *= YARDAGE_WIDTH_MULTIPLIERS[yardWidth];

  // Apply percentage add-ons
  let addOnPct = 0;
  if (yardAddons.has('patternMatch')) addOnPct += YARDAGE_ADDONS.patternMatch.add;
  if (yardAddons.has('nap')) addOnPct += YARDAGE_ADDONS.nap.add;
  const shellYardage = base * (1 + addOnPct);

  // Lining
  let liningYardage = null;
  if (yardAddons.has('lining')) {
    liningYardage = shellYardage * YARDAGE_ADDONS.lining.pct;
  }

  // Round up to nearest 1/8 yard
  const roundUp = (v) => Math.ceil(v * 8) / 8;
  const minimum = roundUp(shellYardage);
  const comfortable = roundUp(shellYardage * 1.1); // 10% comfort margin

  return {
    minimum,
    comfortable,
    lining: liningYardage ? roundUp(liningYardage) : null
  };
}

function formatYards(y) {
  const whole = Math.floor(y);
  const frac = y - whole;
  const eighths = Math.round(frac * 8);
  if (eighths === 0) return `${whole}`;
  if (eighths === 4) return whole > 0 ? `${whole} ½` : '½';
  if (eighths === 2) return whole > 0 ? `${whole} ¼` : '¼';
  if (eighths === 6) return whole > 0 ? `${whole} ¾` : '¾';
  return whole > 0 ? `${whole} ${eighths}⁄₈` : `${eighths}⁄₈`;
}

function renderYardageEstimator() {
  const container = document.getElementById('yardageContent');

  const sizeKeys = Object.keys(YARDAGE_SIZE_MULTIPLIERS);
  const heightKeys = Object.keys(YARDAGE_HEIGHT_ADJUST);
  const heightLabels = { petite: "Petite (5'3\" & under)", average: "Average (5'4\"–5'7\")", tall: "Tall (5'8\" & over)" };
  const widthKeys = Object.keys(YARDAGE_WIDTH_MULTIPLIERS);

  container.innerHTML = `
    <p class="seam-finder-intro">
      Estimate how much fabric to buy for your project. Select your garment, size, and fabric width —
      we'll calculate both a minimum and a comfortable yardage with room for adjustments.
    </p>

    <div class="seam-finder-step">
      <h4>1 · What are you making?</h4>
      <div class="seam-finder-options" id="ydCategory">
        ${Object.entries(YARDAGE_DATA).map(([key, cat]) =>
          `<button class="seam-finder-opt" data-val="${key}">${cat.label}</button>`
        ).join('')}
      </div>
    </div>

    <div class="seam-finder-step" id="ydItemStep" style="display:none">
      <h4>2 · Specific garment</h4>
      <div class="seam-finder-options" id="ydItem"></div>
    </div>

    <div class="seam-finder-step" id="ydLengthStep" style="display:none">
      <h4>3 · Length</h4>
      <div class="seam-finder-options" id="ydLength"></div>
    </div>

    <div class="seam-finder-step" id="ydSizeStep" style="display:none">
      <h4>4 · Size &amp; height</h4>
      <div class="yd-size-row">
        <div>
          <div class="yd-sublabel">Pattern size</div>
          <div class="seam-finder-options" id="ydSize">
            ${sizeKeys.map(s => `<button class="seam-finder-opt${s === 'M' ? ' selected' : ''}" data-val="${s}">${s}</button>`).join('')}
          </div>
        </div>
        <div>
          <div class="yd-sublabel">Height</div>
          <div class="seam-finder-options" id="ydHeight">
            ${heightKeys.map(h => `<button class="seam-finder-opt${h === 'average' ? ' selected' : ''}" data-val="${h}">${heightLabels[h]}</button>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <div class="seam-finder-step" id="ydWidthStep" style="display:none">
      <h4>5 · Fabric width</h4>
      <div class="seam-finder-options" id="ydWidth">
        ${widthKeys.map(w => `<button class="seam-finder-opt${parseInt(w) === 45 ? ' selected' : ''}" data-val="${w}">${w}"</button>`).join('')}
      </div>
    </div>

    <div class="seam-finder-step" id="ydAddonsStep" style="display:none">
      <h4>6 · Add-ons (optional)</h4>
      <div class="seam-finder-options" id="ydAddons">
        ${Object.entries(YARDAGE_ADDONS).map(([key, a]) =>
          `<button class="seam-finder-opt yd-addon-opt" data-val="${key}" title="${a.desc}">${a.label}</button>`
        ).join('')}
      </div>
    </div>

    <div class="yd-results" id="ydResults"></div>
  `;

  function showStep(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = '';
  }

  function updateResults() {
    const result = calculateYardage();
    const results = document.getElementById('ydResults');
    if (!result) {
      results.innerHTML = '';
      return;
    }

    const item = YARDAGE_DATA[yardCategory].items[yardItem];
    const lengthLabel = yardLength.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());

    results.innerHTML = `
      <div class="yd-result-card">
        <div class="yd-result-header">
          <div class="yd-result-garment">${item.label}</div>
          <div class="yd-result-spec">${lengthLabel} · Size ${yardSize} · ${yardHeight} height · ${yardWidth}" wide fabric</div>
        </div>
        <div class="yd-result-numbers">
          <div class="yd-result-col">
            <div class="yd-result-label">Minimum</div>
            <div class="yd-result-value">${formatYards(result.minimum)}</div>
            <div class="yd-result-unit">yards</div>
          </div>
          <div class="yd-result-divider"></div>
          <div class="yd-result-col recommended">
            <div class="yd-result-label">Comfortable</div>
            <div class="yd-result-value">${formatYards(result.comfortable)}</div>
            <div class="yd-result-unit">yards (+ 10%)</div>
          </div>
          ${result.lining ? `
            <div class="yd-result-divider"></div>
            <div class="yd-result-col">
              <div class="yd-result-label">Lining</div>
              <div class="yd-result-value">${formatYards(result.lining)}</div>
              <div class="yd-result-unit">yards</div>
            </div>
          ` : ''}
        </div>
        ${yardAddons.size > 0 ? `
          <div class="yd-result-addons">
            ${yardAddons.has('patternMatch') ? '<span class="yd-addon-tag">+15% pattern matching</span>' : ''}
            ${yardAddons.has('nap') ? '<span class="yd-addon-tag">+15% nap / directional</span>' : ''}
            ${yardAddons.has('lining') ? '<span class="yd-addon-tag">lining at 70% of shell</span>' : ''}
          </div>
        ` : ''}
        <div class="yd-result-note">
          These estimates work for any gender — yardage depends on pattern size and garment type, not body shape.
          The "comfortable" amount already includes a 10% margin for ease differences and layout variations.
          Always cross-check with the yardage chart on your pattern envelope.
        </div>
      </div>
    `;
  }

  // Step 1: Category
  container.querySelectorAll('#ydCategory .seam-finder-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('#ydCategory .seam-finder-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      yardCategory = btn.dataset.val;
      yardItem = null;
      yardLength = null;

      // Show item step with sub-types
      const cat = YARDAGE_DATA[yardCategory];
      const itemWrap = document.getElementById('ydItem');
      itemWrap.innerHTML = Object.entries(cat.items).map(([key, it]) =>
        `<button class="seam-finder-opt" data-val="${key}">${it.label}</button>`
      ).join('');
      showStep('ydItemStep');

      // Hide downstream steps
      document.getElementById('ydLengthStep').style.display = 'none';
      document.getElementById('ydSizeStep').style.display = 'none';
      document.getElementById('ydWidthStep').style.display = 'none';
      document.getElementById('ydAddonsStep').style.display = 'none';
      document.getElementById('ydResults').innerHTML = '';

      // Wire item buttons
      itemWrap.querySelectorAll('.seam-finder-opt').forEach(ibtn => {
        ibtn.addEventListener('click', () => {
          itemWrap.querySelectorAll('.seam-finder-opt').forEach(b => b.classList.remove('selected'));
          ibtn.classList.add('selected');
          yardItem = ibtn.dataset.val;
          yardLength = null;

          // Show length step
          const item = YARDAGE_DATA[yardCategory].items[yardItem];
          const lengths = Object.keys(item.lengths);
          const lengthWrap = document.getElementById('ydLength');
          lengthWrap.innerHTML = lengths.map(l => {
            const label = l.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
            return `<button class="seam-finder-opt" data-val="${l}">${label}</button>`;
          }).join('');
          showStep('ydLengthStep');
          document.getElementById('ydSizeStep').style.display = 'none';
          document.getElementById('ydWidthStep').style.display = 'none';
          document.getElementById('ydAddonsStep').style.display = 'none';
          document.getElementById('ydResults').innerHTML = '';

          // Wire length buttons
          lengthWrap.querySelectorAll('.seam-finder-opt').forEach(lbtn => {
            lbtn.addEventListener('click', () => {
              lengthWrap.querySelectorAll('.seam-finder-opt').forEach(b => b.classList.remove('selected'));
              lbtn.classList.add('selected');
              yardLength = lbtn.dataset.val;

              // Show remaining steps
              showStep('ydSizeStep');
              showStep('ydWidthStep');
              showStep('ydAddonsStep');
              updateResults();
            });
          });
        });
      });
    });
  });

  // Size buttons
  container.querySelectorAll('#ydSize .seam-finder-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('#ydSize .seam-finder-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      yardSize = btn.dataset.val;
      updateResults();
    });
  });

  // Height buttons
  container.querySelectorAll('#ydHeight .seam-finder-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('#ydHeight .seam-finder-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      yardHeight = btn.dataset.val;
      updateResults();
    });
  });

  // Width buttons
  container.querySelectorAll('#ydWidth .seam-finder-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('#ydWidth .seam-finder-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      yardWidth = parseInt(btn.dataset.val);
      updateResults();
    });
  });

  // Addon toggle buttons
  container.querySelectorAll('#ydAddons .seam-finder-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.val;
      if (yardAddons.has(key)) {
        yardAddons.delete(key);
        btn.classList.remove('selected');
      } else {
        yardAddons.add(key);
        btn.classList.add('selected');
      }
      updateResults();
    });
  });
}


// ═══════════════════════════════════════════════════════════════
// TROUBLESHOOTER
// ═══════════════════════════════════════════════════════════════

function renderTroubleshooter() {
  const container = document.getElementById('troubleshootContent');

  container.innerHTML = `
    <p class="seam-finder-intro">
      Something not working right? Pick the problem you're seeing — we'll walk you through
      likely causes, fixes, and link you to the right settings and techniques.
    </p>

    <div class="ts-categories" id="tsCategories">
      ${Object.entries(TROUBLESHOOT_DATA).map(([key, cat]) =>
        `<button class="ts-category-btn" data-cat="${key}">
          <span class="ts-cat-icon">${cat.icon}</span>
          <span class="ts-cat-label">${cat.label}</span>
        </button>`
      ).join('')}
    </div>

    <div id="tsProblems"></div>
  `;

  container.querySelectorAll('.ts-category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.ts-category-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      showTsProblems(btn.dataset.cat);
    });
  });

  function showTsProblems(catKey) {
    const cat = TROUBLESHOOT_DATA[catKey];
    const wrap = document.getElementById('tsProblems');

    wrap.innerHTML = cat.problems.map((p, i) => {
      const linksHtml = buildTsLinks(p.links);
      return `
        <div class="ts-problem-card">
          <button class="ts-problem-header" data-idx="${i}">
            <span class="ts-problem-title">${p.symptom}</span>
            <span class="ts-chevron">▸</span>
          </button>
          <div class="ts-problem-body" id="tsProblem_${catKey}_${i}">
            <div class="ts-section">
              <h5>Why this happens</h5>
              <ul>${p.causes.map(c => `<li>${c}</li>`).join('')}</ul>
            </div>
            <div class="ts-section">
              <h5>How to fix it</h5>
              <ol>${p.fixes.map(f => `<li>${f}</li>`).join('')}</ol>
            </div>
            ${linksHtml ? `<div class="ts-links">${linksHtml}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Wire accordions
    wrap.querySelectorAll('.ts-problem-header').forEach(header => {
      header.addEventListener('click', () => {
        const card = header.closest('.ts-problem-card');
        const wasOpen = card.classList.contains('open');

        // Close all in this category
        wrap.querySelectorAll('.ts-problem-card').forEach(c => c.classList.remove('open'));

        // Toggle the clicked one
        if (!wasOpen) card.classList.add('open');
      });
    });

    // Auto-open first problem
    const first = wrap.querySelector('.ts-problem-card');
    if (first) first.classList.add('open');
  }

  function buildTsLinks(links) {
    if (!links) return '';
    const parts = [];
    if (links.needle) {
      parts.push(`<a href="#" class="ts-link" onclick="event.preventDefault(); document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active')); var nb=document.querySelector('.sidebar-mode-btn[data-mode=\\'needle\\']'); if(nb)nb.classList.add('active'); plShowView('needle');">Check Needle &amp; Thread settings →</a>`);
    }
    if (links.technique) {
      parts.push(`<a href="#" class="ts-link" onclick="event.preventDefault(); document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active')); var sb=document.querySelector('.sidebar-mode-btn[data-mode=\\'seams\\']'); if(sb)sb.classList.add('active'); plShowView('seams');">Open Seam Finder →</a>`);
    }
    if (links.fiber) {
      parts.push(`<a href="#reference" class="ts-link">Look up fiber details in Reference →</a>`);
    }
    return parts.join('');
  }
}


// ═══════════════════════════════════════════════════════════════
// FABRIC FINDER
// ═══════════════════════════════════════════════════════════════

const ffFilters = {};
FINDER_PROPS.forEach(p => ffFilters[p] = 0);
let ffSortBy = 'match';

// Fiber metadata — read from FIBERS (single source of truth)
function ffFiberName(key) { return FIBERS[key] ? FIBERS[key].name : key; }
function ffFiberAccent(key) { return FIBERS[key] ? FIBERS[key].accent : '#8B6B4A'; }
function ffFiberType(key) { const t = FIBERS[key] && FIBERS[key].fiberType; return t ? t.charAt(0).toUpperCase() + t.slice(1) : ''; }

function ffGetRange(fiberData) {
  const ranges = {};
  FINDER_PROPS.forEach(p => {
    const vals = fiberData.varieties.map(v => propDisplayValue(p, v.props[p]));
    ranges[p] = { min: Math.min(...vals), max: Math.max(...vals) };
  });
  return ranges;
}

function ffFiberPassesAny(fiberData) {
  const af = FINDER_PROPS.filter(p => ffFilters[p] > 0);
  if (!af.length) return true;
  return fiberData.varieties.some(v => af.every(p => propDisplayValue(p, v.props[p]) >= ffFilters[p]));
}

function ffVarietyScore(v) {
  const af = FINDER_PROPS.filter(p => ffFilters[p] > 0);
  if (!af.length) return 100;
  let t = 0;
  for (const p of af) t += Math.min(propDisplayValue(p, v.props[p]) / ffFilters[p], 1.5);
  return Math.round((t / af.length) * 100 / 1.5);
}

function ffVarietyPasses(v) {
  return FINDER_PROPS.every(p => ffFilters[p] === 0 || propDisplayValue(p, v.props[p]) >= ffFilters[p]);
}

function ffBestVarietyScore(fiberData) { return Math.max(...fiberData.varieties.map(v => ffVarietyScore(v))); }

function ffBestVariety(fiberData) {
  let best = fiberData.varieties[0], bs = ffVarietyScore(best);
  for (const v of fiberData.varieties) { const s = ffVarietyScore(v); if (s > bs) { best = v; bs = s; } }
  return best;
}

function ffUpdateFilter(prop, val) {
  val = parseInt(val); ffFilters[prop] = val;
  document.getElementById(`ffVal_${prop}`).textContent = val === 0 ? 'Any' : val + '+';
  document.getElementById(`ffSlider_${prop}`).classList.toggle('active-filter', val > 0);
  ffRenderResults();
}

function togglePropLegend(btn) {
  const popover = btn.closest('.ff-filter-controls').querySelector('.prop-legend-popover')
    || btn.parentElement.nextElementSibling;
  if (!popover || !popover.classList.contains('prop-legend-popover')) return;
  const vis = popover.style.display === 'none';
  popover.style.display = vis ? 'block' : 'none';
  btn.classList.toggle('active', vis);
}

function ffResetFilters() {
  FINDER_PROPS.forEach(p => {
    ffFilters[p] = 0;
    const s = document.getElementById(`ffSlider_${p}`);
    if (s) { s.value = 0; s.classList.remove('active-filter'); }
    const v = document.getElementById(`ffVal_${p}`);
    if (v) v.textContent = 'Any';
  });
  ffSortBy = 'match'; ffRenderSortPills(); ffRenderResults();
}

function ffSetSort(k) { ffSortBy = k; ffRenderSortPills(); ffRenderResults(); }

function ffToggleFiber(key) { document.getElementById(`ff_fiber_${key}`).classList.toggle('expanded'); }

function ffToggleVariety(el) {
  if (el.classList.contains('dimmed')) return;
  el.classList.toggle('expanded-card');
}

function ffSelectVariety(fiberKey, varietyName, isKnit) {
  const f = FIBERS[fiberKey];
  if (!f) return;
  const v = f.varieties?.find(v => v.name === varietyName);
  plSelectedFabric = {
    fiber: fiberKey,
    variety: varietyName,
    colorName: 'TBD',
    yardage: 0,
    isKnit: isKnit || false,
    weight: v ? parseFloat(v.gsm) / 33.906 : 0  // GSM to oz/yd² approx
  };
  plSetupState = {};
  plSaveCurrentState();

  if (!plSelectedProject) {
    // No project yet — switch to By Project tab so user can pick one
    document.querySelectorAll('#plMatchTabs .pl-profile-tab').forEach((mt, i) => mt.classList.toggle('active', i === 0));
    for (let i = 0; i < 3; i++) {
      const mv = document.getElementById('plMatchView-' + i);
      if (mv) mv.style.display = i === 0 ? '' : 'none';
    }
    renderMatchByProject(loadUserData());
    renderConvergencePanel();
    // Scroll to top so user sees project grid
    document.getElementById('plPanel-0')?.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    renderConvergencePanel();
    const conv = document.getElementById('plConvergence');
    if (conv && conv.style.display !== 'none') conv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function ffRenderSortPills() {
  const el = document.getElementById('ffSortPills');
  if (!el) return;
  const opts = [{ key: 'match', label: 'Best Match' }, ...FINDER_PROPS.map(p => ({ key: p, label: FINDER_PROP_LABELS[p] }))];
  el.innerHTML = opts.map(o =>
    `<button class="seg-btn${o.key === ffSortBy ? ' active' : ''}" onclick="ffSetSort('${o.key}')">${o.label}</button>`
  ).join('');
}

const ffChevronSvg = `<svg class="ff-fiber-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg>`;

function ffRenderResults() {
  const list = document.getElementById('ffResultsList');
  const countEl = document.getElementById('ffResultsCount');
  if (!list || !countEl) return;
  const hasFilters = FINDER_PROPS.some(p => ffFilters[p] > 0);

  let entries = Object.entries(FIBERS)
    .filter(([, f]) => f.varieties && f.varieties.length && f.varieties[0].props)
    .map(([key, fiberData]) => ({
    key, fiberData, passes: ffFiberPassesAny(fiberData),
    score: ffBestVarietyScore(fiberData), best: ffBestVariety(fiberData)
  }));

  if (ffSortBy === 'match') entries.sort((a, b) => b.score - a.score);
  else entries.sort((a, b) => Math.max(...b.fiberData.varieties.map(v => v.props[ffSortBy])) - Math.max(...a.fiberData.varieties.map(v => v.props[ffSortBy])));

  const passing = entries.filter(e => e.passes);
  const failing = entries.filter(e => !e.passes);
  entries = [...passing, ...failing];

  const totalFibers = entries.length;
  const totalVarieties = entries.reduce((s, e) => s + e.fiberData.varieties.length, 0);
  if (!hasFilters) {
    countEl.innerHTML = `<strong>${totalFibers}</strong> fibers · <strong>${totalVarieties}</strong> varieties — set thresholds to filter`;
  } else {
    const matchingVars = entries.reduce((s, e) => s + e.fiberData.varieties.filter(v => ffVarietyPasses(v)).length, 0);
    countEl.innerHTML = `<strong>${matchingVars}</strong> of ${totalVarieties} varieties match across <strong>${passing.length}</strong> fibers`;
  }

  list.innerHTML = entries.map(({ key, fiberData, passes, score, best }) => {
    const accent = ffFiberAccent(key);
    const name = ffFiberName(key);
    const type = ffFiberType(key);
    const ranges = ffGetRange(fiberData);
    const sortedVars = [...fiberData.varieties].sort((a, b) => ffSortBy === 'match' ? ffVarietyScore(b) - ffVarietyScore(a) : propDisplayValue(ffSortBy, b.props[ffSortBy]) - propDisplayValue(ffSortBy, a.props[ffSortBy]));
    const passingCount = fiberData.varieties.filter(v => ffVarietyPasses(v)).length;

    const rangeBars = FINDER_PROPS.map(p => {
      const r = ranges[p]; const th = ffFilters[p];
      const fails = th > 0 && r.max < th;
      return `<div class="ff-range-bar-group"><div class="ff-range-bar-label">${FINDER_PROP_SHORT[p]}</div>
        <div class="ff-range-bar-track">
          <div class="ff-range-bar-fill" style="left:${r.min}%;width:${Math.max(r.max - r.min, 2)}%;background:${accent};opacity:${fails ? 0.2 : 0.55}"></div>
          ${th > 0 ? `<div class="ff-range-bar-threshold" style="left:${th}%"></div>` : ''}
        </div></div>`;
    }).join('');

    const varietyCards = sortedVars.map(v => {
      const vp = ffVarietyPasses(v); const vs = ffVarietyScore(v);
      const bars = FINDER_PROPS.map(p => {
        const val = propDisplayValue(p, v.props[p]); const th = ffFilters[p]; const fail = th > 0 && val < th;
        return `<div class="ff-var-bar-group"><div class="ff-var-bar-label">${FINDER_PROP_SHORT[p]}</div>
          <div class="ff-var-bar-track"><div class="ff-var-bar-fill ${fail?'fail':''}" style="width:${val}%;background:${fail?'':accent}"></div></div></div>`;
      }).join('');

      const detailBars = FINDER_PROPS.map(p => {
        const val = propDisplayValue(p, v.props[p]); const interp = FINDER_PROP_INTERPS[p](v.props[p]);
        return `<div class="ff-vd-prop">
          <div class="ff-vd-prop-header"><span class="ff-vd-prop-name">${FINDER_PROP_LABELS[p]}</span><span class="ff-vd-prop-value">${val}/100</span></div>
          <div class="ff-vd-prop-bar"><div class="ff-vd-prop-fill" style="width:${val}%;background:${accent}"></div></div>
          <div class="ff-vd-prop-interp">${interp}</div>
        </div>`;
      }).join('');

      return `<div class="ff-variety-card${vp ? '' : ' dimmed'}" onclick="ffToggleVariety(this)">
        <div>
          <div class="ff-variety-name">${v.name}${v.isKnit ? '<span class="ff-variety-knit-badge">knit</span>' : ''}</div>
          <div class="ff-variety-weight">${v.weight} · ${v.gsm} GSM</div>
        </div>
        <div class="ff-variety-bars">${bars}</div>
        ${hasFilters ? `<div class="ff-variety-score"><div class="ff-variety-score-val">${vs}%</div><div class="ff-variety-score-lbl">match</div></div>` : ''}
        <div class="ff-variety-detail">
          <div class="ff-vd-desc">${v.desc}</div>
          <div class="ff-vd-grid">${detailBars}</div>
          <div class="ff-vd-meta">
            <div class="ff-vd-meta-item"><span class="ff-vd-meta-label">Fiber:</span>${name}</div>
            <div class="ff-vd-meta-item"><span class="ff-vd-meta-label">Type:</span>${type}</div>
            <div class="ff-vd-meta-item"><span class="ff-vd-meta-label">Construction:</span>${v.isKnit ? 'Knit' : 'Woven'}</div>
            <div class="ff-vd-meta-item"><span class="ff-vd-meta-label">Weight:</span>${v.weight}</div>
            <div class="ff-vd-meta-item"><span class="ff-vd-meta-label">GSM:</span>${v.gsm}</div>
          </div>
          ${vp ? `<button class="pl-btn-primary ff-use-variety-btn" style="margin-top:12px;width:100%;padding:10px;font-size:0.82rem;" onclick="event.stopPropagation(); ffSelectVariety('${key}','${v.name.replace(/'/g, "\\'")}', ${v.isKnit || false})">
            Use ${v.name} for My Project
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </button>` : ''}
        </div>
      </div>`;
    }).join('');

    return `<div class="ff-fiber-row${passes ? '' : ' dimmed'}" id="ff_fiber_${key}">
      <div class="ff-fiber-row-main" onclick="ffToggleFiber('${key}')">
        <div class="ff-fiber-row-name">
          <div class="ff-fiber-dot" style="background:${accent}"></div>
          <div>
            <div class="ff-fiber-title">${name}</div>
            <div class="ff-fiber-subtitle">${type}</div>
            <div class="ff-fiber-variety-count">${fiberData.varieties.length} varieties${hasFilters ? ` · ${passingCount} match` : ''}</div>
          </div>
        </div>
        <div class="ff-range-bars">${rangeBars}</div>
        <div class="ff-fiber-row-end">
          ${hasFilters ? `<div><div class="ff-fiber-best-variety">Best: ${best.name}</div></div>
            <div class="ff-fiber-score-badge"><div class="ff-fiber-score-val">${score}%</div><div class="ff-fiber-score-lbl">best</div></div>` : ''}
          ${ffChevronSvg}
        </div>
      </div>
      <div class="ff-variety-panel">
        <div class="ff-variety-panel-header">Varieties — sorted by ${ffSortBy === 'match' ? 'best match' : FINDER_PROP_LABELS[ffSortBy]}</div>
        <div class="ff-variety-list">${varietyCards}</div>
      </div>
    </div>`;
  }).join('');
}

function renderFabricFinder() {
  const wrap = document.getElementById('finderContent');
  if (!wrap) return;

  wrap.innerHTML = `
    <h2 class="ff-title">Fabric Finder</h2>
    <p class="ff-subtitle">Set property thresholds to find fabrics that match your needs. Range bars show the spread across each fiber's varieties. Expand a fiber to see individual varieties ranked by match, then click a variety for its full profile.</p>

    <div class="ff-filter-controls">
      <div class="ff-filter-controls-header">
        <span class="ff-filter-controls-title">Property Thresholds <button class="prop-legend-btn" onclick="togglePropLegend(this)">?</button></span>
        <button class="ff-filter-reset" onclick="ffResetFilters()">Reset all</button>
      </div>
      <div class="prop-legend-popover" style="display:none">
        <div class="prop-legend-title">Scoring Guide</div>
        <p class="prop-legend-intro">All properties are scored 0–100 where <strong>higher is better</strong>.</p>
        <div class="prop-legend-list">
          ${Object.entries(PROP_TOOLTIPS).map(([k,tip]) => `<div class="prop-legend-item"><span class="prop-legend-name">${PROP_DISPLAY_LABELS[k] || PROP_LABELS[k]}</span><span class="prop-legend-desc">${tip}</span></div>`).join('')}
        </div>
      </div>
      <div class="ff-filter-sliders" id="ffFilterSliders"></div>
      <div class="ff-sort-row">
        <span class="ff-sort-label">Sort by:</span>
        <div class="seg-control ff-sort-control" id="ffSortPills"></div>
      </div>
    </div>

    <div class="ff-range-legend">
      <div class="ff-range-legend-item"><div class="ff-legend-range-sample"></div> Property range across varieties</div>
      <div class="ff-range-legend-item"><div class="ff-legend-threshold-sample"></div> Your threshold</div>
    </div>

    <div class="ff-results-header">
      <span class="ff-results-count" id="ffResultsCount"></span>
    </div>
    <div class="ff-results-list" id="ffResultsList"></div>
  `;

  // Build sliders
  document.getElementById('ffFilterSliders').innerHTML = FINDER_PROPS.map(p => `
    <div class="ff-filter-slider-group">
      <div class="ff-filter-slider-label">
        <span class="ff-filter-slider-name">${FINDER_PROP_LABELS[p]}</span>
        <span class="ff-filter-slider-value" id="ffVal_${p}">Any</span>
      </div>
      <div class="ff-filter-slider-track">
        <input type="range" min="0" max="100" step="5" value="0" id="ffSlider_${p}" oninput="ffUpdateFilter('${p}', this.value)">
      </div>
      <div class="ff-filter-slider-scale"><span>Any</span><span>50+</span><span>100</span></div>
    </div>
  `).join('');

  ffRenderSortPills();
  ffRenderResults();
}


// ═══════════════════════════════════════════════════════════════
// URL PARAMETER HANDLING
// ═══════════════════════════════════════════════════════════════

function handleUrlParams() {
  const params = new URLSearchParams(window.location.search);

  // planner.html?fiber=silk — open Needle & Thread with fiber pre-selected
  const fiberParam = params.get('fiber');
  if (fiberParam && FIBERS[fiberParam]) {
    // Switch to needle mode
    document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active'));
    const needleBtn = document.querySelector('.sidebar-mode-btn[data-mode="needle"]');
    if (needleBtn) needleBtn.classList.add('active');
    showView('needle');

    // Pre-select fiber
    const el = document.querySelector(`#needleFiberPicker .fiber-checkbox[data-fiber="${fiberParam}"]`);
    if (el) {
      el.classList.add('selected');
      selectedNeedleFiber = fiberParam;

      // Check for weight param
      const weightParam = params.get('weight');
      if (weightParam) needleWeightTab = weightParam;

      renderNeedleDetail();
    }
    return;
  }

  // ?project=aLineSkirt — open project detail in catalog
  const projectParam = params.get('project');
  if (projectParam) {
    const p = PROJECT_CATALOG.find(pr => pr.id === projectParam);
    if (p) {
      catalogProject = projectParam;
      catalogView = 'project';
      // Set audience to the first matching audience for back navigation
      catalogAudience = p.audiences[0] || null;
      renderCatalog();
      return;
    }
    return;
  }

  // ?audience=women — open a specific category
  const audienceParam = params.get('audience');
  if (audienceParam && PROJECT_AUDIENCES.find(a => a.key === audienceParam)) {
    catalogAudience = audienceParam;
    catalogView = 'category';
    renderCatalog();
    return;
  }

  // ?mode=seams or ?mode=interfacing
  const modeParam = params.get('mode');
  if (modeParam && MODE_INFO[modeParam]) {
    document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.sidebar-mode-btn[data-mode="${modeParam}"]`);
    if (btn) btn.classList.add('active');
    showView(modeParam);
    return;
  }

  // ?bottom=profile|people|stash — open sidebar bottom section
  const bottomParam = params.get('bottom');
  if (bottomParam === 'profile') {
    // Defer until pipeline code is loaded
    setTimeout(() => openGlobalProfile(), 0);
    return;
  }
  if (bottomParam === 'people' || bottomParam === 'stash') {
    setTimeout(() => {
      activatePipeline(0);
    }, 0);
    return;
  }
}


// ═══════════════════════════════════════════════════════════════
// PROJECT HOME — Landing page for the Projects tool
// ═══════════════════════════════════════════════════════════════

function renderProjectHome() {
  const wrap = document.getElementById('projectHomeContent');
  if (!wrap) return;
  const data = loadUserData();
  const plans = data.profile.savedPlans || [];
  const hasPipelineState = data.pipelineState && data.pipelineState.project;

  // Split plans into active and completed
  const activePlans = plans.filter(p => p.status !== 'complete');
  const completedPlans = plans.filter(p => p.status === 'complete');

  // Format a plan card
  function planCard(plan, showResume) {
    const proj = PROJECT_CATALOG.find(p => p.id === plan.project);
    const projName = proj ? proj.name : plan.project;
    const personName = plan.personName || 'You';
    const fiberName = FIBERS[plan.fiber] ? FIBERS[plan.fiber].name : plan.fiber;
    const varietyName = plan.variety || '';
    const dateStr = plan.createdAt || '';
    const statusLabel = plan.status === 'complete' ? 'Completed' : 'In Progress';
    const statusClass = plan.status === 'complete' ? 'pl-home-status-done' : 'pl-home-status-active';
    return `<div class="pl-home-plan-card" data-plan-id="${plan.id}">
      <div class="pl-home-plan-header">
        <span class="pl-home-plan-project">${projName}</span>
        <span class="pl-home-plan-status ${statusClass}">${statusLabel}</span>
      </div>
      <div class="pl-home-plan-meta">
        <span>${personName}</span>
        <span class="pl-home-plan-sep">·</span>
        <span>${fiberName}${varietyName ? ' — ' + varietyName : ''}</span>
        ${dateStr ? '<span class="pl-home-plan-sep">·</span><span>' + dateStr + '</span>' : ''}
      </div>
    </div>`;
  }

  // Current pipeline state card
  let currentProjectHtml = '';
  if (hasPipelineState) {
    const ps = data.pipelineState;
    const proj = ps.project ? PROJECT_CATALOG.find(p => p.id === ps.project) : null;
    const projName = proj ? proj.name : (ps.project || 'Untitled');
    const tabNames = ['Choose', 'Setup', 'Build', 'Complete'];
    const currentStep = tabNames[ps.currentTab] || 'Choose';
    currentProjectHtml = `
      <div class="pl-home-section">
        <div class="pl-home-section-title">Current Project</div>
        <div class="pl-home-current" onclick="activatePipeline(${ps.currentTab || 0})">
          <div class="pl-home-current-name">${projName}</div>
          <div class="pl-home-current-step">Step: ${currentStep}</div>
          <div class="pl-home-current-resume">Resume →</div>
        </div>
      </div>`;
  }

  // Active plans
  let activePlansHtml = '';
  if (activePlans.length > 0) {
    activePlansHtml = `
      <div class="pl-home-section">
        <div class="pl-home-section-title">Saved Projects</div>
        ${activePlans.map(p => planCard(p, true)).join('')}
      </div>`;
  }

  // Completed plans
  let completedPlansHtml = '';
  if (completedPlans.length > 0) {
    completedPlansHtml = `
      <div class="pl-home-section">
        <div class="pl-home-section-title">Completed</div>
        ${completedPlans.map(p => planCard(p, false)).join('')}
      </div>`;
  }

  // Empty state
  let emptyHtml = '';
  if (!hasPipelineState && plans.length === 0) {
    emptyHtml = `
      <div class="pl-home-empty">
        <p>No projects yet. Start one to get personalized fabric recommendations, construction guidance, and a step-by-step build walkthrough.</p>
      </div>`;
  }

  wrap.innerHTML = `
    <div class="pl-home">
      <div class="pl-home-header">
        <h2 class="pl-home-title">Your Projects</h2>
        <p class="pl-home-subtitle">Plan a sewing project from fabric selection through construction.</p>
      </div>
      <button class="pl-btn-primary pl-home-start-btn" id="plHomeStartBtn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Start New Project
      </button>
      ${currentProjectHtml}
      ${activePlansHtml}
      ${completedPlansHtml}
      ${emptyHtml}
      <div class="pl-home-section">
        <div class="pl-home-section-title">Browse Projects</div>
        <div id="catalogContent"></div>
      </div>
    </div>
  `;

  // Wire up Start New button
  document.getElementById('plHomeStartBtn').addEventListener('click', () => {
    plReset();
    activatePipeline(0);
  });

  // Render catalog grid inside home
  renderCatalog();
}

// ═══════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════

initModes();
renderProjectHome();
renderNeedlePicker();
renderSeamFinder();
renderInterfacingGuide();
renderYardageEstimator();
renderTroubleshooter();
handleUrlParams();

// ── Onboarding trigger on first run ──
if (!loadUserData().profile.onboarded) setTimeout(() => startOnboarding(), 100);

// ═══════════════════════════════════════════════════════════════
// PIPELINE — Choose, Setup, Build, Complete
// ═══════════════════════════════════════════════════════════════

const PL_VIEW_IDS = ['plPanel-0','plPanel-1','plPanel-2','plPanel-3'];
let plCurrentTab = 0;
const plCompletedTabs = new Set();
let plActive = false;
let plSelectedPerson = null;
let plSelectedProject = null;
let plSelectedFabric = null;
let plSetupState = {};
let plBuildCompletedSteps = new Set();
let plBuildCompletedSubsteps = new Set();
let plBuildStepNotes = {};
let plProjectNotes = '';
let plCompletionFinalized = false;
let plWeightOverrides = {}; // { projectId: { prop: weight, ... } } — ephemeral, not persisted

// ── Save current pipeline state to localStorage ──
function plSaveCurrentState() {
  const data = loadUserData();
  savePipelineState(data, {
    currentTab: plCurrentTab,
    completedTabs: [...plCompletedTabs],
    active: plActive,
    person: plSelectedPerson,
    project: plSelectedProject,
    fabric: plSelectedFabric,
    setup: plSetupState,
    buildSteps: [...plBuildCompletedSteps],
    buildSubsteps: [...plBuildCompletedSubsteps],
    buildNotes: plBuildStepNotes,
    projectNotes: plProjectNotes,
    finalized: plCompletionFinalized
  });
}

// ── Activate / Deactivate pipeline ──
function activatePipeline(tab) {
  plActive = true;
  if (gpActive) closeGlobalProfile();
  if (peopleSaActive) closePeopleEditor();
  if (stashSaActive) closeStashEditor();
  // Hide all regular views
  ALL_VIEW_IDS.forEach(id => document.getElementById(id).classList.remove('active'));
  // Deactivate sidebar mode buttons
  document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active'));
  // Show pipeline tabs
  document.getElementById('plTabs').style.display = 'flex';
  // Go to requested tab
  plGoToTab(tab || 0);
  // Update sidebar bottom active state
  updateSidebarBottom();
}

function deactivatePipeline() {
  plActive = false;
  document.getElementById('plTabs').style.display = 'none';
  PL_VIEW_IDS.forEach(id => document.getElementById(id).classList.remove('active'));
  document.querySelectorAll('.sidebar-bottom-btn').forEach(b => b.classList.remove('active'));
  // Keep state saved but mark inactive so init doesn't auto-resume
  const data = loadUserData();
  if (data.pipelineState) {
    data.pipelineState.active = false;
    saveUserData(data);
  }
}

function updateSidebarBottom() {
  document.querySelectorAll('.sidebar-bottom-btn').forEach(b => b.classList.remove('active'));
  if (gpActive) {
    document.getElementById('gpOpenBtn').classList.add('active');
  } else if (peopleSaActive) {
    document.querySelector('.sidebar-bottom-btn[data-bottom="people"]').classList.add('active');
  } else if (stashSaActive) {
    document.querySelector('.sidebar-bottom-btn[data-bottom="stash"]').classList.add('active');
  }
}

function plGoToTab(idx) {
  if (idx > plCurrentTab) plCompletedTabs.add(plCurrentTab);
  plCurrentTab = idx;
  PL_VIEW_IDS.forEach((id, i) => {
    document.getElementById(id).classList.toggle('active', i === idx);
  });
  document.querySelectorAll('#plTabs .pl-tab').forEach((t, i) => {
    t.classList.remove('active','completed');
    if (i === idx) t.classList.add('active');
    else if (plCompletedTabs.has(i)) t.classList.add('completed');
  });
  updateSidebarBottom();
  // Save state before render so a render crash can't lose the tab advance
  if (plActive) plSaveCurrentState();
  // Render panel content
  if (idx === 0) renderPipelineMatch();
  if (idx === 1) renderPipelineSetup();
  if (idx === 2) renderPipelineBuild();
  if (idx === 3) renderPipelineComplete();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Pipeline tab click listeners ──
document.querySelectorAll('#plTabs .pl-tab').forEach(t => {
  t.addEventListener('click', () => plGoToTab(parseInt(t.dataset.plTab)));
});

// ── Sidebar bottom button listeners ──
// All bottom button handling moved to shell.js (app-wide)
let peopleSaActive = false;
let stashSaActive = false;

function openPeopleEditor() {
  if (plActive) deactivatePipeline();
  if (gpActive) closeGlobalProfile();
  if (stashSaActive) closeStashEditor();
  document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active'));
  ALL_VIEW_IDS.forEach(id => document.getElementById(id).classList.remove('active'));
  document.getElementById('peopleSaView').classList.add('active');
  peopleSaActive = true;
  document.querySelectorAll('.sidebar-bottom-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.sidebar-bottom-btn[data-bottom="people"]').classList.add('active');
  renderProfileCards(loadUserData());
}

function closePeopleEditor() {
  document.getElementById('peopleSaView').classList.remove('active');
  peopleSaActive = false;
  document.querySelector('.sidebar-bottom-btn[data-bottom="people"]').classList.remove('active');
}

function openStashEditor() {
  if (plActive) deactivatePipeline();
  if (gpActive) closeGlobalProfile();
  if (peopleSaActive) closePeopleEditor();
  document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active'));
  ALL_VIEW_IDS.forEach(id => document.getElementById(id).classList.remove('active'));
  document.getElementById('stashSaView').classList.add('active');
  stashSaActive = true;
  document.querySelectorAll('.sidebar-bottom-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.sidebar-bottom-btn[data-bottom="stash"]').classList.add('active');
  renderStashView(loadUserData());
}

function closeStashEditor() {
  document.getElementById('stashSaView').classList.remove('active');
  stashSaActive = false;
  document.querySelector('.sidebar-bottom-btn[data-bottom="stash"]').classList.remove('active');
}

// Bottom button listeners removed — shell.js handles People/Stash/Profile app-wide

// ═══════════════════════════════════════════════════════════════
// GLOBAL PROFILE VIEW (full page — Profile / Tools / Ready)
// ═══════════════════════════════════════════════════════════════

let gpActive = false;
let gpCurrentSeg = 'profile';

function openGlobalProfile(seg) {
  // Deactivate pipeline if active
  if (plActive) deactivatePipeline();
  if (peopleSaActive) closePeopleEditor();
  if (stashSaActive) closeStashEditor();
  // Deactivate sidebar mode buttons
  document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active'));
  // Hide all regular views
  ALL_VIEW_IDS.forEach(id => document.getElementById(id).classList.remove('active'));
  // Show profile view
  document.getElementById('gpView').classList.add('active');
  gpActive = true;
  // Highlight sidebar profile button
  document.querySelectorAll('.sidebar-bottom-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('gpOpenBtn').classList.add('active');
  // Switch to requested segment
  gpSwitchSeg(seg || gpCurrentSeg || 'profile');
  // Render content
  renderGpProfile();
  renderGpTools();
  renderGpPlans();
}

function closeGlobalProfile() {
  document.getElementById('gpView').classList.remove('active');
  gpActive = false;
  document.getElementById('gpOpenBtn').classList.remove('active');
}

function gpSwitchSeg(seg) {
  gpCurrentSeg = seg;
  document.querySelectorAll('#gpSegControl .seg-btn').forEach(b => b.classList.toggle('active', b.dataset.gpSeg === seg));
  ['profile', 'tools', 'plans'].forEach(s => {
    const el = document.getElementById('gpSeg' + s.charAt(0).toUpperCase() + s.slice(1));
    if (el) el.style.display = s === seg ? '' : 'none';
  });
}

// Seg control click listeners
document.querySelectorAll('#gpSegControl .seg-btn').forEach(btn => {
  btn.addEventListener('click', () => gpSwitchSeg(btn.dataset.gpSeg));
});

// ── Profile Segment ──
function renderGpProfile() {
  const data = loadUserData();
  const prof = data.profile;
  const SKILL_LABELS = {beginner:'Beginner',intermediate:'Intermediate',advanced:'Advanced',expert:'Expert'};
  const SEWIST_TYPES = ['Quilter','Hobbyist','Tailor','Seamstress','Embroiderer'];
  const FIT_OPTIONS = [{k:'fitted',n:'Fitted'},{k:'standard',n:'Standard'},{k:'relaxed',n:'Relaxed'}];

  document.getElementById('gpSegProfile').innerHTML = `
    <div class="gp-section">
      <div class="gp-section-title">About You</div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">Name</div></div>
        <div class="pl-form-control"><input type="text" class="pl-select" id="gpName" value="${prof.name}"></div>
      </div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">I Am A</div><div class="pl-form-label-hint">Select all that apply</div></div>
        <div class="pl-form-control">
          <div class="pl-prefs" style="flex-wrap:wrap;" id="gpSewistTypes">
            ${SEWIST_TYPES.map(t => {
              const sel = (prof.sewistTypes || []).includes(t);
              return '<label class="pl-pref-tag" style="cursor:pointer;opacity:' + (sel ? 1 : 0.5) + ';"><input type="checkbox" class="gp-sewist-cb" data-val="' + t + '" ' + (sel ? 'checked' : '') + ' style="display:none;">' + t + '</label>';
            }).join('')}
          </div>
        </div>
      </div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">Skill Level</div></div>
        <div class="pl-form-control">
          <div class="pl-option-pills" id="gpSkillPills">
            ${['beginner','intermediate','advanced','expert'].map(s =>
              '<button class="pl-option-pill' + (prof.skill === s ? ' selected' : '') + '" data-val="' + s + '">' + SKILL_LABELS[s] + '</button>'
            ).join('')}
          </div>
        </div>
      </div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">Preferred Fit</div><div class="pl-form-label-hint">Adjusts ease calculations</div></div>
        <div class="pl-form-control">
          <div class="pl-option-pills" id="gpFitPills">
            ${FIT_OPTIONS.map(f =>
              '<button class="pl-option-pill' + ((prof.preferredFit || 'standard') === f.k ? ' selected' : '') + '" data-val="' + f.k + '">' + f.n + '</button>'
            ).join('')}
          </div>
        </div>
      </div>
      <div class="pl-form-row" style="border-bottom:none;">
        <div class="pl-form-label"><div class="pl-form-label-main">Tailor Mode</div><div class="pl-form-label-hint">Show all 14 measurements by default</div></div>
        <div class="pl-form-control">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.85rem;color:var(--ink);">
            <input type="checkbox" id="gpTailorMode" ${prof.tailorMode ? 'checked' : ''}>
            Enable Tailor Mode
          </label>
        </div>
      </div>
    </div>

    <div style="display:flex;gap:8px;margin-top:16px;">
      <button class="pl-btn-primary" style="flex:1;" id="gpSaveBtn">Save Profile</button>
    </div>

    <div class="gp-section" style="margin-top:20px;">
      <div class="gp-section-title">Data</div>
      <div style="display:flex;gap:8px;">
        <button class="pl-btn-secondary" style="flex:1;font-size:0.78rem;" id="gpExportBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Export All Data
        </button>
        <button class="pl-btn-secondary" style="flex:1;font-size:0.78rem;" id="gpImportBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Import Data
        </button>
        <input type="file" id="gpImportFile" accept=".json" style="display:none;">
      </div>
    </div>
  `;

  // Sewist type checkbox opacity toggle
  document.querySelectorAll('.gp-sewist-cb').forEach(cb => {
    cb.addEventListener('change', () => { cb.parentElement.style.opacity = cb.checked ? 1 : 0.5; });
  });

  // Skill pill toggle
  document.getElementById('gpSkillPills').querySelectorAll('.pl-option-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('gpSkillPills').querySelectorAll('.pl-option-pill').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Fit pill toggle
  document.getElementById('gpFitPills').querySelectorAll('.pl-option-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('gpFitPills').querySelectorAll('.pl-option-pill').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Save
  document.getElementById('gpSaveBtn').addEventListener('click', () => {
    const data = loadUserData();
    data.profile.name = document.getElementById('gpName').value.trim() || 'You';
    const skillBtn = document.querySelector('#gpSkillPills .pl-option-pill.selected');
    data.profile.skill = skillBtn ? skillBtn.dataset.val : 'intermediate';
    const fitBtn = document.querySelector('#gpFitPills .pl-option-pill.selected');
    data.profile.preferredFit = fitBtn ? fitBtn.dataset.val : 'standard';
    data.profile.tailorMode = document.getElementById('gpTailorMode').checked;

    // Collect sewist types
    const types = [];
    document.querySelectorAll('.gp-sewist-cb:checked').forEach(cb => types.push(cb.dataset.val));
    data.profile.sewistTypes = types;

    // Sync name to profiles[0] if it matches the default
    if (data.profiles[0] && (data.profiles[0].name === 'You' || data.profiles[0].name === data.profile.name)) {
      data.profiles[0].name = data.profile.name;
      data.profiles[0].avatar.letter = data.profile.name.charAt(0).toUpperCase();
    }

    saveUserData(data);
    renderGpProfile();
    renderPipelineProfile();
  });

  // Export/Import
  document.getElementById('gpExportBtn').addEventListener('click', () => {
    exportUserData(loadUserData());
  });
  document.getElementById('gpImportBtn').addEventListener('click', () => {
    document.getElementById('gpImportFile').click();
  });
  document.getElementById('gpImportFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    importUserData(file, () => {
      renderGpProfile();
      renderGpTools();
      renderPipelineProfile();
      alert('Data imported successfully!');
    });
    e.target.value = '';
  });
}

// ── Tools Segment ──
function renderGpTools() {
  const data = loadUserData();
  const prof = data.profile;
  const urls = prof.toolUrls || {};

  function toolRow(cat, label, items) {
    return `<div class="pl-form-row${cat === 'marking' ? '" style="border-bottom:none;' : ''}">
      <div class="pl-form-label"><div class="pl-form-label-main">${label}</div></div>
      <div class="pl-form-control">
        <div class="pl-prefs" style="flex-wrap:wrap;">
          ${items.map(t => {
            const checked = (prof.ownedTools?.[cat] || []).includes(t.k);
            const urlKey = cat + ':' + t.k;
            const urlVal = urls[urlKey] || '';
            return '<div class="gp-tool-item">' +
              '<label class="pl-pref-tag" style="cursor:pointer;opacity:' + (checked ? 1 : 0.5) + ';"><input type="checkbox" class="gp-tool-cb" data-tool-cat="' + cat + '" data-tool-key="' + t.k + '" ' + (checked ? 'checked' : '') + ' style="display:none;">' + t.n + '</label>' +
              '<div class="gp-tool-url-row" style="display:' + (checked ? 'flex' : 'none') + ';">' +
                '<input type="url" class="gp-tool-url" data-url-key="' + urlKey + '" placeholder="Product link…" value="' + urlVal + '">' +
                (urlVal ? '<a href="' + urlVal + '" target="_blank" rel="noopener" class="gp-tool-url-go" title="Open link">↗</a>' : '') +
              '</div>' +
            '</div>';
          }).join('')}
        </div>
      </div>
    </div>`;
  }

  const machineItems = Object.entries(MACHINE_TYPES).map(([key, m]) => ({k: key, n: m.icon + ' ' + m.name}));

  document.getElementById('gpSegTools').innerHTML = `
    <div class="gp-section">
      <div class="gp-section-title">My Tools</div>
      ${toolRow('machines', 'Machines', machineItems)}
      ${toolRow('cutting', 'Cutting', [{k:'shears',n:'Fabric Shears'},{k:'rotary',n:'Rotary Cutter'},{k:'pinking',n:'Pinking Shears'},{k:'snips',n:'Thread Snips'},{k:'ripper',n:'Seam Ripper'}])}
      ${toolRow('measuring', 'Measuring', [{k:'tape',n:'Tape Measure'},{k:'ruler',n:'Acrylic Ruler'},{k:'gauge',n:'Seam Gauge'},{k:'curve',n:'French Curve'}])}
      ${toolRow('pressing', 'Pressing', [{k:'iron',n:'Steam Iron'},{k:'ham',n:'Pressing Ham'},{k:'sleeveboard',n:'Sleeve Board'},{k:'clapper',n:'Clapper'}])}
      ${toolRow('marking', 'Marking', [{k:'chalk',n:"Tailor's Chalk"},{k:'inkpens',n:'Disappearing Ink Pens'},{k:'tracing',n:'Tracing Wheel'},{k:'pins',n:'Pins & Clips'}])}
    </div>

    <div style="display:flex;gap:8px;margin-top:16px;">
      <button class="pl-btn-primary" style="flex:1;" id="gpSaveToolsBtn">Save Tools</button>
    </div>
  `;

  // Tool checkbox visual toggle + show/hide URL input
  document.getElementById('gpSegTools').querySelectorAll('.gp-tool-cb').forEach(cb => {
    cb.addEventListener('change', () => {
      cb.closest('.pl-pref-tag').style.opacity = cb.checked ? '1' : '0.5';
      const urlRow = cb.closest('.gp-tool-item').querySelector('.gp-tool-url-row');
      if (urlRow) urlRow.style.display = cb.checked ? 'flex' : 'none';
    });
  });

  // Save tools
  document.getElementById('gpSaveToolsBtn').addEventListener('click', () => {
    const data = loadUserData();
    const ownedTools = { machines: [], cutting: [], measuring: [], pressing: [], marking: [] };
    document.getElementById('gpSegTools').querySelectorAll('.gp-tool-cb:checked').forEach(cb => {
      const cat = cb.dataset.toolCat;
      if (ownedTools[cat]) ownedTools[cat].push(cb.dataset.toolKey);
    });
    data.profile.ownedTools = ownedTools;
    // Save tool URLs
    const toolUrls = {};
    document.getElementById('gpSegTools').querySelectorAll('.gp-tool-url').forEach(input => {
      const val = input.value.trim();
      if (val) toolUrls[input.dataset.urlKey] = val;
    });
    data.profile.toolUrls = toolUrls;
    saveUserData(data);
    renderGpTools();
  });
}

// ── Plans Segment ──
let gpPlansFilter = 'all';
let gpPlansDetailId = null;

function renderGpPlans() {
  const data = loadUserData();
  const plans = data.profile.savedPlans || [];
  const favs = data.profile.favoriteProjects || [];

  // Filter
  const filtered = gpPlansFilter === 'all' ? plans
    : plans.filter(p => p.status === gpPlansFilter);

  // Stats
  const inProgress = plans.filter(p => p.status === 'in-progress').length;
  const complete = plans.filter(p => p.status === 'complete').length;

  const panel = document.getElementById('gpSegPlans');

  // Detail view
  if (gpPlansDetailId) {
    const plan = plans.find(p => p.id === gpPlansDetailId);
    if (!plan) { gpPlansDetailId = null; renderGpPlans(); return; }
    renderPlanDetail(panel, plan, data);
    return;
  }

  // List view
  panel.innerHTML = `
    <div class="gp-section" style="padding-bottom:8px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <div class="gp-section-title" style="margin-bottom:0;">My Plans</div>
        <div style="font-size:0.72rem;color:var(--ink-faint);">${plans.length} plan${plans.length !== 1 ? 's' : ''}</div>
      </div>
      <div class="pl-option-pills gp-plans-filters" style="margin-bottom:4px;">
        <button class="pl-option-pill${gpPlansFilter === 'all' ? ' selected' : ''}" data-pf="all">All (${plans.length})</button>
        <button class="pl-option-pill${gpPlansFilter === 'in-progress' ? ' selected' : ''}" data-pf="in-progress">In Progress (${inProgress})</button>
        <button class="pl-option-pill${gpPlansFilter === 'complete' ? ' selected' : ''}" data-pf="complete">Complete (${complete})</button>
      </div>
    </div>

    ${filtered.length === 0 ? `
      <div class="gp-section" style="text-align:center;padding:32px 16px;">
        <div style="font-size:2rem;margin-bottom:8px;">📋</div>
        <div style="font-size:0.88rem;font-weight:600;color:var(--ink);margin-bottom:4px;">${plans.length === 0 ? 'No plans yet' : 'No ' + gpPlansFilter + ' plans'}</div>
        <div style="font-size:0.78rem;color:var(--ink-light);">Complete a project in the pipeline to save your first plan</div>
      </div>
    ` : `
      <div class="gp-plans-list">
        ${filtered.map(plan => {
          const project = PROJECT_CATALOG.find(p => p.id === plan.projectId);
          const fiber = FIBERS[plan.fiber];
          const person = data.profiles.find(p => p.id === plan.personId);
          const statusColor = plan.status === 'complete' ? 'var(--green)' : 'var(--accent)';
          const statusIcon = plan.status === 'complete' ? '✓' : '▶';
          const isFav = favs.includes(plan.projectId);
          const patternBadge = plan.pattern ? '<span class="gp-plan-badge">PDF</span>' : '';
          const notesBadge = plan.notes ? '<span class="gp-plan-badge">Notes</span>' : '';
          return `
            <div class="gp-plan-card" data-plan-id="${plan.id}">
              <div class="gp-plan-status" style="color:${statusColor};">${statusIcon}</div>
              <div class="gp-plan-body">
                <div class="gp-plan-title">${project?.name || 'Unknown Project'}${isFav ? ' <span style="color:#e07050;">♥</span>' : ''}</div>
                <div class="gp-plan-meta">${fiber?.name || '?'} · For ${person?.name || '?'} · ${plan.size ? plan.size.toUpperCase() : '?'}</div>
                <div class="gp-plan-meta">${plan.createdAt || ''} ${patternBadge} ${notesBadge}</div>
              </div>
              <div class="gp-plan-arrow">›</div>
            </div>`;
        }).join('')}
      </div>
    `}

    ${favs.length > 0 ? `
      <div class="gp-section" style="margin-top:12px;">
        <div class="gp-section-title">Favorite Projects</div>
        <div class="gp-plans-favs">
          ${favs.map(fid => {
            const proj = PROJECT_CATALOG.find(p => p.id === fid);
            return proj ? '<span class="gp-fav-chip" data-fav-id="' + fid + '">' + proj.name + ' <span class="gp-fav-remove" data-fav-rm="' + fid + '">×</span></span>' : '';
          }).join('')}
        </div>
      </div>
    ` : ''}

    <div class="gp-section" style="margin-top:12px;">
      <div class="gp-section-title">Coming Soon</div>
      <div class="gp-ready-list">
        <div class="gp-ready-item">
          <div class="gp-ready-icon">🔧</div>
          <div>
            <div class="gp-ready-name">Machine Details</div>
            <div class="gp-ready-desc">Log machine models, presser feet, and maintenance schedules</div>
          </div>
        </div>
        <div class="gp-ready-item">
          <div class="gp-ready-icon">📊</div>
          <div>
            <div class="gp-ready-name">Sewing Stats</div>
            <div class="gp-ready-desc">Track projects completed, fabrics used, and growth over time</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Filter pill listeners
  panel.querySelectorAll('.gp-plans-filters .pl-option-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      gpPlansFilter = btn.dataset.pf;
      renderGpPlans();
    });
  });

  // Card click → detail view
  panel.querySelectorAll('.gp-plan-card').forEach(card => {
    card.addEventListener('click', () => {
      gpPlansDetailId = card.dataset.planId;
      renderGpPlans();
    });
  });

  // Favorite remove
  panel.querySelectorAll('.gp-fav-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const data = loadUserData();
      data.profile.favoriteProjects = (data.profile.favoriteProjects || []).filter(id => id !== btn.dataset.favRm);
      saveUserData(data);
      renderGpPlans();
    });
  });
}

function renderPlanDetail(panel, plan, data) {
  const project = PROJECT_CATALOG.find(p => p.id === plan.projectId);
  const fiber = FIBERS[plan.fiber];
  const person = data.profiles.find(p => p.id === plan.personId);
  const statusColor = plan.status === 'complete' ? 'var(--green)' : 'var(--accent)';

  panel.innerHTML = `
    <div style="margin-bottom:12px;">
      <button class="pl-btn-secondary" id="gpPlanBack" style="font-size:0.78rem;padding:6px 12px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="15 18 9 12 15 6"/></svg>
        All Plans
      </button>
    </div>

    <div class="gp-section">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;">
        <div>
          <div style="font-size:1rem;font-weight:700;color:var(--ink);margin-bottom:2px;">${project?.name || 'Unknown Project'}</div>
          <div style="font-size:0.78rem;color:${statusColor};font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">${plan.status === 'complete' ? '✓ Complete' : '▶ In Progress'}</div>
        </div>
        <button class="pl-btn-secondary gp-plan-status-toggle" style="font-size:0.72rem;padding:4px 10px;">
          ${plan.status === 'complete' ? 'Mark In Progress' : 'Mark Complete'}
        </button>
      </div>
    </div>

    <div class="gp-section">
      <div class="gp-section-title">Details</div>
      <div class="gp-plan-detail-row"><span class="gp-plan-detail-label">Fabric</span><span>${fiber?.name || '?'}${plan.variety ? ' · ' + plan.variety : ''}</span></div>
      <div class="gp-plan-detail-row"><span class="gp-plan-detail-label">For</span><span>${person?.name || '?'}</span></div>
      <div class="gp-plan-detail-row"><span class="gp-plan-detail-label">Size</span><span>${plan.size ? plan.size.toUpperCase() : '—'}</span></div>
      <div class="gp-plan-detail-row"><span class="gp-plan-detail-label">Width</span><span>${plan.width ? plan.width + '"' : '—'}</span></div>
      <div class="gp-plan-detail-row"><span class="gp-plan-detail-label">Yardage</span><span>${plan.yardage ? plan.yardage.toFixed(2) + ' yd' : '—'}</span></div>
      <div class="gp-plan-detail-row"><span class="gp-plan-detail-label">Created</span><span>${plan.createdAt || '—'}</span></div>
      ${plan.completedAt ? '<div class="gp-plan-detail-row"><span class="gp-plan-detail-label">Completed</span><span>' + plan.completedAt + '</span></div>' : ''}
    </div>

    <div class="gp-section">
      <div class="gp-section-title">Pattern</div>
      ${plan.pattern ? `
        <div class="gp-plan-pattern-info">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span style="font-size:0.85rem;font-weight:600;color:var(--ink);">${plan.pattern.name}</span>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="pl-btn-secondary gp-plan-view-pattern" style="font-size:0.72rem;flex:1;">View Pattern</button>
            <button class="pl-btn-secondary gp-plan-remove-pattern" style="font-size:0.72rem;color:var(--red);">Remove</button>
          </div>
        </div>
      ` : `
        <div style="text-align:center;padding:16px 0;">
          <label class="pl-btn-secondary" style="cursor:pointer;font-size:0.78rem;display:inline-flex;align-items:center;gap:6px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Upload PDF Pattern
            <input type="file" accept=".pdf,image/*" id="gpPatternUpload" style="display:none;">
          </label>
          <div style="font-size:0.72rem;color:var(--ink-faint);margin-top:6px;">PDF or image up to 5 MB</div>
        </div>
      `}
    </div>

    <div class="gp-section">
      <div class="gp-section-title">Notes</div>
      <textarea class="pl-select gp-plan-notes" rows="4" placeholder="Add notes about this project — modifications, fit adjustments, things to remember...">${plan.notes || ''}</textarea>
      <button class="pl-btn-primary gp-plan-save-notes" style="margin-top:8px;font-size:0.78rem;width:100%;">Save Notes</button>
    </div>

    ${plan.buildNotes && Object.keys(plan.buildNotes).length > 0 ? `
    <div class="gp-section">
      <div class="gp-section-title">Build Journal</div>
      <div style="font-size:0.76rem;color:var(--ink-light);margin-bottom:8px;">Notes captured during the build</div>
      ${Object.entries(plan.buildNotes).sort((a,b) => parseInt(a[0]) - parseInt(b[0])).map(([stepNum, note]) => {
        const construction = project?.construction || [];
        const stepIdx = parseInt(stepNum) - 1;
        const stepEl = construction[stepIdx];
        const stepName = stepEl ? (typeof stepEl === 'string' ? stepEl : stepEl.step || stepEl.name || 'Step ' + stepNum) : 'Step ' + stepNum;
        return `<div class="pl-journal-entry">
          <div class="pl-journal-step">Step ${stepNum} · ${stepName}</div>
          <div class="pl-journal-note">${note}</div>
        </div>`;
      }).join('')}
    </div>` : ''}

    <div style="margin-top:16px;text-align:center;">
      <button class="pl-btn-secondary gp-plan-delete" style="font-size:0.72rem;color:var(--red);border-color:var(--red);">Delete Plan</button>
    </div>
  `;

  // Back
  document.getElementById('gpPlanBack').addEventListener('click', () => {
    gpPlansDetailId = null;
    renderGpPlans();
  });

  // Status toggle
  panel.querySelector('.gp-plan-status-toggle').addEventListener('click', () => {
    const d = loadUserData();
    const p = d.profile.savedPlans.find(sp => sp.id === plan.id);
    if (p) {
      p.status = p.status === 'complete' ? 'in-progress' : 'complete';
      p.completedAt = p.status === 'complete' ? new Date().toISOString().split('T')[0] : null;
      saveUserData(d);
      renderGpPlans();
    }
  });

  // Save notes
  panel.querySelector('.gp-plan-save-notes').addEventListener('click', () => {
    const d = loadUserData();
    const p = d.profile.savedPlans.find(sp => sp.id === plan.id);
    if (p) {
      p.notes = panel.querySelector('.gp-plan-notes').value.trim();
      saveUserData(d);
      const btn = panel.querySelector('.gp-plan-save-notes');
      btn.textContent = 'Saved ✓';
      setTimeout(() => btn.textContent = 'Save Notes', 1500);
    }
  });

  // Pattern upload
  const uploadInput = document.getElementById('gpPatternUpload');
  if (uploadInput) {
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { alert('File too large. Max 5 MB.'); return; }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const d = loadUserData();
        const p = d.profile.savedPlans.find(sp => sp.id === plan.id);
        if (p) {
          p.pattern = { name: file.name, data: ev.target.result, type: file.type };
          saveUserData(d);
          renderGpPlans();
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // View pattern
  const viewBtn = panel.querySelector('.gp-plan-view-pattern');
  if (viewBtn) {
    viewBtn.addEventListener('click', () => {
      if (plan.pattern && plan.pattern.data) {
        const w = window.open('');
        if (plan.pattern.type === 'application/pdf') {
          w.document.write('<iframe src="' + plan.pattern.data + '" style="width:100%;height:100%;border:none;"></iframe>');
        } else {
          w.document.write('<img src="' + plan.pattern.data + '" style="max-width:100%;height:auto;">');
        }
      }
    });
  }

  // Remove pattern
  const removeBtn = panel.querySelector('.gp-plan-remove-pattern');
  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      if (confirm('Remove pattern from this plan?')) {
        const d = loadUserData();
        const p = d.profile.savedPlans.find(sp => sp.id === plan.id);
        if (p) { p.pattern = null; saveUserData(d); renderGpPlans(); }
      }
    });
  }

  // Delete plan
  panel.querySelector('.gp-plan-delete').addEventListener('click', () => {
    if (confirm('Delete this plan? This cannot be undone.')) {
      const d = loadUserData();
      d.profile.savedPlans = d.profile.savedPlans.filter(sp => sp.id !== plan.id);
      saveUserData(d);
      gpPlansDetailId = null;
      renderGpPlans();
    }
  });
}

// ── Override sidebar mode buttons to deactivate pipeline ──
document.querySelectorAll('.sidebar-mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (plActive) deactivatePipeline();
    if (gpActive) closeGlobalProfile();
  });
});

// ═══════════════════════════════════════════════════════════════
// ONBOARDING WIZARD
// ═══════════════════════════════════════════════════════════════

let obStep = 0;
const OB_STEPS = ['welcome','identity','skills','tools','done'];
const SEWIST_TYPES_OB = ['Quilter','Hobbyist','Tailor','Seamstress','Embroiderer'];
const SKILL_LABELS_OB = {beginner:'Beginner',intermediate:'Intermediate',advanced:'Advanced',expert:'Expert'};
const FIT_OPTIONS_OB = [{k:'fitted',n:'Fitted'},{k:'standard',n:'Standard'},{k:'relaxed',n:'Relaxed'}];

function startOnboarding() {
  obStep = 0;
  openGlobalProfile('profile');
  // Hide seg control during onboarding
  document.getElementById('gpSegControl').style.display = 'none';
  renderOnboardingStep();
}

function renderOnboardingStep() {
  const panel = document.getElementById('gpSegProfile');
  const step = OB_STEPS[obStep];
  const dots = OB_STEPS.map((s,i) => '<span class="ob-dot' + (i === obStep ? ' active' : i < obStep ? ' done' : '') + '"></span>').join('');
  const progress = '<div class="ob-dots">' + dots + '</div>';

  if (step === 'welcome') {
    panel.innerHTML = `
      <div class="ob-card">
        <div class="ob-emoji">🧵</div>
        <h2 class="ob-heading">Welcome to Natural Fabrics Guide</h2>
        <p class="ob-text">Let's set up your sewist profile. This takes about a minute and helps personalize your experience across all tools.</p>
        ${progress}
        <button class="pl-btn-primary ob-next" id="obNext">Get Started</button>
      </div>`;
  } else if (step === 'identity') {
    panel.innerHTML = `
      <div class="ob-card">
        <h2 class="ob-heading">About You</h2>
        <div class="ob-field">
          <label class="ob-label">What should we call you?</label>
          <input type="text" class="pl-select" id="obName" placeholder="Your name" value="">
        </div>
        <div class="ob-field">
          <label class="ob-label">What kind of sewing do you do?</label>
          <div class="ob-hint">Select all that apply</div>
          <div class="pl-prefs" style="flex-wrap:wrap;" id="obSewistTypes">
            ${SEWIST_TYPES_OB.map(t =>
              '<label class="pl-pref-tag" style="cursor:pointer;opacity:0.5;"><input type="checkbox" class="ob-type-cb" data-val="' + t + '" style="display:none;">' + t + '</label>'
            ).join('')}
          </div>
        </div>
        ${progress}
        <div class="ob-nav">
          <button class="pl-btn-secondary ob-back" id="obBack">Back</button>
          <button class="pl-btn-primary ob-next" id="obNext">Continue</button>
        </div>
      </div>`;
    document.querySelectorAll('.ob-type-cb').forEach(cb => {
      cb.addEventListener('change', () => { cb.parentElement.style.opacity = cb.checked ? 1 : 0.5; });
    });
  } else if (step === 'skills') {
    panel.innerHTML = `
      <div class="ob-card">
        <h2 class="ob-heading">Your Experience</h2>
        <div class="ob-field">
          <label class="ob-label">Skill Level</label>
          <div class="pl-option-pills" id="obSkillPills">
            ${['beginner','intermediate','advanced','expert'].map(s =>
              '<button class="pl-option-pill' + (s === 'intermediate' ? ' selected' : '') + '" data-val="' + s + '">' + SKILL_LABELS_OB[s] + '</button>'
            ).join('')}
          </div>
        </div>
        <div class="ob-field">
          <label class="ob-label">Preferred Fit</label>
          <div class="ob-hint">How you like your garments to fit</div>
          <div class="pl-option-pills" id="obFitPills">
            ${FIT_OPTIONS_OB.map(f =>
              '<button class="pl-option-pill' + (f.k === 'standard' ? ' selected' : '') + '" data-val="' + f.k + '">' + f.n + '</button>'
            ).join('')}
          </div>
        </div>
        <div class="ob-field">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.85rem;color:var(--ink);">
            <input type="checkbox" id="obTailorMode">
            <span><strong>Tailor Mode</strong> — Show all 14 measurements by default when editing people</span>
          </label>
        </div>
        ${progress}
        <div class="ob-nav">
          <button class="pl-btn-secondary ob-back" id="obBack">Back</button>
          <button class="pl-btn-primary ob-next" id="obNext">Continue</button>
        </div>
      </div>`;
    document.getElementById('obSkillPills').querySelectorAll('.pl-option-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('obSkillPills').querySelectorAll('.pl-option-pill').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    document.getElementById('obFitPills').querySelectorAll('.pl-option-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('obFitPills').querySelectorAll('.pl-option-pill').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  } else if (step === 'tools') {
    const toolCats = [
      {cat:'machines', label:'Machines', items: Object.entries(MACHINE_TYPES).map(([k,m]) => ({k, n: m.icon + ' ' + m.name}))},
      {cat:'cutting', label:'Cutting', items: [{k:'shears',n:'Fabric Shears'},{k:'rotary',n:'Rotary Cutter'},{k:'pinking',n:'Pinking Shears'},{k:'snips',n:'Thread Snips'},{k:'ripper',n:'Seam Ripper'}]},
      {cat:'measuring', label:'Measuring', items: [{k:'tape',n:'Tape Measure'},{k:'ruler',n:'Acrylic Ruler'},{k:'gauge',n:'Seam Gauge'},{k:'curve',n:'French Curve'}]},
      {cat:'pressing', label:'Pressing', items: [{k:'iron',n:'Steam Iron'},{k:'ham',n:'Pressing Ham'},{k:'sleeve',n:'Sleeve Board'},{k:'clapper',n:'Clapper'}]},
      {cat:'marking', label:'Marking', items: [{k:'chalk',n:'Tailor\'s Chalk'},{k:'pens',n:'Disappearing Ink'},{k:'wheel',n:'Tracing Wheel'},{k:'pins',n:'Pins & Clips'}]}
    ];
    panel.innerHTML = `
      <div class="ob-card">
        <h2 class="ob-heading">Your Tools</h2>
        <p class="ob-text" style="margin-bottom:12px;">Check the tools you own. This helps with project recommendations.</p>
        ${toolCats.map(c => `
          <div class="ob-field" style="margin-bottom:8px;">
            <label class="ob-label" style="margin-bottom:4px;">${c.label}</label>
            <div class="pl-prefs" style="flex-wrap:wrap;">
              ${c.items.map(t =>
                '<label class="pl-pref-tag" style="cursor:pointer;opacity:0.5;"><input type="checkbox" class="ob-tool-cb" data-cat="' + c.cat + '" data-key="' + t.k + '" style="display:none;">' + t.n + '</label>'
              ).join('')}
            </div>
          </div>
        `).join('')}
        ${progress}
        <div class="ob-nav">
          <button class="pl-btn-secondary ob-back" id="obBack">Back</button>
          <button class="pl-btn-primary ob-next" id="obNext">Finish Setup</button>
        </div>
      </div>`;
    document.querySelectorAll('.ob-tool-cb').forEach(cb => {
      cb.addEventListener('change', () => { cb.parentElement.style.opacity = cb.checked ? 1 : 0.5; });
    });
  } else if (step === 'done') {
    const data = loadUserData();
    panel.innerHTML = `
      <div class="ob-card" style="text-align:center;">
        <div class="ob-emoji">✨</div>
        <h2 class="ob-heading">You're All Set, ${data.profile.name}!</h2>
        <p class="ob-text">Your profile is ready. Next, add people you sew for in the People tab, and add fabrics to your Stash.</p>
        ${progress}
        <button class="pl-btn-primary ob-next" id="obNext">Go to My Profile</button>
      </div>`;
  }

  // Wire nav buttons
  const nextBtn = document.getElementById('obNext');
  const backBtn = document.getElementById('obBack');
  if (nextBtn) nextBtn.addEventListener('click', () => obAdvance());
  if (backBtn) backBtn.addEventListener('click', () => { obStep--; renderOnboardingStep(); });
}

function obAdvance() {
  const step = OB_STEPS[obStep];

  // Save data from current step
  if (step === 'identity') {
    const data = loadUserData();
    const name = document.getElementById('obName').value.trim() || 'You';
    data.profile.name = name;
    const types = [];
    document.querySelectorAll('.ob-type-cb:checked').forEach(cb => types.push(cb.dataset.val));
    data.profile.sewistTypes = types;
    // Sync to profiles[0]
    if (data.profiles[0]) {
      data.profiles[0].name = name;
      data.profiles[0].avatar.letter = name.charAt(0).toUpperCase();
    }
    saveUserData(data);
  } else if (step === 'skills') {
    const data = loadUserData();
    const skillBtn = document.querySelector('#obSkillPills .pl-option-pill.selected');
    data.profile.skill = skillBtn ? skillBtn.dataset.val : 'intermediate';
    const fitBtn = document.querySelector('#obFitPills .pl-option-pill.selected');
    data.profile.preferredFit = fitBtn ? fitBtn.dataset.val : 'standard';
    data.profile.tailorMode = document.getElementById('obTailorMode').checked;
    saveUserData(data);
  } else if (step === 'tools') {
    const data = loadUserData();
    const tools = { machines: [], cutting: [], measuring: [], pressing: [], marking: [] };
    document.querySelectorAll('.ob-tool-cb:checked').forEach(cb => {
      const cat = cb.dataset.cat;
      if (tools[cat]) tools[cat].push(cb.dataset.key);
    });
    data.profile.ownedTools = tools;
    data.profile.onboarded = true;
    saveUserData(data);
  } else if (step === 'done') {
    // Finish: show regular profile view
    document.getElementById('gpSegControl').style.display = '';
    renderGpProfile();
    renderGpTools();
    renderGpPlans();
    renderPipelineProfile();
    return;
  }

  obStep++;
  renderOnboardingStep();
}

// ── Pipeline navigation buttons ──
document.getElementById('plMatchBackBtn').addEventListener('click', () => {
  deactivatePipeline();
  showHome();
});
document.getElementById('plToSetupBtn').addEventListener('click', () => plGoToTab(1));
document.getElementById('plSetupBackBtn').addEventListener('click', () => plGoToTab(0));
document.getElementById('plToBuildBtn').addEventListener('click', () => plGoToTab(2));
document.getElementById('plBuildBackBtn').addEventListener('click', () => plGoToTab(1));
document.getElementById('plPrintBuildBtn').addEventListener('click', plPrintProject);
document.getElementById('plToCompleteBtn').addEventListener('click', () => plGoToTab(3));

// ── Profile tab switching ──
function switchPlProfileTab(which) {
  document.querySelectorAll('#plProfileTabs .pl-profile-tab').forEach(t => t.classList.remove('active'));
  if (which === 'stash') {
    document.querySelectorAll('#plProfileTabs .pl-profile-tab')[1].classList.add('active');
    document.getElementById('plProfileView').style.display = 'none';
    document.getElementById('plStashView').style.display = '';
  } else {
    document.querySelectorAll('#plProfileTabs .pl-profile-tab')[0].classList.add('active');
    document.getElementById('plProfileView').style.display = '';
    document.getElementById('plStashView').style.display = 'none';
  }
  updateSidebarBottom();
}

document.querySelectorAll('#plProfileTabs .pl-profile-tab').forEach(t => {
  t.addEventListener('click', () => switchPlProfileTab(t.dataset.plProfile));
});

// ── Match tab switching ──
document.querySelectorAll('#plMatchTabs .pl-profile-tab').forEach(t => {
  t.addEventListener('click', () => {
    const idx = parseInt(t.dataset.match);
    document.querySelectorAll('#plMatchTabs .pl-profile-tab').forEach((mt, i) => mt.classList.toggle('active', i === idx));
    for (let i = 0; i < 3; i++) document.getElementById('plMatchView-' + i).style.display = (i === idx) ? '' : 'none';
  });
});

// ── Data export/import ──
document.getElementById('plExportBtn').addEventListener('click', () => {
  const data = loadUserData();
  exportUserData(data);
});

document.getElementById('plImportBtn').addEventListener('click', () => {
  document.getElementById('plImportFile').click();
});

document.getElementById('plImportFile').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  importUserData(file, () => {
    renderPipelineProfile();
    alert('Data imported successfully!');
  });
  e.target.value = '';
});

// ═══════════════════════════════════════════════════════════════
// RENDER: PROFILE & STASH (Panel 0)
// ═══════════════════════════════════════════════════════════════

function renderPipelineProfile() {
  const data = loadUserData();
  renderProfileCards(data);
  renderStashView(data);
}

// ── Measurement label formatting ──
function plMeasLabel(key) {
  const labels = { bust: 'Bust', highBust: 'High Bust', waist: 'Waist', hips: 'Hips', shoulder: 'Shoulder', inseam: 'Inseam', armLength: 'Arm Length', upperArm: 'Upper Arm', neck: 'Neck', frontWaistLength: 'Front Waist Length', crotchDepth: 'Crotch Depth', thigh: 'Thigh', knee: 'Knee', calf: 'Calf' };
  return labels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
}

// ── People view state ──
let plPeopleDrilledGroup = null; // group id if drilled into a group, null otherwise

function renderProfileCards(data) {
  const listEl = document.getElementById('plPeopleList');
  const detailEl = document.getElementById('plProfileView');
  if (!listEl || !detailEl) return;

  const selectedId = detailEl.dataset.selectedPerson || (data.profiles[0] && data.profiles[0].id) || null;
  const AGE_LABELS = {adult:'Adult',teen:'Teen',child:'Child',baby:'Baby'};
  const groups = data.groups || [];
  const tailorMode = data.profile && data.profile.tailorMode;

  // ── Build left panel ──
  if (plPeopleDrilledGroup) {
    plRenderGroupDrillIn(listEl, data, plPeopleDrilledGroup, selectedId);
  } else {
    plRenderPeopleList(listEl, data, groups, selectedId, tailorMode);
  }

  // ── Build right panel (person detail) ──
  const p = data.profiles.find(pr => pr.id === selectedId);
  if (p) {
    plRenderPersonDetail(detailEl, data, p, groups);
  } else {
    detailEl.innerHTML = '<div class="pl-people-empty"><div class="pl-people-empty-icon">👤</div><div class="pl-people-empty-title">Select a person</div><div class="pl-people-empty-text">Choose someone from the list to view their measurements, preferences, and project history.</div></div>';
  }

  detailEl.dataset.selectedPerson = selectedId;
}

function plRenderPeopleList(listEl, data, groups, selectedId, showGroups) {
  const AGE_LABELS = {adult:'Adult',teen:'Teen',child:'Child',baby:'Baby'};
  const addSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="12" height="12"><path d="M12 5v14M5 12h14"/></svg>';

  let html = '<div class="pl-people-list-hdr"><span class="pl-people-list-title">People</span></div>';

  // Groups section (if any exist or tailorMode)
  if (groups.length > 0 || showGroups) {
    html += '<div class="pl-people-sec-hdr"><span class="pl-people-sec-label">Groups</span>';
    html += '<button class="pl-people-sec-add" title="New group" data-action="new-group">' + addSvg + '</button></div>';
    groups.forEach(g => {
      const memberCount = (g.memberIds || []).length;
      const projCount = (g.projects || []).length;
      const meta = [memberCount + ' people', projCount ? projCount + ' project' + (projCount > 1 ? 's' : '') : ''].filter(Boolean).join(' · ');
      html += '<div class="pl-people-gi" data-group-id="' + g.id + '">';
      html += '<div class="pl-people-gi-icon">' + (g.icon || '📋') + '</div>';
      html += '<div class="pl-people-gi-info"><div class="pl-people-gi-name">' + g.name + '</div>';
      html += '<div class="pl-people-gi-meta">' + meta + '</div></div>';
      html += '<span class="pl-people-gi-chev">▶</span></div>';
    });
  }

  // People section
  html += '<div class="pl-people-sec-hdr"><span class="pl-people-sec-label">All People</span>';
  html += '<button class="pl-people-sec-add" title="Add person" data-action="add-person">' + addSvg + '</button></div>';

  data.profiles.forEach((p, idx) => {
    const avatarColor = p.avatar?.color || '#5B8C6B';
    const avatarContent = p.photo ? '<img src="' + p.photo + '" style="width:100%;height:100%;object-fit:cover;">' : (p.avatar?.letter || p.name.charAt(0).toUpperCase());
    const sel = p.id === selectedId ? ' selected' : '';
    const ageText = p.ageGroup ? AGE_LABELS[p.ageGroup] || '' : '';
    const sizeText = p.topSize ? 'Size ' + p.topSize.toUpperCase() : (p.preferredSize ? 'Size ' + p.preferredSize.toUpperCase() : '');
    const measCount = p.measurements ? Object.keys(p.measurements).filter(k => p.measurements[k]).length : 0;
    const measText = measCount ? measCount + ' meas.' : '';
    const metaLine = [ageText, sizeText, measText].filter(Boolean).join(' · ') || 'Not set up';
    const meTag = idx === 0 ? '<span class="pl-people-me-badge">Me</span>' : '';

    html += '<div class="pl-people-li' + sel + '" data-person-id="' + p.id + '">';
    html += '<div class="pl-people-li-av" style="background:' + avatarColor + ';">' + avatarContent + '</div>';
    html += '<div class="pl-people-li-info"><div class="pl-people-li-name">' + p.name + meTag + '</div>';
    html += '<div class="pl-people-li-meta">' + metaLine + '</div></div></div>';
  });

  listEl.innerHTML = html;

  // Attach click handlers
  listEl.querySelectorAll('.pl-people-li').forEach(li => {
    li.addEventListener('click', () => {
      document.getElementById('plProfileView').dataset.selectedPerson = li.dataset.personId;
      renderProfileCards(loadUserData());
    });
  });
  listEl.querySelectorAll('.pl-people-gi').forEach(gi => {
    gi.addEventListener('click', () => {
      plPeopleDrilledGroup = gi.dataset.groupId;
      renderProfileCards(loadUserData());
    });
  });
  // Section action buttons
  var addPersonBtn = listEl.querySelector('[data-action="add-person"]');
  if (addPersonBtn) addPersonBtn.addEventListener('click', (e) => { e.stopPropagation(); plAddProfile(); });
  var newGroupBtn = listEl.querySelector('[data-action="new-group"]');
  if (newGroupBtn) newGroupBtn.addEventListener('click', (e) => { e.stopPropagation(); plShowNewGroupModal(); });
}

function plRenderGroupDrillIn(listEl, data, groupId, selectedId) {
  const group = (data.groups || []).find(g => g.id === groupId);
  if (!group) { plPeopleDrilledGroup = null; plRenderPeopleList(listEl, data, data.groups || [], selectedId, data.profile?.tailorMode); return; }

  const addSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="12" height="12"><path d="M12 5v14M5 12h14"/></svg>';

  let html = '<div class="pl-people-list-hdr">';
  html += '<span class="pl-people-bc"><span class="pl-people-bc-link" data-action="back-to-people">People</span>';
  html += '<span class="pl-people-bc-sep">›</span>';
  html += '<span class="pl-people-bc-cur">' + group.name + '</span></span></div>';

  // Group overview row
  html += '<div class="pl-people-gi" data-show-group="' + groupId + '" style="border-bottom:1px solid var(--border);">';
  html += '<div class="pl-people-gi-icon">' + (group.icon || '📋') + '</div>';
  html += '<div class="pl-people-gi-info"><div class="pl-people-gi-name">' + group.name + '</div>';
  html += '<div class="pl-people-gi-meta">' + (group.memberIds || []).length + ' members</div></div></div>';

  // Members
  html += '<div class="pl-people-sec-hdr"><span class="pl-people-sec-label">Members</span>';
  html += '<button class="pl-people-sec-add" title="Add member" data-action="add-member" data-group="' + groupId + '">' + addSvg + '</button></div>';

  const AGE_LABELS = {adult:'Adult',teen:'Teen',child:'Child',baby:'Baby'};
  (group.memberIds || []).forEach(pid => {
    const p = data.profiles.find(pr => pr.id === pid);
    if (!p) return;
    const avatarColor = p.avatar?.color || '#5B8C6B';
    const avatarContent = p.avatar?.letter || p.name.charAt(0).toUpperCase();
    const sel = p.id === selectedId ? ' selected' : '';
    const sizeText = p.topSize ? 'Size ' + p.topSize.toUpperCase() : '';
    const ageText = p.ageGroup ? AGE_LABELS[p.ageGroup] || '' : '';
    const meta = [ageText, sizeText].filter(Boolean).join(' · ') || 'Not set up';

    html += '<div class="pl-people-li' + sel + '" data-person-id="' + p.id + '" style="padding-left:28px;">';
    html += '<div class="pl-people-li-av" style="background:' + avatarColor + ';width:32px;height:32px;font-size:0.78rem;">' + avatarContent + '</div>';
    html += '<div class="pl-people-li-info"><div class="pl-people-li-name">' + p.name + '</div>';
    html += '<div class="pl-people-li-meta">' + meta + '</div></div></div>';
  });

  listEl.innerHTML = html;

  // Attach handlers
  listEl.querySelectorAll('.pl-people-li').forEach(li => {
    li.addEventListener('click', () => {
      document.getElementById('plProfileView').dataset.selectedPerson = li.dataset.personId;
      renderProfileCards(loadUserData());
    });
  });
  listEl.querySelectorAll('[data-show-group]').forEach(gi => {
    gi.addEventListener('click', () => {
      document.getElementById('plProfileView').dataset.selectedPerson = '';
      renderProfileCards(loadUserData());
    });
  });
  // Breadcrumb back
  var backLink = listEl.querySelector('[data-action="back-to-people"]');
  if (backLink) backLink.addEventListener('click', () => { plPeopleDrilledGroup = null; renderProfileCards(loadUserData()); });
  // Add member button
  var addMemberBtn = listEl.querySelector('[data-action="add-member"]');
  if (addMemberBtn) addMemberBtn.addEventListener('click', (e) => { e.stopPropagation(); plAddMemberToGroup(addMemberBtn.dataset.group); });
}

function plRenderPersonDetail(detailEl, data, p, groups) {
  const AGE_LABELS = {adult:'Adult',teen:'Teen',child:'Child',baby:'Baby'};
  const avatarColor = p.avatar?.color || '#5B8C6B';
  const avatarContent = p.photo ? '<img src="' + p.photo + '" style="width:100%;height:100%;object-fit:cover;border-radius:13px;">' : (p.avatar?.letter || p.name.charAt(0).toUpperCase());

  // Subtitle
  const subParts = [];
  if (p.gender) subParts.push(p.gender.charAt(0).toUpperCase() + p.gender.slice(1));
  if (p.ageGroup) subParts.push(AGE_LABELS[p.ageGroup] || p.ageGroup);

  // Sizing bar items
  const szItems = [];
  szItems.push({ val: p.topSize ? p.topSize.toUpperCase() : null, label: 'Top' });
  szItems.push({ val: p.bottomSize || null, label: 'Bottom' });
  if (p.gender === 'female' && p.cupSize) szItems.push({ val: p.cupSize, label: 'Cup' });
  szItems.push({ val: p.shoeSize || null, label: 'Shoe' });
  szItems.push({ val: p.fit ? p.fit.charAt(0).toUpperCase() + p.fit.slice(1) : null, label: 'Fit' });

  const szHtml = '<div class="pl-people-sz">' + szItems.map(s =>
    '<div class="pl-people-sz-item"><div class="' + (s.val ? 'pl-people-sz-val' : 'pl-people-sz-empty') + '">' + (s.val || '—') + '</div><div class="pl-people-sz-label">' + s.label + '</div></div>'
  ).join('') + '</div>';

  // Check if person has any measurements
  const hasMeas = p.measurements && Object.keys(p.measurements).some(k => p.measurements[k]);
  const hasAnyData = hasMeas || (p.favoriteFibers && p.favoriteFibers.length) || (p.favoriteColors && p.favoriteColors.length);

  let cardsHtml = '';

  if (!hasAnyData && !p.topSize && !p.bottomSize) {
    // Empty state
    cardsHtml = '<div class="pl-people-card" style="grid-column:1/-1;"><div class="pl-people-empty"><div class="pl-people-empty-icon">📏</div><div class="pl-people-empty-title">No measurements yet</div><div class="pl-people-empty-text">Set up ' + p.name + '\'s profile to add measurements, sizing, and preferences. This helps with yardage estimates and project planning.</div><button class="pl-btn-primary" style="margin-top:16px;" data-action="edit-person" data-person="' + p.id + '">Set Up Profile</button></div></div>';
  } else {
    // Measurements card
    if (hasMeas) {
      cardsHtml += '<div class="pl-people-card"><div class="pl-people-card-title">Body Measurements</div>';
      cardsHtml += plRenderMeasurementsGrouped(p);
      cardsHtml += '</div>';
    }

    // Preferences card
    cardsHtml += '<div class="pl-people-card"><div class="pl-people-card-title">Preferences</div>';
    cardsHtml += renderFavFibers(p);
    cardsHtml += renderFavColors(p);
    cardsHtml += renderSensitivities(p);
    if (!(p.favoriteFibers?.length) && !(p.favoriteColors?.length) && !(p.sensitivities?.length)) {
      cardsHtml += '<p style="font-size:0.78rem;color:var(--ink-faint);font-style:italic;">No preferences set yet</p>';
    }
    cardsHtml += '</div>';

    // Projects card
    const history = p.projectHistory || [];
    const wantToMake = p.wantToMake || [];
    if (history.length || wantToMake.length) {
      cardsHtml += '<div class="pl-people-card"><div class="pl-people-card-title">Projects</div>';
      cardsHtml += renderFavProjects(p);
      cardsHtml += renderWantToMake(p);
      cardsHtml += '</div>';
    }

    // Groups card
    const personGroups = groups.filter(g => (g.memberIds || []).includes(p.id));
    cardsHtml += '<div class="pl-people-card"><div class="pl-people-card-title">Groups</div>';
    cardsHtml += '<div class="pl-people-grp-chips">';
    personGroups.forEach(g => {
      cardsHtml += '<span class="pl-people-grp-chip" data-drill-group="' + g.id + '"><span style="font-size:0.8rem;">' + (g.icon || '📋') + '</span> ' + g.name + '</span>';
    });
    cardsHtml += '<span class="pl-people-grp-add" data-action="add-to-group" data-person="' + p.id + '">+ Add to group</span>';
    cardsHtml += '</div></div>';
  }

  const deleteBtn = data.profiles.length > 1 ? '<button class="pl-btn-secondary" style="padding:7px 10px;" data-action="delete-person" data-person="' + p.id + '"><svg viewBox="0 0 24 24" fill="none" stroke="#c0392b" stroke-width="1.5" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' : '';

  detailEl.innerHTML = `
    <div class="pl-people-dh">
      <div class="pl-people-dh-av" style="background:${avatarColor};">${avatarContent}</div>
      <div class="pl-people-dh-info">
        <div class="pl-people-dh-name">${p.name}</div>
        <div class="pl-people-dh-sub">${subParts.join(' · ') || 'No details set'}</div>
      </div>
      <div class="pl-people-dh-acts">
        <button class="pl-btn-primary" style="font-size:0.76rem;padding:7px 16px;" data-action="edit-person" data-person="${p.id}">Edit</button>
        ${deleteBtn}
      </div>
    </div>
    ${szHtml}
    <div class="pl-people-cards" id="plDisplay-${p.id}">
      ${cardsHtml}
    </div>
    <div class="pl-profile-edit" id="plEdit-${p.id}" style="display:none;"></div>
  `;

  // Attach event listeners for detail panel actions
  detailEl.querySelectorAll('[data-action="edit-person"]').forEach(btn => {
    btn.addEventListener('click', () => plShowEditForm(btn.dataset.person));
  });
  detailEl.querySelectorAll('[data-action="delete-person"]').forEach(btn => {
    btn.addEventListener('click', () => plDeleteProfile(btn.dataset.person));
  });
  detailEl.querySelectorAll('[data-drill-group]').forEach(chip => {
    chip.addEventListener('click', () => { plPeopleDrilledGroup = chip.dataset.drillGroup; renderProfileCards(loadUserData()); });
  });
  detailEl.querySelectorAll('[data-action="add-to-group"]').forEach(btn => {
    btn.addEventListener('click', () => plAddPersonToGroupPrompt(btn.dataset.person));
  });
}

// Grouped measurements (Upper Body, Core, Arms, Lower Body)
function plRenderMeasurementsGrouped(p) {
  if (!p.measurements) return '';
  const m = p.measurements;
  const isMale = p.gender === 'male';
  const groups = [
    { label: 'Upper Body', keys: [
      { k: 'bust', n: isMale ? 'Chest' : 'Bust' },
      { k: 'highBust', n: 'High Bust' },
      { k: 'shoulder', n: 'Shoulder' },
      { k: 'neck', n: 'Neck' },
      { k: 'frontWaistLength', n: 'Front Waist Length' }
    ]},
    { label: 'Core', keys: [
      { k: 'waist', n: 'Waist' },
      { k: 'hips', n: 'Hips' }
    ]},
    { label: 'Arms', keys: [
      { k: 'armLength', n: 'Arm Length' },
      { k: 'upperArm', n: 'Upper Arm' }
    ]},
    { label: 'Lower Body', keys: [
      { k: 'inseam', n: 'Inseam' },
      { k: 'crotchDepth', n: 'Crotch Depth' },
      { k: 'thigh', n: 'Thigh' },
      { k: 'knee', n: 'Knee' },
      { k: 'calf', n: 'Calf' }
    ]}
  ];

  let html = '';
  groups.forEach(group => {
    const rows = group.keys.filter(k => m[k.k]);
    if (rows.length === 0) return;
    html += '<div class="pl-people-meas-group">' + group.label + '</div>';
    rows.forEach(k => {
      html += '<div class="pl-people-meas-row"><span class="pl-people-meas-name">' + k.n + '</span><span class="pl-people-meas-val">' + m[k.k] + '″</span></div>';
    });
  });
  return html || '<p style="font-size:0.78rem;color:var(--ink-faint);font-style:italic;">No measurements recorded</p>';
}

// Placeholder functions for group actions
// ── Modal helper ──
function plShowModal(html) {
  var modal = document.getElementById('plModal');
  var content = document.getElementById('plModalContent');
  if (!modal || !content) return;
  content.innerHTML = html;
  modal.style.display = 'flex';
  modal.onclick = function(e) { if (e.target === modal) plCloseModal(); };
}
function plCloseModal() {
  var modal = document.getElementById('plModal');
  if (modal) modal.style.display = 'none';
}

function plShowNewGroupModal() {
  plShowModal(
    '<div class="pl-modal-header"><div class="pl-modal-title">New Group</div><button class="pl-modal-close" id="plModalClose">✕</button></div>' +
    '<div class="pl-modal-desc">Choose a template to get started, or create a blank group.</div>' +
    '<div class="pl-modal-templates">' +
      '<div class="pl-modal-template" data-template="personal"><div class="pl-modal-template-icon">👨‍👩‍👧</div><div class="pl-modal-template-name">Personal</div><div class="pl-modal-template-desc">Family, friends. Simple organization — name, members, notes.</div></div>' +
      '<div class="pl-modal-template" data-template="event"><div class="pl-modal-template-icon">🎉</div><div class="pl-modal-template-name">Event</div><div class="pl-modal-template-desc">Wedding, performance. Adds deadline, shared projects, fabric coordination.</div></div>' +
      '<div class="pl-modal-template" data-template="client"><div class="pl-modal-template-icon">👔</div><div class="pl-modal-template-name">Client / Uniform</div><div class="pl-modal-template-desc">Business, team. Adds contact info, delivery dates, quantity tracking.</div></div>' +
      '<div class="pl-modal-template" data-template="blank"><div class="pl-modal-template-icon">📋</div><div class="pl-modal-template-name">Blank</div><div class="pl-modal-template-desc">Start from scratch. Just a name — add details as you go.</div></div>' +
    '</div>'
  );
  document.getElementById('plModalClose').addEventListener('click', plCloseModal);
  document.querySelectorAll('.pl-modal-template').forEach(function(t) {
    t.addEventListener('click', function() {
      var template = t.dataset.template;
      plCloseModal();
      plCreateGroupFromTemplate(template);
    });
  });
}

function plCreateGroupFromTemplate(template) {
  var icons = { personal: '👨‍👩‍👧', event: '🎉', client: '👔', blank: '📋' };
  var data = loadUserData();
  var id = addGroup(data, { name: 'New Group', icon: icons[template] || '📋', template: template });
  // Drill into the new group
  plPeopleDrilledGroup = id;
  renderProfileCards(loadUserData());
}

function plAddProfile() {
  // Create a blank person and immediately open edit form
  var colors = ['#5B8C6B','#C17B7B','#7B6BA0','#4A8B9B','#B8860B','#8B5A8B','#A0522D','#6B9B6B'];
  var data = loadUserData();
  var color = colors[data.profiles.length % colors.length];
  var id = addProfile(data, { name: 'New Person', avatar: { letter: '?', color: color } });
  var wrap = document.getElementById('plProfileView');
  if (wrap) wrap.dataset.selectedPerson = id;
  renderProfileCards(loadUserData());
  plShowEditForm(id);
}

function plAddMemberToGroup(groupId) {
  var data = loadUserData();
  var group = (data.groups || []).find(function(g) { return g.id === groupId; });
  if (!group) return;
  var existing = group.memberIds || [];
  var available = data.profiles.filter(function(p) { return !existing.includes(p.id); });

  var html = '<div class="pl-modal-header"><div class="pl-modal-title">Add Member</div><button class="pl-modal-close" id="plModalClose">✕</button></div>';
  html += '<input type="text" class="pl-modal-search" placeholder="Search people..." id="plModalSearch">';
  html += '<div class="pl-modal-person-list" id="plModalPersonList">';

  if (available.length === 0) {
    html += '<div style="padding:16px;text-align:center;color:var(--ink-faint);font-size:0.85rem;">All people are already in this group</div>';
  } else {
    available.forEach(function(p) {
      var av = p.avatar?.color || '#888';
      var letter = p.avatar?.letter || p.name.charAt(0).toUpperCase();
      var meta = [p.ageGroup || '', p.topSize ? 'Size ' + p.topSize.toUpperCase() : ''].filter(Boolean).join(' · ') || '';
      html += '<div class="pl-modal-person" data-person-id="' + p.id + '">';
      html += '<div class="pl-modal-person-av" style="background:' + av + ';">' + letter + '</div>';
      html += '<div><div class="pl-modal-person-name">' + p.name + '</div>';
      if (meta) html += '<div class="pl-modal-person-meta">' + meta + '</div>';
      html += '</div></div>';
    });
  }

  html += '</div>';
  html += '<div class="pl-modal-create-opt" id="plModalCreatePerson"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M12 5v14M5 12h14"/></svg> Create new person</div>';

  plShowModal(html);
  document.getElementById('plModalClose').addEventListener('click', plCloseModal);

  // Person selection
  document.querySelectorAll('.pl-modal-person').forEach(function(el) {
    el.addEventListener('click', function() {
      var personId = el.dataset.personId;
      var d = loadUserData();
      addPersonToGroup(d, groupId, personId);
      plCloseModal();
      renderProfileCards(loadUserData());
    });
  });

  // Create new person
  document.getElementById('plModalCreatePerson').addEventListener('click', function() {
    plCloseModal();
    // Create person, add to group, show edit form
    var colors = ['#5B8C6B','#C17B7B','#7B6BA0','#4A8B9B','#B8860B','#8B5A8B','#A0522D','#6B9B6B'];
    var d = loadUserData();
    var color = colors[d.profiles.length % colors.length];
    var pid = addProfile(d, { name: 'New Person', avatar: { letter: '?', color: color } });
    d = loadUserData();
    addPersonToGroup(d, groupId, pid);
    var wrap = document.getElementById('plProfileView');
    if (wrap) wrap.dataset.selectedPerson = pid;
    renderProfileCards(loadUserData());
    plShowEditForm(pid);
  });

  // Search filter
  var searchInput = document.getElementById('plModalSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var q = searchInput.value.toLowerCase();
      document.querySelectorAll('.pl-modal-person').forEach(function(el) {
        var name = el.querySelector('.pl-modal-person-name').textContent.toLowerCase();
        el.style.display = name.includes(q) ? '' : 'none';
      });
    });
    searchInput.focus();
  }
}

function plAddPersonToGroupPrompt(personId) {
  var data = loadUserData();
  var groups = data.groups || [];
  var memberOf = groups.filter(function(g) { return (g.memberIds || []).includes(personId); });
  var available = groups.filter(function(g) { return !(g.memberIds || []).includes(personId); });

  var html = '<div class="pl-modal-header"><div class="pl-modal-title">Add to Group</div><button class="pl-modal-close" id="plModalClose">✕</button></div>';

  if (available.length === 0 && groups.length > 0) {
    html += '<div style="padding:16px;text-align:center;color:var(--ink-faint);font-size:0.85rem;">Already in all groups</div>';
  } else if (available.length > 0) {
    available.forEach(function(g) {
      var count = (g.memberIds || []).length;
      html += '<div class="pl-modal-group" data-group-id="' + g.id + '">';
      html += '<div class="pl-modal-group-icon">' + (g.icon || '📋') + '</div>';
      html += '<div><div class="pl-modal-group-name">' + g.name + '</div>';
      html += '<div class="pl-modal-group-meta">' + count + ' member' + (count !== 1 ? 's' : '') + '</div></div></div>';
    });
  }

  html += '<div class="pl-modal-create-opt" id="plModalCreateGroup"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M12 5v14M5 12h14"/></svg> Create new group</div>';

  plShowModal(html);
  document.getElementById('plModalClose').addEventListener('click', plCloseModal);

  document.querySelectorAll('.pl-modal-group').forEach(function(el) {
    el.addEventListener('click', function() {
      var d = loadUserData();
      addPersonToGroup(d, el.dataset.groupId, personId);
      plCloseModal();
      renderProfileCards(loadUserData());
    });
  });

  document.getElementById('plModalCreateGroup').addEventListener('click', function() {
    plCloseModal();
    plShowNewGroupModal();
  });
}

// Legacy renderProfileCards kept the old function signature —
// the existing code in renderPipelineProfile etc. calls it with (data)

// ── Profile edit form ──
function plShowEditForm(profileId) {
  const data = loadUserData();
  const p = data.profiles.find(pr => pr.id === profileId);
  if (!p) return;

  document.getElementById('plDisplay-' + profileId).style.display = 'none';
  const editWrap = document.getElementById('plEdit-' + profileId);
  editWrap.style.display = '';

  const fiberKeys = Object.keys(FIBERS);
  const measKeys = ALL_MEAS_KEYS;
  const defaultGroup = 'full';
  const sensOptions = ['Wool itch', 'Synthetic allergy', 'Heat sensitive', 'Texture sensitive', 'Dye sensitivity'];
  const colorPalette = [
    {name:'Red',hex:'#C0392B'},{name:'Orange',hex:'#E67E22'},{name:'Yellow',hex:'#F1C40F'},{name:'Green',hex:'#27AE60'},
    {name:'Blue',hex:'#2980B9'},{name:'Purple',hex:'#8E44AD'},{name:'Pink',hex:'#E91E8A'},{name:'Gray',hex:'#95A5A6'},
    {name:'Black',hex:'#2C3E50'},{name:'White',hex:'#FDFEFE'},{name:'Brown',hex:'#795548'},{name:'Tan',hex:'#D2B48C'}
  ];
  const selectedColors = (p.favoriteColors || []).map(c => c.name);

  editWrap.innerHTML = `
    <div id="plLivePreview-${profileId}" style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--cream);border-radius:10px;margin-bottom:12px;">
      <div id="plPreviewAvatar-${profileId}" style="width:44px;height:44px;border-radius:50%;overflow:hidden;border:2px solid ${p.avatar?.color || '#5B8C6B'};flex-shrink:0;display:flex;align-items:center;justify-content:center;background:${p.avatar?.color || '#5B8C6B'};color:#fff;font-size:1.1rem;font-weight:600;">
        ${p.photo ? '<img src="' + p.photo + '" style="width:100%;height:100%;object-fit:cover;">' : p.name.charAt(0).toUpperCase()}
      </div>
      <div style="flex:1;min-width:0;">
        <div id="plPreviewName-${profileId}" style="font-weight:600;font-size:0.92rem;">${p.name}</div>
        <div id="plPreviewMeta-${profileId}" style="font-size:0.78rem;color:var(--ink-light);">${[p.gender ? p.gender.charAt(0).toUpperCase() + p.gender.slice(1) : '', p.skill ? p.skill.charAt(0).toUpperCase() + p.skill.slice(1) : '', p.topSize ? p.topSize.toUpperCase() : (p.preferredSize ? p.preferredSize.toUpperCase() : '')].filter(Boolean).join(' · ') || 'Fill in details below'}</div>
        <div id="plPreviewExtras-${profileId}" style="font-size:0.72rem;color:var(--ink-faint);margin-top:2px;"></div>
      </div>
    </div>
    <div class="pl-section" style="margin-bottom:12px;">
      <div class="pl-section-title">Basic Info</div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">Name</div></div>
        <div class="pl-form-control"><input type="text" class="pl-select" id="plEditName-${profileId}" value="${p.name}"></div>
      </div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">Photo</div></div>
        <div class="pl-form-control" style="display:flex;align-items:center;gap:10px;">
          <div id="plPhotoPreview-${profileId}" style="width:40px;height:40px;border-radius:50%;overflow:hidden;border:2px solid ${p.avatar?.color || '#5B8C6B'};flex-shrink:0;display:flex;align-items:center;justify-content:center;background:${p.avatar?.color || '#5B8C6B'};color:#fff;font-size:1rem;font-weight:600;">
            ${p.photo ? '<img src="' + p.photo + '" style="width:100%;height:100%;object-fit:cover;">' : (p.name.charAt(0).toUpperCase())}
          </div>
          <label class="pl-btn-secondary" style="font-size:0.72rem;padding:3px 10px;cursor:pointer;">
            Choose
            <input type="file" accept="image/*" id="plPhotoInput-${profileId}" style="display:none;">
          </label>
          ${p.photo ? '<button class="pl-btn-secondary" style="font-size:0.72rem;padding:3px 10px;color:#c0392b;" id="plPhotoRemove-' + profileId + '">Remove</button>' : ''}
        </div>
      </div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">Gender</div></div>
        <div class="pl-form-control">
          <div class="pl-option-pills" data-edit-group="gender-${profileId}">
            <button class="pl-option-pill${p.gender === 'female' ? ' selected' : ''}" data-val="female">Female</button>
            <button class="pl-option-pill${p.gender === 'male' ? ' selected' : ''}" data-val="male">Male</button>
          </div>
        </div>
      </div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">Age Group</div></div>
        <div class="pl-form-control">
          <div class="pl-option-pills" data-edit-group="ageGroup-${profileId}">
            <button class="pl-option-pill${p.ageGroup === 'adult' ? ' selected' : ''}" data-val="adult">Adult</button>
            <button class="pl-option-pill${p.ageGroup === 'teen' ? ' selected' : ''}" data-val="teen">Teen</button>
            <button class="pl-option-pill${p.ageGroup === 'child' ? ' selected' : ''}" data-val="child">Child</button>
            <button class="pl-option-pill${p.ageGroup === 'baby' ? ' selected' : ''}" data-val="baby">Baby</button>
          </div>
        </div>
      </div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">Skill Level</div></div>
        <div class="pl-form-control">
          <div class="pl-option-pills" data-edit-group="skill-${profileId}">
            ${['none','beginner','intermediate','advanced','expert'].map(s => {
              const labels = {none:'Non-sewist',beginner:'Beginner',intermediate:'Intermediate',advanced:'Advanced',expert:'Expert'};
              return `<button class="pl-option-pill${p.skill === s ? ' selected' : ''}" data-val="${s}">${labels[s]}</button>`;
            }).join('')}
          </div>
        </div>
      </div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">Top Size</div></div>
        <div class="pl-form-control">
          <select class="pl-select" id="plEditTopSize-${profileId}">
            <option value="">Not set</option>
            ${['xs','s','m','l','xl','xxl'].map(s => `<option value="${s}" ${p.topSize === s ? 'selected' : ''}>${s.toUpperCase()}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">Bottom Size</div></div>
        <div class="pl-form-control">
          <select class="pl-select" id="plEditBottomSize-${profileId}">
            <option value="">Not set</option>
            ${['xs','s','m','l','xl','xxl'].map(s => `<option value="${s}" ${p.bottomSize === s ? 'selected' : ''}>${s.toUpperCase()}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">Shoe Size</div></div>
        <div class="pl-form-control">
          <select class="pl-select" id="plEditShoeSize-${profileId}">
            <option value="">Not set</option>
            ${(p.gender === 'male' ? [7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,13,14] : [5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,11]).map(s => `<option value="${s}" ${p.shoeSize == s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="pl-form-row" id="plCupSizeRow-${profileId}"${p.gender === 'male' ? ' style="display:none;"' : ''}>
        <div class="pl-form-label"><div class="pl-form-label-main">Cup Size</div><div class="pl-form-label-sub">Bra cup (optional)</div></div>
        <div class="pl-form-control">
          <select class="pl-select" id="plEditCupSize-${profileId}">
            <option value="">Not set</option>
            ${['AA','A','B','C','D','DD','DDD','F','G','H'].map(s => `<option value="${s}" ${p.cupSize === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="pl-form-row" style="border-bottom:none;">
        <div class="pl-form-label"><div class="pl-form-label-main">Fit Preference</div></div>
        <div class="pl-form-control">
          <div class="pl-option-pills" data-edit-group="fit-${profileId}">
            ${['fitted','standard','relaxed'].map(f => `<button class="pl-option-pill${p.fit === f ? ' selected' : ''}" data-val="${f}">${f.charAt(0).toUpperCase() + f.slice(1)}</button>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <div class="pl-section" style="margin-bottom:12px;">
      <div class="pl-section-title" style="display:flex;align-items:center;justify-content:space-between;">
        <span>Measurements (inches)</span>
        <div style="display:flex;gap:6px;align-items:center;">
          <button class="pl-btn-secondary" style="font-size:0.72rem;padding:3px 10px;" id="plMeasFillBtn-${profileId}">Fill from size</button>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
        <div class="pl-option-pills" id="plMeasGroupPills-${profileId}" style="flex-wrap:nowrap;">
          ${['tops','bottoms','full'].map(g => '<button class="pl-option-pill' + (g === defaultGroup ? ' selected' : '') + '" data-meas-group="' + g + '" style="font-size:0.72rem;padding:3px 8px;">' + MEASUREMENT_GROUPS[g].label + '</button>').join('')}
        </div>
        <label style="display:flex;align-items:center;gap:4px;font-size:0.72rem;color:var(--ink-light);cursor:pointer;margin-left:auto;">
          <input type="checkbox" id="plTailorToggle-${profileId}" style="accent-color:var(--ink-light);">
          Tailor mode
        </label>
      </div>
      <div id="plMeasRows-${profileId}">
      ${measKeys.map(k => {
        const inGroup = MEASUREMENT_GROUPS[defaultGroup].keys.includes(k);
        return '<div class="pl-form-row pl-meas-row" data-meas-key="' + k + '" style="padding:6px 0;' + (inGroup ? '' : 'display:none;') + '"><div class="pl-form-label"><div class="pl-form-label-main">' + plMeasLabel(k) + '</div></div><div class="pl-form-control"><input type="number" class="pl-select" style="width:80px;" id="plMeas-' + profileId + '-' + k + '" value="' + (p.measurements?.[k] || '') + '" placeholder="—" step="0.25"></div></div>';
      }).join('')}
      </div>
    </div>

    <div class="pl-section" style="margin-bottom:12px;">
      <div class="pl-section-title">Favorite Fibers</div>
      <div class="pl-fav-fibers" style="flex-wrap:wrap;">
        ${fiberKeys.map(fk => {
          const f = FIBERS[fk];
          const checked = (p.favoriteFibers || []).includes(fk);
          return '<label class="pl-fav-fiber-pill" style="background:' + f.accent + '18;cursor:pointer;opacity:' + (checked ? 1 : 0.5) + ';"><input type="checkbox" class="pl-edit-fiber-cb" data-fiber="' + fk + '" ' + (checked ? 'checked' : '') + ' style="display:none;"><span class="pl-fiber-dot" style="background:' + f.accent + ';"></span> ' + f.name + '</label>';
        }).join('')}
      </div>
    </div>

    <div class="pl-section" style="margin-bottom:12px;">
      <div class="pl-section-title">Favorite Colors</div>
      <div class="pl-fav-colors" style="display:flex;flex-wrap:wrap;gap:6px;">
        ${colorPalette.map(c => {
          const sel = selectedColors.includes(c.name);
          return '<label class="pl-fav-color-chip" style="cursor:pointer;opacity:' + (sel ? 1 : 0.4) + ';border:2px solid ' + (sel ? c.hex : 'transparent') + ';border-radius:6px;padding:4px 8px;display:flex;align-items:center;gap:4px;"><input type="checkbox" class="pl-edit-color-cb" data-color-name="' + c.name + '" data-color-hex="' + c.hex + '" ' + (sel ? 'checked' : '') + ' style="display:none;"><div class="pl-fav-color-swatch" style="background:' + c.hex + ';' + (c.name === 'White' ? 'border:1px solid #ccc;' : '') + '"></div><span class="pl-fav-color-name">' + c.name + '</span></label>';
        }).join('')}
      </div>
    </div>

    <div class="pl-section" style="margin-bottom:12px;">
      <div class="pl-section-title">Sensitivities</div>
      <div class="pl-prefs" style="flex-wrap:wrap;">
        ${sensOptions.map(s => {
          const checked = (p.sensitivities || []).includes(s);
          return '<label class="pl-pref-tag sensitivity" style="cursor:pointer;opacity:' + (checked ? 1 : 0.5) + ';"><input type="checkbox" class="pl-edit-sens-cb" data-sens="' + s + '" ' + (checked ? 'checked' : '') + ' style="display:none;">' + s + '</label>';
        }).join('')}
      </div>
    </div>

    <div style="display:flex;gap:8px;margin-top:12px;">
      <button class="pl-btn-primary" style="flex:1;" onclick="plSaveProfile('${profileId}')">Save Changes</button>
      <button class="pl-btn-secondary" style="color:#c0392b;" onclick="plDeleteProfile('${profileId}')">Delete</button>
      <button class="pl-btn-secondary" onclick="plCancelEdit('${profileId}')">Cancel</button>
    </div>
  `;

  // Pill group toggle listeners
  editWrap.querySelectorAll('.pl-option-pills[data-edit-group]').forEach(group => {
    group.querySelectorAll('.pl-option-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.pl-option-pill').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  });

  // Fiber checkbox visual toggle
  editWrap.querySelectorAll('.pl-edit-fiber-cb').forEach(cb => {
    cb.addEventListener('change', () => {
      cb.closest('.pl-fav-fiber-pill').style.opacity = cb.checked ? '1' : '0.5';
    });
  });

  // Color checkbox visual toggle
  editWrap.querySelectorAll('.pl-edit-color-cb').forEach(cb => {
    cb.addEventListener('change', () => {
      const chip = cb.closest('.pl-fav-color-chip');
      chip.style.opacity = cb.checked ? '1' : '0.4';
      chip.style.borderColor = cb.checked ? cb.dataset.colorHex : 'transparent';
    });
  });

  // Sensitivity checkbox visual toggle
  editWrap.querySelectorAll('.pl-edit-sens-cb').forEach(cb => {
    cb.addEventListener('change', () => {
      cb.closest('.pl-pref-tag').style.opacity = cb.checked ? '1' : '0.5';
    });
  });

  // Photo upload listener
  var photoInput = document.getElementById('plPhotoInput-' + profileId);
  if (photoInput) {
    photoInput.addEventListener('change', function() {
      var file = photoInput.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function(ev) {
        // Resize to 150px max for localStorage efficiency
        var img = new Image();
        img.onload = function() {
          var canvas = document.createElement('canvas');
          var max = 150;
          var w = img.width, h = img.height;
          if (w > h) { h = Math.round(h * max / w); w = max; }
          else { w = Math.round(w * max / h); h = max; }
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          var dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          var preview = document.getElementById('plPhotoPreview-' + profileId);
          if (preview) preview.innerHTML = '<img src="' + dataUrl + '" style="width:100%;height:100%;object-fit:cover;">';
          // Store temporarily on the input for save
          photoInput.dataset.photoData = dataUrl;
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
  var photoRemoveBtn = document.getElementById('plPhotoRemove-' + profileId);
  if (photoRemoveBtn) {
    photoRemoveBtn.addEventListener('click', function() {
      var preview = document.getElementById('plPhotoPreview-' + profileId);
      var nameEl = document.getElementById('plEditName-' + profileId);
      var letter = nameEl ? nameEl.value.charAt(0).toUpperCase() || '?' : '?';
      if (preview) preview.innerHTML = letter;
      if (photoInput) { photoInput.value = ''; photoInput.dataset.photoData = '__removed__'; }
      photoRemoveBtn.remove();
    });
  }

  // Measurement group tab listeners
  const measGroupPills = editWrap.querySelector('#plMeasGroupPills-' + profileId);
  const tailorToggle = editWrap.querySelector('#plTailorToggle-' + profileId);
  function plUpdateMeasVisibility() {
    const isTailor = tailorToggle && tailorToggle.checked;
    const activeGroupBtn = measGroupPills ? measGroupPills.querySelector('.pl-option-pill.selected') : null;
    const groupKey = isTailor ? 'tailor' : (activeGroupBtn ? activeGroupBtn.dataset.measGroup : 'full');
    const visibleKeys = MEASUREMENT_GROUPS[groupKey].keys;
    editWrap.querySelectorAll('.pl-meas-row').forEach(row => {
      row.style.display = visibleKeys.includes(row.dataset.measKey) ? '' : 'none';
    });
    // Disable group pills when in tailor mode
    if (measGroupPills) {
      measGroupPills.querySelectorAll('.pl-option-pill').forEach(b => {
        b.style.opacity = isTailor ? '0.4' : '';
        b.style.pointerEvents = isTailor ? 'none' : '';
      });
    }
  }
  if (measGroupPills) {
    measGroupPills.querySelectorAll('.pl-option-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        measGroupPills.querySelectorAll('.pl-option-pill').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        plUpdateMeasVisibility();
      });
    });
  }
  if (tailorToggle) {
    tailorToggle.addEventListener('change', plUpdateMeasVisibility);
  }

  // Fill measurements from size preset
  const fillBtn = document.getElementById('plMeasFillBtn-' + profileId);
  if (fillBtn) {
    fillBtn.addEventListener('click', () => {
      const genderBtn = editWrap.querySelector('[data-edit-group="gender-' + profileId + '"] .pl-option-pill.selected');
      const gender = genderBtn ? genderBtn.dataset.val : '';
      const topSzEl = document.getElementById('plEditTopSize-' + profileId);
      const size = topSzEl ? topSzEl.value : '';
      if (!gender || !size) {
        alert('Set Gender and Top Size first to fill measurements.');
        return;
      }
      const presets = MEASUREMENT_PRESETS[gender];
      if (!presets || !presets[size]) {
        alert('No preset data for ' + gender + ' size ' + size.toUpperCase() + '.');
        return;
      }
      const vals = presets[size];
      measKeys.forEach(k => {
        if (vals[k] !== undefined) {
          document.getElementById('plMeas-' + profileId + '-' + k).value = vals[k];
        }
      });
      plUpdateLivePreview();
    });
  }

  // Live preview updater
  function plUpdateLivePreview() {
    var nameEl = document.getElementById('plEditName-' + profileId);
    var nameVal = nameEl ? nameEl.value.trim() || 'Unnamed' : 'Unnamed';
    var previewName = document.getElementById('plPreviewName-' + profileId);
    if (previewName) previewName.textContent = nameVal;

    // Update avatar letter if no photo
    var photoIn = document.getElementById('plPhotoInput-' + profileId);
    var hasPhoto = photoIn && photoIn.dataset.photoData && photoIn.dataset.photoData !== '__removed__';
    if (!hasPhoto && !p.photo) {
      var previewAvatar = document.getElementById('plPreviewAvatar-' + profileId);
      if (previewAvatar && !previewAvatar.querySelector('img')) {
        previewAvatar.textContent = nameVal.charAt(0).toUpperCase();
      }
    }

    var metaParts = [];
    var gBtn = editWrap.querySelector('[data-edit-group="gender-' + profileId + '"] .pl-option-pill.selected');
    if (gBtn) metaParts.push(gBtn.dataset.val.charAt(0).toUpperCase() + gBtn.dataset.val.slice(1));
    var skBtn = editWrap.querySelector('[data-edit-group="skill-' + profileId + '"] .pl-option-pill.selected');
    if (skBtn) metaParts.push(skBtn.dataset.val.charAt(0).toUpperCase() + skBtn.dataset.val.slice(1));
    var topSzEl = document.getElementById('plEditTopSize-' + profileId);
    if (topSzEl && topSzEl.value) metaParts.push(topSzEl.value.toUpperCase());
    var fitBtn = editWrap.querySelector('[data-edit-group="fit-' + profileId + '"] .pl-option-pill.selected');
    if (fitBtn) metaParts.push(fitBtn.dataset.val.charAt(0).toUpperCase() + fitBtn.dataset.val.slice(1) + ' fit');
    var previewMeta = document.getElementById('plPreviewMeta-' + profileId);
    if (previewMeta) previewMeta.textContent = metaParts.join(' · ') || 'Fill in details below';

    var extras = [];
    var fiberCount = editWrap.querySelectorAll('.pl-edit-fiber-cb:checked').length;
    if (fiberCount) extras.push(fiberCount + ' fiber' + (fiberCount !== 1 ? 's' : ''));
    var colorCount = editWrap.querySelectorAll('.pl-edit-color-cb:checked').length;
    if (colorCount) extras.push(colorCount + ' color' + (colorCount !== 1 ? 's' : ''));
    var measCount = 0;
    ALL_MEAS_KEYS.forEach(function(k) {
      var el = document.getElementById('plMeas-' + profileId + '-' + k);
      if (el && parseFloat(el.value) > 0) measCount++;
    });
    if (measCount) extras.push(measCount + ' measurement' + (measCount !== 1 ? 's' : ''));
    var previewExtras = document.getElementById('plPreviewExtras-' + profileId);
    if (previewExtras) previewExtras.textContent = extras.join(' · ');
  }

  // Wire live preview to all interactive elements
  var nameInput = document.getElementById('plEditName-' + profileId);
  if (nameInput) nameInput.addEventListener('input', plUpdateLivePreview);
  var topSizeSelect = document.getElementById('plEditTopSize-' + profileId);
  if (topSizeSelect) topSizeSelect.addEventListener('change', plUpdateLivePreview);
  var bottomSizeSelect = document.getElementById('plEditBottomSize-' + profileId);
  if (bottomSizeSelect) bottomSizeSelect.addEventListener('change', plUpdateLivePreview);
  var shoeSizeSelect = document.getElementById('plEditShoeSize-' + profileId);
  if (shoeSizeSelect) shoeSizeSelect.addEventListener('change', plUpdateLivePreview);
  var cupSizeSelect = document.getElementById('plEditCupSize-' + profileId);
  if (cupSizeSelect) cupSizeSelect.addEventListener('change', plUpdateLivePreview);
  editWrap.querySelectorAll('.pl-option-pills[data-edit-group] .pl-option-pill').forEach(function(btn) {
    btn.addEventListener('click', function() { setTimeout(plUpdateLivePreview, 0); });
  });
  // Update shoe size options and cup size visibility when gender changes
  editWrap.querySelectorAll('[data-edit-group="gender-' + profileId + '"] .pl-option-pill').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var isMale = btn.dataset.val === 'male';
      var shoeEl = document.getElementById('plEditShoeSize-' + profileId);
      if (shoeEl) {
        var curVal = shoeEl.value;
        var sizes = isMale ? [7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,13,14] : [5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,11];
        shoeEl.innerHTML = '<option value="">Not set</option>' + sizes.map(function(s) {
          return '<option value="' + s + '"' + (s == curVal ? ' selected' : '') + '>' + s + '</option>';
        }).join('');
      }
      var cupRow = document.getElementById('plCupSizeRow-' + profileId);
      if (cupRow) {
        cupRow.style.display = isMale ? 'none' : '';
        if (isMale) {
          var cupEl = document.getElementById('plEditCupSize-' + profileId);
          if (cupEl) cupEl.value = '';
        }
      }
    });
  });
  editWrap.querySelectorAll('.pl-edit-fiber-cb, .pl-edit-color-cb').forEach(function(cb) {
    cb.addEventListener('change', plUpdateLivePreview);
  });
  editWrap.querySelectorAll('[id^="plMeas-' + profileId + '-"]').forEach(function(input) {
    input.addEventListener('input', plUpdateLivePreview);
  });
  plUpdateLivePreview();
}

function plSaveProfile(profileId) {
  const data = loadUserData();
  const editWrap = document.getElementById('plEdit-' + profileId);

  const name = document.getElementById('plEditName-' + profileId).value.trim() || 'Unnamed';
  const skillBtn = editWrap.querySelector('[data-edit-group="skill-' + profileId + '"] .pl-option-pill.selected');
  const skill = skillBtn ? skillBtn.dataset.val : 'intermediate';
  const fitBtn = editWrap.querySelector('[data-edit-group="fit-' + profileId + '"] .pl-option-pill.selected');
  const fit = fitBtn ? fitBtn.dataset.val : 'standard';
  const topSize = document.getElementById('plEditTopSize-' + profileId).value;
  const bottomSize = document.getElementById('plEditBottomSize-' + profileId).value;
  const shoeSize = document.getElementById('plEditShoeSize-' + profileId).value;
  const cupSize = document.getElementById('plEditCupSize-' + profileId).value;
  const preferredSize = topSize || bottomSize || '';

  const measurements = {};
  ALL_MEAS_KEYS.forEach(k => {
    const el = document.getElementById('plMeas-' + profileId + '-' + k);
    const val = el ? parseFloat(el.value) : NaN;
    if (val > 0) measurements[k] = val;
  });

  const favoriteFibers = [];
  editWrap.querySelectorAll('.pl-edit-fiber-cb:checked').forEach(cb => favoriteFibers.push(cb.dataset.fiber));

  const sensitivities = [];
  editWrap.querySelectorAll('.pl-edit-sens-cb:checked').forEach(cb => sensitivities.push(cb.dataset.sens));

  const favoriteColors = [];
  editWrap.querySelectorAll('.pl-edit-color-cb:checked').forEach(cb => favoriteColors.push({name: cb.dataset.colorName, hex: cb.dataset.colorHex}));

  const genderBtn = editWrap.querySelector('[data-edit-group="gender-' + profileId + '"] .pl-option-pill.selected');
  const gender = genderBtn ? genderBtn.dataset.val : '';

  const ageGroupBtn = editWrap.querySelector('[data-edit-group="ageGroup-' + profileId + '"] .pl-option-pill.selected');
  const ageGroup = ageGroupBtn ? ageGroupBtn.dataset.val : '';

  // Photo
  const photoInput = document.getElementById('plPhotoInput-' + profileId);
  let photo = data.profiles.find(p => p.id === profileId)?.photo || null;
  if (photoInput && photoInput.dataset.photoData === '__removed__') {
    photo = null;
  } else if (photoInput && photoInput.dataset.photoData) {
    photo = photoInput.dataset.photoData;
  }

  updateProfile(data, profileId, {
    name, skill, fit, preferredSize, topSize, bottomSize, shoeSize, cupSize, measurements, favoriteFibers, sensitivities, favoriteColors, gender, ageGroup, photo,
    avatar: { letter: name.charAt(0).toUpperCase(), color: data.profiles.find(p => p.id === profileId)?.avatar?.color || '#5B8C6B' }
  });

  renderPipelineProfile();
}

function plCancelEdit(profileId) {
  document.getElementById('plEdit-' + profileId).style.display = 'none';
  document.getElementById('plDisplay-' + profileId).style.display = '';
}

function plDeleteProfile(profileId) {
  if (!confirm('Remove this person? This cannot be undone.')) return;
  const data = loadUserData();
  data.profiles = data.profiles.filter(p => p.id !== profileId);
  saveUserData(data);
  // If deleted person was selected, fall back to first profile
  const wrap = document.getElementById('plProfileView');
  if (wrap && wrap.dataset.selectedPerson === profileId) {
    wrap.dataset.selectedPerson = data.profiles[0] ? data.profiles[0].id : '';
  }
  renderPipelineProfile();
}

function renderMeasurements(p) {
  const m = p.measurements || {};
  const entries = Object.entries(m).filter(([,v]) => v);
  if (!entries.length) return '<div class="pl-fav-section"><div class="pl-fav-label">Measurements</div><div style="font-size:0.78rem;color:var(--ink-faint);">No measurements recorded yet</div></div>';
  // Group measurements by body region
  const MEAS_REGIONS = {
    'Upper Body': ['bust', 'highBust', 'shoulder', 'neck', 'frontWaistLength'],
    'Lower Body': ['waist', 'hips', 'inseam', 'crotchDepth', 'thigh', 'knee', 'calf'],
    'Arms': ['armLength', 'upperArm']
  };
  const grouped = {};
  const used = new Set();
  for (const [region, keys] of Object.entries(MEAS_REGIONS)) {
    const regionEntries = keys.filter(k => m[k]).map(k => { used.add(k); return [k, m[k]]; });
    if (regionEntries.length) grouped[region] = regionEntries;
  }
  // Catch any ungrouped keys
  const other = entries.filter(([k]) => !used.has(k));
  if (other.length) grouped['Other'] = other;

  const groupsHtml = Object.entries(grouped).map(([region, items]) =>
    `<div class="pl-meas-group">
      <div class="pl-meas-group-title">${region}</div>
      <div class="pl-measurements">
        ${items.map(([k,v]) => `<div class="pl-measure-item"><span class="pl-measure-label">${plMeasLabel(k)}</span><span class="pl-measure-val">${v}"</span></div>`).join('')}
      </div>
    </div>`
  ).join('');

  return `<div class="pl-fav-section">
    <div class="pl-fav-label">Measurements</div>
    <div class="pl-meas-groups">${groupsHtml}</div>
  </div>`;
}

function renderFavFibers(p) {
  if (!p.favoriteFibers?.length) return '';
  return `
    <div class="pl-fav-section">
      <div class="pl-fav-label">Favorite Fibers</div>
      <div class="pl-fav-fibers">
        ${p.favoriteFibers.map(fk => {
          const f = FIBERS[fk];
          if (!f) return '';
          return `<span class="pl-fav-fiber-pill" style="background:${f.accent}18;"><span class="pl-fiber-dot" style="background:${f.accent};"></span> ${f.name}</span>`;
        }).join('')}
      </div>
    </div>`;
}

function renderFavColors(p) {
  if (!p.favoriteColors?.length) return '';
  return `
    <div class="pl-fav-section">
      <div class="pl-fav-label">Favorite Colors</div>
      <div class="pl-fav-colors">
        ${p.favoriteColors.map(c => `<div class="pl-fav-color-chip"><div class="pl-fav-color-swatch" style="background:${c.hex};"></div><span class="pl-fav-color-name">${c.name}</span></div>`).join('')}
      </div>
    </div>`;
}

function renderOwnedTools(p) {
  const tools = p.ownedTools;
  if (!tools) return '';
  const CATS = [
    { key: 'machines', label: 'Machines', icon: '🧵' },
    { key: 'cutting', label: 'Cutting', icon: '✂️' },
    { key: 'measuring', label: 'Measuring', icon: '📏' },
    { key: 'pressing', label: 'Pressing', icon: '♨️' },
    { key: 'marking', label: 'Marking', icon: '🖍️' }
  ];
  const filled = CATS.filter(c => tools[c.key]?.length);
  if (!filled.length) return '';
  return `
    <div class="pl-fav-section">
      <div class="pl-fav-label">My Tools</div>
      <div class="pl-tools-inventory">
        ${filled.map(c => `<div class="pl-tools-cat">
          <div class="pl-tools-cat-label">${c.icon} ${c.label}</div>
          <div class="pl-fav-fibers">
            ${tools[c.key].map(k => {
              const label = (TOOL_INVENTORY_LABELS[c.key] || {})[k] || k;
              return '<span class="pl-fav-fiber-pill" style="background:var(--cream);">' + label + '</span>';
            }).join('')}
          </div>
        </div>`).join('')}
      </div>
    </div>`;
}

function renderSensitivities(p) {
  if (!p.sensitivities?.length) return '';
  return `
    <div class="pl-fav-section">
      <div class="pl-fav-label">Sensitivities</div>
      <div class="pl-prefs">${p.sensitivities.map(s => `<span class="pl-pref-tag sensitivity">${s}</span>`).join('')}</div>
    </div>`;
}

function renderFavProjects(p) {
  if (!p.favorites?.length) return '';
  return `
    <div class="pl-fav-section">
      <div class="pl-fav-label">Favorite Projects</div>
      <div class="pl-project-list">
        ${p.favorites.map(fav => {
          const proj = PROJECT_CATALOG.find(pr => pr.id === fav.id);
          const name = proj ? proj.name : fav.id;
          const badge = fav.madeCount ? `Made ${fav.madeCount}×` : '';
          return `<div class="pl-project-list-item">
            <svg class="pl-project-list-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span class="pl-project-list-name">${name}</span>
            ${badge ? `<span class="pl-project-list-badge">${badge}</span>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

function renderWantToMake(p) {
  if (!p.wantToMake?.length) return '';
  return `
    <div class="pl-fav-section">
      <div class="pl-fav-label">Want to Make</div>
      <div class="pl-project-list">
        ${p.wantToMake.map(w => {
          const proj = PROJECT_CATALOG.find(pr => pr.id === w);
          const name = proj ? proj.name : w;
          return `<div class="pl-project-list-item">
            <svg class="pl-project-list-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg>
            <span class="pl-project-list-name">${name}</span>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

// ── Stash rendering ──
// ── ROYGBIV + neutrals for stash color filter (HSL spectrum detection) ──
var STASH_COLOR_FILTER = [
  {key:'red',label:'Red',hex:'#C0392B',hueRange:[345,360,0,15],minSat:25,maxLit:80},
  {key:'orange',label:'Orange',hex:'#E67E22',hueRange:[15,45],minSat:30,maxLit:80},
  {key:'yellow',label:'Yellow',hex:'#F1C40F',hueRange:[45,65],minSat:30,maxLit:85},
  {key:'green',label:'Green',hex:'#27AE60',hueRange:[65,170],minSat:20,maxLit:80},
  {key:'blue',label:'Blue',hex:'#2980B9',hueRange:[170,260],minSat:20,maxLit:80},
  {key:'purple',label:'Purple',hex:'#8E44AD',hueRange:[260,310],minSat:20,maxLit:80},
  {key:'pink',label:'Pink',hex:'#E91E8A',hueRange:[310,345],minSat:20,maxLit:85},
  {key:'white',label:'White',hex:'#FDFEFE',isNeutral:'white'},
  {key:'gray',label:'Gray',hex:'#95A5A6',isNeutral:'gray'},
  {key:'brown',label:'Brown',hex:'#795548',isNeutral:'brown'},
  {key:'black',label:'Black',hex:'#2C3E50',isNeutral:'black'}
];

function hexToHSL(hex) {
  var r = parseInt(hex.slice(1,3),16)/255, g = parseInt(hex.slice(3,5),16)/255, b = parseInt(hex.slice(5,7),16)/255;
  var mx = Math.max(r,g,b), mn = Math.min(r,g,b), d = mx - mn;
  var h = 0, s = 0, l = (mx + mn) / 2;
  if (d > 0) {
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    if (mx === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (mx === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  return { h: h, s: s * 100, l: l * 100 };
}

function colorMatchesFilter(hex, filter) {
  if (!hex) return false;
  var hsl = hexToHSL(hex);
  // Neutrals
  if (filter.isNeutral) {
    if (filter.isNeutral === 'white') return hsl.l > 88 && hsl.s < 15;
    if (filter.isNeutral === 'black') return hsl.l < 18;
    if (filter.isNeutral === 'gray') return hsl.s < 15 && hsl.l >= 18 && hsl.l <= 88;
    if (filter.isNeutral === 'brown') return hsl.s >= 15 && hsl.s < 65 && hsl.l >= 15 && hsl.l < 55 && ((hsl.h >= 10 && hsl.h <= 45) || hsl.h >= 350);
    return false;
  }
  // Chromatic — check saturation + lightness
  if (hsl.s < (filter.minSat || 20)) return false;
  if (hsl.l > (filter.maxLit || 80) || hsl.l < 10) return false;
  // Hue ranges — red wraps around 0/360
  var hr = filter.hueRange;
  if (hr.length === 4) {
    // Wrapping range: [345,360,0,15]
    return (hsl.h >= hr[0] && hsl.h <= hr[1]) || (hsl.h >= hr[2] && hsl.h <= hr[3]);
  }
  return hsl.h >= hr[0] && hsl.h < hr[1];
}

// ── 2-Level Color Selector (reusable) ──
var COLOR_FAMILIES = [
  {key:'red',label:'Red',hex:'#C0392B',variants:[
    {name:'Scarlet',hex:'#FF2400'},{name:'Crimson',hex:'#DC143C'},{name:'Ruby',hex:'#9B111E'},{name:'Burgundy',hex:'#800020'},{name:'Cherry',hex:'#DE3163'},{name:'Brick',hex:'#CB4154'},{name:'Rust',hex:'#B7410E'},{name:'Wine',hex:'#722F37'}
  ]},
  {key:'orange',label:'Orange',hex:'#E67E22',variants:[
    {name:'Tangerine',hex:'#FF9966'},{name:'Amber',hex:'#FFBF00'},{name:'Burnt Orange',hex:'#CC5500'},{name:'Peach',hex:'#FFCBA4'},{name:'Coral',hex:'#FF7F50'},{name:'Terracotta',hex:'#E2725B'},{name:'Apricot',hex:'#FBCEB1'},{name:'Copper',hex:'#B87333'}
  ]},
  {key:'yellow',label:'Yellow',hex:'#F1C40F',variants:[
    {name:'Gold',hex:'#FFD700'},{name:'Mustard',hex:'#FFDB58'},{name:'Butter',hex:'#FFFACD'},{name:'Saffron',hex:'#F4C430'},{name:'Lemon',hex:'#FFF44F'},{name:'Chartreuse',hex:'#DFFF00'},{name:'Maize',hex:'#FBEC5D'},{name:'Canary',hex:'#FFEF00'}
  ]},
  {key:'green',label:'Green',hex:'#27AE60',variants:[
    {name:'Sage',hex:'#BCB88A'},{name:'Olive',hex:'#808000'},{name:'Forest',hex:'#228B22'},{name:'Emerald',hex:'#50C878'},{name:'Mint',hex:'#98FF98'},{name:'Hunter',hex:'#355E3B'},{name:'Moss',hex:'#8A9A5B'},{name:'Seafoam',hex:'#93E9BE'}
  ]},
  {key:'blue',label:'Blue',hex:'#2980B9',variants:[
    {name:'Navy',hex:'#1B2A4A'},{name:'Royal',hex:'#4169E1'},{name:'Sky',hex:'#87CEEB'},{name:'Cobalt',hex:'#0047AB'},{name:'Teal',hex:'#008080'},{name:'Denim',hex:'#1560BD'},{name:'Slate',hex:'#6A5ACD'},{name:'Powder',hex:'#B0E0E6'}
  ]},
  {key:'purple',label:'Purple',hex:'#8E44AD',variants:[
    {name:'Lavender',hex:'#E6E6FA'},{name:'Plum',hex:'#8E4585'},{name:'Mauve',hex:'#E0B0FF'},{name:'Eggplant',hex:'#614051'},{name:'Amethyst',hex:'#9966CC'},{name:'Violet',hex:'#7F00FF'},{name:'Lilac',hex:'#C8A2C8'},{name:'Grape',hex:'#6F2DA8'}
  ]},
  {key:'pink',label:'Pink',hex:'#E91E8A',variants:[
    {name:'Blush',hex:'#DE5D83'},{name:'Rose',hex:'#FF007F'},{name:'Fuchsia',hex:'#FF00FF'},{name:'Salmon',hex:'#FA8072'},{name:'Magenta',hex:'#FF0090'},{name:'Hot Pink',hex:'#FF69B4'},{name:'Dusty Rose',hex:'#DCAE96'},{name:'Carnation',hex:'#FFA6C9'}
  ]},
  {key:'neutral',label:'Neutrals',hex:'#95A5A6',variants:[
    {name:'Natural',hex:'#E8DCC8'},{name:'White',hex:'#FDFEFE'},{name:'Ivory',hex:'#FFFFF0'},{name:'Cream',hex:'#FFFDD0'},{name:'Tan',hex:'#D2B48C'},{name:'Taupe',hex:'#483C32'},{name:'Beige',hex:'#F5F5DC'},{name:'Charcoal',hex:'#36454F'},
    {name:'Gray',hex:'#808080'},{name:'Silver',hex:'#C0C0C0'},{name:'Black',hex:'#2C3E50'},{name:'Brown',hex:'#795548'}
  ]}
];

function plBuildColorSelector(currentName, currentHex) {
  var cn = currentName || 'Natural';
  var ch = currentHex || '#E8DCC8';
  // Find which family the current color belongs to
  var currentFamily = '';
  COLOR_FAMILIES.forEach(function(fam) {
    fam.variants.forEach(function(v) { if (v.name === cn) currentFamily = fam.key; });
  });
  if (!currentFamily) currentFamily = 'neutral';

  // Tier 1: Family selector dots
  var tier1 = '<div class="pl-color-tier1" id="plColorTier1">' +
    COLOR_FAMILIES.map(function(fam) {
      var isActive = fam.key === currentFamily;
      var dotStyle = fam.key === 'neutral'
        ? 'background:conic-gradient(#E8DCC8 0deg,#FDFEFE 90deg,#808080 180deg,#2C3E50 270deg,#E8DCC8 360deg);'
        : 'background:' + fam.hex + ';';
      return '<button class="pl-color-family-dot' + (isActive ? ' active' : '') + '" data-family="' + fam.key + '" style="' + dotStyle + '" title="' + fam.label + '"></button>';
    }).join('') + '</div>';

  // Tier 2: Variant chips for active family
  var activeFam = COLOR_FAMILIES.find(function(f) { return f.key === currentFamily; }) || COLOR_FAMILIES[7];
  var tier2 = '<div class="pl-color-tier2" id="plColorTier2">' +
    activeFam.variants.map(function(v) {
      var sel = v.name === cn;
      return '<button class="pl-color-variant-chip' + (sel ? ' selected' : '') + '" data-color-name="' + v.name + '" data-color-hex="' + v.hex + '">' +
        '<span class="pl-color-variant-swatch" style="background:' + v.hex + ';"></span>' + v.name + '</button>';
    }).join('') + '</div>';

  // Tier 3: Name input + hex picker
  var tier3 = '<div class="pl-color-tier3">' +
    '<input type="text" class="pl-select" id="plStashColorName" value="' + cn + '" placeholder="Color name" style="flex:1;">' +
    '<input type="color" id="plStashColorHex" value="' + ch + '" style="width:36px;height:30px;border:none;cursor:pointer;border-radius:4px;">' +
    '<span id="plStashColorPreview" style="font-size:0.72rem;color:var(--ink-light);min-width:60px;">' + ch + '</span>' +
    '</div>';

  return tier1 + tier2 + tier3;
}

function plAttachColorSelectorListeners(form) {
  // Tier 1: family dot click
  form.querySelectorAll('#plColorTier1 .pl-color-family-dot').forEach(function(dot) {
    dot.addEventListener('click', function() {
      form.querySelectorAll('#plColorTier1 .pl-color-family-dot').forEach(function(d) { d.classList.remove('active'); });
      dot.classList.add('active');
      var famKey = dot.dataset.family;
      var fam = COLOR_FAMILIES.find(function(f) { return f.key === famKey; });
      if (!fam) return;
      // Rebuild tier 2
      var tier2 = form.querySelector('#plColorTier2');
      tier2.innerHTML = fam.variants.map(function(v) {
        return '<button class="pl-color-variant-chip" data-color-name="' + v.name + '" data-color-hex="' + v.hex + '">' +
          '<span class="pl-color-variant-swatch" style="background:' + v.hex + ';"></span>' + v.name + '</button>';
      }).join('');
      // Attach tier 2 listeners
      plAttachColorTier2Listeners(form);
      // Auto-select first variant
      var first = fam.variants[0];
      form.querySelector('#plStashColorName').value = first.name;
      form.querySelector('#plStashColorHex').value = first.hex;
      var preview = form.querySelector('#plStashColorPreview');
      if (preview) preview.textContent = first.hex;
      tier2.querySelector('.pl-color-variant-chip').classList.add('selected');
    });
  });
  plAttachColorTier2Listeners(form);
  // Tier 3: hex picker + name input
  var hexInput = form.querySelector('#plStashColorHex');
  var nameInput = form.querySelector('#plStashColorName');
  var preview = form.querySelector('#plStashColorPreview');
  if (hexInput) {
    hexInput.addEventListener('input', function() {
      if (preview) preview.textContent = hexInput.value;
      // Deselect tier 2 chips since custom
      form.querySelectorAll('#plColorTier2 .pl-color-variant-chip').forEach(function(c) { c.classList.remove('selected'); });
    });
  }
}

function plAttachColorTier2Listeners(form) {
  form.querySelectorAll('#plColorTier2 .pl-color-variant-chip').forEach(function(chip) {
    chip.addEventListener('click', function() {
      form.querySelectorAll('#plColorTier2 .pl-color-variant-chip').forEach(function(c) { c.classList.remove('selected'); });
      chip.classList.add('selected');
      form.querySelector('#plStashColorName').value = chip.dataset.colorName;
      form.querySelector('#plStashColorHex').value = chip.dataset.colorHex;
      var preview = form.querySelector('#plStashColorPreview');
      if (preview) preview.textContent = chip.dataset.colorHex;
    });
  });
}

// ── Stash/Workshop view state ──
let plStashPanel = 'all-materials';

function renderStashWorkshop(data) {
  const leftEl = document.getElementById('plStashLeft');
  const rightEl = document.getElementById('plStashRight');
  if (!leftEl) { renderStashView(data); return; }

  const stash = data.stash || [];
  const prof = data.profile || {};
  const ownedTools = prof.ownedTools || {};
  const fiberSet = {};
  stash.forEach(e => {
    if (!fiberSet[e.fiber]) fiberSet[e.fiber] = { count: 0, yd: 0 };
    fiberSet[e.fiber].count++;
    fiberSet[e.fiber].yd += (e.yardage || 0);
  });
  const totalBolts = stash.length;
  const totalYd = stash.reduce((s, e) => s + (e.yardage || 0), 0);

  const equipCounts = {
    machines: (ownedTools.machines || []).length,
    cutting: (ownedTools.cutting || []).length,
    pressing: (ownedTools.pressing || []).length,
    measuring: ((ownedTools.measuring || []).length + (ownedTools.marking || []).length)
  };
  const equipItems = [
    { id: 'machines', icon: '🧵', name: 'Machines', count: equipCounts.machines },
    { id: 'cutting', icon: '✂️', name: 'Cutting', count: equipCounts.cutting },
    { id: 'pressing', icon: '♨️', name: 'Pressing', count: equipCounts.pressing },
    { id: 'measuring', icon: '📏', name: 'Measuring & Marking', count: equipCounts.measuring }
  ];
  const addSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="12" height="12"><path d="M12 5v14M5 12h14"/></svg>';

  let lhtml = '<div class="pl-stash-left-hdr"><span class="pl-stash-left-title">Stash</span></div>';
  lhtml += '<div class="pl-stash-sec-hdr"><span class="pl-stash-sec-label">Equipment</span></div>';
  equipItems.forEach(eq => {
    const sel = plStashPanel === eq.id ? ' selected' : '';
    lhtml += '<div class="pl-stash-li' + sel + '" data-panel="' + eq.id + '"><div class="pl-stash-li-icon equip">' + eq.icon + '</div><div class="pl-stash-li-info"><div class="pl-stash-li-name">' + eq.name + '</div><div class="pl-stash-li-meta">' + eq.count + ' owned</div></div></div>';
  });

  lhtml += '<div class="pl-stash-sec-hdr"><span class="pl-stash-sec-label">Materials</span><button class="pl-people-sec-add" title="Add fabric" data-action="add-fabric">' + addSvg + '</button></div>';
  const allSel = plStashPanel === 'all-materials' ? ' selected' : '';
  lhtml += '<div class="pl-stash-summary-li' + allSel + '" data-panel="all-materials"><div style="font-size:1rem;width:32px;text-align:center;">📦</div><div class="pl-stash-li-info"><div class="pl-stash-li-name">All Fabrics</div><div class="pl-stash-li-meta">' + totalBolts + ' bolts · ' + totalYd.toFixed(1) + ' yd</div></div></div>';

  Object.keys(fiberSet).forEach(fk => {
    const f = window.FIBERS ? window.FIBERS[fk] : null;
    const sel = plStashPanel === 'fiber-' + fk ? ' selected' : '';
    lhtml += '<div class="pl-stash-li' + sel + '" data-panel="fiber-' + fk + '"><div class="pl-stash-li-icon fiber" style="background:' + (f ? f.accent : '#888') + ';">' + (f ? f.name[0] : fk[0].toUpperCase()) + '</div><div class="pl-stash-li-info"><div class="pl-stash-li-name">' + (f ? f.name : fk) + '</div><div class="pl-stash-li-meta">' + fiberSet[fk].count + ' bolt' + (fiberSet[fk].count !== 1 ? 's' : '') + '</div></div><span class="pl-stash-li-badge">' + fiberSet[fk].yd.toFixed(1) + ' yd</span></div>';
  });

  leftEl.innerHTML = lhtml;

  leftEl.querySelectorAll('[data-panel]').forEach(li => {
    li.addEventListener('click', () => { plStashPanel = li.dataset.panel; renderStashWorkshop(loadUserData()); });
  });
  var addFabBtn = leftEl.querySelector('[data-action="add-fabric"]');
  if (addFabBtn) addFabBtn.addEventListener('click', (e) => { e.stopPropagation(); plStashPanel = 'all-materials'; renderStashWorkshop(loadUserData()); setTimeout(() => plAddStashEntry(), 50); });

  if (plStashPanel === 'all-materials') {
    renderStashView(data);
  } else if (plStashPanel.startsWith('fiber-')) {
    renderStashFiberDetail(data, plStashPanel.replace('fiber-', ''));
  } else {
    renderStashEquipment(data, plStashPanel);
  }
}

function renderStashFiberDetail(data, fiberKey) {
  const wrap = document.getElementById('plStashView');
  if (!wrap) return;
  const stash = data.stash || [];
  const bolts = stash.filter(e => e.fiber === fiberKey);
  const f = window.FIBERS ? window.FIBERS[fiberKey] : null;
  const totalYd = bolts.reduce((s, e) => s + (e.yardage || 0), 0);
  let html = '<div class="pl-stash-fiber-hdr"><div class="pl-stash-fiber-av" style="background:' + (f ? f.accent : '#888') + ';">' + (f ? f.name[0] : '?') + '</div><div class="pl-stash-fiber-info"><div class="pl-stash-fiber-name">' + (f ? f.name : fiberKey) + '</div><div class="pl-stash-fiber-sub">' + bolts.length + ' bolt' + (bolts.length !== 1 ? 's' : '') + ' · ' + totalYd.toFixed(1) + ' yd total</div></div><button class="pl-btn-primary" style="font-size:0.76rem;padding:7px 14px;" data-action="add-bolt">+ Add Bolt</button></div>';
  bolts.forEach(bolt => {
    const colorHex = bolt.colorHex || '#ccc';
    const variety = bolt.variety || 'Unknown';
    const specs = [bolt.colorName, bolt.width ? bolt.width + '″' : '', bolt.weightLabel || ''].filter(Boolean).join(' · ');
    html += '<div class="pl-stash-fabric-card" style="margin-bottom:10px;"><div style="display:flex;align-items:center;gap:12px;padding:14px 18px;"><div style="width:40px;height:40px;border-radius:10px;background:' + colorHex + ';border:1px solid rgba(0,0,0,0.08);flex-shrink:0;"></div><div style="flex:1;"><div style="font-size:0.88rem;font-weight:600;">' + variety + '</div><div style="font-size:0.72rem;color:var(--ink-light);margin-top:2px;">' + specs + '</div></div><div style="font-size:1rem;font-weight:700;">' + (bolt.yardage || 0).toFixed(1) + ' yd</div></div></div>';
  });
  if (bolts.length === 0) {
    html += '<div class="pl-people-empty"><div class="pl-people-empty-icon">🧵</div><div class="pl-people-empty-title">No ' + (f ? f.name : '') + ' in stash</div><div class="pl-people-empty-text">Add a bolt to start tracking.</div></div>';
  }
  wrap.innerHTML = html;
  var addBtn = wrap.querySelector('[data-action="add-bolt"]');
  if (addBtn) addBtn.addEventListener('click', () => plAddStashEntry());
}

function renderStashEquipment(data, category) {
  const wrap = document.getElementById('plStashView');
  if (!wrap) return;
  const prof = data.profile || {};
  const ownedTools = prof.ownedTools || {};
  const urls = prof.toolUrls || {};
  const cats = {
    machines: { icon: '🧵', title: 'Machines', desc: 'Your sewing machines — track what you own and link to manuals.', items: [
      { k: 'sewing', n: 'Sewing Machine', d: 'Standard home machine — straight stitch, zigzag, buttonholes', cat: 'machines' },
      { k: 'serger', n: 'Serger / Overlock', d: 'Trims, encloses, and finishes seam edges in one pass', cat: 'machines' },
      { k: 'coverstitch', n: 'Cover Stitch', d: 'Professional hems and decorative topstitching on knits', cat: 'machines' }
    ]},
    cutting: { icon: '✂️', title: 'Cutting Tools', desc: 'Scissors, rotary cutters, and cutting surfaces.', items: [
      { k: 'rotary', n: 'Rotary Cutter', d: '45mm blade', cat: 'cutting' },
      { k: 'shears', n: 'Fabric Shears', d: 'Bent-handle dressmaker shears', cat: 'cutting' },
      { k: 'mat', n: 'Self-Healing Mat', cat: 'cutting' },
      { k: 'pinking', n: 'Pinking Shears', d: 'Zigzag-edge scissors', cat: 'cutting' }
    ]},
    pressing: { icon: '♨️', title: 'Pressing Tools', desc: 'Irons, pressing surfaces, and shaping tools.', items: [
      { k: 'iron', n: 'Steam Iron', cat: 'pressing' },
      { k: 'ham', n: 'Pressing Ham', d: 'For darts and curves', cat: 'pressing' },
      { k: 'sleeveBoard', n: 'Sleeve Board', cat: 'pressing' },
      { k: 'clapper', n: 'Clapper', d: 'Sets crisp edges', cat: 'pressing' }
    ]},
    measuring: { icon: '📏', title: 'Measuring & Marking', desc: 'Rulers, gauges, and fabric marking tools.', items: [
      { k: 'tape', n: 'Tape Measure', cat: 'measuring' },
      { k: 'seamGauge', n: 'Seam Gauge', cat: 'measuring' },
      { k: 'frenchCurve', n: 'French Curve', cat: 'measuring' },
      { k: 'chalk', n: 'Tailor\'s Chalk', cat: 'marking' },
      { k: 'ink', n: 'Disappearing Ink Pen', cat: 'marking' },
      { k: 'tracingWheel', n: 'Tracing Wheel', cat: 'marking' }
    ]}
  };
  const catData = cats[category];
  if (!catData) { wrap.innerHTML = ''; return; }
  let html = '<div class="pl-stash-equip-hdr"><div class="pl-stash-equip-title">' + catData.icon + ' ' + catData.title + '</div><div class="pl-stash-equip-desc">' + catData.desc + '</div></div><div class="pl-stash-equip-grid">';
  catData.items.forEach(item => {
    const toolCat = item.cat || category;
    const owned = (ownedTools[toolCat] || []).includes(item.k);
    const urlKey = toolCat + ':' + item.k;
    const urlVal = urls[urlKey] || '';
    html += '<div class="pl-stash-tool-card' + (owned ? '' : ' missing') + '"><div class="pl-stash-tool-check ' + (owned ? 'yes' : 'no') + '">' + (owned ? '✓' : '○') + '</div><div class="pl-stash-tool-info"><div class="pl-stash-tool-name">' + item.n + '</div>';
    if (item.d) html += '<div class="pl-stash-tool-detail">' + item.d + '</div>';
    html += '</div>';
    if (urlVal) html += '<a href="' + urlVal + '" target="_blank" style="font-size:0.68rem;color:var(--accent);text-decoration:none;">Manual ↗</a>';
    html += '</div>';
  });
  html += '</div>';
  wrap.innerHTML = html;
}

function renderStashView(data) {
  const wrap = document.getElementById('plStashView');
  const stash = data.stash || [];
  const groups = getStashGroups(stash);
  const totalYd = stash.reduce((s, e) => s + (e.yardage || 0), 0);
  const fiberSet = new Set(stash.map(e => e.fiber));
  const boltCount = stash.length;

  // Restore or init filter state
  const fs = wrap._stashFilters || { construction: 'all', weight: 'all', color: 'all', pattern: 'all' };
  wrap._stashFilters = fs;

  // ── Summary row (mockup style with stat chips + button icons) ──
  const summaryHtml = `<div class="pl-stash-summary">
    <div class="pl-stash-summary-stats">
      <div class="pl-stash-summary-chip"><span class="pl-stash-summary-value">${boltCount}</span><span class="pl-stash-summary-label">Entries</span></div>
      <div class="pl-stash-summary-chip"><span class="pl-stash-summary-value">${totalYd.toFixed(1)}</span><span class="pl-stash-summary-label">Total Yards</span></div>
      <div class="pl-stash-summary-chip"><span class="pl-stash-summary-value">${fiberSet.size}</span><span class="pl-stash-summary-label">Fibers</span></div>
      <div class="pl-stash-summary-chip"><span class="pl-stash-summary-value">${groups.length}</span><span class="pl-stash-summary-label">Groups</span></div>
    </div>
    <div class="pl-stash-summary-actions">
      <button class="pl-btn-secondary pl-stash-import-btn" style="font-size:0.78rem;padding:6px 14px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Import
      </button>
      <button class="pl-btn-primary pl-stash-add-btn" style="font-size:0.78rem;padding:6px 14px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add Fabric
      </button>
    </div>
  </div>`;

  // ── Filter row ──
  const weightOpts = WEIGHT_CATEGORIES.map(w => `<option value="${w.key}"${fs.weight === w.key ? ' selected' : ''}>${w.label}</option>`).join('');
  const patternOpts = PATTERN_OPTIONS.map(p => `<option value="${p.key}"${fs.pattern === p.key ? ' selected' : ''}>${p.label}</option>`).join('');

  const colorFilterHtml = STASH_COLOR_FILTER.map(c =>
    `<button class="pl-color-filter-dot${fs.color === c.key ? ' active' : ''}" data-color="${c.key}" style="background:${c.hex};" title="${c.label}"></button>`
  ).join('');

  const hasActiveFilter = fs.construction !== 'all' || fs.weight !== 'all' || fs.color !== 'all' || fs.pattern !== 'all';

  const filterHtml = `<div class="pl-stash-filter-row">
    <div class="pl-stash-filter-group">
      <div class="pl-stash-construction-toggle">
        <button class="pl-stash-toggle-btn${fs.construction === 'all' ? ' active' : ''}" data-construction="all">All</button>
        <button class="pl-stash-toggle-btn${fs.construction === 'woven' ? ' active' : ''}" data-construction="woven">Woven</button>
        <button class="pl-stash-toggle-btn${fs.construction === 'knit' ? ' active' : ''}" data-construction="knit">Knit</button>
      </div>
      <select class="pl-stash-filter-select" id="plStashWeightFilter">
        <option value="all"${fs.weight === 'all' ? ' selected' : ''}>All weights</option>
        ${weightOpts}
      </select>
      <select class="pl-stash-filter-select" id="plStashPatternFilter">
        <option value="all"${fs.pattern === 'all' ? ' selected' : ''}>All patterns</option>
        ${patternOpts}
      </select>
    </div>
    <div class="pl-stash-filter-right">
      <div class="pl-stash-color-filter">
        <button class="pl-color-filter-dot all${fs.color === 'all' ? ' active' : ''}" data-color="all" title="All colors"></button>
        ${colorFilterHtml}
      </div>
      <button class="pl-stash-reset-filters${hasActiveFilter ? ' active' : ''}" title="Reset all filters"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M3 12a9 9 0 1 1 3.5 7.1"/><polyline points="3 22 3 16 9 16"/></svg>Reset</button>
    </div>
  </div>`;

  wrap.innerHTML = summaryHtml + filterHtml + `<div id="plStashGroups">${renderStashGroups(groups, stash, fs)}</div>`;

  // ── Filter event listeners ──
  // Construction toggle
  wrap.querySelectorAll('.pl-stash-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      fs.construction = btn.dataset.construction;
      renderStashView(loadUserData());
    });
  });
  // Weight filter
  document.getElementById('plStashWeightFilter').addEventListener('change', (e) => {
    fs.weight = e.target.value;
    renderStashView(loadUserData());
  });
  // Pattern filter
  document.getElementById('plStashPatternFilter').addEventListener('change', (e) => {
    fs.pattern = e.target.value;
    renderStashView(loadUserData());
  });
  // Color filter dots
  wrap.querySelectorAll('.pl-color-filter-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      fs.color = dot.dataset.color;
      renderStashView(loadUserData());
    });
  });
  // Reset all filters
  const resetBtn = wrap.querySelector('.pl-stash-reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      fs.construction = 'all'; fs.weight = 'all'; fs.color = 'all'; fs.pattern = 'all';
      renderStashView(loadUserData());
    });
  }
  // Summary action buttons
  wrap.querySelector('.pl-stash-import-btn').addEventListener('click', () => {
    document.getElementById('plImportFile').click();
  });
  wrap.querySelector('.pl-stash-add-btn').addEventListener('click', () => {
    plAddStashEntry();
  });

  attachBoltGroupListeners();
}

function renderStashGroups(groups, stash, filters) {
  // Apply filters to stash entries
  let filtered = stash.slice();
  if (filters.construction !== 'all') {
    filtered = filtered.filter(e => filters.construction === 'knit' ? e.isKnit : !e.isKnit);
  }
  if (filters.weight !== 'all') {
    // Show selected weight + neighbors
    var wIdx = WEIGHT_CATEGORIES.findIndex(function(w) { return w.key === filters.weight; });
    var allowedKeys = [filters.weight];
    if (wIdx > 0) allowedKeys.push(WEIGHT_CATEGORIES[wIdx - 1].key);
    if (wIdx < WEIGHT_CATEGORIES.length - 1) allowedKeys.push(WEIGHT_CATEGORIES[wIdx + 1].key);
    filtered = filtered.filter(function(e) {
      var wc = getWeightCategory(e.weight);
      return wc && allowedKeys.indexOf(wc.key) !== -1;
    });
  }
  if (filters.color !== 'all') {
    var cf = STASH_COLOR_FILTER.find(function(c) { return c.key === filters.color; });
    if (cf) filtered = filtered.filter(function(e) { return e.colorHex && colorMatchesFilter(e.colorHex, cf); });
  }
  if (filters.pattern !== 'all') {
    filtered = filtered.filter(e => (e.pattern || 'solid') === filters.pattern);
  }

  if (!filtered.length) {
    return '<div class="rec-empty">' + (stash.length ? 'No fabrics match the current filters.' : 'No fabrics in your stash yet. Add some to get started!') + '</div>';
  }

  // Group by fiber, then by variety within each fiber
  const fiberGroups = {};
  filtered.forEach(e => {
    if (!fiberGroups[e.fiber]) fiberGroups[e.fiber] = {};
    const vKey = e.variety || 'Standard';
    if (!fiberGroups[e.fiber][vKey]) fiberGroups[e.fiber][vKey] = [];
    fiberGroups[e.fiber][vKey].push(e);
  });

  const wrap = document.getElementById('plStashView');
  const expandedBolt = wrap?.dataset.expandedBolt || '';
  const openFibers = wrap._openFibers || {};

  let html = '';
  Object.keys(fiberGroups).forEach(fiberKey => {
    const f = FIBERS[fiberKey];
    const varieties = fiberGroups[fiberKey];
    const allFiberEntries = Object.values(varieties).flat();
    const fiberYd = allFiberEntries.reduce((s, e) => s + (e.yardage || 0), 0);
    const isOpen = openFibers[fiberKey] !== false; // default open
    const chevron = isOpen ? '\u25BC' : '\u25B6';

    html += `<div class="pl-fiber-accordion" data-fiber="${fiberKey}">
      <div class="pl-fiber-accordion-header" data-fiber="${fiberKey}" style="background:${f?.bg || '#f5f5f5'};">
        <div class="pl-fiber-accordion-left">
          <span class="pl-fiber-dot" style="background:${f?.accent || '#999'};width:10px;height:10px;"></span>
          <span class="pl-fiber-accordion-name" style="color:${f?.accent || '#555'};">${f?.name || fiberKey}</span>
          <span class="pl-fiber-accordion-count">${allFiberEntries.length} bolt${allFiberEntries.length !== 1 ? 's' : ''}</span>
        </div>
        <div class="pl-fiber-accordion-right">
          <span class="pl-fiber-accordion-yd">${fiberYd.toFixed(1)} yd</span>
          <span class="pl-fiber-accordion-chevron">${chevron}</span>
        </div>
      </div>`;

    if (isOpen) {
      html += '<div class="pl-fiber-accordion-body">';
      Object.keys(varieties).forEach(vName => {
        const bolts = varieties[vName];
        const multiVariety = Object.keys(varieties).length > 1;
        if (multiVariety) {
          html += `<div class="pl-variety-subgroup">
            <div class="pl-variety-subgroup-label">${vName}</div>`;
        }

        bolts.forEach(e => {
          const wc = getWeightCategory(e.weight);
          const patternClass = e.pattern && e.pattern !== 'solid' ? ' pattern-' + e.pattern : '';
          const isExpanded = e.id === expandedBolt;

          html += `<div class="pl-bolt-row${isExpanded ? ' expanded' : ''}" data-bolt-id="${e.id}">
            <div class="pl-bolt-row-main">
              <div class="pl-bolt-swatch${patternClass}" style="background:${e.colorHex || '#ccc'};"></div>
              <div class="pl-bolt-row-info">
                <div class="pl-bolt-color-name">${e.colorName || 'Unnamed'}</div>
                <div class="pl-bolt-specs">${wc ? wc.label : ''} ${e.isKnit ? 'Knit' : 'Woven'}${e.width ? ' \u00B7 ' + e.width + '\u2033' : ''}</div>
              </div>
              <div class="pl-bolt-yardage">${(e.yardage || 0).toFixed(1)} yd</div>
              <div class="pl-bolt-row-chevron">${isExpanded ? '\u25B2' : '\u25BC'}</div>
            </div>`;

          // Inline detail panel
          if (isExpanded) {
            const washedLabel = e.washed === 'prewashed' ? 'Pre-washed' : e.washed === 'preshrunk' || e.preShrunk ? 'Pre-shrunk' : 'Unwashed';
            const patternLabel = e.pattern ? e.pattern.charAt(0).toUpperCase() + e.pattern.slice(1) : 'Solid';
            const shrinkage = e.shrinkageOverride || (f?.care?.shrinkagePercent) || null;
            const tags = [];
            if (wc) tags.push(wc.label);
            tags.push(e.isKnit ? 'Knit' : 'Woven');
            if (e.tubular) tags.push('Tubular');
            tags.push(washedLabel);
            if (e.directional) tags.push('One-way');

            html += `<div class="pl-bolt-inline-detail" style="background:white;">
              <div class="pl-person-detail-tags" style="margin-bottom:10px;">${tags.map(t => '<span class="pl-person-detail-tag">' + t + '</span>').join('')}</div>
              <div class="pl-detail-grid">
                <div class="pl-fav-section">
                  <div class="pl-fav-label">Specifications</div>
                  <div class="pl-meas-groups">
                    <div class="pl-meas-group">
                      <div class="pl-meas-group-title">Dimensions</div>
                      <div class="pl-measurements">
                        <div class="pl-measure-item"><span class="pl-measure-label">Yardage</span><span class="pl-measure-val">${(e.yardage || 0).toFixed(1)} yd</span></div>
                        <div class="pl-measure-item"><span class="pl-measure-label">Width</span><span class="pl-measure-val">${e.width || '?'}\u2033${[36,42,44,45,54,58,60].indexOf(e.width) === -1 && e.width ? ' (custom)' : ''}</span></div>
                      </div>
                    </div>
                    <div class="pl-meas-group">
                      <div class="pl-meas-group-title">Properties</div>
                      <div class="pl-measurements">
                        <div class="pl-measure-item"><span class="pl-measure-label">Weight</span><span class="pl-measure-val">${e.weight || '?'} oz/yd\u00B2${e.weight ? ' (' + ozToGsm(e.weight) + ' GSM)' : ''}</span></div>
                        <div class="pl-measure-item"><span class="pl-measure-label">Stretch</span><span class="pl-measure-val">${e.stretch !== undefined && e.stretch !== null ? e.stretch + '%' : '\u2014'}</span></div>
                        <div class="pl-measure-item"><span class="pl-measure-label">Pattern</span><span class="pl-measure-val">${patternLabel}</span></div>
                        ${shrinkage ? '<div class="pl-measure-item"><span class="pl-measure-label">Shrinkage</span><span class="pl-measure-val">' + shrinkage + '</span></div>' : ''}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  ${e.source || e.dateAcquired || e.url ? '<div class="pl-fav-section"><div class="pl-fav-label">Provenance</div><div class="pl-meas-group"><div class="pl-measurements">' + (e.source ? '<div class="pl-measure-item"><span class="pl-measure-label">Source</span><span class="pl-measure-val">' + e.source + '</span></div>' : '') + (e.url ? '<div class="pl-measure-item"><span class="pl-measure-label">URL</span><span class="pl-measure-val"><a href="' + e.url + '" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:underline;word-break:break-all;">' + (e.url.length > 40 ? e.url.slice(0,40) + '…' : e.url) + '</a></span></div>' : '') + (e.dateAcquired ? '<div class="pl-measure-item"><span class="pl-measure-label">Acquired</span><span class="pl-measure-val">' + e.dateAcquired + '</span></div>' : '') + '</div></div></div>' : ''}
                  ${e.notes ? '<div class="pl-fav-section"><div class="pl-fav-label">Notes</div><div style="font-size:0.8rem;color:var(--ink-light);padding:8px 12px;background:var(--cream);border-radius:8px;white-space:pre-wrap;">' + e.notes + '</div></div>' : ''}
                </div>
              </div>
              <div class="pl-bolt-inline-actions">
                <button class="pl-btn-secondary pl-bolt-edit-btn" data-bolt-id="${e.id}" style="font-size:0.78rem;padding:5px 12px;">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit
                </button>
                <button class="pl-btn-secondary" data-bolt-id="${e.id}" style="font-size:0.78rem;padding:5px 12px;color:#c0392b;" onclick="plDeleteStashEntry('${e.id}')">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
                <div style="flex:1;"></div>
                <button class="pl-btn-primary pl-bolt-use-btn" data-bolt-id="${e.id}" style="font-size:0.78rem;padding:5px 14px;">Use this \u2192</button>
              </div>
            </div>`;
          }

          html += '</div>'; // close .pl-bolt-row
        });

        if (multiVariety) html += '</div>'; // close .pl-variety-subgroup
      });

      html += '</div>'; // close .pl-fiber-accordion-body
    }

    html += '</div>'; // close .pl-fiber-accordion
  });

  return html;
}

function attachBoltGroupListeners() {
  const wrap = document.getElementById('plStashView');
  if (!wrap._openFibers) wrap._openFibers = {};

  // Fiber accordion header toggle
  document.querySelectorAll('#plStashGroups .pl-fiber-accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const fk = header.dataset.fiber;
      wrap._openFibers[fk] = wrap._openFibers[fk] === false ? true : false;
      const data = loadUserData();
      const groups = getStashGroups(data.stash || []);
      const fs = wrap._stashFilters || { construction: 'all', weight: 'all', color: 'all', pattern: 'all' };
      document.getElementById('plStashGroups').innerHTML = renderStashGroups(groups, data.stash || [], fs);
      attachBoltGroupListeners();
    });
  });

  // Bolt row click → toggle inline detail
  document.querySelectorAll('#plStashGroups .pl-bolt-row-main').forEach(row => {
    row.addEventListener('click', () => {
      const boltId = row.parentElement.dataset.boltId;
      // Toggle: if same bolt, collapse; otherwise expand new one
      wrap.dataset.expandedBolt = wrap.dataset.expandedBolt === boltId ? '' : boltId;
      const data = loadUserData();
      const groups = getStashGroups(data.stash || []);
      const fs = wrap._stashFilters || { construction: 'all', weight: 'all', color: 'all', pattern: 'all' };
      document.getElementById('plStashGroups').innerHTML = renderStashGroups(groups, data.stash || [], fs);
      attachBoltGroupListeners();
    });
  });

  // Use from stash buttons
  document.querySelectorAll('#plStashGroups .pl-bolt-use-btn').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const data = loadUserData();
      const bolt = data.stash.find(s => s.id === btn.dataset.boltId);
      if (bolt) {
        plSelectedFabric = bolt;
        plSaveCurrentState();
        plGoToTab(0);
        document.querySelectorAll('#plMatchTabs .pl-profile-tab').forEach((mt, i) => mt.classList.toggle('active', i === 1));
        for (let i = 0; i < 3; i++) {
          const v = document.getElementById('plMatchView-' + i);
          if (v) v.style.display = i === 1 ? '' : 'none';
        }
      }
    });
  });

  // Edit bolt buttons
  document.querySelectorAll('#plStashGroups .pl-bolt-edit-btn').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      plEditStashEntry(btn.dataset.boltId);
    });
  });
}

// ── Stash form helpers (shared between add and edit) ──

function plBuildVarietySelect(fiberKey, selectedVariety) {
  const fiber = FIBERS[fiberKey];
  if (!fiber || !fiber.varieties || !fiber.varieties.length) {
    return '<input type="text" class="pl-select" id="plStashVariety" value="' + (selectedVariety || 'Standard') + '" placeholder="e.g., Poplin">';
  }
  const varieties = fiber.varieties;
  const isCustom = selectedVariety && !varieties.find(v => v.name === selectedVariety) && selectedVariety !== 'Standard';
  return '<select class="pl-select" id="plStashVariety">' +
    varieties.map(function(v) { return '<option value="' + v.name + '"' + (v.name === selectedVariety ? ' selected' : '') + '>' + v.name + (v.isKnit ? ' (knit)' : '') + '</option>'; }).join('') +
    '<option value="__custom__"' + (isCustom ? ' selected' : '') + '>Custom…</option>' +
    '</select>' +
    '<input type="text" class="pl-select" id="plStashVarietyCustom" placeholder="Enter variety name" style="margin-top:6px;display:' + (isCustom ? '' : 'none') + ';"' + (isCustom ? ' value="' + selectedVariety + '"' : '') + '>';
}

function plGetVarietyIsKnit(fiberKey, varietyName) {
  const fiber = FIBERS[fiberKey];
  if (!fiber || !fiber.varieties) return false;
  const v = fiber.varieties.find(function(va) { return va.name === varietyName; });
  return v ? !!v.isKnit : false;
}

function plGetFiberShrinkage(fiberKey) {
  const fiber = FIBERS[fiberKey];
  if (!fiber || !fiber.care) return '';
  return fiber.care.shrinkagePercent || '';
}

function plBuildKnitWovenToggle(fiberKey, varietyName, currentIsKnit) {
  const autoKnit = plGetVarietyIsKnit(fiberKey, varietyName);
  const isKnit = currentIsKnit !== undefined ? currentIsKnit : autoKnit;
  return '<div class="pl-option-pills" id="plStashKnitPills">' +
    '<button class="pl-option-pill' + (!isKnit ? ' selected' : '') + '" data-knit="woven">Woven</button>' +
    '<button class="pl-option-pill' + (isKnit ? ' selected' : '') + '" data-knit="knit">Knit</button>' +
    '</div>';
}

function plBuildWeightRow(weightOz, useGsm) {
  var displayVal = useGsm ? ozToGsm(weightOz || 4) : (weightOz || 4);
  var unit = useGsm ? 'GSM' : 'oz/yd²';
  return '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
    '<input type="number" class="pl-select" id="plStashWeight" step="' + (useGsm ? '5' : '0.5') + '" style="width:90px;" value="' + displayVal + '">' +
    '<div class="pl-option-pills" id="plStashWeightUnitPills" style="display:inline-flex;gap:4px;">' +
      '<button class="pl-option-pill' + (!useGsm ? ' selected' : '') + '" data-unit="oz" style="padding:4px 8px;font-size:0.78rem;">oz/yd²</button>' +
      '<button class="pl-option-pill' + (useGsm ? ' selected' : '') + '" data-unit="gsm" style="padding:4px 8px;font-size:0.78rem;">GSM</button>' +
    '</div>' +
    '</div>' +
    '<div class="pl-option-pills" id="plStashWeightPresets" style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;">' +
      WEIGHT_CATEGORIES.map(function(c) { return '<button class="pl-option-pill" data-preset-oz="' + ((c.min + Math.min(c.max, 12)) / 2).toFixed(1) + '" style="padding:3px 8px;font-size:0.72rem;">' + c.label + '</button>'; }).join('') +
    '</div>';
}

function plBuildShrinkageRow(fiberKey, currentShrinkage) {
  var fiberShrinkage = plGetFiberShrinkage(fiberKey);
  var hasOverride = currentShrinkage !== undefined && currentShrinkage !== null && currentShrinkage !== '';
  return '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
    '<span id="plStashShrinkageDefault" style="font-size:0.82rem;color:var(--ink-light);">' + (fiberShrinkage || 'Unknown') + '</span>' +
    '<label style="display:flex;align-items:center;gap:4px;font-size:0.78rem;cursor:pointer;">' +
      '<input type="checkbox" id="plStashShrinkageOverride"' + (hasOverride ? ' checked' : '') + '> Override' +
    '</label>' +
    '<input type="text" class="pl-select" id="plStashShrinkageVal" placeholder="e.g., 2–3%" style="width:100px;display:' + (hasOverride ? '' : 'none') + ';"' + (hasOverride ? ' value="' + currentShrinkage + '"' : '') + '>' +
    '</div>';
}

function plAttachStashSmartListeners(form) {
  // Fiber change → update variety dropdown + knit/woven + shrinkage + stretch
  var fiberSelect = form.querySelector('#plStashFiber');
  if (fiberSelect) {
    fiberSelect.addEventListener('change', function() {
      var fk = fiberSelect.value;
      // Update variety
      var varietyWrap = form.querySelector('#plStashVariety').parentNode;
      varietyWrap.innerHTML = plBuildVarietySelect(fk, '');
      plAttachVarietyCustomListener(form);
      // Update knit/woven
      var knitWrap = form.querySelector('#plStashKnitPills');
      if (knitWrap) {
        knitWrap.outerHTML = plBuildKnitWovenToggle(fk, '', undefined);
        plAttachPillListener(form, '#plStashKnitPills');
      }
      // Update shrinkage
      var shrinkDefault = form.querySelector('#plStashShrinkageDefault');
      if (shrinkDefault) shrinkDefault.textContent = plGetFiberShrinkage(fk) || 'Unknown';
      // Update stretch
      var stretchVal = plGetVarietyStretch(fk, '');
      var stretchSlider = form.querySelector('#plStashStretchSlider');
      var stretchNum = form.querySelector('#plStashStretchNum');
      if (stretchSlider) stretchSlider.value = stretchVal;
      if (stretchNum) stretchNum.value = stretchVal;
      // Update variety knit/stretch auto-detect
      plAttachVarietyKnitSync(form);
      plAttachVarietyStretchSync(form);
    });
  }

  // Variety change → auto-set knit/woven + stretch
  plAttachVarietyKnitSync(form);
  plAttachVarietyStretchSync(form);
  plAttachVarietyCustomListener(form);

  // Knit/Woven pill listeners
  plAttachPillListener(form, '#plStashKnitPills');

  // Weight unit toggle
  var unitPills = form.querySelectorAll('#plStashWeightUnitPills .pl-option-pill');
  unitPills.forEach(function(btn) {
    btn.addEventListener('click', function() {
      unitPills.forEach(function(b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
      var weightInput = form.querySelector('#plStashWeight');
      var curVal = parseFloat(weightInput.value) || 0;
      if (btn.dataset.unit === 'gsm') {
        weightInput.value = ozToGsm(curVal);
        weightInput.step = '5';
      } else {
        weightInput.value = gsmToOz(curVal);
        weightInput.step = '0.5';
      }
    });
  });

  // Weight preset chips
  form.querySelectorAll('#plStashWeightPresets .pl-option-pill').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var weightInput = form.querySelector('#plStashWeight');
      var unitBtn = form.querySelector('#plStashWeightUnitPills .pl-option-pill.selected');
      var oz = parseFloat(btn.dataset.presetOz);
      if (unitBtn && unitBtn.dataset.unit === 'gsm') {
        weightInput.value = ozToGsm(oz);
      } else {
        weightInput.value = oz;
      }
    });
  });

  // Shrinkage override toggle
  var shrinkOverride = form.querySelector('#plStashShrinkageOverride');
  if (shrinkOverride) {
    shrinkOverride.addEventListener('change', function() {
      var shrinkInput = form.querySelector('#plStashShrinkageVal');
      shrinkInput.style.display = shrinkOverride.checked ? '' : 'none';
    });
  }

  // Stretch slider + detents
  plAttachStretchListeners(form);

  // Pattern pills + custom
  plAttachPatternListeners(form);
}

function plAttachVarietyCustomListener(form) {
  var select = form.querySelector('#plStashVariety');
  if (select && select.tagName === 'SELECT') {
    select.addEventListener('change', function() {
      var customInput = form.querySelector('#plStashVarietyCustom');
      if (customInput) customInput.style.display = select.value === '__custom__' ? '' : 'none';
    });
  }
}

function plAttachVarietyKnitSync(form) {
  var select = form.querySelector('#plStashVariety');
  if (select && select.tagName === 'SELECT') {
    select.addEventListener('change', function() {
      var fiberSelect = form.querySelector('#plStashFiber');
      var fk = fiberSelect ? fiberSelect.value : '';
      var autoKnit = plGetVarietyIsKnit(fk, select.value);
      var knitPills = form.querySelector('#plStashKnitPills');
      if (knitPills) {
        knitPills.querySelectorAll('.pl-option-pill').forEach(function(b) { b.classList.remove('selected'); });
        var target = knitPills.querySelector('[data-knit="' + (autoKnit ? 'knit' : 'woven') + '"]');
        if (target) target.classList.add('selected');
      }
    });
  }
}

function plAttachVarietyStretchSync(form) {
  var select = form.querySelector('#plStashVariety');
  if (select && select.tagName === 'SELECT') {
    select.addEventListener('change', function() {
      var fiberSelect = form.querySelector('#plStashFiber');
      var fk = fiberSelect ? fiberSelect.value : '';
      var stretchVal = plGetVarietyStretch(fk, select.value);
      var slider = form.querySelector('#plStashStretchSlider');
      var num = form.querySelector('#plStashStretchNum');
      if (slider) slider.value = stretchVal;
      if (num) num.value = stretchVal;
    });
  }
}

function plAttachPillListener(form, selector) {
  form.querySelectorAll(selector + ' .pl-option-pill').forEach(function(btn) {
    btn.addEventListener('click', function() {
      form.querySelectorAll(selector + ' .pl-option-pill').forEach(function(b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
    });
  });
}

function plReadStashWeight(form) {
  var weightInput = form.querySelector('#plStashWeight');
  var unitBtn = form.querySelector('#plStashWeightUnitPills .pl-option-pill.selected');
  var rawVal = Math.max(0, parseFloat(weightInput.value) || 4);
  if (unitBtn && unitBtn.dataset.unit === 'gsm') {
    return Math.max(0, gsmToOz(rawVal));
  }
  return rawVal;
}

function plReadStashVariety(form) {
  var select = form.querySelector('#plStashVariety');
  if (!select) return 'Standard';
  if (select.tagName === 'SELECT' && select.value === '__custom__') {
    var customInput = form.querySelector('#plStashVarietyCustom');
    return (customInput && customInput.value.trim()) || 'Custom';
  }
  return select.value || 'Standard';
}

function plReadStashShrinkage(form) {
  var cb = form.querySelector('#plStashShrinkageOverride');
  if (cb && cb.checked) {
    var input = form.querySelector('#plStashShrinkageVal');
    return input ? input.value.trim() : '';
  }
  return null;
}

function plReadStashIsKnit(form) {
  var btn = form.querySelector('#plStashKnitPills .pl-option-pill.selected');
  return btn ? btn.dataset.knit === 'knit' : false;
}

function plGetVarietyStretch(fiberKey, varietyName) {
  var fiber = FIBERS[fiberKey];
  if (!fiber || !fiber.varieties) return 0;
  var v = fiber.varieties.find(function(va) { return va.name === varietyName; });
  return v && v.props ? v.props.stretch || 0 : (fiber.properties?.stretch?.value || 0);
}

function plBuildStretchRow(stretchVal, fiberKey, varietyName) {
  var val = stretchVal !== undefined && stretchVal !== null ? stretchVal : plGetVarietyStretch(fiberKey, varietyName);
  var detents = [0, 5, 10, 15, 25, 50, 75, 100];
  return '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">' +
    '<input type="range" id="plStashStretchSlider" min="0" max="100" value="' + val + '" style="flex:1;min-width:120px;accent-color:var(--ink-light);">' +
    '<input type="number" id="plStashStretchNum" min="0" max="100" value="' + val + '" class="pl-select" style="width:60px;text-align:center;">' +
    '<span style="font-size:0.78rem;color:var(--ink-light);">%</span>' +
    '</div>' +
    '<div style="display:flex;gap:3px;margin-top:6px;flex-wrap:wrap;">' +
      detents.map(function(d) { return '<button class="pl-option-pill pl-stretch-detent" data-detent="' + d + '" style="padding:2px 7px;font-size:0.72rem;">' + d + '%</button>'; }).join('') +
    '</div>';
}

function plAttachStretchListeners(form) {
  var slider = form.querySelector('#plStashStretchSlider');
  var num = form.querySelector('#plStashStretchNum');
  if (!slider || !num) return;
  var detents = [0, 5, 10, 15, 25, 50, 75, 100];
  var snapThreshold = 3;
  slider.addEventListener('input', function() {
    var v = parseInt(slider.value);
    for (var i = 0; i < detents.length; i++) {
      if (Math.abs(v - detents[i]) <= snapThreshold) { v = detents[i]; break; }
    }
    slider.value = v;
    num.value = v;
  });
  num.addEventListener('input', function() {
    var v = Math.max(0, Math.min(100, parseInt(num.value) || 0));
    slider.value = v;
  });
  form.querySelectorAll('.pl-stretch-detent').forEach(function(btn) {
    btn.addEventListener('click', function() {
      slider.value = btn.dataset.detent;
      num.value = btn.dataset.detent;
    });
  });
}

function plReadStashStretch(form) {
  var num = form.querySelector('#plStashStretchNum');
  return num ? parseInt(num.value) || 0 : 0;
}

var PATTERN_OPTIONS = [
  { key: 'solid',     label: 'Solid' },
  { key: 'stripe',    label: 'Stripe' },
  { key: 'plaid',     label: 'Plaid' },
  { key: 'floral',    label: 'Floral' },
  { key: 'geometric', label: 'Geometric' },
  { key: 'polkadot',  label: 'Polka Dot' },
  { key: 'animal',    label: 'Animal' },
  { key: 'abstract',  label: 'Abstract' }
];

function plPatternSvg(key) {
  var s = 24;
  switch(key) {
    case 'solid':     return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#bbb"/></svg>';
    case 'stripe':    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#ddd"/><rect x="4" width="4" height="24" fill="#999"/><rect x="12" width="4" height="24" fill="#999"/><rect x="20" width="4" height="24" fill="#999"/></svg>';
    case 'plaid':     return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#ddd"/><rect x="4" width="4" height="24" fill="#99b" opacity=".5"/><rect x="14" width="4" height="24" fill="#99b" opacity=".5"/><rect y="4" width="24" height="4" fill="#b99" opacity=".5"/><rect y="14" width="24" height="4" fill="#b99" opacity=".5"/></svg>';
    case 'floral':    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#e8ddd0"/><circle cx="7" cy="7" r="3" fill="#c97"/><circle cx="17" cy="17" r="3" fill="#c97"/><circle cx="17" cy="7" r="2" fill="#9b7"/><circle cx="7" cy="17" r="2" fill="#9b7"/></svg>';
    case 'geometric': return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#ddd"/><polygon points="12,2 22,22 2,22" fill="#aab" opacity=".6"/><rect x="6" y="6" width="6" height="6" fill="#bba" opacity=".5"/></svg>';
    case 'polkadot':  return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#ddd"/><circle cx="6" cy="6" r="2.5" fill="#999"/><circle cx="18" cy="6" r="2.5" fill="#999"/><circle cx="12" cy="14" r="2.5" fill="#999"/><circle cx="6" cy="22" r="2.5" fill="#999"/><circle cx="18" cy="22" r="2.5" fill="#999"/></svg>';
    case 'animal':    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#d4c4a0"/><ellipse cx="8" cy="6" rx="3" ry="4" fill="#6b4" opacity=".3" transform="rotate(-15 8 6)"/><ellipse cx="18" cy="14" rx="4" ry="3" fill="#6b4" opacity=".3" transform="rotate(20 18 14)"/><ellipse cx="6" cy="18" rx="3" ry="2" fill="#6b4" opacity=".3"/></svg>';
    case 'abstract':  return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#ddd"/><path d="M2 16 Q8 4 14 12 T22 8" stroke="#99a" stroke-width="2" fill="none"/><path d="M4 22 Q10 10 20 18" stroke="#a99" stroke-width="2" fill="none"/></svg>';
    default:          return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#bbb"/></svg>';
  }
}


function plBuildPatternRow(currentPattern) {
  var cur = currentPattern || 'solid';
  return '<div class="pl-option-pills" id="plStashPatternPills" style="flex-wrap:wrap;">' +
    PATTERN_OPTIONS.map(function(p) {
      return '<button class="pl-option-pill' + (cur === p.key ? ' selected' : '') + '" data-pattern="' + p.key + '" style="display:inline-flex;align-items:center;gap:4px;padding:4px 8px;">' +
        plPatternSvg(p.key) + '<span style="font-size:0.78rem;">' + p.label + '</span></button>';
    }).join('') +
    '<button class="pl-option-pill' + (PATTERN_OPTIONS.every(function(p) { return p.key !== cur; }) && cur !== 'solid' ? ' selected' : '') + '" data-pattern="__custom__" style="padding:4px 8px;font-size:0.78rem;">Custom…</button>' +
    '<input type="text" class="pl-select" id="plStashPatternCustom" placeholder="e.g., Paisley" style="margin-top:6px;display:' +
    (PATTERN_OPTIONS.every(function(p) { return p.key !== cur; }) && cur !== 'solid' ? '' : 'none') + ';"' +
    (PATTERN_OPTIONS.every(function(p) { return p.key !== cur; }) && cur !== 'solid' ? ' value="' + cur + '"' : '') + '>' +
    '</div>';
}

function plAttachPatternListeners(form) {
  var pills = form.querySelector('#plStashPatternPills');
  if (!pills) return;
  pills.querySelectorAll('.pl-option-pill').forEach(function(btn) {
    btn.addEventListener('click', function() {
      pills.querySelectorAll('.pl-option-pill').forEach(function(b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
      var customInput = form.querySelector('#plStashPatternCustom');
      if (customInput) customInput.style.display = btn.dataset.pattern === '__custom__' ? '' : 'none';
    });
  });
}

function plReadStashPattern(form) {
  var btn = form.querySelector('#plStashPatternPills .pl-option-pill.selected');
  if (!btn) return null;
  if (btn.dataset.pattern === '__custom__') {
    var input = form.querySelector('#plStashPatternCustom');
    return input && input.value.trim() ? input.value.trim() : null;
  }
  return btn.dataset.pattern === 'solid' ? null : btn.dataset.pattern;
}

// ── Shared stash form builder, listener wiring, and data reader ──
// Used by both plAddStashEntry() and plEditStashEntry() to eliminate duplication.

function plBuildStashFormHtml(entry, title) {
  // entry: null for add (defaults), or existing entry object for edit
  var e = entry || {};
  var fiberKeys = Object.keys(FIBERS);
  var defaultFiber = e.fiber || fiberKeys[0];
  var widths = [36, 42, 44, 45, 54, 58, 60];
  var washedVal = e.washed || (e.preShrunk ? 'preshrunk' : 'unwashed');
  var selectedWidth = e.width || 45;
  var isCustomWidth = widths.indexOf(selectedWidth) === -1 && e.width;

  return '<div class="pl-section-title">' + title + '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Fiber</div></div>' +
      '<div class="pl-form-control"><select class="pl-select" id="plStashFiber">' +
        fiberKeys.map(function(fk) { return '<option value="' + fk + '"' + (fk === defaultFiber ? ' selected' : '') + '>' + FIBERS[fk].name + '</option>'; }).join('') +
      '</select></div>' +
    '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Variety</div></div>' +
      '<div class="pl-form-control">' + plBuildVarietySelect(defaultFiber, e.variety || '') + '</div>' +
    '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Construction</div></div>' +
      '<div class="pl-form-control">' + plBuildKnitWovenToggle(defaultFiber, e.variety || '', e.isKnit) + '</div>' +
    '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Color</div></div>' +
      '<div class="pl-form-control">' + plBuildColorSelector(e.colorName || 'Natural', e.colorHex || '#E8DCC8') + '</div>' +
    '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Yardage</div></div>' +
      '<div class="pl-form-control">' +
        '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
          '<input type="number" class="pl-select" id="plStashYardage" step="0.25" min="0" style="width:90px;"' + (entry ? ' value="' + (e.yardage || 0) + '"' : ' placeholder="0"') + '>' +
          '<div class="pl-option-pills" id="plStashYardageChips" style="display:inline-flex;gap:4px;">' +
            [0.25, 0.5, 1, 1.5, 2, 3, 4, 5].map(function(v) { return '<button class="pl-option-pill" data-yardage="' + v + '" style="padding:4px 8px;font-size:0.78rem;">' + (v === 0.25 ? '\u00bc' : v === 0.5 ? '\u00bd' : v === 1.5 ? '1\u00bd' : v) + '</button>'; }).join('') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Width (inches)</div></div>' +
      '<div class="pl-form-control">' +
        '<div class="pl-option-pills" id="plStashWidthPills">' +
          widths.map(function(w) { return '<button class="pl-option-pill' + (w === selectedWidth ? ' selected' : '') + '" data-width="' + w + '">' + w + '\u2033</button>'; }).join('') +
          '<button class="pl-option-pill' + (isCustomWidth ? ' selected' : '') + '" data-width="custom">Custom</button>' +
          '<input type="number" id="plStashWidthCustom" class="pl-select" placeholder="inches" min="1" max="120" style="width:80px;display:' + (isCustomWidth ? '' : 'none') + ';margin-top:6px;"' + (isCustomWidth ? ' value="' + e.width + '"' : '') + '>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Weight</div></div>' +
      '<div class="pl-form-control">' + plBuildWeightRow(e.weight || 4, false) + '</div>' +
    '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Shrinkage</div></div>' +
      '<div class="pl-form-control">' + plBuildShrinkageRow(defaultFiber, e.shrinkageOverride) + '</div>' +
    '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Stretch</div></div>' +
      '<div class="pl-form-control">' + plBuildStretchRow(e.stretch, defaultFiber, e.variety || '') + '</div>' +
    '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Pattern</div></div>' +
      '<div class="pl-form-control">' + plBuildPatternRow(e.pattern || 'solid') + '</div>' +
    '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Washed</div></div>' +
      '<div class="pl-form-control">' +
        '<div class="pl-option-pills" id="plStashWashedPills">' +
          '<button class="pl-option-pill' + (washedVal === 'unwashed' ? ' selected' : '') + '" data-washed="unwashed">Unwashed</button>' +
          '<button class="pl-option-pill' + (washedVal === 'prewashed' ? ' selected' : '') + '" data-washed="prewashed">Pre-washed</button>' +
          '<button class="pl-option-pill' + (washedVal === 'preshrunk' ? ' selected' : '') + '" data-washed="preshrunk">Pre-shrunk</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Source</div></div>' +
      '<div class="pl-form-control"><input type="text" class="pl-select" id="plStashSource" placeholder="e.g., Joann, Mood Fabrics, online" value="' + (e.source || '') + '"></div>' +
    '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">URL</div><div class="pl-form-label-hint">Link to product page</div></div>' +
      '<div class="pl-form-control"><input type="url" class="pl-select" id="plStashUrl" placeholder="https://..." value="' + (e.url || '') + '"></div>' +
    '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Date Acquired</div></div>' +
      '<div class="pl-form-control"><input type="date" class="pl-select" id="plStashDateAcquired" value="' + (e.dateAcquired || '') + '" style="width:160px;"></div>' +
    '</div>' +
    '<div class="pl-form-row">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Options</div></div>' +
      '<div class="pl-form-control" style="display:flex;gap:16px;flex-wrap:wrap;">' +
        '<label style="display:flex;align-items:center;gap:6px;font-size:0.82rem;cursor:pointer;"><input type="checkbox" id="plStashDirectional"' + (e.directional ? ' checked' : '') + '> Directional</label>' +
        '<label style="display:flex;align-items:center;gap:6px;font-size:0.82rem;cursor:pointer;"><input type="checkbox" id="plStashTubular"' + (e.tubular ? ' checked' : '') + '> Tubular</label>' +
      '</div>' +
    '</div>' +
    '<div class="pl-form-row" style="border-bottom:none;">' +
      '<div class="pl-form-label"><div class="pl-form-label-main">Notes</div></div>' +
      '<div class="pl-form-control"><textarea class="pl-select" id="plStashNotes" rows="3" style="resize:vertical;font-size:0.82rem;" placeholder="Fabric hand, care notes, etc.">' + (e.notes || '') + '</textarea></div>' +
    '</div>';
}

function plAttachStashFormListeners(form) {
  // Color selector
  plAttachColorSelectorListeners(form);
  // Yardage quick chips
  form.querySelectorAll('#plStashYardageChips .pl-option-pill').forEach(function(btn) {
    btn.addEventListener('click', function() {
      form.querySelector('#plStashYardage').value = btn.dataset.yardage;
    });
  });
  // Washed pills
  plAttachPillListener(form, '#plStashWashedPills');
  // Width pills with custom toggle
  var customWidth = form.querySelector('#plStashWidthCustom');
  form.querySelectorAll('#plStashWidthPills .pl-option-pill').forEach(function(btn) {
    btn.addEventListener('click', function() {
      form.querySelectorAll('#plStashWidthPills .pl-option-pill').forEach(function(b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
      if (customWidth) customWidth.style.display = btn.dataset.width === 'custom' ? '' : 'none';
    });
  });
  // Smart listeners (fiber→variety→knit, weight units, shrinkage, stretch, pattern)
  plAttachStashSmartListeners(form);
}

function plReadStashFormData(form) {
  var widthBtn = form.querySelector('#plStashWidthPills .pl-option-pill.selected');
  var width = 45;
  if (widthBtn && widthBtn.dataset.width === 'custom') {
    width = parseFloat(form.querySelector('#plStashWidthCustom').value) || 45;
  } else if (widthBtn) {
    width = parseFloat(widthBtn.dataset.width);
  }
  var washedBtn = form.querySelector('#plStashWashedPills .pl-option-pill.selected');
  var washed = washedBtn ? washedBtn.dataset.washed : 'unwashed';
  return {
    fiber: form.querySelector('#plStashFiber').value,
    variety: plReadStashVariety(form),
    isKnit: plReadStashIsKnit(form),
    colorName: form.querySelector('#plStashColorName').value || 'Natural',
    colorHex: form.querySelector('#plStashColorHex').value || '#ccc',
    yardage: Math.max(0, parseFloat(form.querySelector('#plStashYardage').value) || 0),
    width: width,
    weight: plReadStashWeight(form),
    shrinkageOverride: plReadStashShrinkage(form),
    stretch: plReadStashStretch(form),
    pattern: plReadStashPattern(form),
    directional: form.querySelector('#plStashDirectional').checked,
    tubular: form.querySelector('#plStashTubular').checked,
    source: (form.querySelector('#plStashSource').value || '').trim() || null,
    url: (form.querySelector('#plStashUrl').value || '').trim() || null,
    dateAcquired: form.querySelector('#plStashDateAcquired').value || null,
    notes: (form.querySelector('#plStashNotes').value || '').trim() || null,
    washed: washed,
    preShrunk: washed === 'preshrunk'
  };
}

// ── Edit stash entry (inline form) ──
function plEditStashEntry(boltId) {
  const data = loadUserData();
  const entry = data.stash.find(s => s.id === boltId);
  if (!entry) return;

  const wrap = document.getElementById('plStashView');
  const existing = document.getElementById('plStashAddForm');
  if (existing) existing.remove();

  const form = document.createElement('div');
  form.id = 'plStashAddForm';
  form.className = 'pl-section';
  form.style.marginTop = '12px';
  form.innerHTML = plBuildStashFormHtml(entry, 'Edit Fabric') +
    '<div style="display:flex;gap:8px;margin-top:12px;">' +
      '<button class="pl-btn-primary" style="flex:1;" id="plStashSaveBtn">Save Changes</button>' +
      '<button class="pl-btn-secondary" id="plStashDeleteBtn" style="color:#c0392b;">Delete</button>' +
      '<button class="pl-btn-secondary" id="plStashCancelBtn">Cancel</button>' +
    '</div>';

  // Find the bolt row's inline detail panel and replace its content
  const boltRow = document.querySelector('.pl-bolt-row[data-bolt-id="' + boltId + '"]');
  const detailPanel = boltRow ? boltRow.querySelector('.pl-bolt-inline-detail') : null;
  if (detailPanel) {
    detailPanel.innerHTML = '';
    detailPanel.appendChild(form);
  } else {
    wrap.insertBefore(form, wrap.firstChild);
  }
  form.scrollIntoView({behavior: 'smooth', block: 'start'});

  plAttachStashFormListeners(form);

  // Cancel — re-render stash to restore detail view
  document.getElementById('plStashCancelBtn').addEventListener('click', function() { renderStashView(loadUserData()); });

  // Delete — use centralized deletion path
  document.getElementById('plStashDeleteBtn').addEventListener('click', function() {
    if (!confirm('Remove this fabric from your stash?')) return;
    var d = loadUserData();
    removeStashEntry(d, boltId);
    var stashWrap = document.getElementById('plStashView');
    if (stashWrap) stashWrap.dataset.expandedBolt = '';
    renderPipelineProfile();
    switchPlProfileTab('stash');
  });

  // Save
  document.getElementById('plStashSaveBtn').addEventListener('click', function() {
    var d = loadUserData();
    var idx = d.stash.findIndex(function(s) { return s.id === boltId; });
    if (idx === -1) return;
    Object.assign(d.stash[idx], plReadStashFormData(form));
    saveUserData(d);
    renderPipelineProfile();
    switchPlProfileTab('stash');
  });
}

function plDeleteStashEntry(boltId) {
  if (!confirm('Remove this fabric from your stash?')) return;
  const data = loadUserData();
  removeStashEntry(data, boltId);
  const wrap = document.getElementById('plStashView');
  if (wrap) wrap.dataset.expandedBolt = '';
  renderStashView(loadUserData());
}

// plAddProfile is now defined earlier (near renderProfileCards)

// ── Add stash entry (inline form) ──
function plAddStashEntry() {
  const wrap = document.getElementById('plStashView');
  const existing = document.getElementById('plStashAddForm');
  if (existing) { existing.remove(); return; }

  const form = document.createElement('div');
  form.id = 'plStashAddForm';
  form.className = 'pl-section';
  form.style.marginTop = '12px';
  form.innerHTML = plBuildStashFormHtml(null, 'Add Fabric to Stash') +
    '<div style="display:flex;gap:8px;margin-top:12px;">' +
      '<button class="pl-btn-primary" style="flex:1;" id="plStashSaveBtn">Add to Stash</button>' +
      '<button class="pl-btn-secondary" id="plStashCancelBtn">Cancel</button>' +
    '</div>';

  wrap.appendChild(form);

  plAttachStashFormListeners(form);

  // Cancel
  document.getElementById('plStashCancelBtn').addEventListener('click', function() { form.remove(); });

  // Save
  document.getElementById('plStashSaveBtn').addEventListener('click', function() {
    var formData = plReadStashFormData(form);
    var data = loadUserData();
    var newId = addStashEntry(data, formData);
    var stashWrap = document.getElementById('plStashView');
    if (stashWrap) stashWrap.dataset.expandedBolt = newId;
    renderPipelineProfile();
    switchPlProfileTab('stash');
  });
}

// ═══════════════════════════════════════════════════════════════
// RENDER: MATCH (Panel 1)
// ═══════════════════════════════════════════════════════════════

function renderPipelineMatch() {
  const data = loadUserData();
  // Ensure at least one profile exists
  if (!data.profiles.length) {
    const id = addProfile(data, { name: 'You', avatar: { letter: 'Y', color: '#5B8C6B' } });
    plSelectedPerson = id;
  } else if (!plSelectedPerson || !data.profiles.find(p => p.id === plSelectedPerson)) {
    plSelectedPerson = data.profiles[0].id;
  }

  // Person picker
  const picker = document.getElementById('plPersonPicker');
  picker.innerHTML = `
    <div class="pl-person-picker-label">Who is this for?</div>
    <div class="pl-person-picker-row">
      ${data.profiles.map(p => {
        const sel = p.id === plSelectedPerson ? ' selected' : '';
        return `<button class="pl-person-picker-btn${sel}" data-person="${p.id}">
          <div class="pl-person-picker-avatar" style="background:${p.avatar?.color || '#5B8C6B'};">${p.avatar?.letter || p.name.charAt(0)}</div> ${p.name}
        </button>`;
      }).join('')}
    </div>`;
  picker.querySelectorAll('.pl-person-picker-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      picker.querySelectorAll('.pl-person-picker-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      plSelectedPerson = btn.dataset.person;
      // Reset property filters so By Properties re-seeds from new person's sensitivities
      FINDER_PROPS.forEach(p => { ffFilters[p] = 0; });
      plSaveCurrentState();
      renderMatchByProject(data);
      renderMatchByFabric(data);
      renderMatchByProperties();
      renderConvergencePanel();
    });
  });

  renderMatchByProject(data);
  renderMatchByFabric(data);
  renderMatchByProperties();
  renderConvergencePanel();
}

function renderMatchByProject(data) {
  const grid = document.getElementById('plProjectGrid');
  const person = data.profiles.find(p => p.id === plSelectedPerson) || data.profiles[0];
  const favFibers = person?.favoriteFibers || [];
  const favProjects = (person?.favorites || []).map(f => f.id);
  const globalFavs = data.profile.favoriteProjects || [];
  const personSkill = person?.skill || data.profile.skill || 'intermediate';
  const personSensitivities = person?.sensitivities || [];
  const personHistory = person?.projectHistory || [];
  const ownedTools = data.profile.ownedTools || {};
  const hasMachine = (ownedTools.machines || []).length > 0;

  // Map profile gender/ageGroup to audience relevance
  const genderAudiences = person?.gender === 'female' ? ['women'] : person?.gender === 'male' ? ['men'] : [];
  const ageAudiences = person?.ageGroup === 'baby' ? ['kids'] : person?.ageGroup === 'child' ? ['kids'] : person?.ageGroup === 'teen' ? ['kids', 'women', 'men'] : [];
  const relevantAudiences = [...new Set([...genderAudiences, ...ageAudiences])];

  // Skill level ordering for comparison
  const SKILL_ORDER = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 };
  const personSkillNum = SKILL_ORDER[personSkill] ?? 1;

  // Sort: favorites first → gender/age match → skill-appropriate → alphabetical
  const allFavs = [...new Set([...favProjects, ...globalFavs])];
  const sorted = [...PROJECT_CATALOG].sort((a, b) => {
    const aFav = allFavs.includes(a.id) ? 0 : 1;
    const bFav = allFavs.includes(b.id) ? 0 : 1;
    if (aFav !== bFav) return aFav - bFav;
    if (relevantAudiences.length) {
      const aMatch = a.audiences?.some(au => relevantAudiences.includes(au)) ? 0 : 1;
      const bMatch = b.audiences?.some(au => relevantAudiences.includes(au)) ? 0 : 1;
      if (aMatch !== bMatch) return aMatch - bMatch;
    }
    // Skill-appropriate projects surface higher
    const aSkillDist = Math.abs((SKILL_ORDER[a.skill] ?? 1) - personSkillNum);
    const bSkillDist = Math.abs((SKILL_ORDER[b.skill] ?? 1) - personSkillNum);
    if (aSkillDist !== bSkillDist) return aSkillDist - bSkillDist;
    return a.name.localeCompare(b.name);
  });

  grid.innerHTML = `
    <div class="pl-match-search-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <input type="text" class="pl-match-search" placeholder="Search projects..." id="plProjectSearch">
    </div>` +
  sorted.map(p => {
    const isFav = allFavs.includes(p.id);
    const isGlobalFav = globalFavs.includes(p.id);
    const sel = plSelectedProject === p.id ? ' selected' : '';
    // Check if stash has matching fabric
    const stashMatch = findStashMatch(data, p);

    // ── Contextual intelligence badges ──
    const badges = [];
    // Skill match
    const projSkillNum = SKILL_ORDER[p.skill] ?? 1;
    if (projSkillNum === personSkillNum) {
      badges.push('<span class="pl-ctx-badge ctx-match">Your level</span>');
    } else if (projSkillNum === personSkillNum + 1) {
      badges.push('<span class="pl-ctx-badge ctx-stretch">Level up</span>');
    } else if (projSkillNum > personSkillNum + 1) {
      badges.push('<span class="pl-ctx-badge ctx-warn">Above skill</span>');
    }
    // Made before
    const madeCount = personHistory.filter(h => h.projectId === p.id).length;
    if (madeCount > 0) {
      badges.push(`<span class="pl-ctx-badge ctx-history">Made${madeCount > 1 ? ' ×' + madeCount : ''}</span>`);
    }
    // Sensitivity warning — check if all top-scoring fibers trigger sensitivities
    const topFibers = scoreFibersForProject(p.id).filter(r => r.passed).slice(0, 5);
    const hasSensIssue = personSensitivities.length > 0 && topFibers.length > 0 && topFibers.every(r => {
      const fiberName = r.fiber.name.toLowerCase();
      return personSensitivities.some(s => fiberName.includes(s.toLowerCase()) || s.toLowerCase().includes(fiberName));
    });
    if (hasSensIssue) {
      badges.push('<span class="pl-ctx-badge ctx-sens">Sensitivity</span>');
    }

    const badgesHtml = badges.length > 0 ? `<div class="pl-ctx-badges">${badges.join('')}</div>` : '';

    // Fiber compatibility dots — show top scored fibers
    const fiberDots = topFibers.slice(0, 5).map(r => {
      return `<span class="pl-fiber-dot" style="background:${r.fiber.accent};" title="${r.fiber.name}"></span>`;
    }).join('');

    return `
      <div class="pl-project-card${sel}" data-project-id="${p.id}" data-project-name="${p.name.toLowerCase()}">
        <span class="pl-fav-heart${isGlobalFav ? ' active' : ''}" data-fav-proj="${p.id}" title="Favorite">♥</span>
        ${isFav && !isGlobalFav ? '<span class="pl-fav-badge">★</span>' : ''}
        <div class="pl-project-card-name">${p.name}</div>
        <div class="pl-project-card-meta">${(p.construction || []).slice(0, 3).join(' · ')}</div>
        <div class="pl-project-card-bottom">
          <div class="pl-project-card-audience">${SKILL_LABELS[p.skill] || p.skill}</div>
          ${fiberDots ? `<div class="pl-project-card-fibers">${fiberDots}</div>` : ''}
        </div>
        ${badgesHtml}
        ${stashMatch ? `<div class="pl-stash-badge"><span class="pl-fiber-dot" style="background:${FIBERS[stashMatch.fiber]?.accent || '#ccc'};"></span> In stash · ${stashMatch.yardage.toFixed(1)} yd ${stashMatch.colorName}</div>` : ''}
      </div>`;
  }).join('');

  // Search filter
  const searchInput = document.getElementById('plProjectSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      grid.querySelectorAll('.pl-project-card').forEach(card => {
        card.style.display = !q || card.dataset.projectName.includes(q) ? '' : 'none';
      });
    });
  }

  // Heart favorite toggle
  grid.querySelectorAll('.pl-fav-heart').forEach(heart => {
    heart.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = heart.dataset.favProj;
      const d = loadUserData();
      d.profile.favoriteProjects = d.profile.favoriteProjects || [];
      const idx = d.profile.favoriteProjects.indexOf(projId);
      if (idx >= 0) d.profile.favoriteProjects.splice(idx, 1);
      else d.profile.favoriteProjects.push(projId);
      saveUserData(d);
      renderMatchByProject(d);
    });
  });

  grid.querySelectorAll('.pl-project-card').forEach(card => {
    card.addEventListener('click', () => {
      grid.querySelectorAll('.pl-project-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      plSelectedProject = card.dataset.projectId;
      plSaveCurrentState();
      renderFabricRecommendations(data);
      renderConvergencePanel();
    });
  });

  // Show recs if project already selected
  if (plSelectedProject) { renderFabricRecommendations(data); renderConvergencePanel(); }
}

function findStashMatch(data, project) {
  const scored = scoreFibersForProject(project.id);
  const passedFibers = new Set(scored.filter(r => r.passed).map(r => r.fiberKey));
  for (const entry of (data.stash || [])) {
    if (passedFibers.has(entry.fiber)) return entry;
  }
  return null;
}

function renderFabricRecommendations(data) {
  const wrap = document.getElementById('plFabricRecs');
  const project = PROJECT_CATALOG.find(p => p.id === plSelectedProject);
  if (!project) { wrap.style.display = 'none'; return; }

  const person = data.profiles.find(p => p.id === plSelectedPerson) || data.profiles[0];
  const favFibers = person?.favoriteFibers || [];
  const personSensitivities = person?.sensitivities || [];
  const personHistory = person?.projectHistory || [];

  const context = { favoriteFibers: favFibers, sensitivities: personSensitivities };

  // Apply weight overrides if any — build modified requirements
  const baseReqs = project.requirements || {};
  const overrides = plWeightOverrides[plSelectedProject] || {};
  let effectiveReqs = baseReqs;
  if (Object.keys(overrides).length > 0) {
    effectiveReqs = {};
    for (const [prop, req] of Object.entries(baseReqs)) {
      effectiveReqs[prop] = { ...req, weight: overrides[prop] !== undefined ? overrides[prop] : req.weight };
    }
  }

  // Score with effective requirements (bypasses scoreFibersForProject to inject custom weights)
  const scored = Object.keys(FIBERS).map(fk => {
    const result = computeScore(fk, effectiveReqs, context);
    return { fiberKey: fk, fiber: FIBERS[fk], ...result };
  }).sort((a, b) => {
    if (a.passed !== b.passed) return a.passed ? -1 : 1;
    return b.score - a.score;
  });

  // Show passed fibers (top 10) with context modifiers
  const recs = scored.filter(r => r.passed).slice(0, 10).map(r => {
    const fk = r.fiberKey;
    const isFav = favFibers.includes(fk);
    const stashEntries = (data.stash || []).filter(e => e.fiber === fk);
    const isSensitive = personSensitivities.length > 0 && personSensitivities.some(s =>
      r.fiber.name.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(r.fiber.name.toLowerCase())
    );
    const usedBefore = personHistory.some(h => h.projectId === project.id && h.fiber === fk);
    let score = r.score;
    if (usedBefore && score < 95) score = Math.min(score + 3, 99);
    if (stashEntries.length && score < 95) score = Math.min(score + 2, 99);
    return { fiberKey: fk, fiber: r.fiber, score, isFav, stashEntries, isSensitive, usedBefore, details: r.details, failedProps: r.failedProps };
  });

  wrap.style.display = 'block';
  wrap.innerHTML = `
    <h3 class="pl-section-title">Recommended fabrics for ${project.name}</h3>
    <p class="pl-annotation">Ranked by property match${person?.name ? ' for ' + person.name : ''}.${favFibers.length ? ' Favorite fibers (' + favFibers.map(fk => FIBERS[fk]?.name).filter(Boolean).join(', ') + ') boosted.' : ''}${personSensitivities.length ? ' Sensitivities (' + personSensitivities.join(', ') + ') flagged.' : ''}</p>
    <div class="pl-weight-panel">
      <button class="pl-weight-toggle${Object.keys(overrides).length ? ' open' : ''}" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">⚖ Tune weights</button>
      <div class="pl-weight-sliders${Object.keys(overrides).length ? ' open' : ''}">
        ${Object.entries(baseReqs).map(([prop, req]) => {
          const label = FINDER_PROP_LABELS?.[prop] || prop;
          const defaultW = req.weight || 1.0;
          const curW = overrides[prop] !== undefined ? overrides[prop] : defaultW;
          return `<div class="pl-weight-row"><span class="pl-weight-label">${label}</span><input type="range" class="pl-weight-slider" data-prop="${prop}" data-default="${defaultW}" min="0" max="3" step="0.1" value="${curW}"><span class="pl-weight-val">${curW.toFixed(1)}×</span></div>`;
        }).join('')}
        <button class="pl-weight-reset" onclick="plResetWeights()">Reset to defaults</button>
      </div>
    </div>
    ${recs.map(r => {
      const sel = plSelectedFabric?.fiber === r.fiberKey ? ' selected' : '';
      const propBreakdown = Object.entries(r.details || {}).sort((a, b) => b[1].surplus - a[1].surplus).map(([prop, d]) => {
        const pct = Math.round(d.value);
        const barColor = d.surplus >= 0 ? 'var(--green)' : 'var(--amber, #C87533)';
        const label = FINDER_PROP_LABELS?.[prop] || prop;
        return `<div class="pl-score-prop"><span class="pl-score-prop-name">${label}</span><div class="pl-score-prop-bar-wrap"><div class="pl-score-prop-bar" style="width:${pct}%;background:${barColor}"></div><div class="pl-score-prop-min" style="left:${d.min}%"></div></div><span class="pl-score-prop-val">${pct}<span class="pl-score-prop-req">/${d.min}</span></span></div>`;
      }).join('');
      return `
        <div class="pl-fabric-result${sel}${r.isSensitive ? ' ctx-sensitive' : ''}" data-fiber="${r.fiberKey}">
          <div class="pl-fabric-result-swatch" style="background:${r.fiber.accent}18;">
            <span style="font-size:1.2rem;">🌿</span>
          </div>
          <div class="pl-fabric-result-info">
            <div class="pl-fabric-result-name">${r.fiber.name}${r.isFav ? ' <span class="pl-fav-badge">★ Favorite fiber</span>' : ''}${r.usedBefore ? ' <span class="pl-ctx-badge ctx-history" style="margin-left:6px;">Used before</span>' : ''}</div>
            <div class="pl-fabric-result-detail">${r.fiber.overview ? r.fiber.overview.split('.')[0] + '.' : ''}</div>
            ${r.isSensitive ? `<div class="pl-ctx-alert"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><path d="M8 1L1 14h14L8 1z"/><path d="M8 6v4"/><circle cx="8" cy="12" r=".5" fill="currentColor"/></svg> ${person?.name || 'This person'} has a sensitivity to ${r.fiber.name.toLowerCase()}</div>` : ''}
            ${r.stashEntries.length ? r.stashEntries.slice(0, 1).map(se => `<div class="pl-stash-badge" style="margin-top:4px;"><span class="pl-fiber-dot" style="background:${r.fiber.accent};"></span> In your stash · ${se.yardage.toFixed(1)} yd ${se.colorName}</div>`).join('') : ''}
          </div>
          <div class="pl-fabric-result-right">
            <div class="pl-fabric-result-score">${r.score}%</div>
            <button class="pl-why-btn" data-why="${r.fiberKey}" onclick="event.stopPropagation();this.closest('.pl-fabric-result').querySelector('.pl-score-detail').classList.toggle('open');this.classList.toggle('open')">Why?</button>
          </div>
          <div class="pl-score-detail">${propBreakdown}</div>
        </div>`;
    }).join('')}`;

  // Weight reset handler (exposed to window for inline onclick)
  function plResetWeights() {
    delete plWeightOverrides[plSelectedProject];
    renderFabricRecommendations(loadUserData());
  }

  // Weight slider listeners — re-score on change
  wrap.querySelectorAll('.pl-weight-slider').forEach(slider => {
    slider.addEventListener('input', () => {
      const prop = slider.dataset.prop;
      const val = parseFloat(slider.value);
      slider.nextElementSibling.textContent = val.toFixed(1) + '×';
      if (!plWeightOverrides[plSelectedProject]) plWeightOverrides[plSelectedProject] = {};
      const defaultW = parseFloat(slider.dataset.default);
      if (Math.abs(val - defaultW) < 0.05) {
        delete plWeightOverrides[plSelectedProject][prop];
        if (Object.keys(plWeightOverrides[plSelectedProject]).length === 0) delete plWeightOverrides[plSelectedProject];
      } else {
        plWeightOverrides[plSelectedProject][prop] = val;
      }
    });
    slider.addEventListener('change', () => {
      renderFabricRecommendations(data);
    });
  });

  wrap.querySelectorAll('.pl-fabric-result').forEach(el => {
    el.addEventListener('click', () => {
      wrap.querySelectorAll('.pl-fabric-result').forEach(f => f.classList.remove('selected'));
      el.classList.add('selected');
      const fk = el.dataset.fiber;
      // Find all stash entries for this fiber
      const stashEntries = (data.stash || []).filter(e => e.fiber === fk);
      if (stashEntries.length > 0) {
        // Show bolt picker inline below the selected fiber
        plShowBoltPicker(el, stashEntries, fk, data);
      } else {
        // No stash — use generic fabric object
        plSelectedFabric = { fiber: fk, variety: FIBERS[fk]?.varieties?.[0]?.name || 'Standard', colorName: 'TBD', yardage: 0 };
        plSaveCurrentState();
        plHideBoltPicker(wrap);
        renderConvergencePanel();
        const conv = document.getElementById('plConvergence');
        if (conv && conv.style.display !== 'none') conv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function plShowBoltPicker(parentEl, bolts, fiberKey, data) {
  const f = FIBERS[fiberKey];
  // Remove any existing bolt picker
  const wrap = parentEl.closest('#plFabricRecs');
  plHideBoltPicker(wrap);

  const picker = document.createElement('div');
  picker.className = 'pl-bolt-picker';
  picker.innerHTML = `
    <div class="pl-bolt-picker-header">
      <span style="font-weight:600;font-size:0.85rem;">Choose a bolt from your stash</span>
      <span style="font-size:0.75rem;color:var(--ink-light);">${bolts.length} ${f?.name || 'fabric'}${bolts.length > 1 ? ' bolts' : ' bolt'} available</span>
    </div>
    ${bolts.map(b => {
      const wCat = typeof getWeightCategory === 'function' ? getWeightCategory(b.weight) : null;
      const sel = plSelectedFabric?.id === b.id ? ' selected' : '';
      return `
      <div class="pl-bolt-picker-item${sel}" data-bolt-id="${b.id}">
        <div class="pl-bolt-swatch" style="background:${b.colorHex || '#ccc'}; width:36px; height:36px; border-radius:8px; flex-shrink:0;"></div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.85rem;font-weight:600;">${b.colorName || 'Unnamed'} ${b.variety ? '· ' + b.variety : ''}</div>
          <div style="font-size:0.72rem;color:var(--ink-light);">${b.yardage.toFixed(1)} yd · ${b.width || '?'}″ wide${wCat ? ' · ' + wCat.label : ''}${b.stretch ? ' · ' + b.stretch + '% stretch' : ''}</div>
        </div>
        <div style="font-size:0.72rem;color:var(--green);font-weight:600;">Select →</div>
      </div>`;
    }).join('')}
    <div class="pl-bolt-picker-item pl-bolt-picker-generic" data-bolt-id="__generic__">
      <div style="width:36px;height:36px;border-radius:8px;background:var(--cream);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;">🌿</div>
      <div style="flex:1;">
        <div style="font-size:0.85rem;font-weight:600;">Use ${f?.name || 'this fabric'} (not from stash)</div>
        <div style="font-size:0.72rem;color:var(--ink-light);">I'll supply my own</div>
      </div>
    </div>`;

  parentEl.after(picker);

  // Bolt click listeners
  picker.querySelectorAll('.pl-bolt-picker-item').forEach(item => {
    item.addEventListener('click', () => {
      picker.querySelectorAll('.pl-bolt-picker-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      const boltId = item.dataset.boltId;
      if (boltId === '__generic__') {
        plSelectedFabric = { fiber: fiberKey, variety: FIBERS[fiberKey]?.varieties?.[0]?.name || 'Standard', colorName: 'TBD', yardage: 0 };
      } else {
        const bolt = data.stash.find(s => s.id === boltId);
        if (bolt) plSelectedFabric = bolt;
      }
      // Reset setup state so Setup panel re-derives from new bolt
      plSetupState = {};
      plSaveCurrentState();
      renderConvergencePanel();
      const conv = document.getElementById('plConvergence');
      if (conv && conv.style.display !== 'none') conv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function plHideBoltPicker(wrap) {
  const existing = wrap.querySelector('.pl-bolt-picker');
  if (existing) existing.remove();
}

function renderMatchByFabric(data) {
  const wrap = document.getElementById('plByFabricContent');
  const person = data.profiles.find(p => p.id === plSelectedPerson) || data.profiles[0];
  const favFibers = person?.favoriteFibers || [];
  const stash = data.stash || [];
  const fiberKeys = Object.keys(FIBERS);
  // Sort: favorites first, then fibers with stash entries, then alphabetical
  const sorted = [...fiberKeys].sort((a, b) => {
    const aF = favFibers.includes(a) ? 0 : 1;
    const bF = favFibers.includes(b) ? 0 : 1;
    if (aF !== bF) return aF - bF;
    const aS = stash.some(s => s.fiber === a) ? 0 : 1;
    const bS = stash.some(s => s.fiber === b) ? 0 : 1;
    if (aS !== bS) return aS - bS;
    return FIBERS[a].name.localeCompare(FIBERS[b].name);
  });

  // Count stash entries per fiber
  const stashCounts = {};
  stash.forEach(s => { stashCounts[s.fiber] = (stashCounts[s.fiber] || 0) + 1; });

  wrap.innerHTML = `
    <div class="pl-fav-fibers" style="margin-bottom:16px;">
      ${sorted.map(fk => {
        const f = FIBERS[fk];
        const isFav = favFibers.includes(fk);
        const sCount = stashCounts[fk] || 0;
        const badge = sCount ? ` <span class="pl-stash-count-badge">${sCount}</span>` : '';
        return `<span class="pl-fav-fiber-pill" style="background:${f.accent}18;cursor:pointer;" data-fiber="${fk}"><span class="pl-fiber-dot" style="background:${f.accent};"></span> ${f.name}${isFav ? ' ★' : ''}${badge}</span>`;
      }).join('')}
    </div>
    <div id="plByFabricExpanded" class="pl-empty">Select a fiber above to browse varieties and stash entries.</div>`;

  wrap.querySelectorAll('.pl-fav-fiber-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      // Highlight active pill
      wrap.querySelectorAll('.pl-fav-fiber-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      plRenderFiberExpansion(pill.dataset.fiber, data);
    });
  });
}

function plRenderFiberExpansion(fiberKey, data) {
  const container = document.getElementById('plByFabricExpanded');
  const f = FIBERS[fiberKey];
  if (!f) return;

  const stash = data.stash || [];
  const fiberStash = stash.filter(s => s.fiber === fiberKey);
  const varieties = f.varieties || [];
  const person = data.profiles.find(p => p.id === plSelectedPerson) || data.profiles[0];
  const context = { favoriteFibers: person?.favoriteFibers || [], sensitivities: person?.sensitivities || [] };
  const scored = scoreProjectsForFiber(fiberKey, context);
  const personSkill = person?.skill || 'intermediate';
  const SKILL_ORDER = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 };
  const pSkill = SKILL_ORDER[personSkill] ?? 1;

  let html = `
    <div class="pl-byfab-header" style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
      <span class="pl-fiber-dot" style="background:${f.accent};width:12px;height:12px;"></span>
      <h3 class="pl-section-title" style="margin:0;">${f.name}</h3>
      <span style="font-size:0.78rem;color:var(--ink-light);">${varieties.length} varieties · ${scored.length} compatible projects</span>
    </div>`;

  // ── Stash section: mini bolt rows matching real stash card pattern ──
  if (fiberStash.length > 0) {
    html += `<div class="pl-byfab-section-label" style="font-size:0.78rem;font-weight:600;color:var(--green);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" width="13" height="13"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
      In Your Stash (${fiberStash.length})
    </div>`;
    html += fiberStash.map(bolt => {
      const wCat = typeof getWeightCategory === 'function' ? getWeightCategory(bolt.weight) : null;
      const sel = plSelectedFabric?.id === bolt.id ? ' selected' : '';
      const patternClass = bolt.pattern && bolt.pattern !== 'solid' ? ' pattern-' + bolt.pattern : '';
      return `<div class="pl-byfab-bolt${sel}" data-bolt-id="${bolt.id}" data-variety="${bolt.variety || ''}">
        <div class="pl-bolt-swatch${patternClass}" style="background:${bolt.colorHex || '#ccc'};width:28px;height:28px;border-radius:6px;flex-shrink:0;"></div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.82rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${bolt.colorName || 'Unnamed'}${bolt.variety ? ' · ' + bolt.variety : ''}</div>
          <div style="font-size:0.68rem;color:var(--ink-faint);">${wCat ? wCat.label : ''} ${bolt.isKnit ? 'Knit' : 'Woven'}${bolt.width ? ' · ' + bolt.width + '″' : ''}</div>
        </div>
        <div style="font-size:0.78rem;font-weight:600;color:var(--ink-light);flex-shrink:0;">${(bolt.yardage || 0).toFixed(1)} yd</div>
        <div style="font-size:0.68rem;color:var(--green);font-weight:600;flex-shrink:0;">Use →</div>
      </div>`;
    }).join('');
  }

  // ── Varieties section: simple chips ──
  html += `<div class="pl-byfab-section-label" style="font-size:0.78rem;font-weight:600;color:var(--ink);margin:${fiberStash.length ? '14' : '0'}px 0 6px;">
    ${fiberStash.length ? 'Other Varieties' : 'Varieties'} (${varieties.length})
  </div>`;
  html += `<div class="pl-byfab-chips">`;
  html += varieties.map((v, vi) => {
    const isOwned = fiberStash.some(b => b.variety === v.name);
    const sel = plSelectedFabric?.fiber === fiberKey && plSelectedFabric?.variety === v.name && !plSelectedFabric?.id ? ' selected' : '';
    const gsmBadge = v.gsm ? `<span class="pl-byfab-chip-gsm">${v.gsm}</span>` : '';
    return `<span class="pl-byfab-chip${sel}${isOwned ? ' pl-byfab-chip-owned' : ''}" data-fiber="${fiberKey}" data-variety-idx="${vi}" data-variety-name="${v.name}" style="border-color:${f.accent}30;">
      ${v.name}${gsmBadge}${isOwned ? '<span class="pl-byfab-chip-stash">✓</span>' : ''}
    </span>`;
  }).join('');
  html += `</div>`;

  // ── Compatible projects section: grouped by audience type ──
  if (scored.length > 0) {
    // Group scored projects by their first audience
    const audienceGroups = {};
    scored.forEach(r => {
      const primaryAud = r.project.audiences?.[0] || 'other';
      if (!audienceGroups[primaryAud]) audienceGroups[primaryAud] = [];
      audienceGroups[primaryAud].push(r);
    });

    html += `<div class="pl-byfab-section-label" style="font-size:0.78rem;font-weight:600;color:var(--ink);margin:14px 0 8px;">
      ${scored.length} compatible project${scored.length !== 1 ? 's' : ''}
    </div>`;

    PROJECT_AUDIENCES.forEach(aud => {
      const group = audienceGroups[aud.key];
      if (!group || !group.length) return;
      const icon = AUDIENCE_SVGS[aud.icon] || '';

      html += `<div class="pl-byfab-aud-group">
        <div class="pl-byfab-aud-header">
          <span class="pl-byfab-aud-icon">${icon}</span>
          <span class="pl-byfab-aud-label">${aud.label}</span>
          <span class="pl-byfab-aud-count">${group.length}</span>
        </div>
        <div class="pl-byfab-proj-grid">`;

      html += group.map(r => {
        const p = r.project;
        const skillDist = (SKILL_ORDER[p.skill] ?? 1) - pSkill;
        const badge = skillDist === 0 ? '<span class="pl-ctx-badge ctx-match">✓</span>' :
                      skillDist === 1 ? '<span class="pl-ctx-badge ctx-stretch">↑</span>' : '';
        const skillColor = SKILL_COLORS[p.skill] || 'var(--ink-light)';
        return `<div class="pl-byfab-proj" data-proj-select="${p.id}">
          <div class="pl-byfab-proj-name">${p.name}${badge}</div>
          <div class="pl-byfab-proj-meta"><span style="color:${skillColor};">${SKILL_LABELS[p.skill]}</span> · ${r.score}%</div>
        </div>`;
      }).join('');

      html += `</div></div>`;
    });
  }

  container.className = '';
  container.innerHTML = html;

  // ── Event listeners ──

  // Stash bolt selection
  container.querySelectorAll('.pl-byfab-bolt').forEach(el => {
    el.addEventListener('click', () => {
      const bolt = stash.find(s => s.id === el.dataset.boltId);
      if (!bolt) return;
      plSelectedFabric = bolt;
      container.querySelectorAll('.pl-byfab-bolt, .pl-byfab-chip').forEach(f => f.classList.remove('selected'));
      el.classList.add('selected');
      plSaveCurrentState();
      renderConvergencePanel();
      const conv = document.getElementById('plConvergence');
      if (conv && conv.style.display !== 'none') conv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Variety chip selection
  container.querySelectorAll('.pl-byfab-chip').forEach(el => {
    el.addEventListener('click', () => {
      const vName = el.dataset.varietyName;
      const vi = parseInt(el.dataset.varietyIdx);
      const v = varieties[vi];
      const ownedBolt = fiberStash.find(b => b.variety === vName);
      if (ownedBolt) {
        plSelectedFabric = ownedBolt;
      } else {
        plSelectedFabric = {
          fiber: fiberKey,
          variety: vName,
          colorName: 'TBD',
          yardage: 0,
          isKnit: v?.isKnit || false,
          weight: v?.gsm ? parseFloat(v.gsm) / 33.906 : 0,
          needsBuying: true
        };
      }
      container.querySelectorAll('.pl-byfab-bolt, .pl-byfab-chip').forEach(f => f.classList.remove('selected'));
      el.classList.add('selected');
      plSaveCurrentState();
      renderConvergencePanel();

      if (!ownedBolt) {
        plShowBuyingGuidePrompt(container, fiberKey, vName);
      } else {
        const existing = container.querySelector('.pl-buying-guide-prompt');
        if (existing) existing.remove();
      }

      const conv = document.getElementById('plConvergence');
      if (conv && conv.style.display !== 'none') conv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Project selection from By Fabric
  container.querySelectorAll('[data-proj-select]').forEach(el => {
    el.addEventListener('click', () => {
      plSelectProjectFromFabric(el.dataset.projSelect, fiberKey);
    });
  });
}

function plShowBuyingGuidePrompt(container, fiberKey, varietyName) {
  // Remove any existing prompt
  const existing = container.querySelector('.pl-buying-guide-prompt');
  if (existing) existing.remove();

  const prompt = document.createElement('div');
  prompt.className = 'pl-buying-guide-prompt';
  prompt.innerHTML = `
    <div style="background:rgba(200,117,51,0.08);border:1px solid rgba(200,117,51,0.2);border-radius:10px;padding:12px 16px;margin:10px 0;">
      <div style="font-size:0.85rem;font-weight:600;color:#C87533;margin-bottom:6px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14" style="vertical-align:-2px;margin-right:4px;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        Don't own this yet?
      </div>
      <p style="font-size:0.78rem;color:var(--ink-light);margin:0 0 8px;">Add a buying guide note — it'll appear in your Setup and print output.</p>
      <textarea class="pl-buying-note-input" placeholder="e.g., Fabric store on Main St, ~$12/yd, need 2.5 yards" style="width:100%;min-height:48px;border:1px solid rgba(0,0,0,0.12);border-radius:6px;padding:8px;font-size:0.8rem;resize:vertical;font-family:inherit;"></textarea>
      <button class="pl-btn-secondary pl-buying-save-btn" style="margin-top:8px;font-size:0.78rem;padding:6px 14px;">Save buying note</button>
    </div>`;

  // Insert after the selected variety item
  const selectedItem = container.querySelector('.pl-byfab-chip.selected');
  if (selectedItem) {
    selectedItem.closest('.pl-byfab-chips')?.after(prompt);
  } else {
    container.querySelector('.pl-byfab-chips')?.after(prompt);
  }

  prompt.querySelector('.pl-buying-save-btn').addEventListener('click', () => {
    const note = prompt.querySelector('.pl-buying-note-input').value.trim();
    if (plSelectedFabric) {
      plSelectedFabric.buyingNote = note;
      plSelectedFabric.needsBuying = true;
      plSaveCurrentState();
    }
    prompt.querySelector('.pl-buying-save-btn').textContent = 'Saved ✓';
    prompt.querySelector('.pl-buying-save-btn').disabled = true;
  });
}

function plSelectProjectFromFabric(projectId, fiberKey) {
  plSelectedProject = projectId;
  // Preserve current fabric selection if one exists; only create generic if nothing selected
  if (!plSelectedFabric || !plSelectedFabric.fiber) {
    plSelectedFabric = { fiber: fiberKey, variety: 'Standard', colorName: 'TBD', yardage: 0, needsBuying: true };
  }
  plSaveCurrentState();
  renderConvergencePanel();
  const conv = document.getElementById('plConvergence');
  if (conv && conv.style.display !== 'none') conv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderMatchByProperties() {
  const wrap = document.getElementById('plByPropsContent');
  const props = FINDER_PROPS || [];
  if (!props.length) {
    wrap.innerHTML = '<div class="pl-empty">No property data available.</div>';
    return;
  }

  // Pre-seed sliders from selected person's sensitivities (only if filters are all zero / fresh)
  const allZero = props.every(p => !ffFilters[p]);
  if (allZero) {
    const data = loadUserData();
    const person = data.profiles.find(p => p.id === plSelectedPerson) || data.profiles[0];
    const sens = person?.sensitivities || [];
    if (sens.includes('Heat sensitive')) {
      ffFilters.breathability = 60;
      ffFilters.heatTolerance = 50;
    }
    if (sens.includes('Wool itch') || sens.includes('Texture sensitive')) {
      ffFilters.drape = 50;
    }
    if (sens.includes('Dye sensitivity')) {
      ffFilters.colorfastness = 60;
    }
  }

  wrap.innerHTML = `
    <div class="ff-filter-controls">
      <div class="ff-filter-controls-header">
        <span class="ff-filter-controls-title">Property Thresholds <button class="prop-legend-btn" onclick="togglePropLegend(this)">?</button></span>
        <button class="ff-filter-reset" onclick="ffResetFilters()">Reset all</button>
      </div>
      <div class="prop-legend-popover" style="display:none">
        <div class="prop-legend-title">Scoring Guide</div>
        <p class="prop-legend-intro">All properties are scored 0–100 where <strong>higher is better</strong>.</p>
        <div class="prop-legend-list">
          ${Object.entries(PROP_TOOLTIPS).map(([k,tip]) => `<div class="prop-legend-item"><span class="prop-legend-name">${PROP_DISPLAY_LABELS[k] || PROP_LABELS[k]}</span><span class="prop-legend-desc">${tip}</span></div>`).join('')}
        </div>
      </div>
      <div class="ff-filter-sliders" id="ffFilterSliders"></div>
      <div class="ff-sort-row">
        <span class="ff-sort-label">Sort by:</span>
        <div class="seg-control ff-sort-control" id="ffSortPills"></div>
      </div>
    </div>

    <div class="ff-range-legend">
      <div class="ff-range-legend-item"><div class="ff-legend-range-sample"></div> Property range across varieties</div>
      <div class="ff-range-legend-item"><div class="ff-legend-threshold-sample"></div> Your threshold</div>
    </div>

    <div class="ff-results-header">
      <span class="ff-results-count" id="ffResultsCount"></span>
    </div>
    <div class="ff-results-list" id="ffResultsList"></div>
  `;

  // Build sliders
  document.getElementById('ffFilterSliders').innerHTML = FINDER_PROPS.map(p => `
    <div class="ff-filter-slider-group">
      <div class="ff-filter-slider-label">
        <span class="ff-filter-slider-name">${FINDER_PROP_LABELS[p]}</span>
        <span class="ff-filter-slider-value" id="ffVal_${p}">${ffFilters[p] ? ffFilters[p] + '+' : 'Any'}</span>
      </div>
      <div class="ff-filter-slider-track">
        <input type="range" min="0" max="100" step="5" value="${ffFilters[p] || 0}" id="ffSlider_${p}" class="${ffFilters[p] ? 'active-filter' : ''}" oninput="ffUpdateFilter('${p}', this.value)">
      </div>
      <div class="ff-filter-slider-scale"><span>Any</span><span>50+</span><span>100</span></div>
    </div>
  `).join('');

  ffRenderSortPills();
  ffRenderResults();
}

// ═══════════════════════════════════════════════════════════════
// RENDER: CONVERGENCE PANEL (inline in Match panel)
// ═══════════════════════════════════════════════════════════════

function plGetMachineSettingsKey(weight) {
  if (!weight || weight <= 0) return 'medium';
  if (weight < 3.5) return 'lightweight';
  if (weight < 6) return 'medium';
  return 'heavy';
}

function plGetBestSeamFinishes(weightKey, isKnit) {
  // Map weight key to SEAM_FINISHES score key
  const scoreKey = weightKey === 'lightweight' ? 'lightweight' : weightKey === 'heavy' ? 'heavy' : 'medium';
  return SEAM_FINISHES
    .map(sf => ({ ...sf, score: sf.scores[scoreKey] || 50 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function renderConvergencePanel() {
  const wrap = document.getElementById('plConvergence');
  if (!plSelectedProject || !plSelectedFabric) {
    wrap.style.display = 'none';
    return;
  }

  const project = PROJECT_CATALOG.find(p => p.id === plSelectedProject);
  const fabric = plSelectedFabric || {};
  const fiberKey = fabric.fiber;
  const f = FIBERS[fiberKey];
  if (!project || !f) { wrap.style.display = 'none'; return; }

  const needleData = NEEDLE_DATA[fiberKey];
  const weightKey = plGetMachineSettingsKey(fabric.weight);
  const machineSettings = needleData?.machineSettings?.[weightKey] || needleData?.machineSettings?.medium;
  const topNeedle = needleData?.needleTypes?.[0];
  const topThread = needleData?.threadRecs?.[0];
  const bestSeams = plGetBestSeamFinishes(weightKey, fabric.isKnit);
  const interfacingRec = FIBER_INTERFACING_RECS[fiberKey];
  const care = f.care || {};

  wrap.style.display = '';
  wrap.innerHTML = `
    <div class="pl-convergence">
      <div class="pl-convergence-header">
        <div class="pl-convergence-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div>
          <div class="pl-convergence-title">Machine & Construction Settings</div>
          <div class="pl-convergence-subtitle">${f.name} · ${(fabric.colorName || '')} · ${weightKey} weight</div>
        </div>
      </div>

      ${fabric.needsBuying ? `<div style="background:rgba(200,117,51,0.08);border:1px solid rgba(200,117,51,0.2);border-radius:8px;padding:10px 14px;margin-bottom:12px;">
        <div style="font-size:0.82rem;font-weight:600;color:#C87533;">🛒 Fabric to purchase: ${f.name} — ${fabric.variety || 'Standard'}</div>
        ${fabric.buyingNote ? `<div style="font-size:0.78rem;color:var(--ink-light);margin-top:4px;">${fabric.buyingNote}</div>` : ''}
      </div>` : ''}

      <div class="pl-convergence-grid">
        ${machineSettings ? `
        <div class="pl-convergence-card">
          <div class="pl-convergence-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            Machine Settings
          </div>
          <div class="pl-convergence-rows">
            <div class="pl-convergence-row"><span class="pl-convergence-label">Stitch length</span><span class="pl-convergence-value">${machineSettings.stitch}</span></div>
            <div class="pl-convergence-row"><span class="pl-convergence-label">Tension</span><span class="pl-convergence-value">${machineSettings.tension}</span></div>
            <div class="pl-convergence-row"><span class="pl-convergence-label">Presser foot</span><span class="pl-convergence-value">${machineSettings.foot}</span></div>
            <div class="pl-convergence-row"><span class="pl-convergence-label">Speed</span><span class="pl-convergence-value">${machineSettings.speed}</span></div>
          </div>
          ${machineSettings.notes ? `<div class="pl-convergence-note">${machineSettings.notes}</div>` : ''}
        </div>` : ''}

        <div class="pl-convergence-card">
          <div class="pl-convergence-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            Needle & Thread
          </div>
          <div class="pl-convergence-rows">
            ${topNeedle ? `<div class="pl-convergence-row"><span class="pl-convergence-label">Needle</span><span class="pl-convergence-value">${topNeedle.name} ${topNeedle.sizes}</span></div>` : ''}
            ${topThread ? `<div class="pl-convergence-row"><span class="pl-convergence-label">Thread</span><span class="pl-convergence-value">${topThread.weight}</span></div>` : ''}
          </div>
          ${topNeedle ? `<div class="pl-convergence-note">${topNeedle.use}</div>` : ''}
        </div>

        <div class="pl-convergence-card">
          <div class="pl-convergence-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            Seam Finish
          </div>
          <div class="pl-convergence-rows">
            ${bestSeams.map((s, i) => `
              <div class="pl-convergence-row">
                <span class="pl-convergence-label">${i === 0 ? '★ ' : ''}${s.name}</span>
                <span class="pl-convergence-value pl-convergence-score">${s.score}/100</span>
              </div>`).join('')}
          </div>
          <div class="pl-convergence-note">${bestSeams[0]?.desc || ''}</div>
        </div>

        ${interfacingRec ? `
        <div class="pl-convergence-card">
          <div class="pl-convergence-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            Interfacing
          </div>
          <div class="pl-convergence-rows">
            <div class="pl-convergence-row"><span class="pl-convergence-label">Type</span><span class="pl-convergence-value">${interfacingRec.primary}</span></div>
            <div class="pl-convergence-row"><span class="pl-convergence-label">Weight</span><span class="pl-convergence-value">${interfacingRec.weight}</span></div>
          </div>
          <div class="pl-convergence-note">${interfacingRec.notes}</div>
        </div>` : ''}

        <div class="pl-convergence-card">
          <div class="pl-convergence-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>
            Pressing
          </div>
          <div class="pl-convergence-rows">
            <div class="pl-convergence-row"><span class="pl-convergence-label">Iron</span><span class="pl-convergence-value">${care.ironing || 'Medium heat'}</span></div>
          </div>
          ${care.specialNotes ? `<div class="pl-convergence-note">${care.specialNotes}</div>` : ''}
        </div>
      </div>

      <div class="pl-convergence-cta">
        <button class="pl-btn-primary" id="plConvergenceContinue">
          Continue to Setup
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>`;

  // CTA listener
  const ctaBtn = document.getElementById('plConvergenceContinue');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      plGoToTab(1);
    });
  }
}

// ═══════════════════════════════════════════════════════════════
// RENDER: CONFIRM SETUP (Panel 2)
// ═══════════════════════════════════════════════════════════════

function renderPipelineSetup() {
  const data = loadUserData();
  const person = data.profiles.find(p => p.id === plSelectedPerson) || data.profiles[0];
  const project = PROJECT_CATALOG.find(p => p.id === plSelectedProject);
  const fabric = plSelectedFabric || {};
  const f = FIBERS[fabric.fiber];

  // Context card — show person, project, and selected bolt details with inline editing
  const boltInfo = fabric.id ? `
    <div style="display:flex;align-items:center;gap:10px;margin-top:8px;padding-top:8px;border-top:1px solid rgba(0,0,0,0.06);">
      <div class="pl-bolt-swatch" style="background:${fabric.colorHex || '#ccc'}; width:28px; height:28px; border-radius:6px; flex-shrink:0;"></div>
      <div style="font-size:0.75rem;color:var(--ink-light);">
        <strong>${fabric.colorName || '?'}</strong> ${fabric.variety ? '· ' + fabric.variety : ''} · ${fabric.yardage?.toFixed(1) || '?'} yd · ${fabric.width || '?'}″ wide
        ${fabric.weight ? ' · ' + fabric.weight + ' oz/yd²' : ''}
      </div>
    </div>` : '';

  // Person picker row for Setup
  const personPickerHtml = data.profiles.length > 1 ? `
    <div style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(0,0,0,0.06);">
      <div style="font-size:0.72rem;color:var(--ink-light);margin-bottom:6px;">Who is this for?</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        ${data.profiles.map(p => `
          <button class="pl-person-picker-btn${p.id === plSelectedPerson ? ' selected' : ''}" data-setup-person="${p.id}" style="padding:4px 10px;font-size:0.75rem;">
            <div class="pl-person-picker-avatar" style="background:${p.avatar?.color || '#5B8C6B'};width:20px;height:20px;font-size:0.6rem;">${p.avatar?.letter || p.name.charAt(0)}</div> ${p.name}
          </button>
        `).join('')}
      </div>
    </div>` : '';

  document.getElementById('plSetupContext').innerHTML = `
    <div class="card" style="margin-bottom:20px;">
      <div style="display:flex;align-items:center;gap:18px;">
        <div style="width:48px;height:48px;border-radius:10px;background:${f?.accent || '#ccc'}18;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span style="font-size:1.3rem;">🌿</span>
        </div>
        <div style="flex:1;">
          <div style="font-size:1rem;font-weight:600;">${project?.name || 'No project'} × ${f?.name || 'No fabric'}</div>
          <div style="font-size:0.78rem;color:var(--ink-light);">For ${person?.name || 'You'}${fabric.colorName && fabric.colorName !== 'TBD' ? ' · ' + fabric.colorName : ''}${fabric.yardage ? ' (' + fabric.yardage.toFixed(1) + ' yd in stash)' : ''}</div>
        </div>
        <button class="pl-btn-secondary" style="padding:6px 14px;font-size:0.75rem;" onclick="plGoToTab(0)">Change</button>
      </div>
      ${boltInfo}
      ${fabric.needsBuying ? `<div style="background:rgba(200,117,51,0.08);border:1px solid rgba(200,117,51,0.2);border-radius:8px;padding:10px 14px;margin-top:10px;">
        <div style="font-size:0.82rem;font-weight:600;color:#C87533;">🛒 Fabric to purchase: ${f?.name || 'Fabric'} — ${fabric.variety || 'Standard'}</div>
        ${fabric.buyingNote ? `<div style="font-size:0.78rem;color:var(--ink-light);margin-top:4px;">${fabric.buyingNote}</div>` : '<div style="font-size:0.78rem;color:var(--ink-light);margin-top:4px;">No buying notes added yet.</div>'}
      </div>` : ''}
      ${personPickerHtml}
    </div>`;

  // Person picker listeners in Setup — changing person recalculates setup defaults
  document.querySelectorAll('[data-setup-person]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-setup-person]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      plSelectedPerson = btn.dataset.setupPerson;
      plSetupState = {};  // Reset setup state to pick up new person's defaults
      plSaveCurrentState();
      renderPipelineSetup();  // Re-render with new person's data
    });
  });

  // Setup state defaults from profile + stash (only if not already populated from persistence)
  if (!plSetupState.size) {
    plSetupState = {
      width: fabric.width || 45,
      directional: fabric.directional || false,
      preShrunk: fabric.preShrunk || false,
      size: person?.topSize || person?.preferredSize || 'm',
      skill: person?.skill || 'intermediate'
    };
  }

  // Section 1: Fabric Details
  const widthOptions = [36, 42, 44, 45, 54, 58, 60];
  const sections = `
    <div class="pl-section">
      <div class="pl-section-title"><span class="pl-section-num">1</span> Fabric Details</div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">Bolt Width</div><div class="pl-form-label-hint">${fabric.width ? 'From your stash entry' : 'Select width'}</div></div>
        <div class="pl-form-control">
          <div class="pl-option-pills">
            ${widthOptions.map(w => `<button class="pl-option-pill${Math.abs(w - plSetupState.width) < 2 ? ' selected' : ''}" data-width="${w}">${w}″</button>`).join('')}
            <button class="pl-option-pill" data-width="custom">Custom</button>
          </div>
          <input type="number" id="plSetupWidthCustom" class="pl-select" placeholder="inches" min="1" max="120" style="width:80px;display:none;margin-top:6px;">
        </div>
      </div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">Directional?</div><div class="pl-form-label-hint">One-way print or nap</div></div>
        <div class="pl-form-control">
          <div class="pl-toggle-row">
            <label class="pl-toggle-switch"><input type="checkbox" id="plDirectionalToggle" ${plSetupState.directional ? 'checked' : ''}><span class="pl-toggle-slider"></span></label>
            <div><div class="pl-toggle-label">${plSetupState.directional ? 'Yes — directional' : 'No — non-directional'}</div></div>
          </div>
        </div>
      </div>
      <div class="pl-form-row">
        <div class="pl-form-label"><div class="pl-form-label-main">Pre-Shrinkage</div><div class="pl-form-label-hint">${fabric.preShrunk ? 'From stash: pre-shrunk' : 'Select status'}</div></div>
        <div class="pl-form-control">
          <div class="pl-option-pills">
            <button class="pl-option-pill${!plSetupState.preShrunk ? '' : ''}" data-shrink="wash">I'll pre-wash</button>
            <button class="pl-option-pill${plSetupState.preShrunk ? ' selected' : ''}" data-shrink="done">Already pre-shrunk</button>
            <button class="pl-option-pill" data-shrink="skip">Skip</button>
          </div>
        </div>
      </div>
    </div>

    <div class="pl-section">
      <div class="pl-section-title"><span class="pl-section-num">2</span> Size & Fit</div>
      <div class="pl-form-row" style="border-bottom:none;">
        <div class="pl-form-label"><div class="pl-form-label-main">Pattern Size</div><div class="pl-form-label-hint">From ${person?.name}'s profile</div></div>
        <div class="pl-form-control">
          <select class="pl-select" id="plSizeSelect">
            <option value="xs" ${plSetupState.size==='xs'?'selected':''}>XS (0–2)</option>
            <option value="s" ${plSetupState.size==='s'?'selected':''}>S (4–6)</option>
            <option value="m" ${plSetupState.size==='m'?'selected':''}>M (8–10)</option>
            <option value="l" ${plSetupState.size==='l'?'selected':''}>L (12–14)</option>
            <option value="xl" ${plSetupState.size==='xl'?'selected':''}>XL (16–18)</option>
          </select>
        </div>
      </div>
    </div>

    <div class="pl-section">
      <div class="pl-section-title"><span class="pl-section-num">3</span> Skill Level</div>
      <div class="pl-form-row" style="border-bottom:none;">
        <div class="pl-form-label"><div class="pl-form-label-main">Experience</div><div class="pl-form-label-hint">From ${person?.name}'s profile</div></div>
        <div class="pl-form-control">
          <div class="pl-option-pills">
            <button class="pl-option-pill${plSetupState.skill==='beginner'?' selected':''}" data-skill="beginner"><span class="pl-option-pill-name">Beginner</span><span class="pl-option-pill-desc">First garment</span></button>
            <button class="pl-option-pill${plSetupState.skill==='intermediate'?' selected':''}" data-skill="intermediate"><span class="pl-option-pill-name">Intermediate</span><span class="pl-option-pill-desc">Some projects</span></button>
            <button class="pl-option-pill${plSetupState.skill==='advanced'?' selected':''}" data-skill="advanced"><span class="pl-option-pill-name">Advanced</span><span class="pl-option-pill-desc">Experienced</span></button>
          </div>
        </div>
      </div>
    </div>`;

  document.getElementById('plSetupSections').innerHTML = sections;

  // Width selector listeners
  const setupCustomWidth = document.getElementById('plSetupWidthCustom');
  const setupSections = document.getElementById('plSetupSections');
  setupSections.querySelectorAll('.pl-option-pill[data-width]').forEach(btn => {
    btn.addEventListener('click', () => {
      setupSections.querySelectorAll('.pl-option-pill[data-width]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      if (btn.dataset.width === 'custom') {
        if (setupCustomWidth) setupCustomWidth.style.display = '';
      } else {
        if (setupCustomWidth) setupCustomWidth.style.display = 'none';
        plSetupState.width = parseInt(btn.dataset.width);
        updateYardageImpact();
        plSaveCurrentState();
      }
    });
  });
  if (setupCustomWidth) {
    setupCustomWidth.addEventListener('input', () => {
      const v = parseInt(setupCustomWidth.value);
      if (v > 0) { plSetupState.width = v; updateYardageImpact(); plSaveCurrentState(); }
    });
  }

  // Directional toggle
  document.getElementById('plDirectionalToggle')?.addEventListener('change', (e) => {
    plSetupState.directional = e.target.checked;
    e.target.closest('.pl-toggle-row').querySelector('.pl-toggle-label').textContent = e.target.checked ? 'Yes — directional' : 'No — non-directional';
    updateYardageImpact();
    plSaveCurrentState();
  });

  // Shrinkage radio pills
  document.querySelectorAll('.pl-option-pill[data-shrink]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pl-option-pill[data-shrink]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      plSetupState.preShrunk = btn.dataset.shrink === 'done';
      updateYardageImpact();
      plSaveCurrentState();
    });
  });

  // Size select
  document.getElementById('plSizeSelect')?.addEventListener('change', (e) => {
    plSetupState.size = e.target.value;
    updateYardageImpact();
    plSaveCurrentState();
  });

  // Skill pills
  document.querySelectorAll('.pl-option-pill[data-skill]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pl-option-pill[data-skill]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      plSetupState.skill = btn.dataset.skill;
      plSaveCurrentState();
    });
  });

  updateYardageImpact();
}

function updateYardageImpact() {
  const wrap = document.getElementById('plYardageImpact');
  const project = PROJECT_CATALOG.find(p => p.id === plSelectedProject);
  if (!project) { wrap.innerHTML = ''; return; }

  const est = estimateYardage(plSelectedProject, plSetupState.width, plSetupState.size, plSetupState.directional, !plSetupState.preShrunk);
  if (!est) { wrap.innerHTML = ''; return; }
  const fabric = plSelectedFabric || {};
  const hasStash = fabric.yardage > 0;
  const remaining = hasStash ? fabric.yardage - est.total : 0;

  wrap.innerHTML = `
    <div class="pl-yardage-box">
      <div class="pl-yardage-title">Yardage Estimate</div>
      <div class="pl-yardage-row"><span class="pl-yardage-label">Base yardage (${plSetupState.size.toUpperCase()}, ${plSetupState.width}″)</span><span class="pl-yardage-value">${est.base.toFixed(2)} yd</span></div>
      <div class="pl-yardage-row"><span class="pl-yardage-label">Shrinkage buffer</span><span class="pl-yardage-value${est.shrinkageBuffer > 0 ? ' adjusted' : ''}">${est.shrinkageBuffer > 0 ? '+' + est.shrinkageBuffer.toFixed(2) + ' yd' : '— (pre-shrunk)'}</span></div>
      <div class="pl-yardage-row"><span class="pl-yardage-label">Directional layout</span><span class="pl-yardage-value${est.directionalExtra > 0 ? ' adjusted' : ''}">${est.directionalExtra > 0 ? '+' + est.directionalExtra.toFixed(2) + ' yd (+15%)' : '—'}</span></div>
      <hr class="pl-yardage-divider">
      <div class="pl-yardage-row"><span class="pl-yardage-label pl-yardage-total">Total recommended</span><span class="pl-yardage-value pl-yardage-total">${est.total.toFixed(2)} yd</span></div>
      ${hasStash ? `<div class="pl-yardage-row" style="margin-top:6px;">
        <span class="pl-yardage-label" style="color:${remaining >= 0 ? 'var(--green)' : 'var(--rose)'};font-weight:600;">From stash (${fabric.colorName})</span>
        <span class="pl-yardage-value" style="color:${remaining >= 0 ? 'var(--green)' : 'var(--rose)'};">${fabric.yardage.toFixed(1)} yd available → ${remaining >= 0 ? remaining.toFixed(2) + ' yd remaining' : 'Need ' + Math.abs(remaining).toFixed(2) + ' yd more'}</span>
      </div>` : ''}
    </div>`;
}

// ═══════════════════════════════════════════════════════════════
// RENDER: BUILD WALKTHROUGH (Panel 3)
// ═══════════════════════════════════════════════════════════════

function plGetWeightClass(variety) {
  if (!variety) return 'medium';
  const w = (typeof variety === 'string' ? variety : variety.weight || '').toLowerCase();
  if (w.includes('heavy')) return 'heavy';
  if (w.includes('light')) return 'lightweight';
  return 'medium';
}

function plGetMachineSettings(fiber, variety) {
  const nd = NEEDLE_DATA[fiber];
  if (!nd || !nd.machineSettings) return null;
  const wc = plGetWeightClass(variety);
  return nd.machineSettings[wc] || nd.machineSettings.medium || null;
}

function plGetNeedleRec(fiber, variety) {
  const nd = NEEDLE_DATA[fiber];
  if (!nd) return null;
  return nd.needleTypes?.[0] || null;
}

function plGetThreadRec(fiber) {
  const nd = NEEDLE_DATA[fiber];
  if (!nd) return null;
  return nd.threadRecs?.[0] || null;
}

function plBuildResourceLinks(step, fiber, stepIdx) {
  // Generate contextual resource link chips based on step content
  const links = [];
  const s = (typeof step === 'object' ? step.step || step.title || '' : step).toLowerCase();
  const detail = (typeof step === 'object' ? step.detail || '' : '').toLowerCase();
  const combined = s + ' ' + detail;

  if (combined.includes('cut') || combined.includes('cutting') || combined.includes('layout')) {
    links.push({ label: 'Cutting tools guide', type: 'tools' });
    links.push({ label: 'Marking tools', type: 'tools' });
    links.push({ label: 'Measuring guide', type: 'tools' });
  }
  if (combined.includes('press') || combined.includes('iron')) {
    links.push({ label: `Pressing guide for ${FIBERS[fiber]?.name || 'fabric'}`, type: 'tools' });
  }
  if (combined.includes('seam') || combined.includes('stitch') || combined.includes('sew')) {
    links.push({ label: 'Machine settings · Needle & Thread', type: 'planner' });
  }
  if (combined.includes('french seam')) {
    links.push({ label: 'French seam technique · Reference', type: 'reference' });
    links.push({ label: 'Seam Finder', type: 'planner' });
  }
  if (combined.includes('dart')) {
    links.push({ label: 'Dart technique · Reference', type: 'reference' });
  }
  if (combined.includes('zipper') || combined.includes('zip')) {
    links.push({ label: 'Zipper insertion · Reference', type: 'reference' });
  }
  if (combined.includes('hem')) {
    links.push({ label: 'Hem techniques · Reference', type: 'reference' });
    links.push({ label: 'Measuring: hem depth', type: 'tools' });
  }
  if (combined.includes('interface') || combined.includes('interfacing')) {
    links.push({ label: 'Interfacing guide', type: 'planner' });
  }
  if (combined.includes('collar')) {
    links.push({ label: 'Collar construction · Reference', type: 'reference' });
  }
  if (combined.includes('sleeve')) {
    links.push({ label: 'Sleeve setting · Reference', type: 'reference' });
  }
  if (combined.includes('waistband')) {
    links.push({ label: 'Waistband construction · Reference', type: 'reference' });
  }
  if (combined.includes('pocket')) {
    links.push({ label: 'Pocket construction · Reference', type: 'reference' });
  }
  if (combined.includes('button') || combined.includes('closure')) {
    links.push({ label: 'Closure techniques · Reference', type: 'reference' });
  }
  // Default: if no links generated, add generic ones
  if (links.length === 0) {
    links.push({ label: `${FIBERS[fiber]?.name || 'Fabric'} sewing tips · Reference`, type: 'reference' });
    links.push({ label: 'Machine settings · Needle & Thread', type: 'planner' });
  }
  // Deduplicate by label
  const seen = new Set();
  return links.filter(l => { if (seen.has(l.label)) return false; seen.add(l.label); return true; }).slice(0, 4);
}

function plGetStepMistake(project, stepIdx) {
  // Find a relevant mistake for a construction step
  if (!project?.mistakes?.length) return null;
  // Map step index to a mistake (cycle through if fewer mistakes than steps)
  if (stepIdx < project.mistakes.length) return project.mistakes[stepIdx];
  return null;
}

// ── Tool ownership check for contextual supply badges ──
function plCheckOwnedSupply(supplyName, ownedTools) {
  const s = supplyName.toLowerCase();
  const allOwned = [];
  for (const [cat, tools] of Object.entries(ownedTools || {})) {
    for (const key of (tools || [])) {
      const label = TOOL_INVENTORY_LABELS[cat]?.[key] || key;
      allOwned.push({ key, label: label.toLowerCase(), cat });
    }
  }
  // Match supply text against owned tool labels
  if ((s.includes('shear') || s.includes('rotary') || s.includes('cutter')) && allOwned.some(t => t.label.includes('shear') || t.label.includes('rotary'))) return true;
  if (s.includes('iron') && allOwned.some(t => t.label.includes('iron'))) return true;
  if ((s.includes('pin') || s.includes('clip')) && allOwned.some(t => t.label.includes('pin') || t.label.includes('clip'))) return true;
  if (s.includes('marking') && allOwned.some(t => t.label.includes('chalk') || t.label.includes('ink') || t.label.includes('marking'))) return true;
  if (s.includes('tape measure') && allOwned.some(t => t.label.includes('tape'))) return true;
  if ((s.includes('sewing machine') || s.includes('machine')) && !s.includes('needle') && allOwned.some(t => t.label.includes('sewing machine'))) return true;
  if (s.includes('serger') && allOwned.some(t => t.label.includes('serger'))) return true;
  if (s.includes('pressing ham') && allOwned.some(t => t.label.includes('ham'))) return true;
  if (s.includes('seam ripper') && allOwned.some(t => t.label.includes('ripper'))) return true;
  if (s.includes('ruler') && allOwned.some(t => t.label.includes('ruler'))) return true;
  if (s.includes('seam gauge') && allOwned.some(t => t.label.includes('gauge'))) return true;
  return false;
}

// ── Skill-aware tip generator ──
function plGetSkillTip(stepTitle, personSkill) {
  if (!stepTitle) return null;
  const s = stepTitle.toLowerCase();
  if (personSkill === 'beginner') {
    if (s.includes('cut')) return 'Tip: Cut slowly and pin your pattern piece flat before cutting. Use fabric weights if you have them.';
    if (s.includes('seam') || s.includes('sew') || s.includes('stitch')) return 'Tip: Sew a test seam on scrap fabric first. Backstitch at the start and end of every seam.';
    if (s.includes('press') || s.includes('iron')) return 'Tip: Press seams as you go — don\'t wait until the end. This makes everything lie flatter.';
    if (s.includes('hem')) return 'Tip: Measure your hem allowance with a seam gauge and press it before stitching.';
    if (s.includes('zipper') || s.includes('zip')) return 'Tip: Baste the zipper in place first, then sew with a zipper foot. Remove basting stitches last.';
    if (s.includes('dart')) return 'Tip: Start sewing from the widest part of the dart toward the point. Don\'t backstitch at the point — tie threads instead.';
  } else if (personSkill === 'advanced') {
    if (s.includes('seam')) return 'Consider flat-felled or French seams for a couture finish on this fabric.';
    if (s.includes('hem')) return 'Try a hand-caught blind hem for an invisible finish — especially nice on this fabric.';
  }
  return null;
}

// ── Tier 12: Rich Tools Integration ──

// Pressing heat guide data (subset from tools.html for inline pipeline use)
const PL_PRESSING_GUIDE = {
  silk:     { heat: 'Low (1 dot)', steam: 'None or very light', cloth: true, note: 'Water drops leave permanent marks on silk.' },
  wool:     { heat: 'Medium (2 dots)', steam: 'Heavy steam', cloth: true, note: 'Direct iron contact causes shine.' },
  cotton:   { heat: 'High (3 dots)', steam: 'Heavy steam', cloth: false, note: 'Cotton loves heat — press firmly.' },
  linen:    { heat: 'High (3 dots)', steam: 'Heavy steam', cloth: false, note: 'Linen looks best with some natural wrinkle.' },
  hemp:     { heat: 'High (3 dots)', steam: 'Heavy steam', cloth: false, note: 'Press while slightly damp for best results.' },
  ramie:    { heat: 'High (3 dots)', steam: 'Heavy steam', cloth: false, note: 'Similar to linen — press damp.' },
  cashmere: { heat: 'Medium (2 dots)', steam: 'Light steam', cloth: true, note: 'Use a press cloth and press gently.' },
  alpaca:   { heat: 'Medium (2 dots)', steam: 'Light steam', cloth: true, note: 'Treat like fine wool — avoid direct contact.' },
  mohair:   { heat: 'Medium (2 dots)', steam: 'Light steam', cloth: true, note: 'Press on the wrong side to protect pile.' },
  angora:   { heat: 'Low (1 dot)', steam: 'Light', cloth: true, note: 'Very delicate — hover the iron rather than pressing.' },
  camel:    { heat: 'Medium (2 dots)', steam: 'Light steam', cloth: true, note: 'Treat like wool.' },
  bamboo:   { heat: 'Medium', steam: 'Light steam', cloth: false, note: 'Press while slightly damp.' },
  tencel:   { heat: 'Medium', steam: 'Light steam', cloth: false, note: 'Press while slightly damp.' },
  viscose:  { heat: 'Medium', steam: 'Light steam', cloth: true, note: 'Press on wrong side to prevent shine.' },
  modal:    { heat: 'Medium', steam: 'Light steam', cloth: true, note: 'Weak when wet — handle gently.' },
  cupro:    { heat: 'Low to Medium', steam: 'Light', cloth: true, note: 'Press on wrong side with a cloth.' },
  jute:     { heat: 'High (3 dots)', steam: 'Heavy steam', cloth: false, note: 'Sturdy fiber — press firmly.' },
  pina:     { heat: 'Low to Medium', steam: 'Light', cloth: true, note: 'Delicate — test on scrap first.' },
  kapok:    { heat: 'Low', steam: 'None', cloth: true, note: 'Kapok fibers are very fine — minimal pressing.' },
  nettle:   { heat: 'High (3 dots)', steam: 'Heavy steam', cloth: false, note: 'Similar to linen — press damp.' }
};

// Cutting method recommendation based on fabric characteristics
function plGetCuttingRec(fiber, variety, isKnit) {
  const weight = variety?.weight?.toLowerCase() || '';
  const isHeavy = weight.includes('heavy') || weight.includes('canvas') || weight.includes('denim') || weight.includes('tweed');
  const isSheer = weight.includes('sheer') || weight.includes('chiffon') || weight.includes('organza') || weight.includes('voile');

  if (isSheer) return { tool: 'Rotary Cutter + Mat', why: 'Sheer fabrics shift when lifted — rotary cutting keeps them flat and accurate. Use pattern weights, not pins.', alt: 'If hand-cutting: use sharp micro-serrated shears and cut single layer.' };
  if (isKnit) return { tool: 'Rotary Cutter + Mat', why: 'Knits stretch and shift under scissor blades. Rotary cutting with a mat keeps layers stable and edges clean.', alt: 'Use ballpoint pins if pinning — regular pins can snag loops.' };
  if (isHeavy) return { tool: 'Sharp Fabric Shears (8–10")', why: 'Heavy fabrics need the leverage of full-size shears. Use long, smooth strokes — short chops leave jagged edges.', alt: 'For denim or canvas, consider a 60mm rotary blade for extra cutting power.' };
  if (fiber === 'silk') return { tool: 'Rotary Cutter or Micro-Serrated Shears', why: 'Silk slips under standard shears. A rotary cutter on a mat or micro-serrated blades grip the fabric while cutting.', alt: 'Pin through tissue paper on both sides of the silk to stabilize it.' };
  return { tool: 'Fabric Shears or Rotary Cutter', why: 'Standard-weight wovens cut well with either method. Use whatever gives you more control.', alt: 'Rotary + ruler is faster for straight edges; shears are easier for tight curves.' };
}

// Get relevant pressing tool for a step type
function plGetPressingTool(stepTitle) {
  if (!stepTitle) return null;
  const s = stepTitle.toLowerCase();
  if (s.includes('dart') || s.includes('bust') || s.includes('princess') || s.includes('sleeve cap')) return { tool: 'Pressing Ham', tip: 'Press over a ham to maintain the 3D curve. Place the curved seam over the rounded side.' };
  if (s.includes('sleeve') && (s.includes('press') || s.includes('seam'))) return { tool: 'Sleeve Board', tip: 'Slip the sleeve over a sleeve board to press the seam without creasing the opposite side.' };
  if (s.includes('collar') || s.includes('lapel') || s.includes('point')) return { tool: 'Point Presser + Clapper', tip: 'Use the point presser for narrow seam areas, then clap with the clapper to set a crisp edge.' };
  if (s.includes('waistband') || s.includes('crease') || s.includes('pleat')) return { tool: 'Clapper', tip: 'Steam the area, then press the clapper down firmly for 10–15 seconds to set a permanent crease.' };
  return null;
}

// Get inline tool tip for a build step based on keywords
function plGetStepToolTip(stepTitle, fiber) {
  if (!stepTitle) return null;
  const s = stepTitle.toLowerCase();
  const pressingGuide = PL_PRESSING_GUIDE[fiber];

  if (s.includes('press') || s.includes('iron')) {
    if (pressingGuide) return { icon: '♨️', label: 'Pressing', text: `${pressingGuide.heat} heat, ${pressingGuide.steam}.${pressingGuide.cloth ? ' Use a press cloth.' : ''} ${pressingGuide.note}` };
  }
  if (s.includes('cut') || s.includes('layout') || s.includes('pattern piece')) {
    return { icon: '✂️', label: 'Cutting', text: 'Cut on a flat surface. Use the full blade length in smooth strokes — short choppy snips leave jagged edges. Pin or weight pattern pieces flat before cutting.' };
  }
  if (s.includes('mark') || s.includes('transfer') || s.includes('chalk')) {
    const markTip = (fiber === 'silk' || fiber === 'cupro') ? 'Use silk pins and disappearing ink — chalk can leave marks on fine fabrics.' : 'Use tailor\'s chalk or disappearing ink pens to transfer markings from your pattern.';
    return { icon: '✏️', label: 'Marking', text: markTip + ' Mark on the wrong side of the fabric.' };
  }
  if (s.includes('measure') || s.includes('hem') && s.includes('mark')) {
    return { icon: '📏', label: 'Measuring', text: 'Use a seam gauge to mark consistent distances. Set it once and repeat across the entire edge.' };
  }
  return null;
}

// Get top troubleshooting tips for machine prep
function plGetMachineTroubleTips(machineKey) {
  const data = MACHINE_TROUBLESHOOT?.[machineKey || 'sewing'];
  if (!data) return [];
  const tips = [];
  // Get first problem from first two categories
  for (const catKey of Object.keys(data)) {
    const cat = data[catKey];
    if (cat.problems?.[0]) {
      tips.push({ category: cat.label, symptom: cat.problems[0].symptom, topFix: cat.problems[0].fixes?.[0] || '' });
    }
    if (tips.length >= 2) break;
  }
  return tips;
}

function renderPipelineBuild() {
  const project = PROJECT_CATALOG.find(p => p.id === plSelectedProject);
  const fabric = plSelectedFabric || {};
  const f = FIBERS[fabric.fiber];
  const data = loadUserData();
  const person = data.profiles.find(p => p.id === plSelectedPerson) || data.profiles[0];
  const ownedTools = data.profile.ownedTools || {};
  const personSkill = person?.skill || data.profile.skill || 'intermediate';
  const personSensitivities = person?.sensitivities || [];

  const est = estimateYardage(plSelectedProject, plSetupState.width, plSetupState.size, plSetupState.directional, !plSetupState.preShrunk);
  const yardLabel = est ? est.total.toFixed(2) + ' yd' : '? yd';

  const construction = project?.construction || [];
  const needsProcurement = !fabric.id;
  const fiberName = f?.name || 'Fabric';
  const varietyObj = f?.varieties?.find(v => v.name === fabric.variety);
  const varietyWeight = varietyObj?.weight || '';

  // Machine settings
  const machineSettings = plGetMachineSettings(fabric.fiber, varietyObj);
  const needleRec = plGetNeedleRec(fabric.fiber, varietyObj);
  const threadRec = plGetThreadRec(fabric.fiber);

  // Tier 12: Rich Tools data
  const isKnit = varietyObj?.isKnit || false;
  const cuttingRec = plGetCuttingRec(fabric.fiber, varietyObj, isKnit);
  const pressingGuide = PL_PRESSING_GUIDE[fabric.fiber];
  const hasMachine = (ownedTools.machines || []).length > 0;
  const machineKey = (ownedTools.machines || [])[0] || 'sewing';
  const troubleTips = hasMachine ? plGetMachineTroubleTips(machineKey) : [];

  // Supplies from project data
  const supplies = (project?.supplies || []).map(s => ({
    ...s,
    displayName: s.item === 'Fabric' ? `${fiberName}${varietyObj ? ' (' + varietyObj.name + ')' : ''}, ${yardLabel} (${plSetupState.width || 45}″ width)` : (s.item + (s.qty ? ', ' + s.qty : ''))
  }));

  // If no supplies in project data, generate basic ones
  if (supplies.length === 0) {
    supplies.push(
      { displayName: `${fiberName}${varietyObj ? ' (' + varietyObj.name + ')' : ''}, ${yardLabel} (${plSetupState.width || 45}″ width)`, essential: true },
      { displayName: `Matching thread${threadRec ? ' (' + threadRec.weight + ')' : ''}`, essential: true },
      { displayName: `Needles${needleRec ? ' (' + needleRec.name + ' ' + needleRec.sizes + ')' : ''}`, essential: true },
      { displayName: 'Fabric shears or rotary cutter', essential: false },
      { displayName: 'Fabric marking pen', essential: false },
      { displayName: 'Pins or clips', essential: false }
    );
  }

  // Build total time estimate from construction steps
  const buildStepCount = construction.length || 3;
  const prepMinutes = 40;
  const buildMinutes = buildStepCount * 20;
  const finishMinutes = 25;
  const totalMinutes = prepMinutes + buildMinutes + finishMinutes;
  const timeLabel = totalMinutes >= 60 ? Math.floor(totalMinutes/60) + 'h ' + (totalMinutes%60) + 'min' : totalMinutes + ' min';

  // Three main phases: Prepare, Build, Finish
  // (Procure is optionally prepended if no stash bolt)
  const phaseNames = [];
  if (needsProcurement) phaseNames.push('Procure');
  phaseNames.push('Prepare', 'Build', 'Finish');

  // ── PAIRING HEADER ──
  document.getElementById('plBuildContext').innerHTML = `
    <div class="card" style="display:flex;align-items:center;gap:18px;margin-bottom:16px;">
      <div style="width:42px;height:42px;border-radius:10px;background:${f?.accent || '#ccc'}18;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <span style="font-size:1.1rem;">🌿</span>
      </div>
      <div style="flex:1;">
        <div style="font-size:0.95rem;font-weight:600;">${project?.name || '?'} in ${fiberName}${varietyObj ? ' ' + varietyObj.name : ''}</div>
        <div style="font-size:0.75rem;color:var(--ink-light);">For ${person?.name} · ${(plSetupState.size || 'm').toUpperCase()} · ${plSetupState.width || '?'}″ wide · ${yardLabel}${fabric.yardage ? ' · From stash' : ''}</div>
      </div>
      <div class="pl-build-time-est">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        ~${timeLabel}
      </div>
    </div>`;

  // Sensitivity warning for Build panel
  const fiberNameLower = fiberName.toLowerCase();
  const buildSensIssue = personSensitivities.some(s => fiberNameLower.includes(s.toLowerCase()) || s.toLowerCase().includes(fiberNameLower));
  if (buildSensIssue) {
    document.getElementById('plBuildContext').innerHTML += `
      <div class="pl-ctx-alert-banner">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M8 1L1 14h14L8 1z"/><path d="M8 6v4"/><circle cx="8" cy="12" r=".5" fill="currentColor"/></svg>
        <span><strong>Sensitivity note:</strong> ${person?.name || 'This person'} has a sensitivity to fibers similar to ${fiberName}. Consider a hypoallergenic alternative or pre-wash thoroughly.</span>
      </div>`;
  }

  // ── PROJECT NOTES ──
  document.getElementById('plBuildContext').innerHTML += `
    <div class="pl-project-notes-wrap">
      <label class="pl-project-notes-label" for="plProjectNotesInput">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        Project notes
      </label>
      <textarea class="pl-project-notes-input" id="plProjectNotesInput" rows="2" placeholder="Overall notes, adjustments, reminders for this project…">${plProjectNotes}</textarea>
    </div>`;

  document.getElementById('plProjectNotesInput').addEventListener('input', (e) => {
    plProjectNotes = e.target.value;
    plSaveCurrentState();
  });

  // ── PHASE TABS ──
  document.getElementById('plBuildPhases').innerHTML = phaseNames.map((ph, i) =>
    `<button class="pl-build-phase-btn${i === (needsProcurement ? 0 : 0) ? ' active' : ''}" data-phase="${i}">
      <span class="pl-phase-name">${ph}</span>
      <span class="pl-phase-badge" data-phase-badge="${i}"></span>
    </button>`
  ).join('');

  // ── BUILD PHASE CONTENT ──
  let phasesHtml = '';
  let globalStepNum = 0;
  let substepNum = 0;
  let phaseIdx = 0;

  // ═══ PROCURE PHASE (optional) ═══
  if (needsProcurement) {
    globalStepNum++;
    const sn = globalStepNum;
    const isDone = plBuildCompletedSteps.has(sn);
    phasesHtml += `<div class="pl-build-phase${phaseIdx === 0 ? ' active' : ''}" data-phase-idx="${phaseIdx}">
      <div class="pl-build-step pl-procure-step${isDone ? ' completed' : ''}" data-step-num="${sn}">
        <div class="pl-build-step-header">
          <div class="pl-build-step-num">${sn}</div>
          <div class="pl-build-step-title">Get Your Fabric & Supplies</div>
          <div class="pl-build-step-time">Shopping trip</div>
          <div class="pl-build-step-check" data-check="${sn}">✓</div>
        </div>
        <div class="pl-build-step-body">
          <div class="pl-build-tip"><strong>Tip:</strong> Look for ${fiberName} at ${(plSetupState.width || 45)}″ wide or wider.${est ? ' Buy at least ' + est.total.toFixed(2) + ' yd to account for shrinkage and pattern matching.' : ''}</div>
          ${supplies.map(s => {
            substepNum++;
            const ssn = substepNum;
            const ssDone = plBuildCompletedSubsteps.has(ssn);
            return `<div class="pl-build-substep${ssDone ? ' done' : ''}">
              <div class="pl-build-substep-check${ssDone ? ' done' : ''}" data-substep="${ssn}">✓</div>
              <span>${s.displayName || s.item}</span>
              ${s.essential ? '<span class="pl-supply-essential">required</span>' : ''}
            </div>`;
          }).join('')}
          <div class="pl-procure-form-wrap" style="margin-top:16px;">
            <button class="pl-btn-secondary pl-procure-toggle" style="width:100%;font-size:0.85rem;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              Got it — Log Purchased Fabric
            </button>
            <div class="pl-procure-form" style="display:none;"></div>
          </div>
        </div>
      </div>
    </div>`;
    phaseIdx++;
  }

  // ═══ PREPARE PHASE ═══
  const prepPhaseIdx = phaseIdx;
  const prepStepStart = globalStepNum + 1;
  // We render prep as a special layout (grid cards) not just step cards
  phasesHtml += `<div class="pl-build-phase${prepPhaseIdx === 0 ? ' active' : ''}" data-phase-idx="${prepPhaseIdx}">
    <div class="pl-prep-grid">
      <!-- Supplies checklist card -->
      <div class="pl-prep-card">
        <h4>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
          Supplies checklist
        </h4>
        ${supplies.map((s, si) => {
          substepNum++;
          const ssn = substepNum;
          const ssDone = plBuildCompletedSubsteps.has(ssn);
          // Determine guide link based on supply type
          let guideLink = '';
          const sName = (s.displayName || s.item || '').toLowerCase();
          if (sName.includes('needle')) guideLink = '<button class="pl-supply-link" data-guide="needle">Needle guide →</button>';
          else if (sName.includes('interfacing')) guideLink = '<button class="pl-supply-link" data-guide="interfacing">Interfacing guide →</button>';
          else if (sName.includes('shear') || sName.includes('rotary') || sName.includes('cutter')) guideLink = '<button class="pl-supply-link" data-guide="cutting">Cutting tools →</button>';
          else if (sName.includes('marking')) guideLink = '<button class="pl-supply-link" data-guide="marking">Marking tools →</button>';
          // Tool ownership badge
          const isOwned = plCheckOwnedSupply(s.displayName || s.item || '', ownedTools);
          const ownedBadge = isOwned ? '<span class="pl-ctx-badge ctx-owned">Have it</span>' : (s.essential ? '' : '<span class="pl-ctx-badge ctx-need">Need</span>');
          return `<div class="pl-supply-item">
            <div class="pl-supply-check${ssDone ? ' checked' : ''}" data-substep="${ssn}">✓</div>
            <span class="pl-supply-name${ssDone ? ' checked-text' : ''}">${s.displayName || s.item}</span>
            ${s.essential ? '<span class="pl-supply-essential">required</span>' : ''}
            ${ownedBadge}
            ${guideLink}
          </div>`;
        }).join('')}
      </div>

      <!-- Machine settings card -->
      <div class="pl-prep-card">
        <h4>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          Machine setup for ${fiberName}${varietyObj ? ' ' + varietyObj.name : ''}
        </h4>
        ${machineSettings ? `
          <div class="pl-settings-row"><span class="pl-settings-label">Needle</span><span class="pl-settings-value">${needleRec ? needleRec.name + ' ' + needleRec.sizes : f?.needle?.type + ' ' + f?.needle?.sizeRange || '—'}</span></div>
          <div class="pl-settings-row"><span class="pl-settings-label">Thread</span><span class="pl-settings-value">${threadRec ? threadRec.weight : f?.thread?.weight + ' ' + f?.thread?.material || '—'}</span></div>
          <div class="pl-settings-row"><span class="pl-settings-label">Stitch length</span><span class="pl-settings-value">${machineSettings.stitch}</span></div>
          <div class="pl-settings-row"><span class="pl-settings-label">Tension</span><span class="pl-settings-value">${machineSettings.tension}</span></div>
          <div class="pl-settings-row"><span class="pl-settings-label">Presser foot</span><span class="pl-settings-value">${machineSettings.foot}</span></div>
          <div class="pl-settings-row"><span class="pl-settings-label">Speed</span><span class="pl-settings-value">${machineSettings.speed}</span></div>
        ` : `
          <div style="font-size:0.82rem;color:var(--ink-light);padding:8px 0;">Machine settings not available for this fiber. Check the Needle & Thread tool for guidance.</div>
        `}
        <div style="margin-top:10px">
          <button class="pl-supply-link" data-guide="needle">Full machine settings →</button>
          <button class="pl-supply-link" data-guide="needle" style="margin-left:8px">Threading guide →</button>
        </div>
        ${troubleTips.length > 0 ? `
          <div class="pl-tool-quickref">
            <div class="pl-tool-quickref-header" data-toggle-quickref>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><circle cx="8" cy="8" r="7"/><path d="M6 6a2 2 0 114 0c0 1-1.5 1.5-1.5 2.5"/><circle cx="8.5" cy="12" r=".5" fill="currentColor"/></svg>
              Quick troubleshooting
              <svg class="pl-qr-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="10" height="10"><path d="M6 4l4 4-4 4"/></svg>
            </div>
            <div class="pl-tool-quickref-body" style="display:none;">
              ${troubleTips.map(t => `
                <div class="pl-tool-quickref-item">
                  <div class="pl-tool-quickref-symptom">${t.symptom}</div>
                  <div class="pl-tool-quickref-fix">${t.topFix}</div>
                </div>
              `).join('')}
              <button class="pl-supply-link" data-guide="tools" style="margin-top:6px;">Full troubleshooting guide →</button>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Fabric preparation card (full width) -->
      <div class="pl-prep-card full-width">
        <h4>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>
          Fabric preparation — ${fiberName} specific
        </h4>
        <div class="pl-prep-substep">
          <span class="pl-prep-substep-num">1.</span>
          <span class="pl-prep-substep-text"><strong>Pre-wash</strong> ${f?.care?.preTreatment || 'to account for shrinkage'}. ${fiberName} shrinks ${f?.care?.shrinkagePercent || '3–5%'} on the first wash. Do this before you cut anything.</span>
        </div>
        <div class="pl-prep-substep">
          <span class="pl-prep-substep-num">2.</span>
          <span class="pl-prep-substep-text"><strong>Press</strong> ${f?.care?.ironing || 'on appropriate heat'}. ${f?.care?.specialNotes ? f.care.specialNotes.split('.')[0] + '.' : ''} <button class="pl-supply-link" data-guide="pressing">Pressing guide for ${fiberName.toLowerCase()} →</button></span>
        </div>
        <div class="pl-prep-substep">
          <span class="pl-prep-substep-num">3.</span>
          <span class="pl-prep-substep-text"><strong>Find the grain.</strong> Clip the selvage and pull a crosswise thread, or tear to straighten. Fold with selvages aligned and check for twisting. <button class="pl-supply-link" data-guide="reference">Grain finding technique →</button></span>
        </div>
        <div class="pl-prep-substep">
          <span class="pl-prep-substep-num">4.</span>
          <span class="pl-prep-substep-text"><strong>Test stitch</strong> on a double-layer scrap. Check for puckering${machineSettings ? ' (reduce tension to ' + machineSettings.tension.split('–')[0] + ' if needed)' : ''}. Confirm stitch length looks clean on both sides.</span>
        </div>
      </div>

      <!-- Yardage tip -->
      ${est ? `<div class="pl-prep-tip">
        <strong>Yardage check:</strong> Your ${yardLabel} of ${plSetupState.width || 45}″ ${fiberName.toLowerCase()}${varietyObj ? ' ' + varietyObj.name.toLowerCase() : ''} is the ${est.shrinkageBuffer > 0 ? 'comfortable estimate' : 'base requirement'} for a size ${(plSetupState.size || 'm').toUpperCase()} ${project?.name || 'project'}.${plSetupState.directional ? ' Directional layout adds ' + (est.directionalExtra || 0).toFixed(2) + ' yd.' : ''} <button class="pl-supply-link" data-guide="yardage">Open Yardage Estimator →</button>
      </div>` : ''}

      <!-- Cutting recommendation (Tier 12) -->
      <div class="pl-prep-card">
        <h4>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.59 15.41L20 4"/><path d="M15.41 15.41L4 4"/></svg>
          Recommended cutting method
        </h4>
        <div class="pl-tool-rec">
          <div class="pl-tool-rec-name">${cuttingRec.tool}</div>
          <div class="pl-tool-rec-why">${cuttingRec.why}</div>
          <div class="pl-tool-rec-alt">${cuttingRec.alt}</div>
        </div>
        <button class="pl-supply-link" data-guide="cutting" style="margin-top:8px;">Full cutting tools guide →</button>
      </div>

      <!-- Pressing reference (Tier 12) -->
      ${pressingGuide ? `
      <div class="pl-prep-card">
        <h4>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c1-3 6-5 6-10a6 6 0 10-12 0c0 5 5 7 6 10z"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></svg>
          Pressing settings for ${fiberName}
        </h4>
        <div class="pl-settings-row"><span class="pl-settings-label">Heat</span><span class="pl-settings-value">${pressingGuide.heat}</span></div>
        <div class="pl-settings-row"><span class="pl-settings-label">Steam</span><span class="pl-settings-value">${pressingGuide.steam}</span></div>
        <div class="pl-settings-row"><span class="pl-settings-label">Press cloth</span><span class="pl-settings-value">${pressingGuide.cloth ? 'Required — use muslin or cotton between iron and fabric' : 'Not required'}</span></div>
        <div class="pl-tool-rec-alt" style="margin-top:6px;">${pressingGuide.note}</div>
        <button class="pl-supply-link" data-guide="pressing" style="margin-top:8px;">Full pressing guide →</button>
      </div>
      ` : ''}
    </div>
  </div>`;
  phaseIdx++;

  // ═══ BUILD PHASE ═══
  const buildPhaseIdx = phaseIdx;
  let buildStepsHtml = '';

  if (construction.length > 0) {
    construction.forEach((c, ci) => {
      globalStepNum++;
      const sn = globalStepNum;
      const isDone = plBuildCompletedSteps.has(sn);
      const stepTitle = typeof c === 'string' ? c : c.step || c.name || `Step ${sn}`;
      const stepDetail = typeof c === 'object' ? c.detail || '' : '';
      const isFirst = ci === 0;
      const isActive = !isDone && isFirst; // First undone step is active
      const mistake = plGetStepMistake(project, ci);
      const links = plBuildResourceLinks(c, fabric.fiber, ci);
      const skillTip = plGetSkillTip(stepTitle, personSkill);
      const toolTip = plGetStepToolTip(stepTitle, fabric.fiber);
      const pressingTool = plGetPressingTool(stepTitle);

      // Generate lettered substeps from detail text
      const substepLetters = 'abcdefghij';
      const detailSentences = stepDetail.split(/(?<=\.)\s+/).filter(s => s.length > 10);

      buildStepsHtml += `
        <div class="pl-build-step${isDone ? ' completed' : ''}${isActive ? ' active-step expanded' : ''}" data-step-num="${sn}">
          <div class="pl-build-step-header">
            <div class="pl-build-step-num">${isDone ? '✓' : sn}</div>
            <div class="pl-build-step-info" style="flex:1;">
              <div class="pl-build-step-title">${stepTitle}</div>
              ${stepDetail ? `<div style="font-size:0.76rem;color:var(--ink-light);margin-top:1px;">${stepDetail.split('.')[0]}.</div>` : ''}
              ${isDone && plBuildStepNotes[sn] ? `<div class="pl-step-note-preview">📝 ${plBuildStepNotes[sn].length > 60 ? plBuildStepNotes[sn].substring(0, 60) + '…' : plBuildStepNotes[sn]}</div>` : ''}
            </div>
            <div class="pl-build-step-time">~${15 + ci * 5} min</div>
            <svg class="pl-step-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg>
          </div>
          <div class="pl-build-step-body" style="padding-left:52px;">
            ${stepDetail ? `<div class="pl-step-detail">${stepDetail}</div>` : ''}
            ${detailSentences.length > 1 ? `<div style="margin-bottom:10px;">
              ${detailSentences.slice(0, 3).map((sent, si) => `
                <div class="pl-lettered-substep">
                  <span class="pl-lettered-substep-num">${sn}${substepLetters[si]}.</span>
                  <span class="pl-lettered-substep-text">${sent.trim()}</span>
                </div>
              `).join('')}
            </div>` : ''}
            ${links.length > 0 ? `<div class="pl-step-links">
              ${links.map(l => `<button class="pl-step-link ${l.type}" data-guide="${l.type}">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 2h10v12H3z"/><path d="M6 5h4"/><path d="M6 8h4"/></svg>
                ${l.label}
              </button>`).join('')}
            </div>` : ''}
            ${skillTip ? `<div class="pl-ctx-tip"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><circle cx="8" cy="8" r="7"/><path d="M8 5v3"/><circle cx="8" cy="11" r=".5" fill="currentColor"/></svg> ${skillTip}</div>` : ''}
            ${toolTip ? `<div class="pl-tool-inline">
              <span class="pl-tool-inline-icon">${toolTip.icon}</span>
              <span class="pl-tool-inline-label">${toolTip.label}:</span>
              <span class="pl-tool-inline-text">${toolTip.text}</span>
            </div>` : ''}
            ${pressingTool ? `<div class="pl-tool-inline pl-tool-inline-press">
              <span class="pl-tool-inline-icon">🥚</span>
              <span class="pl-tool-inline-label">${pressingTool.tool}:</span>
              <span class="pl-tool-inline-text">${pressingTool.tip}</span>
            </div>` : ''}
            ${mistake ? `<div class="pl-step-warning">
              <span style="flex-shrink:0;font-size:0.9rem;">⚠</span>
              <span><strong>Common mistake:</strong> ${mistake.mistake}. ${mistake.why}</span>
            </div>` : ''}
            <div class="pl-step-note">
              <div class="pl-step-note-toggle" data-note-toggle="${sn}">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><path d="M2 4h12"/><path d="M2 8h8"/><path d="M2 12h10"/></svg>
                ${plBuildStepNotes[sn] ? 'Edit note' : 'Add a note'}
                ${plBuildStepNotes[sn] ? '<span class="pl-step-note-dot"></span>' : ''}
              </div>
              <div class="pl-step-note-body" style="display:${plBuildStepNotes[sn] ? '' : 'none'};">
                <textarea class="pl-step-note-input" data-note-input="${sn}" rows="2" placeholder="Jot down adjustments, fit notes, things to remember...">${plBuildStepNotes[sn] || ''}</textarea>
              </div>
            </div>
            <div class="pl-step-actions">
              <button class="pl-step-action-btn primary" data-mark-done="${sn}">Mark as done</button>
              <button class="pl-step-action-btn secondary" data-stuck="${sn}">I'm stuck · Fix It</button>
            </div>
          </div>
        </div>`;
    });
  } else {
    // Fallback: generic build steps
    const genericSteps = [
      { title: 'Assemble main pieces', time: '20 min' },
      { title: 'Sew seams and construction', time: '25 min' },
      { title: 'Finish edges and details', time: '15 min' }
    ];
    genericSteps.forEach((gs, gi) => {
      globalStepNum++;
      const sn = globalStepNum;
      const isDone = plBuildCompletedSteps.has(sn);
      buildStepsHtml += `
        <div class="pl-build-step${isDone ? ' completed' : ''}" data-step-num="${sn}">
          <div class="pl-build-step-header">
            <div class="pl-build-step-num">${isDone ? '✓' : sn}</div>
            <div class="pl-build-step-title">${gs.title}</div>
            <div class="pl-build-step-time">~${gs.time}</div>
            <svg class="pl-step-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg>
          </div>
          <div class="pl-build-step-body">
            <div class="pl-step-note">
              <div class="pl-step-note-toggle" data-note-toggle="${sn}">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><path d="M2 4h12"/><path d="M2 8h8"/><path d="M2 12h10"/></svg>
                ${plBuildStepNotes[sn] ? 'Edit note' : 'Add a note'}
                ${plBuildStepNotes[sn] ? '<span class="pl-step-note-dot"></span>' : ''}
              </div>
              <div class="pl-step-note-body" style="display:${plBuildStepNotes[sn] ? '' : 'none'};">
                <textarea class="pl-step-note-input" data-note-input="${sn}" rows="2" placeholder="Jot down adjustments, fit notes, things to remember...">${plBuildStepNotes[sn] || ''}</textarea>
              </div>
            </div>
            <div class="pl-step-actions">
              <button class="pl-step-action-btn primary" data-mark-done="${sn}">Mark as done</button>
              <button class="pl-step-action-btn secondary" data-stuck="${sn}">I'm stuck · Fix It</button>
            </div>
          </div>
        </div>`;
    });
  }

  phasesHtml += `<div class="pl-build-phase${buildPhaseIdx === 0 ? ' active' : ''}" data-phase-idx="${buildPhaseIdx}">
    ${buildStepsHtml}
  </div>`;
  phaseIdx++;

  // ═══ FINISH PHASE ═══
  const finishPhaseIdx = phaseIdx;
  const care = f?.care || {};
  const variations = project?.variations || [];
  const relatedIds = project?.relatedProjects || [];
  const relatedProjects = relatedIds.map(id => PROJECT_CATALOG.find(p => p.id === id)).filter(Boolean);
  // Find alternative fibers via scoring engine
  const altFibers = scoreFibersForProject(project?.id).filter(r => r.passed && r.fiberKey !== fabric.fiber).slice(0, 2).map(r => r.fiberKey);

  phasesHtml += `<div class="pl-build-phase${finishPhaseIdx === 0 ? ' active' : ''}" data-phase-idx="${finishPhaseIdx}">
    <div class="pl-finish-grid">
      <!-- Care instructions -->
      <div class="pl-finish-card">
        <h4>Care instructions for your finished ${project?.name || 'project'}</h4>
        <div class="pl-finish-item">
          <div class="pl-finish-item-title">Washing</div>
          <div class="pl-finish-item-detail">${care.washTemp || 'Follow fabric care label'}. Turn inside out to protect finish.</div>
        </div>
        <div class="pl-finish-item">
          <div class="pl-finish-item-title">Drying</div>
          <div class="pl-finish-item-detail">${care.drying || 'Air dry or tumble dry low'}. Remove promptly to minimize wrinkles.</div>
        </div>
        <div class="pl-finish-item">
          <div class="pl-finish-item-title">Ironing</div>
          <div class="pl-finish-item-detail">${care.ironing || 'Press as needed'}.${pressingGuide ? ` Use ${pressingGuide.heat} heat with ${pressingGuide.steam.toLowerCase()}.${pressingGuide.cloth ? ' Always use a press cloth.' : ''}` : ''}</div>
        </div>
        <div class="pl-finish-item">
          <div class="pl-finish-item-title">Storage</div>
          <div class="pl-finish-item-detail">${care.storage || 'Store in a cool, dry place'}.</div>
        </div>
        <div style="margin-top:10px">
          <button class="pl-supply-link" data-guide="reference">Full ${fiberName.toLowerCase()} care guide in Reference →</button>
        </div>
      </div>

      <!-- Variations -->
      <div class="pl-finish-card">
        <h4>Variations and next steps</h4>
        ${variations.length > 0 ? `<div style="margin-bottom:14px;">
          ${variations.map(v => `<span class="pl-variation-chip">${v}</span>`).join('')}
        </div>` : '<div style="font-size:0.82rem;color:var(--ink-light);margin-bottom:14px;">Explore different details and modifications to make this project your own.</div>'}
        ${altFibers.length > 0 ? `
          <h4 style="margin-top:16px;">Try in a different fabric</h4>
          <div style="font-size:0.82rem;color:var(--ink-light);margin-bottom:8px;">
            You built this in ${fiberName}. Here's how it would differ:
          </div>
          ${altFibers.map(af => {
            const altF = FIBERS[af];
            if (!altF) return '';
            const altNeedle = NEEDLE_DATA[af]?.needleTypes?.[0];
            return `<div class="pl-finish-item">
              <div class="pl-finish-item-title" style="color:${altF.accent || 'var(--ink)'};">${altF.name}</div>
              <div class="pl-finish-item-detail">${altF.properties?.drape?.interp || 'Different drape and hand'}. ${altNeedle ? 'Use ' + altNeedle.name + ' ' + altNeedle.sizes + ' needle.' : ''} ${altF.care?.preTreatment || ''}</div>
            </div>`;
          }).join('')}
        ` : ''}
      </div>

      <!-- Related projects -->
      ${relatedProjects.length > 0 ? `
      <div class="pl-finish-card full-width">
        <h4>Build something similar next</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;">
          ${relatedProjects.map(rp => {
            const skillColor = rp.skill === 'beginner' ? 'rgba(91,140,107,0.12);color:var(--green)' :
              rp.skill === 'intermediate' ? 'rgba(184,134,11,0.12);color:var(--amber)' :
              'rgba(160,82,45,0.12);color:var(--brown, #A0522D)';
            return `<div class="pl-related-project" data-project-id="${rp.id}">
              <span class="pl-related-skill" style="background:${skillColor}">${rp.skill}</span>
              <span>${rp.name}</span>
            </div>`;
          }).join('')}
        </div>
      </div>` : ''}
    </div>
  </div>`;

  document.getElementById('plBuildSteps').innerHTML = phasesHtml;

  // ── EVENT LISTENERS ──

  // Phase tab listeners
  document.querySelectorAll('#plBuildPhases .pl-build-phase-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#plBuildPhases .pl-build-phase-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const idx = parseInt(btn.dataset.phase);
      document.querySelectorAll('#plBuildSteps .pl-build-phase').forEach((p, i) => p.classList.toggle('active', i === idx));
    });
  });

  // Troubleshooting quick-ref toggle (Tier 12)
  document.querySelectorAll('[data-toggle-quickref]').forEach(hdr => {
    hdr.addEventListener('click', () => {
      const body = hdr.nextElementSibling;
      const chevron = hdr.querySelector('.pl-qr-chevron');
      if (body) {
        const isOpen = body.style.display !== 'none';
        body.style.display = isOpen ? 'none' : '';
        if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(90deg)';
      }
    });
  });

  // Step header toggle expand
  document.querySelectorAll('#plBuildSteps .pl-build-step-header').forEach(h => {
    h.addEventListener('click', (e) => {
      if (e.target.closest('.pl-build-step-check') || e.target.closest('.pl-step-action-btn')) return;
      h.closest('.pl-build-step').classList.toggle('expanded');
    });
  });

  // "Mark as done" buttons in step actions
  document.querySelectorAll('[data-mark-done]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const num = parseInt(btn.dataset.markDone);
      const step = document.querySelector(`[data-step-num="${num}"]`);
      if (!step) return;
      step.classList.add('completed');
      step.classList.remove('active-step', 'expanded');
      plBuildCompletedSteps.add(num);
      // Update step number to checkmark
      const numEl = step.querySelector('.pl-build-step-num');
      if (numEl) numEl.textContent = '✓';
      // Activate next step
      const nextStep = step.nextElementSibling;
      if (nextStep && nextStep.classList.contains('pl-build-step') && !nextStep.classList.contains('completed')) {
        nextStep.classList.add('active-step', 'expanded');
        const nextNum = nextStep.querySelector('.pl-build-step-num');
        if (nextNum && nextNum.textContent !== '✓') {
          // Already has the right number
        }
      }
      plUpdateBuildProgress();
      plSaveCurrentState();
    });
  });

  // Step note toggles — show/hide note textarea
  document.querySelectorAll('[data-note-toggle]').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const body = toggle.nextElementSibling;
      if (body) {
        const isOpen = body.style.display !== 'none';
        body.style.display = isOpen ? 'none' : '';
        if (!isOpen) body.querySelector('textarea')?.focus();
      }
    });
  });

  // Step note auto-save on blur
  document.querySelectorAll('[data-note-input]').forEach(ta => {
    ta.addEventListener('blur', () => {
      const sn = parseInt(ta.dataset.noteInput);
      const val = ta.value.trim();
      if (val) plBuildStepNotes[sn] = val;
      else delete plBuildStepNotes[sn];
      // Update toggle label
      const toggle = document.querySelector(`[data-note-toggle="${sn}"]`);
      if (toggle) {
        const hasNote = !!val;
        const dot = toggle.querySelector('.pl-step-note-dot');
        if (hasNote && !dot) toggle.insertAdjacentHTML('beforeend', '<span class="pl-step-note-dot"></span>');
        else if (!hasNote && dot) dot.remove();
        toggle.childNodes.forEach(n => { if (n.nodeType === 3 && n.textContent.trim()) n.textContent = hasNote ? 'Edit note' : 'Add a note'; });
      }
      plSaveCurrentState();
    });
  });

  // "I'm stuck" buttons — navigate to Fix It mode
  document.querySelectorAll('[data-stuck]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Navigate to Tools → Fix It mode
      Router.navigate('#tools');
    });
  });

  // Supply check toggles (in Prepare phase)
  document.querySelectorAll('.pl-supply-check').forEach(chk => {
    chk.addEventListener('click', (e) => {
      e.stopPropagation();
      const num = parseInt(chk.dataset.substep);
      chk.classList.toggle('checked');
      const nameEl = chk.nextElementSibling;
      if (nameEl) nameEl.classList.toggle('checked-text');
      if (chk.classList.contains('checked')) plBuildCompletedSubsteps.add(num);
      else plBuildCompletedSubsteps.delete(num);
      plSaveCurrentState();
    });
  });

  // Legacy substep check toggles (Procure phase)
  document.querySelectorAll('#plBuildSteps .pl-build-substep-check').forEach(chk => {
    chk.addEventListener('click', (e) => {
      e.stopPropagation();
      const num = parseInt(chk.dataset.substep);
      chk.classList.toggle('done');
      chk.closest('.pl-build-substep').classList.toggle('done');
      if (chk.classList.contains('done')) plBuildCompletedSubsteps.add(num);
      else plBuildCompletedSubsteps.delete(num);
      plSaveCurrentState();
    });
  });

  // Legacy step check (Procure phase)
  document.querySelectorAll('#plBuildSteps .pl-build-step-check').forEach(chk => {
    chk.addEventListener('click', (e) => {
      e.stopPropagation();
      const step = chk.closest('.pl-build-step');
      const num = parseInt(chk.dataset.check);
      step.classList.toggle('completed');
      if (step.classList.contains('completed')) plBuildCompletedSteps.add(num);
      else plBuildCompletedSteps.delete(num);
      plUpdateBuildProgress();
      plSaveCurrentState();
    });
  });

  // Guide link navigation (supply links and step links)
  document.querySelectorAll('[data-guide]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const guide = btn.dataset.guide;
      if (guide === 'needle' || guide === 'planner') {
        // Switch to Needle & Thread mode in Planner
        const needleBtn = document.querySelector('[data-mode="needle"]');
        if (needleBtn) needleBtn.click();
      } else if (guide === 'interfacing') {
        const ifBtn = document.querySelector('[data-mode="interfacing"]');
        if (ifBtn) ifBtn.click();
      } else if (guide === 'yardage') {
        const yBtn = document.querySelector('[data-mode="yardage"]');
        if (yBtn) yBtn.click();
      } else if (guide === 'reference') {
        Router.navigate('#reference');
      } else if (guide === 'tools' || guide === 'cutting' || guide === 'marking' || guide === 'pressing') {
        Router.navigate('#tools');
      }
    });
  });

  // Related project click — start new pipeline with that project
  document.querySelectorAll('.pl-related-project[data-project-id]').forEach(el => {
    el.addEventListener('click', () => {
      const projId = el.dataset.projectId;
      if (projId) {
        plSelectedProject = projId;
        plBuildCompletedSteps.clear();
        plBuildCompletedSubsteps.clear();
        plCompletionFinalized = false;
        plSaveCurrentState();
        plSetCurrentStep(0); // Go back to Match
      }
    });
  });

  // Procurement form toggle & wiring
  document.querySelectorAll('.pl-procure-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.pl-procure-form-wrap');
      const formDiv = wrap.querySelector('.pl-procure-form');
      if (formDiv.style.display === 'none') {
        formDiv.style.display = '';
        btn.style.display = 'none';
        const prefill = { fiber: fabric.fiber || '', variety: fabric.variety || '' };
        formDiv.innerHTML = plBuildStashFormHtml(prefill, 'Log Your Purchase') +
          '<div style="display:flex;gap:8px;margin-top:12px;">' +
            '<button class="pl-btn-primary pl-procure-save" style="flex:1;">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>' +
              ' Add to Stash &amp; Continue' +
            '</button>' +
            '<button class="pl-btn-secondary pl-procure-cancel">Cancel</button>' +
          '</div>';
        plAttachStashFormListeners(formDiv);
        formDiv.querySelector('.pl-procure-cancel').addEventListener('click', () => {
          formDiv.style.display = 'none';
          btn.style.display = '';
        });
        formDiv.querySelector('.pl-procure-save').addEventListener('click', () => {
          const formData = plReadStashFormData(formDiv);
          if (!formData.yardage || formData.yardage <= 0) {
            formDiv.querySelector('#plStashYardage').focus();
            formDiv.querySelector('#plStashYardage').style.outline = '2px solid var(--rose)';
            return;
          }
          const d = loadUserData();
          const newId = addStashEntry(d, formData);
          const newBolt = d.stash.find(s => s.id === newId);
          plSelectedFabric = newBolt;
          plSetupState = {};
          plSaveCurrentState();
          renderPipelineBuild();
        });
      } else {
        formDiv.style.display = 'none';
      }
    });
  });

  plUpdateBuildProgress();
}

function plUpdateBuildProgress() {
  const total = document.querySelectorAll('#plBuildSteps .pl-build-step').length;
  const done = document.querySelectorAll('#plBuildSteps .pl-build-step.completed').length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const fill = document.getElementById('plProgressFill');
  if (fill) fill.style.width = pct + '%';
  const text = document.getElementById('plProgressText');
  if (text) text.textContent = done + ' of ' + total + ' steps';
  const pctEl = document.getElementById('plProgressPercent');
  if (pctEl) pctEl.textContent = pct + '%';

  // Per-phase badges
  document.querySelectorAll('#plBuildSteps .pl-build-phase').forEach((phaseDiv, i) => {
    const phTotal = phaseDiv.querySelectorAll('.pl-build-step').length;
    const phDone = phaseDiv.querySelectorAll('.pl-build-step.completed').length;
    const badge = document.querySelector(`[data-phase-badge="${i}"]`);
    const btn = document.querySelector(`[data-phase="${i}"]`);
    if (badge) {
      if (phDone === phTotal && phTotal > 0) {
        badge.textContent = '✓';
        badge.className = 'pl-phase-badge complete';
        if (btn) btn.classList.add('done');
      } else if (phDone > 0) {
        badge.textContent = phDone + '/' + phTotal;
        badge.className = 'pl-phase-badge partial';
        if (btn) btn.classList.remove('done');
      } else {
        badge.textContent = '';
        badge.className = 'pl-phase-badge';
        if (btn) btn.classList.remove('done');
      }
    }
  });

  // Auto-advance: if active phase is fully complete, pulse next incomplete phase
  const activePhaseBtn = document.querySelector('#plBuildPhases .pl-build-phase-btn.active');
  if (activePhaseBtn) {
    const activeIdx = parseInt(activePhaseBtn.dataset.phase);
    const activePhaseDiv = document.querySelector(`#plBuildSteps [data-phase-idx="${activeIdx}"]`);
    if (activePhaseDiv) {
      const aTotal = activePhaseDiv.querySelectorAll('.pl-build-step').length;
      const aDone = activePhaseDiv.querySelectorAll('.pl-build-step.completed').length;
      if (aDone === aTotal && aTotal > 0) {
        // Find next incomplete phase
        const allBtns = document.querySelectorAll('#plBuildPhases .pl-build-phase-btn');
        for (let j = activeIdx + 1; j < allBtns.length; j++) {
          const nextDiv = document.querySelector(`#plBuildSteps [data-phase-idx="${j}"]`);
          if (nextDiv) {
            const nTotal = nextDiv.querySelectorAll('.pl-build-step').length;
            const nDone = nextDiv.querySelectorAll('.pl-build-step.completed').length;
            if (nDone < nTotal) {
              // Auto-switch to next phase after brief delay
              setTimeout(() => {
                allBtns.forEach(b => b.classList.remove('active'));
                allBtns[j].classList.add('active');
                allBtns[j].classList.add('pl-phase-pulse');
                setTimeout(() => allBtns[j].classList.remove('pl-phase-pulse'), 600);
                document.querySelectorAll('#plBuildSteps .pl-build-phase').forEach((p, k) => p.classList.toggle('active', k === j));
              }, 300);
              break;
            }
          }
        }
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// RENDER: COMPLETE (Panel 4)
// ═══════════════════════════════════════════════════════════════

function renderPipelineComplete() {
  const project = PROJECT_CATALOG.find(p => p.id === plSelectedProject);
  const fabric = plSelectedFabric || {};
  const f = FIBERS[fabric.fiber];
  const data = loadUserData();
  const person = data.profiles.find(p => p.id === plSelectedPerson) || data.profiles[0];
  const est = estimateYardage(plSelectedProject, plSetupState.width, plSetupState.size, plSetupState.directional, !plSetupState.preShrunk);
  const remaining = fabric.yardage && est ? fabric.yardage - est.total : 0;

  document.getElementById('plCompleteContent').innerHTML = `
    <div class="pl-complete-hero">
      <div class="pl-complete-icon">🎉</div>
      <div class="pl-complete-title">Project Complete!</div>
      <div class="pl-complete-subtitle">You made ${project ? 'a ' + project.name : 'a project'} for ${person?.name || 'You'}</div>
    </div>

    <div class="pl-complete-summary">
      <div class="card-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        Build Summary
      </div>
      <div class="pl-complete-row"><span class="pl-complete-label">Project</span><span class="pl-complete-value">${project?.name || '?'}</span></div>
      <div class="pl-complete-row"><span class="pl-complete-label">Fabric</span><span class="pl-complete-value">${f?.name || '?'} · ${fabric.colorName || '?'}</span></div>
      <div class="pl-complete-row"><span class="pl-complete-label">For</span><span class="pl-complete-value">${person?.name || 'You'} · Size ${(plSetupState.size || 'm').toUpperCase()}</span></div>
      <div class="pl-complete-row"><span class="pl-complete-label">Yardage used</span><span class="pl-complete-value">${est ? est.total.toFixed(2) : '?'} yd</span></div>
      ${fabric.yardage ? `<div class="pl-complete-row"><span class="pl-complete-label">Remaining in stash</span><span class="pl-complete-value" style="color:var(--green);">${remaining >= 0 ? remaining.toFixed(2) : '0'} yd ${fabric.colorName} ${f?.name || ''}</span></div>` : ''}
      <div class="pl-complete-row"><span class="pl-complete-label">Skill level</span><span class="pl-complete-value">${(plSetupState.skill || 'beginner').charAt(0).toUpperCase() + (plSetupState.skill || 'beginner').slice(1)}</span></div>
    </div>

    ${Object.keys(plBuildStepNotes).length > 0 ? `
    <div class="pl-complete-summary pl-build-journal">
      <div class="card-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        Build Journal
      </div>
      <div style="font-size:0.78rem;color:var(--ink-light);margin-bottom:10px;">Notes you captured during the build</div>
      ${Object.entries(plBuildStepNotes).sort((a,b) => parseInt(a[0]) - parseInt(b[0])).map(([stepNum, note]) => {
        const stepEl = construction[parseInt(stepNum) - (needsProcurement ? 2 : 1)];
        const stepName = stepEl ? (typeof stepEl === 'string' ? stepEl : stepEl.step || stepEl.name || 'Step ' + stepNum) : 'Step ' + stepNum;
        return `<div class="pl-journal-entry">
          <div class="pl-journal-step">Step ${stepNum} · ${stepName}</div>
          <div class="pl-journal-note">${note}</div>
        </div>`;
      }).join('')}
    </div>` : ''}

    ${plProjectNotes ? `
    <div class="pl-complete-summary">
      <div class="card-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        Project Notes
      </div>
      <div class="pl-journal-note">${plProjectNotes}</div>
    </div>` : ''}

    ${plCompletionFinalized ? '' : `
    <div class="pl-complete-confirm" style="text-align:center;margin:20px 0;">
      <p class="pl-annotation" style="margin-bottom:12px;">Ready to finalize? This will deduct yardage from your stash and log the project.</p>
      <button class="pl-btn-primary" id="plFinalizeBtn" style="font-size:1rem;padding:12px 28px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>
        Confirm &amp; Save
      </button>
    </div>`}

    <div class="pl-complete-actions">
      <button class="pl-btn-secondary" id="plSavePlanBtn" style="flex:1;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        Save Plan
      </button>
      <button class="pl-btn-secondary" id="plPrintCompleteBtn" style="flex:1;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Print
      </button>
    </div>

    <div class="pl-complete-actions">
      <button class="pl-btn-secondary" id="plCompleteBackBtn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        Back to People
      </button>
      <button class="pl-btn-primary" id="plNewProjectBtn">
        Start New Project
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>
    </div>`;

  // Finalize button — only deducts stash and logs history when explicitly clicked, once
  const finalizeBtn = document.getElementById('plFinalizeBtn');
  if (finalizeBtn) {
    finalizeBtn.addEventListener('click', () => {
      plCompletionFinalized = true;
      plSaveCurrentState();
      plFinalizeProject(fabric, est, person);
      finalizeBtn.closest('.pl-complete-confirm').innerHTML = '<div style="text-align:center;padding:12px;color:var(--green);font-weight:600;">Saved</div>';
    });
  }

  // Save Plan button
  document.getElementById('plSavePlanBtn').addEventListener('click', () => {
    const d = loadUserData();
    const planId = 'plan-' + Date.now();
    const newPlan = {
      id: planId,
      projectId: plSelectedProject,
      personId: plSelectedPerson,
      fiber: fabric.fiber,
      variety: fabric.variety || '',
      fabricId: fabric.id || null,
      status: plCompletionFinalized ? 'complete' : 'in-progress',
      yardage: est.total,
      width: plSetupState.width,
      size: plSetupState.size,
      notes: plProjectNotes,
      buildNotes: Object.keys(plBuildStepNotes).length > 0 ? { ...plBuildStepNotes } : null,
      pattern: null,
      createdAt: new Date().toISOString().split('T')[0],
      completedAt: plCompletionFinalized ? new Date().toISOString().split('T')[0] : null
    };
    d.profile.savedPlans = d.profile.savedPlans || [];
    d.profile.savedPlans.unshift(newPlan);
    saveUserData(d);
    const btn = document.getElementById('plSavePlanBtn');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg> Plan Saved!';
    btn.disabled = true;
    btn.style.opacity = '0.6';
  });

  document.getElementById('plPrintCompleteBtn').addEventListener('click', plPrintProject);

  document.getElementById('plCompleteBackBtn').addEventListener('click', () => {
    plReset();
    plGoToTab(0);
  });
  document.getElementById('plNewProjectBtn').addEventListener('click', () => {
    plReset();
    plGoToTab(0);
  });
}

// Separated side-effect function — only called once via explicit confirm
function plFinalizeProject(fabric, est, person) {
  if (!fabric.id || !fabric.yardage) return;
  const updatedData = loadUserData();
  const stashEntry = updatedData.stash.find(s => s.id === fabric.id);
  if (stashEntry) {
    stashEntry.yardage = Math.max(0, stashEntry.yardage - est.total);
    if (stashEntry.yardage <= 0) {
      updatedData.stash = updatedData.stash.filter(s => s.id !== fabric.id);
    }
  }
  // Add to project history
  if (person) {
    const profile = updatedData.profiles.find(p => p.id === person.id);
    if (profile) {
      profile.projectHistory = profile.projectHistory || [];
      profile.projectHistory.push({ projectId: plSelectedProject, fiber: fabric.fiber, date: new Date().toISOString().split('T')[0] });
      const fav = (profile.favorites || []).find(f => f.id === plSelectedProject);
      if (fav) fav.madeCount = (fav.madeCount || 0) + 1;
    }
  }
  saveUserData(updatedData);
}

// ── Print This Project ──
function plPrintProject() {
  const project = PROJECT_CATALOG.find(p => p.id === plSelectedProject);
  const fabric = plSelectedFabric || {};
  const f = FIBERS[fabric.fiber];
  const data = loadUserData();
  const person = data.profiles.find(p => p.id === plSelectedPerson) || data.profiles[0];
  const ownedTools = data.profile.ownedTools || {};
  const est = estimateYardage(plSelectedProject, plSetupState.width, plSetupState.size, plSetupState.directional, !plSetupState.preShrunk);
  const fiberName = f?.name || 'Fabric';
  const varietyObj = f?.varieties?.find(v => v.name === fabric.variety);
  const construction = project?.construction || [];
  const needsProcurement = !fabric.id;
  const machineSettings = plGetMachineSettings(fabric.fiber, varietyObj);
  const needleRec = plGetNeedleRec(fabric.fiber, varietyObj);
  const threadRec = plGetThreadRec(fabric.fiber);
  const pressingGuide = PL_PRESSING_GUIDE[fabric.fiber];
  const isKnit = varietyObj?.isKnit || false;
  const cuttingRec = plGetCuttingRec(fabric.fiber, varietyObj, isKnit);
  const personSkill = person?.skill || data.profile.skill || 'intermediate';
  const personSensitivities = person?.sensitivities || [];
  const care = f?.care || {};
  const yardLabel = est ? est.total.toFixed(2) + ' yd' : '? yd';

  const supplies = (project?.supplies || []).map(s => ({
    ...s,
    displayName: s.item === 'Fabric'
      ? `${fiberName}${varietyObj ? ' (' + varietyObj.name + ')' : ''}, ${yardLabel} (${plSetupState.width || 45}″ width)`
      : (s.item + (s.qty ? ', ' + s.qty : ''))
  }));
  if (supplies.length === 0) {
    supplies.push(
      { displayName: `${fiberName}${varietyObj ? ' (' + varietyObj.name + ')' : ''}, ${yardLabel} (${plSetupState.width || 45}″ width)`, essential: true },
      { displayName: `Matching thread${threadRec ? ' (' + threadRec.weight + ')' : ''}`, essential: true },
      { displayName: `Needles${needleRec ? ' (' + needleRec.name + ' ' + needleRec.sizes + ')' : ''}`, essential: true },
      { displayName: 'Fabric shears or rotary cutter', essential: false },
      { displayName: 'Fabric marking pen', essential: false },
      { displayName: 'Pins or clips', essential: false }
    );
  }

  // Build progress
  const totalSteps = construction.length + (needsProcurement ? 1 : 0);
  const completedCount = plBuildCompletedSteps.size;
  const progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  // Time estimate
  const buildStepCount = construction.length || 3;
  const totalMinutes = 40 + buildStepCount * 20 + 25;
  const timeLabel = totalMinutes >= 60 ? Math.floor(totalMinutes/60) + 'h ' + (totalMinutes%60) + 'min' : totalMinutes + ' min';

  // Sensitivity warning
  const fiberNameLower = fiberName.toLowerCase();
  const hasSensitivity = personSensitivities.some(s => fiberNameLower.includes(s.toLowerCase()) || s.toLowerCase().includes(fiberNameLower));

  // Troubleshooting tips
  const hasMachine = (ownedTools.machines || []).length > 0;
  const machineKey = (ownedTools.machines || [])[0] || 'sewing';
  const troubleTips = hasMachine ? plGetMachineTroubleTips(machineKey) : [];

  // ══════════ HEADER ══════════
  let html = `
    <div class="pl-print-header">
      <h1>${project?.name || 'Sewing Project'}</h1>
      <div class="pl-print-meta">
        For ${person?.name || 'You'} · Size ${(plSetupState.size || 'm').toUpperCase()} · Skill: ${personSkill.charAt(0).toUpperCase() + personSkill.slice(1)} · ~${timeLabel} · ${new Date().toLocaleDateString()}
      </div>
      ${progressPct > 0 ? `<div class="pl-print-progress">Build progress: ${completedCount}/${totalSteps} steps (${progressPct}%)</div>` : ''}
    </div>`;

  // Sensitivity alert
  if (hasSensitivity) {
    html += `<div class="pl-print-warning"><strong>⚠ Sensitivity note:</strong> ${person?.name || 'This person'} has a sensitivity to fibers similar to ${fiberName}. Consider a hypoallergenic alternative or pre-wash thoroughly.</div>`;
  }

  // Project notes
  if (plProjectNotes) {
    html += `<div class="pl-print-section"><h3>Project Notes</h3><p class="pl-print-body">${plProjectNotes}</p></div>`;
  }

  // Overview
  if (project?.overview) {
    html += `<div class="pl-print-section"><h3>About This Project</h3><p class="pl-print-body">${project.overview}</p>${project.whyItWorks ? `<p class="pl-print-body"><em>${project.whyItWorks}</em></p>` : ''}</div>`;
  }

  // Fabric pairing details
  html += `<div class="pl-print-section">
    <h3>Fabric Pairing</h3>
    <table class="pl-print-table">
      <tr><td>Fiber</td><td>${fiberName}${varietyObj ? ' — ' + varietyObj.name : ''}</td></tr>
      ${fabric.colorName ? `<tr><td>Color</td><td>${fabric.colorName}</td></tr>` : ''}
      ${varietyObj?.weight ? `<tr><td>Weight</td><td>${varietyObj.weight}</td></tr>` : ''}
      <tr><td>Width</td><td>${plSetupState.width || '?'}″</td></tr>
      <tr><td>Yardage needed</td><td>${yardLabel}</td></tr>
      ${fabric.yardage ? `<tr><td>From stash</td><td>${fabric.yardage} yd available</td></tr>` : ''}
      ${plSetupState.preShrunk ? '<tr><td>Pre-shrunk</td><td>Yes</td></tr>' : '<tr><td>Pre-shrunk</td><td>No — pre-wash before cutting</td></tr>'}
      ${plSetupState.directional ? '<tr><td>Directional</td><td>Yes — one-way layout needed</td></tr>' : ''}
    </table>
    ${project?.fabricAdvice ? `<p class="pl-print-advice"><strong>Fabric advice:</strong> ${project.fabricAdvice}</p>` : ''}
    ${project?.fabricWarning ? `<p class="pl-print-warning"><strong>⚠ Watch out:</strong> ${project.fabricWarning}</p>` : ''}
  </div>`;

  // ══════════ PHASE 1: PROCURE (optional) ══════════
  if (needsProcurement) {
    html += `<div class="pl-print-phase"><div class="pl-print-phase-title">Phase 1 — Procure</div>
      <div class="pl-print-section">
        <h3>Shopping List</h3>
        <p class="pl-print-body">Look for ${fiberName} at ${plSetupState.width || 45}″ wide or wider.${est ? ' Buy at least ' + est.total.toFixed(2) + ' yd to account for shrinkage and pattern matching.' : ''}</p>
        <ul class="pl-print-supplies">
          ${supplies.map(s => {
            const isOwned = plCheckOwnedSupply(s.displayName || s.item || '', ownedTools);
            return `<li><span class="pl-print-checkbox">☐</span> ${s.displayName || s.item}${s.essential ? ' <em>(required)</em>' : ''}${isOwned ? ' <em>[have it]</em>' : ''}${s.note ? ` <span class="pl-print-supply-note">— ${s.note}</span>` : ''}</li>`;
          }).join('')}
        </ul>
      </div>
    </div>`;
  }

  // ══════════ PHASE 2: PREPARE ══════════
  const prepPhaseNum = needsProcurement ? 2 : 1;
  html += `<div class="pl-print-phase"><div class="pl-print-phase-title">Phase ${prepPhaseNum} — Prepare</div>`;

  // Supplies checklist (if not procure phase — show here instead)
  if (!needsProcurement) {
    html += `<div class="pl-print-section">
      <h3>Supplies Checklist</h3>
      <ul class="pl-print-supplies">
        ${supplies.map(s => {
          const isOwned = plCheckOwnedSupply(s.displayName || s.item || '', ownedTools);
          return `<li><span class="pl-print-checkbox">☐</span> ${s.displayName || s.item}${s.essential ? ' <em>(required)</em>' : ''}${isOwned ? ' <em>[have it]</em>' : ''}${s.note ? ` <span class="pl-print-supply-note">— ${s.note}</span>` : ''}</li>`;
        }).join('')}
      </ul>
    </div>`;
  }

  // Machine settings + pressing guide side by side
  html += `<div class="pl-print-two-col">`;
  if (machineSettings) {
    html += `<div class="pl-print-section">
      <h3>Machine Setup — ${fiberName}${varietyObj ? ' ' + varietyObj.name : ''}</h3>
      <table class="pl-print-table">
        <tr><td>Needle</td><td>${needleRec ? needleRec.name + ' ' + needleRec.sizes : '—'}</td></tr>
        <tr><td>Thread</td><td>${threadRec ? threadRec.weight : '—'}</td></tr>
        <tr><td>Stitch length</td><td>${machineSettings.stitch}</td></tr>
        <tr><td>Tension</td><td>${machineSettings.tension}</td></tr>
        <tr><td>Presser foot</td><td>${machineSettings.foot}</td></tr>
        <tr><td>Speed</td><td>${machineSettings.speed}</td></tr>
      </table>
      ${troubleTips.length > 0 ? `<div class="pl-print-troubleshoot"><strong>Quick troubleshooting:</strong>${troubleTips.map(t => `<div class="pl-print-trouble-item"><em>${t.symptom}</em> — ${t.topFix}</div>`).join('')}</div>` : ''}
    </div>`;
  }
  if (pressingGuide) {
    html += `<div class="pl-print-section">
      <h3>Pressing Guide — ${fiberName}</h3>
      <table class="pl-print-table">
        <tr><td>Heat</td><td>${pressingGuide.heat}</td></tr>
        <tr><td>Steam</td><td>${pressingGuide.steam}</td></tr>
        <tr><td>Press cloth</td><td>${pressingGuide.cloth ? 'Required — use muslin or cotton' : 'Not required'}</td></tr>
      </table>
      <p class="pl-print-tip">${pressingGuide.note}</p>
    </div>`;
  }
  html += `</div>`;

  // Fabric preparation steps
  html += `<div class="pl-print-section">
    <h3>Fabric Preparation — ${fiberName} Specific</h3>
    <ol class="pl-print-prep-steps">
      <li><strong>Pre-wash</strong> ${care.preTreatment || 'to account for shrinkage'}. ${fiberName} shrinks ${care.shrinkagePercent || '3–5%'} on the first wash. Do this before you cut anything.</li>
      <li><strong>Press</strong> ${care.ironing || 'on appropriate heat'}. ${care.specialNotes ? care.specialNotes.split('.')[0] + '.' : ''}</li>
      <li><strong>Find the grain.</strong> Clip the selvage and pull a crosswise thread, or tear to straighten. Fold with selvages aligned and check for twisting.</li>
      <li><strong>Test stitch</strong> on a double-layer scrap. Check for puckering${machineSettings ? ' (reduce tension to ' + machineSettings.tension.split('–')[0] + ' if needed)' : ''}. Confirm stitch length looks clean on both sides.</li>
    </ol>
  </div>`;

  // Cutting recommendation
  if (cuttingRec) {
    html += `<div class="pl-print-section">
      <h3>Recommended Cutting Method</h3>
      <p class="pl-print-body"><strong>${cuttingRec.tool}:</strong> ${cuttingRec.why}</p>
      ${cuttingRec.alt ? `<p class="pl-print-tip">${cuttingRec.alt}</p>` : ''}
    </div>`;
  }

  // Yardage check
  if (est) {
    html += `<div class="pl-print-advice"><strong>Yardage check:</strong> Your ${yardLabel} of ${plSetupState.width || 45}″ ${fiberName.toLowerCase()}${varietyObj ? ' ' + varietyObj.name.toLowerCase() : ''} is the ${est.shrinkageBuffer > 0 ? 'comfortable estimate' : 'base requirement'} for a size ${(plSetupState.size || 'm').toUpperCase()} ${project?.name || 'project'}.${plSetupState.directional ? ' Directional layout adds ' + (est.directionalExtra || 0).toFixed(2) + ' yd.' : ''}</div>`;
  }

  html += `</div>`; // close Prepare phase

  // ══════════ PHASE 3: BUILD ══════════
  const buildPhaseNum = prepPhaseNum + 1;
  html += `<div class="pl-print-phase"><div class="pl-print-phase-title">Phase ${buildPhaseNum} — Build</div>`;

  if (construction.length > 0) {
    html += `<div class="pl-print-section"><h3>Construction Steps</h3><ol class="pl-print-steps">`;
    construction.forEach((step, i) => {
      const stepNum = i + (needsProcurement ? 2 : 1);
      const isDone = plBuildCompletedSteps.has(stepNum);
      const stepText = typeof step === 'string' ? step : step.step || step.name || '';
      const detail = typeof step === 'object' && step.detail ? step.detail : '';
      const mistake = plGetStepMistake(project, i);
      const skillTip = plGetSkillTip(stepText, personSkill);
      const toolTip = plGetStepToolTip(stepText, fabric.fiber);
      const pressingTool = plGetPressingTool(stepText);
      const links = plBuildResourceLinks(step, fabric.fiber, i);
      const stepNote = plBuildStepNotes[stepNum];

      html += `<li class="${isDone ? 'pl-print-step-done' : ''}">
        <div class="pl-print-step-main">${isDone ? '✓ ' : ''}<strong>${stepText}</strong></div>
        ${detail ? `<div class="pl-print-step-detail">${detail}</div>` : ''}
        ${skillTip ? `<div class="pl-print-step-tip">💡 ${skillTip}</div>` : ''}
        ${toolTip ? `<div class="pl-print-step-tip">${toolTip.icon} <strong>${toolTip.label}:</strong> ${toolTip.text}</div>` : ''}
        ${pressingTool ? `<div class="pl-print-step-tip">🥚 <strong>${pressingTool.tool}:</strong> ${pressingTool.tip}</div>` : ''}
        ${mistake ? `<div class="pl-print-step-warn">⚠ <strong>${mistake.mistake}</strong> — ${mistake.why}</div>` : ''}
        ${links.length > 0 ? `<div class="pl-print-step-refs">See: ${links.map(l => l.label).join(' · ')}</div>` : ''}
        ${stepNote ? `<div class="pl-print-step-note-inline">📝 ${stepNote}</div>` : ''}
      </li>`;
    });
    html += `</ol></div>`;
  } else {
    html += `<div class="pl-print-section"><h3>Construction Steps</h3>
      <ol class="pl-print-steps">
        <li>Assemble main pieces</li>
        <li>Sew seams and construction</li>
        <li>Finish edges and details</li>
      </ol>
    </div>`;
  }

  // Common mistakes (full list, not just per-step)
  if (project?.mistakes?.length > 0) {
    html += `<div class="pl-print-section"><h3>Common Mistakes to Avoid</h3>`;
    html += project.mistakes.map(m =>
      `<div class="pl-print-mistake"><strong>⚠ ${m.mistake}</strong><div class="pl-print-mistake-why">${m.why}</div></div>`
    ).join('');
    html += `</div>`;
  }

  // Step journal notes
  const noteEntries = Object.entries(plBuildStepNotes).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  if (noteEntries.length > 0) {
    html += `<div class="pl-print-section"><h3>Build Journal</h3>`;
    noteEntries.forEach(([stepNum, note]) => {
      const stepEl = construction[parseInt(stepNum) - (needsProcurement ? 2 : 1)];
      const stepName = stepEl ? (typeof stepEl === 'string' ? stepEl : stepEl.step || stepEl.name || 'Step ' + stepNum) : 'Step ' + stepNum;
      html += `<div class="pl-print-note"><strong>Step ${stepNum} — ${stepName}:</strong> ${note}</div>`;
    });
    html += `</div>`;
  }

  html += `</div>`; // close Build phase

  // ══════════ PHASE 4: FINISH ══════════
  const finishPhaseNum = buildPhaseNum + 1;
  const variations = project?.variations || [];
  const altFibers = scoreFibersForProject(project?.id).filter(r => r.passed && r.fiberKey !== fabric.fiber).slice(0, 2).map(r => r.fiberKey);

  html += `<div class="pl-print-phase"><div class="pl-print-phase-title">Phase ${finishPhaseNum} — Finish</div>`;

  // Care instructions
  html += `<div class="pl-print-section">
    <h3>Care Instructions for Your Finished ${project?.name || 'Project'}</h3>
    <table class="pl-print-table">
      <tr><td>Washing</td><td>${care.washTemp || 'Follow fabric care label'}. Turn inside out to protect finish.</td></tr>
      <tr><td>Drying</td><td>${care.drying || 'Air dry or tumble dry low'}. Remove promptly to minimize wrinkles.</td></tr>
      <tr><td>Ironing</td><td>${care.ironing || 'Press as needed'}.${pressingGuide ? ' Use ' + pressingGuide.heat + ' heat with ' + pressingGuide.steam.toLowerCase() + '.' + (pressingGuide.cloth ? ' Always use a press cloth.' : '') : ''}</td></tr>
      <tr><td>Storage</td><td>${care.storage || 'Store in a cool, dry place'}.</td></tr>
    </table>
  </div>`;

  // Variations
  if (variations.length > 0) {
    html += `<div class="pl-print-section"><h3>Variations &amp; Ideas</h3><ul class="pl-print-variations">`;
    html += variations.map(v => `<li>${v}</li>`).join('');
    html += `</ul></div>`;
  }

  // Alternative fibers
  if (altFibers.length > 0) {
    html += `<div class="pl-print-section"><h3>Try in a Different Fabric</h3>
      <p class="pl-print-body">You built this in ${fiberName}. Here's how it would differ:</p>
      <table class="pl-print-table">`;
    altFibers.forEach(af => {
      const altF = FIBERS[af];
      if (!altF) return;
      const altNeedle = NEEDLE_DATA[af]?.needleTypes?.[0];
      html += `<tr><td><strong>${altF.name}</strong></td><td>${altF.properties?.drape?.interp || 'Different drape and hand'}. ${altNeedle ? 'Use ' + altNeedle.name + ' ' + altNeedle.sizes + ' needle.' : ''} ${altF.care?.preTreatment || ''}</td></tr>`;
    });
    html += `</table></div>`;
  }

  html += `</div>`; // close Finish phase

  html += `<div class="pl-print-footer">Natural Fabrics Guide · Printed ${new Date().toLocaleDateString()}</div>`;

  // Insert into hidden print container, print, then remove
  let printDiv = document.getElementById('plPrintOverlay');
  if (!printDiv) {
    printDiv = document.createElement('div');
    printDiv.id = 'plPrintOverlay';
    printDiv.className = 'pl-print-overlay';
    document.body.appendChild(printDiv);
  }
  printDiv.innerHTML = html;
  printDiv.style.display = 'block';
  window.print();
  printDiv.style.display = 'none';
}

function plReset() {
  plSelectedProject = null;
  plSelectedFabric = null;
  plSetupState = {};
  plBuildCompletedSteps.clear();
  plBuildCompletedSubsteps.clear();
  plBuildStepNotes = {};
  plProjectNotes = '';
  plCompletionFinalized = false;
  plCompletedTabs.clear();
  clearPipelineState(loadUserData());
}

// ── Load saved pipeline state on init ──
(function initPipeline() {
  const saved = loadUserData();
  if (saved.pipelineState && saved.pipelineState.active) {
    const ps = saved.pipelineState;
    plSelectedPerson = ps.person;
    plSelectedProject = ps.project;
    plSelectedFabric = ps.fabric;
    plSetupState = ps.setup || {};
    plCompletionFinalized = ps.finalized || false;
    plCurrentTab = Math.min(ps.currentTab || 0, 3); // Clamp to 4-tab max
    (ps.completedTabs || []).forEach(t => plCompletedTabs.add(t));
    (ps.buildSteps || []).forEach(s => plBuildCompletedSteps.add(s));
    (ps.buildSubsteps || []).forEach(s => plBuildCompletedSubsteps.add(s));
    plBuildStepNotes = ps.buildNotes || {};
    plProjectNotes = ps.projectNotes || '';
    setTimeout(() => activatePipeline(plCurrentTab), 0);
  }
})();

})(); // end tool-planner IIFE
