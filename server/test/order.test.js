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
        expect(res.body).to.have.property('message').equal('Retrieved all your orders');
        done();
      });
  });
});
