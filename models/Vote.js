var mongoose = require("mongoose");
var Schema   =mongoose.Schema;

var VoteSchema = new Schema({
    os:{
        type: String,
        required:true
    },
    points: {
        type:String,
        required: true
    }
});

//Create collection and add schema
var Vote = mongoose.model("vote", VoteSchema);

module.exports = Vote;