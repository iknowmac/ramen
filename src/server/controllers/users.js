/* global model */

const User = model('user');

module.exports.controller = function(app) {
  app.get('/users', function(req, res) {
    User.find({}).sort({priority: -1}).exec(function(err, users) {
      if (err) return res.send(err);
      return res.jsonp(users);
    });
  })

  .post('/users', function(req, res) {
    const user = new User(req.body.user);
    user.save(function(err) {
      if (err) return res.send(err);
      return res.jsonp(user);
    });
  })

  .get('/users/:id', function(req, res) {
    User.findOne({'_id': req.params.id}).exec(function( err, user ) {
      if (err) return res.send(err);
      return res.jsonp(user);
    });
  })

  .put('/users/:id', function(req, res) {
    User.findOneAndUpdate({'_id': req.params.id},
      req.body.user, {'new': true}, function(err, user) {
        if (err) return res.send(err);
        return res.jsonp(user);
      });
  })

  .delete('/users/:id', function(req, res) {
    User.findOneAndRemove({'_id': req.params.id}, function(err, user) {
      if (err) return res.send(err);
      return res.jsonp(user);
    });
  });
};
