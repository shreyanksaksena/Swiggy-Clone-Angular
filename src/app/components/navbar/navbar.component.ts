import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../../core/services/auth.service';
import { SearchService } from '../../core/services/search.service';
import { HostListener } from '@angular/core'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  template: `
    <nav class="navbar">
      <div class="navbar__container">
        <!-- Left Section -->
        <div class="navbar__left">
          <div class="navbar__left-logo">
            <img src="assets/swiggylogo.png" alt="Swiggy" routerLink="/" />
          </div>
          <div class="navbar__left-location">
            <span class="other-text">Other</span>
            <span class="location-text">{{currentLocation}}</span>
            <span class="material-icons location-icon">keyboard_arrow_down</span>
          </div>
        </div>

        <!-- Right Section -->
        <div class="navbar__right">
<a routerLink="/corporate" class="nav-item">
  <span>Swiggy Corporate</span>
</a>

          <div class="nav-item" (click)="toggleSearch()">
            <span class="material-icons">search</span>
            <span>Search</span>
          </div>

          <a routerLink="/offers" class="nav-item nav-item--new">
            <span class="material-icons">local_offer</span>
            <span>Offers</span>
          </a>

          <a routerLink="/help" class="nav-item">
            <span class="material-icons">help</span>
            <span>Help</span>
          </a>

<!-- Replace this div in the navbar__right section -->
<div class="nav-item" *ngIf="!isLoggedIn()" (click)="toggleLogin()">
  <span class="material-icons">person</span>
  <span>Sign In</span>
</div>

<div class="nav-item" *ngIf="isLoggedIn()">
  <div class="flex items-center gap-2" (click)="toggleProfileMenu()">
    <span class="material-icons">person</span>
    <span>{{getCurrentUser()}}</span>
  </div>
  
  <!-- Profile Dropdown Menu -->
  @if (isProfileMenuOpen) {
    <div class="profile-menu">
      <button class="profile-menu-item" (click)="handleLogout()">
        <span class="material-icons">logout</span>
        <span>Logout</span>
      </button>
    </div>
  }
</div>

<div class="flex items-center gap-4">
  <a 
    routerLink="/favorites" 
    class="flex items-center gap-1 text-gray-700 hover:text-orange-500">
    <span>❤️</span>
    <span>Favorites</span>
  </a>
</div>

          <div class="nav-item cart-badge" routerLink="/checkout">
            <span class="material-icons">shopping_cart</span>
            <span>Cart</span>
            <div class="badge" *ngIf="cartItemCount > 0">{{cartItemCount}}</div>
          </div>
        </div>
      </div>

      <!-- Search Modal -->
      <div class="search-modal" *ngIf="isSearchOpen" [@fadeInOut]>
        <div class="search-modal__content">
          <div class="search-modal__content-container">
<input 
  type="search" 
  placeholder="Search for dishes..." 
  (input)="onSearch($event)"
  class="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
>
            <button class="close-btn" (click)="toggleSearch()">
              <span class="material-icons">close</span>
            </button>
          </div>
        </div>
      </div>

  <!-- Login Panel with Backdrop -->
    @if (isLoginOpen) {
      <div class="login-backdrop" (click)="toggleLogin()"></div>
      <div class="login-panel">
        <div class="login-panel__header">
          <h2>{{isSignUp ? 'Create Account' : 'Login'}}</h2>
          <button class="close-btn" (click)="toggleLogin()">
            <span class="material-icons">close</span>
          </button>
        </div>

        <div class="login-panel__content">
          @if (!isSignUp) {
            <form (ngSubmit)="handleLogin()" class="space-y-4">
              <div>
                <input
                  type="email"
                  class="auth-input"
                  [(ngModel)]="email"
                  name="email"
                  placeholder="Email address"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  class="auth-input"
                  [(ngModel)]="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              
              @if (loginError) {
                <div class="text-red-500 text-sm">{{loginError}}</div>
              }

              <button type="submit" class="login-btn" [disabled]="isLoading">
                {{isLoading ? 'LOGGING IN...' : 'LOGIN'}}
              </button>

              <div class="text-center mt-4">
                <p class="text-gray-600">
                  Don't have an account? 
                  <button 
                    type="button"
                    (click)="toggleSignUp()" 
                    class="text-orange-500 hover:underline"
                  >
                    Create one
                  </button>
                </p>
              </div>
            </form>
          } @else {
            <form (ngSubmit)="handleSignUp()" class="space-y-4">
              <div>
                <input
                  type="text"
                  class="auth-input"
                  [(ngModel)]="name"
                  name="name"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  class="auth-input"
                  [(ngModel)]="email"
                  name="email"
                  placeholder="Email address"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  class="auth-input"
                  [(ngModel)]="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  class="auth-input"
                  [(ngModel)]="phone"
                  name="phone"
                  placeholder="Phone number"
                  required
                />
              </div>

              <div class="terms-checkbox">
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    [(ngModel)]="termsAccepted"
                    name="terms"
                    required
                  />
                  <span class="text-sm text-gray-600">
                    I accept the Terms & Conditions & Privacy Policy
                  </span>
                </label>
              </div>

              @if (signupError) {
                <div class="text-red-500 text-sm">{{signupError}}</div>
              }

              <button 
                type="submit" 
                class="login-btn" 
                [disabled]="isLoading || !termsAccepted"
              >
                {{isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}}
              </button>

              <div class="text-center mt-4">
                <p class="text-gray-600">
                  Already have an account? 
                  <button 
                    type="button"
                    (click)="toggleSignUp()" 
                    class="text-orange-500 hover:underline"
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          }
        </div>
      </div>
    }
<!-- Add this backdrop div for the fade effect -->
<div 
  class="login-backdrop" 
  *ngIf="isLoginOpen" 
  [@fadeInOut]
  (click)="toggleLogin()"
></div>
  `,
  styles: [`
.login-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }

    .login-panel {
      position: fixed;
      top: 0;
      right: 0;
      width: 450px;
      height: 100vh;
      background: #fff;
      padding: 2rem;
      z-index: 1001;
      overflow-y: auto;
      box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1);
    }


.disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.terms-checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #fc8019;
}

@media (max-width: 768px) {
  .login-panel {
    width: 100%;
  }
}
  .login-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1200;
}

.login-panel {
  background: #ffffff;
  width: 450px;
  height: 100%;
  padding: 32px;
  overflow-y: auto;
}

.login-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.login-panel__header h2 {
  font-size: 32px;
  font-weight: 600;
  color: #3d4152;
}

.login-panel__content {
  padding-top: 16px;
}

    .auth-input {
      width: 100%;
      padding: 12px;
      border: 1px solid #d4d5d9;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

.auth-input:focus {
  border-color: #fc8019;
}

.close-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #686b78;
}

.close-btn:hover {
  color: #3d4152;
}

    .login-btn {
      width: 100%;
      padding: 12px;
      background-color: #fc8019;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

.login-btn:hover:not(:disabled) {
  background: #f17012;
}

    .login-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

.terms-checkbox {
  margin: 16px 0;
}

@media (max-width: 768px) {
  .login-panel {
    width: 100%;
  }
}
  .profile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.profile-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  width: 100%;
  color: #3d4152;
  transition: background-color 0.3s;
}

.profile-menu-item:hover {
  background-color: #f2f2f2;
}

.terms-checkbox {
  margin: 16px 0;
}

.disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.terms-checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #fc8019;
}

  .auth-input {
      width: 100%;
      padding: 16px;
      border: 1px solid #d4d5d9;
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      transition: border-color 0.3s ease;
    }

    .auth-input:focus {
      border-color: #fc8019;
    }

    .space-y-4 > * + * {
      margin-top: 1rem;
    }

    .text-center {
      text-align: center;
    }

    .text-red-500 {
      color: #ef4444;
    }

    .text-sm {
      font-size: 0.875rem;
    }

    .text-gray-600 {
      color: #4b5563;
    }

    .text-orange-500 {
      color: #fc8019;
    }

    .hover\\:underline:hover {
      text-decoration: underline;
    }
    :host {
      display: block;
      width: 100%;
    }

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }

    .navbar__container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .navbar__left {
      display: flex;
      align-items: center;
      gap: 40px;
    }

    .navbar__left-logo img {
      height: 50px;
      width: auto;
      cursor: pointer;
    }

    .navbar__left-location {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .other-text {
      color: #686b78;
      font-size: 14px;
      font-weight: 300;
    }

    .location-text {
      color: #3d4152;
      font-size: 14px;
      font-weight: 500;
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .location-text:hover {
      color: #fc8019;
    }

    .navbar__right {
      display: flex;
      align-items: center;
      gap: 40px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #3d4152;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .nav-item:hover {
      color: #fc8019;
    }

    .nav-item--new {
      position: relative;
    }

    .nav-item--new::after {
      content: 'NEW';
      position: absolute;
      top: -8px;
      right: -16px;
      font-size: 10px;
      color: #fc8019;
      font-weight: 600;
    }

    .search-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1100;
    }

    .search-modal__content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: #ffffff;
      padding: 20px;
    }

    .search-modal__content-container {
      max-width: 700px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .search-modal__content input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid #d4d5d9;
      border-radius: 4px;
      font-size: 14px;
      outline: none;
    }

    .search-modal__content input:focus {
      border-color: #fc8019;
    }

    .login-panel {
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      width: 450px;
      background: #ffffff;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
      z-index: 1200;
      padding: 32px;
    }

    .login-panel__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }

    .login-panel__header h2 {
      font-size: 32px;
      font-weight: 600;
      color: #3d4152;
    }

    .close-btn {
      background: none;
      border: none;
      color: #686b78;
      cursor: pointer;
      padding: 8px;
    }

    .close-btn:hover {
      color: #3d4152;
    }

    .create-account {
      color: #686b78;
      margin-bottom: 24px;
    }

    .create-account a {
      color: #fc8019;
      text-decoration: none;
      font-weight: 500;
    }

    .create-account a:hover {
      text-decoration: underline;
    }

    .phone-input {
      width: 100%;
      padding: 16px;
      border: 1px solid #d4d5d9;
      border-radius: 4px;
      font-size: 16px;
      margin-bottom: 24px;
      outline: none;
    }

    .phone-input:focus {
      border-color: #fc8019;
    }

    .login-btn {
      width: 100%;
      padding: 16px;
      background: #fc8019;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .login-btn:hover {
      background: #f17012;
    }

    .terms {
      margin-top: 24px;
      font-size: 14px;
      color: #686b78;
    }

    .terms a {
      color: #3d4152;
      text-decoration: none;
      font-weight: 500;
    }

    .terms a:hover {
      text-decoration: underline;
    }

    .cart-badge {
      position: relative;
    }

    .badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #fc8019;
      color: #ffffff;
      font-size: 12px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 50%;
      min-width: 18px;
      text-align: center;
    }

    @media (max-width: 1024px) {
      .navbar__container {
        padding: 0 16px;
      }

      .navbar__left {
        gap: 20px;
      }

      .location-text {
        max-width: 200px;
      }

      .navbar__right {
        gap: 20px;
      }
    }

    @media (max-width: 768px) {
      .navbar__container {
        height: 60px;
      }

      .navbar__left-logo img {
        height: 40px;
      }

      .navbar__left-location {
        display: none;
      }

      .nav-item span:not(.material-icons) {
        display: none;
      }

      .login-panel {
        width: 100%;
      }
    }
  `],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
   currentLocation: string = "Kanakia Road, Baverly Park, Mira Road";
  isSearchOpen: boolean = false;
  isLoginOpen: boolean = false;
  searchQuery: string = '';


isProfileMenuOpen = false;
termsAccepted = false;
  

  isSignUp = false;
  email = '';
  password = '';
  name = '';
  phone = '';
  isLoading = false;
  loginError = '';
  signupError = '';

  @Input() cartItemCount: number = 0;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

  }

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
    if (!this.isSearchOpen) {
      this.searchQuery = '';
    }
  }

  toggleLogin(): void {
    this.isLoginOpen = !this.isLoginOpen;
    if (!this.isLoginOpen) {
      this.clearFields();
    }
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    if (query.trim()) {
      this.searchService.search(query);
      this.router.navigate(['/search']); 
    }
  }
  toggleProfileMenu(): void {
  this.isProfileMenuOpen = !this.isProfileMenuOpen;
}

  toggleSignUp(): void {
    this.isSignUp = !this.isSignUp;
    this.clearFields();
  }

  clearFields(): void {
    this.email = '';
    this.password = '';
    this.name = '';
    this.phone = '';
    this.loginError = '';
    this.signupError = '';
    this.searchQuery = '';
  }

  handleSearch(query: string): void {
    console.log('Searching for:', query);
  }

  handleLogin(): void {
    if (!this.email || !this.password) {
      this.loginError = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.loginError = '';

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.isLoginOpen = false;
        this.clearFields();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.loginError = 'Invalid email or password';
        console.error('Login error:', err);
      }
    });
  }

  handleSignUp(): void {
  if (!this.email || !this.password || !this.name || !this.phone) {
    this.signupError = 'Please fill in all fields';
    return;
  }

  if (!this.termsAccepted) {
    this.signupError = 'Please accept the Terms & Conditions';
    return;
  }

  this.isLoading = true;
  this.signupError = '';

  const user = {
    email: this.email,
    password: this.password,
    name: this.name,
    phone: this.phone
  };

  this.authService.register(user).subscribe({
    next: () => {
      this.isLoading = false;
      this.isSignUp = false;  
      this.clearFields();
     
      alert('Account created successfully! Please login.');
    },
    error: (err) => {
      this.isLoading = false;
      this.signupError = 'Registration failed. Please try again.';
      console.error('Registration error:', err);
    }
  });
}


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }


  handleLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }


getCurrentUser(): string {
  const user = this.authService.getCurrentUser();
  return user?.name ? user.name.split(' ')[0] : 'User';
}
  
}
