const debug = require('debug')('arena:routes');
const staticRoutes = require('./static');
const adminRoutes = require('./admin');
const contestRoutes = require('./contest');

const initRoutes = (app) => {
	debug('Initializing routes...');

	app.use('/admin', adminRoutes);
	app.use('/contest', contestRoutes);
	app.use('/', staticRoutes);

	debug('Finished initializing routes...');
};

module.exports = initRoutes;
