import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { CompareService } from '../../core/services/compare.service';
import { RecentlyViewedService } from '../../core/services/recently-viewed.service';
import { NotificationService } from '../../core/services/notification.service';
import { Product, ProductReview } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  private productSvc = inject(ProductService);
  private cartSvc = inject(CartService);
  private wishlistSvc = inject(WishlistService);
  private compareSvc = inject(CompareService);
  private recentlySvc = inject(RecentlyViewedService);
  private notifySvc = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  product: Product | null = null;
  relatedProducts: Product[] = [];
  recentlyViewed: Product[] = [];
  selectedImage = 0;
  quantity = 1;
  activeTab = 'description';
  isLoading = true;

  get isWishlisted() { return this.product ? this.wishlistSvc.has(this.product.id) : false; }
  get isInCart() { return this.product ? this.cartSvc.isInCart(this.product.id) : false; }

  // Mock reviews
  reviews: ProductReview[] = [
    {
      id: 'r1', productId: '', userId: 'u1', userName: 'Arjun M.',
      rating: 5, title: 'Exceptional bat!', comment: 'Best bat I have ever used. The sweet spot is enormous and the pickup is perfect.',
      date: '2024-02-10', verified: true, helpful: 24, userAvatar: 'https://i.pravatar.cc/50?img=1'
    },
    {
      id: 'r2', productId: '', userId: 'u2', userName: 'Priya S.',
      rating: 4, title: 'Great quality, fast delivery', comment: 'Very pleased with the quality. Arrived well-packed and in perfect condition. Highly recommend.',
      date: '2024-01-25', verified: true, helpful: 18, userAvatar: 'https://i.pravatar.cc/50?img=5'
    },
    {
      id: 'r3', productId: '', userId: 'u3', userName: 'Rahul K.',
      rating: 5, title: 'Perfect for club cricket', comment: 'Outstanding bat for its price. Playing with it for 3 months and it still hits like new.',
      date: '2024-01-15', verified: true, helpful: 12, userAvatar: 'https://i.pravatar.cc/50?img=3'
    },
  ];

  faqs = [
    { q: 'Is this bat ready to use out of the box?', a: 'We recommend knocking in the bat and oiling it before use for best performance and longevity.' },
    { q: 'Can I use this for professional cricket?', a: 'Yes, our professional grade bats are approved for all levels including international cricket.' },
    { q: 'What is the weight of this bat?', a: 'Weights vary slightly. The exact weight range is listed in the specifications. Custom weights available on request.' },
  ];
  openFaq: number | null = null;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      const slug = params['slug'];
      this.product = this.productSvc.getBySlug(slug) || null;

      if (this.product) {
        this.relatedProducts = this.productSvc.getRelated(this.product, 4);
        this.recentlySvc.add(this.product);
        this.reviews = this.reviews.map(r => ({ ...r, productId: this.product!.id }));
      } else {
        this.router.navigate(['/products']);
      }

      this.recentlyViewed = this.recentlySvc.items.filter(p => p.id !== this.product?.id).slice(0, 4);
      this.selectedImage = 0;
      this.quantity = 1;
      this.isLoading = false;
    });
  }

  setImage(i: number): void { this.selectedImage = i; }

  addToCart(): void {
    if (!this.product || !this.product.inStock) return;
    this.cartSvc.addToCart(this.product, this.quantity);
    this.notifySvc.success(`${this.product.name} added to cart!`);
  }

  buyNow(): void {
    if (!this.product || !this.product.inStock) return;
    this.cartSvc.addToCart(this.product, this.quantity);
    this.router.navigate(['/checkout']);
  }

  toggleWishlist(): void {
    if (!this.product) return;
    const added = this.wishlistSvc.toggle(this.product);
    this.notifySvc.info(added ? 'Added to wishlist' : 'Removed from wishlist');
  }

  addToCompare(): void {
    if (!this.product) return;
    const result = this.compareSvc.add(this.product);
    if (result.success) this.notifySvc.success(result.message);
    else this.notifySvc.warning(result.message);
  }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) =>
      i < Math.floor(rating) ? 'fas fa-star' :
      i < rating ? 'fas fa-star-half-stroke' : 'far fa-star'
    );
  }

  get avgRating(): number {
    return this.reviews.reduce((s, r) => s + r.rating, 0) / this.reviews.length;
  }

  shareProduct(): void {
    if (navigator.share) {
      navigator.share({ title: this.product?.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      this.notifySvc.success('Link copied to clipboard!');
    }
  }
}
