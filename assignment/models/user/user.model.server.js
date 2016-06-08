module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        return User.create(user);
        //User.create(user, function(err, user) {
        //    model.find(function() {
        //        model.find
        //    })
        //});
    }
    function findUserByCredentials() {

    }
    function findUserById(userId) {
        return User.findById(userId);
    }
    function updateUser() {

    }
    function deleteUser() {

    }
};