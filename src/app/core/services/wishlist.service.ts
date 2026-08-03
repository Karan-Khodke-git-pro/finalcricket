import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, WishlistItem } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly KEY = 'sg_wishlist';
  private _items$ = new BehaviorSubject<WishlistItem[]>(this.load());

  get items$() { return this._items$.asObservable(); }
  get items() { return this._items$.value; }
  get count() { return this.items.length; }

  toggle(product: Product): boolean {
    if (this.has(product.id)) { this.remove(product.id); return false; }
    this.add(product); return true;
  }

  add(product: Product): void {
    if (this.has(product.id)) return;
    this.save([...this.items, { product, addedAt: new Date().toISOString() }]);
  }

  remove(productId: string): void {
    this.save(this.items.filter(i => i.product.id !== productId));
  }

  has(productId: string): boolean {
    return this.items.some(i => i.product.id === productId);
  }

  clear(): void { this.save([]); }

  private load(): WishlistItem[] {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); } catch { return []; }
  }

  private save(items: WishlistItem[]): void {
    this._items$.next(items);
    try { localStorage.setItem(this.KEY, JSON.stringify(items)); } catch {}
  }
}
