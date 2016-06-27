var mongoose = require("mongoose");

module.exports = function() {
    var StateSchema = mongoose.Schema({
        name: String,
        code: String,
        polling: Array //Uses array of poll numbers with candidates
    }, {collection: "project.state"});

    return StateSchema;
};