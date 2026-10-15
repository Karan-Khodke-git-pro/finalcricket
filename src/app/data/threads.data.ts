import { Product } from '../core/models/product.model';

const threadColors = [
  { color: 'Black', image: 'black-cricket-bat-binding-thread-spool.png' },
  { color: 'Blue', image: 'blue-cricket-bat-binding-thread-spool.png' },
  { color: 'Grey', image: 'grey-cricket-bat-binding-thread-spool.png' },
  { color: 'White', image: 'white-cricket-bat-binding-thread-spool.png' },
];

export const THREAD_PRODUCTS: Product[] = threadColors.map(({ color, image }) => {
  const slug = `${color.toLowerCase()}-cricket-bat-binding-thread`;
  const imagePath = `assets/images/threads/${image}`;

  return {
    id: `thread-${color.toLowerCase()}`,
    name: `${color} Cricket Bat Binding Thread Spool`,
    slug,
    brand: 'Cricket Connect',
    category: 'accessories',
    subCategory: 'threads',
    sku: `CC-THREAD-${color.toUpperCase()}`,
    price: 250,
    originalPrice: 250,
    discount: 0,
    currency: 'INR',
    inStock: true,
    stockCount: 100,
    images: [imagePath],
    thumbnail: imagePath,
    rating: 4.5,
    reviewCount: 0,
    shortDescription: `${color} cricket bat binding thread, ₹250 per spool.`,
    description: `Cricket bat binding thread spool in ${color.toLowerCase()}. Priced at ₹250 per spool.`,
    features: [`${color} thread`, 'Suitable for cricket bat binding', 'Price: ₹250 per spool'],
    chips: ['Bat Binding Thread', color, '₹250 per spool'],
    specifications: {
      willowType: 'Kashmir Willow',
      grade: 'N/A',
      weight: 'N/A',
      handle: 'N/A',
      handleType: 'N/A',
      spine: 'N/A',
      sweetSpot: 'Low',
      edges: 'N/A',
      balance: 'Light',
      face: 'N/A',
      bow: 'N/A',
      playerLevel: 'Beginner',
      playStyle: 'All',
      surface: 'N/A',
      origin: 'India',
      warranty: 'N/A',
      grainCount: 'N/A',
    },
    careInstructions: [],
    warranty: 'N/A',
    deliveryInfo: 'Free shipping. 3-5 business days.',
    tags: ['accessories', 'threads', 'bat-binding', color.toLowerCase()],
    relatedIds: threadColors
      .filter(thread => thread.color !== color)
      .map(thread => `thread-${thread.color.toLowerCase()}`),
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isTrending: false,
    isLimitedEdition: false,
    createdAt: '2026-10-11',
  };
});
