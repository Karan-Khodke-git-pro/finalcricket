import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  cartSvc = inject(CartService);
  private router = inject(Router);

  selectedMethod = 'upi';
  upiId = '';
  isProcessing = false;

  cardDetails = { number: '', name: '', expiry: '', cvv: '' };

  methods = [
    { id: 'upi', label: 'UPI Payment', icon: 'fa-mobile-alt' },
    { id: 'card', label: 'Credit / Debit Card', icon: 'fa-credit-card' },
    { id: 'netbanking', label: 'Net Banking', icon: 'fa-university' },
    { id: 'wallet', label: 'Paytm / Wallet', icon: 'fa-wallet' },
    { id: 'cod', label: 'Cash on Delivery', icon: 'fa-money-bill-wave' },
  ];

  banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Bank of Baroda', 'Punjab National Bank'];
  selectedBank = '';

  get total() {
    return this.cartSvc.subtotal + this.cartSvc.gst - this.cartSvc.discount;
  }

  pay(): void {
    this.isProcessing = true;
    setTimeout(() => {
      this.cartSvc.clearCart();
      this.router.navigate(['/payment/success']);
    }, 2200);
  }
}
