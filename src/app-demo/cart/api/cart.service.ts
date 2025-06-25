// src/app-cart/cart/api/cart.service.ts
import type { Context, ServiceBroker } from 'moleculer';
import { CartItem } from '../types';
import { ListResponse } from '@/base/web/types';

let cart: CartItem[] = [];

export default {
	name: 'cart',
	actions: {
		list: {
			rest: 'GET /',
			handler(this: ServiceBroker, ctx: Context): ListResponse<CartItem> {
				this.logger.info(`Cart list called`);
				return {
					total: cart.length,
					items: cart,
				};
			},
		},

		add: {
			rest: 'POST /',
			handler(
				this: ServiceBroker,
				ctx: Context<{ body: CartItem }>
			): { success: boolean } {
				if (cart.find((item) => item.id === ctx.params.body.id)) {
					cart.find((item) => item.id === ctx.params.body.id)!.quantity += 1;
				} else {
					cart.push(ctx.params.body);
					this.logger.info(`Added to cart: ${ctx.params.body.id}`);
				}
				return { success: true };
			},
		},

		clear: {
			rest: 'POST /clear',
			handler(this: ServiceBroker): { success: boolean } {
				cart = [];
				this.logger.info(`Cart cleared`);
				return { success: true };
			},
		},
		removeOne: {
			rest: 'POST /removeOne',
			handler(
				this: ServiceBroker,
				ctx: Context<{ body: { id: string } }>
			): { success: boolean } {

				const id = String(ctx.params.body.id);
				const item = cart.find((item) => String(item.id) === id);
				if (item) {
					item.quantity -= 1;
					if (item.quantity <= 0) {
						cart = cart.filter((item) => String(item.id) !== id);
					}
					this.logger.info(`Removed one from cart: ${id}`);
				} else {
					this.logger.info(`Item not found in cart: ${id}`);
				}
				return { success: true };
			},
		},
	},
};
