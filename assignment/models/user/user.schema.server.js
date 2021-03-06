module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        facebook: {
            id: String,
            displayName: String
        },
        email: String,
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date

    }, {collection: "assignment.user"});

    return UserSchema;
};