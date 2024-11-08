// src/app/features/restaurants/components/menu-item.component.ts
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Restaurant } from '../../../core/interfaces/restaurant.interface'; // Import the correct Restaurant interface
import { FavoriteButtonComponent } from '../../../shared/favorite-button.component';

interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  rating?: number;
  isBestSeller?: boolean;
}

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="menu-item p-4 border-b hover:bg-gray-50">
      <div class="flex justify-between">
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <h4 class="font-medium text-lg">{{ item.name }}</h4>
            <span *ngIf="item.isVeg" class="text-green-600 text-sm">🟢 Veg</span>
            <span *ngIf="item.isBestSeller" class="text-orange-500 text-sm">⭐ Bestseller</span>
          </div>
          <p class="text-gray-600">₹{{ item.price }}</p>
          <p class="text-gray-500 text-sm mt-1">{{ item.description }}</p>
        </div>
        <div class="ml-4 flex flex-col items-end">
          <img *ngIf="item.image" [src]="item.image" [alt]="item.name" 
               class="w-24 h-24 object-cover rounded-lg mb-2">
          <div class="flex gap-2">
            <button 
              (click)="toggleFavorite()"
              class="p-2 rounded-full hover:bg-gray-100"
              [class.text-red-500]="isFavorite">
              {{ isFavorite ? '❤️' : '🤍' }}
            </button>
            <button 
              (click)="onAddToCart.emit(item)"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Add any component-specific styling here */
  `]
})
export class MenuItemComponent {
  @Input({ required: true }) item!: MenuItem;
  @Input({ required: true }) restaurant!: Restaurant; // Now using the correct Restaurant type
  @Output() onAddToCart = new EventEmitter<MenuItem>();

  private favoritesService = inject(FavoritesService);
  
  get isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.item.id);
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.favoritesService.removeFromFavorites(this.item.id);
    } else {
      this.favoritesService.addToFavorites(this.item, this.restaurant);
    }
  }
}
