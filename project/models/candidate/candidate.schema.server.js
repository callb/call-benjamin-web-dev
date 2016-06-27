var mongoose = require("mongoose");

module.exports = function() {
    var CandidateSchema = mongoose.Schema({
        name : String,
        party: String,
        age: Number,
        _homeState: {type: mongoose.Schema.Types.ObjectId, ref: 'State' },
        runningFor: String
    }, {collection: "project.candidate"});

    return CandidateSchema;
};