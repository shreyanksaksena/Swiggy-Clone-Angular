import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from './menu-item.component';
import { MenuItem } from '../../../core/interfaces/menu-item.interface';
import { Restaurant } from '../../../core/interfaces/restaurant.interface';

@Component({
  selector: 'app-menu-section',
  standalone: true,
  imports: [CommonModule, MenuItemComponent],
  template: `
  <div class="menu-section mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <h2 class="text-base font-bold text-[#3e4152]">{{ title }}</h2>
          @if (itemCount) {
            <span class="text-xs text-gray-500">({{ itemCount }})</span>
          }
        </div>
        <button class="text-base text-gray-400">
          <span>⌃</span>
        </button>
      </div>

      <!-- Menu Items -->
      <div>
        @for (item of items; track item.id) {
          <app-menu-item 
            [item]="item" 
            [restaurant]="restaurant"
            (onAddToCart)="addToCart($event)"
          />
        }
      </div>
    </div>
  `
})
export class MenuSectionComponent {
  @Input() title!: string;
  @Input() items: MenuItem[] = [];
  @Input() restaurant!: Restaurant;
  @Output() onAddToCart = new EventEmitter<MenuItem>();

  get itemCount(): number {
    return this.items.length;
  }

  addToCart(item: MenuItem) {
    this.onAddToCart.emit(item);
  }
}