import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartSvc = inject(CartService);

  // ── WHATSAPP NUMBER OF YOUR CLIENT (seller) ──────────────────
  readonly WHATSAPP_NUMBER = '918669049802'; // ← Replace with actual number

  step = 1;
  showReceipt = false;
  orderId = '';
  orderDate = '';

  shipping: any = {
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '', country: 'India'
  };

  deliveryMethod = 'standard';

  states = ['Andhra Pradesh','Delhi','Gujarat','Karnataka','Kerala','Maharashtra',
            'Punjab','Rajasthan','Tamil Nadu','Uttar Pradesh','West Bengal'];

  deliveryOptions = [
    { id: 'standard', label: 'Standard Delivery',  desc: '3–5 business days', price: 0,   badge: 'Free'    },
    { id: 'express',  label: 'Express Delivery',   desc: '1–2 business days', price: 149, badge: ''        },
    { id: 'overnight',label: 'Overnight Delivery', desc: 'Next business day', price: 349, badge: 'Fastest' },
  ];

  get selectedDelivery() { return this.deliveryOptions.find(d => d.id === this.deliveryMethod)!; }
  get deliveryCost()     { return this.selectedDelivery.price; }
  get subtotal()         { return this.cartSvc.subtotal; }
  get gst()              { return this.cartSvc.gst; }
  get discount()         { return this.cartSvc.discount; }
  get total()            { return this.subtotal + this.gst - this.discount + this.deliveryCost; }

  nextStep() { if (this.step < 3) this.step++; }
  prevStep() { if (this.step > 1) this.step--; }

  placeOrder() {
    this.orderId  = 'SG' + Date.now().toString().slice(-8).toUpperCase();
    this.orderDate = new Date().toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
    this.showReceipt = true;
  }

  closeReceipt() { this.showReceipt = false; }

  sendOnWhatsApp() {
    const msg = `Hi, I have placed an order on SG Cricket (Order ID: ${this.orderId}). I am sharing the screenshot of my order receipt. Please confirm.`;
    const url = `https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }

  printReceipt(): void {
    document.body.classList.add('printing-order-receipt');
    window.addEventListener(
      'afterprint',
      () => document.body.classList.remove('printing-order-receipt'),
      { once: true },
    );
    window.print();
  }
}
