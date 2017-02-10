module.exports.controller = function(app) {
  app.get('/', function(req, res, next) {
    res.render('index', {title: 'RaMEN'});
  });
};
