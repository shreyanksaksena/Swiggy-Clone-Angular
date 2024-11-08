import { MenuItem } from "./menu-item.interface";

// src/app/core/interfaces/restaurant.interface.ts
export interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisines: string[];
  location: string;
  hasOffer?: boolean;     // Made optional with ?
  offerText?: string;     // Made optional with ?
  menu?: MenuItem[];      // Already optional
}