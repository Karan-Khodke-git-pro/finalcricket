import { Product } from '../core/models/product.model';

const uniformSpecifications = {
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
  playStyle: 'Teamwear',
  surface: 'All',
  origin: 'India',
  warranty: 'N/A',
  grainCount: 'N/A',
} as const;

export const UNIFORM_DESIGN_COUNT = 279;

export const UNIFORM_PRODUCTS: Product[] = Array.from(
  { length: UNIFORM_DESIGN_COUNT },
  (_, index) => {
    const designNumber = index + 1;
    const design = String(designNumber).padStart(3, '0');
    const image = `assets/images/uniforms/design-${design}.webp`;

    return {
      id: `uniform-${design}`,
      name: `Cricket Uniform Design ${design}`,
      slug: `cricket-uniform-design-${design}`,
      brand: 'Cricket Connect',
      category: 'uniform',
      sku: `UNIFORM-${design}`,
      price: 599,
      originalPrice: 599,
      discount: 0,
      currency: 'INR',
      inStock: true,
      stockCount: 100,
      images: [image],
      thumbnail: image,
      rating: 0,
      reviewCount: 0,
      shortDescription: `Cricket shirt design ${design}, shown with front and back views.`,
      description: `Choose cricket shirt design ${design}. Each design is priced at ₹599.`,
      features: ['Front and back design preview', 'Fixed price: ₹599'],
      specifications: uniformSpecifications,
      details: [
        { label: 'Design', value: design },
        { label: 'Product', value: 'Cricket shirt' },
        { label: 'Price', value: '₹599' },
        { label: 'Views', value: 'Front and back' },
      ],
      chips: ['Cricket Shirt', `Design ${design}`],
      careInstructions: [],
      warranty: '',
      deliveryInfo: 'Delivery options are shown at checkout.',
      tags: ['uniform', 'cricket-shirt', `design-${design}`],
      relatedIds: [],
      isFeatured: false,
      isBestSeller: false,
      isNewArrival: false,
      isTrending: false,
      isLimitedEdition: false,
      createdAt: '2026-10-11',
    };
  },
);
