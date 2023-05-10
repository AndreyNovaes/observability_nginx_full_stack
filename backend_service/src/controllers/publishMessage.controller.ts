import { Request, Response } from 'express';
import { publishMessage } from '../messageHandler/RabbitMQPublisher';

export class PublishMessageController {
  async publish(req: Request, res: Response) {
    try {
      const { message } = req.body;
      console.log('Message received on backend controller:', message);
      if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
      }
      await publishMessage(message);
      res.status(200).json({ message: 'Message published successfully.' });
    } catch (error) {
      console.error('Error publishing message:', error);
      res.status(500).json({ error: 'Failed to publish message.' });
    }
  }
}
