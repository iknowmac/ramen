const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  completedAt: {
    type: Date
  },
  due: {
    type: Date
  },
  priority: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 0,
  },
  note: {
    type: String
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  toJSON: { virtuals: true },
});

taskSchema.virtual('completed').get(function() {
    return this.completedAt instanceof Date;
});

module.exports = mongoose.model('Task', taskSchema);
