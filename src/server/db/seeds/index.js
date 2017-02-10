/* global __approot */
require('dotenv').load({path: '.env'});
require('../../globals').load();

const path = require('path');
const dbEnviroment = process.env.NODE_ENV === 'test' ? 'test' : '';
const seeder = require('mongoose-seed-plus');
const db = require('../index')(dbEnviroment);
const seeds = [
  {path: path.join(__approot, 'models/task.js'), name: 'Task', clear: true},
];

seeder.Promise = global.Promise;
seeder.connect(db.uri, (err) => {
  if(err) {
    return console.log(`Error connecting to database ${db.uri}` + err);
  }
  seeder.start(__dirname, seeds, false);
});
