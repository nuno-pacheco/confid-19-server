const express = require("express");
const router = express.Router();
const feelingRouter = express.Router();
const Feeling = require('../models/Feeling.model');





feelingRouter.route('/all_feelings').get((req, res) => {
    Feeling.find()
    .populate('sensation')
    .then(allTheFeelings => {
        res.json(allTheFeelings);
    })
    .catch(err => {
        res.json(err);
    });
});


feelingRouter.post('/all_feelings', (req, res, next) => {
    const {title,description } = req.body;
    Feeling.create({
        title,
        description,
        sensation: []
    })
    .then(response => {
        res.json(response);
    })
    .catch(err => {
    res.json(err);
    });
})


feelingRouter.route('/all_feelings/:id').get((req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Feeling.findById(req.params.id)
        .populate('new')
        .then(feeling => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.json(error);
        });
});

feelingRouter.route('/all_feelings/:id').put, ((req, res, next) => {
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

feelingRouter.route('/all_feelings/:id').delete, ((req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Feeling.findByIdAndRemove(req.params.id)
        .then(() => {
            res.json({message: `Feeling with ${req.params.id} is removed successfuly.`});
        })
        .catch(error=> {
            res.json(error);
        });
});





module.exports = router;