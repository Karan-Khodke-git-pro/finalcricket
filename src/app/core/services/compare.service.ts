import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CompareService {
  private readonly MAX = 3;
  private _items$ = new BehaviorSubject<Product[]>([]);

  get items$() { return this._items$.asObservable(); }
  get items() { return this._items$.value; }
  get count() { return this.items.length; }
  get isFull() { return this.count >= this.MAX; }

  add(product: Product): { success: boolean; message: string } {
    if (this.has(product.id)) return { success: false, message: 'Already in compare list.' };
    if (this.isFull) return { success: false, message: 'Can compare up to 3 bats only.' };
    this._items$.next([...this.items, product]);
    return { success: true, message: 'Added to compare.' };
  }

  remove(productId: string): void {
    this._items$.next(this.items.filter(p => p.id !== productId));
  }

  has(productId: string): boolean {
    return this.items.some(p => p.id === productId);
  }

  clear(): void { this._items$.next([]); }
}
