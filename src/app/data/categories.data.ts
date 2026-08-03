import { Category } from '../core/models/product.model';
import { BAT_IMAGES } from './images.data';

const ci = (n: number) => BAT_IMAGES[n % BAT_IMAGES.length];

/**
 * Full category tree (unlimited nesting via parentId).
 * level 0 = main category, level 1 = sub category, level 2 = child category, ...
 */
export const ALL_CATEGORIES: Category[] = [
  /* ── 1. Kashmir Willow Bat ─────────────────────────────── */
  {
    id: 'cat-kw',
    name: 'Kashmir Willow Bat',
    slug: 'kashmir-willow',
    description: 'High-quality Kashmir Willow bats available in single and double blade, with full cane and half cane handle options.',
    image: ci(1), banner: ci(1),
    productCount: 0, icon: 'fa-leaf', color: '#27AE60',
    featured: true, parentId: null, level: 0, hasChildren: true,
  },
  {
    id: 'cat-kw-sb', name: 'Single Blade', slug: 'single-blade',
    description: 'Classic single blade Kashmir Willow construction — balanced pickup and reliable performance.',
    image: ci(2), banner: ci(2), productCount: 0, icon: 'fa-layer-group', color: '#27AE60',
    featured: false, parentId: 'cat-kw', level: 1, hasChildren: true,
  },
  {
    id: 'cat-kw-sb-fc', name: 'Full Cane', slug: 'full-cane',
    description: 'Single blade bats with full cane handle for maximum shock absorption.',
    image: ci(3), banner: ci(3), productCount: 0, icon: 'fa-grip-lines', color: '#27AE60',
    featured: false, parentId: 'cat-kw-sb', level: 2, hasChildren: false,
  },
  {
    id: 'cat-kw-sb-hc', name: 'Half Cane', slug: 'half-cane',
    description: 'Single blade bats with half cane handle — lighter pickup, great control.',
    image: ci(4), banner: ci(4), productCount: 0, icon: 'fa-grip-lines', color: '#27AE60',
    featured: false, parentId: 'cat-kw-sb', level: 2, hasChildren: false,
  },
  {
    id: 'cat-kw-db', name: 'Double Blade', slug: 'double-blade',
    description: 'Double blade Kashmir Willow bats built for extra power and durability.',
    image: ci(5), banner: ci(5), productCount: 0, icon: 'fa-layer-group', color: '#27AE60',
    featured: false, parentId: 'cat-kw', level: 1, hasChildren: true,
  },
  {
    id: 'cat-kw-db-fc', name: 'Full Cane', slug: 'full-cane',
    description: 'Double blade bats with full cane handle for powerful stroke play.',
    image: ci(6), banner: ci(6), productCount: 0, icon: 'fa-grip-lines', color: '#27AE60',
    featured: false, parentId: 'cat-kw-db', level: 2, hasChildren: false,
  },
  {
    id: 'cat-kw-db-hc', name: 'Half Cane', slug: 'half-cane',
    description: 'Double blade bats with half cane handle — power with easier pickup.',
    image: ci(7), banner: ci(7), productCount: 0, icon: 'fa-grip-lines', color: '#27AE60',
    featured: false, parentId: 'cat-kw-db', level: 2, hasChildren: false,
  },

  /* ── 2. Popular Willow Bat ─────────────────────────────── */
  {
    id: 'cat-pw', name: 'Popular Willow Bat', slug: 'popular-willow',
    description: 'Popular willow bats offering great performance at an accessible price for everyday cricket.',
    image: ci(0), banner: ci(0), productCount: 0, icon: 'fa-star', color: '#C9A84C',
    featured: true, parentId: null, level: 0, hasChildren: false,
  },

  /* ── 3. Rainy Season Bat ───────────────────────────────── */
  {
    id: 'cat-rs', name: 'Rainy Season Bat', slug: 'rainy-season',
    description: 'Moisture-resistant bats built to handle damp conditions and wet-weather cricket.',
    image: ci(8), banner: ci(8), productCount: 0, icon: 'fa-cloud-rain', color: '#2980B9',
    featured: true, parentId: null, level: 0, hasChildren: false,
  },

  /* ── 4. Bat Covers ─────────────────────────────────────── */
  {
    id: 'cat-bc', name: 'Bat Covers', slug: 'bat-covers',
    description: 'Protective bat covers and sleeves to keep your bat safe during travel and storage.',
    image: ci(9), banner: ci(9), productCount: 0, icon: 'fa-shield-halved', color: '#7F8C8D',
    featured: true, parentId: null, level: 0, hasChildren: false,
  },

  /* ── 5. Accessories ───────────────────────────────────── */
  {
    id: 'cat-acc', name: 'Accessories', slug: 'accessories',
    description: 'Complete your cricket kit — gloves, uniforms, grips and threads.',
    image: ci(7), banner: ci(7), productCount: 0, icon: 'fa-toolbox', color: '#7F8C8D',
    featured: true, parentId: null, level: 0, hasChildren: true,
  },
  {
    id: 'cat-acc-gl', name: 'Batting Gloves', slug: 'batting-gloves',
    description: 'Batting gloves with premium padding and breathable comfort.',
    image: ci(2), banner: ci(2), productCount: 0, icon: 'fa-mitten', color: '#7F8C8D',
    featured: false, parentId: 'cat-acc', level: 1, hasChildren: false,
  },
  {
    id: 'cat-acc-un', name: 'Uniform', slug: 'uniform',
    description: 'Match and practice cricket uniforms in durable, quick-dry fabric.',
    image: ci(3), banner: ci(3), productCount: 0, icon: 'fa-shirt', color: '#7F8C8D',
    featured: false, parentId: 'cat-acc', level: 1, hasChildren: false,
  },
  {
    id: 'cat-acc-gr', name: 'Bat Grips', slug: 'bat-grips',
    description: 'Replacement bat grips in a range of textures and colours.',
    image: ci(4), banner: ci(4), productCount: 0, icon: 'fa-grip', color: '#7F8C8D',
    featured: false, parentId: 'cat-acc', level: 1, hasChildren: false,
  },
  {
    id: 'cat-acc-th', name: 'Threads', slug: 'threads',
    description: 'Binding threads and repair twine for bat maintenance.',
    image: ci(5), banner: ci(5), productCount: 0, icon: 'fa-scissors', color: '#7F8C8D',
    featured: false, parentId: 'cat-acc', level: 1, hasChildren: false,
  },

  /* ── 6. Tennis Balls ──────────────────────────────────── */
  {
    id: 'cat-tb', name: 'Tennis Balls', slug: 'tennis-balls',
    description: 'Cricket tennis balls and tape balls for street, gully and club cricket.',
    image: ci(3), banner: ci(3), productCount: 0, icon: 'fa-baseball', color: '#27AE60',
    featured: true, parentId: null, level: 0, hasChildren: false,
  },

  /* ── 7. Junior Bats ───────────────────────────────────── */
  {
    id: 'cat-jr', name: 'Junior Bats', slug: 'junior-bats',
    description: 'Age-appropriate bats for young cricketers, from Size 1 up to Harrow.',
    image: ci(5), banner: ci(5), productCount: 0, icon: 'fa-child', color: '#2980B9',
    featured: true, parentId: null, level: 0, hasChildren: false,
  },
];

/** Main (top level) categories — used by header, home and category listing. */
export const CATEGORIES: Category[] = ALL_CATEGORIES.filter(c => c.level === 0);

/** Legacy slugs kept working so old links / bookmarks don't break. */
export const CATEGORY_ALIASES: Record<string, string> = {
  'english-willow': 'popular-willow',
  'kashmir-willow-bat': 'kashmir-willow',
  'popular-willow-bat': 'popular-willow',
  'rainy-season-bat': 'rainy-season',
  'tennis-ball': 'tennis-balls',
  'junior': 'junior-bats',
  'limited-edition': 'popular-willow',
  'professional': 'popular-willow',
  'leather-ball': 'popular-willow',
  'grips': 'bat-grips',
  'maintenance': 'threads',
};
