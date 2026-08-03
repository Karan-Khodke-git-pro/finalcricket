import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class RecentlyViewedService {
  private readonly KEY = 'sg_recently_viewed';
  private readonly MAX = 12;
  private _items$ = new BehaviorSubject<Product[]>(this.load());

  get items$() { return this._items$.asObservable(); }
  get items() { return this._items$.value; }

  add(product: Product): void {
    const filtered = this.items.filter(p => p.id !== product.id);
    const updated = [product, ...filtered].slice(0, this.MAX);
    this.save(updated);
  }

  clear(): void { this.save([]); }

  private load(): Product[] {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); } catch { return []; }
  }

  private save(items: Product[]): void {
    this._items$.next(items);
    try { localStorage.setItem(this.KEY, JSON.stringify(items)); } catch {}
  }
}
