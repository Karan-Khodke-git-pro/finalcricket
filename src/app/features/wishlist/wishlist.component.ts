import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { NotificationService } from '../../core/services/notification.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  wishlistSvc = inject(WishlistService);
  cartSvc = inject(CartService);
  notif = inject(NotificationService);

  moveToCart(item: any): void {
    this.cartSvc.addToCart(item.product, 1);
    this.wishlistSvc.remove(item.product.id);
    this.notif.success('Moved to cart!');
  }

  clearAll(): void {
    this.wishlistSvc.clear();
    this.notif.info('Wishlist cleared');
  }
}
