import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-viewer-360',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './viewer-360.component.html',
  styleUrls: ['./viewer-360.component.scss']
})
export class Viewer360Component implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('viewerEl') viewerEl!: ElementRef<HTMLDivElement>;

  productSvc = inject(ProductService);

  products: Product[] = [];
  selectedProduct: Product | null = null;
  frames: string[] = [];
  currentFrame = 0;
  isPlaying = false;
  isDragging = false;
  dragStartX = 0;
  dragStartFrame = 0;
  autoPlayInterval: any;
  zoom = 1;
  isFullscreen = false;

  ngOnInit(): void {
    this.products = this.productSvc.getFeatured().slice(0, 6);
    this.selectProduct(this.products[0]);
  }

  ngAfterViewInit(): void {}

  selectProduct(product: Product): void {
    this.selectedProduct = product;
    this.frames = product.images && product.images.length > 1 ? product.images : [product.thumbnail, product.thumbnail, product.thumbnail, product.thumbnail];
    this.currentFrame = 0;
    if (this.isPlaying) this.startAutoPlay();
  }

  get currentImage(): string { return this.frames[this.currentFrame] || ''; }

  prev(): void { this.currentFrame = (this.currentFrame - 1 + this.frames.length) % this.frames.length; }
  next(): void { this.currentFrame = (this.currentFrame + 1) % this.frames.length; }

  startAutoPlay(): void {
    this.clearAutoPlay();
    this.autoPlayInterval = setInterval(() => this.next(), 600);
    this.isPlaying = true;
  }
  stopAutoPlay(): void { this.clearAutoPlay(); this.isPlaying = false; }
  clearAutoPlay(): void { if (this.autoPlayInterval) clearInterval(this.autoPlayInterval); }
  togglePlay(): void { this.isPlaying ? this.stopAutoPlay() : this.startAutoPlay(); }

  onMouseDown(e: MouseEvent): void { this.isDragging = true; this.dragStartX = e.clientX; this.dragStartFrame = this.currentFrame; }
  onMouseMove(e: MouseEvent): void {
    if (!this.isDragging) return;
    const delta = Math.floor((e.clientX - this.dragStartX) / 20);
    this.currentFrame = ((this.dragStartFrame + delta) % this.frames.length + this.frames.length) % this.frames.length;
  }
  onMouseUp(): void { this.isDragging = false; }
  onTouchStart(e: TouchEvent): void { this.dragStartX = e.touches[0].clientX; this.dragStartFrame = this.currentFrame; }
  onTouchMove(e: TouchEvent): void {
    const delta = Math.floor((e.touches[0].clientX - this.dragStartX) / 20);
    this.currentFrame = ((this.dragStartFrame + delta) % this.frames.length + this.frames.length) % this.frames.length;
  }

  zoomIn(): void { this.zoom = Math.min(3, this.zoom + 0.25); }
  zoomOut(): void { this.zoom = Math.max(1, this.zoom - 0.25); }

  toggleFullscreen(): void {
    const el = this.viewerEl?.nativeElement;
    if (!el) return;
    if (!this.isFullscreen) { el.requestFullscreen?.(); } else { document.exitFullscreen?.(); }
    this.isFullscreen = !this.isFullscreen;
  }

  ngOnDestroy(): void { this.clearAutoPlay(); }
}
