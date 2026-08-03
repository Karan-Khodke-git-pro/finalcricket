import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Product, Coupon } from '../models/product.model';
import { COUPONS } from '../../data/app.data';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'sg_cart';
  private _items$ = new BehaviorSubject<CartItem[]>(this.loadCart());

  get items$(): Observable<CartItem[]> { return this._items$.asObservable(); }
  get items(): CartItem[] { return this._items$.value; }
  get count(): number { return this.items.reduce((s, i) => s + i.quantity, 0); }
  get subtotal(): number { return this.items.reduce((s, i) => s + i.product.price * i.quantity, 0); }
  get gst(): number { return Math.round(this.subtotal * 0.18); }
  get total(): number { return this.subtotal + this.gst - this._discount$.value + this._shipping$.value; }

  private _discount$ = new BehaviorSubject<number>(0);
  private _shipping$ = new BehaviorSubject<number>(0);
  private _appliedCoupon$ = new BehaviorSubject<Coupon | null>(null);

  get discount$() { return this._discount$.asObservable(); }
  get discount() { return this._discount$.value; }
  get appliedCoupon$() { return this._appliedCoupon$.asObservable(); }
  get appliedCoupon() { return this._appliedCoupon$.value; }
  get shippingCost() { return this.subtotal >= 999 ? 0 : 99; }

  addToCart(product: Product, quantity = 1): void {
    const current = [...this.items];
    const idx = current.findIndex(i => i.product.id === product.id);
    if (idx > -1) {
      current[idx] = { ...current[idx], quantity: current[idx].quantity + quantity };
    } else {
      current.push({ product, quantity });
    }
    this.saveCart(current);
  }

  removeFromCart(productId: string): void {
    this.saveCart(this.items.filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: string, qty: number): void {
    if (qty < 1) { this.removeFromCart(productId); return; }
    this.saveCart(this.items.map(i => i.product.id === productId ? { ...i, quantity: qty } : i));
  }

  clearCart(): void { this.saveCart([]); this._discount$.next(0); this._appliedCoupon$.next(null); }

  applyCoupon(code: string): { success: boolean; message: string } {
    const coupon = COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase() && c.valid);
    if (!coupon) return { success: false, message: 'Invalid coupon code.' };
    if (this.subtotal < coupon.minOrder) {
      return { success: false, message: `Minimum order of ₹${coupon.minOrder} required.` };
    }
    let discount = coupon.type === 'percentage'
      ? Math.round(this.subtotal * coupon.discount / 100)
      : coupon.discount;
    if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
    this._discount$.next(discount);
    this._appliedCoupon$.next(coupon);
    return { success: true, message: `Coupon applied! You save ₹${discount}.` };
  }

  removeCoupon(): void { this._discount$.next(0); this._appliedCoupon$.next(null); }

  isInCart(productId: string): boolean { return this.items.some(i => i.product.id === productId); }

  private loadCart(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  private saveCart(items: CartItem[]): void {
    this._items$.next(items);
    try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items)); } catch {}
  }
}
