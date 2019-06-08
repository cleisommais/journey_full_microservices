import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import ProductModel from '../model/product-model';
import RedisConn from '../connection/redis-conn';

const prefix = process.env.REDIS_PREFIX == null ? 'product_' : process.env.REDIS_PREFIX;
const ProductRouter = express.Router();

ProductRouter.route('/')
	.get((req, resp, next) => {
		//Retrieve all products
		try {
			let productFromCache = [];
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
						resp.status(200).json(productFromCache);
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
		//create a new product
		try {
			let product = new ProductModel(req.body);
			product.save(error => {
				if (error) {
					resp.status(400).json({
						message: error,
					});
					next(error);
				} else {
					//set a new data within Redis first is the key (prefix + id) and second the data
					RedisConn.set(`${prefix}${product._id}`, JSON.stringify(product)).then(() => {
						resp.status(201).json(product);
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
ProductRouter.use('/:id', (req, resp, next) => {
	//verify if resource required exist, if yes move to next one
	try {
		//Retrieve the data using "get product_id" from Redis
		RedisConn.get(`${prefix}${req.params.id}`, function(error, product) {
			if (error) {
				resp.status(400).json({
					message: error,
				});
				next(error);
			} else {
				if (product != null) {
					req.product = JSON.parse(product);
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
ProductRouter.route('/:id')
	.get((req, resp, next) => {
		//retrieve a product by id
		resp.status(200).json(req.product);
	})
	.put((req, resp, next) => {
		//update a product by id
		try {
			req.product.name = req.body.name;
			req.product.value = req.body.value;
			req.product.quantity = req.body.quantity;
			ProductModel.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$set: {
						name: req.body.name,
						value: req.body.value,
						quantity: req.body.quantity,
					},
				},
				{ new: true, setDefaultsOnInsert: true }
			)
				.then(product => {
					//set a new data within Redis first is the key (prefix + id) and second the data
					RedisConn.set(`${prefix}${req.params.id}`, JSON.stringify(product)).then(() => {
						resp.status(202).send(product);
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
		//delete one product by id
		try {
			req.product._id = req.params.id;
			ProductModel.findOneAndDelete(req.params.id, (error, product) => {
				if (error) {
					resp.status(400).json({
						message: error,
					});
					next(error);
				} else {
					//remove the data using the key (prefix + id)
					RedisConn.del(`${prefix}${req.params.id}`).then(() => {
						resp.status(204).send(product);
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
export default ProductRouter;
