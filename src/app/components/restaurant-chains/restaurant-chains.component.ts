import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import { inject } from '@angular/core'; 


interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisines: string[];
  location: string;
  hasOffer?: boolean;
  offerText?: string;
}

@Component({
  selector: 'app-restaurant-chains',
  standalone: true,
  imports: [CommonModule,RouterModule],
  template: `
<div class="restaurant-section">
      <div class="header-container">
        <h2 class="section-title">Top restaurant chains in Mumbai</h2>
        <div class="nav-buttons">
          <button class="nav-button prev" (click)="slide('prev')" [class.disabled]="currentIndex === 0">
            ←
          </button>
          <button class="nav-button next" (click)="slide('next')"
                  [class.disabled]="currentIndex >= restaurants.length - itemsToShow">
            →
          </button>
        </div>
      </div>

      <div class="restaurants-wrapper">
        <div class="restaurants" [style.transform]="'translateX(' + translateX + 'px)'">
          @for (restaurant of restaurants; track restaurant.id) {
            <div class="restaurant-item" (click)="goToMenu(restaurant.id)">
              <div class="restaurant-image">
                <img [src]="restaurant.image" [alt]="restaurant.name">
                @if (restaurant.hasOffer) {
                  <div class="offer-banner">
                    <span>{{restaurant.offerText}}</span>
                  </div>
                }
              </div>
              <div class="restaurant-info">
                <h3 class="restaurant-name">{{restaurant.name}}</h3>
                <div class="rating">
                  <span class="star-circle">
                    <span class="star">★</span> 
                  </span>
                  <span>{{restaurant.rating}}</span> • 
                  <span class="delivery-time">{{restaurant.deliveryTime}}</span> 
                </div>
                <div class="cuisines">{{restaurant.cuisines.join(', ')}}</div>
                <div class="location">{{restaurant.location}}</div>
              </div>
            </div>
          }
        </div>
      </div>

      <div class="line-container">
        <hr class="custom-hr">
      </div>
    </div>
  `,
  styles: [`
    .restaurant-section {
      max-width: 1200px;
      margin: 40px auto;
      padding: 0 20px;
      position: relative;
    }

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .section-title {
      font-size: 24px;
      font-weight: 600;
      color: #282c3f;
    }

    .nav-buttons {
      display: flex;
      gap: 8px;
    }

    .nav-button {
      background: #E2E2E7;
      border: none;
      padding: 8px 12px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      transition: background 0.3s;
    }

    .nav-button:hover {
      background: #d4d5d9;
    }

    .nav-button.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .restaurants-wrapper {
      overflow: hidden;
      width: 100%;
    }

    .restaurants {
      display: flex;
      transition: transform 0.3s ease;
    }

    .restaurant-item {
      flex: 0 0 280px;
      margin-right: 32px;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .restaurant-item:hover {
      transform: scale(0.98);
    }

    .restaurant-image {
      position: relative;
      width: 100%;
      height: 160px;
      overflow: hidden;
      border-radius: 8px;
    }

    .restaurant-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .restaurant-image:hover img {
      transform: scale(1.05);
    }

    .offer-banner {
      position: absolute;
      bottom: 8px;
      left: 8px;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    .restaurant-info {
      margin-top: 12px;
    }

    .restaurant-name {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .rating {
      font-size: 14px;
      color: #888;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
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

    .delivery-time {
      font-weight: bold;
      color: #000;
    }

    .cuisines,
    .location {
      font-size: 13px;
      color: #666;
      margin-top: 2px;
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
      width: 100%;
      margin-left: 0;
    }
  `]
})
export class RestaurantChainsComponent {
constructor(private router: Router) {}

  goToMenu(restaurantId: number) {
    this.router.navigate(['/restaurant', restaurantId]);
  }
  
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
    hasOffer: false
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
    hasOffer: false
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
    hasOffer: false
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
    hasOffer: false
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

  currentIndex = 0;
  itemsToShow = 4;
  itemWidth = 312; 
  translateX = 0;

  

slide(direction: 'prev' | 'next') {
  const itemsToSlide = 3; 
  const maxIndex = this.restaurants.length - this.itemsToShow;

  if (direction === 'prev' && this.currentIndex > 0) {
    this.currentIndex = Math.max(this.currentIndex - itemsToSlide, 0);
    this.translateX += this.itemWidth * itemsToSlide;
  } else if (direction === 'next' && this.currentIndex < maxIndex) {
    this.currentIndex = Math.min(this.currentIndex + itemsToSlide, maxIndex); 
    this.translateX -= this.itemWidth * itemsToSlide;
  }
}
}
