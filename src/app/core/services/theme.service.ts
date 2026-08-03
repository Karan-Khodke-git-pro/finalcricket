import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly KEY = 'sg_theme';
  private _dark$ = new BehaviorSubject<boolean>(this.loadPref());

  get isDark$() { return this._dark$.asObservable(); }
  get isDark() { return this._dark$.value; }

  constructor() { this.applyTheme(this._dark$.value); }

  toggle(): void { this.set(!this._dark$.value); }

  set(dark: boolean): void {
    this._dark$.next(dark);
    this.applyTheme(dark);
    try { localStorage.setItem(this.KEY, String(dark)); } catch {}
  }

  private applyTheme(dark: boolean): void {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }

  private loadPref(): boolean {
    try {
      const stored = localStorage.getItem(this.KEY);
      if (stored !== null) return stored === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch { return false; }
  }
}
