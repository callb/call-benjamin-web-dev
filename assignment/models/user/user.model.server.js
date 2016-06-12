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
    }
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }
    function findUserById(userId) {
        return User.findById(userId);
    }
    function updateUser(id, newUser) {
        return User.update(
            {_id: id},
            {$set :
                {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                }

            }
        );
    }
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};