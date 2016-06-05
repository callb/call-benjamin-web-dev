(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(function(response) {
                    vm.page = response.data;
                })
        }
        init();

        function updatePage(pageId) {
            PageService
                .updatePage(pageId, vm.page)
                .then(
                    function(response) {
                        vm.success = "Page successfully updated";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .then(
                    function(response) {
                        vm.success = "Page successfully deleted";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )

        }

    }
})();