import { Injectable } from '@angular/core';
import { PRODUCTS } from '../../data/products.data';
import { CATEGORY_ALIASES } from '../../data/categories.data';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  getAll(): Product[] { return PRODUCTS; }

  getFeatured() { return PRODUCTS.filter(p => p.isFeatured).slice(0, 8); }
  getBestSellers() { return PRODUCTS.filter(p => p.isBestSeller).slice(0, 8); }
  getNewArrivals() { return PRODUCTS.filter(p => p.isNewArrival).slice(0, 8); }
  getTrending() { return PRODUCTS.filter(p => p.isTrending).slice(0, 8); }
  getLimitedEdition() { return PRODUCTS.filter(p => p.isLimitedEdition).slice(0, 6); }

  getById(id: string): Product | undefined { return PRODUCTS.find(p => p.id === id); }
  getBySlug(slug: string): Product | undefined { return PRODUCTS.find(p => p.slug === slug); }

  /** Resolves legacy category slugs to their current slug. */
  private resolve(slug: string): string { return CATEGORY_ALIASES[slug] ?? slug; }

  getByCategory(cat: string): Product[] {
    if (cat === 'all') return PRODUCTS;
    const slug = this.resolve(cat);
    return PRODUCTS.filter(p =>
      p.category === slug || p.subCategory === slug || p.childCategory === slug);
  }

  /** Products for a category trail: main → sub → child (any depth omitted = ignored). */
  getByCategoryPath(main: string, sub?: string, child?: string): Product[] {
    return PRODUCTS.filter(p => {
      if (p.category !== this.resolve(main)) return false;
      if (sub && p.subCategory !== this.resolve(sub)) return false;
      if (child && p.childCategory !== this.resolve(child)) return false;
      return true;
    });
  }


  getRelated(product: Product, limit = 4): Product[] {
    return product.relatedIds
      .map(id => this.getById(id))
      .filter((p): p is Product => !!p)
      .slice(0, limit);
  }

  search(query: string): Product[] {
    const q = query.toLowerCase();
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  filter(opts: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    willowType?: string;
    grade?: string;
    playerLevel?: string;
    inStock?: boolean;
    sortBy?: string;
  }): Product[] {
    let products = [...PRODUCTS];

    if (opts.category && opts.category !== 'all') {
      products = products.filter(p => p.category === opts.category);
    }
    if (opts.minPrice !== undefined) {
      products = products.filter(p => p.price >= opts.minPrice!);
    }
    if (opts.maxPrice !== undefined) {
      products = products.filter(p => p.price <= opts.maxPrice!);
    }
    if (opts.willowType) {
      products = products.filter(p => p.specifications.willowType === opts.willowType);
    }
    if (opts.grade) {
      products = products.filter(p => p.specifications.grade.includes(opts.grade!));
    }
    if (opts.playerLevel) {
      products = products.filter(p => p.specifications.playerLevel === opts.playerLevel);
    }
    if (opts.inStock !== undefined) {
      products = products.filter(p => p.inStock === opts.inStock);
    }

    switch (opts.sortBy) {
      case 'price-asc': products.sort((a, b) => a.price - b.price); break;
      case 'price-desc': products.sort((a, b) => b.price - a.price); break;
      case 'rating': products.sort((a, b) => b.rating - a.rating); break;
      case 'newest': products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'popularity': products.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case 'discount': products.sort((a, b) => b.discount - a.discount); break;
    }

    return products;
  }
}
