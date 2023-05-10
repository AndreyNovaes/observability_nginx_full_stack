import { RabbitMQConsumer } from '../messageHandler/RabbitMQConsumer';
import { messageStorage } from './messageStorage.wiring';

const rabbitMQConsumer = new RabbitMQConsumer(messageStorage);

export { rabbitMQConsumer };
