import { Category } from '../core/models/product.model';
import { BAT_IMAGES } from './images.data';

const ci = (n: number) => BAT_IMAGES[n % BAT_IMAGES.length];

// Real FFL product photography, used wherever a category matches our actual catalogue.
const kwSingle = (n: string) => `assets/images/kw-single-fc/${n}.jpeg`;
const kwDouble = (n: string) => `assets/images/kw-double-fc/${n}.jpeg`;
const batCover = (n: string) => `assets/images/bat-covers/${n}.jpeg`;

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
    image: kwDouble('kw-db-fc-royal-orchid'), banner: kwDouble('kw-db-fc-royal-orchid'),
    productCount: 0, icon: 'leaf', color: '#27AE60',
    featured: true, parentId: null, level: 0, hasChildren: true,
  },
  {
    id: 'cat-kw-sb', name: 'Single Blade', slug: 'single-blade',
    description: 'Classic single blade Kashmir Willow construction — balanced pickup and reliable performance.',
    image: kwSingle('kw-sb-fc-vk-rainbow'), banner: kwSingle('kw-sb-fc-vk-rainbow'), productCount: 0, icon: 'layer-group', color: '#27AE60',
    featured: false, parentId: 'cat-kw', level: 1, hasChildren: true,
  },
  {
    id: 'cat-kw-sb-fc', name: 'Full Cane', slug: 'full-cane',
    description: 'Single blade bats with full cane handle for maximum shock absorption.',
    image: kwSingle('kw-sb-fc-premium-camo'), banner: kwSingle('kw-sb-fc-premium-camo'), productCount: 0, icon: 'grip-lines', color: '#27AE60',
    featured: false, parentId: 'cat-kw-sb', level: 2, hasChildren: false,
  },
  {
    id: 'cat-kw-sb-hc', name: 'Half Cane', slug: 'half-cane',
    description: 'Single blade bats with half cane handle — lighter pickup, great control.',
    image: kwSingle('kw-sb-fc-blackout-verde'), banner: kwSingle('kw-sb-fc-blackout-verde'), productCount: 0, icon: 'grip-lines', color: '#27AE60',
    featured: false, parentId: 'cat-kw-sb', level: 2, hasChildren: false,
  },
  {
    id: 'cat-kw-db', name: 'Double Blade', slug: 'double-blade',
    description: 'Double blade Kashmir Willow bats built for extra power and durability.',
    image: kwDouble('kw-db-fc-emerald-fade'), banner: kwDouble('kw-db-fc-emerald-fade'), productCount: 0, icon: 'layer-group', color: '#27AE60',
    featured: false, parentId: 'cat-kw', level: 1, hasChildren: true,
  },
  {
    id: 'cat-kw-db-fc', name: 'Full Cane', slug: 'full-cane',
    description: 'Double blade bats with full cane handle for powerful stroke play.',
    image: kwDouble('kw-db-fc-fire-splash'), banner: kwDouble('kw-db-fc-fire-splash'), productCount: 0, icon: 'grip-lines', color: '#27AE60',
    featured: false, parentId: 'cat-kw-db', level: 2, hasChildren: false,
  },
  {
    id: 'cat-kw-db-hc', name: 'Half Cane', slug: 'half-cane',
    description: 'Double blade bats with half cane handle — power with easier pickup.',
    image: kwDouble('kw-db-fc-amber-flute'), banner: kwDouble('kw-db-fc-amber-flute'), productCount: 0, icon: 'grip-lines', color: '#27AE60',
    featured: false, parentId: 'cat-kw-db', level: 2, hasChildren: false,
  },

  /* ── 2. Rainy Season Bat ───────────────────────────────── */
  {
    id: 'cat-rs', name: 'Rainy Season Bat', slug: 'rainy-season',
    description: 'Moisture-resistant bats built to handle damp conditions and wet-weather cricket.',
    image: ci(8), banner: ci(8), productCount: 0, icon: 'cloud-rain', color: '#2980B9',
    featured: true, parentId: null, level: 0, hasChildren: false,
  },

  /* ── 3. Bat Covers ─────────────────────────────────────── */
  {
    id: 'cat-bc',
    name: 'Bat Covers', slug: 'bat-covers',
    description: 'Protective bat covers and sleeves to keep your bat safe during travel and storage.',
    image: batCover('ffl-kit-bag-front'), banner: batCover('ffl-kit-bag-front'), productCount: 0, icon: 'shield-halved', color: '#7F8C8D',
    featured: true, parentId: null, level: 0, hasChildren: true,
  },
  {
    id: 'cat-bc-sc', name: 'Single Bat Cover', slug: 'single-bat-cover',
    description: 'Padded covers built to carry and protect a single cricket bat.',
    image: batCover('ffl-kit-bag-front'), banner: batCover('ffl-kit-bag-front'), productCount: 0, icon: 'shield-halved', color: '#7F8C8D',
    featured: false, parentId: 'cat-bc', level: 1, hasChildren: false,
  },
  {
    id: 'cat-bc-dc', name: 'Double Bat Cover', slug: 'double-bat-cover',
    description: 'Roomy double covers that hold two bats plus small accessories.',
    image: batCover('ffl-kit-bag-back'), banner: batCover('ffl-kit-bag-back'), productCount: 0, icon: 'shield-halved', color: '#7F8C8D',
    featured: false, parentId: 'cat-bc', level: 1, hasChildren: false,
  },


  /* ── 4. Accessories ───────────────────────────────────── */
  {
    id: 'cat-acc', name: 'Accessories', slug: 'accessories',
    description: 'Complete your cricket kit — gloves, uniforms, grips and threads.',
    image: ci(7), banner: ci(7), productCount: 0, icon: 'toolbox', color: '#7F8C8D',
    featured: true, parentId: null, level: 0, hasChildren: true,
  },
  {
    id: 'cat-acc-gl', name: 'Batting Gloves', slug: 'batting-gloves',
    description: 'Batting gloves with premium padding and breathable comfort.',
    image: 'assets/images/batting-gloves/batting-gloves.jpg',
    banner: 'assets/images/batting-gloves/batting-gloves.jpg',
    productCount: 0, icon: 'mitten', color: '#7F8C8D',
    featured: false, parentId: 'cat-acc', level: 1, hasChildren: false,
  },
  {
    id: 'cat-acc-un', name: 'Uniform', slug: 'uniform',
    description: 'Browse 279 cricket shirt designs. Every design is available for ₹599.',
    image: ci(3), banner: ci(3), productCount: 0, icon: 'shirt', color: '#7F8C8D',
    featured: true, parentId: null, level: 0, hasChildren: false,
  },
  {
    id: 'cat-acc-gr', name: 'Bat Grips', slug: 'bat-grips',
    description: 'Colorful ribbed cricket bat grip sleeves. Each grip is ₹160.',
    image: 'assets/images/bat-grips/colorful-ribbed-grip-sleeves.png',
    banner: 'assets/images/bat-grips/colorful-ribbed-grip-sleeves.png',
    productCount: 0, icon: 'grip', color: '#7F8C8D',
    featured: false, parentId: 'cat-acc', level: 1, hasChildren: false,
  },
  {
    id: 'cat-acc-th', name: 'Threads', slug: 'threads',
    description: 'Cricket bat binding threads in four colors. Each spool is ₹250.',
    image: 'assets/images/threads/five-cricket-bats-green-turf.png',
    banner: 'assets/images/threads/five-cricket-bats-green-turf.png',
    productCount: 0, icon: 'scissors', color: '#7F8C8D',
    featured: false, parentId: 'cat-acc', level: 1, hasChildren: false,
  },

];

/** Main (top level) categories — used by header, home and category listing. */
export const CATEGORIES: Category[] = ALL_CATEGORIES.filter(c => c.level === 0);

/** Legacy slugs kept working so old links / bookmarks don't break. */
export const CATEGORY_ALIASES: Record<string, string> = {
  'kashmir-willow-bat': 'kashmir-willow',
  'rainy-season-bat': 'rainy-season',
  'grips': 'bat-grips',
  'maintenance': 'threads',
};
