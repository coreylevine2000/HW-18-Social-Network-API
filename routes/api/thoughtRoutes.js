const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
//   getAllThoughts,
//   getThoughtById,
//   addThought,
//   removeThought,
//   addReaction,
//   removeReaction
} = require('../../controllers/toughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:courseId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

  // /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction)

module.exports = router;

// router
//     .route('/')
//     .get(getAllThoughts);
// router
//     .route('/:userId')
//     .post(addThought);
// router
//     .route('/:thoughtId')
//     .get(getThoughtById)
//     .put(addThought)
//     .delete(removeThought);
// router
//     .route('/:thoughtId/reactions')
//     .post(addReaction)
//     .delete(removeReaction);

module.exports = router;