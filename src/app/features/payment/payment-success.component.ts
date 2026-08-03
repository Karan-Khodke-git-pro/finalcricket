import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="success-page">
      <div class="container">
        <div class="success-card">
          <div class="success-animation">
            <div class="check-circle">
              <i class="fas fa-check"></i>
            </div>
          </div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your premium cricket bat is being prepared with care and will be shipped soon.</p>
          <div class="order-id">
            <span>Order ID:</span>
            <strong>#SG{{Math.floor(Math.random()*100000)}}</strong>
          </div>
          <div class="success-features">
            <div class="feat"><i class="fas fa-envelope"></i><span>Confirmation email sent</span></div>
            <div class="feat"><i class="fas fa-truck"></i><span>Tracking link will be shared</span></div>
            <div class="feat"><i class="fas fa-headset"></i><span>24/7 support available</span></div>
          </div>
          <div class="success-actions">
            <a routerLink="/products" class="btn btn-accent btn-lg">
              <i class="fas fa-cricket-bat-ball"></i> Continue Shopping
            </a>
            <a routerLink="/" class="btn btn-outline btn-lg">
              <i class="fas fa-home"></i> Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .success-page { padding: var(--space-5xl) 0; min-height: 80vh; display: flex; align-items: center; }
    .success-card { max-width: 580px; margin: 0 auto; text-align: center; background: var(--surface); border-radius: var(--radius-2xl); padding: var(--space-4xl); box-shadow: var(--shadow-xl); }
    .check-circle { width: 80px; height: 80px; border-radius: 50%; background: var(--gradient-accent); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-xl); font-size: 2rem; color: var(--primary-dark); animation: bounce-in 0.6s var(--transition-spring); box-shadow: var(--shadow-gold); }
    h1 { font-size: 1.8rem; margin-bottom: var(--space-md); }
    p { color: var(--text-muted); margin-bottom: var(--space-xl); }
    .order-id { display: inline-flex; gap: 8px; background: var(--surface-alt); padding: 8px 20px; border-radius: var(--radius-full); font-size: 0.875rem; margin-bottom: var(--space-xl); border: 1px solid var(--border); strong { color: var(--accent); } }
    .success-features { display: flex; gap: var(--space-xl); justify-content: center; margin-bottom: var(--space-2xl); flex-wrap: wrap; }
    .feat { display: flex; flex-direction: column; align-items: center; gap: var(--space-sm); i { font-size: 1.5rem; color: var(--accent); } span { font-size: 0.78rem; font-weight: 600; color: var(--text-muted); } }
    .success-actions { display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap; }
  `]
})
export class PaymentSuccessComponent {
  Math = Math;
}
