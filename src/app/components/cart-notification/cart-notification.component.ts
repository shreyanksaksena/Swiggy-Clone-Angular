import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart-notification',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (totalItems() > 0) {
      <div class="fixed bottom-0 left-0 right-0 bg-green-600 text-white py-3 px-4 flex justify-between items-center z-50">
        <div class="flex items-center">
          <span class="font-medium">{{ totalItems() }} Item{{ totalItems() > 1 ? 's' : '' }} added</span>
        </div>
        <button 
          [routerLink]="['/checkout']"
          class="bg-white text-green-600 px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100"
        >
          <span>VIEW CART</span>
          <span class="text-lg">₹{{ totalAmount() }}</span>
          <span>→</span>
        </button>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CartNotificationComponent {
  constructor(private cartService: CartService) {}

  totalItems = computed(() => this.cartService.totalItems());
  totalAmount = computed(() => this.cartService.totalAmount());
}