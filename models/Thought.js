const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      trim: true,
      required: true,
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
