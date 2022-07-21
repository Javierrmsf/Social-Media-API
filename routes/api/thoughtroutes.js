const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtcontroller');
const {route} = require('./userroutes');

/// ROUTE /api/thoughts
router.route('/').get(getThoughts);

/// ROUTE /api/thoughts/UserId
router.route('/:UserId').post(createThought);

/// ROUTE /api/thoughts/thoughtId

router.route('/:thoughtId').get(getSingleThought).put(updateThought)

/// ROUTE /api/thoughts/UserId/thoughtId

router.route('/:UserId/:thoughtId').delete(deleteThought);

///ROUTE /api /thoughts/thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

///ROUTE /api /thoughtId/reactions/reactionId

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = router;
