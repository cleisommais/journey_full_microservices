import AMQPConn from '../connection/rabbitmq-conn';
const queue = process.env.RABBITMQ_QUEUE == null ? 'product-queue' : process.env.RABBITMQ_QUEUE;

const serverBroker = AMQPConn.createChannel({
	json: true,
});

serverBroker.addSetup(function(ch) {
	return Promise.all([
		ch.assertQueue(queue, { durable: true }),
		ch.prefetch(1),
		ch.consume(queue, msg => {
			console.log('SERVER: message received, %s', msg.content.toString());
			ch.ack(msg);
		}),
	]);
});

export default serverBroker;
