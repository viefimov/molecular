import type { Context, ServiceBroker } from 'moleculer';
import { Product, ProductListFilter } from '../types';
import { ListResponse } from '@/base/web/types';
import { data } from '../mock';

type GatewayParams = {
	query?: {
		category?: string;
		search?: string;
	};
};

export default {
	name: 'products',
	actions: {
		list: {
			rest: 'GET /',
			handler(this: ServiceBroker, ctx: Context<GatewayParams>) {
				const category =
					ctx.params.query?.category?.toLowerCase().trim().replace(/\?/, '') ||
					'';
				const search =
					ctx.params.query?.search?.toLowerCase().trim().replace(/\?/, '') ||
					'';
				let result = data;

				if (category) {
					result = result.filter(
						(item) =>
							item.category.toLowerCase().trim().replace(/\?/, '') === category
					);
				}
				if (search) {
					result = result.filter(
						(item) =>
							item.name
								.toLowerCase()
								.trim()
								.replace(/\?/, '')
								.includes(search) ||
							item.category
								.toLowerCase()
								.trim()
								.replace(/\?/, '')
								.includes(search)
					);
				}
				this.logger.info('Фильтрую по', {
					category,
					search,
					found: result.length,
				});
				return { total: result.length, items: result };
			},
		},
		categories: {
			rest: 'GET /categories',
			handler() {
				const unique = Array.from(new Set(data.map((p) => p.category)));

				unique.sort((a, b) => a.localeCompare(b, 'ru'));
				return { items: unique };
			},
		},
	},
};
