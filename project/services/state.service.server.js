module.exports = function(app) {

    //var stateModel = models.stateModel;

    app.get("/api/state/:state", findStateByCode);

    function findStateByCode(req, res) {
        console.log(req.params.state);
        res.send(req.params.state + " from the server");
        
        /*
        var stateCode = req.params.state;

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
            */
    }

};