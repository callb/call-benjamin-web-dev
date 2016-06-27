module.exports = function() {

    var mongoose = require("mongoose");
    var ProjectUserSchema = require("./user.schema.server.js")();
    var ProjectUser = mongoose.model("ProjectUser", ProjectUserSchema);

    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findFacebookUser: findFacebookUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        //findFollows: findFollows,
        follow: follow,
        deleteFollow: deleteFollow
    };
    return api;

    function findFacebookUser(id) {
        return ProjectUser.findOne({'facebook.id': id});
    }

    function createUser(user) {
        return ProjectUser.create(user);
    }
    function findUserByUsername(username) {
        return ProjectUser.findOne({username: username});
    }
    function findUserByCredentials(username, password) {
        return ProjectUser.findOne({username: username, password: password});
    }
    function findUserById(userId) {
        return ProjectUser.findById(userId);
    }
    function updateUser(id, newUser) {
        return ProjectUser.update(
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
        return ProjectUser.remove({_id: userId});
    }

    function deleteFollow(id, user) {
        return ProjectUser.update(
            {_id: user},
            {$pull :
            {"follows": {object: id}}

            }
        )
    }

    
    function follow(object, user, type) {
        return ProjectUser.update(
            {_id: user},
            {$push :
            {"follows": {object: object, userId: user, type: type}}

            }
        )
    }
};