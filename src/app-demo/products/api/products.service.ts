import type { Context, ServiceBroker } from "moleculer";
import { Product, ProductListFilter } from '../types';
import { ListResponse } from '@/base/web/types';
import { data } from "../mock";

export default {
  name: "products",
  actions: {
    list: {
      rest: "GET /",
      handler(this: ServiceBroker, ctx: Context<{
        params: ProductListFilter;
      }>): ListResponse<Product> {
        const { category } = ctx.params.params;
        this.logger.info(`List called with category=${category}`);
        const result = category
          ? data.filter(item => item.category.toLowerCase() === category)
          : data;
        return {
          total: result.length,
          items: result
        }
      }
    }
  }
};
