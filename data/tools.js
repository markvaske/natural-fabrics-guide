// [MIG-005] Tools reference data
// Register on NFG_DATA for async loading
(function() {

const NEEDLE_DATA = {
  cotton: {
    needleTypes: [
      { name: "Universal", sizes: "70/10–80/12", use: "General cotton sewing — quilting cotton, poplin, chambray" },
      { name: "Sharp / Microtex", sizes: "70/10–80/12", use: "Precise topstitching, fine lawns, and voile" },
      { name: "Denim", sizes: "90/14–100/16", use: "Canvas, duck, denim — multiple layers" },
      { name: "Quilting", sizes: "75/11–90/14", use: "Piecing and free-motion quilting through batting" }
    ],
    threadRecs: [
      { weight: "50 wt cotton", brand: "Aurifil, Gutermann Natural Cotton", use: "Piecing, quilting, general garment sewing. All-cotton projects." },
      { weight: "40 wt cotton", brand: "Aurifil 40wt, Presencia Finca", use: "Decorative topstitching, visible seams, machine appliqué." },
      { weight: "50 wt polyester", brand: "Gutermann Sew-All, Coats Dual Duty", use: "Stronger seams, mixed-fiber projects, items that see heavy wear." },
      { weight: "28 wt cotton", brand: "Aurifil 28wt", use: "Bold decorative stitching, hand quilting." }
    ],
    machineSettings: {
      lightweight: { stitch: "2.0–2.5 mm", tension: "3–4", foot: "Standard zigzag or straight stitch plate", speed: "Medium", notes: "Use a single-hole throat plate for fine fabrics to prevent puckering." },
      medium: { stitch: "2.5–3.0 mm", tension: "4–4.5", foot: "Standard presser foot", speed: "Medium–Fast", notes: "The workhorse setting. Most cotton quilting and garment sewing lives here." },
      heavy: { stitch: "3.0–3.5 mm", tension: "4–5", foot: "Walking foot for multiple layers", speed: "Slow–Medium", notes: "Reduce speed through multiple layers. May need to hand-walk the first stitch." }
    },
    tips: [
      "Change needle every 6–8 hours of sewing or at the start of each project.",
      "Cotton thread on cotton fabric shrinks at the same rate — ideal for garments you'll wash.",
      "For quilting through batting, a slightly longer stitch (3.0 mm) reduces puckering.",
      "Winding a bobbin too fast can stretch thread and cause tension issues."
    ]
  },
  linen: {
    needleTypes: [
      { name: "Sharp / Microtex", sizes: "70/10–80/12", use: "The preferred needle — clean penetration through dense bast fibers" },
      { name: "Universal", sizes: "80/12–90/14", use: "Medium to heavy linen when precision is less critical" },
      { name: "Denim", sizes: "90/14–100/16", use: "Heavy upholstery linen and multiple layers" }
    ],
    threadRecs: [
      { weight: "50 wt polyester", brand: "Gutermann Sew-All, Mettler Metrosene", use: "Best all-around choice — polyester won't break down from linen's abrasion." },
      { weight: "50 wt cotton", brand: "Aurifil 50wt", use: "All-natural projects. May wear faster at seam stress points than polyester." },
      { weight: "30 wt cotton", brand: "Aurifil 30wt", use: "Topstitching on heavier linen. Visible, decorative seams." }
    ],
    machineSettings: {
      lightweight: { stitch: "2.0–2.5 mm", tension: "3.5–4", foot: "Standard presser foot", speed: "Medium", notes: "Handkerchief linen frays aggressively — stay-stitch raw edges immediately after cutting." },
      medium: { stitch: "2.5–3.0 mm", tension: "4–4.5", foot: "Standard or walking foot", speed: "Medium", notes: "The sweet spot for dress-weight linen. French seams or flat-felled seams handle fraying." },
      heavy: { stitch: "3.0–3.5 mm", tension: "4.5–5", foot: "Walking foot", speed: "Slow–Medium", notes: "Heavy linen resists feeding — a walking foot prevents layer shift." }
    },
    tips: [
      "Linen dulls needles faster than cotton. Change needles more frequently.",
      "Clip into seam allowances on curves — linen doesn't ease well due to zero stretch.",
      "Press seams open with high steam; linen takes a sharp press beautifully.",
      "Consider flat-felled seams for garments — they reinforce against fraying and look professional."
    ]
  },
  silk: {
    needleTypes: [
      { name: "Microtex / Sharp", sizes: "60/8–70/10", use: "The only choice for fine silks — minimizes hole size and snagging" },
      { name: "Universal", sizes: "70/10", use: "Only for heavier silks like dupioni or noil — never for charmeuse" }
    ],
    threadRecs: [
      { weight: "100 wt silk", brand: "YLI #100, Tire Silk", use: "Nearly invisible seams on fine silk. The traditional choice." },
      { weight: "60 wt polyester", brand: "Superior Threads So Fine!, Mettler Silk-Finish 60", use: "Fine, strong, less expensive than silk thread. Works beautifully." },
      { weight: "50 wt silk", brand: "Gutermann Silk, YLI #50", use: "General silk sewing where thread visibility is less critical." }
    ],
    machineSettings: {
      lightweight: { stitch: "1.8–2.2 mm", tension: "2.5–3.5", foot: "Straight stitch foot with single-hole plate", speed: "Slow", notes: "Lower tension significantly. Silk puckers easily. Test on scraps first." },
      medium: { stitch: "2.2–2.5 mm", tension: "3–4", foot: "Standard or even-feed foot", speed: "Slow–Medium", notes: "Dupioni and noil behave more like cotton. Still use a fresh, sharp needle." }
    },
    tips: [
      "Pin only within seam allowances — pin holes in silk are permanent.",
      "Place tissue paper under the fabric to prevent it from being pulled into the feed dogs.",
      "Use pattern weights instead of pins when possible — silk shifts under pinning pressure.",
      "Press on the lowest heat setting with a press cloth. Water drops leave permanent marks.",
      "A French seam is the cleanest finish for lightweight silk — it encases raw edges completely."
    ]
  },
  wool: {
    needleTypes: [
      { name: "Universal", sizes: "80/12–90/14", use: "General purpose for woven woolens — gabardine, flannel, challis" },
      { name: "Ballpoint / Jersey", sizes: "80/12–90/14", use: "Wool jersey and knits — pushes between fibers instead of piercing" },
      { name: "Sharp", sizes: "80/12", use: "Precision topstitching on smooth worsted fabrics" },
      { name: "Leather / Heavy", sizes: "100/16", use: "Boiled wool, heavy melton, multiple coat layers" }
    ],
    threadRecs: [
      { weight: "50 wt polyester", brand: "Gutermann Sew-All, Mettler Metrosene", use: "Best all-around. Strong, smooth, handles pressing heat." },
      { weight: "50 wt silk", brand: "Gutermann Silk", use: "Traditional for tailoring. Slight stretch matches wool's elasticity." },
      { weight: "30 wt polyester", brand: "Gutermann Top Stitch", use: "Visible topstitching on coats and jackets." }
    ],
    machineSettings: {
      lightweight: { stitch: "2.0–2.5 mm", tension: "3.5–4", foot: "Standard presser foot", speed: "Medium", notes: "Wool challis and lightweight crepe. Handle like a stable cotton." },
      medium: { stitch: "2.5–3.0 mm", tension: "4–4.5", foot: "Standard or walking foot", speed: "Medium", notes: "Flannel, gabardine, suiting. Walking foot helps with slippery linings." },
      heavy: { stitch: "3.0–4.0 mm", tension: "4.5–5", foot: "Walking foot; roller foot for melton", speed: "Slow", notes: "Melton and boiled wool can be very thick. Hand-crank through seam intersections." }
    },
    tips: [
      "Do NOT pre-wash wool — steam press or professionally sponge.",
      "Wool press cloth is essential. Direct iron contact causes shine marks.",
      "Let pressed pieces cool flat before moving — wool 'sets' as it cools.",
      "Use tailor's ham and sleeve roll for shaping curved seams.",
      "Wool's natural elasticity allows easing extra fullness into a shorter seam."
    ]
  },
  hemp: {
    needleTypes: [
      { name: "Sharp / Microtex", sizes: "80/12–90/14", use: "Dense bast fibers need a sharp point for clean penetration" },
      { name: "Denim", sizes: "90/14–110/18", use: "Heavy hemp canvas and multiple layers" }
    ],
    threadRecs: [
      { weight: "50 wt polyester", brand: "Gutermann Sew-All", use: "Best choice — strong enough for hemp's demanding fiber structure." },
      { weight: "40 wt polyester", brand: "Coats Dual Duty XP", use: "Heavier hemp canvas and bags. Extra strength." }
    ],
    machineSettings: {
      lightweight: { stitch: "2.5 mm", tension: "4", foot: "Standard presser foot", speed: "Medium", notes: "Hemp muslin. Behaves similarly to cotton muslin." },
      medium: { stitch: "2.5–3.0 mm", tension: "4–4.5", foot: "Standard or walking foot", speed: "Medium", notes: "Hemp-cotton blends and dress-weight hemp." },
      heavy: { stitch: "3.0–3.5 mm", tension: "5–6", foot: "Walking foot or roller foot", speed: "Slow", notes: "Hemp canvas is dense — slow down, use a jeans needle, and don't force it." }
    },
    tips: [
      "Hemp dulls needles quickly. Change every 4–6 hours of sewing.",
      "Flat-felled seams work well — hemp frays like linen.",
      "Press with maximum heat and plenty of steam. Hemp can take it.",
      "The fabric softens dramatically after 3–5 washes. Don't judge the finished garment by how the fabric feels off the bolt."
    ]
  },
  bamboo: {
    needleTypes: [
      { name: "Ballpoint / Jersey", sizes: "70/10–80/12", use: "Bamboo jersey and knit fabrics — essential for avoiding snags" },
      { name: "Sharp / Microtex", sizes: "70/10–80/12", use: "Woven bamboo — rayon, twill, lyocell" },
      { name: "Stretch", sizes: "75/11", use: "Bamboo-spandex blends with high stretch content" }
    ],
    threadRecs: [
      { weight: "50 wt polyester", brand: "Gutermann Sew-All", use: "Best choice for bamboo viscose. Cotton thread can break on stretch fabrics." },
      { weight: "Woolly nylon", brand: "YLI Woolly Nylon", use: "In the bobbin for knits — provides stretch recovery in seams." }
    ],
    machineSettings: {
      lightweight: { stitch: "2.0–2.5 mm (straight); narrow zigzag for knits", tension: "3–3.5", foot: "Walking foot or even-feed", speed: "Medium", notes: "Reduce presser foot pressure to prevent wavy seams on slippery bamboo." },
      medium: { stitch: "2.5 mm (wovens); stretch stitch for knits", tension: "3.5–4", foot: "Walking foot for wovens; stretch foot for knits", speed: "Medium", notes: "Bamboo twill has more body and feeds more reliably than viscose." }
    },
    tips: [
      "Bamboo viscose is slippery — use pattern weights, not pins, and cut single-layer.",
      "Reduce presser foot pressure to prevent the fabric from stretching during sewing.",
      "Seams on bamboo knit need to stretch — use a zigzag, stretch stitch, or serger.",
      "Press on medium heat only. High heat damages the regenerated cellulose fibers."
    ]
  },
  ramie: {
    needleTypes: [
      { name: "Sharp / Microtex", sizes: "80/12–90/14", use: "Dense bast fiber requires sharp penetration" },
      { name: "Universal", sizes: "80/12", use: "Ramie-cotton blends where precision is less critical" }
    ],
    threadRecs: [
      { weight: "50 wt polyester", brand: "Gutermann Sew-All", use: "Best all-around — handles the stiff, dense fabric well." },
      { weight: "50 wt cotton", brand: "Aurifil 50wt", use: "All-natural projects. Choose polyester if durability is paramount." }
    ],
    machineSettings: {
      lightweight: { stitch: "2.0–2.5 mm", tension: "4", foot: "Standard presser foot", speed: "Medium", notes: "Ramie-cotton blends at lighter weights." },
      medium: { stitch: "2.5–3.0 mm", tension: "4–4.5", foot: "Standard or walking foot", speed: "Medium", notes: "Pure ramie cloth. Frays readily — finish seams immediately." }
    },
    tips: [
      "Ramie fibers are stiff and resist bending — seams don't ease well.",
      "French seams or serged edges are essential; ramie frays aggressively.",
      "Presses crisply with high heat, very similar to linen.",
      "Low elasticity means poor wrinkle recovery — embrace the character or blend with cotton."
    ]
  },
  jute: {
    needleTypes: [
      { name: "Denim / Heavy-duty", sizes: "90/14–110/18", use: "Thick, coarse fibers demand strong needles" },
      { name: "Leather", sizes: "100/16–110/18", use: "Very heavy burlap and multi-layer construction" }
    ],
    threadRecs: [
      { weight: "40 wt polyester (heavy-duty)", brand: "Coats Dual Duty XP Heavy", use: "Standard choice for jute projects." },
      { weight: "Upholstery thread", brand: "Coats & Clark Upholstery, Gütermann Tera", use: "Extremely heavy jute — webbing, thick burlap bags." }
    ],
    machineSettings: {
      heavy: { stitch: "3.0–4.0 mm", tension: "5–6", foot: "Walking foot or roller foot", speed: "Very Slow", notes: "Jute fibers are thick and irregular. Go slow, use a heavy needle, clean lint frequently." }
    },
    tips: [
      "Jute sheds enormous amounts of lint. Clean your machine after every project.",
      "Use a rotary cutter — scissors struggle with the coarse fibers.",
      "Jute weakens significantly when wet. Spot-clean finished projects, don't machine wash.",
      "Line anything that contacts skin — raw jute is scratchy and can irritate."
    ]
  },
  alpaca: {
    needleTypes: [
      { name: "Sharp", sizes: "80/12–90/14", use: "Woven alpaca suiting and coatings" },
      { name: "Ballpoint / Jersey", sizes: "80/12", use: "Alpaca knits and jersey" }
    ],
    threadRecs: [
      { weight: "50 wt polyester", brand: "Gutermann Sew-All", use: "Best all-around. Strong, smooth, handles pressing." },
      { weight: "50 wt silk", brand: "Gutermann Silk", use: "Traditional for luxury garments. Slight stretch matches the fiber." }
    ],
    machineSettings: {
      lightweight: { stitch: "2.0–2.5 mm", tension: "3.5–4", foot: "Standard presser foot", speed: "Medium", notes: "Baby alpaca wovens. Handle gently — alpaca has low memory." },
      medium: { stitch: "2.5–3.0 mm", tension: "4–4.5", foot: "Walking foot", speed: "Medium", notes: "Alpaca suiting and coatings. Stay-tape structural seams." },
      heavy: { stitch: "3.0–3.5 mm", tension: "4.5–5", foot: "Walking foot", speed: "Slow", notes: "Thick bouclé and coatings. Grade seams to reduce bulk." }
    },
    tips: [
      "Stay-tape shoulders, necklines, and waistlines — alpaca stretches and won't recover.",
      "Alpaca has low memory. Garments can grow — size down or add structure.",
      "Press very gently with low steam. Alpaca can felt, though less readily than sheep's wool.",
      "Store flat, never on hangers. Gravity will distort the shape over time."
    ]
  },
  mohair: {
    needleTypes: [
      { name: "Sharp", sizes: "80/12–90/14", use: "Woven mohair suiting and pile fabrics" },
      { name: "Ballpoint", sizes: "80/12", use: "Mohair knits and brushed mohair" }
    ],
    threadRecs: [
      { weight: "50 wt polyester", brand: "Gutermann Sew-All", use: "Strong and smooth through hairy fabric." },
      { weight: "50 wt silk", brand: "Gutermann Silk", use: "Luxury garments and tailoring." }
    ],
    machineSettings: {
      lightweight: { stitch: "2.0–2.5 mm", tension: "3.5–4", foot: "Standard presser foot", speed: "Medium", notes: "Kid mohair and lightweight brushed knits." },
      medium: { stitch: "2.5–3.0 mm", tension: "4–4.5", foot: "Walking foot or roller foot", speed: "Medium", notes: "Mohair suiting and blends. The pile can interfere with feeding." },
      heavy: { stitch: "3.0–3.5 mm", tension: "4.5", foot: "Walking foot", speed: "Slow–Medium", notes: "Mohair velvet and heavy pile. Reduce presser foot pressure." }
    },
    tips: [
      "Mark seam lines with chalk or temporary basting — the pile obscures markings.",
      "Press on a velvet board or thick terry towel, face down, to preserve the pile.",
      "Grade seams (trim one side shorter) to reduce bulk in fluffy fabric.",
      "Use a roller foot if your walking foot catches on the pile surface."
    ]
  },
  angora: {
    needleTypes: [
      { name: "Ballpoint", sizes: "70/10–80/12", use: "Angora knits — pushes between fibers rather than breaking them" }
    ],
    threadRecs: [
      { weight: "50 wt polyester", brand: "Gutermann Sew-All", use: "Standard choice. Slippery polyester moves through the loft smoothly." }
    ],
    machineSettings: {
      lightweight: { stitch: "2.5–3.0 mm (stretch stitch for knits)", tension: "3–3.5", foot: "Walking foot", speed: "Slow", notes: "Reduce presser foot pressure significantly — the loft crushes easily." }
    },
    tips: [
      "Angora is primarily a knitting fiber — yardage is uncommon.",
      "When sewing angora knit fabric, use a walking foot to prevent stretching.",
      "Reduce presser foot pressure to avoid permanently flattening the loft.",
      "Store flat, never on hangers — angora will stretch and won't recover.",
      "Freeze finished items briefly to reduce initial shedding."
    ]
  },
  tencel: {
    needleTypes: [
      { name: "Sharp / Microtex", sizes: "70/10–80/12", use: "Clean penetration through smooth regenerated fibers" },
      { name: "Ballpoint", sizes: "75/11–80/12", use: "Tencel jersey and knit blends" }
    ],
    threadRecs: [
      { weight: "50 wt polyester", brand: "Gutermann Sew-All", use: "Standard choice for all Tencel sewing." },
      { weight: "50 wt cotton", brand: "Aurifil", use: "Natural fiber thread for wovens — matching fiber content." }
    ],
    machineSettings: {
      lightweight: { stitch: "2.0–2.5 mm", tension: "3–4", foot: "Standard or walking foot", speed: "Moderate", notes: "Slippery — use walking foot if shifting. Tissue paper under helps with very fine weights." },
      medium: { stitch: "2.5 mm", tension: "4", foot: "Walking foot recommended", speed: "Moderate", notes: "Tencel twill is stable enough for standard sewing. Pre-wash for shrinkage." },
      heavy: { stitch: "3.0 mm", tension: "4–4.5", foot: "Walking foot", speed: "Moderate–Slow", notes: "Tencel denim requires denim needle (90/14) for heavier weights." }
    },
    tips: [
      "Cut single layer with weights — Tencel shifts on itself.",
      "Pre-wash to remove manufacturing finishes and pre-shrink.",
      "French seams or serged edges work best — raw edges fray readily.",
      "Press from the wrong side with steam at medium heat.",
      "Understitch facings and linings to prevent rolling."
    ]
  },
  viscose: {
    needleTypes: [
      { name: "Sharp / Microtex", sizes: "70/10–80/12", use: "Essential for clean holes — viscose fibers snag easily" },
      { name: "Ballpoint", sizes: "75/11", use: "Rayon jersey knits" }
    ],
    threadRecs: [
      { weight: "50 wt polyester", brand: "Gutermann Sew-All", use: "Smooth polyester glides through slippery fabric." },
      { weight: "50 wt rayon embroidery thread", brand: "Sulky", use: "Decorative topstitching with matching sheen." }
    ],
    machineSettings: {
      lightweight: { stitch: "2.0–2.5 mm", tension: "3–3.5", foot: "Walking foot or tissue paper", speed: "Slow–Moderate", notes: "Very slippery. Support fabric so it doesn't pull off the table." },
      medium: { stitch: "2.5 mm", tension: "3.5–4", foot: "Walking foot recommended", speed: "Moderate", notes: "Viscose twill and crepe are more manageable than challis." }
    },
    tips: [
      "Pre-wash — viscose shrinks 5–8%. Use cold water, gentle cycle.",
      "Cut with weights in a single layer. Rotary cutter is ideal.",
      "Use a walking foot to prevent shifting on slippery layers.",
      "French seams are the professional finish for viscose garments.",
      "Stay-stitch necklines and armholes immediately after cutting to prevent stretching."
    ]
  },
  modal: {
    needleTypes: [
      { name: "Ballpoint / Jersey", sizes: "70/10–80/12", use: "Modal jersey and knit fabrics — pushes between fibers" },
      { name: "Sharp / Microtex", sizes: "70/10–80/12", use: "Woven modal (less common)" }
    ],
    threadRecs: [
      { weight: "50 wt polyester", brand: "Gutermann Sew-All", use: "Standard choice. Smooth, strong, matches the fiber's easy-care nature." },
      { weight: "40 wt stretch polyester", brand: "Eloflex / Maraflex", use: "Stretch seams on modal jersey without a serger." }
    ],
    machineSettings: {
      lightweight: { stitch: "2.5 mm (stretch stitch or narrow zigzag for knits)", tension: "3–3.5", foot: "Walking foot", speed: "Moderate", notes: "Use differential feed on serger to prevent wavy seams." },
      medium: { stitch: "2.5–3.0 mm (stretch stitch for knits)", tension: "3.5–4", foot: "Walking foot or standard", speed: "Moderate", notes: "Modal has good stability at medium weights. Press seams flat." }
    },
    tips: [
      "Modal is primarily a knit fabric — use a ballpoint needle.",
      "A walking foot prevents the stretchy fabric from shifting.",
      "Use a stretch stitch or narrow zigzag to maintain seam elasticity.",
      "Stabilize shoulder seams with clear elastic or twill tape.",
      "Pre-wash to remove factory finishes — modal stays soft through washing."
    ]
  },
  cupro: {
    needleTypes: [
      { name: "Sharp / Microtex", sizes: "60/8–70/10", use: "Fine cupro requires the slimmest needle for invisible holes" },
      { name: "Universal", sizes: "70/10", use: "Heavier cupro blends when precision is less critical" }
    ],
    threadRecs: [
      { weight: "60 wt polyester", brand: "Gutermann Extra Fine", use: "Lightweight thread for fine fabrics — won't add bulk to seams." },
      { weight: "50 wt silk", brand: "YLI Silk", use: "Silk thread for premium invisible seams." }
    ],
    machineSettings: {
      lightweight: { stitch: "2.0–2.5 mm", tension: "3–3.5", foot: "Walking foot or tissue paper under", speed: "Slow", notes: "Very slippery. Support fabric weight. Use sharp needle and fine thread." }
    },
    tips: [
      "Cupro is extremely slippery — cut in a single layer with weights.",
      "Use French seams for a clean, professional finish.",
      "Pin within seam allowances only — pin holes show on fine cupro.",
      "Mark with tailor's tacks, not chalk or pens — marks may be permanent.",
      "Press from the wrong side with low heat; steam helps."
    ]
  },
  cashmere: {
    needleTypes: [
      { name: "Sharp", sizes: "70/10–80/12", use: "Woven cashmere — precise, small holes" },
      { name: "Ballpoint", sizes: "70/10–80/12", use: "Cashmere jersey and knit fabrics" }
    ],
    threadRecs: [
      { weight: "60 wt silk", brand: "YLI Silk", use: "The gold standard for cashmere — thin, strong, invisible." },
      { weight: "50 wt polyester", brand: "Gutermann Sew-All", use: "More affordable alternative. Smooth enough for fine cashmere." }
    ],
    machineSettings: {
      lightweight: { stitch: "2.0–2.5 mm (stretch stitch for knits)", tension: "3–3.5", foot: "Walking foot", speed: "Slow", notes: "Reduce presser foot pressure. Use tissue paper under if needed." },
      medium: { stitch: "2.5 mm", tension: "3.5", foot: "Walking foot or standard", speed: "Slow–Moderate", notes: "Woven cashmere suiting is more stable. Press carefully with steam through a press cloth." },
      heavy: { stitch: "3.0 mm", tension: "4", foot: "Walking foot", speed: "Slow", notes: "Double-face cashmere requires hand finishing of seams between layers." }
    },
    tips: [
      "Pre-test everything on a scrap — cashmere doesn't forgive mistakes.",
      "Reduce presser foot pressure to avoid flattening the nap.",
      "Use silk thread for the most invisible seams.",
      "Interface with fusible knit interfacing — never woven fusible.",
      "Hand-sew hems with a catchstitch for an invisible finish."
    ]
  },
  camel: {
    needleTypes: [
      { name: "Sharp / Universal", sizes: "80/12–90/14", use: "Woven camel coatings and suiting" },
      { name: "Ballpoint", sizes: "80/12", use: "Camel hair knits (rare)" }
    ],
    threadRecs: [
      { weight: "50 wt polyester", brand: "Gutermann Sew-All", use: "Standard choice for camel coatings. Strong, smooth." },
      { weight: "50 wt silk", brand: "YLI Silk", use: "Premium seams on luxury camel coats. Silk presses beautifully." }
    ],
    machineSettings: {
      medium: { stitch: "2.5–3.0 mm", tension: "4", foot: "Walking foot or standard", speed: "Moderate", notes: "Camel suiting sews much like wool suiting. Press with steam." },
      heavy: { stitch: "3.0–3.5 mm", tension: "4–5", foot: "Walking foot", speed: "Slow–Moderate", notes: "Heavy coatings may need a heavier needle (100/16). Sew through multiple layers slowly." }
    },
    tips: [
      "Treat like high-end wool — press with steam through a press cloth.",
      "Bound seams or Hong Kong finishes suit the premium fabric.",
      "Interface tailored areas with hair canvas (sew-in) for structure.",
      "The natural color doesn't hold dye — plan for the golden-tan shade.",
      "Use a walking foot for heavy coatings to prevent shifting."
    ]
  },
  pina: {
    needleTypes: [
      { name: "Microtex / Sharp", sizes: "60/8–70/10", use: "Pure piña cloth — the fine fibers demand a very sharp, thin needle" },
      { name: "Universal", sizes: "70/10–80/12", use: "Piña-cotton or piña-silk blends with more body" }
    ],
    threadRecs: [
      { weight: "60 wt silk", brand: "YLI Silk #100", use: "Traditional choice for piña. Fine thread matches the delicate fabric." },
      { weight: "60 wt cotton", brand: "Aurifil 2-ply", use: "Affordable alternative. Fine enough for sheer piña." }
    ],
    machineSettings: {
      light: { stitch: "1.8–2.2 mm", tension: "3–4", foot: "Standard or straight-stitch plate", speed: "Slow", notes: "Very delicate fabric. Use a single-hole throat plate to prevent fabric being pulled down. Consider hand sewing for best results." }
    },
    tips: [
      "Hand sewing is traditional and often produces cleaner results than machine.",
      "Use the finest needle possible — pins and needles leave visible holes.",
      "French seams enclose raw edges beautifully on this sheer fabric.",
      "Support fabric with tissue paper underneath when machine sewing.",
      "Press with low heat; test on scrap first."
    ]
  },
  kapok: {
    needleTypes: [
      { name: "Universal", sizes: "70/10–80/12", use: "Kapok-cotton blends — standard weight fabrics" },
      { name: "Ballpoint", sizes: "70/10–80/12", use: "Kapok-cotton jersey knit blends" }
    ],
    threadRecs: [
      { weight: "50 wt polyester", brand: "Gutermann Sew-All", use: "All-purpose for kapok blend fabrics." },
      { weight: "50 wt cotton", brand: "Aurifil 50wt", use: "Natural fiber option for kapok-cotton blends." }
    ],
    machineSettings: {
      light: { stitch: "2.0–2.5 mm", tension: "3–4", foot: "Standard or walking foot", speed: "Moderate", notes: "Kapok blends sew like their partner fiber. Use walking foot for fill/batting layers." },
      medium: { stitch: "2.5–3.0 mm", tension: "4", foot: "Walking foot", speed: "Moderate", notes: "Heavier blends and quilted kapok layers benefit from a walking foot." }
    },
    tips: [
      "Sewing characteristics depend almost entirely on the blend partner fiber.",
      "For kapok-filled items, use a walking foot to feed layers evenly.",
      "Quilt or tack filling in place to prevent shifting — kapok is slippery.",
      "Fine kapok fibers create static cling — an anti-static spray on the cutting mat helps.",
      "Kapok fill compresses when sewn through — plan for slightly thinner seam areas."
    ]
  },
  nettle: {
    needleTypes: [
      { name: "Universal / Sharp", sizes: "70/10–90/14", use: "Woven nettle cloth and nettle-cotton blends" },
      { name: "Denim", sizes: "90/14–100/16", use: "Heavy Himalayan nettle (allo) canvas and bags" }
    ],
    threadRecs: [
      { weight: "50 wt polyester", brand: "Gutermann Sew-All", use: "Strong, versatile. Good for everyday nettle garments." },
      { weight: "50 wt cotton", brand: "Aurifil 50wt", use: "Natural fiber match. Works well for lighter nettle cloth." },
      { weight: "40 wt polyester", brand: "Gutermann Extra Strong", use: "Heavy allo canvas for bags and outerwear." }
    ],
    machineSettings: {
      light: { stitch: "2.2–2.5 mm", tension: "4", foot: "Standard", speed: "Moderate", notes: "Lighter nettle-cotton blends handle like linen-cotton. Sharp needle recommended." },
      medium: { stitch: "2.5–3.0 mm", tension: "4–5", foot: "Standard or walking foot", speed: "Moderate", notes: "Pure nettle cloth is stiff. Let the feed dogs pull — don't force the fabric." },
      heavy: { stitch: "3.0–3.5 mm", tension: "4–5", foot: "Walking foot", speed: "Slow–Moderate", notes: "Himalayan nettle canvas is tough — use a denim needle and go slowly." }
    },
    tips: [
      "Handle like linen — pre-wash to soften and pre-shrink before cutting.",
      "Nettle fibers are tough and will dull blades — use a fresh rotary blade.",
      "French seams or serged edges recommended; frays like linen.",
      "Press with high heat and steam, like linen.",
      "The fabric softens dramatically after 2–3 washes — don't judge the final drape by unwashed fabric."
    ]
  }
};


const TECHNIQUE_DATA = {
  shaping: {
    label: "Shaping",
    techniques: [
      {
        name: "Darts",
        aka: "Bust dart, waist dart, French dart",
        desc: "Triangular or diamond-shaped folds stitched from the fabric edge toward a body curve. They remove excess fabric to create three-dimensional shape — transforming flat cloth into something that fits a bust, waist, or shoulder.",
        steps: [
          "Mark dart points from your pattern onto fabric using chalk or a tracing wheel.",
          "Fold the dart right sides together, matching the dart legs exactly. Pin from the wide end toward the point.",
          "Stitch from the wide end toward the point. At the tip, sew the last 3–4 stitches right along the fold — do not backstitch at the point.",
          "Tie off threads at the point (backstitching creates a dimple). Press the dart flat, then toward the center or downward."
        ],
        whenToUse: "Any fitted garment — bodices, blouses, trousers, skirts. Wherever flat fabric needs to curve around the body.",
        fabricNote: "On thick fabrics (wool, denim), slash the dart fold open and press flat to reduce bulk. On sheer fabrics, trim the dart fold to ¼\" and finish the raw edge.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M20 100 L60 30 L100 100" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.08)"/><line x1="60" y1="30" x2="60" y2="100" stroke="#8B6B4A" stroke-width="1" stroke-dasharray="4 3"/><circle cx="60" cy="30" r="3" fill="#8B6B4A"/><text x="60" y="115" font-family="Georgia, serif" font-size="8" fill="#5C554D" text-anchor="middle">dart point</text><line x1="20" y1="100" x2="100" y2="100" stroke="#C4A882" stroke-width="1.5"/></svg>`
      },
      {
        name: "Tucks",
        aka: "Pin tucks, release tucks, blind tucks",
        desc: "Narrow, stitched folds in fabric that add controlled fullness or decorative texture. Unlike darts, tucks are usually parallel and evenly spaced. Pin tucks are very narrow (1–2mm); wider tucks can control fullness at a yoke or waistband.",
        steps: [
          "Mark tuck lines on your fabric, keeping them parallel and evenly spaced.",
          "Fold fabric along each tuck line, wrong sides together for pin tucks (or right sides for hidden tucks).",
          "Stitch an even distance from the fold — 1mm for pin tucks, wider for release tucks.",
          "Press all tucks in the same direction. For release tucks, stitch only partway — the fabric fans open below the stitching."
        ],
        whenToUse: "Blouse fronts, yoke detailing, children's garments, heirloom sewing. Release tucks control fullness at waists and cuffs.",
        fabricNote: "Pin tucks work best on lightweight, crisp fabrics like cotton lawn or silk organza. Use a pintuck foot and twin needle for machine pin tucks.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><g stroke="#8B6B4A" stroke-width="1.5"><line x1="25" y1="15" x2="25" y2="105"/><line x1="28" y1="15" x2="28" y2="105"/><line x1="45" y1="15" x2="45" y2="105"/><line x1="48" y1="15" x2="48" y2="105"/><line x1="65" y1="15" x2="65" y2="105"/><line x1="68" y1="15" x2="68" y2="105"/><line x1="85" y1="15" x2="85" y2="105"/><line x1="88" y1="15" x2="88" y2="105"/></g><g fill="#C4A882" opacity="0.2"><rect x="25" y="15" width="3" height="90"/><rect x="45" y="15" width="3" height="90"/><rect x="65" y="15" width="3" height="90"/><rect x="85" y="15" width="3" height="90"/></g></svg>`
      },
      {
        name: "Knife Pleats",
        aka: "Side pleats, straight pleats",
        desc: "Folds of fabric all turned in the same direction. The simplest pleat type — fold, fold, fold, all the same way, like a paper fan. Each pleat has two fold lines: the fold edge (what you see) and the placement line (where the fold meets the flat fabric).",
        steps: [
          "Mark fold lines and placement lines on the wrong side of the fabric.",
          "Bring each fold line to its placement line. Pin in place.",
          "Baste across the top of the pleats to secure them before attaching a waistband or yoke.",
          "Topstitch or edgestitch individual pleats if you want them to stay sharp, or leave them to swing free."
        ],
        whenToUse: "Skirts, kilts, uniform skirts, curtains. When you want controlled fullness with a crisp, structured look.",
        fabricNote: "Sharp pleats need crisp fabrics — wool suiting, cotton poplin, poly blends. Soft fabrics (silk, rayon) produce softer, flowing pleats that won't hold a crease.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M10 20 L10 100 L30 100 L30 20" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><path d="M30 20 L30 100 L50 100 L50 20" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.12)"/><path d="M50 20 L50 100 L70 100 L70 20" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><path d="M70 20 L70 100 L90 100 L90 20" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.12)"/><path d="M90 20 L90 100 L110 100 L110 20" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><g stroke="#5B8C6B" stroke-width="1.2"><path d="M15 40 L25 40" marker-end="url(#arrow)"/><path d="M35 40 L45 40"/><path d="M55 40 L65 40"/><path d="M75 40 L85 40"/></g></svg>`
      },
      {
        name: "Box Pleats",
        aka: "Inverted box pleat (reverse side)",
        desc: "Two knife pleats turned away from each other, forming a flat front panel with fabric folded symmetrically behind it. The reverse side shows an inverted pleat (two folds meeting in the center). Used for structured, uniform fullness.",
        steps: [
          "Mark three lines for each box pleat: two fold lines and one center placement line.",
          "Bring both fold lines to the center placement line. The folds face away from each other on the right side.",
          "Pin and baste across the top.",
          "Press firmly. Topstitch or edgestitch the outer folds if you want them to hold their shape."
        ],
        whenToUse: "Skirt backs, shirt backs (center box pleat), valances, slipcovers. When you want neat, structured fullness.",
        fabricNote: "Works well on medium-weight fabrics. On bulky fabrics, trim away some of the hidden fold to reduce bulk at the waistband.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="5" y="20" width="110" height="80" fill="none" stroke="#C4A882" stroke-width="1"/><path d="M20 20 L20 100" stroke="#8B6B4A" stroke-width="1.5"/><path d="M40 20 L40 100" stroke="#8B6B4A" stroke-width="1.5"/><path d="M80 20 L80 100" stroke="#8B6B4A" stroke-width="1.5"/><path d="M100 20 L100 100" stroke="#8B6B4A" stroke-width="1.5"/><rect x="20" y="20" width="20" height="80" fill="rgba(139,107,74,0.1)"/><rect x="80" y="20" width="20" height="80" fill="rgba(139,107,74,0.1)"/><path d="M25 50 L35 50" stroke="#5B8C6B" stroke-width="1.2"/><path d="M85 50 L95 50" stroke="#5B8C6B" stroke-width="1.2"/><text x="60" y="60" font-family="Georgia, serif" font-size="7" fill="#5C554D" text-anchor="middle">flat panel</text></svg>`
      }
    ]
  },
  fullness: {
    label: "Fullness & Ease",
    techniques: [
      {
        name: "Gathering",
        aka: "Shirring (multiple rows), ruching",
        desc: "Drawing up fabric along a stitching line to create soft, even fullness. The fabric bunches together, creating a ruffled effect. Used to ease a longer piece of fabric into a shorter one — a sleeve into an armhole, a skirt into a waistband.",
        steps: [
          "Set your machine to the longest stitch length. Sew two parallel rows of basting stitches within the seam allowance — one at the seam line, one ⅛\" away. Do not backstitch.",
          "Pull the bobbin threads from one end, sliding the fabric along to create gathers.",
          "Distribute the gathers evenly by hand, matching the gathered piece to the ungathered piece.",
          "Pin, then stitch the permanent seam between the two basting rows. Remove the visible basting row."
        ],
        whenToUse: "Skirt waistlines, sleeve caps, ruffles, tiered skirts, curtain headings. Anywhere you want soft, romantic fullness.",
        fabricNote: "Lightweight fabrics gather beautifully with fine, even folds. Heavy fabrics produce bulky gathers — use fewer gathers or choose pleats instead.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M10 40 Q20 30 25 40 Q30 50 35 40 Q40 30 45 40 Q50 50 55 40 Q60 30 65 40 Q70 50 75 40 Q80 30 85 40 Q90 50 95 40 Q100 30 110 40" stroke="#8B6B4A" stroke-width="2" fill="none"/><path d="M10 60 Q20 50 25 60 Q30 70 35 60 Q40 50 45 60 Q50 70 55 60 Q60 50 65 60 Q70 70 75 60 Q80 50 85 60 Q90 70 95 60 Q100 50 110 60" stroke="#8B6B4A" stroke-width="2" fill="none"/><line x1="10" y1="40" x2="10" y2="60" stroke="#C4A882" stroke-width="1.5"/><line x1="110" y1="40" x2="110" y2="60" stroke="#C4A882" stroke-width="1.5"/><path d="M15 75 L105 75" stroke="#5B8C6B" stroke-width="1" stroke-dasharray="3 3"/><text x="60" y="90" font-family="Georgia, serif" font-size="7" fill="#5C554D" text-anchor="middle">basting rows</text></svg>`
      },
      {
        name: "Easing",
        aka: "Ease stitching, sleeve ease",
        desc: "A subtler version of gathering. Instead of visible gathers, easing distributes a small amount of excess fabric so evenly that no folds or tucks are visible. The extra length just … disappears. Used where a slightly larger piece must join a slightly smaller one without visible fullness.",
        steps: [
          "Sew a single row of basting stitches (longest stitch length) on the larger piece, within the seam allowance.",
          "Pull the bobbin thread gently — just enough to match the smaller piece. No visible gathers should form.",
          "Pin the two pieces together, distributing the ease evenly.",
          "Stitch the seam on the regular stitch length. Press the seam and the ease will blend in."
        ],
        whenToUse: "Setting sleeves into armholes (the sleeve cap is always slightly larger than the armhole), joining a princess seam's convex to concave curve.",
        fabricNote: "Wool eases beautifully — its fibers can be steam-shrunk into shape. Cotton and linen are less cooperative. Silk and synthetics resist easing the most.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M20 80 Q60 20 100 80" stroke="#8B6B4A" stroke-width="2" fill="none"/><path d="M25 80 Q60 35 95 80" stroke="#C4A882" stroke-width="1.5" stroke-dasharray="4 3"/><text x="60" y="50" font-family="Georgia, serif" font-size="7" fill="#8B6B4A" text-anchor="middle">ease</text><circle cx="20" cy="80" r="2.5" fill="#8B6B4A"/><circle cx="100" cy="80" r="2.5" fill="#8B6B4A"/><line x1="20" y1="85" x2="100" y2="85" stroke="#5C554D" stroke-width="1" stroke-dasharray="2 2"/><text x="60" y="100" font-family="Georgia, serif" font-size="7" fill="#5C554D" text-anchor="middle">armhole edge</text></svg>`
      }
    ]
  },
  hems: {
    label: "Hems",
    techniques: [
      {
        name: "Double-Fold Hem",
        aka: "Turned-up hem, clean-finish hem",
        desc: "The most common hem in sewing. The raw edge is folded under once (to hide it), then folded again to the desired hem depth. Both folds enclose the raw edge completely, preventing fraying. Simple, reliable, and appropriate for most woven fabrics.",
        steps: [
          "Press the raw edge up by ¼\" to ½\" (the first fold).",
          "Press up again by the desired hem depth — ½\" to 2\" depending on the garment.",
          "Pin or clip in place. Topstitch close to the upper folded edge, or blind-hem by hand for an invisible finish.",
          "Press the finished hem flat."
        ],
        whenToUse: "Casual garments, everyday shirts and dresses, curtains, home décor. The workhorse hem for cotton and linen.",
        fabricNote: "On curves (like an A-line skirt hem), the first fold creates excess fabric. Ease it in with steam, or use a narrower first fold. Very bulky fabrics may need a single-fold hem with a finished edge instead.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="10" y="15" width="100" height="30" fill="rgba(139,107,74,0.05)" stroke="#C4A882" stroke-width="1"/><rect x="10" y="45" width="100" height="30" fill="rgba(139,107,74,0.1)" stroke="#8B6B4A" stroke-width="1.5"/><rect x="10" y="75" width="100" height="30" fill="rgba(139,107,74,0.15)" stroke="#8B6B4A" stroke-width="1.5"/><text x="60" y="34" font-family="Georgia, serif" font-size="7" fill="#5C554D" text-anchor="middle">garment</text><text x="60" y="64" font-family="Georgia, serif" font-size="7" fill="#8B6B4A" text-anchor="middle">1st fold</text><text x="60" y="94" font-family="Georgia, serif" font-size="7" fill="#8B6B4A" text-anchor="middle">2nd fold</text><line x1="10" y1="48" x2="110" y2="48" stroke="#5B8C6B" stroke-width="1.5" stroke-dasharray="4 2"/><text x="60" y="113" font-family="Georgia, serif" font-size="7" fill="#5B8C6B" text-anchor="middle">topstitch line</text></svg>`
      },
      {
        name: "Rolled Hem",
        aka: "Baby hem, narrow hem, hand-rolled hem",
        desc: "An extremely narrow hem (1–3mm finished) that creates a delicate, barely-there edge. Can be done by machine with a rolled-hem foot, by serger, or by hand. The fabric is rolled tightly, enclosing the raw edge in the tiniest possible fold.",
        steps: [
          "Machine method: Attach a rolled-hem presser foot. Turn a tiny fold, feed it into the foot's scroll, and stitch. The foot curls the fabric as you sew.",
          "Hand method: Trim the seam allowance. Roll 2–3mm of fabric between thumb and forefinger. Take tiny slip stitches, rolling and stitching a few inches at a time.",
          "Serger method: Set your serger for a rolled-hem stitch (usually tighten the lower looper tension and use the rolled-hem plate)."
        ],
        whenToUse: "Scarves, veils, napkins, circle skirts, ruffles, hems on sheer and lightweight fabrics where a bulky hem would show.",
        fabricNote: "Best on lightweight fabrics — silk, chiffon, voile, lawn. Stiff or heavy fabrics won't roll neatly. Practice on scraps first; the machine rolled-hem foot takes getting used to.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M15 50 L85 50 Q95 50 95 55 Q95 60 90 60 Q85 60 85 55 L85 50" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.08)"/><line x1="15" y1="50" x2="15" y2="30" stroke="#C4A882" stroke-width="1"/><text x="50" y="42" font-family="Georgia, serif" font-size="7" fill="#5C554D" text-anchor="middle">fabric</text><text x="95" y="75" font-family="Georgia, serif" font-size="7" fill="#8B6B4A" text-anchor="middle">roll</text><path d="M85 48 L85 35" stroke="#5B8C6B" stroke-width="1" stroke-dasharray="2 2"/><text x="75" y="32" font-family="Georgia, serif" font-size="6" fill="#5B8C6B">stitch</text></svg>`
      },
      {
        name: "Blind Hem",
        aka: "Invisible hem, catch-stitch hem",
        desc: "A hem that is nearly invisible from the right side. The stitches catch only a thread or two of the outer fabric, so only tiny dots are visible. Can be done by hand (slip stitch or catch stitch) or by machine using a blind-hem stitch and foot.",
        steps: [
          "Finish the raw edge (serge, zigzag, or fold under).",
          "Fold the hem up to the desired depth and press.",
          "Fold the hem allowance back on itself, leaving about ⅜\" of the finished edge exposed.",
          "Machine: Use the blind-hem stitch and foot, with the fold riding against the guide. Hand: Take tiny stitches, catching just 1–2 threads of the outer fabric."
        ],
        whenToUse: "Dress pants, skirts, jackets, and any garment where visible topstitching would look too casual.",
        fabricNote: "Works best on medium to heavy woven fabrics where the stitches can hide in the weave. Less effective on sheer or very smooth fabrics where even tiny stitches show.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="10" y="15" width="100" height="40" fill="rgba(139,107,74,0.04)" stroke="#C4A882" stroke-width="1"/><rect x="10" y="55" width="100" height="50" fill="rgba(139,107,74,0.1)" stroke="#8B6B4A" stroke-width="1.5"/><path d="M15 58 L25 58 L27 53 L30 58 L50 58 L52 53 L55 58 L75 58 L77 53 L80 58 L100 58" stroke="#5B8C6B" stroke-width="1.5" fill="none"/><text x="60" y="37" font-family="Georgia, serif" font-size="7" fill="#5C554D" text-anchor="middle">right side</text><text x="60" y="84" font-family="Georgia, serif" font-size="7" fill="#8B6B4A" text-anchor="middle">hem fold</text><text x="60" y="113" font-family="Georgia, serif" font-size="7" fill="#5B8C6B" text-anchor="middle">tiny catch stitches</text></svg>`
      },
      {
        name: "Faced Hem",
        aka: "Bias-faced hem, shaped facing hem",
        desc: "Instead of folding the garment fabric up, a separate strip of fabric (the facing) is sewn to the hem edge, then flipped to the inside. This creates a flat, clean finish with minimal bulk — especially useful on curved hems or when fabric is too short for a traditional fold.",
        steps: [
          "Cut a facing strip 2\"–3\" wide, matching the shape of the hem edge. Use bias strips for curves, straight strips for straight hems.",
          "Sew the facing to the hem edge, right sides together, at your seam allowance.",
          "Trim and grade the seam. Understitch the facing to the seam allowance.",
          "Flip the facing to the inside. Press flat. Tack or topstitch the upper edge of the facing to the garment."
        ],
        whenToUse: "Circle skirts, curved hems, bridal and evening wear, short garments where a deep hem fold would show through.",
        fabricNote: "Cut the facing from matching or lining fabric. On bulky fabrics, use a lighter-weight facing to reduce hem bulk.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="10" y="15" width="100" height="50" fill="rgba(139,107,74,0.04)" stroke="#C4A882" stroke-width="1"/><rect x="10" y="65" width="100" height="25" fill="rgba(91,140,107,0.1)" stroke="#5B8C6B" stroke-width="1.5"/><line x1="10" y1="65" x2="110" y2="65" stroke="#8B6B4A" stroke-width="2"/><text x="60" y="42" font-family="Georgia, serif" font-size="7" fill="#5C554D" text-anchor="middle">garment</text><text x="60" y="81" font-family="Georgia, serif" font-size="7" fill="#3d6b4a" text-anchor="middle">facing (inside)</text><text x="60" y="107" font-family="Georgia, serif" font-size="7" fill="#8B6B4A" text-anchor="middle">seam line</text></svg>`
      }
    ]
  },
  seams: {
    label: "Seam Finishes",
    techniques: [
      {
        name: "French Seam",
        aka: "Self-enclosed seam",
        desc: "A seam that encloses the raw edges completely inside itself — no visible raw edges, no fraying, and a beautifully clean finish inside the garment. Sewn in two passes: first wrong sides together, then right sides together, trapping the raw edges.",
        steps: [
          "Pin fabric wrong sides together (opposite of normal). Stitch a narrow seam at ⅜\".",
          "Trim the seam allowance to ⅛\". Press the seam to one side.",
          "Fold the fabric right sides together along the seam line, enclosing the trimmed raw edges inside the fold.",
          "Stitch again at ¼\", encasing the raw edges. Press the finished seam to one side."
        ],
        whenToUse: "Sheer fabrics (chiffon, organza, voile), lightweight cottons, linen garments, anything where the inside of the garment is visible or you want a couture-quality finish.",
        fabricNote: "Works best on light to medium-weight fabrics. Too bulky for heavy fabrics. Not suitable for curved seams — the enclosed edges bunch up on tight curves.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="10" y="20" width="45" height="80" fill="rgba(139,107,74,0.06)" stroke="#C4A882" stroke-width="1"/><rect x="55" y="20" width="55" height="80" fill="rgba(139,107,74,0.06)" stroke="#C4A882" stroke-width="1"/><rect x="50" y="30" width="10" height="60" fill="rgba(139,107,74,0.15)" stroke="#8B6B4A" stroke-width="1.5" rx="2"/><line x1="55" y1="25" x2="55" y2="95" stroke="#5B8C6B" stroke-width="1.5" stroke-dasharray="3 2"/><text x="55" y="112" font-family="Georgia, serif" font-size="7" fill="#5C554D" text-anchor="middle">edges enclosed</text></svg>`
      },
      {
        name: "Flat-Felled Seam",
        aka: "Run-and-fell seam, lapped seam",
        desc: "An extremely strong, flat seam with two visible rows of topstitching. Both raw edges are enclosed. This is the seam on your jeans — look at the side seams and you'll see two parallel rows of stitching with a neat fold between them.",
        steps: [
          "Sew the seam wrong sides together at the standard seam allowance.",
          "Trim one seam allowance to ⅛\". Press both seam allowances toward the untrimmed side.",
          "Fold the wider seam allowance over the trimmed one, enclosing it. Press flat.",
          "Topstitch through all layers, close to the folded edge."
        ],
        whenToUse: "Jeans, workwear, menswear shirts, outdoor gear, children's clothes — anywhere you need maximum strength and a flat interior.",
        fabricNote: "Ideal for cotton, denim, and linen. The double topstitching adds a casual, workwear aesthetic. On very thick fabrics, use a denim needle and go slowly.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="10" y="30" width="42" height="60" fill="rgba(139,107,74,0.06)" stroke="#C4A882" stroke-width="1"/><rect x="52" y="30" width="58" height="60" fill="rgba(139,107,74,0.06)" stroke="#C4A882" stroke-width="1"/><rect x="52" y="35" width="15" height="50" fill="rgba(139,107,74,0.12)"/><line x1="52" y1="30" x2="52" y2="90" stroke="#8B6B4A" stroke-width="2"/><line x1="67" y1="30" x2="67" y2="90" stroke="#8B6B4A" stroke-width="1.5" stroke-dasharray="3 2"/><text x="60" y="105" font-family="Georgia, serif" font-size="7" fill="#5C554D" text-anchor="middle">two rows of stitching</text></svg>`
      },
      {
        name: "Hong Kong Finish",
        aka: "Hong Kong seam, bound seam allowance",
        desc: "Each raw seam allowance is individually wrapped in a strip of bias-cut fabric (often lightweight silk or lining material). A couture technique that produces a beautifully finished interior. The seam itself is a regular open seam — only the raw edges are bound.",
        steps: [
          "Cut bias strips about 1\" wide from lightweight fabric.",
          "With right sides together, stitch the bias strip to the raw edge of the seam allowance at ¼\".",
          "Wrap the bias strip around the raw edge to the wrong side. Press.",
          "Stitch-in-the-ditch from the right side to catch the wrapped bias underneath, or hand-stitch for an invisible finish."
        ],
        whenToUse: "Unlined jackets and coats, couture garments, any time you want a high-end interior finish without a full lining.",
        fabricNote: "Use a lightweight fabric for the bias binding — silk organza, China silk, or cotton lawn. Match or contrast the color depending on the design.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="10" y="30" width="45" height="60" fill="rgba(139,107,74,0.06)" stroke="#C4A882" stroke-width="1"/><rect x="65" y="30" width="45" height="60" fill="rgba(139,107,74,0.06)" stroke="#C4A882" stroke-width="1"/><line x1="55" y1="25" x2="55" y2="95" stroke="#8B6B4A" stroke-width="2"/><rect x="48" y="35" width="7" height="50" fill="rgba(91,140,107,0.2)" stroke="#5B8C6B" stroke-width="1" rx="1"/><rect x="62" y="35" width="7" height="50" fill="rgba(91,140,107,0.2)" stroke="#5B8C6B" stroke-width="1" rx="1"/><text x="48" y="110" font-family="Georgia, serif" font-size="6" fill="#3d6b4a" text-anchor="middle">bias</text><text x="69" y="110" font-family="Georgia, serif" font-size="6" fill="#3d6b4a" text-anchor="middle">bias</text></svg>`
      }
    ]
  },
  edges: {
    label: "Edge Finishes",
    techniques: [
      {
        name: "Bias Binding",
        aka: "Bias tape, bias facing",
        desc: "Strips of fabric cut on the 45° bias (which makes them stretchy) are folded and sewn around a raw edge, enclosing it completely. Bias binding can follow any curve smoothly because the bias-cut fabric stretches and molds. It can be a visible design element or hidden inside.",
        steps: [
          "Cut bias strips 2\" wide (for ½\" finished binding). Join strips by sewing diagonal seams if you need length.",
          "Press the strip in half lengthwise, wrong sides together.",
          "Open the strip. Sew one raw edge to the garment edge, right sides together, at the fold line.",
          "Fold the binding over the raw edge to the wrong side. The folded edge should just cover the stitching line. Stitch-in-the-ditch from the right side, or hand-stitch the folded edge."
        ],
        whenToUse: "Necklines, armholes, quilt edges, aprons, children's wear, any raw edge that needs a neat finish — especially curves.",
        fabricNote: "Pre-made bias tape comes in many widths and colors. For a custom match, cut your own from the garment fabric. Single-fold for edges, double-fold for binding.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M20 60 Q60 20 100 60" stroke="#C4A882" stroke-width="1.5" fill="rgba(139,107,74,0.04)"/><path d="M18 58 Q58 20 98 58" stroke="#8B6B4A" stroke-width="2.5" fill="none"/><path d="M22 62 Q62 22 102 62" stroke="#8B6B4A" stroke-width="2.5" fill="none"/><path d="M15 65 Q55 28 95 65" stroke="#5B8C6B" stroke-width="1" stroke-dasharray="3 2"/><text x="60" y="85" font-family="Georgia, serif" font-size="7" fill="#5C554D" text-anchor="middle">binding wraps edge</text><text x="60" y="100" font-family="Georgia, serif" font-size="7" fill="#8B6B4A" text-anchor="middle">follows any curve</text></svg>`
      },
      {
        name: "Facing",
        aka: "Shaped facing, self-facing",
        desc: "A shaped piece of fabric that mirrors the edge of the garment — such as a neckline or armhole. It is sewn to the edge right sides together, then flipped to the inside, creating a clean, enclosed finish. Unlike binding, a facing is invisible from the outside.",
        steps: [
          "Cut the facing piece using the pattern's facing template — it matches the garment edge shape exactly.",
          "Finish the outer edge of the facing (serge, zigzag, or turn under and stitch).",
          "Pin the facing to the garment, right sides together. Stitch along the seam line.",
          "Clip curves, trim and grade the seam allowance. Understitch the facing to the seam allowance. Flip the facing inside and press."
        ],
        whenToUse: "Necklines, armholes (sleeveless garments), waistlines, front button bands, jacket hems — wherever you want a clean edge without visible binding or topstitching.",
        fabricNote: "Use self-fabric (the same fabric as the garment) for most facings. On bulky fabrics, cut facings from a lighter-weight material to reduce bulk. Interface the facing for structure.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M20 30 Q60 10 100 30 L100 55 Q60 35 20 55 Z" fill="rgba(91,140,107,0.1)" stroke="#5B8C6B" stroke-width="1.5"/><path d="M20 55 Q60 35 100 55 L100 100 L20 100 Z" fill="rgba(139,107,74,0.06)" stroke="#C4A882" stroke-width="1"/><line x1="20" y1="55" x2="100" y2="55" stroke="none"/><path d="M20 55 Q60 35 100 55" stroke="#8B6B4A" stroke-width="2"/><text x="60" y="25" font-family="Georgia, serif" font-size="7" fill="#3d6b4a" text-anchor="middle">facing</text><text x="60" y="80" font-family="Georgia, serif" font-size="7" fill="#5C554D" text-anchor="middle">garment</text><text x="60" y="112" font-family="Georgia, serif" font-size="7" fill="#8B6B4A" text-anchor="middle">seam at edge</text></svg>`
      }
    ]
  },

  handStitching: {
    label: "Hand Stitching",
    groups: [
      { label: "Basting (Temporary)", count: 3, desc: "Temporary stitches for fitting, alignment, and pattern matching — removed after permanent stitching." },
      { label: "Construction (Permanent)", count: 5, desc: "Structural hand stitches for joins, shaping, and closures where machine stitching won't do." },
      { label: "Finishing & Hemming", count: 4, desc: "Invisible and decorative stitches for hems, linings, and edge treatments." }
    ],
    techniques: [
      // ── BASTING (Temporary) ──
      {
        name: "Running Baste",
        aka: "Tacking, long baste, thread basting",
        desc: "Long, evenly spaced running stitches used to temporarily hold fabric layers together before machine sewing. The quickest basting method — you can pick up multiple stitches on the needle at once, making it faster than pinning for long seams. Always removed after permanent stitching.",
        steps: [
          "Thread a sharp hand needle with contrasting thread (easy to see and remove later). Do not knot — leave a 3\" tail.",
          "Take long running stitches (½\"–¾\") through all layers, keeping tension loose so the fabric lies flat. You can scoop multiple stitches onto the needle at once.",
          "Leave a long tail at the end — do not knot or backstitch. The whole point is easy removal.",
          "After machine stitching the permanent seam, pull one end and the basting slides right out."
        ],
        whenToUse: "Sleeve setting, zipper placement, matching plaids at seams, holding ease in place before machine stitching. Any time pins would shift, leave holes, or get in the way of the presser foot.",
        fabricNote: "Essential for slippery fabrics (silk, rayon) where pins alone can't prevent shifting. On velvet and napped fabrics, baste within the seam allowance to avoid leaving needle marks in the finished garment.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M15 60 L30 60 M38 60 L53 60 M61 60 L76 60 M84 60 L99 60" stroke="#8B6B4A" stroke-width="2.5" stroke-linecap="round"/><path d="M30 60 L38 60 M53 60 L61 60 M76 60 L84 60" stroke="#C4A882" stroke-width="1" stroke-dasharray="2 2"/><circle cx="106" cy="60" r="3" fill="none" stroke="#8B6B4A" stroke-width="1.5"/><path d="M106 57 L106 40 L100 36" stroke="#8B6B4A" stroke-width="1"/><text x="60" y="85" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">long stitches, loose tension</text><text x="60" y="40" font-family="Georgia,serif" font-size="6" fill="#9B9389" text-anchor="middle">contrasting thread</text></svg>`
      },
      {
        name: "Diagonal Baste",
        aka: "Pad baste, tailor baste, flat baste",
        desc: "Diagonal stitches taken across the fabric surface to control shifting between layers. Unlike running baste, these stitches cross the grain at an angle, creating a grid that locks layers together over a wide area rather than just along a line. The standard couture method for stabilizing underlining.",
        steps: [
          "Working from right to left, take a short horizontal stitch (¼\") through all layers.",
          "Move the needle down ½\"–1\" and take the next horizontal stitch. The thread runs diagonally between stitches.",
          "Continue in parallel rows, spacing rows 1\"–2\" apart, to cover the entire area that needs stabilizing.",
          "Remove after permanent construction is complete — these stitches have served their purpose."
        ],
        whenToUse: "Underlining (attaching a backing fabric to fashion fabric), holding interfacing to lapels before pad stitching, controlling velvet or silk layers during construction. Any time two layers need to behave as one across a broad area.",
        fabricNote: "The go-to baste for couture work. On silk organza underlining, diagonal baste keeps the two layers acting as one through every step of construction. Remove after permanent stitching is complete.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><line x1="20" y1="20" x2="30" y2="40" stroke="#8B6B4A" stroke-width="2"/><line x1="30" y1="40" x2="40" y2="20" stroke="#C4A882" stroke-width="1" stroke-dasharray="2 2"/><line x1="40" y1="20" x2="50" y2="40" stroke="#8B6B4A" stroke-width="2"/><line x1="50" y1="40" x2="60" y2="20" stroke="#C4A882" stroke-width="1" stroke-dasharray="2 2"/><line x1="60" y1="20" x2="70" y2="40" stroke="#8B6B4A" stroke-width="2"/><line x1="20" y1="55" x2="30" y2="75" stroke="#8B6B4A" stroke-width="2"/><line x1="30" y1="75" x2="40" y2="55" stroke="#C4A882" stroke-width="1" stroke-dasharray="2 2"/><line x1="40" y1="55" x2="50" y2="75" stroke="#8B6B4A" stroke-width="2"/><line x1="50" y1="75" x2="60" y2="55" stroke="#C4A882" stroke-width="1" stroke-dasharray="2 2"/><line x1="60" y1="55" x2="70" y2="75" stroke="#8B6B4A" stroke-width="2"/><rect x="15" y="15" width="60" height="70" rx="2" stroke="#C4A882" stroke-width="1" stroke-dasharray="4 3" fill="none"/><text x="90" y="45" font-family="Georgia,serif" font-size="7" fill="#5C554D">rows lock</text><text x="90" y="57" font-family="Georgia,serif" font-size="7" fill="#5C554D">layers flat</text></svg>`
      },
      {
        name: "Slip Baste",
        aka: "Ladder baste, right-side baste",
        desc: "A temporary stitch worked from the right side of the fabric, used to match patterns (stripes, plaids, prints) across a seam before machine sewing. One edge is folded under and stitches alternate between the fold and the flat fabric, creating a ladder pattern underneath.",
        steps: [
          "Press one seam allowance under along the seam line.",
          "Lay the folded edge on top of the adjoining piece, matching the pattern exactly. Pin.",
          "Working from the right side, stitch through the fold, then across to the flat fabric. The needle enters each side directly opposite where it exited the other.",
          "Flip the work over and machine stitch the seam on the baste line. Remove basting."
        ],
        whenToUse: "Plaid matching, stripe alignment, any patterned fabric where seamline alignment is critical. Worth the extra step — there's no other reliable way to match patterns on bulky fabrics.",
        fabricNote: "On heavyweight plaid wool, slip basting is the only reliable way to match the pattern. Pins can't hold the alignment under the machine foot, and the fabric shifts. The right-side view lets you verify the match before committing.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="10" y="20" width="45" height="80" fill="rgba(139,107,74,0.04)" stroke="#C4A882" stroke-width="1"/><rect x="65" y="20" width="45" height="80" fill="rgba(139,107,74,0.04)" stroke="#C4A882" stroke-width="1"/><line x1="55" y1="20" x2="55" y2="100" stroke="#8B6B4A" stroke-width="1.5" stroke-dasharray="4 3"/><path d="M52 30 L58 30 M52 45 L58 45 M52 60 L58 60 M52 75 L58 75 M52 90 L58 90" stroke="#8B6B4A" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="20" x2="30" y2="100" stroke="#5B8C6B" stroke-width="1" stroke-dasharray="6 4"/><line x1="80" y1="20" x2="80" y2="100" stroke="#5B8C6B" stroke-width="1" stroke-dasharray="6 4"/><text x="55" y="14" font-family="Georgia,serif" font-size="6" fill="#5B8C6B" text-anchor="middle">pattern matched</text></svg>`
      },
      // ── CONSTRUCTION (Permanent) ──
      {
        name: "Backstitch",
        aka: "Back stitch, hand seam stitch",
        desc: "The strongest hand stitch. Each stitch loops back on itself, creating an interlocked line that resists pulling apart. From the right side, it mimics a machine straight stitch. The wrong side shows overlapping loops — that's what makes it strong.",
        steps: [
          "Bring the needle up one stitch length ahead of where you want the line to start.",
          "Insert the needle back at the starting point (backward), then bring it up one stitch length ahead of the current thread.",
          "Continue: each stitch goes backward to meet the previous one, needle always emerges one stitch ahead.",
          "Finish with 2–3 tiny backstitches in place to lock the thread."
        ],
        whenToUse: "Hand-sewn seams, zipper insertion, repairs where machine access is impossible, securing thread at the start and end of any hand stitching. Also used as a small \"pick stitch\" for couture zipper finishing.",
        fabricNote: "For invisible zipper finishing, use a tiny backstitch (pick stitch) with matching thread — only a row of small dots shows on the right side. Couture sewers prefer this over machine topstitching for a refined finish.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M15 50 L30 50 L45 50 L60 50 L75 50 L90 50" stroke="#8B6B4A" stroke-width="2.5" stroke-linecap="round"/><path d="M30 60 Q22 55 15 50 Q22 63 30 60" stroke="#C4A882" stroke-width="1" fill="rgba(196,168,130,0.15)"/><path d="M45 60 Q37 55 30 50 Q37 63 45 60" stroke="#C4A882" stroke-width="1" fill="rgba(196,168,130,0.15)"/><path d="M60 60 Q52 55 45 50 Q52 63 60 60" stroke="#C4A882" stroke-width="1" fill="rgba(196,168,130,0.15)"/><path d="M75 60 Q67 55 60 50 Q67 63 75 60" stroke="#C4A882" stroke-width="1" fill="rgba(196,168,130,0.15)"/><text x="55" y="80" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">interlocked loops (wrong side)</text><text x="55" y="38" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">continuous line (right side)</text></svg>`
      },
      {
        name: "Pick Stitch",
        aka: "Prick stitch, hand-picked stitch",
        desc: "A tiny backstitch where only a small dot shows on the right side while a longer float runs underneath. Each surface stitch picks up just 1–2 threads of fabric. The couture method for setting zippers, finishing pockets, and adding an invisible but secure hand-sewn line.",
        steps: [
          "Working from the right side, bring the needle up through all layers.",
          "Take a very small backstitch (1–2 threads) backward, then travel ¼\"–⅜\" forward underneath before emerging again.",
          "The visible stitch is tiny; the hidden float is long. Keep spacing even.",
          "Use matching thread — the dots should nearly disappear into the fabric."
        ],
        whenToUse: "Hand-picked zippers (the classic couture zipper finish), tacking pocket edges, securing linings, any place where you want secure stitching with minimal visibility on the right side.",
        fabricNote: "Silk thread in a matching color makes pick stitches truly invisible. On dark fabrics, even a slight thread mismatch will show — test on a scrap first. Wax the thread to prevent tangling.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><circle cx="20" cy="50" r="1.5" fill="#8B6B4A"/><circle cx="40" cy="50" r="1.5" fill="#8B6B4A"/><circle cx="60" cy="50" r="1.5" fill="#8B6B4A"/><circle cx="80" cy="50" r="1.5" fill="#8B6B4A"/><circle cx="100" cy="50" r="1.5" fill="#8B6B4A"/><path d="M20 65 L40 65 M40 65 L60 65 M60 65 L80 65 M80 65 L100 65" stroke="#C4A882" stroke-width="1.5" stroke-dasharray="3 2"/><text x="60" y="38" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">tiny dots (right side)</text><text x="60" y="82" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">long floats (wrong side)</text><path d="M15 95 L105 95" stroke="#8B6B4A" stroke-width="1"/><path d="M20 95 L20 90" stroke="#5B8C6B" stroke-width="1.5"/><path d="M100 95 L100 90" stroke="#5B8C6B" stroke-width="1.5"/><text x="60" y="108" font-family="Georgia,serif" font-size="6" fill="#9B9389" text-anchor="middle">zipper tape</text></svg>`
      },
      {
        name: "Fell Stitch",
        aka: "Felling stitch, appliqué stitch, stab-and-fell",
        desc: "Small, straight stitches used to attach a folded edge to the surface of another fabric. The needle catches a few threads of the background fabric, then travels inside the fold before emerging for the next stitch. Nearly invisible when done well — the go-to stitch for finishing garment interiors by hand.",
        steps: [
          "Anchor the thread inside the folded edge to hide the knot.",
          "Bring the needle out through the fold, right at the crease.",
          "Take a tiny stitch (2–3 threads) in the background fabric, directly across from where the needle emerged.",
          "Slide the needle back into the fold and travel ¼\" before emerging for the next stitch. Repeat."
        ],
        whenToUse: "Finishing waistband interiors, setting in linings by hand, appliqué, attaching facings, closing lining openings. Anywhere you need to tack a folded edge down invisibly.",
        fabricNote: "On tailored garments, fell stitching the waistband interior or collar facing produces a cleaner finish than machine stitch-in-the-ditch. The hand-sewn version lets you control exactly where each stitch falls.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="10" y="50" width="100" height="40" fill="rgba(139,107,74,0.04)" stroke="#C4A882" stroke-width="1"/><path d="M10 50 L110 50" stroke="#8B6B4A" stroke-width="2"/><path d="M20 50 L20 44" stroke="#8B6B4A" stroke-width="1.5"/><path d="M35 50 L35 44" stroke="#8B6B4A" stroke-width="1.5"/><path d="M50 50 L50 44" stroke="#8B6B4A" stroke-width="1.5"/><path d="M65 50 L65 44" stroke="#8B6B4A" stroke-width="1.5"/><path d="M80 50 L80 44" stroke="#8B6B4A" stroke-width="1.5"/><path d="M95 50 L95 44" stroke="#8B6B4A" stroke-width="1.5"/><rect x="10" y="30" width="100" height="20" fill="rgba(91,140,107,0.06)" stroke="#5B8C6B" stroke-width="1" stroke-dasharray="3 2"/><text x="60" y="42" font-family="Georgia,serif" font-size="7" fill="#5B8C6B" text-anchor="middle">folded edge</text><text x="60" y="74" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">background fabric</text></svg>`
      },
      {
        name: "Pad Stitch",
        aka: "Pad stitching, chevron stitch, tailor's pad stitch",
        desc: "Short diagonal stitches worked in rows that permanently attach interfacing to fabric while building three-dimensional shape. Each stitch catches a few threads of the fashion fabric (invisible from the right side) and passes through the interfacing. The rows follow the desired roll line, training the fabric to curve — the defining technique of bespoke tailoring.",
        steps: [
          "Hold the fabric over your hand, curved as it will sit on the body (e.g., lapel rolling over your fingers).",
          "Working from the center outward, take a small diagonal stitch (¼\") through the interfacing and just a few threads of the fashion fabric.",
          "Move ½\" and take the next stitch, angling in the opposite direction to create a chevron pattern.",
          "Continue in rows, following the shape of the roll line. Each row should be ½\"–¾\" apart."
        ],
        whenToUse: "Tailored jacket lapels and under collars. Pad stitching builds a permanent roll that fusible interfacing cannot replicate. Worth learning even for modern sewing — a pad-stitched lapel rolls better for the life of the garment.",
        fabricNote: "Use silk thread — it's strong, fine, and won't leave impressions. On the under collar, pad stitch on the bias following the roll line. The stitches should be invisible from the right side — if you can see them, you're catching too much fabric.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M20 90 Q40 30 100 20" stroke="#C4A882" stroke-width="1.5" fill="none"/><g stroke="#8B6B4A" stroke-width="1.5"><path d="M25 82 L30 75"/><path d="M30 75 L35 82"/><path d="M35 82 L40 75"/><path d="M33 68 L38 61"/><path d="M38 61 L43 68"/><path d="M43 68 L48 61"/><path d="M42 55 L47 48"/><path d="M47 48 L52 55"/><path d="M52 55 L57 48"/><path d="M52 42 L57 35"/><path d="M57 35 L62 42"/><path d="M62 42 L67 35"/><path d="M65 30 L70 23"/><path d="M70 23 L75 30"/></g><text x="80" y="70" font-family="Georgia,serif" font-size="7" fill="#5C554D" transform="rotate(-35 80 70)">roll line</text></svg>`
      },
      {
        name: "Stab Stitch",
        aka: "Tack stitch, stab tack",
        desc: "A straight, reinforcing stitch taken perpendicular through all layers of fabric. The needle goes straight down through every layer, then straight back up — no angling, no traveling. Used to anchor layers at stress points or attach internal components that a machine can't reach.",
        steps: [
          "Push the needle straight down through all layers from the right side.",
          "Pull through, then push the needle straight back up ¼\" away.",
          "Keep stitches small on the visible side. The stitch underneath can be slightly longer.",
          "Use 2–3 stab stitches at each anchor point, then secure with a small backstitch."
        ],
        whenToUse: "Attaching shoulder pads, tacking pocket corners, reinforcing buttonholes, securing facings at seam intersections, holding linings at the armhole. Any internal anchor point through thick layers.",
        fabricNote: "On tailored jackets, stab stitches hold the shoulder pad, front canvas, and bridle tape in place — components the machine never touches. Use matching thread and keep surface stitches tiny.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="15" y="30" width="90" height="20" rx="2" fill="rgba(139,107,74,0.06)" stroke="#C4A882" stroke-width="1"/><rect x="15" y="50" width="90" height="20" rx="2" fill="rgba(139,107,74,0.04)" stroke="#C4A882" stroke-width="1"/><rect x="15" y="70" width="90" height="20" rx="2" fill="rgba(139,107,74,0.02)" stroke="#C4A882" stroke-width="1"/><path d="M40 28 L40 92" stroke="#8B6B4A" stroke-width="2"/><path d="M60 28 L60 92" stroke="#8B6B4A" stroke-width="2"/><path d="M80 28 L80 92" stroke="#8B6B4A" stroke-width="2"/><circle cx="40" cy="28" r="2" fill="#8B6B4A"/><circle cx="60" cy="28" r="2" fill="#8B6B4A"/><circle cx="80" cy="28" r="2" fill="#8B6B4A"/><text x="60" y="20" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">straight through layers</text></svg>`
      },
      // ── FINISHING & HEMMING ──
      {
        name: "Slip Stitch",
        aka: "Ladder stitch, invisible stitch, blind stitch",
        desc: "The most invisible hemming stitch. The needle travels inside the fold of the hem, emerging to pick up just 1–2 threads from the garment fabric before ducking back into the fold. From the right side, only tiny pinpricks are visible — and on most fabrics, even those disappear.",
        steps: [
          "Anchor the thread inside the hem fold.",
          "Bring the needle out through the fold at the hem edge.",
          "Directly above, pick up 1–2 threads of the garment fabric.",
          "Re-enter the fold directly below where the needle emerged from the garment, travel ¼\"–⅜\" inside the fold, and repeat."
        ],
        whenToUse: "Dress hems, trouser hems, closing lining openings, turning gaps, any situation requiring an invisible join. The default hand hemming stitch for most garments.",
        fabricNote: "On fine fabrics, use a very fine needle (size 10 or 12 sharp) and matching silk thread. The finer the needle, the smaller the pinprick. On heavy fabrics, a slightly larger stitch is fine — the fabric texture hides it.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="10" y="20" width="100" height="35" fill="rgba(139,107,74,0.03)" stroke="#C4A882" stroke-width="1"/><rect x="10" y="55" width="100" height="45" fill="rgba(139,107,74,0.06)" stroke="#C4A882" stroke-width="1"/><path d="M10 55 L110 55" stroke="#8B6B4A" stroke-width="2"/><path d="M20 55 L20 52" stroke="#8B6B4A" stroke-width="1.2"/><path d="M35 55 L35 52" stroke="#8B6B4A" stroke-width="1.2"/><path d="M50 55 L50 52" stroke="#8B6B4A" stroke-width="1.2"/><path d="M65 55 L65 52" stroke="#8B6B4A" stroke-width="1.2"/><path d="M80 55 L80 52" stroke="#8B6B4A" stroke-width="1.2"/><path d="M20 55 L35 55 M35 55 L50 55 M50 55 L65 55 M65 55 L80 55" stroke="#C4A882" stroke-width="1" stroke-dasharray="2 1"/><text x="60" y="38" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">garment (right side)</text><text x="60" y="82" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">hem fold (inside)</text></svg>`
      },
      {
        name: "Catch Stitch",
        aka: "Herringbone stitch, cross stitch hem, fishbone stitch",
        desc: "An X-shaped stitch that creates a flexible, forgiving hem. Stitches alternate between the hem edge and the garment, crossing each other in a herringbone pattern. The crossed threads act like tiny springs — they stretch and recover, making this the ideal hem for fabrics that need to move.",
        steps: [
          "Working from left to right (reverse if left-handed), anchor the thread at the hem edge.",
          "Take a small stitch in the garment fabric, ¼\" above the hem edge, stitching from right to left (backward).",
          "Move right ¼\"–⅜\", take a small stitch in the hem allowance, stitching right to left.",
          "The thread crosses over itself between each stitch, forming the characteristic X pattern. Keep stitches loose."
        ],
        whenToUse: "Knit hems, bias-cut skirts, full skirts, lined garments where the facing needs to stay put but allow movement. Any hem that needs give — where a slip stitch would pop under strain.",
        fabricNote: "On stretchy knits, catch stitch flexes with the fabric where a slip stitch would snap. Keep stitches loose — pulling tight defeats the purpose. The X-pattern distributes stress rather than concentrating it on a single thread.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="10" y="55" width="100" height="35" fill="rgba(139,107,74,0.06)" stroke="#C4A882" stroke-width="1"/><path d="M10 55 L110 55" stroke="#8B6B4A" stroke-width="1.5"/><path d="M20 50 L30 70 L40 50 L50 70 L60 50 L70 70 L80 50 L90 70 L100 50" stroke="#8B6B4A" stroke-width="2" fill="none"/><circle cx="20" cy="50" r="2" fill="#8B6B4A" opacity="0.4"/><circle cx="40" cy="50" r="2" fill="#8B6B4A" opacity="0.4"/><circle cx="60" cy="50" r="2" fill="#8B6B4A" opacity="0.4"/><circle cx="80" cy="50" r="2" fill="#8B6B4A" opacity="0.4"/><circle cx="100" cy="50" r="2" fill="#8B6B4A" opacity="0.4"/><text x="60" y="38" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">garment</text><text x="60" y="82" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">hem allowance</text></svg>`
      },
      {
        name: "Blanket Stitch",
        aka: "Buttonhole stitch (dense version), edge stitch",
        desc: "A looped edge stitch where the thread wraps under the needle before each stitch is pulled through, creating a small knot at the fabric edge. Spaced apart, it's a decorative blanket stitch; packed tightly, it becomes a buttonhole stitch that creates a wear-resistant edge for hand-sewn buttonholes and eyelets.",
        steps: [
          "Bring the needle up from the back, a short distance from the fabric edge.",
          "Loop the working thread under the needle tip, wrapping from the direction of previous stitches toward the new one.",
          "Pull through — the thread forms a small knot that sits right at the fabric edge.",
          "For buttonholes: pack stitches tightly so knots form a continuous raised ridge. For decorative: space ¼\" apart."
        ],
        whenToUse: "Hand-sewn buttonholes (dense version), decorative edges on wool and fleece, appliqué, attaching hooks/eyes/snaps with a couture finish, wool blanket edging.",
        fabricNote: "Wax your thread before buttonhole stitching — it prevents tangling and helps the knots seat firmly. Use silk buttonhole twist for the finest buttonholes. On fleece and felt, the decorative version works as a sole edge finish since these fabrics don't fray.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M15 70 L105 70" stroke="#C4A882" stroke-width="1.5"/><path d="M20 70 L20 45" stroke="#8B6B4A" stroke-width="2"/><path d="M20 70 L32 70 L32 45" stroke="#8B6B4A" stroke-width="2" fill="none"/><path d="M32 70 L44 70 L44 45" stroke="#8B6B4A" stroke-width="2" fill="none"/><path d="M44 70 L56 70 L56 45" stroke="#8B6B4A" stroke-width="2" fill="none"/><path d="M56 70 L68 70 L68 45" stroke="#8B6B4A" stroke-width="2" fill="none"/><path d="M68 70 L80 70 L80 45" stroke="#8B6B4A" stroke-width="2" fill="none"/><path d="M80 70 L92 70 L92 45" stroke="#8B6B4A" stroke-width="2" fill="none"/><circle cx="20" cy="70" r="2" fill="#8B6B4A"/><circle cx="32" cy="70" r="2" fill="#8B6B4A"/><circle cx="44" cy="70" r="2" fill="#8B6B4A"/><circle cx="56" cy="70" r="2" fill="#8B6B4A"/><circle cx="68" cy="70" r="2" fill="#8B6B4A"/><circle cx="80" cy="70" r="2" fill="#8B6B4A"/><circle cx="92" cy="70" r="2" fill="#8B6B4A"/><text x="55" y="36" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">looped edge knots</text><text x="55" y="88" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">fabric edge</text></svg>`
      },
      {
        name: "Whipstitch",
        aka: "Overcast stitch, overcasting, oversewing",
        desc: "Angled stitches that wrap over a raw edge to prevent fraying. The needle enters from one side, wraps over the edge, and enters again from the same side — each stitch spirals around the edge at a consistent angle. The couture alternative to serging on fine fabrics where machine finishing would be too bulky or visible.",
        steps: [
          "Bring the needle through from back to front, about ⅛\"–¼\" from the raw edge.",
          "Wrap the thread over the edge and bring the needle through again from the same side, ⅛\"–¼\" to the left.",
          "Keep stitch depth and spacing consistent. Stitches should angle at roughly 45°.",
          "Don't pull tight — the stitches should enclose the edge without bunching the fabric."
        ],
        whenToUse: "Finishing seam allowances on silk, organza, and other fine fabrics where a serger would be too heavy. Joining felt or fleece edges. Closing stuffed items. Couture seam finishing.",
        fabricNote: "On couture silk garments, hand overcasting produces a flat, delicate seam finish that doesn't add bulk or show through to the right side. A serger creates a visible ridge on lightweight fabrics — hand overcasting eliminates that problem.",
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="25" y="20" width="55" height="80" fill="rgba(139,107,74,0.04)" stroke="#C4A882" stroke-width="1"/><path d="M80 30 L70 35 L80 40 L70 45 L80 50 L70 55 L80 60 L70 65 L80 70 L70 75 L80 80" stroke="#8B6B4A" stroke-width="2" fill="none"/><path d="M80 20 L80 100" stroke="#C4A882" stroke-width="1.5"/><text x="50" y="60" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">fabric</text><text x="100" y="55" font-family="Georgia,serif" font-size="6" fill="#9B9389" text-anchor="middle">raw</text><text x="100" y="65" font-family="Georgia,serif" font-size="6" fill="#9B9389" text-anchor="middle">edge</text></svg>`
      }
    ]
  }
};


const SEAM_FINISHES = [
  {
    name: "French Seam",
    desc: "Encloses raw edges inside the seam itself. Two passes — first wrong sides together, then right sides together.",
    techCat: "seams", techName: "French Seam",
    traits: { pros: ["Clean interior", "No raw edges", "No serger needed"], cons: ["Adds bulk", "Not for curves"], neutral: ["Two passes"] },
    scores: { lightweight: 95, medium: 60, heavy: 15, sheer: 100, frays: 90, curves: 30, speed: 50, strength: 70 }
  },
  {
    name: "Flat-Felled Seam",
    desc: "Both edges enclosed, two rows of topstitching visible. The jean seam — strong, flat, and durable.",
    techCat: "seams", techName: "Flat-Felled Seam",
    traits: { pros: ["Very strong", "Flat interior", "Durable"], cons: ["Visible topstitching", "Slow"], neutral: ["Workwear aesthetic"] },
    scores: { lightweight: 40, medium: 85, heavy: 70, sheer: 10, frays: 95, curves: 35, speed: 35, strength: 100 }
  },
  {
    name: "Hong Kong Finish",
    desc: "Each seam allowance individually wrapped in bias-cut strips. A couture interior finish.",
    techCat: "seams", techName: "Hong Kong Finish",
    traits: { pros: ["Beautiful interior", "Works on any weight", "Open seam"], cons: ["Time-intensive", "Requires bias strips"], neutral: ["Couture technique"] },
    scores: { lightweight: 75, medium: 85, heavy: 90, sheer: 50, frays: 95, curves: 80, speed: 20, strength: 75 }
  },
  {
    name: "Serged / Overlocked Edge",
    desc: "A serger trims and encases the raw edge in thread loops. Fast, professional, and stretchy.",
    traits: { pros: ["Fast", "Stretch-friendly", "Professional"], cons: ["Requires serger", "Not enclosed"], neutral: ["Standard ready-to-wear"] },
    scores: { lightweight: 70, medium: 90, heavy: 80, sheer: 30, frays: 85, curves: 85, speed: 95, strength: 80 }
  },
  {
    name: "Zigzag Finish",
    desc: "A zigzag stitch along the raw edge prevents fraying. No special equipment needed.",
    traits: { pros: ["No special tools", "Quick", "Beginner-friendly"], cons: ["Can look homemade", "Edge may still curl"], neutral: ["Good enough for most projects"] },
    scores: { lightweight: 60, medium: 75, heavy: 55, sheer: 25, frays: 65, curves: 80, speed: 85, strength: 60 }
  },
  {
    name: "Pinking",
    desc: "Cutting the seam allowance with pinking shears creates a zigzag edge that slows fraying.",
    traits: { pros: ["Fastest option", "Zero sewing", "Flat"], cons: ["Temporary on high-fray fabrics", "Looks unfinished"], neutral: ["Good for muslins and low-fray fabrics"] },
    scores: { lightweight: 45, medium: 50, heavy: 40, sheer: 10, frays: 35, curves: 90, speed: 100, strength: 30 }
  },
  {
    name: "Bias-Bound Seam",
    desc: "Both seam allowances wrapped together in a single bias strip. Neat, enclosed, and visible inside.",
    traits: { pros: ["Fully enclosed", "Works on curves", "No serger needed"], cons: ["Adds bulk", "Time-intensive"], neutral: ["Good for unlined garments"] },
    scores: { lightweight: 70, medium: 80, heavy: 65, sheer: 40, frays: 90, curves: 75, speed: 30, strength: 75 }
  },
  {
    name: "Turn and Stitch",
    desc: "Fold the raw edge under ¼\" and stitch. Simple, clean, no special tools.",
    traits: { pros: ["Clean edge", "No special tools", "Beginner-friendly"], cons: ["Adds bulk on heavy fabric", "Slow on long seams"], neutral: ["Traditional home-sewing finish"] },
    scores: { lightweight: 75, medium: 65, heavy: 30, sheer: 60, frays: 80, curves: 50, speed: 55, strength: 65 }
  }
];


const INTERFACING_TYPES = [
  {
    id: 'fusible-woven',
    name: 'Fusible Woven',
    type: 'fusible',
    desc: 'Iron-on interfacing with a woven structure. Has grain direction like fabric — cut on the same grain as your garment piece.',
    weights: ['light', 'medium', 'heavy'],
    bestFor: ['Tailored garments', 'Structured collars & cuffs', 'Waistbands', 'Button plackets'],
    avoid: ['Textured fabrics (bubbling risk)', 'Velvet, corduroy, or pile fabrics', 'Heat-sensitive fibers like some silks'],
    application: 'Set iron to appropriate heat (no steam). Place adhesive side down on fabric wrong side. Press firmly for 10–15 seconds per section. Lift and reposition — don\'t slide. Let cool before handling.',
    tip: 'Always do a test fuse on a scrap first. If it bubbles, peels, or stiffens too much, switch to a sew-in or try lower heat.'
  },
  {
    id: 'fusible-knit',
    name: 'Fusible Knit',
    type: 'fusible',
    desc: 'Iron-on interfacing with a knit structure. Stretches crosswise while stabilizing lengthwise. Drapes better than woven fusible.',
    weights: ['light', 'medium'],
    bestFor: ['Knit fabrics', 'Draped garments', 'Lightweight blouses', 'Facings that need to flex'],
    avoid: ['Structured tailoring (too soft)', 'Very heavy fabrics'],
    application: 'Same as woven fusible, but be careful not to stretch the interfacing while positioning it. The crosswise stretch should align with the fabric\'s stretch direction.',
    tip: 'This is the go-to interfacing for most dressmaking. It adds body without stiffness and works with almost every fabric.'
  },
  {
    id: 'fusible-nonwoven',
    name: 'Fusible Non-Woven',
    type: 'fusible',
    desc: 'Iron-on interfacing made from bonded fibers (no grain). Can be cut in any direction — saves fabric. The most common craft-store interfacing.',
    weights: ['light', 'medium', 'heavy'],
    bestFor: ['Quick projects', 'Bags and accessories', 'Crafts', 'Small pieces (tabs, loops)'],
    avoid: ['Drapey garments (too stiff)', 'Tailored clothing', 'Anything where a soft hand matters'],
    application: 'Same fusing process as woven. Because there\'s no grain, you can cut pieces in any direction to minimize waste.',
    tip: 'Pellon 931TD (fusible midweight) is a common choice. Inexpensive and widely available, but the stiff hand isn\'t suitable for clothing that needs to drape.'
  },
  {
    id: 'sewin-woven',
    name: 'Sew-In Woven',
    type: 'sewin',
    desc: 'Basted or stitched to the fabric — no adhesive. Includes cotton organdy, silk organza, and muslin. The traditional tailoring interfacing.',
    weights: ['light', 'medium', 'heavy'],
    bestFor: ['Heat-sensitive fabrics', 'Silk, velvet, textured fabrics', 'Traditional tailoring', 'Sheer fabrics where fusible would show through'],
    avoid: ['Quick projects (slower to apply)', 'Small fiddly pieces'],
    application: 'Cut the interfacing to the pattern piece shape. Pin or baste to the wrong side of the fabric within the seam allowance. The interfacing is then caught in the seams as you sew.',
    tip: 'Silk organza is the gold standard sew-in interfacing for lightweight fabrics — it\'s virtually invisible, adds crisp body, and can be pressed without damage.'
  },
  {
    id: 'hair-canvas',
    name: 'Hair Canvas',
    type: 'sewin',
    desc: 'A firm, springy woven interfacing containing animal hair (goat or horse). Molds to the body with wear and holds its shape. The backbone of a tailored jacket.',
    weights: ['medium', 'heavy'],
    bestFor: ['Tailored jackets and coats', 'Lapels and chest pieces', 'Structured menswear'],
    avoid: ['Lightweight garments', 'Casual sewing', 'Beginners (requires pad-stitching knowledge)'],
    application: 'Cut to shape and pad-stitch (hand-sew with small diagonal stitches) to the garment front, rolling the canvas over a tailor\'s ham to build in the chest curve. This is traditional tailoring — slow but produces the finest results.',
    tip: 'Hymo is the classic choice. For a simpler approach, fusible hair canvas (like Armo Weft) gives similar body without hand-stitching.'
  },
  {
    id: 'fusible-web',
    name: 'Fusible Web',
    type: 'fusible',
    desc: 'A sheer adhesive sheet (no fabric structure) that bonds two layers of fabric together. Not a traditional interfacing — it\'s a bonding agent.',
    weights: ['light'],
    bestFor: ['Appliqué', 'No-sew hems', 'Bonding fabric to fabric', 'Quick repairs and patches'],
    avoid: ['Structural support (adds no body)', 'Anything that will be washed heavily', 'Seam areas'],
    application: 'Place paper-backed web on fabric, iron to transfer adhesive, peel paper, position second fabric, iron again to bond. Use a pressing cloth to protect your iron.',
    tip: 'Heat n Bond Lite and Wonder Under are popular brands. "Lite" versions remain sewable — regular/heavy versions can gum up your needle.'
  }
];


const FIBER_INTERFACING_RECS = {
  cotton: { primary: 'Fusible woven or non-woven', weight: 'Match fabric weight', notes: 'Cotton takes fusible well. Almost any interfacing works.' },
  linen: { primary: 'Fusible woven', weight: 'Light to medium', notes: 'Linen\'s natural body means you usually need less interfacing than you think.' },
  silk: { primary: 'Silk organza (sew-in) or fusible knit', weight: 'Lightweight', notes: 'Test fusible on a scrap — some silks bubble. Silk organza sew-in is the safest bet.' },
  wool: { primary: 'Hair canvas (tailoring) or fusible woven', weight: 'Match garment structure', notes: 'For tailored pieces, hair canvas is traditional. For casual garments, fusible woven works well.' },
  hemp: { primary: 'Fusible woven', weight: 'Light to medium', notes: 'Similar to linen. The natural stiffness means light interfacing is usually sufficient.' },
  bamboo: { primary: 'Fusible knit', weight: 'Lightweight', notes: 'Bamboo\'s drape is its best quality — fusible knit preserves it. Avoid stiff interfacings.' },
  tencel: { primary: 'Fusible knit', weight: 'Lightweight', notes: 'Tencel drapes beautifully — use the lightest interfacing that provides the support you need.' },
  viscose: { primary: 'Fusible knit', weight: 'Lightweight', notes: 'Viscose is prone to heat damage — use lower iron temperature and always test first.' },
  modal: { primary: 'Fusible knit', weight: 'Lightweight', notes: 'Same approach as viscose — lightweight fusible knit preserves modal\'s soft drape.' },
  cupro: { primary: 'Silk organza (sew-in)', weight: 'Lightweight', notes: 'Cupro is delicate — sew-in is safer than fusible. If using fusible, test on a scrap with low heat.' },
  alpaca: { primary: 'Fusible woven or hair canvas', weight: 'Medium', notes: 'For coats, hair canvas gives beautiful structure. The loft means you may need extra press time for fusible.' },
  mohair: { primary: 'Sew-in woven', weight: 'Light to medium', notes: 'The pile surface makes fusible unreliable — sew-in is the safe choice.' },
  angora: { primary: 'Sew-in woven', weight: 'Lightweight', notes: 'Too delicate for most fusibles. Baste sew-in interfacing gently to avoid crushing the fibers.' },
  cashmere: { primary: 'Fusible knit or silk organza', weight: 'Lightweight', notes: 'Cashmere is precious — always test. Fusible knit works well at low heat. For tailoring, use hair canvas.' },
  camel: { primary: 'Hair canvas or fusible woven', weight: 'Medium to heavy', notes: 'Camel hair coats traditionally use hair canvas. Fusible woven is fine for casual pieces.' },
  ramie: { primary: 'Fusible woven', weight: 'Light to medium', notes: 'Stiff fiber — light interfacing is usually enough. Similar handling to linen.' },
  jute: { primary: 'Fusible non-woven', weight: 'Medium to heavy', notes: 'Jute is for crafts and home décor — non-woven interfacing is fine. No need for garment-quality interfacing.' },
  pina: { primary: 'Silk organza (sew-in)', weight: 'Very lightweight', notes: 'Piña is too delicate for fusible. Sew-in silk organza adds support without stiffness. Pin minimally — holes show.' },
  kapok: { primary: 'Fusible knit or non-woven', weight: 'Match blend weight', notes: 'Interfacing choice follows the blend partner. For kapok-cotton, fusible knit works well. For fill items, interfacing is rarely needed.' },
  nettle: { primary: 'Fusible woven', weight: 'Light to medium', notes: 'Handle like linen — light fusible woven is usually sufficient. The natural stiffness provides built-in structure.' }
};


const GLOSSARY_DATA = [
  { id: "backstitch", term: "Backstitch", def: "A few reverse stitches at the beginning and end of a seam to lock the thread in place and prevent unraveling. On most machines, press and hold the reverse lever.", seeAlso: ["lockstitch", "seam-allowance"] },
  { id: "ballpoint-needle", term: "Ballpoint Needle", def: "A sewing machine needle with a rounded tip that pushes between knit fabric loops instead of piercing them, preventing runs and holes. Also called a jersey needle.", seeAlso: ["knit", "universal-needle"] },
  { id: "baste", term: "Baste / Basting", def: "Temporary long stitches used to hold fabric layers together before permanent sewing. Can be done by machine (longest stitch length) or by hand. Removed after the final seam is sewn.", seeAlso: ["gathering", "ease"] },
  { id: "bias", term: "Bias", def: "The diagonal direction of fabric, at 45° to the selvage. Fabric cut on the bias stretches and drapes more than on-grain cuts. True bias is exactly 45°; garment bias refers to any off-grain angle.", seeAlso: ["grain", "selvage", "bias-binding"] },
  { id: "bias-binding", term: "Bias Binding", def: "Strips of fabric cut on the bias, used to enclose raw edges. The bias cut allows the strip to stretch smoothly around curves. Available pre-made (bias tape) or cut from fabric.", seeAlso: ["bias", "facing"] },
  { id: "bobbin", term: "Bobbin", def: "The small spool that holds the lower thread in a sewing machine. The bobbin thread interlocks with the needle (upper) thread to form stitches. Must be wound evenly for consistent tension.", seeAlso: ["tension", "lockstitch"] },
  { id: "bolt", term: "Bolt", def: "The roll or folded length of fabric as it comes from the manufacturer. Fabric is sold off the bolt by the yard or meter. A full bolt is typically 10–25 yards.", seeAlso: ["selvage", "grain"] },
  { id: "clip", term: "Clip", def: "Small cuts made into the seam allowance of a curved seam, allowing it to lie flat when turned. Clip into concave (inward) curves; notch convex (outward) curves.", seeAlso: ["notch", "seam-allowance", "grading"] },
  { id: "dart", term: "Dart", def: "A triangular fold stitched into fabric to shape it around body curves. Darts taper to a point and create three-dimensional form from flat fabric.", seeAlso: ["ease", "princess-seam"] },
  { id: "drape", term: "Drape", def: "How a fabric hangs and falls under its own weight. Fabrics with good drape (silk, rayon, jersey) flow and cling; fabrics with poor drape (canvas, quilting cotton) hold their shape instead.", seeAlso: ["hand", "grain", "bias"] },
  { id: "ease", term: "Ease", def: "Fitting a slightly larger piece of fabric to a slightly smaller one without visible gathers. Also refers to the extra room built into a garment pattern beyond body measurements for comfort (wearing ease) or style (design ease).", seeAlso: ["gathering", "dart"] },
  { id: "edgestitch", term: "Edgestitch", def: "A line of stitching placed very close (1–2mm) to a seam, edge, or fold. Closer than topstitching. Used to keep facings flat or sharpen creases.", seeAlso: ["topstitch", "understitch"] },
  { id: "facing", term: "Facing", def: "A piece of fabric cut to match a garment edge (neckline, armhole, etc.), sewn on and flipped to the inside to create a clean finish. Can be cut separately or as an extension of the garment piece (self-facing).", seeAlso: ["bias-binding", "interfacing", "understitch"] },
  { id: "fat-quarter", term: "Fat Quarter", def: "A piece of fabric measuring approximately 18\" × 22\", made by cutting a half-yard of 44\" fabric in half along the fold. Popular in quilting because it provides a more usable shape than a regular quarter-yard strip.", seeAlso: ["bolt", "selvage"] },
  { id: "feed-dogs", term: "Feed Dogs", def: "The small, toothed metal bars under the presser foot that grip and advance fabric through the sewing machine. They can be lowered or covered for free-motion sewing.", seeAlso: ["presser-foot", "walking-foot"] },
  { id: "finger-press", term: "Finger Press", def: "Using your fingers (and body heat) to press a fold or seam open temporarily, when an iron would be impractical or when working with heat-sensitive materials.", seeAlso: ["press"] },
  { id: "fusible-web", term: "Fusible Web", def: "A thin adhesive sheet activated by heat (iron), used to bond two fabrics together without sewing. Also used for appliqué and temporary hemming.", seeAlso: ["interfacing"] },
  { id: "gathering", term: "Gathering", def: "Drawing up fabric along a stitching line to create soft, even fullness. Done by sewing long basting stitches and pulling the bobbin thread. Used for ruffles, skirt waists, and sleeve caps.", seeAlso: ["ease", "baste", "shirring"] },
  { id: "grain", term: "Grain", def: "The direction of threads in a woven fabric. Lengthwise grain (warp) runs parallel to the selvage; crosswise grain (weft) runs perpendicular. Cutting on-grain is essential for garments that hang properly.", seeAlso: ["bias", "selvage", "warp", "weft"] },
  { id: "grading", term: "Grading (Seam)", def: "Trimming each layer of a seam allowance to a different width, reducing bulk in enclosed seams (facings, collars, waistbands). The layer closest to the outside is left widest.", seeAlso: ["clip", "seam-allowance"] },
  { id: "hand", term: "Hand", def: "How a fabric feels when you touch and handle it — its tactile quality. Described with terms like crisp, soft, supple, papery, drapey, stiff, lofty. A fabric's hand influences what it's suitable for.", seeAlso: ["drape", "weight"] },
  { id: "interfacing", term: "Interfacing", def: "A stabilizing material applied to the wrong side of fabric to add body, structure, and support. Comes in fusible (iron-on) or sew-in varieties, and in weights from sheer to heavy.", seeAlso: ["facing", "fusible-web"] },
  { id: "knit", term: "Knit", def: "Fabric made by interlocking loops of yarn (vs. weaving). Knits stretch, don't fray, and require different needles and stitches than wovens. Jersey, rib knit, and interlock are common types.", seeAlso: ["woven", "ballpoint-needle"] },
  { id: "lockstitch", term: "Lockstitch", def: "The standard stitch formed by a home sewing machine, where the upper and bobbin threads interlock in the middle of the fabric. Creates a stitch that looks the same on both sides.", seeAlso: ["backstitch", "bobbin"] },
  { id: "muslin", term: "Muslin / Toile", def: "A test garment made from inexpensive fabric to check fit and construction before cutting into your good fabric. Called a muslin in North America, a toile in British/European tradition.", seeAlso: ["seam-allowance"] },
  { id: "nap", term: "Nap", def: "A raised, directional surface on fabric (velvet, corduroy, fleece) that looks different depending on which way it runs. All pattern pieces must be cut in the same direction on napped fabrics.", seeAlso: ["pile", "grain"] },
  { id: "notch", term: "Notch", def: "1. Small triangular cuts in a seam allowance on a convex curve to help it lie flat. 2. Pattern markings (small triangles or diamonds on the cutting line) used to align pieces during sewing.", seeAlso: ["clip", "seam-allowance"] },
  { id: "pile", term: "Pile", def: "The raised surface created by loops or cut loops on a fabric's face — like the soft surface of velvet, terry cloth, or corduroy. Pile has a direction (nap) that affects appearance.", seeAlso: ["nap"] },
  { id: "presser-foot", term: "Presser Foot", def: "The metal or plastic foot on a sewing machine that holds fabric flat against the feed dogs during sewing. Different feet are used for different tasks — zipper foot, buttonhole foot, walking foot, etc.", seeAlso: ["feed-dogs", "walking-foot"] },
  { id: "press", term: "Press", def: "Using an iron with an up-and-down motion (lift, set, lift) rather than sliding back and forth. Pressing sets seams, sharpens creases, and shapes garments without stretching or distorting the fabric.", seeAlso: ["finger-press"] },
  { id: "princess-seam", term: "Princess Seam", def: "A long, curved seam running from the shoulder (or armhole) over the bust and down to the hem, providing shaping without darts. Creates a fitted silhouette.", seeAlso: ["dart", "ease"] },
  { id: "raw-edge", term: "Raw Edge", def: "The unfinished, cut edge of fabric that will fray on wovens if left untreated. Must be finished (serged, zigzagged, bound, or enclosed) in most garments.", seeAlso: ["selvage", "seam-allowance"] },
  { id: "right-side", term: "Right Side / Wrong Side", def: "The right side (RS) is the outer, visible face of the fabric — the \"pretty\" side. The wrong side (WS) faces inward. \"Right sides together\" (RST) means the pretty sides face each other when pinning.", seeAlso: [] },
  { id: "rotary-cutter", term: "Rotary Cutter", def: "A round-bladed cutting tool rolled along a ruler on a self-healing mat. Faster and more accurate than scissors for straight lines and multiple layers. Essential for quilting.", seeAlso: ["fat-quarter"] },
  { id: "seam-allowance", term: "Seam Allowance", def: "The strip of fabric between the stitching line and the raw edge. Standard seam allowances are ⅝\" (US patterns), 1.5cm (European), or ¼\" (quilting). Included in the pattern but not in the finished garment.", seeAlso: ["grading", "clip", "raw-edge"] },
  { id: "selvage", term: "Selvage / Selvedge", def: "The tightly woven, finished edges on both sides of a fabric bolt that prevent unraveling. Often printed with the manufacturer's name and color dots. Not used in garments — cut it off.", seeAlso: ["grain", "bolt", "raw-edge"] },
  { id: "shirring", term: "Shirring", def: "Multiple parallel rows of gathering, usually done with elastic thread in the bobbin. Creates a stretchy, textured panel. Common on bodices, waistlines, and sleeves for a smocked look.", seeAlso: ["gathering", "ease"] },
  { id: "stay-stitch", term: "Stay Stitch", def: "A line of regular-length stitching sewn through a single layer of fabric, just inside the seam line, to prevent stretching. Done immediately after cutting, before any other sewing. Used on necklines, armholes, and bias edges.", seeAlso: ["bias", "seam-allowance"] },
  { id: "tension", term: "Tension", def: "The balance between the upper thread and bobbin thread in a sewing machine. Correct tension produces stitches that lock in the middle of the fabric. Tension too tight = puckering; too loose = loops on the underside.", seeAlso: ["bobbin", "lockstitch"] },
  { id: "topstitch", term: "Topstitch", def: "A line of visible stitching on the right side of a garment, sewn a measured distance (usually ¼\"–⅜\") from an edge or seam. Decorative and functional — keeps seam allowances and facings flat.", seeAlso: ["edgestitch", "understitch"] },
  { id: "understitch", term: "Understitch", def: "Stitching the facing and seam allowance together, close to the seam line, on the inside of the garment. Prevents the facing from rolling to the right side. Not visible from outside.", seeAlso: ["facing", "edgestitch", "topstitch"] },
  { id: "universal-needle", term: "Universal Needle", def: "A general-purpose sewing machine needle with a slightly rounded point — a compromise between sharp (for wovens) and ballpoint (for knits). Good for most medium-weight woven fabrics.", seeAlso: ["ballpoint-needle"] },
  { id: "walking-foot", term: "Walking Foot", def: "A sewing machine presser foot with its own set of feed dogs on top, gripping and advancing the upper fabric layer in sync with the lower layer. Prevents layers from shifting. Essential for quilting, matching plaids, and sewing slippery or thick fabrics.", seeAlso: ["presser-foot", "feed-dogs"] },
  { id: "warp", term: "Warp", def: "The lengthwise threads on a loom, running parallel to the selvage in finished fabric. Warp threads are held under tension during weaving and are generally stronger than weft threads.", seeAlso: ["weft", "grain", "selvage"] },
  { id: "weft", term: "Weft", def: "The crosswise threads woven back and forth through the warp. Also called filling, pick, or shoot. In finished fabric, the weft runs from selvage to selvage.", seeAlso: ["warp", "grain"] },
  { id: "weight", term: "Weight (Fabric)", def: "How heavy a fabric is, usually measured in oz/yd² or GSM (grams per square meter). Lightweight: voile, lawn, chiffon. Medium: poplin, linen, jersey. Heavy: denim, canvas, coating.", seeAlso: ["hand", "drape"] },
  { id: "woven", term: "Woven", def: "Fabric made by interlacing two sets of threads (warp and weft) at right angles on a loom. Wovens are stable, don't stretch (except on bias), and fray at cut edges. Most sewing patterns are designed for wovens.", seeAlso: ["knit", "grain", "warp", "weft"] }
];


const WEAVE_DATA = {
  wovens: [
    {
      name: "Plain Weave",
      aka: "Also called: tabby, taffeta, homespun, muslin",
      desc: "The simplest and most common weave. Each weft thread passes over one warp thread, then under the next, alternating every row. Think of a basic checkerboard pattern. This creates a balanced, stable fabric with no obvious right or wrong side.",
      sewingNotes: "The easiest weave to sew. Cuts cleanly, feeds evenly through your machine, and presses crisply. Fraying is moderate — a simple zigzag or serged edge is sufficient. Great for beginners.",
      examples: "Quilting cotton, muslin, voile, poplin, broadcloth, canvas, linen, chambray",
      traits: { pros: ["Stable — doesn't shift while cutting", "Easy to press flat", "Affordable and widely available"], cons: ["Less drape than other weaves", "Can wrinkle easily"], neutral: ["Moderate fraying"] },
      svg: `<svg viewBox="0 0 120 120" fill="none">
        <rect width="120" height="120" fill="#FAF6F0"/>
        <!-- Warp threads (vertical) -->
        <rect x="10" y="0" width="12" height="120" fill="#C4A882" opacity="0.5"/>
        <rect x="34" y="0" width="12" height="120" fill="#C4A882" opacity="0.5"/>
        <rect x="58" y="0" width="12" height="120" fill="#C4A882" opacity="0.5"/>
        <rect x="82" y="0" width="12" height="120" fill="#C4A882" opacity="0.5"/>
        <!-- Weft threads (horizontal) - alternating over/under -->
        <rect x="0" y="10" width="10" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="22" y="10" width="12" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="46" y="10" width="12" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="70" y="10" width="12" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="94" y="10" width="26" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="10" y="34" width="12" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="34" y="34" width="12" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="58" y="34" width="12" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="82" y="34" width="12" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="0" y="58" width="10" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="22" y="58" width="12" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="46" y="58" width="12" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="70" y="58" width="12" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="94" y="58" width="26" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="10" y="82" width="12" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="34" y="82" width="12" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="58" y="82" width="12" height="12" fill="#8B6B4A" rx="1"/>
        <rect x="82" y="82" width="12" height="12" fill="#8B6B4A" rx="1"/>
      </svg>`
    },
    {
      name: "Twill Weave",
      aka: "Also called: serge, gabardine, herringbone (variant), denim",
      desc: "Each weft thread passes over two or more warp threads, then under one (or more), shifting one position each row. This creates the distinctive diagonal line (called the \"twill line\" or \"wale\") visible on the fabric surface. The diagonal can run left-to-right or right-to-left.",
      sewingNotes: "Twill has a clear right side (the diagonal is more visible) and wrong side. It drapes better than plain weave and resists wrinkling more. The diagonal rib can cause fabric layers to \"walk\" — use a walking foot or pin generously. Frays moderately.",
      examples: "Denim, chino, gabardine, flannel, herringbone, cavalry twill, drill",
      traits: { pros: ["Better drape than plain weave", "More wrinkle-resistant", "Stronger — the longer floats distribute stress"], cons: ["Has a distinct right/wrong side", "Layers can shift during sewing"], neutral: ["Shows soil less than plain weave"] },
      svg: `<svg viewBox="0 0 120 120" fill="none">
        <rect width="120" height="120" fill="#FAF6F0"/>
        <!-- Warp threads (vertical, muted) -->
        <rect x="6" y="0" width="12" height="120" fill="#C4A882" opacity="0.35"/>
        <rect x="30" y="0" width="12" height="120" fill="#C4A882" opacity="0.35"/>
        <rect x="54" y="0" width="12" height="120" fill="#C4A882" opacity="0.35"/>
        <rect x="78" y="0" width="12" height="120" fill="#C4A882" opacity="0.35"/>
        <rect x="102" y="0" width="12" height="120" fill="#C4A882" opacity="0.35"/>
        <!-- Twill pattern: 2/1 diagonal stepping right -->
        <rect x="6" y="6" width="12" height="12" fill="#5C554D" rx="1"/>
        <rect x="30" y="6" width="12" height="12" fill="#5C554D" rx="1"/>
        <rect x="78" y="6" width="12" height="12" fill="#5C554D" rx="1"/>
        <rect x="30" y="30" width="12" height="12" fill="#5C554D" rx="1"/>
        <rect x="54" y="30" width="12" height="12" fill="#5C554D" rx="1"/>
        <rect x="102" y="30" width="12" height="12" fill="#5C554D" rx="1"/>
        <rect x="54" y="54" width="12" height="12" fill="#5C554D" rx="1"/>
        <rect x="78" y="54" width="12" height="12" fill="#5C554D" rx="1"/>
        <rect x="6" y="54" width="12" height="12" fill="#5C554D" rx="1"/>
        <rect x="78" y="78" width="12" height="12" fill="#5C554D" rx="1"/>
        <rect x="102" y="78" width="12" height="12" fill="#5C554D" rx="1"/>
        <rect x="30" y="78" width="12" height="12" fill="#5C554D" rx="1"/>
        <rect x="102" y="102" width="12" height="12" fill="#5C554D" rx="1"/>
        <rect x="6" y="102" width="12" height="12" fill="#5C554D" rx="1"/>
        <rect x="54" y="102" width="12" height="12" fill="#5C554D" rx="1"/>
        <!-- Diagonal guide line -->
        <line x1="0" y1="0" x2="120" y2="120" stroke="#8B6B4A" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
      </svg>`
    },
    {
      name: "Satin Weave",
      aka: "Also called: sateen (when made with cotton/short-staple fibers)",
      desc: "The weft (or warp) thread \"floats\" over four or more threads before going under one. These long floats reflect light, creating the glossy, luminous surface satin is known for. The interlacing points are spaced so no diagonal line forms — unlike twill. The fabric has a clear shiny side and a dull back.",
      sewingNotes: "Slippery. Pin within seam allowances only (pin holes can show). Use pattern weights and cut single-layer when possible. A sharp/Microtex needle prevents snagging. Reduce presser foot pressure. French seams work well. The long floats snag easily — handle gently.",
      examples: "Charmeuse, duchess satin, crêpe-back satin, sateen (cotton), peau de soie",
      traits: { pros: ["Beautiful luster and sheen", "Excellent drape", "Smooth hand feel"], cons: ["Slippery — hard to cut and sew", "Snags easily", "Pin and needle holes may show"], neutral: ["Clear right/wrong side"] },
      svg: `<svg viewBox="0 0 120 120" fill="none">
        <rect width="120" height="120" fill="#FAF6F0"/>
        <!-- Warp threads (vertical, subtle) -->
        <rect x="6" y="0" width="12" height="120" fill="#C4A882" opacity="0.25"/>
        <rect x="30" y="0" width="12" height="120" fill="#C4A882" opacity="0.25"/>
        <rect x="54" y="0" width="12" height="120" fill="#C4A882" opacity="0.25"/>
        <rect x="78" y="0" width="12" height="120" fill="#C4A882" opacity="0.25"/>
        <rect x="102" y="0" width="12" height="120" fill="#C4A882" opacity="0.25"/>
        <!-- Satin: long weft floats (4 over, 1 under pattern) -->
        <rect x="0" y="6" width="90" height="12" fill="#9B8574" rx="1" opacity="0.8"/>
        <rect x="102" y="6" width="18" height="12" fill="#9B8574" rx="1" opacity="0.8"/>
        <rect x="30" y="30" width="90" height="12" fill="#9B8574" rx="1" opacity="0.8"/>
        <rect x="0" y="30" width="18" height="12" fill="#9B8574" rx="1" opacity="0.8"/>
        <rect x="54" y="54" width="66" height="12" fill="#9B8574" rx="1" opacity="0.8"/>
        <rect x="0" y="54" width="42" height="12" fill="#9B8574" rx="1" opacity="0.8"/>
        <rect x="78" y="78" width="42" height="12" fill="#9B8574" rx="1" opacity="0.8"/>
        <rect x="0" y="78" width="66" height="12" fill="#9B8574" rx="1" opacity="0.8"/>
        <rect x="0" y="102" width="90" height="12" fill="#9B8574" rx="1" opacity="0.8"/>
        <rect x="102" y="102" width="18" height="12" fill="#9B8574" rx="1" opacity="0.8"/>
      </svg>`
    },
    {
      name: "Basket Weave",
      aka: "Also called: hopsack, monk's cloth, Oxford (in shirting)",
      desc: "A variation of plain weave where two or more warp threads are interlaced with two or more weft threads as a group. Imagine the plain weave pattern but with pairs of threads instead of singles. This creates a checkered, textured surface.",
      sewingNotes: "Less stable than plain weave — the grouped threads can shift. Handle carefully during cutting and pinning. Tends to fray more than plain weave because groups of threads pull out together. Stay-stitch curved edges promptly.",
      examples: "Oxford cloth, monk's cloth, hopsack suiting, some canvas",
      traits: { pros: ["Interesting texture", "Softer than plain weave", "Good breathability"], cons: ["Frays more easily", "Less dimensionally stable", "Threads can snag and pull"], neutral: ["More drape than plain weave"] },
      svg: `<svg viewBox="0 0 120 120" fill="none">
        <rect width="120" height="120" fill="#FAF6F0"/>
        <!-- Paired warp threads (vertical) -->
        <rect x="6" y="0" width="10" height="120" fill="#C4A882" opacity="0.45"/>
        <rect x="18" y="0" width="10" height="120" fill="#C4A882" opacity="0.45"/>
        <rect x="42" y="0" width="10" height="120" fill="#C4A882" opacity="0.45"/>
        <rect x="54" y="0" width="10" height="120" fill="#C4A882" opacity="0.45"/>
        <rect x="78" y="0" width="10" height="120" fill="#C4A882" opacity="0.45"/>
        <rect x="90" y="0" width="10" height="120" fill="#C4A882" opacity="0.45"/>
        <!-- Paired weft threads in basket pattern -->
        <rect x="0" y="6" width="28" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="0" y="17" width="28" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="42" y="6" width="22" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="42" y="17" width="22" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="78" y="6" width="22" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="78" y="17" width="22" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="6" y="42" width="22" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="6" y="53" width="22" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="42" y="42" width="22" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="42" y="53" width="22" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="78" y="42" width="22" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="78" y="53" width="22" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="0" y="78" width="28" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="0" y="89" width="28" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="42" y="78" width="22" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="42" y="89" width="22" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="78" y="78" width="22" height="9" fill="#8B6B4A" rx="1"/>
        <rect x="78" y="89" width="22" height="9" fill="#8B6B4A" rx="1"/>
      </svg>`
    },
    {
      name: "Jacquard Weave",
      aka: "Also called: brocade, damask, matelassé, tapestry",
      desc: "Not a single weave structure but a method of weaving using a Jacquard loom, which can control each warp thread independently. This allows intricate patterns — florals, paisleys, geometrics — to be woven directly into the fabric rather than printed on. The pattern is part of the cloth's structure.",
      sewingNotes: "The pattern repeat matters for layout — plan your cutting to match motifs at seams. Generally heavier than basic weaves. Match needle size to fabric weight. Some jacquards have long floats on the back that can snag — handle the wrong side carefully.",
      examples: "Brocade, damask, matelassé, tapestry fabric, some upholstery",
      traits: { pros: ["Complex patterns woven in, not printed", "Often reversible (damask)", "Luxurious appearance"], cons: ["Expensive", "Can be bulky at seams", "Pattern matching required"], neutral: ["Usually dry clean only"] },
      svg: `<svg viewBox="0 0 120 120" fill="none">
        <rect width="120" height="120" fill="#FAF6F0"/>
        <!-- Simplified jacquard pattern: diamond/floral motif -->
        <rect x="0" y="0" width="120" height="120" fill="#E8DDD0" rx="4"/>
        <path d="M60 15 L90 45 L75 60 L90 75 L60 105 L30 75 L45 60 L30 45 Z" fill="#C4A882" opacity="0.6"/>
        <path d="M60 25 L80 45 L70 55 L80 65 L60 95 L40 65 L50 55 L40 45 Z" fill="#B09575" opacity="0.5"/>
        <circle cx="60" cy="60" r="10" fill="#9B8574" opacity="0.5"/>
        <circle cx="60" cy="60" r="4" fill="#8B6B4A" opacity="0.6"/>
        <!-- Corner repeats (suggesting pattern repeat) -->
        <path d="M0 0 L15 15 L0 30 Z" fill="#C4A882" opacity="0.3"/>
        <path d="M120 0 L105 15 L120 30 Z" fill="#C4A882" opacity="0.3"/>
        <path d="M0 90 L15 105 L0 120 Z" fill="#C4A882" opacity="0.3"/>
        <path d="M120 90 L105 105 L120 120 Z" fill="#C4A882" opacity="0.3"/>
      </svg>`
    }
  ],
  knits: [
    {
      name: "Jersey Knit",
      aka: "Also called: single knit, stockinette, plain knit",
      desc: "The most common knit fabric. Made by knitting every stitch on the right side and purling every stitch on the wrong side — just like the stockinette stitch in hand knitting. The right side shows smooth V-shaped loops; the wrong side shows bumpy horizontal ridges (purl bumps). T-shirts are almost always jersey.",
      sewingNotes: "Jersey curls at the edges — the cut edges roll toward the right side along the crossgrain and toward the wrong side along the lengthwise grain. This is normal, not a defect. Use a ballpoint/jersey needle to avoid snagging loops. Sew with a stretch stitch (zigzag, lightning bolt, or stretch straight stitch) or a serger. Don't pull or stretch the fabric as it feeds through your machine.",
      examples: "T-shirt fabric, cotton jersey, rayon jersey, wool jersey, bamboo jersey",
      traits: { pros: ["Lightweight and comfortable", "Good drape", "Widely available in every fiber"], cons: ["Edges curl when cut", "Clear right/wrong side", "Can run if a thread is snagged"], neutral: ["Moderate stretch (more cross-grain)"] },
      svg: `<svg viewBox="0 0 120 120" fill="none">
        <rect width="120" height="120" fill="#FAF6F0"/>
        <!-- Jersey: V-shaped knit loops in columns -->
        <g stroke="#8B6B4A" stroke-width="2.2" fill="none" stroke-linecap="round">
          <!-- Column 1 -->
          <path d="M15 15 Q20 22 25 15 Q30 8 35 15"/>
          <path d="M15 35 Q20 42 25 35 Q30 28 35 35"/>
          <path d="M15 55 Q20 62 25 55 Q30 48 35 55"/>
          <path d="M15 75 Q20 82 25 75 Q30 68 35 75"/>
          <path d="M15 95 Q20 102 25 95 Q30 88 35 95"/>
          <!-- Column 2 -->
          <path d="M45 15 Q50 22 55 15 Q60 8 65 15"/>
          <path d="M45 35 Q50 42 55 35 Q60 28 65 35"/>
          <path d="M45 55 Q50 62 55 55 Q60 48 65 55"/>
          <path d="M45 75 Q50 82 55 75 Q60 68 65 75"/>
          <path d="M45 95 Q50 102 55 95 Q60 88 65 95"/>
          <!-- Column 3 -->
          <path d="M75 15 Q80 22 85 15 Q90 8 95 15"/>
          <path d="M75 35 Q80 42 85 35 Q90 28 95 35"/>
          <path d="M75 55 Q80 62 85 55 Q90 48 95 55"/>
          <path d="M75 75 Q80 82 85 75 Q90 68 95 75"/>
          <path d="M75 95 Q80 102 85 95 Q90 88 95 95"/>
        </g>
        <!-- Connecting lines between rows -->
        <g stroke="#C4A882" stroke-width="1" opacity="0.4">
          <line x1="15" y1="20" x2="15" y2="30"/>
          <line x1="35" y1="20" x2="35" y2="30"/>
          <line x1="45" y1="20" x2="45" y2="30"/>
          <line x1="65" y1="20" x2="65" y2="30"/>
          <line x1="75" y1="20" x2="75" y2="30"/>
          <line x1="95" y1="20" x2="95" y2="30"/>
        </g>
      </svg>`
    },
    {
      name: "Rib Knit",
      aka: "Also called: ribbing, 1×1 rib, 2×2 rib",
      desc: "Made by alternating columns of knit and purl stitches on the same side. A 1×1 rib alternates one knit column with one purl column. A 2×2 rib alternates two and two. The result is raised vertical ridges that make the fabric very stretchy crosswise. Rib knit looks the same on both sides.",
      sewingNotes: "Very stretchy — use it for cuffs, necklines, waistbands, and hems where you need the fabric to stretch open and snap back. Cut slightly shorter than your measurement since it recovers so well. Does not curl at the edges (a big advantage over jersey). Use a ballpoint needle and stretch stitch.",
      examples: "Cuffs, collar bands, neckline trim, waistbands, fitted tops, tank tops",
      traits: { pros: ["Very stretchy with good recovery", "Does not curl at edges", "Same on both sides (reversible)"], cons: ["Can be hard to sew flat (wants to contract)", "Form-fitting — shows body contours"], neutral: ["Heavier than jersey"] },
      svg: `<svg viewBox="0 0 120 120" fill="none">
        <rect width="120" height="120" fill="#FAF6F0"/>
        <!-- Rib knit: alternating raised/recessed vertical columns -->
        <g stroke="#8B6B4A" stroke-width="2.5" fill="none" stroke-linecap="round">
          <!-- Raised columns (knit) -->
          <path d="M12 10 Q12 20 12 30 Q12 40 12 50 Q12 60 12 70 Q12 80 12 90 Q12 100 12 110" stroke-width="3"/>
          <path d="M36 10 Q36 20 36 30 Q36 40 36 50 Q36 60 36 70 Q36 80 36 90 Q36 100 36 110" stroke-width="3"/>
          <path d="M60 10 Q60 20 60 30 Q60 40 60 50 Q60 60 60 70 Q60 80 60 90 Q60 100 60 110" stroke-width="3"/>
          <path d="M84 10 Q84 20 84 30 Q84 40 84 50 Q84 60 84 70 Q84 80 84 90 Q84 100 84 110" stroke-width="3"/>
          <path d="M108 10 Q108 20 108 30 Q108 40 108 50 Q108 60 108 70 Q108 80 108 90 Q108 100 108 110" stroke-width="3"/>
        </g>
        <!-- Recessed columns (purl) — thinner, lighter -->
        <g stroke="#C4A882" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.6">
          <path d="M24 10 L24 110"/>
          <path d="M48 10 L48 110"/>
          <path d="M72 10 L72 110"/>
          <path d="M96 10 L96 110"/>
        </g>
        <!-- Horizontal connection lines showing stretch -->
        <g stroke="#C4A882" stroke-width="0.8" opacity="0.3">
          <line x1="8" y1="30" x2="112" y2="30"/>
          <line x1="8" y1="60" x2="112" y2="60"/>
          <line x1="8" y1="90" x2="112" y2="90"/>
        </g>
        <!-- Stretch arrows -->
        <g stroke="#5B8C6B" stroke-width="1.5" opacity="0.6">
          <line x1="2" y1="60" x2="8" y2="60"/>
          <line x1="112" y1="60" x2="118" y2="60"/>
          <path d="M2 56 L2 64" />
          <path d="M118 56 L118 64" />
        </g>
      </svg>`
    },
    {
      name: "Interlock Knit",
      aka: "Also called: double knit, ponte (when synthetic)",
      desc: "Think of two layers of jersey knit fused back-to-back. The yarn is carried between the two faces, making the fabric thicker, more stable, and identical on both sides. It doesn't curl, stretches less than jersey, and behaves almost like a woven fabric while still being a knit.",
      sewingNotes: "The best knit fabric for beginners. It's stable, doesn't curl, and you can use many of the same techniques as woven fabrics. Use a ballpoint needle, but you often don't even need a stretch stitch — a regular straight stitch works on stable interlocks. Ponte de Roma (a type of interlock) is a sewist's favorite for pants and structured dresses.",
      examples: "Ponte de Roma, baby interlock, double knit, cotton interlock",
      traits: { pros: ["No curling at edges", "Reversible — same on both sides", "Stable, easy to sew", "Best knit for beginners"], cons: ["Less stretch than jersey or rib", "Heavier/thicker", "May not have much vertical stretch"], neutral: ["More expensive than jersey"] },
      svg: `<svg viewBox="0 0 120 120" fill="none">
        <rect width="120" height="120" fill="#FAF6F0"/>
        <!-- Two interlocked layers shown slightly offset -->
        <!-- Layer 1 (front) -->
        <g stroke="#8B6B4A" stroke-width="2" fill="none" stroke-linecap="round">
          <path d="M10 15 Q17 22 24 15 Q31 8 38 15"/>
          <path d="M10 45 Q17 52 24 45 Q31 38 38 45"/>
          <path d="M10 75 Q17 82 24 75 Q31 68 38 75"/>
          <path d="M50 15 Q57 22 64 15 Q71 8 78 15"/>
          <path d="M50 45 Q57 52 64 45 Q71 38 78 45"/>
          <path d="M50 75 Q57 82 64 75 Q71 68 78 75"/>
          <path d="M85 15 Q92 22 99 15 Q106 8 113 15"/>
          <path d="M85 45 Q92 52 99 45 Q106 38 113 45"/>
          <path d="M85 75 Q92 82 99 75 Q106 68 113 75"/>
        </g>
        <!-- Layer 2 (back, slightly offset) -->
        <g stroke="#C4A882" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.7">
          <path d="M10 25 Q17 32 24 25 Q31 18 38 25"/>
          <path d="M10 55 Q17 62 24 55 Q31 48 38 55"/>
          <path d="M10 85 Q17 92 24 85 Q31 78 38 85"/>
          <path d="M50 25 Q57 32 64 25 Q71 18 78 25"/>
          <path d="M50 55 Q57 62 64 55 Q71 48 78 55"/>
          <path d="M50 85 Q57 92 64 85 Q71 78 78 85"/>
          <path d="M85 25 Q92 32 99 25 Q106 18 113 25"/>
          <path d="M85 55 Q92 62 99 55 Q106 48 113 55"/>
          <path d="M85 85 Q92 92 99 85 Q106 78 113 85"/>
        </g>
        <!-- "Double" label -->
        <text x="60" y="108" font-family="Georgia, serif" font-size="9" fill="#9B9389" text-anchor="middle" opacity="0.6">double layer</text>
      </svg>`
    },
    {
      name: "French Terry",
      aka: "Also called: loopback terry, sweatshirt knit (when brushed = fleece)",
      desc: "A knit fabric with a smooth face (like jersey) and small loops on the back. The loops are not cut, giving the inside a soft, absorbent texture. Brushing those loops produces fleece — the fuzzy inside of sweatshirts. French terry is lighter and less bulky than fleece.",
      sewingNotes: "Treat like a medium-weight jersey. Use a ballpoint needle and stretch stitch. The looped back can catch on feed dogs — make sure the smooth side faces up. French terry has moderate stretch and is more stable than jersey, making it approachable for knit beginners.",
      examples: "Hoodie fabric, lightweight sweats, lounge pants, casual dresses",
      traits: { pros: ["Absorbent and cozy", "Smooth outside, soft loops inside", "Good stretch recovery"], cons: ["Loops can snag", "Heavier than jersey"], neutral: ["Less stretch than single jersey"] },
      svg: `<svg viewBox="0 0 120 120" fill="none">
        <rect width="120" height="120" fill="#FAF6F0"/>
        <!-- Smooth face (top half showing jersey face) -->
        <rect x="4" y="4" width="112" height="52" fill="#EDE6DC" rx="6"/>
        <g stroke="#8B6B4A" stroke-width="1.8" fill="none" stroke-linecap="round">
          <path d="M15 20 Q22 27 29 20 Q36 13 43 20"/>
          <path d="M50 20 Q57 27 64 20 Q71 13 78 20"/>
          <path d="M85 20 Q92 27 99 20"/>
          <path d="M15 38 Q22 45 29 38 Q36 31 43 38"/>
          <path d="M50 38 Q57 45 64 38 Q71 31 78 38"/>
          <path d="M85 38 Q92 45 99 38"/>
        </g>
        <text x="60" y="52" font-family="Georgia, serif" font-size="8" fill="#9B9389" text-anchor="middle">smooth face</text>
        <!-- Loop back (bottom half) -->
        <rect x="4" y="64" width="112" height="52" fill="#E8DDD0" rx="6"/>
        <g stroke="#C4A882" stroke-width="1.8" fill="none" stroke-linecap="round">
          <!-- Loops -->
          <path d="M15 80 Q15 72 22 72 Q29 72 29 80"/>
          <path d="M34 80 Q34 72 41 72 Q48 72 48 80"/>
          <path d="M53 80 Q53 72 60 72 Q67 72 67 80"/>
          <path d="M72 80 Q72 72 79 72 Q86 72 86 80"/>
          <path d="M91 80 Q91 72 98 72 Q105 72 105 80"/>
          <path d="M15 100 Q15 92 22 92 Q29 92 29 100"/>
          <path d="M34 100 Q34 92 41 92 Q48 92 48 100"/>
          <path d="M53 100 Q53 92 60 92 Q67 92 67 100"/>
          <path d="M72 100 Q72 92 79 92 Q86 92 86 100"/>
          <path d="M91 100 Q91 92 98 92 Q105 92 105 100"/>
        </g>
        <text x="60" y="112" font-family="Georgia, serif" font-size="8" fill="#9B9389" text-anchor="middle">loop back</text>
      </svg>`
    }
  ],
  grain: [
    {
      name: "Lengthwise Grain (Warp)",
      desc: "The threads that run parallel to the selvage — the long direction of the fabric bolt. These are the warp threads, held taut on the loom during weaving. They are the strongest direction of the fabric with the least stretch.",
      howToFind: "Look at the selvage (the finished edge of the fabric). The lengthwise grain runs in the same direction. If you've cut off the selvage, pull the fabric gently in both directions — the direction with less give is the lengthwise grain.",
      whyItMatters: "Pattern pieces are almost always placed along the lengthwise grain (the grain line arrow on your pattern runs this direction). This puts the strongest threads running vertically on your body, where gravity pulls. Your garment hangs better, stretches less, and keeps its shape.",
      svg: `<svg viewBox="0 0 180 160" fill="none">
        <rect x="20" y="10" width="140" height="140" fill="#EDE6DC" rx="4" stroke="#C4A882" stroke-width="1"/>
        <!-- Selvage indicators -->
        <rect x="20" y="10" width="6" height="140" fill="#C4A882" opacity="0.4" rx="1"/>
        <rect x="154" y="10" width="6" height="140" fill="#C4A882" opacity="0.4" rx="1"/>
        <text x="13" y="80" font-family="Georgia, serif" font-size="7" fill="#9B9389" text-anchor="middle" transform="rotate(-90 13 80)">SELVAGE</text>
        <text x="167" y="80" font-family="Georgia, serif" font-size="7" fill="#9B9389" text-anchor="middle" transform="rotate(90 167 80)">SELVAGE</text>
        <!-- Lengthwise grain arrow -->
        <line x1="90" y1="25" x2="90" y2="135" stroke="#5B8C6B" stroke-width="2.5"/>
        <polygon points="90,20 84,32 96,32" fill="#5B8C6B"/>
        <polygon points="90,140 84,128 96,128" fill="#5B8C6B"/>
        <text x="90" y="85" font-family="Georgia, serif" font-size="9" fill="#3d6b4a" text-anchor="middle" font-weight="600">GRAIN</text>
      </svg>`
    },
    {
      name: "Crosswise Grain (Weft / Cross-grain)",
      desc: "The threads that run perpendicular to the selvage — across the width of the fabric bolt. These are the weft threads, woven back and forth through the warp. They have slightly more stretch than the lengthwise grain.",
      howToFind: "It runs from selvage to selvage across the fabric's width. Pull gently — the cross-grain stretches a little more than the lengthwise grain.",
      whyItMatters: "Cutting pattern pieces on the cross-grain is sometimes done to save fabric or to make a directional print run differently. It usually works for casual garments, but the slight extra stretch can affect fit on tailored or close-fitting pieces.",
      svg: `<svg viewBox="0 0 180 160" fill="none">
        <rect x="20" y="10" width="140" height="140" fill="#EDE6DC" rx="4" stroke="#C4A882" stroke-width="1"/>
        <rect x="20" y="10" width="6" height="140" fill="#C4A882" opacity="0.4" rx="1"/>
        <rect x="154" y="10" width="6" height="140" fill="#C4A882" opacity="0.4" rx="1"/>
        <text x="13" y="80" font-family="Georgia, serif" font-size="7" fill="#9B9389" text-anchor="middle" transform="rotate(-90 13 80)">SELVAGE</text>
        <text x="167" y="80" font-family="Georgia, serif" font-size="7" fill="#9B9389" text-anchor="middle" transform="rotate(90 167 80)">SELVAGE</text>
        <!-- Crosswise grain arrow -->
        <line x1="35" y1="80" x2="145" y2="80" stroke="#8B6B4A" stroke-width="2.5"/>
        <polygon points="30,80 42,74 42,86" fill="#8B6B4A"/>
        <polygon points="150,80 138,74 138,86" fill="#8B6B4A"/>
        <text x="90" y="74" font-family="Georgia, serif" font-size="9" fill="#6B5A45" text-anchor="middle" font-weight="600">CROSS-GRAIN</text>
      </svg>`
    },
    {
      name: "Bias Grain (True Bias = 45°)",
      desc: "The diagonal direction, exactly 45° from both the lengthwise and cross-grain. Fabric cut on the bias stretches the most — even woven fabrics with no inherent stretch become drapey and fluid on the bias. This is because the diagonal pulls threads apart rather than along their length.",
      howToFind: "Fold the fabric so the selvage meets the crosswise cut edge. The fold line is the true bias — exactly 45°. A bias-cut piece will stretch noticeably when you hold it up.",
      whyItMatters: "Bias-cut garments drape beautifully and cling to the body. Bias binding stretches to go around curves smoothly. But bias-cut pieces are harder to handle — they stretch during cutting, sewing, and hanging. Let bias-cut pieces hang for 24 hours before hemming to let the stretch settle.",
      svg: `<svg viewBox="0 0 180 160" fill="none">
        <rect x="20" y="10" width="140" height="140" fill="#EDE6DC" rx="4" stroke="#C4A882" stroke-width="1"/>
        <rect x="20" y="10" width="6" height="140" fill="#C4A882" opacity="0.4" rx="1"/>
        <rect x="154" y="10" width="6" height="140" fill="#C4A882" opacity="0.4" rx="1"/>
        <text x="13" y="80" font-family="Georgia, serif" font-size="7" fill="#9B9389" text-anchor="middle" transform="rotate(-90 13 80)">SELVAGE</text>
        <text x="167" y="80" font-family="Georgia, serif" font-size="7" fill="#9B9389" text-anchor="middle" transform="rotate(90 167 80)">SELVAGE</text>
        <!-- Bias arrow (diagonal) -->
        <line x1="40" y1="130" x2="140" y2="30" stroke="#9B4A3A" stroke-width="2.5"/>
        <polygon points="143,27 131,27 140,36" fill="#9B4A3A"/>
        <polygon points="37,133 49,133 40,124" fill="#9B4A3A"/>
        <text x="100" y="68" font-family="Georgia, serif" font-size="9" fill="#9B4A3A" text-anchor="middle" font-weight="600" transform="rotate(-38 100 68)">BIAS (45°)</text>
        <!-- 45-degree angle indicator -->
        <path d="M40 130 L40 110 L60 130" stroke="#9B4A3A" stroke-width="1" fill="none" opacity="0.5"/>
        <text x="48" y="126" font-family="Georgia, serif" font-size="7" fill="#9B4A3A" opacity="0.6">45°</text>
        <!-- Faint grain references -->
        <line x1="90" y1="20" x2="90" y2="140" stroke="#5B8C6B" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.4"/>
        <line x1="30" y1="80" x2="150" y2="80" stroke="#8B6B4A" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.4"/>
      </svg>`
    }
  ]
};


const TROUBLESHOOT_DATA = {
  stitching: {
    label: 'Stitch Problems',
    icon: '⚡',
    problems: [
      {
        symptom: 'Skipped stitches',
        causes: [
          'Needle is dull, bent, or the wrong type for your fabric',
          'Needle is inserted incorrectly (flat side should face the back)',
          'Thread tension is too tight or too loose',
          'Fabric is being pulled or pushed instead of feeding naturally',
          'Wrong needle size for the thread weight'
        ],
        fixes: [
          'Replace the needle — start with a fresh needle every project',
          'Match needle type to fabric: ballpoint for knits, sharp/microtex for wovens',
          'Re-thread the machine completely, including the bobbin',
          'Reduce presser foot pressure for delicate fabrics',
          'Try a needle one size larger'
        ],
        links: { needle: true, fiber: true }
      },
      {
        symptom: 'Thread breaking',
        causes: [
          'Upper tension is set too high',
          'Thread is old, cheap, or dried out (loses elasticity over time)',
          'Thread is caught on a nick in the spool or thread guide',
          'Needle eye is too small for the thread weight',
          'Bobbin is wound unevenly or too tightly'
        ],
        fixes: [
          'Lower the upper tension by 1–2 numbers and test on a scrap',
          'Use quality thread — polyester-core cotton or 100% polyester for most projects',
          'Re-thread from scratch, checking each guide and the needle eye',
          'Move up one needle size to get a larger eye',
          'Re-wind the bobbin at a steady, moderate speed'
        ],
        links: { needle: true }
      },
      {
        symptom: 'Uneven stitch length',
        causes: [
          'Feed dogs are clogged with lint',
          'Presser foot pressure is too light for the fabric weight',
          'Fabric is being pulled or pushed by hand',
          'Stitch length setting is too short for the fabric thickness',
          'Walking foot is needed but not installed'
        ],
        fixes: [
          'Clean under the throat plate and around the feed dogs',
          'Increase presser foot pressure for heavier fabrics',
          'Guide the fabric gently — let the feed dogs do the work',
          'Lengthen the stitch: 2.5–3.0 mm for medium weight, 3.0–3.5 mm for heavy',
          'Use a walking foot for multiple layers, quilting, or slippery fabrics'
        ],
        links: { needle: true }
      }
    ]
  },
  tension: {
    label: 'Tension Issues',
    icon: '⚖️',
    problems: [
      {
        symptom: 'Loops on the underside (bobbin side)',
        causes: [
          'Upper tension is too loose — thread isn\'t being pulled tight enough on top',
          'Machine is not threaded correctly (most common cause)',
          'Presser foot was up when threading (tension discs didn\'t engage)'
        ],
        fixes: [
          'Re-thread with the presser foot DOWN so the tension discs engage',
          'Increase upper tension by 1 number at a time, testing on scraps',
          'Make sure thread is seated fully between the tension discs',
          'Check that the bobbin is inserted in the correct direction'
        ],
        links: { needle: true }
      },
      {
        symptom: 'Loops on the top side',
        causes: [
          'Bobbin tension is too loose or bobbin is not seated correctly',
          'Bobbin thread is the wrong weight for the project',
          'Bobbin case has lint buildup affecting tension'
        ],
        fixes: [
          'Remove and re-insert the bobbin, making sure it clicks into place',
          'Clean the bobbin case with a small brush — lint is the #1 cause',
          'Try a new bobbin; old ones can warp slightly',
          'Use the same thread weight in the bobbin as the top (or one weight lighter)'
        ],
        links: { needle: true }
      },
      {
        symptom: 'Puckering along seams',
        causes: [
          'Tension is too tight (top, bottom, or both)',
          'Stitch length is too short for the fabric',
          'Needle is too large, leaving visible holes',
          'Lightweight fabric needs stabilization'
        ],
        fixes: [
          'Lower tension by 1–2 numbers on both top and bobbin',
          'Lengthen the stitch — try 2.5–3.0 mm instead of 2.0 mm',
          'Use a smaller needle (size 60/8 or 70/10 for lightweight fabrics)',
          'Place tissue paper or a stabilizer under the fabric while sewing, tear away after',
          'For knits: use a stretch needle and a slight zigzag (0.5 mm width)'
        ],
        links: { needle: true, technique: 'seams' }
      }
    ]
  },
  fabric: {
    label: 'Fabric Handling',
    icon: '🧶',
    problems: [
      {
        symptom: 'Fabric getting pulled into the machine',
        causes: [
          'Needle plate hole is too wide (using a zigzag plate for straight stitching)',
          'Starting at the very edge of the fabric with no backstitching',
          'Fabric is too lightweight or thin to feed properly'
        ],
        fixes: [
          'Switch to a straight stitch throat plate if available',
          'Start 1 cm from the edge, or hold thread tails taut behind the foot when starting',
          'Use a scrap of fabric as a "leader" — sew onto a scrap, then chain into your piece',
          'Place tissue paper or tear-away stabilizer under lightweight fabrics'
        ],
        links: { needle: true }
      },
      {
        symptom: 'Fabric layers shifting or not aligning',
        causes: [
          'Bottom layer is being pushed forward by the feed dogs',
          'Fabrics are slippery (silk, satin, rayon)',
          'Insufficient or wrong type of pinning'
        ],
        fixes: [
          'Use a walking foot — it feeds both layers at the same rate',
          'Pin perpendicular to the seam line, every 2–3 inches',
          'Hand-baste slippery fabrics before machine sewing',
          'Use fabric clips instead of pins for heavy or delicate fabrics',
          'Reduce presser foot pressure slightly'
        ],
        links: { needle: true, technique: 'seams' }
      },
      {
        symptom: 'Fabric fraying or unraveling',
        causes: [
          'Raw edges are not finished',
          'Fabric has a loose weave (linen, loosely woven cotton)',
          'Seam allowance is too narrow for the fabric type'
        ],
        fixes: [
          'Finish edges with a serger, zigzag stitch, or pinking shears',
          'Use French seams or flat-felled seams for fabrics that fray heavily',
          'Apply fray check or clear nail polish to critical raw edges',
          'Cut a wider seam allowance (⅝" instead of ½") for loose weaves',
          'Interface areas under stress (armholes, necklines)'
        ],
        links: { technique: 'seams', fiber: true }
      },
      {
        symptom: 'Fabric stretching out of shape',
        causes: [
          'Cutting or sewing on the bias without stabilization',
          'Knit fabric handled without appropriate needle and stitch',
          'Hanging garment pieces before construction is complete'
        ],
        fixes: [
          'Stay-stitch necklines and armholes within the seam allowance right after cutting',
          'Use a walking foot or a knit-specific presser foot',
          'For bias cuts: let pieces hang for 24 hours before hemming so they settle',
          'Apply fusible stay tape to shoulders and waistlines',
          'Use a stretch needle and narrow zigzag for knit seams'
        ],
        links: { needle: true, technique: 'seams' }
      }
    ]
  },
  fitting: {
    label: 'Fit & Shape',
    icon: '📐',
    problems: [
      {
        symptom: 'Garment is too tight after washing',
        causes: [
          'Fabric was not pre-washed before cutting',
          'Natural fibers (cotton, linen) shrink 3–8% on first wash',
          'Using hot water or high heat drying'
        ],
        fixes: [
          'Always pre-wash and dry fabric the same way you\'ll care for the finished garment',
          'For cotton and linen: wash hot and tumble dry to pre-shrink completely',
          'Check the fiber\'s shrinkage percentage in the Reference tool',
          'If already sewn: re-wet and gently stretch back to shape while damp, then air dry'
        ],
        links: { fiber: true }
      },
      {
        symptom: 'Wavy or rippled seams',
        causes: [
          'Seam was stretched while sewing (common with knits and bias cuts)',
          'Too much ease in one piece relative to the other',
          'Stitch length is too short, causing the seam to draw up'
        ],
        fixes: [
          'Ease stitch the longer piece first, then pin to the shorter piece',
          'Use a longer stitch (3.0 mm) and reduce presser foot pressure',
          'Press seams flat, then open — steam and let the fabric cool before moving',
          'For knits: use differential feed on a serger, or ease by hand'
        ],
        links: { technique: 'seams' }
      },
      {
        symptom: 'Hem is uneven or drooping',
        causes: [
          'Didn\'t let bias-cut garment hang before hemming',
          'Hem technique is too heavy for the fabric weight',
          'Measurement was taken on a flat surface instead of while wearing'
        ],
        fixes: [
          'Mark hemline while wearing the garment, using a hem gauge or a helper',
          'For bias-cut pieces: hang for 24–48 hours, then re-mark and trim',
          'Use a lighter hem finish for lighter fabrics — rolled hem, baby hem, or blind hem',
          'For circle skirts: trim the hem in multiple passes, letting it hang between each'
        ],
        links: { technique: 'seams' }
      }
    ]
  },
  pressing: {
    label: 'Pressing & Finishing',
    icon: '♨️',
    problems: [
      {
        symptom: 'Iron leaving shiny marks or scorch marks',
        causes: [
          'Iron temperature is too high for the fabric',
          'Pressing directly on the right side without a press cloth',
          'Steam setting is wrong (too much steam on synthetics, not enough on linen)'
        ],
        fixes: [
          'Always test iron temperature on a scrap first',
          'Use a press cloth (muslin or organza) on the right side of fabric',
          'Silk and wool: use a lower heat setting with steam from a distance',
          'For scorch marks on white fabric: apply diluted hydrogen peroxide, rinse, re-press',
          'Velvet and corduroy: press from the wrong side on a towel to avoid crushing pile'
        ],
        links: { fiber: true }
      },
      {
        symptom: 'Seams won\'t press flat',
        causes: [
          'Pressing over pins (creates bumps that set into the fabric)',
          'Not enough heat or steam for the fiber type',
          'Seam allowance is too bulky (too many layers)'
        ],
        fixes: [
          'Remove all pins before pressing',
          'Press seams open over a seam roll or sleeve board',
          'Grade seam allowances — trim each layer to a different width to reduce bulk',
          'Use a clapper (wooden pressing block) to flatten stubborn seams',
          'For cotton and linen: use high heat with plenty of steam; for wool: moderate heat with steam and a press cloth'
        ],
        links: { fiber: true, technique: 'seams' }
      }
    ]
  }
};


window.NFG_DATA.tools = {
  NEEDLE_DATA: NEEDLE_DATA,
  TECHNIQUE_DATA: TECHNIQUE_DATA,
  SEAM_FINISHES: SEAM_FINISHES,
  INTERFACING_TYPES: INTERFACING_TYPES,
  FIBER_INTERFACING_RECS: FIBER_INTERFACING_RECS,
  GLOSSARY_DATA: GLOSSARY_DATA,
  WEAVE_DATA: WEAVE_DATA,
  TROUBLESHOOT_DATA: TROUBLESHOOT_DATA
};
})();
