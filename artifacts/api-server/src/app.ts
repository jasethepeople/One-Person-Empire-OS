import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
// Speed Insights is configured and available in src/lib/speed-insights.ts
// To enable for HTML responses, uncomment the following:
// import { speedInsightsMiddleware } from "./lib/speed-insights";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// To enable Speed Insights for HTML responses, uncomment:
// app.use(speedInsightsMiddleware());

app.use("/api", router);

export default app;
