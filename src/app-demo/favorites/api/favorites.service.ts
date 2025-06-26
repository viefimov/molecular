import type { Context, ServiceBroker } from 'moleculer';

type FavoriteItem = { id: string };


let favorites: FavoriteItem[] = [];

export default {
	name: 'favorites',
	actions: {
		list: {
			rest: 'GET /',
			handler(
				this: ServiceBroker,
				ctx: Context
			): { items: string[]; total: number } {
				this.logger.info(`Favorites list called`);
				return {
					total: favorites.length,
					items: favorites.map((f) => f.id),
				};
			},
		},

		add: {
			rest: 'POST /add',
			handler(
				this: ServiceBroker,
				ctx: Context<{ body: FavoriteItem }>
			): { success: boolean } {
				const id = String(ctx.params.body.id);
				if (!favorites.find((item) => String(item.id) === id)) {
					favorites.push({ id });
					this.logger.info(`Added to favorites: ${id}`);
				}
				return { success: true };
			},
		},

		remove: {
			rest: 'POST /remove',
			handler(
				this: ServiceBroker,
				ctx: Context<{ body: { id: string } }>
			): { success: boolean } {
				const id = String(ctx.params.body.id);
				const before = favorites.length;
				favorites = favorites.filter((item) => String(item.id) !== id);
				if (favorites.length < before) {
					this.logger.info(`Removed from favorites: ${id}`);
				} else {
					this.logger.info(
						`Tried to remove, but not found in favorites: ${id}`
					);
				}
				return { success: true };
			},
		},

		clear: {
			rest: 'POST /clear',
			handler(this: ServiceBroker): { success: boolean } {
				favorites = [];
				this.logger.info(`Favorites cleared`);
				return { success: true };
			},
		},
	},
};
