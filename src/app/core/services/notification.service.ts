import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _toasts$ = new BehaviorSubject<Toast[]>([]);
  get toasts$() { return this._toasts$.asObservable(); }

  show(message: string, type: Toast['type'] = 'info', duration = 3500): void {
    const id = Date.now().toString();
    const toast: Toast = { id, message, type, duration };
    this._toasts$.next([...this._toasts$.value, toast]);
    setTimeout(() => this.dismiss(id), duration);
  }

  success(msg: string) { this.show(msg, 'success'); }
  error(msg: string) { this.show(msg, 'error', 4500); }
  warning(msg: string) { this.show(msg, 'warning'); }
  info(msg: string) { this.show(msg, 'info'); }

  dismiss(id: string): void {
    this._toasts$.next(this._toasts$.value.filter(t => t.id !== id));
  }
}
