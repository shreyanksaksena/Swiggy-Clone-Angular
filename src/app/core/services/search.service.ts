import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item.interface';
import { Restaurant } from '../interfaces/restaurant.interface';

export interface SearchResult {
  menuItem: MenuItem;
  restaurant: Restaurant;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchResults = signal<SearchResult[]>([]);

  public getSearchResultsSignal() {
    return this.searchResults;
  }
  private restaurantsData: Restaurant[] = [
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

  private menuItemsData: Record<number, MenuItem[]> = {
    1: [ // Menu items for Pizza Hut
    {
        id: 1,
        restaurantId: 1,
        name: "Margherita Pizza",
        description: "Classic delight with 100% real mozzarella cheese",
        price: 249,
        category: "Pizzas",
        isVeg: true,
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 2,
        restaurantId: 1,
        name: "Pepperoni Pizza",
        description: "American classic with spicy pepperoni",
        price: 399,
        category: "Pizzas",
        isVeg: false,
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 3,
        restaurantId: 1,
        name: "Garlic Breadsticks",
        description: "Freshly baked breadsticks with garlic butter",
        price: 129,
        category: "Sides",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 4,
        restaurantId: 1,
        name: "Spicy Chicken Wings",
        description: "Hot and spicy chicken wings",
        price: 349,
        category: "Starters",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 5,
        restaurantId: 1,
        name: "Chocolate Lava Cake",
        description: "Warm, gooey chocolate cake",
        price: 149,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 7,
        restaurantId: 2,
        name: "Schezwan Noodles",
        description: "Spicy noodles tossed with vegetables in schezwan sauce",
        price: 199,
        category: "Main Course",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 8,
        restaurantId: 2,
        name: "Chicken Fried Rice",
        description: "Classic fried rice with chicken and vegetables",
        price: 219,
        category: "Main Course",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 9,
        restaurantId: 2,
        name: "Spring Rolls",
        description: "Crispy rolls stuffed with vegetables",
        price: 149,
        category: "Starters",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 10,
        restaurantId: 2,
        name: "Hot & Sour Soup",
        description: "Spicy and tangy soup with vegetables and tofu",
        price: 129,
        category: "Soups",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 12,
        restaurantId: 3,
        name: "Pepper Barbecue Chicken",
        description: "Pepper barbecue chicken with cheese",
        price: 399,
        category: "Pizzas",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 13,
        restaurantId: 3,
        name: "Stuffed Garlic Bread",
        description: "Stuffed bread with cheese and jalapenos",
        price: 179,
        category: "Sides",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 14,
        restaurantId: 3,
        name: "Chicken Wings",
        description: "Spicy chicken wings served with dip",
        price: 249,
        category: "Starters",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 15,
        restaurantId: 3,
        name: "Chocolate Brownie",
        description: "Rich and gooey chocolate brownie",
        price: 159,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 17,
        restaurantId: 4,
        name: "Popcorn Chicken",
        description: "Bite-sized pieces of fried chicken",
        price: 199,
        category: "Snacks",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 18,
        restaurantId: 4,
        name: "Zinger Burger",
        description: "Spicy chicken fillet in a burger",
        price: 249,
        category: "Burgers",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 19,
        restaurantId: 4,
        name: "Veg Rice Bowl",
        description: "Spicy rice bowl topped with crispy veggie strips",
        price: 179,
        category: "Bowls",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 20,
        restaurantId: 4,
        name: "Chocolate Cake",
        description: "Moist chocolate cake slice",
        price: 149,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 22,
        restaurantId: 5,
        name: "Chicken Lollipop",
        description: "Spicy chicken wings served with a tangy sauce",
        price: 229,
        category: "Starters",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 23,
        restaurantId: 5,
        name: "Veg Spring Rolls",
        description: "Crispy rolls stuffed with mixed vegetables",
        price: 139,
        category: "Starters",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 24,
        restaurantId: 5,
        name: "Chilli Chicken",
        description: "Fried chicken pieces in a spicy chilli sauce",
        price: 249,
        category: "Main Course",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 25,
        restaurantId: 5,
        name: "Honey Noodles with Ice Cream",
        description: "Crispy honey-coated noodles served with vanilla ice cream",
        price: 179,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 27,
        restaurantId: 6,
        name: "Veg Salad Bowl",
        description: "A healthy bowl with fresh vegetables and light dressing",
        price: 199,
        category: "Bowls",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 28,
        restaurantId: 6,
        name: "Quinoa Power Bowl",
        description: "Protein-rich quinoa with mixed greens and chickpeas",
        price: 249,
        category: "Bowls",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 29,
        restaurantId: 6,
        name: "BBQ Chicken Bowl",
        description: "Spicy BBQ chicken served with rice and vegetables",
        price: 329,
        category: "Bowls",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 30,
        restaurantId: 6,
        name: "Fruit Salad Bowl",
        description: "Fresh seasonal fruits served with honey dressing",
        price: 149,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 32,
        restaurantId: 7,
        name: "Chocolate Truffle Cake",
        description: "Decadent chocolate cake with layers of chocolate ganache",
        price: 279,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 33,
        restaurantId: 7,
        name: "Red Velvet Cheesecake",
        description: "Red velvet cheesecake with a hint of chocolate",
        price: 299,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 34,
        restaurantId: 7,
        name: "Blueberry Cheesecake",
        description: "Cheesecake topped with fresh blueberry compote",
        price: 269,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 35,
        restaurantId: 7,
        name: "Salted Caramel Cheesecake",
        description: "Rich cheesecake topped with salted caramel sauce",
        price: 289,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 37,
        restaurantId: 8,
        name: "Keto Chicken Salad",
        description: "Low-carb salad with grilled chicken and avocado",
        price: 349,
        category: "Salads",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 38,
        restaurantId: 8,
        name: "Protein Power Bowl",
        description: "Protein-rich bowl with eggs, chickpeas, and greens",
        price: 279,
        category: "Bowls",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 39,
        restaurantId: 8,
        name: "Berry Smoothie Bowl",
        description: "Smoothie bowl topped with fresh berries and granola",
        price: 199,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,
    },
    {
        id: 40,
        restaurantId: 8,
        name: "Green Detox Bowl",
        description: "Green veggies and herbs for a healthy detox",
        price: 229,
        category: "Bowls",
        isVeg: true,
        offerText: undefined,
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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 42,
        restaurantId: 9,
        name: "Paneer Butter Masala",
        description: "Cottage cheese in a rich tomato-based curry",
        price: 349,
        category: "Main Course",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 43,
        restaurantId: 9,
        name: "Garlic Naan",
        description: "Indian flatbread with garlic and butter",
        price: 49,
        category: "Breads",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 44,
        restaurantId: 9,
        name: "Chicken Tikka",
        description: "Spiced chicken pieces cooked in a tandoor",
        price: 299,
        category: "Starters",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 45,
        restaurantId: 9,
        name: "Dal Makhani",
        description: "Rich and creamy black lentils",
        price: 199,
        category: "Main Course",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 47,
        restaurantId: 10,
        name: "Pistachio Kulfi",
        description: "Rich and creamy pistachio-flavored kulfi",
        price: 99,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 48,
        restaurantId: 10,
        name: "Malai Kulfi",
        description: "Traditional malai-flavored kulfi",
        price: 89,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 49,
        restaurantId: 10,
        name: "Kesar Badam Kulfi",
        description: "Saffron and almond flavored kulfi",
        price: 109,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 50,
        restaurantId: 10,
        name: "Rose Kulfi",
        description: "Rose-flavored kulfi for a floral touch",
        price: 89,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 52,
        restaurantId: 11,
        name: "Farm House",
        description: "Fresh veggies on a delicious cheese crust",
        price: 329,
        category: "Pizzas",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 53,
        restaurantId: 11,
        name: "Pepperoni Deluxe",
        description: "A delight for pepperoni lovers",
        price: 399,
        category: "Pizzas",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 54,
        restaurantId: 11,
        name: "Paneer Makhani Pizza",
        description: "Cottage cheese with a flavorful makhani sauce",
        price: 379,
        category: "Pizzas",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 55,
        restaurantId: 11,
        name: "Chicken Supreme",
        description: "Loaded with chicken sausage, grilled chicken, and barbecue chicken",
        price: 429,
        category: "Pizzas",
        isVeg: false,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 57,
        restaurantId: 12,
        name: "Quinoa Bowl",
        description: "Quinoa mixed with fresh veggies and light dressing",
        price: 299,
        category: "Bowls",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 58,
        restaurantId: 12,
        name: "Protein Power Smoothie",
        description: "Protein-rich smoothie with berries and nuts",
        price: 199,
        category: "Beverages",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 59,
        restaurantId: 12,
        name: "Avocado Toast",
        description: "Whole grain toast topped with fresh avocado slices",
        price: 169,
        category: "Snacks",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 60,
        restaurantId: 12,
        name: "Vegan Smoothie Bowl",
        description: "Delicious smoothie bowl with seasonal fruits and granola",
        price: 229,
        category: "Desserts",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 62,
        restaurantId: 13,
        name: "Chicken McGrill",
        description: "Grilled chicken with fresh lettuce and mayonnaise",
        price: 129,
        category: "Burgers",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 63,
        restaurantId: 13,
        name: "French Fries",
        description: "Crispy golden fries served with ketchup",
        price: 99,
        category: "Sides",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 64,
        restaurantId: 13,
        name: "McAloo Tikki",
        description: "Spicy potato patty with lettuce and mayo in a bun",
        price: 99,
        category: "Burgers",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 65,
        restaurantId: 13,
        name: "Chocolate Shake",
        description: "Rich chocolate milkshake topped with whipped cream",
        price: 149,
        category: "Beverages",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 67,
        restaurantId: 14,
        name: "BBQ Chicken Pizza",
        description: "Grilled chicken with BBQ sauce on a cheese pizza",
        price: 359,
        category: "Pizzas",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 68,
        restaurantId: 14,
        name: "Farm Fresh",
        description: "Fresh vegetables with a rich tomato sauce base",
        price: 329,
        category: "Pizzas",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 69,
        restaurantId: 14,
        name: "Paneer Overload",
        description: "Paneer and veggies on a tangy sauce",
        price: 349,
        category: "Pizzas",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 70,
        restaurantId: 14,
        name: "Garlic Breadsticks",
        description: "Baked breadsticks with garlic and herbs",
        price: 139,
        category: "Sides",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 72,
        restaurantId: 15,
        name: "Paneer Tikka Bowl",
        description: "Tandoori paneer served with rice and veggies",
        price: 259,
        category: "Bowls",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 73,
        restaurantId: 15,
        name: "Mutton Biryani Bowl",
        description: "Flavorful mutton biryani with basmati rice",
        price: 349,
        category: "Bowls",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 74,
        restaurantId: 15,
        name: "Falafel Bowl",
        description: "Crispy falafel served with hummus and pita",
        price: 239,
        category: "Bowls",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 75,
        restaurantId: 15,
        name: "Veg Tawa Pulao",
        description: "Spiced rice with assorted veggies",
        price: 199,
        category: "Bowls",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 77,
        restaurantId: 16,
        name: "BBQ Chicken Pizza",
        description: "Loaded with BBQ chicken and mozzarella cheese",
        price: 349,
        category: "Pizzas",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 78,
        restaurantId: 16,
        name: "Vegetarian Supreme",
        description: "A variety of vegetables with a cheese topping",
        price: 329,
        category: "Pizzas",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 79,
        restaurantId: 16,
        name: "Pepperoni Delight",
        description: "Spicy pepperoni on a classic cheese pizza",
        price: 379,
        category: "Pizzas",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 80,
        restaurantId: 16,
        name: "Garlic Bread",
        description: "Classic garlic bread with herbs and butter",
        price: 129,
        category: "Sides",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 82,
        restaurantId: 17,
        name: "Chicken Teriyaki Sub",
        description: "Chicken with teriyaki sauce and fresh veggies",
        price: 199,
        category: "Subs",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 83,
        restaurantId: 17,
        name: "Tuna Sub",
        description: "Classic tuna with lettuce, tomatoes, and cucumbers",
        price: 219,
        category: "Subs",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 84,
        restaurantId: 17,
        name: "Paneer Tikka Sub",
        description: "Spicy paneer with lettuce and sauces in a sub",
        price: 179,
        category: "Subs",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 85,
        restaurantId: 17,
        name: "Veggie Patty Sub",
        description: "Vegetarian patty with fresh vegetables",
        price: 169,
        category: "Subs",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 87,
        restaurantId: 18,
        name: "Grilled Veggie Bowl",
        description: "Bowl filled with grilled veggies and quinoa",
        price: 219,
        category: "Bowls",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 88,
        restaurantId: 18,
        name: "Chicken Caesar Salad",
        description: "Classic Caesar salad with grilled chicken",
        price: 249,
        category: "Salads",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 89,
        restaurantId: 18,
        name: "Green Detox Juice",
        description: "A healthy green juice with spinach and cucumber",
        price: 129,
        category: "Beverages",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 90,
        restaurantId: 18,
        name: "Vegan Power Bowl",
        description: "Power-packed bowl with tofu and vegetables",
        price: 239,
        category: "Bowls",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 92,
        restaurantId: 19,
        name: "Paneer Tikka",
        description: "Grilled paneer cubes with spices",
        price: 289,
        category: "Kebabs",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 93,
        restaurantId: 19,
        name: "Chicken Seekh Kebab",
        description: "Minced chicken with spices grilled to perfection",
        price: 349,
        category: "Kebabs",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 94,
        restaurantId: 19,
        name: "Mutton Boti Kebab",
        description: "Juicy mutton pieces marinated in spices",
        price: 419,
        category: "Kebabs",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 95,
        restaurantId: 19,
        name: "Falafel Plate",
        description: "Crispy falafel served with hummus and pita",
        price: 229,
        category: "Snacks",
        isVeg: true,
        offerText: undefined,

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
        isBestSeller: true,
        offerText: undefined,

    },
    {
        id: 97,
        restaurantId: 20,
        name: "Falafel Wrap",
        description: "Falafel wrapped in pita with tahini sauce",
        price: 219,
        category: "Wraps",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 98,
        restaurantId: 20,
        name: "Mixed Grill Platter",
        description: "An assortment of grilled chicken, lamb, and beef kebabs",
        price: 529,
        category: "Platters",
        isVeg: false,
        offerText: undefined,

    },
    {
        id: 99,
        restaurantId: 20,
        name: "Hummus with Pita",
        description: "Creamy hummus served with warm pita bread",
        price: 159,
        category: "Sides",
        isVeg: true,
        offerText: undefined,

    },
    {
        id: 100,
        restaurantId: 20,
        name: "Baba Ghanoush",
        description: "Smoky eggplant dip served with pita",
        price: 169,
        category: "Sides",
        isVeg: true,
        offerText: undefined,

    }
  ]
  };

  constructor() {
  }


  search(query: string): SearchResult[] {
    if (!query.trim()) {
      this.searchResults.set([]);
      return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    Object.values(this.menuItemsData).forEach(menuItems => {
      menuItems.forEach(menuItem => {
        const restaurant = this.restaurantsData.find(r => r.id === menuItem.restaurantId);
        if (!restaurant) return;

        if (
          menuItem.name.toLowerCase().includes(normalizedQuery) ||
          menuItem.description.toLowerCase().includes(normalizedQuery) ||
          menuItem.category.toLowerCase().includes(normalizedQuery)
        ) {
          results.push({
            menuItem,
            restaurant
          });
        }
      });
    });

    this.searchResults.set(results);
    return results;
  }

  getSearchResults() {
    return this.searchResults();
  }

  clearSearch() {
    this.searchResults.set([]);
  }
  filterByDiet(isVeg: boolean) {
    const currentResults = this.searchResults();
    const filteredResults = currentResults.filter(result => result.menuItem.isVeg === isVeg);
    this.searchResults.set(filteredResults);
    return filteredResults;
  }

  filterByPriceRange(minPrice: number, maxPrice: number) {
    const currentResults = this.searchResults();
    const filteredResults = currentResults.filter(result => 
      result.menuItem.price >= minPrice && result.menuItem.price <= maxPrice
    );
    this.searchResults.set(filteredResults);
    return filteredResults;
  }

  filterByRestaurantRating(minRating: number) {
    const currentResults = this.searchResults();
    const filteredResults = currentResults.filter(result => 
      result.restaurant.rating >= minRating
    );
    this.searchResults.set(filteredResults);
    return filteredResults;
  }
}