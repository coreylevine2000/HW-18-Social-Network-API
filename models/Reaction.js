// const { Schema, Types } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

// const reactionSchema = new Schema(
//   {
//     reactionId: {
//       type: Schema.Types.ObjectId,
//       default: () => new Types.ObjectId(),
//     },
//     reactionBody: {
//       type: String,
//       required: true,
//       maxlength: 280,
//     },
//     username: {
//       type: Number,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: createdAtVal => dateFormat(createdAtVal),
//     },
//   },
//   {
//     toJSON: {
//       getters: true,
//     },
//   }
// );

// const Reaction = model('Reaction', reactionSchema);

// module.exports = Reaction;

//Residual Data from original code, migrated into Thought.js