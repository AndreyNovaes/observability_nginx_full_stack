import * as amqp from 'amqplib';
import { IMessageHandler } from './IMessageHandler';
import dotenv from "dotenv";
import { MessageStorage } from '../MessageStorage';

dotenv.config();

export class RabbitMQConsumer implements IMessageHandler {
  private messageStorage: MessageStorage;
  private channel: amqp.Channel | null;

  constructor(messageStorage: MessageStorage) {
    this.messageStorage = messageStorage;
    this.channel = null;
  }

  private async onMessage(msg: amqp.ConsumeMessage | null) {
    if (msg !== null && this.channel) {
      const messageContent = msg.content.toString();
      console.log('Received message:', messageContent);
  
      this.messageStorage.addMessage(messageContent);
  
      this.channel.ack(msg);
    }
  }
  async start() {
    try {
      console.log('Starting consumer...' + process.env.RABBITMQ_URL);
      
      const connection = process.env.RABBITMQ_URL ? await amqp.connect(process.env.RABBITMQ_URL) : await amqp.connect('amqp://rabbitmq:5672');
      this.channel = await connection.createChannel();

      const queue = 'task_queue';
      await this.channel.assertQueue(queue, { durable: true });
      console.log(' [*] Waiting for messages. To exit, press CTRL+C');

      this.channel.consume(queue, (msg) => {
        if (msg) {
          const message = msg.content.toString();
          console.log(` [x] Received ${message}`);
          this.messageStorage.addMessage(message);        
        }
      }, { noAck: true });
    } catch (error) {
      console.error('Error while starting consumer:', error);
    }
  }
}
