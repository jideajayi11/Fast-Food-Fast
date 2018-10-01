import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
import server from '../index';

env.config();

const token = jwt.sign({
  email: 'my@email3.com',
  adminId: 1
}, process.env.JWT_KEY, {
  expiresIn: 86400
});
const token3 = jwt.sign({
  email: 'my@email113.com',
  adminId: 1
}, process.env.JWT_KEY, {
  expiresIn: 86400
});
const token2 = jwt.sign({
  email: 'my@email.com',
  userId: 1
}, process.env.JWT_KEY, {
  expiresIn: 86400
});

const should = chai.should();
chai.use(chaiHttp);


describe('Food API Endpoint', () => {
  it('should add food', (done) => {
    chai.request(server)
      .post('/api/v1/menu')
      .set('x-access-token', token)
      .send({
        foodDescription: 'Rice',
        foodPrice: 400,
        imageURL: 'rice.png'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        expect(res.body.food).to.have.property('description').equal('Rice');
        expect(res.body.food).to.have.property('price').equal(400);
        expect(res.body.food).to.have.property('adminId').equal(1);
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('Food Added');
        done();
      });
  });
  it('should not add food, incomplete parameters', (done) => {
    chai.request(server)
      .post('/api/v1/menu')
      .set('x-access-token', token)
      .send({
        foodDescription: '',
        foodPrice: 400,
        imageURL: 'rice.png'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Incomplete body parameters');
        done();
      });
  });
  it('should not add food, invalid Price', (done) => {
    chai.request(server)
      .post('/api/v1/menu')
      .set('x-access-token', token)
      .send({
        foodDescription: 'Rice',
        foodPrice: 'Forty',
        imageURL: 'rice.png'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Invalid Price');
        done();
      });
  });
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
  it('should get all food', (done) => {
    chai.request(server)
      .get('/api/v1/menu')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('Food List');
        done();
      });
  });
  it('should add another food', (done) => {
    chai.request(server)
      .post('/api/v1/menu')
      .set('x-access-token', token)
      .send({
        foodDescription: 'Rice',
        foodPrice: 400,
        imageURL: 'rice.png'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        expect(res.body.food).to.have.property('description').equal('Rice');
        expect(res.body.food).to.have.property('price').equal(400);
        expect(res.body.food).to.have.property('adminId').equal(1);
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('Food Added');
        done();
      });
  });
  it('should delete food', (done) => {
    chai.request(server)
      .delete('/api/v1/menu/2')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('Food deleted');
        done();
      });
  });
  it('should not delete food of other admin', (done) => {
    chai.request(server)
      .delete('/api/v1/menu/2')
      .set('x-access-token', token3)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Food not found');
        done();
      });
  });
  it('should not delete food', (done) => {
    chai.request(server)
      .delete('/api/v1/menu/aa')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Invalid foodId');
        done();
      });
  });
});
