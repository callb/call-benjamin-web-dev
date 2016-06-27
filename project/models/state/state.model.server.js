var mongoose = require("mongoose");

module.exports = function() {

    var StateSchema = require("./state.schema.server.js")();
    var State = mongoose.model("State", StateSchema);

    var api = {
        findStateByCode: findStateByCode
    };
    return api;


    function findStateByCode(state) {
        return State.find({code: state});
    }

};
