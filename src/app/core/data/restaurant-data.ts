// src/app/core/data/restaurant-data.ts
import { Restaurant } from '../interfaces/restaurant.interface';
import { MenuItem } from '../interfaces/menu-item.interface';

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Chinese Wok',
     image: './assets/chains/chinesewok.png',
    rating: 4.2,
    deliveryTime: '25-30 mins',
    cuisines: ['Chinese', 'Asian', 'Tibetan', 'Desserts'],
    location: 'Mira Road',
    hasOffer: true,
    offerText: 'ITEMS AT ₹179'
  },
  {
    id: 2,
    name: 'Burger King',
     image: './assets/chains/burgerking.png',
    rating: 4.1,
    deliveryTime: '20-25 mins',
    cuisines: ['Burgers', 'Fast Food'],
    location: 'Mira Road',
    hasOffer: true,
    offerText: 'Buy 1 Get 1 Free'
  }
];

export const menuItems: Record<number, MenuItem[]> = {
  2: [ 
    {
      id: 1,
      restaurantId: 2,
      name: "BK Chicken Pizza Puff",
      description: "Crispy puff snack filled with juicy diced chicken, tasty mix veg tomato sauce and mozzarella",
      price: 89,
      category: "Snacks",
      isVeg: false,
      isBestSeller: true
    },
    {
      id: 2,
      restaurantId: 2,
      name: "Chicken Wing Deal",
      description: "Save Rs 108 on 11 pcs Boneless Bites",
      price: 329,
      category: "Chicken",
      isVeg: false,
      isBestSeller: true
    },
    {
      id: 3,
      restaurantId: 2,
      name: "Classic Family Feast for 4 - Veg",
      description: "Save Rs. 200 | 2 Crispy Veg + BK Veggie + Veg Crunchy Taco + 2 Med Fries + 2 Dips + Coca Cola Medium + Chocolate Thick Shake",
      price: 731,
      category: "Family Meals",
      isVeg: true,
      rating: 3.6
    },
    {
      id: 4,
      restaurantId: 2,
      name: "Premium Family Feast for 4 - Chicken",
      description: "Save Rs. 200 | Premium chicken burgers combo with sides and beverages",
      price: 982,
      category: "Family Meals",
      isVeg: false,
      rating: 4.1
    },
    {
      id: 5,
      restaurantId: 2,
      name: "Crispy Veg Combo",
      description: "Save 47% with Medium Fries + Coca Cola",
      price: 129,
      category: "Combos",
      isVeg: true,
      isBestSeller: true
    }
  ],
  1: [ // Chinese Wok Menu
    {
      id: 6,
      restaurantId: 1,
      name: "Veg Manchurian",
      description: "Deep-fried vegetable balls in a spicy, sweet and tangy sauce",
      price: 179,
      category: "Starters",
      isVeg: true,
      isBestSeller: true
    },
    {
      id: 7,
      restaurantId: 1,
      name: "Schezwan Noodles",
      description: "Spicy noodles tossed with vegetables in schezwan sauce",
      price: 189,
      category: "Noodles",
      isVeg: true,
      rating: 4.3
    },
    {
      id: 8,
      restaurantId: 1,
      name: "Chicken Fried Rice",
      description: "Classic fried rice with chicken and vegetables",
      price: 199,
      category: "Rice",
      isVeg: false,
      isBestSeller: true
    },
    {
      id: 9,
      restaurantId: 1,
      name: "Mixed Chowmein",
      description: "Stir-fried noodles with chicken, prawns and vegetables",
      price: 219,
      category: "Noodles",
      isVeg: false,
      rating: 4.5
    },
    {
      id: 10,
      restaurantId: 1,
      name: "Honey Chilli Potato",
      description: "Crispy potato strips tossed in honey and chilli sauce",
      price: 169,
      category: "Starters",
      isVeg: true,
      isBestSeller: true
    }
  ]
};

export function getMenuItems(restaurantId: number): MenuItem[] {
  return menuItems[restaurantId] || [];
}
