// [MIG-003] Project catalog and yardage data
// Register on NFG_DATA for async loading
(function() {

const PROJECT_AUDIENCES = [
  { key: 'women', label: "Women's Clothing", icon: 'dress', desc: 'Dresses, tops, skirts, pants & outerwear' },
  { key: 'men', label: "Men's Clothing", icon: 'shirt', desc: 'Shirts, trousers, outerwear & accessories' },
  { key: 'kids', label: "Children's & Baby", icon: 'onesie', desc: 'Babywear, kids clothing & accessories' },
  { key: 'home', label: "Home & Living", icon: 'pillow', desc: 'Pillows, curtains, table linens & bedding' },
  { key: 'accessories', label: "Accessories", icon: 'scarf', desc: 'Scarves, hats, gloves & belts' },
  { key: 'bags', label: "Bags & Pouches", icon: 'bag', desc: 'Totes, pouches, backpacks & organizers' }
];


const PROJECT_CATALOG = [

  // ────────────────────────────────────────────
  // WOMEN'S CLOTHING (also tagged for other audiences where applicable)
  // ────────────────────────────────────────────

  {
    id: 'aLineSkirt',
    name: 'A-Line Skirt',
    audiences: ['women'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'A cone-shaped skirt that flares gently from the waist — wider at the hem than at the hip. One of the simplest garments to sew and one of the most universally flattering. Two pattern pieces (front and back), a waistband, and a hem.',
    whyItWorks: 'The A-line shape requires almost no fitting. It skims the body without clinging, which means small measurement errors are forgiving. No darts, no complicated curves.',
    fabricAdvice: 'Medium-weight wovens with some body work best — cotton poplin, linen, gabardine, lightweight denim. Avoid very drapey fabrics for your first one; they fight the A-line shape. Heavier fabrics (canvas, tweed) make a structured winter version.',
    fabricWarning: 'Very lightweight fabrics (voile, chiffon) will collapse the silhouette unless underlined. Fabrics with a lot of stretch will produce a different fit than the pattern intends.',
    requirements: { structure: { min: 45, weight: 1.2 }, durability: { min: 55 }, wrinkleResistance: { min: 25 }, washability: { min: 60 } },
    construction: [
      { step: 'Cut front and back panels', detail: 'Place pattern on grain. A-line skirts are cut on straight grain for stability; bias would add unwanted stretch.' },
      { step: 'Sew side seams', detail: 'Right sides together, standard 5/8" seam allowance. Press seams open for a flat finish or to one side for easier finishing.' },
      { step: 'Install zipper or closure', detail: 'An invisible zipper in the center back or left side seam is standard. Beginners can use an elastic waistband instead to skip the zipper entirely.' },
      { step: 'Attach waistband', detail: 'Interface the waistband for structure. Sew to the skirt, fold, press, and topstitch or slip-stitch closed.' },
      { step: 'Hem', detail: 'A 1.5" double-fold hem is standard. Press well before stitching — the hem makes or breaks the finished look.' }
    ],
    techniques: ['darts', 'doubleHem', 'invisibleZipper'],
    mistakes: [
      { mistake: 'Cutting off-grain', why: 'The skirt will twist around your body as you wear it. Always find the grainline and align your pattern to it.' },
      { mistake: 'Skipping the press', why: 'Every seam needs pressing before you cross it with another seam. An unpressed A-line looks homemade; a well-pressed one looks professional.' },
      { mistake: 'Too-tight waistband', why: 'Measure your waist *where you want the skirt to sit*, not your natural waist. Add 1" of ease minimum. You need to breathe and sit.' },
      { mistake: 'Uneven hem length', why: 'Have someone else mark your hem while you wear the skirt. Measuring flat on a table doesn\'t account for your body shape.' }
    ],
    variations: [
      'Add patch pockets for a casual look',
      'Line it for a polished finish and to prevent see-through',
      'Try a kick pleat at the center back for easier walking in longer lengths',
      'Make a wrap version with a tie waist to skip the zipper entirely'
    ],
    supplies: [
      { item: 'Fabric', qty: '1.5–2 yards (depends on length and hip measurement)', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Invisible zipper', qty: '1 (7–9" for side, 9–12" for back)', essential: false, note: 'Not needed if using elastic waistband' },
      { item: 'Lightweight fusible interfacing', qty: '½ yard (for waistband)', essential: true },
      { item: 'Hook and eye or button', qty: '1', essential: false },
      { item: 'Elastic (1" wide)', qty: 'Waist measurement + 1"', essential: false, note: 'Alternative to zipper closure' }
    ],
    relatedProjects: ['wrapSkirt', 'pencilSkirt', 'circleSkirt']
  },

  {
    id: 'wrapDress',
    name: 'Wrap Dress',
    audiences: ['women'],
    skill: 'intermediate',
    time: 'weekend',
    timeLabel: 'Weekend project',
    overview: 'A dress that wraps around the body and ties at the waist — no zipper needed. The cross-over bodice creates a V-neckline and the tie defines the waist. Universally flattering because the wrap point is adjustable.',
    whyItWorks: 'The wrap construction is self-fitting — the wearer adjusts how tightly it wraps. This makes it more forgiving of measurement differences than a fitted dress with a zipper. The bias-cut sash adds elegant drape.',
    fabricAdvice: 'Medium-weight fabrics with good drape: jersey knit, rayon challis, silk crepe de chine, lightweight wool crepe, viscose, tencel. The fabric needs to drape around the body without being stiff.',
    fabricWarning: 'Avoid stiff fabrics — they won\'t wrap smoothly and the bodice will gap. Very slippery fabrics (charmeuse, satin) are challenging because they shift during cutting and sewing.',
    requirements: { drape: { min: 65, weight: 1.3 }, softness: { min: 55 }, breathability: { min: 50 } },
    construction: [
      { step: 'Cut bodice fronts, back, and skirt', detail: 'The bodice has two overlapping front pieces. Pay close attention to the "cut 1 / cut 1 reversed" markings — the wrapping direction matters.' },
      { step: 'Sew bodice darts or shaping', detail: 'Most wrap dress patterns have bust darts or princess seams in the bodice front pieces for shaping.' },
      { step: 'Join shoulder and side seams', detail: 'Sew bodice backs to fronts at shoulders, then join bodice to skirt.' },
      { step: 'Finish the wrap edge', detail: 'The inside wrap edge needs a clean finish — a narrow hem, bias binding, or serged edge. This edge is visible when the dress opens slightly during movement.' },
      { step: 'Make and attach ties', detail: 'Cut tie pieces on the bias for flexibility. Attach at the side seam (inner tie) and the front wrap edge (outer tie). Length should be enough to wrap and tie comfortably.' },
      { step: 'Hem the skirt', detail: 'A narrow rolled hem works beautifully on drapey fabrics. A wider double-fold hem suits more structured fabrics.' },
      { step: 'Set sleeves (if applicable)', detail: 'Many wrap dresses are sleeveless or short-sleeved. Finish armholes with bias binding or a faced finish.' }
    ],
    techniques: ['darts', 'biasBinding', 'rolledHem', 'frenchSeam'],
    mistakes: [
      { mistake: 'Bodice gaping at the neckline', why: 'The V-neck can gap if the wrap doesn\'t overlap enough. Check the overlap on your body during a muslin fitting — add width to the bodice front if needed.' },
      { mistake: 'Forgetting the inner tie', why: 'A wrap dress needs TWO ties — one at the inside waist (sewn into the side seam) and one at the outside edge. Without the inner tie, the dress falls open.' },
      { mistake: 'Cutting wrap edges on same side', why: 'The two front bodice pieces are mirror images. If you cut two left fronts, the dress won\'t wrap. Double-check before cutting.' },
      { mistake: 'Skimpy tie length', why: 'Ties that are too short look stubby and come undone. Cut them at least 30" long — you can always trim later.' }
    ],
    variations: [
      'Add a collar for a more tailored look',
      'Use contrasting fabric for the ties and inner bodice facing',
      'Make a faux-wrap with a hidden side zipper for less shifting during wear',
      'Extend to maxi length for evening wear'
    ],
    supplies: [
      { item: 'Fabric', qty: '3–4 yards (depends on length and sleeve style)', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Lightweight fusible interfacing', qty: '¼ yard (for neckline stabilization)', essential: true },
      { item: 'Bias tape (single-fold)', qty: '2 yards', essential: false, note: 'For armhole and neckline finishing' },
      { item: 'Hook and eye', qty: '1 (small)', essential: false, note: 'Optional — secures the inner wrap point for extra security' }
    ],
    relatedProjects: ['shiftDress', 'aLineSkirt', 'raglanTop']
  },

  {
    id: 'raglanTop',
    name: 'Raglan T-Shirt',
    audiences: ['women', 'men', 'kids'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'A relaxed-fit top with diagonal seams running from the neckline to the underarm — the raglan sleeve. Easier than a set-in sleeve because you don\'t need to ease a curved sleeve cap into an armhole. Works in both knits and wovens.',
    whyItWorks: 'The raglan construction eliminates the trickiest part of garment sewing: setting a sleeve into an armhole. The diagonal seam also allows more shoulder movement than a traditional set-in sleeve. Three main pattern pieces (front, back, two sleeves) means fast cutting and assembly.',
    fabricAdvice: 'Jersey knit is the classic choice — cotton jersey, cotton/lycra, bamboo jersey, or french terry for a sweatshirt version. For wovens, try cotton lawn or linen for a breezy summer top (add ease for movement since wovens don\'t stretch).',
    fabricWarning: 'If using knit fabric, make sure your machine can handle stretch — use a ballpoint needle and stretch stitch or serger. Very slippery knits (modal jersey, cupro jersey) are harder to control for beginners.',
    requirements: { stretch: { min: 20, weight: 1.2 }, softness: { min: 50 }, breathability: { min: 60 } },
    construction: [
      { step: 'Cut front, back, and sleeves', detail: 'For knits, use a ballpoint rotary cutter or sharp scissors. Don\'t stretch the fabric while cutting. Place pattern pieces along the stretch direction indicated.' },
      { step: 'Sew raglan seams', detail: 'Attach sleeves to front and back along the diagonal raglan seam lines. This creates the signature angled seam from neck to underarm.' },
      { step: 'Sew side and underarm seams', detail: 'One continuous seam from hem, up the side, through the underarm, and down the sleeve. This is the satisfying part — the shirt takes shape in one step.' },
      { step: 'Attach neckband', detail: 'Cut a strip of fabric (usually the same knit, cut slightly shorter than the neckline for a snug fit). Sew in a ring, fold, and attach to neckline stretching to fit.' },
      { step: 'Hem sleeves and body', detail: 'For knits, a twin needle or coverstitch creates a professional stretch hem. A zigzag stitch also works.' }
    ],
    techniques: ['stretchStitch', 'twinNeedle', 'neckbandApplication'],
    mistakes: [
      { mistake: 'Neckband too long or too short', why: 'The neckband should be about 80–85% of the neckline measurement for knits. Too long and it gaps; too short and it distorts the neckline.' },
      { mistake: 'Using a straight stitch on knits', why: 'A straight stitch will pop when the fabric stretches. Use a lightning bolt stitch, narrow zigzag, or serger for all seams on knit fabric.' },
      { mistake: 'Stretching fabric while sewing', why: 'Let the feed dogs do the work. Pulling or pushing knit fabric through the machine causes wavy seams that won\'t lie flat.' },
      { mistake: 'Wrong needle for the fabric', why: 'Knits need a ballpoint or stretch needle. A universal or sharp needle can skip stitches or cut the knit fibers, causing runs.' }
    ],
    variations: [
      'Use contrasting fabric for the sleeves (classic baseball tee look)',
      'Make it in french terry or fleece for a sweatshirt',
      'Add a kangaroo pocket for a hoodie feel',
      'Lengthen to a raglan dress'
    ],
    supplies: [
      { item: 'Knit fabric', qty: '1.5–2 yards', essential: true },
      { item: 'Matching thread (polyester)', qty: '1 spool', essential: true, note: 'Polyester thread has stretch — cotton thread will break on knits' },
      { item: 'Ballpoint or stretch needles', qty: '2–3 (size 75/11 or 80/12)', essential: true },
      { item: 'Twin needle', qty: '1 (4mm width, stretch type)', essential: false, note: 'For professional-looking hems' },
      { item: 'Walking foot', qty: '1', essential: false, note: 'Helps feed knit fabric evenly — not required but very helpful' }
    ],
    relatedProjects: ['wrapDress', 'buttonUpShirt']
  },

  {
    id: 'shiftDress',
    name: 'Shift Dress',
    audiences: ['women'],
    skill: 'beginner',
    time: 'weekend',
    timeLabel: 'Weekend project',
    overview: 'A straight-hanging dress with minimal shaping — no waist seam, no darts (or simple bust darts only). The shift is the little black dress of sewing: simple to construct, endlessly adaptable, and appropriate for everything from office to evening depending on fabric choice.',
    whyItWorks: 'Minimal pattern pieces and no complex shaping make this one of the easiest dresses to sew. The boxy silhouette is forgiving of fit issues. If you can sew straight lines, you can sew a shift dress.',
    fabricAdvice: 'Structured medium-weight fabrics that hold their shape: cotton sateen, linen, ponte knit, lightweight wool crepe, jacquard. The fabric does the design work — a plain shift in beautiful fabric looks expensive.',
    fabricWarning: 'Too-drapey fabrics (rayon, viscose challis) will cling rather than skim, defeating the shift silhouette. Very stiff fabrics (canvas, heavy denim) will stand away from the body like a box.',
    requirements: { structure: { min: 40, weight: 1.1 }, drape: { min: 35 }, colorfastness: { min: 55 } },
    construction: [
      { step: 'Cut front, back, and facings', detail: 'A shift dress is typically just a front, a back, and neckline/armhole facings. Some patterns include bust darts on the front piece.' },
      { step: 'Sew bust darts (if any)', detail: 'Press darts down toward the hem. These give just enough shaping through the bust without creating a fitted look.' },
      { step: 'Sew shoulder and side seams', detail: 'Standard straight seams. Finish raw edges with a serger, zigzag, or pinking shears.' },
      { step: 'Attach neckline and armhole facings', detail: 'Interface facings, sew to neckline and armholes, understitch to prevent rolling, and tack at shoulder seams.' },
      { step: 'Hem', detail: 'A 2" blind hem looks most polished. A topstitched hem is perfectly fine for casual versions.' }
    ],
    techniques: ['darts', 'facing', 'blindHem', 'understitching'],
    mistakes: [
      { mistake: 'Too much ease through the body', why: 'A shift should skim, not tent. If it\'s too wide through the hips, it looks like a sack. Take in side seams gradually if needed.' },
      { mistake: 'Facing rolling to outside', why: 'Always understitch the facing (stitch the seam allowance to the facing, close to the seam line). This invisible step keeps facings where they belong.' },
      { mistake: 'Choosing the wrong length', why: 'A shift dress works best just above or at the knee. Too long and it loses its mod charm; too short and it rides up because there\'s no waist definition to anchor it.' }
    ],
    variations: [
      'Add a back zipper and lining for a cocktail version',
      'Use a bold print fabric — the simple silhouette is a perfect canvas',
      'Add pockets in the side seams (always add pockets)',
      'Create a color-blocked version with contrasting yoke or hem band'
    ],
    supplies: [
      { item: 'Fabric', qty: '2–2.5 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Lightweight fusible interfacing', qty: '½ yard (for facings)', essential: true },
      { item: 'Invisible zipper', qty: '1 (20–22")', essential: false, note: 'For a back-zip version' },
      { item: 'Lining fabric', qty: '2 yards', essential: false, note: 'Optional — makes the dress feel luxurious and hang better' }
    ],
    relatedProjects: ['aLineSkirt', 'wrapDress', 'pencilSkirt']
  },

  {
    id: 'wrapSkirt',
    name: 'Wrap Skirt',
    audiences: ['women'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'A skirt that wraps around the body and ties or buttons at the waist — no zipper, no elastic, no fuss. The front panel overlaps to create a clean line that can be adjusted for fit. One of the fastest garments you can make.',
    whyItWorks: 'Zero closures to install. The wrap makes fit adjustable — gain or lose a few pounds and the skirt still works. The overlap creates an elegant line and subtle movement when walking.',
    fabricAdvice: 'Medium-weight wovens with enough body to hold the overlap flat: cotton twill, linen, chambray, lightweight denim, wool flannel. Cotton voile and rayon work for a flowy summer version.',
    fabricWarning: 'Very heavy fabrics create too much bulk at the overlap. Very light fabrics may blow open in wind — add a hidden snap or button for security.',
    requirements: { structure: { min: 45, weight: 1.2 }, durability: { min: 50 }, wrinkleResistance: { min: 30 } },
    construction: [
      { step: 'Cut front overlap panel, underpanel, and back', detail: 'The front overlap piece is wider than the underpanel — it needs to reach from one side seam, across the front, and past the other side seam to the tie point.' },
      { step: 'Sew side seams', detail: 'Join front underpanel to back. The overlap panel attaches at one side seam only — the other side stays free for wrapping.' },
      { step: 'Finish the wrap edge', detail: 'Narrow hem the free edge of the overlap panel. This edge is visible, so take care with the finish.' },
      { step: 'Make and attach ties', detail: 'Sew fabric tubes, turn right side out, press. Attach at the waistline where the wrap begins and at the side seam.' },
      { step: 'Attach waistband', detail: 'A simple fold-over waistband or faced waist finish. The ties thread through or attach at the ends.' },
      { step: 'Hem', detail: 'Double-fold hem all around. The overlap panel hem should match the skirt hem exactly — no step where they meet.' }
    ],
    techniques: ['doubleHem', 'topstitching'],
    mistakes: [
      { mistake: 'Overlap too narrow', why: 'The front panel needs to overlap by at least 4–6 inches past center front, or the skirt will flash open when you walk or sit. More overlap is always better.' },
      { mistake: 'Ties too short', why: 'Same as wrap dress — generous tie length. You need enough to wrap around, tie a knot or bow, and have tails that hang nicely.' },
      { mistake: 'Mismatched hemlines', why: 'Where the overlap panel meets the underpanel, the hems must align perfectly. Mark and check before sewing the hem.' }
    ],
    variations: [
      'Add a ruffle along the overlap edge',
      'Use a contrasting print for the underpanel (visible when it peeks out)',
      'Make it reversible with two coordinating fabrics',
      'Add belt loops and use a wide fabric sash instead of ties'
    ],
    supplies: [
      { item: 'Fabric', qty: '1.5–2 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Lightweight fusible interfacing', qty: '¼ yard (optional, for waistband)', essential: false },
      { item: 'Snap or button', qty: '1', essential: false, note: 'Hidden closure at the inner overlap for wind security' }
    ],
    relatedProjects: ['aLineSkirt', 'circleSkirt', 'wrapDress']
  },

  {
    id: 'pencilSkirt',
    name: 'Pencil Skirt',
    audiences: ['women'],
    skill: 'intermediate',
    time: 'weekend',
    timeLabel: 'Weekend project',
    overview: 'A fitted, straight skirt that follows the line of the body from waist to knee. A staple of professional and dressy wardrobes. Requires more precise fitting than an A-line but rewards you with a polished, tailored silhouette.',
    whyItWorks: 'The pencil skirt is essentially a tube with shaping darts — structurally simple but the fit must be right. Once you master the pencil skirt, you understand darts, ease, and fitting fundamentals that apply to every garment.',
    fabricAdvice: 'Medium-weight fabrics with some structure: wool suiting, cotton sateen, stretch poplin, ponte knit, linen blends. A small percentage of stretch (2–5% spandex) makes fitting easier and wearing more comfortable.',
    fabricWarning: 'Pure wovens with no stretch need precise fitting and a walking vent — otherwise you can\'t take a full stride. Very drapey fabrics show every lumping of undergarments.',
    requirements: { structure: { min: 50, weight: 1.3 }, durability: { min: 60 }, drape: { min: 30 } },
    construction: [
      { step: 'Cut front and back panels', detail: 'Most pencil skirt patterns have 2 or 4 pieces. The 4-piece version (2 fronts, 2 backs) has a center seam that helps with fitting and allows for a back vent.' },
      { step: 'Sew and press darts', detail: 'Front darts and back darts shape the skirt from a flat piece into a 3D shape. Pin, sew from wide end to point, and press toward center.' },
      { step: 'Sew center back seam and vent', detail: 'Leave the bottom 6–8 inches open for the walking vent. Finish the vent edges neatly — they\'re visible when you walk.' },
      { step: 'Sew side seams', detail: 'Try on at this point (pin closed). Adjust side seams if the skirt is too tight or too loose through the hips.' },
      { step: 'Install zipper', detail: 'Usually an invisible zipper in the center back seam, above the vent.' },
      { step: 'Attach waistband', detail: 'Interface for structure. A petersham or grosgrain ribbon waistband facing is the tailored approach.' },
      { step: 'Hem', detail: 'Blind hem for a clean finish. The hem should hit at or just below the knee for a classic length.' }
    ],
    techniques: ['darts', 'invisibleZipper', 'blindHem', 'walkingVent'],
    mistakes: [
      { mistake: 'Darts pointing the wrong direction', why: 'Front darts press toward center. Back darts press toward center. Reversing them creates visible ridges on the outside.' },
      { mistake: 'No walking vent', why: 'Without a vent or kick pleat, a straight pencil skirt restricts your stride to tiny steps. Always include one.' },
      { mistake: 'Too tight through the hips', why: 'A pencil skirt should fit closely but not pull or strain. You should be able to pinch about 1" of ease at the fullest hip point.' },
      { mistake: 'Lining that\'s the same length as the skirt', why: 'Cut the lining 1" shorter than the skirt so it doesn\'t peek below the hem. Also leave the lining free from the vent.' }
    ],
    variations: [
      'Add a lining for comfort and a polished inside',
      'Use a high waist for a vintage silhouette',
      'Add a peplum at the waist for drama',
      'Try an asymmetric hem for a modern twist'
    ],
    supplies: [
      { item: 'Fabric', qty: '1.5 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Invisible zipper', qty: '1 (9")', essential: true },
      { item: 'Lightweight fusible interfacing', qty: '½ yard', essential: true },
      { item: 'Lining fabric', qty: '1.5 yards', essential: false, note: 'Recommended for wool and silk' },
      { item: 'Hook and eye', qty: '1', essential: true },
      { item: 'Petersham ribbon (1")', qty: '1 yard', essential: false, note: 'For a professional waistband facing' }
    ],
    relatedProjects: ['aLineSkirt', 'shiftDress', 'tailoredTrousers']
  },

  {
    id: 'circleSkirt',
    name: 'Circle Skirt',
    audiences: ['women', 'kids'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'A full circle of fabric with a hole cut for the waist — maximum twirl, minimal construction. When you spin, it fans out into a perfect circle. The simplest skirt from a construction standpoint but uses more fabric than any other style.',
    whyItWorks: 'One pattern piece (or two half-circles). No side seams if you use one piece, or just one or two seams if you use halves. The fabric\'s own weight creates the drape. The only fitting challenge is the waist.',
    fabricAdvice: 'Light to medium weight fabrics that drape well: cotton lawn, rayon challis, chambray, lightweight linen, jersey knit. Heavier fabrics create too much bulk at the waist where all that fabric gathers.',
    fabricWarning: 'A full circle skirt uses a LOT of fabric — about 2x your desired length plus waist measurement. Budget accordingly. Also, because the fabric hangs on the bias around much of the circle, it will stretch and drop after cutting — let it hang for 24 hours before hemming.',
    requirements: { drape: { min: 55, weight: 1.3 }, breathability: { min: 50 } },
    construction: [
      { step: 'Calculate and cut the circle', detail: 'Waist radius = waist measurement ÷ 6.28 (2π). Mark this radius from a corner, then add your desired length to get the outer cutting radius. Cut through all layers.' },
      { step: 'Sew seam (if using half circles)', detail: 'Join the two halves, leaving an opening in one seam for the zipper or closing with an elastic waist.' },
      { step: 'Add waistband or elastic casing', detail: 'An elastic waist is simplest: fold and stitch a casing, thread elastic through. A fitted waistband needs a zipper.' },
      { step: 'Let the skirt hang', detail: 'Hang the skirt on a hanger or dress form for at least 24 hours. The bias sections will stretch and the hem will become uneven — this is normal and expected.' },
      { step: 'Level and hem', detail: 'After hanging, put the skirt on and have someone mark the hem at a consistent height from the floor. Trim to the marked line, then hem. A narrow rolled hem works beautifully with the drape.' }
    ],
    techniques: ['rolledHem', 'elasticCasing'],
    mistakes: [
      { mistake: 'Hemming before hanging', why: 'The bias sections stretch 1–2 inches after cutting. If you hem immediately, the skirt will have visible dips at the bias points within a day.' },
      { mistake: 'Not enough fabric', why: 'A full circle skirt for a knee-length requires about 3 yards of 60"-wide fabric or 4+ yards of 45"-wide. Always calculate before buying.' },
      { mistake: 'Pressing the seam flat at the waist', why: 'A circle skirt seam naturally curves. Press it over a tailor\'s ham (or a rolled towel), following the curve, not flattening it.' }
    ],
    variations: [
      'Make a half-circle for less volume and less fabric',
      'Layer a circle skirt over a tulle petticoat for a 1950s look',
      'Use a directional print for a kaleidoscope effect when it fans out',
      'Add a wide contrasting hem band'
    ],
    supplies: [
      { item: 'Fabric', qty: '3–4.5 yards (depends on width and length)', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Elastic (1")', qty: 'Waist measurement + 1"', essential: false, note: 'For elastic waist version' },
      { item: 'Invisible zipper', qty: '1 (7")', essential: false, note: 'For fitted waistband version' },
      { item: 'String and chalk', qty: '', essential: true, note: 'For marking the circle — tie chalk to a string at your radius length and swing it like a compass' }
    ],
    relatedProjects: ['aLineSkirt', 'wrapSkirt', 'raglanTop']
  },

  {
    id: 'buttonUpShirt',
    name: 'Button-Up Shirt',
    audiences: ['women', 'men'],
    skill: 'advanced',
    time: 'multi-day',
    timeLabel: 'Multi-day project',
    overview: 'The classic collared shirt with a button-front placket. This is the Mount Everest of basic garments — it combines nearly every fundamental sewing skill: collars, cuffs, plackets, buttonholes, set-in sleeves, and precise topstitching. Deeply satisfying when it comes together.',
    whyItWorks: 'A button-up shirt teaches more sewing skills than almost any other single project. Every technique you learn here transfers to jackets, coats, and tailored garments. The order of construction matters — each step builds on the last.',
    fabricAdvice: 'Light to medium weight wovens: cotton shirting (poplin, oxford cloth, broadcloth), linen, chambray, silk habotai, lightweight wool. The fabric should be opaque, stable on grain, and press crisply.',
    fabricWarning: 'Avoid stretch fabrics for your first attempt — buttonholes and plackets need stable fabric. Plaids and stripes require careful pattern matching that adds significant time and complexity.',
    requirements: { breathability: { min: 60, weight: 1.1 }, structure: { min: 35 }, wrinkleResistance: { min: 25 }, washability: { min: 55 } },
    construction: [
      { step: 'Cut all pieces', detail: 'Front (2), back (1 or 2 with yoke), sleeves (2), collar (2 + stand), cuffs (2), and button placket strip. Many pieces — lay them all out before starting.' },
      { step: 'Sew back yoke', detail: 'The yoke joins the two back pieces (or one piece to the yoke) and provides a clean finish at the upper back. Sandwich the back between two yoke pieces for a self-finished seam.' },
      { step: 'Construct button placket', detail: 'Fold and press the front button band. This needs to be straight and even — it\'s the centerline of the entire shirt.' },
      { step: 'Construct collar and collar stand', detail: 'Sew the collar pieces together, turn, press. Then sandwich between collar stand pieces. This is the most precise step — sharp points and even curves matter.' },
      { step: 'Attach collar to neckline', detail: 'Pin carefully, matching center backs. The collar stand wraps around the neckline and the top edge of the placket.' },
      { step: 'Set sleeves', detail: 'Sew the flat sleeve to the armhole before closing the side seam. Then sew the side seam and underarm seam in one continuous pass.' },
      { step: 'Construct and attach cuffs', detail: 'Create the sleeve placket opening, pleat or gather the sleeve bottom, then sandwich between cuff pieces. Interface cuffs for structure.' },
      { step: 'Make buttonholes and sew buttons', detail: 'Mark buttonhole positions carefully — they should be evenly spaced and centered on the placket. Always test buttonholes on scrap fabric first.' },
      { step: 'Hem', detail: 'A narrow shirt-tail hem (curved) or straight hem, depending on whether the shirt is tucked or untucked.' }
    ],
    techniques: ['collarConstruction', 'buttonholes', 'setInSleeve', 'topstitching', 'flatFelledSeam'],
    mistakes: [
      { mistake: 'Collar points not sharp', why: 'Trim the seam allowance at the collar points to reduce bulk, then use a point turner (not scissors) to push them out. Press carefully from the right side.' },
      { mistake: 'Button band not straight', why: 'If the button placket wavers, the entire shirt looks off. Press the folds before sewing, then stitch slowly and carefully. Use a seam guide.' },
      { mistake: 'Buttonholes too loose or tight', why: 'Always make test buttonholes on a scrap of the same fabric with the same interfacing. Button size + ⅛" is the standard length.' },
      { mistake: 'Rushed collar-stand attachment', why: 'This is the step where shirts go wrong. Pin obsessively, baste first, and check from the outside before final stitching. If it\'s not right, take it out and redo it.' },
      { mistake: 'Sleeves set in backwards', why: 'The sleeve cap has a front and back — the back is usually slightly fuller. Mark \"front\" on each sleeve after cutting. Getting this wrong means ripping and resetting.' }
    ],
    variations: [
      'Short sleeves (skip the cuff construction)',
      'Mandarin/band collar instead of a traditional fold-over collar',
      'Camp collar for a relaxed, 1950s-inspired look',
      'Hidden placket (French front) for a cleaner look'
    ],
    supplies: [
      { item: 'Shirting fabric', qty: '2.5–3 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Lightweight fusible interfacing', qty: '½ yard', essential: true, note: 'For collar, collar stand, cuffs, and button band' },
      { item: 'Buttons', qty: '7–9 (shirt size, typically 3/8" to 7/16")', essential: true },
      { item: 'Point turner', qty: '1', essential: true, note: 'For crisp collar points — a chopstick works in a pinch' },
      { item: 'Seam gauge', qty: '1', essential: false, note: 'For consistent buttonhole spacing' }
    ],
    relatedProjects: ['raglanTop', 'shiftDress']
  },

  {
    id: 'tailoredTrousers',
    name: 'Tailored Trousers',
    audiences: ['women', 'men'],
    skill: 'advanced',
    time: 'multi-day',
    timeLabel: 'Multi-day project',
    overview: 'Fitted trousers with a fly front zipper, waistband, and pockets. One of the most rewarding and challenging home sewing projects. Fit is everything — a beautifully fitted pair of trousers elevates an entire wardrobe.',
    whyItWorks: 'Trousers teach fitting skills that no other garment does: crotch curve, inseam, rise, and the relationship between waist and hip. The fly zipper and pocket construction build precision. Once you can make trousers that fit, you can make anything.',
    fabricAdvice: 'Medium-weight wovens with body and recovery: wool gabardine, cotton twill, stretch poplin (2% spandex), linen blend, tropical weight wool. A small amount of stretch makes fitting dramatically easier.',
    fabricWarning: 'Pure linen wrinkles heavily in the crotch area — blend with cotton or add stretch. Very lightweight fabrics show every fitting issue. Save denim for after you\'ve mastered the fit in a lighter fabric.',
    requirements: { structure: { min: 55, weight: 1.3 }, durability: { min: 65, weight: 1.1 }, wrinkleResistance: { min: 35 } },
    construction: [
      { step: 'Cut front, back, waistband, and pocket pieces', detail: 'Trousers have a lot of pieces: 2 fronts, 2 backs, waistband, pocket bags, fly facing, fly shield. Label everything.' },
      { step: 'Construct pockets', detail: 'Slant pockets or welt pockets attach early, before the side seams are closed. Baste pocket openings closed while sewing to prevent stretching.' },
      { step: 'Sew darts and pleats', detail: 'Back darts shape for the seat. Front pleats (if any) add ease through the thigh. Press darts toward center back.' },
      { step: 'Sew inseams and side seams', detail: 'Try on at this stage with pins or basting. This is your last easy chance to adjust width through the thigh, knee, and hem.' },
      { step: 'Construct and install fly zipper', detail: 'The fly front is a multi-step process: attach zipper to fly facing, sew fly shield, topstitch the J-curve on the outside. Follow the pattern steps exactly.' },
      { step: 'Sew crotch seam', detail: 'The curved seam from front fly through to center back. Reinforce with a second row of stitching — this seam takes stress.' },
      { step: 'Attach waistband', detail: 'Interface, sew on, fold and press. A curtain hook and bar or button closure at the top of the fly.' },
      { step: 'Hem', detail: 'A blind hem for dress trousers. Topstitched for casual. Consider having the length professionally marked while wearing shoes.' }
    ],
    techniques: ['darts', 'flyZipper', 'weltPockets', 'blindHem', 'topstitching'],
    mistakes: [
      { mistake: 'Skipping the muslin fitting', why: 'Trousers are the one garment where a test version is not optional. The crotch curve, rise, and thigh proportions vary wildly between bodies. Fit the muslin, transfer adjustments, then cut your good fabric.' },
      { mistake: 'Fly zipper topstitching wavers', why: 'Mark the J-curve on the outside with chalk or washable marker before topstitching. Use a zipper foot and go slowly. There\'s no hiding a wobbly fly topstitch.' },
      { mistake: 'Ignoring the grain on the leg', why: 'The straight grain must run straight down the center of each leg, from hip to ankle. Off-grain legs twist around the body during wear.' },
      { mistake: 'Not reinforcing the crotch seam', why: 'This seam endures enormous stress (sitting, bending, walking). Sew it twice or use a stretch stitch. A popped crotch seam in public is a sewing nightmare.' }
    ],
    variations: [
      'Wide-leg for a flowing, relaxed silhouette',
      'Cropped at the ankle for a modern proportion',
      'Add a cuff for a classic tailored look',
      'Elasticized back waist for comfort with a clean front'
    ],
    supplies: [
      { item: 'Fabric', qty: '2.5–3 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Zipper', qty: '1 (7" for fly)', essential: true },
      { item: 'Fusible interfacing', qty: '½ yard', essential: true, note: 'For waistband and fly facing' },
      { item: 'Pocketing fabric', qty: '½ yard', essential: true, note: 'Lightweight cotton for pocket bags' },
      { item: 'Button or hook/bar closure', qty: '1', essential: true },
      { item: 'Muslin or cheap fabric', qty: '2.5 yards', essential: true, note: 'For the test garment — do not skip this' },
      { item: 'Seam gauge', qty: '1', essential: false }
    ],
    relatedProjects: ['pencilSkirt', 'buttonUpShirt']
  },

  {
    id: 'palazzo',
    name: 'Palazzo Pants',
    audiences: ['women'],
    skill: 'beginner',
    time: 'weekend',
    timeLabel: 'Weekend project',
    overview: 'Wide-leg, flowing pants with an elastic or drawstring waist. The comfort of pajama pants with the elegance of a formal garment — it\'s all about fabric choice. Essentially two rectangles shaped into tubes with a crotch curve, these are the most approachable pants you can sew.',
    whyItWorks: 'The wide leg means fit through the thigh is very forgiving. The elastic waist eliminates zipper and fly construction. The silhouette reads as dressy despite being one of the simplest pant constructions.',
    fabricAdvice: 'Drapey fabrics that flow: rayon challis, silk crepe, linen, viscose, tencel twill. The drape of the fabric is everything — the wider the leg, the more fluid the fabric should be.',
    fabricWarning: 'Stiff fabrics (denim, canvas, heavy cotton) will stick out sideways instead of draping down. These are not palazzo pants — they\'re culottes. Know the difference before you cut.',
    requirements: { drape: { min: 70, weight: 1.4 }, breathability: { min: 55 }, softness: { min: 50 } },
    construction: [
      { step: 'Cut front and back pieces', detail: 'Wide-leg pants have very simple pieces — the leg is nearly rectangular with just a crotch curve shaping at the top. Cut on grain for the leg to fall straight.' },
      { step: 'Sew inseams', detail: 'Join front to back at the inner leg seam. French seams work beautifully here and prevent raw edges from showing through sheer or light fabrics.' },
      { step: 'Sew crotch seam', detail: 'Join the two legs at the center front and back curve. Reinforce with a second line of stitching in the curved area.' },
      { step: 'Create waistband casing', detail: 'Fold the top edge down to create a channel for elastic or a drawstring. Leave an opening to thread it through.' },
      { step: 'Insert elastic or drawstring', detail: 'Thread elastic through (cut to waist measurement minus 2"), overlap ends, and stitch closed. Close the casing opening.' },
      { step: 'Hem', detail: 'These should be long — just skimming the top of the foot. A narrow hem keeps the hem light and flowing.' }
    ],
    techniques: ['frenchSeam', 'elasticCasing', 'rolledHem'],
    mistakes: [
      { mistake: 'Not enough width in the leg', why: 'Palazzo pants need at least 28–32" of circumference at the hem to read as true wide-leg. Anything narrower is a different pant style.' },
      { mistake: 'Too much bulk at the waist', why: 'If your fabric is heavier, use a separate waistband piece in a lighter fabric rather than folding over the pant fabric itself.' },
      { mistake: 'Wrong length', why: 'Too short and they look like culottes. The hem should just touch the top of the shoe or the floor. Always try on with the shoes you\'ll wear.' }
    ],
    variations: [
      'Add side slits at the hem for movement and a peek of shoe',
      'Use a contrasting drawstring as a design feature',
      'Create a paper-bag waist (gathered, with a belt) instead of elastic',
      'Try a jumpsuit by connecting to a simple bodice'
    ],
    supplies: [
      { item: 'Drapey fabric', qty: '2.5–3 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Elastic (1" wide)', qty: 'Waist measurement + 1"', essential: true },
      { item: 'Safety pin (large)', qty: '1', essential: true, note: 'For threading elastic through the casing' },
      { item: 'Drawstring cord', qty: '2 yards', essential: false, note: 'Alternative to elastic — for a tie-front look' }
    ],
    relatedProjects: ['circleSkirt', 'wrapSkirt', 'wrapDress']
  },

  {
    id: 'linedJacket',
    name: 'Unstructured Jacket',
    audiences: ['women'],
    skill: 'intermediate',
    time: 'multi-day',
    timeLabel: 'Multi-day project',
    overview: 'An open-front or single-button jacket without internal structure (no shoulder pads, no canvas, no heavy interfacing). Think chore coat, kimono jacket, or soft blazer. The lining gives it a clean interior without the complexity of traditional tailoring.',
    whyItWorks: 'An unstructured jacket delivers 80% of the impact of a tailored blazer at 30% of the difficulty. No pad-stitching, no lapel shaping, no chest canvas. The fabric and the lining do the work. It\'s the bridge between "I can sew a shirt" and "I can sew a real jacket."',
    fabricAdvice: 'Medium-weight fabrics with enough body to hold a jacket shape: linen, cotton twill, lightweight wool, denim, boiled wool, ponte knit. The fabric should drape off the shoulders without collapsing.',
    fabricWarning: 'Very lightweight fabrics (lawn, voile) won\'t hold a jacket shape. Very heavy fabrics (heavy wool coating) need real tailoring techniques to handle properly — this pattern isn\'t designed for them.',
    requirements: { structure: { min: 55, weight: 1.4 }, durability: { min: 65, weight: 1.2 }, heatTolerance: { min: 50 } },
    construction: [
      { step: 'Cut outer and lining pieces', detail: 'Cut the lining from the same pattern pieces but ¼" smaller at the hem and center front — this "jump hem" ensures the lining never peeks out.' },
      { step: 'Sew outer jacket body', detail: 'Shoulder seams, side seams, and back seam (if any). Press seams open for a flat finish.' },
      { step: 'Set sleeves in the outer jacket', detail: 'Ease the sleeve cap into the armhole. The key is distributing the ease evenly — no tucks or pleats.' },
      { step: 'Sew the lining body and sleeves separately', detail: 'Same order as the outer, but leave a 6" opening in one lining side seam for turning.' },
      { step: 'Join lining to outer at the neckline, front edges, and hem', detail: 'Right sides together, sew all around the outside edges. Turn right side out through the lining opening.' },
      { step: 'Press and close', detail: 'Press all edges from the outside, rolling the lining slightly to the inside so it\'s invisible. Hand-stitch or machine-stitch the lining opening closed.' },
      { step: 'Tack at seam intersections', detail: 'Hand-tack the lining to the outer at shoulder seams and armhole seams to prevent the lining from shifting during wear.' }
    ],
    techniques: ['setInSleeve', 'lining', 'understitching', 'easeDistribution'],
    mistakes: [
      { mistake: 'Lining too tight', why: 'The lining must be slightly smaller than the outer, but not tight. If it pulls, it restricts movement and creates drag lines on the outside. When in doubt, add ease to the lining.' },
      { mistake: 'Forgetting the turn opening', why: 'If you sew the lining completely closed, you can\'t turn the jacket right side out. Classic mistake — seam rip with care.' },
      { mistake: 'Sleeve lining twists', why: 'Before closing the lining, reach through and check that each sleeve lining is smooth inside its sleeve. A twisted lining is deeply uncomfortable and hard to fix once closed.' },
      { mistake: 'Not pressing edges after turning', why: 'The jacket edges need a thorough press after turning to look finished. Roll the lining under so it doesn\'t show at the edges. Skip this and the jacket looks like a costume.' }
    ],
    variations: [
      'Add patch pockets for a chore coat feel',
      'Use a bold lining fabric as a surprise interior',
      'Add a simple shawl collar',
      'Make it in boiled wool for a no-fray, no-lining option'
    ],
    supplies: [
      { item: 'Outer fabric', qty: '2–2.5 yards', essential: true },
      { item: 'Lining fabric', qty: '2 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Fusible interfacing', qty: '½ yard', essential: true, note: 'For neckline and front edges' },
      { item: 'Buttons', qty: '1–3', essential: false, note: 'For single-button or buttoned-front versions' },
      { item: 'Shoulder pads (thin)', qty: '1 pair', essential: false, note: 'Optional — thin raglan pads give structure without bulk' }
    ],
    relatedProjects: ['buttonUpShirt', 'tailoredTrousers']
  },

  {
    id: 'tankTop',
    name: 'Tank Top / Camisole',
    audiences: ['women', 'kids'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'A sleeveless top with spaghetti straps or wider shoulder straps. Two pattern pieces (front and back), bias binding or facing at the neckline and armholes, and you\'re done. The fastest garment in your repertoire — you can easily make three or four in an afternoon once you have the fit dialed in.',
    whyItWorks: 'Maximum simplicity: no sleeves, no collar, no closures. The bias binding at the neckline and armholes is the only technique to master. Because it\'s so quick, it\'s a great project for testing new fabrics — make a tank top to learn a fabric\'s behavior before committing to a bigger garment.',
    fabricAdvice: 'Lightweight drapey fabrics: cotton lawn, voile, rayon challis, silk charmeuse, linen handkerchief weight, jersey knit. For everyday tanks, cotton knit (jersey) gives comfortable stretch without closures.',
    fabricWarning: 'Very sheer fabrics need lining or a layering strategy. Stiff fabrics (poplin, canvas) make awkward tanks — they stand away from the body instead of following the natural shape.',
    requirements: { drape: { min: 55, weight: 1.1 }, softness: { min: 55 }, breathability: { min: 65, weight: 1.2 } },
    construction: [
      { step: 'Cut front and back', detail: 'For knits, cut slightly smaller than your measurements — the stretch provides the ease. For wovens, add standard ease.' },
      { step: 'Sew side seams', detail: 'French seams for sheer wovens, serged seams for knits, or simple pressed-open seams for opaque wovens.' },
      { step: 'Finish neckline', detail: 'Bias binding is the classic finish: cut strips on the bias, sew to neckline, fold over, and topstitch. Alternatively, use a narrow facing.' },
      { step: 'Finish armholes', detail: 'Same technique as neckline — bias binding or facing. If using straps, attach them here.' },
      { step: 'Hem', detail: 'A narrow ½" double-fold hem. For knits, a twin needle gives a clean stretch hem.' }
    ],
    techniques: ['biasBinding', 'frenchSeam', 'narrowHem'],
    mistakes: [
      { mistake: 'Bias binding too tight around curves', why: 'When sewing bias binding around a concave curve (like the underarm), the binding needs to be eased slightly shorter than the fabric to lie flat. If it\'s tight, it puckers.' },
      { mistake: 'Gaping armholes', why: 'Armholes that are cut too wide will gap and show your bra or side body. Fit check in person before finishing — it\'s easy to take in a deeper armhole, hard to let one out.' },
      { mistake: 'Strap length wrong', why: 'Too long and the neckline droops. Too short and the whole garment rides up. Baste straps first and try on before final stitching.' }
    ],
    variations: [
      'Racerback for an athletic look',
      'V-neckline with mitered binding',
      'Add a waist tie for a cropped, bloused effect',
      'Layer over a long-sleeve tee for a camisole look'
    ],
    supplies: [
      { item: 'Fabric', qty: '1–1.5 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Bias tape (single-fold, ½")', qty: '3 yards', essential: true, note: 'Or cut your own from matching fabric' },
      { item: 'Spaghetti strap elastic', qty: '1 yard', essential: false, note: 'For adjustable straps' }
    ],
    relatedProjects: ['raglanTop', 'shiftDress', 'circleSkirt']
  },

  {
    id: 'maxiDress',
    name: 'Maxi Dress',
    audiences: ['women'],
    skill: 'beginner',
    time: 'weekend',
    timeLabel: 'Weekend project',
    overview: 'A floor-length dress, usually with a simple bodice (elastic waist, empire seam, or shirred bust) and a long, flowing skirt. The length makes it feel dramatic, but the construction is often simpler than a shorter fitted dress because the silhouette is loose and forgiving.',
    whyItWorks: 'A maxi dress lets gravity do the design work. The long skirt creates movement and elegance with zero structured sewing. Most versions are essentially a tank top joined to a long gathered or A-line skirt.',
    fabricAdvice: 'Lightweight drapey fabrics are essential: rayon challis, cotton gauze, jersey knit, viscose, silk habotai, tencel. The fabric must flow — stiff fabrics make a maxi dress look like a nightgown.',
    fabricWarning: 'You\'ll need a LOT of fabric — at least 3.5 yards for a standard length, up to 5 for a gathered skirt on taller sewists. Also consider opacity — in bright light, you may need a slip or lining.',
    requirements: { drape: { min: 65, weight: 1.4 }, breathability: { min: 60, weight: 1.1 }, softness: { min: 50 } },
    construction: [
      { step: 'Cut bodice and skirt pieces', detail: 'The bodice can be as simple as two rectangles (for a shirred/elastic version) or a shaped tank-style pattern piece.' },
      { step: 'Construct bodice', detail: 'For a shirred bodice: sew rows of shirring elastic on a flat piece of fabric, then sew the back seam. For a shaped bodice: sew darts, side seams, and finish neckline.' },
      { step: 'Gather or pleat the skirt', detail: 'If the skirt is wider than the bodice (it usually is), gather or pleat to fit. Run two rows of basting stitches and pull to gather evenly.' },
      { step: 'Join bodice to skirt', detail: 'Right sides together at the waist or empire seam line. Finish the seam with a serger or zigzag.' },
      { step: 'Add straps or sleeves', detail: 'Attach spaghetti straps, tie straps, or short flutter sleeves depending on the style.' },
      { step: 'Hem', detail: 'A narrow rolled hem is ideal for drapey fabrics. Let the dress hang for 24 hours before hemming, as bias areas will drop.' }
    ],
    techniques: ['gathering', 'shirring', 'rolledHem', 'biasBinding'],
    mistakes: [
      { mistake: 'Bodice too loose at the bust', why: 'A loose bodice on a maxi dress looks sloppy. The bodice needs to fit well to anchor all that skirt fabric. Fit the bodice before attaching the skirt.' },
      { mistake: 'Too heavy fabric', why: 'A full-length dress in heavy cotton or linen will weigh on your body all day. Light and flowy is the whole point of a maxi.' },
      { mistake: 'Not hemming after hanging', why: 'Same as the circle skirt — bias areas stretch. A maxi is usually ankle-length, so even small unevenness is visible at that length.' }
    ],
    variations: [
      'Tiered maxi with 3–4 gathered tiers for maximum flow',
      'Empire waist with a fitted bust and loose skirt from just below the bust',
      'Halter neckline for summer',
      'Side slits for easier walking and a more modern look'
    ],
    supplies: [
      { item: 'Drapey fabric', qty: '3.5–5 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Shirring elastic', qty: '1 spool', essential: false, note: 'For shirred bodice version only' },
      { item: 'Bias tape', qty: '2 yards', essential: false, note: 'For neckline and armhole finishing' },
      { item: 'Lining fabric', qty: '2 yards', essential: false, note: 'For a slip lining if fabric is sheer' }
    ],
    relatedProjects: ['wrapDress', 'circleSkirt', 'tankTop']
  },

  // ── MEN'S CLOTHING ──

  {
    id: 'campShirt',
    name: 'Camp Collar Shirt',
    audiences: ['men', 'women'],
    skill: 'intermediate',
    time: 'weekend',
    timeLabel: 'Weekend',
    overview: 'A relaxed, boxy shirt with an open, notch-style collar that lays flat — no collar stand. The camp collar (also called a convertible or revere collar) is the signature of aloha shirts, bowling shirts, and the relaxed linen shirts you see everywhere in summer. Easier than a dress shirt because the collar construction is simpler.',
    whyItWorks: 'It teaches collar shaping, front placket, and sleeve setting without the precision demands of a formal shirt. The boxy fit is extremely forgiving of measurement variations.',
    fabricAdvice: 'Lightweight to medium-weight wovens with good drape. Linen, cotton lawn, rayon/viscose, and cotton voile are ideal. The fabric should be soft enough to let the collar lay flat naturally.',
    fabricWarning: 'Stiff or heavy fabrics will make the collar stick out instead of laying flat. Avoid canvas, denim, or heavy twill.',
    requirements: { drape: { min: 50, weight: 1.1 }, breathability: { min: 65, weight: 1.2 } },
    construction: [
      { step: 'Cut all pieces', detail: 'Front (2, with placket facing), back, sleeves, collar (2 + interfacing), and optional pocket.' },
      { step: 'Interface and sew collar', detail: 'Fuse interfacing to under-collar. Sew upper and under collar right sides together along outer edges. Turn, press, and understitch.' },
      { step: 'Sew shoulder seams', detail: 'Join front to back at shoulders. Press seams open or finish with flat-felled seams for a clean interior.' },
      { step: 'Attach collar to neckline', detail: 'Pin collar to neckline matching notches. The collar ends should align with the front placket fold. Sew, grade seam allowances, press.' },
      { step: 'Set sleeves', detail: 'Set-in sleeves with a straight or slightly curved cap. Ease in any fullness at the cap. Or use a flat (shirt-style) construction — sew sleeve to open armhole before closing side seams.' },
      { step: 'Close side seams', detail: 'Sew from sleeve hem to shirt hem in one continuous seam. Finish seam allowances.' },
      { step: 'Hem sleeves and body', detail: 'Narrow double-fold hem on sleeves. Wider (1") double-fold hem on body. Press before stitching.' },
      { step: 'Buttonholes and buttons', detail: 'Mark buttonhole spacing evenly down the placket. Sew buttonholes, cut open carefully, sew on buttons.' }
    ],
    techniques: ['flatFelledSeam', 'doubleHem'],
    mistakes: [
      { mistake: 'Collar doesn\'t lay flat', why: 'Usually caused by too much fabric in the collar or not enough interfacing. The under-collar should be cut slightly smaller than the upper collar so the seam rolls to the underside.' },
      { mistake: 'Uneven placket', why: 'Mark button placement from the top down with the shirt buttoned up. Even tiny spacing errors become obvious over 5-6 buttons.' },
      { mistake: 'Sleeves too tight in the bicep', why: 'Camp shirts should have a relaxed sleeve. Add 2-3" of ease beyond your bicep measurement. The shirt hangs better when the sleeves aren\'t pulling.' }
    ],
    variations: [
      'Shorten to a boxy cropped length',
      'Add a chest pocket (or two) for a classic look',
      'Use a contrast fabric on the collar and pocket for a retro feel',
      'Make it in linen with no buttons — just a pullover with 3-button placket'
    ],
    supplies: [
      { item: 'Fabric', qty: '2.5–3 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Lightweight fusible interfacing', qty: '¼ yard (for collar)', essential: true },
      { item: 'Buttons', qty: '6–7 (½"–⅝")', essential: true },
      { item: 'Point turner', qty: '1', essential: false, note: 'For crisp collar points' }
    ],
    relatedProjects: ['buttonUpShirt', 'raglanTop', 'tankTop']
  },

  {
    id: 'drawstringPants',
    name: 'Drawstring Pants',
    audiences: ['men', 'women', 'kids'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'Simple pull-on pants with an elastic or drawstring waistband. Two leg pieces (front and back) joined at the inseam and side seams — no zipper, no fly, no complicated waistband construction. The pajama-pant-to-linen-trouser spectrum.',
    whyItWorks: 'This is the easiest bottoms project. No closures, no fitting challenges, and the drawstring waist means you don\'t need precise measurements. It builds confidence with inseam and crotch curve sewing.',
    fabricAdvice: 'Lightweight to medium wovens. Linen is the classic choice — it softens beautifully and has the right drape for a relaxed pant. Cotton gauze, cotton lawn, and chambray also work well. Medium-weight cotton makes structured casual pants.',
    fabricWarning: 'Very stiff fabrics will feel like cardboard without the structure of tailored construction. Very stretchy fabrics will sag at the knees without proper pattern adjustments.',
    requirements: { drape: { min: 50 }, breathability: { min: 60, weight: 1.1 }, softness: { min: 45 }, washability: { min: 55 } },
    construction: [
      { step: 'Cut front and back leg pieces', detail: 'Each leg has a front and back piece. The back typically has more room through the seat. Cut on grain — pants cut off-grain will twist.' },
      { step: 'Sew inseams', detail: 'Join front to back at the inseam (inner leg) on each leg separately. Press seams.' },
      { step: 'Sew crotch seam', detail: 'Turn one leg right-side out, place inside the other leg (right sides together), and sew the curved crotch seam from front waist to back waist. This is the trickiest seam — go slowly around the curve.' },
      { step: 'Create waistband casing', detail: 'Fold waist edge down 1.5", creating a channel. Leave a 2" gap for threading the drawstring. Stitch close to the folded edge.' },
      { step: 'Thread drawstring or elastic', detail: 'Attach a safety pin to the drawstring end and thread it through the casing. For elastic, cut to waist measurement minus 2", thread through, and sew ends together.' },
      { step: 'Hem legs', detail: 'Double-fold hem, 1" to 1.5". Press before stitching.' }
    ],
    techniques: ['doubleHem', 'frenchSeam'],
    mistakes: [
      { mistake: 'Twisted legs', why: 'If you don\'t match the inseams perfectly when sewing the crotch seam, one leg will rotate. Pin carefully and match the inseam junction point.' },
      { mistake: 'Crotch seam too short', why: 'Not enough room in the crotch curve means the pants ride up. Always do a fit check (try them on inside out) before hemming.' },
      { mistake: 'Waistband casing too tight for drawstring', why: 'The casing needs to be wide enough for the drawstring to slide freely. Make it at least ¼" wider than your drawstring cord.' }
    ],
    variations: [
      'Taper the legs for a slim fit',
      'Add side pockets by cutting into the side seam',
      'Use elastic in the back and drawstring in the front for a cleaner look',
      'Make them ankle-length (cropped) for summer'
    ],
    supplies: [
      { item: 'Fabric', qty: '2.5–3 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Drawstring cord or ribbon', qty: '2 yards', essential: true },
      { item: 'Elastic (1" wide)', qty: 'Waist + 2"', essential: false, note: 'Alternative to drawstring' },
      { item: 'Safety pin', qty: '1 (large)', essential: true, note: 'For threading drawstring through casing' }
    ],
    relatedProjects: ['palazzo', 'tailoredTrousers']
  },

  {
    id: 'henleyShirt',
    name: 'Henley Shirt',
    audiences: ['men', 'women'],
    skill: 'intermediate',
    time: 'weekend',
    timeLabel: 'Weekend',
    overview: 'A collarless pullover shirt with a short button placket at the neckline — the halfway point between a T-shirt and a polo. Typically made in jersey knit for a casual look or in waffle knit for a rugged, outdoors feel. Requires working with stretch fabrics.',
    whyItWorks: 'It teaches knit fabric handling, ribbed neckband construction, and button placket insertion — all essential skills for knit garment sewing. The fit is more forgiving than a dress shirt but more refined than a basic tee.',
    fabricAdvice: 'Cotton jersey, cotton-linen jersey, merino jersey, or waffle knit. You need a fabric with at least 25% stretch. Interlock is easier to sew than single jersey because it doesn\'t curl at the edges.',
    fabricWarning: 'Woven fabrics won\'t work — you need stretch for a pullover without a full-length opening. Fabrics with too much lycra will create a compression-fit rather than a relaxed henley.',
    requirements: { stretch: { min: 25, weight: 1.3 }, softness: { min: 55 }, breathability: { min: 60 } },
    construction: [
      { step: 'Cut body and sleeves', detail: 'Front, back, and two sleeves. Cut with the greatest stretch going around the body. Use a ballpoint rotary cutter or weights instead of pins on knits.' },
      { step: 'Sew shoulder seams', detail: 'Use a stretch stitch (narrow zigzag, lightning bolt, or serger). Stabilize shoulder seams with clear elastic or a strip of self-fabric to prevent stretching out.' },
      { step: 'Create and attach placket', detail: 'The button placket is a folded strip of fabric sewn to a slash cut in the center front. Interface it lightly. This is the most complex step — take it slowly.' },
      { step: 'Attach neckband', detail: 'Cut ribbing or self-fabric band to 85-90% of neckline measurement. Quarter-mark both band and neckline, pin at quarters, and stretch the band to fit as you sew.' },
      { step: 'Set sleeves', detail: 'Sew sleeves into the armholes. Match notches for proper cap alignment.' },
      { step: 'Close side seams', detail: 'Sew from sleeve hem to body hem in one pass.' },
      { step: 'Hem sleeves and body', detail: 'Use a twin needle for a professional stretch hem, or a coverstitch machine if you have one. Fold up 1" and stitch.' },
      { step: 'Add buttons', detail: 'Usually 3-4 buttons on the placket. Use flat buttons that sit close to the fabric.' }
    ],
    techniques: ['knifePleats', 'gathering'],
    mistakes: [
      { mistake: 'Wavy seams on knit fabric', why: 'You\'re stretching the fabric as you feed it through the machine. Let the feed dogs do the work. Use a walking foot or reduce presser foot pressure.' },
      { mistake: 'Neckband too loose or too tight', why: 'The band should be cut to 80-90% of the neckline measurement depending on the fabric\'s recovery. Test with a scrap first.' },
      { mistake: 'Skipped stitches on knits', why: 'You need a ballpoint or stretch needle. Universal needles skip stitches on jersey because they pierce the fibers instead of sliding between them.' }
    ],
    variations: [
      'Make it long-sleeved for cold weather',
      'Use thermal/waffle knit for a workwear look',
      'Add a chest pocket',
      'Skip the buttons and just do a notched neckline'
    ],
    supplies: [
      { item: 'Knit fabric', qty: '2–2.5 yards', essential: true },
      { item: 'Matching thread (polyester)', qty: '1 spool', essential: true, note: 'Polyester thread has stretch — cotton thread will snap on knits' },
      { item: 'Ballpoint/jersey needles', qty: '2–3', essential: true },
      { item: 'Lightweight fusible knit interfacing', qty: '⅛ yard (for placket)', essential: true },
      { item: 'Buttons', qty: '3–4 (⅜")', essential: true },
      { item: 'Clear elastic or stay tape', qty: '1 yard', essential: false, note: 'For stabilizing shoulder seams' },
      { item: 'Twin needle', qty: '1 (4mm stretch)', essential: false, note: 'For professional-looking hems' }
    ],
    relatedProjects: ['raglanTop', 'tankTop', 'campShirt']
  },

  {
    id: 'chinos',
    name: 'Chinos',
    audiences: ['men', 'women'],
    skill: 'advanced',
    time: 'multi-day',
    timeLabel: 'Multi-day',
    overview: 'Structured casual trousers with a fly zipper, waistband, belt loops, and welt or slash pockets. The workhorse pant between jeans and dress trousers. Requires precise fitting and several intermediate-to-advanced techniques, but the result is genuinely wear-everywhere pants.',
    whyItWorks: 'This project teaches almost every trouser construction technique: fly zipper, waistband with curtain, belt loops, pocket construction, and precise fitting through the seat and thigh. Once you can make chinos, you can make almost any trouser.',
    fabricAdvice: 'Cotton twill is the classic choice — it has the right weight, drape, and structure. Cotton drill, cotton sateen, and linen-cotton blends also work well. You want a fabric with enough body to hold a crease but enough softness to be comfortable.',
    fabricWarning: 'Too-lightweight fabrics won\'t hold the structure needed for a fly front and waistband. Too-heavy fabrics (like denim over 12oz) become difficult to get through multiple layers at the fly and waistband junction.',
    requirements: { structure: { min: 50, weight: 1.2 }, durability: { min: 65, weight: 1.1 }, washability: { min: 65 }, wrinkleResistance: { min: 30 } },
    construction: [
      { step: 'Cut all pieces', detail: 'Front legs, back legs, fly facing, fly shield, waistband, pocket bags, belt loop strips. Mark all notches and drill holes carefully.' },
      { step: 'Construct front pockets', detail: 'Slash pockets: sew pocket bag to pocket opening, understitch, press. Or welt pockets for a dressier look (more advanced).' },
      { step: 'Sew darts or pleats', detail: 'Back darts shape the seat. Press toward center back. Front pleats are optional — flat-front is more common for modern chinos.' },
      { step: 'Sew inseams and side seams', detail: 'Join front to back. Press seams open for flat construction or to one side and topstitch for a sportier look.' },
      { step: 'Construct fly zipper', detail: 'The most complex step. Attach fly facing to left front, install zipper, create fly shield, topstitch the J-curve. Practice on scraps first.' },
      { step: 'Sew crotch seam', detail: 'Join legs through the crotch, reinforcing the curve with a second row of stitching.' },
      { step: 'Make and attach belt loops', detail: 'Cut strips, fold, press, topstitch. Baste to waist edge before attaching waistband.' },
      { step: 'Attach waistband', detail: 'Interface waistband. Sew to trouser top, fold, press, and finish. The waistband should overlap the fly by ⅝".' },
      { step: 'Hem', detail: 'A 1.5" blind hem is traditional. Press sharply for a clean break at the shoe.' }
    ],
    techniques: ['darts', 'blindHem', 'flatFelledSeam'],
    mistakes: [
      { mistake: 'Fly zipper doesn\'t lay flat', why: 'The fly shield (the extra layer behind the zipper) needs to be wide enough and properly anchored. If the zipper shows or bunches, the fly shield is too narrow or not caught in the waistband.' },
      { mistake: 'Seat too tight or too loose', why: 'Fitting the seat is the hardest part of trousers. Make a muslin/toile first and adjust the back crotch curve. Adding ½" to the back crotch depth fixes most too-tight issues.' },
      { mistake: 'Belt loops pulling away', why: 'Belt loops take more stress than you\'d think. Bar-tack or box-stitch them at top and bottom. Catch them securely in the waistband seam.' },
      { mistake: 'Waistband doesn\'t align at center front', why: 'The waistband extension (the part that overlaps) must be on the right side for men, left side for women. Double-check before cutting.' }
    ],
    variations: [
      'Add front pleats for a vintage/relaxed fit',
      'Add back welt pockets for a dressier look',
      'Make them cropped (ankle-length) for a modern silhouette',
      'Add a cuff at the hem'
    ],
    supplies: [
      { item: 'Cotton twill fabric', qty: '3–3.5 yards', essential: true },
      { item: 'Matching thread', qty: '2 spools', essential: true },
      { item: 'Zipper (trouser/pant)', qty: '1 (7")', essential: true },
      { item: 'Fusible interfacing', qty: '½ yard (waistband, fly facing)', essential: true },
      { item: 'Trouser hook and bar', qty: '1 set', essential: true },
      { item: 'Pocket lining fabric', qty: '½ yard', essential: false, note: 'Cotton lawn or silesia — lighter than the shell fabric' },
      { item: 'Belt loop strip', qty: 'Self-fabric, 1 strip 1.5" × 24"', essential: true }
    ],
    relatedProjects: ['tailoredTrousers', 'drawstringPants']
  },

  {
    id: 'boxerShorts',
    name: 'Boxer Shorts',
    audiences: ['men'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'Classic woven boxer shorts — loose-fitting with an elastic waistband and an optional fly opening. Essentially a simplified short pant with only a few pattern pieces. An excellent project for learning to sew curves (the crotch seam) and work with elastic.',
    whyItWorks: 'Quick, satisfying, and immediately wearable. The project introduces inseam and crotch construction on a small, low-stakes scale. You\'ll use these skills again for every pair of pants or shorts you ever sew.',
    fabricAdvice: 'Lightweight cotton wovens — cotton lawn, cotton voile, cotton shirting, broadcloth, or chambray. The fabric should be soft against skin and breathable. Quilting cotton works but is stiffer than ideal.',
    fabricWarning: 'Avoid heavyweight fabrics — they\'ll be bulky and uncomfortable. Avoid fabrics with no breathability (polyester linings, for instance). Knits can work but require a different pattern.',
    requirements: { softness: { min: 60, weight: 1.3 }, breathability: { min: 70, weight: 1.2 }, washability: { min: 70 } },
    construction: [
      { step: 'Cut front and back pieces', detail: 'Two fronts and two backs (or two identical pieces if no fly). Place on grain.' },
      { step: 'Sew center front seam', detail: 'If adding a fly: leave the top 5-6" open. Finish the opening edges with a narrow hem or binding. If no fly: sew the entire seam.' },
      { step: 'Sew center back seam', detail: 'Full seam, right sides together. French seams work beautifully here for comfort.' },
      { step: 'Sew inseams', detail: 'Join front to back on each leg through the inner leg seam.' },
      { step: 'Join crotch seam', detail: 'Nest one leg inside the other, sew the curved crotch from front to back.' },
      { step: 'Create elastic waistband', detail: 'Fold top edge down to create a 1.25" casing. Leave a gap, thread 1" elastic through (waist minus 3-4"), overlap ends and stitch.' },
      { step: 'Hem legs', detail: 'Narrow double-fold hem (½"). Press and stitch.' }
    ],
    techniques: ['frenchSeam', 'doubleHem'],
    mistakes: [
      { mistake: 'Elastic too tight', why: 'Cut elastic to your waist measurement minus 3-4 inches, not more. Too tight means uncomfortable; these should be relaxed.' },
      { mistake: 'Rough interior seams', why: 'Boxer shorts are worn against skin. Use French seams or serge all seam allowances. Raw edges will irritate.' },
      { mistake: 'Twisted legs', why: 'Same as any pants — match your inseams at the crotch junction. Pin carefully before sewing the crotch curve.' }
    ],
    variations: [
      'Add a functional button fly for a classic look',
      'Use contrasting fabric for the waistband casing',
      'Make them in fun printed cotton for gifts',
      'Add side vents at the hem for more ease'
    ],
    supplies: [
      { item: 'Lightweight cotton fabric', qty: '1.5 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Elastic (1" wide)', qty: 'Waist measurement', essential: true },
      { item: 'Safety pin', qty: '1 (large)', essential: true, note: 'For threading elastic' },
      { item: 'Button', qty: '1', essential: false, note: 'For fly closure if adding a fly' }
    ],
    relatedProjects: ['drawstringPants']
  },

  {
    id: 'vestWaistcoat',
    name: 'Vest / Waistcoat',
    audiences: ['men', 'women'],
    skill: 'intermediate',
    time: 'weekend',
    timeLabel: 'Weekend',
    overview: 'A sleeveless, front-opening garment worn over a shirt. Can be tailored and formal (suit waistcoat) or casual and unstructured (cotton or linen vest). The construction is simpler than a jacket because there are no sleeves to set, but it teaches lining, facing, and finishing techniques that transfer directly to coat-making.',
    whyItWorks: 'It\'s the gateway to tailoring. You learn how to line a garment, finish edges with facings, set a back adjustment strap, and handle multiple fabric layers — without the complexity of sleeves or the cost of jacket-weight fabric.',
    fabricAdvice: 'Medium-weight wovens with enough body to hold shape: cotton twill, linen, lightweight wool suiting, wool flannel, cotton canvas. The lining should be a smooth, tightly woven fabric like cotton lawn, Bemberg rayon, or silk habotai.',
    fabricWarning: 'Very drapey fabrics will look limp without heavy interfacing, which defeats the purpose. Very thick fabrics create uncomfortable bulk at the armholes and neckline.',
    requirements: { structure: { min: 55, weight: 1.3 }, durability: { min: 60 } },
    construction: [
      { step: 'Cut shell and lining', detail: 'Front shell (2), back shell (1 or 2 if seamed), front lining (2), back lining (1). Interface front shell pieces.' },
      { step: 'Sew darts', detail: 'Front and/or back darts shape the vest to the body. Press front darts toward center front, back darts toward center back.' },
      { step: 'Sew shoulder and side seams (shell)', detail: 'Join front to back at shoulders and sides. Press seams open.' },
      { step: 'Sew shoulder and side seams (lining)', detail: 'Same as shell. Leave a 4-5" gap in one side seam for turning.' },
      { step: 'Assemble shell and lining', detail: 'Place shell and lining right sides together. Sew around the entire perimeter: front edges, neckline, armholes, and hem. Leave the shoulder/side turning gap.' },
      { step: 'Turn and press', detail: 'Pull the vest right-side out through the turning gap. Push out all corners and curves. Press all edges flat, rolling the seam slightly to the inside.' },
      { step: 'Close turning gap', detail: 'Slip-stitch the opening closed by hand, or topstitch if the design allows.' },
      { step: 'Add closures', detail: 'Buttons with buttonholes down the front. Typically 4-5 buttons. Add a back buckle or strap for fit adjustment if desired.' }
    ],
    techniques: ['darts', 'blindHem'],
    mistakes: [
      { mistake: 'Armholes gape', why: 'The armhole needs to fit snugly against your body. If it gapes, the armhole curve is too shallow. Deepen it by cutting a slightly larger armhole on your pattern.' },
      { mistake: 'Lining shows at edges', why: 'When sewing shell to lining, the lining should be cut ⅛" smaller at all perimeter edges. This ensures the seam rolls slightly to the inside.' },
      { mistake: 'Front edges don\'t match', why: 'Check that both front pieces are mirror images, not duplicates. A common cutting error — always flip the pattern piece for the second front.' },
      { mistake: 'Pulling across the chest', why: 'Vests fit more closely than shirts. Make a muslin first and check the bust/chest measurement with enough ease to sit comfortably over a shirt.' }
    ],
    variations: [
      'Add welt pockets for a formal look',
      'Make a back strap with buckle for adjustable fit',
      'Use a contrasting lining fabric for a pop of color when unbuttoned',
      'Try a reversible version with two complementary shell fabrics and no lining'
    ],
    supplies: [
      { item: 'Shell fabric', qty: '1.5–2 yards', essential: true },
      { item: 'Lining fabric', qty: '1.5 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Fusible interfacing', qty: '1 yard (for fronts)', essential: true },
      { item: 'Buttons', qty: '4–5 (¾")', essential: true },
      { item: 'Buckle and strap hardware', qty: '1 set', essential: false, note: 'For adjustable back strap' }
    ],
    relatedProjects: ['linedJacket', 'buttonUpShirt', 'campShirt']
  },

  {
    id: 'shorts',
    name: 'Casual Shorts',
    audiences: ['men', 'women', 'kids'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'Simple pull-on or elastic-waist shorts — the warm-weather version of drawstring pants. Fewer pieces, less fabric, faster to finish. A great first-bottoms project for someone who hasn\'t sewn pants or shorts before.',
    whyItWorks: 'Teaches the fundamentals of bottoms construction (inseam, crotch curve, waistband) in a project that uses less fabric and takes less time than full-length pants. Lower stakes, same skills.',
    fabricAdvice: 'Cotton twill, linen, cotton poplin, chambray, or seersucker. Medium-weight wovens with some body work best for structured shorts; lightweight wovens give a relaxed, beachy feel.',
    fabricWarning: 'Very heavy fabrics (canvas, denim over 10oz) are harder to work with for a pull-on style. Very lightweight fabrics may need a lining to prevent see-through.',
    requirements: { structure: { min: 40 }, durability: { min: 55 }, washability: { min: 60 }, breathability: { min: 55 } },
    construction: [
      { step: 'Cut front and back pieces', detail: 'Two fronts, two backs (or identical if using a simple pattern). Mark grain line.' },
      { step: 'Sew side seams', detail: 'Join front to back at both side seams. Press open or to back.' },
      { step: 'Sew inseams', detail: 'Sew the inner leg seam on each leg. Press.' },
      { step: 'Join crotch', detail: 'Place one leg inside the other (right sides together) and sew the curved crotch seam. Reinforce with a second row of stitching in the curve.' },
      { step: 'Create waistband', detail: 'Fold and press a casing for elastic or drawstring. Leave a gap, thread elastic through, stitch closed.' },
      { step: 'Hem', detail: '1" double-fold hem. Press and topstitch.' }
    ],
    techniques: ['doubleHem', 'frenchSeam'],
    mistakes: [
      { mistake: 'Shorts ride up', why: 'The inseam length is too short or the leg opening is too narrow. Add width to the leg opening and try a longer inseam. 7-9" inseam for men, 3-5" for women is typical.' },
      { mistake: 'Elastic waist bunches', why: 'The casing is too wide for the elastic, or the elastic isn\'t distributed evenly. Use a casing only ¼" wider than the elastic.' }
    ],
    variations: [
      'Add cargo pockets on the sides',
      'Add a drawstring instead of elastic for an adjustable waist',
      'Roll up the hem and tack for a cuffed look',
      'Add side vents at the hem'
    ],
    supplies: [
      { item: 'Fabric', qty: '1.5–2 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Elastic (1" wide)', qty: 'Waist + 2"', essential: true },
      { item: 'Safety pin', qty: '1 (large)', essential: true },
      { item: 'Drawstring cord', qty: '2 yards', essential: false, note: 'Alternative to elastic waist' }
    ],
    relatedProjects: ['drawstringPants', 'boxerShorts']
  },

  // ── CHILDREN'S & BABY ──

  {
    id: 'babyRomper',
    name: 'Baby Romper',
    audiences: ['kids'],
    skill: 'intermediate',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'A one-piece garment combining a bodice and shorts or bloomers, usually with snap closures at the crotch for diaper changes. The quintessential baby garment — simple, practical, and endlessly customizable with fabric choices.',
    whyItWorks: 'Small garments use minimal fabric and sew up quickly — great for practicing techniques without committing yards of material. You\'ll learn snap installation, bias binding for necklines and armholes, and elastic insertion.',
    fabricAdvice: 'Soft, breathable cottons — cotton lawn, cotton voile, double gauze, cotton jersey, cotton interlock. The fabric must be gentle against baby skin, easy to wash, and able to withstand many laundry cycles. Pre-wash all fabric.',
    fabricWarning: 'Avoid rough or scratchy fabrics, anything that requires dry cleaning, and synthetic fabrics that trap heat. No small decorative elements (buttons, beads) that could be choking hazards.',
    requirements: { softness: { min: 65, weight: 1.4 }, breathability: { min: 70, weight: 1.3 }, washability: { min: 75, weight: 1.2 } },
    construction: [
      { step: 'Cut front, back, and facings', detail: 'Front bodice, back bodice, front and back shorts. Romper patterns are typically just 2-4 pieces.' },
      { step: 'Sew shoulder seams', detail: 'Join front to back at the shoulders. Press seams toward the back.' },
      { step: 'Finish neckline and armholes', detail: 'Bias binding or self-fabric bands give the cleanest finish. Double-fold bias binding encloses the raw edge completely — important for baby comfort.' },
      { step: 'Sew side seams', detail: 'Join from armhole to shorts hem in one seam. Press.' },
      { step: 'Sew inseam', detail: 'Leave the crotch inseam open (or with snap overlap) for diaper access. Finish raw edges.' },
      { step: 'Add elastic to legs', detail: 'Sew a casing at each leg opening and thread narrow elastic through for a bloomer effect, or leave them straight.' },
      { step: 'Install crotch snaps', detail: 'Mark snap placement evenly along the crotch opening. Install with snap pliers or a snap press. Test that they\'re secure.' }
    ],
    techniques: ['biasBinding', 'gathering'],
    mistakes: [
      { mistake: 'Snaps don\'t align', why: 'Always install snaps with the romper folded together at the crotch, marking through both layers at once. If you mark separately, they will not line up.' },
      { mistake: 'Neckline too tight to pull over baby\'s head', why: 'Babies have proportionally large heads. Add an overlap at the back neckline, or use snaps/buttons at the shoulder for easy on/off.' },
      { mistake: 'Elastic too tight on legs', why: 'Baby thighs are chubby. Cut elastic to the thigh measurement plus 1-2 inches. It should be snug enough to stay up but never leave marks.' }
    ],
    variations: [
      'Add a ruffle at the waistline or leg openings',
      'Make it sleeveless, short-sleeved, or long-sleeved',
      'Add a Peter Pan collar for a dressed-up look',
      'Extend the legs into a full-length romper/sleeper'
    ],
    supplies: [
      { item: 'Soft cotton fabric', qty: '1 yard', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Bias binding or bias tape', qty: '2 yards', essential: true },
      { item: 'Snaps (size 16 or 20)', qty: '5–7', essential: true },
      { item: 'Snap pliers or press', qty: '1', essential: true },
      { item: 'Narrow elastic (¼")', qty: '1 yard', essential: false, note: 'For bloomer-style legs' }
    ],
    relatedProjects: ['circleSkirt', 'shorts', 'raglanTop']
  },

  {
    id: 'kidsKnittee',
    name: 'Kids Knit T-Shirt',
    audiences: ['kids'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'A simple pullover T-shirt in stretch knit fabric — the most practical children\'s garment you can sew. Kids outgrow clothes fast, so being able to make a T-shirt quickly and inexpensively is a genuinely useful skill. It\'s also a forgiving introduction to sewing with knits.',
    whyItWorks: 'Small size means less fabric and faster sewing. Kids\' proportions are simpler than adult bodies — fewer fit adjustments needed. And children are far less critical of minor imperfections than adults are.',
    fabricAdvice: 'Cotton jersey, cotton-spandex jersey, or cotton interlock. Interlock is recommended for beginners because it doesn\'t curl at the edges like single jersey does. Look for fabrics with at least 25% stretch.',
    fabricWarning: 'Woven fabrics won\'t work for a pullover tee — you need stretch. Very thin or cheap jersey will be difficult to sew and won\'t hold up to kid-level wear and washing.',
    requirements: { stretch: { min: 25, weight: 1.2 }, softness: { min: 55 }, washability: { min: 70, weight: 1.1 }, durability: { min: 50 } },
    construction: [
      { step: 'Cut front, back, sleeves, and neckband', detail: 'Cut with the stretch going around the body. Use pattern weights instead of pins on knit fabric.' },
      { step: 'Sew shoulder seams', detail: 'Use a stretch stitch or serger. Stabilize shoulders with clear elastic or a strip of self-fabric to prevent stretching.' },
      { step: 'Attach neckband', detail: 'Cut ribbing to 80-85% of neckline measurement. Quarter-mark and stretch to fit as you sew. The neckband should recover flat — not wavy, not tight.' },
      { step: 'Set sleeves', detail: 'Match center of sleeve cap to shoulder seam. Sew with sleeve on top so you can control any ease.' },
      { step: 'Close side seams', detail: 'Sew from sleeve hem to body hem in one continuous seam.' },
      { step: 'Hem sleeves and body', detail: 'Twin needle gives the most professional look. Alternative: fold up 1" and use a narrow zigzag.' }
    ],
    techniques: ['gathering'],
    mistakes: [
      { mistake: 'Stretched-out neckline', why: 'The neckband was cut too long. It should be 80-85% of the neckline measurement. If it\'s the same length as the neckline, it will droop.' },
      { mistake: 'Wavy seams', why: 'You\'re pushing or pulling the fabric. Let the feed dogs move it. Reduce presser foot pressure if your machine allows.' },
      { mistake: 'Skipped stitches', why: 'Wrong needle. Use a ballpoint/jersey needle, not a universal. The rounded tip slides between knit fibers instead of piercing them.' }
    ],
    variations: [
      'Add a chest pocket',
      'Use contrast neckband and sleeve bands for a color-blocked look',
      'Make it long-sleeved for winter',
      'Add an appliqué or iron-on design'
    ],
    supplies: [
      { item: 'Cotton jersey or interlock', qty: '1–1.5 yards', essential: true },
      { item: 'Matching polyester thread', qty: '1 spool', essential: true },
      { item: 'Ballpoint/jersey needles', qty: '2', essential: true },
      { item: 'Ribbing for neckband', qty: '¼ yard or a strip 2.5" × neckline', essential: true },
      { item: 'Twin needle', qty: '1', essential: false, note: 'For professional hems' },
      { item: 'Clear elastic or stay tape', qty: '½ yard', essential: false, note: 'For stabilizing shoulders' }
    ],
    relatedProjects: ['raglanTop', 'henleyShirt']
  },

  {
    id: 'kidsElasticSkirt',
    name: 'Elastic-Waist Skirt',
    audiences: ['kids', 'women'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: '1–2 hours',
    overview: 'The simplest garment you can sew: one or two rectangles of fabric, two seams, an elastic casing, and a hem. A gathered elastic-waist skirt can be sewn by a complete beginner in under two hours. Perfect for kids because there are no closures, it\'s easy to pull on and off, and it works across several sizes as the child grows.',
    whyItWorks: 'Absolute minimum construction. If you can sew a straight line, you can make this skirt. It introduces fabric selection, cutting on grain, seam sewing, elastic installation, and hemming — all the fundamentals — in a project you can finish in a single sitting.',
    fabricAdvice: 'Almost any woven fabric works. Cotton quilting fabric is perfect for beginners — it\'s stable, comes in great prints, and is inexpensive. Cotton lawn, broadcloth, linen, and chambray all work. The width of the rectangle determines the fullness.',
    fabricWarning: 'Very slippery fabrics (silk, satin) are harder for beginners to manage. Very heavy fabrics will pull on the elastic waist and sag.',
    requirements: { washability: { min: 65 }, durability: { min: 50 }, breathability: { min: 55 } },
    construction: [
      { step: 'Calculate and cut rectangle(s)', detail: 'Width = hip measurement × 1.5 to 2 (for gather fullness). Length = desired skirt length + 2" (waist casing) + 1.5" (hem). Cut one or two rectangles.' },
      { step: 'Sew side seam(s)', detail: 'If using one rectangle, fold in half and sew one side seam. If two rectangles, sew both side seams. Press seams open or finish with French seams.' },
      { step: 'Create elastic waistband casing', detail: 'Fold the top edge down ¼" and press, then fold down again 1.25" and press. Stitch close to the folded edge, leaving a 2" gap for threading elastic.' },
      { step: 'Thread elastic', detail: 'Cut 1" elastic to waist measurement minus 1-2". Thread through casing with a safety pin. Overlap ends ½" and zigzag together. Stitch the gap closed.' },
      { step: 'Hem', detail: '1" double-fold hem. Press and stitch.' }
    ],
    techniques: ['doubleHem', 'gathering'],
    mistakes: [
      { mistake: 'Elastic twists inside casing', why: 'The casing is too wide for the elastic. Make the casing only ¼" wider than the elastic width. Some sewists stitch-in-the-ditch at the side seams to keep elastic from twisting.' },
      { mistake: 'Skirt is see-through', why: 'Hold the fabric up to a light before cutting. If you can see through it, line the skirt or choose a heavier fabric.' },
      { mistake: 'Uneven gathers', why: 'After inserting elastic, distribute the gathers evenly by pulling the fabric along the elastic. Stitch-in-the-ditch at each side seam to lock the gather distribution.' }
    ],
    variations: [
      'Add a ruffle at the hem',
      'Layer two fabrics for a reversible skirt',
      'Use multiple tiers of gathered fabric for a prairie skirt',
      'Add pockets in the side seams'
    ],
    supplies: [
      { item: 'Fabric', qty: '1–1.5 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Elastic (1" wide)', qty: 'Waist measurement + 2"', essential: true },
      { item: 'Safety pin', qty: '1 (large)', essential: true }
    ],
    relatedProjects: ['aLineSkirt', 'circleSkirt', 'wrapSkirt']
  },

  // ── HOME & LIVING ──

  {
    id: 'envelopePillow',
    name: 'Envelope Pillow Cover',
    audiences: ['home'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: '1 hour',
    overview: 'A pillow cover with an overlapping back opening (no zipper needed) — the easiest home décor project in existence. Three rectangles, straight seams, done. It\'s an envelope closure: the two back pieces overlap so the pillow insert slides in and stays hidden.',
    whyItWorks: 'No closures, no curves, no fitting. It\'s a confidence-builder that produces a genuinely useful result. Great for using up fabric remnants or experimenting with fabric before committing to a garment project.',
    fabricAdvice: 'Medium-weight wovens: cotton canvas, cotton duck, linen, linen-cotton blends, cotton twill, upholstery-weight cotton. Home décor fabrics are designed for this. Quilting cotton works but is lighter than ideal.',
    fabricWarning: 'Very lightweight fabrics will show the pillow form underneath and won\'t hold up to use. Very loosely woven fabrics will develop holes where the pillow presses against them.',
    requirements: { structure: { min: 45 }, durability: { min: 55 }, washability: { min: 50 } },
    construction: [
      { step: 'Cut one front and two back pieces', detail: 'Front: same size as pillow form + 1" for seam allowances. Two backs: same height as front, each about 60-65% of the front width (they overlap in the middle).' },
      { step: 'Hem the inner edges of back pieces', detail: 'Fold each back piece\'s inner edge over ½" twice and stitch. These hemmed edges become the envelope opening.' },
      { step: 'Layer pieces', detail: 'Place front right-side-up. Layer back pieces on top, right-side-down, with hemmed edges overlapping in the center. Pin all edges.' },
      { step: 'Sew all four sides', detail: 'Sew around the entire perimeter with ½" seam allowance. Backstitch at the corners for strength.' },
      { step: 'Clip corners and turn', detail: 'Clip diagonally across each corner (don\'t cut the stitching). Turn right-side out and push corners out with a point turner. Press.' },
      { step: 'Insert pillow form', detail: 'Slide the pillow form through the envelope opening. The overlap holds it in — no closure needed.' }
    ],
    techniques: ['doubleHem'],
    mistakes: [
      { mistake: 'Pillow cover is too tight for the form', why: 'Cut the front piece the exact size of the pillow form plus seam allowances. Don\'t subtract — you want a snug fit, but too tight and you can\'t insert the form.' },
      { mistake: 'Corners aren\'t sharp', why: 'Clip the corner seam allowances diagonally before turning. Then use a point turner (or chopstick) to push out each corner from the inside.' },
      { mistake: 'Pillow form shows through the opening', why: 'The back overlap isn\'t wide enough. Each back piece should be at least 60% of the front width so they overlap by 4-5 inches minimum.' }
    ],
    variations: [
      'Add piping around the edges for a tailored look',
      'Use contrasting fabric for the back',
      'Add a flange border (a flat fabric frame extending beyond the seam)',
      'Make it from vintage linens or tea towels'
    ],
    supplies: [
      { item: 'Fabric', qty: '¾–1 yard (for 18" pillow)', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Pillow form/insert', qty: '1 (18" or 20")', essential: true },
      { item: 'Point turner or chopstick', qty: '1', essential: false }
    ],
    relatedProjects: ['tableclothRunner', 'curtainPanels']
  },

  {
    id: 'tableclothRunner',
    name: 'Table Runner',
    audiences: ['home'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: '1–2 hours',
    overview: 'A long, narrow strip of fabric that runs down the center of a dining table. One of the simplest home sewing projects — it\'s essentially a finished rectangle. Teaches precision cutting, mitered corners, and clean hemming on a large, flat piece of fabric.',
    whyItWorks: 'All straight lines, no fitting, no closures. The only skill challenge is mitered corners, which give a polished, professional look. Once you can miter corners, you can make napkins, tablecloths, placemats, and curtains with the same technique.',
    fabricAdvice: 'Medium-weight wovens that wash well: linen, cotton, cotton-linen blends, hemp. Linen is the classic table runner fabric — it softens beautifully with washing and gets better over time. Cotton canvas for a casual, sturdy runner.',
    fabricWarning: 'Avoid fabrics that fray excessively (loosely woven silks, some rayons) — the entire project is hemming, so extreme fraying makes it frustrating. Avoid fabrics that can\'t be machine washed if the runner will be used daily.',
    requirements: { absorbency: { min: 55, weight: 1.1 }, washability: { min: 65, weight: 1.2 }, colorfastness: { min: 55 }, durability: { min: 50 } },
    construction: [
      { step: 'Calculate and cut', detail: 'Standard width: 14-18". Length: table length plus 12-16" of overhang (6-8" per end). Add 2" total for hems. Cut on grain, pulling a thread if needed to ensure straight cuts.' },
      { step: 'Press all hems', detail: 'Fold each edge ½" toward the wrong side and press. Then fold another ½" and press again. The double fold encloses the raw edge.' },
      { step: 'Miter the corners', detail: 'Unfold the last press. Fold each corner in diagonally so the fold lines meet. Trim the corner point. Refold the hems — they\'ll form a clean 45° miter.' },
      { step: 'Stitch hems', detail: 'Topstitch close to the inner fold all the way around, pivoting at corners. Use a slightly longer stitch length (3.0-3.5mm) on heavier fabrics.' },
      { step: 'Press finished runner', detail: 'A final press makes everything crisp. Use steam on linen and cotton for sharp creases.' }
    ],
    techniques: ['doubleHem'],
    mistakes: [
      { mistake: 'Uneven width', why: 'Measure and mark at multiple points along the length, not just the ends. Use a clear ruler with a grid. On linen, pull a thread to find the true grain for perfectly straight cuts.' },
      { mistake: 'Messy mitered corners', why: 'Press each fold crisply before mitering. The miter only works if the fold lines are accurate. If your first attempt isn\'t clean, unfold, re-press, and try again.' },
      { mistake: 'Fabric puckers at corners', why: 'Trim the excess fabric inside the miter fold. Too much bulk at the corner prevents it from laying flat.' }
    ],
    variations: [
      'Add fringe by pulling threads from the raw edges instead of hemming',
      'Piece together different fabrics for a patchwork runner',
      'Add decorative topstitching in a contrasting thread color',
      'Embroider a monogram or design in one corner'
    ],
    supplies: [
      { item: 'Fabric', qty: '½–1 yard', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Clear quilting ruler', qty: '1', essential: false, note: 'For accurate measuring and straight lines' }
    ],
    relatedProjects: ['envelopePillow', 'curtainPanels']
  },

  {
    id: 'curtainPanels',
    name: 'Curtain Panels',
    audiences: ['home'],
    skill: 'beginner',
    time: 'weekend',
    timeLabel: 'Weekend',
    overview: 'Simple flat or rod-pocket curtain panels — essentially large hemmed rectangles with a channel at the top for a curtain rod. The sewing is simple; the challenge is handling large amounts of fabric and achieving straight, even hems across wide panels.',
    whyItWorks: 'All straight lines. The skills are basic (hemming, topstitching), but the scale teaches you to handle large fabric pieces, maintain grain alignment, and press yardage accurately. The result dramatically changes a room.',
    fabricAdvice: 'Cotton, linen, cotton-linen blends, or cotton canvas. Weight depends on the look: lightweight cotton voile or linen for airy, filtered-light panels; medium-weight cotton or linen for a more substantial drape; cotton canvas for blackout or privacy.',
    fabricWarning: 'Slippery fabrics (silk, rayon) are difficult to keep straight across 45-60" widths. Very heavy fabrics require a sturdier curtain rod. Consider light-filtering needs: white cotton lets light through, lined panels block it.',
    requirements: { colorfastness: { min: 60, weight: 1.3 }, drape: { min: 40 }, durability: { min: 50 } },
    construction: [
      { step: 'Measure and calculate', detail: 'Width: measure window width and multiply by 1.5-2× for gather fullness (per panel). Length: measure from rod to desired endpoint, add 4" for top rod pocket and 4" for bottom hem.' },
      { step: 'Square up and cut fabric', detail: 'Pull a thread to find true grain, then cut along the pulled thread line. Curtains cut off-grain will hang crookedly.' },
      { step: 'Hem side edges', detail: 'Double-fold 1" hems on each side. Press thoroughly before stitching.' },
      { step: 'Create rod pocket', detail: 'Fold top edge down ½", press. Fold down another 2-3" (based on rod diameter + ½" ease), press. Stitch close to the inner fold.' },
      { step: 'Hem bottom', detail: 'Double-fold 2" hem at the bottom. For a weighted hem that hangs well, the bottom hem is traditionally deeper than side hems.' },
      { step: 'Press and hang', detail: 'Press the entire panel. Thread the curtain rod through the pocket. Adjust gathers evenly.' }
    ],
    techniques: ['doubleHem'],
    mistakes: [
      { mistake: 'Curtains hang crooked', why: 'The fabric was cut off-grain. Always pull a thread to find the true grain before cutting. If you can\'t pull a thread, use a large T-square to mark perpendicular to the selvage.' },
      { mistake: 'Bottom hem is uneven', why: 'Large panels are hard to keep straight. Fold and press the hem in sections, checking the measurement every 12-18 inches. Clip a binder clip to hold the fold as you press.' },
      { mistake: 'Rod pocket is too tight', why: 'Measure your curtain rod diameter and add at least ½" ease. Test with a scrap first — the fabric needs to slide freely on the rod.' }
    ],
    variations: [
      'Add tab tops instead of a rod pocket',
      'Add a lining panel for light control and fabric protection',
      'Sew a contrasting band along the leading (inner) edge',
      'Use curtain rings with clips instead of a rod pocket — no sewing needed at the top'
    ],
    supplies: [
      { item: 'Fabric', qty: '3–6 yards per panel', essential: true },
      { item: 'Matching thread', qty: '2 spools', essential: true },
      { item: 'Lining fabric', qty: '3–6 yards per panel', essential: false, note: 'For lined curtains — cuts light and protects face fabric from sun damage' }
    ],
    relatedProjects: ['envelopePillow', 'tableclothRunner']
  },

  // ── ACCESSORIES ──

  {
    id: 'infinityScarf',
    name: 'Infinity Scarf',
    audiences: ['accessories'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: '1 hour',
    overview: 'A continuous loop of fabric worn doubled around the neck. One of the fastest sewing projects — a rectangle sewn into a tube, then the tube ends joined to form a loop. Makes a great gift.',
    whyItWorks: 'Two seams and you\'re done. It teaches tube construction and working with the right/wrong side of fabric when closing a tube. The instant gratification makes it a confidence booster for new sewists.',
    fabricAdvice: 'Soft, drapey fabrics: cotton jersey, cotton voile, linen gauze, lightweight wool, silk. For warmth: wool jersey, flannel, fleece. The fabric needs to drape softly around the neck, not stick out stiffly.',
    fabricWarning: 'Stiff or heavyweight fabrics create a bulky ring that doesn\'t drape. Very scratchy fabrics are uncomfortable against the neck.',
    requirements: { softness: { min: 60, weight: 1.3 }, drape: { min: 55, weight: 1.1 } },
    construction: [
      { step: 'Cut rectangle', detail: 'Width: 20-30" (this becomes the circumference when doubled). Length: 56-64" (the loop circumference). Wider = more volume; longer = more wraps.' },
      { step: 'Fold and sew long edge', detail: 'Fold rectangle in half lengthwise, right sides together. Sew the long edge to form a tube. Turn right-side out.' },
      { step: 'Join tube ends', detail: 'The tricky part: reach into the tube, grab one end, and pull it through to meet the other end, right sides together. Sew around the circle, leaving a 3-4" gap.' },
      { step: 'Close gap', detail: 'Turn right-side out through the gap. Slip-stitch or topstitch the gap closed. Press gently.' }
    ],
    techniques: ['frenchSeam'],
    mistakes: [
      { mistake: 'Tube is twisted before joining ends', why: 'Before sewing the ends together, lay the tube flat and make sure it\'s not twisted. Run your fingers along the seam — it should follow a straight line, not spiral.' },
      { mistake: 'Gap closure is visible', why: 'Use a ladder stitch (also called a slip stitch) with matching thread. Pull gently to close — the stitches disappear into the fold.' }
    ],
    variations: [
      'Use two different fabrics for a reversible scarf',
      'Make a shorter version that sits snugly as a cowl',
      'Add a hidden zip pocket for phone/keys',
      'Use fleece for a no-sew version (fleece doesn\'t fray)'
    ],
    supplies: [
      { item: 'Fabric', qty: '1–1.5 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true }
    ],
    relatedProjects: ['bucketHat']
  },

  {
    id: 'bucketHat',
    name: 'Bucket Hat',
    audiences: ['accessories', 'kids'],
    skill: 'intermediate',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'A soft, unstructured hat with a flat top crown, tapered sides, and a downward-sloping brim. Three pattern pieces — top, side, and brim — sewn together and often reversible. A great introduction to 3D sewing (creating a shaped object from flat pieces).',
    whyItWorks: 'This project teaches sewing in three dimensions — easing a flat circle into a curved side piece, and attaching a brim at a specific angle. These skills transfer directly to any structured or shaped sewing project.',
    fabricAdvice: 'Medium-weight wovens with enough body to hold the brim shape: cotton canvas, cotton twill, denim, linen, cotton drill. For a summer hat, lighter weights work with interfacing in the brim.',
    fabricWarning: 'Very lightweight fabrics will flop — the brim needs body. Very thick fabrics create too much bulk in the seam where all three pieces meet.',
    requirements: { structure: { min: 55, weight: 1.3 }, durability: { min: 60 }, washability: { min: 50 } },
    construction: [
      { step: 'Cut top, side, and brim', detail: 'Top: a circle. Side: a rectangle or tapered strip. Brim: a ring (donut shape). Cut two of each if making it reversible. Interface the brim for stiffness.' },
      { step: 'Sew side panel into a ring', detail: 'Join the short ends of the side piece to form a cylinder. Press seam open.' },
      { step: 'Attach top to side', detail: 'Pin the top circle to the upper edge of the side cylinder, right sides together. Ease the fabric — the circle and the cylinder have the same circumference, but the shapes fight each other. Sew slowly.' },
      { step: 'Attach brim', detail: 'Pin the inner circle of the brim to the lower edge of the side. Sew. The brim should angle downward naturally.' },
      { step: 'Finish or make reversible', detail: 'For a single layer: finish seam allowances and topstitch the brim. For reversible: make a second hat, place them right sides together, sew around the outer brim edge, turn through a gap in the side seam, and topstitch.' }
    ],
    techniques: ['doubleHem'],
    mistakes: [
      { mistake: 'Top crown puckers', why: 'The circle isn\'t eased properly into the side piece. Clip notches around the seam allowance of the circle so it can curve smoothly. Pin every ½" and sew slowly.' },
      { mistake: 'Brim is floppy', why: 'The brim needs interfacing or a stiffer fabric. Fuse medium-weight interfacing to the brim before sewing, or use two layers of fabric.' },
      { mistake: 'Hat doesn\'t fit', why: 'Measure head circumference and add 1" of ease. The side piece\'s circumference at the bottom (where it meets the brim) should equal this measurement.' }
    ],
    variations: [
      'Make it reversible with a contrasting fabric',
      'Add a chin strap for kids or windy days',
      'Topstitch concentric circles on the brim for structure',
      'Use patchwork or color-blocked panels for the crown'
    ],
    supplies: [
      { item: 'Fabric', qty: '½–¾ yard', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Medium-weight fusible interfacing', qty: '¼ yard (for brim)', essential: true },
      { item: 'Contrasting fabric', qty: '½–¾ yard', essential: false, note: 'For reversible version' }
    ],
    relatedProjects: ['infinityScarf']
  },

  // ── BAGS & POUCHES ──

  {
    id: 'toteBag',
    name: 'Tote Bag',
    audiences: ['bags'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'A flat-bottomed bag with two parallel handles — the universal carry-everything bag. Two rectangles for the body, two strips for the handles, and a boxed bottom. Simple enough for a first project, useful enough that you\'ll actually carry it.',
    whyItWorks: 'Straight seams, no closures, no curves. But you learn boxed corners (creating a flat bottom from flat fabric), handle reinforcement, and how to sew through multiple layers. The result is something you\'ll use daily.',
    fabricAdvice: 'Sturdy medium-to-heavy wovens: cotton canvas, cotton duck, cotton drill, heavyweight linen, denim, hemp canvas. The fabric needs to hold its shape and withstand weight. Two layers of medium-weight fabric also work.',
    fabricWarning: 'Lightweight fabrics will stretch and deform under load. Interfacing can help medium-weight fabrics, but a tote is only as strong as its fabric and handle attachment.',
    requirements: { durability: { min: 70, weight: 1.4 }, structure: { min: 60, weight: 1.3 } },
    construction: [
      { step: 'Cut body and handles', detail: 'Two body rectangles (typically 16" × 18" for a standard tote). Two handle strips (3" × 22-26" for shoulder-length handles, longer for cross-body).' },
      { step: 'Make handles', detail: 'Fold each strip in half lengthwise, press. Open, fold each raw edge to the center, refold. Topstitch both edges. Each handle is now 4 layers thick and very strong.' },
      { step: 'Attach handles to body', detail: 'Pin handle ends to the right side of each body piece, about 4-5" from each side edge. Baste in place. They\'ll be caught in the top seam.' },
      { step: 'Sew body together', detail: 'Place body pieces right sides together (handles sandwiched inside). Sew the sides and bottom. Leave the top open.' },
      { step: 'Box the bottom', detail: 'At each bottom corner, flatten the bag so the side seam sits on top of the bottom seam. Mark and sew across the triangle perpendicular to the seam, about 3" from the point. This creates a flat, rectangular bottom.' },
      { step: 'Finish top edge', detail: 'Turn right-side out. Fold the top edge down 1", then 1" again. Press and topstitch, catching the handle ends in the stitching for reinforcement.' },
      { step: 'Reinforce handles', detail: 'Sew a box with an X through each handle attachment point for maximum strength.' }
    ],
    techniques: ['doubleHem', 'flatFelledSeam'],
    mistakes: [
      { mistake: 'Handles pull off', why: 'The handle attachment point takes all the stress. Reinforce with a box-X stitch pattern (a square with an X through it). Backstitch at the start and end.' },
      { mistake: 'Bag won\'t stand up', why: 'The boxed corners aren\'t deep enough, or the fabric is too soft. Make the boxed corners at least 3" deep, and use canvas or duck.' },
      { mistake: 'Uneven handles', why: 'Measure handle placement from the top edge and from the side seam for each handle. Use the same reference points on both sides.' }
    ],
    variations: [
      'Add an inside pocket for phone or keys',
      'Add a magnetic snap closure at the top',
      'Use two different fabrics for outside and lining',
      'Add a zippered top by inserting a zipper panel between the body and handles'
    ],
    supplies: [
      { item: 'Canvas or heavy cotton fabric', qty: '1–1.5 yards', essential: true },
      { item: 'Matching thread (heavy-duty)', qty: '1 spool', essential: true },
      { item: 'Heavy-duty needle (size 16/100)', qty: '1–2', essential: true, note: 'Standard needles can break on canvas' }
    ],
    relatedProjects: ['zipperedPouch']
  },

  {
    id: 'zipperedPouch',
    name: 'Zippered Pouch',
    audiences: ['bags'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: '1–2 hours',
    overview: 'A flat or boxed pouch with a zipper closure — useful as a makeup bag, pencil case, toiletry bag, or catch-all. Learning to sew a zipper in a low-stakes project like this makes zipper installation far less intimidating when you encounter it in garments.',
    whyItWorks: 'This is the friendliest way to learn zipper installation. The pieces are small, the construction is simple, and if you mess up the zipper, you\'ve only used a small piece of fabric. The confidence carries over to garment zippers.',
    fabricAdvice: 'Medium-weight wovens: cotton canvas, cotton duck, quilting cotton (for smaller pouches), linen, or laminated cotton for water resistance. Interior can be a lighter cotton for contrast.',
    fabricWarning: 'Very lightweight fabrics need interfacing or they won\'t hold shape. Very thick fabrics are hard to sew through at the zipper tabs where multiple layers stack up.',
    requirements: { structure: { min: 45 }, durability: { min: 55 } },
    construction: [
      { step: 'Cut pieces', detail: 'Two rectangles of outer fabric and two of lining (same size). Size is up to you — a typical makeup bag is about 9" × 6".' },
      { step: 'Sew zipper to top edges', detail: 'Place one outer piece and one lining piece right sides together with the zipper sandwiched between them (zipper facing the outer fabric). Sew along the zipper tape. Repeat with the other pair on the other side of the zipper.' },
      { step: 'Press fabric away from zipper', detail: 'Open out the pieces and press the fabric away from the zipper teeth on both sides. Topstitch along the zipper for a clean finish.' },
      { step: 'Sew the body', detail: 'Open the zipper halfway (crucial!). Place outer pieces right sides together and lining pieces right sides together. Sew around the entire perimeter, leaving a 3-4" turning gap in the lining bottom.' },
      { step: 'Box corners (optional)', detail: 'For a structured pouch, box the corners of both the outer and lining layers — same technique as the tote bag.' },
      { step: 'Turn and close', detail: 'Turn right-side out through the lining gap. Push the lining inside the pouch. Press. Stitch the lining gap closed.' }
    ],
    techniques: ['doubleHem'],
    mistakes: [
      { mistake: 'Forgot to open the zipper before sewing the body', why: 'If the zipper is closed when you sew the perimeter shut, you can\'t turn the pouch right-side out. Always open the zipper at least halfway before sewing the body seams.' },
      { mistake: 'Zipper pull gets in the way', why: 'Use a zipper longer than your fabric. The pull hangs off the end while you sew, making the stitching much easier. Trim the excess zipper after construction.' },
      { mistake: 'Lumpy zipper corners', why: 'Grade (trim) the seam allowances near the zipper tabs where multiple layers create bulk. A size 14 or 16 needle helps push through the thick spots.' }
    ],
    variations: [
      'Add a wrist strap with a swivel clip for a clutch/wristlet',
      'Use clear vinyl for one side so you can see the contents',
      'Add interior divider pockets',
      'Make it in multiple sizes (pencil case, toiletry bag, large organizer) — same technique at different scales'
    ],
    supplies: [
      { item: 'Outer fabric', qty: '¼–½ yard', essential: true },
      { item: 'Lining fabric', qty: '¼–½ yard', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Zipper', qty: '1 (9-12" all-purpose)', essential: true },
      { item: 'Zipper foot', qty: '1', essential: true, note: 'Most machines include one — check your accessories box' },
      { item: 'Fusible interfacing', qty: '¼ yard', essential: false, note: 'For lighter fabrics that need more structure' }
    ],
    relatedProjects: ['toteBag']
  },

  // ────────────────────────────────────────────
  // ADDITIONAL PROJECTS — Batch 2
  // ────────────────────────────────────────────

  // ── WOMEN'S / UNISEX ──

  {
    id: 'pajamaPants',
    name: 'Pajama Pants',
    audiences: ['women', 'men', 'kids'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'Loose-fitting pull-on pants with an elastic waistband. Two pattern pieces (front and back), an elastic casing, and a hem. One of the fastest garments to sew — most beginners can finish a pair in an evening.',
    whyItWorks: 'The elastic waistband eliminates fitting challenges. The loose silhouette means exact measurements are less critical. If you can sew a straight line, you can make pajama pants.',
    fabricAdvice: 'Lightweight to medium-weight soft fabrics: cotton flannel, cotton lawn, rayon challis, lightweight knits, seersucker. Flannel is the classic choice for warmth; cotton lawn or voile for summer.',
    fabricWarning: 'Avoid stiff or heavy fabrics — they defeat the purpose of sleepwear. Very slippery fabrics like charmeuse will shift during cutting; pin frequently.',
    requirements: { softness: { min: 60, weight: 1.3 }, breathability: { min: 60, weight: 1.1 }, washability: { min: 65 } },
    construction: [
      { step: 'Cut front and back panels', detail: 'Most pajama patterns have identical front and back pieces, or the front has a slightly shallower crotch curve. Cut 2 fronts and 2 backs.' },
      { step: 'Sew inseams', detail: 'Right sides together, sew each leg\'s inner seam from hem to crotch point.' },
      { step: 'Sew crotch seam', detail: 'Turn one leg right side out and slip it inside the other (right sides together). Sew the curved crotch seam in one continuous pass. Clip the curve.' },
      { step: 'Create elastic waistband casing', detail: 'Fold the top edge down ¼", press, fold again 1.25" (wide enough for your elastic plus ¼" ease). Stitch close to the inner fold, leaving a 2" gap to insert elastic.' },
      { step: 'Thread elastic and close', detail: 'Attach a safety pin to one end of the elastic, thread through the casing. Overlap elastic ends 1", stitch securely, and close the gap.' },
      { step: 'Hem', detail: 'Double-fold hem (1") at each leg opening. Press before stitching for clean results.' }
    ],
    techniques: ['elasticCasing', 'doubleHem'],
    mistakes: [
      { mistake: 'Elastic too tight', why: 'Measure elastic around your waist while wearing a shirt (as you would sleep). It should be snug but comfortable — not swimwear-tight. Subtract 1–2" from waist measurement.' },
      { mistake: 'Twisting the crotch seam', why: 'Make sure the inseams align before sewing the crotch. If the seams don\'t match up, the legs will twist.' },
      { mistake: 'Not enough length', why: 'Pajama pants should be cut 1–2" longer than you think. They ride up when you sleep. Better to hem shorter than to add length later.' }
    ],
    variations: [
      'Add side pockets in the side seams for daytime lounge pants',
      'Use a drawstring instead of (or in addition to) elastic',
      'Make matching shorts by shortening the pattern above the knee',
      'Add cuffs at the ankle for a jogger-style look'
    ],
    supplies: [
      { item: 'Fabric', qty: '2–2.5 yards (adults); 1–1.5 yards (kids)', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Elastic (1" wide)', qty: 'Waist measurement minus 2"', essential: true },
      { item: 'Safety pin', qty: '1 (for threading elastic)', essential: true }
    ],
    relatedProjects: ['drawstringPants', 'boxerShorts', 'shorts']
  },

  {
    id: 'sundress',
    name: 'Sundress',
    audiences: ['women', 'kids'],
    skill: 'beginner',
    time: 'afternoon',
    timeLabel: 'An afternoon',
    overview: 'A sleeveless, often strapless or spaghetti-strap dress with a gathered bodice and simple skirt. The easiest dress you can make — essentially a tube with a casing and straps. Perfect for summer.',
    whyItWorks: 'The gathered or elasticized bodice eliminates bust darts and zipper installation. Adjustable straps handle fit variations. The result looks charming without any advanced skills.',
    fabricAdvice: 'Lightweight cotton prints (lawn, voile, poplin), linen, rayon challis, seersucker. Fabric with some body holds the gathered shape better than very drapey material.',
    fabricWarning: 'Avoid heavy fabrics — they\'ll pull the straps and sag. Sheers need underlining or a built-in lining panel at the bodice.',
    requirements: { breathability: { min: 65, weight: 1.3 }, drape: { min: 50 }, softness: { min: 45 } },
    construction: [
      { step: 'Cut front and back rectangles', detail: 'Width = bust measurement × 1.5 (for gathering). Length = desired finished length + seam allowances + casing depth.' },
      { step: 'Sew side seams', detail: 'Right sides together, sew from the bottom hem up to the armhole/top edge. French seams give a clean inside finish on lightweight fabrics.' },
      { step: 'Create the bodice casing', detail: 'Fold the top edge down ¼", press, then fold again 1". Stitch along the lower fold, leaving a gap to thread elastic.' },
      { step: 'Insert elastic', detail: 'Cut elastic to your above-bust measurement minus 2". Thread through, overlap ends 1", stitch, and close the gap.' },
      { step: 'Add straps', detail: 'Make fabric tubes (or use ribbon). Pin to the inside of the bodice at front and back, try on, adjust length, then stitch securely.' },
      { step: 'Hem', detail: 'A narrow rolled hem gives a delicate finish on lightweight fabrics. A double-fold hem works on medium weights.' }
    ],
    techniques: ['elasticCasing', 'gathering', 'frenchSeam', 'narrowHem'],
    mistakes: [
      { mistake: 'Bodice elastic too loose', why: 'The elastic must hold the dress up without straps doing all the work. Test by pulling the straps off your shoulders — the dress should stay up on its own.' },
      { mistake: 'Skipping strap adjustment', why: 'Always try the dress on and adjust strap length before final stitching. Straps that are too long will make the bodice sag; too short will pull and be uncomfortable.' },
      { mistake: 'Not enough gathering width', why: 'If you cut the rectangles at only 1× your bust measurement, there won\'t be enough fabric to gather into the elastic. Use 1.5× minimum; 2× for a ruffled look.' }
    ],
    variations: [
      'Add a ruffle at the hem for a playful look',
      'Use two tiers of gathered fabric instead of one for a tiered sundress',
      'Add a sash or ribbon tie at the waist',
      'Make it in a knit fabric and skip the elastic — the stretch does the work'
    ],
    supplies: [
      { item: 'Fabric', qty: '2–3 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Elastic (¾" wide)', qty: 'Above-bust measurement minus 2"', essential: true },
      { item: 'Ribbon or fabric for straps', qty: '2 yards', essential: true }
    ],
    relatedProjects: ['maxiDress', 'wrapDress', 'tankTop']
  },

  {
    id: 'camisole',
    name: 'Camisole',
    audiences: ['women'],
    skill: 'intermediate',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'A fitted sleeveless top with spaghetti straps and a V-neck or straight neckline. Sits close to the body with bust darts or princess seams. Works as a layering piece, sleepwear, or standalone summer top.',
    whyItWorks: 'Small pattern pieces mean efficient fabric use. The bias-cut version drapes beautifully over the body with minimal shaping. A good project for learning to work with delicate fabrics.',
    fabricAdvice: 'Silk crepe de chine, silk charmeuse, viscose satin, lightweight cotton batiste, cupro. Bias-cut versions need fabric with good drape. Woven versions need darts for shaping; knit versions can skip them.',
    fabricWarning: 'Slippery fabrics are the whole point — but they\'re harder to cut and sew. Use tissue paper underneath when cutting, and a sharp microtex needle. Pinning can leave permanent holes in silk.',
    requirements: { drape: { min: 70, weight: 1.3 }, softness: { min: 65, weight: 1.2 } },
    construction: [
      { step: 'Cut front and back pieces', detail: 'If cutting on the bias, align the grainline arrow at 45° to the selvage. Let the cut pieces hang overnight before sewing — bias-cut fabric stretches and needs to "settle."' },
      { step: 'Sew darts (if not bias-cut)', detail: 'Stitch bust darts carefully — the point should end at the fullest part of the bust, not above or below it.' },
      { step: 'Sew side seams', detail: 'French seams are ideal for this garment — no raw edges visible against the skin.' },
      { step: 'Finish neckline', detail: 'Bias binding gives the cleanest finish on a camisole. Cut bias strips 1.25" wide, press in half, and bind the neckline edge.' },
      { step: 'Make and attach straps', detail: 'Spaghetti straps from bias tubes (use a loop turner or safety pin to turn). Stitch to the inside of the bodice. Try on and adjust length.' },
      { step: 'Hem', detail: 'Narrow rolled hem (by hand or machine) suits the delicacy of the garment. On bias-cut pieces, let the hem hang 24 hours before marking and hemming.' }
    ],
    techniques: ['darts', 'biasBinding', 'frenchSeam', 'rolledHem'],
    mistakes: [
      { mistake: 'Not letting bias-cut fabric hang', why: 'Bias-cut fabric stretches over time. If you hem immediately after cutting, the hem will end up uneven after wearing. Hang the cut pieces for 24 hours, then trim and hem.' },
      { mistake: 'Visible seam allowances', why: 'A camisole is worn against the skin and the inside shows when you move. French seams or bias-bound seam allowances prevent scratchy raw edges.' },
      { mistake: 'Strap placement too far apart', why: 'Straps placed too close to the armhole will slide off the shoulders constantly. Place them closer to the neckline — typically 3–4" from center front.' }
    ],
    variations: [
      'Add a lace trim at the neckline and hem',
      'Make a racerback version with crossed straps',
      'Add a built-up front panel for more coverage',
      'Layer it — make one in a solid and one in lace to wear together'
    ],
    supplies: [
      { item: 'Fabric', qty: '1–1.5 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Bias binding or fabric for self-made bias', qty: '2 yards', essential: true },
      { item: 'Loop turner', qty: '1', essential: false, note: 'For turning spaghetti straps right side out' }
    ],
    relatedProjects: ['tankTop', 'sundress']
  },

  // ── MEN'S / UNISEX ──

  {
    id: 'robe',
    name: 'Robe / Dressing Gown',
    audiences: ['women', 'men'],
    skill: 'intermediate',
    time: 'weekend',
    timeLabel: 'Weekend project',
    overview: 'A full-length or knee-length wrap garment with a shawl collar, belt, and patch pockets. No closures needed — it wraps and ties. The shawl collar is the main construction challenge, but the rest is straightforward.',
    whyItWorks: 'The wrap construction means no buttons, no zippers, and minimal fitting. The oversized silhouette is forgiving of measurement variations. The shawl collar looks impressive but is essentially just a long, shaped facing.',
    fabricAdvice: 'Terry cloth, cotton flannel, silk charmeuse, lightweight wool, waffle knit, linen. Terry cloth is the classic bathrobe fabric; silk makes a luxurious dressing gown; flannel makes a cozy winter robe.',
    fabricWarning: 'Terry cloth is thick and bulky at seam intersections — use a walking foot and larger stitch length. Silk robes need French seams since the inside is visible when worn open.',
    requirements: { softness: { min: 50 }, absorbency: { min: 45 }, washability: { min: 50 }, drape: { min: 35 } },
    construction: [
      { step: 'Cut front, back, sleeves, collar, and belt', detail: 'The shawl collar piece is typically cut as one long strip that wraps from the front hem, around the neck, and down the other front. Interface it for structure.' },
      { step: 'Sew shoulder seams', detail: 'Join front to back at shoulders. Press open.' },
      { step: 'Attach shawl collar', detail: 'Pin the collar strip to the front edges and neckline, easing around the back neck curve. Sew, grade seam allowances, and understitch to keep the collar rolling properly.' },
      { step: 'Set sleeves', detail: 'A robe sleeve is typically a straight or slightly shaped set-in sleeve. Match the sleeve cap notch to the shoulder seam.' },
      { step: 'Sew side and underarm seams', detail: 'Sew from the sleeve hem down to the robe hem in one continuous seam.' },
      { step: 'Add belt loops and patch pockets', detail: 'Position belt loops at the side seams at natural waist height. Patch pockets go on the front panels at a comfortable hand-height.' },
      { step: 'Make the belt', detail: 'Cut a long strip, fold in half lengthwise right sides together, sew, turn right side out, press. Width is typically 1.5–2".' },
      { step: 'Hem', detail: 'A generous 2" double-fold hem adds weight and helps the robe hang well.' }
    ],
    techniques: ['setInSleeve', 'understitching', 'doubleHem', 'topstitching'],
    mistakes: [
      { mistake: 'Collar not rolling properly', why: 'The shawl collar needs to be understitched (stitch the seam allowances to the facing side). Without this, the collar seam rolls outward and shows.' },
      { mistake: 'No belt loops', why: 'Without belt loops, the belt slides down to the hips and the robe looks sloppy. Place loops at the side seams exactly at your natural waist.' },
      { mistake: 'Sleeves too tight', why: 'A robe is worn over clothing (or should feel spacious over bare skin). Add 2–3" of ease beyond what you\'d use for a fitted garment.' },
      { mistake: 'Forgetting to interface the collar', why: 'An uninterfaced shawl collar will flop and wrinkle instead of rolling smoothly. Use a medium-weight fusible interfacing.' }
    ],
    variations: [
      'Make a short (knee-length) version as a summer robe',
      'Add a hood instead of a shawl collar',
      'Use a contrast fabric for the collar and cuffs',
      'Add piping along the collar edge for a vintage look'
    ],
    supplies: [
      { item: 'Fabric', qty: '4–5 yards (full-length); 3 yards (short)', essential: true },
      { item: 'Matching thread', qty: '1–2 spools', essential: true },
      { item: 'Fusible interfacing', qty: '1 yard (for collar)', essential: true },
      { item: 'Belt buckle or D-rings', qty: '2', essential: false, note: 'Optional — a fabric-only belt with a knot is more traditional' }
    ],
    relatedProjects: ['linedJacket', 'pajamaPants']
  },

  // ── KIDS ──

  {
    id: 'babyBib',
    name: 'Baby Bib',
    audiences: ['kids'],
    skill: 'beginner',
    time: 'under-hour',
    timeLabel: 'Under an hour',
    overview: 'A two-layer bib with a snap or velcro closure at the neck. The quintessential first sewing project — small, fast, and immediately useful. Makes a great handmade baby gift.',
    whyItWorks: 'Tiny pattern piece, no fitting, minimal fabric. You can cut and sew a bib in 30 minutes. The technique (sew two layers together, turn right side out, topstitch) is the foundation of dozens of other projects.',
    fabricAdvice: 'Front: cotton terry cloth, cotton flannel, or quilting cotton. Back: terry cloth or flannel for absorbency. Double terry makes the most absorbent bib. Quilting cotton on front + terry on back gives a cute printed face with an absorbent back.',
    fabricWarning: 'Avoid synthetic fabrics — they repel moisture rather than absorbing it, which defeats the purpose. Stiff fabrics are uncomfortable against a baby\'s neck.',
    requirements: { absorbency: { min: 65, weight: 1.3 }, washability: { min: 75, weight: 1.4 }, softness: { min: 50 } },
    construction: [
      { step: 'Cut two bib shapes', detail: 'Use a template or trace around an existing bib. Cut one from front fabric and one from back fabric. Add ⅜" seam allowance around the edge.' },
      { step: 'Layer and sew', detail: 'Place right sides together. Sew around the entire edge with a ⅜" seam, leaving a 2" turning gap along one straight edge.' },
      { step: 'Clip curves and turn', detail: 'Clip into the seam allowance around the neck curve and outer curves. Turn right side out through the gap. Push curves out with a point turner.' },
      { step: 'Press and topstitch', detail: 'Press flat, tucking in the seam allowances at the gap. Topstitch ⅛" from the edge all around — this closes the gap and gives a finished look.' },
      { step: 'Add closure', detail: 'Attach a KAM snap, sew-on snap, or hook-and-loop (velcro) square at the neck overlap.' }
    ],
    techniques: ['topstitching'],
    mistakes: [
      { mistake: 'Neck opening too small', why: 'Baby necks are surprisingly chunky. Make sure the neck curve is generous — test with a rolled-up towel the approximate size of a baby\'s neck.' },
      { mistake: 'Not clipping curves', why: 'The curves will be lumpy and puckered when turned right side out if you don\'t clip the seam allowances. Cut small V-notches every ½".' },
      { mistake: 'Using buttons', why: 'Buttons are a choking hazard for babies. Use snaps or velcro only.' }
    ],
    variations: [
      'Make a bandana-style bib (triangle shape with snaps at the back)',
      'Add a crumb-catcher pocket at the bottom by folding up a section',
      'Use waterproof fabric (PUL) as the back layer for heavy droolers',
      'Make a set of 7 for each day of the week with different prints'
    ],
    supplies: [
      { item: 'Front fabric', qty: '¼ yard', essential: true },
      { item: 'Back fabric (terry or flannel)', qty: '¼ yard', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'KAM snaps', qty: '1 set', essential: true },
      { item: 'KAM snap pliers', qty: '1', essential: true, note: 'One-time purchase — reuse for all snap projects' }
    ],
    relatedProjects: ['babyRomper', 'swaddleBlanket']
  },

  {
    id: 'swaddleBlanket',
    name: 'Swaddle Blanket',
    audiences: ['kids'],
    skill: 'beginner',
    time: 'under-hour',
    timeLabel: 'Under an hour',
    overview: 'A large, lightweight square of fabric with finished edges. Used for swaddling newborns, as a nursing cover, stroller blanket, or play mat. The simplest project in this catalog — essentially a hemmed square.',
    whyItWorks: 'One piece of fabric, four straight hems. No shaping, no fitting, no closures. If you can sew a straight line, you can make a swaddle blanket. The value is in the fabric choice — a handmade double-gauze swaddle rivals $30 boutique versions.',
    fabricAdvice: 'Cotton double gauze is the gold standard — lightweight, breathable, gets softer with every wash. Cotton muslin, bamboo jersey, or lightweight flannel also work well.',
    fabricWarning: 'Avoid anything heavy or non-breathable. Babies overheat easily. No fleece, no thick flannel, no polyester.',
    requirements: { softness: { min: 70, weight: 1.4 }, breathability: { min: 70, weight: 1.3 }, washability: { min: 65, weight: 1.1 } },
    construction: [
      { step: 'Cut a large square', detail: 'Standard swaddle size is 44–47" square. If your fabric is 44" wide, cut a 44" length for a perfect square.' },
      { step: 'Hem all four edges', detail: 'Fold each edge ¼", press, fold again ¼", press, stitch. A narrow hem keeps the blanket lightweight. Work one edge at a time.' }
    ],
    techniques: ['narrowHem'],
    mistakes: [
      { mistake: 'Cutting too small', why: 'A swaddle blanket needs to be large enough to wrap around a baby with overlap. 44" square minimum; 47" is better for larger babies or longer use.' },
      { mistake: 'Using a wide hem', why: 'A wide hem adds stiffness to the edges, which makes swaddling harder. Keep it to ¼" double-fold.' }
    ],
    variations: [
      'Round the corners for a softer look (use a plate as a template)',
      'Add a satin binding around all edges instead of hemming',
      'Make a hooded version by sewing a triangle into one corner',
      'Use two layers of single gauze instead of one layer of double gauze'
    ],
    supplies: [
      { item: 'Cotton double gauze', qty: '1.25 yards (for a 44" square)', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true }
    ],
    relatedProjects: ['babyBib', 'babyRomper']
  },

  {
    id: 'stuffedAnimal',
    name: 'Stuffed Animal',
    audiences: ['kids'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'A soft toy made from two shaped fabric pieces sewn together and filled with stuffing. Can be any shape — bear, bunny, whale, star, simple doll. A wonderful gift project and a great way to use fabric scraps.',
    whyItWorks: 'Simple shapes work best — no complex construction. The sew-stuff-close technique is easy for beginners. Imperfections add charm. Kids don\'t care about perfect stitching; they care about the softness and the fact that someone made it for them.',
    fabricAdvice: 'Minky, fleece, cotton flannel, corduroy, linen, quilting cotton. Minky and fleece are cuddly but shift during sewing — use lots of pins. Cotton is easier to sew and can be personalized with printed fabrics.',
    fabricWarning: 'For babies and toddlers: no buttons (use embroidered eyes), no loose ribbons, no small detachable parts. All features should be stitched flat.',
    requirements: { softness: { min: 45 }, durability: { min: 45 }, washability: { min: 50 } },
    construction: [
      { step: 'Cut two body shapes', detail: 'Draw or trace your animal shape onto paper first. Add ⅜" seam allowance all around. Cut two mirror-image pieces (or fold fabric and cut through both layers).' },
      { step: 'Add face details', detail: 'Embroider eyes, nose, and mouth onto the front piece BEFORE sewing the pieces together. Use satin stitch or French knots. For non-baby toys, safety eyes can be inserted through the fabric and secured with washers.' },
      { step: 'Sew body pieces together', detail: 'Right sides together, sew around the entire shape with a ⅜" seam, leaving a 2–3" turning gap on a straight section (like the belly).' },
      { step: 'Clip curves and turn', detail: 'Clip into curves, notch concave curves, trim points. Turn right side out and push out all the curves and corners with a chopstick or point turner.' },
      { step: 'Stuff', detail: 'Use polyester fiberfill, stuffing small amounts at a time. Pack ears, limbs, and corners first, then fill the body. Aim for plump but squeezable — not rock-hard.' },
      { step: 'Close the opening', detail: 'Turn in the seam allowances at the gap and ladder-stitch (slip-stitch) closed by hand. The stitches should be invisible.' }
    ],
    techniques: ['topstitching'],
    mistakes: [
      { mistake: 'Understuffing', why: 'Understuffed animals look sad and floppy. Pack the stuffing firmly, especially in limbs and extremities. The fabric will compress over time, so stuff slightly more than you think you need.' },
      { mistake: 'Too-complex shapes', why: 'Start with simple silhouettes — a whale, a star, a simple bear shape. Complicated shapes with thin appendages are hard to turn and stuff.' },
      { mistake: 'Forgetting to add face before assembly', why: 'It\'s much easier to embroider features on a flat piece of fabric than on a stuffed 3D shape. Always add the face before sewing the two body pieces together.' }
    ],
    variations: [
      'Add a squeaker or rattle insert for a baby toy',
      'Use different fabrics for front and back (printed cotton front, soft minky back)',
      'Make a set of nesting animals in three sizes from the same pattern',
      'Add a ribbon tag loop at the side seam — babies love to grip ribbon tags'
    ],
    supplies: [
      { item: 'Fabric', qty: '¼–½ yard (depending on animal size)', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Polyester fiberfill', qty: '1 bag (12 oz is plenty for several animals)', essential: true },
      { item: 'Embroidery floss', qty: '1–2 skeins (for facial features)', essential: true },
      { item: 'Safety eyes', qty: '1 pair', essential: false, note: 'Not for babies/toddlers — use embroidered eyes instead' }
    ],
    relatedProjects: ['babyBib', 'swaddleBlanket']
  },

  // ── HOME & LIVING ──

  {
    id: 'clothNapkins',
    name: 'Cloth Napkins',
    audiences: ['home'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours (set of 4–6)',
    overview: 'Simple hemmed squares of fabric, typically 18–20" for dinner napkins or 10–12" for cocktail napkins. Fast to batch-produce, eco-friendly, and a classic hostess gift. A set of matching napkins elevates any table.',
    whyItWorks: 'Straight cuts, straight hems, no shaping. The technique is identical to a swaddle blanket, just smaller. Batch-cutting and chain-sewing makes a set of 6 almost as fast as making one.',
    fabricAdvice: 'Linen is the traditional choice — absorbent, gets softer with washing, and looks better with age. Cotton (quilting cotton, poplin, broadcloth) is durable and easy to care for. Linen-cotton blends offer the best of both.',
    fabricWarning: 'Avoid polyester and synthetic blends — they repel liquids instead of absorbing them. Silk stains permanently. Dark colors may transfer dye when wet.',
    requirements: { absorbency: { min: 65, weight: 1.3 }, washability: { min: 70, weight: 1.2 }, durability: { min: 55 } },
    construction: [
      { step: 'Cut squares', detail: 'For dinner napkins: 20" squares (finishes to ~18.5" after hemming). For cocktail napkins: 12" squares. Use a rotary cutter and ruler for speed and accuracy.' },
      { step: 'Press the hem', detail: 'Fold all four edges ¼", press. Fold again ½", press. The pressing is the slowest part — it\'s also what makes the finished product look professional.' },
      { step: 'Mitre the corners', detail: 'Open the folds at each corner. Fold the corner point in diagonally where the fold lines intersect. Refold the hems — the corner should form a neat 45° join. Press.' },
      { step: 'Stitch', detail: 'Topstitch close to the inner folded edge on all four sides. Pivot at the corners with the needle down. One continuous stitching line per napkin.' }
    ],
    techniques: ['doubleHem', 'topstitching'],
    mistakes: [
      { mistake: 'Skipping mitred corners', why: 'Without mitring, the corners are bulky with overlapping layers of fabric. The mitre removes this bulk and gives a flat, professional finish.' },
      { mistake: 'Not pre-washing fabric', why: 'Linen and cotton shrink 5–10% on the first wash. Pre-wash, dry, and press your fabric before cutting or your finished napkins will shrink unevenly.' },
      { mistake: 'Inconsistent sizes', why: 'Even ¼" differences are visible when napkins are stacked together. Use a rotary cutter and acrylic ruler for batch cutting.' }
    ],
    variations: [
      'Add a monogram or embroidered motif to one corner',
      'Use different coordinating fabrics for a mismatched set',
      'Make oversized napkins (24" square) for formal dining',
      'Add a decorative machine stitch (blanket stitch, scallop) instead of a straight topstitch'
    ],
    supplies: [
      { item: 'Fabric', qty: '1.5 yards (makes 4 dinner napkins); 1 yard (makes 6–8 cocktail)', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Rotary cutter + cutting mat + ruler', qty: '1 set', essential: false, note: 'Makes batch cutting much faster and more accurate than scissors' }
    ],
    relatedProjects: ['tableclothRunner', 'envelopePillow']
  },

  {
    id: 'duvetCover',
    name: 'Duvet Cover',
    audiences: ['home'],
    skill: 'beginner',
    time: 'afternoon',
    timeLabel: 'An afternoon',
    overview: 'Two large panels of fabric sewn together on three sides with a closure on the fourth. Essentially a giant pillowcase for your comforter. The construction is simple; the challenge is handling large pieces of fabric.',
    whyItWorks: 'Straight seams, no shaping, no fitting. If you can sew a pillowcase, you can sew a duvet cover — it\'s the same technique at a larger scale. A custom duvet cover in your chosen fabric costs a fraction of retail.',
    fabricAdvice: 'Cotton percale (crisp and cool), cotton sateen (soft and silky), linen (breathable, textured), cotton flannel (warm). Choose fabric at least 90" wide (sheeting width) to avoid a center seam, or piece two widths of 45" fabric together.',
    fabricWarning: 'Standard 45" fabric will require a center seam unless you buy wide sheeting. This is functional but some people find it distracting visually. If piecing, press the seam open for flatness.',
    requirements: { softness: { min: 55 }, breathability: { min: 55 }, durability: { min: 55 }, washability: { min: 60, weight: 1.1 } },
    construction: [
      { step: 'Cut front and back panels', detail: 'Measure your duvet insert and add 2" to width and length for ease plus seam allowances. Standard sizes: Twin 68×88", Full 82×88", Queen 88×92", King 104×92".' },
      { step: 'Hem the opening edge', detail: 'On both panels, hem the bottom edge (the opening side) with a 2" double-fold hem. This is where the closure will be.' },
      { step: 'Add closure', detail: 'Options: button/buttonhole flap (overlap one hemmed edge over the other by 6–8"), ties or ribbons sewn at intervals along both hemmed edges, or install snaps. An envelope-style overlap is the easiest.' },
      { step: 'Sew three sides', detail: 'Right sides together, sew the top and both sides with a ½" seam. French seams give the cleanest interior finish.' },
      { step: 'Turn and press', detail: 'Turn right side out through the bottom opening. Press the seams flat. Insert the duvet and close.' }
    ],
    techniques: ['doubleHem', 'frenchSeam', 'buttonholes'],
    mistakes: [
      { mistake: 'Making it the exact size of the insert', why: 'A duvet cover that matches the insert exactly will be too tight — the fabric takes up space and the fill can\'t loft fully. Add 2" to each dimension.' },
      { mistake: 'Not finishing interior seams', why: 'An unfinished interior will fray in the wash and shed threads onto your comforter. French seams or serged edges prevent this.' },
      { mistake: 'Skipping corner ties', why: 'Without internal ties at each corner, the duvet insert shifts inside the cover and bunches up. Add 12" fabric ties at all four inside corners.' }
    ],
    variations: [
      'Add a contrasting border or band along the bottom',
      'Use different fabrics for front and back (printed front, solid back)',
      'Add interior corner ties to keep the insert in place',
      'Make a flannel version for winter and a percale version for summer'
    ],
    supplies: [
      { item: 'Fabric (90" wide sheeting or 45" to piece)', qty: '5–6 yards (queen)', essential: true },
      { item: 'Matching thread', qty: '2 spools', essential: true },
      { item: 'Buttons', qty: '5–7 (for button closure)', essential: false },
      { item: 'Ribbon or twill tape', qty: '2 yards (for interior corner ties)', essential: false }
    ],
    relatedProjects: ['envelopePillow', 'curtainPanels']
  },

  {
    id: 'apron',
    name: 'Apron',
    audiences: ['home', 'accessories'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'A full-coverage kitchen or craft apron with a bib, waist ties, and a neck strap. One of the most practical handmade gifts — everyone needs an apron and a custom one feels special.',
    whyItWorks: 'Flat construction — no fitting, no closures, no curves. The shape is basically a rectangle with a narrower top section. Tie closures adjust to any body size.',
    fabricAdvice: 'Medium-weight cotton (canvas, denim, twill, drill) is the classic choice — durable and machine washable. Linen makes a beautiful, softening-with-age apron. Oilcloth or laminated cotton for waterproof craft aprons.',
    fabricWarning: 'Avoid lightweight fabrics — they won\'t protect your clothes and will look limp. Avoid fabrics that can\'t be machine washed — aprons get dirty.',
    requirements: { durability: { min: 60, weight: 1.2 }, washability: { min: 65, weight: 1.2 }, heatTolerance: { min: 55 } },
    construction: [
      { step: 'Cut the body, bib, and straps', detail: 'Body: rectangle ~27" wide × 30" long. Bib: rectangle ~10" wide × 12" tall. Straps: 3 strips — one neck strap (28" long) and two waist ties (36" each). All straps ~3" wide (finishes to 1.5").' },
      { step: 'Hem the sides and bottom', detail: 'Double-fold hem (½") on both sides and the bottom of the body piece.' },
      { step: 'Make the straps', detail: 'Fold each strap in half lengthwise, right sides together. Sew along the long edge and one short end. Turn right side out (a safety pin helps). Press flat.' },
      { step: 'Attach waist ties', detail: 'Pin the raw end of each waist tie to the side edges of the body, at the top (where the body meets the bib). Stitch securely — these bear weight when tied.' },
      { step: 'Attach bib', detail: 'Hem the sides of the bib. Pin the bottom of the bib to the top center of the body. Stitch, reinforce with a second line of stitching.' },
      { step: 'Attach neck strap', detail: 'Sew each end of the neck strap to the top corners of the bib. Try it on and adjust the length before final stitching.' },
      { step: 'Add pocket (optional)', detail: 'A large patch pocket across the front or two smaller pockets at hip height. Hem the pocket top, press under the sides and bottom, topstitch in place.' }
    ],
    techniques: ['doubleHem', 'topstitching'],
    mistakes: [
      { mistake: 'Waist ties too short', why: 'Ties need to wrap around the body and tie in front (or back). 36" is a minimum; 42" works for most body types. Test by wrapping a tape measure.' },
      { mistake: 'Neck strap too long', why: 'An apron with a neck strap that\'s too long will sag and the bib will fold forward. Adjust while wearing it, then stitch.' },
      { mistake: 'Skipping reinforcement at stress points', why: 'Where the ties meet the body and where the bib meets the body bear the most stress. Backstitch and sew a small square or X at these junctions.' }
    ],
    variations: [
      'Make a half apron (waist only — no bib) for lighter duty',
      'Add an adjustable neck strap with a D-ring or button',
      'Make a child-size version (scale all measurements down by 40%)',
      'Cross the straps at the back instead of tying for a more secure fit'
    ],
    supplies: [
      { item: 'Fabric', qty: '1.5 yards', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'D-ring (1")', qty: '2', essential: false, note: 'For adjustable neck strap' }
    ],
    relatedProjects: ['toteBag', 'clothNapkins']
  },

  {
    id: 'potHolders',
    name: 'Pot Holders',
    audiences: ['home'],
    skill: 'beginner',
    time: 'under-hour',
    timeLabel: 'Under an hour (pair)',
    overview: 'Two-layer padded squares with a loop for hanging. Quick, practical, and a perfect scrap-busting project. Makes a great housewarming or hostess gift paired with a matching tea towel.',
    whyItWorks: 'Small, fast, forgiving. The quilted-through-all-layers technique is a gentle introduction to quilting. No pattern needed — it\'s a square.',
    fabricAdvice: 'Cotton is essential — it\'s heat-resistant and won\'t melt. Quilting cotton for the outside, cotton batting (not polyester) for the insulation layer. Never use synthetic fabrics near heat.',
    fabricWarning: 'Polyester batting will melt and can cause burns. Use only cotton or wool batting. Do not use any fabric with metallic threads near open flames.',
    requirements: { heatTolerance: { min: 75, weight: 1.5 }, durability: { min: 55 }, structure: { min: 40 } },
    construction: [
      { step: 'Cut squares', detail: 'Cut 2 outer squares (8" × 8"), 2 squares of cotton batting (8" × 8"), and 1 piece of Insul-Bright or extra batting (7.5" × 7.5").' },
      { step: 'Layer', detail: 'Stack: outer fabric (right side down), batting, Insul-Bright, batting, outer fabric (right side up). Pin or baste through all layers.' },
      { step: 'Quilt', detail: 'Stitch diagonal lines 1.5" apart across the square, then cross in the other direction to create a diamond pattern. This holds all layers together.' },
      { step: 'Trim and bind', detail: 'Trim all layers even. Cut 2.5" bias binding strips. Bind the edges, starting at the middle of one side. At one corner, make a folded loop for hanging before completing the binding.' }
    ],
    techniques: ['biasBinding', 'topstitching'],
    mistakes: [
      { mistake: 'Using polyester batting', why: 'Polyester melts at temperatures well below what you encounter in cooking. It can melt through to your hand. Always use cotton or wool batting for pot holders.' },
      { mistake: 'Not enough insulation', why: 'A single layer of batting isn\'t enough — you\'ll feel the heat. Double up the batting and add Insul-Bright (reflective insulating material) in the middle.' },
      { mistake: 'Skipping the quilting', why: 'Without quilting stitches, the batting will shift and bunch after washing. The quilting holds everything in place permanently.' }
    ],
    variations: [
      'Make oven mitts using the same layering technique with a mitten pattern',
      'Use a different color binding for a pop of contrast',
      'Piece a simple patchwork square for the front',
      'Round the corners for a softer look'
    ],
    supplies: [
      { item: 'Cotton fabric', qty: '¼ yard', essential: true },
      { item: 'Cotton batting', qty: '¼ yard', essential: true },
      { item: 'Insul-Bright', qty: '¼ yard', essential: false, note: 'Reflective insulating material — dramatically improves heat protection' },
      { item: 'Bias binding (cotton)', qty: '2 yards (for a pair)', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true }
    ],
    relatedProjects: ['clothNapkins', 'apron']
  },

  // ── ACCESSORIES ──

  {
    id: 'headband',
    name: 'Headband',
    audiences: ['accessories', 'women', 'kids'],
    skill: 'beginner',
    time: 'under-hour',
    timeLabel: 'Under an hour',
    overview: 'A fabric headband — either a knotted turban style, a wide stretch band, or a classic tied bow. Uses tiny amounts of fabric and makes a great gift or accessory from scraps.',
    whyItWorks: 'Minimal fabric, fast construction, and infinitely customizable. A knit headband is the simplest (cut a strip, fold, sew the ends). A woven turban-style takes slightly more shaping but looks impressive.',
    fabricAdvice: 'Knit fabrics (cotton jersey, rib knit) stretch to fit comfortably without elastic. Woven fabrics (cotton, linen) need either an elastic section or a tie closure. Lightweight fabrics are most comfortable.',
    fabricWarning: 'Very stiff fabrics will press uncomfortably into the temples. Heavy fabrics slide backward off the head. Stick to light and medium weights.',
    requirements: { softness: { min: 50 }, washability: { min: 55 } },
    construction: [
      { step: 'Cut the band', detail: 'For a knit turban style: cut a rectangle 20" × 9". For a woven tie-back style: cut a strip 30" × 4".' },
      { step: 'Fold and sew the band', detail: 'Fold in half lengthwise, right sides together. Sew the long edge. Turn right side out and press with the seam centered on the back.' },
      { step: 'Create the twist (turban style)', detail: 'Fold the band in half to find the center. Cross the two halves over each other at the center to create an X. Pin the twist. This creates the gathered turban look at the front.' },
      { step: 'Join the ends', detail: 'Overlap the raw ends at the back by 1". Tuck the raw edges under and topstitch, or hand-stitch closed. For tie-back style, leave the ends open and tie at the nape of the neck.' }
    ],
    techniques: ['topstitching'],
    mistakes: [
      { mistake: 'Too tight', why: 'A headband that\'s too tight causes headaches. Measure around your head where the band will sit and add 1" of ease for wovens. Knits can be cut to head measurement minus 1" (they stretch).' },
      { mistake: 'Twist not centered', why: 'If the turban twist isn\'t at the exact center, the headband will look lopsided. Mark the center point of the band before creating the twist.' }
    ],
    variations: [
      'Add a bow at the top instead of a twist',
      'Use elastic at the back for a secure fit on woven fabric',
      'Make a wide version (5") for a boho look or a narrow version (2") for a classic look',
      'Use velvet for a luxurious autumn/winter accessory'
    ],
    supplies: [
      { item: 'Fabric', qty: '¼ yard', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Elastic (½" wide)', qty: '4"', essential: false, note: 'For woven fabric versions — gives stretch at the back' }
    ],
    relatedProjects: ['scrunchie', 'infinityScarf']
  },

  {
    id: 'scrunchie',
    name: 'Hair Scrunchie',
    audiences: ['accessories', 'women', 'kids'],
    skill: 'beginner',
    time: 'under-hour',
    timeLabel: '15–20 minutes',
    overview: 'A fabric-covered elastic hair tie. The fastest project in this catalog — you can make one in 15 minutes. A great way to use up small fabric scraps and match your outfit.',
    whyItWorks: 'Tiny fabric requirement, near-instant gratification, and everyone uses them. A batch of scrunchies in assorted prints makes a gift that always delights.',
    fabricAdvice: 'Almost any lightweight to medium-weight fabric works. Silk or satin for a luxurious feel (and less hair breakage). Cotton for everyday wear. Velvet for fall/winter.',
    fabricWarning: 'Very heavy or stiff fabrics make bulky scrunchies. Very stretchy knits can be hard to gather evenly around the elastic.',
    requirements: { softness: { min: 40 } },
    construction: [
      { step: 'Cut a rectangle', detail: 'Cut a strip 22" × 4" (adjust width for desired puffiness — wider = puffier). For a large, voluminous scrunchie: 22" × 6".' },
      { step: 'Fold and sew the tube', detail: 'Fold in half lengthwise, right sides together. Sew the long edge with a ¼" seam, creating a tube. Leave the short ends open.' },
      { step: 'Turn right side out', detail: 'Turn the tube right side out using a safety pin or loop turner. The seam should be hidden inside.' },
      { step: 'Thread the elastic', detail: 'Cut elastic 8–9" long. Attach a safety pin to one end and thread it through the tube. Don\'t let the other end disappear — pin it to the fabric.' },
      { step: 'Join the elastic', detail: 'Overlap the elastic ends by ½" and stitch together securely (zigzag back and forth several times).' },
      { step: 'Close the opening', detail: 'Tuck one raw end inside the other by ½". Slip-stitch or topstitch closed.' }
    ],
    techniques: ['topstitching'],
    mistakes: [
      { mistake: 'Elastic too long', why: '9" is the maximum for most hair types. If the elastic is too long, the scrunchie won\'t grip. Test by wrapping the elastic around a ponytail before cutting.' },
      { mistake: 'Fabric strip too short', why: 'The gathering is what makes a scrunchie look full and voluminous. If the strip is too short, it just looks like a covered elastic — not a scrunchie. 22" minimum.' }
    ],
    variations: [
      'Make a bow scrunchie by adding a separate tied bow piece',
      'Use two contrasting fabrics — one for each half',
      'Add a long fabric tail for a scarf-style scrunchie',
      'Use silk for a sleep scrunchie that won\'t crease hair'
    ],
    supplies: [
      { item: 'Fabric', qty: '1 strip 22" × 4"', essential: true },
      { item: 'Matching thread', qty: 'Small amount', essential: true },
      { item: 'Elastic (¼" wide)', qty: '8–9"', essential: true },
      { item: 'Safety pin', qty: '1', essential: true }
    ],
    relatedProjects: ['headband', 'infinityScarf']
  },

  {
    id: 'dogBandana',
    name: 'Dog Bandana',
    audiences: ['accessories', 'kids'],
    skill: 'beginner',
    time: 'under-hour',
    timeLabel: 'Under an hour',
    overview: 'A triangular fabric bandana that ties or slides onto a dog\'s collar. A charming, easy project that uses less than a fat quarter of fabric. Pet owners love matching their dog\'s accessories to the season.',
    whyItWorks: 'Two straight cuts (fold a square in half diagonally), a simple hem or sew-and-turn construction. The collar-slide version is especially clever — no tying needed.',
    fabricAdvice: 'Lightweight cotton (quilting cotton, poplin) is ideal — breathable, washable, and available in endless prints. Light cotton flannel works for cooler weather.',
    fabricWarning: 'Avoid anything that frays heavily without finishing (raw linen, loosely woven fabrics). Don\'t use anything heavy — it\'s uncomfortable for the dog and will pull the collar down.',
    requirements: { washability: { min: 70, weight: 1.3 }, durability: { min: 50 }, breathability: { min: 55 } },
    construction: [
      { step: 'Determine size', detail: 'Measure your dog\'s neck. Small dogs: start with 14" square. Medium: 18" square. Large: 22" square. The bandana is the square folded diagonally.' },
      { step: 'Cut the square and fold', detail: 'Cut a square of fabric. Fold in half diagonally to create a triangle. For a cleaner finish, cut two triangles and sew them together.' },
      { step: 'Finish the edges', detail: 'Option A (quick): fold and hem all raw edges with a narrow double-fold hem. Option B (clean): place two triangles right sides together, sew around the edges leaving a turning gap, turn and topstitch.' },
      { step: 'Add collar opening (optional)', detail: 'For a slide-on bandana: fold the triangle point-down. Create a casing along the long folded edge by sewing a channel 1–1.5" wide. The dog\'s collar threads through this channel.' }
    ],
    techniques: ['doubleHem', 'topstitching'],
    mistakes: [
      { mistake: 'Too big for the dog', why: 'An oversized bandana will flip up into the dog\'s face or get caught on things. The triangle should sit on the chest — the points shouldn\'t hang past the dog\'s elbows.' },
      { mistake: 'Not pre-washing', why: 'Dogs drool, dig, and roll. The bandana will be washed frequently. Pre-wash your fabric so it doesn\'t shrink after you\'ve made it.' }
    ],
    variations: [
      'Make a reversible bandana with different prints on each side',
      'Add a snap closure instead of ties for easy on/off',
      'Embroider the dog\'s name on the bandana',
      'Make a seasonal set: florals for spring, plaid for fall, holiday prints for winter'
    ],
    supplies: [
      { item: 'Cotton fabric', qty: '1 fat quarter (18" × 22")', essential: true },
      { item: 'Matching thread', qty: 'Small amount', essential: true }
    ],
    relatedProjects: ['babyBib', 'scrunchie']
  },

  {
    id: 'necktie',
    name: 'Necktie',
    audiences: ['accessories', 'men'],
    skill: 'intermediate',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'A bias-cut necktie with an interlining for body and a tipped end. The bias cut gives the tie its essential drape and ability to spring back after knotting. A handmade tie in a beautiful fabric is a luxury gift.',
    whyItWorks: 'The bias cut is what makes a tie work — it stretches on the diagonal, allowing the knot to form smoothly and recover its shape after wearing. The technique is specific but not difficult.',
    fabricAdvice: 'Silk is the classic tie fabric — it knots beautifully, has a natural luster, and holds its shape. Cotton, linen, and wool also make excellent ties for different seasons and formality levels.',
    fabricWarning: 'The fabric MUST be cut on the bias (45° to the grain). Cutting on-grain will produce a stiff tie that won\'t drape or knot properly. Use a 60" wide fabric for maximum efficiency.',
    requirements: { drape: { min: 50, weight: 1.1 }, structure: { min: 35 }, colorfastness: { min: 55 } },
    construction: [
      { step: 'Cut on the bias', detail: 'Fold the fabric so the selvage aligns with the crosswise grain — the fold is your true bias. Cut the tie shape at 3.5" wide (standard) or 2.5" (skinny). Length: 57–60" for a standard tie.' },
      { step: 'Cut and attach interlining', detail: 'Cut a shaped interlining from wool flannel or a commercial tie interfacing. The interlining is what gives the tie its body and helps it spring back. It tapers at both ends.' },
      { step: 'Fold the tie around the interlining', detail: 'Center the interlining on the wrong side of the tie. Fold one edge over the interlining, then fold the other edge over it, overlapping slightly at the center back.' },
      { step: 'Slip-stitch the back seam', detail: 'Hand-sew the overlapping edges together with a loose slip stitch down the center back. The stitch should be loose — a tight back seam prevents the tie from draping.' },
      { step: 'Finish the tips', detail: 'Fold and hand-stitch the pointed ends, tucking the fabric neatly. The wide end should be a symmetrical point; the narrow end is finished the same way.' },
      { step: 'Add the bar tack', detail: 'At the back of the wide end, make a small bar tack (3–4 horizontal stitches) about 3" from the point. This keeps the folds in place at the widest stress point.' }
    ],
    techniques: ['biasBinding'],
    mistakes: [
      { mistake: 'Cutting on-grain instead of bias', why: 'A tie cut on-grain will be stiff, won\'t drape around a knot, and will permanently wrinkle where it\'s knotted. The bias cut is non-negotiable.' },
      { mistake: 'Pulling the slip stitch tight', why: 'The back seam must be loose enough that the tie can stretch and flex when knotted. A tight seam will cause the tie to pucker and twist.' },
      { mistake: 'Skipping the interlining', why: 'Without interlining, the tie will be floppy and won\'t hold a knot properly. The interlining provides the body and spring-back that defines a quality tie.' }
    ],
    variations: [
      'Make a skinny tie (2–2.5" wide) for a modern look',
      'Make a bow tie using the same bias-cut technique (shorter, wider shape)',
      'Use contrasting fabric for the tip lining (visible when the wind catches it)',
      'Make a knit tie from a ponte or double-knit fabric (cut on-grain, not bias)'
    ],
    supplies: [
      { item: 'Silk or fashion fabric', qty: '¾ yard (60" wide) or 1.5 yards (45" wide)', essential: true },
      { item: 'Tie interlining (wool or commercial)', qty: '1 piece 57" × 2"', essential: true },
      { item: 'Silk thread', qty: '1 spool (for slip-stitching)', essential: true },
      { item: 'Tipping fabric', qty: 'Scrap (for the back of each tip)', essential: false }
    ],
    relatedProjects: ['vestWaistcoat', 'buttonUpShirt']
  },

  // ── BAGS ──

  {
    id: 'drawstringBag',
    name: 'Drawstring Bag',
    audiences: ['bags', 'kids'],
    skill: 'beginner',
    time: 'under-hour',
    timeLabel: 'Under an hour',
    overview: 'A simple gathered bag with a cord or ribbon drawstring closure. Works as a shoe bag, lingerie bag, gift bag, toy storage, or produce bag. The most versatile bag pattern — scale it to any size.',
    whyItWorks: 'One rectangle of fabric, two seams, one casing. No hardware, no zippers, no interfacing. The drawstring does all the work of closing and carrying. A batch of four takes about an hour.',
    fabricAdvice: 'Cotton (quilting cotton, muslin, canvas) for everyday use. Cotton organdy or mesh for produce bags. Silk or satin for gift bags or lingerie storage. Canvas or drill for heavy-duty shoe bags.',
    fabricWarning: 'Very slippery fabrics (charmeuse, satin) are functional but the cord slides too easily — the bag may open in transit. Add a cord lock if using slippery fabric.',
    requirements: { durability: { min: 50 }, structure: { min: 35 } },
    construction: [
      { step: 'Cut rectangle', detail: 'Width = desired bag width × 2 + 1" (seam allowances). Height = desired bag height + 3" (for casing and seam allowance). For a standard shoe bag: 16" × 20".' },
      { step: 'Create the drawstring casing', detail: 'Fold the top edge down ¼", press. Fold again 1", press. Stitch close to the inner fold — this creates the channel for the cord. Leave the sides of the casing open.' },
      { step: 'Fold and sew side and bottom', detail: 'Fold in half right sides together (the casing folds should be on the outside). Sew the side seam from below the casing opening down, and across the bottom. The casing stays open at the side seam.' },
      { step: 'Thread the drawstring', detail: 'Use a safety pin to thread cord, ribbon, or a fabric tube through the casing. Both cord ends should emerge from the same side of the bag.' },
      { step: 'Knot the ends', detail: 'Tie the cord ends together in an overhand knot (or add cord stops). Turn the bag right side out.' }
    ],
    techniques: ['elasticCasing', 'frenchSeam'],
    mistakes: [
      { mistake: 'Sewing the casing shut at the side seam', why: 'The cord needs to enter and exit the casing. Stop the side seam stitching at the bottom of the casing, not at the top of the bag.' },
      { mistake: 'Cord too short', why: 'The cord needs to be long enough to cinch the bag fully closed AND leave enough hanging to grip and pull. Add 12" beyond the circumference of the bag opening.' }
    ],
    variations: [
      'Make a double-drawstring version (cord enters from both sides) for a bag that cinches from both directions',
      'Add a flat bottom by boxing the corners (sew across each bottom corner 2" from the point)',
      'Line it with a contrasting fabric for a gift-worthy look',
      'Use a large scale for a laundry bag or a small scale for a jewelry pouch'
    ],
    supplies: [
      { item: 'Fabric', qty: '½ yard', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Cord or ribbon', qty: '1.5 yards', essential: true },
      { item: 'Safety pin', qty: '1 (for threading cord)', essential: true }
    ],
    relatedProjects: ['toteBag', 'zipperedPouch']
  },

  {
    id: 'crossbodyBag',
    name: 'Crossbody Bag',
    audiences: ['bags', 'accessories'],
    skill: 'intermediate',
    time: 'weekend',
    timeLabel: 'Weekend project',
    overview: 'A small to medium structured bag with a long adjustable strap, a flap or zipper closure, and interior pockets. Worn across the body for hands-free convenience. Requires interfacing for structure and hardware for the strap.',
    whyItWorks: 'This project introduces hardware (D-rings, swivel clips, slider buckles) and interfacing — skills that open up a whole category of bag-making. The result is genuinely useful and looks professional.',
    fabricAdvice: 'Medium to heavy cotton (canvas, duck, drill), denim, waxed cotton, or cork fabric. The fabric needs enough body to hold the bag shape. Interface with Pellon SF101 or similar for structure.',
    fabricWarning: 'Lightweight fabrics will produce a floppy bag — heavy interfacing can compensate but adds bulk at seam intersections. Very thick fabrics (upholstery weight) are hard to sew through multiple layers.',
    requirements: { durability: { min: 65, weight: 1.3 }, structure: { min: 55, weight: 1.2 } },
    construction: [
      { step: 'Cut and interface all pieces', detail: 'Cut front, back, flap, gusset (optional), and strap. Interface the front, back, and flap with fusible interfacing. A rectangular bag without a gusset is simpler; a gusset adds depth.' },
      { step: 'Build the interior', detail: 'Sew a slip pocket and/or zippered pocket to the lining back piece. Position pockets where they\'re accessible when the bag is open.' },
      { step: 'Attach hardware tabs', detail: 'Create two small fabric tabs with D-rings. Attach one to each side of the bag body at the top — these are where the strap will clip on.' },
      { step: 'Assemble the bag body', detail: 'Sew the front and back together (and gusset, if using). Sew the lining separately in the same way, leaving a turning gap in the bottom.' },
      { step: 'Attach the flap', detail: 'Layer the flap with its lining, right sides together. Sew around the curved edge, turn, and press. Topstitch. Baste the raw edge to the top of the bag back.' },
      { step: 'Join outer bag and lining', detail: 'Place the outer bag inside the lining (right sides together, flap sandwiched between). Sew around the top opening. Turn right side out through the lining gap. Close the gap and topstitch the top edge.' },
      { step: 'Make and attach the strap', detail: 'Sew a long fabric strap (or use webbing). Add a slider buckle for adjustability. Clip swivel hooks to each end, and clip those to the D-rings on the bag.' }
    ],
    techniques: ['topstitching', 'lining'],
    mistakes: [
      { mistake: 'Not interfacing the bag pieces', why: 'Without interfacing, the bag will be floppy and won\'t hold its shape. Interface the outer fabric pieces — not the lining.' },
      { mistake: 'Strap too long or too short', why: 'Measure across your body from one hip to the opposite shoulder and back down. A standard crossbody strap is 42–52". Make it adjustable with a slider buckle so the length can be fine-tuned.' },
      { mistake: 'Forgetting the turning gap', why: 'Without a gap in the lining bottom seam, you can\'t turn the bag right side out after sewing the top opening. Leave a 5" gap — don\'t forget to close it after turning.' },
      { mistake: 'Magnetic snap misalignment', why: 'If using a magnetic snap for the flap, install both halves BEFORE sewing the bag together. Check alignment by folding the flap closed and marking the snap position on the bag front.' }
    ],
    variations: [
      'Add a front zippered pocket for quick-access items',
      'Use a purchased webbing strap instead of making one',
      'Add a removable strap so the bag can convert to a clutch',
      'Use waxed canvas for a water-resistant finish'
    ],
    supplies: [
      { item: 'Outer fabric', qty: '½ yard', essential: true },
      { item: 'Lining fabric', qty: '½ yard', essential: true },
      { item: 'Fusible interfacing', qty: '½ yard', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'D-rings (1")', qty: '2', essential: true },
      { item: 'Swivel clips (1")', qty: '2', essential: true },
      { item: 'Slider buckle (1")', qty: '1', essential: true },
      { item: 'Magnetic snap', qty: '1 set', essential: false, note: 'For flap closure — alternatively use a button or toggle' }
    ],
    relatedProjects: ['toteBag', 'zipperedPouch']
  },

  {
    id: 'laptopSleeve',
    name: 'Laptop / Tablet Sleeve',
    audiences: ['bags', 'accessories'],
    skill: 'beginner',
    time: 'few-hours',
    timeLabel: 'Few hours',
    overview: 'A padded fabric envelope for a laptop or tablet. Two quilted panels joined together, with a flap closure or a fold-over top. Customized to your exact device dimensions for a snug fit.',
    whyItWorks: 'Simple construction (two rectangles plus padding), but the result is genuinely protective and looks polished. Measuring your exact device means a perfect fit — something store-bought rarely achieves.',
    fabricAdvice: 'Outer: medium-weight cotton (canvas, drill, waxed cotton), denim, or cork fabric. Lining: soft fabric that won\'t scratch the screen (cotton flannel, fleece, felt). Padding: quilt batting or foam.',
    fabricWarning: 'The sleeve must be padded — unpadded fabric won\'t protect from bumps. Avoid rough interior fabrics that could scratch the screen or case.',
    requirements: { structure: { min: 55, weight: 1.3 }, durability: { min: 60, weight: 1.2 }, softness: { min: 35 } },
    construction: [
      { step: 'Measure your device', detail: 'Measure the width, height, and depth of your laptop/tablet. Add 1" to width and height for ease, plus seam allowances. Depth becomes the gusset (or add ½" to width for each side if skipping the gusset).' },
      { step: 'Cut and layer panels', detail: 'For each panel: cut outer fabric, batting, and lining. Layer: outer (right side down), batting, lining (right side up). Quilt each panel by stitching through all layers in a grid or diagonal pattern.' },
      { step: 'Join the panels', detail: 'Place quilted panels right sides together. Sew bottom and both sides. If adding a gusset strip, sew it between the panels along the bottom and sides.' },
      { step: 'Finish the opening', detail: 'Bind the top opening with bias binding, or fold and topstitch a clean finish. For a flap closure: cut and quilt a flap panel, attach to the back top edge, and add a magnetic snap or velcro for closure.' },
      { step: 'Turn and press', detail: 'Turn right side out. Push corners out fully. Press the edges (use low heat over batting). Insert your device and check fit.' }
    ],
    techniques: ['biasBinding', 'topstitching'],
    mistakes: [
      { mistake: 'Too tight a fit', why: 'A sleeve that\'s too snug is frustrating to use — you\'ll struggle to insert and remove the device. Add 1" of ease to all dimensions beyond the device measurements.' },
      { mistake: 'Not enough padding', why: 'A single layer of thin batting provides minimal protection. Use two layers of batting, or use ½" foam for serious protection.' },
      { mistake: 'Forgetting the depth', why: 'Laptops aren\'t flat — they have thickness. If you don\'t account for the depth, the sleeve will be too tight when the device is inside.' }
    ],
    variations: [
      'Add an exterior pocket for a charger or notebook',
      'Use a fold-over top with a button-and-loop closure instead of a flap',
      'Add a carrying handle at the top',
      'Make a matching sleeve for your tablet, phone, and laptop as a coordinated set'
    ],
    supplies: [
      { item: 'Outer fabric', qty: '½ yard', essential: true },
      { item: 'Lining fabric (soft)', qty: '½ yard', essential: true },
      { item: 'Quilt batting or foam', qty: '½ yard', essential: true },
      { item: 'Matching thread', qty: '1 spool', essential: true },
      { item: 'Magnetic snap or velcro', qty: '1 set', essential: false, note: 'For flap closure' },
      { item: 'Bias binding', qty: '1 yard', essential: false, note: 'For binding the opening edge' }
    ],
    relatedProjects: ['zipperedPouch', 'crossbodyBag']
  }

];



const CONSTRUCTION_DETAILS = {
  collars: {
    label: "Collars",
    items: [
      {
        id: 'standCollar',
        name: "Stand Collar",
        aka: "Band collar, Mandarin collar, Nehru collar",
        difficulty: "intermediate",
        bestFabrics: ["Wovens", "Light–Medium weight"],
        desc: "A vertical band that rises from the neckline without folding over. The simplest collar structure — two layers of fabric (outer and facing) joined at the top edge and attached to the neckline. The stand height, curve, and closure style determine its character, from a relaxed linen camp shirt to a structured cheongsam.",
        steps: [
          "Interface the outer collar piece. For crisp fabrics like linen, use lightweight fusible; for soft fabrics like silk, use sew-in organza.",
          "Sew the outer collar to the facing, right sides together, along the top edge and short ends. Clip curves, turn right side out, press.",
          "Pin the outer collar to the garment neckline, right sides together, matching center back and notches. Stitch.",
          "Turn the facing seam allowance under and slipstitch to the neckline seam, or stitch-in-the-ditch from the right side to catch it.",
          "Topstitch ⅛\" from all finished edges for a clean, structured look. Press collar upward."
        ],
        whenToUse: "Button-up shirts, tunics, cheongsam, chef coats, minimalist blouses. The go-to collar when you want structure without the formality of a fold-over collar.",
        fabricNote: "Stands taller than 1½\" need stiffer interfacing or the collar will flop. On very lightweight fabrics, underline both collar pieces with organza for invisible body.",
        tools: ["Point turner", "Tailor's clapper", "Fusible interfacing"],
        techniqueLinks: ["topstitching"],
        projectLinks: ["buttonUpShirt"],
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M20 85 Q20 55 40 45 L60 40 L80 45 Q100 55 100 85" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.06)"/><path d="M40 45 L40 30 Q50 25 60 25 Q70 25 80 30 L80 45" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.1)"/><line x1="60" y1="25" x2="60" y2="40" stroke="#C4A882" stroke-width="1" stroke-dasharray="3 2"/><text x="60" y="18" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">stand</text><text x="60" y="100" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">neckline</text></svg>`,
        variations: [
          {
            name: "Mandarin Collar",
            aka: "Short stand, rounded front edges",
            desc: "A short stand (¾\"–1\") with gently rounded front edges that don't quite meet. Traditional in Chinese garments, now common in contemporary menswear and women's blouses. Usually closes with a frog or hook at the center front.",
            uses: ["Tunics", "Formal shirts"],
            difficulty: "intermediate",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><path d="M15 60 Q15 40 30 35 L40 32 L50 35 Q65 40 65 60" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><path d="M30 35 L30 22 Q35 18 40 18 Q45 18 50 22 L50 35" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.1)"/><path d="M40 18 L40 32" stroke="#C4A882" stroke-width="1" stroke-dasharray="2 2"/></svg>`
          },
          {
            name: "Nehru Collar",
            aka: "Taller stand, squared front edges",
            desc: "A taller stand (1½\"–2\") with squared front edges that meet or nearly meet at center front. More formal than the Mandarin — associated with Indian formalwear, Beatles-era jackets, and contemporary suiting.",
            uses: ["Jackets", "Formalwear"],
            difficulty: "intermediate",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><path d="M15 60 Q15 40 30 35 L40 32 L50 35 Q65 40 65 60" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><path d="M30 35 L30 18 Q35 14 40 14 Q45 14 50 18 L50 35" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.1)"/><rect x="38" y="14" width="4" height="4" rx="1" fill="#8B6B4A" opacity="0.3"/></svg>`
          },
          {
            name: "Mock Neck",
            aka: "Funnel neck (taller version)",
            desc: "A wider, shorter stand that doesn't close at the front — the neckline simply rises up. Often cut as part of the bodice rather than a separate piece. No closure needed, making it the easiest stand collar variant. A funnel neck is the taller version (2\"+).",
            uses: ["Knit tops", "Athletic wear"],
            difficulty: "beginner",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><path d="M15 55 Q15 40 28 35 L40 30 L52 35 Q65 40 65 55" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><path d="M28 35 L28 28 Q34 20 40 20 Q46 20 52 28 L52 35" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.1)"/><circle cx="40" cy="22" r="3" stroke="#C4A882" stroke-width="1" fill="none"/></svg>`
          }
        ]
      },
      {
        id: 'flatCollar',
        name: "Flat Collar",
        aka: "Peter Pan collar, Puritan collar, sailor collar",
        difficulty: "beginner",
        bestFabrics: ["Cotton", "Linen", "Light–Medium weight"],
        desc: "A collar that lies flat against the garment, with no stand. The outer edge of the collar follows the shoulder line and the inner edge follows the neckline. The shape of the outer edge — rounded, pointed, squared — determines the style. Peter Pan is rounded; a pointed version is a \"Chelsea\" collar.",
        steps: [
          "Cut two collar pieces (upper and under collar) and interface the upper collar. For a Peter Pan, the outer edge should curve gently.",
          "Sew upper and under collar right sides together along the outer edge. Leave the neck edge open. Clip curves, notch convex curves.",
          "Turn right side out, press, and understitch the under collar (stitch the seam allowances to the under collar so it rolls under and stays invisible).",
          "Pin the collar to the neckline with the upper collar against the right side of the garment. Sew a facing over the top, sandwiching the collar.",
          "Clip the neckline curve, turn the facing to the inside, press. Tack facing in place at shoulder seams."
        ],
        whenToUse: "Children's garments, blouses, dresses, vintage-style clothing. Perfect first collar project — no stand to wrestle with, just two flat pieces and a facing.",
        fabricNote: "Works on almost any light to medium fabric. Heavier fabrics make the collar stand up slightly — if that happens, you actually want a Convertible collar instead. Sheer fabrics show the seam through the upper collar, so use French seams or Hong Kong finish.",
        tools: ["Point turner", "Under-stitching foot"],
        techniqueLinks: ["frenchSeam"],
        projectLinks: [],
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M20 90 Q20 65 40 55 L60 50 L80 55 Q100 65 100 90" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.06)"/><path d="M40 55 Q25 45 20 35 Q30 38 45 42 L60 50 L75 42 Q90 38 100 35 Q95 45 80 55" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.1)"/><circle cx="54" cy="55" r="1.5" fill="#8B6B4A"/><circle cx="66" cy="55" r="1.5" fill="#8B6B4A"/><text x="60" y="110" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">collar falls flat</text></svg>`,
        variations: [
          {
            name: "Sailor Collar",
            aka: "Middy collar",
            desc: "A flat collar with a broad, square back that tapers to points at the front. The points often end in a V-neckline with a decorative tie or knot. Larger than a Peter Pan — the back panel extends to the shoulder blades.",
            uses: ["Children's wear", "Nautical style"],
            difficulty: "intermediate",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><path d="M15 60 Q15 45 28 40 L40 36 L52 40 Q65 45 65 60" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><path d="M28 40 Q18 30 12 22 L32 34 L40 36 L48 34 L68 22 Q62 30 52 40" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.1)"/></svg>`
          },
          {
            name: "Chelsea Collar",
            aka: "Pointed flat collar",
            desc: "A flat collar with pointed tips instead of rounded ones. The points can be long and dramatic or short and subtle. Same construction as Peter Pan — the only difference is the outer edge shape.",
            uses: ["Blouses", "Retro style"],
            difficulty: "beginner",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><path d="M15 60 Q15 45 28 40 L40 36 L52 40 Q65 45 65 60" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><path d="M28 40 L18 30 L35 36 L40 36 L45 36 L62 30 L52 40" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.1)"/></svg>`
          }
        ]
      },
      {
        id: 'notchedCollar',
        name: "Notched Collar",
        aka: "Tailored collar, lapel collar, convertible collar",
        difficulty: "advanced",
        bestFabrics: ["Wool", "Cotton twill", "Medium–Heavy weight"],
        desc: "A two-piece collar with a stand and a fall (the part that folds over), paired with lapels that create the characteristic V-shaped notch where collar meets lapel. This is the classic blazer and suit jacket collar. The relationship between the collar stand, the break point, and the lapel angle determines the formality and style.",
        steps: [
          "Cut the upper collar, under collar (on bias for better roll), and collar stand pieces. Interface the under collar and the lapel facing.",
          "Sew the under collar to the garment neckline between the shoulder seams. Press seam open.",
          "Sew the front facings to the upper collar. This creates a single piece: left facing–collar–right facing.",
          "Pin the facing/upper collar unit to the garment, right sides together. Stitch from the hem of one facing, up the front, around the lapel, across to the collar notch, along the collar, back down to the other hem.",
          "Clip corners at the notch, grade seam allowances, turn right side out. Roll the seam slightly to the underside at the collar and to the top side at the lapels. Press over a tailor's ham."
        ],
        whenToUse: "Blazers, suit jackets, structured coats, tailored robes. The hallmark of tailored garments — worth learning even if you only sew casual clothing, because the collar-setting skills transfer.",
        fabricNote: "The under collar should be cut on the bias so it molds smoothly around the neck. Use a heavy sew-in interfacing (hymo or hair canvas) for structured tailoring, or medium fusible for casual jackets. Pad-stitching the under collar by hand produces the best roll.",
        tools: ["Tailor's ham", "Clapper", "Hair canvas or hymo", "Point turner"],
        techniqueLinks: [],
        projectLinks: [],
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M30 110 L30 50 L15 35 L45 50 L60 42 L75 50 L105 35 L90 50 L90 110" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.06)"/><path d="M45 50 L60 42 L75 50" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.12)"/><path d="M45 50 L15 35" stroke="#8B6B4A" stroke-width="1.5"/><path d="M75 50 L105 35" stroke="#8B6B4A" stroke-width="1.5"/><circle cx="42" cy="48" r="2" fill="#8B6B4A" opacity="0.3"/><circle cx="78" cy="48" r="2" fill="#8B6B4A" opacity="0.3"/><text x="42" y="42" font-family="Georgia,serif" font-size="6" fill="#5C554D" text-anchor="middle">notch</text><text x="60" y="36" font-family="Georgia,serif" font-size="6" fill="#5C554D" text-anchor="middle">collar</text><text x="22" y="48" font-family="Georgia,serif" font-size="6" fill="#5C554D" text-anchor="middle">lapel</text></svg>`,
        variations: [
          {
            name: "Peak Lapel",
            aka: "Pointed lapel",
            desc: "The lapel points upward and outward above the collar line instead of creating a downward notch. More formal and dramatic — the standard for double-breasted jackets and tuxedos. Same collar construction, but the facing is cut with an upward-pointing extension.",
            uses: ["Tuxedos", "Double-breasted jackets"],
            difficulty: "advanced",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><path d="M20 72 L20 38 L10 22 L30 35 L40 30 L50 35 L70 22 L60 38 L60 72" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><path d="M30 35 L40 30 L50 35" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.1)"/></svg>`
          },
          {
            name: "Shawl Collar",
            aka: "Roll collar, tuxedo collar",
            desc: "A continuous curve from the neckline to the lapel with no notch — the collar and lapel are one piece. Softer and more relaxed than notched or peak. Often seen on cardigans, robes, and smoking jackets. Easier to construct because there's no lapel/collar junction to navigate.",
            uses: ["Cardigans", "Robes", "Smoking jackets"],
            difficulty: "intermediate",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><path d="M20 72 L20 45 Q20 30 35 28 L40 28 L45 28 Q60 30 60 45 L60 72" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><path d="M20 45 Q20 30 35 28 L40 28 L45 28 Q60 30 60 45" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.1)"/></svg>`
          }
        ]
      }
    ]
  },

  waistbands: {
    label: "Waistbands",
    items: [
      {
        id: 'straightWaistband',
        name: "Straight Waistband",
        aka: "Set-on waistband, traditional waistband",
        difficulty: "beginner",
        bestFabrics: ["Wovens", "All weights"],
        desc: "A rectangular strip of fabric folded in half lengthwise and attached to the garment's waist edge. The most common waistband — what you see on most pants and skirts. Usually 1\"–1½\" wide when finished, with a button, hook, or snap closure at the overlap.",
        steps: [
          "Cut the waistband strip to your waist measurement + seam allowances + overlap (typically 1¼\"). Cut interfacing to half the width and fuse to the wrong side of one half.",
          "Sew the interfaced half to the garment waist, right sides together, starting and stopping at the fly or closure opening.",
          "Fold the waistband along the center line, right sides together. Stitch across both short ends.",
          "Trim corners, turn right side out. Press the unstitched long edge under ¼\".",
          "Pin the folded edge to cover the waistline seam on the inside. Stitch-in-the-ditch from the outside, or slipstitch from the inside for an invisible finish.",
          "Add closure: button + buttonhole at the overlap, or hook and bar."
        ],
        whenToUse: "Trousers, jeans, A-line skirts, any garment that needs a defined, structured waistline. The workhorse waistband.",
        fabricNote: "Always interface the outer half — without it, the waistband will buckle and wrinkle. For thick fabrics like denim, use a stiffer interfacing (woven fusible or petersham ribbon) and grade the seam allowances to reduce bulk.",
        tools: ["Fusible interfacing", "Edge/stitch-in-ditch foot"],
        techniqueLinks: [],
        projectLinks: ["aLineSkirt"],
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="10" y="40" width="100" height="20" rx="2" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.08)"/><line x1="10" y1="50" x2="110" y2="50" stroke="#C4A882" stroke-width="1" stroke-dasharray="3 2"/><path d="M10 60 L10 100 M110 60 L110 100" stroke="#8B6B4A" stroke-width="1.5"/><path d="M25 60 L20 100 M45 60 L42 100 M65 60 L63 100 M85 60 L83 100 M105 60 L100 100" stroke="#C4A882" stroke-width="1"/><rect x="93" y="43" width="14" height="14" rx="2" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><circle cx="100" cy="50" r="2" fill="#8B6B4A" opacity="0.4"/><text x="55" y="35" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">fold line</text></svg>`,
        variations: [
          {
            name: "With Belt Loops",
            desc: "Fabric strips (typically ½\" wide × 2½\" long) folded, stitched, and bar-tacked to the waistband at 5–7 evenly spaced points. Attach loops before finishing the inside of the waistband — they get sandwiched into the top seam.",
            uses: ["Pants", "Jeans"],
            difficulty: "beginner",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><rect x="8" y="25" width="64" height="16" rx="2" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.08)"/><path d="M18 41 L18 68 M38 41 L38 68 M58 41 L58 68" stroke="#C4A882" stroke-width="1"/><rect x="13" y="30" width="8" height="6" rx="1.5" stroke="#5B8C6B" stroke-width="1" fill="rgba(91,140,107,0.1)"/><rect x="33" y="30" width="8" height="6" rx="1.5" stroke="#5B8C6B" stroke-width="1" fill="rgba(91,140,107,0.1)"/><rect x="53" y="30" width="8" height="6" rx="1.5" stroke="#5B8C6B" stroke-width="1" fill="rgba(91,140,107,0.1)"/></svg>`
          },
          {
            name: "With Fly Zipper",
            desc: "The waistband integrates with a fly-front zipper opening — the overlap extension on one side includes the fly shield. Requires careful alignment: the waistband ends must match exactly when the zipper is closed.",
            uses: ["Trousers", "Jeans"],
            difficulty: "intermediate",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><rect x="8" y="25" width="64" height="16" rx="2" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.08)"/><path d="M8 41 L8 68 M72 41 L72 68" stroke="#8B6B4A" stroke-width="1"/><path d="M20 41 L18 68 M40 41 L40 68 M60 41 L58 68" stroke="#C4A882" stroke-width="1"/><path d="M30 28 L30 38" stroke="#5B8C6B" stroke-width="2"/><path d="M34 28 L34 38" stroke="#5B8C6B" stroke-width="2"/><path d="M38 28 L38 38" stroke="#5B8C6B" stroke-width="1" stroke-dasharray="1.5 1.5"/></svg>`
          },
          {
            name: "Contoured / Shaped",
            aka: "Curved waistband, petersham waistband",
            desc: "Cut to follow the body's curve rather than as a straight strip. The top edge is shorter than the bottom edge, creating a waistband that sits flush against the body without gapping. More comfortable than straight bands on curvy bodies.",
            uses: ["Fitted trousers", "Skirts"],
            difficulty: "advanced",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><path d="M8 30 Q20 22 40 20 Q60 22 72 30 L72 42 Q60 34 40 32 Q20 34 8 42 Z" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.08)"/><path d="M8 42 L8 68 M72 42 L72 68" stroke="#8B6B4A" stroke-width="1"/><path d="M25 42 L22 68 M45 42 L44 68 M60 42 L58 68" stroke="#C4A882" stroke-width="1"/></svg>`
          },
          {
            name: "Button Tab Extension",
            desc: "The waistband extends beyond the closure with a decorative or functional button tab. Allows for slight size adjustment — the button can be moved to make the waist looser or tighter. Common on dress pants and chinos.",
            uses: ["Dress pants", "Chinos"],
            difficulty: "intermediate",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><rect x="8" y="25" width="64" height="16" rx="2" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.08)"/><path d="M8 41 L8 68 M72 41 L72 68" stroke="#8B6B4A" stroke-width="1"/><path d="M25 41 L23 68 M50 41 L48 68" stroke="#C4A882" stroke-width="1"/><circle cx="68" cy="33" r="3" stroke="#8B6B4A" stroke-width="1.5" fill="none"/><circle cx="68" cy="33" r="0.8" fill="#8B6B4A"/></svg>`
          }
        ]
      },
      {
        id: 'elasticWaistband',
        name: "Elasticized Waistband",
        aka: "Elastic casing, pull-on waist, channel waistband",
        difficulty: "beginner",
        bestFabrics: ["All fabrics", "Especially knits"],
        desc: "Fabric folded over to create a channel (casing) through which elastic is threaded. No closure needed — the garment pulls on over the hips. The simplest waistband to construct and the most forgiving fit-wise, since the elastic adjusts to the body.",
        steps: [
          "Fold the top edge of the garment to the inside by the width of your elastic + ½\" for ease + ¼\" turn-under. Press.",
          "Stitch close to the folded raw edge, leaving a 2\" opening at the center back for inserting elastic.",
          "Cut elastic to your comfortable waist measurement minus 1\"–2\". Attach a safety pin to one end and thread it through the casing.",
          "Overlap the elastic ends by ½\" and stitch securely (zigzag or box stitch). Let the elastic pull back into the casing.",
          "Stitch the opening closed. Distribute gathers evenly around the waist."
        ],
        whenToUse: "Pajama pants, casual skirts, children's clothing, pull-on shorts, gathered-waist dresses. Anywhere ease and comfort matter more than tailored structure.",
        fabricNote: "Use ¾\"–1\" wide elastic for most garments. Wider elastic (1½\"–2\") reduces rolling but needs a wider casing. On lightweight fabrics, use soft knit elastic — braided elastic is too stiff and creates visible ridges.",
        tools: ["Safety pin or bodkin", "Elastic (¾\"–1\" wide)"],
        techniqueLinks: ["gathering"],
        projectLinks: ["pajamaPants"],
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="10" y="35" width="100" height="25" rx="3" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.06)"/><path d="M15 42 Q22 38 29 42 Q36 46 43 42 Q50 38 57 42 Q64 46 71 42 Q78 38 85 42 Q92 46 99 42 Q106 38 110 42" stroke="#C4A882" stroke-width="1.5" fill="none"/><path d="M15 52 Q22 48 29 52 Q36 56 43 52 Q50 48 57 52 Q64 56 71 52 Q78 48 85 52 Q92 56 99 52 Q106 48 110 52" stroke="#C4A882" stroke-width="1.5" fill="none"/><path d="M20 60 L15 100 M50 60 L48 100 M80 60 L78 100 M105 60 L100 100" stroke="#8B6B4A" stroke-width="1"/><text x="60" y="28" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">elastic casing</text></svg>`,
        variations: [
          {
            name: "Drawstring",
            aka: "Tie waist, channel-and-cord",
            desc: "An elastic casing with an opening at center front (or center back) for a drawstring cord or ribbon. The cord exits through buttonholes or grommets in the waistband, allowing the wearer to cinch and tie. Often combined with elastic for dual adjustment.",
            uses: ["Casual pants", "Lounge wear"],
            difficulty: "beginner",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><rect x="8" y="22" width="64" height="20" rx="2" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><path d="M40 22 L40 12 M40 12 L30 12 M40 12 L50 12" stroke="#8B6B4A" stroke-width="1.5"/><path d="M30 12 Q28 20 30 28" stroke="#C4A882" stroke-width="1"/><path d="M50 12 Q52 20 50 28" stroke="#C4A882" stroke-width="1"/><path d="M8 42 L8 68 M72 42 L72 68" stroke="#8B6B4A" stroke-width="1"/></svg>`
          },
          {
            name: "Multiple Channels",
            aka: "Double elastic, yoga waistband",
            desc: "Two or three parallel channels, each with its own elastic. Distributes tension across a wider area, preventing the waistband from rolling or digging in. The look is smoother and more athletic.",
            uses: ["Activewear", "Maternity"],
            difficulty: "intermediate",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><rect x="8" y="22" width="64" height="10" rx="1" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.1)"/><rect x="8" y="32" width="64" height="10" rx="1" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><path d="M12 27 Q19 24 26 27 Q33 30 40 27 Q47 24 54 27 Q61 30 68 27" stroke="#5B8C6B" stroke-width="1" fill="none"/><path d="M12 37 Q19 34 26 37 Q33 40 40 37 Q47 34 54 37 Q61 40 68 37" stroke="#5B8C6B" stroke-width="1" fill="none"/><path d="M8 42 L8 68 M72 42 L72 68" stroke="#8B6B4A" stroke-width="1"/></svg>`
          },
          {
            name: "Partial Elastic Back",
            aka: "Side-elastic waistband",
            desc: "A straight waistband with elastic only in the back panel (between the side seams). The front looks like a tailored waistband with a flat, smooth finish; the back has gathered stretch for comfort.",
            uses: ["Dress pants", "Skirts"],
            difficulty: "intermediate",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><rect x="8" y="22" width="64" height="16" rx="2" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.08)"/><path d="M14 30 Q21 26 28 30 Q35 34 42 30 Q49 26 56 30 Q63 34 68 30" stroke="#C4A882" stroke-width="1.5" fill="none"/><path d="M8 38 L8 60 M72 38 L72 60" stroke="#8B6B4A" stroke-width="1"/><line x1="20" y1="22" x2="20" y2="38" stroke="#5B8C6B" stroke-width="1.5" stroke-dasharray="2 2"/><line x1="60" y1="22" x2="60" y2="38" stroke="#5B8C6B" stroke-width="1.5" stroke-dasharray="2 2"/></svg>`
          }
        ]
      },
      {
        id: 'facedWaist',
        name: "Faced Waistline",
        aka: "Waist facing, invisible waistband, grown-on waist",
        difficulty: "intermediate",
        bestFabrics: ["Wovens", "Light–Medium weight"],
        desc: "Instead of an external band, a shaped facing piece is sewn to the inside of the garment at the waist. From the outside, the waistline looks clean and seamless — no visible band. The facing follows the waist curve and is typically 2\"–3\" wide, held in place with tacking or topstitching.",
        steps: [
          "Cut facing pieces that match the waistline shape of your garment front and back. Interface all facing pieces.",
          "Sew the facing pieces together at the side seams. Finish the lower edge of the facing (serge, zigzag, or pink).",
          "Pin the facing to the garment waistline, right sides together. Stitch at the standard seam allowance.",
          "Grade the seam allowances (trim the facing layer narrower). Clip curves. Understitch the facing to prevent it from rolling to the outside.",
          "Turn the facing to the inside. Press. Tack the facing to the side seams and darts by hand, or topstitch ¼\" from the waist edge for a sportier look."
        ],
        whenToUse: "Fitted skirts, high-waisted pants, dresses with defined waists, any garment where a visible waistband would interrupt the design line.",
        fabricNote: "Works best on light to medium-weight fabrics. On heavier fabrics, the facing can create a visible ridge — use silk organza as the interfacing instead of fusible for a softer transition.",
        tools: ["Fusible interfacing", "Tailor's ham"],
        techniqueLinks: [],
        projectLinks: ["pencilSkirt"],
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M15 30 Q30 25 60 23 Q90 25 105 30 L105 55 Q90 50 60 48 Q30 50 15 55 Z" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.08)"/><path d="M15 55 L15 100 M105 55 L105 100" stroke="#8B6B4A" stroke-width="1.5"/><path d="M35 55 L33 100 M60 55 L59 100 M85 55 L83 100" stroke="#C4A882" stroke-width="1"/><line x1="15" y1="30" x2="105" y2="30" stroke="#8B6B4A" stroke-width="1" stroke-dasharray="4 3"/><text x="60" y="18" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">waist edge</text><text x="60" y="42" font-family="Georgia,serif" font-size="6" fill="#9B9389" text-anchor="middle">facing (inside)</text></svg>`,
        variations: []
      }
    ]
  },

  cuffs: {
    label: "Cuffs",
    items: [
      {
        id: 'barrelCuff',
        name: "Barrel Cuff",
        aka: "Button cuff, single cuff",
        difficulty: "intermediate",
        bestFabrics: ["Cotton", "Linen", "Light–Medium weight"],
        desc: "The standard shirt cuff — a band at the wrist that fastens with one or two buttons. The cuff wraps around the wrist with a slight overlap, buttoning snugly. Can be round-cornered (softer, casual) or square-cornered (crisper, dressier). Most dress shirts and casual button-ups use barrel cuffs.",
        steps: [
          "Interface the outer cuff piece. For a clean finish, interface the piece that will show on the outside when the cuff is buttoned.",
          "Sew the placket at the sleeve opening first — this creates the slit that allows your hand through. Use a continuous bound placket or a tailored tower placket.",
          "Gather or pleat the bottom edge of the sleeve to fit the cuff length. Pin evenly, distributing fullness.",
          "Attach the outer cuff to the sleeve, right sides together. Stitch along the bottom edge.",
          "Fold the cuff along the fold line, right sides together. Stitch across both short ends.",
          "Turn right side out, press the inner cuff edge under, and slipstitch or stitch-in-the-ditch to finish.",
          "Make buttonholes on the overlap side, sew buttons on the underlap."
        ],
        whenToUse: "Any button-up shirt, from casual flannel to dress shirts. The default cuff for most shirt patterns.",
        fabricNote: "Use lightweight fusible interfacing for cotton/linen shirts. On flannel or heavier cotton, skip the interfacing — the fabric has enough body already. Always interface before cutting for the most accurate shape.",
        tools: ["Fusible interfacing", "Buttonhole foot"],
        techniqueLinks: [],
        projectLinks: [],
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M20 20 L20 65 M100 20 L100 65" stroke="#C4A882" stroke-width="1.5"/><path d="M20 40 Q35 50 60 52 Q85 50 100 40" stroke="#C4A882" stroke-width="1" stroke-dasharray="3 2"/><rect x="15" y="65" width="90" height="25" rx="4" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.08)"/><line x1="15" y1="77" x2="105" y2="77" stroke="#C4A882" stroke-width="1" stroke-dasharray="3 2"/><circle cx="95" cy="77" r="3" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><text x="60" y="104" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">button overlap</text></svg>`,
        variations: [
          {
            name: "Rounded Barrel",
            desc: "The corners of the cuff are rounded instead of squared. Gives a softer, more casual look. Common on camp shirts and sport shirts. Same construction — the only difference is the curve at the short ends.",
            uses: ["Casual shirts", "Camp shirts"],
            difficulty: "intermediate",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><path d="M10 15 L10 42 M70 15 L70 42" stroke="#C4A882" stroke-width="1"/><rect x="8" y="42" width="64" height="18" rx="9" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.08)"/><circle cx="62" cy="51" r="2.5" stroke="#8B6B4A" stroke-width="1" fill="none"/></svg>`
          },
          {
            name: "Two-Button Barrel",
            desc: "A wider cuff with two buttons stacked vertically or placed side by side. Provides a more adjusted fit — the lower button tightens the cuff closer to the wrist. More formal than a single-button cuff.",
            uses: ["Dress shirts", "Formal shirts"],
            difficulty: "intermediate",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><path d="M10 15 L10 42 M70 15 L70 42" stroke="#C4A882" stroke-width="1"/><rect x="8" y="42" width="64" height="22" rx="3" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.08)"/><circle cx="62" cy="48" r="2" stroke="#8B6B4A" stroke-width="1" fill="none"/><circle cx="62" cy="58" r="2" stroke="#8B6B4A" stroke-width="1" fill="none"/></svg>`
          }
        ]
      },
      {
        id: 'frenchCuff',
        name: "French Cuff",
        aka: "Double cuff, turnback cuff",
        difficulty: "intermediate",
        bestFabrics: ["Cotton broadcloth", "Silk", "Fine linen"],
        desc: "A cuff cut twice the finished width that folds back on itself, creating a double layer. Instead of buttons, French cuffs fasten with cufflinks through aligned buttonholes on both layers. The fold creates a substantial, elegant wrist treatment that's the standard for formal dress shirts.",
        steps: [
          "Cut the cuff piece to twice the finished width + seam allowances. Interface the half that will be visible (the outer fold-back layer).",
          "Attach the cuff to the sleeve the same way as a barrel cuff — outer cuff to sleeve, right sides together.",
          "Instead of folding in half, fold the cuff up to full width and stitch across the short ends.",
          "Turn right side out, finish the inner edge. The cuff is now one long piece attached at the wrist.",
          "Make two buttonholes at each end of the cuff (four total per cuff), positioned to align when folded back.",
          "Fold the cuff back on itself so the buttonholes align. Insert cufflinks."
        ],
        whenToUse: "Formal dress shirts, tuxedo shirts, any time you want an elevated, sophisticated cuff. Pairs with cufflinks, which add a personal, jewellery-like detail.",
        fabricNote: "Best on fine cotton broadcloth, poplin, or silk — the fold-back needs to lie flat and smooth. Avoid bulky fabrics; the double layer adds enough bulk on its own. Some tailors skip interfacing on fine cotton to keep the cuff soft and drapey.",
        tools: ["Cufflinks", "Buttonhole foot"],
        techniqueLinks: [],
        projectLinks: [],
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M25 20 L25 50 M95 20 L95 50" stroke="#C4A882" stroke-width="1.5"/><rect x="20" y="50" width="80" height="22" rx="3" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.1)"/><rect x="20" y="72" width="80" height="22" rx="3" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.06)"/><path d="M25 72 L95 72" stroke="#8B6B4A" stroke-width="1" stroke-dasharray="3 2"/><text x="60" y="64" font-family="Georgia,serif" font-size="6" fill="#5C554D" text-anchor="middle">fold back</text><rect x="82" y="55" width="8" height="4" rx="1" stroke="#8B6B4A" stroke-width="1" fill="rgba(139,107,74,0.15)"/><rect x="82" y="77" width="8" height="4" rx="1" stroke="#8B6B4A" stroke-width="1" fill="rgba(139,107,74,0.15)"/><text x="60" y="104" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">cufflink through both</text></svg>`,
        variations: []
      },
      {
        id: 'ribbedCuff',
        name: "Ribbed / Knit Cuff",
        aka: "Rib-knit band, bomber cuff",
        difficulty: "beginner",
        bestFabrics: ["Knits", "Sweatshirt fleece"],
        desc: "A band of ribbed knit fabric sewn to the sleeve end. The ribbing stretches to allow the hand through, then contracts to hug the wrist. No closure needed. This is the cuff on sweatshirts, hoodies, bomber jackets, and most knit garments.",
        steps: [
          "Cut the rib-knit strip to about ⅔–¾ of the sleeve opening circumference (the stretch will make up the difference). Width = desired finished width × 2 + seam allowances.",
          "Fold the rib strip in half lengthwise, wrong sides together. Press lightly — avoid stretching the ribbing.",
          "Divide both the rib strip and the sleeve opening into quarters. Mark with pins.",
          "Pin the rib to the sleeve, right sides together, matching quarter marks. The rib will be shorter — you'll stretch it to fit.",
          "Sew with a stretch stitch or serger, stretching the rib to match the sleeve as you sew. Use ¼\" seam allowance.",
          "Press the seam toward the sleeve (not into the rib)."
        ],
        whenToUse: "Sweatshirts, hoodies, bomber jackets, track pants, any knit garment where you want a snug wrist finish.",
        fabricNote: "Use 1×1 or 2×2 rib knit — not interlock or jersey, which won't grip the wrist. Cut the ribbing slightly shorter than the opening so it hugs; if it's the same size, the cuff will gape. A serger gives the cleanest seam on knits.",
        tools: ["Serger (optional)", "Ballpoint/stretch needle", "Walking foot"],
        techniqueLinks: [],
        projectLinks: [],
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><path d="M25 20 L25 60 M95 20 L95 60" stroke="#C4A882" stroke-width="1.5"/><rect x="20" y="60" width="80" height="30" rx="4" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.06)"/><g stroke="#C4A882" stroke-width="1"><line x1="30" y1="62" x2="30" y2="88"/><line x1="38" y1="62" x2="38" y2="88"/><line x1="46" y1="62" x2="46" y2="88"/><line x1="54" y1="62" x2="54" y2="88"/><line x1="62" y1="62" x2="62" y2="88"/><line x1="70" y1="62" x2="70" y2="88"/><line x1="78" y1="62" x2="78" y2="88"/><line x1="86" y1="62" x2="86" y2="88"/></g><text x="60" y="104" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">rib-knit stretches to fit</text></svg>`,
        variations: [
          {
            name: "Rolled / Turned-Up Cuff",
            aka: "Dock worker cuff",
            desc: "The sleeve end is simply turned up (hemmed or raw) and tacked or left to unroll. No separate cuff piece — it's part of the sleeve. Casual and adjustable. Common on chambray shirts, denim jackets, and casual knits.",
            uses: ["Casual shirts", "Denim jackets"],
            difficulty: "beginner",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><path d="M15 15 L15 45 M65 15 L65 45" stroke="#C4A882" stroke-width="1"/><path d="M12 45 Q40 48 68 45 L68 58 Q40 55 12 58 Z" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.1)"/><path d="M12 58 L12 72 M68 58 L68 72" stroke="#C4A882" stroke-width="1" stroke-dasharray="2 2"/></svg>`
          },
          {
            name: "Elastic Cuff",
            aka: "Elasticized sleeve end",
            desc: "Elastic threaded through a casing at the sleeve end — the same principle as an elasticized waistband but at the wrist. Creates a bloused, gathered effect above the wrist. Common on peasant blouses and boho styles.",
            uses: ["Peasant blouses", "Bishop sleeves"],
            difficulty: "beginner",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><path d="M10 15 Q25 18 40 20 Q55 18 70 15 L70 45 Q55 50 40 52 Q25 50 10 45 Z" stroke="#C4A882" stroke-width="1" fill="rgba(139,107,74,0.04)"/><rect x="8" y="48" width="64" height="12" rx="2" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.08)"/><path d="M12 54 Q19 50 26 54 Q33 58 40 54 Q47 50 54 54 Q61 58 68 54" stroke="#C4A882" stroke-width="1" fill="none"/></svg>`
          }
        ]
      }
    ]
  },

  closures: {
    label: "Closures",
    items: [
      {
        id: 'flatButtons',
        name: "Flat Buttons & Buttonholes",
        aka: "Sew-through buttons, two-hole / four-hole buttons",
        difficulty: "beginner",
        bestFabrics: ["All fabrics"],
        desc: "The most common closure in sewing. A flat, disc-shaped button with holes sewn to one side of the garment, and a corresponding machine-made buttonhole on the other side. The button passes through the slit in the buttonhole to close. Four-hole buttons are more secure; two-hole buttons are more decorative.",
        steps: [
          "Mark buttonhole placements on the overlap side. Space evenly (typically 2½\"–3\" apart), starting ¼\" above the first button position.",
          "Set your machine's buttonhole foot and stitch buttonholes. Test on scrap fabric first — match the buttonhole length to your button diameter + thickness.",
          "Cut the buttonholes open with a seam ripper, working from each end toward the center. Place a pin across the far end to prevent cutting through.",
          "Lap the garment closed and mark button positions through the buttonholes with a pin or chalk.",
          "Sew buttons by machine (button-sew foot, zero stitch length, zigzag to match hole spacing) or by hand. For four-hole buttons, sew in an X or parallel lines.",
          "Create a thread shank by wrapping the thread around the stitches between button and fabric 3–4 times. This gives room for the buttonhole layer to sit flat."
        ],
        whenToUse: "Shirt fronts, cuffs, waistbands, back closures on dresses. The universal closure for woven garments.",
        fabricNote: "On sheer or loosely woven fabrics, add a small square of interfacing behind each buttonhole to prevent the stitching from tearing through. On knits, use a stretch buttonhole stitch and interface the buttonhole area.",
        tools: ["Buttonhole foot", "Seam ripper", "Button-sew foot (optional)"],
        techniqueLinks: [],
        projectLinks: [],
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><rect x="50" y="10" width="60" height="100" rx="3" stroke="#C4A882" stroke-width="1.5" fill="rgba(139,107,74,0.04)"/><rect x="10" y="10" width="60" height="100" rx="3" stroke="#C4A882" stroke-width="1.5" fill="rgba(139,107,74,0.06)"/><line x1="52" y1="30" x2="68" y2="30" stroke="#8B6B4A" stroke-width="2"/><line x1="52" y1="55" x2="68" y2="55" stroke="#8B6B4A" stroke-width="2"/><line x1="52" y1="80" x2="68" y2="80" stroke="#8B6B4A" stroke-width="2"/><circle cx="40" cy="30" r="5" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.1)"/><circle cx="38" cy="28" r="1" fill="#8B6B4A"/><circle cx="42" cy="28" r="1" fill="#8B6B4A"/><circle cx="38" cy="32" r="1" fill="#8B6B4A"/><circle cx="42" cy="32" r="1" fill="#8B6B4A"/><circle cx="40" cy="55" r="5" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.1)"/><circle cx="38" cy="53" r="1" fill="#8B6B4A"/><circle cx="42" cy="53" r="1" fill="#8B6B4A"/><circle cx="38" cy="57" r="1" fill="#8B6B4A"/><circle cx="42" cy="57" r="1" fill="#8B6B4A"/><circle cx="40" cy="80" r="5" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.1)"/><circle cx="38" cy="78" r="1" fill="#8B6B4A"/><circle cx="42" cy="78" r="1" fill="#8B6B4A"/><circle cx="38" cy="82" r="1" fill="#8B6B4A"/><circle cx="42" cy="82" r="1" fill="#8B6B4A"/></svg>`,
        variations: [
          {
            name: "Shank Buttons",
            desc: "Buttons with a loop or stem on the back instead of holes through the face. The shank creates natural space between the button and the fabric, so they work well on thick fabrics where a flat button would pull. Sewn by hand through the shank loop.",
            uses: ["Coats", "Jackets", "Heavy fabrics"],
            difficulty: "beginner",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><ellipse cx="40" cy="30" rx="14" ry="12" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.1)"/><path d="M40 42 L40 50" stroke="#8B6B4A" stroke-width="2"/><rect x="35" y="50" width="10" height="4" rx="1" stroke="#8B6B4A" stroke-width="1" fill="rgba(139,107,74,0.06)"/><line x1="20" y1="54" x2="60" y2="54" stroke="#C4A882" stroke-width="1"/><text x="40" y="68" font-family="Georgia,serif" font-size="6" fill="#5C554D" text-anchor="middle">shank lifts button</text></svg>`
          },
          {
            name: "Toggle Buttons",
            aka: "Duffle coat toggle",
            desc: "An elongated button (wood, horn, or plastic) that passes through a fabric loop instead of a buttonhole. The loop is usually made from cord, leather, or a fabric tube. Classic on duffle coats and casual outerwear.",
            uses: ["Duffle coats", "Outerwear"],
            difficulty: "beginner",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><rect x="28" y="22" width="24" height="8" rx="4" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.15)"/><path d="M40 30 L40 40" stroke="#8B6B4A" stroke-width="1.5"/><path d="M30 45 Q40 38 50 45" stroke="#C4A882" stroke-width="2" fill="none"/><line x1="20" y1="50" x2="60" y2="50" stroke="#C4A882" stroke-width="1"/><text x="40" y="64" font-family="Georgia,serif" font-size="6" fill="#5C554D" text-anchor="middle">cord loop</text></svg>`
          }
        ]
      },
      {
        id: 'snaps',
        name: "Snaps & Press Studs",
        aka: "Poppers, press fasteners, gripper snaps",
        difficulty: "beginner",
        bestFabrics: ["All fabrics", "Light–Medium weight"],
        desc: "Two-part fasteners — a ball half and a socket half — that snap together under pressure and pull apart. Sew-on snaps are attached with hand stitching through holes in the rim. Prong snaps (gripper snaps) are applied with pliers or a press tool and punch through the fabric. Invisible from the outside when placed behind a button or flap.",
        steps: [
          "Mark snap placements on both garment layers. The ball (male) half goes on the underlap; the socket (female) half goes on the overlap.",
          "For sew-on snaps: thread a hand needle and knot. Take 3–4 stitches through each hole in the snap rim, passing through only the facing layer — stitches shouldn't show on the right side.",
          "For prong/gripper snaps: position the snap parts on each side. Use snap pliers or a press tool to set them. Test on scrap fabric first — once set, they can't be removed.",
          "Test the closure by snapping and unsnapping several times."
        ],
        whenToUse: "Baby clothes (easy diaper changes), lightweight jackets, placket closures, cuff alternatives, pocket flaps. Any time you need a quick, no-fumble closure.",
        fabricNote: "Sew-on snaps work on any fabric. Prong snaps need fabric with some body — very sheer or delicate fabrics will tear around the prongs. Reinforce the snap area with a small square of interfacing or a fabric patch.",
        tools: ["Hand needle & thread", "Snap pliers (for prong snaps)"],
        techniqueLinks: [],
        projectLinks: ["babyBib"],
        svg: `<svg viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#FAF6F0"/><circle cx="40" cy="45" r="12" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.06)"/><circle cx="40" cy="45" r="5" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.15)"/><circle cx="80" cy="45" r="12" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.06)"/><circle cx="80" cy="45" r="5" stroke="#8B6B4A" stroke-width="1.5" fill="none" stroke-dasharray="2 1"/><text x="40" y="70" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">ball</text><text x="80" y="70" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">socket</text><path d="M52" y1="45" x2="68" y2="45" stroke="#C4A882" stroke-width="1" stroke-dasharray="3 2" d="M52 45 L68 45"/><text x="60" y="90" font-family="Georgia,serif" font-size="7" fill="#5C554D" text-anchor="middle">snap together</text></svg>`,
        variations: [
          {
            name: "Hooks & Eyes",
            desc: "A metal hook on one side and a corresponding loop (eye) on the other. Used where you need a flat, secure closure that doesn't show — bra backs, waistband tops, fur closures. The hook slides into the eye and holds under tension.",
            uses: ["Waistband tops", "Bra backs", "Fur closures"],
            difficulty: "beginner",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><path d="M20 35 L35 35 Q42 35 42 42 Q42 49 35 49 L30 49" stroke="#8B6B4A" stroke-width="2" fill="none"/><circle cx="48" cy="42" r="6" stroke="#8B6B4A" stroke-width="2" fill="none"/><text x="25" y="62" font-family="Georgia,serif" font-size="6" fill="#5C554D" text-anchor="middle">hook</text><text x="48" y="62" font-family="Georgia,serif" font-size="6" fill="#5C554D" text-anchor="middle">eye</text></svg>`
          },
          {
            name: "Frog Closures",
            aka: "Chinese knot closure, brandenburgs",
            desc: "Decorative looped cord or braid closures. A knotted button on one side passes through a looped cord on the other. Purely ornamental and functional — they add visual interest while fastening the garment. Traditional on cheongsam, mandarin-collar jackets, and military-inspired coats.",
            uses: ["Cheongsam", "Mandarin collars", "Military style"],
            difficulty: "intermediate",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><circle cx="25" cy="40" r="6" stroke="#8B6B4A" stroke-width="2" fill="rgba(139,107,74,0.1)"/><path d="M35 40 Q45 32 50 40 Q55 48 45 48 Q38 48 35 40" stroke="#8B6B4A" stroke-width="2" fill="none"/><text x="40" y="64" font-family="Georgia,serif" font-size="6" fill="#5C554D" text-anchor="middle">knot + loop</text></svg>`
          },
          {
            name: "Ties & Bows",
            aka: "Ribbon closure, fabric tie",
            desc: "Fabric strips or ribbons sewn to each side of the opening, tied together to close. Adjustable and decorative. Can be functional (wrap dress ties) or purely decorative (added over a zipper). The easiest closure to sew — just topstitch the tie to the garment edge.",
            uses: ["Wrap dresses", "Baby garments", "Aprons"],
            difficulty: "beginner",
            svg: `<svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#FAF6F0"/><path d="M30 50 Q35 40 40 38 Q45 40 50 50" stroke="#8B6B4A" stroke-width="2" fill="none"/><path d="M25 55 L30 50 L35 58 Z" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.08)"/><path d="M45 58 L50 50 L55 55 Z" stroke="#8B6B4A" stroke-width="1.5" fill="rgba(139,107,74,0.08)"/><path d="M30 50 L22 62" stroke="#8B6B4A" stroke-width="1.5"/><path d="M50 50 L58 62" stroke="#8B6B4A" stroke-width="1.5"/></svg>`
          }
        ]
      }
    ]
  }
};



const YARDAGE_DATA = {
  tops: {
    label: 'Tops',
    items: {
      tank:       { label: 'Tank / Camisole',     base: 1.25, lengths: { cropped: -0.25, standard: 0, tunic: 0.5 } },
      tshirt:     { label: 'T-Shirt',             base: 1.75, lengths: { cropped: -0.25, standard: 0, tunic: 0.5 } },
      blouse:     { label: 'Blouse',              base: 2.0,  lengths: { cropped: -0.25, standard: 0, tunic: 0.5 } },
      buttonDown: { label: 'Button-Down Shirt',   base: 2.25, lengths: { standard: 0, tunic: 0.5 } },
      peasantTop: { label: 'Peasant / Gathered',  base: 2.75, lengths: { cropped: -0.25, standard: 0, tunic: 0.5 } }
    }
  },
  dresses: {
    label: 'Dresses',
    items: {
      sheath:  { label: 'Sheath / Fitted',   base: 2.5,  lengths: { aboveKnee: -0.25, knee: 0, midi: 0.75, maxi: 1.5 } },
      aline:   { label: 'A-Line',            base: 2.75, lengths: { aboveKnee: -0.25, knee: 0, midi: 0.75, maxi: 1.5 } },
      wrap:    { label: 'Wrap Dress',        base: 3.25, lengths: { aboveKnee: -0.25, knee: 0, midi: 0.75, maxi: 1.5 } },
      shift:   { label: 'Shift Dress',       base: 2.25, lengths: { aboveKnee: -0.25, knee: 0, midi: 0.5 } },
      gathered:{ label: 'Gathered / Full',   base: 3.75, lengths: { knee: 0, midi: 0.75, maxi: 1.75 } },
      gown:    { label: 'Evening Gown',      base: 4.5,  lengths: { floor: 0, train: 1.5 } }
    }
  },
  skirts: {
    label: 'Skirts',
    items: {
      pencil:  { label: 'Pencil Skirt',      base: 1.25, lengths: { aboveKnee: -0.25, knee: 0, midi: 0.5 } },
      alineS:  { label: 'A-Line Skirt',      base: 1.5,  lengths: { aboveKnee: -0.25, knee: 0, midi: 0.5, maxi: 1.25 } },
      circle:  { label: 'Circle Skirt',      base: 3.0,  lengths: { aboveKnee: -0.5, knee: 0, midi: 1.0, maxi: 2.0 } },
      pleated: { label: 'Pleated Skirt',     base: 2.5,  lengths: { aboveKnee: -0.25, knee: 0, midi: 0.75, maxi: 1.5 } },
      gathered:{ label: 'Gathered Skirt',    base: 2.25, lengths: { knee: 0, midi: 0.5, maxi: 1.25 } }
    }
  },
  pants: {
    label: 'Pants & Shorts',
    items: {
      shorts:    { label: 'Shorts',            base: 1.5,  lengths: { short: 0, bermuda: 0.25 } },
      straight:  { label: 'Straight Leg',      base: 2.5,  lengths: { ankle: -0.25, standard: 0 } },
      wideLeg:   { label: 'Wide Leg',          base: 3.0,  lengths: { ankle: -0.25, standard: 0 } },
      palazzo:   { label: 'Palazzo',           base: 3.5,  lengths: { standard: 0 } },
      jogger:    { label: 'Jogger / Lounge',   base: 2.25, lengths: { ankle: -0.25, standard: 0 } },
      jumpsuit:  { label: 'Jumpsuit',          base: 3.75, lengths: { shorts: -0.75, ankle: 0, standard: 0 } }
    }
  },
  outerwear: {
    label: 'Outerwear',
    items: {
      vest:       { label: 'Vest',              base: 1.5,  lengths: { standard: 0 } },
      blazer:     { label: 'Blazer',            base: 2.5,  lengths: { cropped: -0.25, standard: 0, long: 0.5 } },
      jacket:     { label: 'Jacket',            base: 2.75, lengths: { cropped: -0.25, standard: 0, long: 0.75 } },
      coat:       { label: 'Coat',              base: 3.5,  lengths: { short: -0.5, standard: 0, long: 1.0, duster: 1.75 } },
      cape:       { label: 'Cape / Poncho',     base: 2.75, lengths: { waist: 0, hip: 0.5, knee: 1.25 } }
    }
  },
  accessories: {
    label: 'Accessories & Home',
    items: {
      scarf:      { label: 'Scarf (standard)',    base: 0.75, lengths: { standard: 0 } },
      infinityS:  { label: 'Infinity Scarf',      base: 1.25, lengths: { standard: 0 } },
      tote:       { label: 'Tote Bag',            base: 1.0,  lengths: { standard: 0 } },
      pillowcover:{ label: 'Pillow Cover (18")',  base: 0.75, lengths: { standard: 0 } },
      curtainP:   { label: 'Curtain Panel',       base: 3.5,  lengths: { cafe: -1.0, sill: 0, floor: 1.5 } },
      tablecloth: { label: 'Tablecloth (60×84")', base: 2.75, lengths: { standard: 0 } }
    }
  }
};

// Size multipliers relative to Medium (base = 1.0)

const YARDAGE_SIZE_MULTIPLIERS = {
  XS:  0.85,
  S:   0.92,
  M:   1.0,
  L:   1.08,
  XL:  1.16,
  '2XL': 1.24,
  '3XL': 1.32
};

// Height adjustments (added to yardage, in yards)

const YARDAGE_HEIGHT_ADJUST = {
  petite:  -0.25,
  average: 0,
  tall:    0.25
};

// Width multipliers — how much less fabric you need at wider widths
// Baseline is 45" width (multiplier = 1.0)

const YARDAGE_WIDTH_MULTIPLIERS = {
  36: 1.25,
  45: 1.0,
  54: 0.85,
  60: 0.75
};

// Add-on multipliers

const YARDAGE_ADDONS = {
  patternMatch: { label: 'Pattern matching (plaids, stripes, large prints)', add: 0.15, desc: 'Extra for aligning pattern repeats at seams' },
  nap:          { label: 'Nap / directional fabric (velvet, corduroy)',      add: 0.15, desc: 'One-way layout requires extra yardage' },
  lining:       { label: 'Lining',                                           pct: 0.7,  desc: 'Lining typically uses 60–80% of shell yardage' }
};


const MEASUREMENT_PRESETS = {
  female: {
    xs:  { bust: 31.5, waist: 24,   hips: 34,   shoulder: 14,   inseam: 30,   armLength: 22.5, highBust: 30, upperArm: 9.5,  neck: 13,   frontWaistLength: 15,   crotchDepth: 9.5,  thigh: 20,   knee: 13.5, calf: 12.5 },
    s:   { bust: 33.5, waist: 26,   hips: 36,   shoulder: 14.5, inseam: 30.5, armLength: 23,   highBust: 32, upperArm: 10,   neck: 13.5, frontWaistLength: 15.5, crotchDepth: 10,   thigh: 21,   knee: 14,   calf: 13   },
    m:   { bust: 35.5, waist: 28,   hips: 38,   shoulder: 15,   inseam: 31,   armLength: 23.5, highBust: 34, upperArm: 10.5, neck: 14,   frontWaistLength: 16,   crotchDepth: 10.5, thigh: 22,   knee: 14.5, calf: 13.5 },
    l:   { bust: 38.5, waist: 31,   hips: 41,   shoulder: 15.5, inseam: 31,   armLength: 24,   highBust: 37, upperArm: 11.5, neck: 14.5, frontWaistLength: 16.5, crotchDepth: 11,   thigh: 23.5, knee: 15,   calf: 14   },
    xl:  { bust: 41.5, waist: 34,   hips: 44,   shoulder: 16,   inseam: 31.5, armLength: 24.5, highBust: 40, upperArm: 12.5, neck: 15,   frontWaistLength: 17,   crotchDepth: 11.5, thigh: 25,   knee: 15.5, calf: 14.5 },
    xxl: { bust: 44.5, waist: 37,   hips: 47,   shoulder: 16.5, inseam: 31.5, armLength: 25,   highBust: 43, upperArm: 13.5, neck: 15.5, frontWaistLength: 17.5, crotchDepth: 12,   thigh: 26.5, knee: 16,   calf: 15   }
  },
  male: {
    xs:  { bust: 34,   waist: 28,   hips: 34,   shoulder: 16.5, inseam: 30,   armLength: 24,   highBust: 33, upperArm: 11,   neck: 14,   frontWaistLength: 16,   crotchDepth: 10.5, thigh: 21,   knee: 14,   calf: 13.5 },
    s:   { bust: 36,   waist: 30,   hips: 36,   shoulder: 17,   inseam: 31,   armLength: 24.5, highBust: 35, upperArm: 11.5, neck: 14.5, frontWaistLength: 16.5, crotchDepth: 11,   thigh: 22,   knee: 14.5, calf: 14   },
    m:   { bust: 39,   waist: 33,   hips: 39,   shoulder: 18,   inseam: 32,   armLength: 25,   highBust: 38, upperArm: 12.5, neck: 15.5, frontWaistLength: 17,   crotchDepth: 11.5, thigh: 23,   knee: 15,   calf: 14.5 },
    l:   { bust: 42,   waist: 36,   hips: 42,   shoulder: 19,   inseam: 32,   armLength: 25.5, highBust: 41, upperArm: 13.5, neck: 16.5, frontWaistLength: 17.5, crotchDepth: 12,   thigh: 24.5, knee: 15.5, calf: 15   },
    xl:  { bust: 46,   waist: 40,   hips: 46,   shoulder: 20,   inseam: 32.5, armLength: 26,   highBust: 45, upperArm: 14.5, neck: 17.5, frontWaistLength: 18,   crotchDepth: 12.5, thigh: 26,   knee: 16,   calf: 15.5 },
    xxl: { bust: 50,   waist: 44,   hips: 50,   shoulder: 21,   inseam: 33,   armLength: 26.5, highBust: 49, upperArm: 15.5, neck: 18.5, frontWaistLength: 18.5, crotchDepth: 13,   thigh: 27.5, knee: 16.5, calf: 16   }
  }
};

// Measurement grouping by garment category + tailor mode

const MEASUREMENT_GROUPS = {
  tops:    { label: 'Tops',       keys: ['bust', 'waist', 'shoulder', 'armLength'] },
  bottoms: { label: 'Bottoms',    keys: ['waist', 'hips', 'inseam'] },
  full:    { label: 'Full-body',  keys: ['bust', 'waist', 'hips', 'shoulder', 'armLength'] },
  tailor:  { label: 'All',        keys: ['bust', 'highBust', 'waist', 'hips', 'shoulder', 'armLength', 'upperArm', 'neck', 'frontWaistLength', 'inseam', 'crotchDepth', 'thigh', 'knee', 'calf'] }
};


const BASE_YARDAGE = {
  // project_id: { width45: { XS, S, M, L, XL }, width54: {...}, width60: {...} }
  // Simplified estimates by project type
  'a-line-skirt':    { 45: { XS: 1.75, S: 2.0, M: 2.25, L: 2.5, XL: 2.75 }, 54: { XS: 1.5, S: 1.75, M: 2.0, L: 2.25, XL: 2.5 }, 60: { XS: 1.25, S: 1.5, M: 1.75, L: 2.0, XL: 2.25 } },
  'camp-collar':     { 45: { XS: 2.0, S: 2.25, M: 2.5, L: 2.75, XL: 3.0 }, 54: { XS: 1.75, S: 2.0, M: 2.25, L: 2.5, XL: 2.75 }, 60: { XS: 1.5, S: 1.75, M: 2.0, L: 2.25, XL: 2.5 } },
  'wide-leg':        { 45: { XS: 2.5, S: 2.75, M: 3.0, L: 3.25, XL: 3.5 }, 54: { XS: 2.25, S: 2.5, M: 2.75, L: 3.0, XL: 3.25 }, 60: { XS: 2.0, S: 2.25, M: 2.5, L: 2.75, XL: 3.0 } },
  'kimono-robe':     { 45: { XS: 3.0, S: 3.25, M: 3.5, L: 3.75, XL: 4.0 }, 54: { XS: 2.75, S: 3.0, M: 3.25, L: 3.5, XL: 3.75 }, 60: { XS: 2.5, S: 2.75, M: 3.0, L: 3.25, XL: 3.5 } },
  'tote-bag':        { 45: { XS: 1.0, S: 1.0, M: 1.0, L: 1.25, XL: 1.25 }, 54: { XS: 0.75, S: 0.75, M: 0.75, L: 1.0, XL: 1.0 }, 60: { XS: 0.75, S: 0.75, M: 0.75, L: 0.75, XL: 0.75 } },
  'camisole':        { 45: { XS: 1.25, S: 1.5, M: 1.75, L: 2.0, XL: 2.25 }, 54: { XS: 1.0, S: 1.25, M: 1.5, L: 1.75, XL: 2.0 }, 60: { XS: 0.75, S: 1.0, M: 1.25, L: 1.5, XL: 1.75 } }
};

window.NFG_DATA.projects = {
  PROJECT_AUDIENCES: PROJECT_AUDIENCES,
  PROJECT_CATALOG: PROJECT_CATALOG,
  CONSTRUCTION_DETAILS: CONSTRUCTION_DETAILS,
  YARDAGE_DATA: YARDAGE_DATA,
  YARDAGE_SIZE_MULTIPLIERS: YARDAGE_SIZE_MULTIPLIERS,
  YARDAGE_HEIGHT_ADJUST: YARDAGE_HEIGHT_ADJUST,
  YARDAGE_WIDTH_MULTIPLIERS: YARDAGE_WIDTH_MULTIPLIERS,
  YARDAGE_ADDONS: YARDAGE_ADDONS,
  MEASUREMENT_PRESETS: MEASUREMENT_PRESETS,
  MEASUREMENT_GROUPS: MEASUREMENT_GROUPS,
  BASE_YARDAGE: BASE_YARDAGE
};
})();
