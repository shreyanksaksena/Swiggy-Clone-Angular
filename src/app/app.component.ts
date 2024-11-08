// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartNotificationComponent } from './components/cart-notification/cart-notification.component';
import { CartService } from './core/services/cart.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Add this import


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HttpClientModule,
    FooterComponent,
    CartNotificationComponent,
    ReactiveFormsModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-navbar [cartItemCount]="cartService.totalItems()"></app-navbar>
      
      <main class="pt-16">
        <router-outlet></router-outlet>
      </main>

      <app-cart-notification></app-cart-notification>
      <app-footer></app-footer>
    </div>
  `
})
export class AppComponent {
  constructor(public cartService: CartService) {}
}