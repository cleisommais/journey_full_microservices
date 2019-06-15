import AMQPConn from '../connection/rabbitmq-conn';
const queue = process.env.RABBITMQ_QUEUE == null ? 'consumer-queue' : process.env.RABBITMQ_QUEUE;
import RedisConn from '../connection/redis-conn';
const prefix = process.env.REDIS_PREFIX == null ? 'consumer_' : process.env.REDIS_PREFIX;

let serverBroker = AMQPConn.createRPCServer(queue, doRpcJob);

//do RPC job
async function doRpcJob(msg) {
	let consumerFromCache = [];
	let resultconsumer = new Promise((resolve, reject) => {
		//first retrieve only stream keys with "consumer_*" from Redis
		let stream = RedisConn.scanStream({
			match: prefix + '*',
		});
		let pipeline = RedisConn.pipeline();
		//once we got all consumer keys, we will retrieve the data from each key using "get"
		stream.on('data', function(resultKeys) {
			for (var i = 0; i < resultKeys.length; i++) {
				pipeline.get(resultKeys[i]);
			}
			console.log('1');
		});
		stream.on('end', function() {
			pipeline.exec(function(error, consumers) {
				if (error) {
					resp.status(400).json({
						message: error,
					});
					next(error);
				} else {
					//for each data retrieved, we will handling the data to correct JSON parse and add it within array variable, before send the response
					consumers.forEach(function(consumer) {
						let varSupport = '';
						varSupport = consumer.toString();
						consumer = varSupport.replace(',{', '{');
						consumerFromCache.push(JSON.parse(consumer));
					});
					resolve(consumerFromCache);
				}
			});
		});
	});
	return await resultconsumer;
}

export default serverBroker;
