import * as amqp from 'amqplib';

export async function publishMessage(message: string) {
  try {
    const connection = process.env.RABBITMQ_URL
      ? await amqp.connect(process.env.RABBITMQ_URL)
      : await amqp.connect('amqp://rabbitmq:5672');
    console.log('Connection established: ' + process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    const queue = 'task_queue';
    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log(` [x] Sent '${message}'`);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error while publishing message:', error);
  }
}
