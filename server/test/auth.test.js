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
const token2 = jwt.sign({
  email: 'my@email.com',
  userId: 1
}, process.env.JWT_KEY, {
  expiresIn: 86400
});

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
  it('should not signin a user, email does not exist', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'notfound@email.com',
        password: 'qwerty'
      })
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Signin failed.');
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
  it('should not signin admin, email does not exist', (done) => {
    chai.request(server)
      .post('/api/v1/admin/login')
      .send({
        email: 'notfound@email.com',
        password: 'qwerty'
      })
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('error');
        expect(res.body).to.have.property('message')
          .equal('Signin failed.');
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
  it('should list restaurant', (done) => {
    chai.request(server)
      .get('/api/v1/admin')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('restaurant');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message')
          .equal('Restaurant found');
        done();
      });
  });
});
describe('Token Verification Endpoints', () => {
  it('should not pass verification', (done) => {
    chai.request(server)
    .get('/api/v1/verifytoken')
    .set('x-access-token', 'token')
    .end((err, res) => {
      res.should.have.status(403);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('status').equal('error');
      expect(res.body).to.have.property('message')
        .equal('Failed to authenticate token.');
      done();
    });
  });
  it('should verify admin', (done) => {
    chai.request(server)
    .get('/api/v1/verifytoken')
    .set('x-access-token', token)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('status').equal('success');
      expect(res.body).to.have.property('message')
        .equal('admin verified');
      done();
    });
  });
  it('should verify user', (done) => {
    chai.request(server)
    .get('/api/v1/verifytoken')
    .set('x-access-token', token2)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('status').equal('success');
      expect(res.body).to.have.property('message')
        .equal('user verified');
      done();
    });
  });
});