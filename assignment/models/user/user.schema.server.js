module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date

    }, {collection: "user"});

    return UserSchema;
};