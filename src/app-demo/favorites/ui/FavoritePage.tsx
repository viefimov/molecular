import { Product } from '@/app-demo/products/types';
import { ProductItem } from '../../products/ui/ProductItem';
import styles from './FavoritePage.module.scss';

interface FavoritesPageProps {
	products: Product[];
	favoriteIds: string[];
	onToggleFavorite?: (id: string) => void;
}

export function FavoritesPage({
	products,
	favoriteIds,
	onToggleFavorite,
}: FavoritesPageProps) {
	const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));

	return (
		<div className={styles.favoritesPage}>
			<h2 className={styles.favoritesTitle}>Избранные товары</h2>
			{favoriteProducts.length === 0 ? (
				<div className={styles.emptyFavorites}>В избранном пока пусто!</div>
			) : (
				<ul className={styles.productList}>
					{favoriteProducts.map((item) => (
						<ProductItem
							key={item.id}
							product={item}
							onToggleFavorite={onToggleFavorite}
							isFavorite={favoriteIds.includes(item.id)}
						/>
					))}
				</ul>
			)}
		</div>
	);
}
