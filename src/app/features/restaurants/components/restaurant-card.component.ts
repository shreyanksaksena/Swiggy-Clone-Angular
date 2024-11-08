// src/app/features/restaurants/components/restaurant-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Restaurant } from '../../../core/interfaces/restaurant.interface';


@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <img [src]="restaurant.image" [alt]="restaurant.name" class="w-full h-48 object-cover">
      <div class="p-4">
        <div class="flex justify-between items-start">
          <h3 class="text-lg font-semibold">{{restaurant.name}}</h3>
          <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            ⭐ {{restaurant.rating}}
          </span>
        </div>
        <div class="text-gray-600 text-sm mt-1">{{restaurant.cuisines.join(', ')}}</div>
        <div class="flex justify-between items-center mt-2">
          <span class="text-gray-500">{{restaurant.deliveryTime}}</span>
          @if (restaurant.hasOffer) {
            <span class="text-red-600 text-sm font-medium">{{restaurant.offerText}}</span>
          }
        </div>
      </div>
    </div>
  `
})
export class RestaurantCardComponent {
  @Input({ required: true }) restaurant!: Restaurant;
}