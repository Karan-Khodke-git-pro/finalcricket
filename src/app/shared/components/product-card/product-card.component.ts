import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryLabelPipe } from '../../pipes/category-label.pipe';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { CompareService } from '../../../core/services/compare.service';
import { NotificationService } from '../../../core/services/notification.service';
import { RecentlyViewedService } from '../../../core/services/recently-viewed.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, CategoryLabelPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() variant: 'default' | 'compact' | 'horizontal' = 'default';
  @Output() quickView = new EventEmitter<Product>();

  private cart = inject(CartService);
  private wishlist = inject(WishlistService);
  private compare = inject(CompareService);
  private notify = inject(NotificationService);
  private recentlyViewed = inject(RecentlyViewedService);

  hovered = false;
  addingToCart = false;

  get isWishlisted() { return this.wishlist.has(this.product.id); }
  get isCompared() { return this.compare.has(this.product.id); }
  get isInCart() { return this.cart.isInCart(this.product.id); }
  get discountAmount() { return this.product.originalPrice - this.product.price; }

  onAddToCart(e: Event): void {
    e.preventDefault(); e.stopPropagation();
    if (!this.product.inStock) return;
    this.addingToCart = true;
    setTimeout(() => { this.addingToCart = false; }, 1000);
    this.cart.addToCart(this.product);
    this.notify.success(`${this.product.name} added to cart!`);
  }

  onToggleWishlist(e: Event): void {
    e.preventDefault(); e.stopPropagation();
    const added = this.wishlist.toggle(this.product);
    this.notify.info(added ? 'Added to wishlist' : 'Removed from wishlist');
  }

  onAddToCompare(e: Event): void {
    e.preventDefault(); e.stopPropagation();
    if (this.isCompared) { this.compare.remove(this.product.id); return; }
    const result = this.compare.add(this.product);
    if (result.success) { this.notify.success(result.message); }
    else { this.notify.warning(result.message); }
  }

  onQuickView(e: Event): void {
    e.preventDefault(); e.stopPropagation();
    this.quickView.emit(this.product);
  }

  trackView(): void {
    this.recentlyViewed.add(this.product);
  }

  formatPrice(p: number): string { return '₹' + p.toLocaleString('en-IN'); }

  get stars(): number[] { return Array.from({ length: 5 }, (_, i) => i); }
  getRating(i: number): string {
    if (this.product.rating >= i + 1) return 'full';
    if (this.product.rating >= i + 0.5) return 'half';
    return 'empty';
  }

  getBadgeClass(badge: string): string {
    const map: Record<string, string> = {
      'New': 'badge-new', 'Best Seller': 'badge-best', 'Hot': 'badge-hot',
      'Sale': 'badge-sale', 'Limited': 'badge-limited', 'Trending': 'badge-trending',
      'Premium': 'badge-premium', 'Championship': 'badge-champ',
    };
    return map[badge] || 'badge-default';
  }
}
