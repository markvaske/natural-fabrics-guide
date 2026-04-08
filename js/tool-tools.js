// Tool: Tools — loaded by router on first visit to #tools
// Data globals (FIBERS, NEEDLE_DATA, etc.) are assigned by router before this runs.
(function() {
// ═══════════════════════════════════════════════════════════════
// MODE NAVIGATION
// ═══════════════════════════════════════════════════════════════

const MODE_INFO = {
  machines:  { title: 'Machines', desc: 'Threading, troubleshooting, maintenance, and settings for sewing machines, sergers, and cover stitch machines', view: 'machinesView' },
  cutting:   { title: 'Cutting', desc: 'Scissors, rotary cutters, mats, and cutting techniques for natural fabrics', view: 'cuttingView' },
  measuring: { title: 'Measuring', desc: 'Rulers, tape measures, gauges, and measuring techniques', view: 'measuringView' },
  pressing:  { title: 'Pressing', desc: 'Irons, steamers, pressing tools, and heat settings by fabric', view: 'pressingView' },
  marking:   { title: 'Marking', desc: 'Chalk, pens, tracing wheels, and marking methods by fabric type', view: 'markingView' },
  needles:   { title: 'Needles', desc: 'Hand-sewing needles — types, sizes, and when to use each', view: 'needlesView' }
};

const ALL_VIEW_IDS = Object.values(MODE_INFO).map(m => m.view);

function showView(mode) {
  const info = MODE_INFO[mode];
  if (!info) return;
  ALL_VIEW_IDS.forEach(id => document.getElementById(id).classList.remove('active'));
  document.getElementById(info.view).classList.add('active');
}

function initModes() {
  // Register with shell for mode switching
  shellRegisterTool('tools', { showView: showView });
}


// ═══════════════════════════════════════════════════════════════
// MACHINE TYPE SEGMENTED CONTROL
// ═══════════════════════════════════════════════════════════════

function renderMachineSegControl() {
  return `
    <div class="seg-control machine-seg-control">
      ${Object.entries(MACHINE_TYPES).map(([key, m]) => `
        <button class="seg-btn machine-seg-btn" data-machine="${key}">
          ${m.name}
        </button>
      `).join('')}
    </div>
  `;
}

function wireMachineSegControl(container, onSelect) {
  container.querySelectorAll('.machine-seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.machine-seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onSelect(btn.dataset.machine);
    });
  });
}


// ═══════════════════════════════════════════════════════════════
// MACHINES MODE — chip selector + sub-sections
// ═══════════════════════════════════════════════════════════════

const MACHINE_SECTIONS = {
  threading:   { label: 'Threading', icon: '🧵' },
  machinefix:  { label: 'Fix It', icon: '🔧' },
  maintenance: { label: 'Maintenance', icon: '🛢' },
  settings:    { label: 'Settings', icon: '⚙️' }
};

let currentMachineKey = null;
let currentMachineSection = 'threading';

function renderMachinesMode() {
  const container = document.getElementById('machinesContent');
  container.innerHTML = `
    <p class="seam-finder-intro">
      Choose your machine type, then explore threading guides, troubleshooting, maintenance schedules, and fabric-specific settings.
    </p>
    ${renderMachineSegControl()}
    <div id="machineSections" style="display:none">
      <div class="tools-section-tabs">
        ${Object.entries(MACHINE_SECTIONS).map(([key, s]) => `
          <button class="tools-section-tab ${key === 'threading' ? 'active' : ''}" data-section="${key}">
            <span class="tools-section-tab-icon">${s.icon}</span>
            <span class="tools-section-tab-label">${s.label}</span>
          </button>
        `).join('')}
      </div>
      <div id="machineSectionContent"></div>
    </div>
  `;

  wireMachineSegControl(container, (machineKey) => {
    currentMachineKey = machineKey;
    document.getElementById('machineSections').style.display = '';
    renderMachineSection(currentMachineSection);
  });

  container.querySelectorAll('.tools-section-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tools-section-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMachineSection = btn.dataset.section;
      renderMachineSection(currentMachineSection);
    });
  });
}

function renderMachineSection(section) {
  if (!currentMachineKey) return;
  const wrap = document.getElementById('machineSectionContent');

  switch (section) {
    case 'threading':
      renderThreadingDetail(wrap, currentMachineKey);
      break;
    case 'machinefix':
      renderMachineFixDetail(wrap, currentMachineKey);
      break;
    case 'maintenance':
      renderMaintenanceDetail(wrap, currentMachineKey);
      break;
    case 'settings':
      renderSettingsDetail(wrap, currentMachineKey);
      break;
  }
}


// ═══════════════════════════════════════════════════════════════
// THREADING GUIDES
// ═══════════════════════════════════════════════════════════════

function renderThreadingDetail(wrap, machineKey) {
  const guides = getThreadingGuide(machineKey);

  wrap.innerHTML = guides.map(guide => `
    <div class="mc-guide-section">
      <h3 class="mc-guide-title">${guide.title}</h3>
      ${guide.prereq ? `<div class="mc-guide-prereq"><strong>Before you start:</strong> ${guide.prereq}</div>` : ''}
      <div class="mc-guide-steps">
        ${guide.steps.map((step, i) => `
          <div class="mc-step">
            <div class="mc-step-number">${i + 1}</div>
            <div class="mc-step-content">
              <div class="mc-step-instruction">${step.instruction}</div>
              ${step.mistake ? `<div class="mc-step-mistake"><strong>Common mistake:</strong> ${step.mistake}</div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
      ${guide.checkTest ? `
        <div class="mc-check-test">
          <strong>✓ Thread path check:</strong> ${guide.checkTest}
        </div>
      ` : ''}
    </div>
  `).join('');
}

function getThreadingGuide(machineKey) {
  const guides = {
    sewing: [
      {
        title: 'Upper Threading',
        prereq: 'Raise the presser foot (this opens the tension discs). Raise the needle to its highest position by turning the handwheel toward you.',
        steps: [
          { instruction: 'Place the thread spool on the spool pin. Use the spool cap to keep it stable — match the cap size to the spool.', mistake: 'No spool cap lets the thread catch on the pin edge, causing uneven feeding and breakage.' },
          { instruction: 'Pull thread through the first thread guide (usually a small metal hook near the top of the machine).', mistake: 'Skipping this guide changes the thread angle to the tension discs and causes tension problems.' },
          { instruction: 'Bring the thread down and between the tension discs. You should feel a slight resistance when the presser foot is down.', mistake: 'If the presser foot was DOWN while threading, the discs were closed and the thread sits on top of them — not between them. This is the #1 cause of loops on the underside.' },
          { instruction: 'Pull the thread up and through the take-up lever — the metal arm that moves up and down. Thread must go through the eye or hook at the top of this lever.', mistake: 'This is the single most skipped step. Missing the take-up lever means the upper thread has no tension control, causing immediate bird-nesting.' },
          { instruction: 'Bring the thread down through the lower thread guides toward the needle.', mistake: 'These small guides near the needle keep the thread in line. Skipping them causes the thread to wander and catch.' },
          { instruction: 'Thread the needle from front to back (on most machines). Pull about 6 inches of thread through and lay it to the back under the presser foot.', mistake: 'Threading the needle the wrong direction means the hook can\'t catch the thread loop. Check your manual — some machines thread left to right.' }
        ],
        checkTest: 'Lower the presser foot and pull the thread gently. You should feel smooth, even resistance. If it pulls freely with no resistance, the thread isn\'t in the tension discs — re-thread with the foot UP.'
      },
      {
        title: 'Bobbin Winding',
        steps: [
          { instruction: 'Place an empty bobbin on the bobbin winding spindle. Push it firmly until it clicks.', mistake: 'A loose bobbin wobbles while winding and creates uneven thread distribution.' },
          { instruction: 'Thread from the spool through the bobbin winding tension disc (a small separate disc, usually on top of the machine). This is different from the main tension.', mistake: 'Skipping the bobbin tension disc means no resistance during winding — the bobbin winds too loosely and tangles in the bobbin case.' },
          { instruction: 'Wrap the thread around the bobbin a few times by hand to anchor it, then clip or hold the tail.', mistake: 'Not anchoring the thread means the first few winds slip and create a loose core.' },
          { instruction: 'Push the bobbin winding spindle to the right (or engage the winding mechanism per your manual). Start the machine at moderate speed.', mistake: 'Winding too fast creates uneven, bulging bobbins that jam in the bobbin case.' },
          { instruction: 'Wind until the bobbin is full (most machines stop automatically). Trim the thread tail from the start.' }
        ],
        checkTest: 'A well-wound bobbin is firm and even with no bulges. Press the thread surface — it shouldn\'t collapse or feel spongy. If it does, re-wind at a slower, steadier speed.'
      },
      {
        title: 'Bobbin Insertion (Top-Load / Drop-In)',
        prereq: 'Remove the bobbin cover plate. Hold the bobbin with the thread trailing in the direction shown by the arrow printed on your machine.',
        steps: [
          { instruction: 'Drop the bobbin into the bobbin case with the thread unwinding in the direction of the arrow (usually counter-clockwise).', mistake: 'Wrong direction means the bobbin unwinds backwards, causing the thread to not be picked up or to tangle immediately.' },
          { instruction: 'Pull the thread into the slit in the bobbin case plate, then under the tension spring until it clicks into position.', mistake: 'If the thread isn\'t under the tension spring, the bobbin has no tension and you\'ll get loops on the top of your fabric.' },
          { instruction: 'Pull about 6 inches of thread tail out and lay it toward the back of the machine.', mistake: 'A short tail gets pulled down into the machine on the first stitch, causing a jam.' },
          { instruction: 'Replace the bobbin cover plate.' }
        ],
        checkTest: 'Hold the thread tail and close the cover. Pull the thread — it should come with gentle, smooth resistance. If it pulls freely or catches, remove and re-seat.'
      }
    ],
    serger: [
      {
        title: '4-Thread Overlock Threading',
        prereq: 'CRITICAL: Thread in this exact order — lower looper → upper looper → right needle → left needle. Wrong order means the threads can\'t interlock properly. Raise the presser foot to open all tension discs.',
        steps: [
          { instruction: '<strong>Lower looper:</strong> Turn the handwheel to move the lower looper to its threading position (check your manual — it\'s usually when the looper is extended to the right). Thread from the cone through its guides and tension disc, then through the looper eye.', mistake: 'Threading with the looper in the wrong position makes it nearly impossible to reach the eye. If you can\'t see or reach it, the looper isn\'t in the right spot — turn the handwheel.' },
          { instruction: '<strong>Upper looper:</strong> Thread from the cone through its guides and tension disc, then through the upper looper eye. The upper looper is usually more accessible than the lower.', mistake: 'Some machines have a built-in threader for the upper looper — use it. Manual threading here is where many people miss a guide.' },
          { instruction: '<strong>Right needle:</strong> Thread from the cone through its guides and tension disc, then down and through the right needle (front to back on most sergers).', mistake: 'Pushing the needle up fully before threading — if it\'s loose, the thread path will be wrong and cause skipping.' },
          { instruction: '<strong>Left needle:</strong> Same path as right needle but through the left needle position.', mistake: 'Accidentally threading both threads through the same needle. The needles are close together — double check.' },
          { instruction: 'Pull all four thread tails to the back, about 6 inches each. Lower the presser foot and turn the handwheel slowly by hand for several complete rotations to form a chain.', mistake: 'Starting the motor without first forming a chain by hand — if something\'s wrong, the motor will jam it before you can react.' }
        ],
        checkTest: 'A properly threaded serger will form a neat chain tail when you turn the handwheel. If one thread isn\'t caught, the chain will have visible gaps or fall apart. Re-thread that specific thread.'
      },
      {
        title: '3-Thread Overlock (Remove One Needle)',
        prereq: 'Remove the right needle for a wider 3-thread stitch, or the left needle for a narrower stitch. Thread order is the same: lower looper → upper looper → remaining needle.',
        steps: [
          { instruction: 'Remove the needle you\'re not using. Loosen the needle clamp screw and pull it down.', mistake: 'Leaving the unused needle in — it will snag thread and cause problems even without being threaded.' },
          { instruction: 'Thread the lower looper, then upper looper, then the remaining needle — same paths as 4-thread.', mistake: 'Using the wrong needle position for your stitch width. Left needle = wider stitch, right needle = narrower stitch.' },
          { instruction: 'Form a chain by hand before running the motor.' }
        ],
        checkTest: 'The 3-thread stitch should form clean loops on both sides of the fabric edge. If loops are only on one side, the looper on the other side isn\'t threaded correctly.'
      },
      {
        title: 'Rolled Hem Setup',
        prereq: 'Start with a working 3-thread configuration (usually right needle + both loopers).',
        steps: [
          { instruction: 'Disengage the stitch finger — this is what makes the fabric edge roll instead of lying flat. Method varies by machine: some have a lever, some require a plate change, some have a removable finger.', mistake: 'Forgetting to disengage the stitch finger is the most common reason a rolled hem won\'t roll.' },
          { instruction: 'Set stitch length to 1.0–2.0 mm (much shorter than normal overlock).', mistake: 'Leaving stitch length at 3.0+ mm — rolled hems need short, tight stitches to wrap the edge.' },
          { instruction: 'Increase lower looper tension to 6–8 (high). This is what pulls the fabric edge over to form the roll.', mistake: 'Keeping normal tension — without high lower looper tension, the fabric won\'t roll.' },
          { instruction: 'Optionally switch the upper looper thread to woolly nylon for better coverage and a softer roll.', mistake: 'Using heavy thread in the upper looper — it\'s too stiff to wrap the rolled edge neatly.' },
          { instruction: 'Test on a scrap of your actual project fabric. Adjust lower looper tension until the roll is tight and consistent.' }
        ],
        checkTest: 'The fabric edge should be completely enclosed in thread with no raw edge visible. The underside should show a neat row of lower looper stitches pulling the roll tight.'
      }
    ],
    coverstitch: [
      {
        title: 'Needle Threading (2 or 3 needles)',
        prereq: 'Raise the presser foot. Raise all needles to their highest position. Cover stitch machines are extremely sensitive to threading — every guide matters.',
        steps: [
          { instruction: 'Place thread cones on the spool holders. Use thread nets if provided — they prevent thread from catching.', mistake: 'Skipping thread nets on cones — the thread catches on the cone edge and creates tension spikes that cause skipping.' },
          { instruction: 'Thread each needle from its cone through its dedicated thread path — each needle has its own set of guides and its own tension disc. Follow the color-coded paths printed on your machine.', mistake: 'Cross-threading the needle paths — each needle MUST go through its own tension disc, not share with another.' },
          { instruction: 'Thread the needles front to back (on most machines). Use both needles for standard cover stitch, or add the center needle for triple cover stitch.', mistake: 'Not pushing needles up fully — even 1mm of play changes the timing relationship with the looper and causes skipping.' },
          { instruction: 'Pull all needle thread tails to the back, about 6 inches each.' }
        ],
        checkTest: 'Tug each needle thread individually with the presser foot down. Each should have smooth, even resistance. If one is free or catches, that thread isn\'t in its tension disc.'
      },
      {
        title: 'Looper Threading (from below)',
        prereq: 'The cover stitch looper threads from below the throat plate — this is the most unintuitive part. Turn the handwheel to position the looper for threading (check your manual for the exact position).',
        steps: [
          { instruction: 'Thread from the cone through the looper thread guides (usually on the left side or bottom of the machine) and through the looper tension disc.', mistake: 'Threading the looper through a needle tension disc instead of the looper disc — they look similar but are in different positions.' },
          { instruction: 'Guide the thread through the looper\'s thread path below the throat plate. Many machines have a built-in threader — a long wire hook that you push through the looper eye, hook the thread, and pull back.', mistake: 'If your machine has a built-in looper threader, USE IT. Manual threading of a cover stitch looper is extremely difficult and the #1 reason people give up on cover stitch machines.' },
          { instruction: 'Pull the looper thread tail out the back of the machine, about 6 inches.', mistake: 'Leaving a short tail — the looper needs thread to grab when forming the first chain stitch.' },
          { instruction: 'With all threads in place, lower the presser foot and slowly turn the handwheel by hand to form a chain on scrap fabric.', mistake: 'Starting the motor without testing by hand first — if the looper isn\'t catching, the motor will jam everything instantly.' }
        ],
        checkTest: 'A properly threaded cover stitch will show parallel needle rows on top and a looper chain on the underside. If the chain isn\'t forming underneath, the looper isn\'t catching — re-thread it with the looper in the correct threading position.'
      },
      {
        title: 'Chain Stitch Configuration',
        prereq: 'Chain stitch uses one needle + the looper (no second needle row). Remove extra needles.',
        steps: [
          { instruction: 'Install only the left needle (or whichever position your manual specifies for chain stitch). Remove other needles.', mistake: 'Leaving extra needles in — they\'ll snag thread even without being threaded.' },
          { instruction: 'Thread the single needle and the looper following the same paths as cover stitch.', mistake: 'Using the wrong needle position — chain stitch typically uses the leftmost needle position.' },
          { instruction: 'Test on scrap fabric. You should see a single straight stitch on top and a chain of interlocking loops on the bottom.' }
        ],
        checkTest: 'Pull the chain stitch — it should unravel easily from the end (that\'s normal, it\'s how chain stitch works). This is why you need to secure chain stitch ends by backstitching or tying off.'
      }
    ]
  };
  return guides[machineKey] || [];
}


// ═══════════════════════════════════════════════════════════════
// FIX IT (MACHINE TROUBLESHOOTER)
// ═══════════════════════════════════════════════════════════════

function renderMachineFixDetail(wrap, machineKey) {
  const data = MACHINE_TROUBLESHOOT[machineKey];
  if (!data) { wrap.innerHTML = ''; return; }

  wrap.innerHTML = `
    <div class="ts-categories" id="mcFixCategories">
      ${Object.entries(data).map(([key, cat]) =>
        `<button class="ts-category-btn" data-cat="${key}">
          <span class="ts-cat-icon">${cat.icon}</span>
          <span class="ts-cat-label">${cat.label}</span>
        </button>`
      ).join('')}
    </div>
    <div id="mcFixProblems"></div>
  `;

  wrap.querySelectorAll('.ts-category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('.ts-category-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      showMachineFixProblems(machineKey, btn.dataset.cat);
    });
  });
}

function showMachineFixProblems(machineKey, catKey) {
  const cat = MACHINE_TROUBLESHOOT[machineKey][catKey];
  const wrap = document.getElementById('mcFixProblems');

  wrap.innerHTML = cat.problems.map((p, i) => {
    const linksHtml = buildMachineLinks(p.links);
    return `
      <div class="ts-problem-card">
        <button class="ts-problem-header" data-idx="${i}">
          <span class="ts-problem-title">${p.symptom}</span>
          <span class="ts-chevron">▸</span>
        </button>
        <div class="ts-problem-body" id="mcProblem_${catKey}_${i}">
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
      wrap.querySelectorAll('.ts-problem-card').forEach(c => c.classList.remove('open'));
      if (!wasOpen) card.classList.add('open');
    });
  });

  // Auto-open first
  const first = wrap.querySelector('.ts-problem-card');
  if (first) first.classList.add('open');
}

function buildMachineLinks(links) {
  if (!links) return '';
  const parts = [];
  if (links.threading) {
    const machineLabel = MACHINE_TYPES[links.threading]?.name || 'your machine';
    parts.push(`<a href="#" class="ts-link" onclick="event.preventDefault(); document.querySelector('.tools-section-tab[data-section=\\'threading\\']').click();">See ${machineLabel} threading guide →</a>`);
  }
  if (links.maintenance) {
    parts.push(`<a href="#" class="ts-link" onclick="event.preventDefault(); document.querySelector('.tools-section-tab[data-section=\\'maintenance\\']').click();">Check maintenance schedule →</a>`);
  }
  if (links.fiber) {
    parts.push(`<a href="#reference" class="ts-link">Look up fabric details in Reference →</a>`);
  }
  return parts.join('');
}


// ═══════════════════════════════════════════════════════════════
// MAINTENANCE
// ═══════════════════════════════════════════════════════════════

function renderMaintenanceDetail(wrap, machineKey) {
  const data = MACHINE_MAINTENANCE[machineKey];
  if (!data) { wrap.innerHTML = ''; return; }

  wrap.innerHTML = `
    ${data.schedule.map(tier => `
      <div class="mc-maint-tier">
        <h3 class="mc-maint-tier-title">
          <span class="mc-maint-tier-icon">${tier.icon}</span>
          ${tier.frequency}
        </h3>
        <div class="mc-maint-tasks">
          ${tier.tasks.map(t => `
            <div class="mc-maint-task">
              <div class="mc-maint-task-name">${t.task}</div>
              <div class="mc-maint-task-detail">${t.detail}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}

    <div class="mc-donot-section">
      <h3 class="mc-donot-title">⛔ Never Do This</h3>
      <ul class="mc-donot-list">
        ${data.doNot.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </div>
  `;
}


// ═══════════════════════════════════════════════════════════════
// SETTINGS REFERENCE
// ═══════════════════════════════════════════════════════════════

const MACHINE_SETTINGS_DATA = {
  sewing: {
    label: 'Sewing Machine',
    fabrics: [
      {
        name: 'Lightweight Wovens',
        examples: 'Chiffon, voile, batiste, lawn, organza',
        settings: {
          needle: 'Sharp/Microtex 60/8 or 70/10',
          stitch: '2.0–2.5 mm straight stitch',
          tension: '3–4 (slightly lower than default)',
          foot: 'Standard presser foot, reduced pressure',
          speed: 'Slow to moderate',
          tips: 'Use tissue paper or wash-away stabilizer underneath to prevent puckering. Start with a scrap test. Consider a single-hole throat plate for straight stitching.'
        }
      },
      {
        name: 'Medium-Weight Wovens',
        examples: 'Quilting cotton, linen, poplin, chambray, twill',
        settings: {
          needle: 'Universal 80/12',
          stitch: '2.5–3.0 mm straight stitch',
          tension: '4–5 (default)',
          foot: 'Standard presser foot, normal pressure',
          speed: 'Moderate to fast',
          tips: 'These are the most forgiving fabrics. Default settings usually work. Press seams as you go.'
        }
      },
      {
        name: 'Heavyweight Wovens',
        examples: 'Denim, canvas, duck, upholstery fabric, heavy linen',
        settings: {
          needle: 'Denim 90/14 or 100/16',
          stitch: '3.0–3.5 mm straight stitch',
          tension: '4–5',
          foot: 'Walking foot for multiple layers, standard for single',
          speed: 'Slow and steady',
          tips: 'Reduce speed through seam intersections. Use a denim needle — it has a sharp, strong point designed for dense weaves. Hammer thick seam intersections flat before sewing over them.'
        }
      },
      {
        name: 'Knits (Stretchy)',
        examples: 'Jersey, interlock, rib knit, ponte, swimwear',
        settings: {
          needle: 'Ballpoint/Jersey 75/11 or 80/12, or Stretch needle for very stretchy knits',
          stitch: 'Zigzag (2.0 width, 2.5 length) or lightning bolt stretch stitch',
          tension: '3–4 (slightly looser)',
          foot: 'Walking foot or Teflon foot',
          speed: 'Moderate',
          tips: 'Never use a straight stitch on knits — it pops when the fabric stretches. Use a stretch or zigzag stitch. A walking foot prevents the top layer from shifting. Use woolly nylon in the bobbin for maximum stretch in hems.'
        }
      },
      {
        name: 'Silk & Delicates',
        examples: 'Silk charmeuse, silk chiffon, satin, crêpe de Chine',
        settings: {
          needle: 'Sharp/Microtex 60/8 or 65/9',
          stitch: '2.0 mm straight stitch',
          tension: '2–3 (low)',
          foot: 'Standard foot, very low pressure, or Teflon foot',
          speed: 'Slow',
          tips: 'Test on scraps first — always. Use silk pins (very fine) or clips. Tissue paper under and over the fabric prevents shifting. French seams are the cleanest finish for silk.'
        }
      },
      {
        name: 'Leather & Faux Leather',
        examples: 'Leather, suede, vinyl, faux leather, oilcloth',
        settings: {
          needle: 'Leather 90/14 or 100/16 (wedge-point)',
          stitch: '3.0–3.5 mm straight stitch',
          tension: '4–5',
          foot: 'Teflon foot, roller foot, or walking foot — never standard metal foot',
          speed: 'Slow',
          tips: 'Every needle hole is permanent — no seam ripping and re-sewing. Use clips instead of pins. A Teflon, roller, or walking foot is essential — standard feet stick to the surface and won\'t feed. Use longer stitches to avoid perforating the material.'
        }
      }
    ]
  },
  serger: {
    label: 'Serger / Overlock',
    fabrics: [
      {
        name: 'Lightweight Wovens',
        examples: 'Chiffon, lawn, voile, silk',
        settings: {
          needle: 'Universal 70/10 or 75/11',
          stitch: '4-thread overlock or 3-thread narrow',
          length: '2.0–2.5 mm',
          width: 'Narrow (3.0–4.0 mm)',
          differential: '1.0 (normal) — decrease to 0.7 if puckering',
          tension: 'All tensions lower than default (2–3 range)',
          tips: 'Use a 3-thread narrow overlock for the cleanest edge. Slow and steady speed. Let the knife trim a thin strip — it stabilizes the edge.'
        }
      },
      {
        name: 'Medium-Weight Wovens',
        examples: 'Cotton, linen, quilting cotton, twill',
        settings: {
          needle: 'Universal 80/12',
          stitch: '4-thread overlock',
          length: '2.5–3.0 mm',
          width: 'Standard (5.0–6.0 mm)',
          differential: '1.0 (normal)',
          tension: 'Default settings (3–4 all channels)',
          tips: 'The most forgiving fabric type. Default settings usually work well. Use the 4-thread for strong, flexible seam finishing.'
        }
      },
      {
        name: 'Knits',
        examples: 'Jersey, interlock, ribbing, French terry, swimwear',
        settings: {
          needle: 'Ballpoint/Jersey 75/11 or 80/12',
          stitch: '4-thread overlock (seaming) or 3-thread (finishing)',
          length: '2.5–3.0 mm',
          width: 'Standard (5.0–6.0 mm)',
          differential: '1.3–1.5 (increase to prevent stretching)',
          tension: 'Slightly lower needle tension (2–3), normal looper tension',
          tips: 'Differential feed is your best friend for knits. Increase it until the fabric feeds without stretching or waving. For swimwear, use woolly nylon in the loopers for maximum stretch.'
        }
      },
      {
        name: 'Heavyweight Fabrics',
        examples: 'Denim, fleece, thick knits, coat fabrics',
        settings: {
          needle: 'Universal 90/14',
          stitch: '4-thread overlock',
          length: '3.0–3.5 mm',
          width: 'Wide (6.0–7.0 mm)',
          differential: '1.0 (normal)',
          tension: 'Slightly higher than default (4–5)',
          tips: 'Go slow through thick sections. Don\'t force multiple layers — help them feed gently. Check that the knife can cut through the fabric cleanly; if not, reduce layers.'
        }
      }
    ]
  },
  coverstitch: {
    label: 'Cover Stitch',
    fabrics: [
      {
        name: 'Lightweight Knits',
        examples: 'Single jersey, tissue knits, modal jersey',
        settings: {
          needle: 'Stretch HA×1SP 75/11',
          stitch: '2-needle cover stitch (narrow)',
          length: '2.5–3.0 mm',
          tension: 'Needles: 3–4, Looper: 2–3',
          foot: 'Standard foot, moderate pressure',
          tips: 'Use washaway stabilizer or clear elastic to prevent tunneling. Go slow — lightweight knits show every skip and tension inconsistency.'
        }
      },
      {
        name: 'Medium-Weight Knits',
        examples: 'Interlock, ponte, French terry, sweatshirt fleece',
        settings: {
          needle: 'Stretch HA×1SP 80/12',
          stitch: '2-needle cover stitch (standard width)',
          length: '3.0 mm',
          tension: 'Needles: 4, Looper: 3',
          foot: 'Standard foot, normal pressure',
          tips: 'The most forgiving fabric for cover stitch. Start here to learn your machine. Press the hem fold firmly before stitching.'
        }
      },
      {
        name: 'Heavyweight Knits',
        examples: 'Thick fleece, double knit, neoprene, heavyweight rib',
        settings: {
          needle: 'Stretch HA×1SP 90/14',
          stitch: '2-needle cover stitch (wide)',
          length: '3.5 mm',
          tension: 'Needles: 4–5, Looper: 4',
          foot: 'Standard foot, increased pressure',
          tips: 'Use a longer stitch to reduce bulk. Increase presser foot pressure so the machine grips the fabric firmly. Slow speed prevents skipping on thick layers.'
        }
      },
      {
        name: 'Activewear & Swimwear',
        examples: 'Supplex, swim lycra, performance knits',
        settings: {
          needle: 'Stretch HA×1SP 75/11',
          stitch: '2-needle cover stitch',
          length: '3.0 mm',
          tension: 'Needles: 3, Looper: 2 (lower overall)',
          foot: 'Standard foot, light to moderate pressure',
          tips: 'Use woolly nylon in the looper for maximum stretch recovery. Lower all tensions — these fabrics are thin but stretchy, and too much tension causes tunneling and wave distortion.'
        }
      }
    ]
  }
};

function renderSettingsDetail(wrap, machineKey) {
  const data = MACHINE_SETTINGS_DATA[machineKey];
  if (!data) { wrap.innerHTML = ''; return; }

  wrap.innerHTML = data.fabrics.map((fab, i) => `
    <div class="mc-settings-card ${i === 0 ? 'open' : ''}">
      <button class="mc-settings-header" data-idx="${i}">
        <div>
          <span class="mc-settings-name">${fab.name}</span>
          <span class="mc-settings-examples">${fab.examples}</span>
        </div>
        <span class="ts-chevron">▸</span>
      </button>
      <div class="mc-settings-body">
        <div class="mc-settings-grid">
          ${Object.entries(fab.settings).filter(([k]) => k !== 'tips').map(([key, val]) => `
            <div class="mc-setting-item">
              <div class="mc-setting-label">${formatSettingLabel(key)}</div>
              <div class="mc-setting-value">${val}</div>
            </div>
          `).join('')}
        </div>
        ${fab.settings.tips ? `<div class="mc-settings-tips"><strong>Tips:</strong> ${fab.settings.tips}</div>` : ''}
      </div>
    </div>
  `).join('');

  // Wire accordions
  wrap.querySelectorAll('.mc-settings-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.mc-settings-card');
      const wasOpen = card.classList.contains('open');
      wrap.querySelectorAll('.mc-settings-card').forEach(c => c.classList.remove('open'));
      if (!wasOpen) card.classList.add('open');
    });
  });
}

function formatSettingLabel(key) {
  const labels = {
    needle: 'Needle',
    stitch: 'Stitch',
    tension: 'Tension',
    foot: 'Presser Foot',
    speed: 'Speed',
    length: 'Stitch Length',
    width: 'Stitch Width',
    differential: 'Differential Feed'
  };
  return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
}


// ═══════════════════════════════════════════════════════════════
// CUTTING TOOLS
// ═══════════════════════════════════════════════════════════════

const CUTTING_TOOLS = [
  {
    name: 'Fabric Shears (8"–10")',
    icon: '✂️',
    what: 'Bent-handled, heavy scissors designed exclusively for fabric. The angled lower blade lets fabric lie flat on the table while cutting.',
    use: 'Pattern cutting, long straight cuts, curves',
    tips: [
      'Never use fabric shears on paper, cardboard, or anything non-fabric — it dulls them immediately.',
      'Sharpen every 6–12 months depending on use. A dull pair chews fabric instead of slicing it.',
      'Right-handed and left-handed shears are different tools — the blade overlap is reversed.',
      'Use full blade strokes for smooth cuts. Short choppy snips leave jagged edges.'
    ],
    fabrics: 'All wovens and stable knits. Heavyweight fabrics like denim and canvas need sharp, high-quality shears.'
  },
  {
    name: 'Rotary Cutter (45mm)',
    icon: '🔘',
    what: 'A rolling blade in a handle — like a pizza cutter for fabric. Cuts through multiple layers cleanly and accurately.',
    use: 'Straight lines, gentle curves, cutting through multiple layers at once',
    tips: [
      'Always use with a self-healing cutting mat — the blade will damage any other surface and dull instantly.',
      'Use a clear acrylic ruler as a straight edge guide for precise cuts.',
      'Replace the blade when it starts skipping threads instead of cutting cleanly.',
      'Always retract or cover the blade when setting it down. Rotary blades are extremely sharp.',
      'The 45mm size handles most fabrics. Use 60mm for thick or multiple layers.'
    ],
    fabrics: 'Excellent for quilting cottons, multiple layers of lightweight fabric, and long straight cuts. Less suited for very thick or textured fabrics.'
  },
  {
    name: 'Pinking Shears',
    icon: '✂️',
    what: 'Scissors with zigzag blades that cut a serrated edge. The zigzag pattern reduces fraying on woven fabrics.',
    use: 'Quick seam finishing on wovens that don\'t fray heavily, decorative edges',
    tips: [
      'Not a substitute for proper seam finishing on garments that will be washed frequently.',
      'Works best on tightly woven fabrics like quilting cotton. Loose weaves still fray through the zigzag.',
      'Keep them sharp — dull pinking shears crush the fabric instead of cutting the zigzag pattern cleanly.'
    ],
    fabrics: 'Cotton, linen, and other medium-weight wovens. Not effective on knits (they don\'t fray the same way).'
  },
  {
    name: 'Thread Snips',
    icon: '✂️',
    what: 'Small, spring-loaded scissors for trimming threads. One-handed operation — squeeze to cut, release to open.',
    use: 'Trimming thread tails at the machine, clipping seam allowances, snipping into curves',
    tips: [
      'Keep a pair next to your machine at all times — you\'ll use them constantly.',
      'Spring-loaded snips are faster than scissors for repeated thread cutting.',
      'Don\'t use them to cut fabric yardage — they\'re too small for clean long cuts.'
    ],
    fabrics: 'Thread and small cuts on any fabric.'
  },
  {
    name: 'Self-Healing Cutting Mat',
    icon: '📐',
    what: 'A mat with a grid pattern and measurements printed on it. The surface "heals" after cuts so it stays smooth.',
    use: 'Required surface for rotary cutting. Also useful as a measuring and squaring reference.',
    tips: [
      'Store flat — never roll or bend a cutting mat, or it will warp permanently.',
      'Keep out of heat and direct sunlight. Heat warps the mat.',
      'The printed grid is for rough reference only — always measure with a separate ruler for accuracy.',
      'Green mats are standard. Rotating mats are helpful for squaring up quilt blocks.'
    ],
    fabrics: 'Used with all fabrics when rotary cutting.'
  }
];

function renderCutting() {
  const container = document.getElementById('cuttingContent');
  container.innerHTML = `
    <p class="seam-finder-intro">
      The right cutting tool makes clean, accurate cuts that set up everything that follows.
      Dull or wrong tools cause frayed edges, shifted layers, and inaccurate pieces.
    </p>
    ${CUTTING_TOOLS.map(tool => `
      <div class="mc-settings-card open">
        <button class="mc-settings-header">
          <div>
            <span class="mc-settings-name">${tool.icon} ${tool.name}</span>
            <span class="mc-settings-examples">${tool.what}</span>
          </div>
          <span class="ts-chevron">▸</span>
        </button>
        <div class="mc-settings-body">
          <div class="mc-settings-grid">
            <div class="mc-setting-item">
              <div class="mc-setting-label">Best for</div>
              <div class="mc-setting-value">${tool.use}</div>
            </div>
            <div class="mc-setting-item">
              <div class="mc-setting-label">Fabrics</div>
              <div class="mc-setting-value">${tool.fabrics}</div>
            </div>
          </div>
          <div class="mc-settings-tips">
            <strong>Tips:</strong>
            <ul style="margin:6px 0 0 18px;list-style:disc">${tool.tips.map(t => `<li style="margin-bottom:4px">${t}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
    `).join('')}
  `;

  // Wire accordions
  container.querySelectorAll('.mc-settings-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.mc-settings-card');
      card.classList.toggle('open');
    });
  });
}


// ═══════════════════════════════════════════════════════════════
// MEASURING TOOLS
// ═══════════════════════════════════════════════════════════════

const MEASURING_TOOLS = [
  {
    name: 'Flexible Tape Measure',
    icon: '📏',
    what: 'A 60" (150cm) flexible tape with inches on one side and centimeters on the other. The essential body and flat measuring tool.',
    use: 'Body measurements, measuring curved seams, checking pattern pieces against body',
    tips: [
      'Replace every 1–2 years — tape measures stretch over time and become inaccurate.',
      'Don\'t pull tight against the body when measuring. Let it rest naturally on the surface.',
      'Keep one in your sewing kit and one in your cutting area.'
    ]
  },
  {
    name: 'Clear Acrylic Ruler (6" × 24")',
    icon: '📐',
    what: 'A transparent ruler with printed grid lines. Used as both a measuring tool and a cutting guide with rotary cutters.',
    use: 'Measuring yardage, cutting straight lines, adding seam allowances, squaring fabric',
    tips: [
      'The 6" × 24" size is the most versatile. Add a 12.5" square for quilting.',
      'Use the printed lines — not the edge — for accurate measurements.',
      'Non-slip dots or ruler grips prevent the ruler from sliding during cutting.'
    ]
  },
  {
    name: 'Seam Gauge (6" metal ruler)',
    icon: '📏',
    what: 'A small metal ruler with a sliding marker. Set the marker to your measurement and use it to mark consistent distances repeatedly.',
    use: 'Marking hem depths, seam allowances, buttonhole spacing, pleat depths',
    tips: [
      'Set it once and mark the same distance across your entire project without re-measuring.',
      'Essential for consistent hems — measure, press, measure, press.',
      'The pointed end can help push fabric under the presser foot.'
    ]
  },
  {
    name: 'French Curve / Hip Curve',
    icon: '📐',
    what: 'Shaped rulers for drawing and tracing smooth curves. French curves handle tight curves (necklines, armholes); hip curves handle long gentle curves (hip seams, hems).',
    use: 'Pattern drafting, adjusting curved pattern lines, truing up seam lines',
    tips: [
      'Match the curve radius to the curve you\'re drawing — don\'t force a tight curve ruler onto a gentle hip curve.',
      'Essential for pattern adjustments — freehand curves rarely match the original pattern\'s smoothness.',
      'Clear plastic versions let you see the fabric or paper underneath.'
    ]
  }
];

function renderMeasuring() {
  const container = document.getElementById('measuringContent');
  container.innerHTML = `
    <p class="seam-finder-intro">
      Accurate measuring is the difference between a garment that fits and one that doesn't.
      Every measurement error compounds — a quarter inch off at cutting becomes a half inch off at assembly.
    </p>
    ${MEASURING_TOOLS.map(tool => `
      <div class="mc-settings-card open">
        <button class="mc-settings-header">
          <div>
            <span class="mc-settings-name">${tool.icon} ${tool.name}</span>
            <span class="mc-settings-examples">${tool.what}</span>
          </div>
          <span class="ts-chevron">▸</span>
        </button>
        <div class="mc-settings-body">
          <div class="mc-settings-grid">
            <div class="mc-setting-item">
              <div class="mc-setting-label">Best for</div>
              <div class="mc-setting-value">${tool.use}</div>
            </div>
          </div>
          <div class="mc-settings-tips">
            <strong>Tips:</strong>
            <ul style="margin:6px 0 0 18px;list-style:disc">${tool.tips.map(t => `<li style="margin-bottom:4px">${t}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
    `).join('')}
  `;

  container.querySelectorAll('.mc-settings-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.mc-settings-card').classList.toggle('open');
    });
  });
}


// ═══════════════════════════════════════════════════════════════
// PRESSING TOOLS
// ═══════════════════════════════════════════════════════════════

const PRESSING_TOOLS = [
  {
    name: 'Steam Iron',
    icon: '♨️',
    what: 'The primary pressing tool. A good steam iron with adjustable temperature and steam output handles most sewing tasks.',
    use: 'Pressing seams, setting creases, fusing interfacing, removing wrinkles from yardage',
    tips: [
      'Press, don\'t iron. Pressing means lifting and placing the iron down — ironing means sliding it, which stretches and distorts bias-cut and knit fabrics.',
      'Use a press cloth (a piece of muslin or cotton) between the iron and the fabric to prevent shine on wool, silk, and dark fabrics.',
      'Empty the water reservoir after each session to prevent mineral buildup.',
      'Use distilled water if your tap water is hard — mineral deposits clog steam vents.'
    ]
  },
  {
    name: 'Pressing Ham',
    icon: '🥚',
    what: 'A firm, rounded cushion for pressing curved seams — darts, princess seams, sleeve caps, and anything that needs to keep its three-dimensional shape.',
    use: 'Pressing darts, curved seams, sleeve caps, bust and hip shaping',
    tips: [
      'One side is cotton (for high heat fabrics), the other side is wool (for lower heat). Match to your fabric.',
      'Place the curved seam over the ham so it keeps its shape while pressing — pressing flat on a board would crease the curve.',
      'Essential for tailored garments. Without a ham, pressed darts and curves flatten out and look homemade.'
    ]
  },
  {
    name: 'Sleeve Board',
    icon: '📐',
    what: 'A miniature ironing board that fits inside sleeves, pant legs, and other tubular garment pieces.',
    use: 'Pressing sleeves without creating creases on the opposite side, pressing small areas',
    tips: [
      'Slip the sleeve over the board so only the seam touches the surface — this prevents pressing a crease into the opposite side.',
      'Also useful for pressing collars, cuffs, and other small pieces.',
    ]
  },
  {
    name: 'Clapper / Point Presser',
    icon: '🪵',
    what: 'A wooden tool — the clapper is a flat block for trapping steam in fabric to set sharp creases. The point presser is a narrow wooden board for pressing seams open in pointed areas.',
    use: 'Setting sharp creases in wool and heavy fabrics, pressing collar points, lapels, and waistband seams',
    tips: [
      'Steam the fabric, then immediately press the clapper down firmly and hold for 10–15 seconds. The wood traps the steam and heat, setting the crease permanently.',
      'The point presser side handles areas too narrow for an ironing board — collar points, waistband ends, cuff openings.',
      'No heat in the clapper itself — it works by trapping the steam you applied with the iron.'
    ]
  }
];

const PRESSING_HEAT_GUIDE = [
  { fabric: 'Silk, Acetate', heat: 'Low (silk/1 dot)', steam: 'None or very light', notes: 'Always use a press cloth. Water drops leave permanent marks on silk.', heatLevel: 1 },
  { fabric: 'Wool, Cashmere', heat: 'Medium (wool/2 dots)', steam: 'Heavy steam', notes: 'Press cloth essential — direct iron contact causes shine. Steam sets shape in wool.', heatLevel: 2 },
  { fabric: 'Cotton, Linen', heat: 'High (cotton-linen/3 dots)', steam: 'Heavy steam', notes: 'These fibers love heat. Linen looks best with a natural wrinkle pattern — don\'t over-press.', heatLevel: 3 },
  { fabric: 'Polyester, Nylon', heat: 'Low to Medium', steam: 'Light or none', notes: 'Synthetics melt. Test on a scrap first. Use a press cloth.', heatLevel: 1.5 },
  { fabric: 'Rayon, Viscose, Modal', heat: 'Medium', steam: 'Light steam', notes: 'Press on the wrong side to prevent shine. These fabrics are weak when wet — handle gently.', heatLevel: 2 },
  { fabric: 'Bamboo, Tencel', heat: 'Medium', steam: 'Light steam', notes: 'Similar to rayon. Press while slightly damp for best results.', heatLevel: 2 }
];

function renderPressing() {
  const container = document.getElementById('pressingContent');
  container.innerHTML = `
    <p class="seam-finder-intro">
      Pressing transforms home sewing from "handmade" to "professionally made." Every seam should be pressed before crossing it with another seam.
    </p>

    <h3 class="section-title" style="margin-bottom:16px">Heat Settings by Fabric</h3>

    <div class="heat-line-wrap">
      <div class="heat-line-bar">
        <div class="heat-line-gradient"></div>
        ${(() => {
          // Sort by heat level, deduplicate positions
          const sorted = [...PRESSING_HEAT_GUIDE].sort((a,b) => a.heatLevel - b.heatLevel);
          return sorted.map(row => {
            const pct = ((row.heatLevel - 0.5) / 3) * 100; // 0.5–3.5 range → 0–100%
            const shortName = row.fabric.split(',')[0].trim();
            return `<div class="heat-line-marker" style="left:${pct}%">
              <div class="heat-line-dot"></div>
              <div class="heat-line-label">${shortName}</div>
            </div>`;
          }).join('');
        })()}
        <div class="heat-line-ends">
          <span class="heat-line-end-label">Cool</span>
          <span class="heat-line-end-label">Hot</span>
        </div>
      </div>
      <div class="heat-line-dots-legend">
        <span class="heat-line-dot-key"><span class="heat-dot-icon">•</span> 1 dot</span>
        <span class="heat-line-dot-key"><span class="heat-dot-icon">••</span> 2 dots</span>
        <span class="heat-line-dot-key"><span class="heat-dot-icon">•••</span> 3 dots</span>
      </div>
    </div>

    <div class="mc-settings-card open" style="margin-bottom:24px">
      <div class="mc-settings-body" style="display:block">
        <table style="width:100%;border-collapse:collapse;font-size:0.88rem">
          <thead>
            <tr style="text-align:left;border-bottom:2px solid rgba(0,0,0,0.1)">
              <th style="padding:8px 12px;font-weight:600">Fabric</th>
              <th style="padding:8px 12px;font-weight:600">Heat</th>
              <th style="padding:8px 12px;font-weight:600">Steam</th>
              <th style="padding:8px 12px;font-weight:600">Notes</th>
            </tr>
          </thead>
          <tbody>
            ${PRESSING_HEAT_GUIDE.map(row => `
              <tr style="border-bottom:1px solid rgba(0,0,0,0.05)">
                <td style="padding:8px 12px;font-weight:500">${row.fabric}</td>
                <td style="padding:8px 12px">${row.heat}</td>
                <td style="padding:8px 12px">${row.steam}</td>
                <td style="padding:8px 12px;color:var(--ink-light)">${row.notes}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <h3 class="section-title" style="margin-bottom:16px">Pressing Tools</h3>
    ${PRESSING_TOOLS.map(tool => `
      <div class="mc-settings-card open">
        <button class="mc-settings-header">
          <div>
            <span class="mc-settings-name">${tool.icon} ${tool.name}</span>
            <span class="mc-settings-examples">${tool.what}</span>
          </div>
          <span class="ts-chevron">▸</span>
        </button>
        <div class="mc-settings-body">
          <div class="mc-settings-grid">
            <div class="mc-setting-item">
              <div class="mc-setting-label">Best for</div>
              <div class="mc-setting-value">${tool.use}</div>
            </div>
          </div>
          <div class="mc-settings-tips">
            <strong>Tips:</strong>
            <ul style="margin:6px 0 0 18px;list-style:disc">${tool.tips.map(t => `<li style="margin-bottom:4px">${t}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
    `).join('')}
  `;

  container.querySelectorAll('.mc-settings-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.mc-settings-card').classList.toggle('open');
    });
  });
}


// ═══════════════════════════════════════════════════════════════
// MARKING TOOLS
// ═══════════════════════════════════════════════════════════════

const MARKING_TOOLS = [
  {
    name: 'Tailor\'s Chalk',
    icon: '🖍️',
    what: 'Flat, waxy chalk pieces or chalk pencils that leave visible lines on fabric. Brushes off or washes out easily.',
    use: 'Marking seam lines, darts, notches, buttonhole placement, alteration lines',
    tips: [
      'Sharpen the edges of flat chalk pieces to get fine lines — a dull edge gives thick, imprecise marks.',
      'Test on a scrap first — some dark chalks can stain light fabrics if pressed with heat.',
      'Wax-based chalk melts under the iron, so brush it off before pressing.',
      'Clay-based chalk is safer near heat but wears off faster while handling.'
    ],
    bestFor: 'Wovens (cotton, linen, wool). Works on most fabrics except very dark or very textured ones where marks don\'t show.'
  },
  {
    name: 'Disappearing Ink Pens',
    icon: '🖊️',
    what: 'Felt-tip pens with ink that vanishes after 12–72 hours (air-erasable) or when sprayed with water (water-soluble).',
    use: 'Marking on light-colored fabrics where chalk doesn\'t show well, detailed pattern markings',
    tips: [
      'Air-erasable ink vanishes on its own — use it only if you\'ll sew within 24–48 hours.',
      'Water-soluble ink stays until you spray or wash it. Better for projects that take multiple days.',
      'Never press over ink marks — heat can set the ink permanently.',
      'Test on every new fabric — some fabrics absorb the ink and it doesn\'t disappear cleanly.'
    ],
    bestFor: 'Light-colored cottons, linens, and silks. Not reliable on synthetics or very dark fabrics.'
  },
  {
    name: 'Tracing Wheel & Carbon Paper',
    icon: '⚙️',
    what: 'A serrated or smooth wheel rolled over dressmaker\'s carbon paper to transfer pattern markings to fabric.',
    use: 'Transferring darts, grainlines, placement marks, and construction lines from paper patterns to fabric',
    tips: [
      'Use smooth (non-serrated) wheels on delicate fabrics — serrated wheels can snag silk and other fine fibers.',
      'Place carbon paper wax-side down against the wrong side of the fabric.',
      'Use light-colored carbon on dark fabric, dark on light.',
      'Carbon marks can be permanent on some fabrics — always test on a scrap and mark on the wrong side.'
    ],
    bestFor: 'Wovens where you need multiple internal markings transferred from a pattern. Less common with knits.'
  },
  {
    name: 'Pins & Clips',
    icon: '📌',
    what: 'Straight pins hold fabric layers together while cutting and sewing. Sewing clips (like small binder clips) hold layers where pins would damage the fabric.',
    use: 'Holding pattern pieces to fabric, pinning seams before sewing, marking specific points',
    tips: [
      'Use glass-head pins near the iron — plastic heads melt.',
      'Silk pins (size 17, 0.5mm) are fine enough for delicate fabrics without leaving visible holes.',
      'Quilting pins (size 28, 1.75") are long enough for multiple layers.',
      'Use clips instead of pins on leather, vinyl, and laminated fabrics — pin holes are permanent in these materials.',
      'Remove pins before they reach the presser foot. Sewing over pins risks breaking the needle and damaging the machine.'
    ],
    bestFor: 'Pins for all wovens and stable knits. Clips for leather, vinyl, and any fabric where pin holes show.'
  }
];

function renderMarking() {
  const container = document.getElementById('markingContent');
  container.innerHTML = `
    <p class="seam-finder-intro">
      Precise marking transfers your pattern's construction details to the fabric — darts, notches, grainlines, and placement points. The wrong marker on the wrong fabric leaves permanent marks or invisible ones.
    </p>
    ${MARKING_TOOLS.map(tool => `
      <div class="mc-settings-card open">
        <button class="mc-settings-header">
          <div>
            <span class="mc-settings-name">${tool.icon} ${tool.name}</span>
            <span class="mc-settings-examples">${tool.what}</span>
          </div>
          <span class="ts-chevron">▸</span>
        </button>
        <div class="mc-settings-body">
          <div class="mc-settings-grid">
            <div class="mc-setting-item">
              <div class="mc-setting-label">Best for</div>
              <div class="mc-setting-value">${tool.use}</div>
            </div>
            <div class="mc-setting-item">
              <div class="mc-setting-label">Fabrics</div>
              <div class="mc-setting-value">${tool.bestFor}</div>
            </div>
          </div>
          <div class="mc-settings-tips">
            <strong>Tips:</strong>
            <ul style="margin:6px 0 0 18px;list-style:disc">${tool.tips.map(t => `<li style="margin-bottom:4px">${t}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
    `).join('')}
  `;

  container.querySelectorAll('.mc-settings-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.mc-settings-card').classList.toggle('open');
    });
  });
}


// ═══════════════════════════════════════════════════════════════
// HAND NEEDLES
// ═══════════════════════════════════════════════════════════════

const HAND_NEEDLES = [
  {
    name: 'Sharps',
    icon: '🪡',
    what: 'The standard hand-sewing needle — medium length with a sharp point and a small round eye. Sizes 1 (large) to 12 (fine).',
    use: 'General hand sewing, appliqué, hand-piecing, hemming',
    sizes: 'Size 7–9 for most wovens. Size 10–12 for fine fabrics.',
    tips: [
      'The most versatile hand needle. If you only own one type, this is it.',
      'Smaller numbers = larger needles. Use a size that passes through the fabric without forcing.',
      'A sharp, undamaged point is essential — replace needles that catch or snag.'
    ],
    fabrics: 'All wovens from lightweight to medium-heavy. Not ideal for knits (use ballpoint instead).'
  },
  {
    name: 'Betweens (Quilting Needles)',
    icon: '🪡',
    what: 'Short, strong needles with a small eye. Shorter than sharps, which gives more control for fine stitches.',
    use: 'Hand quilting, fine hand stitching, detailed work requiring short, precise stitches',
    sizes: 'Size 7–9 for beginners, size 10–12 for experienced quilters making very fine stitches.',
    tips: [
      'The short length forces shorter stitches — that\'s the point.',
      'If you\'re learning hand quilting, start with size 8 and work down to smaller sizes as your technique improves.',
      'Use a thimble — the short needle and multiple layers of quilting require more pushing force.'
    ],
    fabrics: 'Cotton quilting fabrics, multiple layers with batting.'
  },
  {
    name: 'Embroidery / Crewel Needles',
    icon: '🪡',
    what: 'Same length and sharpness as a Sharp, but with a longer, wider eye to accommodate embroidery floss and decorative threads.',
    use: 'Embroidery, crewelwork, decorative stitching, ribbon work',
    sizes: 'Size 3–5 for heavy threads and wool yarn. Size 7–9 for standard embroidery floss.',
    tips: [
      'The large eye makes threading easier — especially useful with multiple strands of floss.',
      'Choose a size where the eye opens a large enough hole for the thread to pass without excessive friction.',
      'Can substitute for sharps in general sewing if you prefer the easier threading.'
    ],
    fabrics: 'Wovens suited to embroidery: cotton, linen, even-weave fabrics.'
  },
  {
    name: 'Tapestry Needles',
    icon: '🪡',
    what: 'A blunt-pointed needle with a large eye. The blunt tip passes between fabric threads instead of piercing them.',
    use: 'Cross-stitch, needlepoint, counted thread work, weaving in yarn ends',
    sizes: 'Size 18–22 for most cross-stitch on Aida cloth. Size 24–28 for fine even-weave.',
    tips: [
      'Never use a tapestry needle where you need to pierce fabric — the blunt point won\'t go through.',
      'The large eye makes them excellent for threading yarn, ribbon, and elastic through casings.',
      'Useful for weaving in ends on knitted garments.'
    ],
    fabrics: 'Even-weave fabrics (Aida, linen for counted thread), knitted fabric for finishing.'
  },
  {
    name: 'Ballpoint Needles (Hand)',
    icon: '🪡',
    what: 'A rounded point that pushes between knit loops instead of piercing them. Prevents runs and snags in stretchy fabrics.',
    use: 'Hand sewing on knits — hemming, repairs, attaching elastic, catch-stitching',
    sizes: 'Size 5–7 for heavier knits. Size 9–10 for fine jerseys.',
    tips: [
      'If a sharp needle causes runs or laddering on your knit fabric, switch to ballpoint.',
      'Especially important for fine jerseys and interlock where a sharp point can split the yarn.',
      'Use a stretch or zigzag stitch even when hand sewing knits — straight stitches pop when stretched.'
    ],
    fabrics: 'All knit fabrics — jersey, interlock, rib knit, sweater knits.'
  }
];

function renderNeedles() {
  const container = document.getElementById('needlesContent');
  container.innerHTML = `
    <p class="seam-finder-intro">
      Machine needles are covered in the Planner's Needle & Thread mode. This section covers hand-sewing needles — choosing the right type and size for your fabric and technique.
    </p>
    ${HAND_NEEDLES.map(needle => `
      <div class="mc-settings-card open">
        <button class="mc-settings-header">
          <div>
            <span class="mc-settings-name">${needle.icon} ${needle.name}</span>
            <span class="mc-settings-examples">${needle.what}</span>
          </div>
          <span class="ts-chevron">▸</span>
        </button>
        <div class="mc-settings-body">
          <div class="mc-settings-grid">
            <div class="mc-setting-item">
              <div class="mc-setting-label">Best for</div>
              <div class="mc-setting-value">${needle.use}</div>
            </div>
            <div class="mc-setting-item">
              <div class="mc-setting-label">Sizes</div>
              <div class="mc-setting-value">${needle.sizes}</div>
            </div>
            <div class="mc-setting-item">
              <div class="mc-setting-label">Fabrics</div>
              <div class="mc-setting-value">${needle.fabrics}</div>
            </div>
          </div>
          <div class="mc-settings-tips">
            <strong>Tips:</strong>
            <ul style="margin:6px 0 0 18px;list-style:disc">${needle.tips.map(t => `<li style="margin-bottom:4px">${t}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
    `).join('')}
  `;

  container.querySelectorAll('.mc-settings-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.mc-settings-card').classList.toggle('open');
    });
  });
}


// ═══════════════════════════════════════════════════════════════
// URL PARAMETER HANDLING
// ═══════════════════════════════════════════════════════════════

function handleUrlParams() {
  const params = new URLSearchParams(window.location.search);

  // #tools?mode=machines|cutting|measuring|pressing|marking|needles
  const mode = params.get('mode');
  if (mode && MODE_INFO[mode]) {
    document.querySelectorAll('.sidebar-mode-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.sidebar-mode-btn[data-mode='${mode}']`);
    if (btn) btn.classList.add('active');
    showView(mode);
  }

  // #tools?machine=sewing|serger|coverstitch (auto-selects in Machines mode)
  const machine = params.get('machine');
  if (machine && MACHINE_TYPES[machine]) {
    setTimeout(() => {
      const machinesView = document.getElementById('machinesView');
      if (machinesView) {
        const btn = machinesView.querySelector(`.machine-seg-btn[data-machine='${machine}']`);
        if (btn) btn.click();
      }
    }, 50);
  }

  // #tools?section=threading|machinefix|maintenance|settings (auto-selects machine sub-section)
  const section = params.get('section');
  if (section && MACHINE_SECTIONS[section]) {
    setTimeout(() => {
      const tab = document.querySelector(`.tools-section-tab[data-section='${section}']`);
      if (tab) tab.click();
    }, 100);
  }
}


// ═══════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════

initModes();
renderMachinesMode();
renderCutting();
renderMeasuring();
renderPressing();
renderMarking();
renderNeedles();
handleUrlParams();

// Expose functions used by inline onclick handlers
window.showView = showView;

})(); // end tool-tools IIFE
