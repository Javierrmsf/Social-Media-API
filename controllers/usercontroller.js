const { User, Thought } = require('../models');

module.exports = {
////////////////////////////
    getUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

///////////////////////////////
 
getSingleUser({ params }, res) {
    User.findOne({ _id: params.id })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'error' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},

   ////////////////////////////////
   createUser({ body }, res) {
    User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
},

updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'error' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
},
////////////////////////7


    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'error' });
                }

                // bonus: return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
            })
            .then(() => {
                res.json({ message: 'error' });
            })
            .catch(err => res.status(400).json(err));
    },
///////////////////////////////////////////

    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.UserId }, { $addToSet: { friends: params.FriendId } }, { runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'error' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },


    //////////////////////////
    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.UserId }, { $pull: { friends: params.FriendId } }, { runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'error' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },


}