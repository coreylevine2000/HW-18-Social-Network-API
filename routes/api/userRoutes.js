const router = require('express').Router();
const {
    getUsers,
    createUser,
    getSingleUser,
    deleteSingleUser,
    updateSingleUser,
    createFriend,
    deleteFriend,
  } = require("../../controllers/userController");
  
// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router
  .route("/:userId")
  .get(getSingleUser)
  .delete(deleteSingleUser)
  .put(updateSingleUser);

// /api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(createFriend)
  .delete(deleteFriend);

module.exports = router;

// router
//     .route('/')
//     .get(getAllUsers)
//     .post(createUser);

// router
//     .route('/:id')
//     .get(getUserById)
//     .delete(deleteUser)
//     .put(updateUser);
// router
//     .route("/:id/friends/:friendId")
//     .post(addFriend)
//     .delete(removeFriend);


module.exports = router;