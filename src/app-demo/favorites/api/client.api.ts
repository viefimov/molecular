import { get, post } from '@/base/web/client.api';

export async function getFavorites(): Promise<{ items: string[] }> {
	return get('/api/favorites');
}
export async function addToFavorites(
	id: string
): Promise<{ success: boolean }> {
	return post('/api/favorites/add', { id });
}
export async function removeFromFavorites(
	id: string
): Promise<{ success: boolean }> {
	return post('/api/favorites/remove', { id });
}
export async function clearFavorites(): Promise<{ success: boolean }> {
	return post('/api/favorites/clear');
}
