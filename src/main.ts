import "dotenv/config";
import { ServiceBroker, BrokerOptions } from "moleculer";
import path from "node:path";

import packageMeta from "../package.json";

//@ts-ignore
import config from "../moleculer.config.js";

const broker = new ServiceBroker({
    nodeID: packageMeta.name,
    metadata: {
      version: packageMeta.version
    },
    hotReload: true,
    errorHandler(err, info) {
      // Handle the error
      this.logger.warn("Error handled:", err);
    },
    ...(config as BrokerOptions)
});

let serviceList = process.env.SERVICES ?? '*';
if (serviceList === 'all') serviceList = '*';
else if (serviceList.split(',').length > 1) serviceList = `\{${serviceList}\}`;

broker.loadServices(path.join(__dirname, "**/*"), `${serviceList}.service.{ts,js}`);

broker.start().then(() => {
    // Switch to REPL mode
    broker.repl();
});
