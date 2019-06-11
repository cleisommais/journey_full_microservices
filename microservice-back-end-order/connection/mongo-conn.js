import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(
	`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${
		process.env.MONGODB_DATABASE
	}`,
	{
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		reconnectTries: Number.MAX_VALUE,
		reconnectInterval: 500, // Reconnect every 500ms
		connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
		socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	}
);
const MongoConn = mongoose.connection;
MongoConn.on('error', console.error.bind(console, 'MongoDB error conection.'));
MongoConn.once('open', function() {
	console.log('MongoDB connection opened!');
});
MongoConn.on('reconnected', function() {
	console.log('MongoDB reconnected!');
});
MongoConn.on('disconnected', function() {
	console.log('MongoDB disconnected!');
});
export default MongoConn;
