const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      timmmed: true,
      max_length: 50,
    },
    email: {
        type: String,
        unique: true,
        required: true,
//mongoose for matching
    },
    thoughts: {
    },
    friends: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;