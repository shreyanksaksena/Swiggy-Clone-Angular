// src/app/features/restaurants/pages/restaurant-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestaurantCardComponent } from '../components/restaurant-card.component';
import { restaurants } from '../../../core/data/restaurant-data';


@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RestaurantCardComponent],
  template: `
    <div class="max-w-6xl mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">Available Restaurants</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (restaurant of restaurants; track restaurant.id) {
          <a [routerLink]="['/restaurant', restaurant.id]" class="block hover:shadow-lg transition-shadow">
            <app-restaurant-card [restaurant]="restaurant" />
          </a>
        }
      </div>
    </div>
  `
})
export class RestaurantListComponent {
  restaurants = restaurants;
}