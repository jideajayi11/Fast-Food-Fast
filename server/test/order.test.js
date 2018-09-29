import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import env from 'dotenv';
import jwt from 'jsonwebtoken';

env.config();

const token = jwt.sign({
  email: 'my@email3.com',
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

describe('Order Endpoints', () => {
  it('should add an order', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('x-access-token', token2)
      .send({
        quantity: 4,
        foodId: 1
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message').equal('Order Created');
        
        done();
      });
  });
  it('should not add an order, if food is not found', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('x-access-token', token2)
      .send({
        quantity: 4,
        foodId: 1000000
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message').equal('Food not found');
        
        done();
      });
  });
  it('should not add an order, if foodId or quantity is empty', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('x-access-token', token2)
      .send({
        quantity: 4,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Incomplete parameters');
        done();
      });
  });
  it('should not add an order, if foodId or quantity is not a number', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('x-access-token', token2)
      .send({
        quantity: 4,
        foodId: 'ten'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('quantity, foodId must be Numbers');
        done();
      });
  });
  it('should not add an order, if user not signed in', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('x-access-token', token)
      .send({
        quantity: 4,
        foodId: 1
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('User is not signed in');
        done();
      });
  });

  it('should update an order', (done) => {
    chai.request(server)
      .put('/api/v1/orders/1')
      .set('x-access-token', token)
      .send({
        orderStatus: 'Complete',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message').equal('Order was updated');
        done();
      });
  });
	
  it('should update, order not found', (done) => {
    chai.request(server)
      .put('/api/v1/orders/100')
      .set('x-access-token', token)
      .send({
        orderStatus: 'Complete',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message').equal('Order not found');
        done();
      });
  });
	
  it('should not update an order with user token', (done) => {
    chai.request(server)
      .put('/api/v1/orders/1')
      .set('x-access-token', token2)
      .send({
        orderStatus: 'Complete',
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
  it('should not update an order, if params is not integer', (done) => {
    chai.request(server)
      .put('/api/v1/orders/ty')
      .set('x-access-token', token)
      .send({
        orderStatus: 'Complete',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Invalid orderId');
        done();
      });
  });
  it('should not update order with invalid status', (done) => {
    chai.request(server)
      .put('/api/v1/orders/1')
      .set('x-access-token', token)
      .send({
        orderStatus: 'pend',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Invalid orderStatus');
        done();
      });
  });
	it('should get all orders', (done) => {
    chai.request(server)
      .get('/api/v1/orders')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('Retrieved all your orders');
        done();
      });
  });
  it('should get an order', (done) => {
    chai.request(server)
      .get('/api/v1/orders/1')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('Order found');
        done();
      });
  });
  it('did not find order', (done) => {
    chai.request(server)
      .get('/api/v1/orders/10000000')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Order not found');
        done();
      });
  });
  it('should not get order for invalid parameter', (done) => {
    chai.request(server)
      .get('/api/v1/orders/ab')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Invalid orderId');
        done();
      });
  });
  it('should get user order history', (done) => {
    chai.request(server)
      .get('/api/v1/users/1/orders')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('orders')
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('Orders found');
        done();
      });
  });
  it('should not get user order history, invalid userid', (done) => {
    chai.request(server)
      .get('/api/v1/users/user/orders')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Invalid userId');
        done();
      });
  });

});
