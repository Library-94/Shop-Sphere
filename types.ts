
export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviewCount: number;
  deliveryDate?: string;
  isPrime?: boolean;
}

export interface WidgetItem {
  title: string;
  image: string;
  linkText: string;
}

export interface HomeWidget {
  id: string;
  title: string;
  type: 'grid' | 'single' | 'scroll';
  items: WidgetItem[];
  linkText: string;
}

export type ViewState = 'home' | 'signin' | 'cart' | 'search' | 'mobiles' | 'fresh' | 'customerService' | 'orders';
