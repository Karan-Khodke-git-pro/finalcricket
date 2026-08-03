import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { CATEGORIES } from '../../data/categories.data';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  private productSvc = inject(ProductService);
  private route = inject(ActivatedRoute);

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  displayedProducts: Product[] = [];

  // Filters
  searchQuery = '';
  selectedCategory = 'all';
  selectedSubCategory = '';
  selectedChildCategory = '';
  selectedWillow = '';
  selectedLevel = '';
  selectedSort = 'popularity';
  minPrice = 0;
  maxPrice = 50000;
  priceRange = 50000;
  inStockOnly = false;
  showFilters = true;
  viewMode: 'grid' | 'list' = 'grid';
  isLoading = true;

  // Pagination
  pageSize = 12;
  currentPage = 1;
  get totalPages(): number { return Math.ceil(this.filteredProducts.length / this.pageSize); }
  get pageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    return pages;
  }

  categories = [
    { value: 'all', label: 'All Categories' },
    ...CATEGORIES.map(c => ({ value: c.slug, label: c.name })),
  ];

  sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'discount', label: 'Biggest Discount' },
  ];

  levels = ['Beginner', 'Intermediate', 'Advanced', 'Professional', 'Junior'];
  willowTypes = ['English Willow', 'Kashmir Willow'];

  ngOnInit(): void {
    setTimeout(() => { this.isLoading = false; }, 600);
    this.allProducts = this.productSvc.getAll();
    this.route.queryParams.subscribe(params => {
      if (params['q']) this.searchQuery = params['q'];
      if (params['category']) this.selectedCategory = params['category'];
      this.selectedSubCategory = params['subCategory'] || '';
      this.selectedChildCategory = params['childCategory'] || '';
      this.applyFilters();
    });
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredProducts = this.productSvc.filter({
      category: this.selectedCategory,
      subCategory: this.selectedSubCategory || undefined,
      childCategory: this.selectedChildCategory || undefined,
      minPrice: this.minPrice,
      maxPrice: this.priceRange,
      willowType: this.selectedWillow || undefined,
      playerLevel: this.selectedLevel || undefined,
      inStock: this.inStockOnly ? true : undefined,
      sortBy: this.selectedSort,
    });

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      this.filteredProducts = this.filteredProducts.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    this.currentPage = 1;
    this.updateDisplay();
  }

  updateDisplay(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedProducts = this.filteredProducts.slice(start, start + this.pageSize);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updateDisplay();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.selectedSubCategory = '';
    this.selectedChildCategory = '';
    this.selectedWillow = '';
    this.selectedLevel = '';
    this.selectedSort = 'popularity';
    this.minPrice = 0;
    this.priceRange = 50000;
    this.inStockOnly = false;
    this.applyFilters();
  }

  get skeletonArray(): number[] { return Array(12).fill(0); }
}
