import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompareService } from '../../core/services/compare.service';
import { CartService } from '../../core/services/cart.service';
import { NotificationService } from '../../core/services/notification.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent {
  compareSvc = inject(CompareService);
  cartSvc = inject(CartService);
  notif = inject(NotificationService);

  specs = [
    { key: 'category', label: 'Category' },
    { key: 'willowType', label: 'Willow Type', nested: 'specifications' },
    { key: 'grade', label: 'Grade', nested: 'specifications' },
    { key: 'weight', label: 'Weight', nested: 'specifications' },
    { key: 'sweetSpot', label: 'Sweet Spot', nested: 'specifications' },
    { key: 'balance', label: 'Balance', nested: 'specifications' },
    { key: 'spine', label: 'Spine', nested: 'specifications' },
    { key: 'edges', label: 'Edges', nested: 'specifications' },
    { key: 'handle', label: 'Handle', nested: 'specifications' },
    { key: 'handleType', label: 'Handle Type', nested: 'specifications' },
    { key: 'playerLevel', label: 'Player Level', nested: 'specifications' },
    { key: 'playStyle', label: 'Play Style', nested: 'specifications' },
    { key: 'origin', label: 'Origin', nested: 'specifications' },
  ];

  getSpec(product: Product, spec: any): string {
    if (spec.nested) return (product as any)[spec.nested]?.[spec.key] || '—';
    return (product as any)[spec.key] || '—';
  }

  addToCart(product: Product): void {
    this.cartSvc.addToCart(product, 1);
    this.notif.success(`${product.name} added to cart!`);
  }

  remove(id: string): void { this.compareSvc.remove(id); }

  asProduct(item: any): Product { return item as Product; }
}
