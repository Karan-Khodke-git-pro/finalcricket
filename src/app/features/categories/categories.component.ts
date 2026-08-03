import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { CATEGORIES } from '../../data/categories.data';
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
  private route = inject(ActivatedRoute);

  categories = CATEGORIES;
  selectedCategory: any = null;
  products: Product[] = [];
  showAll = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.selectedCategory = this.categories.find(c => c.slug === slug) || null;
        this.products = this.productSvc.getByCategory(slug).slice(0, 8);
      } else {
        this.selectedCategory = null;
      }
    });
  }
}
