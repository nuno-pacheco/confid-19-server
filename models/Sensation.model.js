const { Schema, model } = require('mongoose');

const sensationSchema= new Schema({
    title:String,
    description: String,
    feeling: {
        type: Schema.Types.ObjectId,
        ref: 'Feeling'
    }
});

const Sensation = model('New', sensationSchema);
module.exports = Sensation;