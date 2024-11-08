// src/app/core/services/cart.service.ts
import { Injectable, signal } from '@angular/core';
import { computed } from '@angular/core';
import { CartItem } from '../interfaces/cart-item.interface';
import { MenuItem } from '../interfaces/menu-item.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  
  totalItems = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
  totalAmount = computed(() => this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0));

  addToCart(item: MenuItem) {
    const cartItem = this.cartItems().find(i => i.id === item.id);
    if (cartItem) {
      this.cartItems.update(items => 
        items.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i)
      );
    } else {
      this.cartItems.update(items => [...items, {
          ...item, quantity: 1,
          customization: undefined
      }]);
    }
  }

  removeFromCart(itemId: number) {
    this.cartItems.update(items => items.filter(item => item.id !== itemId));
  }

  updateQuantity(itemId: number, quantity: number) {
    if (quantity === 0) {
      this.removeFromCart(itemId);
      return;
    }
    this.cartItems.update(items =>
      items.map(item => item.id === itemId ? {...item, quantity} : item)
    );
  }

  getCartItems() {
    return this.cartItems();
  }
}