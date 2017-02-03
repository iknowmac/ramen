const expect = require('chai').expect;

describe('Database Setup', function() {
  it('should load test db configuration', function(next) {
    const db = require('../db')('test');
    expect(db.mode).to.equal('test');
    next();
  });

  it('should load local db configuration', function(next) {
    const db = require('../db')('local');
    expect(db.mode).to.equal('local');
    next();
  });

  it('should load staging db configuration', function(next) {
    const db = require('../db')('staging');
    expect(db.mode).to.equal('staging');
    next();
  });

  it('should load production db configuration', function(next) {
    const db = require('../db')('production');
    expect(db.mode).to.equal('production');
    next();
  });

  it('should load the node enviorment db configuration', function(next) {
    const db = require('../db')();
    expect(db.mode).to.equal('test');
    next();
  });
});
