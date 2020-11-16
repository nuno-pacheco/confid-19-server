const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feelingSchema = new Schema({
        title: {
            type: String,
        },
        description: { 
            type:String,
        },
        user: {type: Schema.Types.ObjectId, ref:"User" },
    },{
        timestamps:{
            createdAt: "create_at",
            updatedAt: "update_at"
        },
});

const Feeling = mongoose.model('Feeling', feelingSchema);
module.exports = Feeling;