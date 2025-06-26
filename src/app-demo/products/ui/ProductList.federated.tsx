import { useEffect, useState } from 'react';
import { Product } from '@/app-demo/products/types';
import { ProductListProps, ProductListView } from './ProductListView';
import { getProducts } from '@/app-demo/products/api/client.api';
import { addToCart } from '../../cart/api/client.api';
import Cart from '../../cart/ui/Cart.federated.tsx';
import styles from './ProductList.module.scss';
import {
	getFavorites,
	addToFavorites,
	removeFromFavorites,
} from '@/app-demo/favorites/api/client.api';
import { useNavigate } from 'react-router';

export function ProductList({
	title = 'List',
}: Omit<ProductListProps, 'items'>) {
	const [items, setItems] = useState<Product[]>([]);
	const [cartOpen, setCartOpen] = useState(false);
	const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		getProducts().then(({ items }) => setItems(items));
		getFavorites().then(({ items }) => setFavorites(items));
	}, []);

  const filteredItems = items.filter(
		(item) =>
			item.name.toLowerCase().includes(search.toLowerCase()) ||
			item.category.toLowerCase().includes(search.toLowerCase())
	);
	const handleAddToCart = (product: Product) => {
		if (!addToCart) return;
		addToCart({ ...product, quantity: 1 })
			.then(() => console.log(`Added ${product.name} to cart`))
			.catch(console.error);
	};

	const handleToggleFavorite = (id: string) => {
		if (favorites.includes(id)) {
			removeFromFavorites(id).then(() =>
				getFavorites().then(({ items }) => setFavorites(items))
			);
		} else {
			addToFavorites(id).then(() =>
				getFavorites().then(({ items }) => setFavorites(items))
			);
		}
	};

	const openCart = () => setCartOpen(true);
	const closeCart = () => setCartOpen(false);

	return (
		<>
			<input
				type="search"
				placeholder="Поиск по товарам или категории…"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className={styles.searchInput}
			/>
			<button
				onClick={() => navigate('/favorites')}
				className={styles.openFavoritesBtn}
			>
				⭐ Избранное
			</button>
			<ProductListView
				title={title}
				items={filteredItems}
				onClick={handleAddToCart}
				openCart={openCart}
				onToggleFavorite={handleToggleFavorite}
				favoriteIds={favorites}
			/>
			{cartOpen && <Cart close={closeCart} />}
		</>
	);
}
