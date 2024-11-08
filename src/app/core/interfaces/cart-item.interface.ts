import { MenuItem } from './menu-item.interface';

export interface CartItem extends MenuItem {
customization: any;
  quantity: number;
}