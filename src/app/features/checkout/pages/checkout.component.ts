// src/app/features/checkout/pages/checkout.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Order, OrderService } from '../../../core/services/order.service';
import { OrderReceiptComponent } from "../../orders/components/order-success-receipt/order-success-receipt.component";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, OrderReceiptComponent],
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
              @if (!isLoggedIn()) {
                <button routerLink="/login" class="text-gray-600">Sign In</button>
              } @else {
                <span class="text-gray-600">Welcome, {{ currentUser()?.name }}</span>
              }
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

            <!-- Account Section - Only show if not logged in -->
            @if (!isLoggedIn()) {
              <div class="bg-white rounded-lg shadow-sm p-4">
                <h2 class="font-semibold mb-4">Account</h2>
                <p class="text-gray-600">To place your order now, log in to your existing account or sign up.</p>
                <div class="flex gap-4 mt-4">
                  <button routerLink="/login" class="px-6 py-2 border border-green-600 text-green-600 rounded-lg">
                    LOG IN
                  </button>
                  <button routerLink="/register" class="px-6 py-2 bg-green-600 text-white rounded-lg">
                    SIGN UP
                  </button>
                </div>
              </div>
            }

            <!-- Place Order Button - Only show if logged in -->
            @if (isLoggedIn() && cartItems().length > 0) {
              <div class="bg-white rounded-lg shadow-sm p-4">
                <button 
                  (click)="placeOrder()"
                  class="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 
                         transition-colors duration-200 flex items-center justify-center gap-2"
                  [disabled]="isProcessing"
                >
                  @if (isProcessing) {
                    <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  }
                  {{ isProcessing ? 'Processing...' : 'Place Order • ₹' + grandTotal() }}
                </button>
              </div>
            }
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
          <!-- Order Receipt Modal - Place it here -->
  <div class="modal" *ngIf="showReceipt" (click)="closeReceipt($event)">
    <div class="modal-content">
      <app-order-receipt 
        *ngIf="placedOrder" 
        [order]="placedOrder">
      </app-order-receipt>
      <button class="close-button" (click)="closeReceipt($event)">×</button>
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
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  isProcessing = false;
  contactlessDelivery = false;
  specialInstructions = '';
  deliveryDistance = 4.0;
  deliveryFee = 95;
  platformFee = 6;
  showReceipt = false;
  placedOrder: Order | null = null;

  cartItems = () => this.cartService.getCartItems();
  totalAmount = () => this.cartService.totalAmount();
  isLoggedIn = () => this.authService.isLoggedIn();
  currentUser = () => this.authService.getCurrentUser();
  
  gstCharges = () => Math.round(this.totalAmount() * 0.05);
  grandTotal = () => this.totalAmount() + this.deliveryFee + this.platformFee + this.gstCharges();

  updateQuantity(itemId: number, quantity: number) {
    this.cartService.updateQuantity(itemId, quantity);
  }

 async placeOrder() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.cartItems().length === 0) {
      alert('Your cart is empty!');
      return;
    }

    this.isProcessing = true;

    const orderData = {
      contactless: this.contactlessDelivery,
      specialInstructions: this.specialInstructions,
      deliveryDistance: this.deliveryDistance,
      billing: {
        itemTotal: this.totalAmount(),
        deliveryFee: this.deliveryFee,
        platformFee: this.platformFee,
        gstCharges: this.gstCharges(),
        totalAmount: this.grandTotal()
      }
    };

    try {
  const order = await this.orderService.placeOrder(orderData).toPromise();
  
  // Empty the cart
  this.emptyCart();
  
  // Show receipt (with non-null assertion)
  this.placedOrder = order!;  // Use non-null assertion
  this.showReceipt = true;
  
  // After 5 seconds, navigate to orders page
  setTimeout(() => {
    this.closeReceipt();
    if (order?.id) {
      this.router.navigate(['/orders', order.id]);
    } else {
      this.router.navigate(['/orders']);
    }
  }, 5000);
  
} catch (error){
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      this.isProcessing = false;
    }
  }

  closeReceipt(event?: MouseEvent) {
    if (event) {
      // Only close if clicking outside the receipt
      if ((event.target as HTMLElement).classList.contains('modal')) {
        this.showReceipt = false;
        this.placedOrder = null;
      }
    } else {
      this.showReceipt = false;
      this.placedOrder = null;
    }
  }
  // Helper method to empty cart
  private emptyCart() {
    const items = this.cartItems();
    items.forEach(item => {
      this.cartService.updateQuantity(item.id, 0);
    });
  }
}