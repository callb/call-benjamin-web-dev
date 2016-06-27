module.exports = function() {

    var mongoose = require('mongoose');
    //mongoose.connect('mongodb://localhost/cs4550summer1');

    var stateModel = require("./state/state.model.server.js")();
    var candidateModel = require("./candidate/candidate.model.server.js")();
    var userModel = require("./user/user.model.server.js")();
    

    var models = {
        stateModel: stateModel,
        candidateModel: candidateModel,
        userModel: userModel
    };

    return models;
};