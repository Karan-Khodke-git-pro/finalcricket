import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { CATEGORIES } from '../../data/categories.data';
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

  featured: Product[] = [];
  bestSellers: Product[] = [];
  newArrivals: Product[] = [];
  trending: Product[] = [];
  limitedEdition: Product[] = [];

  categories = CATEGORIES;
  testimonials = TESTIMONIALS;
  stats = STATS;
  faqs = FAQS.slice(0, 6);

  // Hero Carousel
  heroSlides = [
    {
      badge: 'New 2024 Collection',
      title: 'Craft Your\nLegacy',
      subtitle: 'Premium English Willow bats for champions. Crafted by master artisans since 1987.',
      cta1: 'Shop Now',
      cta2: 'View Collection',
      link1: '/products',
      link2: '/categories/english-willow',
      image: BAT_IMAGES[0],
      accent: 'English Willow'
    },
    {
      badge: 'Limited Edition',
      title: 'World Cup\n2024 Bat',
      subtitle: 'Only 100 pieces worldwide. Signed, numbered, and destined for greatness.',
      cta1: 'Get Yours',
      cta2: 'Learn More',
      link1: '/categories/limited-edition',
      link2: '/products/sg-world-cup-edition-2024',
      image: BAT_IMAGES[7],
      accent: 'Limited Edition'
    },
    // {
    //   badge: 'Best Value',
    //   title: '\nKashmir Willow',
    //   subtitle: 'Professional quality at an unbeatable price. Perfect for every level of play.',
    //   cta1: 'Explore Range',
    //   cta2: 'Best Sellers',
    //   link1: '/categories/kashmir-willow',
    //   link2: '/products',
    //   image: BAT_IMAGES[4],
    //   accent: 'Kashmir Willow'
    // }
  ];
  currentHeroSlide = 0;
  private heroInterval?: ReturnType<typeof setInterval>;

  // Promo Carousel
  promos = [
    { id: 1, tag: 'Sale', title: 'Up to 20% off on English Willow', sub: 'Limited time offer', link: '/products', img: BAT_IMAGES[2], bg: 'var(--gradient-primary)' },
    { id: 2, tag: 'New', title: 'Custom Bat Builder', sub: 'Design your dream bat', link: '/custom-bat', img: BAT_IMAGES[8], bg: 'linear-gradient(135deg,#1a2a1a,#2E7D32)' },
    { id: 3, tag: 'Free', title: 'Free Shipping on ₹999+', sub: 'No minimum on express orders', link: '/products', img: BAT_IMAGES[5], bg: 'linear-gradient(135deg,#1a0a0a,#8B1919)' },
  ];

  activeTab = 'featured';

  openFaq: number | null = null;

  // Gallery
  gallery = BAT_IMAGES.slice(0, 6);

  // Testimonial carousel
  currentTestimonial = 0;

  ngOnInit(): void {
    this.featured = this.productSvc.getFeatured();
    this.bestSellers = this.productSvc.getBestSellers();
    this.newArrivals = this.productSvc.getNewArrivals();
    this.trending = this.productSvc.getTrending();
    this.limitedEdition = this.productSvc.getLimitedEdition();

    this.heroInterval = setInterval(() => this.nextHeroSlide(), 5000);
  }

  ngOnDestroy(): void {
    if (this.heroInterval) clearInterval(this.heroInterval);
  }

  nextHeroSlide(): void {
    this.currentHeroSlide = (this.currentHeroSlide + 1) % this.heroSlides.length;
  }

  prevHeroSlide(): void {
    this.currentHeroSlide = (this.currentHeroSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
  }

  setHeroSlide(i: number): void { this.currentHeroSlide = i; }

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

  whyChooseUs = [
    { icon: 'fa-award', title: '37+ Years Experience', desc: 'Over three decades of masterful bat craftsmanship.' },
    { icon: 'fa-leaf', title: 'Premium Willow', desc: 'Sourced from the finest willow groves in England and Kashmir.' },
    { icon: 'fa-hands', title: 'Hand-Crafted', desc: 'Every bat is individually crafted by our expert artisans.' },
    { icon: 'fa-shield-alt', title: 'Quality Guarantee', desc: 'Rigorous quality testing on every single bat we produce.' },
    { icon: 'fa-truck', title: 'Free Shipping', desc: 'Complimentary shipping on all orders above ₹999.' },
    { icon: 'fa-rotate-left', title: '7-Day Returns', desc: 'Hassle-free returns and exchanges within 7 days.' },
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
