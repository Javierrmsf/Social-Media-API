const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require('../../controllers/usercontroller');



///ROUTE /api/users
router.route('/').get(getUsers).post(createUser);

///ROUTE /api/users/:UserId
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

///ROUTE /api/users/:UserId/Friends/:FriendId
router.route('/:UserId/Friends/:FriendId').post(addFriend).delete(removeFriend);



module.exports = router;
