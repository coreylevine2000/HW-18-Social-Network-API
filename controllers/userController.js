const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
            numberOfUsers,
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
            user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateSingleUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and remove them from the thought
  async deleteSingleUser(req, res) {
    try {
      const removedUser = await User.findOneAndRemove({
        _id: req.params.userId,
      });
      if (removedUser) {
        await Thought.deleteMany({
          _id: removedUser.thoughts,
        });
        res
          .status(200)
          .json({ message: "Removed user and user's thoughts" });
      } else {
        res.status(404).json({ message: "User does not exists" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },

  // Add an assignment to a user
  createFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a user
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

// const userControllers = {
//   getAllUsers(req, res) {
//       User.find({})
//           .populate({
//               path: 'thoughts',
//               select: ('-__v')
//           })
//           .select('-__v')
//           .then(dbUserData => res.json(dbUserData))
//           .catch(err => {
//               res.status(400).json(err)
//           })
//   },
//   getUserById({ params }, res) {
//       User.findOne({ _id: params.id })
//         .populate({
//           path: "thoughts",
//           select: "-__v",
//         })
//         .select("-__v")
//         .then((dbUserData) => {
//           if (!dbUserData) {
//             res.status(404).json({ message: "No user found with this id!" });
//             return;
//           }
//           res.json(dbUserData);
//         })
//         .catch((err) => {
//           res.status(400).json(err);
//         });
//     },
//   createUser({ body }, res) {
//       User.create(body)
//           .then(dbUserData => res.json(dbUserData))
//           .catch(err => {
//               res.status(400).json(err)
//           })
//   },
//   updateUser({ params, body }, res) {
//       User.findOneAndUpdate({ _id: params.id }, body, {
//         new: true,
//         runValidators: true,
//       })
//         .then((dbUserData) => {
//           if (!dbUserData) {
//             res.status(404).json({ message: "No user found with this id!" });
//             return;
//           }
//           res.json(dbUserData);
//         })
//         .catch((err) => res.status(400).json(err));
//     },
//     deleteUser({ params }, res) {
//       User.findOneAndDelete({ _id: params.id })
//         .then((dbUserData) => {
//           if (!dbUserData) {
//             res.status(404).json({ message: "No user found with this id!" });
//             return;
//           }
//           User.updateMany(
//             { _id: { $in: dbUserData.friends } },
//             { $pull: { friends: params.id } }
//           )
//             .then(() => {
//               Thought.deleteMany({ username: dbUserData.username })
//                 .then(() => {
//                   res.json({ message: "Successfully deleted user!" });
//                 })
//                 .catch((err) => res.status(400).json(err));
//             })
//             .catch((err) => res.status(400).json(err));
//         })
//         .catch((err) => res.status(400).json(err));
//     },
//   addFriend({ params }, res) {
//       User.findByIdAndUpdate(
//         { _id: params.id },
//         { $addToSet: { friends: params.friendId } },
//         { new: true }
//       )
//         .select("-__v")
//         .then((dbUserData) => {
//           if (!dbUserData) {
//             res.status(404).json({ message: "No user found with this id!" });
//             return;
//           }
//           res.json(dbUserData);
//         })
//         .catch((err) => {
//           res.status(400).json(err);
//         });
//     },
//     removeFriend({ params }, res) {
//       User.findByIdAndUpdate(
//         { _id: params.id },
//         { $pull: { friends: params.friendId } },
//         { new: true, runValidators: true }
//       )
//         .select("-__v")
//         .then((dbUserData) => {
//           if (!dbUserData) {
//             res.status(404).json({ message: "No friend found with this id!" });
//             return;
//           }
//           res.json(dbUserData);
//         })
//         .catch((err) => res.status(400).json(err));
//     },
// }

// module.exports = userControllers