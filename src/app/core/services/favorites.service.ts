import { Injectable, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MenuItem } from '../interfaces/menu-item.interface';
import { Restaurant } from '../interfaces/restaurant.interface';

export interface FavoriteItem {
  menuItem: MenuItem;
  restaurantInfo: {
    id: number;
    name: string;
    image: string;
    rating: number;
    hasOffer: boolean;
    offerText: string;
    location: string;
    deliveryTime: string;
    cuisines: string[];
  };
  addedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites = signal<FavoriteItem[]>([]);
  private isBrowser: boolean;
  private readonly STORAGE_KEY = 'favorites';
  
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadFavorites();
  }

  private loadFavorites() {
    if (this.isBrowser) {
      try {
        const savedFavorites = localStorage.getItem(this.STORAGE_KEY);
        if (savedFavorites) {
          const parsed = JSON.parse(savedFavorites);
          this.favorites.set(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
        this.favorites.set([]);
      }
    }
  }

  private saveFavorites() {
    if (this.isBrowser) {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favorites()));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    }
  }

  addToFavorites(menuItem: MenuItem, restaurant: Restaurant) {
    const existingFavorite = this.favorites().find(f => f.menuItem.id === menuItem.id);
    
    if (!existingFavorite) {
      const restaurantInfo = {
        id: restaurant.id,
        name: restaurant.name,
        image: restaurant.image,
        rating: restaurant.rating,
        hasOffer: restaurant.hasOffer ?? false, 
        offerText: restaurant.offerText ?? '', 
        location: restaurant.location ?? '',
        deliveryTime: restaurant.deliveryTime ?? '',
        cuisines: restaurant.cuisines ?? []
      };

      this.favorites.update(favs => [
        ...favs,
        {
          menuItem,
          restaurantInfo,
          addedAt: new Date().toISOString()
        }
      ]);
      this.saveFavorites();
    }
  }

  removeFromFavorites(menuItemId: number) {
    this.favorites.update(favs => 
      favs.filter(f => f.menuItem.id !== menuItemId)
    );
    this.saveFavorites();
  }

  isFavorite(menuItemId: number): boolean {
    return this.favorites().some(f => f.menuItem.id === menuItemId);
  }

  getFavorites() {
    return this.favorites;
  }

  clearFavorites() {
    this.favorites.set([]);
    if (this.isBrowser) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  getFavoritesByRestaurant(restaurantId: number): FavoriteItem[] {
    return this.favorites().filter(f => f.restaurantInfo.id === restaurantId);
  }

  getFavoritesCount(): number {
    return this.favorites().length;
  }

  sortFavoritesByDate(ascending: boolean = true): FavoriteItem[] {
    return [...this.favorites()].sort((a, b) => {
      const dateA = new Date(a.addedAt).getTime();
      const dateB = new Date(b.addedAt).getTime();
      return ascending ? dateA - dateB : dateB - dateA;
    });
  }

  getFavoritesByCuisine(cuisine: string): FavoriteItem[] {
    return this.favorites().filter(f => 
      f.restaurantInfo.cuisines.some(c => 
        c.toLowerCase().includes(cuisine.toLowerCase())
      )
    );
  }

  searchFavorites(query: string): FavoriteItem[] {
    const searchTerm = query.toLowerCase();
    return this.favorites().filter(f => 
      f.menuItem.name.toLowerCase().includes(searchTerm) ||
      f.restaurantInfo.name.toLowerCase().includes(searchTerm) ||
      f.restaurantInfo.cuisines.some(c => 
        c.toLowerCase().includes(searchTerm)
      )
    );
  }

  getRecentFavorites(limit: number = 5): FavoriteItem[] {
    return this.sortFavoritesByDate(false).slice(0, limit);
  }

  getFavoritesByRating(minRating: number = 4.0): FavoriteItem[] {
    return this.favorites().filter(f => 
      f.restaurantInfo.rating >= minRating
    );
  }

  hasFavorites(): boolean {
    return this.favorites().length > 0;
  }

  toggleFavorite(menuItem: MenuItem, restaurant: Restaurant): boolean {
    const isCurrentlyFavorite = this.isFavorite(menuItem.id);
    
    if (isCurrentlyFavorite) {
      this.removeFromFavorites(menuItem.id);
    } else {
      this.addToFavorites(menuItem, restaurant);
    }
    
    return !isCurrentlyFavorite;
  }

  exportFavorites(): string {
    return JSON.stringify(this.favorites());
  }

  importFavorites(favoritesJson: string): boolean {
    try {
      const parsed = JSON.parse(favoritesJson);
      if (Array.isArray(parsed)) {
        this.favorites.set(parsed);
        this.saveFavorites();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}