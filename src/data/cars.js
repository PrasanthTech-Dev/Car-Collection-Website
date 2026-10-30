// Image helper (Unsplash). Every image has a graceful fallback in <SmartImg />.
const IMG_IDS = [
  '1503376780353-7e6692767b70',
  '1492144534655-ae79c964c9d7',
  '1583121274602-3e2820c69888',
  '1618843479313-40f8afb4b4d8',
  '1555215695-3004980ad54e',
  '1494976388531-d1058494cdd8',
  '1580273916550-e323be2ae537',
  '1560958089-b8a1929cea89',
  '1542362567-b07e54358753',
  '1544636331-e26879cd4d9b',
  '1606664515524-ed2f786a0bd6',
  '1619682817481-e994891cd1f5',
  '1552519507-da3b142c6e3d',
  '1511919884226-fd3cad34687c',
]

export const img = (i, w = 1800, q = 85) => {
  if (typeof i === 'string') {
    if (i.startsWith('http') || i.startsWith('/')) return i
    return `https://images.unsplash.com/photo-${i}?auto=format&fit=crop&w=${w}&q=${q}`
  }
  return `https://images.unsplash.com/photo-${IMG_IDS[((i % IMG_IDS.length) + IMG_IDS.length) % IMG_IDS.length]}?auto=format&fit=crop&w=${w}&q=${q}`
}

export const HERO_SLIDES = [
  { image: '/images/brands/ferrari.jpg', kicker: 'Supercars', title: 'Engineered for the\nextraordinary.', car: 'Ferrari 296 GTB', id: 'ferrari-296-gtb' },
  { image: '/images/brands/porsche.jpg', kicker: 'Sports Cars', title: 'Precision you can\nfeel in your hands.', car: 'Porsche 911 GT3 RS', id: 'porsche-911-gt3-rs' },
  { image: '/images/brands/mercedes_amg.jpg', kicker: 'Luxury', title: 'Where craftsmanship\nmeets the road.', car: 'Mercedes-AMG GT 63', id: 'mercedes-amg-gt-63' },
]

export const COLORS = {
  Black: '#111114',
  White: '#f4f4f2',
  Silver: '#b5b8bd',
  Grey: '#5b5f66',
  Red: '#b3121f',
  Blue: '#14346b',
  Green: '#1f4a35',
  Yellow: '#e2b81a',
  Orange: '#d9671b',
  Bronze: '#8a6a3b',
  Navy: '#0d1b33',
}

export const COLOR_META = {
  Black: {
    hex: '#111114',
    finish: 'Nero Noctis Metallic',
    code: 'BLK-01',
    interior: 'Cuoio Tan Full-Grain Nappa Leather',
    accent: 'Hand-polished Obsidian Black accents',
    filter: 'grayscale(1) brightness(0.65) contrast(1.35)',
  },
  White: {
    hex: '#f4f4f2',
    finish: 'Bianco Monocerus Gloss',
    code: 'WHT-02',
    interior: 'Rosso Seta Leather with Contrast Stitching',
    accent: 'Aluminium and Gloss Black exterior pack',
    filter: 'grayscale(0.8) brightness(1.35) contrast(1.08)',
  },
  Silver: {
    hex: '#b5b8bd',
    finish: 'Argento Liquid Metal Metallic',
    code: 'SLV-03',
    interior: 'Grigio Carbon Alcantara & Brushed Metal',
    accent: 'Titanium grey brake calipers & carbon trim',
    filter: 'grayscale(1) brightness(1.18) contrast(1.15)',
  },
  Grey: {
    hex: '#5b5f66',
    finish: 'Grigio Telesto Matte Finish',
    code: 'GRY-04',
    interior: 'Nero Ade Leather with Contrast Piping',
    accent: 'Satin Carbon Fibre splitters and diffusers',
    filter: 'grayscale(1) brightness(0.88) contrast(1.22)',
  },
  Red: {
    hex: '#b3121f',
    finish: 'Rosso Corsa Tri-Coat Gloss',
    code: 'RED-05',
    interior: 'Nero Black Leather with Rosso Ferrari Accents',
    accent: 'Yellow Brembo carbon-ceramic calipers',
    filter: 'none',
  },
  Blue: {
    hex: '#14346b',
    finish: 'Blu Tour de France Pearl',
    code: 'BLU-06',
    interior: 'Crema Semi-Aniline Leather with Navy Piping',
    accent: 'Polished chrome and diamond-cut forged alloys',
    filter: 'hue-rotate(195deg) saturate(1.4) brightness(0.95)',
  },
  Green: {
    hex: '#1f4a35',
    finish: 'Verde British Racing Deep Gloss',
    code: 'GRN-07',
    interior: 'Cognac Saddle Leather with Olive Contrast Stitch',
    accent: 'Heritage gold livery decals and bronze wheels',
    filter: 'hue-rotate(90deg) saturate(1.25) brightness(0.95)',
  },
  Yellow: {
    hex: '#e2b81a',
    finish: 'Giallo Tristrato Triple-Layer Metallic',
    code: 'YEL-08',
    interior: 'Nero Alcantara with Giallo Precision Stitching',
    accent: 'High-gloss carbon exterior aerodynamic package',
    filter: 'hue-rotate(50deg) saturate(1.5) brightness(1.1)',
  },
  Orange: {
    hex: '#d9671b',
    finish: 'Arancio Borealis Pearlescent',
    code: 'ORG-09',
    interior: 'Nero Cosmus Alcantara with Arancio Accents',
    accent: 'Gloss black roof and forged sports wheels',
    filter: 'hue-rotate(30deg) saturate(1.45) brightness(1.05)',
  },
  Bronze: {
    hex: '#8a6a3b',
    finish: 'Bronzo Zante Satin Metallic',
    code: 'BRZ-10',
    interior: 'Espresso Full-Grain Leather with Gold Inlays',
    accent: 'Champagne gold accents and dark satin trim',
    filter: 'sepia(0.55) hue-rotate(345deg) saturate(1.3) brightness(0.95)',
  },
  Navy: {
    hex: '#0d1b33',
    finish: 'Midnight Blue Bespoke Metallic',
    code: 'NVY-11',
    interior: 'Arctic White Leather with Navy Seat Piping',
    accent: 'Starlight headliner and chrome window surround',
    filter: 'hue-rotate(205deg) saturate(1.3) brightness(0.75)',
  },
}

export const colorList = (...names) =>
  names.map((n) => {
    const meta = COLOR_META[n] || {}
    return {
      name: n,
      hex: meta.hex || COLORS[n] || '#111114',
      finish: meta.finish || `${n} Gloss`,
      code: meta.code || 'OEM-00',
      interior: meta.interior || 'Bespoke Handcrafted Leather',
      accent: meta.accent || 'Factory High-Gloss Package',
      filter: meta.filter || 'none',
    }
  })

const FEATURES = {
  Supercar: ['Carbon-ceramic brakes', 'Active aerodynamics', 'Launch control', 'Lightweight carbon monocoque', 'Track telemetry suite', 'Sport bucket seats'],
  Sports: ['Adaptive sport suspension', 'Performance exhaust system', 'Launch control', 'Track-tuned chassis', 'Premium sound system', 'Sport seats with heating'],
  Luxury: ['Handcrafted leather interior', 'Air suspension', 'Massage seats', 'Starlight headliner', 'Rear-seat entertainment', 'Soft-close doors'],
  SUV: ['Adaptive air suspension', 'Off-road driving modes', 'Panoramic roof', '4-zone climate control', 'Surround-view cameras', 'Premium audio system'],
  Electric: ['Over-the-air updates', 'Fast DC charging', 'Autonomous driving assist', 'Regenerative braking', 'Glass roof', 'Heat pump climate system'],
  Classic: ['Matching-numbers engine', 'Documented provenance', 'Period-correct interior', 'Restored by specialists', 'Collector-grade condition', 'Original tool kit'],
}

const make = (c) => ({
  features: FEATURES[c.category],
  rating: c.rating ?? 4.8,
  ...c,
  images: [c.img, ...(c.gal || [])].map((n) => img(n, 1800, 88)),
  thumb: img(c.img, 1200, 85),
})

export const CARS = [
  make({
    id: 'lamborghini-revuelto', name: 'Revuelto', brand: 'Lamborghini', category: 'Supercar', year: 2024, price: 608000, fuel: 'Hybrid',
    power: 1001, torque: 535, zeroTo60: 2.5, topSpeed: 217, engine: '6.5L V12 Plug-in Hybrid', transmission: '8-speed Dual Clutch', drivetrain: 'AWD', seats: 2,
    img: '/images/brands/lamborghini.jpg', gal: [], colors: colorList('Yellow', 'Black', 'Orange', 'Green'), badge: 'New', featured: true,
    description: 'The first V12 plug-in hybrid HPEV from Sant’Agata. Over 1,000 horsepower, three electric motors and a monocoque that redefines what a supercar can be.',
  }),
  make({
    id: 'ferrari-296-gtb', name: '296 GTB', brand: 'Ferrari', category: 'Supercar', year: 2024, price: 322000, fuel: 'Hybrid',
    power: 819, torque: 546, zeroTo60: 2.9, topSpeed: 205, engine: '3.0L V6 Plug-in Hybrid', transmission: '8-speed Dual Clutch', drivetrain: 'RWD', seats: 2,
    img: '/images/brands/ferrari.jpg', gal: [],
    colors: [
      { name: 'Red', hex: '#b3121f', finish: 'Rosso Corsa Tri-Coat Gloss', code: 'FER-01', interior: 'Nero Black Leather with Rosso Stitching', accent: 'Yellow Brembo Calipers', image: '/images/cars/ferrari-296-gtb/red.jpg' },
      { name: 'Black', hex: '#111114', finish: 'Nero Daytona Metallic', code: 'FER-02', interior: 'Cuoio Tan Full-Grain Nappa Leather', accent: 'Gloss Carbon Splitters', image: '/images/cars/ferrari-296-gtb/black.jpg' },
      { name: 'Silver', hex: '#b5b8bd', finish: 'Argento Nürburgring Metallic', code: 'FER-03', interior: 'Grigio Carbon Alcantara & Brushed Metal', accent: 'Titanium Exhaust Pipes', image: '/images/cars/ferrari-296-gtb/silver.jpg' },
      { name: 'Blue', hex: '#14346b', finish: 'Blu Tour de France Pearl', code: 'FER-04', interior: 'Crema Semi-Aniline Leather with Navy Piping', accent: 'Bespoke Racing Livery', image: '/images/cars/ferrari-296-gtb/blue.jpg' },
    ],
    badge: 'Hybrid', featured: true,
    description: 'A new era of Ferrari fun-to-drive: a turbocharged V6 paired with an electric motor delivering instant response and a thrilling 819 hp.',
  }),
  make({
    id: 'mclaren-750s', name: '750S', brand: 'McLaren', category: 'Supercar', year: 2024, price: 324000, fuel: 'Petrol',
    power: 740, torque: 590, zeroTo60: 2.7, topSpeed: 206, engine: '4.0L Twin-Turbo V8', transmission: '7-speed Dual Clutch', drivetrain: 'RWD', seats: 2,
    img: '/images/brands/mclaren.jpg', gal: [], colors: colorList('Orange', 'Grey', 'Black', 'Blue'), featured: true,
    description: 'Lighter, faster and sharper than ever. The 750S brings race-bred dynamics and a hypercar-grade carbon tub to the road.',
  }),
  make({
    id: 'porsche-911-gt3-rs', name: '911 GT3 RS', brand: 'Porsche', category: 'Sports', year: 2024, price: 241000, fuel: 'Petrol',
    power: 518, torque: 342, zeroTo60: 3.0, topSpeed: 184, engine: '4.0L Naturally Aspirated Flat-6', transmission: '7-speed PDK', drivetrain: 'RWD', seats: 2,
    img: '/images/brands/porsche.jpg', gal: [], colors: colorList('White', 'Green', 'Yellow', 'Silver'), badge: 'Track Spec', featured: true,
    description: 'Motorsport technology for the road. A 9,000 rpm flat-six, active aerodynamics and a DRS-style rear wing deliver otherworldly downforce.',
  }),
  make({
    id: 'corvette-z06', name: 'Corvette Z06', brand: 'Chevrolet', category: 'Sports', year: 2024, price: 112000, fuel: 'Petrol',
    power: 670, torque: 460, zeroTo60: 2.6, topSpeed: 195, engine: '5.5L Flat-Plane V8', transmission: '8-speed Dual Clutch', drivetrain: 'RWD', seats: 2,
    img: '/images/brands/chevrolet.jpg', gal: [], colors: colorList('Red', 'Yellow', 'Black', 'Blue'), badge: 'Value Icon',
    description: 'America’s mid-engine marvel. The highest-revving production V8 ever built turns every straight into an event.',
  }),
  make({
    id: 'aston-martin-vantage', name: 'Vantage', brand: 'Aston Martin', category: 'Sports', year: 2024, price: 191000, fuel: 'Petrol',
    power: 656, torque: 590, zeroTo60: 3.4, topSpeed: 202, engine: '4.0L Twin-Turbo V8', transmission: '8-speed Automatic', drivetrain: 'RWD', seats: 2,
    img: '/images/brands/aston_martin.jpg', gal: [], colors: colorList('Green', 'Silver', 'Black', 'Navy'), badge: 'New',
    description: 'A sports car with a ferocious appetite. Bolder styling, bespoke AMG-sourced power and chassis dynamics that reward every apex.',
  }),
  make({
    id: 'mercedes-amg-gt-63', name: 'AMG GT 63', brand: 'Mercedes-AMG', category: 'Sports', year: 2024, price: 192000, fuel: 'Petrol',
    power: 577, torque: 590, zeroTo60: 3.1, topSpeed: 196, engine: '4.0L Twin-Turbo V8', transmission: '9-speed MCT', drivetrain: 'AWD', seats: 4,
    img: '/images/brands/mercedes_amg.jpg', gal: [], colors: colorList('Grey', 'Black', 'Silver', 'Red'), featured: true,
    description: 'Handcrafted in Affalterbach. A grand tourer with hand-built V8 power, four seats and the grip of all-wheel drive.',
  }),
  make({
    id: 'rolls-royce-ghost', name: 'Ghost', brand: 'Rolls-Royce', category: 'Luxury', year: 2024, price: 355000, fuel: 'Petrol',
    power: 563, torque: 627, zeroTo60: 4.6, topSpeed: 155, engine: '6.75L Twin-Turbo V12', transmission: '8-speed Automatic', drivetrain: 'AWD', seats: 5,
    img: '/images/brands/rolls_royce.jpg', gal: [], colors: colorList('Black', 'White', 'Navy', 'Silver'), featured: true,
    description: 'Post-opulent perfection. A silent V12, a floating ride and a cabin crafted by hand — the Ghost is serenity on four wheels.',
  }),
  make({
    id: 'bentley-continental-gt', name: 'Continental GT Speed', brand: 'Bentley', category: 'Luxury', year: 2024, price: 274000, fuel: 'Petrol',
    power: 650, torque: 590, zeroTo60: 3.5, topSpeed: 208, engine: '6.0L Twin-Turbo W12', transmission: '8-speed Dual Clutch', drivetrain: 'AWD', seats: 4,
    img: '/images/brands/bentley.jpg', gal: [], colors: colorList('Blue', 'Black', 'Silver', 'Green'),
    description: 'The ultimate grand tourer. Effortless W12 performance wrapped in hand-stitched leather and polished wood veneers.',
  }),
  make({
    id: 'maybach-s680', name: 'S 680', brand: 'Mercedes-Maybach', category: 'Luxury', year: 2024, price: 229000, fuel: 'Petrol',
    power: 621, torque: 738, zeroTo60: 4.4, topSpeed: 155, engine: '6.0L Twin-Turbo V12', transmission: '9-speed Automatic', drivetrain: 'AWD', seats: 4,
    img: '/images/brands/mercedes_maybach.jpg', gal: [], colors: colorList('Black', 'Silver', 'Navy', 'White'), badge: 'Chauffeur',
    description: 'The pinnacle of the S-Class. Executive rear seats, a champagne cooler and a refined V12 for those who arrive in style.',
  }),
  make({
    id: 'range-rover-sv', name: 'Range Rover SV', brand: 'Land Rover', category: 'SUV', year: 2024, price: 215000, fuel: 'Petrol',
    power: 606, torque: 553, zeroTo60: 4.4, topSpeed: 155, engine: '4.4L Twin-Turbo V8', transmission: '8-speed Automatic', drivetrain: 'AWD', seats: 5,
    img: '/images/brands/land_rover.jpg', gal: [], colors: colorList('Black', 'Green', 'White', 'Bronze'), featured: true,
    description: 'The world’s most capable luxury SUV, elevated by SV Bespoke. Serene on the boulevard and unstoppable beyond it.',
  }),
  make({
    id: 'lamborghini-urus-se', name: 'Urus SE', brand: 'Lamborghini', category: 'SUV', year: 2024, price: 258000, fuel: 'Hybrid',
    power: 789, torque: 701, zeroTo60: 3.3, topSpeed: 193, engine: '4.0L V8 Plug-in Hybrid', transmission: '8-speed Automatic', drivetrain: 'AWD', seats: 5,
    img: '/images/brands/lamborghini.jpg', gal: [], colors: colorList('Yellow', 'Black', 'Orange', 'Grey'), badge: 'Hybrid',
    description: 'The Super SUV evolves. A plug-in hybrid powertrain brings 789 hp and electric-only range without losing the Lamborghini drama.',
  }),
  make({
    id: 'porsche-cayenne-turbo-gt', name: 'Cayenne Turbo GT', brand: 'Porsche', category: 'SUV', year: 2024, price: 195000, fuel: 'Petrol',
    power: 631, torque: 626, zeroTo60: 3.1, topSpeed: 186, engine: '4.0L Twin-Turbo V8', transmission: '8-speed Tiptronic S', drivetrain: 'AWD', seats: 4,
    img: '/images/brands/porsche.jpg', gal: [], colors: colorList('Grey', 'Black', 'White', 'Red'),
    description: 'A Nürburgring record-holding SUV. Carbon aero, rear-axle steering and a track-ready attitude in a five-door body.',
  }),
  make({
    id: 'mercedes-g63', name: 'G 63 AMG', brand: 'Mercedes-AMG', category: 'SUV', year: 2024, price: 179000, fuel: 'Petrol',
    power: 577, torque: 627, zeroTo60: 4.4, topSpeed: 137, engine: '4.0L Twin-Turbo V8', transmission: '9-speed MCT', drivetrain: 'AWD', seats: 5,
    img: '/images/brands/mercedes_amg.jpg', gal: [], colors: colorList('Black', 'Green', 'White', 'Grey'), badge: 'Iconic',
    description: 'A genuine icon. Three locking differentials, a thunderous side-exit exhaust and an unmistakable silhouette.',
  }),
  make({
    id: 'tesla-model-s-plaid', name: 'Model S Plaid', brand: 'Tesla', category: 'Electric', year: 2024, price: 89990, fuel: 'Electric',
    power: 1020, torque: 1050, zeroTo60: 1.99, topSpeed: 200, engine: 'Tri-Motor Electric', transmission: 'Single-speed', drivetrain: 'AWD', seats: 5,
    img: '/images/brands/tesla.jpg', gal: [], colors: colorList('White', 'Black', 'Red', 'Blue'), badge: 'Electric',
    description: 'Beyond ludicrous. Sub-two-second 0–60 acceleration, 390+ miles of range and a minimalist cabin built around a single big screen.',
  }),
  make({
    id: 'porsche-taycan-turbo-s', name: 'Taycan Turbo S', brand: 'Porsche', category: 'Electric', year: 2024, price: 207000, fuel: 'Electric',
    power: 938, torque: 818, zeroTo60: 2.4, topSpeed: 161, engine: 'Dual-Motor Electric', transmission: '2-speed', drivetrain: 'AWD', seats: 4,
    img: '/images/brands/porsche.jpg', gal: [], colors: colorList('Blue', 'Grey', 'White', 'Black'), badge: 'Electric',
    description: 'The soul of a sports car, electrified. An 800-volt architecture delivers repeatable launches and ultra-fast charging.',
  }),
  make({
    id: 'lucid-air-sapphire', name: 'Air Sapphire', brand: 'Lucid', category: 'Electric', year: 2024, price: 249000, fuel: 'Electric',
    power: 1234, torque: 1430, zeroTo60: 1.89, topSpeed: 205, engine: 'Tri-Motor Electric', transmission: 'Single-speed', drivetrain: 'AWD', seats: 5,
    img: '/images/brands/lucid.jpg', gal: [], colors: colorList('Black', 'White', 'Grey', 'Blue'), badge: 'Electric',
    description: 'The most powerful sedan ever built. Over 1,200 hp of silent thrust and cabin space that rivals limousines.',
  }),
  make({
    id: 'porsche-911-carrera-rs-27', name: '911 Carrera RS 2.7', brand: 'Porsche', category: 'Classic', year: 1973, price: 780000, fuel: 'Petrol',
    power: 210, torque: 188, zeroTo60: 5.8, topSpeed: 149, engine: '2.7L Naturally Aspirated Flat-6', transmission: '5-speed Manual', drivetrain: 'RWD', seats: 4,
    img: '/images/brands/porsche.jpg', gal: [], colors: colorList('White', 'Yellow', 'Red'), badge: 'Collector', rating: 5,
    description: 'The original ducktail. One of the most coveted Porsches ever made, restored to concours standard with full documentation.',
  }),
  make({
    id: 'shelby-gt500-1967', name: 'Shelby GT500', brand: 'Ford', category: 'Classic', year: 1967, price: 185000, fuel: 'Petrol',
    power: 355, torque: 420, zeroTo60: 6.5, topSpeed: 132, engine: '7.0L V8 428 Police Interceptor', transmission: '4-speed Manual', drivetrain: 'RWD', seats: 4,
    img: '/images/brands/ford.jpg', gal: [], colors: colorList('Blue', 'Red', 'Black'), badge: 'Collector', rating: 4.9,
    description: 'American muscle royalty. A numbers-matching GT500 with its original 428 V8 and Shelby American build plate.',
  }),
  make({
    id: 'tata-harrier-dark', name: 'Harrier Dark Edition', brand: 'Tata', category: 'SUV', year: 2024, price: 32000, fuel: 'Diesel',
    power: 170, torque: 258, zeroTo60: 9.8, topSpeed: 120, engine: '2.0L Kryotec Turbocharged', transmission: '6-speed Automatic', drivetrain: 'FWD', seats: 5,
    img: '/images/brands/tata.jpg', gal: [], colors: colorList('Black', 'Grey', 'White', 'Bronze'), badge: 'Dark Edition', featured: true,
    description: 'Derived from Land Rover’s celebrated D8 architecture. Bold parametric styling, cutting-edge ADAS suite, panoramic sunroof, and commanding luxury road presence.',
  }),
  make({
    id: 'mahindra-thar-4x4', name: 'Thar 4x4 Hardtop', brand: 'Mahindra', category: 'SUV', year: 2024, price: 28000, fuel: 'Petrol',
    power: 150, torque: 236, zeroTo60: 10.2, topSpeed: 105, engine: '2.0L mStallion Turbo', transmission: '6-speed Automatic', drivetrain: 'AWD', seats: 4,
    img: '/images/brands/mahindra.jpg', gal: [],
    colors: [
      { name: 'Black', hex: '#111114', finish: 'Napoli Black Pearl', code: 'MAH-01', interior: 'Sporty All-Black Theme with Silver Inserts', accent: 'Dark Finish 18-inch Deep Dish Alloys', image: '/images/cars/mahindra-thar-4x4/black.jpg' },
      { name: 'Red', hex: '#b3121f', finish: 'Red Rage Gloss', code: 'MAH-02', interior: 'Sport Black Fabric with Red Precision Stitching', accent: 'Contrast Black Wheel Arches & Bumpers', image: '/images/cars/mahindra-thar-4x4/red.jpg' },
      { name: 'Grey', hex: '#5b5f66', finish: 'Galaxy Grey Metallic', code: 'MAH-03', interior: 'Dual-Tone Charcoal Interior with Drain Plugs', accent: 'Matte Grey Skid Plates', filter: 'grayscale(1) brightness(0.85) contrast(1.2)' },
      { name: 'Bronze', hex: '#8a6a3b', finish: 'Mystic Copper Satin', code: 'MAH-04', interior: 'Bespoke Desert Sand & Black Heavy-Duty Trim', accent: 'Gunmetal 4x4 Trail-Rated Badging', filter: 'sepia(0.55) hue-rotate(345deg) saturate(1.3) brightness(0.95)' },
    ],
    badge: '4x4 Off-Road', featured: true,
    description: 'An unstoppable icon of all-terrain adventure. Mechanical locking differentials, shift-on-the-fly 4WD, and rugged go-anywhere capability engineered for extreme exploration.',
  }),
]

export const CATEGORIES = [
  { name: 'Supercar', blurb: 'Mid-engine masterpieces built to dominate.', image: '/images/brands/lamborghini.jpg' },
  { name: 'Sports', blurb: 'Pure driving engagement, every corner.', image: '/images/brands/porsche.jpg' },
  { name: 'Luxury', blurb: 'Hand-crafted comfort and effortless power.', image: '/images/brands/rolls_royce.jpg' },
  { name: 'SUV', blurb: 'Commanding presence, boundless capability.', image: '/images/brands/land_rover.jpg' },
  { name: 'Electric', blurb: 'Silent, savage, and sustainable.', image: '/images/brands/lucid.jpg' },
  { name: 'Classic', blurb: 'Timeless icons with provenance.', image: '/images/brands/ford.jpg' },
]

export const BRAND_INFO = {
  Lamborghini: {
    country: 'Italy',
    founded: 1963,
    blurb: 'Raging bulls from Sant’Agata Bolognese.',
    image: '/images/brands/lamborghini.jpg',
  },
  Ferrari: {
    country: 'Italy',
    founded: 1939,
    blurb: 'The prancing horse and the pinnacle of racing heritage.',
    image: '/images/brands/ferrari.jpg',
  },
  McLaren: {
    country: 'United Kingdom',
    founded: 1963,
    blurb: 'Formula 1 technology for the road.',
    image: '/images/brands/mclaren.jpg',
  },
  Porsche: {
    country: 'Germany',
    founded: 1931,
    blurb: 'Timeless design and everyday-usable performance.',
    image: '/images/brands/porsche.jpg',
  },
  Chevrolet: {
    country: 'USA',
    founded: 1911,
    blurb: 'American performance made accessible.',
    image: '/images/brands/chevrolet.jpg',
  },
  'Aston Martin': {
    country: 'United Kingdom',
    founded: 1913,
    blurb: 'Beautiful, bespoke British grand tourers.',
    image: '/images/brands/aston_martin.jpg',
  },
  'Mercedes-AMG': {
    country: 'Germany',
    founded: 1967,
    blurb: 'One man, one engine. Handcrafted power.',
    image: '/images/brands/mercedes_amg.jpg',
  },
  'Rolls-Royce': {
    country: 'United Kingdom',
    founded: 1904,
    blurb: 'The pursuit of perfection in motion.',
    image: '/images/brands/rolls_royce.jpg',
  },
  Bentley: {
    country: 'United Kingdom',
    founded: 1919,
    blurb: 'Handcrafted in Crewe for 100+ years.',
    image: '/images/brands/bentley.jpg',
  },
  'Mercedes-Maybach': {
    country: 'Germany',
    founded: 1909,
    blurb: 'The pinnacle of automotive luxury.',
    image: '/images/brands/mercedes_maybach.jpg',
  },
  'Land Rover': {
    country: 'United Kingdom',
    founded: 1948,
    blurb: 'Above and beyond, in refined fashion.',
    image: '/images/brands/land_rover.jpg',
  },
  Tesla: {
    country: 'USA',
    founded: 2003,
    blurb: 'Accelerating the world’s transition to electric.',
    image: '/images/brands/tesla.jpg',
  },
  Lucid: {
    country: 'USA',
    founded: 2007,
    blurb: 'Luxury electric, engineered to the extreme.',
    image: '/images/brands/lucid.jpg',
  },
  Ford: {
    country: 'USA',
    founded: 1903,
    blurb: 'Muscle car legends and motorsport glory.',
    image: '/images/brands/ford.jpg',
  },
  Tata: {
    country: 'India',
    founded: 1945,
    blurb: 'Pioneering automotive design, engineering excellence and sustainable mobility.',
    image: '/images/brands/tata.jpg',
  },
  Mahindra: {
    country: 'India',
    founded: 1945,
    blurb: 'Legendary all-terrain capability, rugged spirit and modern luxury.',
    image: '/images/brands/mahindra.jpg',
  },
}

export const BRANDS = Object.keys(BRAND_INFO).map((name) => ({
  name,
  ...BRAND_INFO[name],
  count: CARS.filter((c) => c.brand === name).length,
}))

export const formatPrice = (n) => '$' + n.toLocaleString('en-US')
export const getCar = (id) => CARS.find((c) => c.id === id)
export const monthly = (price, down = 0.2, months = 60, apr = 5.9) => {
  const p = price * (1 - down)
  const r = apr / 100 / 12
  return Math.round((p * r) / (1 - Math.pow(1 + r, -months)))
}
