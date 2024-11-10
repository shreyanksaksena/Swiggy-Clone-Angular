import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, OrderItem, OrderStatus } from '../../../../core/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-receipt',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="receipt-container" *ngIf="order">
      <!-- Header -->
      <div class="receipt-header">
        <h2>Order Receipt</h2>
        <p class="order-id">Order #{{order.id}}</p>
        <p class="order-date">{{order.orderDate | date:'medium'}}</p>
      </div>

      <!-- Restaurant Details -->
      <div class="restaurant-details">
        <img [src]="order.restaurantDetails.image" [alt]="order.restaurantDetails.name" class="restaurant-img">
        <div>
          <h3>{{order.restaurantDetails.name}}</h3>
          <p>{{order.restaurantDetails.location}}</p>
        </div>
      </div>

      <!-- Order Items -->
      <div class="items-container">
        <h4>Order Items</h4>
        <div class="item" *ngFor="let item of order.items">
          <div class="item-details">
            <span [class.veg-icon]="item.isVeg" [class.non-veg-icon]="!item.isVeg"></span>
            <span>{{item.name}}</span>
          </div>
          <div class="item-quantity">x{{item.quantity}}</div>
          <div class="item-price">₹{{item.price * item.quantity}}</div>
        </div>
      </div>

      <!-- Billing Details -->
      <div class="billing-details">
        <div class="bill-row">
          <span>Item Total</span>
          <span>₹{{order.billing.itemTotal}}</span>
        </div>
        <div class="bill-row">
          <span>Delivery Fee</span>
          <span>₹{{order.billing.deliveryFee}}</span>
        </div>
        <div class="bill-row">
          <span>Platform Fee</span>
          <span>₹{{order.billing.platformFee}}</span>
        </div>
        <div class="bill-row">
          <span>GST</span>
          <span>₹{{order.billing.gstCharges}}</span>
        </div>
        <div class="bill-row total">
          <span>Total Amount</span>
          <span>₹{{order.billing.totalAmount}}</span>
        </div>
      </div>

      <!-- Delivery Details -->
      <div class="delivery-details">
        <h4>Delivery Details</h4>
        <p *ngIf="order.delivery.contactless" class="contactless">
          Contactless Delivery
        </p>
        <p *ngIf="order.delivery.instructions" class="instructions">
          Special Instructions: {{order.delivery.instructions}}
        </p>
        <p class="estimated-time">
          Estimated Delivery: {{order.estimatedDeliveryTime | date:'shortTime'}}
        </p>
      </div>

      <!-- Status -->
      <div class="order-status" [ngClass]="order.status.toLowerCase()">
        {{order.status.replace('_', ' ')}}
      </div>
    </div>
  `,
  styles: [`
    .receipt-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .receipt-header {
      text-align: center;
      padding-bottom: 15px;
      border-bottom: 1px dashed #ddd;
    }

    .receipt-header h2 {
      margin: 0;
      color: #333;
    }

    .order-id {
      color: #666;
      margin: 5px 0;
    }

    .order-date {
      color: #888;
      font-size: 0.9em;
    }

    .restaurant-details {
      display: flex;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #eee;
    }

    .restaurant-img {
      width: 60px;
      height: 60px;
      border-radius: 4px;
      margin-right: 15px;
      object-fit: cover;
    }

    .items-container {
      padding: 15px 0;
    }

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
    }

    .item-details {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .veg-icon, .non-veg-icon {
      width: 12px;
      height: 12px;
      border: 1px solid;
      border-radius: 2px;
    }

    .veg-icon {
      border-color: #0f0;
    }

    .non-veg-icon {
      border-color: #f00;
    }

    .billing-details {
      padding: 15px 0;
      border-top: 1px solid #eee;
    }

    .bill-row {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      color: #666;
    }

    .bill-row.total {
      font-weight: bold;
      color: #333;
      border-top: 1px solid #eee;
      margin-top: 10px;
      padding-top: 10px;
    }

    .delivery-details {
      padding: 15px 0;
      border-top: 1px solid #eee;
    }

    .contactless {
      color: #2196F3;
      font-weight: 500;
    }

    .instructions {
      font-style: italic;
      color: #666;
    }

    .estimated-time {
      color: #4CAF50;
      font-weight: 500;
    }

    .order-status {
      text-align: center;
      padding: 8px;
      border-radius: 4px;
      font-weight: 500;
      margin-top: 15px;
    }

    .pending {
      background: #FFF3E0;
      color: #FF9800;
    }

    .confirmed {
      background: #E3F2FD;
      color: #2196F3;
    }

    .preparing {
      background: #E8F5E9;
      color: #4CAF50;
    }

    .out_for_delivery {
      background: #F3E5F5;
      color: #9C27B0;
    }

    .delivered {
      background: #E8F5E9;
      color: #4CAF50;
    }

    .cancelled {
      background: #FFEBEE;
      color: #F44336;
    }
  `]
})
export class OrderReceiptComponent {
  @Input() order!: Order;

  constructor(private router: Router) {}

  navigateToOrder() {
    if (this.order?.id) {
      this.router.navigate(['/orders', this.order.id]);
    }
  }

  getStatusClass(status: OrderStatus): string {
    return status.toLowerCase().replace('_', '-');
  }
}