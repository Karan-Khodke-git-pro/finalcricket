import { Component, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription, filter } from 'rxjs';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { CompareService } from '../../../core/services/compare.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { CATEGORIES } from '../../../data/categories.data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private cartSvc = inject(CartService);
  private wishlistSvc = inject(WishlistService);
  private compareSvc = inject(CompareService);
  public themeSvc = inject(ThemeService);
  private productSvc = inject(ProductService);
  private router = inject(Router);

  categories = CATEGORIES;
  cartCount = 0;
  wishlistCount = 0;
  compareCount = 0;
  isDark = false;

  isScrolled = false;
  isMobileMenuOpen = false;
  isSearchOpen = false;
  megaMenuOpen: string | null = null;

  searchQuery = '';
  searchResults: Product[] = [];
  showSearchResults = false;

  private subs = new Subscription();

  ngOnInit(): void {
    this.subs.add(this.cartSvc.items$.subscribe(i => this.cartCount = i.reduce((s, x) => s + x.quantity, 0)));
    this.subs.add(this.wishlistSvc.items$.subscribe(i => this.wishlistCount = i.length));
    this.subs.add(this.compareSvc.items$.subscribe(i => this.compareCount = i.length));
    this.subs.add(this.themeSvc.isDark$.subscribe(d => this.isDark = d));
    this.subs.add(this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => { this.isMobileMenuOpen = false; this.isSearchOpen = false; this.megaMenuOpen = null; }));
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }

  @HostListener('window:scroll')
  onScroll(): void { this.isScrolled = window.scrollY > 60; }

  toggleMobileMenu(): void { this.isMobileMenuOpen = !this.isMobileMenuOpen; }
  toggleSearch(): void { this.isSearchOpen = !this.isSearchOpen; if (!this.isSearchOpen) { this.searchQuery = ''; this.searchResults = []; } }
  toggleMegaMenu(menu: string): void { this.megaMenuOpen = this.megaMenuOpen === menu ? null : menu; }
  closeMegaMenu(): void { this.megaMenuOpen = null; }

  onSearch(): void {
    if (this.searchQuery.length < 2) { this.searchResults = []; this.showSearchResults = false; return; }
    this.searchResults = this.productSvc.search(this.searchQuery).slice(0, 6);
    this.showSearchResults = true;
  }

  goToProduct(product: Product): void {
    this.isSearchOpen = false;
    this.searchQuery = '';
    this.showSearchResults = false;
    this.router.navigate(['/products', product.slug]);
  }

  goToSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { q: this.searchQuery } });
      this.isSearchOpen = false;
    }
  }
}
