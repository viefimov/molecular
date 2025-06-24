import { Product, ProductListFilter } from '../types';
import { ListResponse } from '@/base/web/types';
import { get } from '@/base/web/client.api';

export async function getProducts(filter: ProductListFilter = {}): Promise<ListResponse<Product>> {
  const category = filter?.category;
  const url = `/api/products/${category ? category + '/' : ''}`;
  return get(url);
}
