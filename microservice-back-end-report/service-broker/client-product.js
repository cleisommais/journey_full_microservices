import AMQPConn from '../connection/rabbitmq-conn';
const queue = process.env.RABBITMQ_PRODUCT_QUEUE == null ? 'product-queue' : process.env.RABBITMQ_PRODUCT_QUEUE;
const ttl = 60;

let clientProductBroker = AMQPConn.createRPCClient(queue, ttl);

export default clientProductBroker;
