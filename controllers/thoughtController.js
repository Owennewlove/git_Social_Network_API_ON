const router = require('express').Router()
const Thought = require('../models/thought')


module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((dbthoughtData) => res.json(dbthoughtData))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneandUpdate(
            { _id: req.params.thoughtId },
            { $set: { thoughtText: req.params.thoughtText } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                res.json(thought)
            }



            )

            .catch((err) => res.status(500).json(err));

    },
    // Delete a thought 
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No such thought exists' })
                    : res.json({ message: 'Thought successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createReaction(req, res) {
        Thought.findOneandUpdate({ _id: req.params.thoughtId },
            {
                $push: {
                    reactions: req.body
                }
            }, {new: true})
            .then(reactions =>
                !reactions
                    ? res.status(404).json({ message: 'No such reaction' })
                    : res.json(reactions)
                    )
            

    },
    deleteReaction(req, res) {
        Thought.findOneandUpdate({ _id: req.params.thoughtId },
            {
                $pull: {
                    reactions: req.params.reactionId
                }
            }, {new: true})
            .then(reactions =>
                !reactions
                    ? res.status(404).json({ message: 'No such reaction' })
                    : res.json(reactions)
                    )
    }


};