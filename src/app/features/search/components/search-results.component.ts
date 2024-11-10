import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchService, SearchResult } from '../../../core/services/search.service';
import { CartService } from '../../../core/services/cart.service';
import { MenuItem } from '../../../core/interfaces';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-4xl mx-auto p-4">
      <!-- Filters Section -->
      <div class="mb-6 flex flex-wrap gap-4">
        <button 
          (click)="filterByDiet(true)"
          class="px-4 py-2 rounded-full border"
          [class.bg-green-500]="activeFilters.veg"
          [class.text-white]="activeFilters.veg">
          Veg Only
        </button>
        <button 
          (click)="filterByDiet(false)"
          class="px-4 py-2 rounded-full border"
          [class.bg-red-500]="activeFilters.nonVeg"
          [class.text-white]="activeFilters.nonVeg">
          Non-Veg
        </button>
        <button 
          (click)="filterByRating(4)"
          class="px-4 py-2 rounded-full border"
          [class.bg-yellow-500]="activeFilters.topRated"
          [class.text-white]="activeFilters.topRated">
          Top Rated (4+)
        </button>
      </div>

      <!-- Results Section -->
      <div class="space-y-6">
        @if (searchResults().length > 0) {
          @for (result of searchResults(); track result.menuItem.id) {
            <div class="bg-white rounded-lg shadow-md p-4">
              <div class="flex justify-between">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold">{{result.menuItem.name}}</h3>
                  <p class="text-sm text-gray-600">{{result.restaurant.name}}</p>
                  <p class="text-sm text-gray-500">{{result.menuItem.description}}</p>
                  <div class="mt-2 flex items-center gap-4">
                    <span class="font-medium">₹{{result.menuItem.price}}</span>
                    @if (result.menuItem.isVeg) {
                      <span class="text-green-600 text-sm">🟢 Veg</span>
                    } @else {
                      <span class="text-red-600 text-sm">🔴 Non-Veg</span>
                    }
                    <span class="text-sm">⭐ {{result.restaurant.rating}}</span>
                  </div>
                </div>
                <div class="flex flex-col items-end gap-2">
                  <button 
                    (click)="addToCart(result.menuItem)"
                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          }
        } @else {
          <div class="text-center py-8 text-gray-500">
            No results found
          </div>
        }
      </div>
    </div>
  `
})
export class SearchResultsComponent {
  private searchService = inject(SearchService);
  private cartService = inject(CartService);
  
  searchResults = this.searchService.getSearchResultsSignal();
  
  activeFilters = {
    veg: false,
    nonVeg: false,
    topRated: false
  };

  filterByDiet(isVeg: boolean) {
    if (isVeg) {
      this.activeFilters.veg = !this.activeFilters.veg;
      this.activeFilters.nonVeg = false;
    } else {
      this.activeFilters.nonVeg = !this.activeFilters.nonVeg;
      this.activeFilters.veg = false;
    }

    if (!this.activeFilters.veg && !this.activeFilters.nonVeg) {
      this.searchService.search(''); 
    } else {
      this.searchService.filterByDiet(isVeg);
    }
  }

  filterByRating(rating: number) {
    this.activeFilters.topRated = !this.activeFilters.topRated;
    if (this.activeFilters.topRated) {
      this.searchService.filterByRestaurantRating(rating);
    } else {
      this.searchService.search(''); 
    }
  }

  addToCart(menuItem: MenuItem) {
    this.cartService.addToCart(menuItem);
  }
}