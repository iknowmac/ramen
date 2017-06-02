/* global __approot */
require('dotenv').load({path: '.env'});
require('../../config/globals').load();

const path = require('path');
const seeder = require('mongoose-seed-plus');
const dbEnv = process.env.NODE_ENV === 'test' ? 'test' : '';
const db = require('../../config')(dbEnv);
const seeds = [
  { path: path.join(__approot, 'models/task.js'), name: 'Task', clear: true },
  { path: path.join(__approot, 'models/user.js'), name: 'User', clear: true },
];

seeder.Promise = global.Promise;
seeder.connect(db.uri, (err) => {
  if(err) {
    return console.log(`Error connecting to database ${db.uri}` + err);
  }
  return seeder.start(__dirname, seeds, false);
});
