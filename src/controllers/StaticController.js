/**
 * Shows intro page of rest api
 * @route /
 * @param none
 * @method GET
 */
module.exports.index = (req, res, next) => {
	res.status(200).send('Hii welcome to Apollo GraphQL Mongo Boiler Plate');
};
