
import { CartItem, ListResponse } from '../types';
import styles from './Cart.module.scss';

type Props = ListResponse<CartItem> & {
	onClear: () => void;
	onRemoveOne: (id: string) => void;
	onClose?: () => void;
};

export function CartWidget({
	items,
	total,
	onClear,
	onRemoveOne,
	onClose,
}: Props) {
	const isEmpty = items.length === 0;

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				{onClose && (
					<button
						className={styles.closeBtn}
						onClick={onClose}
						aria-label="Закрыть"
					>
						✕
					</button>
				)}
				<h2 className={styles.title}>Корзина</h2>
				<div className={styles.cartContent}>
					{isEmpty ? (
						<div className={styles.empty}>Корзина пуста</div>
					) : (
						<>
							<ul className={styles.cartList}>
								{items.map((item) => (
									<li className={styles.cartItem} key={item.id}>
										<div>
											<span className={styles.itemName}>{item.name}</span>
											<span className={styles.itemQty}>×{item.quantity}</span>
										</div>
										<button
											className={styles.removeBtn}
											onClick={() => onRemoveOne(String(item.id))}
											title="Уменьшить количество"
										>
											−
										</button>
									</li>
								))}
							</ul>
							<div className={styles.footer}>
								<span className={styles.total}>Товаров: {total}</span>
								<button className={styles.clearBtn} onClick={onClear}>
									Очистить корзину
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
