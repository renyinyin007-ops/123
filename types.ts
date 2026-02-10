
export interface SKU {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  stock: number;
  status: 'active' | 'reviewing' | 'inactive' | 'violation';
  image: string;
  commission: number;
  isSupplyChain: boolean;
  sortOrder: number;
  skus?: SKU[];
}

export interface Order {
  id: string;
  customer: string;
  total: number;
  status: 'pending_payment' | 'to_ship' | 'shipping' | 'completed' | 'refunded';
  date: string;
  items: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: string;
  completed: boolean;
  progress: number;
}
