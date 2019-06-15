import express from 'express';
import dotenv from 'dotenv';
import clientOrderBroker from '../service-broker/client-order';
import clientConsumerBroker from '../service-broker/client-consumer';
import clientProductBroker from '../service-broker/client-product';
dotenv.config();

const reportRouter = express.Router();

reportRouter.route('/').get((req, resp, next) => {
	let orders = new Promise((resolve, reject) => {
		clientOrderBroker.waitForConnect().then(async function() {
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
			console.log(values);
			resp.status(200).json({
				values: values,
			});
		})
		.catch(err => {
			console.error(err);
			next(err);
		});
});

export default reportRouter;
