var mongoose = require("mongoose");

module.exports = function() {

    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;



    function createWebsite(userId, website) {
        website._user = userId;
        return Website.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }

    function updateWebsite(id, newWebsite) {
        return Website.update(
            {_id: id},
            {$set :
            {
                name: newWebsite.name
            }

            }
        );
    }

    function deleteWebsite(id) {
        return Website.remove({_id: id});
    }
};
