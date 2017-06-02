const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false
  },
  middleName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  toJSON: { virtuals: true },
});

userSchema.virtual('displayName').get(function() {
  if (this.firstName && this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  }
  return this.username;
});

module.exports = mongoose.model('User', userSchema);
