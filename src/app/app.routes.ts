import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'products', loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent) },
  { path: 'products/:slug', loadComponent: () => import('./features/product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
  { path: 'categories', loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent) },
  { path: 'categories/:slug', loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent) },
  { path: 'categories/:slug/:sub', loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent) },
  { path: 'categories/:slug/:sub/:child', loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent) },
  { path: 'cart', loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) },
  { path: 'checkout', loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent) },
  { path: 'payment', loadComponent: () => import('./features/payment/payment.component').then(m => m.PaymentComponent) },
  { path: 'payment/success', loadComponent: () => import('./features/payment/payment-success.component').then(m => m.PaymentSuccessComponent) },
  { path: 'wishlist', loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent) },
  { path: 'compare', loadComponent: () => import('./features/compare/compare.component').then(m => m.CompareComponent) },
  { path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'repair', loadComponent: () => import('./features/repair/repair.component').then(m => m.RepairComponent) },
  { path: 'custom-bat', loadComponent: () => import('./features/custom-bat/custom-bat.component').then(m => m.CustomBatComponent) },
  { path: 'recently-viewed', loadComponent: () => import('./features/recently-viewed/recently-viewed.component').then(m => m.RecentlyViewedComponent) },
  { path: '**', redirectTo: '' },
];
