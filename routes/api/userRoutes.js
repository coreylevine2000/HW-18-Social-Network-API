const router = require('express').Router();
const {
  // getUsers,
  // getSingleUser,
  createUser,
  deleteUser,
  // addReaction,
  // removeReaction,
  updateUser,
  getAllUsers,
  getUserById,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');
// // /api/users
// router.route('/').get(getUsers).post(createUser);

// // /api/users/:userId
// router.route('/:userId').get(getSingleUser).delete(deleteUser);

// // /api/users/:userId/reactions
// router.route('/:userId/reactions').post(addReaction);

// // /api/users/:userId/reactions/:reactionsId
// router.route('/:userId/reactions/:reactionId').delete(removeReaction);

// module.exports = router;
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser);
router
    .route("/:id/friends/:friendId")
    .post(addFriend)
    .delete(removeFriend);


module.exports = router;