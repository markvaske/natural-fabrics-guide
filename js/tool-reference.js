// Tool: Reference — loaded by router on first visit to #reference
// Data globals (FIBERS, etc.) are assigned by router before this runs.
(function() {
// ═══════════════════════════════════════════════════════════════
// FABRIC REFERENCE TOOL
// ═══════════════════════════════════════════════════════════════

// ── COMMERCIAL GLOSSARY (derived at runtime from FIBERS) ──
const COMMERCIAL_GLOSSARY = [];
Object.entries(FIBERS).forEach(([key, f]) => {
  if (f.commercialNames) {
    f.commercialNames.forEach(cn => {
      COMMERCIAL_GLOSSARY.push({
        id: 'cn-' + cn.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        term: cn,
        def: `A commercial or brand name for ${f.name.toLowerCase()} fabric. See the ${f.name} fiber entry for full details.`,
        isFabricName: true,
        fiberKey: key
      });
    });
  }
});

// ── MODULE-LEVEL CONSTANTS ──
const CARE_ICONS = { washTemp: '🫧', drying: '☀️', ironing: '🔥', storage: '📦', preTreatment: '✂️', shrinkagePercent: '📐' };
const CARE_LABELS = { washTemp: 'Washing', drying: 'Drying', ironing: 'Ironing', storage: 'Storage', preTreatment: 'Pre-Treatment', shrinkagePercent: 'Shrinkage' };

// ── GLOSSARY LINK HELPERS ──
function glink(termId, displayText) {
  const entry = GLOSSARY_DATA.find(g => g.id === termId);
  const label = displayText || (entry ? entry.term : termId);
  return `<a class="g-link" onclick="navigateToGlossary('${termId}')" title="Glossary: ${label}">${label}</a>`;
}

function autoGlink(text) {
  const terms = [
    [/\bbias binding\b/gi, 'bias-binding'],
    [/\bseam allowance\b/gi, 'seam-allowance'],
    [/\bselvage\b/gi, 'selvage'],
    [/\bpresser foot\b/gi, 'presser-foot'],
    [/\bwalking foot\b/gi, 'walking-foot'],
    [/\binterfacing\b/gi, 'interfacing'],
    [/\bunderstitch(?:ing)?\b/gi, 'understitch'],
    [/\bstay[- ]stitch\b/gi, 'stay-stitch'],
    [/\bballpoint needle\b/gi, 'ballpoint-needle'],
    [/\bjersey needle\b/gi, 'ballpoint-needle']
  ];
  let result = text;
  terms.forEach(([rx, id]) => {
    result = result.replace(rx, match => `<a class="g-link" onclick="navigateToGlossary('${id}')" title="Glossary: ${match}">${match}</a>`);
  });
  return result;
}


// ═══════════════════════════════════════════════════════════════
// FIBER GRID
// ═══════════════════════════════════════════════════════════════

function renderFiberGrid() {
  const TYPE_META = {
    cellulose: { label: 'Cellulose', icon: '🌿' },
    bast: { label: 'Bast', icon: '🌾' },
    protein: { label: 'Protein', icon: '🐑' },
    regenerated: { label: 'Regenerated', icon: '♻️' }
  };
  const TYPE_ORDER = ['cellulose', 'bast', 'protein', 'regenerated'];
  const groups = {};
  TYPE_ORDER.forEach(t => groups[t] = []);
  Object.entries(FIBERS).forEach(([key, f]) => {
    if (groups[f.fiberType]) groups[f.fiberType].push([key, f]);
  });

  const selector = document.getElementById('fiberChipSelector');
  selector.innerHTML = `
    <div class="chip-columns">
      ${TYPE_ORDER.map(type => {
        const meta = TYPE_META[type];
        const fibers = groups[type];
        if (!fibers.length) return '';
        return `
        <div class="chip-column">
          <div class="chip-column-header">${meta.icon} ${meta.label}</div>
          ${fibers.map(([key, f]) => `
            <button class="fiber-chip" data-fiber="${key}" style="--chip-accent:${f.accent}">
              ${f.name}
            </button>
          `).join('')}
        </div>`;
      }).join('')}
    </div>
  `;
}


// ═══════════════════════════════════════════════════════════════
// VARIETY HELPERS
// ═══════════════════════════════════════════════════════════════

function getWeightCategory(weightStr) {
  const w = (weightStr || '').toLowerCase();
  if (w.includes('very light') || w === 'lightweight') return 'lightweight';
  if (w === 'heavy' || w.includes('medium–heavy') || w.includes('medium-heavy')) return 'heavy';
  if (w === 'medium' || w.includes('light–medium') || w.includes('light-medium')) return 'medium';
  if (w.includes('heavy')) return 'heavy';
  if (w.includes('light')) return 'lightweight';
  return 'medium';
}

function toggleVarietyCard(card, fiberKey) {
  const wasExpanded = card.classList.contains('expanded');
  card.closest('.varieties-grid').querySelectorAll('.variety-card.expanded').forEach(c => c.classList.remove('expanded'));
  if (!wasExpanded) card.classList.add('expanded');
}

function matchVarietyToWeave(variety) {
  const nameDesc = (variety.name + ' ' + variety.desc).toLowerCase();
  if (nameDesc.includes('satin') || nameDesc.includes('sateen') || nameDesc.includes('charmeuse')) return 'Satin Weave';
  if (nameDesc.includes('twill') || nameDesc.includes('denim') || nameDesc.includes('gabardine') || nameDesc.includes('serge')) return 'Twill Weave';
  if (nameDesc.includes('jersey') || nameDesc.includes('knit') || nameDesc.includes('interlock') || nameDesc.includes('french terry') || nameDesc.includes('rib knit')) return 'Knit Structure';
  if (nameDesc.includes('basket') || nameDesc.includes('oxford')) return 'Basket Weave';
  if (nameDesc.includes('jacquard') || nameDesc.includes('damask') || nameDesc.includes('brocade')) return 'Jacquard Weave';
  if (nameDesc.includes('plain weave') || nameDesc.includes('tabby') || nameDesc.includes('muslin') || nameDesc.includes('voile') || nameDesc.includes('lawn') || nameDesc.includes('poplin') || nameDesc.includes('organza') || nameDesc.includes('gauze') || nameDesc.includes('habotai')) return 'Plain Weave';
  return null;
}

function renderVarietyDetail(fiberKey, variety) {
  const weightCat = getWeightCategory(variety.weight);
  const nd = NEEDLE_DATA[fiberKey];
  const ms = nd && nd.machineSettings[weightCat];
  const f = FIBERS[fiberKey];
  const weightLabels = { lightweight: 'Lightweight', medium: 'Medium', heavy: 'Heavy' };

  // Property bars
  let propsHtml = '';
  if (variety.props) {
    propsHtml = '<div class="variety-props">';
    for (const [k, label] of Object.entries(PROP_DISPLAY_LABELS)) {
      const raw = variety.props[k] || 0;
      const val = propDisplayValue(k, raw);
      propsHtml += `<div class="variety-prop-row"><span class="variety-prop-label">${label}</span><div class="variety-prop-track"><div class="variety-prop-fill" style="width:${val}%;background:${f.accent}"></div></div><span class="variety-prop-val">${val}</span></div>`;
    }
    propsHtml += '</div>';
  }

  let settingsHtml = '';
  if (ms) {
    settingsHtml = `<div class="variety-settings">
      <div class="variety-setting"><span class="variety-setting-label">Needle</span>${nd.needleTypes[0].name} ${nd.needleTypes[0].sizes}</div>
      <div class="variety-setting"><span class="variety-setting-label">Stitch Length</span>${ms.stitch}</div>
      <div class="variety-setting"><span class="variety-setting-label">Tension</span>${ms.tension}</div>
      <div class="variety-setting"><span class="variety-setting-label">Foot</span>${ms.foot}</div>
    </div>`;
  }

  // Explore chips — projects suited to this fiber
  const goodProjects = scoreProjectsForFiber(fiberKey).slice(0, 4);
  const techniques = WEIGHT_TECHNIQUES[weightCat] || [];

  let chipsHtml = '<div class="variety-explore">';

  // Needle deep link → planner tool
  if (ms) {
    chipsHtml += `<a class="explore-chip" onclick="event.stopPropagation()" href="#projects?fiber=${fiberKey}&weight=${weightCat}" title="${weightLabels[weightCat]} settings">🪡 ${weightLabels[weightCat]} settings</a>`;
  }

  // Project chips → planner tool
  goodProjects.forEach(r => {
    chipsHtml += `<a class="explore-chip" onclick="event.stopPropagation()" href="#projects?project=${r.project.id}">${r.project.name}</a>`;
  });

  // Technique chips → local techniques mode
  techniques.forEach(t => {
    chipsHtml += `<a class="explore-chip" onclick="event.stopPropagation();navigateToTechnique('${t.cat}','${t.name}')">${t.name}</a>`;
  });

  // Weave chip → local weaves mode
  const weaveMatch = matchVarietyToWeave(variety);
  if (weaveMatch) {
    chipsHtml += `<a class="explore-chip" onclick="event.stopPropagation();document.querySelector('[data-mode=weaves]').click()" title="${weaveMatch}">🔗 ${weaveMatch}</a>`;
  }

  chipsHtml += '</div>';
  return propsHtml + settingsHtml + chipsHtml;
}


// ═══════════════════════════════════════════════════════════════
// FIBER DETAIL PANELS (tab content)
// ═══════════════════════════════════════════════════════════════

function renderCareTab(fiberKey, fiber) {
  const ext = CARE_EXTENDED[fiberKey];
  if (!ext) {
    // Fallback for fibers without extended data
    const c = fiber.care;
    if (!c) return '<p style="color:var(--ink-faint);font-style:italic;">No care information available.</p>';
    return `<div class="care-section"><h4>Care &amp; Preparation</h4><div class="care-grid">${
      ['washTemp','drying','ironing','storage','preTreatment'].map(ck => c[ck] ? `<div class="care-item"><span class="care-icon">${CARE_ICONS[ck]}</span><div><span class="care-label">${CARE_LABELS[ck]}</span>${c[ck]}</div></div>` : '').join('')
    }</div>${c.specialNotes ? `<p style="font-size:0.88rem;color:var(--ink-faint);margin-top:12px;font-style:italic;">💡 ${c.specialNotes}</p>` : ''}</div>`;
  }

  // Quick-reference header
  let html = `<div class="care-quick-ref">
    <div class="care-quick-row">
      <span class="care-quick-item"><span class="care-quick-label">Wash</span>${ext.washing.method}, ${ext.washing.temp}</span>
      <span class="care-quick-item"><span class="care-quick-label">Dry</span>${ext.drying.method}</span>
      <span class="care-quick-item"><span class="care-quick-label">Iron</span>${ext.ironing.temp}${ext.ironing.pressCloth ? ' · press cloth' : ''}</span>
      <span class="care-quick-item"><span class="care-quick-label">Shrinkage</span>${ext.shrinkage.percent}</span>
    </div>
  </div>`;

  // Render each section as an accordion
  html += '<div class="care-accordions">';
  CARE_SECTIONS.forEach((sec, si) => {
    const data = ext[sec.key];
    if (!data) return;
    const isOpen = si === 0 ? ' open' : ''; // First section open by default
    html += `<div class="care-accordion${isOpen}" data-care-section="${sec.key}">
      <div class="care-accordion-header" onclick="toggleCareAccordion(this)">
        <span class="care-accordion-icon">${sec.icon}</span>
        <span class="care-accordion-title">${sec.label}</span>
        <svg class="care-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="care-accordion-body">`;

    // Section-specific metadata row
    if (sec.key === 'washing') {
      html += `<div class="care-meta-grid">
        <div class="care-meta"><span class="care-meta-label">Method</span>${data.method}</div>
        <div class="care-meta"><span class="care-meta-label">Temperature</span>${data.temp}</div>
        <div class="care-meta"><span class="care-meta-label">Detergent</span>${data.detergent}</div>
        <div class="care-meta"><span class="care-meta-label">Frequency</span>${data.frequency}</div>
      </div>`;
      if (data.avoid) html += `<div class="care-warning">⚠️ ${data.avoid}</div>`;
    } else if (sec.key === 'drying') {
      html += `<div class="care-meta-grid">
        <div class="care-meta"><span class="care-meta-label">Recommended</span>${data.method}</div>
        ${data.alternatives && data.alternatives.length ? `<div class="care-meta"><span class="care-meta-label">Alternatives</span>${data.alternatives.join(', ')}</div>` : ''}
      </div>`;
      if (data.why) html += `<p class="care-why">${data.why}</p>`;
    } else if (sec.key === 'ironing') {
      const steamLabel = data.steam ? '✓ Use steam' : '✗ No steam';
      const clothLabel = data.pressCloth ? '✓ Press cloth needed' : '✗ No press cloth needed';
      html += `<div class="care-meta-grid">
        <div class="care-meta"><span class="care-meta-label">Temperature</span>${data.temp}</div>
        <div class="care-meta"><span class="care-meta-label">Steam</span>${steamLabel}</div>
        <div class="care-meta"><span class="care-meta-label">Press Cloth</span>${clothLabel}</div>
      </div>`;
    } else if (sec.key === 'colorCare') {
      html += `<div class="care-meta-grid">
        <div class="care-meta"><span class="care-meta-label">Colorfastness</span>${data.colorfastness}</div>
      </div>`;
    } else if (sec.key === 'shrinkage') {
      html += `<div class="care-meta-grid">
        <div class="care-meta"><span class="care-meta-label">Shrinkage</span>${data.percent}</div>
        <div class="care-meta"><span class="care-meta-label">Pre-treatment</span>${data.prewash}</div>
      </div>`;
      if (data.science) html += `<p class="care-science">🔬 <strong>Why it happens:</strong> ${data.science}</p>`;
    }

    // Tips (all sections have these)
    if (data.tips && data.tips.length) {
      html += '<div class="care-tips">';
      data.tips.forEach(t => {
        html += `<div class="care-tip">
          <div class="care-tip-header">${t.tip}</div>
          <div class="care-tip-detail">${t.detail}</div>
        </div>`;
      });
      html += '</div>';
    }

    // Stripping info (only in longTerm)
    if (sec.key === 'longTerm' && data.stripping) {
      html += `<div class="care-stripping">
        <h5>Stripping & Restoration</h5>
        <p>${data.stripping}</p>
      </div>`;
    }

    html += '</div></div>'; // close body and accordion
  });
  html += '</div>'; // close accordions wrapper
  return html;
}

function toggleCareAccordion(header) {
  const acc = header.parentElement;
  acc.classList.toggle('open');
}

// ═══════════════════════════════════════════════════════════════
// PROPERTY BARS & RADAR (Overview tab)
// ═══════════════════════════════════════════════════════════════

function renderPropBars(key, varietyIdx) {
  const f = FIBERS[key];
  const variety = varietyIdx !== undefined && varietyIdx !== '' ? f.varieties.filter(v => v.props)[parseInt(varietyIdx)] : null;

  return Object.entries(f.properties).map(([pk, pv]) => {
    const dl = PROP_DISPLAY_LABELS[pk] || PROP_LABELS[pk] || pk;

    // Compute range across all varieties
    const dv = propDisplayValue(pk, pv.value);
    const varVals = (f.varieties || []).filter(v => v.props).map(v => propDisplayValue(pk, v.props[pk] || 0));
    const hasRange = varVals.length > 1;
    const rMin = hasRange ? Math.min(...varVals) : dv;
    const rMax = hasRange ? Math.max(...varVals) : dv;

    if (variety) {
      // Variety selected — show range bar + variety indicator
      const val = propDisplayValue(pk, variety.props[pk] || 0);
      return `
      <div class="prop-range-row">
        <span class="prop-range-label">${dl}</span>
        <div class="prop-range-bar-wrap">
          <div class="prop-range-track">
            ${hasRange ? `<div class="prop-range-fill" style="left:${rMin}%;width:${Math.max(rMax - rMin, 2)}%;background:${f.accent};opacity:0.25"></div>` : ''}
            <div class="prop-range-variety" style="left:${val}%;background:${f.accent}"></div>
          </div>
          <span class="prop-range-value">${val}</span>
        </div>
      </div>`;
    }

    // No variety selected — show range bar with average
    return `
    <div class="prop-range-row">
      <span class="prop-range-label">${dl}</span>
      <div class="prop-range-bar-wrap">
        <div class="prop-range-track">
          <div class="prop-range-fill" style="left:${rMin}%;width:${Math.max(rMax - rMin, 2)}%;background:${f.accent};opacity:0.55"></div>
          <div class="prop-range-avg" style="left:${dv}%;background:${f.accent}"></div>
        </div>
        <span class="prop-range-value">${hasRange ? rMin + '–' + rMax : dv}</span>
      </div>
    </div>`;
  }).join('');
}

function createFiberRadarChart(ctx, label, dataValues, fiber) {
  return new Chart(ctx, {
    type: 'radar',
    data: {
      labels: COMPARE_PROPS.map(p => PROP_DISPLAY_LABELS[p] || PROP_LABELS[p]),
      datasets: [{
        label: label,
        data: dataValues,
        borderColor: fiber.accent,
        backgroundColor: fiber.accent + '22',
        borderWidth: 2,
        pointBackgroundColor: fiber.accent,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { stepSize: 25, display: false },
          pointLabels: { font: { family: "'Palatino Linotype', Georgia, serif", size: 12 } },
          grid: { color: 'rgba(0,0,0,0.06)' },
          angleLines: { color: 'rgba(0,0,0,0.06)' }
        }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function updateOverviewForVariety(key, varietyIdx) {
  // Update bars
  const barsCol = document.getElementById('propsBars_' + key);
  if (barsCol) barsCol.innerHTML = renderPropBars(key, varietyIdx);

  // Update radar
  const f = FIBERS[key];
  const variety = varietyIdx !== '' ? f.varieties.filter(v => v.props)[parseInt(varietyIdx)] : null;

  if (fiberRadarChart) { fiberRadarChart.destroy(); fiberRadarChart = null; }
  const canvas = document.getElementById('fiberRadar_' + key);
  if (!canvas) return;

  const dataValues = variety
    ? COMPARE_PROPS.map(p => propDisplayValue(p, variety.props[p] || 0))
    : COMPARE_PROPS.map(p => propDisplayValue(p, f.properties[p]?.value || 0));

  fiberRadarChart = createFiberRadarChart(canvas.getContext('2d'), variety ? variety.name : f.name, dataValues, f);
}

let fiberRadarChart = null;
function renderFiberRadar(key) {
  const canvas = document.getElementById('fiberRadar_' + key);
  if (!canvas) return;
  if (fiberRadarChart) { fiberRadarChart.destroy(); fiberRadarChart = null; }
  const f = FIBERS[key];
  fiberRadarChart = createFiberRadarChart(
    canvas.getContext('2d'),
    f.name,
    COMPARE_PROPS.map(p => propDisplayValue(p, f.properties[p]?.value || 0)),
    f
  );
}

function togglePropLegend(btn) {
  const popover = btn.closest('.detail-tab-content, .ff-filter-controls').querySelector('.prop-legend-popover')
    || btn.parentElement.nextElementSibling;
  if (!popover || !popover.classList.contains('prop-legend-popover')) return;
  const vis = popover.style.display === 'none';
  popover.style.display = vis ? 'block' : 'none';
  btn.classList.toggle('active', vis);
}

function renderTabPanels() {
  const SEASON_LABELS = { 'warm-weather': '☀️ Warm Weather', 'cool-weather': '❄️ Cool Weather', 'all-season': '🔄 All Season' };
  const TIER_LABELS = { budget: '$ Budget', moderate: '$$ Moderate', luxury: '$$$ Luxury' };
  const TYPE_LABELS = { cellulose: '🌿 Cellulose', protein: '🐑 Protein', bast: '🌾 Bast', regenerated: '♻️ Regenerated' };

  const wrap = document.getElementById('tabContent');
  wrap.innerHTML = Object.entries(FIBERS).map(([key, f], i) => {
    const bestFor = scoreProjectsForFiber(key).slice(0, 4);

    return `
    <div class="fiber-detail-panel" data-tab="${key}" style="background:${f.bg}">
      <div class="fabric-header">
        <h2>${f.name}</h2>
        <span class="botanical">${f.botanical}</span>
      </div>

      <div class="detail-tabs">
        <button class="detail-tab active" data-dtab="overview" onclick="switchDetailTab(this)">Overview</button>
        <button class="detail-tab" data-dtab="care" onclick="switchDetailTab(this)">Care</button>
        <button class="detail-tab" data-dtab="varieties" onclick="switchDetailTab(this)">Varieties</button>
        <button class="detail-tab" data-dtab="explore" onclick="switchDetailTab(this)">Explore</button>
        <div class="detail-tabs-spacer"></div>
        <div class="print-utility">
          <button class="print-utility-btn" onclick="printCurrentFiber('${key}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print Card
          </button>
          <button class="print-utility-btn print-utility-secondary" onclick="printAllFibers()">Print All Cards</button>
        </div>
      </div>

      <div class="detail-tab-content active" data-dtab="overview">
        <div class="quick-facts">
          ${f.fiberType ? `<span class="quick-fact"><span class="qf-label">Type</span> ${TYPE_LABELS[f.fiberType] || f.fiberType}</span>` : ''}
          ${f.weightRange ? `<span class="quick-fact"><span class="qf-label">Weight</span> ${f.weightRange.display}</span>` : ''}
          ${f.season ? `<span class="quick-fact">${SEASON_LABELS[f.season] || f.season}</span>` : ''}
          ${f.priceTier ? `<span class="quick-fact">${TIER_LABELS[f.priceTier] || f.priceTier}</span>` : ''}
          ${f.care?.shrinkagePercent ? `<span class="quick-fact"><span class="qf-label">Shrinkage</span> ${f.care.shrinkagePercent}</span>` : ''}
        </div>

        ${bestFor.length ? `
        <div class="best-for-badges">
          ${bestFor.map(r => `<a class="best-for-badge" href="#projects?project=${r.project.id}" style="background:${f.accent}22;color:${f.accent};text-decoration:none">${r.project.name}</a>`).join('')}
        </div>` : ''}

        ${f.commercialNames && f.commercialNames.length ? `
        <div class="commercial-names">
          <div class="commercial-names-label">Also sold as</div>
          <div class="commercial-names-list">
            ${f.commercialNames.map(cn => `<span class="commercial-name">${cn}</span>`).join('')}
          </div>
        </div>` : ''}

        <p class="fabric-intro">${f.intro}</p>

        <div class="props-header-row">
          <h3 class="section-title">Properties <button class="prop-legend-btn" onclick="togglePropLegend(this)" title="What do these scores mean?">?</button></h3>
          ${(f.varieties || []).filter(v => v.props).length > 0 ? `
          <select class="variety-select" data-fiber="${key}" onchange="updateOverviewForVariety('${key}', this.value)">
            <option value="">All Varieties</option>
            ${f.varieties.filter(v => v.props).map((v, vi) => `<option value="${vi}">${v.name}</option>`).join('')}
          </select>` : ''}
        </div>
        <div class="prop-legend-popover" style="display:none">
          <div class="prop-legend-title">Scoring Guide</div>
          <p class="prop-legend-intro">All properties are scored 0–100 where <strong>higher is better</strong>.</p>
          <div class="prop-legend-list">
            ${Object.entries(PROP_TOOLTIPS).map(([k,tip]) => `<div class="prop-legend-item"><span class="prop-legend-name">${PROP_DISPLAY_LABELS[k]}</span><span class="prop-legend-desc">${tip}</span></div>`).join('')}
          </div>
        </div>
        <div class="props-overview-layout" id="propsLayout_${key}">
          <div class="props-bars-col" id="propsBars_${key}">
            ${renderPropBars(key)}
          </div>
          <div class="props-radar-col">
            <canvas id="fiberRadar_${key}" width="360" height="360"></canvas>
          </div>
        </div>

        ${FIBER_PROS_CONS[key] ? `
        <div class="pros-cons-section">
          <h4>At a Glance</h4>
          <div class="pros-cons-grid">
            <div class="pros-col">
              <div class="pros-cons-header pros-header">Strengths</div>
              <ul>${FIBER_PROS_CONS[key].pros.map(p => `<li>${p}</li>`).join('')}</ul>
            </div>
            <div class="cons-col">
              <div class="pros-cons-header cons-header">Watch Out For</div>
              <ul>${FIBER_PROS_CONS[key].cons.map(c => `<li>${c}</li>`).join('')}</ul>
            </div>
          </div>
        </div>` : ''}

        <div class="sewing-tips">
          <h4>Sewing Notes</h4>
          <ul>${f.sewingNotes.map(n=>`<li>${autoGlink(n)}</li>`).join('')}</ul>
        </div>

        ${FIBER_ENV_ALLERGEN[key] ? (() => {
          const env = FIBER_ENV_ALLERGEN[key];
          return `
        <div class="env-allergen-section">
          <h4>Environmental &amp; Sustainability</h4>
          <div class="env-grid">
            <div class="env-item">
              <span class="env-item-label">Water Usage</span>
              ${env.water}
            </div>
            <div class="env-item">
              <span class="env-item-label">Pesticides</span>
              ${env.pesticides}
            </div>
            <div class="env-item">
              <span class="env-item-label">Sustainability</span>
              ${env.sustainability}
            </div>
            <div class="env-item">
              <span class="env-item-label">Certifications</span>
              ${env.certifications}
              ${env.biodegradable ? '<span class="env-badge biodegradable">Biodegradable</span>' : ''}
            </div>
          </div>
          <div class="allergen-note">
            <span class="allergen-note-label">Allergen &amp; Sensitivity Notes</span>
            ${env.allergens}
          </div>
        </div>`;
        })() : ''}
      </div>

      <div class="detail-tab-content" data-dtab="care">
        ${renderCareTab(key, f)}
      </div>

      <div class="detail-tab-content" data-dtab="varieties">
        <h3 class="section-title">Varieties</h3>
        <div class="varieties-grid">
          ${f.varieties.map((v,vi)=>`
            <div class="variety-card" onclick="toggleVarietyCard(this,'${key}')">
              <h4>${v.name}${v.isKnit ? ' <span class="knit-badge">Knit</span>' : ''}</h4>
              <span class="weight-tag">${v.weight}</span>${v.gsm ? `<span class="gsm-tag">${v.gsm} GSM</span>` : ''}
              <p>${v.desc}</p>
              <div class="variety-detail">${renderVarietyDetail(key, v)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="detail-tab-content" data-dtab="explore">
        <div class="explore-card" style="margin-top:0;">
          <div class="explore-card-title">Explore</div>

          ${f.relatedFibers && f.relatedFibers.length ? `<div class="explore-row">
            <span class="explore-row-label">Compare</span>
            ${f.relatedFibers.filter(rk => FIBERS[rk]).map(rk =>
              `<a class="explore-chip" onclick="navigateToCompare('${key}','${rk}')">${FIBERS[rk].name}</a>`
            ).join('')}
          </div>` : ''}

          ${f.relatedFibers && f.relatedFibers.length ? `<div class="explore-row">
            <span class="explore-row-label">Blend</span>
            ${f.relatedFibers.filter(rk => FIBERS[rk]).map(rk =>
              `<a class="explore-chip" onclick="navigateToBlend('${key}','${rk}')">${FIBERS[rk].name}</a>`
            ).join('')}
          </div>` : ''}

          ${bestFor.length ? `<div class="explore-row">
            <span class="explore-row-label">Projects</span>
            ${bestFor.map(r =>
              `<a class="explore-chip" href="#projects?project=${r.project.id}">${r.project.name}</a>`
            ).join('')}
          </div>` : ''}

          <div class="explore-needle-row">
            <span class="explore-row-label">Needle</span>
            <span class="explore-needle-info">${f.needle.type} ${f.needle.sizeRange} · ${f.thread.weight} ${f.thread.material}</span>
            <a class="explore-chip" href="#projects?fiber=${key}">Full settings</a>
          </div>

          ${f.weaves && f.weaves.length ? `<div class="explore-row">
            <span class="explore-row-label">Weaves</span>
            ${f.weaves.map(w =>
              `<a class="explore-chip" onclick="document.querySelector('[data-mode=weaves]').click()" title="${w.structure} — ${w.character}">${w.name}</a>`
            ).join('')}
          </div>` : ''}

          ${f.relatedFibers && f.relatedFibers.length ? `<div class="explore-row">
            <span class="explore-row-label">Related</span>
            ${f.relatedFibers.filter(rk => FIBERS[rk]).map(rk =>
              `<a class="explore-chip" onclick="showFiberDetail('${rk}')">${FIBERS[rk].name}</a>`
            ).join('')}
          </div>` : ''}
        </div>
      </div>
    </div>`;
  }).join('');
}


// ═══════════════════════════════════════════════════════════════
// SEGMENTED CONTROL (Browse / Compare / Blend)
// ═══════════════════════════════════════════════════════════════

let fiberSegMode = 'browse'; // 'browse' | 'compare' | 'blend'
let browseSelectedFiber = null;

function setFiberSegMode(mode) {
  fiberSegMode = mode;

  // Update segmented control buttons
  document.querySelectorAll('.fiber-seg-btn').forEach(b => b.classList.toggle('active', b.dataset.seg === mode));

  // Update hint text
  const hint = document.getElementById('fiberSegHint');
  if (mode === 'compare') {
    hint.textContent = 'Select 2–4 fibers to compare side-by-side';
    hint.style.display = '';
  } else if (mode === 'blend') {
    hint.textContent = 'Select 2 fibers to explore their blend';
    hint.style.display = '';
  } else {
    hint.textContent = 'Select a fiber to explore its properties, care, and varieties';
    hint.style.display = '';
  }

  // Update chip selection visuals
  document.querySelectorAll('.fiber-chip').forEach(chip => {
    const key = chip.dataset.fiber;
    if (mode === 'browse') {
      chip.classList.toggle('selected', browseSelectedFiber === key);
    } else if (mode === 'compare') {
      chip.classList.toggle('selected', selectedCompare.has(key));
    } else if (mode === 'blend') {
      chip.classList.toggle('selected', blendSelectedFibers.includes(key));
    }
  });

  // Show/hide content panels
  const detailWrapper = document.getElementById('fiberDetailWrapper');
  const comparePanel = document.getElementById('compareResultsInline');
  const blendPanel = document.getElementById('blendResultsInline');
  const welcomePanel = document.getElementById('fiberWelcome');

  if (mode === 'browse') {
    comparePanel.style.display = 'none';
    blendPanel.style.display = 'none';
    detailWrapper.style.display = browseSelectedFiber ? '' : 'none';
    welcomePanel.style.display = browseSelectedFiber ? 'none' : '';
  } else {
    detailWrapper.style.display = 'none';
    welcomePanel.style.display = 'none';
    comparePanel.style.display = mode === 'compare' ? '' : 'none';
    blendPanel.style.display = mode === 'blend' ? '' : 'none';
  }
}

function initSegControl() {
  document.querySelectorAll('.fiber-seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setFiberSegMode(btn.dataset.seg);
    });
  });
}


// ═══════════════════════════════════════════════════════════════
// FIBER GRID ↔ DETAIL NAVIGATION
// ═══════════════════════════════════════════════════════════════

function showFiberDetail(key) {
  browseSelectedFiber = key;
  document.getElementById('fiberWelcome').style.display = 'none';
  const wrapper = document.getElementById('fiberDetailWrapper');
  wrapper.style.display = '';
  document.querySelectorAll('.fiber-detail-panel').forEach(p => p.classList.remove('active'));
  const panel = document.querySelector(`.fiber-detail-panel[data-tab="${key}"]`);
  if (panel) {
    panel.classList.add('active');
    panel.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
    panel.querySelectorAll('.detail-tab-content').forEach(c => c.classList.remove('active'));
    panel.querySelector('.detail-tab[data-dtab="overview"]').classList.add('active');
    panel.querySelector('.detail-tab-content[data-dtab="overview"]').classList.add('active');
  }
  // Update chip selection
  document.querySelectorAll('.fiber-chip').forEach(chip => {
    chip.classList.toggle('selected', chip.dataset.fiber === key);
  });
  // Reset variety selector and render radar
  const varSelect = panel?.querySelector('.variety-select');
  if (varSelect) varSelect.value = '';
  const barsCol = document.getElementById('propsBars_' + key);
  if (barsCol) barsCol.innerHTML = renderPropBars(key);
  // Render the single-fiber radar chart after panel is visible
  setTimeout(() => renderFiberRadar(key), 50);
}

function showFiberGrid() {
  browseSelectedFiber = null;
  document.getElementById('fiberDetailWrapper').style.display = 'none';
  document.getElementById('fiberWelcome').style.display = '';
  document.querySelectorAll('.fiber-detail-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.fiber-chip').forEach(chip => chip.classList.remove('selected'));
}

function switchDetailTab(btn) {
  const panel = btn.closest('.fiber-detail-panel');
  const tab = btn.dataset.dtab;
  panel.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
  panel.querySelectorAll('.detail-tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  panel.querySelector(`.detail-tab-content[data-dtab="${tab}"]`).classList.add('active');
}

function handleFiberChipClick(key) {
  if (fiberSegMode === 'browse') {
    if (browseSelectedFiber === key) {
      // Deselect
      showFiberGrid();
    } else {
      showFiberDetail(key);
    }
    return;
  }

  if (fiberSegMode === 'compare') {
    if (selectedCompare.has(key)) {
      selectedCompare.delete(key);
    } else if (selectedCompare.size < 4) {
      selectedCompare.add(key);
    }
    document.querySelectorAll('.fiber-chip').forEach(chip => {
      chip.classList.toggle('selected', selectedCompare.has(chip.dataset.fiber));
    });
    updateCompare();
    return;
  }

  if (fiberSegMode === 'blend') {
    const idx = blendSelectedFibers.indexOf(key);
    if (idx >= 0) {
      blendSelectedFibers.splice(idx, 1);
    } else if (blendSelectedFibers.length < 2) {
      blendSelectedFibers.push(key);
    } else {
      blendSelectedFibers.shift();
      blendSelectedFibers.push(key);
    }
    document.querySelectorAll('.fiber-chip').forEach(chip => {
      chip.classList.toggle('selected', blendSelectedFibers.includes(chip.dataset.fiber));
    });
    updateBlendUI();
    return;
  }
}

function initTabs() {
  document.getElementById('fiberChipSelector').addEventListener('click', e => {
    const chip = e.target.closest('.fiber-chip');
    if (!chip) return;
    handleFiberChipClick(chip.dataset.fiber);
  });
}


// ═══════════════════════════════════════════════════════════════
// CROSS-MODE NAVIGATION
// ═══════════════════════════════════════════════════════════════

function navigateToFiberFromGlossary(fiberKey) {
  const fibersBtn = document.querySelector('.sidebar-mode-btn[data-mode="browse"]');
  document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active'));
  fibersBtn.classList.add('active');
  showView('browse');
  setFiberSegMode('browse');
  showFiberDetail(fiberKey);
}

function navigateToTechnique(catSlug, techName) {
  const techBtn = document.querySelector('.sidebar-mode-btn[data-mode="techniques"]');
  document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active'));
  techBtn.classList.add('active');
  showView('techniques');

  const techView = document.getElementById('techniquesView');
  techView.querySelectorAll('.sub-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.cat === catSlug);
  });
  techView.querySelectorAll('.sub-tab-content').forEach(c => {
    c.classList.toggle('active', c.dataset.cat === catSlug);
  });
  techView.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function navigateToGlossary(termId) {
  const navItems = document.querySelectorAll('.sidebar-mode-btn');
  navItems.forEach(b => b.classList.remove('active'));
  const glossaryBtn = document.querySelector('.sidebar-mode-btn[data-mode="glossary"]');
  if (glossaryBtn) glossaryBtn.classList.add('active');

  showView('glossary');

  const searchInput = document.querySelector('#glossaryView .glossary-search-bar input');
  if (searchInput) {
    searchInput.value = '';
    document.querySelectorAll('#glossaryView .glossary-letter-group').forEach(g => g.style.display = '');
    document.querySelectorAll('#glossaryView .glossary-entry').forEach(e => e.style.display = '');
  }

  setTimeout(() => {
    const entry = document.getElementById('glossary-' + termId);
    if (entry) {
      entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
      entry.classList.add('glossary-highlight');
      setTimeout(() => entry.classList.remove('glossary-highlight'), 1800);
    }
  }, 100);
}


// ═══════════════════════════════════════════════════════════════
// MODE SWITCHING (5 modes for Reference tool)
// ═══════════════════════════════════════════════════════════════

const MODE_INFO = {
  browse: { title: "Fibers", desc: "Browse, compare, and blend natural fibers — properties, varieties, care, and sewing notes", view: "fibersView" },
  weaves: { title: "Weaves & Knits", desc: "How fabric is constructed — weave structures, knit types, grain, and what it all means for your sewing", view: "weavesView" },
  techniques: { title: "Techniques", desc: "Step-by-step guides to essential sewing techniques — shaping, fullness, hems, seams, and edge finishes", view: "techniquesView" },
  construction: { title: "Construction", desc: "Collars, waistbands, cuffs, and closures — component assemblies with variations, step-by-step instructions, and cross-links", view: "constructionView" },
  glossary: { title: "Sewist's Glossary", desc: "Essential sewing terms defined and cross-referenced — click any dotted-underline term throughout the guide to jump here", view: "glossaryView" }
};

const ALL_VIEW_IDS = Object.values(MODE_INFO).map(m => m.view);

function showView(mode) {
  const info = MODE_INFO[mode];
  if (!info) return;
  ALL_VIEW_IDS.forEach(id => document.getElementById(id).classList.remove('active'));
  document.getElementById(info.view).classList.add('active');
  // Reset segmented control when switching to a non-fibers mode
  if (mode !== 'browse' && fiberSegMode !== 'browse') {
    setFiberSegMode('browse');
  }
}

function initModes() {
  // Register with shell for mode switching
  shellRegisterTool('reference', { showView: showView });
}


// ═══════════════════════════════════════════════════════════════
// PRINT REFERENCE CARDS
// ═══════════════════════════════════════════════════════════════

function getActiveFiberKey() {
  const activePanel = document.querySelector('.fiber-detail-panel.active');
  return activePanel ? activePanel.dataset.tab : Object.keys(FIBERS)[0];
}

function initPrintUtility() {
  window.addEventListener('afterprint', () => {
    document.getElementById('printPreview').style.display = 'none';
  });
}

function triggerPrint(keys) {
  const preview = document.getElementById('printPreview');
  renderPrintCards(keys);
  preview.style.display = '';
  setTimeout(() => window.print(), 100);
}

function printCurrentFiber(key) {
  triggerPrint([key || getActiveFiberKey()]);
}

function printAllFibers() {
  triggerPrint(Object.keys(FIBERS));
}

function renderPrintCards(keys) {
  const preview = document.getElementById('printPreview');
  if (keys.length === 0) {
    preview.innerHTML = '<div class="rec-empty">Select fibers above to preview your reference cards.</div>';
    return;
  }

  preview.innerHTML = keys.map(key => {
    const f = FIBERS[key];
    const nd = NEEDLE_DATA[key];
    const topProps = Object.entries(f.properties)
      .sort((a, b) => b[1].value - a[1].value)
      .slice(0, 4);
    const bottomProps = Object.entries(f.properties)
      .sort((a, b) => a[1].value - b[1].value)
      .slice(0, 2);

    return `
      <div class="ref-card" style="--card-accent:${f.accent}">
        <div style="position:absolute;top:0;left:0;right:0;height:5px;background:${f.accent}"></div>
        <div class="ref-card-header">
          <div>
            <h3>${f.name}</h3>
            <span style="font-size:0.88rem;color:var(--ink-faint);font-style:italic">${f.botanical}</span>
          </div>
          <div class="ref-meta">
            ${f.fiberType} fiber<br>
            ${f.needle.type}<br>
            ${f.needle.sizeRange}
          </div>
        </div>
        <div class="ref-card-body">
          <div class="ref-section">
            <h4>Key Properties</h4>
            ${topProps.map(([pk, pv]) => `
              <div class="ref-row">
                <span>${PROP_DISPLAY_LABELS[pk] || PROP_LABELS[pk]}</span>
                <strong>${pv.label} (${propDisplayValue(pk, pv.value)})</strong>
              </div>
            `).join('')}
            <h4 style="margin-top:12px">Watch For</h4>
            ${bottomProps.map(([pk, pv]) => `
              <div class="ref-row">
                <span>${PROP_DISPLAY_LABELS[pk] || PROP_LABELS[pk]}</span>
                <strong>${pv.label} (${propDisplayValue(pk, pv.value)})</strong>
              </div>
            `).join('')}
          </div>
          <div class="ref-section">
            <h4>Thread</h4>
            <div class="ref-row">
              <span>Weight</span>
              <strong>${f.thread.weight}</strong>
            </div>
            <div class="ref-row">
              <span>Material</span>
              <strong>${f.thread.material}</strong>
            </div>
            ${nd ? `
              <h4 style="margin-top:12px">Quick Sewing Notes</h4>
              <ul>
                ${nd.tips.slice(0, 3).map(t => `<li>${t}</li>`).join('')}
              </ul>
            ` : `
              <h4 style="margin-top:12px">Sewing Notes</h4>
              <ul>
                ${f.sewingNotes.slice(0, 3).map(n => `<li>${n}</li>`).join('')}
              </ul>
            `}
          </div>
        </div>
        <div class="ref-card-footer">
          ${f.tags.map(t => `<span class="ref-tag">${t}</span>`).join('')}
          <span class="ref-tag" style="margin-left:auto;background:transparent;color:var(--ink-faint)">naturalfabrics.guide</span>
        </div>
      </div>
    `;
  }).join('');
}


// ═══════════════════════════════════════════════════════════════
// COMPARE MODE
// ═══════════════════════════════════════════════════════════════

let selectedCompare = new Set();
let radarChart = null;

function updateCompare() {
  const results = document.getElementById('compareResults');
  const keys = [...selectedCompare];

  if (keys.length < 2) {
    results.innerHTML = '<div class="compare-empty">Select at least two fibers above to see a comparison.</div>';
    if (radarChart) { radarChart.destroy(); radarChart = null; }
    return;
  }

  results.innerHTML = `
    <div class="compare-layout">
      <div class="compare-bars">
        <h3>Property Breakdown</h3>
        ${COMPARE_PROPS.map(prop => `
          <div class="compare-prop-group">
            <div class="compare-prop-label">${PROP_DISPLAY_LABELS[prop] || PROP_LABELS[prop]}</div>
            ${keys.map(k => {
              const f = FIBERS[k];
              const v = propDisplayValue(prop, f.properties[prop]?.value || 0);
              return `<div class="compare-bar-row">
                <span class="compare-bar-name">${f.name}</span>
                <div class="compare-bar-track">
                  <div class="compare-bar-fill" style="width:${v}%;background:${f.accent}"></div>
                </div>
                <span class="compare-bar-val">${v}</span>
              </div>`;
            }).join('')}
          </div>
        `).join('')}
      </div>
      <div class="compare-chart-wrap">
        <h3>Radar Comparison</h3>
        <canvas id="radarCanvas"></canvas>
      </div>
    </div>

    <div style="margin-top:24px;text-align:center;">
      ${keys.map(k => `<a class="explore-chip" onclick="showFiberDetail('${k}')">${FIBERS[k].name} details →</a>`).join('')}
    </div>
  `;

  const ctx = document.getElementById('radarCanvas').getContext('2d');
  if (radarChart) radarChart.destroy();

  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: COMPARE_PROPS.map(p => PROP_DISPLAY_LABELS[p] || PROP_LABELS[p]),
      datasets: keys.map(k => {
        const f = FIBERS[k];
        return {
          label: f.name,
          data: COMPARE_PROPS.map(p => propDisplayValue(p, f.properties[p]?.value || 0)),
          borderColor: f.accent,
          backgroundColor: f.accent + '22',
          borderWidth: 2,
          pointBackgroundColor: f.accent,
          pointRadius: 3
        };
      })
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { stepSize: 25, display: false },
          pointLabels: { font: { family: "'Palatino Linotype', Georgia, serif", size: 12 } },
          grid: { color: 'rgba(0,0,0,0.06)' },
          angleLines: { color: 'rgba(0,0,0,0.06)' }
        }
      },
      plugins: {
        legend: {
          labels: { font: { family: "'Palatino Linotype', Georgia, serif", size: 12 }, usePointStyle: true, pointStyle: 'circle' }
        }
      }
    }
  });
}

function navigateToCompare(keyA, keyB) {
  // Ensure we're on Fibers mode
  const fibersBtn = document.querySelector('.nav-item[data-mode="browse"]');
  if (fibersBtn) {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    fibersBtn.classList.add('active');
    showView('browse');
  }

  // Clear and pre-select
  selectedCompare.clear();
  [keyA, keyB].forEach(k => { if (FIBERS[k]) selectedCompare.add(k); });

  // Switch to compare segment
  setFiberSegMode('compare');
  updateCompare();
  document.getElementById('fiberContentArea').scrollIntoView({ behavior: 'smooth', block: 'start' });
}


// ═══════════════════════════════════════════════════════════════
// BLEND MODE
// ═══════════════════════════════════════════════════════════════

let blendSelectedFibers = [];
let blendRatio = 50;

function initBlendSlider() {
  const slider = document.getElementById('blendRatioSlider');
  slider.addEventListener('input', () => {
    blendRatio = parseInt(slider.value);
    updateBlendUI();
  });
}

function updateBlendUI() {
  const ratioWrap = document.getElementById('blendRatioWrap');
  if (blendSelectedFibers.length === 2) {
    const fA = FIBERS[blendSelectedFibers[0]];
    const fB = FIBERS[blendSelectedFibers[1]];
    ratioWrap.style.display = '';
    document.getElementById('blendFiberAName').textContent = fA.name;
    document.getElementById('blendFiberBName').textContent = fB.name;
    document.getElementById('blendRatioReadout').textContent = `${blendRatio} / ${100 - blendRatio}`;

    const slider = document.getElementById('blendRatioSlider');
    slider.style.setProperty('--blend-a-color', fA.accent);
    slider.style.setProperty('--blend-b-color', fB.accent);
    slider.style.background = `linear-gradient(to right, ${fA.accent}, ${fB.accent})`;

    renderBlendDetail();
  } else {
    ratioWrap.style.display = 'none';
    document.getElementById('blendResults').innerHTML =
      '<div class="rec-empty">Select two fibers above to see how they behave as a blend.</div>';
  }
}

function getBlendNotes(keyA, keyB) {
  const pairKey1 = keyA + '+' + keyB;
  const pairKey2 = keyB + '+' + keyA;
  return BLEND_NOTES[pairKey1] || BLEND_NOTES[pairKey2] || null;
}

function getBlendAvailability(keyA, keyB) {
  const notes = getBlendNotes(keyA, keyB);
  if (notes && notes.availability) return notes.availability;

  const fA = FIBERS[keyA], fB = FIBERS[keyB];
  const tA = fA.fiberType, tB = fB.fiberType;

  if (keyA === keyB) return 'n/a';

  const rarePairs = [
    ['jute', 'silk'], ['jute', 'cashmere'], ['jute', 'cupro'], ['jute', 'mohair'], ['jute', 'angora'],
    ['ramie', 'cashmere'], ['ramie', 'mohair'], ['ramie', 'angora'], ['ramie', 'cupro'], ['ramie', 'camel'],
    ['angora', 'cotton'], ['angora', 'linen'], ['angora', 'hemp'], ['angora', 'bamboo'],
    ['angora', 'tencel'], ['angora', 'viscose'], ['angora', 'modal'], ['angora', 'cupro'],
    ['camel', 'cotton'], ['camel', 'linen'], ['camel', 'hemp'], ['camel', 'bamboo'],
    ['camel', 'tencel'], ['camel', 'viscose'], ['camel', 'modal'], ['camel', 'cupro'],
  ];
  for (const [a, b] of rarePairs) {
    if ((keyA === a && keyB === b) || (keyA === b && keyB === a)) return 'rare';
  }

  if (tA === tB && tA === 'bast') return 'specialty';
  if (tA === tB && tA === 'regenerated') return 'specialty';
  if (tA === tB) return 'rare';

  if (keyA === 'cotton' || keyB === 'cotton') return 'widely available';
  if (tA === 'regenerated' || tB === 'regenerated') return 'specialty';
  if ((keyA === 'wool' || keyB === 'wool') && (tA === 'protein' || tB === 'protein')) return 'specialty';

  return 'specialty';
}

function renderBlendDetail() {
  const results = document.getElementById('blendResults');
  const keyA = blendSelectedFibers[0], keyB = blendSelectedFibers[1];
  const fA = FIBERS[keyA], fB = FIBERS[keyB];
  const ratioA = blendRatio / 100, ratioB = (100 - blendRatio) / 100;

  const blendedProps = {};
  for (const prop of COMPARE_PROPS) {
    const vA = fA.properties[prop]?.value || 0;
    const vB = fB.properties[prop]?.value || 0;
    blendedProps[prop] = Math.round(vA * ratioA + vB * ratioB);
  }

  const notes = getBlendNotes(keyA, keyB);
  const availability = getBlendAvailability(keyA, keyB);
  const availLabels = { 'widely available': 'Widely Available', 'specialty': 'Specialty', 'rare': 'Rare / Uncommon' };
  const availClass = availability.replace(/\s+/g, '-').replace(/[^a-z-]/g, '');

  const blendedNeedle = ratioA >= 0.6 ? fA.needle : (ratioB >= 0.6 ? fB.needle : { type: fA.needle.type + ' or ' + fB.needle.type, sizeRange: fA.needle.sizeRange });
  const blendedThread = ratioA >= 0.6 ? fA.thread : (ratioB >= 0.6 ? fB.thread : fA.thread);

  results.innerHTML = `
    <div class="blend-detail">
      <div class="blend-header">
        <div class="blend-swatch-pair">
          <span style="background:${fA.accent}"></span>
          <span style="background:${fB.accent}"></span>
        </div>
        <h3>${fA.name} + ${fB.name}</h3>
        <span class="blend-pct-badge">${blendRatio}/${100 - blendRatio}</span>
        <span class="blend-availability ${availClass}">${availLabels[availability] || availability}</span>
      </div>

      <div class="blend-viz-layout">
        <div class="blend-card">
          <h4>Blended Properties vs. Individual Fibers</h4>
          ${COMPARE_PROPS.map(prop => {
            const dvBlend = propDisplayValue(prop, blendedProps[prop]);
            const dvA = propDisplayValue(prop, fA.properties[prop]?.value || 0);
            const dvB = propDisplayValue(prop, fB.properties[prop]?.value || 0);
            return `
            <div class="blend-compare-group">
              <div class="blend-prop-label">${PROP_DISPLAY_LABELS[prop] || PROP_LABELS[prop]}</div>
              <div class="blend-compare-row">
                <span class="blend-compare-name" style="color:${fA.accent}">${fA.name}</span>
                <div class="blend-prop-bar"><div class="blend-prop-fill" style="width:${dvA}%;background:${fA.accent};opacity:0.5"></div></div>
                <span class="blend-prop-val">${dvA}</span>
              </div>
              <div class="blend-compare-row">
                <span class="blend-compare-name" style="color:${fB.accent}">${fB.name}</span>
                <div class="blend-prop-bar"><div class="blend-prop-fill" style="width:${dvB}%;background:${fB.accent};opacity:0.5"></div></div>
                <span class="blend-prop-val">${dvB}</span>
              </div>
              <div class="blend-compare-row blend-compare-result">
                <span class="blend-compare-name">Blend</span>
                <div class="blend-prop-bar"><div class="blend-prop-fill" style="width:${dvBlend}%;background:linear-gradient(to right, ${fA.accent}, ${fB.accent})"></div></div>
                <span class="blend-prop-val">${dvBlend}</span>
              </div>
            </div>`;
          }).join('')}
        </div>
        <div class="blend-card blend-radar-card">
          <h4>Radar Comparison</h4>
          <canvas id="blendRadarCanvas" width="360" height="360"></canvas>
          <div class="blend-radar-legend">
            <span class="blend-legend-item"><span class="blend-legend-swatch" style="background:${fA.accent}"></span>${fA.name}</span>
            <span class="blend-legend-item"><span class="blend-legend-swatch" style="background:${fB.accent}"></span>${fB.name}</span>
            <span class="blend-legend-item"><span class="blend-legend-swatch blend-legend-gradient" style="background:linear-gradient(to right, ${fA.accent}, ${fB.accent})"></span>Blend</span>
          </div>
        </div>
      </div>

      <div class="blend-card">
        <h4>Sewing Settings for this Blend</h4>
        <div class="blend-prop-row" style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.06)">
          <span class="blend-prop-label" style="width:auto">Needle</span>
          <span style="font-weight:600;margin-left:auto">${blendedNeedle.type} · ${blendedNeedle.sizeRange}</span>
        </div>
        <div class="blend-prop-row" style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.06)">
          <span class="blend-prop-label" style="width:auto">Thread</span>
          <span style="font-weight:600;margin-left:auto">${blendedThread.weight} ${blendedThread.material}</span>
        </div>
        <div class="blend-prop-row" style="padding:8px 0;">
          <span class="blend-prop-label" style="width:auto">Dominant Fiber</span>
          <span style="font-weight:600;margin-left:auto">${ratioA >= ratioB ? fA.name : fB.name} (${Math.max(blendRatio, 100-blendRatio)}%) — sew toward this fiber's preferences</span>
        </div>
      </div>

      ${notes ? `
        <div class="blend-card">
          <h4>About ${fA.name}/${fB.name} Blends</h4>
          <div class="blend-note"><strong>Why blend these?</strong> ${notes.why}</div>
          <div class="blend-note"><strong>Care.</strong> ${notes.care}</div>
          <div class="blend-note"><strong>Sewing.</strong> ${notes.sewing}</div>
          <div class="blend-note"><strong>Common ratios.</strong> ${notes.common}</div>
        </div>
      ` : `
        <div class="blend-card">
          <h4>General Blend Guidance</h4>
          ${availability === 'rare' ? `<div class="blend-note" style="background:#f8d7da;padding:10px 14px;border-radius:8px;margin-bottom:8px;border:none;"><strong>Note:</strong> This combination is uncommon in commercial fabrics. You may need to source it from specialty mills or consider blending at the project level (e.g., layering one fabric over the other).</div>` : ''}
          <div class="blend-note"><strong>Rule of thumb:</strong> Sew to the more delicate fiber's requirements. Use the finer needle, lower heat, and gentler handling.</div>
          <div class="blend-note"><strong>Properties:</strong> Blended properties are estimated as weighted averages. In practice, some properties (like shrinkage) may behave non-linearly.</div>
          <div class="blend-note"><strong>Care:</strong> Follow the care instructions for whichever fiber is more sensitive. When in doubt, hand-wash cool and lay flat to dry.</div>
          <div class="blend-note"><strong>Pre-treat:</strong> If the dominant fiber requires pre-washing (cotton, linen, hemp), pre-wash the blend before cutting.</div>
        </div>
      `}

      <div style="margin-top:16px;text-align:center;">
        <a class="explore-chip" onclick="showFiberDetail('${keyA}')">${fA.name} details →</a>
        <a class="explore-chip" onclick="showFiberDetail('${keyB}')">${fB.name} details →</a>
      </div>
    </div>
  `;

  // Render blend radar chart
  renderBlendRadar(keyA, keyB, blendedProps);
}

let blendRadarChart = null;
function renderBlendRadar(keyA, keyB, blendedProps) {
  const canvas = document.getElementById('blendRadarCanvas');
  if (!canvas) return;
  if (blendRadarChart) { blendRadarChart.destroy(); blendRadarChart = null; }
  const fA = FIBERS[keyA], fB = FIBERS[keyB];
  const ctx = canvas.getContext('2d');

  // Create a gradient for the blend dataset
  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, fA.accent + '33');
  grad.addColorStop(1, fB.accent + '33');

  blendRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: COMPARE_PROPS.map(p => PROP_DISPLAY_LABELS[p] || PROP_LABELS[p]),
      datasets: [
        {
          label: fA.name,
          data: COMPARE_PROPS.map(p => propDisplayValue(p, fA.properties[p]?.value || 0)),
          borderColor: fA.accent,
          backgroundColor: fA.accent + '15',
          borderWidth: 1.5,
          borderDash: [4, 3],
          pointBackgroundColor: fA.accent,
          pointRadius: 2
        },
        {
          label: fB.name,
          data: COMPARE_PROPS.map(p => propDisplayValue(p, fB.properties[p]?.value || 0)),
          borderColor: fB.accent,
          backgroundColor: fB.accent + '15',
          borderWidth: 1.5,
          borderDash: [4, 3],
          pointBackgroundColor: fB.accent,
          pointRadius: 2
        },
        {
          label: 'Blend',
          data: COMPARE_PROPS.map(p => propDisplayValue(p, blendedProps[p])),
          borderColor: '#333',
          backgroundColor: grad,
          borderWidth: 2.5,
          pointBackgroundColor: '#333',
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { stepSize: 25, display: false },
          pointLabels: { font: { family: "'Palatino Linotype', Georgia, serif", size: 12 } },
          grid: { color: 'rgba(0,0,0,0.06)' },
          angleLines: { color: 'rgba(0,0,0,0.06)' }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function navigateToBlend(keyA, keyB) {
  // Ensure we're on Fibers mode
  const fibersBtn = document.querySelector('.sidebar-mode-btn[data-mode="browse"]');
  if (fibersBtn) {
    document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active'));
    fibersBtn.classList.add('active');
    showView('browse');
  }

  // Clear and pre-select
  blendSelectedFibers = [];
  [keyA, keyB].forEach(k => { if (FIBERS[k]) blendSelectedFibers.push(k); });
  document.getElementById('blendRatioSlider').value = 50;
  blendRatio = 50;

  // Switch to blend segment
  setFiberSegMode('blend');
  updateBlendUI();
  document.getElementById('fiberContentArea').scrollIntoView({ behavior: 'smooth', block: 'start' });
}


// ═══════════════════════════════════════════════════════════════
// TECHNIQUES (6 categories — incl. Hand Stitching)
// ═══════════════════════════════════════════════════════════════

function renderTechniquesView() {
  const container = document.getElementById('techniquesView');
  const categories = Object.entries(TECHNIQUE_DATA);

  // Cross-reference mapping: which hand stitches relate to each category
  const crossRefMap = {
    shaping:  ['Running Baste', 'Diagonal Baste'],
    fullness: ['Slip Baste'],
    hems:     ['Slip Stitch', 'Catch Stitch'],
    seams:    ['Whipstitch', 'Fell Stitch'],
    edges:    ['Blanket Stitch']
  };

  // Shorter tab labels to fit 6 tabs comfortably
  const shortLabels = {
    fullness: 'Fullness',
    seams: 'Seams',
    edges: 'Edges'
  };

  const linkSvg = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" style="width:10px;height:10px"><path d="M4 12l8-8M4 4h8v8"/></svg>';
  const chevronSvg = '<svg class="tech-card-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6l4 4 4-4"/></svg>';

  const renderCrossRefs = (catKey) => {
    const refs = crossRefMap[catKey];
    if (!refs) return '';
    return `
      <div class="tech-crossrefs">
        <span class="tech-crossrefs-label">Related hand stitches:</span>
        ${refs.map(name =>
          `<button class="tech-crossref" onclick="switchToHandStitch('${name}')">${linkSvg} ${name}</button>`
        ).join('')}
      </div>
    `;
  };

  const renderTechCards = (techs) => techs.map(t => `
    <div class="tech-card tech-card-collapsed" onclick="toggleTechCard(this)">
      <div class="tech-card-svg">${t.svg}</div>
      <div class="tech-card-body">
        <div class="tech-card-header">
          <div>
            <h4>${t.name}</h4>
            ${t.aka ? `<div class="tech-aka">${t.aka}</div>` : ''}
          </div>
          ${chevronSvg}
        </div>
        <p>${t.desc}</p>
        <div class="tech-card-details">
          <ol class="tech-steps">
            ${t.steps.map(s => `<li>${s}</li>`).join('')}
          </ol>
          <div class="tech-when"><strong>When to use:</strong> ${t.whenToUse}</div>
          ${t.fabricNote ? `<div class="tech-fabric-note">${t.fabricNote}</div>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Render hand stitching with group headers
  const renderHandStitchingCards = (cat) => {
    const groups = cat.groups || [];
    if (!groups.length) return renderTechCards(cat.techniques);

    let html = '';
    let idx = 0;
    for (const group of groups) {
      const groupTechs = cat.techniques.slice(idx, idx + group.count);
      html += `
        <div class="tech-group">
          <div class="tech-group-header">
            <h3 class="tech-group-title">${group.label}</h3>
            <p class="tech-group-desc">${group.desc}</p>
          </div>
          ${renderTechCards(groupTechs)}
        </div>
      `;
      idx += group.count;
    }
    return html;
  };

  container.innerHTML = `
    <div class="sub-tabs">
      ${categories.map(([key, cat], i) =>
        `<button class="sub-tab${i === 0 ? ' active' : ''}" data-cat="${key}">${shortLabels[key] || cat.label}</button>`
      ).join('')}
    </div>

    ${categories.map(([key, cat], i) => `
      <div class="sub-tab-content${i === 0 ? ' active' : ''}" data-cat="${key}">
        ${key === 'handStitching' ? renderHandStitchingCards(cat) : renderTechCards(cat.techniques)}
        ${renderCrossRefs(key)}
      </div>
    `).join('')}

    <p class="tech-planner-note">
      Looking for the <strong>Seam Finish Recommender</strong> or <strong>Interfacing Guide</strong>?
      Those tools have moved to the <a href="#projects">Project Planner</a>.
    </p>
  `;

  bindSubTabs(container, 'cat');
}

// Toggle technique card expand/collapse
// Bind click listeners for sub-tab switching. attr is the data attribute name
// used on both .sub-tab (data-<attr>) and .sub-tab-content (data-<attr>).
function bindSubTabs(container, attr) {
  container.querySelectorAll('.sub-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const val = tab.dataset[attr];
      container.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.sub-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      container.querySelector(`.sub-tab-content[data-${attr}="${val}"]`).classList.add('active');
    });
  });
}

function toggleTechCard(card) {
  card.classList.toggle('tech-card-collapsed');
}

// Switch to Hand Stitching sub-tab and scroll to a specific stitch
function switchToHandStitch(stitchName) {
  const container = document.getElementById('techniquesView');
  // Activate the handStitching sub-tab
  container.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
  container.querySelectorAll('.sub-tab-content').forEach(c => c.classList.remove('active'));
  const hsTab = container.querySelector('.sub-tab[data-cat="handStitching"]');
  const hsContent = container.querySelector('.sub-tab-content[data-cat="handStitching"]');
  if (hsTab) hsTab.classList.add('active');
  if (hsContent) {
    hsContent.classList.add('active');
    // Find and highlight the matching stitch card
    const cards = hsContent.querySelectorAll('.tech-card');
    for (const card of cards) {
      const h4 = card.querySelector('h4');
      if (h4 && h4.textContent.trim() === stitchName) {
        // Expand the card
        card.classList.remove('tech-card-collapsed');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('tech-card-highlight');
        setTimeout(() => card.classList.remove('tech-card-highlight'), 2000);
        break;
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════
// CONSTRUCTION (Collars, Waistbands, Cuffs, Closures)
// ═══════════════════════════════════════════════════════════════

function toggleConstructionVariations(btn) {
  btn.classList.toggle('open');
  const panel = btn.nextElementSibling;
  panel.classList.toggle('open');
}

function renderConstructionView() {
  const container = document.getElementById('constructionView');
  const categories = Object.entries(CONSTRUCTION_DETAILS);

  const linkSvg = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12l8-8M4 4h8v8"/></svg>';

  const renderVariations = (variations) => {
    if (!variations || variations.length === 0) return '';
    return `
      <button class="cons-variations-toggle" onclick="toggleConstructionVariations(this)">
        <svg class="chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4l4 4-4 4"/></svg>
        ${variations.length} Variation${variations.length !== 1 ? 's' : ''}
      </button>
      <div class="cons-variations-panel">
        ${variations.map(v => `
          <div class="variation-card">
            <div class="variation-svg">${v.svg || ''}</div>
            <div class="variation-body">
              <h4>${v.name}</h4>
              ${v.aka ? `<div class="var-aka">${v.aka}</div>` : ''}
              <p>${v.desc}</p>
              <div class="variation-badges">
                ${(v.uses || []).map(u => `<span class="var-badge use">${u}</span>`).join('')}
                ${v.difficulty ? `<span class="var-badge skill">${v.difficulty}</span>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  };

  const renderCard = (item) => `
    <div class="cons-card" id="cons-${item.id}">
      <div class="cons-card-main">
        <div class="cons-card-svg">${item.svg || ''}</div>
        <div class="cons-card-body">
          <h3>${item.name}</h3>
          ${item.aka ? `<div class="cons-aka">${item.aka}</div>` : ''}
          <div class="cons-badges">
            <span class="cons-badge ${item.difficulty.toLowerCase()}">${item.difficulty}</span>
            ${(item.bestFabrics || []).map(f => `<span class="cons-badge fabric">${f}</span>`).join('')}
          </div>
          <p>${item.desc}</p>
          <ol class="cons-steps">
            ${item.steps.map(s => `<li>${s}</li>`).join('')}
          </ol>
          <div class="cons-when"><strong>When to use:</strong> ${item.whenToUse}</div>
          ${item.fabricNote ? `<div class="cons-fabric-note">${item.fabricNote}</div>` : ''}
          ${item.tools && item.tools.length > 0 ? `
            <div class="cons-tools">
              <strong>Tools: </strong>
              ${item.tools.map(t => `<span class="cons-tool-pill">${t}</span>`).join('')}
            </div>
          ` : ''}
          ${(item.techniqueLinks && item.techniqueLinks.length > 0) || (item.projectLinks && item.projectLinks.length > 0) ? `
            <div class="cons-links">
              ${(item.techniqueLinks || []).map(l => `<a class="cons-link" href="#reference?mode=techniques">${linkSvg} ${l}</a>`).join('')}
              ${(item.projectLinks || []).map(l => `<a class="cons-link" href="#projects">${linkSvg} ${l}</a>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>
      ${renderVariations(item.variations)}
    </div>
  `;

  container.innerHTML = `
    <div class="sub-tabs">
      ${categories.map(([key, cat], i) =>
        `<button class="sub-tab${i === 0 ? ' active' : ''}" data-cat="${key}">${cat.label}</button>`
      ).join('')}
    </div>

    ${categories.map(([key, cat], i) => `
      <div class="sub-tab-content${i === 0 ? ' active' : ''}" data-cat="${key}">
        ${cat.items.map(item => renderCard(item)).join('')}
      </div>
    `).join('')}
  `;

  bindSubTabs(container, 'cat');
}


// ═══════════════════════════════════════════════════════════════
// WEAVES & KNITS
// ═══════════════════════════════════════════════════════════════

function renderWeavesView() {
  const container = document.getElementById('weavesView');

  const renderCards = (items) => items.map(w => `
    <div class="weave-card">
      <div class="weave-card-svg">${w.svg}</div>
      <div class="weave-card-body">
        <h4>${w.name}</h4>
        ${w.aka ? `<div class="weave-aka">${w.aka}</div>` : ''}
        <p>${w.desc}</p>
        ${w.sewingNotes ? `<p><strong>Sewing notes:</strong> ${autoGlink(w.sewingNotes)}</p>` : ''}
        ${w.examples ? `<p><strong>Common fabrics:</strong> ${w.examples}</p>` : ''}
        ${w.traits ? `
          <div class="weave-traits">
            ${w.traits.pros.map(t => `<span class="weave-trait pro">✓ ${t}</span>`).join('')}
            ${w.traits.cons.map(t => `<span class="weave-trait con">✗ ${t}</span>`).join('')}
            ${w.traits.neutral.map(t => `<span class="weave-trait neutral">${t}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');

  const renderGrainCards = (items) => items.map(g => `
    <div class="grain-diagram">
      <h4>${g.name}</h4>
      <div class="grain-diagram-grid">
        <div class="grain-diagram-svg">${g.svg}</div>
        <div class="grain-text">
          <p>${g.desc}</p>
          <p><strong>How to find it:</strong> ${g.howToFind}</p>
          <p><strong>Why it matters for sewing:</strong> ${g.whyItMatters}</p>
        </div>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="weaves-intro">
      <h3>Woven vs. Knit: The Two Families of Fabric</h3>
      <p><strong>${glink('woven', 'Woven fabrics')}</strong> are made by interlacing two sets of threads (${glink('warp', 'warp')} and ${glink('weft', 'weft')}) at right angles on a loom. They are generally stable, don't stretch much, and fray at cut edges. Quilting cotton, denim, linen, and silk charmeuse are all woven.</p>
      <p style="margin-top:8px"><strong>${glink('knit', 'Knit fabrics')}</strong> are made by interlocking loops of yarn, like a hand-knitted scarf but on an industrial scale. They stretch, conform to the body, and don't fray — but the cut edges can curl. T-shirts, leggings, and sweatshirts are all knit.</p>
      <p style="margin-top:8px">Knowing which family your fabric belongs to is the single most important thing for choosing the right needle, stitch, and seam finish.</p>
    </div>

    <div class="sub-tabs">
      <button class="sub-tab active" data-section="wovens">Woven Structures</button>
      <button class="sub-tab" data-section="knits">Knit Structures</button>
      <button class="sub-tab" data-section="grain">Grain & Layout</button>
    </div>

    <div class="sub-tab-content active" data-section="wovens">
      <div class="beginner-tips">
        <h4>Beginner Tip — Woven Fabrics</h4>
        <ul>
          <li><strong>Always pre-wash</strong> cotton and linen wovens before cutting — they shrink.</li>
          <li><strong>Cut on ${glink('grain', 'grain')}.</strong> The ${glink('grain', 'grain line')} arrow on your pattern should be parallel to the ${glink('selvage', 'selvage')}.</li>
          <li><strong>Finish ${glink('raw-edge', 'raw edges')}</strong> to prevent fraying — zigzag, serge, or pinking shears.</li>
          <li>When in doubt about ${glink('right-side', 'right/wrong side')}, the ${glink('selvage', 'selvage')} often has tiny printed color dots — those face up on the right side.</li>
        </ul>
      </div>
      ${renderCards(WEAVE_DATA.wovens)}
    </div>

    <div class="sub-tab-content" data-section="knits">
      <div class="beginner-tips">
        <h4>Beginner Tip — Knit Fabrics</h4>
        <ul>
          <li><strong>Use a ${glink('ballpoint-needle', 'ballpoint/jersey needle')}.</strong> It pushes between loops instead of piercing them — prevents runs and holes.</li>
          <li><strong>Seams need to stretch.</strong> Use a zigzag, stretch stitch, or serger. A regular straight stitch will pop when the fabric stretches.</li>
          <li><strong>Don't stretch the fabric</strong> as it feeds through your machine — let the ${glink('feed-dogs', 'feed dogs')} do the work.</li>
          <li><strong>Start with interlock</strong> if you're new to knits. It behaves the most like a woven and is very forgiving.</li>
          <li>Knit fabrics don't fray, so raw edges are okay inside casual garments. No finishing required.</li>
        </ul>
      </div>
      ${renderCards(WEAVE_DATA.knits)}
    </div>

    <div class="sub-tab-content" data-section="grain">
      <div class="beginner-tips">
        <h4>Beginner Tip — Grain</h4>
        <ul>
          <li><strong>${glink('grain', 'Grain')} = thread direction.</strong> Every woven fabric has three grains: lengthwise, cross, and ${glink('bias', 'bias')}.</li>
          <li>The <strong>${glink('grain', 'grain line')} arrow</strong> on your sewing pattern tells you which direction to align the fabric. Follow it.</li>
          <li>Cutting off-grain can make your finished garment twist, hang unevenly, or not fit as expected.</li>
          <li>If your fabric came off the ${glink('bolt', 'bolt')} looking skewed, you can straighten it by pulling gently on the true ${glink('bias', 'bias')} before cutting.</li>
        </ul>
      </div>
      ${renderGrainCards(WEAVE_DATA.grain)}

      <div class="grain-diagram">
        <h4>Knit Grain — It's Different</h4>
        <div class="grain-text" style="max-width:100%">
          <p>Knit fabrics also have grain, but it works differently. The <strong>lengthwise grain</strong> runs along the length of the fabric (parallel to the selvage, in the direction of the knitted "wales" or columns). The <strong>crosswise grain</strong> runs across the width (the direction of the "courses" or rows).</p>
          <p><strong>Key difference:</strong> In most knits, the <strong>greatest stretch runs crosswise</strong> (across the body). Patterns for knits will often show a stretch arrow indicating which direction the stretch should go — typically horizontally around the body.</p>
          <p><strong>How to find the grain on a knit:</strong> Look at the fabric closely. You'll see tiny V shapes (on jersey). The Vs run in columns — that's your lengthwise grain. The rows of Vs running across are your crosswise grain. If the fabric has a selvage, lengthwise runs parallel to it, same as wovens.</p>
        </div>
      </div>

      <div class="grain-diagram">
        <h4>How to Straighten Fabric Before Cutting</h4>
        <div class="grain-text" style="max-width:100%">
          <p><strong>Step 1: Find the crosswise grain.</strong> Near the cut end, clip into the selvage and pull a single crosswise thread. Follow it across the fabric — this line is your true cross-grain. Cut along this line for a straight edge.</p>
          <p><strong>Step 2: Check for skew.</strong> Fold the fabric in half, selvage to selvage. If the crosswise edges don't line up, your fabric is off-grain (skewed).</p>
          <p><strong>Step 3: Straighten.</strong> Pull firmly on the short diagonal (the bias direction that is too tight). Steam press while pulling. The fabric should relax back into square alignment. For stubborn fabrics, dampen, pull, and let dry flat.</p>
          <p><strong>Not all fabrics can be straightened.</strong> Printed fabrics where the print is not aligned to the grain are a common frustration. You'll have to choose: follow the grain (pattern may look crooked) or follow the print (grain will be off). For most garments, follow the print.</p>
        </div>
      </div>
    </div>
  `;

  bindSubTabs(container, 'section');
}


// ═══════════════════════════════════════════════════════════════
// GLOSSARY
// ═══════════════════════════════════════════════════════════════

function renderGlossaryView() {
  const container = document.getElementById('glossaryView');
  const sorted = [...GLOSSARY_DATA, ...COMMERCIAL_GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));

  const groups = {};
  sorted.forEach(entry => {
    const letter = entry.term[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(entry);
  });

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const activeLetters = new Set(Object.keys(groups));

  container.innerHTML = `
    <div class="glossary-search-bar">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
      <input type="text" placeholder="Search terms…" id="glossarySearchInput">
    </div>

    <div class="glossary-alpha-bar">
      ${letters.map(l =>
        `<button class="glossary-alpha-btn${activeLetters.has(l) ? '' : ' disabled'}" data-letter="${l}">${l}</button>`
      ).join('')}
    </div>

    <div class="glossary-count">${sorted.length} terms</div>

    <div id="glossaryEntries">
      ${Object.entries(groups).sort().map(([letter, entries]) => `
        <div class="glossary-letter-group" id="glossary-group-${letter}">
          <div class="glossary-letter-heading">${letter}</div>
          ${entries.map(e => `
            <div class="glossary-entry${e.isFabricName ? ' glossary-fabric-name' : ''}" id="glossary-${e.id}">
              <div class="glossary-term">${e.term}${e.isFabricName ? `<span class="glossary-fiber-badge" style="background:${FIBERS[e.fiberKey]?.accent || '#888'}22;color:${FIBERS[e.fiberKey]?.accent || '#888'}">${FIBERS[e.fiberKey]?.name || ''}</span>` : ''}</div>
              <div class="glossary-def">${e.def}</div>
              ${e.seeAlso && e.seeAlso.length > 0 ? `
                <div class="glossary-see-also">See also: ${e.seeAlso.map(ref => {
                  const refEntry = GLOSSARY_DATA.find(g => g.id === ref);
                  return refEntry
                    ? `<a onclick="navigateToGlossary('${ref}')">${refEntry.term}</a>`
                    : ref;
                }).join(', ')}</div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;

  // Search functionality
  const searchInput = document.getElementById('glossarySearchInput');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    const entries = container.querySelectorAll('.glossary-entry');
    const letterGroups = container.querySelectorAll('.glossary-letter-group');

    if (!query) {
      entries.forEach(e => e.style.display = '');
      letterGroups.forEach(g => g.style.display = '');
      container.querySelector('.glossary-count').textContent = `${sorted.length} terms`;
      return;
    }

    let visibleCount = 0;
    entries.forEach(e => {
      const term = e.querySelector('.glossary-term').textContent.toLowerCase();
      const def = e.querySelector('.glossary-def').textContent.toLowerCase();
      const match = term.includes(query) || def.includes(query);
      e.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    letterGroups.forEach(g => {
      const hasVisible = [...g.querySelectorAll('.glossary-entry')].some(e => e.style.display !== 'none');
      g.style.display = hasVisible ? '' : 'none';
    });

    container.querySelector('.glossary-count').textContent = `${visibleCount} term${visibleCount !== 1 ? 's' : ''} matching "${searchInput.value}"`;
  });

  // Alpha bar click
  container.querySelectorAll('.glossary-alpha-btn:not(.disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      const letter = btn.dataset.letter;
      const group = document.getElementById('glossary-group-' + letter);
      if (group) {
        searchInput.value = '';
        container.querySelectorAll('.glossary-entry').forEach(e => e.style.display = '');
        container.querySelectorAll('.glossary-letter-group').forEach(g => g.style.display = '');
        container.querySelector('.glossary-count').textContent = `${sorted.length} terms`;

        group.scrollIntoView({ behavior: 'smooth', block: 'start' });
        container.querySelectorAll('.glossary-alpha-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  });
}


// ═══════════════════════════════════════════════════════════════
// URL PARAMETER HANDLING (incoming cross-tool links)
// ═══════════════════════════════════════════════════════════════

function handleUrlParams() {
  const params = new URLSearchParams(window.location.search);

  // #reference?fiber=silk → open fiber detail
  const fiber = params.get('fiber');
  if (fiber && FIBERS[fiber]) {
    showFiberDetail(fiber);
    return;
  }

  // #reference?compare=silk,wool → activate compare segment with pre-selected fibers
  const compareParam = params.get('compare');
  if (compareParam) {
    const keys = compareParam.split(',').filter(k => FIBERS[k]);
    if (keys.length >= 2) {
      selectedCompare.clear();
      keys.slice(0, 4).forEach(k => selectedCompare.add(k));
      setFiberSegMode('compare');
      updateCompare();
      return;
    }
  }

  // #reference?blend=cotton,linen → activate blend segment with pre-selected fibers
  const blendParam = params.get('blend');
  if (blendParam) {
    const keys = blendParam.split(',').filter(k => FIBERS[k]);
    if (keys.length === 2) {
      blendSelectedFibers = keys;
      document.getElementById('blendRatioSlider').value = 50;
      blendRatio = 50;
      setFiberSegMode('blend');
      updateBlendUI();
      return;
    }
  }

  // #reference?glossary=selvage → open glossary and highlight
  const glossaryTerm = params.get('glossary');
  if (glossaryTerm) {
    navigateToGlossary(glossaryTerm);
    return;
  }

  // #reference?construction=collars → open construction mode with category tab
  const consCat = params.get('construction');
  if (consCat) {
    const btn = document.querySelector('.sidebar-mode-btn[data-mode="construction"]');
    if (btn) {
      document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showView('construction');
      const catTab = document.querySelector(`#constructionView .sub-tab[data-cat="${consCat}"]`);
      if (catTab) catTab.click();
    }
    return;
  }

  // #reference?detail=standCollar → open construction mode and scroll to item
  const detail = params.get('detail');
  if (detail) {
    const btn = document.querySelector('.sidebar-mode-btn[data-mode="construction"]');
    if (btn) {
      document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showView('construction');
      // Find the item and activate its category tab
      for (const [catKey, cat] of Object.entries(CONSTRUCTION_DETAILS)) {
        const found = cat.items.find(it => it.id === detail);
        if (found) {
          const catTab = document.querySelector(`#constructionView .sub-tab[data-cat="${catKey}"]`);
          if (catTab) catTab.click();
          setTimeout(() => {
            const el = document.getElementById('cons-' + detail);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              el.style.boxShadow = '0 0 0 3px rgba(139,107,74,0.3)';
              setTimeout(() => { el.style.boxShadow = ''; }, 2000);
            }
          }, 100);
          break;
        }
      }
    }
    return;
  }

  // #reference?mode=weaves → switch to mode
  // Also handle legacy mode=compare and mode=blends
  const mode = params.get('mode');
  if (mode === 'compare') {
    setFiberSegMode('compare');
    return;
  }
  if (mode === 'blends') {
    setFiberSegMode('blend');
    return;
  }
  if (mode && MODE_INFO[mode]) {
    const btn = document.querySelector(`.sidebar-mode-btn[data-mode="${mode}"]`);
    if (btn) {
      document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showView(mode);
    }
  }
}


// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════

renderFiberGrid();
renderTabPanels();
initTabs();
initSegControl();
setFiberSegMode('browse');
initBlendSlider();
initModes();
initPrintUtility();
renderWeavesView();
renderTechniquesView();
renderConstructionView();
renderGlossaryView();
handleUrlParams();

// Expose functions used by inline onclick handlers to window scope
window.navigateToGlossary = navigateToGlossary;
window.toggleCareAccordion = toggleCareAccordion;
window.switchDetailTab = switchDetailTab;
window.printCurrentFiber = printCurrentFiber;
window.printAllFibers = printAllFibers;
window.togglePropLegend = togglePropLegend;
window.updateOverviewForVariety = updateOverviewForVariety;
window.toggleVarietyCard = toggleVarietyCard;
window.navigateToCompare = navigateToCompare;
window.navigateToBlend = navigateToBlend;
window.showFiberDetail = showFiberDetail;
window.switchToHandStitch = switchToHandStitch;
window.toggleTechCard = toggleTechCard;
window.toggleConstructionVariations = toggleConstructionVariations;

})(); // end tool-reference IIFE
