import { Router } from 'express';
import { PublishMessageController } from '../controllers/publishMessage.controller';

export const createPublishMessageRouter = (publishMessageController: PublishMessageController) => {
  const publishMessageRouter = Router();

  publishMessageRouter.post('/', publishMessageController.publish);

  return publishMessageRouter;
};
