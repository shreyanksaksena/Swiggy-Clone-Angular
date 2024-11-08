// src/app/shared/components/favorite-button.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../core/services/favorites.service';
import { MenuItem } from '../core/interfaces/menu-item.interface';
import { Restaurant } from '../core/interfaces/restaurant.interface';


@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="toggleFavorite()"
      class="favorite-btn"
      [class.is-favorite]="isFavorite"
      [attr.aria-label]="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
    >
      <span class="icon">
        @if (isFavorite) {
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
               fill="red" stroke="red" stroke-width="2" class="favorite-icon">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
               fill="none" stroke="currentColor" stroke-width="2" class="favorite-icon">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        }
      </span>
    </button>
  `,
  styles: [`
    .favorite-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 8px;
      transition: all 0.3s ease;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .favorite-btn:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .favorite-btn.is-favorite:hover .favorite-icon {
      transform: scale(1.1);
    }

    .favorite-icon {
      transition: all 0.3s ease;
    }

    .is-favorite .favorite-icon {
      animation: pop 0.3s ease;
    }

    @keyframes pop {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `]
})
export class FavoriteButtonComponent {
  @Input({ required: true }) menuItem!: MenuItem;
  @Input({ required: true }) restaurant!: Restaurant;

  constructor(private favoritesService: FavoritesService) {}

  get isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.menuItem.id);
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.favoritesService.removeFromFavorites(this.menuItem.id);
    } else {
      this.favoritesService.addToFavorites(this.menuItem, this.restaurant);
    }
  }
}