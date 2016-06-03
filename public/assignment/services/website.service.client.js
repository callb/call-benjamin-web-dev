(function(){
    angular.module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    

    function WebsiteService($http) {

        var api = {
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById: findWebsiteById,
            createWebsite : createWebsite,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };
        return api;

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }
        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);

        }
        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }

        function findWebsitesForUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
        }

        function createWebsite(userId, website) {
            var url = "/api/user/" + userId + "/website";
            var newWebsite = {
                name: website
            }
            return $http.post(url, newWebsite);
        }

    }
})();