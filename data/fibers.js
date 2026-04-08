// [MIG-001] Fiber reference data
// Register on NFG_DATA for async loading
(function() {

const FIBERS = {
  cotton: {
    name: "Cotton", botanical: "Gossypium spp.",
    accent: "#4A9B5E", bg: "#ECF6EE",
    fiberType: "cellulose", // cellulose | protein | bast | regenerated
    intro: "A staple-length cellulose fiber harvested from the cotton boll. Valued for its breathability, absorbency, and ease of care. Takes dye beautifully and softens with every wash.",
    weightRange: { min: 60, max: 400, unit: "GSM", display: "60–400 GSM (2–12 oz/yd²)" },
    season: "all-season",
    priceTier: "budget", // budget | moderate | luxury
    care: {
      washTemp: "Machine wash warm or hot (40–60°C)",
      drying: "Tumble dry medium; remove promptly to reduce wrinkles",
      ironing: "High heat with steam; cotton presses crisply",
      storage: "Fold or hang; no special requirements",
      preTreatment: "Pre-wash to account for 3–5% shrinkage",
      shrinkagePercent: "3–5%",
      specialNotes: "Whites can be bleached with chlorine; colors with oxygen bleach only"
    },
    relatedFibers: ["linen", "hemp", "bamboo"],
    properties: {
      breathability: { value: 90, label: "High", interp: "Air moves freely; stays cool in heat" },
      absorbency: { value: 85, label: "High", interp: "Pulls moisture from skin quickly" },
      drape: { value: 55, label: "Medium", interp: "Holds shape more than it flows" },
      wrinkleResistance: { value: 30, label: "Low", interp: "Wrinkles easily; needs pressing" },
      durability: { value: 75, label: "Good", interp: "Withstands regular machine washing" },
      shrinkage: { value: 65, label: "Moderate", interp: "Expect 3–5% unless pre-washed" },
      heatTolerance: { value: 90, label: "Excellent", interp: "Safe to iron on high heat" },
      stretch: { value: 15, label: "Minimal", interp: "No give; cut for ease of movement" },
      pillingResistance: { value: 65, label: "Moderate", interp: "Some pilling at friction points; tighter weaves pill less" },
      colorfastness: { value: 75, label: "Good", interp: "Takes dye well; wash darks separately at first" },
      structure: { value: 55, label: "Medium", interp: "Varies widely by weave — canvas is rigid, voile is soft" },
      washability: { value: 85, label: "High", interp: "Machine wash warm or hot; easy-care fiber" },
      softness: { value: 60, label: "Moderate", interp: "Comfortable against skin; softens with washing" }
    },
    sewingNotes: [
      "Pre-wash to account for 3–5% shrinkage before cutting",
      "Use universal or sharp needles, size 70/10 to 90/14 depending on weight",
      "Cotton thread (50 wt) for an all-cotton project; polyester for durability",
      "Presses crisply with steam — ideal for structured garments and quilting"
    ],
    needle: { type: "Universal or Sharp", sizeRange: "70/10–90/14" },
    thread: { weight: "50 wt", material: "Cotton or polyester" },
    varieties: [
      { name: "Quilting Cotton", weight: "Light–Medium", gsm: "110–150", desc: "Tightly woven plain weave, consistent hand. The workhorse of quilting and crafting. Typically 44–45″ wide.",
        props: { breathability: 85, absorbency: 85, drape: 40, wrinkleResistance: 32, durability: 80, shrinkage: 65, heatTolerance: 92, stretch: 5, pillingResistance: 72, colorfastness: 78, structure: 60, washability: 85, softness: 52 }},
      { name: "Voile", weight: "Lightweight", gsm: "60–80", desc: "Soft, semi-sheer plain weave with a lovely drape. Beautiful for blouses, curtains, and gathered garments.",
        props: { breathability: 95, absorbency: 80, drape: 82, wrinkleResistance: 22, durability: 50, shrinkage: 60, heatTolerance: 88, stretch: 10, pillingResistance: 55, colorfastness: 70, structure: 18, washability: 85, softness: 69 }},
      { name: "Lawn", weight: "Lightweight", gsm: "70–100", desc: "Fine, high-thread-count plain weave with a crisp, smooth hand. Named after Laon, France. Ideal for summer shirts and dresses.",
        props: { breathability: 92, absorbency: 82, drape: 70, wrinkleResistance: 25, durability: 58, shrinkage: 62, heatTolerance: 90, stretch: 8, pillingResistance: 68, colorfastness: 75, structure: 30, washability: 85, softness: 64 }},
      { name: "Poplin", weight: "Medium", gsm: "130–180", desc: "Dense plain weave with a slight rib from heavier weft yarns. Smooth surface, crisp body. Classic shirting fabric.",
        props: { breathability: 82, absorbency: 84, drape: 48, wrinkleResistance: 35, durability: 78, shrinkage: 60, heatTolerance: 90, stretch: 8, pillingResistance: 70, colorfastness: 78, structure: 52, washability: 85, softness: 55 }},
      { name: "Sateen", weight: "Medium", gsm: "140–200", desc: "Satin-weave structure gives a subtle sheen on the face. Softer drape than poplin. Used for dresses and bedding.",
        props: { breathability: 78, absorbency: 80, drape: 72, wrinkleResistance: 38, durability: 68, shrinkage: 58, heatTolerance: 85, stretch: 10, pillingResistance: 58, colorfastness: 72, structure: 28, washability: 85, softness: 65 }},
      { name: "Canvas / Duck", weight: "Heavy", gsm: "280–400", desc: "Sturdy plain or basket weave. Canvas uses two-ply yarns; duck is single-ply. Bags, upholstery, outerwear.",
        props: { breathability: 45, absorbency: 70, drape: 10, wrinkleResistance: 65, durability: 98, shrinkage: 55, heatTolerance: 95, stretch: 5, pillingResistance: 85, colorfastness: 80, structure: 90, washability: 85, softness: 40 }},
      { name: "Chambray", weight: "Light–Medium", gsm: "100–140", desc: "Plain weave with a colored warp and white weft, creating a soft heathered look. Often mistaken for denim but much lighter.",
        props: { breathability: 88, absorbency: 82, drape: 55, wrinkleResistance: 28, durability: 72, shrinkage: 62, heatTolerance: 90, stretch: 12, pillingResistance: 62, colorfastness: 72, structure: 45, washability: 85, softness: 58 }},
      { name: "Denim", weight: "Medium–Heavy", gsm: "200–400", desc: "Twill weave, traditionally indigo warp with white weft. Measured in oz/yd². Rugged, fades characterfully over time.",
        props: { breathability: 55, absorbency: 75, drape: 22, wrinkleResistance: 60, durability: 95, shrinkage: 70, heatTolerance: 92, stretch: 12, pillingResistance: 80, colorfastness: 45, structure: 78, washability: 85, softness: 45 }},
      { name: "Jersey Knit", weight: "Medium", gsm: "150–220", desc: "Single-knit interloop structure. Stretchy, soft, rolls at edges. T-shirts and loungewear.",
        props: { breathability: 90, absorbency: 82, drape: 75, wrinkleResistance: 55, durability: 60, shrinkage: 68, heatTolerance: 80, stretch: 65, pillingResistance: 48, colorfastness: 72, structure: 25, washability: 85, softness: 66 },
        isKnit: true }
    ],
    weaves: [
      { name: "Plain (Tabby)", structure: "1/1 — each weft passes over one warp, under one", character: "Balanced, stable, smooth. Most quilting cotton and lawn." },
      { name: "Twill", structure: "2/1 or 3/1 — diagonal pattern created by staggered floats", character: "Stronger, more pliable, slight stretch on the bias. Denim, chino, gabardine." },
      { name: "Satin / Sateen", structure: "4/1 or greater — long floats on the face", character: "Smooth, lustrous surface. Less durable to abrasion. Cotton sateen sheets and dress fabrics." },
      { name: "Basket", structure: "2/2 — pairs of yarns interlace together", character: "Textured, looser than plain weave. Oxford cloth, some canvas." },
      { name: "Dobby", structure: "Small geometric patterns woven on a dobby loom", character: "Subtle texture — dots, diamonds, checks. Swiss dot and piqué." },
      { name: "Jersey Knit", structure: "Single-knit interloop structure (not woven)", character: "Stretchy, soft, rolls at edges. Cotton jersey for T-shirts and loungewear." }
    ],
    commercialNames: ["Muslin", "Calico", "Percale", "Broadcloth", "Oxford cloth", "Seersucker", "Corduroy", "Velveteen", "Terry cloth", "Batiste", "Piqué", "Chintz", "Organdy", "Cambric", "Ticking", "Lawn", "Voile", "Poplin", "Sateen", "Chambray", "Denim", "Canvas", "Duck cloth", "Damask", "Dotted Swiss", "Gauze", "Flannel"],
    tags: ["beginner-friendly", "washable", "affordable", "warm-weather", "versatile"]
  },

  linen: {
    name: "Linen", botanical: "Linum usitatissimum",
    accent: "#C4943A", bg: "#F8F2E4",
    fiberType: "bast",
    intro: "Bast fiber extracted from the stem of the flax plant. One of the oldest textiles, prized for its coolness, natural luster, and characteristic rumple. Stronger wet than dry.",
    weightRange: { min: 60, max: 400, unit: "GSM", display: "60–400 GSM (2–12 oz/yd²)" },
    season: "warm-weather",
    priceTier: "moderate",
    care: {
      washTemp: "Machine wash warm (40°C); hot OK for plain undyed",
      drying: "Line dry preferred; low tumble dry OK but increases wrinkling",
      ironing: "High heat with steam while slightly damp for best results",
      storage: "Roll rather than fold to prevent permanent creases",
      preTreatment: "Pre-wash twice — can shrink up to 10% on first wash",
      shrinkagePercent: "5–10%",
      specialNotes: "Softens dramatically with each wash; new linen is much stiffer than broken-in"
    },
    relatedFibers: ["cotton", "hemp", "ramie"],
    properties: {
      breathability: { value: 95, label: "Excellent", interp: "The coolest natural fiber in heat" },
      absorbency: { value: 92, label: "Very High", interp: "Absorbs 20% of its weight before feeling damp" },
      drape: { value: 50, label: "Stiff → Soft", interp: "Starts rigid; softens with every wash" },
      wrinkleResistance: { value: 12, label: "Very Low", interp: "Wrinkles are part of linen's character" },
      durability: { value: 90, label: "Excellent", interp: "Gets stronger when wet; lasts decades" },
      shrinkage: { value: 55, label: "Low–Moderate", interp: "Shrinks 5–10%; pre-wash twice before cutting" },
      heatTolerance: { value: 95, label: "Excellent", interp: "Can withstand the highest iron settings" },
      stretch: { value: 8, label: "Almost None", interp: "No give; build ease into your pattern" },
      pillingResistance: { value: 80, label: "High", interp: "Smooth, long fibers resist pilling well" },
      colorfastness: { value: 70, label: "Good", interp: "Natural colors deepen with age; dyed linens may fade in sun" },
      structure: { value: 65, label: "Moderate–High", interp: "Naturally crisp; softens with washing but retains body" },
      washability: { value: 80, label: "High", interp: "Machine wash warm; gets better with every wash" },
      softness: { value: 40, label: "Low–Moderate", interp: "Starts stiff; breaks in to a soft, lived-in hand over time" }
    },
    sewingNotes: [
      "Pre-wash twice — linen can shrink up to 10% on first wash",
      "Use sharp (Microtex) needles to avoid pushing apart the yarns",
      "French seams and flat-felled seams suit linen's tendency to fray",
      "Softens dramatically with washing; new linen is much stiffer than broken-in linen"
    ],
    needle: { type: "Sharp / Microtex", sizeRange: "70/10–90/14" },
    thread: { weight: "50 wt", material: "Polyester or cotton" },
    varieties: [
      { name: "Handkerchief Linen", weight: "Very Light", gsm: "60–100", desc: "Sheer, delicate, with a crisp hand. Used for heirloom sewing, blouses, and fine handkerchiefs. Around 2–3 oz/yd².",
        props: { breathability: 98, absorbency: 88, drape: 68, wrinkleResistance: 8, durability: 65, shrinkage: 45, heatTolerance: 95, stretch: 5, pillingResistance: 75, colorfastness: 65, structure: 32, washability: 80, softness: 51 }},
      { name: "Dress-Weight Linen", weight: "Light–Medium", gsm: "130–200", desc: "The most versatile weight. Suitable for shirts, dresses, trousers, and skirts. Typically 4–6 oz/yd².",
        props: { breathability: 95, absorbency: 92, drape: 55, wrinkleResistance: 12, durability: 85, shrinkage: 50, heatTolerance: 95, stretch: 6, pillingResistance: 82, colorfastness: 72, structure: 45, washability: 80, softness: 46 }},
      { name: "Mid-Weight / Suiting Linen", weight: "Medium", gsm: "200–270", desc: "Substantial body for jackets, structured dresses, and trousers. Often 7–8 oz/yd². Holds a press well.",
        props: { breathability: 88, absorbency: 90, drape: 38, wrinkleResistance: 18, durability: 92, shrinkage: 52, heatTolerance: 95, stretch: 5, pillingResistance: 85, colorfastness: 72, structure: 62, washability: 80, softness: 39 }},
      { name: "Heavy / Upholstery Linen", weight: "Heavy", gsm: "300–400", desc: "Dense, sturdy, 10+ oz/yd². Used for home décor, bags, and outerwear. Often has a slubby texture.",
        props: { breathability: 75, absorbency: 85, drape: 18, wrinkleResistance: 25, durability: 98, shrinkage: 55, heatTolerance: 95, stretch: 4, pillingResistance: 88, colorfastness: 75, structure: 82, washability: 80, softness: 31 }},
      { name: "Linen-Cotton Blend", weight: "Varies", gsm: "120–250", desc: "Combines linen's breathability with cotton's softness and reduced wrinkling. Easier to sew than pure linen.",
        props: { breathability: 90, absorbency: 88, drape: 52, wrinkleResistance: 22, durability: 82, shrinkage: 60, heatTolerance: 92, stretch: 10, pillingResistance: 70, colorfastness: 72, structure: 48, washability: 80, softness: 45 }},
      { name: "Belgian / Irish Linen", weight: "Medium–Heavy", gsm: "200–350", desc: "Renowned for quality. Belgian linen (Libeco, etc.) and Irish linen have exceptionally long, fine flax fibers.",
        props: { breathability: 95, absorbency: 92, drape: 50, wrinkleResistance: 12, durability: 90, shrinkage: 55, heatTolerance: 95, stretch: 8, pillingResistance: 85, colorfastness: 70, structure: 50, washability: 80, softness: 44 }},
      { name: "Gauze", weight: "Very Light", gsm: "40–80", desc: "Loosely woven, extremely airy. Summer scarves, curtains, layering.",
        props: { breathability: 100, absorbency: 80, drape: 78, wrinkleResistance: 5, durability: 40, shrinkage: 35, heatTolerance: 92, stretch: 10, pillingResistance: 60, colorfastness: 58, structure: 22, washability: 80, softness: 55 }}
    ],
    weaves: [
      { name: "Plain Weave", structure: "1/1 — standard over-under interlacement", character: "Most common linen construction. Shows natural slubs and irregularities beautifully." },
      { name: "Twill", structure: "2/1 or 3/1 diagonal", character: "Softer hand, more drape than plain weave linen. Less common but excellent for trousers." },
      { name: "Damask", structure: "Reversible pattern from contrasting satin/sateen areas", character: "Traditional table linen. Pattern is woven in, not printed — visible as matte vs. sheen areas." },
      { name: "Huckaback", structure: "Small float pattern creating raised texture", character: "Very absorbent. Classic toweling weave. The floats create tiny pockets that hold moisture." },
      { name: "Gauze / Open Weave", structure: "Loosely woven plain weave with visible spaces", character: "Extremely airy and breathable. Used for summer scarves, curtains, and layering pieces." }
    ],
    commercialNames: ["Handkerchief linen", "Butcher's linen", "Irish linen", "Belgian linen", "Linen scrim", "Cambric", "Damask"],
    tags: ["washable", "warm-weather", "sustainable", "ages-beautifully"]
  },

  silk: {
    name: "Silk", botanical: "Bombyx mori (cultivated) · Antheraea spp. (wild)",
    accent: "#9B45A8", bg: "#F4ECF6",
    fiberType: "protein",
    intro: "A continuous-filament protein fiber produced by silkworms. The strongest natural fiber by weight, with an unmatched combination of luster, drape, and temperature regulation. Absorbs dye in extraordinarily vivid tones.",
    weightRange: { min: 15, max: 200, unit: "GSM", display: "15–200 GSM (measured in momme: 5–30 mm)" },
    season: "all-season",
    priceTier: "luxury",
    care: {
      washTemp: "Hand wash cold (30°C) or dry clean; some silks are machine-washable on delicate",
      drying: "Lay flat or hang to dry; never tumble dry",
      ironing: "Low heat with press cloth; water spots permanently",
      storage: "Store in breathable fabric bags; avoid plastic (traps moisture)",
      preTreatment: "Test-wash a swatch — some silks change hand dramatically when washed",
      shrinkagePercent: "2–5%",
      specialNotes: "Water and perspiration can leave permanent marks; treat stains immediately"
    },
    relatedFibers: ["cupro", "wool", "mohair"],
    properties: {
      breathability: { value: 80, label: "High", interp: "Regulates temperature in both heat and cold" },
      absorbency: { value: 55, label: "Moderate", interp: "Absorbs moisture without feeling clammy" },
      drape: { value: 95, label: "Exceptional", interp: "Flows and clings to the body beautifully" },
      wrinkleResistance: { value: 55, label: "Moderate", interp: "Creases fall out with hanging" },
      durability: { value: 50, label: "Moderate", interp: "Strong but weakened by sun and abrasion" },
      shrinkage: { value: 50, label: "Moderate", interp: "Shrinks 5–8% if washed; minimal if dry cleaned" },
      heatTolerance: { value: 35, label: "Low", interp: "Burns easily; always use a press cloth" },
      stretch: { value: 20, label: "Slight", interp: "Some natural give, especially on the bias" },
      pillingResistance: { value: 55, label: "Moderate", interp: "Can pill at friction points; noil and raw silk pill more" },
      colorfastness: { value: 45, label: "Low–Mod.", interp: "Colors fade in sunlight; perspiration can discolor" },
      structure: { value: 20, label: "Low", interp: "Fluid and drapey; needs underlining for structured garments" },
      washability: { value: 25, label: "Low", interp: "Hand wash or dry clean; water can spot permanently" },
      softness: { value: 90, label: "Very High", interp: "Luxuriously smooth hand; unmatched against skin" }
    },
    sewingNotes: [
      "Use Microtex/sharp needles (60/8 or 70/10) — a dull needle will snag and pull",
      "Pin only in the seam allowance; pin holes can be permanent",
      "Cut with sharp rotary cutter on tissue paper for stability; silk shifts",
      "Press on low heat with a press cloth — water can spot silk permanently",
      "Silk thread or fine polyester (100 wt) for the most invisible seams"
    ],
    needle: { type: "Microtex / Sharp", sizeRange: "60/8–70/10" },
    thread: { weight: "100 wt", material: "Silk or fine polyester" },
    varieties: [
      { name: "Charmeuse", weight: "Lightweight", gsm: "40–80", desc: "Satin weave with a luminous face and matte back. Fluid, clingy drape. The classic \"silky\" fabric for bias-cut garments.",
        props: { breathability: 78, absorbency: 50, drape: 98, wrinkleResistance: 48, durability: 40, shrinkage: 38, heatTolerance: 30, stretch: 22, pillingResistance: 60, colorfastness: 42, structure: 5, washability: 25, softness: 93 }},
      { name: "Habotai (China Silk)", weight: "Very Light", gsm: "20–50", desc: "Simple plain weave, soft and smooth. Common lining fabric. Also used for scarves and painting. Measured in momme (mm): 5–12 mm.",
        props: { breathability: 85, absorbency: 52, drape: 88, wrinkleResistance: 40, durability: 35, shrinkage: 35, heatTolerance: 32, stretch: 15, pillingResistance: 55, colorfastness: 40, structure: 12, washability: 25, softness: 89 }},
      { name: "Dupioni", weight: "Medium", gsm: "80–130", desc: "Woven from two irregular cocoons, producing distinctive slubs and a crisp, slightly crunchy hand. Gorgeous for structured garments.",
        props: { breathability: 72, absorbency: 48, drape: 55, wrinkleResistance: 65, durability: 60, shrinkage: 42, heatTolerance: 38, stretch: 10, pillingResistance: 65, colorfastness: 48, structure: 45, washability: 25, softness: 76 }},
      { name: "Organza", weight: "Very Light", gsm: "15–40", desc: "Sheer, crisp plain weave from highly twisted yarns. Used for overlays, sleeves, and as a pressing cloth. Holds shape well.",
        props: { breathability: 78, absorbency: 35, drape: 40, wrinkleResistance: 72, durability: 45, shrinkage: 30, heatTolerance: 35, stretch: 5, pillingResistance: 70, colorfastness: 45, structure: 60, washability: 25, softness: 70 }},
      { name: "Crêpe de Chine", weight: "Light–Medium", gsm: "50–100", desc: "Highly twisted yarns create a slightly pebbly, matte surface. Beautiful drape without cling. Excellent for blouses and dresses.",
        props: { breathability: 82, absorbency: 55, drape: 90, wrinkleResistance: 60, durability: 52, shrinkage: 40, heatTolerance: 35, stretch: 18, pillingResistance: 52, colorfastness: 48, structure: 10, washability: 25, softness: 90 }},
      { name: "Tussah (Wild Silk)", weight: "Medium", gsm: "80–140", desc: "From wild silkworms. Naturally tan/honey colored with more texture and less luster than cultivated silk. More durable.",
        props: { breathability: 78, absorbency: 58, drape: 72, wrinkleResistance: 50, durability: 65, shrinkage: 45, heatTolerance: 40, stretch: 15, pillingResistance: 58, colorfastness: 55, structure: 28, washability: 25, softness: 83 }},
      { name: "Noil (Raw Silk)", weight: "Medium", gsm: "100–160", desc: "Made from short fibers left over from combing. Matte, nubby texture similar to cotton flannel. Machine washable. Budget-friendly.",
        props: { breathability: 75, absorbency: 60, drape: 50, wrinkleResistance: 35, durability: 65, shrinkage: 50, heatTolerance: 45, stretch: 12, pillingResistance: 35, colorfastness: 50, structure: 50, washability: 25, softness: 74 }},
      { name: "Shantung", weight: "Medium", gsm: "70–120", desc: "Similar to dupioni but lighter and with finer slubs. Medium sheen. Tailors well for jackets, wedding gowns, and formalwear.",
        props: { breathability: 74, absorbency: 50, drape: 58, wrinkleResistance: 62, durability: 55, shrinkage: 40, heatTolerance: 38, stretch: 12, pillingResistance: 62, colorfastness: 46, structure: 42, washability: 25, softness: 77 }},
      { name: "Taffeta", weight: "Light–Medium", gsm: "60–110", desc: "Crisp plain weave with a papery rustling sound (froufrou). Holds structure for full skirts and formalwear. Creases sharply.",
        props: { breathability: 68, absorbency: 40, drape: 35, wrinkleResistance: 70, durability: 55, shrinkage: 35, heatTolerance: 35, stretch: 5, pillingResistance: 68, colorfastness: 48, structure: 65, washability: 25, softness: 68 }},
      { name: "Mikado", weight: "Medium–Heavy", gsm: "120–200", desc: "A structured satin-faced twill with matte luster and substantial body. The go-to silk for architectural gowns and modern bridal.",
        props: { breathability: 65, absorbency: 45, drape: 42, wrinkleResistance: 72, durability: 62, shrinkage: 38, heatTolerance: 36, stretch: 8, pillingResistance: 70, colorfastness: 50, structure: 58, washability: 25, softness: 71 }}
    ],
    weaves: [
      { name: "Plain Weave", structure: "1/1 — balanced interlacement of filament yarns", character: "Habotai, organza, taffeta. Ranges from sheer to crisp depending on yarn weight and twist." },
      { name: "Satin Weave", structure: "4/1 or 8/1 — long floats on the face", character: "Charmeuse, duchess satin. Maximum luster and smoothness. The float length determines the sheen." },
      { name: "Twill", structure: "2/1 or 2/2 diagonal", character: "Silk twill (used by Hermès for scarves). Heavier, opaque, with a soft hand and good drape." },
      { name: "Crêpe", structure: "Alternating S-twist and Z-twist yarns", character: "The opposing twists pull against each other, creating a pebbly, matte texture with stretch recovery." },
      { name: "Jacquard", structure: "Complex figured patterns woven on a Jacquard loom", character: "Brocade, damask, and matelassé. Intricate patterns are part of the weave, not printed." }
    ],
    commercialNames: ["Charmeuse", "Chiffon", "Taffeta", "Georgette", "Mikado", "Faille", "Habutai", "Shantung", "Pongee", "Crêpe de Chine", "Duchess satin", "Organza", "Dupioni", "Noil", "Tussah", "Damask", "Brocade", "Habotai"],
    tags: ["luxury", "dry-clean", "advanced"]
  },

  wool: {
    name: "Wool", botanical: "Ovis aries & related species",
    accent: "#7A5230", bg: "#F2ECE4",
    fiberType: "protein",
    intro: "A protein fiber shorn from sheep (and goats, camelids, and rabbits for specialty wools). The crimped structure traps air for insulation. Naturally elastic, flame-resistant, and odor-resistant. Felts when agitated in heat and moisture.",
    weightRange: { min: 100, max: 600, unit: "GSM", display: "100–600 GSM (3–18 oz/yd²)" },
    season: "cool-weather",
    priceTier: "moderate",
    care: {
      washTemp: "Hand wash cold (30°C) or dry clean; superwash merino can be machine washed",
      drying: "Lay flat to dry on a towel; reshape while damp. Never tumble dry",
      ironing: "Medium heat with steam through a press cloth; let cool flat to set",
      storage: "Fold with cedar or lavender; moths target protein fibers",
      preTreatment: "Do NOT pre-wash — steam press or have professionally sponged",
      shrinkagePercent: "Felts rather than shrinks; can lose 30–50% of size if agitated wet",
      specialNotes: "Felting is irreversible. Always test wash a swatch if machine-washing"
    },
    relatedFibers: ["cashmere", "alpaca", "mohair"],
    properties: {
      breathability: { value: 75, label: "Good", interp: "Regulates body temp; warm when wet" },
      absorbency: { value: 80, label: "High", interp: "Absorbs 30% of weight without feeling wet" },
      drape: { value: 65, label: "Good", interp: "Flows nicely in lighter weights" },
      wrinkleResistance: { value: 80, label: "Very Good", interp: "Bounces back from creases naturally" },
      durability: { value: 70, label: "Good", interp: "Resilient but can pill at friction points" },
      shrinkage: { value: 50, label: "Low (felting risk)", interp: "Felts irreversibly with heat + agitation; handle with care" },
      heatTolerance: { value: 50, label: "Moderate", interp: "Medium iron; high heat risks scorching" },
      stretch: { value: 45, label: "Moderate", interp: "Natural crimp gives moderate recovery" },
      pillingResistance: { value: 40, label: "Low", interp: "Pills at friction points; finer grades pill more" },
      colorfastness: { value: 70, label: "Good", interp: "Takes dye well; professional dyeing holds color" },
      structure: { value: 55, label: "Medium", interp: "Good body for tailoring; boiled wool is very structured" },
      washability: { value: 30, label: "Low", interp: "Hand wash cold or dry clean; machine washing risks felting" },
      softness: { value: 65, label: "Moderate–High", interp: "Merino is very soft; coarser wools can be scratchy" }
    },
    sewingNotes: [
      "Do NOT pre-wash — steam press or have the fabric professionally sponged",
      "Use universal or ballpoint needles (80/12 to 100/16) depending on weight",
      "Bound or Hong Kong seam finishes prevent raveling on loose weaves",
      "Press with a wool press cloth and steam; let pieces cool flat to set shape",
      "Wool's natural elasticity allows easing fullness around curves"
    ],
    needle: { type: "Universal or Ballpoint", sizeRange: "80/12–100/16" },
    thread: { weight: "50 wt", material: "Polyester or silk" },
    varieties: [
      { name: "Wool Challis", weight: "Lightweight", gsm: "100–150", desc: "Soft plain weave, often printed. Drapes like a liquid. Ideal for flowing dresses, skirts, and scarves. Feels almost like silk.",
        props: { breathability: 80, absorbency: 78, drape: 85, wrinkleResistance: 68, durability: 50, shrinkage: 78, heatTolerance: 48, stretch: 35, pillingResistance: 35, colorfastness: 68, structure: 15, washability: 30, softness: 73 }},
      { name: "Wool Crepe", weight: "Light–Medium", gsm: "150–220", desc: "Twisted yarns create a matte, pebbly surface. Drapes beautifully with no shine. A staple for tailored dresses and separates.",
        props: { breathability: 78, absorbency: 76, drape: 80, wrinkleResistance: 72, durability: 58, shrinkage: 75, heatTolerance: 48, stretch: 40, pillingResistance: 42, colorfastness: 72, structure: 20, washability: 30, softness: 71 }},
      { name: "Gabardine", weight: "Medium", gsm: "220–300", desc: "Tightly woven twill with a smooth face and clear diagonal rib. Durable, wrinkle-resistant. Classic for trousers and suits.",
        props: { breathability: 65, absorbency: 70, drape: 55, wrinkleResistance: 88, durability: 85, shrinkage: 70, heatTolerance: 55, stretch: 25, pillingResistance: 55, colorfastness: 75, structure: 45, washability: 30, softness: 61 }},
      { name: "Flannel", weight: "Medium", gsm: "180–280", desc: "Brushed or napped for softness. Can be plain or twill weave. Warm without bulk. Shirts, pajamas, and casual suiting.",
        props: { breathability: 72, absorbency: 82, drape: 60, wrinkleResistance: 70, durability: 65, shrinkage: 45, heatTolerance: 50, stretch: 40, pillingResistance: 30, colorfastness: 68, structure: 40, washability: 30, softness: 63 }},
      { name: "Melton", weight: "Heavy", gsm: "400–600", desc: "Heavily fulled (felted) after weaving, obscuring the weave structure. Wind-resistant and dense. Used for coats and blankets.",
        props: { breathability: 50, absorbency: 78, drape: 25, wrinkleResistance: 92, durability: 92, shrinkage: 65, heatTolerance: 55, stretch: 15, pillingResistance: 65, colorfastness: 78, structure: 75, washability: 30, softness: 49 }},
      { name: "Boiled Wool", weight: "Medium–Heavy", gsm: "300–450", desc: "Knit fabric that's been felted. Doesn't fray when cut — seams can be left raw. Jackets, vests, and accessories.",
        props: { breathability: 55, absorbency: 85, drape: 25, wrinkleResistance: 92, durability: 88, shrinkage: 85, heatTolerance: 50, stretch: 45, pillingResistance: 60, colorfastness: 75, structure: 75, washability: 30, softness: 49 },
        isKnit: true },
      { name: "Merino", weight: "Varies", gsm: "120–300", desc: "Superfine fibers (under 24 microns) from Merino sheep. Soft enough for next-to-skin wear. The gold standard for base layers.",
        props: { breathability: 85, absorbency: 78, drape: 72, wrinkleResistance: 75, durability: 55, shrinkage: 40, heatTolerance: 45, stretch: 55, pillingResistance: 32, colorfastness: 70, structure: 28, washability: 30, softness: 68 }},
      { name: "Merino Jersey", weight: "Light–Medium", gsm: "140–200", desc: "Fine wool knit. Thermoregulating, next-to-skin soft. Base layers and activewear.",
        props: { breathability: 85, absorbency: 78, drape: 72, wrinkleResistance: 75, durability: 55, shrinkage: 45, heatTolerance: 45, stretch: 80, pillingResistance: 30, colorfastness: 70, structure: 28, washability: 30, softness: 68 },
        isKnit: true },
      { name: "Tweed", weight: "Heavy", gsm: "280–450", desc: "Rough, textured weave in heathered colors. Jackets, coats, heritage tailoring.",
        props: { breathability: 60, absorbency: 75, drape: 30, wrinkleResistance: 90, durability: 92, shrinkage: 55, heatTolerance: 55, stretch: 20, pillingResistance: 50, colorfastness: 75, structure: 70, washability: 30, softness: 51 }},
      { name: "Cashmere", weight: "Light–Medium", gsm: "100–200", desc: "Downy undercoat of the Cashmere goat. Exceptionally soft and warm. Delicate — pills easily. Luxury knits and scarves.",
        props: { breathability: 75, absorbency: 55, drape: 78, wrinkleResistance: 65, durability: 30, shrinkage: 40, heatTolerance: 40, stretch: 30, pillingResistance: 22, colorfastness: 65, structure: 22, washability: 30, softness: 70 }},
      { name: "Tropical Wool", weight: "Lightweight", gsm: "130–200", desc: "Open-weave worsted in high-twist yarns. Breathable enough for warm climates. Wrinkle-resistant and crisp. Year-round suiting.",
        props: { breathability: 82, absorbency: 68, drape: 65, wrinkleResistance: 85, durability: 70, shrinkage: 65, heatTolerance: 52, stretch: 18, pillingResistance: 52, colorfastness: 74, structure: 35, washability: 30, softness: 65 }}
    ],
    weaves: [
      { name: "Plain Weave", structure: "1/1 balanced interlacement", character: "Wool challis, homespun. Open, lightweight woolens with a soft hand." },
      { name: "Twill", structure: "2/2 or 3/1 diagonal", character: "Gabardine, serge, cavalry twill. Durable, with a smooth face showing the diagonal line." },
      { name: "Herringbone", structure: "Twill reversal — the diagonal alternates direction", character: "Produces a zigzag \"V\" pattern. Classic suiting and coating. More visual interest than plain twill." },
      { name: "Houndstooth", structure: "2/2 twill with alternating 4-thread color groups", character: "Distinctive jagged check pattern. Both a weave structure and a visual pattern. Suiting staple." },
      { name: "Fulled / Felted", structure: "Weave structure obscured by controlled shrinkage", character: "Melton, loden, boiled wool. The fibers mat together, creating a dense, wind-resistant cloth." },
      { name: "Knit (Jersey, Rib)", structure: "Interlooped yarns, not interlaced", character: "Merino jersey, wool rib knits. Stretch, recovery, and comfort. Use a ballpoint needle." }
    ],
    commercialNames: ["Tweed", "Serge", "Worsted", "Felt", "Bouclé", "Loden", "Moleskin", "Doeskin", "Cavalry twill", "Tartan", "Hopsack", "Merino", "Gabardine", "Flannel", "Challis", "Melton", "Boiled wool", "Herringbone", "Houndstooth", "Wool crepe"],
    tags: ["cold-weather", "wrinkle-resistant", "dry-clean", "versatile"]
  },

  hemp: {
    name: "Hemp", botanical: "Cannabis sativa",
    accent: "#6E8E2A", bg: "#F0F4E6",
    fiberType: "bast",
    intro: "A bast fiber from the stem of the hemp plant, similar in processing to linen. Exceptionally strong, naturally antimicrobial, and one of the most ecologically sustainable fibers — requires minimal water and no pesticides. Softens significantly with wear and washing.",
    weightRange: { min: 80, max: 500, unit: "GSM", display: "80–500 GSM (2.5–15 oz/yd²)" },
    season: "all-season",
    priceTier: "moderate",
    care: {
      washTemp: "Machine wash warm (40°C); can handle hot water",
      drying: "Tumble dry low or line dry; softens more with each cycle",
      ironing: "High heat with steam, like linen",
      storage: "No special requirements; naturally mildew-resistant",
      preTreatment: "Pre-wash at least once; can shrink 5–8% initially",
      shrinkagePercent: "5–8%",
      specialNotes: "Fabric feels rough at first — transforms with 3–5 washes into a soft, broken-in hand"
    },
    relatedFibers: ["linen", "cotton", "ramie"],
    properties: {
      breathability: { value: 88, label: "Very High", interp: "Excellent airflow; cool in summer" },
      absorbency: { value: 85, label: "High", interp: "Wicks moisture well once broken in" },
      drape: { value: 40, label: "Stiff (softens)", interp: "Rigid new; develops soft drape over time" },
      wrinkleResistance: { value: 18, label: "Low", interp: "Wrinkles like linen; embrace it" },
      durability: { value: 95, label: "Exceptional", interp: "One of the strongest natural fibers" },
      shrinkage: { value: 60, label: "Moderate", interp: "Pre-wash before cutting; settles after 1–2 washes" },
      heatTolerance: { value: 92, label: "Excellent", interp: "Handles the hottest iron settings" },
      stretch: { value: 6, label: "None", interp: "Zero give; build generous ease" },
      pillingResistance: { value: 75, label: "Good", interp: "Long, strong fibers resist pilling well" },
      colorfastness: { value: 65, label: "Moderate", interp: "Limited dye range; natural color holds well" },
      structure: { value: 70, label: "High", interp: "Naturally stiff and sturdy; excellent for bags and structured garments" },
      washability: { value: 75, label: "Good", interp: "Machine washable; gets softer with each wash" },
      softness: { value: 30, label: "Low", interp: "Rough when new; softens significantly with use and washing" }
    },
    sewingNotes: [
      "Pre-wash at least once; can shrink 5–8% initially",
      "Use sharp/Microtex needles — dull needles will struggle with the dense fibers",
      "Expect the fabric to feel rough at first; it transforms with 3–5 washes",
      "Flat-felled seams work well; hemp frays similarly to linen",
      "Press with high heat and steam — hemp can handle it"
    ],
    needle: { type: "Sharp / Microtex", sizeRange: "80/12–100/16" },
    thread: { weight: "50 wt", material: "Polyester" },
    varieties: [
      { name: "Hemp Muslin", weight: "Lightweight", gsm: "80–120", desc: "Fine, soft plain weave. Similar in hand to cotton muslin but with hemp's strength. Good for summer garments and test muslins.",
        props: { breathability: 92, absorbency: 82, drape: 55, wrinkleResistance: 14, durability: 80, shrinkage: 65, heatTolerance: 90, stretch: 8, pillingResistance: 72, colorfastness: 62, structure: 45, washability: 75, softness: 40 }},
      { name: "Hemp Silk", weight: "Light–Medium", gsm: "110–170", desc: "Blended with silk for a softer hand and subtle sheen. Drapes better than pure hemp. Lovely for blouses and flowing dresses.",
        props: { breathability: 85, absorbency: 75, drape: 68, wrinkleResistance: 22, durability: 72, shrinkage: 55, heatTolerance: 82, stretch: 10, pillingResistance: 60, colorfastness: 58, structure: 32, washability: 75, softness: 45 }},
      { name: "Hemp Cotton", weight: "Medium", gsm: "150–250", desc: "The most common blend. Cotton adds softness; hemp adds strength and reduces shrinkage. Feels familiar to cotton sewists.",
        props: { breathability: 88, absorbency: 85, drape: 50, wrinkleResistance: 25, durability: 85, shrinkage: 58, heatTolerance: 90, stretch: 10, pillingResistance: 68, colorfastness: 70, structure: 50, washability: 75, softness: 38 }},
      { name: "Hemp Canvas", weight: "Heavy", gsm: "300–500", desc: "Dense, sturdy plain weave. Historically used for sails and rope. Excellent for bags, workwear, and upholstery.",
        props: { breathability: 70, absorbency: 78, drape: 12, wrinkleResistance: 30, durability: 98, shrinkage: 50, heatTolerance: 95, stretch: 4, pillingResistance: 85, colorfastness: 68, structure: 88, washability: 75, softness: 23 }},
      { name: "Hemp Jersey", weight: "Medium", gsm: "180–250", desc: "Knit hemp, often blended with organic cotton or Lycra. Comfortable for T-shirts and casual wear. Eco-friendly alternative.",
        props: { breathability: 88, absorbency: 82, drape: 65, wrinkleResistance: 30, durability: 68, shrinkage: 62, heatTolerance: 82, stretch: 45, pillingResistance: 55, colorfastness: 62, structure: 35, washability: 75, softness: 44 },
        isKnit: true },
      { name: "Hemp Fleece", weight: "Medium–Heavy", gsm: "280–380", desc: "Knit with a looped or brushed back. Warm, absorbent, and used for sweatshirts, baby fabrics, and cloth diapers.",
        props: { breathability: 72, absorbency: 88, drape: 35, wrinkleResistance: 35, durability: 75, shrinkage: 60, heatTolerance: 78, stretch: 35, pillingResistance: 50, colorfastness: 60, structure: 65, washability: 75, softness: 32 },
        isKnit: true }
    ],
    weaves: [
      { name: "Plain Weave", structure: "1/1 balanced interlacement", character: "The standard for hemp fabric. Shows the natural irregularity of the bast fibers. Becomes supple with washing." },
      { name: "Twill", structure: "2/1 or 3/1 diagonal", character: "Softer and more pliable than plain-weave hemp. Good for pants and heavier garments. Less common." },
      { name: "Canvas (Heavy Plain)", structure: "Tight 1/1 or basket 2/2 with heavy yarns", character: "The original canvas — the word comes from \"cannabis.\" Extremely durable for utilitarian projects." },
      { name: "Knit (Jersey, Fleece)", structure: "Interlooped yarns, usually blended", character: "Hemp fibers lack elasticity, so blending with cotton or elastane is common for knit constructions." }
    ],
    commercialNames: ["Hemp canvas", "Hemp linen", "Hempcel"],
    tags: ["sustainable", "washable", "affordable", "ages-beautifully"]
  },

  bamboo: {
    name: "Bamboo", botanical: "Bambusoideae (various genera)",
    accent: "#2A9E8A", bg: "#E6F5F2",
    fiberType: "regenerated",
    intro: "Regenerated cellulose fiber derived from bamboo pulp. Most commercial bamboo fabric is bamboo viscose/rayon — the pulp is dissolved and extruded into filaments. Mechanically processed bamboo linen exists but is rare. Exceptionally soft with a natural sheen and excellent moisture wicking.",
    weightRange: { min: 100, max: 350, unit: "GSM", display: "100–350 GSM (3–10 oz/yd²)" },
    season: "warm-weather",
    priceTier: "moderate",
    care: {
      washTemp: "Machine wash cold or warm (30–40°C) on gentle cycle",
      drying: "Line dry or tumble dry low; remove promptly",
      ironing: "Medium heat; high heat damages regenerated fibers",
      storage: "No special requirements; naturally antimicrobial",
      preTreatment: "Pre-wash on gentle cycle — bamboo viscose can shrink 5–8%",
      shrinkagePercent: "5–8%",
      specialNotes: "Weakens when wet — avoid wringing. Fabric softener not needed; naturally soft"
    },
    relatedFibers: ["tencel", "viscose", "modal", "cotton"],
    properties: {
      breathability: { value: 88, label: "Very High", interp: "Micro-gaps in fiber wick heat away" },
      absorbency: { value: 90, label: "Very High", interp: "Absorbs 3× more moisture than cotton" },
      drape: { value: 88, label: "Excellent", interp: "Fluid and flowing; skims the body" },
      wrinkleResistance: { value: 35, label: "Low–Mod.", interp: "Wrinkles moderately; less than linen" },
      durability: { value: 45, label: "Moderate", interp: "Weaker than cotton; gentle wash extends life" },
      shrinkage: { value: 55, label: "Moderate", interp: "Pre-wash before cutting on gentle cycle" },
      heatTolerance: { value: 50, label: "Medium", interp: "Medium iron only; no high heat" },
      stretch: { value: 20, label: "Low", interp: "Wovens have minimal stretch; knits give more" },
      pillingResistance: { value: 35, label: "Low", interp: "Pills noticeably with friction; viscose-processed bamboo is prone" },
      colorfastness: { value: 60, label: "Moderate", interp: "Takes dye well but may fade with repeated washing" },
      structure: { value: 30, label: "Low", interp: "Soft and drapey; not suited for structured garments without support" },
      washability: { value: 70, label: "Good", interp: "Machine wash gentle; treat like rayon for best results" },
      softness: { value: 85, label: "Very High", interp: "Silky-smooth hand; excellent for sensitive skin" }
    },
    sewingNotes: [
      "Pre-wash on gentle cycle — bamboo viscose can shrink 5–8%",
      "Use ballpoint or stretch needles (75/11) for knits; sharp for wovens",
      "Fabric is slippery — use pattern weights, not pins, and cut in a single layer",
      "Reduce presser foot pressure to prevent stretching while feeding",
      "Press on medium heat; high heat can damage the regenerated fibers"
    ],
    needle: { type: "Ballpoint (knits) / Sharp (wovens)", sizeRange: "70/10–80/12" },
    thread: { weight: "50 wt", material: "Polyester" },
    varieties: [
      { name: "Bamboo Viscose / Rayon", weight: "Light–Medium", gsm: "100–180", desc: "The most common form. Silky smooth, fluid drape, soft luster. Used for dresses, blouses, and loungewear. Behaves like rayon.",
        props: { breathability: 88, absorbency: 90, drape: 92, wrinkleResistance: 30, durability: 42, shrinkage: 58, heatTolerance: 48, stretch: 12, pillingResistance: 32, colorfastness: 58, structure: 8, washability: 70, softness: 88 }},
      { name: "Bamboo Jersey", weight: "Medium", gsm: "170–250", desc: "Knit bamboo viscose, often blended with cotton or spandex. Incredibly soft for T-shirts, leggings, and underwear.",
        props: { breathability: 90, absorbency: 88, drape: 82, wrinkleResistance: 45, durability: 48, shrinkage: 55, heatTolerance: 48, stretch: 55, pillingResistance: 28, colorfastness: 58, structure: 18, washability: 70, softness: 84 },
        isKnit: true },
      { name: "Bamboo Lyocell", weight: "Light–Medium", gsm: "110–180", desc: "Closed-loop process (like Tencel). More eco-friendly than viscose. Slightly crisper hand, better wet strength.",
        props: { breathability: 86, absorbency: 85, drape: 85, wrinkleResistance: 42, durability: 58, shrinkage: 45, heatTolerance: 55, stretch: 12, pillingResistance: 45, colorfastness: 65, structure: 15, washability: 70, softness: 85 }},
      { name: "Bamboo Linen", weight: "Medium", gsm: "160–240", desc: "Mechanically processed (crushed, combed). Retains the natural bamboo fiber structure. Rare and more expensive. Textured hand.",
        props: { breathability: 82, absorbency: 82, drape: 55, wrinkleResistance: 20, durability: 60, shrinkage: 52, heatTolerance: 52, stretch: 8, pillingResistance: 50, colorfastness: 55, structure: 45, washability: 70, softness: 73 }},
      { name: "Bamboo Fleece", weight: "Medium–Heavy", gsm: "250–350", desc: "Knit with a looped or brushed back. Extremely soft and absorbent. Popular for baby items and cloth diapers.",
        props: { breathability: 78, absorbency: 95, drape: 45, wrinkleResistance: 40, durability: 45, shrinkage: 58, heatTolerance: 45, stretch: 40, pillingResistance: 25, colorfastness: 55, structure: 55, washability: 70, softness: 69 },
        isKnit: true },
      { name: "Bamboo Twill", weight: "Medium", gsm: "180–260", desc: "Woven with a diagonal rib. More body and structure than plain-weave bamboo. Suitable for pants and light jackets.",
        props: { breathability: 82, absorbency: 85, drape: 68, wrinkleResistance: 38, durability: 52, shrinkage: 50, heatTolerance: 52, stretch: 10, pillingResistance: 40, colorfastness: 62, structure: 32, washability: 70, softness: 78 }}
    ],
    weaves: [
      { name: "Plain Weave", structure: "1/1 balanced interlacement of viscose filaments", character: "Smooth, drapey, with a gentle sheen. The standard for bamboo woven fabrics." },
      { name: "Twill", structure: "2/1 or 3/1 diagonal", character: "More body and structure than plain weave. Slightly heavier. Used for pants and structured garments." },
      { name: "Jersey Knit", structure: "Single-knit interloop (viscose or blended yarns)", character: "Stretchy, soft, excellent recovery when blended with spandex. The most popular bamboo construction." },
      { name: "French Terry", structure: "Knit with loops on the back, smooth face", character: "Absorbent, cozy. Used for sweatshirts and athletic wear. The loops add cushion and moisture management." }
    ],
    commercialNames: ["Bamboo viscose", "Bamboo rayon", "Bamboo jersey", "Bamboo fleece"],
    tags: ["beginner-friendly", "washable", "warm-weather", "sustainable"]
  },

  ramie: {
    name: "Ramie", botanical: "Boehmeria nivea",
    accent: "#A0A838", bg: "#F4F5E8",
    fiberType: "bast",
    intro: "A bast fiber from the Chinese nettle plant, cultivated in Asia for thousands of years. Among the strongest and most lustrous natural plant fibers. Holds shape exceptionally well and resists mildew and bacteria. Stiff when new but develops a pleasant hand over time.",
    weightRange: { min: 100, max: 350, unit: "GSM", display: "100–350 GSM (3–10 oz/yd²)" },
    season: "warm-weather",
    priceTier: "moderate",
    care: {
      washTemp: "Machine wash warm (40°C) or dry clean",
      drying: "Line dry or tumble dry low",
      ironing: "High heat with steam; handles ironing well like linen",
      storage: "Roll rather than fold — low elasticity means permanent creases",
      preTreatment: "Pre-wash once — low shrinkage but benefits from pre-treatment",
      shrinkagePercent: "1–3%",
      specialNotes: "Low elasticity means poor recovery from creasing; avoid prolonged folding"
    },
    relatedFibers: ["linen", "hemp", "cotton"],
    properties: {
      breathability: { value: 85, label: "High", interp: "Cool to wear; good airflow" },
      absorbency: { value: 82, label: "High", interp: "Absorbs well but dries quickly" },
      drape: { value: 35, label: "Stiff", interp: "Holds structure; softens slowly over time" },
      wrinkleResistance: { value: 15, label: "Very Low", interp: "Creases deeply and permanently" },
      durability: { value: 92, label: "Excellent", interp: "Among the strongest plant fibers known" },
      shrinkage: { value: 60, label: "Good", interp: "Dimensionally stable; only 1–3% shrinkage" },
      heatTolerance: { value: 90, label: "Excellent", interp: "Withstands high iron heat easily" },
      stretch: { value: 5, label: "None", interp: "No elasticity at all; pattern must fit" },
      pillingResistance: { value: 70, label: "Good", interp: "Smooth, stiff fibers resist pilling" },
      colorfastness: { value: 72, label: "Good", interp: "Takes dye reasonably well; natural luster enhances color" },
      structure: { value: 75, label: "High", interp: "Very stiff fiber; holds shape firmly without support" },
      washability: { value: 70, label: "Good", interp: "Machine washable; wrinkles badly but doesn't degrade" },
      softness: { value: 25, label: "Low", interp: "Stiff and coarse; softens slowly with extensive use" }
    },
    sewingNotes: [
      "Pre-wash once — ramie has low shrinkage but still benefits from pre-treatment",
      "Use sharp/Microtex needles; fibers are dense and resist penetration",
      "Frays readily — finish seams with serging, French seams, or binding",
      "Low elasticity means poor recovery from creasing — avoid folding for storage",
      "Presses beautifully with high heat and steam, similar to linen"
    ],
    needle: { type: "Sharp / Microtex", sizeRange: "80/12–90/14" },
    thread: { weight: "50 wt", material: "Polyester" },
    varieties: [
      { name: "Pure Ramie Cloth", weight: "Medium", gsm: "150–250", desc: "Plain-woven, smooth, with a natural luster. Stiff hand when new. Used for tablecloths, suiting, and structured garments across Asia.",
        props: { breathability: 85, absorbency: 82, drape: 32, wrinkleResistance: 12, durability: 95, shrinkage: 28, heatTolerance: 92, stretch: 4, pillingResistance: 72, colorfastness: 74, structure: 68, washability: 70, softness: 28 }},
      { name: "Ramie-Cotton Blend", weight: "Light–Medium", gsm: "120–200", desc: "Cotton softens the hand while ramie adds strength and reduces shrinkage. More approachable for garment sewing than pure ramie.",
        props: { breathability: 88, absorbency: 84, drape: 48, wrinkleResistance: 22, durability: 82, shrinkage: 35, heatTolerance: 90, stretch: 8, pillingResistance: 65, colorfastness: 72, structure: 52, washability: 70, softness: 34 }},
      { name: "Ramie-Linen Blend", weight: "Medium", gsm: "150–250", desc: "Two bast fibers combined. Similar aesthetic to linen but with added sheen and dimensional stability from the ramie content.",
        props: { breathability: 90, absorbency: 86, drape: 42, wrinkleResistance: 14, durability: 90, shrinkage: 30, heatTolerance: 92, stretch: 5, pillingResistance: 75, colorfastness: 70, structure: 58, washability: 70, softness: 32 }},
      { name: "Ramie Knit", weight: "Light–Medium", gsm: "130–200", desc: "Often blended with cotton or viscose to compensate for ramie's low elasticity. Cool, crisp summer knits.",
        props: { breathability: 82, absorbency: 78, drape: 55, wrinkleResistance: 20, durability: 70, shrinkage: 35, heatTolerance: 85, stretch: 25, pillingResistance: 55, colorfastness: 68, structure: 45, washability: 70, softness: 37 },
        isKnit: true }
    ],
    weaves: [
      { name: "Plain Weave", structure: "1/1 balanced interlacement", character: "Crisp, lustrous, with visible slubs. The standard for ramie cloth. Holds a sharp crease." },
      { name: "Twill", structure: "2/1 or 3/1 diagonal", character: "Slightly softer than plain weave. Less common. Used for pants and suiting blends." },
      { name: "Knit", structure: "Interlooped, usually blended", character: "Ramie alone has very low stretch, so knit constructions always require blending with elastic fibers." }
    ],
    commercialNames: ["Ramie linen", "China grass cloth"],
    tags: ["sustainable", "warm-weather", "ages-beautifully"]
  },

  jute: {
    name: "Jute", botanical: "Corchorus capsularis · Corchorus olitorius",
    accent: "#B87830", bg: "#F7EFE4",
    fiberType: "bast",
    intro: "A long, soft bast fiber from the jute plant, primarily grown in the Bengal delta. Second only to cotton in worldwide production volume. Known as the \"golden fiber\" for its color and cost-effectiveness. Coarser than linen or hemp, it finds its place in home textiles, accessories, and rustic garments.",
    weightRange: { min: 150, max: 500, unit: "GSM", display: "150–500 GSM (4.5–15 oz/yd²)" },
    season: "all-season",
    priceTier: "budget",
    care: {
      washTemp: "Spot clean only; weakens significantly when wet",
      drying: "Air dry; avoid any machine drying",
      ironing: "Medium heat; avoid steam on raw jute",
      storage: "Keep dry — jute is susceptible to mildew in damp conditions",
      preTreatment: "Not typically pre-washed; some light spraying to soften",
      shrinkagePercent: "3–5% (avoid full immersion)",
      specialNotes: "Sheds lint heavily; not suitable for garments against skin. Line garments with softer fabric"
    },
    relatedFibers: ["hemp", "linen", "ramie"],
    properties: {
      breathability: { value: 80, label: "High", interp: "Open weave allows good airflow" },
      absorbency: { value: 75, label: "Good", interp: "Absorbs moisture but weakens when wet" },
      drape: { value: 20, label: "Very Stiff", interp: "Holds shape rigidly; best for structured items" },
      wrinkleResistance: { value: 20, label: "Low", interp: "Creases but the texture hides them" },
      durability: { value: 70, label: "Good (dry)", interp: "Strong dry; degrades with water exposure" },
      shrinkage: { value: 50, label: "Moderate", interp: "Avoid full washing to prevent distortion" },
      heatTolerance: { value: 70, label: "Good", interp: "Handles moderate iron heat" },
      stretch: { value: 8, label: "Very Low", interp: "Barely any give; stiff and structured" },
      pillingResistance: { value: 45, label: "Moderate", interp: "Rough fibers shed and ball at friction points" },
      colorfastness: { value: 50, label: "Moderate", interp: "Difficult to dye evenly; natural golden color is most common" },
      structure: { value: 85, label: "Very High", interp: "Rigid, coarse fiber; excellent for bags and home goods" },
      washability: { value: 50, label: "Moderate", interp: "Spot clean or hand wash; machine washing degrades fiber" },
      softness: { value: 15, label: "Very Low", interp: "Coarse and scratchy; not suitable against skin" }
    },
    sewingNotes: [
      "Use heavy-duty or denim needles (90/14 to 110/18) — jute fibers are thick",
      "Coarse fibers shed lint heavily; clean your machine frequently",
      "Weakens when wet — avoid washing finished projects; spot clean instead",
      "Best used for structured accessories: bags, baskets, placemats, table runners",
      "Can irritate skin — line any garment that contacts the body"
    ],
    needle: { type: "Denim / Heavy-duty", sizeRange: "90/14–110/18" },
    thread: { weight: "40 wt", material: "Polyester (heavy-duty)" },
    varieties: [
      { name: "Burlap / Hessian", weight: "Heavy", gsm: "270–500", desc: "The classic coarse, open-weave jute. Used for sacking, garden fabric, and rustic crafts. Very rough hand.",
        props: { breathability: 85, absorbency: 72, drape: 10, wrinkleResistance: 15, durability: 75, shrinkage: 45, heatTolerance: 68, stretch: 5, pillingResistance: 42, colorfastness: 48, structure: 90, washability: 50, softness: 13 }},
      { name: "Refined Jute Cloth", weight: "Medium", gsm: "180–300", desc: "Finer, more tightly woven jute. Softer hand than burlap. Suitable for bags, upholstery, and decorative textiles.",
        props: { breathability: 78, absorbency: 75, drape: 22, wrinkleResistance: 22, durability: 72, shrinkage: 50, heatTolerance: 72, stretch: 8, pillingResistance: 48, colorfastness: 52, structure: 78, washability: 50, softness: 18 }},
      { name: "Jute-Cotton Blend", weight: "Light–Medium", gsm: "130–220", desc: "Cotton softens the fabric and allows for garment use. Retains jute's textured, natural aesthetic at a softer hand.",
        props: { breathability: 82, absorbency: 78, drape: 35, wrinkleResistance: 25, durability: 68, shrinkage: 55, heatTolerance: 75, stretch: 12, pillingResistance: 52, colorfastness: 58, structure: 65, washability: 50, softness: 23 }},
      { name: "Jute Webbing", weight: "Heavy", gsm: "350–500", desc: "Narrow woven strips used for upholstery support, bag straps, and crafts. Strong, with characteristic stretch under load.",
        props: { breathability: 70, absorbency: 68, drape: 8, wrinkleResistance: 20, durability: 80, shrinkage: 42, heatTolerance: 70, stretch: 10, pillingResistance: 40, colorfastness: 45, structure: 92, washability: 50, softness: 12 }}
    ],
    weaves: [
      { name: "Plain Weave (Burlap)", structure: "1/1 with heavy, irregular yarns", character: "Open, coarse, highly textured. The most common jute construction. Visible gaps between yarns." },
      { name: "Twill", structure: "2/1 or 2/2 diagonal", character: "Tighter, smoother than burlap. Used for refined jute cloth and blended fabrics." },
      { name: "Basket", structure: "2/2 with doubled yarns", character: "Heavy, decorative. Used for placemats, runners, and wall hangings. More surface texture than plain weave." }
    ],
    commercialNames: ["Burlap", "Hessian"],
    tags: ["affordable", "sustainable", "home-decor"]
  },

  alpaca: {
    name: "Alpaca", botanical: "Vicugna pacos (Huacaya & Suri breeds)",
    accent: "#D4785A", bg: "#F9EDE8",
    fiberType: "protein",
    intro: "A luxury protein fiber shorn from the alpaca, native to the South American Andes. Warmer than sheep's wool by weight, with a silky hand and no lanolin — making it naturally hypoallergenic. The hollow core of each fiber provides exceptional thermal insulation without bulk.",
    weightRange: { min: 80, max: 450, unit: "GSM", display: "80–450 GSM (2.5–13 oz/yd²)" },
    season: "cool-weather",
    priceTier: "luxury",
    care: {
      washTemp: "Hand wash cold (30°C) or dry clean",
      drying: "Lay flat to dry; reshape while damp. Never hang — stretches permanently",
      ironing: "Low heat with press cloth; avoid steam on pile fabrics",
      storage: "Fold with cedar or lavender; store flat to prevent stretching",
      preTreatment: "Do not pre-wash — dry clean or steam press before cutting",
      shrinkagePercent: "1–3% (minimal)",
      specialNotes: "Low memory — garments stretch out over time. Stay-tape shoulders and necklines"
    },
    relatedFibers: ["wool", "cashmere", "camel"],
    properties: {
      breathability: { value: 70, label: "Good", interp: "Hollow fibers regulate temperature well" },
      absorbency: { value: 65, label: "Moderate", interp: "Less absorbent than wool; wicks surface moisture" },
      drape: { value: 75, label: "Good", interp: "Flows nicely; can stretch with gravity" },
      wrinkleResistance: { value: 70, label: "Good", interp: "Recovers from creases reasonably well" },
      durability: { value: 75, label: "Good", interp: "Stronger than cashmere; resists pilling better" },
      shrinkage: { value: 55, label: "Moderate", interp: "Doesn't felt like wool; only 1–3% shrinkage" },
      heatTolerance: { value: 40, label: "Low–Mod.", interp: "Low iron; can felt with heat and agitation" },
      stretch: { value: 30, label: "Low", interp: "Stretches out but doesn't spring back" },
      pillingResistance: { value: 50, label: "Moderate", interp: "Less prone than wool; long fibers help" },
      colorfastness: { value: 75, label: "Good", interp: "Takes dye well; natural colors are beautiful" },
      structure: { value: 35, label: "Low–Moderate", interp: "Soft body; stretches out without elastic memory" },
      washability: { value: 20, label: "Low", interp: "Hand wash cold or dry clean; felts with agitation" },
      softness: { value: 85, label: "Very High", interp: "Silky, warm hand; baby alpaca rivals cashmere" }
    },
    sewingNotes: [
      "Do not pre-wash — dry clean or steam press before cutting",
      "Low memory (elasticity) means garments can stretch out — add ease carefully",
      "Use sharp needles for wovens (80/12); ballpoint for knits",
      "Stay-tape shoulder seams and necklines to prevent stretching over time",
      "Press gently with low steam; alpaca can felt under heat and agitation, though less than wool"
    ],
    needle: { type: "Sharp (wovens) / Ballpoint (knits)", sizeRange: "80/12–90/14" },
    thread: { weight: "50 wt", material: "Polyester or silk" },
    varieties: [
      { name: "Huacaya", weight: "Varies", gsm: "120–350", desc: "The more common breed (90% of alpacas). Dense, crimped fleece similar to sheep wool in structure. Spongy, warm, elastic.",
        props: { breathability: 72, absorbency: 65, drape: 65, wrinkleResistance: 72, durability: 72, shrinkage: 38, heatTolerance: 40, stretch: 35, pillingResistance: 48, colorfastness: 72, structure: 35, washability: 20, softness: 77 }},
      { name: "Suri", weight: "Varies", gsm: "100–300", desc: "Lustrous, silky locks that hang in pencil-like ringlets. Less crimp, more drape and sheen. Rarer and more expensive than Huacaya.",
        props: { breathability: 68, absorbency: 62, drape: 82, wrinkleResistance: 65, durability: 68, shrinkage: 35, heatTolerance: 38, stretch: 25, pillingResistance: 55, colorfastness: 78, structure: 18, washability: 20, softness: 84 }},
      { name: "Baby Alpaca", weight: "Light–Medium", gsm: "100–200", desc: "Refers to fiber fineness (under 23 microns), not the animal's age. Incredibly soft. Used for luxury scarves, sweaters, and suiting.",
        props: { breathability: 72, absorbency: 60, drape: 78, wrinkleResistance: 68, durability: 55, shrinkage: 32, heatTolerance: 38, stretch: 28, pillingResistance: 42, colorfastness: 75, structure: 22, washability: 20, softness: 82 }},
      { name: "Royal Alpaca", weight: "Light", gsm: "80–150", desc: "The finest grade (under 19 microns). Rare and premium. Comparable to the finest cashmere. Reserved for high-end accessories.",
        props: { breathability: 70, absorbency: 55, drape: 82, wrinkleResistance: 65, durability: 45, shrinkage: 30, heatTolerance: 35, stretch: 25, pillingResistance: 38, colorfastness: 72, structure: 18, washability: 20, softness: 84 }},
      { name: "Alpaca Blend (with Wool)", weight: "Medium", gsm: "180–300", desc: "Wool adds elasticity and memory that pure alpaca lacks. Common ratio is 80/20 or 50/50. Practical for structured garments.",
        props: { breathability: 70, absorbency: 68, drape: 60, wrinkleResistance: 78, durability: 80, shrinkage: 40, heatTolerance: 45, stretch: 45, pillingResistance: 45, colorfastness: 72, structure: 40, washability: 20, softness: 75 }},
      { name: "Alpaca Bouclé", weight: "Medium–Heavy", gsm: "250–450", desc: "Looped yarn creating a textured, curly surface. Luxurious for coats and jackets. Hides seams well.",
        props: { breathability: 58, absorbency: 62, drape: 42, wrinkleResistance: 80, durability: 78, shrinkage: 35, heatTolerance: 40, stretch: 30, pillingResistance: 52, colorfastness: 75, structure: 58, washability: 20, softness: 68 }}
    ],
    weaves: [
      { name: "Plain Weave", structure: "1/1 balanced interlacement", character: "Lightweight alpaca suiting and scarving. Soft, with visible fiber character and natural luster." },
      { name: "Twill", structure: "2/1 or 2/2 diagonal", character: "Heavier, more structured. Used for coats and tailored garments. Good drape with moderate body." },
      { name: "Knit (Jersey, Rib)", structure: "Interlooped yarns", character: "The most common alpaca construction. Soft, warm, with a tendency to grow lengthwise without elastic blending." },
      { name: "Bouclé / Textured", structure: "Looped or novelty yarn construction", character: "Surface texture from looped or irregular yarns. Coats and outerwear. Disguises imperfections in sewing." }
    ],
    commercialNames: ["Baby alpaca", "Royal alpaca", "Suri alpaca"],
    tags: ["luxury", "cold-weather", "hypoallergenic"]
  },

  mohair: {
    name: "Mohair", botanical: "Capra aegagrus hircus (Angora goat)",
    accent: "#D45878", bg: "#F9E8EE",
    fiberType: "protein",
    intro: "A protein fiber from the Angora goat (not to be confused with Angora rabbit fiber). Known for its brilliant luster, resilience, and ability to take dye in vivid, saturated colors. The smooth fiber surface reflects light, and mohair resists felting far better than sheep's wool.",
    weightRange: { min: 80, max: 400, unit: "GSM", display: "80–400 GSM (2.5–12 oz/yd²)" },
    season: "all-season",
    priceTier: "luxury",
    care: {
      washTemp: "Dry clean preferred; hand wash cold if labeled washable",
      drying: "Lay flat to dry; never hang or tumble dry",
      ironing: "Low heat with press cloth; use a velvet board to preserve pile",
      storage: "Fold with moth deterrent; protein fiber is vulnerable to moths",
      preTreatment: "Do not pre-wash — steam or dry clean only before cutting",
      shrinkagePercent: "1–2% (resists felting)",
      specialNotes: "The hairy surface can obscure seam lines — use chalk or basting"
    },
    relatedFibers: ["wool", "alpaca", "silk"],
    properties: {
      breathability: { value: 70, label: "Good", interp: "Insulates in cold but not stifling" },
      absorbency: { value: 65, label: "Moderate", interp: "Takes up less moisture than wool" },
      drape: { value: 70, label: "Good", interp: "Flows well, especially in lighter weights" },
      wrinkleResistance: { value: 85, label: "Very Good", interp: "Bounces back better than any natural fiber" },
      durability: { value: 82, label: "Very Good", interp: "Resilient; resists crushing and felting" },
      shrinkage: { value: 60, label: "Good", interp: "Smooth fibers resist felting far better than wool" },
      heatTolerance: { value: 45, label: "Low–Mod.", interp: "Low iron; protect the luster" },
      stretch: { value: 40, label: "Moderate", interp: "Some elasticity; less than wool" },
      pillingResistance: { value: 60, label: "Moderate", interp: "Smooth fibers resist pilling; pile varieties shed less" },
      colorfastness: { value: 80, label: "Very Good", interp: "Brilliant luster enhances color; dye holds well" },
      structure: { value: 25, label: "Low", interp: "Fluffy and airy; needs structured companion fabrics for tailoring" },
      washability: { value: 15, label: "Very Low", interp: "Dry clean only; water and agitation cause felting and matting" },
      softness: { value: 80, label: "High", interp: "Kid mohair is silky-soft; adult mohair is slightly coarser" }
    },
    sewingNotes: [
      "Do not pre-wash — steam or dry clean only before cutting",
      "The hairy surface can obscure seam lines — use chalk or temporary basting",
      "Press with a velvet board or thick towel to preserve the pile and luster",
      "Use sharp needles and reduce presser foot pressure for pile fabrics",
      "Grade seams (trim one allowance shorter) to reduce bulk in the fluffy fabric"
    ],
    needle: { type: "Sharp", sizeRange: "80/12–90/14" },
    thread: { weight: "50 wt", material: "Polyester or silk" },
    varieties: [
      { name: "Kid Mohair", weight: "Light", gsm: "80–150", desc: "From the first or second shearing (under 27 microns). The finest and softest grade. Used for luxury knits, scarves, and delicate wovens.",
        props: { breathability: 75, absorbency: 62, drape: 78, wrinkleResistance: 80, durability: 65, shrinkage: 28, heatTolerance: 42, stretch: 50, pillingResistance: 55, colorfastness: 78, structure: 22, washability: 15, softness: 79 }},
      { name: "Adult Mohair", weight: "Medium–Heavy", gsm: "200–400", desc: "Coarser, stronger fibers from mature goats. More luster than kid mohair. Used for upholstery, suiting, and hard-wearing accessories.",
        props: { breathability: 65, absorbency: 65, drape: 55, wrinkleResistance: 88, durability: 90, shrinkage: 25, heatTolerance: 48, stretch: 40, pillingResistance: 68, colorfastness: 82, structure: 45, washability: 15, softness: 70 }},
      { name: "Mohair Bouclé", weight: "Medium", gsm: "180–280", desc: "Looped yarn creating a textured, halo-like surface. Beloved for vintage-style jackets, cardigans, and statement coats.",
        props: { breathability: 68, absorbency: 62, drape: 58, wrinkleResistance: 82, durability: 78, shrinkage: 28, heatTolerance: 42, stretch: 45, pillingResistance: 52, colorfastness: 80, structure: 42, washability: 15, softness: 71 }},
      { name: "Mohair Blend (with Wool)", weight: "Medium", gsm: "180–300", desc: "Wool adds body and elasticity; mohair adds sheen and wrinkle resistance. Classic for men's and women's suiting.",
        props: { breathability: 68, absorbency: 70, drape: 62, wrinkleResistance: 86, durability: 82, shrinkage: 35, heatTolerance: 48, stretch: 50, pillingResistance: 50, colorfastness: 78, structure: 38, washability: 15, softness: 73 }},
      { name: "Brushed Mohair", weight: "Light–Medium", gsm: "100–200", desc: "Knit or woven fabric brushed to raise a soft, fuzzy halo. Creates a cloud-like texture. Used for sweaters and wraps.",
        props: { breathability: 72, absorbency: 60, drape: 72, wrinkleResistance: 78, durability: 55, shrinkage: 30, heatTolerance: 40, stretch: 55, pillingResistance: 42, colorfastness: 75, structure: 28, washability: 15, softness: 77 },
        isKnit: true },
      { name: "Mohair Velvet", weight: "Medium–Heavy", gsm: "280–400", desc: "Cut-pile fabric with a mohair surface. Extremely durable, with a rich, deep luster. Premium upholstery and eveningwear.",
        props: { breathability: 55, absorbency: 58, drape: 65, wrinkleResistance: 85, durability: 88, shrinkage: 22, heatTolerance: 45, stretch: 30, pillingResistance: 72, colorfastness: 85, structure: 35, washability: 15, softness: 74 }}
    ],
    weaves: [
      { name: "Plain Weave", structure: "1/1 balanced interlacement", character: "Crisp, lustrous mohair suiting. The smooth fiber surface gives woven mohair a distinctive sheen." },
      { name: "Twill", structure: "2/1 or 2/2 diagonal", character: "Suiting and coating. More body and warmth than plain weave. Often blended with wool." },
      { name: "Pile (Velvet)", structure: "Base weave with cut loops forming a pile surface", character: "Luxurious, deep-colored pile. More resilient than silk velvet. Upholstery and eveningwear." },
      { name: "Knit (Lace, Stockinette)", structure: "Interlooped yarns, often with brushed finish", character: "The fuzzy halo effect. Kid mohair knits are featherweight and warm. Used for sweaters and shawls." }
    ],
    commercialNames: ["Kid mohair", "Brushed mohair", "Mohair bouclé", "Mohair loop"],
    tags: ["luxury", "cold-weather", "wrinkle-resistant"]
  },

  angora: {
    name: "Angora", botanical: "Oryctolagus cuniculus (Angora rabbit)",
    accent: "#E8A0B8", bg: "#FBF0F4",
    fiberType: "protein",
    intro: "An ultra-fine protein fiber harvested from Angora rabbits. The hollow core of each hair makes it exceptionally warm and lightweight — up to seven times warmer than sheep's wool by weight. Prized for its ethereal softness and halo effect, though the fiber's low elasticity and tendency to shed require careful handling.",
    weightRange: { min: 60, max: 250, unit: "GSM", display: "60–250 GSM (2–7 oz/yd²)" },
    season: "cool-weather",
    priceTier: "luxury",
    care: {
      washTemp: "Hand wash cold (20–30°C) with gentle detergent; never agitate",
      drying: "Lay flat on towel; reshape gently. Never wring, hang, or tumble dry",
      ironing: "Avoid ironing; steam lightly from a distance if needed",
      storage: "Store flat in breathable bag with moth deterrent; never compress",
      preTreatment: "Not applicable — primarily a yarn/knit fiber, not yardage",
      shrinkagePercent: "Can felt easily; avoid any agitation when wet",
      specialNotes: "Freeze finished items briefly to reduce initial shedding. Store flat only — will stretch irreversibly"
    },
    relatedFibers: ["mohair", "alpaca", "wool"],
    properties: {
      breathability: { value: 60, label: "Moderate", interp: "Very warm; can overheat in mild weather" },
      absorbency: { value: 55, label: "Moderate", interp: "Absorbs some moisture but dries slowly" },
      drape: { value: 65, label: "Good (fluffy)", interp: "Lofty and soft; drapes with volume" },
      wrinkleResistance: { value: 50, label: "Moderate", interp: "Fluffy texture disguises creases" },
      durability: { value: 25, label: "Low", interp: "Delicate; pills and sheds with wear" },
      shrinkage: { value: 45, label: "Moderate", interp: "Felts easily; handle with extreme care" },
      heatTolerance: { value: 30, label: "Low", interp: "Never iron directly; steam only" },
      stretch: { value: 15, label: "Very Low", interp: "Stretches out permanently; no recovery" },
      pillingResistance: { value: 20, label: "Very Low", interp: "Pills and sheds heavily; blend to mitigate" },
      colorfastness: { value: 55, label: "Moderate", interp: "Light colors; dye uptake is limited by fiber structure" },
      structure: { value: 15, label: "Very Low", interp: "Extremely fluffy and formless; always blended for garments" },
      washability: { value: 10, label: "Very Low", interp: "Hand wash only with extreme care; felts instantly in machines" },
      softness: { value: 95, label: "Exceptional", interp: "One of the softest fibers in existence; cloud-like hand" }
    },
    sewingNotes: [
      "Almost never used as yardage — primarily a knitting/crocheting fiber blended into yarn",
      "When sewing angora knit fabric, use ballpoint needles and a walking foot",
      "Reduce presser foot tension significantly — the loft crushes easily",
      "Store flat, never on hangers — angora stretches and will not recover",
      "Freeze finished items briefly to reduce initial shedding"
    ],
    needle: { type: "Ballpoint", sizeRange: "70/10–80/12" },
    thread: { weight: "50 wt", material: "Polyester" },
    varieties: [
      { name: "English Angora", weight: "Very Fine", gsm: "60–120", desc: "Dense, cottony fiber from heavily furred rabbits. More guard hairs than French Angora. Commonly used in hand-spun yarns.",
        props: { breathability: 58, absorbency: 55, drape: 62, wrinkleResistance: 48, durability: 28, shrinkage: 48, heatTolerance: 28, stretch: 15, pillingResistance: 18, colorfastness: 52, structure: 38, washability: 10, softness: 82 },
        isKnit: true },
      { name: "French Angora", weight: "Very Fine", gsm: "60–120", desc: "Cleaner fiber with fewer guard hairs. Preferred for commercial yarns. Slightly less lofty but easier to spin and process.",
        props: { breathability: 60, absorbency: 52, drape: 65, wrinkleResistance: 50, durability: 30, shrinkage: 45, heatTolerance: 30, stretch: 15, pillingResistance: 22, colorfastness: 55, structure: 35, washability: 10, softness: 83 },
        isKnit: true },
      { name: "Angora-Wool Blend", weight: "Light–Medium", gsm: "120–220", desc: "The most practical form. Wool adds strength, elasticity, and memory. Common ratios: 20–50% angora. Sweaters, hats, scarves.",
        props: { breathability: 65, absorbency: 62, drape: 60, wrinkleResistance: 62, durability: 45, shrinkage: 50, heatTolerance: 38, stretch: 35, pillingResistance: 28, colorfastness: 60, structure: 40, washability: 10, softness: 81 },
        isKnit: true },
      { name: "Angora-Silk Blend", weight: "Light", gsm: "80–150", desc: "Silk adds strength and subtle sheen. Creates an exceptionally luxurious yarn. Used for high-end accessories and lace knitting.",
        props: { breathability: 62, absorbency: 50, drape: 72, wrinkleResistance: 52, durability: 38, shrinkage: 42, heatTolerance: 32, stretch: 18, pillingResistance: 25, colorfastness: 52, structure: 28, washability: 10, softness: 86 },
        isKnit: true }
    ],
    weaves: [
      { name: "Knit (Stockinette)", structure: "Standard knit interloop, usually blended yarn", character: "The most common use. Creates the signature fuzzy halo. Warm, soft, featherweight." },
      { name: "Knit (Lace)", structure: "Open, decorative eyelet patterns in knit construction", character: "Angora's halo fills in the lace openings beautifully. Shawls, scarves, and delicate wraps." },
      { name: "Woven (Rare)", structure: "Plain weave, typically blended with silk or wool warp", character: "Uncommon due to angora's low strength. When woven, produces an ultra-soft, brushed surface fabric." },
      { name: "Felted", structure: "Fibers matted together through heat, moisture, agitation", character: "Angora felts easily. Creates a dense, warm, non-fraying fabric for hats, mittens, and accessories." }
    ],
    commercialNames: ["Angora jersey", "Angora blend yarn"],
    tags: ["luxury", "cold-weather", "advanced", "hand-knit"]
  },

  // ── REGENERATED FIBERS ──

  tencel: {
    name: "Tencel / Lyocell", botanical: "Eucalyptus-derived cellulose (Lenzing AG)",
    accent: "#2B88B8", bg: "#E6F0F7",
    fiberType: "regenerated",
    intro: "A closed-loop regenerated cellulose fiber spun from dissolved eucalyptus wood pulp. Prized for its silky drape, moisture management, and environmentally responsible production. The solvent is recovered and recycled at 99%+ efficiency.",
    weightRange: { min: 90, max: 300, unit: "GSM", display: "90–300 GSM (3–9 oz/yd²)" },
    season: "all-season",
    priceTier: "moderate",
    care: {
      washTemp: "Machine wash cold or warm (30–40°C), gentle cycle",
      drying: "Line dry or tumble dry low; remove promptly",
      ironing: "Medium heat with steam; irons smoothly",
      storage: "Fold or hang; no special requirements",
      preTreatment: "Pre-wash to remove manufacturing finishes and account for 3–4% shrinkage",
      shrinkagePercent: "3–4%",
      specialNotes: "Develops a soft, slightly peached surface with washing. Avoid chlorine bleach — use oxygen-based."
    },
    relatedFibers: ["bamboo", "viscose", "modal", "cotton"],
    properties: {
      breathability: { value: 85, label: "High", interp: "Moisture-wicking fibrillation creates micro-channels for airflow" },
      absorbency: { value: 80, label: "High", interp: "Absorbs 50% more moisture than cotton; releases it quickly" },
      drape: { value: 88, label: "Excellent", interp: "Fluid, liquid-like fall; one of the best-draping fibers" },
      wrinkleResistance: { value: 55, label: "Moderate", interp: "Wrinkles less than cotton or linen but more than polyester" },
      durability: { value: 70, label: "Good", interp: "Stronger wet than viscose; holds up well to regular wear" },
      shrinkage: { value: 55, label: "Moderate", interp: "More dimensionally stable than viscose; 3–4% shrinkage" },
      heatTolerance: { value: 60, label: "Moderate", interp: "Tolerates medium iron heat; press from the wrong side" },
      stretch: { value: 15, label: "Very Low", interp: "Minimal inherent stretch; drapes rather than stretches" },
      pillingResistance: { value: 55, label: "Moderate", interp: "Can fibrillate, creating a peach-fuzz surface over time" },
      colorfastness: { value: 78, label: "Good", interp: "Excellent dye uptake; colors hold well through washing" },
      structure: { value: 30, label: "Low", interp: "Soft and fluid; drapes like silk without the fuss" },
      washability: { value: 75, label: "Good", interp: "Machine wash gentle; more stable than viscose" },
      softness: { value: 88, label: "Very High", interp: "Buttery-smooth hand; feels like silk against skin" }
    },
    sewingNotes: [
      "Use a sharp / microtex needle (70/10–80/12) — clean penetration prevents snags.",
      "Cut single layer when possible — Tencel shifts easily on itself.",
      "Pin within the seam allowance — pin holes may show on the finished surface.",
      "Use a walking foot for slippery layers to prevent shifting.",
      "French seams or serged edges work well — raw edges can fray."
    ],
    needle: { type: "Sharp / Microtex", sizeRange: "70/10–80/12" },
    thread: { weight: "50 wt polyester or cotton", material: "Polyester" },
    varieties: [
      { name: "Tencel Twill", weight: "Medium", gsm: "180–250", desc: "Dense diagonal weave with a matte, sueded face. Drapes beautifully for pants and shirtdresses. Feels like a softer denim.",
        props: { breathability: 82, absorbency: 78, drape: 85, wrinkleResistance: 58, durability: 72, shrinkage: 38, heatTolerance: 60, stretch: 10, pillingResistance: 58, colorfastness: 80, structure: 15, washability: 75, softness: 87 }},
      { name: "Tencel Sateen", weight: "Light–Medium", gsm: "130–180", desc: "Smooth, slightly lustrous satin weave. Softer than cotton sateen. Excellent for dresses and flowing separates.",
        props: { breathability: 84, absorbency: 80, drape: 90, wrinkleResistance: 52, durability: 65, shrinkage: 40, heatTolerance: 58, stretch: 10, pillingResistance: 52, colorfastness: 78, structure: 10, washability: 75, softness: 89 }},
      { name: "Tencel Jersey", weight: "Medium", gsm: "160–220", desc: "Knit Tencel, often blended with elastane. Silky smooth, cool against skin. Premium T-shirts and loungewear.",
        props: { breathability: 88, absorbency: 82, drape: 80, wrinkleResistance: 58, durability: 62, shrinkage: 42, heatTolerance: 55, stretch: 50, pillingResistance: 48, colorfastness: 75, structure: 20, washability: 75, softness: 85 },
        isKnit: true },
      { name: "Tencel Chambray", weight: "Light–Medium", gsm: "120–160", desc: "Plain weave with heathered color effect. Lighter and softer than cotton chambray. Casual shirts and dresses.",
        props: { breathability: 88, absorbency: 78, drape: 75, wrinkleResistance: 48, durability: 68, shrinkage: 40, heatTolerance: 60, stretch: 10, pillingResistance: 55, colorfastness: 72, structure: 25, washability: 75, softness: 83 }},
      { name: "Tencel-Cotton Blend", weight: "Varies", gsm: "130–250", desc: "Cotton adds structure; Tencel adds drape and softness. Easier to sew than pure Tencel. Widely available.",
        props: { breathability: 86, absorbency: 82, drape: 72, wrinkleResistance: 45, durability: 72, shrinkage: 42, heatTolerance: 62, stretch: 12, pillingResistance: 60, colorfastness: 76, structure: 28, washability: 75, softness: 82 }},
      { name: "Tencel Denim", weight: "Medium–Heavy", gsm: "200–320", desc: "Softer, more drapey alternative to cotton denim. Often blended. Comfortable jeans and jackets.",
        props: { breathability: 75, absorbency: 76, drape: 55, wrinkleResistance: 55, durability: 78, shrinkage: 45, heatTolerance: 62, stretch: 15, pillingResistance: 62, colorfastness: 70, structure: 45, washability: 75, softness: 75 }}
    ],
    weaves: [
      { name: "Twill", structure: "2/1 or 3/1 diagonal", character: "The most popular Tencel weave. Soft hand, matte face, beautiful drape for pants and dresses." },
      { name: "Satin / Sateen", structure: "4/1 float weave", character: "Smooth, lustrous face. Shows the fiber's natural sheen. Lighter weight than twill." },
      { name: "Plain Weave", structure: "1/1 balanced interlacement", character: "Chambray, voile. Simpler structure, less drape than twill but easier to sew." },
      { name: "Jersey Knit", structure: "Single-knit interloop", character: "Smooth, stretchy, cool against skin. Often blended with elastane for recovery." }
    ],
    commercialNames: ["Tencel™", "Lyocell twill", "Tencel denim", "Tencel jersey", "Tencel satin"],
    tags: ["eco-friendly", "drapey", "cool-weather", "warm-weather"]
  },

  viscose: {
    name: "Viscose / Rayon", botanical: "Wood pulp cellulose (various sources)",
    accent: "#C84898", bg: "#F8E8F2",
    fiberType: "regenerated",
    intro: "The original regenerated cellulose fiber, produced since the 1890s. Wood or plant pulp is dissolved in chemicals and extruded into filaments. Beloved for its silk-like drape, rich colors, and affordability — but weaker when wet and prone to shrinkage.",
    weightRange: { min: 70, max: 280, unit: "GSM", display: "70–280 GSM (2–8 oz/yd²)" },
    season: "warm-weather",
    priceTier: "budget",
    care: {
      washTemp: "Hand wash or machine wash cold (30°C), gentle cycle",
      drying: "Lay flat or hang to dry; avoid tumble drying",
      ironing: "Low–medium heat while slightly damp; press from wrong side",
      storage: "Hang structured garments; fold knits",
      preTreatment: "Pre-wash in cold water — shrinkage can be significant (5–8%)",
      shrinkagePercent: "5–8%",
      specialNotes: "Very weak when wet — handle gently during washing. Some viscose is labeled dry-clean only."
    },
    relatedFibers: ["tencel", "modal", "bamboo", "silk"],
    properties: {
      breathability: { value: 78, label: "High", interp: "Naturally breathable; feels cool in warm weather" },
      absorbency: { value: 85, label: "Very High", interp: "Absorbs moisture readily — more than cotton" },
      drape: { value: 92, label: "Excellent", interp: "Fluid, flowing fall; mimics silk at a fraction of the cost" },
      wrinkleResistance: { value: 25, label: "Low", interp: "Wrinkles easily and deeply; steam or press after washing" },
      durability: { value: 40, label: "Low–Moderate", interp: "Loses 40–50% strength when wet; moderate dry strength" },
      shrinkage: { value: 30, label: "Very Low", interp: "Most shrink-prone common fiber (8–10%); always pre-wash" },
      heatTolerance: { value: 50, label: "Moderate", interp: "Medium iron; scorches more easily than cotton" },
      stretch: { value: 10, label: "Very Low", interp: "Minimal stretch; relies entirely on drape for movement" },
      pillingResistance: { value: 35, label: "Low", interp: "Pills with friction; weak fibers break and ball up" },
      colorfastness: { value: 68, label: "Good", interp: "Takes dye beautifully; rich, saturated colors" },
      structure: { value: 25, label: "Low", interp: "Very drapey and fluid; collapses without support" },
      washability: { value: 45, label: "Low–Moderate", interp: "Hand wash or gentle cycle; weakens significantly when wet" },
      softness: { value: 82, label: "High", interp: "Smooth, silky hand; comfortable against skin" }
    },
    sewingNotes: [
      "Pre-wash fabric before cutting — viscose shrinks substantially.",
      "Use a sharp / microtex needle (70/10–80/12) for clean penetration.",
      "Cut in a single layer with weights instead of pins to prevent shifting.",
      "Use a walking foot to manage the slippery surface.",
      "French seams are ideal — raw edges fray readily.",
      "Understitch facings and linings to keep them from rolling to the right side."
    ],
    needle: { type: "Sharp / Microtex", sizeRange: "70/10–80/12" },
    thread: { weight: "50 wt polyester", material: "Polyester" },
    varieties: [
      { name: "Viscose Challis", weight: "Lightweight", gsm: "90–140", desc: "Soft, fluid plain weave, often with printed designs. A staple for wrap dresses, blouses, and flowing skirts.",
        props: { breathability: 82, absorbency: 85, drape: 95, wrinkleResistance: 22, durability: 38, shrinkage: 25, heatTolerance: 48, stretch: 8, pillingResistance: 30, colorfastness: 62, structure: 5, washability: 45, softness: 87 }},
      { name: "Viscose Crepe", weight: "Light–Medium", gsm: "120–180", desc: "Textured, slightly pebbly surface from twisted yarns. Good body with drape. Dresses and separates.",
        props: { breathability: 78, absorbency: 82, drape: 88, wrinkleResistance: 30, durability: 42, shrinkage: 30, heatTolerance: 50, stretch: 10, pillingResistance: 38, colorfastness: 70, structure: 12, washability: 45, softness: 84 }},
      { name: "Viscose Twill", weight: "Medium", gsm: "160–240", desc: "Diagonal weave with more structure than challis. Suitable for pants and structured garments.",
        props: { breathability: 75, absorbency: 82, drape: 78, wrinkleResistance: 32, durability: 48, shrinkage: 32, heatTolerance: 52, stretch: 10, pillingResistance: 40, colorfastness: 72, structure: 22, washability: 45, softness: 80 }},
      { name: "Rayon Jersey", weight: "Medium", gsm: "160–220", desc: "Knit viscose, often blended with spandex. Silky, cool, drapey. T-shirts, wrap tops, and loungewear.",
        props: { breathability: 80, absorbency: 82, drape: 85, wrinkleResistance: 38, durability: 40, shrinkage: 28, heatTolerance: 48, stretch: 48, pillingResistance: 28, colorfastness: 65, structure: 15, washability: 45, softness: 83 },
        isKnit: true },
      { name: "Viscose Satin", weight: "Light–Medium", gsm: "100–160", desc: "Lustrous satin weave that mimics silk charmeuse. Bias-cut garments, linings, and camisoles.",
        props: { breathability: 75, absorbency: 80, drape: 95, wrinkleResistance: 20, durability: 35, shrinkage: 28, heatTolerance: 48, stretch: 8, pillingResistance: 32, colorfastness: 66, structure: 5, washability: 45, softness: 87 }},
      { name: "Bemberg (Cupro Lining)", weight: "Lightweight", gsm: "60–100", desc: "High-quality viscose lining fabric with a silky hand. Breathable, anti-static. The gold standard for garment linings.",
        props: { breathability: 82, absorbency: 78, drape: 90, wrinkleResistance: 30, durability: 45, shrinkage: 40, heatTolerance: 48, stretch: 8, pillingResistance: 42, colorfastness: 68, structure: 10, washability: 45, softness: 85 }}
    ],
    weaves: [
      { name: "Plain Weave (Challis)", structure: "1/1 balanced interlacement", character: "The most common viscose construction. Soft, fluid, excellent print surface." },
      { name: "Twill", structure: "2/1 or 3/1 diagonal", character: "More body and structure. Less common than challis but growing in popularity." },
      { name: "Satin", structure: "4/1 float weave", character: "Lustrous, slippery. Beautiful for bias-cut garments. Requires careful cutting." },
      { name: "Jersey Knit", structure: "Single-knit interloop", character: "Stretchy, drapey, easy to wear. Usually blended with elastane for recovery." }
    ],
    commercialNames: ["Rayon challis", "Rayon crepe", "Rayon jersey", "Bali rayon", "Ecovero™"],
    tags: ["budget-friendly", "drapey", "warm-weather", "printed"]
  },

  modal: {
    name: "Modal", botanical: "Beech wood cellulose (Lenzing MicroModal®)",
    accent: "#6858C8", bg: "#EDEAF8",
    fiberType: "regenerated",
    intro: "A second-generation viscose made from sustainably harvested beech wood. Stronger than standard viscose both wet and dry, with exceptional softness. Used extensively in underwear, loungewear, and knit basics. MicroModal (a branded variant) is even finer.",
    weightRange: { min: 100, max: 250, unit: "GSM", display: "100–250 GSM (3–7 oz/yd²)" },
    season: "all-season",
    priceTier: "moderate",
    care: {
      washTemp: "Machine wash warm (40°C), gentle cycle",
      drying: "Tumble dry low or line dry; less prone to damage than viscose",
      ironing: "Low–medium heat; rarely needed for knits",
      storage: "Fold knits; hang wovens",
      preTreatment: "Pre-wash to remove finishes; shrinkage is minimal (2–3%)",
      shrinkagePercent: "2–3%",
      specialNotes: "Maintains softness through many washes — doesn't pill or stiffen like cotton can."
    },
    relatedFibers: ["viscose", "tencel", "bamboo", "cotton"],
    properties: {
      breathability: { value: 80, label: "High", interp: "Smooth fiber surface wicks moisture away efficiently" },
      absorbency: { value: 82, label: "Very High", interp: "50% more absorbent than cotton; releases moisture into the air" },
      drape: { value: 85, label: "Excellent", interp: "Fluid but with slightly more body than viscose" },
      wrinkleResistance: { value: 50, label: "Moderate", interp: "Wrinkles less than viscose; knit forms resist wrinkles well" },
      durability: { value: 60, label: "Moderate–Good", interp: "Stronger wet and dry than viscose; good abrasion resistance" },
      shrinkage: { value: 50, label: "Moderate", interp: "More stable than viscose; only 2–3% shrinkage" },
      heatTolerance: { value: 55, label: "Moderate", interp: "Medium iron; doesn't scorch as easily as viscose" },
      stretch: { value: 15, label: "Very Low", interp: "Low inherent stretch; knit forms provide some give" },
      pillingResistance: { value: 50, label: "Moderate", interp: "Better than viscose; smooth fiber surface helps" },
      colorfastness: { value: 82, label: "Very Good", interp: "Excellent dye retention; vibrant colors last" },
      structure: { value: 25, label: "Low", interp: "Soft and fluid; similar to viscose but slightly more stable" },
      washability: { value: 80, label: "High", interp: "Machine washable; holds up much better than viscose when wet" },
      softness: { value: 92, label: "Exceptional", interp: "Incredibly soft hand; one of the softest regenerated fibers" }
    },
    sewingNotes: [
      "Behaves much like viscose but is easier to handle due to better wet strength.",
      "Use a ballpoint needle (70/10–80/12) for knit modal; sharp for wovens.",
      "A walking foot helps with slippery knit modal fabrics.",
      "Serge or overlock raw edges — modal frays similarly to viscose.",
      "Pin within the seam allowance on wovens to avoid visible holes."
    ],
    needle: { type: "Ballpoint / Sharp", sizeRange: "70/10–80/12" },
    thread: { weight: "50 wt polyester", material: "Polyester" },
    varieties: [
      { name: "Modal Jersey", weight: "Medium", gsm: "160–220", desc: "The most common form. Silky smooth, cool, and drapey. Used for T-shirts, underwear, sleepwear, and loungewear.",
        props: { breathability: 82, absorbency: 82, drape: 85, wrinkleResistance: 52, durability: 58, shrinkage: 30, heatTolerance: 55, stretch: 40, pillingResistance: 48, colorfastness: 80, structure: 15, washability: 80, softness: 89 },
        isKnit: true },
      { name: "MicroModal", weight: "Light–Medium", gsm: "120–180", desc: "Finer fibers than standard modal. Even softer, more lustrous. Premium underwear and base layers.",
        props: { breathability: 85, absorbency: 85, drape: 88, wrinkleResistance: 55, durability: 55, shrinkage: 28, heatTolerance: 52, stretch: 38, pillingResistance: 45, colorfastness: 84, structure: 12, washability: 80, softness: 90 },
        isKnit: true },
      { name: "Modal Rib Knit", weight: "Medium", gsm: "180–240", desc: "Textured rib construction with more stretch and recovery. Fitted tops, tank tops, and bodysuits.",
        props: { breathability: 80, absorbency: 80, drape: 72, wrinkleResistance: 48, durability: 60, shrinkage: 30, heatTolerance: 55, stretch: 55, pillingResistance: 42, colorfastness: 80, structure: 28, washability: 80, softness: 84 },
        isKnit: true },
      { name: "Modal-Cotton Blend", weight: "Medium", gsm: "150–220", desc: "Cotton adds structure; modal adds softness and drape. Common 50/50 blend for better of both.",
        props: { breathability: 82, absorbency: 84, drape: 75, wrinkleResistance: 42, durability: 65, shrinkage: 35, heatTolerance: 58, stretch: 25, pillingResistance: 55, colorfastness: 78, structure: 25, washability: 80, softness: 85 },
        isKnit: true },
      { name: "Modal French Terry", weight: "Medium–Heavy", gsm: "220–300", desc: "Looped back for warmth and absorbency. Soft sweatshirts and joggers. More refined feel than cotton french terry.",
        props: { breathability: 75, absorbency: 85, drape: 58, wrinkleResistance: 45, durability: 62, shrinkage: 32, heatTolerance: 55, stretch: 42, pillingResistance: 52, colorfastness: 82, structure: 42, washability: 80, softness: 78 },
        isKnit: true }
    ],
    weaves: [
      { name: "Jersey Knit", structure: "Single-knit interloop", character: "The dominant construction. Smooth face, soft, excellent drape. Usually blended with elastane." },
      { name: "Rib Knit", structure: "Alternating face/back loops", character: "More stretch and texture than jersey. Common for fitted garments." },
      { name: "French Terry", structure: "Knit with looped back", character: "Absorbent, warm, comfortable. Used for casual and activewear." }
    ],
    commercialNames: ["MicroModal®", "Modal jersey", "Modal satin"],
    tags: ["soft", "underwear", "loungewear", "eco-friendly"]
  },

  cupro: {
    name: "Cupro", botanical: "Cotton linter cellulose (Bemberg® by Asahi Kasei)",
    accent: "#4878C8", bg: "#E8EEF8",
    fiberType: "regenerated",
    intro: "A regenerated cellulose fiber made from cotton linters (the short fuzz left on cotton seeds after ginning). Drapes like silk, breathes like cotton, and has a beautiful matte luster. Known primarily as the finest garment lining material, but increasingly used as a fashion fabric in its own right.",
    weightRange: { min: 50, max: 200, unit: "GSM", display: "50–200 GSM (1.5–6 oz/yd²)" },
    season: "all-season",
    priceTier: "moderate",
    care: {
      washTemp: "Hand wash cold or machine wash cold (30°C), delicate cycle",
      drying: "Line dry or lay flat; avoid tumble drying",
      ironing: "Low heat; press from wrong side while slightly damp",
      storage: "Hang to avoid creasing; use padded hangers",
      preTreatment: "Pre-wash gently in cold water before cutting",
      shrinkagePercent: "3–5%",
      specialNotes: "Anti-static and hypoallergenic. Wrinkles smooth out when hung in a steamy bathroom."
    },
    relatedFibers: ["viscose", "silk", "tencel"],
    properties: {
      breathability: { value: 82, label: "High", interp: "Breathes like cotton but with silk's smooth surface" },
      absorbency: { value: 78, label: "High", interp: "Absorbs and releases moisture efficiently; anti-static" },
      drape: { value: 90, label: "Excellent", interp: "Fluid, silk-like fall; the reason it's the gold standard for linings" },
      wrinkleResistance: { value: 35, label: "Low–Moderate", interp: "Wrinkles with wear but releases wrinkles easily when hung" },
      durability: { value: 50, label: "Moderate", interp: "Stronger than viscose when wet; moderate abrasion resistance" },
      shrinkage: { value: 45, label: "Moderate", interp: "Some shrinkage; pre-wash before cutting" },
      heatTolerance: { value: 50, label: "Moderate", interp: "Low iron heat; avoid direct contact — use press cloth" },
      stretch: { value: 10, label: "Very Low", interp: "No inherent stretch; all movement comes from drape" },
      pillingResistance: { value: 45, label: "Moderate", interp: "Delicate fibers can pill; gentle handling helps" },
      colorfastness: { value: 65, label: "Moderate", interp: "Takes dye reasonably; wash gently to preserve color" },
      structure: { value: 20, label: "Low", interp: "Extremely fluid; behaves like silk for lining and drape" },
      washability: { value: 40, label: "Low–Moderate", interp: "Hand wash or gentle cycle; less fragile than silk but still delicate" },
      softness: { value: 88, label: "Very High", interp: "Silk-like hand; prized as a luxury lining fabric" }
    },
    sewingNotes: [
      "Use a sharp / microtex needle (60/8–70/10) — fine fibers require a slim needle.",
      "Cut with weights rather than pins — pin holes show on the surface.",
      "Sew with a walking foot or use tissue paper under slippery layers.",
      "French seams are ideal — clean, enclosed, and suit the fabric's fine hand.",
      "Use silk thread or fine polyester (60 wt) for invisible seams.",
      "Mark with tailor's tacks rather than chalk or markers — some leave permanent marks."
    ],
    needle: { type: "Sharp / Microtex", sizeRange: "60/8–70/10" },
    thread: { weight: "60 wt polyester or silk", material: "Polyester or Silk" },
    varieties: [
      { name: "Bemberg Lining", weight: "Lightweight", gsm: "50–80", desc: "The classic high-end garment lining. Silky, breathable, anti-static. Slips over other layers beautifully.",
        props: { breathability: 85, absorbency: 78, drape: 92, wrinkleResistance: 32, durability: 48, shrinkage: 45, heatTolerance: 48, stretch: 8, pillingResistance: 42, colorfastness: 62, structure: 8, washability: 40, softness: 90 }},
      { name: "Cupro Twill", weight: "Light–Medium", gsm: "110–170", desc: "Diagonal weave with more body than plain cupro. Used for pants, skirts, and softly structured garments.",
        props: { breathability: 80, absorbency: 78, drape: 82, wrinkleResistance: 38, durability: 55, shrinkage: 42, heatTolerance: 52, stretch: 10, pillingResistance: 48, colorfastness: 68, structure: 18, washability: 40, softness: 86 }},
      { name: "Cupro Satin", weight: "Lightweight", gsm: "70–120", desc: "Lustrous satin weave face. Mimics silk charmeuse at a lower price. Camisoles, bias-cut dresses.",
        props: { breathability: 82, absorbency: 75, drape: 95, wrinkleResistance: 30, durability: 42, shrinkage: 48, heatTolerance: 48, stretch: 8, pillingResistance: 40, colorfastness: 60, structure: 5, washability: 40, softness: 91 }},
      { name: "Cupro-Cotton Blend", weight: "Medium", gsm: "130–200", desc: "Cotton adds structure and ease of sewing; cupro adds drape and softness. Practical for everyday garments.",
        props: { breathability: 82, absorbency: 80, drape: 78, wrinkleResistance: 38, durability: 58, shrinkage: 42, heatTolerance: 55, stretch: 12, pillingResistance: 52, colorfastness: 70, structure: 22, washability: 40, softness: 84 }}
    ],
    weaves: [
      { name: "Plain Weave", structure: "1/1 balanced interlacement", character: "Smooth, lightweight, excellent for linings and lightweight garments." },
      { name: "Twill", structure: "2/1 or 3/1 diagonal", character: "More body and structure. A beautiful fabric for dresses and separates." },
      { name: "Satin", structure: "4/1 float weave", character: "Maximum luster. Slippery — requires careful handling when cutting and sewing." }
    ],
    commercialNames: ["Bemberg®", "Cupro lining", "Cupro satin", "Cupro twill"],
    tags: ["lining", "drapey", "silk-like", "moderate"]
  },

  // ── PROTEIN FIBERS (additional) ──

  cashmere: {
    name: "Cashmere", botanical: "Capra hircus (Cashmere goat undercoat)",
    accent: "#C85050", bg: "#F8E8E8",
    fiberType: "protein",
    intro: "The downy undercoat combed from cashmere goats during their spring molt. Fibers are finer than the finest merino (under 19 microns) and trap air in a lightweight loft, providing warmth without bulk. A luxury fiber that requires gentle handling but rewards with unmatched softness.",
    weightRange: { min: 80, max: 300, unit: "GSM", display: "80–300 GSM (2.5–9 oz/yd²)" },
    season: "cool-weather",
    priceTier: "luxury",
    care: {
      washTemp: "Hand wash cold (20–25°C) with wool-safe detergent; or dry clean",
      drying: "Lay flat on a towel to dry; reshape while damp",
      ironing: "Low heat with steam through a press cloth; or use a steamer",
      storage: "Fold (never hang); store with cedar or lavender sachets — moths love cashmere",
      preTreatment: "Not usually pre-washed — work with the finished fabric as-is",
      shrinkagePercent: "2–3% (felting risk if agitated)",
      specialNotes: "Pilling is normal in the first wearings — use a cashmere comb to remove. Hand washing actually softens cashmere over time."
    },
    relatedFibers: ["wool", "alpaca", "mohair"],
    properties: {
      breathability: { value: 75, label: "Good", interp: "Fine fibers create insulating air pockets that still allow vapor transfer" },
      absorbency: { value: 55, label: "Moderate", interp: "Absorbs moisture slowly; wicks from skin to outer surface" },
      drape: { value: 78, label: "Good–Excellent", interp: "Soft, flowing drape from fine fibers; more fluid than wool" },
      wrinkleResistance: { value: 65, label: "Good", interp: "Natural resilience; wrinkles hang out overnight" },
      durability: { value: 30, label: "Low", interp: "Delicate fiber — pills easily and wears through at stress points" },
      shrinkage: { value: 35, label: "Low", interp: "Fine fibers felt easily if agitated in warm water; high shrinkage risk" },
      heatTolerance: { value: 40, label: "Low", interp: "Low iron through a press cloth only; steam is safer" },
      stretch: { value: 30, label: "Low–Moderate", interp: "Some natural elasticity from fiber crimp; less than wool" },
      pillingResistance: { value: 25, label: "Low", interp: "Pills easily — handle gently and avoid friction" },
      colorfastness: { value: 68, label: "Good", interp: "Takes dye well; wash cold to preserve color" },
      structure: { value: 25, label: "Low", interp: "Soft and light; needs underlining for structured garments" },
      washability: { value: 15, label: "Very Low", interp: "Hand wash cold with wool detergent or dry clean only" },
      softness: { value: 95, label: "Exceptional", interp: "The benchmark for luxury softness; featherlight against skin" }
    },
    sewingNotes: [
      "Use a sharp needle (70/10–80/12) for wovens; ballpoint for knits.",
      "Reduce presser foot pressure — cashmere is easily crushed.",
      "Use silk thread or fine polyester (60 wt) for invisible seams.",
      "Sew slowly with a shorter stitch length (2.0–2.5 mm) for secure seams.",
      "Interface sparingly with fusible knit interfacing — avoid woven fusibles that stiffen the fabric.",
      "Cut with a rotary cutter and weights — pins leave holes in fine cashmere."
    ],
    needle: { type: "Sharp / Ballpoint", sizeRange: "70/10–80/12" },
    thread: { weight: "60 wt silk or polyester", material: "Silk or Polyester" },
    varieties: [
      { name: "Cashmere Jersey", weight: "Light–Medium", gsm: "150–220", desc: "Knit cashmere for sweaters, cardigans, and wraps. The most common form for home sewists. Often sold as knit yardage.",
        props: { breathability: 75, absorbency: 55, drape: 78, wrinkleResistance: 62, durability: 32, shrinkage: 30, heatTolerance: 38, stretch: 45, pillingResistance: 22, colorfastness: 66, structure: 22, washability: 15, softness: 88 },
        isKnit: true },
      { name: "Cashmere Woven", weight: "Medium", gsm: "180–280", desc: "Woven cashmere for coats, blazers, and scarves. Denser and more structured than knit. Often blended with wool.",
        props: { breathability: 70, absorbency: 55, drape: 62, wrinkleResistance: 70, durability: 40, shrinkage: 38, heatTolerance: 42, stretch: 18, pillingResistance: 30, colorfastness: 70, structure: 38, washability: 15, softness: 82 }},
      { name: "Cashmere-Wool Blend", weight: "Medium", gsm: "180–300", desc: "Wool adds durability and structure; cashmere adds softness. Common 70/30 or 80/20. More practical for everyday garments.",
        props: { breathability: 72, absorbency: 62, drape: 60, wrinkleResistance: 75, durability: 55, shrinkage: 55, heatTolerance: 45, stretch: 35, pillingResistance: 38, colorfastness: 72, structure: 40, washability: 15, softness: 81 }},
      { name: "Cashmere-Silk Blend", weight: "Light", gsm: "100–180", desc: "Silk adds strength and luster. Lightweight, luxurious. Used for scarves, fine sweaters, and evening accessories.",
        props: { breathability: 78, absorbency: 52, drape: 85, wrinkleResistance: 58, durability: 35, shrinkage: 45, heatTolerance: 35, stretch: 22, pillingResistance: 28, colorfastness: 62, structure: 15, washability: 15, softness: 91 }},
      { name: "Double-Face Cashmere", weight: "Heavy", gsm: "400–600", desc: "Two layers of cashmere woven or bonded together. Reversible. Used for unlined coats. Very expensive but stunning.",
        props: { breathability: 62, absorbency: 55, drape: 45, wrinkleResistance: 75, durability: 48, shrinkage: 48, heatTolerance: 42, stretch: 15, pillingResistance: 32, colorfastness: 70, structure: 55, washability: 15, softness: 75 }}
    ],
    weaves: [
      { name: "Knit (Jersey, Rib)", structure: "Interlooped yarns", character: "The most common cashmere construction. Soft, warm, elegant. Requires careful handling." },
      { name: "Twill", structure: "2/2 or 3/1 diagonal", character: "Woven cashmere coatings and suiting. Dense, warm, luxurious. Often blended." },
      { name: "Plain Weave", structure: "1/1 balanced interlacement", character: "Lighter-weight cashmere scarving and dress fabric. Shows the fiber's natural softness." },
      { name: "Double Cloth", structure: "Two interconnected fabric layers", character: "Reversible coatings. Seams are enclosed between layers. The ultimate luxury coat fabric." }
    ],
    commercialNames: ["Pashmina", "Shahtoosh (banned)", "Cashmere jersey"],
    tags: ["luxury", "cold-weather", "soft", "advanced"]
  },

  camel: {
    name: "Camel Hair", botanical: "Camelus bactrianus (Bactrian camel undercoat)",
    accent: "#D8A830", bg: "#F9F4E4",
    fiberType: "protein",
    intro: "Harvested from the soft undercoat of the Bactrian camel during its annual spring molt. Naturally warm, lightweight, and distinctively golden-tan. Finer grades rival cashmere in softness. Used for luxury coats since the 1920s — the classic polo coat is camel hair.",
    weightRange: { min: 100, max: 500, unit: "GSM", display: "100–500 GSM (3–15 oz/yd²)" },
    season: "cool-weather",
    priceTier: "luxury",
    care: {
      washTemp: "Dry clean recommended; or hand wash cold (20°C) with wool-safe detergent",
      drying: "Lay flat on a towel; reshape while damp. Never wring.",
      ironing: "Low heat through a press cloth; steam lightly",
      storage: "Fold and store with moth protection; never hang heavy pieces (they stretch)",
      preTreatment: "Generally not pre-washed — work with finished yardage",
      shrinkagePercent: "2–4%",
      specialNotes: "The natural golden-tan color doesn't hold dye well — most camel hair fabric is left undyed or blended with dyeable fibers."
    },
    relatedFibers: ["cashmere", "wool", "alpaca"],
    properties: {
      breathability: { value: 70, label: "Good", interp: "Thermally regulating — warm in cold, comfortable in mild temperatures" },
      absorbency: { value: 50, label: "Moderate", interp: "Absorbs some moisture without feeling damp" },
      drape: { value: 65, label: "Moderate–Good", interp: "Good drape in lighter weights; substantial body in coatings" },
      wrinkleResistance: { value: 68, label: "Good", interp: "Natural resilience; wrinkles release when hung" },
      durability: { value: 50, label: "Moderate", interp: "Softer than wool but pills more; fine grades are delicate" },
      shrinkage: { value: 45, label: "Moderate", interp: "Can felt if agitated — dry clean or gentle hand wash" },
      heatTolerance: { value: 40, label: "Low", interp: "Low iron heat through a press cloth; steam is preferred" },
      stretch: { value: 25, label: "Low", interp: "Some natural elasticity from the fiber's crimp" },
      pillingResistance: { value: 45, label: "Moderate", interp: "Moderate pilling; less than cashmere, more than wool" },
      colorfastness: { value: 72, label: "Good", interp: "Natural undyed color is prized; takes dye when processed" },
      structure: { value: 40, label: "Moderate", interp: "More body than cashmere; suitable for coats and jackets" },
      washability: { value: 20, label: "Low", interp: "Dry clean recommended; hand wash cold with extreme care" },
      softness: { value: 75, label: "High", interp: "Baby camel is very soft; outer hair is coarser" }
    },
    sewingNotes: [
      "Use a sharp needle (80/12–90/14) for woven coatings.",
      "Sew slowly — camel hair can shift under the presser foot.",
      "Use a walking foot for heavy coatings to prevent layer shifting.",
      "Bound or Hong Kong seam finishes suit the premium fabric.",
      "Interface with sew-in or fusible hair canvas for tailored coats.",
      "Steam-press rather than iron directly — direct heat can scorch the fiber."
    ],
    needle: { type: "Sharp / Universal", sizeRange: "80/12–90/14" },
    thread: { weight: "50 wt polyester or silk", material: "Polyester or Silk" },
    varieties: [
      { name: "Camel Coating", weight: "Heavy", gsm: "350–500", desc: "Dense, warm coating fabric. The classic polo coat material. Often 100% camel or blended with wool for structure.",
        props: { breathability: 60, absorbency: 50, drape: 40, wrinkleResistance: 78, durability: 65, shrinkage: 40, heatTolerance: 42, stretch: 18, pillingResistance: 48, colorfastness: 75, structure: 60, washability: 20, softness: 61 }},
      { name: "Camel Suiting", weight: "Medium", gsm: "200–300", desc: "Lighter weight for blazers and sport coats. Usually blended with wool for durability and dye-ability.",
        props: { breathability: 68, absorbency: 52, drape: 58, wrinkleResistance: 72, durability: 55, shrinkage: 42, heatTolerance: 42, stretch: 22, pillingResistance: 45, colorfastness: 72, structure: 42, washability: 20, softness: 68 }},
      { name: "Camel-Wool Blend", weight: "Medium–Heavy", gsm: "250–400", desc: "The most practical form. Wool adds durability and dyeability; camel adds softness and warmth. Common 60/40 or 50/50.",
        props: { breathability: 65, absorbency: 58, drape: 52, wrinkleResistance: 76, durability: 68, shrinkage: 48, heatTolerance: 48, stretch: 28, pillingResistance: 50, colorfastness: 74, structure: 48, washability: 20, softness: 66 }},
      { name: "Baby Camel", weight: "Light–Medium", gsm: "120–220", desc: "From the first combing (under 19 microns). Exceptionally soft — comparable to cashmere. Used for scarves and luxury knits.",
        props: { breathability: 72, absorbency: 48, drape: 75, wrinkleResistance: 62, durability: 40, shrinkage: 38, heatTolerance: 38, stretch: 25, pillingResistance: 35, colorfastness: 68, structure: 25, washability: 20, softness: 75 }}
    ],
    weaves: [
      { name: "Twill", structure: "2/2 or 3/1 diagonal", character: "The standard for camel coatings and suiting. Dense, warm, with a soft hand." },
      { name: "Plain Weave", structure: "1/1 balanced interlacement", character: "Lighter weight camel scarving and dress fabric. Less common than twill." },
      { name: "Herringbone", structure: "Twill reversal creating a zigzag pattern", character: "Classic coating pattern. Adds visual interest to the natural camel color." },
      { name: "Knit", structure: "Interlooped yarns", character: "Baby camel knits are exceptionally soft. Used for scarves, sweaters, and accessories." }
    ],
    commercialNames: ["Camel coating", "Camel blend suiting"],
    tags: ["luxury", "cold-weather", "coating", "natural-color"]
  },

  pina: {
    name: "Piña", botanical: "Ananas comosus (pineapple leaf fiber)",
    accent: "#C4A035", bg: "#FAF5E4",
    fiberType: "cellulose",
    intro: "A delicate, lustrous fiber extracted from the leaves of the pineapple plant, primarily produced in the Philippines. Piña cloth has been woven for centuries into the barong tagalog, the Philippine national garment. The fiber is laboriously hand-scraped from leaves, making it one of the most labor-intensive natural textiles. Its natural sheer quality and stiff drape give it a unique aesthetic.",
    weightRange: { min: 40, max: 150, unit: "GSM", display: "40–150 GSM (1–4.5 oz/yd²)" },
    season: "warm-weather",
    priceTier: "luxury",
    care: {
      washTemp: "Hand wash cold (30°C) or dry clean only",
      drying: "Lay flat or hang to dry; avoid machine drying",
      ironing: "Low to medium heat; press while slightly damp for best results",
      storage: "Store flat, wrapped in acid-free tissue; avoid folding",
      preTreatment: "Do not pre-wash; test swatch for shrinkage",
      shrinkagePercent: "2–4%",
      specialNotes: "Extremely delicate — handle gently when wet. Hand-stitch where possible. Fabric is sheer and stiff, not drapy"
    },
    relatedFibers: ["silk", "ramie", "linen"],
    properties: {
      breathability: { value: 88, label: "Very High", interp: "Open weave and fine fibers allow excellent airflow" },
      absorbency: { value: 60, label: "Moderate", interp: "Absorbs less than cotton but adequate for lightweight garments" },
      drape: { value: 30, label: "Stiff", interp: "Holds shape with a crisp, structured hand; not fluid" },
      wrinkleResistance: { value: 25, label: "Low", interp: "Wrinkles easily but the stiff texture partially masks creases" },
      durability: { value: 35, label: "Low", interp: "Delicate fiber; best for special-occasion garments" },
      shrinkage: { value: 45, label: "Moderate", interp: "Some shrinkage with washing; dry clean preferred" },
      heatTolerance: { value: 60, label: "Moderate", interp: "Tolerates low iron heat; test on scrap first" },
      stretch: { value: 5, label: "Very Low", interp: "Virtually no give; rigid leaf fiber" },
      pillingResistance: { value: 72, label: "Good", interp: "Smooth, stiff fibers resist pilling well" },
      colorfastness: { value: 55, label: "Moderate", interp: "Natural ivory tone holds well; dyed versions may fade with washing" },
      structure: { value: 70, label: "High", interp: "Stiff, crisp leaf fiber; holds shape for formal garments" },
      washability: { value: 30, label: "Low", interp: "Hand wash gently or dry clean; fragile when wet" },
      softness: { value: 35, label: "Low–Moderate", interp: "Crisp and papery; not a next-to-skin fabric" }
    },
    sewingNotes: [
      "Use sharp microtex needles (60/8 to 70/10) — the fiber is fine and splits easily",
      "Hand sewing is traditional and often produces better results than machine",
      "French seams suit the sheer fabric beautifully — they enclose raw edges",
      "Cut with sharp rotary cutter; fabric frays moderately",
      "Pin sparingly — pins leave visible holes in sheer piña cloth"
    ],
    needle: { type: "Microtex / Sharp", sizeRange: "60/8–70/10" },
    thread: { weight: "60 wt", material: "Silk or fine cotton" },
    varieties: [
      { name: "Pure Piña Cloth", weight: "Very Light", gsm: "40–80", desc: "Traditional hand-woven piña. Sheer, stiff, and luminous. Used for barong tagalog and formal garments.",
        props: { breathability: 92, absorbency: 55, drape: 25, wrinkleResistance: 20, durability: 28, shrinkage: 48, heatTolerance: 58, stretch: 3, pillingResistance: 78, colorfastness: 52, structure: 75, washability: 30, softness: 31 }},
      { name: "Piña-Silk Blend", weight: "Light", gsm: "60–120", desc: "Silk adds drape and strength while retaining piña's luster. A more wearable form for special-occasion garments.",
        props: { breathability: 85, absorbency: 58, drape: 55, wrinkleResistance: 30, durability: 40, shrinkage: 42, heatTolerance: 55, stretch: 8, pillingResistance: 68, colorfastness: 50, structure: 45, washability: 30, softness: 43 }},
      { name: "Piña-Cotton Blend", weight: "Light–Medium", gsm: "80–150", desc: "Cotton adds body and sewability. More accessible than pure piña. Suitable for blouses and lightweight dresses.",
        props: { breathability: 85, absorbency: 68, drape: 38, wrinkleResistance: 28, durability: 45, shrinkage: 50, heatTolerance: 65, stretch: 6, pillingResistance: 65, colorfastness: 60, structure: 62, washability: 30, softness: 36 }}
    ],
    weaves: [
      { name: "Plain Weave", structure: "1/1 balanced interlacement", character: "The traditional and most common piña construction. Crisp, sheer, with a natural luster." },
      { name: "Twill", structure: "2/1 diagonal", character: "Slightly heavier and more opaque. Used in blended piña fabrics." }
    ],
    commercialNames: ["Piña cloth", "Piña jusi (blended)", "Nipis"],
    tags: ["luxury", "traditional", "sheer", "special-occasion", "sustainable"]
  },

  kapok: {
    name: "Kapok", botanical: "Ceiba pentandra",
    accent: "#A8B060", bg: "#F4F5E8",
    fiberType: "cellulose",
    intro: "An ultra-lightweight, silky fiber harvested from the seed pods of the kapok (ceiba) tree. Kapok is the lightest natural fiber — about one-eighth the density of cotton — and is naturally buoyant, moisture-resistant, and hypoallergenic. Traditionally used as filling for pillows, life jackets, and upholstery. As a textile fiber, kapok is too short and slippery to spin alone, so it is always blended with other fibers.",
    weightRange: { min: 60, max: 200, unit: "GSM", display: "60–200 GSM (1.8–6 oz/yd²)" },
    season: "all-season",
    priceTier: "mid-range",
    care: {
      washTemp: "Machine wash gentle cold (30°C) for blends; hand wash preferred",
      drying: "Tumble dry low or lay flat; kapok fill shifts easily",
      ironing: "Low heat; avoid pressing hard on kapok-fill items",
      storage: "Fluff periodically to maintain loft; store in breathable bags",
      preTreatment: "Pre-wash blended fabric to pre-shrink the partner fiber",
      shrinkagePercent: "2–5% (depends on blend partner)",
      specialNotes: "Kapok fibers are too short and slippery to spin alone — always blended. Fiber is hollow and buoyant"
    },
    relatedFibers: ["cotton", "bamboo", "silk"],
    properties: {
      breathability: { value: 82, label: "High", interp: "Hollow fibers trap air and allow airflow" },
      absorbency: { value: 35, label: "Low", interp: "Naturally moisture-resistant; repels water" },
      drape: { value: 55, label: "Moderate", interp: "Depends heavily on blend partner; kapok adds softness" },
      wrinkleResistance: { value: 40, label: "Low–Moderate", interp: "Blend-dependent; kapok itself is resilient" },
      durability: { value: 30, label: "Low", interp: "Fibers are short and fragile; blending is essential" },
      shrinkage: { value: 40, label: "Moderate", interp: "Minimal from kapok itself; partner fiber determines shrinkage" },
      heatTolerance: { value: 55, label: "Moderate", interp: "Handles low iron heat; avoid high temperatures" },
      stretch: { value: 10, label: "Very Low", interp: "Little elasticity in the fiber itself" },
      pillingResistance: { value: 30, label: "Low", interp: "Short fibers migrate to surface and form pills easily" },
      colorfastness: { value: 45, label: "Low–Moderate", interp: "Difficult to dye uniformly; blends take dye from partner fiber" },
      structure: { value: 10, label: "Very Low", interp: "Hollow, buoyant fiber with no structure; used as fill, not fabric" },
      washability: { value: 25, label: "Low", interp: "Blend-dependent; kapok fill can clump in machine washing" },
      softness: { value: 90, label: "Very High", interp: "Silky, downy hand; used for filling and blended fabrics" }
    },
    sewingNotes: [
      "Always a blended fabric — sewing characteristics depend on the blend partner",
      "Use universal needles sized for the blend weight (typically 70/10–80/12)",
      "Kapok fill is slippery — quilt or tack filling in place to prevent shifting",
      "For kapok-filled items, use walking foot to feed layers evenly",
      "Cut carefully — kapok fibers are fine and create static cling"
    ],
    needle: { type: "Universal", sizeRange: "70/10–80/12" },
    thread: { weight: "50 wt", material: "Cotton or polyester" },
    varieties: [
      { name: "Kapok-Cotton Blend", weight: "Light–Medium", gsm: "100–180", desc: "Cotton provides structure; kapok adds softness and insulation. The most common wearable form.",
        props: { breathability: 85, absorbency: 60, drape: 50, wrinkleResistance: 35, durability: 45, shrinkage: 48, heatTolerance: 62, stretch: 10, pillingResistance: 38, colorfastness: 58, structure: 50, washability: 25, softness: 74 }},
      { name: "Kapok Fill / Batting", weight: "Variable", gsm: "50–150 (fill weight)", desc: "Loose fiber or batt for stuffing pillows, quilts, and insulated garments. Lightweight and naturally buoyant.",
        props: { breathability: 88, absorbency: 25, drape: 70, wrinkleResistance: 50, durability: 20, shrinkage: 30, heatTolerance: 50, stretch: 15, pillingResistance: 20, colorfastness: 40, structure: 30, washability: 25, softness: 82 }},
      { name: "Kapok-Silk Blend", weight: "Light", gsm: "60–130", desc: "Silk adds strength and sheen. An ultra-soft, lightweight fabric for linings and scarves.",
        props: { breathability: 84, absorbency: 40, drape: 72, wrinkleResistance: 42, durability: 35, shrinkage: 38, heatTolerance: 48, stretch: 8, pillingResistance: 32, colorfastness: 48, structure: 28, washability: 25, softness: 83 }}
    ],
    weaves: [
      { name: "Plain Weave", structure: "1/1 balanced interlacement", character: "Standard construction for kapok blends. Soft hand with slight loft." },
      { name: "Jersey Knit", structure: "Interlooped yarns", character: "Kapok-cotton jersey is soft, lightweight, and comfortable against skin." }
    ],
    commercialNames: ["Kapok fill", "Ceiba fiber", "Silk cotton"],
    tags: ["sustainable", "hypoallergenic", "lightweight", "filling", "eco-friendly"]
  },

  nettle: {
    name: "Nettle", botanical: "Urtica dioica (stinging nettle) · Girardinia diversifolia (Himalayan nettle / allo)",
    accent: "#5B8A3C", bg: "#EFF5E8",
    fiberType: "bast",
    intro: "A bast fiber extracted from the stems of the stinging nettle plant. Nettle textile has a history stretching back to the Bronze Age in Europe. The fiber is similar to linen in character — strong, breathable, and slightly rough until softened through processing. Himalayan nettle (allo) is a related species used extensively in Nepal. Nettle is gaining renewed interest as a sustainable crop requiring no pesticides and thriving on marginal land.",
    weightRange: { min: 100, max: 350, unit: "GSM", display: "100–350 GSM (3–10 oz/yd²)" },
    season: "warm-weather",
    priceTier: "mid-range",
    care: {
      washTemp: "Machine wash warm (40°C); softens with each wash",
      drying: "Line dry or tumble dry low; remove promptly to reduce wrinkles",
      ironing: "High heat with steam; press while damp like linen",
      storage: "Fold loosely; wrinkle-prone like linen",
      preTreatment: "Pre-wash to soften and pre-shrink — two warm washes recommended",
      shrinkagePercent: "5–8% (first wash)",
      specialNotes: "Gets softer and more supple with every wash. Initial hand is stiff and scratchy — softens dramatically over time"
    },
    relatedFibers: ["linen", "hemp", "ramie"],
    properties: {
      breathability: { value: 85, label: "Very High", interp: "Open bast fiber structure allows excellent air circulation" },
      absorbency: { value: 78, label: "High", interp: "Absorbs moisture readily, similar to linen" },
      drape: { value: 35, label: "Low–Moderate", interp: "Stiff when new; softens to a linen-like drape with washing" },
      wrinkleResistance: { value: 22, label: "Low", interp: "Wrinkles like linen — part of its natural character" },
      durability: { value: 78, label: "High", interp: "Strong bast fiber; comparable to hemp in tensile strength" },
      shrinkage: { value: 60, label: "High", interp: "Significant first-wash shrinkage; pre-washing essential" },
      heatTolerance: { value: 80, label: "High", interp: "Handles high iron temperatures well, like linen" },
      stretch: { value: 8, label: "Very Low", interp: "Minimal give; structured bast fiber" },
      pillingResistance: { value: 72, label: "Good", interp: "Long bast fibers resist pilling; blends may pill more" },
      colorfastness: { value: 65, label: "Moderate–Good", interp: "Takes natural and fiber-reactive dyes well; some fading with washing" },
      structure: { value: 65, label: "Moderate–High", interp: "Similar to linen; crisp bast fiber with good body" },
      washability: { value: 65, label: "Moderate", interp: "Machine washable on gentle; similar care to linen" },
      softness: { value: 30, label: "Low", interp: "Coarse when new; softens with washing like linen" }
    },
    sewingNotes: [
      "Handle like linen — use sharp needles and let the fabric feed naturally",
      "Pre-wash twice to soften and stabilize before cutting",
      "Cut with sharp rotary cutter — fibers are tough and dull blades quickly",
      "French seams or serged edges recommended; frays moderately",
      "Stiff when new — garments become much more comfortable after several washes"
    ],
    needle: { type: "Universal / Sharp", sizeRange: "70/10–90/14" },
    thread: { weight: "50 wt", material: "Cotton or polyester" },
    varieties: [
      { name: "Pure Nettle Cloth", weight: "Medium", gsm: "150–280", desc: "100% nettle fabric. Linen-like hand, slightly rougher. Softens dramatically with washing and wear.",
        props: { breathability: 88, absorbency: 80, drape: 32, wrinkleResistance: 20, durability: 80, shrinkage: 65, heatTolerance: 82, stretch: 6, pillingResistance: 75, colorfastness: 62, structure: 68, washability: 65, softness: 31 }},
      { name: "Nettle-Cotton Blend", weight: "Light–Medium", gsm: "120–220", desc: "Cotton softens the hand and improves sewability. A practical everyday fabric with nettle's breathability.",
        props: { breathability: 84, absorbency: 78, drape: 45, wrinkleResistance: 28, durability: 72, shrinkage: 55, heatTolerance: 78, stretch: 10, pillingResistance: 65, colorfastness: 68, structure: 55, washability: 65, softness: 36 }},
      { name: "Himalayan Nettle (Allo)", weight: "Medium–Heavy", gsm: "180–350", desc: "From Girardinia diversifolia. Coarser and stronger than European nettle. Traditional Nepali fiber for bags and outerwear.",
        props: { breathability: 82, absorbency: 75, drape: 25, wrinkleResistance: 18, durability: 85, shrinkage: 58, heatTolerance: 80, stretch: 5, pillingResistance: 78, colorfastness: 58, structure: 75, washability: 65, softness: 28 }},
      { name: "Nettle-Wool Blend", weight: "Medium", gsm: "160–280", desc: "Wool adds warmth and elasticity. Nettle adds breathability and strength. A good all-season fabric.",
        props: { breathability: 78, absorbency: 72, drape: 48, wrinkleResistance: 45, durability: 75, shrinkage: 52, heatTolerance: 65, stretch: 22, pillingResistance: 58, colorfastness: 68, structure: 52, washability: 65, softness: 37 }}
    ],
    weaves: [
      { name: "Plain Weave", structure: "1/1 balanced interlacement", character: "The most common nettle construction. Crisp, breathable, with a linen-like texture." },
      { name: "Twill", structure: "2/1 or 2/2 diagonal", character: "Denser, softer hand than plain weave. Used for trousers and jackets." },
      { name: "Canvas", structure: "Tight plain weave with heavier yarns", character: "Himalayan nettle canvas is exceptionally durable. Bags, outerwear, and upholstery." }
    ],
    commercialNames: ["Nettle cloth", "Allo (Himalayan nettle)", "Ramie-nettle blend"],
    tags: ["sustainable", "breathable", "eco-friendly", "heritage", "bast-fiber"]
  }
};

// Properties where the stored value is "bad-high" — display inverted so higher = better
const PROP_INVERTED = { shrinkage: true };

const PROP_TOOLTIPS = {
  breathability: 'How freely air passes through the fabric. Higher = cooler and more comfortable in heat.',
  absorbency: 'How well the fabric absorbs moisture from skin. Higher = dries skin faster.',
  drape: 'How fluidly the fabric falls and flows. Higher = softer fall; lower = more structured.',
  wrinkleResistance: 'How well the fabric resists creasing. Higher = less ironing needed.',
  durability: 'How well the fabric withstands wear, washing, and abrasion. Higher = longer-lasting.',
  shrinkage: 'How well the fabric resists shrinking when washed. Higher = less shrinkage.',
  heatTolerance: 'How safely the fabric handles high ironing temperatures. Higher = tolerates more heat.',
  stretch: 'How much the fabric gives or recovers when pulled. Higher = more elastic.',
  pillingResistance: 'How well the fabric resists forming small fiber balls on the surface. Higher = fewer pills.',
  colorfastness: 'How well the fabric retains its color through washing, sunlight, and wear. Higher = less fading.'
};

// Pros and cons for each fiber (displayed in Overview tab)

const FIBER_PROS_CONS = {
  cotton: {
    pros: ['Breathable and comfortable in warm weather', 'Machine washable and easy to care for', 'Absorbs dye beautifully — wide color range', 'Softens with each wash', 'Affordable and widely available'],
    cons: ['Wrinkles easily without pressing', 'Shrinks 3–5% if not pre-washed', 'Retains moisture when wet (slow to dry)', 'No natural stretch']
  },
  linen: {
    pros: ['Extremely breathable — ideal for hot climates', 'Very strong fiber, lasts for years', 'Antibacterial and lint-free', 'Improves with age and washing', 'Eco-friendly — low water and pesticide use'],
    cons: ['Wrinkles heavily and permanently', 'Stiff until broken in', 'Shrinks significantly if not pre-washed', 'Limited stretch — can feel rigid']
  },
  silk: {
    pros: ['Luxurious drape and natural sheen', 'Temperature-regulating — cool in summer, warm in winter', 'Strongest natural fiber by weight', 'Hypoallergenic and gentle on skin', 'Takes dye exceptionally well'],
    cons: ['Requires delicate care — usually hand wash or dry clean', 'Weakened by sunlight and perspiration', 'Expensive compared to most fibers', 'Water-stains easily']
  },
  wool: {
    pros: ['Excellent insulation — warm even when damp', 'Naturally wrinkle-resistant and elastic', 'Moisture-wicking and odor-resistant', 'Flame-resistant without chemical treatment', 'Resilient — springs back after stretching'],
    cons: ['Can felt and shrink with agitation or heat', 'Some grades feel itchy on sensitive skin', 'Moths and carpet beetles target wool', 'Usually requires hand wash or dry clean']
  },
  cashmere: {
    pros: ['Extraordinarily soft and lightweight', 'Warmer than wool at a fraction of the weight', 'Luxurious hand feel and drape', 'Naturally breathable and temperature-regulating'],
    cons: ['Very expensive — premium fiber', 'Pills easily without careful handling', 'Fragile — requires gentle hand washing', 'Environmental concerns with overgrazing']
  },
  hemp: {
    pros: ['Extremely durable — outlasts cotton significantly', 'Grows with minimal water and no pesticides', 'Softens beautifully over time', 'UV-resistant and mildew-resistant', 'Highly breathable'],
    cons: ['Stiff and rough when new', 'Wrinkles noticeably', 'Limited color range without blending', 'Can feel coarse in lighter weaves']
  },
  bamboo: {
    pros: ['Silky-soft hand feel', 'Naturally antibacterial and hypoallergenic', 'Excellent moisture wicking', 'Sustainable crop — grows rapidly', 'Biodegradable'],
    cons: ['Chemical-intensive processing (viscose method)', 'Weaker when wet', 'Can pill over time', 'Less durable than cotton or linen']
  },
  jute: {
    pros: ['Very affordable — one of the cheapest fibers', 'Biodegradable and eco-friendly', 'Good tensile strength', 'Natural golden luster'],
    cons: ['Rough texture — not for garments', 'Weakens when exposed to moisture', 'Limited to craft, upholstery, and sacking', 'Brittle and stiff']
  },
  ramie: {
    pros: ['One of the strongest natural fibers', 'Naturally resistant to bacteria and mildew', 'Holds shape well — low shrinkage', 'Silky luster when processed', 'Dries quickly'],
    cons: ['Stiff and brittle — low abrasion resistance', 'Wrinkles easily', 'Expensive to process', 'Rarely available as pure fabric']
  },
  modal: {
    pros: ['Very soft — often compared to silk', 'Resistant to shrinkage and fading', 'Drapes beautifully', 'Absorbs dye well — vibrant colors', 'Made from renewable beechwood'],
    cons: ['Weaker when wet — handle gently', 'Tends to pill with friction', 'Chemical processing required', 'Can be clingy in humid conditions']
  },
  cupro: {
    pros: ['Silk-like drape and luster', 'Breathable and moisture-wicking', 'Made from cotton linter waste (upcycled)', 'Anti-static and hypoallergenic', 'Beautiful for linings and blouses'],
    cons: ['Delicate — requires hand washing', 'Wrinkles moderately', 'Not widely available', 'Chemical processing required']
  },
  alpaca: {
    pros: ['Warmer than wool without the weight', 'Hypoallergenic — no lanolin', 'Silky soft with a natural luster', 'Comes in 22+ natural colors', 'Very strong for a luxury fiber'],
    cons: ['Lacks elasticity — stretches over time', 'Pills without careful handling', 'Expensive compared to wool', 'Heavy garments can sag from their own weight']
  },
  mohair: {
    pros: ['Beautiful luster and sheen', 'Excellent dye absorption — vivid colors', 'Very durable and resilient', 'Resists wrinkling and creasing', 'Insulates well while remaining lightweight'],
    cons: ['Can feel itchy on sensitive skin', 'Requires careful washing — felts easily', 'Expensive fiber', 'Ethical concerns with some production methods']
  },
  angora: {
    pros: ['Extraordinarily soft and fluffy', 'Extremely warm — hollow fiber traps heat', 'Lightweight despite great warmth', 'Beautiful halo effect in knitted fabrics'],
    cons: ['Very delicate — pills and sheds heavily', 'Requires hand washing only', 'Ethical concerns with rabbit fiber production', 'Expensive and limited availability']
  },
  tencel: {
    pros: ['Exceptionally soft and smooth', 'Closed-loop production — eco-friendly', 'Strong wet and dry', 'Excellent drape and breathability', 'Resists wrinkles better than cotton'],
    cons: ['Can fibrillate (develop fuzzy surface)', 'Tends to be more expensive', 'Limited heat tolerance when ironing', 'Can develop a peach-fuzz texture over time']
  },
  viscose: {
    pros: ['Soft, smooth, and comfortable', 'Excellent drape — mimics silk', 'Absorbs moisture well', 'Takes dye easily — rich colors', 'Affordable silk alternative'],
    cons: ['Very weak when wet — can distort', 'Shrinks significantly without care', 'Wrinkles easily', 'Chemical-intensive production']
  },
  camel: {
    pros: ['Exceptionally warm and lightweight', 'Natural golden-tan color needs no dye', 'Soft undercoat rivals cashmere', 'Naturally water-resistant outer fibers', 'Very durable for a luxury fiber'],
    cons: ['Expensive — limited supply', 'Difficult to dye over natural color', 'Can pill with friction', 'Only available in limited weights and weaves']
  },
  kapok: {
    pros: ['Lightest natural fiber — buoyant', 'Silky and soft', 'Hypoallergenic and moisture-resistant', 'Eco-friendly — no pesticides needed', 'Naturally water-repellent'],
    cons: ['Too short to spin alone — needs blending', 'Weak tensile strength', 'Difficult to dye', 'Very limited availability for sewing']
  },
  pina: {
    pros: ['Naturally lustrous and sheer', 'Lightweight and stiff — holds shape beautifully', 'Eco-friendly — made from pineapple leaf waste', 'Unique texture and appearance'],
    cons: ['Very expensive and rare', 'Fragile — requires careful handling', 'Wrinkles easily', 'Available mainly in the Philippines']
  },
  nettle: {
    pros: ['Comparable to linen in strength and breathability', 'Grows without pesticides on marginal land', 'Gets softer with every wash', 'Strong bast fiber with good abrasion resistance', 'Fully biodegradable'],
    cons: ['Stiff and scratchy when new — needs multiple washes', 'High first-wash shrinkage (5–8%)', 'Wrinkles heavily like linen', 'Limited commercial availability']
  }
};

const FILTER_TAGS = [
  { key: "beginner-friendly", label: "Beginner Friendly" },
  { key: "washable", label: "Machine Washable" },
  { key: "affordable", label: "Budget Friendly" },
  { key: "sustainable", label: "Sustainable" },
  { key: "luxury", label: "Luxury" },
  { key: "warm-weather", label: "Warm Weather" },
  { key: "cold-weather", label: "Cold Weather" }
];

const FIBER_ENV_ALLERGEN = {
  cotton: {
    water: 'High — one of the thirstiest crops. About 10,000 liters of water per kg of fiber.',
    pesticides: 'Conventional cotton uses ~16% of global insecticides. Organic cotton eliminates synthetic pesticides but yields less.',
    biodegradable: true,
    certifications: 'Look for GOTS (organic), OEKO-TEX, BCI (Better Cotton Initiative).',
    allergens: 'Very low allergenic potential. One of the safest fibers for sensitive skin. Rare contact dermatitis is usually from dyes or chemical finishes, not the fiber itself.',
    sustainability: 'Organic and recycled cotton have significantly lower environmental impact. Deadstock cotton reuses surplus fabric.'
  },
  linen: {
    water: 'Very low — flax grows with rainfall alone in most climates.',
    pesticides: 'Minimal. Flax requires far fewer pesticides than cotton.',
    biodegradable: true,
    certifications: 'European Flax (grown in France/Belgium/Netherlands), GOTS, OEKO-TEX, Masters of Linen.',
    allergens: 'Extremely low. Naturally hypoallergenic and antibacterial. Excellent for sensitive skin and people with allergies.',
    sustainability: 'One of the most sustainable natural fibers. The entire flax plant is used — nothing is wasted.'
  },
  silk: {
    water: 'Moderate — mulberry trees need water, but less than cotton per kg of fiber.',
    pesticides: 'Low for the fiber itself, but mulberry cultivation may use pesticides.',
    biodegradable: true,
    certifications: 'GOTS (for organic sericulture), OEKO-TEX, Peace Silk / Ahimsa Silk (allows moths to emerge before harvesting cocoons).',
    allergens: 'Very low. Silk is naturally hypoallergenic. The sericin (silk gum) occasionally causes mild reactions in sensitive individuals — degummed silk eliminates this. Dust mite resistant.',
    sustainability: 'Peace Silk is the ethical choice — conventional sericulture kills the silkworm. Wild silk (Tussah) is another alternative.'
  },
  wool: {
    water: 'Moderate — sheep need water but graze on rain-fed land.',
    pesticides: 'Low for the fiber, but sheep dipping chemicals (organophosphates) are an environmental concern.',
    biodegradable: true,
    certifications: 'RWS (Responsible Wool Standard), ZQ Merino, GOTS, Woolmark, OEKO-TEX.',
    allergens: 'Moderate. Wool allergy is widely reported but rarely a true allergy — it\'s usually mechanical irritation from coarse fibers (>30 microns). Fine merino (≤19.5 microns) is tolerated by most people. Lanolin allergy exists but is uncommon (~1% of dermatitis patients).',
    sustainability: 'Renewable, biodegradable, and long-lasting. Mulesing is a welfare concern — look for mulesing-free certifications (RWS, ZQ).'
  },
  hemp: {
    water: 'Very low — hemp requires about half the water of cotton.',
    pesticides: 'Minimal to none. Hemp naturally resists pests and suppresses weeds.',
    biodegradable: true,
    certifications: 'GOTS, OEKO-TEX, USDA Organic.',
    allergens: 'Very low. Naturally hypoallergenic and antibacterial. Safe for sensitive skin.',
    sustainability: 'One of the most sustainable fibers. Improves soil health, sequesters carbon, grows fast without irrigation. Processing can be chemical-intensive — look for mechanically processed hemp.'
  },
  bamboo: {
    water: 'Low for growing — bamboo needs little irrigation. But viscose processing uses significant water.',
    pesticides: 'None for cultivation. Bamboo grows without pesticides.',
    biodegradable: true,
    certifications: 'OEKO-TEX, FSC (for bamboo source). True "bamboo linen" (mechanically processed) is rare — most bamboo fabric is bamboo viscose.',
    allergens: 'Very low. Naturally antibacterial. Good for sensitive skin, though chemical residues from viscose processing may affect very sensitive individuals.',
    sustainability: 'Bamboo grows rapidly and renewably, but the viscose process uses harsh chemicals (carbon disulfide). Closed-loop processing (like Monocel) is much better. Marketing as "bamboo" can be misleading — it\'s usually bamboo-derived rayon.'
  },
  tencel: {
    water: 'Low — eucalyptus trees need little irrigation.',
    pesticides: 'Very low. Eucalyptus is naturally pest-resistant.',
    biodegradable: true,
    certifications: 'OEKO-TEX, FSC, Lenzing\'s own sustainability certifications. USDA certified biobased.',
    allergens: 'Very low. Smooth fiber surface is gentle on skin. Naturally moisture-wicking reduces bacterial growth. Excellent for sensitive skin and eczema sufferers.',
    sustainability: 'Among the most sustainable regenerated fibers. Lenzing\'s closed-loop process recovers 99%+ of solvents. Wood sourced from sustainably managed forests.'
  },
  viscose: {
    water: 'High — both tree cultivation and chemical processing are water-intensive.',
    pesticides: 'Low for tree cultivation, but processing uses carbon disulfide (toxic) and sodium hydroxide.',
    biodegradable: true,
    certifications: 'OEKO-TEX, FSC, Canopy\'s Hot Button ranking (rates manufacturers). EcoVero (Lenzing\'s cleaner viscose) is a better choice.',
    allergens: 'Low. The fiber itself is gentle, but chemical residues from processing may irritate very sensitive skin. Thorough washing before use helps.',
    sustainability: 'Conventional viscose is problematic — linked to deforestation and toxic chemical discharge. Choose EcoVero or other responsible-source viscose. The industry is improving but has a way to go.'
  },
  modal: {
    water: 'Moderate — beech trees are rain-fed, but processing uses water.',
    pesticides: 'Low. Beech forests are generally managed without pesticides.',
    biodegradable: true,
    certifications: 'OEKO-TEX, Lenzing Modal (specifically from Austrian beech). TENCEL™ Modal by Lenzing is the benchmark.',
    allergens: 'Very low. Soft, smooth fiber is gentle on skin. Retains softness through washing. Suitable for sensitive skin.',
    sustainability: 'Better than conventional viscose. Lenzing Modal uses a partially closed-loop process. Beech wood is sustainably sourced. Carbon-neutral production at Lenzing\'s Austrian facility.'
  },
  cupro: {
    water: 'Moderate — uses cotton linter waste, reducing raw material impact.',
    pesticides: 'Indirect — depends on cotton cultivation practices for the linter source.',
    biodegradable: true,
    certifications: 'OEKO-TEX. Bemberg™ (by Asahi Kasei) is the main producer with their own sustainability standards.',
    allergens: 'Very low. Smooth, silky fiber is gentle on skin. Used in high-end linings where skin contact is prolonged.',
    sustainability: 'Uses cotton waste (linters) that would otherwise be discarded — good circular economy credentials. Bemberg\'s closed-loop process recovers copper and chemicals.'
  },
  alpaca: {
    water: 'Very low — alpacas graze on natural grasslands with minimal water needs.',
    pesticides: 'None. Alpacas are raised on natural pasture.',
    biodegradable: true,
    certifications: 'RAS (Responsible Alpaca Standard) is emerging. No widely adopted certification yet.',
    allergens: 'Low. Alpaca fiber contains no lanolin (unlike sheep\'s wool), making it suitable for people with lanolin sensitivity. The fiber can still cause mechanical irritation in very sensitive individuals due to its texture.',
    sustainability: 'Low environmental impact — alpacas have soft-padded feet (don\'t damage pasture), efficient grazers. Mainly raised in Peru. Concerns about overgrazing in some regions.'
  },
  mohair: {
    water: 'Low to moderate — Angora goats graze on semi-arid land.',
    pesticides: 'Minimal.',
    biodegradable: true,
    certifications: 'RMS (Responsible Mohair Standard). South Africa (main producer) has industry welfare standards.',
    allergens: 'Moderate. Similar to wool — the hairy fiber can cause mechanical irritation. True mohair allergy is rare. Kid mohair (from young goats) is finer and less irritating.',
    sustainability: 'Renewable and biodegradable. Animal welfare concerns led some brands to drop mohair — RMS addresses this. South African mohair is generally well-regarded.'
  },
  angora: {
    water: 'Low — rabbits require modest water.',
    pesticides: 'None.',
    biodegradable: true,
    certifications: 'No widely recognized certification. Some brands use their own auditing standards.',
    allergens: 'Moderate. The ultra-fine fibers can cause respiratory irritation (fiber shedding) and skin irritation. Not recommended for people with asthma or fiber sensitivity.',
    sustainability: 'Significant animal welfare concerns — live-plucking is common in some producing countries. Ethically sourced angora (from hand-combed, well-treated rabbits) exists but is rare and expensive. Many brands have stopped using angora entirely.'
  },
  cashmere: {
    water: 'Low — cashmere goats graze on arid grasslands.',
    pesticides: 'None.',
    biodegradable: true,
    certifications: 'Good Cashmere Standard (GCS), Sustainable Fibre Alliance (SFA), OEKO-TEX.',
    allergens: 'Low. Cashmere contains minimal lanolin and the fine fibers (≤19 microns) rarely cause irritation. One of the best luxury fibers for sensitive skin.',
    sustainability: 'Growing demand has led to overgrazing and desertification in Mongolia and China. Choose certified sources. Recycled cashmere is an excellent alternative — the fiber retains quality through recycling.'
  },
  camel: {
    water: 'Very low — camels are adapted to arid environments.',
    pesticides: 'None.',
    biodegradable: true,
    certifications: 'No widely recognized certification. Sourcing is generally small-scale and traditional.',
    allergens: 'Low. No lanolin. The fine undercoat is soft and generally well-tolerated. Similar to cashmere in skin comfort.',
    sustainability: 'Low environmental footprint — camels are well-adapted to harsh environments and don\'t overgraze. Fiber is harvested during natural molting. Limited supply keeps it a niche fiber.'
  },
  ramie: {
    water: 'Moderate — ramie is a perennial crop that needs some irrigation.',
    pesticides: 'Low. Ramie has natural pest resistance.',
    biodegradable: true,
    certifications: 'OEKO-TEX. No fiber-specific certifications widely available.',
    allergens: 'Very low. Similar to linen in allergen profile. Safe for sensitive skin.',
    sustainability: 'Perennial crop (doesn\'t need replanting), grows quickly. Chemical degumming process is the main environmental concern — enzyme-based processing is improving this.'
  },
  jute: {
    water: 'Moderate — jute grows in monsoon regions with natural rainfall.',
    pesticides: 'Low. Jute requires minimal pesticide input.',
    biodegradable: true,
    certifications: 'OEKO-TEX, IJO (International Jute Organization) standards.',
    allergens: 'Low to moderate. Coarse fiber can irritate skin with prolonged direct contact. Generally used for bags, upholstery, and crafts rather than garments worn against skin.',
    sustainability: 'Very sustainable — grows fast, enriches soil, sequesters carbon. Often called "the golden fiber." Processing is mostly mechanical. A genuinely eco-friendly choice for home décor and accessories.'
  },
  pina: {
    water: 'Very low — piña fiber is a byproduct of pineapple farming, requiring no additional irrigation.',
    pesticides: 'None for the fiber itself — the pineapple crop may use pesticides, but the leaf fiber is a waste product.',
    biodegradable: true,
    certifications: 'No widely recognized certifications specific to piña fiber.',
    allergens: 'Very low. No known allergens. Safe for sensitive skin.',
    sustainability: 'Exceptionally sustainable — uses agricultural waste (pineapple leaves) that would otherwise be burned or discarded. Labor-intensive hand processing supports rural livelihoods in the Philippines.'
  },
  kapok: {
    water: 'Very low — kapok trees grow wild or with minimal cultivation in tropical regions.',
    pesticides: 'None. Kapok trees require no pesticides or fertilizers.',
    biodegradable: true,
    certifications: 'No widely recognized certifications. Some OEKO-TEX certified kapok products exist.',
    allergens: 'Very low. Naturally hypoallergenic. The fiber is too fine for skin contact irritation and contains no known allergens.',
    sustainability: 'Highly sustainable — harvested from existing trees with no deforestation. No chemical processing required for fill use. The trees also provide habitat and carbon sequestration.'
  },
  nettle: {
    water: 'Low — stinging nettle thrives on rainfall alone, even in temperate climates.',
    pesticides: 'None. Nettle grows vigorously without any chemical inputs and is often considered a weed.',
    biodegradable: true,
    certifications: 'OEKO-TEX available for some nettle textiles. No fiber-specific certifications yet.',
    allergens: 'Low. The stinging hairs are destroyed during processing — finished nettle fabric does not sting. May feel rough against sensitive skin until softened by washing.',
    sustainability: 'One of the most sustainable textile crops. Grows on marginal land, enriches soil, requires no irrigation or pesticides. Supports biodiversity (food for butterflies). Processing is similar to linen — mechanical retting is preferred over chemical.'
  }
};


const WEIGHT_TECHNIQUES = {
  lightweight: [
    { cat: 'seams', name: 'French Seam' },
    { cat: 'hems', name: 'Rolled Hem' },
    { cat: 'fullness', name: 'Gathering' }
  ],
  medium: [
    { cat: 'shaping', name: 'Darts' },
    { cat: 'seams', name: 'Flat-Felled Seam' },
    { cat: 'hems', name: 'Double-Fold Hem' }
  ],
  heavy: [
    { cat: 'seams', name: 'Flat-Felled Seam' },
    { cat: 'edges', name: 'Bias Binding' },
    { cat: 'hems', name: 'Faced Hem' }
  ]
};


const BLEND_NOTES = {
  'cotton+linen': {
    why: "The most popular natural blend. Cotton softens linen's stiffness, linen adds strength and breathability.",
    care: "Machine washable. Will still wrinkle, but less than pure linen. Can handle high heat pressing.",
    sewing: "Behaves like a well-mannered linen — less fraying, more predictable drape. Universal needle works fine.",
    common: "55/45, 60/40, or 50/50 are most common. More cotton = softer, more linen = more breathable.",
    availability: "widely available"
  },
  'cotton+silk': {
    why: "Silk adds sheen and drape to cotton's structure. A good way to get silk's beauty with easier care.",
    care: "Depends on ratio — high cotton blends can be gently machine washed. High silk blends should be dry cleaned.",
    sewing: "Use a sharp needle. The silk content makes the fabric slightly more slippery than pure cotton.",
    common: "Usually 70/30 or 60/40 cotton/silk. The silk presence is subtle but elevates the fabric.",
    availability: "specialty"
  },
  'cotton+hemp': {
    why: "Hemp adds durability and eco credentials; cotton brings softness and familiarity.",
    care: "Machine washable. Softens faster than pure hemp. Handles heat well.",
    sewing: "Sews much like cotton with a slightly stiffer hand. Standard cotton needle and thread work well.",
    common: "55/45 hemp/cotton is common. The blend softens hemp's rough initial hand significantly.",
    availability: "widely available"
  },
  'cotton+bamboo': {
    why: "Bamboo adds silky softness and moisture wicking; cotton provides structure and durability.",
    care: "Machine washable on gentle. Less pilling than pure bamboo. Air dry to reduce shrinkage.",
    sewing: "More body than pure bamboo — less slippery. Use a ballpoint for knits, sharp for wovens.",
    common: "60/40 or 70/30 bamboo/cotton is typical in jersey fabrics.",
    availability: "widely available"
  },
  'wool+silk': {
    why: "A classic luxury blend. Silk adds drape, sheen, and reduces bulk; wool provides warmth and resilience.",
    care: "Dry clean recommended. Some blends can be carefully hand-washed in cool water.",
    sewing: "Handle like wool — universal or ballpoint needle. The silk makes it drape more fluidly. Press carefully.",
    common: "80/20 wool/silk is traditional for suiting. Silk adds just enough luster without losing wool's body.",
    availability: "widely available"
  },
  'wool+alpaca': {
    why: "Wool adds elasticity and memory that alpaca lacks; alpaca adds softness and warmth without weight.",
    care: "Dry clean or very careful hand wash. Less prone to felting than pure wool thanks to the alpaca content.",
    sewing: "Stay-tape stress points. The blend has more recovery than pure alpaca but still stretches over time.",
    common: "50/50 or 70/30 wool/alpaca. The alpaca softens the hand and adds warmth.",
    availability: "specialty"
  },
  'linen+silk': {
    why: "Silk tempers linen's stiffness and adds a subtle sheen. Linen gives structure and breathability.",
    care: "Dry clean for best results, though some lighter blends can be hand-washed.",
    sewing: "Use a Microtex/sharp needle. Less fray than pure linen. Press on medium heat with a cloth.",
    common: "Often 70/30 linen/silk. Beautiful for summer dresses and blouses.",
    availability: "specialty"
  },
  'silk+wool': {
    why: "Warmth with elegance. Wool provides insulation, silk adds lightweight sheen and smoothness.",
    care: "Dry clean. The silk content makes the blend more delicate than pure wool.",
    sewing: "Use a sharp needle, moderate tension. Press with a press cloth on medium heat.",
    common: "70/30 or 80/20 wool/silk for suiting and scarves.",
    availability: "widely available"
  },
  'hemp+linen': {
    why: "Two bast fibers with overlapping strengths. Hemp adds exceptional durability; linen brings refinement.",
    care: "Machine washable. Both fibers handle high heat. Will wrinkle — embrace it.",
    sewing: "Sharp/Microtex needle essential. Frays readily — finish seams with flat-felled or French seams.",
    common: "50/50 or 60/40 in either direction. The blend is extremely durable and breathable.",
    availability: "specialty"
  },
  'wool+mohair': {
    why: "Mohair adds luster, wrinkle resistance, and a beautiful halo; wool provides body and memory.",
    care: "Dry clean. Press on a velvet board to preserve the mohair's surface character.",
    sewing: "Mark seam lines carefully — the pile can obscure markings. Grade seams to reduce bulk.",
    common: "Often 60/40 or 70/30 wool/mohair for suiting and coating.",
    availability: "widely available"
  },
  // ── New pairings for regenerated + luxury fibers ──
  'cotton+tencel': {
    why: "Tencel adds silky drape and moisture management; cotton brings structure and familiarity. A top eco-friendly pairing.",
    care: "Machine wash cold on gentle. Tumble dry low. Less prone to wrinkling than pure cotton.",
    sewing: "Drapes more than pure cotton — use pattern weights instead of pins. Walking foot helps with slippery blends.",
    common: "60/40 or 50/50 in either direction. Very common in sustainable fashion and bedding.",
    availability: "widely available"
  },
  'cotton+viscose': {
    why: "Viscose adds drape and a softer hand; cotton keeps the fabric from being too limp. Affordable upgrade over pure cotton.",
    care: "Machine wash gentle, cool. High viscose blends shrink more — always pre-wash. Air dry preferred.",
    sewing: "More slippery than pure cotton. Use tissue paper under lightweight blends. Sharp needle, moderate tension.",
    common: "50/50 or 60/40 in either direction. Extremely common in ready-to-wear.",
    availability: "widely available"
  },
  'cotton+modal': {
    why: "Modal brings exceptional softness and color retention; cotton adds body and structure.",
    care: "Machine wash cold, tumble dry low. Less pilling than pure modal. Colors stay vibrant.",
    sewing: "Handle like cotton jersey if knit. Walking foot for woven blends. The modal makes it feel luxurious.",
    common: "50/50 is standard. Very popular for T-shirts, underwear, and loungewear knits.",
    availability: "widely available"
  },
  'silk+cupro': {
    why: "Cupro mimics silk's drape at a lower price point. Blending them splits the cost while keeping the luxury hand.",
    care: "Dry clean or hand wash cold. Both fibers are delicate — treat as you would pure silk.",
    sewing: "Very slippery — tissue paper essential. Use a Microtex needle (60/8–70/10) and silk thread.",
    common: "50/50 or as cupro lining with silk shell. Cupro is often used as a silk alternative in linings.",
    availability: "specialty"
  },
  'wool+cashmere': {
    why: "Cashmere adds extraordinary softness; wool provides durability and shape retention that cashmere lacks.",
    care: "Hand wash cold with wool detergent, or dry clean. Press through a cloth on low heat.",
    sewing: "Handle gently — cashmere fibers are delicate. Reduce presser foot pressure. Stay-tape seams.",
    common: "90/10 or 80/20 wool/cashmere is standard. Even 10% cashmere dramatically softens the blend.",
    availability: "widely available"
  },
  'cashmere+silk': {
    why: "The ultimate luxury pairing. Silk adds drape and sheen; cashmere adds warmth and softness.",
    care: "Dry clean only. Extremely delicate. Store folded in breathable bags with cedar.",
    sewing: "Use the finest Microtex needle (60/8). Silk thread only. Sew slowly with reduced tension.",
    common: "70/30 cashmere/silk is typical for scarves and lightweight knits.",
    availability: "specialty"
  },
  'wool+camel': {
    why: "Camel hair adds warmth-to-weight ratio and a distinctive golden color; wool provides structure and resilience.",
    care: "Dry clean recommended. Camel hair softens with each cleaning. Store folded, not hung.",
    sewing: "Handle like fine wool. Walking foot for coatings. Press with steam through a press cloth.",
    common: "50/50 or 70/30 wool/camel. Classic for overcoats and sport jackets.",
    availability: "specialty"
  },
  'tencel+linen': {
    why: "Tencel smooths linen's texture and reduces wrinkling; linen adds crispness and natural character.",
    care: "Machine wash cold on gentle. Less wrinkling than pure linen but still has relaxed character.",
    sewing: "Easier than pure linen — less fraying, more consistent drape. Standard sharp needle works well.",
    common: "50/50 or 60/40 tencel/linen. Growing in popularity for summer garments.",
    availability: "specialty"
  },
  'tencel+wool': {
    why: "Tencel adds moisture management and softness against skin; wool provides warmth and structure.",
    care: "Hand wash cold or dry clean. The tencel makes the blend feel less scratchy than pure wool.",
    sewing: "Walking foot recommended. The blend has more drape than pure wool — ease carefully.",
    common: "50/50 or 60/40 in either direction. Used in athleisure and performance wear.",
    availability: "specialty"
  },
  'viscose+linen': {
    why: "Viscose adds drape and reduces linen's stiffness; linen gives body and breathability.",
    care: "Machine wash gentle, cool. Pre-wash — both fibers shrink. Air dry for best results.",
    sewing: "Less fraying than pure linen but more slippery. Pin or weight carefully before cutting.",
    common: "50/50 or 60/40 viscose/linen. Very common in summer fashion.",
    availability: "widely available"
  },
  'alpaca+silk': {
    why: "Silk adds sheen and prevents alpaca's tendency to stretch; alpaca provides unmatched warmth.",
    care: "Hand wash cold or dry clean. Lay flat to dry — the blend will stretch if hung.",
    sewing: "Stay-tape all seams. Use a sharp needle and reduce presser foot pressure for the loft.",
    common: "80/20 or 70/30 alpaca/silk. Used for luxury scarves and light knits.",
    availability: "specialty"
  }
};


const CARE_EXTENDED = {
  cotton: {
    washing: {
      method: 'Machine wash',
      temp: 'Warm to hot (40–60°C / 105–140°F)',
      detergent: 'Standard liquid or powder; mild for colors',
      frequency: 'After every 1–2 wears for shirts; 3–5 for pants',
      tips: [
        { tip: 'Turn dark cottons inside out', detail: 'Reduces surface abrasion and fading from agitation against the drum.' },
        { tip: 'Wash whites separately at 60°C', detail: 'Cotton handles hot water well and high temps keep whites bright.' },
        { tip: 'Close zippers and buttons', detail: 'Prevents snagging on other garments — especially important for quilting cotton.' },
        { tip: 'Use a mesh bag for lightweight cotton', detail: 'Voile, lawn, and batiste can twist and tangle in a full load.' }
      ],
      avoid: 'Don\'t use chlorine bleach on colored cotton — it strips dye. Use oxygen bleach instead.'
    },
    drying: {
      method: 'Tumble dry low to medium',
      alternatives: ['Line dry in shade', 'Flat dry for knits'],
      tips: [
        { tip: 'Remove promptly from the dryer', detail: 'Cotton wrinkles set quickly as it cools. Shake out and fold or hang immediately.' },
        { tip: 'Dry similar weights together', detail: 'Mixing heavy canvas with lightweight voile means uneven drying and extra agitation on the lighter fabric.' },
        { tip: 'Avoid over-drying', detail: 'Damages the fibers over time, making cotton feel stiff and harsh. Remove when slightly damp for best hand.' }
      ],
      why: 'Cotton can handle tumble drying because its cellulose fibers are actually stronger when wet. But heat does cause shrinkage — if you machine dry, the fabric will shrink more in the first cycle.'
    },
    ironing: {
      temp: 'High (200°C / 400°F)',
      steam: true,
      pressCloth: false,
      tips: [
        { tip: 'Iron while slightly damp for best results', detail: 'Mist with a spray bottle or pull from the dryer before fully dry. Cotton presses crisp and smooth when damp.' },
        { tip: 'Use steam generously', detail: 'Cotton responds beautifully to steam — it relaxes the fibers and lets you press sharp creases or smooth flat surfaces.' },
        { tip: 'Press on the wrong side for dark colors', detail: 'Prevents iron shine that shows up as a lighter, flattened surface on dark fabrics.' }
      ]
    },
    colorCare: {
      colorfastness: 'Good — but always test new fabrics',
      tips: [
        { tip: 'Wash new cotton in cold water the first 2–3 times', detail: 'Excess dye bleeds out in the first few washes. Cold water slows the release and reduces transfer to other garments.' },
        { tip: 'Add ½ cup white vinegar to the first wash', detail: 'Helps set reactive dyes. Not a permanent fix, but reduces initial bleeding significantly.' },
        { tip: 'Avoid direct sunlight when drying', detail: 'UV breaks down dye molecules over time. Even on a clothesline, dry in the shade.' },
        { tip: 'Sort by color — always', detail: 'Cotton is a sponge. A single red sock will turn a white load pink.' }
      ]
    },
    shrinkage: {
      percent: '3–5%',
      prewash: 'Wash and dry using the same method you\'ll use for the finished garment.',
      tips: [
        { tip: 'Pre-wash before cutting — always', detail: 'Cotton shrinks most in its first wash. If you skip this step, your finished garment will be smaller after the first laundry.' },
        { tip: 'Hot wash + hot dry = maximum pre-shrinkage', detail: 'If you want to get all the shrinkage out up front, wash on hot and tumble dry on high for the first pre-wash.' },
        { tip: 'Knit cotton shrinks more than woven', detail: 'Jersey and interlock can shrink 5–8% because the loop structure compacts more than a flat weave.' }
      ],
      science: 'Cotton fibers swell when wet, and heat causes the yarn to relax from the tension applied during weaving or knitting. Once relaxed, the fabric is shorter and narrower.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Treat stains immediately', detail: 'Cotton absorbs quickly and deeply. Blot (don\'t rub) with cold water to prevent the stain from setting.' },
        { tip: 'Oil and grease: apply dish soap directly', detail: 'Dawn or similar — work it in gently, let sit 15 minutes, then wash warm. Repeat if needed before drying.' },
        { tip: 'Wine and berry: salt + cold water', detail: 'Pour salt on the wet stain to absorb the dye, then flush with cold water. Follow with an oxygen bleach soak if stain remains.' },
        { tip: 'Yellowing on whites: hydrogen peroxide soak', detail: 'Mix 1 cup 3% hydrogen peroxide per gallon of warm water. Soak 1–4 hours. Much gentler than chlorine bleach.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Cotton gets softer with washing', detail: 'Unlike synthetics that degrade, cotton fibers round off and relax with each wash cycle. Your cotton garments will feel better over time.' },
        { tip: 'Address pilling early', detail: 'Cotton pilling is mostly surface fiber that hasn\'t fully worn off. Use a fabric shaver or pumice stone gently.' },
        { tip: 'Repair small tears promptly', detail: 'Cotton frays once a tear starts. A patch or darning stitch early prevents a small hole from becoming unwearable.' },
        { tip: 'Store clean and dry', detail: 'Cotton is susceptible to mildew if stored damp. Make sure garments are fully dry before folding away.' }
      ],
      stripping: 'Cotton responds well to stripping. Use washing soda + borax + oxygen bleach in hot water (no detergent). Soak 4–6 hours, stirring occasionally. This removes detergent buildup, body oils, and mineral deposits. Rinse thoroughly and dry as normal.'
    }
  },
  linen: {
    washing: {
      method: 'Machine wash or hand wash',
      temp: 'Warm (40°C / 105°F); hot OK for undyed',
      detergent: 'Mild liquid detergent; no fabric softener',
      frequency: 'Can wear 2–3 times between washes; linen resists odor',
      tips: [
        { tip: 'Use a gentle cycle', detail: 'Linen is strong but stiff fibers can crack at fold lines if heavily agitated in a normal cycle.' },
        { tip: 'Don\'t overload the machine', detail: 'Linen needs room to move freely in water. Crowded loads create permanent creases.' },
        { tip: 'Skip the fabric softener', detail: 'Softener coats the fibers and actually reduces linen\'s natural moisture-wicking. The fabric softens on its own with washing.' },
        { tip: 'Wash with like colors', detail: 'Undyed linen can pick up color from dark garments — it absorbs readily.' }
      ],
      avoid: 'Never use chlorine bleach — it weakens linen fibers. Use oxygen bleach for whitening.'
    },
    drying: {
      method: 'Line dry preferred',
      alternatives: ['Low tumble dry', 'Flat dry to avoid stretching'],
      tips: [
        { tip: 'Remove from washer immediately', detail: 'Linen wrinkles set deeply if left sitting damp in a heap. Shake out and hang right away.' },
        { tip: 'Hang to dry in shade', detail: 'Sun bleaching works great for white linen but will fade colored linen over time.' },
        { tip: 'For less wrinkling: dry flat', detail: 'Lay flat on a towel if you want to minimize wrinkles, though some wrinkling is part of linen\'s character.' }
      ],
      why: 'Linen has low elasticity — once fibers are bent wet and set dry in that position, the crease becomes almost permanent. Line drying under gentle tension keeps the fabric smoother than tumble drying.'
    },
    ironing: {
      temp: 'High (230°C / 445°F)',
      steam: true,
      pressCloth: false,
      tips: [
        { tip: 'Iron while still damp — this is key', detail: 'Linen that\'s fully dry is almost impossible to press smooth. Mist heavily or iron right out of the wash.' },
        { tip: 'Use maximum steam', detail: 'Linen loves water and heat. Steam penetrates the stiff fibers and lets them relax flat.' },
        { tip: 'Press on the wrong side for a matte finish', detail: 'Right-side pressing creates a slight sheen that some find attractive but others don\'t want.' },
        { tip: 'Embrace the wrinkles', detail: 'Linen is supposed to wrinkle. A slightly rumpled look is part of its charm — only press what needs to be crisp (collars, plackets).' }
      ]
    },
    colorCare: {
      colorfastness: 'Good once set — but test new fabrics',
      tips: [
        { tip: 'Expect color softening over time', detail: 'Linen dyes mellow with washing — this is considered desirable, like aging on leather.' },
        { tip: 'White linen can be sun-bleached', detail: 'Lay wet white linen in direct sunlight. The UV + moisture creates a natural bleaching effect used for centuries.' },
        { tip: 'Avoid chlorine on colored linen', detail: 'It strips dye unevenly. Stick to oxygen bleach if brightening is needed.' }
      ]
    },
    shrinkage: {
      percent: '5–10%',
      prewash: 'Pre-wash twice before cutting — linen has the highest shrinkage of common natural fibers.',
      tips: [
        { tip: 'Wash and dry twice before cutting', detail: 'Most shrinkage happens in the first wash, but linen often has residual shrinkage in the second. Two cycles gets almost all of it out.' },
        { tip: 'Dry the same way you\'ll dry the garment', detail: 'If you plan to line dry, pre-shrink by line drying. Tumble drying causes more shrinkage than air drying.' },
        { tip: 'Buy extra yardage', detail: 'With up to 10% shrinkage, buy at least 15% more fabric than your pattern requires.' }
      ],
      science: 'Linen fibers are long and rigid. During weaving, they\'re held under tension. When that tension is released by water and agitation, the fabric contracts significantly — especially in length.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Act fast — linen absorbs deeply', detail: 'Linen is one of the most absorbent natural fibers. A stain that sits will be much harder to remove.' },
        { tip: 'Club soda for fresh wine stains', detail: 'Pour immediately, blot with a clean cloth. The carbonation helps lift the tannins out of the fibers.' },
        { tip: 'Lemon juice + sun for stubborn stains on white linen', detail: 'Apply lemon juice to the stain, lay in direct sunlight for 1–2 hours. The combination bleaches naturally.' },
        { tip: 'Avoid hot water on protein stains', detail: 'Blood, egg, milk — use cold water first. Hot water cooks protein stains into the fiber permanently.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Linen lasts decades with basic care', detail: 'It\'s one of the most durable natural fibers. Archaeological finds include linen textiles thousands of years old.' },
        { tip: 'Roll rather than fold for storage', detail: 'Linen develops permanent creases at fold lines over time. Rolling prevents this.' },
        { tip: 'It gets better with age', detail: 'New linen feels stiff and board-like. After 3–5 washes, it transforms into a soft, flowing fabric with beautiful drape.' },
        { tip: 'No moths, no mildew problems', detail: 'Linen is a plant fiber — moths aren\'t interested, and it resists mildew better than cotton.' }
      ],
      stripping: 'Linen strips beautifully. Hot water + washing soda + oxygen bleach. Soak 4–6 hours. Particularly effective for vintage or thrifted linen that has yellowed from age or detergent buildup.'
    }
  },
  silk: {
    washing: {
      method: 'Hand wash or dry clean',
      temp: 'Cold (30°C / 85°F) — never hot',
      detergent: 'Silk-specific detergent or very mild pH-neutral soap',
      frequency: 'After every 2–3 wears; air between wears',
      tips: [
        { tip: 'Swish gently — never wring or twist', detail: 'Silk fibers are weakest when wet. Agitation breaks the long protein chains that give silk its strength and sheen.' },
        { tip: 'Test wash a swatch first', detail: 'Some silks (dupioni, taffeta) change texture dramatically when washed — they lose crispness and become softer.' },
        { tip: 'Use cool water only', detail: 'Hot water causes silk to shrink, lose luster, and can permanently dull the surface.' },
        { tip: 'Add a splash of white vinegar to the rinse', detail: 'Restores pH and helps maintain silk\'s natural luster. About 1 tablespoon per basin of water.' }
      ],
      avoid: 'Never use bleach, enzyme-based detergents, or alkaline soaps. They dissolve silk protein.'
    },
    drying: {
      method: 'Lay flat or hang to dry',
      alternatives: ['Roll in a towel to remove excess water'],
      tips: [
        { tip: 'Never tumble dry silk', detail: 'The heat and tumbling action will damage the fiber structure, cause shrinkage, and dull the sheen permanently.' },
        { tip: 'Roll in a clean towel first', detail: 'Lay the silk garment on a towel, roll up together, and press gently to absorb excess water. Then lay flat to finish drying.' },
        { tip: 'Keep out of direct sunlight', detail: 'UV light degrades silk protein and causes yellowing. Always dry in shade.' },
        { tip: 'Don\'t hang heavy silk pieces', detail: 'Wet silk stretches under its own weight. Lay flat for dresses and wide garments; hang only lightweight scarves and blouses.' }
      ],
      why: 'Silk is a protein fiber (like hair) and is 20% weaker when wet. Mechanical stress from tumbling or wringing breaks the long fibroin chains, and heat denatures the protein — like cooking an egg.'
    },
    ironing: {
      temp: 'Low (150°C / 300°F)',
      steam: false,
      pressCloth: true,
      tips: [
        { tip: 'Always use a press cloth', detail: 'Direct iron contact can leave permanent shine marks or scorch silk. Use a piece of white cotton or muslin between the iron and the silk.' },
        { tip: 'No water or steam directly on silk', detail: 'Water drops leave permanent marks on many silks. If you need moisture, steam from a distance or use a dry iron over a damp press cloth.' },
        { tip: 'Press on the wrong side', detail: 'Reduces the risk of shine and protects any surface texture or print.' },
        { tip: 'Iron while slightly damp', detail: 'If you pulled the silk from washing, iron before fully dry. If it\'s already dry, use a damp press cloth — never mist the silk directly.' }
      ]
    },
    colorCare: {
      colorfastness: 'Varies widely — always test',
      tips: [
        { tip: 'Test for colorfastness before washing', detail: 'Wet a hidden corner and press with a white cloth. If color transfers, dry clean only.' },
        { tip: 'Perspiration stains are permanent if left', detail: 'Body chemistry can bleach or yellow silk permanently. Wash or blot after each wear in areas of perspiration.' },
        { tip: 'Perfume and deodorant damage silk', detail: 'The alcohol in perfume and the chemicals in deodorant break down silk fibers and cause discoloration. Apply these before dressing, not after.' },
        { tip: 'Store away from light', detail: 'Even indoor light can yellow silk over months. Use breathable fabric covers, not plastic.' }
      ]
    },
    shrinkage: {
      percent: '2–5%',
      prewash: 'Test-wash a swatch. If you plan to hand wash the finished garment, pre-wash the yardage the same way.',
      tips: [
        { tip: 'Shrinkage varies by weave', detail: 'Charmeuse and crepe de chine shrink more than habotai. Always test a swatch.' },
        { tip: 'Some silks are meant to be dry-cleaned only', detail: 'Structured silks (dupioni, shantung, taffeta) lose their crispness when washed. If you want the crisp texture, plan for dry cleaning.' },
        { tip: 'Washed silk has a different hand', detail: 'Charmeuse becomes softer and more fluid after washing. Some sewists prefer this — but you need to decide before cutting.' }
      ],
      science: 'Silk shrinks because the twisted sericin coating relaxes in water. Once removed, the underlying fibroin fiber contracts. Dry cleaning avoids this because the solvent doesn\'t dissolve sericin the way water does.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Blot immediately with cold water', detail: 'Don\'t rub — silk fibers rough up easily, creating a lighter spot that\'s as visible as the stain.' },
        { tip: 'Oil stains: cornstarch or talcum powder', detail: 'Sprinkle on the stain, let sit overnight to absorb the oil, brush off gently. Repeat if needed.' },
        { tip: 'Take serious stains to a dry cleaner', detail: 'Home remedies risk permanent damage to silk. Professional cleaning is safer for valuable pieces.' },
        { tip: 'Water marks: dampen the entire panel evenly', detail: 'If water spots form, re-dampen the whole section uniformly and let dry flat. This blends the mark away.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Air out between wears', detail: 'Hang in a well-ventilated area (not in sunlight) for a day before returning to the closet. This prevents odor buildup and reduces washing frequency.' },
        { tip: 'Store in breathable fabric bags', detail: 'Never use plastic — it traps moisture and causes yellowing. Muslin garment bags are ideal.' },
        { tip: 'Cedar and lavender for moth protection', detail: 'Silk is a protein fiber and moths will eat it. Use cedar blocks or lavender sachets in your storage area.' },
        { tip: 'Avoid wearing silk with rough jewelry', detail: 'Watches, bracelets, and rough rings catch and pull silk fibers, creating permanent snags.' }
      ],
      stripping: 'Do not strip silk. The harsh chemicals and hot water required for stripping will destroy silk fibers. If silk feels stiff from product buildup, soak gently in cool water with a few drops of hair conditioner for 15 minutes, then rinse.'
    }
  },
  wool: {
    washing: {
      method: 'Hand wash or dry clean; superwash merino can be machine washed',
      temp: 'Cold (30°C / 85°F) — never warm or hot',
      detergent: 'Wool-specific detergent (Eucalan, Soak) or baby shampoo',
      frequency: 'Rarely — every 5–10 wears; air between wears',
      tips: [
        { tip: 'Never agitate wool in water', detail: 'Agitation + heat + water = felting. Felt is permanent — the fiber scales lock together and will never come apart.' },
        { tip: 'Soak, don\'t scrub', detail: 'Submerge in cool water with detergent, let sit 15–20 minutes, then gently squeeze. No twisting.' },
        { tip: 'Superwash merino is the exception', detail: 'Chemically treated to resist felting. Can be machine washed on gentle in cool water — check the label.' },
        { tip: 'Rinse at the same temperature', detail: 'Temperature shock (warm wash, cold rinse) causes felting. Keep all water the same temperature.' }
      ],
      avoid: 'Never use hot water, enzyme detergents, or chlorine bleach. All three damage wool protein.'
    },
    drying: {
      method: 'Lay flat to dry — always',
      alternatives: ['Roll in a towel to remove water first'],
      tips: [
        { tip: 'Never tumble dry wool', detail: 'The combination of heat, moisture, and tumbling will felt wool irreversibly.' },
        { tip: 'Reshape while damp', detail: 'Block the garment to its correct dimensions while still wet. Wool has a "memory" and will hold the shape it dries in.' },
        { tip: 'Dry on a mesh rack or towel', detail: 'Air circulation underneath speeds drying and prevents musty smell. Flip the garment halfway through.' },
        { tip: 'Never hang wet wool', detail: 'The weight of the water will stretch wool out of shape. Always dry flat.' }
      ],
      why: 'Wool\'s cuticle scales open when wet and interlock when compressed — this is felting. Tumble drying provides all three conditions for felting: water, heat, and mechanical agitation.'
    },
    ironing: {
      temp: 'Medium (150°C / 300°F)',
      steam: true,
      pressCloth: true,
      tips: [
        { tip: 'Always use a press cloth', detail: 'Direct iron contact creates permanent shine on wool by flattening the fiber scales.' },
        { tip: 'Steam from a distance for light refreshing', detail: 'Hold the iron 2 inches above the fabric and let steam penetrate. Good for removing wrinkles without pressing.' },
        { tip: 'Let cool flat after pressing', detail: 'Wool needs to cool in position to hold its shape. If you move it while still warm and moist, the wrinkles come back.' },
        { tip: 'Use a clapper for tailoring', detail: 'A wooden pressing block traps steam and sets creases crisply — essential for wool tailoring.' }
      ]
    },
    colorCare: {
      colorfastness: 'Generally good — wool takes dye deeply',
      tips: [
        { tip: 'Dark wools may bleed in the first wash', detail: 'Particularly black, navy, and deep red. Wash alone first time and check the water.' },
        { tip: 'Never bleach wool', detail: 'Chlorine dissolves wool. Oxygen bleach is also too harsh. Spot treat only.' },
        { tip: 'Sun exposure fades wool gradually', detail: 'Don\'t dry or store wool in direct light. UV breaks down both the dye and the fiber.' }
      ]
    },
    shrinkage: {
      percent: 'Felts rather than shrinks — can lose 30–50% of size',
      prewash: 'Do NOT pre-wash wool. Steam press or have professionally sponged instead.',
      tips: [
        { tip: 'Felting is not the same as shrinkage', detail: 'Cotton shrinks and can be stretched back. Wool felts — the fibers lock together permanently. There is no un-felting.' },
        { tip: 'Steam press before cutting', detail: 'Hold a steam iron above the fabric (don\'t touch) to relax the fibers. This removes manufacturing tension without risking felting.' },
        { tip: 'Professional sponging is safest', detail: 'A professional presser will steam-press your yardage evenly. Worth the cost for expensive woolens.' }
      ],
      science: 'Wool fibers have overlapping cuticle scales (like roof shingles). When wet, the scales open. Agitation pushes fibers together and the scales interlock — permanently. This is felting, and it\'s irreversible.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Blot gently with cool water', detail: 'Never rub — you\'ll felt the surface fibers and create a rough, lighter patch.' },
        { tip: 'Spot clean with wool detergent', detail: 'Apply a tiny amount of wool wash to the stain, work gently with fingertips, rinse cool.' },
        { tip: 'Let mud dry first', detail: 'Brush off dried mud with a soft brush. Trying to wash wet mud pushes it deeper into the fibers.' },
        { tip: 'Professional dry cleaning for serious stains', detail: 'Wool is too easy to damage with aggressive home treatments. Let a professional handle wine, oil, or ink stains.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Fold, don\'t hang heavy woolens', detail: 'Hanging stretches shoulders and distorts the shape over time. Fold sweaters and knits; hang only structured jackets and coats.' },
        { tip: 'Moth prevention is essential', detail: 'Moths eat wool. Use cedar blocks, lavender sachets, or mothballs (in breathable bags). Inspect stored woolens regularly.' },
        { tip: 'Pill removal', detail: 'Pilling is normal for wool. Use a fabric comb or electric pill remover — never pull pills off by hand, as it pulls out more fiber.' },
        { tip: 'Rest between wears', detail: 'Give wool garments at least 24 hours between wears. The fiber is elastic and needs time to spring back to shape.' },
        { tip: 'Season-end storage: clean first', detail: 'Moths are attracted to body oils and food residue, not clean wool. Always clean before storing for the season.' }
      ],
      stripping: 'Do not strip wool. Hot water and soaking will felt it. If wool feels stiff from product buildup, rinse gently in cool water with a splash of white vinegar (1 tbsp per quart), then lay flat to dry.'
    }
  },
  hemp: {
    washing: {
      method: 'Machine wash',
      temp: 'Warm (40°C / 105°F)',
      detergent: 'Standard liquid detergent',
      frequency: 'Every 2–3 wears; hemp resists odor well',
      tips: [
        { tip: 'Machine wash is fine — hemp is tough', detail: 'One of the strongest natural fibers. It handles machine washing without special treatment.' },
        { tip: 'Gets softer with every wash', detail: 'New hemp feels scratchy and stiff. After 3–5 washes, it transforms into a soft, comfortable fabric.' },
        { tip: 'Skip the softener', detail: 'Like linen, hemp softens naturally through washing. Fabric softener coats the fibers and reduces absorbency.' }
      ],
      avoid: 'Avoid chlorine bleach — it weakens plant fibers. Oxygen bleach is safe.'
    },
    drying: {
      method: 'Tumble dry low or line dry',
      alternatives: ['Line dry in shade'],
      tips: [
        { tip: 'Either method works', detail: 'Hemp is durable enough for tumble drying but line drying saves energy and is gentler.' },
        { tip: 'Expect wrinkles', detail: 'Hemp wrinkles like linen. Remove promptly from dryer or hang to dry under gentle tension.' }
      ],
      why: 'Hemp fibers are structurally similar to linen — strong, low elasticity, and prone to wrinkling. They handle heat well because cellulose fibers tolerate high temperatures.'
    },
    ironing: {
      temp: 'High (200°C / 400°F)',
      steam: true,
      pressCloth: false,
      tips: [
        { tip: 'Iron damp with high steam', detail: 'Same approach as linen — hemp responds best to heat and moisture.' },
        { tip: 'High heat is safe', detail: 'Hemp tolerates the hottest iron settings. Don\'t hold back.' }
      ]
    },
    colorCare: {
      colorfastness: 'Good — hemp takes natural dyes particularly well',
      tips: [
        { tip: 'Natural hemp color ages beautifully', detail: 'Undyed hemp starts as a warm tan and lightens to a soft cream with washing and sun exposure.' },
        { tip: 'Dyed hemp may soften in color', detail: 'Like linen, expect gradual color mellowing — part of the fabric\'s character.' }
      ]
    },
    shrinkage: {
      percent: '5–8%',
      prewash: 'Pre-wash at least once. Can shrink as much as linen on first wash.',
      tips: [
        { tip: 'Pre-wash before cutting', detail: 'Hemp shrinks 5–8% on first wash. Pre-wash in the same way you\'ll care for the finished garment.' },
        { tip: 'Behaves like linen', detail: 'Same fiber family (bast fibers), similar shrinkage behavior. Pre-wash twice for maximum pre-shrinking.' }
      ],
      science: 'Like linen, hemp is a bast fiber held under tension during weaving. Water releases that tension and the fabric contracts. Additional shrinkage occurs from heat in drying.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Treat like cotton or linen', detail: 'Same approaches work — cold water for protein stains, dish soap for grease, oxygen bleach for stubborn marks.' },
        { tip: 'Hemp\'s natural antimicrobial properties help', detail: 'The fiber resists bacterial growth, which means odor stains are less common than with cotton.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'One of the most durable fibers available', detail: 'Hemp fabric can last decades. It gets stronger when wet and resists mildew, UV, and abrasion.' },
        { tip: 'Naturally mildew and moth resistant', detail: 'Unlike cotton (mildew risk) and wool (moth risk), hemp handles storage with no special precautions.' },
        { tip: 'It truly gets better with age', detail: 'The stiff, rough hand of new hemp transforms into something soft and draping after repeated washing. Don\'t give up on it after the first wear.' }
      ],
      stripping: 'Hemp strips well — same method as cotton and linen. Hot water + washing soda + oxygen bleach, soak 4–6 hours. The fiber is tough enough to handle it.'
    }
  },
  bamboo: {
    washing: {
      method: 'Machine wash on gentle',
      temp: 'Cold to warm (30–40°C / 85–105°F)',
      detergent: 'Mild liquid detergent',
      frequency: 'After every 1–2 wears',
      tips: [
        { tip: 'Use a gentle/delicate cycle', detail: 'Bamboo viscose fibers are weaker when wet and can pill or break with aggressive agitation.' },
        { tip: 'Wash inside out', detail: 'Reduces surface pilling, which is bamboo\'s main weakness.' },
        { tip: 'Cold water preserves softness', detail: 'Hot water causes bamboo to shrink and can roughen the hand over time.' }
      ],
      avoid: 'No bleach of any kind. No fabric softener — bamboo is already naturally soft.'
    },
    drying: {
      method: 'Air dry preferred',
      alternatives: ['Tumble dry on low with no heat'],
      tips: [
        { tip: 'Air dry for best results', detail: 'Heat in the dryer causes bamboo to shrink and can roughen the surface. Lay flat or hang to dry.' },
        { tip: 'If tumble drying, use no heat', detail: 'The tumbling action alone with cool air is sufficient. Remove immediately when done.' },
        { tip: 'Don\'t wring out', detail: 'Bamboo viscose is weak when wet. Squeeze gently or roll in a towel to remove excess water.' }
      ],
      why: 'Bamboo viscose is a regenerated cellulose fiber — dissolved and reformed into filaments. This process creates a very soft but structurally weaker fiber than natural cellulose like cotton.'
    },
    ironing: {
      temp: 'Medium-low (150°C / 300°F)',
      steam: true,
      pressCloth: false,
      tips: [
        { tip: 'Use medium-low heat', detail: 'Bamboo can scorch at high temperatures. Start low and increase if needed.' },
        { tip: 'Steam is fine', detail: 'Helps remove wrinkles without needing higher heat.' },
        { tip: 'Usually doesn\'t need much ironing', detail: 'Bamboo has decent wrinkle resistance compared to cotton and linen.' }
      ]
    },
    colorCare: {
      colorfastness: 'Generally good — bamboo takes dye well',
      tips: [
        { tip: 'Wash in cold water to preserve color', detail: 'Colors stay vibrant longer with cold water washing.' },
        { tip: 'Avoid sun-drying for long periods', detail: 'UV can fade bamboo over time, especially dark colors.' }
      ]
    },
    shrinkage: {
      percent: '4–6%',
      prewash: 'Pre-wash on gentle cold before cutting.',
      tips: [
        { tip: 'Shrinks with heat', detail: 'Keep water and dryer temperatures low. Most shrinkage happens from heat, not water alone.' },
        { tip: 'Pre-wash on gentle cold', detail: 'Gets out initial shrinkage without damaging the soft hand.' }
      ],
      science: 'Bamboo viscose is regenerated cellulose — it swells when wet and contracts when dried. Heat accelerates this contraction. Unlike natural bast fibers, the shrinkage is primarily heat-driven.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Blot immediately with cold water', detail: 'Bamboo is very absorbent — stains set quickly if left.' },
        { tip: 'Gentle spot cleaning only', detail: 'Avoid scrubbing, which can pill or damage the surface. Use a soft cloth with mild detergent.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Pilling is the main concern', detail: 'Bamboo pills more than cotton. Use a fabric shaver regularly to keep garments looking fresh.' },
        { tip: 'Naturally antibacterial', detail: 'Bamboo resists odor buildup, so you can wear it multiple times between washes — but pilling concerns may override this.' },
        { tip: 'Shorter lifespan than cotton or linen', detail: 'Bamboo viscose is softer but less durable. Expect 2–3 years of regular wear rather than the decades you\'d get from linen.' }
      ],
      stripping: 'Bamboo can be stripped gently. Use cool water with oxygen bleach only (no washing soda — too alkaline for regenerated cellulose). Soak 2–3 hours maximum. Handle gently when wet.'
    }
  },
  ramie: {
    washing: {
      method: 'Machine wash on gentle or hand wash',
      temp: 'Warm (40°C / 105°F)',
      detergent: 'Mild liquid detergent',
      frequency: 'Every 2–3 wears',
      tips: [
        { tip: 'Similar care to linen', detail: 'Ramie is a bast fiber like linen and hemp. Same general care approach.' },
        { tip: 'Gentle cycle recommended', detail: 'Ramie is strong but brittle — the fibers can crack at fold lines with aggressive agitation.' },
        { tip: 'Avoid repeated bending at the same spot', detail: 'Unlike linen, ramie doesn\'t flex well. Permanent creases can weaken the fiber.' }
      ],
      avoid: 'Avoid chlorine bleach. Ramie is stiffer than linen and more prone to cracking at crease lines.'
    },
    drying: {
      method: 'Line dry or flat dry',
      alternatives: ['Low tumble dry'],
      tips: [
        { tip: 'Line dry preferred', detail: 'Gentle drying preserves the fiber better than tumble drying.' },
        { tip: 'Shake out before drying', detail: 'Helps prevent wrinkles from setting in the stiff fibers.' }
      ],
      why: 'Ramie fibers are even stiffer than linen. They can crack when repeatedly bent, so gentle handling during drying extends fabric life.'
    },
    ironing: {
      temp: 'High (200°C / 400°F)',
      steam: true,
      pressCloth: false,
      tips: [
        { tip: 'Iron damp, just like linen', detail: 'Ramie responds best to heat and moisture. Press while still damp from washing.' },
        { tip: 'High heat is safe', detail: 'Ramie tolerates maximum iron temperature.' }
      ]
    },
    colorCare: {
      colorfastness: 'Good — similar to linen',
      tips: [
        { tip: 'Similar behavior to linen', detail: 'Colors mellow with washing. Undyed ramie is naturally white.' }
      ]
    },
    shrinkage: {
      percent: '3–5%',
      prewash: 'Pre-wash before cutting. Shrinks less than linen.',
      tips: [
        { tip: 'Less shrinkage than linen', detail: 'Ramie is naturally more dimensionally stable than linen, but still pre-wash as insurance.' }
      ],
      science: 'Ramie fibers are long and smooth with less twist than linen, giving them less potential to contract during washing.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Treat like linen', detail: 'Same stain removal approaches work — cold water for protein stains, oxygen bleach for tough marks.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Very durable — resists insects and mildew', detail: 'Ramie is naturally resistant to bacterial and fungal growth.' },
        { tip: 'Stiff hand never fully softens', detail: 'Unlike linen, ramie stays relatively stiff even after many washes. This is a characteristic of the fiber, not a defect.' },
        { tip: 'Prone to cracking at fold lines', detail: 'Avoid storing with sharp creases. Roll rather than fold for long-term storage.' }
      ],
      stripping: 'Ramie can be stripped like linen. Same hot-soak method with washing soda and oxygen bleach. Handle carefully — wet ramie can crack if bent sharply.'
    }
  },
  cashmere: {
    washing: {
      method: 'Hand wash or dry clean',
      temp: 'Cold (below 30°C / 85°F)',
      detergent: 'Cashmere-specific wash or baby shampoo',
      frequency: 'Every 5–7 wears; air between wears',
      tips: [
        { tip: 'Hand wash is gentler than dry cleaning', detail: 'Contrary to popular belief, quality cashmere responds well to hand washing. Dry cleaning chemicals can strip natural oils over time.' },
        { tip: 'Soak — don\'t agitate', detail: 'Submerge in cool water with detergent for 10–15 minutes. Gently press and squeeze. Never rub or twist.' },
        { tip: 'Use lukewarm water for rinse', detail: 'Same temperature as the wash water. Temperature changes shock the fibers and can cause felting.' }
      ],
      avoid: 'Never machine wash (even on delicate), use hot water, or wring. Cashmere felts even more readily than wool.'
    },
    drying: {
      method: 'Lay flat — always',
      alternatives: ['Roll in towel first'],
      tips: [
        { tip: 'Flat dry on a mesh rack', detail: 'Reshape to original dimensions while damp. Cashmere stretches when wet and holds whatever shape it dries in.' },
        { tip: 'Never hang cashmere', detail: 'It will stretch out of shape permanently. Even dry cashmere should be stored folded, not hung.' },
        { tip: 'Keep away from heat sources', detail: 'No radiators, no direct sunlight, no hair dryers. Air dry at room temperature.' }
      ],
      why: 'Cashmere fibers are extremely fine (14–19 microns) and lack the structural strength of regular wool. They stretch easily when wet and are very vulnerable to heat-induced felting.'
    },
    ironing: {
      temp: 'Low (110–130°C / 230–265°F)',
      steam: true,
      pressCloth: true,
      tips: [
        { tip: 'Steam rather than press', detail: 'Hold the iron above the fabric and let steam relax wrinkles. Direct pressing can flatten cashmere\'s characteristic softness.' },
        { tip: 'Use a press cloth if you must press', detail: 'Cashmere scorches easily and shows iron marks.' },
        { tip: 'Often doesn\'t need ironing', detail: 'Cashmere naturally resists wrinkles. A gentle steam or hanging in a steamy bathroom may be enough.' }
      ]
    },
    colorCare: {
      colorfastness: 'Good — cashmere takes dye well',
      tips: [
        { tip: 'Wash similar colors together', detail: 'Or wash each piece individually. Not worth the risk of color transfer on expensive cashmere.' },
        { tip: 'Fades gradually with sun exposure', detail: 'Store away from light. Use breathable dust bags.' }
      ]
    },
    shrinkage: {
      percent: 'Felts easily — up to 40% reduction',
      prewash: 'Do NOT pre-wash cashmere. Steam press only.',
      tips: [
        { tip: 'Even more delicate than regular wool', detail: 'The fine fibers felt faster. All the wool felting precautions apply, but with less room for error.' },
        { tip: 'Steam press before cutting', detail: 'Hold iron above the fabric, never touch. Let the steam relax the fibers.' }
      ],
      science: 'Cashmere fibers are the finest animal fibers commonly used in textiles. Their tiny diameter means more surface area per unit weight, which makes them felt faster than thicker wool fibers.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Blot gently with cold water', detail: 'Never rub. Cashmere surface fibers felt with friction even when dry.' },
        { tip: 'Spot treat with cashmere wash', detail: 'Apply a drop of cashmere-specific detergent to the stain, press gently, rinse cool.' },
        { tip: 'Professional cleaning for tough stains', detail: 'Cashmere is expensive — don\'t risk it with aggressive home treatments.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Pilling is normal and manageable', detail: 'Cashmere pills in the first few wears as loose surface fibers work free. Use a cashmere comb (not a shaver) to gently remove pills.' },
        { tip: 'Fold, never hang', detail: 'Cashmere stretches at the shoulders when hung. Always fold and store flat.' },
        { tip: 'Cedar and lavender for moth protection', detail: 'Moths love cashmere even more than regular wool. Cedar blocks or lavender sachets in your storage area.' },
        { tip: 'Rest between wears', detail: 'Give cashmere 2–3 days between wears to bounce back to shape.' }
      ],
      stripping: 'Do not strip cashmere. The combination of hot water and agitation will destroy it. If cashmere feels stiff from product buildup, hand wash gently in cool water with a tiny amount of hair conditioner.'
    }
  },
  alpaca: {
    washing: {
      method: 'Hand wash or dry clean',
      temp: 'Cold (below 30°C / 85°F)',
      detergent: 'Wool/cashmere detergent or mild shampoo',
      frequency: 'Every 6–10 wears; alpaca naturally resists odor',
      tips: [
        { tip: 'Alpaca resists odor remarkably well', detail: 'The hollow fiber structure doesn\'t trap bacteria. You can wear alpaca many times between washes.' },
        { tip: 'Soak gently in cool water', detail: 'Same approach as wool — submerge, soak 15 minutes, gently squeeze. No agitation.' },
        { tip: 'Alpaca doesn\'t felt as easily as wool', detail: 'It has smoother scales, so it\'s slightly more forgiving — but still avoid heat and agitation.' }
      ],
      avoid: 'Avoid hot water, wringing, and machine washing. While more resistant to felting than wool, alpaca can still be damaged.'
    },
    drying: {
      method: 'Lay flat to dry',
      alternatives: ['Roll in towel first'],
      tips: [
        { tip: 'Always flat dry', detail: 'Alpaca is heavier than wool and stretches significantly when hung wet.' },
        { tip: 'Reshape while damp', detail: 'Block to original dimensions. Alpaca has less elasticity than wool — it doesn\'t spring back on its own.' },
        { tip: 'Dry away from heat', detail: 'No radiators, no direct sun. Room temperature air drying only.' }
      ],
      why: 'Alpaca fiber has less natural elasticity than wool. Where wool springs back, alpaca tends to stay stretched. Flat drying preserves the garment\'s original dimensions.'
    },
    ironing: {
      temp: 'Low to medium (130–150°C / 265–300°F)',
      steam: true,
      pressCloth: true,
      tips: [
        { tip: 'Steam preferred over pressing', detail: 'Steam wrinkles out from a distance. Direct pressing can flatten alpaca\'s loft.' },
        { tip: 'Use a press cloth', detail: 'Protects the surface from direct heat and prevents shine marks.' }
      ]
    },
    colorCare: {
      colorfastness: 'Excellent — alpaca comes in 22+ natural shades',
      tips: [
        { tip: 'Natural colors never fade', detail: 'Undyed alpaca ranges from white to fawn to charcoal to black. These natural shades are permanent.' },
        { tip: 'Dyed alpaca holds color well', detail: 'The fiber takes dye deeply. Normal care precautions apply.' }
      ]
    },
    shrinkage: {
      percent: 'Minimal if handled properly; can felt with abuse',
      prewash: 'Do NOT pre-wash. Steam press before cutting.',
      tips: [
        { tip: 'Less prone to felting than wool', detail: 'Alpaca scales are smoother and don\'t interlock as aggressively. But extreme conditions will still cause felting.' },
        { tip: 'Steam press only', detail: 'Hold iron above fabric, let steam do the work.' }
      ],
      science: 'Alpaca fiber has fewer and smoother cuticle scales than sheep\'s wool, making it more resistant to felting. However, the fiber has less elasticity, so it stretches rather than shrinks when stressed.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Blot with cold water immediately', detail: 'Same approach as wool. Gentle — never rub.' },
        { tip: 'Professional cleaning for valuable pieces', detail: 'Alpaca garments are often expensive. Don\'t risk home remedies on difficult stains.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Pills less than cashmere', detail: 'Alpaca fiber is smoother and longer, so it pills less. Still, a fabric comb is useful for the occasional pill.' },
        { tip: 'Store folded with moth protection', detail: 'Like all protein fibers, moths will eat alpaca. Cedar, lavender, or sealed storage.' },
        { tip: 'Extremely long-lasting', detail: 'Alpaca fiber is stronger than wool. With proper care, alpaca garments can last a lifetime.' },
        { tip: 'No lanolin = hypoallergenic', detail: 'Unlike wool, alpaca has no lanolin. This means no allergic reactions, but also no natural water resistance.' }
      ],
      stripping: 'Do not strip alpaca. Same restrictions as cashmere and wool — hot water will damage the fiber. Gentle cool-water rinse with a drop of conditioner if buildup is suspected.'
    }
  },
  mohair: {
    washing: {
      method: 'Dry clean recommended; expert hand wash possible',
      temp: 'Cold only if hand washing (below 30°C / 85°F)',
      detergent: 'Wool-specific detergent if hand washing',
      frequency: 'Rarely — every 10+ wears; air between uses',
      tips: [
        { tip: 'Dry cleaning is safest', detail: 'Mohair\'s fluffy halo is difficult to maintain through home washing. Dry cleaning preserves the loft.' },
        { tip: 'If hand washing: extreme gentleness', detail: 'Soak in cool water with wool detergent. No agitation whatsoever. Squeeze gently — never twist.' },
        { tip: 'Mohair rarely needs washing', detail: 'The fiber naturally resists dirt and odor. Airing out is usually sufficient.' }
      ],
      avoid: 'Avoid machine washing, hot water, and any form of agitation. Mohair\'s halo is nearly impossible to restore once flattened.'
    },
    drying: {
      method: 'Lay flat to dry',
      alternatives: ['Roll gently in towel first'],
      tips: [
        { tip: 'Flat dry only', detail: 'Mohair stretches under its own weight. Hang drying will distort the garment.' },
        { tip: 'Don\'t press water out aggressively', detail: 'Gentle towel rolling. The halo is fragile when wet.' },
        { tip: 'Brush lightly when almost dry', detail: 'A soft brush can restore some of the fuzzy halo as the fibers dry.' }
      ],
      why: 'Mohair\'s value is in its fluffy halo — the fine fibers that stand out from the yarn surface. Water and pressure flatten this halo, and aggressive handling can prevent it from coming back.'
    },
    ironing: {
      temp: 'Low (110–130°C / 230–265°F)',
      steam: true,
      pressCloth: true,
      tips: [
        { tip: 'Steam only — never press directly', detail: 'Pressing flattens the mohair halo permanently. Hold iron above and steam from a distance.' },
        { tip: 'Or use a steamer', detail: 'A handheld garment steamer is ideal for mohair — no contact with the fabric.' }
      ]
    },
    colorCare: {
      colorfastness: 'Good — mohair takes dye brilliantly',
      tips: [
        { tip: 'Mohair holds color exceptionally well', detail: 'The fiber accepts dye deeply and resists fading.' },
        { tip: 'Sun exposure can affect luster', detail: 'Store away from direct light to preserve both color and sheen.' }
      ]
    },
    shrinkage: {
      percent: 'Can felt with heat/agitation',
      prewash: 'Do NOT pre-wash. Steam only.',
      tips: [
        { tip: 'Similar felting risk to wool', detail: 'Mohair comes from Angora goats and has scales like wool. Heat + water + agitation = permanent felting.' }
      ],
      science: 'Mohair has the same cuticle-scale structure as wool, making it vulnerable to felting under the same conditions. The fine halo fibers are even more delicate than the core yarn.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Professional cleaning only', detail: 'Don\'t risk home treatments on mohair. The halo is too delicate.' },
        { tip: 'For small spots: blot very gently', detail: 'Cold water, no rubbing. If the stain doesn\'t come out easily, take it to a professional.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Store flat or gently folded', detail: 'Never hang mohair — it stretches. Store with moth protection.' },
        { tip: 'Moths love mohair', detail: 'Use cedar, lavender, or sealed storage. Check stored mohair regularly.' },
        { tip: 'The halo may thin over time', detail: 'This is natural wear. Gentle brushing can revive some loft, but eventually the surface fibers wear away.' }
      ],
      stripping: 'Do not strip mohair. Professional cleaning only for refreshing.'
    }
  },
  angora: {
    washing: {
      method: 'Hand wash only',
      temp: 'Cold (below 30°C / 85°F)',
      detergent: 'Very mild wool wash or baby shampoo',
      frequency: 'As infrequently as possible — air out between wears',
      tips: [
        { tip: 'Extremely delicate when wet', detail: 'Angora fibers are very fine and weaken significantly in water. Handle with great care.' },
        { tip: 'Soak gently — do not agitate', detail: 'Place in cold water with a drop of wool wash. Let soak 10 minutes. Gently press — never wring.' },
        { tip: 'Rinse in same temperature water', detail: 'Temperature changes cause felting. Rinse in water the same temperature as the wash water.' }
      ],
      avoid: 'No machine washing, no hot water, no bleach, no wringing, no fabric softener.'
    },
    drying: {
      method: 'Lay flat on a towel',
      alternatives: [],
      tips: [
        { tip: 'Roll in a towel to remove water', detail: 'Lay the garment on a dry towel, roll up gently, and press to absorb excess water.' },
        { tip: 'Reshape and lay flat', detail: 'Reshape to original dimensions while damp. Dry flat away from direct heat or sunlight.' },
        { tip: 'Never hang angora', detail: 'The weight of water will stretch the garment permanently.' }
      ],
      why: 'Angora rabbit fiber is the finest of all animal fibers. It\'s hollow, extremely lightweight, and has almost no memory — once stretched, it won\'t bounce back.'
    },
    ironing: {
      temp: 'Do not iron directly',
      steam: true,
      pressCloth: true,
      tips: [
        { tip: 'Steam from a distance', detail: 'Hold a steamer 6 inches away to relax wrinkles. Direct contact crushes the fluffy texture.' },
        { tip: 'If you must press, use lowest heat with a press cloth', detail: 'Barely touch the surface. The goal is to smooth, not flatten.' }
      ]
    },
    colorCare: {
      colorfastness: 'Good — angora takes dye well',
      tips: [
        { tip: 'Wash colors separately', detail: 'Dyed angora can bleed slightly on first wash.' },
        { tip: 'Avoid prolonged sun exposure', detail: 'UV can fade dyed angora over time.' }
      ]
    },
    shrinkage: {
      percent: '5–10% if mishandled',
      prewash: 'Not recommended — angora is too delicate for pre-treatment.',
      tips: [
        { tip: 'Felting is the main risk', detail: 'Agitation + heat causes angora to felt irreversibly. Cold water and gentle handling prevent this.' }
      ],
      science: 'Angora fibers have fine scales that interlock when agitated in water (felting). The extremely fine diameter (11–15 microns) makes them more prone to felting than any other wool-type fiber.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Blot immediately with cold water', detail: 'Press gently — never rub. Rubbing mats the fibers and creates bald spots.' },
        { tip: 'Professional cleaning for serious stains', detail: 'Angora is too delicate for home stain removal. A dry cleaner experienced with fine knits is the safest option.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Store folded with cedar or lavender', detail: 'Moths love angora. Cedar blocks or lavender sachets are essential. Never use mothballs — the odor clings.' },
        { tip: 'Store in breathable bags', detail: 'Cotton garment bags protect from dust and moths. Avoid plastic — it traps moisture.' },
        { tip: 'Expect shedding', detail: 'Angora sheds naturally. This is normal and decreases with wear. A lint roller is your friend.' }
      ],
      stripping: 'Do not strip angora. The fiber is too fragile for any harsh treatment.'
    }
  },
  cupro: {
    washing: {
      method: 'Hand wash or gentle machine cycle',
      temp: 'Cold (30°C / 85°F)',
      detergent: 'Mild liquid detergent',
      frequency: 'After every 1–2 wears (often used as lining)',
      tips: [
        { tip: 'Machine wash on delicate if needed', detail: 'Cupro handles machine washing better than silk. Use a mesh bag and cold water.' },
        { tip: 'Hand wash for best results', detail: 'Swish gently in cold water. Cupro is weak when wet, so handle with care.' },
        { tip: 'Good alternative to dry-cleaning silk', detail: 'Cupro has a similar drape and feel to silk but is much more wash-friendly.' }
      ],
      avoid: 'Avoid hot water and wringing. Don\'t bleach.'
    },
    drying: {
      method: 'Hang or lay flat to dry',
      alternatives: ['Roll in towel first'],
      tips: [
        { tip: 'Air dry only', detail: 'No tumble drying — cupro is a regenerated fiber and heat can damage the structure.' },
        { tip: 'Light garments can be hung', detail: 'Unlike silk, lightweight cupro can hang to dry without excessive stretching.' }
      ],
      why: 'Cupro is regenerated cellulose (from cotton linter) dissolved and reformed. The reformed structure is weaker than natural cellulose and more vulnerable to heat.'
    },
    ironing: {
      temp: 'Medium-low (130–150°C / 265–300°F)',
      steam: true,
      pressCloth: true,
      tips: [
        { tip: 'Press on the wrong side', detail: 'Direct iron contact can create shine on cupro\'s smooth surface.' },
        { tip: 'Use a press cloth', detail: 'Prevents water spots and heat marks on the face of the fabric.' }
      ]
    },
    colorCare: {
      colorfastness: 'Good — takes dye evenly',
      tips: [
        { tip: 'Colors stay vibrant', detail: 'Cupro takes dye evenly and holds color well.' },
        { tip: 'Avoid prolonged sun exposure', detail: 'Like most regenerated fibers, UV can cause gradual fading.' }
      ]
    },
    shrinkage: {
      percent: '2–4%',
      prewash: 'Pre-wash on gentle cold before cutting.',
      tips: [
        { tip: 'Low shrinkage if handled properly', detail: 'Cold water, gentle handling, and air drying minimize any dimensional change.' }
      ],
      science: 'Cupro is made from cotton linter — the short fibers left on the seed after ginning. These are dissolved and regenerated into a continuous filament, creating a smooth, drapey fabric with moderate dimensional stability.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Blot with cold water', detail: 'Cupro absorbs quickly. Act fast.' },
        { tip: 'Treat like silk for stain removal', detail: 'Gentle methods only — no scrubbing or harsh chemicals.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Commonly used as luxury lining', detail: 'Known by the brand name Bemberg. If relining a garment, cupro is the gold standard.' },
        { tip: 'Moderate durability', detail: 'Not as long-lasting as silk but holds up well as a lining material with proper care.' }
      ],
      stripping: 'Cupro can be gently soaked in cool water with oxygen bleach for 1–2 hours. Don\'t use hot water or washing soda — too harsh for regenerated cellulose.'
    }
  },
  camel: {
    washing: {
      method: 'Dry clean or careful hand wash',
      temp: 'Cold (below 30°C / 85°F)',
      detergent: 'Wool-safe detergent or baby shampoo',
      frequency: 'Dry clean seasonally; spot clean as needed',
      tips: [
        { tip: 'Dry clean is safest for coats', detail: 'Camel hair coats are an investment. Professional dry cleaning preserves the fiber and structure.' },
        { tip: 'Hand wash lighter pieces if needed', detail: 'Scarves and lightweight layers can be gently hand washed in cold water with wool detergent.' },
        { tip: 'Do not agitate', detail: 'Like all animal fibers, camel hair can felt with agitation. Soak and gently press — don\'t rub or twist.' }
      ],
      avoid: 'No machine washing, no hot water, no bleach, no wringing.'
    },
    drying: {
      method: 'Lay flat on a towel',
      alternatives: ['Hang lightweight scarves on padded hangers'],
      tips: [
        { tip: 'Roll in a towel to remove moisture', detail: 'Gently press excess water out. Never wring camel hair.' },
        { tip: 'Reshape and dry flat', detail: 'Smooth to original shape while damp. Heavy coats should dry on a flat surface, not a hanger.' },
        { tip: 'Keep away from direct heat', detail: 'No radiators, no direct sunlight, no tumble dryers.' }
      ],
      why: 'Camel hair is a fine undercoat fiber (15–20 microns). It\'s naturally lightweight and warm but has less elasticity than sheep\'s wool, making it prone to stretching when wet.'
    },
    ironing: {
      temp: 'Low to medium (150°C / 300°F)',
      steam: true,
      pressCloth: true,
      tips: [
        { tip: 'Steam is usually sufficient', detail: 'A handheld steamer removes wrinkles without flattening the soft nap.' },
        { tip: 'Press cloth if ironing', detail: 'Use a damp press cloth on low-medium heat. Press gently — don\'t drag the iron.' }
      ]
    },
    colorCare: {
      colorfastness: 'Excellent — natural color requires no dye',
      tips: [
        { tip: 'Natural golden-tan is permanent', detail: 'Undyed camel hair holds its distinctive warm color indefinitely.' },
        { tip: 'Dyed camel hair is less common', detail: 'When dyed, treat as you would dyed wool — wash separately at first.' }
      ]
    },
    shrinkage: {
      percent: '2–5%',
      prewash: 'Not practical for coatings. For sewing, dry clean a swatch first.',
      tips: [
        { tip: 'Felting is the main risk', detail: 'Like wool, camel hair can felt with heat and agitation. Cold water and gentle handling prevent this.' }
      ],
      science: 'Camel undercoat fibers have fine scales similar to cashmere. They interlock under agitation (felting). The fiber is naturally thermally efficient due to its hollow medullary structure.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Blot immediately', detail: 'Press a clean cloth against the stain. Don\'t rub — rubbing pushes the stain deeper and mats the fibers.' },
        { tip: 'Professional cleaning for oil-based stains', detail: 'Camel hair coats are expensive. Don\'t risk home treatment on grease or ink stains.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Store in a breathable garment bag', detail: 'Cotton or canvas bags protect from dust and moths. Avoid plastic — it traps moisture.' },
        { tip: 'Use cedar blocks for moth protection', detail: 'Moths target animal fibers. Cedar is effective and won\'t leave chemical residue.' },
        { tip: 'Brush regularly with a garment brush', detail: 'A soft bristle brush removes surface dirt and keeps the nap looking fresh between dry cleanings.' }
      ],
      stripping: 'Do not strip camel hair. Professional cleaning only. The fiber is too fine and expensive for harsh home treatments.'
    }
  },
  jute: {
    washing: {
      method: 'Spot clean or dry clean; avoid full immersion',
      temp: 'Cold if spot cleaning',
      detergent: 'Mild soap for spot cleaning',
      frequency: 'Rarely — spot clean as needed',
      tips: [
        { tip: 'Avoid full immersion', detail: 'Jute weakens significantly when wet and can develop an unpleasant odor if not dried quickly.' },
        { tip: 'Spot clean is the standard', detail: 'For bags, rugs, and home goods — blot stains with a damp cloth and mild soap.' },
        { tip: 'Dry clean for garments', detail: 'If jute is used in structured garments or combined with other fibers, dry cleaning is safest.' }
      ],
      avoid: 'Avoid machine washing, soaking, and bleach. Jute doesn\'t tolerate prolonged moisture.'
    },
    drying: {
      method: 'Air dry immediately if wet',
      alternatives: ['Blot with towel'],
      tips: [
        { tip: 'Dry as quickly as possible', detail: 'Jute can mildew and develop odor if left damp. Sun dry if possible — jute tolerates UV well.' },
        { tip: 'Shape while drying', detail: 'Jute becomes pliable when damp and sets in whatever position it dries.' }
      ],
      why: 'Jute is a relatively weak bast fiber (compared to linen and hemp) that deteriorates faster in water. Quick drying prevents bacterial growth that causes odor and weakening.'
    },
    ironing: {
      temp: 'Medium-high (180°C / 355°F)',
      steam: false,
      pressCloth: false,
      tips: [
        { tip: 'Iron dry', detail: 'Avoid adding moisture — jute doesn\'t handle it well.' },
        { tip: 'Usually not necessary', detail: 'Jute\'s coarse texture means wrinkles aren\'t really visible or expected.' }
      ]
    },
    colorCare: {
      colorfastness: 'Moderate — natural jute yellows with age',
      tips: [
        { tip: 'Natural jute color changes with exposure', detail: 'Goes from golden to brownish. This is normal and considered part of its rustic character.' }
      ]
    },
    shrinkage: {
      percent: '3–5% (if wetted)',
      prewash: 'Do not pre-wash jute. Use dry or steam pre-treatment.',
      tips: [
        { tip: 'Avoid getting jute wet before cutting', detail: 'Pre-shrink by steam pressing if needed.' }
      ],
      science: 'Jute has high lignin content (the woody part of plant fiber). Lignin is weakened by water and can break down, which is why jute deteriorates faster than linen or hemp when wet.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Blot — never wet fully', detail: 'Use a barely-damp cloth with mild soap. Blot the stain, then blot dry.' },
        { tip: 'Baking soda for odors', detail: 'Sprinkle baking soda on jute items, let sit overnight, shake or vacuum off.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Keep dry', detail: 'Jute\'s biggest enemy is moisture. Store in a dry place with good air circulation.' },
        { tip: 'Good for bags, rugs, and craft projects', detail: 'Not ideal for garments that need washing. Jute works best in items that get spot-cleaned.' },
        { tip: 'Naturally biodegradable', detail: 'Jute breaks down relatively quickly compared to other natural fibers. This is good for sustainability but limits lifespan in moist environments.' }
      ],
      stripping: 'Do not strip jute. Full immersion in water is not recommended. If jute items smell or feel sticky, sprinkle with baking soda, let sit 24 hours, and vacuum or brush off.'
    }
  },
  pina: {
    washing: {
      method: 'Hand wash only or dry clean',
      temp: 'Cold (below 30\u00b0C / 85\u00b0F)',
      detergent: 'Very mild soap',
      frequency: 'After each wear if garment; rarely for d\u00e9cor',
      tips: [
        { tip: 'Extremely delicate fiber', detail: 'Pi\u00f1a (pineapple leaf fiber) produces a sheer, stiff fabric. Handle with great care.' },
        { tip: 'Hand wash in cold water with very mild soap', detail: 'Swish gently. The fibers are brittle and can break with agitation.' },
        { tip: 'Dry clean for formal pieces', detail: 'Traditional pi\u00f1a garments (barong tagalog) are often dry-cleaned to maintain stiffness.' }
      ],
      avoid: 'No machine washing, no hot water, no bleach, no wringing.'
    },
    drying: {
      method: 'Lay flat in shade',
      alternatives: ['Hang if lightweight'],
      tips: [
        { tip: 'Dry flat and smooth', detail: 'Pi\u00f1a is naturally stiff and holds shape well when dried flat.' },
        { tip: 'No sun exposure', detail: 'UV can yellow and weaken the already-delicate fibers.' }
      ],
      why: 'Pi\u00f1a fiber is extracted from pineapple leaves \u2014 it\'s naturally stiff, sheer, and lustrous but brittle. Gentle handling at every step is essential.'
    },
    ironing: {
      temp: 'Low (130\u00b0C / 265\u00b0F)',
      steam: false,
      pressCloth: true,
      tips: [
        { tip: 'Low heat with a press cloth', detail: 'Pi\u00f1a scorches easily. Use a light touch.' },
        { tip: 'Traditional Filipino method: starch and iron', detail: 'Pi\u00f1a garments are traditionally starched to maintain their characteristic crispness.' }
      ]
    },
    colorCare: {
      colorfastness: 'Natural cream/ivory color is stable',
      tips: [
        { tip: 'Natural color yellows with age and exposure', detail: 'Store in dark, cool, dry conditions to slow this process.' }
      ]
    },
    shrinkage: {
      percent: '1\u20133%',
      prewash: 'Test-wash a swatch. Pi\u00f1a is too delicate and expensive for casual pre-washing.',
      tips: [
        { tip: 'Minimal shrinkage', detail: 'Pi\u00f1a is naturally stable, but the fibers are too delicate for aggressive pre-treatment.' }
      ],
      science: 'Pi\u00f1a fibers are long, smooth leaf fibers with natural stiffness. They have excellent dimensional stability but low tensile flexibility.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Professional cleaning recommended', detail: 'Pi\u00f1a is rare and expensive. Don\'t risk home stain removal on valuable pieces.' },
        { tip: 'Blot immediately', detail: 'For fresh stains, blot with cold water very gently. Don\'t rub.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Store flat in acid-free tissue', detail: 'Pi\u00f1a garments are often heirloom pieces. Store them like you would a wedding dress.' },
        { tip: 'Handle minimally', detail: 'The less you handle pi\u00f1a, the longer it lasts. Each handling introduces stress on the brittle fibers.' },
        { tip: 'Cultural significance', detail: 'Pi\u00f1a cloth is a Philippine heritage fiber. Traditional barong tagalog and formal Filipiniana dresses are made from pi\u00f1a.' }
      ],
      stripping: 'Do not strip pi\u00f1a. The fiber is too delicate for any harsh treatment. Professional conservation cleaning only.'
    }
  },
  kapok: {
    washing: {
      method: 'Spot clean cover only; do not wash kapok fill',
      temp: 'N/A for fill; follow cover fabric instructions',
      detergent: 'Mild soap for spot cleaning',
      frequency: 'Wash removable covers as needed; air out fill regularly',
      tips: [
        { tip: 'Kapok is a fill, not a fabric', detail: 'Used inside pillows, cushions, and mattresses. You wash the cover, not the kapok.' },
        { tip: 'Air out in sunlight', detail: 'Sun and fresh air help keep kapok fill fresh. Fluff by hand after airing.' },
        { tip: 'Water ruins kapok fill', detail: 'Kapok fibers are coated in a waxy substance that repels water initially, but once saturated, the fill clumps and loses loft.' }
      ],
      avoid: 'Never machine wash items filled with kapok. The fill will clump and mat irreversibly.'
    },
    drying: {
      method: 'Air out only; do not wet',
      alternatives: [],
      tips: [
        { tip: 'Sun and air are your only tools', detail: 'Place kapok-filled items in direct sunlight for a few hours to refresh.' }
      ],
      why: 'Kapok is a seed-pod fiber — extremely fine and lightweight, naturally buoyant and water-resistant. Once the waxy coating is broken by agitation, the fibers mat together and can\'t be refluffed.'
    },
    ironing: {
      temp: 'N/A',
      steam: false,
      pressCloth: false,
      tips: [
        { tip: 'Not applicable', detail: 'Kapok is used as fill, not as a surface fabric.' }
      ]
    },
    colorCare: {
      colorfastness: 'N/A — kapok is used as fill inside covers',
      tips: []
    },
    shrinkage: {
      percent: 'N/A — fill fiber',
      prewash: 'Not applicable.',
      tips: [],
      science: 'Kapok fibers are the lightest natural fibers — hollow and coated with wax. They\'re used for buoyancy (life jackets) and insulation (pillows) rather than as a textile.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Clean the cover, not the fill', detail: 'Remove the cover and wash according to the cover fabric. Spot clean the kapok-filled inner with a damp cloth if needed.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Kapok compresses over time', detail: 'The fill will flatten with use. Fluff and redistribute regularly to maintain loft.' },
        { tip: 'Replace fill eventually', detail: 'Kapok fill has a lifespan. When it no longer refluffs, replace with fresh kapok.' },
        { tip: 'Naturally hypoallergenic and mold-resistant', detail: 'The waxy coating resists mold, dust mites, and allergens.' }
      ],
      stripping: 'Not applicable for kapok fill.'
    }
  },
  nettle: {
    washing: {
      method: 'Hand wash or gentle machine cycle',
      temp: 'Cool to warm (30–40°C / 85–105°F)',
      detergent: 'Mild liquid detergent',
      frequency: 'Every 2–3 wears',
      tips: [
        { tip: 'Treat like linen', detail: 'Nettle is a bast fiber with properties similar to linen and hemp.' },
        { tip: 'Gentle cycle if machine washing', detail: 'The fiber is strong but can be stiff and crack at fold lines like ramie.' }
      ],
      avoid: 'Avoid chlorine bleach and fabric softener.'
    },
    drying: {
      method: 'Line dry or flat dry',
      alternatives: ['Low tumble dry'],
      tips: [
        { tip: 'Line dry is preferred', detail: 'Gentle drying preserves the fiber. Handle like linen.' }
      ],
      why: 'Nettle fiber is structurally similar to linen — a bast fiber with good strength but limited elasticity.'
    },
    ironing: {
      temp: 'High (200°C / 400°F)',
      steam: true,
      pressCloth: false,
      tips: [
        { tip: 'Iron damp with steam', detail: 'Same approach as linen and hemp — nettle responds well to heat and moisture.' }
      ]
    },
    colorCare: {
      colorfastness: 'Good',
      tips: [
        { tip: 'Similar to linen', detail: 'Natural nettle is greenish-gray. Takes dye well.' }
      ]
    },
    shrinkage: {
      percent: '3–6%',
      prewash: 'Pre-wash before cutting.',
      tips: [
        { tip: 'Pre-wash like any bast fiber', detail: 'Same approach as linen — wash and dry using the method you\'ll use for the finished garment.' }
      ],
      science: 'Nettle bast fibers are held under tension during extraction and weaving, releasing during the first wash.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Treat like linen', detail: 'Same stain removal approaches as other bast fibers.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Very durable once broken in', detail: 'Nettle fiber is strong and gets softer with use, like hemp and linen.' },
        { tip: 'Niche fiber — harder to find', detail: 'Nettle fabric is uncommon commercially. Treat it well — replacement may not be easy.' }
      ],
      stripping: 'Nettle can be stripped like linen — hot soak with washing soda and oxygen bleach. The fiber is sturdy enough.'
    }
  },
  modal: {
    washing: {
      method: 'Machine wash on gentle',
      temp: 'Cold to warm (30–40°C / 85–105°F)',
      detergent: 'Mild liquid detergent',
      frequency: 'After every 1–2 wears',
      tips: [
        { tip: 'Machine wash is fine on gentle', detail: 'Modal is stronger wet than regular viscose. It handles machine washing well on a gentle cycle.' },
        { tip: 'Wash inside out', detail: 'Reduces pilling on the soft surface.' },
        { tip: 'Cold water preserves the silky feel', detail: 'Hot water can roughen modal over time.' }
      ],
      avoid: 'No bleach. No fabric softener (already naturally soft).'
    },
    drying: {
      method: 'Tumble dry low or air dry',
      alternatives: ['Lay flat for knits'],
      tips: [
        { tip: 'Low heat tumble dry is OK', detail: 'Modal tolerates low-heat drying better than regular viscose.' },
        { tip: 'Air dry for longest life', detail: 'Less heat exposure = longer-lasting softness.' },
        { tip: 'Remove promptly if tumble drying', detail: 'Prevents wrinkles from setting.' }
      ],
      why: 'Modal is a type of rayon made from beech tree pulp. It\'s stronger than regular viscose because of a modified manufacturing process, but still a regenerated cellulose fiber that benefits from gentle care.'
    },
    ironing: {
      temp: 'Medium-low (150°C / 300°F)',
      steam: true,
      pressCloth: false,
      tips: [
        { tip: 'Usually doesn\'t need ironing', detail: 'Modal has good wrinkle resistance.' },
        { tip: 'Medium-low heat if needed', detail: 'Won\'t tolerate high heat like cotton or linen.' }
      ]
    },
    colorCare: {
      colorfastness: 'Excellent — modal is known for vibrant, lasting color',
      tips: [
        { tip: 'Colors stay vibrant', detail: 'One of modal\'s main advantages. The fiber takes dye deeply and holds it through many washes.' },
        { tip: 'Cold water helps', detail: 'As with all dyed fabrics, cold water extends color life.' }
      ]
    },
    shrinkage: {
      percent: '2–5%',
      prewash: 'Pre-wash on gentle cold before cutting.',
      tips: [
        { tip: 'Less shrinkage than regular viscose', detail: 'Modal\'s modified manufacturing makes it more dimensionally stable.' },
        { tip: 'Pre-wash as insurance', detail: 'Get any initial shrinkage out before cutting your project.' }
      ],
      science: 'Modal is a second-generation viscose with higher wet modulus (stronger when wet). This means less swelling and shrinkage than standard viscose/rayon.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Act quickly', detail: 'Modal absorbs like cotton. Blot stains immediately with cold water.' },
        { tip: 'Gentle methods work well', detail: 'Mild soap and cold water for most stains. Oxygen bleach for stubborn marks.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Less pilling than regular viscose', detail: 'Modal is more durable. Expect moderate pilling — use a fabric shaver as needed.' },
        { tip: 'Maintains softness over time', detail: 'Unlike some regenerated fibers, modal stays soft through many washes.' },
        { tip: 'Good everyday fabric', detail: 'Modal makes excellent underwear, sleepwear, and casual tops. Durable enough for regular wear and washing.' }
      ],
      stripping: 'Modal can be stripped gently. Cool water + oxygen bleach, soak 2–3 hours. No washing soda or hot water.'
    }
  },
  viscose: {
    washing: {
      method: 'Hand wash or gentle machine cycle',
      temp: 'Cold (30°C / 85°F)',
      detergent: 'Mild liquid detergent',
      frequency: 'After every 1–2 wears',
      tips: [
        { tip: 'Hand wash is safest', detail: 'Viscose is very weak when wet. Hand washing minimizes the stress on fibers.' },
        { tip: 'If machine washing, use a mesh bag', detail: 'Gentle cycle, cold water, mesh bag. Remove promptly to reduce wrinkling.' },
        { tip: 'Never wring or twist', detail: 'Wet viscose fibers break easily. Press water out gently between towels.' }
      ],
      avoid: 'No hot water, no bleach, no wringing. Avoid prolonged soaking.'
    },
    drying: {
      method: 'Lay flat or hang to drip dry',
      alternatives: ['Low tumble dry if labeled safe'],
      tips: [
        { tip: 'Reshape while damp', detail: 'Viscose distorts easily when wet. Smooth to shape and dry flat.' },
        { tip: 'Avoid tumble drying', detail: 'Heat and tumbling weaken already-fragile wet fibers. Air dry is safest.' },
        { tip: 'Remove from machine immediately', detail: 'Sitting damp in a machine causes deep wrinkles that are hard to press out.' }
      ],
      why: 'Viscose (rayon) is regenerated cellulose. The fibers swell up to 50% in water, making them very weak and prone to distortion when wet.'
    },
    ironing: {
      temp: 'Low to medium (150°C / 300°F)',
      steam: true,
      pressCloth: true,
      tips: [
        { tip: 'Iron while slightly damp', detail: 'Viscose presses best when barely damp. Too dry and wrinkles resist; too wet and it can water-stain.' },
        { tip: 'Use a press cloth', detail: 'Direct iron contact can leave shiny marks on viscose, especially on dark colors.' },
        { tip: 'Iron on the wrong side', detail: 'Reduces the risk of shine marks and preserves any surface texture.' }
      ]
    },
    colorCare: {
      colorfastness: 'Good — takes dye beautifully but can bleed',
      tips: [
        { tip: 'Wash darks separately at first', detail: 'Viscose absorbs dye well but excess dye can bleed in early washes.' },
        { tip: 'Avoid prolonged sun exposure', detail: 'UV can fade dyed viscose over time. Don\'t dry in direct sunlight.' }
      ]
    },
    shrinkage: {
      percent: '3–8%',
      prewash: 'Hand wash or dry clean a swatch before cutting. Viscose can shrink significantly.',
      tips: [
        { tip: 'Expect noticeable shrinkage', detail: 'Viscose is one of the more shrink-prone fibers. Always pre-treat before sewing.' },
        { tip: 'Steam pre-treatment works too', detail: 'If washing risks distortion, steam the yardage thoroughly before cutting.' }
      ],
      science: 'Viscose fibers swell dramatically in water (up to 50% in diameter). This swelling-and-contraction cycle causes progressive shrinkage, especially in the first wash.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Blot immediately with cold water', detail: 'Don\'t rub — viscose fibers are weak and rubbing can cause pilling or bald spots.' },
        { tip: 'Use a gentle stain remover', detail: 'Test on an inconspicuous area first. Avoid enzyme-based stain removers — they can damage regenerated cellulose.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Hang or fold loosely', detail: 'Viscose wrinkles easily. Hanging reduces creasing; if folding, don\'t compress tightly.' },
        { tip: 'Shorter lifespan than cotton', detail: 'Viscose is softer but less durable. Expect 2–3 years of regular wear.' },
        { tip: 'Watch for pilling', detail: 'Viscose pills at friction points. A fabric shaver extends garment life.' }
      ],
      stripping: 'Viscose can be stripped gently. Cool water + oxygen bleach, soak 2–3 hours. No hot water or washing soda — too harsh for regenerated cellulose.'
    }
  },
  tencel: {
    washing: {
      method: 'Machine wash on gentle',
      temp: 'Cold (30°C / 85°F)',
      detergent: 'Mild liquid detergent',
      frequency: 'After every 1–2 wears',
      tips: [
        { tip: 'Cold water, gentle cycle', detail: 'Tencel (lyocell) is strong enough for machine washing but performs best in cold water on gentle.' },
        { tip: 'Wash inside out', detail: 'The smooth surface can develop a slight fibrillation (peach-fuzz effect) with agitation. Washing inside out reduces this.' },
        { tip: 'Tencel is the most eco-friendly regenerated fiber', detail: 'Closed-loop manufacturing process recovers 99% of the solvent. Gentle washing extends its life and compounds the environmental benefit.' }
      ],
      avoid: 'No bleach. No fabric softener.'
    },
    drying: {
      method: 'Air dry preferred',
      alternatives: ['Tumble dry on low'],
      tips: [
        { tip: 'Air dry is best', detail: 'Tencel keeps its smooth drape longest when air dried.' },
        { tip: 'Low tumble dry is acceptable', detail: 'Won\'t damage the fiber, but air drying extends garment life.' },
        { tip: 'Remove promptly if machine drying', detail: 'Prevents wrinkles and maintains the smooth hand.' }
      ],
      why: 'Tencel (lyocell) is made from eucalyptus wood pulp using a closed-loop solvent process. The resulting fiber is strong, smooth, and biodegradable, but heat can cause it to stiffen over time.'
    },
    ironing: {
      temp: 'Medium-low (150°C / 300°F)',
      steam: true,
      pressCloth: false,
      tips: [
        { tip: 'Usually needs minimal ironing', detail: 'Tencel has good wrinkle recovery.' },
        { tip: 'Medium-low heat if needed', detail: 'Press on wrong side for best results.' }
      ]
    },
    colorCare: {
      colorfastness: 'Good — similar to modal',
      tips: [
        { tip: 'Colors hold well', detail: 'Tencel takes dye well and resists fading.' },
        { tip: 'Cold water washing preserves color', detail: 'As with all dyed fabrics.' }
      ]
    },
    shrinkage: {
      percent: '2–4%',
      prewash: 'Pre-wash on gentle cold before cutting.',
      tips: [
        { tip: 'Low shrinkage', detail: 'Tencel is more dimensionally stable than regular viscose.' },
        { tip: 'Pre-wash for insurance', detail: 'Get any minor shrinkage out before cutting.' }
      ],
      science: 'Tencel\'s nanofibrillar structure (extremely fine, aligned fibers) gives it better dimensional stability than regular viscose. The fibers swell less in water.'
    },
    stainRemoval: {
      tips: [
        { tip: 'Blot immediately with cold water', detail: 'Tencel absorbs moisture quickly.' },
        { tip: 'Mild soap for most stains', detail: 'The smooth fiber surface means stains don\'t penetrate as deeply as in cotton.' }
      ]
    },
    longTerm: {
      tips: [
        { tip: 'Fibrillation is the main concern', detail: 'Tencel can develop a peach-fuzz surface with repeated washing. This is sometimes desirable (creates a sueded texture) but can also look worn.' },
        { tip: 'Some Tencel is pre-fibrillated by the manufacturer', detail: 'Check if your fabric is regular or "peached" Tencel. The care is the same, but expectations for surface texture differ.' },
        { tip: 'Biodegradable at end of life', detail: 'When the garment is truly worn out, Tencel composts fully — one of the most sustainable fiber choices.' }
      ],
      stripping: 'Tencel can be stripped gently. Cool water + oxygen bleach, soak 2–3 hours. Handle gently when wet — the fiber is strong but fibrillation can occur with abrasion.'
    }
  }
};

// Section metadata for rendering the care tab UI

const CARE_SECTIONS = [
  { key: 'washing',      icon: '🫧', label: 'Washing' },
  { key: 'drying',       icon: '☀️', label: 'Drying' },
  { key: 'ironing',      icon: '🔥', label: 'Ironing & Pressing' },
  { key: 'colorCare',    icon: '🎨', label: 'Color Care' },
  { key: 'shrinkage',    icon: '📐', label: 'Shrinkage & Pre-Treatment' },
  { key: 'stainRemoval', icon: '💧', label: 'Stain Removal' },
  { key: 'longTerm',     icon: '🏛️', label: 'Long-Term Care & Storage' }
];



window.NFG_DATA.fibers = {
  FIBERS: FIBERS,
  PROP_INVERTED: PROP_INVERTED,
  PROP_TOOLTIPS: PROP_TOOLTIPS,
  FIBER_PROS_CONS: FIBER_PROS_CONS,
  FILTER_TAGS: FILTER_TAGS,
  FIBER_ENV_ALLERGEN: FIBER_ENV_ALLERGEN,
  WEIGHT_TECHNIQUES: WEIGHT_TECHNIQUES,
  BLEND_NOTES: BLEND_NOTES,
  CARE_EXTENDED: CARE_EXTENDED,
  CARE_SECTIONS: CARE_SECTIONS
};
})();
