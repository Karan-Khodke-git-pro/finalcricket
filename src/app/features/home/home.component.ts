import { Component, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { Product } from '../../core/models/product.model';
import { TESTIMONIALS, STATS, FAQS } from '../../data/app.data';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { BAT_IMAGES } from '../../data/images.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private productSvc = inject(ProductService);
  private categorySvc = inject(CategoryService);

  featured: Product[] = [];
  bestSellers: Product[] = [];
  newArrivals: Product[] = [];
  trending: Product[] = [];
  limitedEdition: Product[] = [];

  categories = this.categorySvc.getMainCategories();
  batGallery = this.categorySvc.getAll()
    .filter(category => category.id.startsWith('cat-kw') || category.slug === 'rainy-season');
  testimonials = TESTIMONIALS;
  stats = STATS;
  faqs = FAQS.slice(0, 3);

  // Hero Carousel
  heroSlides = [
    {
       theme: 'aqua',
       eyebrow: 'Kashmir Willow · Player Edition',
       title: 'Mei Rukega',
       highlight: 'Nahi.',
       subtitle: "Hand-finished aqua splash bats, built for players who don't stop.",
       cta: 'Shop the Bat',
       link: '/products',
       image: 'assets/images/ffl/bats-aqua.jpg',
       tag: '01 / Aqua Splash'
    },
    {
       theme: 'blaze',
       eyebrow: 'The Blaze Series',
       title: 'Built to',
       highlight: 'Blaze.',
       subtitle: 'Sunset fade, hand-thrown splatter. No two bats are ever the same.',
       cta: 'Explore Blaze',
       link: '/products',
       image: 'assets/images/ffl/bats-blaze.jpg',
       tag: '02 / Blaze Fade'
    },
     {
       theme: 'volt',
       eyebrow: 'Tennis-Ball Series',
       title: 'Loud bat.',
       highlight: 'Louder shots.',
       subtitle: 'Neon volt finish, lightweight and made for tape-ball and gully cricket.',
       cta: 'Shop Volt',
       link: '/products',
       image: 'assets/images/ffl/bats-volt.jpg',
       tag: '03 / Volt Neon'
     },
  ];
  currentHeroSlide = 0;
  heroScale = 1;
  private heroInterval?: ReturnType<typeof setInterval>;
  private heroPointerStart: number | null = null;

  // Promo Carousel
  promos = [
    { id: 1, tag: 'Sale', title: 'Up to 20% off on English Willow', sub: 'Limited time offer', link: '/products', img: BAT_IMAGES[2], bg: 'var(--gradient-primary)' },
    { id: 2, tag: 'New', title: 'Custom Bat Builder', sub: 'Design your dream bat', link: '/custom-bat', img: BAT_IMAGES[8], bg: 'linear-gradient(135deg,#1a2a1a,#2E7D32)' },
    { id: 3, tag: 'Free', title: 'Free Shipping on ₹999+', sub: 'No minimum on express orders', link: '/products', img: BAT_IMAGES[5], bg: 'linear-gradient(135deg,#1a0a0a,#8B1919)' },
  ];

  activeTab = 'featured';

  openFaq: number | null = null;

  // Testimonial carousel
  currentTestimonial = 0;

  ngOnInit(): void {
    this.updateHeroScale();
    this.featured = this.productSvc.getFeatured();
    this.bestSellers = this.productSvc.getBestSellers();
    this.newArrivals = this.productSvc.getNewArrivals();
    this.trending = this.productSvc.getTrending();
    this.limitedEdition = this.productSvc.getLimitedEdition();

    const savedSlide = Number(localStorage.getItem('ffl-slide'));
    if (Number.isInteger(savedSlide) && savedSlide >= 0 && savedSlide < this.heroSlides.length) {
      this.currentHeroSlide = savedSlide;
    }

    this.restartHeroInterval();
  }

  @HostListener('window:resize')
  updateHeroScale(): void {
    const availableHeight = Math.max(window.innerHeight - 72, 0);
    this.heroScale = Math.min(window.innerWidth / 2000, availableHeight / 1000);
  }

  ngOnDestroy(): void {
    if (this.heroInterval) clearInterval(this.heroInterval);
  }

  nextHeroSlide(): void {
    this.currentHeroSlide = (this.currentHeroSlide + 1) % this.heroSlides.length;
    this.persistHeroSlide();
    this.restartHeroInterval();
  }

  prevHeroSlide(): void {
    this.currentHeroSlide = (this.currentHeroSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
    this.persistHeroSlide();
    this.restartHeroInterval();
  }

  setHeroSlide(i: number): void {
    this.currentHeroSlide = i;
    this.persistHeroSlide();
    this.restartHeroInterval();
  }

  pauseHero(): void {
    if (this.heroInterval) clearInterval(this.heroInterval);
  }

  restartHeroInterval(): void {
    this.pauseHero();
    this.heroInterval = setInterval(() => {
      this.currentHeroSlide = (this.currentHeroSlide + 1) % this.heroSlides.length;
      this.persistHeroSlide();
    }, 6000);
  }

  startHeroTouch(event: TouchEvent): void {
    this.heroPointerStart = event.touches[0]?.clientX ?? null;
  }

  endHeroTouch(event: TouchEvent): void {
    if (this.heroPointerStart === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? this.heroPointerStart) - this.heroPointerStart;
    if (Math.abs(delta) > 40) delta < 0 ? this.nextHeroSlide() : this.prevHeroSlide();
    this.heroPointerStart = null;
  }

  @HostListener('window:keydown', ['$event'])
  handleHeroKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') this.nextHeroSlide();
    if (event.key === 'ArrowLeft') this.prevHeroSlide();
  }

  private persistHeroSlide(): void {
    localStorage.setItem('ffl-slide', String(this.currentHeroSlide));
  }

  get activeProducts(): Product[] {
    const map: Record<string, Product[]> = {
      featured: this.featured,
      bestSellers: this.bestSellers,
      newArrivals: this.newArrivals,
      trending: this.trending,
    };
    return map[this.activeTab] || this.featured;
  }

  toggleFaq(i: number): void { this.openFaq = this.openFaq === i ? null : i; }

  nextTestimonial(): void { this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length; }
  prevTestimonial(): void { this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length; }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? 'fas fa-star' : i < rating + 0.5 ? 'fas fa-star-half-stroke' : 'far fa-star'
    );
  }

  getInitials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(part => part.charAt(0).toUpperCase())
      .join('');
  }

  whyChooseUs = [
    { icon: 'fa-leaf', title: 'Premium Willow', desc: 'Sourced from the finest willow groves in England and Kashmir.' },
    { icon: 'fa-hands', title: 'Hand-Crafted', desc: 'Every bat is individually crafted by our expert artisans.' },
    { icon: 'fa-shield-alt', title: 'Quality Guarantee', desc: 'Rigorous quality testing on every single bat we produce.' },
    { icon: 'fa-bullseye', title: 'Made for Your Game', desc: 'Find the right bat for your playing style, from practice to match day.' },
    { icon: 'fa-gauge-high', title: 'Performance Focused', desc: 'Designed for powerful shots, balance, and confident stroke play.' },
    { icon: 'fa-shield-halved', title: 'Built to Last', desc: 'Reliable craftsmanship and durable materials for season after season.' },
  ];

  manufacturingSteps = [
    { step: '01', title: 'Willow Selection', desc: 'Hand-picking the finest clefts from certified willow plantations.' },
    { step: '02', title: 'Seasoning', desc: '6–12 months natural seasoning for optimal moisture content.' },
    { step: '03', title: 'Blade Shaping', desc: 'Precise machine and hand-shaping to achieve the perfect profile.' },
    { step: '04', title: 'Handle Fitting', desc: 'Multi-spring cane handles fitted with professional precision.' },
    { step: '05', title: 'Pressing', desc: 'Traditional bat pressing to harden the willow fibers.' },
    { step: '06', title: 'Finishing', desc: 'Premium sanding, oiling, and final quality inspection.' },
  ];
}
