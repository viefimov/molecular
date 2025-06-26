import { Product, ProductListFilter } from '../types';
import { ListResponse } from '@/base/web/types';
import { get } from '@/base/web/client.api';

export async function getProducts(
	filter: ProductListFilter = {}
): Promise<ListResponse<Product>> {
	const params = new URLSearchParams();
  if (filter.category)
		params.append('category', filter.category.replace(/\?/, '').trim());
  if (filter.search)
		params.append('search', filter.search.replace(/\?/g, '').trim());

	const url = params.toString()
		? `/api/products?${params.toString()}`
		: `/api/products`;
	return get(url);
}
export async function getCategories(): Promise<{ items: string[] }> {
	return get('/api/products/categories');
}
