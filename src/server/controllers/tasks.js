/* global model */

const Task = model('task');
const owner_fields = ['firstName', 'lastName', 'email'];

module.exports.controller = function(app) {
  app.get('/tasks', function(req, res) {
    Task.find({}).sort({priority: -1})
      .populate('owner', owner_fields)
      .exec(function(err, tasks) {
        if (err) return res.send(err);
        return res.jsonp(tasks);
      });
  })

  .post('/tasks', function(req, res) {
    const task = new Task(req.body.task);
    task.save(function(err) {
      if (err) return res.send(err);
      return res.jsonp(task);
    });
  })

  .get('/tasks/:id', function(req, res) {
    Task.findOne({'_id': req.params.id})
      .populate('owner', owner_fields)
      .exec(function( err, task ) {
        if (err) return res.send(err);
        return res.jsonp(task);
      });
  })

  .put('/tasks/:id', function(req, res) {
    Task.findOneAndUpdate({'_id': req.params.id},
      req.body.task, {'new': true}, function(err, task) {
        if (err) return res.send(err);
        return res.jsonp(task);
      });
  })

  .delete('/tasks/:id', function(req, res) {
    Task.findOneAndRemove({'_id': req.params.id}, function(err, task) {
      if (err) return res.send(err);
      return res.jsonp(task);
    });
  });
};
