import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { NotificationService } from '../../core/services/notification.service';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartSvc = inject(CartService);
  private notifySvc = inject(NotificationService);
  private productSvc = inject(ProductService);

  couponCode = '';
  couponError = '';
  couponSuccess = '';
  suggestions: Product[] = [];

  ngOnInit(): void {
    this.suggestions = this.productSvc.getFeatured().slice(0, 4);
  }

  applyCoupon(): void {
    const result = this.cartSvc.applyCoupon(this.couponCode);
    if (result.success) { this.couponSuccess = result.message; this.couponError = ''; }
    else { this.couponError = result.message; this.couponSuccess = ''; }
  }

  removeItem(id: string): void { this.cartSvc.removeFromCart(id); }
  updateQty(id: string, qty: number): void { this.cartSvc.updateQuantity(id, qty); }

  get subtotal() { return this.cartSvc.subtotal; }
  get gst() { return this.cartSvc.gst; }
  get discount() { return this.cartSvc.discount; }
  get shipping() { return this.cartSvc.shippingCost; }
  get total() { return this.subtotal - this.discount + this.shipping; }
}
