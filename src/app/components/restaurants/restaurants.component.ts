import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; 

interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisines: string[];
  location: string;
  hasOffer: boolean;
  offerText: string;
}

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule,RouterModule],
  template: `
  <div class="container">
  <h1 class="heading">Restaurants with online food delivery in Mumbai</h1>

  <!-- Filters Section -->
  <div class="filters-container">
    <div class="filters-wrapper">
      <button class="filter-btn">
        <span class="filter-icon">⚡</span>
        Filter
      </button>

      <div class="filter-chip sort-by" (click)="toggleSortOptions()">
        <span>{{ selectedSort }}</span>
        <span class="arrow-down">▼</span>
        
        <div class="sort-options" *ngIf="showSortOptions">
          <div class="sort-option" 
               *ngFor="let option of sortOptions"
               (click)="selectSortOption(option)">
            {{ option }}
          </div>
        </div>
      </div>

      <div class="filter-chips">
        <div class="filter-chip" 
             *ngFor="let filter of filters"
             [class.active]="filter.isActive"
             (click)="toggleFilter(filter)">
          {{ filter.label }}
        </div>
      </div>
    </div>
  </div>

 <!-- Restaurants Grid -->
<div class="min-h-screen bg-cover bg-center pt-20" style="background-image: url('path-to-your-background-image.jpg');">
  <div class="max-w-6xl mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-4 text-white">Restaurants</h1>

    <!-- Grid Layout for Restaurants with Transparent Background -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div 
        class="restaurant-card cursor-pointer overflow-hidden rounded-lg"
        *ngFor="let restaurant of filteredRestaurants"
        (click)="goToMenu(restaurant.id)"
      >
        <div class="card-image relative">
          <img 
            [src]="restaurant.image" 
            [alt]="restaurant.name" 
            class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          >
          <div 
            class="offer-badge absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
            *ngIf="restaurant.hasOffer"
          >
            {{ restaurant.offerText }}
          </div>
        </div>
        
        <div class="p-4">
          <h3 class="restaurant-name font-bold text-lg mb-1 text-white">{{ restaurant.name }}</h3>
          <div class="rating-time flex items-center text-sm text-white">
            <span class="star-circle flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full mr-2">
              ★
            </span>
            <span class="rating">{{ restaurant.rating }}</span>
            <span class="dot mx-2">•</span>
            <span class="delivery-time">{{ restaurant.deliveryTime }}</span>
          </div>
          <div class="cuisines text-sm text-gray-200 mt-2">{{ restaurant.cuisines.join(', ') }}</div>
          <div class="location text-sm text-gray-200">{{ restaurant.location }}</div>
        </div>
      </div>
    </div>

    <div class="line-container mt-8">
      <hr class="custom-hr border-t border-gray-300">
    </div>
  </div>
</div>


  `,
  styles: [`
  .cursor-pointer {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.cursor-pointer:hover {
  transform: scale(0.98);
}
.line-container {
  display: flex;
  justify-content: flex-start; 
  margin-top: 16px; 
}

.custom-hr {
  border: none; 
  height: 1px; 
  background-color: #e6e6e6; 
  width: 90%; 
  margin-left: 5%; 
}

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .heading {
      font-size: 24px;
      font-weight: 600;
      color: #3d4152;
      margin-bottom: 20px;
    }

    .filters-container {
      padding: 16px 0;
      border-bottom: 1px solid #e9e9eb;
      background: #fff;
      margin-bottom: 20px;
    }

    .filters-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      overflow-x: auto;
      padding: 0 20px;
    }

    .filter-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border: 1px solid #e9e9eb;
      border-radius: 18px;
      background: transparent;
      font-size: 14px;
      color: #3d4152;
      cursor: pointer;
    }

    .filter-chips {
      display: flex;
      gap: 12px;
      flex-wrap: nowrap;
    }

    .filter-chip {
      padding: 8px 12px;
      border: 1px solid #e9e9eb;
      border-radius: 18px;
      font-size: 14px;
      color: #3d4152;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.3s ease;
    }

    .filter-chip:hover {
      background: #f2f2f2;
    }

    .filter-chip.active {
      background: #3d4152;
      color: #fff;
      border-color: #3d4152;
    }

    .restaurants-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 32px;
      padding: 20px 0;
    }

    .restaurant-card {
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .restaurant-card:hover {
      transform: scale(0.98);
    }

    .card-image {
      position: relative;
      aspect-ratio: 16/9;
      overflow: hidden;
      border-radius: 16px;
    }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .offer-badge {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(rgba(27, 30, 36, 0) 0%, rgb(27, 30, 36) 84.21%);
      color: white;
      padding: 12px;
      font-size: 14px;
      font-weight: 600;
    }

    .card-content {
      padding: 12px 0;
    }

    .restaurant-name {
      font-size: 18px;
      font-weight: 600;
      color: #3d4152;
      margin-bottom: 8px;
    }

.rating-time {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  
}
.star-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #28a745;
}
.star {
  color: #fff; 
  font-size: 12px;
}

.rating {
  color: #3d4152;
  font-weight: 600; 
}

.dot {
  color: #93959f;
}

.delivery-time {
  color: #000; 
  font-weight: bold;
}


    .cuisines {
      color: #93959f;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .location {
      color: #93959f;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .filters-wrapper {
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      .filters-wrapper::-webkit-scrollbar {
        display: none;
      }

      .restaurants-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
      }
    }
  `]
})
export class RestaurantsComponent {
  constructor(private router: Router) {}
  goToMenu(restaurantId: number) {
  this.router.navigate(['/restaurant', restaurantId]);
}
  showSortOptions = false;
  selectedSort = 'Relevance';
  
  sortOptions = [
    'Relevance',
    'Delivery Time',
    'Rating',
    'Cost: Low to High',
    'Cost: High to Low'
  ];

  filters = [
    { id: 'fast-delivery', label: 'Fast Delivery', value: 'delivery', isActive: false },
    { id: 'new-on-swiggy', label: 'New on Swiggy', value: 'new', isActive: false },
    { id: 'ratings', label: 'Ratings 4.0+', value: 'ratings', isActive: false },
    { id: 'pure-veg', label: 'Pure Veg', value: 'veg', isActive: false },
    { id: 'offers', label: 'Offers', value: 'offers', isActive: false },
    { id: 'price-300-600', label: 'Rs. 300-Rs. 600', value: 'price-mid', isActive: false },
    { id: 'price-under-300', label: 'Less than Rs. 300', value: 'price-low', isActive: false }
  ];

  restaurants: Restaurant[] = [
    {
    id: 1,
    name: 'Pizza Hut',
    image: './assets/chains/pizzahut.png',
    rating: 4.1,
    deliveryTime: '25-30 mins',
    cuisines: ['Pizzas'],
    location: 'Mira Road',
    hasOffer: true,
    offerText: '50% OFF UPTO ₹100'
  },
  {
    id: 2,
    name: 'Chinese Wok',
    image: './assets/chains/chinesewok.png',
    rating: 4.2,
    deliveryTime: '30-35 mins',
    cuisines: ['Chinese', 'Asian', 'Tibetan', 'Desserts'],
    location: 'Mira Road',
    hasOffer: true,
    offerText: 'ITEMS AT ₹179'
  },
  {
    id: 3,
    name: 'Domino\'s Pizza',
    image: './assets/chains/dominos.png',
    rating: 4.3,
    deliveryTime: '20-25 mins',
    cuisines: ['Pizzas', 'Italian', 'Pastas', 'Desserts'],
    location: 'Mira Road',
    hasOffer: true,
    offerText: '₹125 OFF ABOVE ₹1199'
  },
  {
    id: 4,
    name: 'KFC',
    image: './assets/chains/kfc.png',
    rating: 4.3,
    deliveryTime: '20-25 mins',
    cuisines: ['Burgers', 'Fast Food', 'Rolls & Wraps'],
    location: 'Mira Road',
    hasOffer: true,
    offerText: 'ITEMS AT ₹179'
  },
  {
    id: 5,
    name: 'Wow China',
    image: './assets/chains/wowchina.png',
    rating: 4.0,
    deliveryTime: '25-30 mins',
    cuisines: ['Chinese', 'Street Food'],
    location: 'Andheri',
    hasOffer: true,
    offerText: '20% OFF'
  },
  {
    id: 6,
    name: 'Big Bowl',
    image: './assets/chains/bigbowl.png',
    rating: 3.8,
    deliveryTime: '30-35 mins',
    cuisines: ['Bowls', 'Healthy'],
    location: 'Borivali',
    hasOffer: false,
    offerText: ''
  },
  {
    id: 7,
    name: 'Burger King',
    image: './assets/chains/burgerking.png',
    rating: 4.1,
    deliveryTime: '20-25 mins',
    cuisines: ['Burgers', 'Fast Food'],
    location: 'Mira Road',
    hasOffer: true,
    offerText: 'Buy 1 Get 1 Free'
  },
  {
    id: 8,
    name: 'Cheesecake & Co',
    image: './assets/chains/cheesecake.png',
    rating: 4.5,
    deliveryTime: '35-40 mins',
    cuisines: ['Desserts'],
    location: 'Juhu',
    hasOffer: true,
    offerText: 'Flat ₹50 OFF'
  },
  {
    id: 9,
    name: 'Daily Bowl',
    image: './assets/chains/daily.png',
    rating: 4.2,
    deliveryTime: '25-30 mins',
    cuisines: ['Healthy', 'Bowls'],
    location: 'Kandivali',
    hasOffer: true,
    offerText: 'Up to ₹100 OFF'
  },
  {
    id: 10,
    name: 'Goila Butter Chicken',
    image: './assets/chains/goila.png',
    rating: 4.3,
    deliveryTime: '30-35 mins',
    cuisines: ['North Indian', 'Fast Food'],
    location: 'Mira Road',
    hasOffer: true,
    offerText: 'Free Dessert with Meals'
  },
  {
    id: 11,
    name: 'Grameen Kulfi',
    image: './assets/chains/grameen.png',
    rating: 4.6,
    deliveryTime: '15-20 mins',
    cuisines: ['Desserts', 'Ice Cream'],
    location: 'Dadar',
    hasOffer: false,
    offerText: ''
  },
  {
    id: 12,
    name: 'La Pino\'z Pizza',
    image: './assets/chains/lapino.png',
    rating: 4.4,
    deliveryTime: '20-25 mins',
    cuisines: ['Pizzas', 'Italian'],
    location: 'Goregaon',
    hasOffer: true,
    offerText: 'Up to ₹150 OFF'
  },
  {
    id: 13,
    name: 'Lean Kitchen',
    image: './assets/chains/lean.png',
    rating: 4.2,
    deliveryTime: '30-35 mins',
    cuisines: ['Healthy', 'Salads'],
    location: 'Powai',
    hasOffer: false,
    offerText: ''
  },
  {
    id: 14,
    name: 'McDonald\'s',
    image: './assets/chains/mcd.png',
    rating: 4.1,
    deliveryTime: '20-25 mins',
    cuisines: ['Burgers', 'Fast Food'],
    location: 'Mira Road',
    hasOffer: true,
    offerText: '₹50 OFF on Orders Above ₹500'
  },
  {
    id: 15,
    name: 'Mojo Pizza',
    image: './assets/chains/mojopizza.png',
    rating: 4.5,
    deliveryTime: '25-30 mins',
    cuisines: ['Pizzas', 'Italian'],
    location: 'Vile Parle',
    hasOffer: true,
    offerText: 'Buy 1 Get 1 Free'
  },
  {
    id: 16,
    name: 'NH1 Bowls',
    image: './assets/chains/nh1bowls.png',
    rating: 4.0,
    deliveryTime: '30-35 mins',
    cuisines: ['North Indian', 'Bowls'],
    location: 'Santacruz',
    hasOffer: true,
    offerText: 'Flat ₹100 OFF'
  },
  {
    id: 17,
    name: 'Olio Pizza',
    image: './assets/chains/olio.png',
    rating: 4.3,
    deliveryTime: '20-25 mins',
    cuisines: ['Pizzas', 'Italian'],
    location: 'Andheri',
    hasOffer: false,
    offerText: ''
  },
  {
    id: 18,
    name: 'Subway',
    image: './assets/chains/subway.png',
    rating: 4.2,
    deliveryTime: '15-20 mins',
    cuisines: ['Healthy', 'Sandwiches'],
    location: 'Thane',
    hasOffer: true,
    offerText: 'Free Cookie with Meal'
  },
  {
    id: 19,
    name: 'WeFit',
    image: './assets/chains/wefit.png',
    rating: 4.0,
    deliveryTime: '25-30 mins',
    cuisines: ['Healthy', 'Salads'],
    location: 'Malad',
    hasOffer: true,
    offerText: '20% OFF'
  },
  {
    id: 20,
    name: 'Zaza',
    image: './assets/chains/zaza.png',
    rating: 4.4,
    deliveryTime: '30-35 mins',
    cuisines: ['Kebabs', 'Grills'],
    location: 'Colaba',
    hasOffer: true,
    offerText: 'Flat ₹200 OFF on Orders Above ₹1500'
  }
];


  get filteredRestaurants() {
    return this.applyFilters(this.restaurants);
  }

  toggleSortOptions(): void {
    this.showSortOptions = !this.showSortOptions;
  }

  selectSortOption(option: string): void {
    this.selectedSort = option;
    this.showSortOptions = false;
    this.sortRestaurants();
  }

  toggleFilter(filter: any): void {
    filter.isActive = !filter.isActive;
  }

  private applyFilters(restaurants: Restaurant[]): Restaurant[] {
    let filtered = [...restaurants];
    
    const activeFilters = this.filters.filter(f => f.isActive);
    
    if (activeFilters.length === 0) return filtered;

    activeFilters.forEach(filter => {
      switch (filter.value) {
        case 'delivery':
          filtered = filtered.filter(r => 
            parseInt(r.deliveryTime.split('-')[0]) <= 30);
          break;
        case 'ratings':
          filtered = filtered.filter(r => r.rating >= 4.0);
          break;
        case 'offers':
          filtered = filtered.filter(r => r.hasOffer);
          break;
        // Add more filter cases as needed
      }
    });

    return filtered;
  }

  private sortRestaurants(): void {
    this.restaurants.sort((a, b) => {
      switch (this.selectedSort) {
        case 'Rating':
          return b.rating - a.rating;
        case 'Delivery Time':
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        // Add more sorting cases
        default:
          return 0;
      }
    });
  }
}