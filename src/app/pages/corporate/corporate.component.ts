import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatCard {
  value: string;
  label: string;
}

@Component({
  selector: 'app-corporate',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="corporate-page">
      <!-- About Section -->
      <section class="about-section">
        <h1 class="main-title">ABOUT US</h1>
        <p class="description">
          Swiggy is a new-age consumer-first organization offering an easy-to-use convenience platform, accessible through a unified app.
        </p>

        <div class="services-container">
          <img src="assets/corporate/map.png" alt="Map" class="full-map-image">
        </div>
      </section>

      <!-- Get To Know Us Section -->
      <section class="know-us-section">
        <h2 class="section-title">GET TO KNOW US</h2>
        <div class="content-container">
          <div class="text-container">
            <h3 class="highlight-text">Mission</h3>
            <p class="content-text">
              Our mission is to elevate the quality of life of the urban consumer by offering unparalleled convenience. Convenience is what makes us tick. It’s what makes us get out of bed and say, “Let’s do this."
            </p>
          </div>
          <div class="image-container">
            <img src="assets/corporate/delivery.png" alt="Delivery Partner">
          </div>
        </div>
      </section>

      <!-- Industry Pioneer Section -->
      <section class="pioneer-section">
        <h2 class="section-title">INDUSTRY PIONEER</h2>
        <div class="content-container">
          <div class="text-content">
            <p class="pioneer-text">
              Being among the first few entrants, Swiggy has successfully pioneered the hyperlocal commerce industry in India, launching Food Delivery in 2014 and Quick Commerce in 2020. Due to the pioneering status of Swiggy, it is well-recognised as a leader in innovation in hyperlocal commerce and as a brand synonymous with the categories it is present in.
            </p>
          </div>
          <div class="image-container">
            <img src="assets/corporate/super.png" alt="Swiggy Mascot" class="large-image">
          </div>
        </div>

        <div class="stats-container">
          <div *ngFor="let stat of stats" class="stat-card">
            <h3 class="stat-value">{{ stat.value }}</h3>
            <p class="stat-label">{{ stat.label }}</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .corporate-page {
      padding-top: 20px;
      background: #f7f7f7;
    }

    .main-title, .section-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 700;
      margin: 2rem 0;
      color: #282c3f;
    }

    .description {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
      font-size: 1.2rem;
      color: #686b78;
      line-height: 1.6;
    }

    .services-container {
      width: 100%;
      margin: 4rem 0;
    }

    .full-map-image {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .know-us-section {
      background: white;
      padding: 4rem 0;
    }

    .content-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    .text-container {
      flex: 1;
    }

    .highlight-text {
      color: #fc8019;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .content-text {
      font-size: 1.1rem;
      color: #686b78;
      line-height: 1.6;
      max-width: 600px;
    }

    .pioneer-section {
      background: #f7f7f7;
      padding: 4rem 0;
    }

    .pioneer-text {
      font-size: 1.1rem;
      color: #686b78;
      line-height: 1.6;
      max-width: 600px;
    }

    .image-container {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    .large-image {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }

    .stats-container {
      display: flex;
      justify-content: space-around;
      max-width: 1200px;
      margin: 4rem auto;
      padding: 2rem;
    }

    .stat-card {
      text-align: center;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: #60b246;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #686b78;
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      .content-container {
        flex-direction: column;
      }

      .stats-container {
        flex-wrap: wrap;
        gap: 2rem;
      }
    }
  `]
})
export class CorporateComponent {
  stats: StatCard[] = [
    { value: '3 Billion+', label: 'orders delivered' },
    { value: '220k+', label: 'restaurant partners' },
    { value: '520k+', label: 'delivery partners' },
    { value: '680+', label: 'cities in India' }
  ];
}
