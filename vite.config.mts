import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";
import path from "path";
import { globSync } from "glob";

import vhostConfig from "./src/vhosts.json";

const APP = process.env.VITE_APP;
const CDN = process.env.VITE_CDN ?? '';
const PORT = APP ? vhostConfig[APP].port : '3001';

const exposes = globSync(
  `src/${APP}/**/*.federated.tsx`
)
  .map(file => {
    const [name] = path.basename(file).split('.');
    const parts = file.split(path.sep);
    const url = './' + parts.join('/');
    return { name, url }
  })
  .reduce((acc, { name, url }) => ({
    ...acc,
    [name]: url
  }), {});

const remotes = globSync(
  `src/**/*.federated.tsx`
)
  .map(file => {
    const parts = file.split(path.sep);
    return parts[1];
  })
  .filter(name => name !== APP)
  .reduce((acc, app) => {
    return {
      ...acc,
      [vhostConfig[app].remote]: CDN + `/${app}/lib.js`
    }
  }, {});

const proxyConfig = {
  [vhostConfig['api'].remote]: `http://localhost:${vhostConfig['api'].port}`,
};

const serverConfig = {
  host: true,
  port: PORT,
  cors: true,
  proxy: proxyConfig,
};

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		},
	},
	plugins: [
		react(),
    federation({
      name: "lib",
      filename: "lib.js",
      exposes,
      remotes,
      shared: ["react", "react-dom"],
    }),
	],
  build: {
    outDir: "dist/" + process.env.VITE_APP,
    target: "esnext",
  },
  server: serverConfig,
  preview: serverConfig
});
