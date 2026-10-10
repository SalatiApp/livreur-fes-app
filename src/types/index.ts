export type UserRole = 'shop' | 'driver';

export type AppPage = 'home' | 'offers' | 'drivers' | 'create' | 'account' | 'deliveryMap';

export interface CityInfo {
  id: string;
  nameAr: string;
  coords: [number, number];
  zoom: number;
  districts: string[];
}

export interface Offer {
  id: string;
  shopName: string;
  shopType: string;
  city: string;
  district: string;
  vehicle: string;
  paymentType: string;
  price: number;
  workingHours?: string;
  phone: string;
  whatsapp: string;
  description: string;
  notes?: string;
  status: 'open' | 'closed';
  createdAt: string;
  lat?: number;
  lng?: number;
}

export interface Driver {
  id: string;
  name: string;
  city: string;
  district: string;
  vehicle: string;
  phone: string;
  whatsapp: string;
  freeHours?: string;
  experience?: string;
  notes?: string;
  isAvailable: boolean;
  createdAt: string;
  lat?: number;
  lng?: number;
}

export interface DeliveryRouteParams {
  shopName: string;
  shopCity: string;
  district: string;
  price: number;
  cityCoords?: [number, number];
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'info' | 'success' | 'error';
}
