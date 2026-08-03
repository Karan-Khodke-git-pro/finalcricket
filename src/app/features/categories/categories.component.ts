import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CategoryService, CategoryPath } from '../../core/services/category.service';
import { Category, Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  private productSvc = inject(ProductService);
  private categorySvc = inject(CategoryService);
  private route = inject(ActivatedRoute);

  /** main categories — used by the all-categories grid and the "other categories" strip */
  categories: Category[] = this.categorySvc.getMainCategories();

  /** resolved trail for the current URL */
  trail: Category[] = [];
  selectedCategory: Category | null = null;
  /** next level of categories, shown when the current category has children */
  childCategories: Category[] = [];
  products: Product[] = [];
  showAll = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const path: CategoryPath = this.categorySvc.resolvePath([
        params['slug'], params['sub'], params['child'],
      ]);

      this.trail = path.categories;
      this.selectedCategory = path.current;
      this.childCategories = path.current ? path.children : [];
      this.products = path.current && !this.childCategories.length
        ? this.categorySvc.getProducts(path.categories)
        : [];
    });
  }

  /** siblings of the current category (for the bottom "browse other" strip) */
  get siblingCategories(): Category[] {
    if (!this.selectedCategory) return this.categories;
    return this.categorySvc.getChildren(this.selectedCategory.parentId ?? null);
  }

  linkFor(cat: Category): any[] { return this.categorySvc.getRouterLink(cat); }

  /** query params that let the products page filter on the same trail */
  get productQueryParams(): Record<string, string> {
    const [main, sub, child] = this.trail;
    const qp: Record<string, string> = {};
    if (main) qp['category'] = main.slug;
    if (sub) qp['subCategory'] = sub.slug;
    if (child) qp['childCategory'] = child.slug;
    return qp;
  }
}
