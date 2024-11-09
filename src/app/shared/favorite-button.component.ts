// src/app/shared/components/favorite-button.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('heartBeat', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        transform: 'scale(1.2)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ],
  template: `
    <button
      type="button"
      class="favorite-button"
      [class.active]="isActive"
      [@heartBeat]="animationState"
      (click)="toggleFavorite($event)"
    >
      {{ isActive ? '❤️' : '🤍' }}
    </button>
  `,
  styles: [`
    .favorite-button {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #d4d5d9;
      border-radius: 50%;
      background: white;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 16px;
      padding: 0;
      line-height: 1;
    }

    .favorite-button:hover {
      border-color: #ff5c5c;
      background: #fff8f8;
    }

    .favorite-button.active {
      border-color: #ff5c5c;
      background: #fff8f8;
    }
  `]
})
export class FavoriteButtonComponent {
  @Input() isActive = false;
  @Output() toggled = new EventEmitter<boolean>();

  animationState = 'inactive';

  toggleFavorite(event: Event) {
    event.stopPropagation();
    this.animationState = 'active';
    this.toggled.emit(!this.isActive);
    
    setTimeout(() => {
      this.animationState = 'inactive';
    }, 200);
  }
}