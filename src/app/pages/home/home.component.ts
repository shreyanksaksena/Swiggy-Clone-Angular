import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FoodCategorySliderComponent } from '../../components/food-category-slider/food-category-slider.component';
import { RestaurantChainsComponent } from '../../components/restaurant-chains/restaurant-chains.component';
import { RestaurantsComponent } from '../../components/restaurants/restaurants.component';
import { ExploreSectionComponent } from '../../components/explore/explore-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FoodCategorySliderComponent,
    RestaurantChainsComponent,
    RestaurantsComponent,
    ExploreSectionComponent
  ],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Food Categories -->
      <app-food-category-slider></app-food-category-slider>

      <!-- Restaurant Chains Section -->
      <app-restaurant-chains></app-restaurant-chains>

      <!-- All Restaurants Section -->
      <app-restaurants></app-restaurants>

      <!-- Explore Section -->
      <app-explore-section></app-explore-section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding-top: 1rem;
      padding-bottom: 2rem;
    }
  `]
})
export class HomeComponent {}