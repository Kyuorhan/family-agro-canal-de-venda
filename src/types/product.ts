import { Address } from "./address";

export interface Farmer {
  id: number;
  name: string;
  phone: string;
  address: Address;
}

export interface Promotion {
  id: number;
  startDate: string;
  endDate: string;
  quantity: number;
  amount: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  unit: string;
  price: number;
  farmer: Farmer;
  promotion: Promotion;
}
