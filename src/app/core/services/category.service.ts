import { Injectable } from '@angular/core';
import { ALL_CATEGORIES, CATEGORIES, CATEGORY_ALIASES } from '../../data/categories.data';
import { PRODUCTS } from '../../data/products.data';
import { Category, Product } from '../models/product.model';

/** A resolved node in the category path (main → sub → child → ...). */
export interface CategoryPath {
  categories: Category[];      // resolved trail, e.g. [Kashmir Willow, Single Blade, Full Cane]
  current: Category | null;    // last resolved category
  children: Category[];        // next level, empty when it's a leaf
  slugs: string[];             // normalized slugs of the trail
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private all = ALL_CATEGORIES;

  constructor() { this.refreshCounts(); }

  /** All main (level 0) categories. */
  getMainCategories(): Category[] { return CATEGORIES; }

  /** Every category, any level. */
  getAll(): Category[] { return this.all; }

  /** Direct children of a category id (null → main categories). */
  getChildren(parentId: string | null): Category[] {
    return this.all.filter(c => (c.parentId ?? null) === parentId);
  }

  hasChildren(cat: Category): boolean {
    return this.getChildren(cat.id).length > 0;
  }

  normalizeSlug(slug: string): string {
    return CATEGORY_ALIASES[slug] ?? slug;
  }

  /**
   * Resolve an arbitrarily deep slug path, e.g.
   * ['kashmir-willow', 'single-blade', 'full-cane'].
   * Slugs are resolved relative to their parent, so duplicate slugs
   * at different branches (full-cane / half-cane) work correctly.
   */
  resolvePath(rawSlugs: (string | undefined | null)[]): CategoryPath {
    const slugs = rawSlugs.filter((s): s is string => !!s).map(s => this.normalizeSlug(s));
    const trail: Category[] = [];
    let parentId: string | null = null;

    for (const slug of slugs) {
      const match = this.getChildren(parentId).find(c => c.slug === slug);
      if (!match) break;
      trail.push(match);
      parentId = match.id;
    }

    const current = trail.length ? trail[trail.length - 1] : null;
    return {
      categories: trail,
      current,
      children: current ? this.getChildren(current.id) : this.getMainCategories(),
      slugs: trail.map(c => c.slug),
    };
  }

  /** Products belonging to a resolved category trail (matches at the trail's depth). */
  getProducts(trail: Category[]): Product[] {
    if (!trail.length) return [];
    const [main, sub, child] = trail;
    return PRODUCTS.filter(p => {
      if (p.category !== main.slug) return false;
      if (sub && p.subCategory !== sub.slug) return false;
      if (child && p.childCategory !== child.slug) return false;
      return true;
    });
  }

  /** Route segments for a category, walking up to its main parent. */
  getRouterLink(cat: Category): any[] {
    const segments: string[] = [];
    let node: Category | undefined = cat;
    while (node) {
      segments.unshift(node.slug);
      node = node.parentId ? this.all.find(c => c.id === node!.parentId) : undefined;
    }
    return ['/categories', ...segments];
  }

  /** Keeps productCount + hasChildren in sync with the product data. */
  private refreshCounts(): void {
    for (const cat of this.all) {
      const trail: Category[] = [];
      let node: Category | undefined = cat;
      while (node) {
        trail.unshift(node);
        node = node.parentId ? this.all.find(c => c.id === node!.parentId) : undefined;
      }
      cat.productCount = this.getProducts(trail).length;
      cat.hasChildren = this.getChildren(cat.id).length > 0;
    }
  }
}
