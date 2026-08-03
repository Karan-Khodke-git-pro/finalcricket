import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="back-to-top" [class.visible]="visible" (click)="scrollTop()" title="Back to top">
      <i class="fas fa-chevron-up"></i>
    </button>
  `,
  styles: [`
    .back-to-top {
      position: fixed; bottom: 32px; right: 24px;
      width: 44px; height: 44px;
      border-radius: 50%; background: var(--gradient-accent);
      color: var(--primary-dark); border: none;
      font-size: 1rem; cursor: pointer;
      box-shadow: var(--shadow-gold);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transform: translateY(20px);
      transition: all 0.3s ease; z-index: 500;
      pointer-events: none;
      &.visible { opacity: 1; transform: translateY(0); pointer-events: all; }
      &:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.5); }
    }
  `]
})
export class BackToTopComponent {
  visible = false;
  @HostListener('window:scroll')
  onScroll() { this.visible = window.scrollY > 400; }
  scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
