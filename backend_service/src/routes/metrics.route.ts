import { Router } from "express";
import { getMetrics } from "../controllers/metrics.controller";

export const createMetricsRouter = () => {
  const router = Router();
  router.get("/", getMetrics);
  return router;
};
