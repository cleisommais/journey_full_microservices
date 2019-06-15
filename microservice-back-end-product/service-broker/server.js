import AMQPConn from '../connection/rabbitmq-conn';
const queue = process.env.RABBITMQ_QUEUE == null ? 'product-queue' : process.env.RABBITMQ_QUEUE;
import RedisConn from '../connection/redis-conn';
const prefix = process.env.REDIS_PREFIX == null ? 'product_' : process.env.REDIS_PREFIX;

let serverBroker = AMQPConn.createRPCServer(queue, doRpcJob);

//do RPC job
async function doRpcJob(msg) {
	let productFromCache = [];
	let resultproduct = new Promise((resolve, reject) => {
		//first retrieve only stream keys with "product_*" from Redis
		let stream = RedisConn.scanStream({
			match: prefix + '*',
		});
		let pipeline = RedisConn.pipeline();
		//once we got all product keys, we will retrieve the data from each key using "get"
		stream.on('data', function(resultKeys) {
			for (var i = 0; i < resultKeys.length; i++) {
				pipeline.get(resultKeys[i]);
			}
		});
		stream.on('end', function() {
			pipeline.exec(function(error, products) {
				if (error) {
					resp.status(400).json({
						message: error,
					});
					next(error);
				} else {
					//for each data retrieved, we will handling the data to correct JSON parse and add it within array variable, before send the response
					products.forEach(function(product) {
						let varSupport = '';
						varSupport = product.toString();
						product = varSupport.replace(',{', '{');
						productFromCache.push(JSON.parse(product));
					});
					resolve(productFromCache);
				}
			});
		});
	});
	return await resultproduct;
}

export default serverBroker;
