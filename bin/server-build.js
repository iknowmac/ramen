require('colors');

const path = require('path');
const exec = require('child_process').exec;
const build_dir = path.resolve(__dirname, '../build');
const server = `cd ${build_dir} && python -m SimpleHTTPServer 8080`;
exec(server);
console.log('Production build running at http://localhost:8080'.green);
