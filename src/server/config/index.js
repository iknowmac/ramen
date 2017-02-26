const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const DB_AUTH = process.env.DB_USER
  ? `${process.env.DB_USER}:${process.env.DB_PASSWORD}@`
  : '';

const DB_URI = `mongodb://${DB_AUTH}${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const configs = {
  test: {mode: 'test', port: 3002, uri: `${DB_URI}_test`},
  local: {mode: 'local', port: 3001, uri: `${DB_URI}_local`},
  staging: {mode: 'staging', port: 4000, uri: `${DB_URI}_staging`},
  production: {mode: 'production', port: 5000, uri: `${DB_URI}_production`},
};

module.exports = function(mode) {
  const res = configs[mode || process.argv[2] || 'local'] || configs.local;
  return res;
};
