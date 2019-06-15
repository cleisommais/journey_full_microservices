import AMQPConn from '../connection/rabbitmq-conn';
const queue = process.env.RABBITMQ_ORDER_QUEUE == null ? 'order-queue' : process.env.RABBITMQ_ORDER_QUEUE;
const ttl = 60;

let clientOrderBroker = AMQPConn.createRPCClient(queue, ttl);

export default clientOrderBroker;
