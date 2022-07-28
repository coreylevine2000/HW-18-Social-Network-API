const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction");

// const ReactionSchema = new Schema(
//   {
//       reactionId: {
//           type: Schema.Types.ObjectId,
//           default: () => new Types.ObjectId(),
//       },
//       reactionBody: {
//           type: String,
//           required: 'Please enter a reaction!',
//           maxlength: 180
//       },
//       username: {
//           type: String,
//           required: 'Please enter a username!',
//           trim: true
//       },
//       createdAt: {
//           type: Date,
//           default: Date.now,
//           get: createdAtVal => dateFormat(createdAtVal)
//       }
//   },
//   {
//       toJSON: {
//           getters: true
//       }
//   }
// )

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

function formatDate(date) {
  const stringDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return stringDate;
}

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
