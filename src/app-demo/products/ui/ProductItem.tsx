// src/app-demo/products/ui/ProductItem.tsx

import { Product } from '@/app-demo/products/types';
import styles from './ProductList.module.scss';

interface ProductItemProps {
	product: Product;
	onAddToCart?: (product: Product) => void;
	onToggleFavorite?: (id: string) => void;
	isFavorite?: boolean;
}

export function ProductItem({
	product,
	onAddToCart,
	onToggleFavorite,
	isFavorite = false,
}: ProductItemProps) {
	return (
		<li className={styles.productItem}>
			<div className={styles.info}>
				<span className={styles.name}>{product.name}</span>
				<span className={styles.category}>{product.category}</span>
			</div>
			<div className={styles.actions}>
				<button
					className={isFavorite ? styles.favBtnActive : styles.favBtn}
					onClick={() => onToggleFavorite?.(product.id)}
					title={isFavorite ? 'Убрать из избранного' : 'В избранное'}
				>
					{isFavorite ? '★' : '☆'}
				</button>
				<button
					className={styles.addBtn}
					onClick={() => onAddToCart?.(product)}
				>
					Добавить в корзину
				</button>
			</div>
		</li>
	);
}
