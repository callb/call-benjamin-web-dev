(function(){
    angular.module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            createPage : createPage,
            updatePage : updatePage,
            deletePage : deletePage
        };
        return api;

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }
        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);

        }
        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        function findPagesByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";
            var newPage = {
                name: page
            }
            return $http.post(url, newPage);
        }

    }
})();