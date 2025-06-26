import { Product } from '@/app-demo/products/types';

export type CartItem = Product & { quantity: number };
export type ListResponse<T> = {
	total: number;
	items: T[];
};
