import app from '../src/app';
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Server Up & Running', function() {
	it('should not return anything', function() {

	});
});

describe('Kickstarting Application', () => {
	it('load main page', function() {
		return chai.request(app)
			.get('/')
			.then(function (res) {
				res.should.have.status(200);
			})
			.catch(function (err) {
				throw err;
			});
	});
});