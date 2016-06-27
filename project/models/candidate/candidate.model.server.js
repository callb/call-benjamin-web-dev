var mongoose = require("mongoose");

module.exports = function() {

    var CandidateSchema = require("./candidate.schema.server.js")();
    var Candidate = mongoose.model("Candidate", CandidateSchema);

    var api = {
        findCandidateByName: findCandidateByName
    };
    return api;


    function findCandidateByName(cand) {
        return Candidate.find({name: cand});
        //return State.findById(state);
    }

};
