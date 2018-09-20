import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '..';

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
        expect(res.body.orderItem[0]).to.have.property('userId')
        .equal(3);
        expect(res.body.orderItem[0].food)
        .to.have.property('id').equal(8);
        expect(res.body.orderItem[0].food)
        .to.have.property('price').equal(500);
        expect(res.body.orderItem[0]).to.have.property('quantity')
        .equal(4);
        expect(res.body.orderItem[0]).to.have.property('orderStatus')
        .equal('pending');
        expect(res.body.orderItem[0]).to.have.property('date')
        .equal('2018-09-01');
        done();
      });
  });
  it('should add an order', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .send({
        userId: 1,
        foodId: 5,
        foodDescription: 'Fried Rice & Chicken',
        foodImageURL: 'friedRiceChicken.jpg',
        foodPrice: 1000,
        quantity: 1,
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
  it('should not add order, if body is incomplete', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .send({
        foodId: '',
        price: 1000,
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
        expect(res.body).to.have.property('userId')
        .equal(3);
        expect(res.body.food).to.have.property('id')
        .equal(8);
        expect(res.body.food).to.have.property('price')
        .equal(500);
        expect(res.body).to.have.property('quantity')
        .equal(4);
        expect(res.body).to.have.property('orderStatus')
        .equal('completed');
        expect(res.body).to.have.property('date')
        .equal('2018-09-01');
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