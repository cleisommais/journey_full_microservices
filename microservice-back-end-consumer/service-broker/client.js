import AMQPConn from '../connection/rabbitmq-conn';
const queue = process.env.RABBITMQ_QUEUE == null ? 'consumer-queue' : process.env.RABBITMQ_QUEUE;
const ttl = 60;

let clientBroker = AMQPConn.createRPCClient(queue, ttl);

export default clientBroker;
