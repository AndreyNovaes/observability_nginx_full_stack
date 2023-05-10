import { RequestHandler } from "express";
import client from "prom-client";

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const customMetric = new client.Counter({
  name: "my_custom_metric",
  help: "This is a custom metric",
  registers: [register],
});

customMetric.inc();

export const getMetrics: RequestHandler = async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch metrics" });
  }
};
