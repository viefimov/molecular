import type { Context } from "moleculer";
import ApiService,{ Route } from 'moleculer-web';
import {ClientRequest, ServerResponse} from "node:http"
import { ServiceMeta } from './types';
const E = ApiService.Errors;

interface ApiError extends Error {
  code: number;
}

const isApiError = (x: unknown): x is ApiError => {
  return x instanceof Error && (x as ApiError).code !== undefined;
}

export default {
  name: "gateway",
  mixins: [ApiService],

  settings: {
    port: 3000,
    routes: [{
      mappingPolicy: "restrict",
      mergeParams: false,
      autoAliases: true,
      optimizeOrder: true,
      bodyParsers: {
        json: {
          strict: false
        },
        urlencoded: {
          extended: false
        }
      },
      path: "/api",
      whitelist: [
        // /^(?!gateway|\$node).*/ig
        "*.*"
      ],
      blacklist: [
        "$node.*"
      ],
      callOptions: {
        timeout: 3000,
        retries: 3,
        fallbackResponse: '{"error": "Service unavailable", "message": "Service unavailable"}'
      },
      onBeforeCall(ctx: Context<{}, ServiceMeta>, route: Route, req: ClientRequest, res: ServerResponse) {
        ctx.meta.user = null;
      },
      onAfterCall(ctx: Context<{}, ServiceMeta>, route: Route, req: ClientRequest, res: ServerResponse, data: unknown) {
        return data;
      },
      onError(req: ClientRequest, res: ServerResponse, err: unknown) {
        res.setHeader("Content-Type", "application/json");
        const { name, code, message } = isApiError(err) ? err : { name: "UnknownError", code: 500 };
        res.writeHead(code);
        res.end(JSON.stringify({
          error: name,
          message: message,
        }));
      }
    }]
  },
  actions: {
    listAliases: {
      rest: false,
    }
  }
}
