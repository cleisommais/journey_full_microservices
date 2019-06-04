import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';
const Schema = mongoose.Schema;
const AutoIncrement = mongooseSequence(mongoose);

const ProductModel = new Schema(
	{
		_id: Number,
		name: {
			type: String,
			required: true,
			index: {
				unique: true,
			},
		},
		value: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	},
	{
		_id: false,
	}
);

ProductModel.plugin(AutoIncrement, {
	collection_name: 'product_counter',
});
export default mongoose.model('product', ProductModel);
