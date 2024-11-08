export interface Restaurant {
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

export interface MenuItem {
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

export interface CartItem extends MenuItem {
  quantity: number;
}