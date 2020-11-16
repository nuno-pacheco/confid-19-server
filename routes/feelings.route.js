const express = require("express");
const router = express.Router();
const Feeling = require('../models/Feeling.model');
const mongoose = require("mongoose");

/*
router.get('/all_feelings', function(req,res){
    res.send({type:'GET'});
})

*/


router.get('/', (req, res) => {
    Feeling.find()
    .then(allTheFeelings => {
        res.json(allTheFeelings);
    })
    .catch(err => {
        res.json(err);
    });
});


router.post('/', (req, res, next) => {
    const { title,description } = req.body;
    Feeling.create({
        title,
        description,
    })
    .then(response => {
        res.json(response);
    })
    .catch(err => {
    res.json(err);
    });
})


router.get('/:id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Feeling.findById(req.params.id)
        .then(feeling => {
            res.status(200).json(feeling);
        })
        .catch(error => {
            res.json(error);
        });
});

router.put('/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Feeling.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.json({message: `Feeling with ${req.params.id} is updated successfuly.`});
            })
        .catch(error=> {
            res.json(error);
        });
});

router.delete('/:id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Feeling.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({message: `Feeling with ${req.params.id} is removed successfuly.`});
        })
        .catch(error=> {
            res.json(error);
        });
});


module.exports = router;