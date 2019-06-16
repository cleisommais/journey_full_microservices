import AMQPConn from '../connection/rabbitmq-conn';
const queue = process.env.RABBITMQ_CONSUMER_QUEUE == null ? 'consumer-queue' : process.env.RABBITMQ_CONSUMER_QUEUE;
const ttl = 60;

let clientConsumerBroker = AMQPConn.createRPCClient(queue, ttl);

export default clientConsumerBroker;
