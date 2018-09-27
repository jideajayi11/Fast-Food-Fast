import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const token = 'token';

const should = chai.should();
chai.use(chaiHttp);

describe('Verify token', () => {
	it('should not auth, if no token', (done) => {
		chai.request(server)
			.post('/api/v1/menu')
			.send({
				foodDescription: 'Rice',
				foodPrice: 400,
				imageURL: ''
			})
			.end((err, res) => {
				res.should.have.status(403);
				res.body.should.be.a('object');
				expect(res.body).to.have.property('status').equal('error');
				expect(res.body).to.have.property('message')
					.equal('No token provided.');
				done();
			});
	});
	it('should not auth for invalid token', (done) => {
		chai.request(server)
			.post('/api/v1/menu')
			.set('x-access-token', token)
			.send({
				foodDescription: 'Rice',
				foodPrice: 400,
				imageURL: ''
			})
			.end((err, res) => {
				res.should.have.status(403);
				res.body.should.be.a('object');
				expect(res.body).to.have.property('status').equal('error');
				expect(res.body).to.have.property('message')
					.equal('Failed to authenticate token.');
				done();
			});
	});
});