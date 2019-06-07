import Redis from 'ioredis';
const prefix = process.env.REDIS_PREFIX == null ? 'product_' : process.env.REDIS_PREFIX;

const RedisConn = new Redis({
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_URL,
	password: process.env.REDIS_PASSWORD,
	prefix: prefix,
	retryStrategy: function(times) {
		let delay = Math.min(times * 50, 2000);
		return delay;
	},
	reconnectOnError: function(err) {
		let targetError = 'READONLY';
		if (err.message.slice(0, targetError.length) === targetError) {
			// Only reconnect when the error starts with "READONLY"
			return true; // or `return 1;`
		}
	},
});

RedisConn.on('error', function(err) {
	console.log('Redis Error: ' + err);
});
RedisConn.on('connected', function() {
	console.log('Redis connected!');
});
RedisConn.once('open', function() {
	console.log('Redis connection opened!');
});
export default RedisConn;
