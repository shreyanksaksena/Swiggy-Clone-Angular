import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../../../core/services/favorites.service';
import { CartService } from '../../../core/services/cart.service';
import { MenuItem } from '../../../core/interfaces';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-4xl mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">My Favorites</h1>

      <div class="space-y-6">
        @if (favorites().length > 0) {
          @for (item of favorites(); track item.menuItem.id) {
            <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <div class="flex justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-4">
                    <h3 class="text-lg font-semibold">{{item.menuItem.name}}</h3>
                    <button 
                      (click)="removeFromFavorites(item.menuItem.id)"
                      class="text-red-500 hover:text-red-700">
                      ❤️
                    </button>
                  </div>
                  
                  <p class="text-sm text-gray-600 mt-1">from {{item.restaurantInfo.name}}</p>
                  <p class="text-sm text-gray-500 mt-1">{{item.menuItem.description}}</p>
                  
                  <div class="mt-2 flex items-center gap-4">
                    <span class="font-medium">₹{{item.menuItem.price}}</span>
                    @if (item.menuItem.isVeg) {
                      <span class="text-green-600 text-sm">🟢 Veg</span>
                    } @else {
                      <span class="text-red-600 text-sm">🔴 Non-Veg</span>
                    }
                    <span class="text-sm">⭐ {{item.restaurantInfo.rating}}</span>
                  </div>

                  <p class="text-xs text-gray-400 mt-2">
                    Added to favorites on {{formatDate(item.addedAt)}}
                  </p>
                </div>

                <div class="flex flex-col items-end gap-2">
                  <button 
                    (click)="addToCart(item.menuItem)"
                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          }
        } @else {
          <div class="text-center py-12 bg-white rounded-lg shadow">
            <div class="text-6xl mb-4">💝</div>
            <h2 class="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h2>
            <p class="text-gray-600">Start adding your favorite dishes to see them here!</p>
            <a 
              routerLink="/" 
              class="inline-block mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              Browse Restaurants
            </a>
          </div>
        }
      </div>
    </div>
  `
})
export class FavoritesPageComponent {
  private favoritesService = inject(FavoritesService);
  private cartService = inject(CartService);
  
  favorites = this.favoritesService.getFavorites();

  removeFromFavorites(menuItemId: number) {
    this.favoritesService.removeFromFavorites(menuItemId);
  }

  addToCart(menuItem: MenuItem) {
    this.cartService.addToCart(menuItem);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}