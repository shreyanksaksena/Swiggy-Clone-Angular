import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Restaurant } from '../../../core/interfaces/restaurant.interface';


@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white rounded-[8px] shadow-sm hover:shadow-md transition-shadow duration-200">
      <div class="relative">
        <img [src]="restaurant.image" [alt]="restaurant.name" 
             class="w-full h-[160px] object-cover rounded-t-[8px]">
        @if (restaurant.hasOffer) {
          <div class="absolute bottom-0 left-0 right-0 p-2 text-white text-sm font-medium
                      bg-gradient-to-t from-black/70 to-transparent">
            <span>{{restaurant.offerText}}</span>
          </div>
        }
      </div>
      <div class="p-3">
        <h3 class="font-medium text-[17px] text-[#282c3f] mb-1">{{restaurant.name}}</h3>
        <div class="flex items-center gap-1 mb-2">
          <span class="flex items-center justify-center w-5 h-5 bg-[#48c479] text-white text-xs rounded">
            ★ {{restaurant.rating}}
          </span>
          <span class="text-[#686b78] text-xs">•</span>
          <span class="text-[#686b78] text-xs">{{restaurant.deliveryTime}}</span>
        </div>
        <p class="text-[13px] text-[#686b78] leading-4 line-clamp-1">
          {{restaurant.cuisines.join(', ')}}
        </p>
        <p class="text-[13px] text-[#686b78]">{{restaurant.location}}</p>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-1 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `]
})

export class RestaurantCardComponent {
  @Input({ required: true }) restaurant!: Restaurant;
}