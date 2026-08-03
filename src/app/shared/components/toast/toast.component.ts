import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Toast } from '../../../core/services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let t of (notifySvc.toasts$ | async)" class="toast" [class]="'toast-'+t.type">
        <i class="fas" [class]="getIcon(t.type)"></i>
        <span>{{t.message}}</span>
        <button (click)="notifySvc.dismiss(t.id)"><i class="fas fa-times"></i></button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed; top: 90px; right: 20px;
      z-index: 9999; display: flex; flex-direction: column; gap: 8px;
      pointer-events: none;
    }
    .toast {
      display: flex; align-items: center; gap: 10px;
      padding: 12px 16px; border-radius: 12px;
      background: var(--surface); box-shadow: var(--shadow-lg);
      border-left: 4px solid; font-size: 0.875rem; font-weight: 500;
      animation: slide-down 0.3s ease;
      pointer-events: all; min-width: 280px; max-width: 400px;
      i:first-child { font-size: 1rem; }
      span { flex: 1; }
      button { background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 0.75rem; }
    }
    .toast-success { border-color: var(--success); i:first-child { color: var(--success); } }
    .toast-error   { border-color: var(--danger);  i:first-child { color: var(--danger);  } }
    .toast-warning { border-color: var(--warning); i:first-child { color: var(--warning); } }
    .toast-info    { border-color: var(--info);    i:first-child { color: var(--info);    } }
  `]
})
export class ToastComponent {
  notifySvc = inject(NotificationService);
  getIcon(type: Toast['type']) {
    return { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' }[type];
  }
}
