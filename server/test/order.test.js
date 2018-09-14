import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../';

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
        expect(res.body).to.have.property('userId')
        .equal(3);
        expect(res.body).to.have.property('foodId')
        .equal(8);
        expect(res.body).to.have.property('price')
        .equal(500);
        expect(res.body).to.have.property('quantity')
        .equal(4);
        expect(res.body).to.have.property('status')
        .equal('pending');
        expect(res.body).to.have.property('date')
        .equal('2018-09-01');
        done();
      });
  });
});
