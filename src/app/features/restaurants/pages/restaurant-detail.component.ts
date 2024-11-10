import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MenuItemComponent } from '../components/menu-item.component';
import { CartService } from '../../../core/services/cart.service';
import { FavoritesService } from '../../../core/services/favorites.service';
import { MenuSectionComponent } from '../components/menu-section.component';


interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  isVeg: boolean;
  rating?: number;
  isBestSeller?: boolean;
}

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
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-white">
      <div class="max-w-[800px] mx-auto px-4 lg:px-0 pt-20">
        <div class="text-sm text-gray-600 pb-4">
          Home / {{restaurant?.location}} / {{restaurant?.name}}
        </div>
        <h1 class="text-xl font-bold">{{restaurant?.name}}</h1>
<div class="bg-white rounded-[8px] mt-4 p-4 shadow-[rgba(28,28,28,0.15)_0px_4px_16px]">
  <div class="flex items-center gap-2">
    <span class="flex items-center justify-center w-5 h-5 bg-[#3d9b6d] rounded-full text-white shadow-[0_1px_5px_0_rgba(0,0,0,0.2)]">
      ★
    </span>
    <span class="font-bold text-[#3d9b6d]">{{ restaurant?.rating }}</span>
    <span class="text-[13px] text-[#8b8d97]">({{ restaurant?.rating }}K+ ratings)</span>
    <span class="text-[#8b8d97]">•</span>
    <span class="text-[13px] text-[#8b8d97]">₹350 for two</span>
  </div>

  <div class="text-[13px] text-[#7e808c] mt-2.5">{{ restaurant?.cuisines?.[0] }}</div>

  <div class="mt-3.5 text-[13px]">
    <div class="flex items-center gap-2">
      <span class="font-medium">Outlet</span>
      <span class="text-[#7e808c]">{{ restaurant?.location }}</span>
      <span class="text-[#7e808c]">▼</span>
    </div>
    <div class="text-[#7e808c] mt-1">40-50mins</div>
  </div>
</div>


        <!-- Deals Section -->
        <div class="mt-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Deals for you</h2>
            <div class="flex gap-2">
              <button class="w-9 h-9 rounded-full bg-[#E2E2E7] flex items-center justify-center">←</button>
              <button class="w-9 h-9 rounded-full bg-[#E2E2E7] flex items-center justify-center">→</button>
            </div>
          </div>

          <div class="flex gap-4 overflow-x-auto">
            @if (restaurant?.hasOffer) {
              <div class="flex-shrink-0 p-4 border border-[#e9e9eb] rounded-lg min-w-[240px] bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.08)]">
                <div class="flex items-center gap-3">
                  <div class="bg-[#f1f1f7] p-2 rounded">
                    <div class="text-[13px] font-medium text-[#686b78]">SAVE X2</div>
                  </div>
                  <div>
                    <p class="font-medium text-[15px]">Extra ₹25 Off</p>
                    <p class="text-[12px] text-[#93959f] mt-0.5">APPLICABLE OVER & ABOVE...</p>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 p-4 border border-[#e9e9eb] rounded-lg min-w-[240px] bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.08)]">
                <div class="flex items-center gap-3">
                  <div class="bg-[#fae6dd] p-2 rounded">
                    <div class="text-[13px] font-medium text-[#db6742]">DEAL OF DAY</div>
                  </div>
                  <div>
                    <p class="font-medium text-[15px]">Items At ₹189</p>
                    <p class="text-[12px] text-[#93959f] mt-0.5">ON SELECT ITEMS</p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Menu Section -->
        <div class="mt-8">
          <div class="text-center relative mb-8">
            <span class="bg-white px-4 text-[#282c3f] text-sm font-medium tracking-wider relative z-10">MENU</span>
            <div class="absolute top-1/2 left-0 right-0 h-[1px] bg-[#a9abb2] -z-0"></div>
          </div>

          <!-- Search Bar -->
          <div class="relative mb-8">
            <input 
              type="text"
              placeholder="Search for dishes..."
              class="w-full px-4 py-2.5 bg-[#f1f1f6] rounded-lg focus:outline-none text-sm placeholder:text-[#7e808c]"
            >
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[#7e808c]">🔍</span>
          </div>

          <!-- Filter Buttons -->
          <div class="flex gap-4 mb-6">
            <div class="flex items-center gap-2 px-4 py-2 border border-[#e9e9eb] rounded-full cursor-pointer">
              <span class="w-4 h-4 border border-green-600 flex items-center justify-center p-[2px]">
                <span class="w-full h-full bg-green-600"></span>
              </span>
              <span class="text-sm">Pure Veg</span>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 border border-[#e9e9eb] rounded-full cursor-pointer">
              <span class="w-4 h-4 border border-red-600 flex items-center justify-center p-[2px]">
                <span class="w-full h-full bg-red-600"></span>
              </span>
              <span class="text-sm">Non Veg</span>
            </div>
            <div class="px-4 py-2 border border-[#e9e9eb] rounded-full cursor-pointer">
              <span class="text-sm">Bestseller</span>
            </div>
          </div>

          <!-- Menu Items -->
          <div class="bg-white rounded-lg border border-[#e9e9eb] shadow-[0_4px_8px_0_rgba(0,0,0,0.08)]">
            @for (item of menuItems; track item.id) {
              <div class="p-5 border-b border-[#e9e9eb] last:border-0">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      @if (item.isVeg) {
                        <span class="w-4 h-4 border border-green-600 flex items-center justify-center p-[2px]">
                          <span class="w-full h-full bg-green-600"></span>
                        </span>
                      } @else {
                        <span class="w-4 h-4 border border-red-600 flex items-center justify-center p-[2px]">
                          <span class="w-full h-full bg-red-600"></span>
                        </span>
                      }
                      @if (item.isBestSeller) {
                        <span class="text-[#ee9c00] text-[13px] font-medium">★ Bestseller</span>
                      }
                    </div>
                    <h3 class="text-[#282c3f] text-base font-medium mt-2">{{item.name}}</h3>
                    <p class="text-[#282c3f] font-medium text-sm mt-1">₹{{item.price}}</p>
                    <p class="text-[#7e808c] text-sm mt-3 leading-[1.3]">{{item.description}}</p>
                  </div>
                  <div class="min-w-[118px] flex flex-col items-center">
                    <button 
                      (click)="addToCart(item)"
                      class="w-24 h-[34px] bg-white text-[#60b246] text-sm font-medium border border-[#d4d5d9] 
                             rounded-md hover:border-[#60b246] uppercase"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .overflow-x-auto::-webkit-scrollbar {
      display: none;
    }

    .overflow-x-auto {
      -ms-overflow-style: none;  
      scrollbar-width: none; 
    }
  `]
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant | undefined;
  menuItems: MenuItem[] = [];

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

  sampleMenuItems: Record<number, MenuItem[]> = {
    1: [ // Menu items for Pizza Hut
    {
      id: 1,
      restaurantId: 1,
      name: "Margherita Pizza",
      description: "Classic delight with 100% real mozzarella cheese",
      price: 249,
      category: "Pizzas",
      isVeg: true,
      isBestSeller: true
    },
    {
      id: 2,
      restaurantId: 1,
      name: "Pepperoni Pizza",
      description: "American classic with spicy pepperoni",
      price: 399,
      category: "Pizzas",
      isVeg: false,
      isBestSeller: true
    },
    {
      id: 3,
      restaurantId: 1,
      name: "Garlic Breadsticks",
      description: "Freshly baked breadsticks with garlic butter",
      price: 129,
      category: "Sides",
      isVeg: true
    },
    {
      id: 4,
      restaurantId: 1,
      name: "Spicy Chicken Wings",
      description: "Hot and spicy chicken wings",
      price: 349,
      category: "Starters",
      isVeg: false
    },
    {
      id: 5,
      restaurantId: 1,
      name: "Chocolate Lava Cake",
      description: "Warm, gooey chocolate cake",
      price: 149,
      category: "Desserts",
      isVeg: true
    }
  ],
  2: [ // Menu items for Chinese Wok
    {
      id: 6,
      restaurantId: 2,
      name: "Veg Manchurian",
      description: "Deep-fried vegetable balls in a spicy, sweet and tangy sauce",
      price: 179,
      category: "Starters",
      isVeg: true,
      isBestSeller: true
    },
    {
      id: 7,
      restaurantId: 2,
      name: "Schezwan Noodles",
      description: "Spicy noodles tossed with vegetables in schezwan sauce",
      price: 199,
      category: "Main Course",
      isVeg: true
    },
    {
      id: 8,
      restaurantId: 2,
      name: "Chicken Fried Rice",
      description: "Classic fried rice with chicken and vegetables",
      price: 219,
      category: "Main Course",
      isVeg: false
    },
    {
      id: 9,
      restaurantId: 2,
      name: "Spring Rolls",
      description: "Crispy rolls stuffed with vegetables",
      price: 149,
      category: "Starters",
      isVeg: true
    },
    {
      id: 10,
      restaurantId: 2,
      name: "Hot & Sour Soup",
      description: "Spicy and tangy soup with vegetables and tofu",
      price: 129,
      category: "Soups",
      isVeg: true
    }
  ],
  3: [ // Menu items for Domino's Pizza
    {
      id: 11,
      restaurantId: 3,
      name: "Farmhouse Pizza",
      description: "Delightful combination of onion, capsicum, tomato & grilled mushroom",
      price: 349,
      category: "Pizzas",
      isVeg: true,
      isBestSeller: true
    },
    {
      id: 12,
      restaurantId: 3,
      name: "Pepper Barbecue Chicken",
      description: "Pepper barbecue chicken with cheese",
      price: 399,
      category: "Pizzas",
      isVeg: false
    },
    {
      id: 13,
      restaurantId: 3,
      name: "Stuffed Garlic Bread",
      description: "Stuffed bread with cheese and jalapenos",
      price: 179,
      category: "Sides",
      isVeg: true
    },
    {
      id: 14,
      restaurantId: 3,
      name: "Chicken Wings",
      description: "Spicy chicken wings served with dip",
      price: 249,
      category: "Starters",
      isVeg: false
    },
    {
      id: 15,
      restaurantId: 3,
      name: "Chocolate Brownie",
      description: "Rich and gooey chocolate brownie",
      price: 159,
      category: "Desserts",
      isVeg: true
    }
  ],
  4: [ // Menu items for KFC
    {
      id: 16,
      restaurantId: 4,
      name: "Hot & Crispy Chicken",
      description: "Signature KFC fried chicken, crispy and juicy",
      price: 399,
      category: "Chicken",
      isVeg: false,
      isBestSeller: true
    },
    {
      id: 17,
      restaurantId: 4,
      name: "Popcorn Chicken",
      description: "Bite-sized pieces of fried chicken",
      price: 199,
      category: "Snacks",
      isVeg: false
    },
    {
      id: 18,
      restaurantId: 4,
      name: "Zinger Burger",
      description: "Spicy chicken fillet in a burger",
      price: 249,
      category: "Burgers",
      isVeg: false
    },
    {
      id: 19,
      restaurantId: 4,
      name: "Veg Rice Bowl",
      description: "Spicy rice bowl topped with crispy veggie strips",
      price: 179,
      category: "Bowls",
      isVeg: true
    },
    {
      id: 20,
      restaurantId: 4,
      name: "Chocolate Cake",
      description: "Moist chocolate cake slice",
      price: 149,
      category: "Desserts",
      isVeg: true
    }
  ],
  5: [ // Menu items for Wow China
    {
      id: 21,
      restaurantId: 5,
      name: "Hakka Noodles",
      description: "Stir-fried noodles with vegetables",
      price: 159,
      category: "Noodles",
      isVeg: true,
      isBestSeller: true
    },
    {
      id: 22,
      restaurantId: 5,
      name: "Chicken Lollipop",
      description: "Spicy chicken wings served with a tangy sauce",
      price: 229,
      category: "Starters",
      isVeg: false
    },
    {
      id: 23,
      restaurantId: 5,
      name: "Veg Spring Rolls",
      description: "Crispy rolls stuffed with mixed vegetables",
      price: 139,
      category: "Starters",
      isVeg: true
    },
    {
      id: 24,
      restaurantId: 5,
      name: "Chilli Chicken",
      description: "Fried chicken pieces in a spicy chilli sauce",
      price: 249,
      category: "Main Course",
      isVeg: false
    },
    {
      id: 25,
      restaurantId: 5,
      name: "Honey Noodles with Ice Cream",
      description: "Crispy honey-coated noodles served with vanilla ice cream",
      price: 179,
      category: "Desserts",
      isVeg: true
    }
  ],
   6: [ // Menu items for Big Bowl
    {
      id: 26,
      restaurantId: 6,
      name: "Chicken Burrito Bowl",
      description: "Grilled chicken served over a bed of rice with veggies and beans",
      price: 299,
      category: "Bowls",
      isVeg: false,
      isBestSeller: true
    },
    {
      id: 27,
      restaurantId: 6,
      name: "Veg Salad Bowl",
      description: "A healthy bowl with fresh vegetables and light dressing",
      price: 199,
      category: "Bowls",
      isVeg: true
    },
    {
      id: 28,
      restaurantId: 6,
      name: "Quinoa Power Bowl",
      description: "Protein-rich quinoa with mixed greens and chickpeas",
      price: 249,
      category: "Bowls",
      isVeg: true
    },
    {
      id: 29,
      restaurantId: 6,
      name: "BBQ Chicken Bowl",
      description: "Spicy BBQ chicken served with rice and vegetables",
      price: 329,
      category: "Bowls",
      isVeg: false
    },
    {
      id: 30,
      restaurantId: 6,
      name: "Fruit Salad Bowl",
      description: "Fresh seasonal fruits served with honey dressing",
      price: 149,
      category: "Desserts",
      isVeg: true
    }
  ],
  7: [ // Menu items for Cheesecake & Co
    {
      id: 31,
      restaurantId: 7,
      name: "Classic Cheesecake",
      description: "Rich and creamy cheesecake with a graham cracker crust",
      price: 249,
      category: "Desserts",
      isVeg: true,
      isBestSeller: true
    },
    {
      id: 32,
      restaurantId: 7,
      name: "Chocolate Truffle Cake",
      description: "Decadent chocolate cake with layers of chocolate ganache",
      price: 279,
      category: "Desserts",
      isVeg: true
    },
    {
      id: 33,
      restaurantId: 7,
      name: "Red Velvet Cheesecake",
      description: "Red velvet cheesecake with a hint of chocolate",
      price: 299,
      category: "Desserts",
      isVeg: true
    },
    {
      id: 34,
      restaurantId: 7,
      name: "Blueberry Cheesecake",
      description: "Cheesecake topped with fresh blueberry compote",
      price: 269,
      category: "Desserts",
      isVeg: true
    },
    {
      id: 35,
      restaurantId: 7,
      name: "Salted Caramel Cheesecake",
      description: "Rich cheesecake topped with salted caramel sauce",
      price: 289,
      category: "Desserts",
      isVeg: true
    }
  ],
  8: [ // Menu items for Daily Bowl
    {
      id: 36,
      restaurantId: 8,
      name: "Healthy Buddha Bowl",
      description: "A mix of grains, greens, and protein for a balanced meal",
      price: 299,
      category: "Bowls",
      isVeg: true,
      isBestSeller: true
    },
    {
      id: 37,
      restaurantId: 8,
      name: "Keto Chicken Salad",
      description: "Low-carb salad with grilled chicken and avocado",
      price: 349,
      category: "Salads",
      isVeg: false
    },
    {
      id: 38,
      restaurantId: 8,
      name: "Protein Power Bowl",
      description: "Protein-rich bowl with eggs, chickpeas, and greens",
      price: 279,
      category: "Bowls",
      isVeg: true
    },
    {
      id: 39,
      restaurantId: 8,
      name: "Berry Smoothie Bowl",
      description: "Smoothie bowl topped with fresh berries and granola",
      price: 199,
      category: "Desserts",
      isVeg: true
    },
    {
      id: 40,
      restaurantId: 8,
      name: "Green Detox Bowl",
      description: "Green veggies and herbs for a healthy detox",
      price: 229,
      category: "Bowls",
      isVeg: true
    }
  ],
  9: [ // Menu items for Goila Butter Chicken
    {
      id: 41,
      restaurantId: 9,
      name: "Classic Butter Chicken",
      description: "Creamy and flavorful butter chicken with a rich sauce",
      price: 399,
      category: "Main Course",
      isVeg: false,
      isBestSeller: true
    },
    {
      id: 42,
      restaurantId: 9,
      name: "Paneer Butter Masala",
      description: "Cottage cheese in a rich tomato-based curry",
      price: 349,
      category: "Main Course",
      isVeg: true
    },
    {
      id: 43,
      restaurantId: 9,
      name: "Garlic Naan",
      description: "Indian flatbread with garlic and butter",
      price: 49,
      category: "Breads",
      isVeg: true
    },
    {
      id: 44,
      restaurantId: 9,
      name: "Chicken Tikka",
      description: "Spiced chicken pieces cooked in a tandoor",
      price: 299,
      category: "Starters",
      isVeg: false
    },
    {
      id: 45,
      restaurantId: 9,
      name: "Dal Makhani",
      description: "Rich and creamy black lentils",
      price: 199,
      category: "Main Course",
      isVeg: true
    }
  ],
  10: [ // Menu items for Grameen Kulfi
    {
      id: 46,
      restaurantId: 10,
      name: "Mango Kulfi",
      description: "Classic Indian frozen dessert with mango flavor",
      price: 99,
      category: "Desserts",
      isVeg: true,
      isBestSeller: true
    },
    {
      id: 47,
      restaurantId: 10,
      name: "Pistachio Kulfi",
      description: "Rich and creamy pistachio-flavored kulfi",
      price: 99,
      category: "Desserts",
      isVeg: true
    },
    {
      id: 48,
      restaurantId: 10,
      name: "Malai Kulfi",
      description: "Traditional malai-flavored kulfi",
      price: 89,
      category: "Desserts",
      isVeg: true
    },
    {
      id: 49,
      restaurantId: 10,
      name: "Kesar Badam Kulfi",
      description: "Saffron and almond flavored kulfi",
      price: 109,
      category: "Desserts",
      isVeg: true
    },
    {
      id: 50,
      restaurantId: 10,
      name: "Rose Kulfi",
      description: "Rose-flavored kulfi for a floral touch",
      price: 89,
      category: "Desserts",
      isVeg: true
    }
  ],
   11: [ // Menu items for La Pino'z Pizza
    {
      id: 51,
      restaurantId: 11,
      name: "Mexican Green Wave",
      description: "Spicy Mexican seasoning with onions, capsicum, and jalapenos",
      price: 349,
      category: "Pizzas",
      isVeg: true,
      isBestSeller: true
    },
    {
      id: 52,
      restaurantId: 11,
      name: "Farm House",
      description: "Fresh veggies on a delicious cheese crust",
      price: 329,
      category: "Pizzas",
      isVeg: true
    },
    {
      id: 53,
      restaurantId: 11,
      name: "Pepperoni Deluxe",
      description: "A delight for pepperoni lovers",
      price: 399,
      category: "Pizzas",
      isVeg: false
    },
    {
      id: 54,
      restaurantId: 11,
      name: "Paneer Makhani Pizza",
      description: "Cottage cheese with a flavorful makhani sauce",
      price: 379,
      category: "Pizzas",
      isVeg: true
    },
    {
      id: 55,
      restaurantId: 11,
      name: "Chicken Supreme",
      description: "Loaded with chicken sausage, grilled chicken, and barbecue chicken",
      price: 429,
      category: "Pizzas",
      isVeg: false
    }
  ],
  12: [ // Menu items for Lean Kitchen
    {
      id: 56,
      restaurantId: 12,
      name: "Grilled Chicken Salad",
      description: "Healthy and delicious salad with grilled chicken and greens",
      price: 249,
      category: "Salads",
      isVeg: false,
      isBestSeller: true
    },
    {
      id: 57,
      restaurantId: 12,
      name: "Quinoa Bowl",
      description: "Quinoa mixed with fresh veggies and light dressing",
      price: 299,
      category: "Bowls",
      isVeg: true
    },
    {
      id: 58,
      restaurantId: 12,
      name: "Protein Power Smoothie",
      description: "Protein-rich smoothie with berries and nuts",
      price: 199,
      category: "Beverages",
      isVeg: true
    },
    {
      id: 59,
      restaurantId: 12,
      name: "Avocado Toast",
      description: "Whole grain toast topped with fresh avocado slices",
      price: 169,
      category: "Snacks",
      isVeg: true
    },
    {
      id: 60,
      restaurantId: 12,
      name: "Vegan Smoothie Bowl",
      description: "Delicious smoothie bowl with seasonal fruits and granola",
      price: 229,
      category: "Desserts",
      isVeg: true
    }
  ],
  13: [ // Menu items for McDonald's
    {
      id: 61,
      restaurantId: 13,
      name: "McSpicy Paneer",
      description: "Paneer patty with a spicy sauce in a soft bun",
      price: 149,
      category: "Burgers",
      isVeg: true,
      isBestSeller: true
    },
    {
      id: 62,
      restaurantId: 13,
      name: "Chicken McGrill",
      description: "Grilled chicken with fresh lettuce and mayonnaise",
      price: 129,
      category: "Burgers",
      isVeg: false
    },
    {
      id: 63,
      restaurantId: 13,
      name: "French Fries",
      description: "Crispy golden fries served with ketchup",
      price: 99,
      category: "Sides",
      isVeg: true
    },
    {
      id: 64,
      restaurantId: 13,
      name: "McAloo Tikki",
      description: "Spicy potato patty with lettuce and mayo in a bun",
      price: 99,
      category: "Burgers",
      isVeg: true
    },
    {
      id: 65,
      restaurantId: 13,
      name: "Chocolate Shake",
      description: "Rich chocolate milkshake topped with whipped cream",
      price: 149,
      category: "Beverages",
      isVeg: true
    }
  ],
  14: [ // Menu items for Mojo Pizza
    {
      id: 66,
      restaurantId: 14,
      name: "Pepperoni Feast",
      description: "Loaded with spicy pepperoni on a cheesy crust",
      price: 379,
      category: "Pizzas",
      isVeg: false,
      isBestSeller: true
    },
    {
      id: 67,
      restaurantId: 14,
      name: "BBQ Chicken Pizza",
      description: "Grilled chicken with BBQ sauce on a cheese pizza",
      price: 359,
      category: "Pizzas",
      isVeg: false
    },
    {
      id: 68,
      restaurantId: 14,
      name: "Farm Fresh",
      description: "Fresh vegetables with a rich tomato sauce base",
      price: 329,
      category: "Pizzas",
      isVeg: true
    },
    {
      id: 69,
      restaurantId: 14,
      name: "Paneer Overload",
      description: "Paneer and veggies on a tangy sauce",
      price: 349,
      category: "Pizzas",
      isVeg: true
    },
    {
      id: 70,
      restaurantId: 14,
      name: "Garlic Breadsticks",
      description: "Baked breadsticks with garlic and herbs",
      price: 139,
      category: "Sides",
      isVeg: true
    }
  ],
  15: [ // Menu items for NH1 Bowls
    {
      id: 71,
      restaurantId: 15,
      name: "Chicken Biryani Bowl",
      description: "Aromatic basmati rice with spiced chicken pieces",
      price: 279,
      category: "Bowls",
      isVeg: false,
      isBestSeller: true
    },
    {
      id: 72,
      restaurantId: 15,
      name: "Paneer Tikka Bowl",
      description: "Tandoori paneer served with rice and veggies",
      price: 259,
      category: "Bowls",
      isVeg: true
    },
    {
      id: 73,
      restaurantId: 15,
      name: "Mutton Biryani Bowl",
      description: "Flavorful mutton biryani with basmati rice",
      price: 349,
      category: "Bowls",
      isVeg: false
    },
    {
      id: 74,
      restaurantId: 15,
      name: "Falafel Bowl",
      description: "Crispy falafel served with hummus and pita",
      price: 239,
      category: "Bowls",
      isVeg: true
    },
    {
      id: 75,
      restaurantId: 15,
      name: "Veg Tawa Pulao",
      description: "Spiced rice with assorted veggies",
      price: 199,
      category: "Bowls",
      isVeg: true
    }
  ],
  16: [ // Menu items for Olio Pizza
    {
      id: 76,
      restaurantId: 16,
      name: "Margherita Pizza",
      description: "Classic pizza with mozzarella cheese and tomato sauce",
      price: 299,
      category: "Pizzas",
      isVeg: true,
      isBestSeller: true
    },
    {
      id: 77,
      restaurantId: 16,
      name: "BBQ Chicken Pizza",
      description: "Loaded with BBQ chicken and mozzarella cheese",
      price: 349,
      category: "Pizzas",
      isVeg: false
    },
    {
      id: 78,
      restaurantId: 16,
      name: "Vegetarian Supreme",
      description: "A variety of vegetables with a cheese topping",
      price: 329,
      category: "Pizzas",
      isVeg: true
    },
    {
      id: 79,
      restaurantId: 16,
      name: "Pepperoni Delight",
      description: "Spicy pepperoni on a classic cheese pizza",
      price: 379,
      category: "Pizzas",
      isVeg: false
    },
    {
      id: 80,
      restaurantId: 16,
      name: "Garlic Bread",
      description: "Classic garlic bread with herbs and butter",
      price: 129,
      category: "Sides",
      isVeg: true
    }
  ],
  17: [ // Menu items for Subway
    {
      id: 81,
      restaurantId: 17,
      name: "Veggie Delight Sub",
      description: "Fresh vegetables with sauces in a soft sub roll",
      price: 149,
      category: "Subs",
      isVeg: true,
      isBestSeller: true
    },
    {
      id: 82,
      restaurantId: 17,
      name: "Chicken Teriyaki Sub",
      description: "Chicken with teriyaki sauce and fresh veggies",
      price: 199,
      category: "Subs",
      isVeg: false
    },
    {
      id: 83,
      restaurantId: 17,
      name: "Tuna Sub",
      description: "Classic tuna with lettuce, tomatoes, and cucumbers",
      price: 219,
      category: "Subs",
      isVeg: false
    },
    {
      id: 84,
      restaurantId: 17,
      name: "Paneer Tikka Sub",
      description: "Spicy paneer with lettuce and sauces in a sub",
      price: 179,
      category: "Subs",
      isVeg: true
    },
    {
      id: 85,
      restaurantId: 17,
      name: "Veggie Patty Sub",
      description: "Vegetarian patty with fresh vegetables",
      price: 169,
      category: "Subs",
      isVeg: true
    }
  ],
  18: [ // Menu items for WeFit
    {
      id: 86,
      restaurantId: 18,
      name: "Protein Smoothie",
      description: "Smoothie packed with protein and fresh fruits",
      price: 159,
      category: "Beverages",
      isVeg: true,
      isBestSeller: true
    },
    {
      id: 87,
      restaurantId: 18,
      name: "Grilled Veggie Bowl",
      description: "Bowl filled with grilled veggies and quinoa",
      price: 219,
      category: "Bowls",
      isVeg: true
    },
    {
      id: 88,
      restaurantId: 18,
      name: "Chicken Caesar Salad",
      description: "Classic Caesar salad with grilled chicken",
      price: 249,
      category: "Salads",
      isVeg: false
    },
    {
      id: 89,
      restaurantId: 18,
      name: "Green Detox Juice",
      description: "A healthy green juice with spinach and cucumber",
      price: 129,
      category: "Beverages",
      isVeg: true
    },
    {
      id: 90,
      restaurantId: 18,
      name: "Vegan Power Bowl",
      description: "Power-packed bowl with tofu and vegetables",
      price: 239,
      category: "Bowls",
      isVeg: true
    }
  ],
  19: [ // Menu items for Zaza
    {
      id: 91,
      restaurantId: 19,
      name: "Zaza Kebab Platter",
      description: "Assorted kebabs with naan and chutney",
      price: 399,
      category: "Kebabs",
      isVeg: false,
      isBestSeller: true
    },
    {
      id: 92,
      restaurantId: 19,
      name: "Paneer Tikka",
      description: "Grilled paneer cubes with spices",
      price: 289,
      category: "Kebabs",
      isVeg: true
    },
    {
      id: 93,
      restaurantId: 19,
      name: "Chicken Seekh Kebab",
      description: "Minced chicken with spices grilled to perfection",
      price: 349,
      category: "Kebabs",
      isVeg: false
    },
    {
      id: 94,
      restaurantId: 19,
      name: "Mutton Boti Kebab",
      description: "Juicy mutton pieces marinated in spices",
      price: 419,
      category: "Kebabs",
      isVeg: false
    },
    {
      id: 95,
      restaurantId: 19,
      name: "Falafel Plate",
      description: "Crispy falafel served with hummus and pita",
      price: 229,
      category: "Snacks",
      isVeg: true
    }
  ], 20: [ // Menu items for Zaza
    {
      id: 96,
      restaurantId: 20,
      name: "Lamb Shish Kebab",
      description: "Tender lamb pieces marinated with middle eastern spices",
      price: 429,
      category: "Kebabs",
      isVeg: false,
      isBestSeller: true
    },
    {
      id: 97,
      restaurantId: 20,
      name: "Falafel Wrap",
      description: "Falafel wrapped in pita with tahini sauce",
      price: 219,
      category: "Wraps",
      isVeg: true
    },
    {
      id: 98,
      restaurantId: 20,
      name: "Mixed Grill Platter",
      description: "An assortment of grilled chicken, lamb, and beef kebabs",
      price: 529,
      category: "Platters",
      isVeg: false
    },
    {
      id: 99,
      restaurantId: 20,
      name: "Hummus with Pita",
      description: "Creamy hummus served with warm pita bread",
      price: 159,
      category: "Sides",
      isVeg: true
    },
    {
      id: 100,
      restaurantId: 20,
      name: "Baba Ghanoush",
      description: "Smoky eggplant dip served with pita",
      price: 169,
      category: "Sides",
      isVeg: true
    }
  ]
  };

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) {}
  isFavorite(menuItemId: number): boolean {
    return this.favoritesService.isFavorite(menuItemId);
  }

toggleFavorite(menuItem: MenuItem, restaurant: Restaurant): { success: boolean; message: string } {
  try {
    const isCurrentlyFavorite = this.favoritesService.isFavorite(menuItem.id);
    
    if (isCurrentlyFavorite) {
      this.favoritesService.removeFromFavorites(menuItem.id);
      return {
        success: true,
        message: `Removed ${menuItem.name} from favorites`
      };
    }

    if (!menuItem?.id || !restaurant?.id || !menuItem?.name || !restaurant?.name) {
      return {
        success: false,
        message: 'Missing required item or restaurant information'
      };
    }

    this.favoritesService.addToFavorites(menuItem, restaurant);
    return {
      success: true,
      message: `Added ${menuItem.name} to favorites`
    };
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return {
      success: false,
      message: 'Failed to update favorites'
    };
  }
}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.loadRestaurantDetails(id);
      this.loadMenuItems(id);
    });
  }

  loadRestaurantDetails(restaurantId: number) {
    this.restaurant = this.restaurants.find(r => r.id === restaurantId);
  }

  loadMenuItems(restaurantId: number) {
    this.menuItems = this.sampleMenuItems[restaurantId] || [];
  }

  addToCart(item: MenuItem) {
    this.cartService.addToCart(item);
  }
}