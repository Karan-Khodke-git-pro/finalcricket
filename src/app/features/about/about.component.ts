import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  stats = [
    { icon: 'fas fa-cricket-bat-ball', value: 'Age 8', label: 'Started Playing Cricket' },
    { icon: 'fas fa-seedling', value: '2022', label: 'Turned Passion Into a Brand' },
    { icon: 'fas fa-trophy', value: '5,000+', label: 'Bats Sold Till Date' },
    { icon: 'fas fa-map-marker-alt', value: 'Pan-India', label: 'Cricketers We Serve' },
  ];

  values = [
    { icon: 'fas fa-heart', title: 'Cricket First', desc: 'Playing tennis cricket since the age of 12 and winning championships along the way means every bat is designed by someone who has actually lived the game.' },
    { icon: 'fas fa-hand-holding-dollar', title: 'Affordable, Always', desc: 'Too many tennis cricketers can\'t afford a good bat because big brands price them out. We keep our bats accessible without cutting corners on quality.' },
    { icon: 'fas fa-hammer', title: 'Made With Care', desc: 'We started with just 10 hand-made bats in 2022. Every bat since has been built with that same care, whether it\'s our 10th or our 10,000th.' },
    { icon: 'fas fa-users', title: 'Trusted Pan-India', desc: 'From a first batch of 10 to thousands of bats sold across the country — almost entirely on the strength of word of mouth from real cricketers.' },
  ];

  timeline = [
    { year: 'Age 8', title: 'First Bat in Hand', description: 'Started playing cricket at the age of 8 — the beginning of a lifelong obsession with the game.', milestone: true },
    { year: 'Age 9', title: 'Picked for the School Team', description: 'Selected for the school Under-9 team. From this point on, there was no looking back.' },
    { year: 'Age 12', title: 'Entered Tennis Cricket', description: 'Made the switch to tennis-ball cricket, the format that would go on to shape the rest of the journey.' },
    { year: 'Trophy Years', title: 'Championship After Championship', description: 'Went on to win numerous tournaments and championships on the tennis cricket circuit over the years.', milestone: true },
    { year: '2022', title: 'Passion Became a Profession', description: 'Decided to turn a lifelong love for cricket into a business, hand-making the very first batch of just 10 tennis cricket bats.' },
    { year: 'Today', title: '5,000+ Bats and Counting', description: 'From 10 bats to thousands sold all over India — built on the belief that every cricketer deserves a quality bat at a fair price.', milestone: true },
  ];

  achievements = [
    { image: 'assets/images/about/gorakhpur-trophy-2026.jpg', title: 'Gorakhpur Trophy, 2026', subtitle: 'Champions — October 5, 2026' },
    { image: 'assets/images/about/trophy-collection.jpeg', title: 'A Shelf Full of Memories', subtitle: 'Trophies won across the tennis cricket circuit' },
    { image: 'assets/images/about/champions-2023-team.jpeg', title: 'Champions, 2023', subtitle: 'Sindhi Premier League — National Level' },
    { image: 'assets/images/about/spl-champion-2018.jpeg', title: 'S.P.L. 5 BGR Cup, 2018', subtitle: 'Champions — Jalgaon' },
    { image: 'assets/images/about/motm-award-2025.jpeg', title: 'Man of the Match, 2025', subtitle: 'Sindhi Premier League — National Level' },
    { image: 'assets/images/about/credai-award.jpeg', title: 'CREDAI Nagpur Metro', subtitle: 'Shashank Shrigadiwar Memorial Cricket Tournament' },
    { image: 'assets/images/about/trophy-handover.jpeg', title: 'Passing It Forward', subtitle: 'Celebrating the game with the next generation' },
  ];
}
