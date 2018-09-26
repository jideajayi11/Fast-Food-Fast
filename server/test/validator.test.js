import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import GenValid from '../helpers/validator/index';
import db from '../helpers/db/index';

const should = chai.should();
chai.use(chaiHttp);

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
  it('should return false if empty', (done) => {
    expect(GenValid.isRequired('')).to.equal(false);
    done();
  });
});
