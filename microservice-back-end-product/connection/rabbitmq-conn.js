import amqp from 'amqp-connection-manager-rpc';
import dotenv from 'dotenv';
dotenv.config();
let AMQPConn = amqp.connect(
	[`amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_URL}:${process.env.RABBITMQ_PORT}`],
	{ json: true }
);

AMQPConn.on('connect', function() {
	console.log('RabbitMQ connection opened!');
});
AMQPConn.on('disconnect', function(err) {
	console.log('Error RabbitMQ: %s', JSON.stringify(err));
	console.log('RabbitMQ connection closed!');
});
export default AMQPConn;
