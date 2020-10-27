const { Schema, model } = require('mongoose');

const feelingSchema = new Schema({
        title: {
            type: String,
            unique: true,
        },
        description: { 
            type:String,
        },
        sensation: [{ type : Schema.Types.ObjectId, ref: 'New'}]
    },{
        timestamps:{
            createdAt: "create_at",
            updatedAt: "update_at"
        },
});

const Feeling = model('Feeling', feelingSchema);
module.exports = Feeling;