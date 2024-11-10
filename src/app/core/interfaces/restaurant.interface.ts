import { MenuItem } from "./menu-item.interface";


export interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisines: string[];
  location: string;
  hasOffer?: boolean;    
  offerText?: string;    
  menu?: MenuItem[];     
}