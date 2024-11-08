// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RestaurantDetailComponent } from './features/restaurants/pages/restaurant-detail.component';
import { CheckoutComponent } from './features/checkout/pages/checkout.component';
import { LoginComponent } from './features/auth/components/login.component';
import { RegisterComponent } from './features/auth/components/register.component';
import { authGuard } from './core/guards/auth.guard';
import { CorporateComponent } from './pages/corporate/corporate.component';
import { SearchResultsComponent } from './features/search/components/search-results.component';
import { FavoritesPageComponent } from './features/favorites/pages/favorites-page.component';

export const routes: Routes = [
    {
    path: 'restaurant/:id',
    component: RestaurantDetailComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'restaurant/:id',
    component: RestaurantDetailComponent
  },
  {
    path: 'corporate',
    component: CorporateComponent
  },
  {
    path: 'favorites',
    component: FavoritesPageComponent
  },
  {
    path: 'search',
    component: SearchResultsComponent
  },
    {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
    {
    path: 'register',
    component: RegisterComponent
  },
{
    path: '**',
    redirectTo: ''
  }
];