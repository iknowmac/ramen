const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  completed_at: {type: Date},
  due: {type: Date},
  priority: {
    type: Number, enum: [0, 1, 2, 3], default: 0,
  },
  note: {type: String},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: { virtuals: true },
});

taskSchema.virtual('completed').get(function() {
    return this.completed_at instanceof Date;
});

module.exports = mongoose.model('Task', taskSchema);
