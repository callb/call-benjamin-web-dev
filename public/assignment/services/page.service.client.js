(function(){
    angular.module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    function PageService() {

        var api = {
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            createPage : createPage,
            updatePage : updatePage,
            deletePage : deletePage
        };
        return api;

        function updatePage(pageId, page) {
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    pages[i].name = page;
                    return true;
                }
            }

            return false;
        }
        function deletePage(pageId) {
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    delete pages[i];
                    return true;
                }
            }

            return false;

        }
        function findPageById(pageId) {
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    return pages[i];
                }
            }
            return null;
        }

        function findPagesByWebsiteId(websiteId) {
            var result = [];
            for(var i in pages) {
                if(pages[i].websiteId === websiteId) {
                    result.push(pages[i]);
                }
            }
            return result;
        }


        // helper function that generates a new random website id
        function generateId() {
            var newId = Math.floor((Math.random() * 999));
            var idExists = true;
            while (idExists) {
                idExists = false;
                for (var i in pages) {
                    if (pages[i]._id === newId) {
                        idExists = true;
                    }
                }
            }

            return newId;
        }

        function createPage(websiteId, page) {
            var newPage = {
                "_id": generateId().toString(),
                "name": page,
                "websiteId" : websiteId
            }

            pages.push(newPage);
            return newPage;
        }

    }
})();