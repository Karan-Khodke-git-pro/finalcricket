import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';
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
  get total()            { return this.subtotal - this.discount + this.deliveryCost; }

  nextStep() { if (this.step < 3) this.step++; }
  prevStep() { if (this.step > 1) this.step--; }

  placeOrder() {
    this.orderId  = 'FFL' + Date.now().toString().slice(-8).toUpperCase();
    this.orderDate = new Date().toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
    this.showReceipt = true;
    this.sendOnWhatsApp();
  }

  closeReceipt() { this.showReceipt = false; }

  private buildMessage(): string {
    const s = this.shipping;
    const money = (n: number) => '₹' + n.toLocaleString('en-IN');
    const lines = this.cartSvc.items.map((i, n) =>
      `${n + 1}. ${i.product.name} x ${i.quantity} = ${money(i.product.price * i.quantity)}`);
    return [
      `Hi, I have placed a new order on FFL - Fit For Life.`,
      ``,
      `*Order ID:* ${this.orderId}`,
      `*Date:* ${this.orderDate}`,
      ``,
      `*Customer:* ${s.firstName} ${s.lastName}`.trim(),
      `*Phone:* ${s.phone}`,
      s.email ? `*Email:* ${s.email}` : '',
      `*Address:* ${[s.address, s.city, s.state, s.pincode].filter(Boolean).join(', ')}`,
      ``,
      `*Items:*`,
      ...lines,
      ``,
      `Subtotal: ${money(this.subtotal)}`,
      `GST (5% included): ${money(this.gst)}`,
      this.discount > 0 ? `Discount: -${money(this.discount)}` : '',
      `Delivery (${this.selectedDelivery.label}): ${this.deliveryCost ? money(this.deliveryCost) : 'FREE'}`,
      `*Total Payable: ${money(this.total)}*`,
      ``,
      `Please confirm my order and guide me on payment & delivery.`,
    ].filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n');
  }

  private buildPdf(): File {
    const s = this.shipping;
    const rs = (n: number) => 'Rs. ' + n.toLocaleString('en-IN');
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    let y = 20;
    const line = (text: string, size = 11, bold = false, x = 15) => {
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.setFontSize(size);
      doc.text(text, x, y);
      y += size * 0.5 + 2;
    };
    const right = (text: string, bold = false) => {
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.text(text, 195, y - 6.5, { align: 'right' });
    };

    line('FFL - Fit For Life', 20, true);
    line('Order Receipt', 12);
    y += 4;
    line(`Order ID: ${this.orderId}`, 11, true);
    line(`Date: ${this.orderDate}`);
    y += 4;
    line('Customer', 12, true);
    line(`${s.firstName} ${s.lastName}`.trim());
    line(`Phone: ${s.phone}`);
    if (s.email) line(`Email: ${s.email}`);
    doc.splitTextToSize(`Address: ${[s.address, s.city, s.state, s.pincode].filter(Boolean).join(', ')}`, 180)
      .forEach((l: string) => line(l));
    y += 4;
    line('Items', 12, true);
    this.cartSvc.items.forEach((i, n) => {
      const name = doc.splitTextToSize(`${n + 1}. ${i.product.name}  x ${i.quantity}`, 140);
      name.forEach((l: string, k: number) => {
        line(l);
        if (k === 0) right(rs(i.product.price * i.quantity));
      });
    });
    y += 4;
    const row = (label: string, value: string, bold = false) => {
      line(label, 11, bold);
      right(value, bold);
    };
    row('Subtotal', rs(this.subtotal));
    row('GST (5% included)', rs(this.gst));
    if (this.discount > 0) row('Discount', '-' + rs(this.discount));
    row(`Delivery (${this.selectedDelivery.label})`, this.deliveryCost ? rs(this.deliveryCost) : 'FREE');
    y += 2;
    row('TOTAL PAYABLE', rs(this.total), true);
    return new File([doc.output('blob')], `Order-${this.orderId}.pdf`, { type: 'application/pdf' });
  }

  sendOnWhatsApp() {
    const msg = this.buildMessage();
    const file = this.buildPdf();
    const nav = navigator as any;

    // Phones: share sheet with the PDF attached (customer picks WhatsApp)
    if (nav.canShare?.({ files: [file] })) {
      nav.share({ files: [file], text: msg }).catch((e: any) => { if (e?.name !== 'AbortError') this.openChat(msg, file); });
      return;
    }
    this.openChat(msg, file);
  }

  // Desktop / fallback: save the PDF and open the chat with the message ready
  private openChat(msg: string, file: File) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(link.href);
    window.open(`https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
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
