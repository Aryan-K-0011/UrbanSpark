import { LucideIcon } from 'lucide-react';

export enum ServiceCategory {
  HOME = 'Home Cleaning',
  COMMERCIAL = 'Commercial',
  VEHICLE = 'Vehicle Wash'
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed';
export type PaymentMethod = 'Online' | 'Cash';

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription?: string; // For detail page
  benefits?: string[]; // For detail page
  process?: { title: string; description: string }[]; // For detail page
  category: ServiceCategory;
  image: string;
  icon?: LucideIcon;
  packages: ServicePackage[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface CartItem {
  serviceId: string;
  serviceName: string;
  packageId: string;
  packageName: string;
  price: number;
  duration: string;
}

export interface BookingState {
  id?: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  createdAt: string;
  // Deprecated fields kept for type safety with old data if any
  packageName?: string;
  price?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}