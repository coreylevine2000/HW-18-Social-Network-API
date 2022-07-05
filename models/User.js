const { Schema, model } = require('mongoose');
// const reactionSchema = require('./Reaction');

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
        match: [/.+@.+\..+/, 'Must match an email address.'],
//mongoose for matching
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
    );

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });   

const User = model('User', userSchema);

module.exports = User;