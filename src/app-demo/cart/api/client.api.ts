import { CartItem } from '../types';
import { ListResponse } from '@/base/web/types';
import { get, post } from '@/base/web/client.api';

export async function getCartItems(): Promise<ListResponse<CartItem>> {
	return get('/api/cart');
}

export async function addToCart(item: CartItem): Promise<{ success: boolean }> {
	return post('/api/cart', item);
}

export async function clearCart(): Promise<{ success: boolean }> {
	return post('/api/cart/clear');
}

export async function removeOneFromCart(
	id: string
): Promise<{ success: boolean }> {
	return post('/api/cart/removeOne', { id });
}
