var mongoose = require("mongoose");

module.exports = function() {

    var StateSchema = require("./state.schema.server.js")();
    var State = mongoose.model("State", StateSchema);

    var api = {
        findStateByCode: findStateByCode,
        updateStatePollingDataByCandidate: updateStatePollingDataByCandidate
    };
    return api;


    function findStateByCode(state) {
        return State.find({code: state});
    }

    function updateStatePollingDataByCandidate(data, state, party) {
        var candidate = data['choice'];
        var pollNumber = data['value'];
        switch(party) {
            case 'Rep':
                return State.update(
                    {code: state},
                    {$set: {

                    }
                    }

                );
            break;
            case 'Dem':
                return State.update(
                    {code: state},
                    {$set: {

                    }
                    }

                )
            break;
            default: //TODO: Third parties/Other
            
        }
    }

};
