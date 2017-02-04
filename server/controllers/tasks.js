/* global model debug */
const Task = model('task');

module.exports.controller = function(app) {
  app.get('/tasks', function(req, res, next) {
    Task.find({}).sort('name').exec(function(err, tasks) {
      if (err) return res.send(err);
      res.jsonp(tasks);
    });
  })

  .post('/tasks', function(req, res, next) {
    const task = new Task(req.body.task);
    task.save(function(err) {
      if (err) return res.send(err);
      res.jsonp(task);
    });
  })

  .get('/task/:id', function(req, res, next) {
    Task.findOne({'_id': req.params.id}).exec(function( err, task ) {
      if (err) return res.send(err);
      res.jsonp(task);
    });
  })

  .put('/task/:id', function(req, res, next) {
    Task.findOneAndUpdate({'_id': req.params.id},
      req.body.task, {'new': true}, function(err, task) {
        if (err) return res.send(err);
        res.jsonp(task);
      });
  })

  .delete('/task/:id', function(req, res, next) {
    Task.findOneAndRemove({'_id': req.params.id}, function(err, task) {
      if (err) return res.send(err);
      res.jsonp(task);
    });
  });
};
