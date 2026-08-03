import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TEAM_MEMBERS, TIMELINE_EVENTS, STATS } from '../../data/app.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  team = TEAM_MEMBERS;
  timeline = TIMELINE_EVENTS;
  stats = STATS;

  certifications = [
    { icon: 'fas fa-certificate', title: 'ISO 9001:2015', subtitle: 'Quality Management' },
    { icon: 'fas fa-trophy', title: 'MCC Approved', subtitle: 'Marylebone Cricket Club' },
    { icon: 'fas fa-shield-alt', title: 'BCCI Certified', subtitle: 'Board of Control for Cricket in India' },
    { icon: 'fas fa-award', title: 'ICC Approved', subtitle: 'International Cricket Council' },
  ];

  values = [
    { icon: 'fas fa-leaf', title: 'Sustainable Willow', desc: 'We source only from responsibly managed forests, ensuring every tree cut plants three more.' },
    { icon: 'fas fa-hands', title: 'Master Craftsmanship', desc: 'Each bat is shaped, pressed, and finished by artisans with 20+ years of experience.' },
    { icon: 'fas fa-microscope', title: 'R&D Innovation', desc: 'Our in-house lab continuously tests blade geometry, edge profiles, and handle engineering.' },
    { icon: 'fas fa-star', title: 'Elite Performance', desc: 'Used by international cricketers across formats — Test, ODI, T20, and domestic leagues.' },
  ];
}
