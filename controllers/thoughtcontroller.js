
const Thought  = require('../models/Thought');
const User = require('../models/User');

module.exports = {






//////////////GET ALL THOUGHTS
    getThoughts(req, res) {
        Thought.find({})
        

            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => { console.log(err); res.status(400).json(err);
            });
    },



/////////////GET SINGLE THOUGHT
    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },


  ///////////// CREATE A THOUGHT
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.UserId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'error' });
                    return;

                }

                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },


     ////////////// UPDATE THOUGHT

     updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'error' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },


 //////////DELETE THOUGHT
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'error' });
                }
                return User.findOneAndUpdate(
                    { _id: params.UserId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'error' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //// CREATE REACTION
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'error' });
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },




    //// DELETE reaction
    deleteReaction({ params }, res) {
        console.log(params.thoughtId, params.ReactionId);
        Thought.findOneAndUpdate(


            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.ReactionId } } },
            { runValidators: true, new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }




};

