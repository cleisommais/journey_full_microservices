import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';
const Schema = mongoose.Schema;
const AutoIncrement = mongooseSequence(mongoose);

const OrderModel = new Schema(
	{
		_id: Number,
		product_id: {
			type: Number,
			required: true,
		},
		consumerName: {
			type: String,
			required: true,
		},
		consumer_id: {
			type: Number,
			required: true,
		},
		productName: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		_id: false,
	}
);

OrderModel.plugin(AutoIncrement, {
	collection_name: 'order_counter',
});
export default mongoose.model('order', OrderModel);
