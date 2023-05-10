import express from "express";
import dotenv from "dotenv";
// controllers (dependency injection)
import { categoriesController } from "./dependencyWiring/categories.wiring";
import { websitesController } from "./dependencyWiring/websites.wiring";
import { searchController } from "./dependencyWiring/search.wiring";
import { publishMessageController } from "./dependencyWiring/rabbitMQPublisher.wiring";
// route creators
import { createCategoriesRouter } from "./routes/categories.route";
import { createWebsitesRouter } from "./routes/websites.route";
import { createSearchRouter } from "./routes/search.route";
import { createMetricsRouter } from "./routes/metrics.route";
import { createPublishMessageRouter } from "./routes/publishMessage.route";
// cors
import cors from "cors";
// error middleware
import { errorMiddleware } from "./Error/error.middleware";
// message handler
import { rabbitMQConsumer } from './dependencyWiring/rabbitMQConsumer.wiring';
import { createMessagesRouter } from './routes/messages.route';
import { messageStorage } from './dependencyWiring/messageStorage.wiring';

rabbitMQConsumer.start();

dotenv.config();

const app = express();

rabbitMQConsumer.start();

app.use(cors());
app.use(express.json());

app.use("/categories", createCategoriesRouter(categoriesController));
app.use("/websites", createWebsitesRouter(websitesController));
app.use("/search", createSearchRouter(searchController));
app.use("/metrics", createMetricsRouter());
app.use("/publish-message", createPublishMessageRouter(publishMessageController));
app.use("/messages", createMessagesRouter(messageStorage));

app.use(errorMiddleware);

export default app;
