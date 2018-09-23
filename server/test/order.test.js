import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import GenValid from '../helpers/validator/index';

const should = chai.should();
chai.use(chaiHttp);

describe('Order Endpoints', () => {
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
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('Order found');
        expect(res.body.order).to.have.property('userId')
          .equal(3);
        expect(res.body.order.food)
          .to.have.property('id').equal(8);
        expect(res.body.order.food)
          .to.have.property('price').equal(500);
        expect(res.body.order).to.have.property('quantity')
          .equal(4);
        expect(res.body.order).to.have.property('orderStatus')
          .equal('pending');
        expect(res.body.order).to.have.property('date')
          .equal('2018-09-01');
        done();
      });
  });
  /*
  it('should add an order', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .send({
        userId: 1,
        foodId: 5,
        adminId: 3,
        foodPrice: 1000,
        quantity: 1,
        foodDescription: 1,
        foodImageURL: 1
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('Order Added');
        done();
      });
  });
  
  it('should not add order, if userId, foodId or foodDescription is empty', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .send({
        userId: 3,
        foodId: '',
        foodDescription: 'jollof rice',
        foodImageURL: 'jollof.png',
        foodPrice: 1000,
        quantity: 1,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Incomplete parameters');
        done();
      });
  });*/
  it('should not add order, if foodImageURL, foodPrice or quantity is empty', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .send({
        userId: 3,
        foodId: 4,
        foodDescription: 'jollof rice',
        foodImageURL: 'jollof.png',
        foodPrice: 1000,
        quantity: ''
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
  it('should not add order, if userId, foodId or foodDescription is undefined', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .send({
        userId: 3,
        foodId: 4,
        foodImageURL: 'jollof.png',
        foodPrice: 1000,
        quantity: 3
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
  it('should not add order, if foodImageURL, foodPrice or quantity is undefined', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .send({
        userId: 3,
        foodId: 4,
        foodDescription: 'jollof rice',
        foodImageURL: 'jollof.png',
        quantity: 2
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
  it('should not add order, if userId or foodId is not a number', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .send({
        userId: 'uy',
        foodId: 1,
        foodDescription: 'jollof rice',
        foodImageURL: 'jollof.png',
        foodPrice: 1000,
        quantity: 2
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('userId, foodId must be Numbers');
        done();
      });
  });
  it('should not add order, if food price or quantity is not a number', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .send({
        userId: 5,
        foodId: 4,
        foodDescription: 'jollof rice',
        foodImageURL: 'jollof.png',
        foodPrice: 'ui',
        quantity: 2
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('food price and quantity must be Numbers');
        done();
      });
  });
  it('should update an order', (done) => {
    chai.request(server)
      .put('/api/v1/orders/1')
      .send({
        orderStatus: 'completed',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('Order Updated');
        expect(res.body.order).to.have.property('userId')
          .equal(3);
        expect(res.body.order.food).to.have.property('id')
          .equal(8);
        expect(res.body.order.food).to.have.property('price')
          .equal(500);
        expect(res.body.order).to.have.property('quantity')
          .equal(4);
        expect(res.body.order).to.have.property('orderStatus')
          .equal('completed');
        expect(res.body.order).to.have.property('date')
          .equal('2018-09-01');
        done();
      });
  });
  it('should not update an order, if params is not integer', (done) => {
    chai.request(server)
      .put('/api/v1/orders/ty')
      .send({
        orderStatus: 'completed',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Invalid Parameter');
        done();
      });
  });
  it('should not update order with invalid status', (done) => {
    chai.request(server)
      .put('/api/v1/orders/1')
      .send({
        status: 'pend',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Invalid Status');
        done();
      });
  });
});
describe('General validation functions', () => {
  it('should return true for a positive integer', (done) => {
    expect(GenValid.isInteger(57)).to.equal(true);
    done();
  });
  it('should return true for a positive number', (done) => {
    expect(GenValid.isNumber(57.78)).to.equal(true);
    done();
  });
  it('should return true for an email address', (done) => {
    expect(GenValid.isEmail('jideajayi11@gmail.com')).to.equal(true);
    done();
  });
});
