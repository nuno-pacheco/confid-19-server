const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Feeling = require('../models/Feeling.model');
const Sensation = require('../models/Sensation.model');
const sensationRouter = express.Router();

// Retrieve a specific sensation
sensationRouter.route('/all_feelings/sensations/:sensationId').get((req, res) => {
    Sensation.findById(req.params.sensationId)
        .then(sensation => {
            res.json(sensation);
        })
        .catch(error => {
            res.json(error);
        });
});

// Create new sensation
sensationRouter.route('/sensations').post((req, res) => {
    Sensation.create({
        title: req.body.title,
        description: req.body.description,
        feeling: req.body.feelingID
    })
    .then(response => {
        return Feeling.findByIdAndUpdate(req.body.feelingID, {
            $push: { sensation: response._id }
        });
    })
    .then(theResponse => {
        res.json(theResponse);
    })
    .catch(err => {
        res.json(err);
    });
});

//update a specific sensation

sensationRouter.route('/sensations/:id').put((req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Sensation.findByIdAndUpdate(req.params.id, req.body)
        .then(()=> {
            res.json({message: `Sensation with ${req.params.id} is updated successfuly.`});
        })
        .catch(err => {
            res.json(err);
        });
})

// Delete a specific sensation
sensationRouter.route('/sensations/:id').delete((req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Sensation.findByIdAndRemove(req.params.id)
        .then(()=> {
            res.json({message:`Sensation${req.params.id} is removed successfully.`});
        })
        .catch(err => {
            res.json(err);
        });
})

module.exports = router;
