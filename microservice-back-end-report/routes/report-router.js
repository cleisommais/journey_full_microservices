import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import clientBroker from '../service-broker/client';

const reportRouter = express.Router();

reportRouter.route('/').get((req, resp, next) => {
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
export default reportRouter;
