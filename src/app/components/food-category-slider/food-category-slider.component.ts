import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FoodCategory {
  id: number;
  image: string;
}

@Component({
  selector: 'app-food-category-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="category-section">
  <h2 class="section-title">What's on your mind?</h2>

  <div class="categories-wrapper">
    <div class="nav-buttons">
      <button class="nav-button prev" (click)="slide('prev')" [class.disabled]="currentIndex === 0">
        ←
      </button>
      <button class="nav-button next" (click)="slide('next')"
              [class.disabled]="currentIndex >= foodCategories.length - itemsToShow">
        →
      </button>
    </div>

    <div class="categories" [style.transform]="'translateX(' + translateX + 'px)'">
      <div class="category-item" *ngFor="let category of foodCategories">
        <div class="category-image">
          <img [src]="category.image" [alt]="'food category'">
        </div>
      </div>
    </div>
  </div>
</div>


<hr class="custom-hr">

  `,
  styles: [`
.line-container {
  display: flex;
  justify-content: flex-start;
  margin-top: 16px; 
}

.custom-hr {
  border: none; 
  height: 1px; 
  background-color: #e6e6e6; 
  width: 68%; 
  margin-left: 16%; 
}


    .category-section {
      margin-top: 80px; 
      padding: 20px;
      position: relative;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
      background: white;
    }

    .section-title {
      font-size: 24px;
      font-weight: 600;
      color: #282c3f;
      text-align: left;
      margin: 0 0 24px 0;
      display: flex;
      position: relative;
      z-index: 1;
    }

    .categories-wrapper {
      position: relative;
      overflow: hidden;
      width: 100%;
    }

    .nav-buttons {
      position: absolute;
      top: 0px;
      right: 0px;
      display: flex;
      gap: 8px;
      z-index: 10;
    }

    .nav-button {
      background: #E2E2E7;
      border: none;
      padding: 8px 12px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      transition: background 0.3s;
    }

    .nav-button:hover {
      background: #D4D5D9;
    }

    .nav-button.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .categories {
      display: flex;
      transition: transform 0.3s ease;
    }

    .category-item {
      flex: 0 0 144px;
      margin-right: 32px;
      text-align: center;
      cursor: pointer;
    }

    .category-image {
      width: 144px;
      height: 180px;
      overflow: hidden;
    }

    .category-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .category-item:hover .category-image img {
      transform: scale(1.05);
    }
  `]
})
export class FoodCategorySliderComponent {
  foodCategories: FoodCategory[] = [
    { id: 1, image: './assets/mind/chinese.png' },
    { id: 2, image: './assets/mind/pizzas.png' },
    { id: 3, image: './assets/mind/north-indian.png' },
    { id: 4, image: './assets/mind/Burgers.png' },
    { id: 5, image: './assets/mind/Biryani.png' },
    { id: 6, image: './assets/mind/Cakes.png' },
    { id: 8, image: './assets/mind/Momos.png' },
    { id: 9, image: './assets/mind/IceCream.png' },
    { id: 10, image: './assets/mind/Idli.png' },
    { id: 11, image: './assets/mind/Kebabs.png' },
    { id: 12, image: './assets/mind/Khichdi.png' },
    { id: 13, image: './assets/mind/Noodles.png' },
    { id: 14, image: './assets/mind/Paratha.png' },
    { id: 15, image: './assets/mind/Pasta.png' },
    { id: 16, image: './assets/mind/Pastry.png' },
    { id: 17, image: './assets/mind/PavBhaji.png' },
    { id: 18, image: './assets/mind/Rolls.png' },
    { id: 19, image: './assets/mind/Salad.png' },
    { id: 20, image: './assets/mind/Shawarma.png' }
  ];

  currentIndex = 0;
  itemsToShow = 5;
  itemWidth = 176; 
  translateX = 0;

slide(direction: 'prev' | 'next') {
  const itemsToSlide = 3; 
  const maxIndex = this.foodCategories.length - this.itemsToShow;

  if (direction === 'prev' && this.currentIndex > 0) {
    this.currentIndex = Math.max(this.currentIndex - itemsToSlide, 0);
    this.translateX += this.itemWidth * itemsToSlide;
  } else if (direction === 'next' && this.currentIndex < maxIndex) {
    this.currentIndex = Math.min(this.currentIndex + itemsToSlide, maxIndex); 
    this.translateX -= this.itemWidth * itemsToSlide;
  }
}

}
