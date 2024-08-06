import { Database } from './database.types';

// Type Helpers - Shortcuts to the actual Database Type Definition

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
  
export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];      // The definition to INSERT/CREATE new rows in a Table
  
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

// export type Product = {
//   id: number;
//   image: string | null;
//   name: string;
//   price: number;
//};

// Example using a Type Helper:             // Instead of the static definition
export type Product = Tables<'products'>

export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
  'New',
  'Cooking',
  'Delivering',
  'Delivered',
];

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

export type Order = {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;

  order_items?: OrderItem[];
};

// export type Order = Tables<'orders'>
// export type OrderItem = Tables<'order_items'>

export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  size: PizzaSize;
  quantity: number;
};

export type Profile = {
  id: string;
  group: string;
};
