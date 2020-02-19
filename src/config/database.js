import Debug from 'debug';
const debug = Debug('API:database');
import mongoose from 'mongoose';
import cachegoose from 'cachegoose';

const initDatabase = () => {
	debug('Initializing database connection...');
  
	/**
	 * MongoDB Connection URI
	 */
	let dbUri = process.env.DB_DEV_URI;
	if (process.env.NODE_ENV === 'production') {
		dbUri = process.env.DB_PROD_URI;
	}
	let options = {
		autoIndex: false,
		useNewUrlParser: true,
		replicaSet: 'Cluster0-shard-0'
	};
  
	/**
	 * For indexing issues on MongoDB Atlas
	 * Note: manual index setup is needed
	 */
	mongoose.set('useCreateIndex', true);
  
	// This enables us to use methods like findOneAndUpdate
	mongoose.set('useFindAndModify', false);
	mongoose.set('useUnifiedTopology', true);

	/**
	 * Start MongoDB Connection
	 */
	mongoose.connect(dbUri, options, (err) => {
		if (err) {
			debug(`Connection error: ${err}`);
		}
	});

	/**
	 * Caching using Redis Server
	 */
	options = {
		engine: 'redis',
		host: process.env.REDIS_DEV_HOST,
		port: process.env.REDIS_DEV_PORT,
	};
	if (process.env.NODE_ENV === 'production') {
		options = {
			engine: 'redis',
			host: process.env.REDIS_PROD_HOST,
			port: process.env.REDIS_PROD_PORT,
			password: process.env.REDIS_PROD_PASSWORD,
		};
	}

	/**
	 * Initialize Cachegoose for Cache Management
	 */
	cachegoose(mongoose, options);

	/**
	 * Listeners on MongoDB Startup
	 */
	const connection = mongoose.connection;
	connection.on('connected', () => {
		debug(`Connected to database: ${dbUri}`);
	});
	connection.on('error', (err) => {
		debug(`Database error: ${err}`);
	});
	connection.on('disconnected', () => {
		debug('Disconnected from database');
	});
	connection.on('reconnected', () => {
		debug(`Reconnected to database: ${dbUri}`);
	});
};

export default initDatabase;