module.exports.controller = function(app) {
  app.get('/', function(req, res, next) {
    res.redirect('index', {title: 'RaMEN'});
  });
};
