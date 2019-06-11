import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import MongoConn from './connection/mongo-conn';
import orderRouter from './routes/order-router';
import serverBroker from './service-broker/server';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Add headers
app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.header('Access-Control-Allow-Origin', '*');
	// Request methods you wish to allow
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Request headers you wish to allow
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.header('Access-Control-Allow-Credentials', true);
	// Pass to next layer of middleware
	next();
});

MongoConn.on('connected', function() {
	console.log('MongoDB connected!');
});

serverBroker.waitForConnect().then(async function() {
	console.log('Connected to RPC channel');
});

app.use('/order', orderRouter);
export default app;
