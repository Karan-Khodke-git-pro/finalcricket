/**
 * All local bat images – served from /assets/images/
 * 11 real product photos cycling across all products, categories, banners, etc.
 */
export const BAT_IMAGES = [
  'assets/images/bat-1.png',
  'assets/images/bat-2.png',
  'assets/images/bat-3.png',
  'assets/images/bat-4.png',
  'assets/images/bat-5.png',
  'assets/images/bat-6.png',
  'assets/images/bat-7.png',
  'assets/images/bat-8.png',
  'assets/images/bat-9.png',
  'assets/images/bat-10.png',
  'assets/images/bat-11.png',
];

/** Return image at index, cycling if out of range */
export function batImg(index: number): string {
  return BAT_IMAGES[index % BAT_IMAGES.length];
}

/** Return [main, alt1, alt2, alt3] images for a product */
export function productImages(seed: number): string[] {
  const len = BAT_IMAGES.length;
  return [
    BAT_IMAGES[seed % len],
    BAT_IMAGES[(seed + 2) % len],
    BAT_IMAGES[(seed + 4) % len],
    BAT_IMAGES[(seed + 6) % len],
  ];
}

/** Hero / banner images – use landscape-looking ones */
export const HERO_IMAGES = [
  'assets/images/bat-8.png',   // 3 bats on field
  'assets/images/bat-9.png',
  'assets/images/bat-11.png',
  'assets/images/bat-1.png',
  'assets/images/bat-5.png',
];

/** Category banner images – one per category slot */
export const CATEGORY_IMAGES = [
  'assets/images/bat-1.png',
  'assets/images/bat-2.png',
  'assets/images/bat-3.png',
  'assets/images/bat-4.png',
  'assets/images/bat-5.png',
  'assets/images/bat-6.png',
  'assets/images/bat-7.png',
  'assets/images/bat-8.png',
];
