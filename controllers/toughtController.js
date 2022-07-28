const { Thought, User } = require('../models');
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  // Get all thoughts
getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
    .then(async (thought) => {
        const user = await User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought } },
          { runValidators: true, new: true }
        );
        user.save();
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.findOneAndUpdate(
            { username: thought.username },
            {
              $pull: { thoughts: thought._id },
            }
          )
    )
      .then(() => res.json({ message: 'thought and users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

    // Create a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $push: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) => {
            thought.save();
            res.json(thought);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
    async deleteReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
        { _id: ObjectId(req.params.thoughtId) },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
        );
        if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
        }
        res.json(thought);
    } catch (e) {
        res.status(500).json(e);
    }
    },
};
