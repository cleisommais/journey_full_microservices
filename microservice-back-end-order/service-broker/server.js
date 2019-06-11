import AMQPConn from '../connection/rabbitmq-conn';
const queue = process.env.RABBITMQ_QUEUE == null ? 'order-queue' : process.env.RABBITMQ_QUEUE;

let serverBroker = AMQPConn.createRPCServer(queue, doRpcJob);

//do RPC job
async function doRpcJob(msg) {
	return msg;
}

export default serverBroker;
