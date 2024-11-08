// src/app/features/checkout/pages/checkout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-100 pt-20">
      <div class="max-w-6xl mx-auto px-4 py-6">
        <!-- Header -->
        <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div class="flex justify-between items-center">
            <h1 class="text-xl font-bold">Secure Checkout</h1>
            <div class="flex items-center gap-4">
              <button class="text-gray-600">
                <span class="material-icons">help</span>
                Help
              </button>
              <button class="text-gray-600">Sign In</button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Cart Items and Account Section -->
          <div class="lg:col-span-2 space-y-4">
            <!-- Cart Items -->
            <div class="bg-white rounded-lg shadow-sm p-4" *ngIf="cartItems().length > 0; else emptyCart">
              <div *ngFor="let item of cartItems()" class="flex justify-between items-center py-4 border-b">
                <div class="flex items-start gap-4">
                  <div class="flex flex-col items-center">
                    <span [ngClass]="item.isVeg ? 'text-green-600' : 'text-red-600'">
                      {{ item.isVeg ? '🟢' : '🔴' }}
                    </span>
                  </div>
                  <div>
                    <h3 class="font-medium">{{ item.name }}</h3>
                    <p class="text-gray-600">₹{{ item.price }}</p>
                    <p *ngIf="item.customization" class="text-sm text-gray-500">Customize ></p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex items-center border rounded-lg">
                    <button 
                      class="px-3 py-1 text-green-600 hover:bg-gray-100"
                      (click)="updateQuantity(item.id, item.quantity - 1)"
                    >
                      −
                    </button>
                    <span class="px-3 py-1">{{ item.quantity }}</span>
                    <button 
                      class="px-3 py-1 text-green-600 hover:bg-gray-100"
                      (click)="updateQuantity(item.id, item.quantity + 1)"
                    >
                      +
                    </button>
                  </div>
                  <span class="font-medium">₹{{ item.price * item.quantity }}</span>
                </div>
              </div>

              <!-- Suggestions Box -->
              <div class="mt-4">
                <textarea 
                  placeholder="Any suggestions? We will pass it on..."
                  rows="2"
                  class="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              <!-- No-contact Delivery Option -->
              <div class="mt-4 flex items-start gap-3 p-4 border rounded-lg">
                <input type="checkbox" class="mt-1">
                <div>
                  <p class="font-medium">Opt in for No-contact Delivery</p>
                  <p class="text-gray-600 text-sm">
                    Unwell, or avoiding contact? Please select no-contact delivery. Partner will safely place the order outside your door (not for COD)
                  </p>
                </div>
              </div>
            </div>

            <!-- Empty Cart Message -->
            <ng-template #emptyCart>
              <div class="text-center py-8">
                <p class="text-gray-500">Your cart is empty</p>
                <button routerLink="/" class="mt-4 text-green-600 font-medium">
                  Browse Restaurants
                </button>
              </div>
            </ng-template>

            <!-- Account Section -->
            <div class="bg-white rounded-lg shadow-sm p-4">
              <h2 class="font-semibold mb-4">Account</h2>
              <p class="text-gray-600">To place your order now, log in to your existing account or sign up.</p>
              <div class="flex gap-4 mt-4">
                <button class="px-6 py-2 border border-green-600 text-green-600 rounded-lg">
                  LOG IN
                </button>
                <button class="px-6 py-2 bg-green-600 text-white rounded-lg">
                  SIGN UP
                </button>
              </div>
            </div>
          </div>

          <!-- Bill Details -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h2 class="font-semibold mb-4">Bill Details</h2>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Item Total</span>
                  <span>₹{{ totalAmount() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Delivery Fee | {{ deliveryDistance }} kms</span>
                  <span>₹{{ deliveryFee }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Platform Fee</span>
                  <span>₹{{ platformFee }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">GST and Restaurant Charges</span>
                  <span>₹{{ gstCharges() }}</span>
                </div>
                <div class="border-t pt-3">
                  <div class="flex justify-between font-bold">
                    <span>TO PAY</span>
                    <span>₹{{ grandTotal() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CheckoutComponent {
  constructor(private cartService: CartService) {}

  cartItems = () => this.cartService.getCartItems();
  totalAmount = () => this.cartService.totalAmount();

  deliveryDistance = 4.0;
  deliveryFee = 95;
  platformFee = 6;
  gstCharges = () => Math.round(this.totalAmount() * 0.05);
  grandTotal = () => this.totalAmount() + this.deliveryFee + this.platformFee + this.gstCharges();

  updateQuantity(itemId: number, quantity: number) {
    this.cartService.updateQuantity(itemId, quantity);
  }
}
