const { Schema, Types } = require('mongoose');
const ObjectId = require("mongodb").ObjectId;

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: Number,
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: formatDate,
      },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);


function formatDate(date) {
    const stringDate = date.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return stringDate;
  }
  
module.exports = reactionSchema;
