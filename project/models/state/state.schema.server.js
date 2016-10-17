var mongoose = require("mongoose");

module.exports = function() {
    var StateSchema = mongoose.Schema({
        name: String,
        code: String,
        repPolling: Number,
        demPolling: Number,
        thirdPartyPolling: Number,
        otherPolling: Number
    }, {collection: "project.state"});

    return StateSchema;
};