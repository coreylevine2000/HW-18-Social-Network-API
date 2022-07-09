const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// // Aggregate function to get the number of users overall
// const headCount = async () =>
// User.aggregate()
//     .count('userCount')
//     .then((numberOfUsers) => numberOfUsers);

// // Aggregate function for getting the overall grade using $avg
// const grade = async (userId) =>
// User.aggregate([
//     // only include the given user by using $match
//     { $match: { _id: ObjectId(userId) } },
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: ObjectId(userId),
//         overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

// module.exports = {
//   // Get all users
//   getUsers(req, res) {
//     User.find()
//       .then(async (users) => {
//         const userObj = {
//             numberOfUsers,
//           headCount: await headCount(),
//         };
//         return res.json(userObj);
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
//   // Get a single user
//   getSingleUser(req, res) {
//     User.findOne({ _id: req.params.userId })
//       .select('-__v')
//       .then(async (user) =>
//         !user
//           ? res.status(404).json({ message: 'No user with that ID' })
//           : res.json({
//             user,
//               grade: await grade(req.params.userId),
//             })
//       )
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
//   // create a new user
//   createUser(req, res) {
//     User.create(req.body)
//       .then((user) => res.json(user))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Delete a user and remove them from the thought
//   deleteUser(req, res) {
//     User.findOneAndRemove({ _id: req.params.userId })
//       .then((user) =>
//         !user
//           ? res.status(404).json({ message: 'No such user exists' })
//           : Thought.findOneAndUpdate(
//               { users: req.params.userId },
//               { $pull: { users: req.params.userId } },
//               { new: true }
//             )
//       )
//       .then((thought) =>
//         !thought
//           ? res.status(404).json({
//               message: 'User deleted, but no thoughts found',
//             })
//           : res.json({ message: 'User successfully deleted' })
//       )
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },

//   // Add an assignment to a user
//   addAssignment(req, res) {
//     console.log('You are adding an assignment');
//     console.log(req.body);
//     User.findOneAndUpdate(
//       { _id: req.params.userId },
//       { $addToSet: { assignments: req.body } },
//       { runValidators: true, new: true }
//     )
//       .then((user) =>
//         !user
//           ? res
//               .status(404)
//               .json({ message: 'No user found with that ID :(' })
//           : res.json(user)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // Remove assignment from a user
//   removeAssignment(req, res) {
//     User.findOneAndUpdate(
//       { _id: req.params.userId },
//       { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
//       { runValidators: true, new: true }
//     )
//       .then((user) =>
//         !user
//           ? res
//               .status(404)
//               .json({ message: 'No user found with that ID :(' })
//           : res.json(user)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
// };

const userControllers = {
  getAllUsers(req, res) {
      User.find({})
          .populate({
              path: 'thoughts',
              select: ('-__v')
          })
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
              res.status(400).json(err)
          })
  },
  getUserById({ params }, res) {
      User.findOne({ _id: params.id })
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .select("-__v")
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    },
  createUser({ body }, res) {
      User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
              res.status(400).json(err)
          })
  },
  updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
    deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          User.updateMany(
            { _id: { $in: dbUserData.friends } },
            { $pull: { friends: params.id } }
          )
            .then(() => {
              Thought.deleteMany({ username: dbUserData.username })
                .then(() => {
                  res.json({ message: "Successfully deleted user!" });
                })
                .catch((err) => res.status(400).json(err));
            })
            .catch((err) => res.status(400).json(err));
        })
        .catch((err) => res.status(400).json(err));
    },
  addFriend({ params }, res) {
      User.findByIdAndUpdate(
        { _id: params.id },
        { $addToSet: { friends: params.friendId } },
        { new: true }
      )
        .select("-__v")
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    },
    removeFriend({ params }, res) {
      User.findByIdAndUpdate(
        { _id: params.id },
        { $pull: { friends: params.friendId } },
        { new: true, runValidators: true }
      )
        .select("-__v")
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No friend found with this id!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
}

module.exports = userControllers