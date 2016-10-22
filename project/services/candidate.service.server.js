module.exports = function(app, models) {

    var candidateModel = models.candidateModel;

    app.get("/api/candidate/:name", findCandidateByName);

    function findCandidateByName(req, res) {
        //res.send(req.params.state + " from the server");

        var candidate = req.params.candidate;

        var info = candidateModel.findCandidateByParty(candidate);
        res.send(info);
        /**
         .then(
         function(state) {
                    res.send(state);
                },
         function(error) {
                    res.status(400).send(error);
                }
         );
         **/
    }

};