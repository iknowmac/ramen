const path = require('path');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-fs'));

describe('Configuration Unit Tests', function() {
  it('expect the .env file to exist', function(next) {
    const envFile = path.resolve(__dirname, '../../.env');
    expect(envFile).to.be.a.path();
    next();
  });

  it('should load test configuration', function(next) {
    const config = require('../../src/server/config')('test');
    expect(config.mode).to.equal('test');
    next();
  });

  it('should load local configuration', function(next) {
    const config = require('../../src/server/config')('local');
    expect(config.mode).to.equal('local');
    next();
  });

  it('should load staging configuration', function(next) {
    const config = require('../../src/server/config')('staging');
    expect(config.mode).to.equal('staging');
    next();
  });

  it('should load production configuration', function(next) {
    const config = require('../../src/server/config')('production');
    expect(config.mode).to.equal('production');
    next();
  });

  it('should load the current node enviorment configuration', function(next) {
    const config = require('../../src/server/config')();
    expect(config.mode).to.equal('test');
    next();
  });
});
