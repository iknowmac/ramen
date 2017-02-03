const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  completed: {type: Boolean, required: true, default: false},
  completed_at: {type: Date},
  due: {type: Date},
  priority: {type: String, enum: ['Low', 'Medium', 'High']},
  note: {type: String},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {virtuals: true},
});

module.exports = mongoose.model('Task', taskSchema);
