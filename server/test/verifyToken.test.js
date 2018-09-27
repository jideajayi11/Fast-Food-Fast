import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import env from 'dotenv';
import jwt from 'jsonwebtoken';

env.config();

const token = 'token';
const token2 = jwt.sign({
  email: 'my@email.com',
  userId: 100
}, process.env.JWT_KEY, {
  expiresIn: 86400
});

const should = chai.should();
chai.use(chaiHttp);

describe('Verify token', () => {
  it('should not add food, for other users', (done) => {
    chai.request(server)
      .post('/api/v1/menu')
      .set('x-access-token', token2)
      .send({
        foodDescription: 'Rice',
        foodPrice: 400,
        imageURL: 'rice.png'
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Admin is not signed in');
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
        imageURL: 'rice.png'
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
