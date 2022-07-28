const { Schema, model } = require('mongoose');
const thoughtSchema = require("./Thought");

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
      getters: true,
      virtuals: true,
    },
  }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });   

const User = model('User', userSchema);

module.exports = User;