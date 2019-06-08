import amqp from 'amqp-connection-manager';
import dotenv from 'dotenv';
dotenv.config();
const AMQPConn = amqp.connect(
	[`amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_URL}:${process.env.RABBITMQ_PORT}`],
	{ reconnectTimeInSeconds: 1, heartbeatIntervalInSeconds: 3 }
);

AMQPConn.once('connect', function() {
	console.log('RabbitMQ connection opened!');
});
AMQPConn.on('disconnect', function(err) {
	console.log('Error RabbitMQ: %s', JSON.stringify(err));
	console.log('RabbitMQ connection closed!');
});
export default AMQPConn;
