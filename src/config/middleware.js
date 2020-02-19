import Debug from 'debug';
const debug = Debug('API:middleware');
import express from 'express';
import * as path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import dotenv from  'dotenv';
dotenv.config();

const initMiddleware = (app)  => {
	debug('Initializing middlewares...');

	/**
	* HTTP CORS and Security
   	*/
	app.use(helmet());

	/**
   	* Express' default shitty response
   	*/
	app.disable('x-powered-by'); 

	/**
	* Compression for APIs
	*/
	app.use(compression());

	/**
   	* Logging using morgan
   	* Note: Upgrade to Winston
   	*/
	app.use(logger('dev'));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());

	/**
   	* Static Assets for development
   	* Note: Live Site uses static files via Cloudinary CDN
   	*/
	app.use(express.static(path.join(__dirname, '../public')));

	debug('Finished initializing middlewares...');
};

export default initMiddleware;