/* global DEBUG_MODE __approot */

const path = require('path');
const moment = require('moment');

module.exports.load = function globalsLoad() {
  global.DEBUG_MODE = process.env.DEBUG_MODE;

  global.__approot = path.resolve(__dirname, '../');

  global.model = function model(filename) {
    const name = normalize(filename);
    return require(path.join(__approot, 'models', name));
  };

  global.debug = function(component, message) {
    if (DEBUG_MODE) {
      const datestr = moment();
      component = component.toUpperCase();
      console.log(`${datestr}[${component}] ${message}`);
    }
  };
};

const normalize = (name) =>
  (name[0].toUpperCase() + name.substr(1))
    .match(/([A-Z][^A-Z]*)/g).join('-')
    .replace(/[_\s-]+/g, '-').toLowerCase();
