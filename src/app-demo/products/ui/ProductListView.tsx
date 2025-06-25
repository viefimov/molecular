import { Product } from '@/app-demo/products/types.ts';
import styles from './ProductList.module.scss';
import { ProductItem } from './ProductItem';

export interface ProductListProps {
	title?: string;
	items: Product[];
	onClick?: (item: Product) => void;
	openCart?: () => void;
	onToggleFavorite?: (id: string) => void;
	favoriteIds?: string[];
}

export function ProductListView({
	title = 'List',
	items,
	onClick,
	openCart,
	onToggleFavorite,
	favoriteIds = [],
}: ProductListProps) {
	return (
		<div data-testid="ProductList">
			<div style={{ padding: 24 }}></div>
			<button className={styles.openCartBtn} onClick={openCart}>
				<span className="icon" role="img" aria-label="cart">
					🛒
				</span>
				Открыть корзину
			</button>
			<ul className={styles.productList}>
				{items.map((item) => (
					<ProductItem
						key={item.id}
						product={item}
						onAddToCart={onClick}
						onToggleFavorite={onToggleFavorite}
						isFavorite={favoriteIds.includes(item.id)}
					/>
				))}
			</ul>
		</div>
	);
}
