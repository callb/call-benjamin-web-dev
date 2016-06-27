module.exports = function(app, models) {

    var stateModel = models.stateModel;

    app.get("/api/state/:state", findStateByCode);

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
                    res.status(400).send(error);
                }
            );
    }

};