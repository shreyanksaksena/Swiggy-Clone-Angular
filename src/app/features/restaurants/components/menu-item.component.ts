import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../../core/interfaces/menu-item.interface';
import { Restaurant } from '../../../core/interfaces/restaurant.interface';
import { FavoritesService } from '../../../core/services/favorites.service';
import { FavoriteButtonComponent } from '../../../shared/favorite-button.component';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule, RouterModule, FavoriteButtonComponent],
  template: `
   <div class="py-5 border-b border-gray-200 last:border-b-0">
      <div class="flex justify-between gap-4">
        <div class="flex-1">
          <!-- Veg/Non-veg indicator and badges -->
          <div class="flex items-center gap-2 mb-2">
            @if (item.isVeg) {
              <span class="w-4 h-4 border border-green-600 p-[2px]">
                <span class="w-full h-full bg-green-600 block"></span>
              </span>
            } @else {
              <span class="w-4 h-4 border border-red-600 p-[2px]">
                <span class="w-full h-full bg-red-600 block"></span>
              </span>
            }
            @if (item.isBestSeller) {
              <span class="text-[#ee9c00] text-[13px] font-medium">
                ★ Bestseller
              </span>
            }
            
            <!-- Favorite Button -->
            <app-favorite-button
              [isActive]="isFavorite"
              (toggled)="toggleFavorite()"
              class="ml-2"
            ></app-favorite-button>
          </div>

          <h3 class="text-[#3e4152] text-base font-medium">{{ item.name }}</h3>
          <div class="mt-1">
            <span class="text-[#3e4152]">₹{{ item.price }}</span>
          </div>

          <p class="text-[#282c3f99] text-sm mt-3 leading-[1.3]">
            {{ item.description }}
          </p>
        </div>

        <!-- Add button section -->
        <div class="min-w-[118px] flex flex-col items-center pt-1">
          <button 
            (click)="onAddToCart.emit(item)"
            class="w-[96px] h-[34px] bg-white text-[#60b246] border border-[#d4d5d9] 
                   rounded text-sm font-medium hover:border-[#60b246] uppercase"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    :host {
      display: block;
    }
  `]
})
export class MenuItemComponent {
  @Input({ required: true }) item!: MenuItem;
  @Input({ required: true }) restaurant!: Restaurant;
  @Output() onAddToCart = new EventEmitter<MenuItem>();

  constructor(private favoritesService: FavoritesService) {}

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