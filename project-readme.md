# Swiggy Clone - Angular Project

A modern web application clone of Swiggy's food delivery platform built with Angular 17+ using standalone components and signals.

## Project Overview

This project is a simplified clone of Swiggy's food delivery platform, featuring restaurant listings, menu displays, and cart functionality. It's built using Angular's latest features including standalone components and the new control flow syntax.

## Key Features

- Restaurant listings with filtering and sorting
- Restaurant chains carousel
- Detailed restaurant pages with menus
- Shopping cart functionality using signals
- Responsive design
- Interactive UI elements

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── interfaces/
│   │   │   ├── cart-item.interface.ts
│   │   │   ├── menu-item.interface.ts
│   │   │   └── restaurant.interface.ts
│   │   ├── services/
│   │   │   └── cart.service.ts
│   │   └── data/
│   │       └── restaurant-data.ts
│   ├── features/
│   │   └── restaurants/
│   │       ├── components/
│   │       │   ├── menu-item.component.ts
│   │       │   └── restaurant-card.component.ts
│   │       └── pages/
│   │           ├── restaurant-detail.component.ts
│   │           └── restaurant-list.component.ts
│   ├── components/
│   │   ├── restaurant-chains/
│   │   │   └── restaurant-chains.component.ts
│   │   └── restaurants/
│   │       └── restaurants.component.ts
│   ├── app.component.ts
│   └── app.routes.ts
```

## Components Description

### Main Components

1. **RestaurantChainsComponent**
   - Displays a scrollable carousel of popular restaurant chains
   - Features left/right navigation
   - Shows restaurant cards with offers and ratings

2. **RestaurantsComponent**
   - Shows the main restaurant grid
   - Includes filtering and sorting functionality
   - Displays restaurant cards with detailed information

3. **RestaurantDetailComponent**
   - Shows detailed restaurant information
   - Displays the complete menu
   - Handles add-to-cart functionality

### Supporting Components

1. **MenuItemComponent**
   - Reusable component for displaying menu items
   - Shows item details, price, and add-to-cart button

2. **RestaurantCardComponent**
   - Reusable card component for restaurant display
   - Shows restaurant image, rating, and basic info

## Services

### CartService
- Manages shopping cart state using signals
- Handles add/remove/update cart operations
- Computes total items and amount

## Interfaces

1. **Restaurant**
   ```typescript
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
     menu?: MenuItem[];
   }
   ```

2. **MenuItem**
   ```typescript
   interface MenuItem {
     id: number;
     restaurantId: number;
     name: string;
     description: string;
     price: number;
     image: string;
     category: string;
     isVeg: boolean;
     rating?: number;
     isBestSeller?: boolean;
   }
   ```

3. **CartItem**
   ```typescript
   interface CartItem extends MenuItem {
     quantity: number;
   }
   ```

## Routing

The application uses Angular's router with two main routes:
- `/`: Home page with restaurant listings
- `/restaurant/:id`: Individual restaurant details and menu

## Styling

- Uses Tailwind CSS for styling
- Responsive design with mobile-first approach
- Custom animations for interactive elements

## Future Enhancements

1. User authentication
2. Order tracking
3. Payment integration
4. Search functionality
5. User reviews and ratings
6. Location-based restaurant filtering

## Prerequisites

- Node.js 16+
- Angular CLI 17+
- npm or yarn

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `ng serve`
4. Navigate to `http://localhost:4200/`
