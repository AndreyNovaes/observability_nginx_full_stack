import express from "express";
import dotenv from "dotenv";
// controllers (dependency injection)
import { categoriesController } from "./dependencyWiring/categories.wiring";
import { websitesController } from "./dependencyWiring/websites.wiring";
import { searchController } from "./dependencyWiring/search.wiring";
// route creators
import { createCategoriesRouter } from "./routes/categories.route";
import { createWebsitesRouter } from "./routes/websites.route";
import { createSearchRouter } from "./routes/search.route";
// cors
import cors from "cors";
// error middleware
import { errorMiddleware } from "./Error/error.middleware";
// observability (prometheus)
import client from 'prom-client';

const register = new client.Registry();
client.collectDefaultMetrics({ register });
const customMetric = new client.Counter({
  name: 'my_custom_metric',
  help: 'This is a custom metric',
  registers: [register],
});
customMetric.inc();

dotenv.config();

const app = express();

app.use(cors());

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch metrics' });
  }
});

app.use("/categories", createCategoriesRouter(categoriesController));
app.use("/websites", createWebsitesRouter(websitesController));
app.use("/search", createSearchRouter(searchController));

app.use(errorMiddleware);

export default app;
