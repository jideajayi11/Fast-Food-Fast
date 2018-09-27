import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const should = chai.should();
chai.use(chaiHttp);


describe('Authentication Endpoints for users', () => {
  it('should signup a user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'jide ajayi',
        phoneNumber: '12345678',
        deliveryAddress: 'my address',
        email: 'my@email3.com',
        password: 'qwerty',
        confirmPassword: 'qwerty'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('User account was created');
        done();
      });
  });
  it(`should not signup a user, if 
     required field is empty`, (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'jide ajayi',
        phoneNumber: '12345678',
        deliveryAddress: 'my address',
        email: 'my@email.com'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Incomplete signup details');
        done();
      });
  });
  it(`should not signup a user, if 
     email is not valid`, (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'jide ajayi',
        phoneNumber: '12345678',
        deliveryAddress: 'my address',
        email: 'my email',
        password: 'qwerty',
        confirmPassword: 'qwerty'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Invalid email address');
        done();
      });
  });
  it(`should not signup a user, if 
     password is mismatched`, (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'jide ajayi',
        phoneNumber: '12345678',
        deliveryAddress: 'my address',
        email: 'my@email.com',
        password: 'qwerty1',
        confirmPassword: 'qwerty2'
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Password do not match');
        done();
      });
  });
  it(`should not signup a user, if 
     email exists`, (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'jide ajayi',
        phoneNumber: '12345678',
        deliveryAddress: 'my address',
        email: 'my@email3.com',
        password: 'qwerty',
        confirmPassword: 'qwerty'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Email already exist');
        done();
      });
  });
  it('should signin a user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'my@email3.com',
        password: 'qwerty'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('You are now logged in');
        done();
      });
  });
  it('should not signin a user for empty input', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'my@email3.com'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Incomplete signin details');
        done();
      });
  });
  it('should not signin a user for invalid email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'myemail3.com',
        password: 'qwerty12'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Invalid email address');
        done();
      });
  });
  it('should not signin a user for incorrect password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'my@email3.com',
        password: 'qwerty12'
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Authentication failed.');
        done();
      });
  });
});
describe('Authentication Endpoints for Admin', () => {
  it('should signup admin', (done) => {
    chai.request(server)
      .post('/api/v1/admin/signup')
      .send({
        restaurant: 'jide ajayi',
        phoneNumber: '12345678',
        email: 'my@email3.com',
        password: 'qwerty',
        confirmPassword: 'qwerty'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('Admin account was created');
        done();
      });
  });
  it(`should not signup admin, if 
     required field is empty`, (done) => {
    chai.request(server)
      .post('/api/v1/admin/signup')
      .send({
        restaurant: 'jide ajayi',
        phoneNumber: '12345678',
        email: 'my@email.com'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Incomplete signup details');
        done();
      });
  });
  it(`should not signup admin, if 
     email is not valid`, (done) => {
    chai.request(server)
      .post('/api/v1/admin/signup')
      .send({
        restaurant: 'jide ajayi',
        phoneNumber: '12345678',
        email: 'my email',
        password: 'qwerty',
        confirmPassword: 'qwerty'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Invalid email address');
        done();
      });
  });
  it(`should not signup admin, if 
     password is mismatched`, (done) => {
    chai.request(server)
      .post('/api/v1/admin/signup')
      .send({
        restaurant: 'jide ajayi',
        phoneNumber: '12345678',
        email: 'my@email.com',
        password: 'qwerty1',
        confirmPassword: 'qwerty2'
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Password do not match');
        done();
      });
  });
  it(`should not signup a admin, if 
     email exists`, (done) => {
    chai.request(server)
      .post('/api/v1/admin/signup')
      .send({
        restaurant: 'jide ajayi',
        phoneNumber: '12345678',
        email: 'my@email3.com',
        password: 'qwerty',
        confirmPassword: 'qwerty'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Email already exist');
        done();
      });
  });
  it('should signin admin', (done) => {
    chai.request(server)
      .post('/api/v1/admin/login')
      .send({
        email: 'my@email3.com',
        password: 'qwerty'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('You are now logged in');
        done();
      });
  });
  it('should not signin admin for incorrect password', (done) => {
    chai.request(server)
      .post('/api/v1/admin/login')
      .send({
        email: 'my@email3.com',
        password: 'qwerty12'
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Authentication failed.');
        done();
      });
  });
});
