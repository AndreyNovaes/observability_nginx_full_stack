import { Router } from 'express';
import { MessageStorage } from '../MessageStorage';

export const createMessagesRouter = (messageStorage: MessageStorage) => {
  const messagesRouter = Router();

  messagesRouter.get('/', (req, res) => {
    res.json(messageStorage.getMessages());
  });

  return messagesRouter;
};
