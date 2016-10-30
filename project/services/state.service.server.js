module.exports = function(app, models) {

    var stateModel = models.stateModel;
    var pollster = require('pollster');

    app.get("/api/state/:state", findStateByCode);
    app.get("/api/state-codes/", getAllStateCodes);

    function findStateByCode(req, res) {
        //res.send(req.params.state + " from the server");

        var state = req.params.state;
        stateModel
            .findStateByCode(state)
            .then(
                function(state) {
                    res.send(state);
                },
                function(error) {
                    res.status(400).send(error)
                }
            );
    }
    
    function getAllStateCodes(req, res) {
        stateModel
            .getAllStateCodes()
            .then(
                function(codes) {
                    res.send(parseStateCodes(codes));
                },
                function(error) {
                    res.status(400).send(error)
                }
            );
    }

    function parseStateCodes(rawCodes) {
        var codeList = [];
        for (var c in rawCodes) {
            codeList.push(rawCodes[c]["code"])
        }
        return rawCodes
    }

    function setInitialUpdateAndPeriodicUpdates() {
        updateAllPollingData();
        setInterval(updateAllPollingData, 1000000)
    }

    function updateAllPollingData() {
        var stateCodes = fetchStateCodes();
        for (var i = 0, len = stateCodes.length; i < len; i++) {
            fetchAndUpdatePollingDataByState(stateCodes[i]);
        }
    }

    function fetchAndUpdatePollingDataByState(state) {
        pollster.charts({topic: '2016-president', state: state}, function(resp) {
            var data = resp[0];
            if (data) {
                var state = data['state'];
                var estimates = data['estimates'];
                for (var j = 0, len = estimates.length; j < len; j++) {
                    var party = estimates[j]['party'];
                    stateModel
                        .updateStatePollingDataByCandidate(estimates[j], state, party)
                        .then(
                            function(success) {
                                //successfully entered the polling data
                            },
                            function(error) {
                                res.status(400).send(error);
                            }
                        )
                }
            }
            
        });
    }

    function fetchStateCodes() {
        return ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA',
            'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI',
            'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
            'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
            'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY',
            'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
            'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'WA',
            'WV', 'WI', 'WY', 'VT']
    }

    // constant updates to polling data
    setInitialUpdateAndPeriodicUpdates()

};