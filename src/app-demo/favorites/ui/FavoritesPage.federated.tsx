import { useEffect, useState } from 'react';
import {
	getFavorites,
	addToFavorites,
	removeFromFavorites,
} from '../api/client.api';
import { getProducts } from '@/app-demo/products/api/client.api';
import { FavoritesPage } from './FavoritePage';
import { Product } from '@/app-demo/products/types';
import { useLocation } from 'react-router';

export default function FavoritesPageContainer() {
	const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const location = useLocation();

	useEffect(() => {
		getProducts().then(({ items }) => setProducts(items));
	}, []);

	useEffect(() => {
		getFavorites().then(({ items }) => setFavoriteIds(items));
	}, [location.key]);

	const handleToggleFavorite = (id: string) => {
		const op = favoriteIds.includes(id) ? removeFromFavorites : addToFavorites;
		op(id).then(() =>
			getFavorites().then(({ items }) => setFavoriteIds(items))
		);
	};

	return (
		<FavoritesPage
			products={products}
			favoriteIds={favoriteIds}
			onToggleFavorite={handleToggleFavorite}
		/>
	);
}
