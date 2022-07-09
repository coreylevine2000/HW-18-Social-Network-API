const router = require('express').Router();
const {
  // getThoughts,
  // getSingleThought,
  // createThought,
  // updateThought,
  // deleteThought,
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/toughtController');

// // /api/thoughts
// router.route('/').get(getThoughts).post(createThought);

// // /api/thoughts/:courseId
// router
//   .route('/:thoughtId')
//   .get(getSingleThought)
//   .put(updateThought)
//   .delete(deleteThought);

// module.exports = router;
//Residual Data from original code

router
    .route('/')
    .get(getAllThoughts);
router
    .route('/:userId')
    .post(addThought);
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(addThought)
    .delete(removeThought);
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;