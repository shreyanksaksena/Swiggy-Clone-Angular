import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer-container">
      <div class="download-section">
        <span class="experience-text">
          For better experience, download the Swiggy app now
        </span>
        <div class="store-images">
          <img src="./assets/footer/play-store.avif" alt="Download on Play Store" class="store-image">
          <img src="./assets/footer/app-store.avif" alt="Download on App Store" class="store-image">
        </div>
      </div>

      <div class="footer-content">
        <div class="logo-section">
          <img src="./assets/swiggylogo.png" alt="Swiggy Logo" class="logo">
          <span class="swiggy-text">Swiggy</span>
          <p class="copyright">© 2024 Swiggy Limited</p>
        </div>

        <div class="links-section">
          <div class="link-group">
            <h3 class="link-heading">Company</h3>
            <a class="link-item" *ngFor="let link of companyLinks">{{ link.title }}</a>
          </div>

          <div class="link-group">
            <h3 class="link-heading">Contact Us</h3>
            <a class="link-item" *ngFor="let link of contactLinks">{{ link.title }}</a>
          </div>

          <div class="link-group">
            <h3 class="link-heading">Legal</h3>
            <a class="link-item" *ngFor="let link of legalLinks">{{ link.title }}</a>
          </div>

          <div class="link-group">
            <h3 class="link-heading">Available in:</h3>
            <a class="link-item" *ngFor="let link of availableAreasLinks">{{ link.title }}</a>
            <p class="cities-dropdown">679 cities ▼</p>
          </div>

          <div class="link-group">
            <h3 class="link-heading">Life at Swiggy</h3>
            <a class="link-item" *ngFor="let link of lifeAtSwiggyLinks">{{ link.title }}</a>
          </div>

          <div class="link-group">
            <h3 class="link-heading">Social Links</h3>
            <div class="social-icons">
              <a href="#" class="icon"><i class="fab fa-linkedin"></i></a>
              <a href="#" class="icon"><i class="fab fa-instagram"></i></a>
              <a href="#" class="icon"><i class="fab fa-facebook"></i></a>
              <a href="#" class="icon"><i class="fab fa-pinterest"></i></a>
              <a href="#" class="icon"><i class="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 40px 20px;
      background-color: #f1f0f5;
      align-items: center;
      font-family: Arial, sans-serif;
      color: #686b78;
    }

    .download-section {
      display: flex; 
      align-items: center; 
      gap: 20px; 
      margin-bottom: 30px;
    }

    .experience-text {
      font-weight: 900;
      font-size: 20px;
      color: #000;
    }

    .store-images {
      display: flex;
      gap: 12px;
    }

    .store-image {
      width: 150px;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 1200px;
      flex-wrap: wrap;
    }

    .logo-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 20px;
    }

    .logo {
      width: 50px;
      margin-bottom: 5px;
    }

    .swiggy-text {
      font-size: 24px;
      font-weight: 700;
      color: #fc8019;
    }

    .copyright {
      font-size: 14px;
      color: #93959f;
    }

    .links-section {
      display: flex;
      flex: 3;
      justify-content: space-around;
      flex-wrap: wrap;
    }

    .link-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
      text-align: left;
      margin-bottom: 20px;
    }

    .link-heading {
      font-weight: 800;
      color: #000;
    }

    .link-item {
      text-decoration: none;
      font-size: 14px;
      color: #686b78;
    }

    .cities-dropdown {
      font-size: 14px;
      color: #686b78;
      cursor: pointer;
      margin-top: 4px;
    }

    .social-icons {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }

    .icon {
      color: #686b78;
      font-size: 20px;
      transition: color 0.3s;
    }

    .icon:hover {
      color: #282c3f;
    }

    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        align-items: center;
      }

      .links-section {
        flex-direction: column;
        align-items: center;
      }

      .store-images {
        flex-direction: column;
        gap: 8px;
      }
    }
  `]
})
export class FooterComponent {
  companyLinks = [
    { title: 'About Us' },
    { title: 'Swiggy Corporate' },
    { title: 'Careers' },
    { title: 'Team' },
    { title: 'Swiggy One' },
    { title: 'Swiggy Instamart' },
    { title: 'Swiggy Dineout' },
    { title: 'Swiggy Genie' }
  ];

  contactLinks = [
    { title: 'Help & Support' },
    { title: 'Partner with Us' },
    { title: 'Ride with Us' }
  ];

  legalLinks = [
    { title: 'Terms & Conditions' },
    { title: 'Cookie Policy' },
    { title: 'Privacy Policy' },
    { title: 'Investor Relations' }
  ];

  availableAreasLinks = [
    { title: 'Bangalore' },
    { title: 'Gurgaon' },
    { title: 'Hyderabad' },
    { title: 'Delhi' },
    { title: 'Mumbai' },
    { title: 'Pune' }
  ];

  lifeAtSwiggyLinks = [
    { title: 'Explore with Swiggy' },
    { title: 'Swiggy News' },
    { title: 'Snackables' }
  ];
}
