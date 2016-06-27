module.exports = function(app) {

    var models = require("./models/models.js")();
    
    var stateService = require("./services/state.service.server.js")(app, models);
    var candidateService = require("./services/candidate.service.server")(app, models);
    var userService = require("./services/user.service.server")(app, models);

};