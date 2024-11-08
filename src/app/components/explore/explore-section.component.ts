import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-explore-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Cities Section -->
    <section class="explore-section">
      <h2 class="section-title">Best Places to Eat Across Cities</h2>
      <div class="grid-container">
        <a class="grid-item" *ngFor="let city of cities">
          Best Restaurants in {{ city }}
        </a>
        <a class="grid-item show-more">
          Show More <span class="down-arrow">▼</span>
        </a>
      </div>

      <!-- Cuisines Section -->
      <h2 class="section-title">Best Cuisines Near Me</h2>
      <div class="grid-container">
        <a class="grid-item" *ngFor="let cuisine of cuisines">
          {{ cuisine }} Restaurant Near Me
        </a>
        <a class="grid-item show-more">
          Show More <span class="down-arrow">▼</span>
        </a>
      </div>

      <!-- Explore Section -->
      <h2 class="section-title">Explore Every Restaurants Near Me</h2>
      <div class="grid-container">
        <a class="grid-item">Explore Restaurants Near Me</a>
        <a class="grid-item">Explore Top Rated Restaurants Near Me</a>
      </div>
    </section>
  `,
  styles: [`
.explore-section {
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px 20px;
}

    .section-title {
      font-size: 24px;
      font-weight: 700;
      color: #282c3f;
      margin-bottom: 24px;
      margin-top: 40px;
    }
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 0.3fr)); 
  gap: 20px; 
  justify-content: center;
}

.grid-item {
  padding: 14px 16px; 
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  color: #282c3f;
  font-size: 14px; 
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: white;
  min-height: 50px; 
}
    .grid-item:hover {
      border-color: #d3d3d3;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .show-more {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #686b78;
    }

    .down-arrow {
      font-size: 12px;
    }

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr); 
  }
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr); 
  }

  .section-title {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: 1fr; 
  }

  .grid-item {
    font-size: 14px;
  }
}

  `]
})
export class ExploreSectionComponent {
  cities: string[] = [
    'Bangalore',
    'Pune',
    'Mumbai',
    'Delhi',
    'Hyderabad',
    'Kolkata',
    'Chennai',
    'Chandigarh',
    'Ahmedabad',
    'Jaipur',
    'Nagpur'
  ];

  cuisines: string[] = [
    'Chinese',
    'South Indian',
    'Indian',
    'Kerala',
    'Korean',
    'North Indian',
    'Seafood',
    'Bengali',
    'Punjabi',
    'Italian',
    'Andhra'
  ];
}