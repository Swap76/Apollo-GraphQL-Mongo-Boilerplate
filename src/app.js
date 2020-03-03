import '@babel/polyfill';
import express from 'express';
import errorHandler from 'errorhandler';
import * as moment from 'moment';
import Raven from 'raven';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import validateTokensMiddleware from './middlewear/validateTokens';
import initMiddleware from './config/middleware';
import initDatabase from './config/database';
import initRoutes from './routes/index';
import { ApolloServer } from 'apollo-server-express';
import index from './graphql/schema/index';
import Auth from './graphql/schema/Auth';
import User from './graphql/schema/User';
import Blog from './graphql/schema/Blog';
import Comment from './graphql/schema/Comment';
import Main from './graphql/schema/Main';
import graphqlResolver from './graphql/resolvers/index';
import Debug from 'debug';
const debug = Debug('API:app');

const app = express();

const corsConfig = process.env.NODE_ENV !== 'production'
	? {
		origin: 'http://localhost:3000',
		credentials: true
	}
	: {
		origin: 'www.your-website.com',
		credentials: true
	  };
	  
app.use(cors(corsConfig));

app.use(cookieParser());

// Middleware for JWT Token Validation
app.use(validateTokensMiddleware);

// Moment JS
app.locals.moment = moment;

app.use(errorHandler());

// Sentry
Raven.config(process.env.SENTRY_DSN).install();
app.use(Raven.requestHandler());

// Middleware
initMiddleware(app);

// Database
initDatabase();

// REST API Routes
initRoutes(app);

// Configuring typeDefs & resolvers
const graphql = new ApolloServer({
	typeDefs: [index,Auth,User,Blog,Comment,Main],
	resolvers: graphqlResolver,
	context: ({ req, res }) => ({ req, res }),
  	cors: false // <- ADD
});

graphql.applyMiddleware({ app, path: '/graphql', cors: false });

const server = app.listen(process.env.PORT || '3000', () => debug(`Server running on port ${process.env.PORT || 3000}`)); 

export default server;