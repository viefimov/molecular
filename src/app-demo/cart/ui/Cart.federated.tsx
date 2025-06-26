import { useEffect, useState } from 'react';
import { CartItem } from '../types';
import {
	clearCart,
	getCartItems,
	removeOneFromCart,
} from '../api/client.api';
import { CartWidget } from './CartView';

type CartProps = {
	close?: () => void;
};

export default function Cart({ close }: CartProps) {
	const [items, setItems] = useState<CartItem[]>([]);

	const refreshCart = () => {
		getCartItems()
			.then(({ items }) => setItems(items))
			.catch(console.error);
	};

	useEffect(refreshCart, []);

	const handleClear = () => {
		clearCart().then(refreshCart).catch(console.error);
	};

	const handleRemoveOne = (id: string) => {
		removeOneFromCart(id).then(refreshCart).catch(console.error);
	};



	return (
		<CartWidget
			items={items}
			total={items.length}
			onClear={handleClear}
			onRemoveOne={handleRemoveOne}
			onClose={close}
		/>
	);
}
