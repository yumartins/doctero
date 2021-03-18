import { Service } from './service';

export interface Product extends Service {
  brand: string,
  unity: number,
  photos?: number[],
  min_stock: number,
  max_stock: number,
  cost_price: number,
  inital_stock: number,
}
