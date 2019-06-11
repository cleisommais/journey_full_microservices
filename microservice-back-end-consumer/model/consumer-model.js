import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
const Schema = mongoose.Schema;
const AutoIncrement = mongooseSequence(mongoose);

const ConsumerModel = new Schema({
    _id: Number,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    }
}, {
    _id: false
});

ConsumerModel.plugin(AutoIncrement, {
    collection_name: "consumer_counter"
});
export default mongoose.model("consumer", ConsumerModel);