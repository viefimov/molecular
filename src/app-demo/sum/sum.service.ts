import type { Context, ServiceBroker } from "moleculer";


export default {
  name: "demo",
  actions: {
    sum(this: ServiceBroker, ctx: Context<{ a: number, b: number }>) {
      const { a, b } = ctx.params;
      this.logger.info(`Sum called with a=${a} and b=${b}`);
      return a + b;
    }
  }
};