const { Thought, User } = require('../models');

// module.exports = {
//   // Get all thoughts
// getThoughts(req, res) {
//     Thought.find()
//       .then((thoughts) => res.json(thoughts))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Get a thought
//   getSingleThought(req, res) {
//     Thought.findOne({ _id: req.params.thoughtId })
//       .select('-__v')
//       .then((thought) =>
//         !thought
//           ? res.status(404).json({ message: 'No thought with that ID' })
//           : res.json(thought)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // Create a thought
//   createThought(req, res) {
//     Thought.create(req.body)
//       .then((thought) => res.json(thought))
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
//   // Delete a thought
//   deleteThought(req, res) {
//     Thought.findOneAndDelete({ _id: req.params.thoughtId })
//       .then((thought) =>
//         !thought
//           ? res.status(404).json({ message: 'No thought with that ID' })
//           : User.deleteMany({ _id: { $in: thought.users } })
//       )
//       .then(() => res.json({ message: 'thought and users deleted!' }))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Update a thought
//   updateThought(req, res) {
//     Thought.findOneAndUpdate(
//       { _id: req.params.thoughtId },
//       { $set: req.body },
//       { runValidators: true, new: true }
//     )
//       .then((thought) =>
//         !thought
//           ? res.status(404).json({ message: 'No thought with this id!' })
//           : res.json(thought)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
// };

const ThoughtControllers = {
  getAllThoughts(req, res) {
      Thought.find({})
          .select("-__v")
          .sort({ _id: -1 })
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => {
              res.status(400).json(err);
          });
  },
  getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.thoughtId })
    .select("-__v")
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  },
  addThought({ params, body }, res) {
      Thought.create(body)
          .then(({ _id }) => {
              return User.findOneAndUpdate(
                  { _id: params.userId },
                  { $push: { thoughts: _id } },
                  { new: true }
              );
          })
          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id!' });
                  return;
              }
              res.json(dbUserData);
          })
          .catch(err => res.json(err));
  },
  removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.thoughtId })
          .then(deletedthought => {
              if (!deletedthought) {
                  return res.status(404).json({ message: 'No thought found with this id!' });
              }
              return User.findOneAndUpdate(
                  { _id: params.username },
                  { $pull: { thoughts: params.thoughtId } },
                  { new: true }
              );
          })
          .then(dbUserData => {
              res.json(dbUserData);
          })
          .catch(err => res.json(err));
  },
  addReaction({ params, body }, res) {

      Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true }
      )
          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id!' });
                  return;
              }
              res.json(dbUserData);
          })
          .catch(err => res.json(err));
  },
  removeReaction({ params }, res) {
      Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
      )
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
  }
};

module.exports = ThoughtControllers