import { useEffect, useState } from 'react';
import { Product } from '@/app-demo/products/types';
import { ProductListProps, ProductListView } from './ProductListView';
import { getCategories, getProducts } from '@/app-demo/products/api/client.api';
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
  const [categories, setCategories] = useState<string[]>([]);
	const [category, setCategory] = useState<string>('');
	const navigate = useNavigate();

  useEffect(() => {
		getProducts({ category, search }).then(({ items }) => setItems(items));
		getFavorites().then(({ items }) => setFavorites(items));
    getCategories().then(({ items }) => {
			const cleanCategories = items.map((cat) => cat.trim().replace(/\?/, ''));
			setCategories(cleanCategories);
		});
	}, [category, search]);


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
			<div
				style={{
					display: 'flex',
					gap: 16,
					alignItems: 'center',
					marginBottom: 16,
				}}
			>
				<input
					type="search"
					placeholder="Поиск по товарам или категории…"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className={styles.searchInput}
					style={{ maxWidth: 320 }}
				/>
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className={styles.categorySelect}
				>
					<option value="">Все категории</option>
					{categories.map((cat) => (
						<option value={cat} key={cat}>
							{cat}
						</option>
					))}
				</select>
			</div>
			<button
				onClick={() => navigate('/favorites')}
				className={styles.openFavoritesBtn}
			>
				⭐ Избранное
			</button>
			<ProductListView
				title={title}
				items={items}
				onClick={handleAddToCart}
				openCart={openCart}
				onToggleFavorite={handleToggleFavorite}
				favoriteIds={favorites}
			/>
			{cartOpen && <Cart close={closeCart} />}
		</>
	);
}
