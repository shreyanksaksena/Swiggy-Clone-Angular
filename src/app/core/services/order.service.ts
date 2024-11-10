import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';

export interface OrderBilling {
  itemTotal: number;
  deliveryFee: number;
  platformFee: number;
  gstCharges: number;
  totalAmount: number;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
  restaurantId: number;
}

export interface Order {
  id?: string;
  userId: string;
  items: OrderItem[];
  restaurantDetails: {
    id: number;
    name: string;
    image: string;
    location: string;
  };
  billing: OrderBilling;
  delivery: {
    distance: number;
    contactless: boolean;
    instructions?: string;
  };
  status: OrderStatus;
  specialInstructions?: string;
  orderDate: string;
  estimatedDeliveryTime?: string;
}

export type OrderStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  
  private readonly API_URL = 'https://67277d1a270bd0b97552a084.mockapi.io/api/v1';

  placeOrder(orderData: {
    contactless: boolean;
    specialInstructions: string;
    deliveryDistance: number;
    billing: OrderBilling;
  }): Observable<Order> {
    const currentUser = this.authService.getCurrentUser();
    const cartItems = this.cartService.getCartItems();
    
    if (!currentUser?.id) {
      return throwError(() => new Error('User not authenticated'));
    }

    if (!cartItems.length) {
      return throwError(() => new Error('Cart is empty'));
    }

    const firstItem = cartItems[0];
    const restaurantId = firstItem.restaurantId;

    const order: Omit<Order, 'id'> = {
      userId: currentUser.id,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        isVeg: item.isVeg,
        restaurantId: item.restaurantId
      })),
      restaurantDetails: {
        id: restaurantId,
        name: firstItem.name.split(' ')[0], 
        image: './assets/chains/placeholder.png',
        location: 'Restaurant Location'
      },
      billing: orderData.billing,
      delivery: {
        distance: orderData.deliveryDistance,
        contactless: orderData.contactless,
        instructions: orderData.specialInstructions
      },
      status: 'PENDING',
      specialInstructions: orderData.specialInstructions,
      orderDate: new Date().toISOString(),
      estimatedDeliveryTime: new Date(Date.now() + 45 * 60000).toISOString() 
    };

    return this.http.post<Order>(`${this.API_URL}/orders`, order).pipe(
      map(response => {
        this.clearCart();
        return response;
      }),
      catchError(error => {
        console.error('Order placement failed:', error);
        return throwError(() => new Error('Failed to place order. Please try again.'));
      })
    );
  }

  getOrders(): Observable<Order[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser?.id) {
      return throwError(() => new Error('User not authenticated'));
    }
    return this.http.get<Order[]>(`${this.API_URL}/orders?userId=${currentUser.id}`).pipe(
      map(orders => orders.sort((a, b) => 
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      ))
    );
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.API_URL}/orders/${orderId}`).pipe(
      catchError(error => {
        console.error('Failed to fetch order:', error);
        return throwError(() => new Error('Failed to fetch order details'));
      })
    );
  }

  updateOrderStatus(orderId: string, status: OrderStatus): Observable<Order> {
    return this.http.put<Order>(`${this.API_URL}/orders/${orderId}`, { status }).pipe(
      catchError(error => {
        console.error('Failed to update order status:', error);
        return throwError(() => new Error('Failed to update order status'));
      })
    );
  }

  getUserOrders(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API_URL}/orders?userId=${userId}`).pipe(
      map(orders => orders.sort((a, b) => 
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      )),
      catchError(error => {
        console.error('Failed to fetch user orders:', error);
        return throwError(() => new Error('Failed to fetch order history'));
      })
    );
  }

  private clearCart() {
    const cartItems = this.cartService.getCartItems();
    cartItems.forEach(item => {
      this.cartService.updateQuantity(item.id, 0);
    });
  }

  cancelOrder(orderId: string): Observable<Order> {
    return this.updateOrderStatus(orderId, 'CANCELLED');
  }

  getEstimatedDeliveryTime(distance: number): Date {
    const baseTime = 30; 
    const timePerKm = 5; 
    const totalMinutes = baseTime + (distance * timePerKm);
    
    return new Date(Date.now() + totalMinutes * 60000);
  }
}