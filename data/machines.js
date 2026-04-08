// [MIG-007] Machine reference data
// Register on NFG_DATA for async loading
(function() {

const MACHINE_TYPES = {
  sewing: {
    name: 'Sewing Machine',
    icon: '🧵',
    desc: 'Standard home sewing machine — straight stitch, zigzag, buttonholes, and decorative stitches'
  },
  serger: {
    name: 'Serger / Overlock',
    icon: '🔗',
    desc: 'Trims, encloses, and finishes seam edges in one pass — essential for knits and professional finishing'
  },
  coverstitch: {
    name: 'Cover Stitch',
    icon: '📏',
    desc: 'Creates parallel rows of stitching on top with a looper chain underneath — the professional way to hem knits'
  }
};


const TOOL_INVENTORY_LABELS = {
  machines: { sewing: 'Sewing Machine', serger: 'Serger / Overlock', coverstitch: 'Cover Stitch' },
  cutting: { shears: 'Fabric Shears', rotary: 'Rotary Cutter', pinking: 'Pinking Shears', snips: 'Thread Snips', ripper: 'Seam Ripper' },
  measuring: { tape: 'Tape Measure', ruler: 'Acrylic Ruler', gauge: 'Seam Gauge', curve: 'French Curve' },
  pressing: { iron: 'Steam Iron', ham: 'Pressing Ham', sleeveboard: 'Sleeve Board', clapper: 'Clapper' },
  marking: { chalk: "Tailor's Chalk", inkpens: 'Disappearing Ink Pens', tracing: 'Tracing Wheel', pins: 'Pins & Clips' }
};


const MACHINE_TROUBLESHOOT = {
  sewing: {
    threadTension: {
      label: 'Thread & Tension',
      icon: '🧵',
      problems: [
        {
          symptom: 'Thread bunching underneath (bird nesting)',
          causes: [
            'Upper thread is not seated in the tension discs — most common cause',
            'Presser foot was up when threading (discs stay open)',
            'Upper tension is set too low',
            'Bobbin is wound unevenly or inserted the wrong way',
            'Thread is caught on the spool pin or a nick in the spool'
          ],
          fixes: [
            'Raise the presser foot, completely remove upper thread, lower the foot, and re-thread from scratch',
            'Make sure thread clicks into every guide, especially the take-up lever',
            'Increase upper tension by 1 number at a time, testing on a scrap between adjustments',
            'Remove the bobbin, re-wind it smoothly at moderate speed, and re-insert following your manual\'s direction arrows',
            'Check for burrs on the spool edge — switch to a vertical spool pin or use a thread net'
          ],
          links: { threading: 'sewing', maintenance: true }
        },
        {
          symptom: 'Upper thread keeps breaking',
          causes: [
            'Tension is set too high for the thread weight',
            'Thread is old, cheap, or has dried out',
            'There\'s a burr or nick on the needle plate, thread guide, or needle eye',
            'Needle is too small for the thread (eye is pinching)',
            'Thread is catching on the spool or tangled around the spool pin'
          ],
          fixes: [
            'Lower tension by 1–2 numbers and test',
            'Switch to quality thread — Gütermann, Mettler, or Aurifil are reliable',
            'Run your finger along every thread path to feel for nicks; replace damaged parts',
            'Use a larger needle (e.g., 80/12 → 90/14) to widen the eye opening',
            'Use a thread net over the spool, or switch to a horizontal spool pin'
          ],
          links: { threading: 'sewing' }
        },
        {
          symptom: 'Bobbin thread showing on top',
          causes: [
            'Upper tension is too tight, pulling bobbin thread through',
            'Bobbin tension is too loose (bobbin case spring needs adjustment)',
            'Bobbin is wound too loosely',
            'Wrong bobbin type for your machine'
          ],
          fixes: [
            'Decrease upper tension by 1–2 numbers',
            'Check bobbin tension: hold the bobbin case by the thread — it should lower slowly. If it drops fast, tighten the screw 1/8 turn clockwise',
            'Re-wind the bobbin at a steady speed until firm but not bulging',
            'Verify your bobbin type matches your machine model — similar-looking bobbins are NOT interchangeable'
          ],
          links: { threading: 'sewing' }
        },
        {
          symptom: 'Loops on the underside',
          causes: [
            'Upper thread is not between the tension discs',
            'Machine was threaded with the presser foot raised (discs were open)',
            'Upper tension is too loose',
            'Thread take-up lever was skipped during threading'
          ],
          fixes: [
            'With presser foot DOWN, re-thread the entire upper path from spool to needle',
            'Make sure thread passes through the take-up lever — it\'s the single most skipped step',
            'Gradually increase upper tension until stitches look balanced',
            'If tension dial is on 0 or very low, return to the default (usually 4) and adjust from there'
          ],
          links: { threading: 'sewing' }
        }
      ]
    },
    stitchQuality: {
      label: 'Stitch Quality',
      icon: '✂️',
      problems: [
        {
          symptom: 'Skipped stitches',
          causes: [
            'Needle is dull, bent, or the wrong type for your fabric',
            'Needle is installed wrong — flat side should face the back on most machines',
            'Needle isn\'t pushed all the way up into the clamp',
            'Timing is off (needle and hook aren\'t synchronized)',
            'Wrong needle type: ballpoint for knits, sharp/microtex for wovens'
          ],
          fixes: [
            'Replace the needle — start every project with a fresh one',
            'Double-check needle insertion: flat side back, push it up until it stops, tighten the clamp screw firmly',
            'Match needle type to fabric: universal works for most wovens, ballpoint (jersey) for knits',
            'If a new needle doesn\'t fix it, the machine may need timing adjustment — take it to a technician',
            'For problem fabrics (faux leather, very stretchy knits), try a stretch needle or a needle one size larger'
          ],
          links: { fiber: true }
        },
        {
          symptom: 'Puckered or gathered seams',
          causes: [
            'Tension is too tight for the fabric weight',
            'Stitch length is too short for the fabric',
            'Presser foot pressure is too high for lightweight fabric',
            'Needle is too large, punching holes that compress the fabric',
            'Fabric needs stabilization (tissue paper, stabilizer, or starch)'
          ],
          fixes: [
            'Lower tension by 1–2 numbers for lightweight fabrics',
            'Lengthen the stitch: 2.5 mm minimum for lightweight, 3.0+ mm for medium',
            'Reduce presser foot pressure if your machine allows it',
            'Use a smaller needle: 60/8 or 70/10 for lightweight fabrics',
            'Sew with tissue paper or water-soluble stabilizer underneath — tear away after stitching'
          ],
          links: { fiber: true }
        },
        {
          symptom: 'Stitches not forming at all',
          causes: [
            'Machine is not threaded correctly',
            'Needle is in backwards',
            'Bobbin is empty or not seated properly',
            'Hook timing is off — the hook isn\'t catching the upper thread loop',
            'Feed dogs are lowered (some machines have a switch or plate for free-motion sewing)'
          ],
          fixes: [
            'Remove all thread and start from scratch — re-thread upper and bobbin',
            'Check needle orientation: flat side to the back, push up all the way',
            'Remove bobbin, check it has thread, re-insert following the directional arrows',
            'If re-threading doesn\'t help, the machine needs professional timing service',
            'Check for a feed dog lever or drop-feed switch — make sure feed dogs are raised'
          ],
          links: { threading: 'sewing' }
        }
      ]
    },
    needleFeed: {
      label: 'Needle & Feed',
      icon: '📌',
      problems: [
        {
          symptom: 'Needle breaking',
          causes: [
            'Needle is hitting the presser foot or needle plate (wrong foot or needle position)',
            'Fabric is too thick for the needle size',
            'Pulling or forcing fabric through instead of letting feed dogs work',
            'Needle is bent from a previous snag and catches on the next pass',
            'Zigzag width is too wide for the foot opening'
          ],
          fixes: [
            'Make sure the correct presser foot is installed for your stitch type',
            'Size up: use a 90/14 or 100/16 needle for heavy fabrics like denim or canvas',
            'Guide fabric gently without pulling — let the machine feed at its own pace',
            'Replace the needle immediately after any snag — bent needles always break eventually',
            'Reduce zigzag stitch width or switch to a zigzag foot with a wider opening'
          ],
          links: { fiber: true }
        },
        {
          symptom: 'Fabric not feeding / not advancing',
          causes: [
            'Feed dogs are lowered or covered (free-motion mode)',
            'Presser foot pressure is too light to grip',
            'Feed dogs are clogged with lint and debris',
            'Stitch length is set to 0',
            'Fabric is too slippery for the standard foot'
          ],
          fixes: [
            'Check the feed dog switch and raise them back up',
            'Increase presser foot pressure for the fabric weight',
            'Remove the throat plate and clean lint from around and under the feed dogs',
            'Set stitch length to at least 2.0 mm for normal sewing',
            'Use a walking foot for difficult fabrics — it feeds from the top and bottom simultaneously'
          ],
          links: { maintenance: true }
        },
        {
          symptom: 'Fabric getting pulled down into the machine',
          causes: [
            'Throat plate hole is damaged or has a burr that catches fabric',
            'Needle is too large for the fabric, pushing it into the hole',
            'Starting to sew too close to the fabric edge',
            'Bobbin area has thread tangles pulling fabric down',
            'Using a straight stitch with the wide zigzag throat plate'
          ],
          fixes: [
            'Inspect the throat plate for burrs — replace if damaged',
            'Use a smaller needle and a single-hole throat plate for straight stitching',
            'Start sewing with fabric well past the needle, not at the very edge — or hold thread tails to the back when starting',
            'Remove throat plate, clean out any thread nests from the bobbin area',
            'Switch to a straight-stitch throat plate when doing straight stitching only'
          ],
          links: { maintenance: true }
        }
      ]
    },
    mechanical: {
      label: 'Mechanical Issues',
      icon: '⚙️',
      problems: [
        {
          symptom: 'Machine is jammed / won\'t sew',
          causes: [
            'Thread is tangled around the bobbin case or hook',
            'Needle is stuck in the fabric or throat plate',
            'Handwheel is locked (some machines have a clutch knob for bobbin winding)',
            'Motor belt is slipping or broken',
            'Machine needs oiling (older mechanical machines)'
          ],
          fixes: [
            'Don\'t force it. Remove the fabric, take out the bobbin, remove the throat plate, and carefully cut out any tangled thread',
            'If the needle is stuck, gently turn the handwheel by hand toward you while lifting the fabric',
            'Check the inner knob on the handwheel — it may be loosened for bobbin winding. Tighten it clockwise',
            'If the motor runs but the needle doesn\'t move, the belt needs replacement — this is a repair shop job',
            'Oil the machine according to your manual. Most modern machines are "self-lubricating" but older ones need sewing machine oil regularly'
          ],
          links: { maintenance: true }
        },
        {
          symptom: 'Machine making unusual noise',
          causes: [
            'Lint buildup around the feed dogs or bobbin area',
            'Machine needs oiling (clicking or grinding)',
            'Needle is hitting the presser foot or throat plate (clunking)',
            'Bobbin case is loose or damaged',
            'Feed dog timing is off (rhythmic thumping)'
          ],
          fixes: [
            'Deep clean: remove throat plate, clean feed dogs, blow out lint from bobbin area (use the brush that came with your machine, not canned air which pushes lint deeper)',
            'Oil moving parts per your manual — only use sewing machine oil, never WD-40',
            'Check needle position and presser foot compatibility — change needle or foot',
            'Inspect bobbin case for cracks or loose screws; replace if damaged',
            'If noise persists after cleaning and oiling, schedule professional service — don\'t keep sewing on a noisy machine'
          ],
          links: { maintenance: true }
        },
        {
          symptom: 'Handwheel is hard to turn',
          causes: [
            'Thread jam in the bobbin area',
            'Machine hasn\'t been oiled (dried lubricant)',
            'Bobbin winding clutch is partially engaged',
            'Motor capacitor is failing (hums but doesn\'t turn easily)'
          ],
          fixes: [
            'Remove bobbin, throat plate, and check for tangled thread in the hook race',
            'Apply sewing machine oil to designated points and run the machine slowly for a few minutes to distribute',
            'Check the handwheel\'s inner clutch knob — tighten fully for normal sewing',
            'If the machine hums and struggles, it needs a repair technician — could be motor or capacitor'
          ],
          links: { maintenance: true }
        }
      ]
    },
    bobbin: {
      label: 'Bobbin Problems',
      icon: '🔄',
      problems: [
        {
          symptom: 'Bobbin thread not catching',
          causes: [
            'Bobbin is inserted the wrong way (thread needs to pull in the right direction)',
            'Bobbin case isn\'t clicked into place',
            'Upper thread isn\'t being picked up — timing may be off',
            'Bobbin area is packed with lint blocking the hook\'s path'
          ],
          fixes: [
            'Remove and re-insert the bobbin following the directional arrows in your machine or manual',
            'Push the bobbin case in until you hear and feel it click into position',
            'Hold the upper thread, turn the handwheel one full rotation toward you, and tug gently — the bobbin thread should come up. If it doesn\'t, the machine needs timing service',
            'Clean the entire bobbin area: remove throat plate, bobbin case, and brush out all lint'
          ],
          links: { threading: 'sewing', maintenance: true }
        },
        {
          symptom: 'Bobbin winding unevenly',
          causes: [
            'Thread isn\'t going through the bobbin winding tension disc',
            'Winding too fast or at inconsistent speed',
            'Wrong bobbin size (wobbles on the spindle)',
            'Bobbin winding spindle is dirty or worn'
          ],
          fixes: [
            'Thread must go through the small tension disc near the bobbin winder before wrapping onto the bobbin',
            'Wind at a moderate, steady speed — not full throttle',
            'Use only the exact bobbin type specified for your machine',
            'Clean the spindle with a cotton swab and rubbing alcohol; if grooved/worn, replace it'
          ],
          links: { maintenance: true }
        },
        {
          symptom: 'Bobbin rattling or vibrating',
          causes: [
            'Bobbin case isn\'t fully seated',
            'Bobbin is the wrong size for the case',
            'Bobbin case spring is damaged or loose',
            'Hook race is dirty and causing the bobbin case to sit crooked'
          ],
          fixes: [
            'Remove and re-seat the bobbin case — it should click in firmly',
            'Check your manual for the exact bobbin model number and only use that type',
            'Inspect the bobbin case tension spring — if bent or loose, replace the bobbin case (they\'re inexpensive)',
            'Clean the hook race with a brush and lint-free cloth'
          ],
          links: { maintenance: true }
        }
      ]
    }
  },
  serger: {
    threadChain: {
      label: 'Threading & Chain',
      icon: '🔗',
      problems: [
        {
          symptom: 'Won\'t form a chain (thread tail)',
          causes: [
            'One or more threads aren\'t properly seated in their tension discs',
            'Threading order is wrong — lower looper must be threaded before upper looper',
            'Looper threading path was missed at one of the guides',
            'Needles aren\'t pushed all the way up into the clamps',
            'Stitch finger / plate isn\'t engaged'
          ],
          fixes: [
            'Unthread everything and re-thread from scratch in the correct order: lower looper → upper looper → right needle → left needle',
            'Raise presser foot when threading so tension discs open',
            'Follow your machine\'s color-coded thread paths exactly — every guide matters on a serger',
            'Push needles up firmly and tighten clamp screws with the provided screwdriver',
            'Check that the stitch finger (metal prong on the throat plate) is in position — some machines have a switch for rolled hem that retracts it'
          ],
          links: { threading: 'serger' }
        },
        {
          symptom: 'Chain breaking after a few inches',
          causes: [
            'One thread has too much tension',
            'Thread is caught on a spool or tangled behind the machine',
            'Thread cones aren\'t on the spool holders properly (thread needs to pull freely)',
            'Needle is dull or wrong type'
          ],
          fixes: [
            'Set all tensions to 3–4 (mid-range) and test a chain on scrap fabric, then adjust one dial at a time',
            'Check each thread path from cone to its destination — look for snags, tangles, and loops around the posts',
            'Use the thread nets and spool caps that came with your machine — they prevent thread from catching',
            'Replace both needles with fresh ones — always change serger needles in pairs'
          ],
          links: { threading: 'serger' }
        },
        {
          symptom: 'Can\'t thread the lower looper',
          causes: [
            'Looper isn\'t in the correct position for threading',
            'Thread path is hard to see or reach',
            'Previous thread remnants are stuck in the looper eye',
            'Using the wrong technique — many sergers need manual looper positioning'
          ],
          fixes: [
            'Raise the presser foot, then turn the handwheel to position the lower looper where your manual shows — this is critical',
            'Use the built-in threader if your machine has one, or use a looper threading tool (a long thin wire hook)',
            'Clean the looper eye with a small brush or dental floss threader',
            'Some people tie new thread to the old and pull through — this works but only if the tension is released first (presser foot up)'
          ],
          links: { threading: 'serger' }
        }
      ]
    },
    stitchFormation: {
      label: 'Stitch Formation',
      icon: '⚡',
      problems: [
        {
          symptom: 'Looper thread showing on top of fabric',
          causes: [
            'Lower looper tension is too loose',
            'Upper looper tension is too tight (pulling lower looper thread up)',
            'Needle tension is too tight',
            'Thread is not in the lower looper tension disc'
          ],
          fixes: [
            'Increase lower looper tension by 1 number at a time',
            'Decrease upper looper tension slightly',
            'Reduce needle tension — serger needle tension is usually lower than sewing machine tension (2–4 range)',
            'Re-thread the lower looper with the presser foot UP so the tension disc opens'
          ],
          links: { threading: 'serger' }
        },
        {
          symptom: 'Skipped stitches on serger',
          causes: [
            'Needles are dull, bent, or the wrong type',
            'Needles aren\'t fully inserted in the clamp',
            'Thread tension is wildly unbalanced',
            'Fabric isn\'t being held flat against the throat plate',
            'Wrong needle system for your machine (most home sergers use HA×1SP or ELx705)'
          ],
          fixes: [
            'Replace both needles with fresh ones — serger needles dull faster because they work harder',
            'Push needles up until they physically stop, flat side facing back, and tighten firmly',
            'Reset all tensions to the middle of their range (usually 3–4) and rebalance from there',
            'Guide fabric smoothly without pulling — hold it gently and let the feed dogs and knife do the work',
            'Check your manual for the exact needle system — using the wrong needle type is a common cause of mysterious skipping'
          ],
          links: { threading: 'serger' }
        },
        {
          symptom: 'Uneven or wavy stitch coverage',
          causes: [
            'Upper and lower looper tensions are unbalanced',
            'Thread weights don\'t match (mixing heavy and light threads)',
            'Stitch length is too long for the thread weight',
            'Differential feed needs adjusting'
          ],
          fixes: [
            'Both looper threads should meet right at the fabric edge. If loops lean to one side, adjust that looper\'s tension',
            'Use the same thread type and weight in both loopers',
            'Shorten the stitch length for better coverage (2.5–3.0 mm is typical for overlock)',
            'Adjust differential feed: increase (toward 2.0) if fabric stretches, decrease (toward 0.7) if it bunches'
          ],
          links: {}
        }
      ]
    },
    cuttingFeed: {
      label: 'Cutting & Feed',
      icon: '🔪',
      problems: [
        {
          symptom: 'Knife not cutting cleanly',
          causes: [
            'Upper knife is dull — this blade is replaceable',
            'Lower knife is nicked or misaligned',
            'Fabric is too thick for the knife (multiple layers of heavy fabric)',
            'Knife is disengaged (there\'s usually a lever to retract it)'
          ],
          fixes: [
            'Replace the upper knife — it\'s a consumable part, change it every 6–12 months depending on use',
            'Lower knife rarely needs replacing but can be damaged by pins or heavy fabric. Inspect and replace if nicked',
            'Reduce layers or use a slower speed through heavy sections',
            'Check for the knife engagement lever and make sure it\'s in the cutting position'
          ],
          links: { maintenance: true }
        },
        {
          symptom: 'Fabric stretching while serging',
          causes: [
            'Differential feed is set too low (below 1.0)',
            'Presser foot pressure is too high, pushing fabric into the feed dogs',
            'Sewing too fast on stretchy knits',
            'Stitch length is too short, creating too many needle punctures per inch'
          ],
          fixes: [
            'Increase differential feed toward 1.5–2.0 for stretchy fabrics — this feeds the back faster than the front, preventing stretch',
            'Reduce presser foot pressure if your serger allows adjustment',
            'Slow down and let the machine work at a comfortable pace',
            'Lengthen the stitch to 3.0–3.5 mm for knits — fewer punctures means less distortion'
          ],
          links: { fiber: true }
        },
        {
          symptom: 'Fabric puckering / gathering while serging',
          causes: [
            'Differential feed is set too high (above 1.0)',
            'Tensions are too tight overall',
            'Stitch length is too long for lightweight fabric',
            'Fabric needs to be held taut (not pulled) while feeding'
          ],
          fixes: [
            'Decrease differential feed toward 0.7–0.8 for lightweight fabrics',
            'Lower all tensions by 1–2 numbers for lightweight fabrics',
            'Shorten the stitch to 2.0–2.5 mm',
            'Guide the fabric with gentle tension behind and in front of the presser foot — don\'t pull, just keep it taut'
          ],
          links: { fiber: true }
        }
      ]
    },
    rolledHem: {
      label: 'Rolled Hem',
      icon: '🌀',
      problems: [
        {
          symptom: 'Rolled hem not rolling',
          causes: [
            'Stitch finger is still engaged — it needs to be retracted for rolled hem',
            'Lower looper tension isn\'t high enough to pull the fabric edge over',
            'Stitch length is too long — rolled hem needs short stitches',
            'Upper looper thread is too thick to wrap tightly'
          ],
          fixes: [
            'Switch to rolled hem mode: retract the stitch finger (method varies by machine — lever, plate change, or finger removal)',
            'Increase lower looper tension significantly — to 6–8 on most machines. This is what forces the roll',
            'Set stitch length to 1.0–2.0 mm (shorter = tighter roll)',
            'Use lightweight thread in the upper looper — woolly nylon gives the best rolled hem coverage and softness'
          ],
          links: { threading: 'serger' }
        },
        {
          symptom: 'Rolled hem looks messy or inconsistent',
          causes: [
            'Stitch length varies because of inconsistent feeding speed',
            'Upper looper coverage is sparse — thread not wrapping fully',
            'Fabric edge is uneven going in',
            'Tensions are off — the roll tightens in some spots and loosens in others'
          ],
          fixes: [
            'Sew at a slow, steady speed — rolled hems need consistency more than any other serger stitch',
            'Try woolly nylon in the upper looper — it blooms and fills gaps for better coverage',
            'Trim the fabric edge cleanly before starting, or let the knife trim as you go',
            'Increase lower looper tension until the roll is consistent, then fine-tune upper looper until the wrapping is even'
          ],
          links: {}
        }
      ]
    },
    mechanicalSerger: {
      label: 'Mechanical Issues',
      icon: '⚙️',
      problems: [
        {
          symptom: 'Serger is making a loud clicking sound',
          causes: [
            'Needle is hitting the lower looper (looper timing off or needle is bent)',
            'Upper knife is loose',
            'A thread is wrapped around a looper or hook internally',
            'Feed dogs are clogged with fabric scraps'
          ],
          fixes: [
            'STOP immediately — a needle hitting the looper will damage both. Replace the needle and check looper for nicks',
            'Tighten the upper knife screw — if the knife is damaged, replace it',
            'Open the looper cover and inspect for wrapped thread. Turn handwheel slowly by hand to find the obstruction',
            'Remove the throat plate and clean around the feed dogs and knife area'
          ],
          links: { maintenance: true }
        },
        {
          symptom: 'Handwheel won\'t turn or is very stiff',
          causes: [
            'Thread jam around the loopers',
            'Fabric is jammed in the feed dogs or knife area',
            'Machine needs oiling',
            'Looper timing has shifted and parts are binding'
          ],
          fixes: [
            'Never force it. Remove the thread, open the looper cover, and carefully look for jams',
            'Remove the throat plate and gently pull out any trapped fabric',
            'Oil the machine at all designated points per your manual — sergers need more frequent oiling than sewing machines',
            'If the handwheel frees up after cleaning but the stitches are wrong, the timing needs professional adjustment'
          ],
          links: { maintenance: true }
        }
      ]
    }
  },
  coverstitch: {
    skippedStitches: {
      label: 'Skipped Stitches',
      icon: '⚠️',
      problems: [
        {
          symptom: 'Cover stitch skipping stitches (the universal complaint)',
          causes: [
            'Needles are slightly dull — cover stitch machines are extremely sensitive to needle condition',
            'Needle type is wrong — stretch (HA×1SP) needles are required for knits',
            'Machine isn\'t properly threaded — one thread slightly out of a guide will cause skipping',
            'Fabric isn\'t being held firmly enough against the throat plate',
            'Thread tension is unbalanced between the needles',
            'Presser foot pressure is wrong for the fabric weight'
          ],
          fixes: [
            'Replace ALL needles with fresh ones — this alone fixes skipping about 60% of the time',
            'Use stretch needles (HA×1SP or ELx705) for knits, not universal needles',
            'Re-thread every thread path from scratch with presser foot UP',
            'Use a walking foot or clear elastic stretched along the seam to stabilize the fabric against the throat plate',
            'Make sure all needle tensions match (usually 3–4 range) before adjusting individually',
            'Increase presser foot pressure for stretchy knits; decrease for lightweight fabrics'
          ],
          links: { threading: 'coverstitch' }
        },
        {
          symptom: 'Only one needle row is skipping',
          causes: [
            'That specific needle is slightly bent or dull',
            'That needle\'s thread tension is different from the other(s)',
            'That needle isn\'t fully inserted into the clamp',
            'Thread path for that needle has a guide that\'s been skipped'
          ],
          fixes: [
            'Replace just that needle first — if the skip follows the needle, it was the needle',
            'Match that needle\'s tension to the working needle(s)',
            'Remove and re-insert the needle, pushing it up firmly and tightening the screw',
            'Re-thread only that needle\'s path, following every guide carefully'
          ],
          links: { threading: 'coverstitch' }
        }
      ]
    },
    threadTensionCS: {
      label: 'Thread & Tension',
      icon: '🧵',
      problems: [
        {
          symptom: 'Looper thread too loose (loops hanging on underside)',
          causes: [
            'Looper tension is set too low',
            'Looper thread isn\'t seated in the tension disc',
            'Thread is too lightweight for the stitch length',
            'Looper thread path has a missed guide'
          ],
          fixes: [
            'Increase looper tension by 1–2 numbers at a time, testing on scrap between each change',
            'Re-thread the looper with presser foot UP so the tension disc opens fully',
            'Use the same thread weight in the looper as in the needles (or woolly nylon for stretch)',
            'Re-thread the looper from scratch, following every guide in the correct order'
          ],
          links: { threading: 'coverstitch' }
        },
        {
          symptom: 'Thread breaking at the looper',
          causes: [
            'Looper tension is too tight',
            'Thread is catching on a burr or nick along the looper path',
            'Thread quality is poor — cheap thread frays and snaps under looper stress',
            'Looper isn\'t in the correct position when threading'
          ],
          fixes: [
            'Decrease looper tension by 2 numbers and test',
            'Run a finger along the entire looper thread path to feel for rough spots; inspect the looper eye for nicks',
            'Use quality thread — polyester for most fabrics, woolly nylon for maximum stretch',
            'Turn the handwheel to the position shown in your manual before threading the looper — position matters on cover stitch machines'
          ],
          links: { threading: 'coverstitch' }
        },
        {
          symptom: 'Uneven needle tensions (one row tighter than the other)',
          causes: [
            'One needle\'s tension is set higher than the other',
            'One thread isn\'t fully engaged in its tension disc',
            'Thread spools are different brands or weights',
            'One needle thread path has a twist or snag'
          ],
          fixes: [
            'Set both needle tensions to the same number and test — adjust individually only if needed',
            'Re-thread both needles with presser foot UP to reset the tension discs',
            'Use the same thread brand, type, and weight on both needles',
            'Inspect both thread paths for tangles, check that thread feeds freely from both spools'
          ],
          links: { threading: 'coverstitch' }
        }
      ]
    },
    stitchAppearance: {
      label: 'Stitch Appearance',
      icon: '👁️',
      problems: [
        {
          symptom: 'Fabric tunneling between needle rows',
          causes: [
            'Needle tensions are too tight, pulling the fabric up between the rows',
            'Presser foot pressure is too low — fabric isn\'t held flat while stitching',
            'Stitch length is too short, creating too many tension points',
            'Fabric is too stretchy for the settings — it stretches during sewing and contracts after'
          ],
          fixes: [
            'Lower both needle tensions by 1–2 numbers',
            'Increase presser foot pressure to hold the fabric firmly',
            'Lengthen the stitch to 3.0–3.5 mm',
            'Use washaway stabilizer or clear elastic on the underside to prevent the fabric from stretching during stitching'
          ],
          links: { fiber: true }
        },
        {
          symptom: 'Chain not forming on the underside',
          causes: [
            'Looper isn\'t threaded or has come unthreaded',
            'Looper tension is too tight — thread can\'t form the chain links',
            'Looper isn\'t catching the needle threads — timing may be off',
            'Wrong thread path — looper threading on cover stitch is the most unintuitive part'
          ],
          fixes: [
            'Re-thread the looper completely with the presser foot UP and the looper in the correct threading position per your manual',
            'Decrease looper tension to the low end of the range (2–3)',
            'If re-threading doesn\'t help and the chain still won\'t form, the machine needs professional timing service',
            'Watch a video specific to your machine model — cover stitch looper threading varies significantly between brands'
          ],
          links: { threading: 'coverstitch' }
        },
        {
          symptom: 'Top stitching looks wavy or uneven',
          causes: [
            'Sewing speed is inconsistent',
            'Fabric is being pulled or pushed instead of guided',
            'Presser foot is wrong — not using a cover stitch guide foot',
            'Fabric is stretching during sewing and wavy recovery happens after'
          ],
          fixes: [
            'Sew at a steady, moderate speed — cover stitch quality is very speed-sensitive',
            'Guide the fabric gently and keep even pressure; the feed dogs should control the pace',
            'Use a seam guide or edge guide attachment for consistent spacing from the fold',
            'Interface the hem fold line with lightweight fusible tape, or use water-soluble stabilizer on top'
          ],
          links: {}
        }
      ]
    },
    mechanicalCS: {
      label: 'Mechanical Issues',
      icon: '⚙️',
      problems: [
        {
          symptom: 'Machine jams when starting a seam',
          causes: [
            'No chain tail — cover stitch needs an existing chain to sew into',
            'Fabric edge caught on the throat plate',
            'Looper thread bunched up under the throat plate from previous sewing',
            'Presser foot not lowered all the way'
          ],
          fixes: [
            'Always start by sewing a chain tail on scrap fabric — never start directly on your project fabric',
            'Hold thread tails to the back when starting and keep gentle tension',
            'Lift the presser foot, remove fabric, clear any thread tangle from under the throat plate, then restart with a chain tail',
            'Make sure the presser foot is all the way down and fabric is positioned well past the needle'
          ],
          links: { threading: 'coverstitch' }
        },
        {
          symptom: 'Looper timing seems off',
          causes: [
            'A needle hit the looper and knocked it out of alignment',
            'Internal parts have shifted from vibration or heavy use',
            'Thread jam forced the handwheel and moved the timing'
          ],
          fixes: [
            'Inspect the looper for nicks or bends — if visibly damaged, it needs replacement',
            'Cover stitch timing is precise and not a home repair — take it to a qualified technician',
            'Before paying for service, try a complete re-thread with new needles and clean the machine thoroughly — sometimes what seems like a timing issue is just a threading error'
          ],
          links: { maintenance: true }
        }
      ]
    }
  }
};


const MACHINE_MAINTENANCE = {
  sewing: {
    label: 'Sewing Machine',
    schedule: [
      {
        frequency: 'After Every Project',
        icon: '🔄',
        tasks: [
          { task: 'Change the needle', detail: 'A fresh needle every project prevents skipped stitches, fabric damage, and thread breakage. Needles dull faster than you think.' },
          { task: 'Brush out lint from the bobbin area', detail: 'Remove the bobbin and bobbin case. Use the brush that came with your machine to sweep out lint and thread scraps from around the hook race.' },
          { task: 'Wipe down the machine', detail: 'Soft cloth to remove dust, thread fibers, and fabric lint from the exterior, thread path, and around the presser foot.' },
          { task: 'Check the thread path', detail: 'Run your finger along the thread guides looking for nicks, burrs, or dried thread residue that could snag fresh thread.' }
        ]
      },
      {
        frequency: 'Monthly (or every 8–10 hours of sewing)',
        icon: '📅',
        tasks: [
          { task: 'Deep clean the bobbin area', detail: 'Remove the throat plate (usually 1–2 screws). Brush lint from feed dogs, hook race, and under the plate. This is where most lint hides.' },
          { task: 'Clean the tension discs', detail: 'With the presser foot up, run a folded piece of muslin or dental floss between the tension discs to remove lint buildup. Dirty discs cause inconsistent tension.' },
          { task: 'Inspect the throat plate', detail: 'Look for scratches, burrs, or grooves around the needle hole. A damaged plate snags thread and damages fabric. Replace if rough.' },
          { task: 'Oil the machine (if applicable)', detail: 'Check your manual — many modern machines are sealed and self-lubricating. Older mechanical machines need 1–2 drops of sewing machine oil at designated points. NEVER use WD-40, 3-in-1 oil, or cooking oil.' }
        ]
      },
      {
        frequency: 'Every 6–12 Months',
        icon: '🗓️',
        tasks: [
          { task: 'Professional service / tune-up', detail: 'A technician will deep clean, oil, check timing, adjust tension, and test everything. Worth it even if the machine seems fine — preventive maintenance prevents expensive repairs.' },
          { task: 'Replace the needle plate if worn', detail: 'If there are visible grooves or scratches around the needle hole, the plate is damaging your thread and fabric. Replacement plates are usually $15–30.' },
          { task: 'Check the power cord and foot pedal', detail: 'Look for fraying, loose connections, or intermittent power. Replace worn cords — they\'re inexpensive and a frayed cord is a fire hazard.' },
          { task: 'Test all stitches and buttonholes', detail: 'Run through your stitch options on scrap fabric. If any stitch patterns are off, the machine needs timing adjustment.' }
        ]
      }
    ],
    doNot: [
      'Never use canned/compressed air to clean — it blows lint deeper into the machine where you can\'t reach it',
      'Never use WD-40, 3-in-1 oil, or any oil other than sewing machine oil — wrong oils gum up and attract lint',
      'Never sew over pins — one pin strike can throw off timing, nick the needle plate, and break your needle',
      'Never force the handwheel if it\'s stuck — find and remove the obstruction first',
      'Never store the machine with the presser foot down — it compresses the spring and weakens foot pressure over time'
    ]
  },
  serger: {
    label: 'Serger / Overlock',
    schedule: [
      {
        frequency: 'After Every Project',
        icon: '🔄',
        tasks: [
          { task: 'Brush out lint from loopers and knife area', detail: 'Sergers generate far more lint than sewing machines because they trim fabric. Open the looper cover and brush out everything.' },
          { task: 'Check the upper knife', detail: 'Run your finger carefully along the cutting edge. If it drags or feels rough, it\'s time to replace.' },
          { task: 'Inspect the needles', detail: 'Serger needles work harder than sewing machine needles. Replace both needles with every project for consistent results.' }
        ]
      },
      {
        frequency: 'Monthly (or every 8–10 hours of serging)',
        icon: '📅',
        tasks: [
          { task: 'Deep clean the looper area', detail: 'Remove the throat plate and needle plate. Brush and carefully pick out lint from around the loopers, feed dogs, and knife mechanism. Sergers pack lint into tight spaces.' },
          { task: 'Oil the loopers and hook race', detail: 'Most sergers need regular oiling — apply 1–2 drops of sewing machine oil at each designated point per your manual. Run the machine slowly for a minute to distribute.' },
          { task: 'Clean the tension discs', detail: 'Floss each tension disc with muslin or unthreaded dental floss. Sergers have 3–4 tension discs, and lint in any one will cause stitch problems.' },
          { task: 'Check the knife alignment', detail: 'The upper and lower knives should meet precisely. If cutting is ragged or uneven, the alignment may need adjusting — usually a professional job.' }
        ]
      },
      {
        frequency: 'Every 6–12 Months',
        icon: '🗓️',
        tasks: [
          { task: 'Replace the upper knife', detail: 'Upper knives are consumable parts — they dull with use. Replace every 6–12 months depending on how much you serge and what fabrics you cut.' },
          { task: 'Professional service', detail: 'A serger tune-up includes timing check, looper adjustment, knife alignment, full cleaning, and oiling. More important than sewing machine service because sergers have more moving parts.' },
          { task: 'Inspect loopers for nicks', detail: 'A nicked looper catches thread and causes breakage or skipping. If a looper has visible damage, replace it.' },
          { task: 'Test all stitch configurations', detail: 'Run 3-thread, 4-thread, and rolled hem on scrap to verify all configurations work. This catches issues before they ruin a project.' }
        ]
      }
    ],
    doNot: [
      'Never sew over pins — a pin hitting the knife or looper at serger speed is catastrophic',
      'Never force thick layers through — slow down and help the fabric feed gently',
      'Never skip oiling — sergers need more lubrication than sewing machines because of the looper mechanism',
      'Never ignore unusual sounds — clicking or clunking often means a needle hit a looper, which needs immediate attention',
      'Never use the wrong needle type — most home sergers require HA×1SP or ELx705 needles specifically'
    ]
  },
  coverstitch: {
    label: 'Cover Stitch',
    schedule: [
      {
        frequency: 'After Every Project',
        icon: '🔄',
        tasks: [
          { task: 'Change all needles', detail: 'Cover stitch machines are extremely needle-sensitive. Fresh needles with every project is not optional — it\'s the single best way to prevent skipped stitches.' },
          { task: 'Clean the looper area', detail: 'Remove the throat plate and brush lint from the looper, feed dogs, and looper thread path. Lint here directly causes thread breakage.' },
          { task: 'Check thread paths for tangles', detail: 'Cover stitch threading paths are complex. After removing your project, check for thread wrapped around guides or tension discs.' }
        ]
      },
      {
        frequency: 'Monthly (or every 8–10 hours of use)',
        icon: '📅',
        tasks: [
          { task: 'Deep clean the looper housing', detail: 'The looper lives below the throat plate and collects lint in hard-to-see places. Use a brush, lint-free cloth, and patience.' },
          { task: 'Oil designated points', detail: 'Most cover stitch machines need regular oiling. Follow your manual exactly — the looper mechanism has specific oil points.' },
          { task: 'Clean all tension discs', detail: 'Cover stitch has 3–4 tension discs. Floss each one with muslin. One dirty disc throws off the entire balance.' },
          { task: 'Inspect the throat plate', detail: 'Look for scratches and needle marks — cover stitch needles are close together and can wear the plate faster.' }
        ]
      },
      {
        frequency: 'Every 6–12 Months',
        icon: '🗓️',
        tasks: [
          { task: 'Professional service', detail: 'Cover stitch timing is the most precise of all home sewing machines. A professional tune-up ensures the looper catches both needle threads consistently.' },
          { task: 'Inspect the looper for damage', detail: 'A cover stitch looper is expensive but critical. Nicks or bends cause skipping that no amount of tension adjustment can fix.' },
          { task: 'Replace the throat plate if worn', detail: 'If you see grooves or marks from needle strikes, replace it. A damaged plate contributes to skipping and thread breaking.' }
        ]
      }
    ],
    doNot: [
      'Never start sewing directly on project fabric — always chain onto the fabric from a scrap to establish the stitch',
      'Never pull fabric through the machine — cover stitch machines are finicky about feed rate and pulling distorts the stitch',
      'Never skip needle changes — cover stitch is the most needle-sensitive machine in your sewing room',
      'Never ignore looper thread breakage — it often means a guide was missed or the looper has a burr that will damage thread repeatedly',
      'Never adjust timing yourself — cover stitch timing requires specialized gauges and experience'
    ]
  }
};


window.NFG_DATA.machines = {
  MACHINE_TYPES: MACHINE_TYPES,
  TOOL_INVENTORY_LABELS: TOOL_INVENTORY_LABELS,
  MACHINE_TROUBLESHOOT: MACHINE_TROUBLESHOOT,
  MACHINE_MAINTENANCE: MACHINE_MAINTENANCE
};
})();
