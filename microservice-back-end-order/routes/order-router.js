import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import orderModel from '../model/order-model';
import RedisConn from '../connection/redis-conn';
import clientBroker from '../service-broker/client';

const prefix = process.env.REDIS_PREFIX == null ? 'order_' : process.env.REDIS_PREFIX;
const orderRouter = express.Router();

orderRouter.route('/sendToQueue').get((req, resp, next) => {
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

orderRouter
	.route('/')
	.get((req, resp, next) => {
		//Retrieve all orders
		try {
			let orderFromCache = [];
			//first retrieve only stream keys with "order_*" from Redis
			let stream = RedisConn.scanStream({
				match: prefix + '*',
			});
			let pipeline = RedisConn.pipeline();
			//once we got all order keys, we will retrieve the data from each key using "get"
			stream.on('data', function(resultKeys) {
				for (var i = 0; i < resultKeys.length; i++) {
					pipeline.get(resultKeys[i]);
				}
			});
			stream.on('end', function() {
				pipeline.exec(function(error, orders) {
					if (error) {
						resp.status(400).json({
							message: error,
						});
						next(error);
					} else {
						//for each data retrieved, we will handling the data to correct JSON parse and add it within array variable, before send the response
						orders.forEach(function(order) {
							let varSupport = '';
							varSupport = order.toString();
							order = varSupport.replace(',{', '{');
							orderFromCache.push(JSON.parse(order));
						});
						resp.status(200).json(orderFromCache);
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
		//create a new order
		try {
			let order = new orderModel(req.body);
			order.save(error => {
				if (error) {
					resp.status(400).json({
						message: error,
					});
					next(error);
				} else {
					//set a new data within Redis first is the key (prefix + id) and second the data
					RedisConn.set(`${prefix}${order._id}`, JSON.stringify(order)).then(() => {
						resp.status(201).json(order);
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
orderRouter.use('/:id', (req, resp, next) => {
	//verify if resource required exist, if yes move to next one
	try {
		//Retrieve the data using "get order_id" from Redis
		RedisConn.get(`${prefix}${req.params.id}`, function(error, order) {
			if (error) {
				resp.status(400).json({
					message: error,
				});
				next(error);
			} else {
				if (order != null) {
					req.order = JSON.parse(order);
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
orderRouter
	.route('/:id')
	.get((req, resp, next) => {
		//retrieve a order by id
		resp.status(200).json(req.order);
	})
	.put((req, resp, next) => {
		//update a order by id
		try {
			req.order.product_id = req.body.product_id;
			req.order.consumerName = req.body.consumerName;
			req.order.consumer_id = req.body.consumer_id;
			req.order.productName = req.body.productName;
			req.order.quantity = req.body.quantity;
			req.order.date = req.body.date;
			orderModel
				.findOneAndUpdate(
					{ _id: req.params.id },
					{
						$set: {
							product_id: req.body.product_id,
							consumerName: req.body.consumerName,
							consumer_id: req.body.consumer_id,
							productName: req.body.productName,
							quantity: req.body.quantity,
							date: req.body.date,
						},
					},
					{ new: true, setDefaultsOnInsert: true }
				)
				.then(order => {
					//set a new data within Redis first is the key (prefix + id) and second the data
					RedisConn.set(`${prefix}${req.params.id}`, JSON.stringify(order)).then(() => {
						resp.status(202).send(order);
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
		//delete one order by id
		try {
			req.order._id = req.params.id;
			orderModel.findOneAndDelete(req.params.id, (error, order) => {
				if (error) {
					resp.status(400).json({
						message: error,
					});
					next(error);
				} else {
					//remove the data using the key (prefix + id)
					RedisConn.del(`${prefix}${req.params.id}`).then(() => {
						resp.status(204).send(order);
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
export default orderRouter;
