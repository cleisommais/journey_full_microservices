import express from 'express';
import ProductModel from '../model/product-model';
const ProductRouter = express.Router();

ProductRouter.route('/')
	.get((req, resp, next) => {
		try {
			ProductModel.find((error, product) => {
				if (error) {
					resp.status(400).json({
						message: error,
					});
					next(error);
				} else {
					resp.status(200).json(product);
				}
			});
		} catch (error) {
			resp.status(500).json({
				message: error,
			});
			next(error);
		}
	})
	.post((req, resp, next) => {
		try {
			let product = new ProductModel(req.body);
			product.save(error => {
				if (error) {
					resp.status(400).json({
						message: error,
					});
					next(error);
				} else {
					resp.status(201).json(product);
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
	try {
		ProductModel.findById(req.params.id, (error, product) => {
			if (error) {
				resp.status(400).json({
					message: error,
				});
				next(error);
			} else if (!product) {
				resp.status(404).json({
					message: `Resource ${req.params.id} not found`,
				});
			} else {
				req.product = product;
				next();
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
		resp.status(200).json(req.product);
	})
	.put((req, resp, next) => {
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
					resp.status(202).send(product);
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
		try {
			req.product._id = req.params.id;
			ProductModel.findOneAndDelete(req.params.id, (error, product) => {
				if (error) {
					resp.status(400).json({
						message: error,
					});
					next(error);
				} else {
					resp.status(204).send(product);
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
