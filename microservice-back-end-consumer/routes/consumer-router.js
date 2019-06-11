import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import consumerModel from '../model/consumer-model';
import RedisConn from '../connection/redis-conn';
import clientBroker from '../service-broker/client';

const prefix = process.env.REDIS_PREFIX == null ? 'consumer_' : process.env.REDIS_PREFIX;
const consumerRouter = express.Router();

consumerRouter.route('/sendToQueue').get((req, resp, next) => {
	clientBroker.waitForConnect().then(async function() {
		console.log('Connected to RPC channel');
		let req = { id: 1, date: new Date() };
		try {
			let prc_reply = await clientBroker.sendRPC(req);
			console.log('RPC reply: ', prc_reply);
			resp.status(200).json({
				message: prc_reply,
			});
		} catch (err) {
			console.log('RPC error: ', err);
		}
	});
});

consumerRouter
	.route('/')
	.get((req, resp, next) => {
		//Retrieve all consumers
		try {
			let consumerFromCache = [];
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
						resp.status(200).json(consumerFromCache);
					}
				});
			});
		} catch (error) {
			resp.status(500).json({
				message: error,
			});
			next(error);
		}
	})
	.post((req, resp, next) => {
		//create a new consumer
		try {
			let consumer = new consumerModel(req.body);
			consumer.save(error => {
				if (error) {
					resp.status(400).json({
						message: error,
					});
					next(error);
				} else {
					//set a new data within Redis first is the key (prefix + id) and second the data
					RedisConn.set(`${prefix}${consumer._id}`, JSON.stringify(consumer)).then(() => {
						resp.status(201).json(consumer);
					});
				}
			});
		} catch (error) {
			resp.status(500).json({
				message: error,
			});
			next(error);
		}
	});
consumerRouter.use('/:id', (req, resp, next) => {
	//verify if resource required exist, if yes move to next one
	try {
		//Retrieve the data using "get consumer_id" from Redis
		RedisConn.get(`${prefix}${req.params.id}`, function(error, consumer) {
			if (error) {
				resp.status(400).json({
					message: error,
				});
				next(error);
			} else {
				if (consumer != null) {
					req.consumer = JSON.parse(consumer);
					next();
				} else {
					resp.status(404).json({
						message: `Resource ${req.params.id} not found`,
					});
				}
			}
		});
	} catch (error) {
		resp.status(500).json({
			message: error,
		});
		next(error);
	}
});
consumerRouter
	.route('/:id')
	.get((req, resp, next) => {
		//retrieve a consumer by id
		resp.status(200).json(req.consumer);
	})
	.put((req, resp, next) => {
		//update a consumer by id
		try {
			req.consumer.firstName = req.body.firstName;
			req.consumer.lastName = req.body.lastName;
			req.consumer.email = req.body.email;
			consumerModel
				.findOneAndUpdate(
					{ _id: req.params.id },
					{
						$set: {
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
						},
					},
					{ new: true, setDefaultsOnInsert: true }
				)
				.then(consumer => {
					//set a new data within Redis first is the key (prefix + id) and second the data
					RedisConn.set(`${prefix}${req.params.id}`, JSON.stringify(consumer)).then(() => {
						resp.status(202).send(consumer);
					});
				})
				.catch(error => {
					resp.status(400).json({
						message: error,
					});
					next(error);
				});
		} catch (error) {
			resp.status(500).json({
				message: error,
			});
			next(error);
		}
	})
	.delete((req, resp, next) => {
		//delete one consumer by id
		try {
			req.consumer._id = req.params.id;
			consumerModel.findOneAndDelete(req.params.id, (error, consumer) => {
				if (error) {
					resp.status(400).json({
						message: error,
					});
					next(error);
				} else {
					//remove the data using the key (prefix + id)
					RedisConn.del(`${prefix}${req.params.id}`).then(() => {
						resp.status(204).send(consumer);
					});
				}
			});
		} catch (error) {
			resp.status(500).json({
				message: error,
			});
			next(error);
		}
	});
export default consumerRouter;
