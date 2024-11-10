import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form class="mt-8 space-y-6" (ngSubmit)="onSubmit()">
          @if (error) {
            <div class="bg-red-100 text-red-700 p-3 rounded">
              {{error}}
            </div>
          }
          
          <div class="rounded-md shadow-sm space-y-4">
            <div>
              <label for="email" class="sr-only">Email address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                [(ngModel)]="email"
                required 
                class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
                placeholder="Email address"
              >
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password"
                [(ngModel)]="password" 
                required 
                class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
                placeholder="Password"
              >
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              [disabled]="isLoading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              @if (isLoading) {
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <!-- Loading spinner -->
                  <span class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                </span>
              }
              Sign in
            </button>
          </div>
        </form>
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Don't have an account? 
            <button 
              (click)="goToRegister()"
              class="font-medium text-green-600 hover:text-green-500"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = 'Invalid email or password';
        this.isLoading = false;
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

