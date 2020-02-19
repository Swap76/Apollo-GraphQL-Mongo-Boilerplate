import '@babel/polyfill';
import express from 'express';
import errorHandler from 'errorhandler';
import * as moment from 'moment';
import Raven from 'raven';
import initMiddleware from './config/middleware';
import initDatabase from './config/database';
import initRoutes from './routes/index';
import jwtAuth from './middlewear/jwtAuth';
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
	context: async (req) => ({
		data: await jwtAuth(req)
	})

});

graphql.applyMiddleware({ app, path: '/graphql' });

const server = app.listen(process.env.PORT || '3000', () => debug(`Server running on port ${process.env.PORT || 3000}`)); 

export default server;