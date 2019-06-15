import express from 'express';
import dotenv from 'dotenv';
import clientOrderBroker from '../service-broker/client-order';
import clientConsumerBroker from '../service-broker/client-consumer';
import clientProductBroker from '../service-broker/client-product';
dotenv.config();

const reportRouter = express.Router();

reportRouter.route('/').get((req, resp, next) => {
	let orders = new Promise((resolve, reject) => {
		clientOrderBroker.waitForConnect().then(function() {
			let prc_reply = clientOrderBroker.sendRPC('');
			resolve(prc_reply);
		});
	});

	let product = new Promise((resolve, reject) => {
		clientProductBroker.waitForConnect().then(function() {
			let prc_reply = clientProductBroker.sendRPC('');
			resolve(prc_reply);
		});
	});

	let consumer = new Promise((resolve, reject) => {
		clientConsumerBroker.waitForConnect().then(function() {
			let prc_reply = clientConsumerBroker.sendRPC('');
			resolve(prc_reply);
		});
	});

	Promise.all([orders, product, consumer])
		.then(values => {
			let orders = values[0];
			let products = values[1];
			let consumers = values[2];
			//quantity orders by consumer
			let quantOrderByConsumer = [];
			consumers.forEach(consumer => {
				let quant = 0;
				orders.forEach(order => {
					if (consumer._id === order.consumer_id) {
						quant++;
					}
				});
				quantOrderByConsumer.push({ quantity: quant, firstName: consumer.firstName + ' ' + consumer.lastName });
			});
			//quantity products by order
			let quantProductByOrder = [];
			products.forEach(product => {
				let quant = 0;
				orders.forEach(order => {
					if (product._id === order.product_id) {
						quant++;
					}
				});
				quantProductByOrder.push({ quantity: quant, name: product.name });
			});
			resp.status(200).json({
				quantOrderByConsumer: quantOrderByConsumer,
				quantProductByOrder: quantProductByOrder,
			});
		})
		.catch(err => {
			console.error(err);
			next(err);
		});
});

export default reportRouter;
