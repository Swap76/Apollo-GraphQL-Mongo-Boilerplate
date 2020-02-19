const debug = require('debug')('API:routes');
const staticRoutes = require('./static');

const initRoutes = (app) => {
	debug('Initializing routes...');

	app.use('/', staticRoutes);

	debug('Finished initializing routes...');
};

module.exports = initRoutes;
