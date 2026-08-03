import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';
import { REPAIR_TYPES } from '../../data/app.data';

@Component({
  selector: 'app-repair',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss']
})
export class RepairComponent {
  constructor(private notif: NotificationService) {
    const y = new Date().getFullYear();
    for (let i = y; i >= y - 20; i--) this.years.push(String(i));
  }

  repairTypes = REPAIR_TYPES;
  submitted = false;

  form: any = {
    name: '', email: '', phone: '', batModel: '', purchaseYear: '',
    repairType: '', description: '', contactPref: 'phone'
  };

  years: string[] = [];

  services = [
    { icon: 'fas fa-band-aid', title: 'Handle Replacement', desc: 'Full cane/rubber handle replacement with your choice of grip style.' },
    { icon: 'fas fa-hammer', title: 'Bat Knocking', desc: 'Professional machine & hand knocking to prepare your new bat for play.' },
    { icon: 'fas fa-tint', title: 'Oiling & Conditioning', desc: 'Raw linseed oil treatment to restore moisture and prevent cracking.' },
    { icon: 'fas fa-shield-alt', title: 'Anti-Scuff Application', desc: 'High-quality anti-scuff sheet applied to face, edges, and spine.' },
    { icon: 'fas fa-band-aid', title: 'Crack Repair', desc: 'Fibre glass / epoxy repair for surface cracks and splits.' },
    { icon: 'fas fa-star', title: 'Full Refurbishment', desc: 'Complete service: sand, re-knock, oil, grip, and sticker replacement.' },
  ];

  submit(): void {
    this.submitted = true;
    this.notif.success('Repair request submitted! We\'ll contact you within 24 hours.');
  }
}
