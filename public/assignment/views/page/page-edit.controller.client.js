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
            vm.page = PageService.findPageById(vm.pageId);
            vm.pageName = vm.page.name;
        }
        init();

        function updatePage(pageId, page) {
            var result = PageService.updatePage(pageId, page);
            if(result === true) {
                vm.success = "Page successfully updated";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Unable to update, Page not found";
            }
        }

        function deletePage(pageId) {
            var result = PageService.deletePage(pageId);
            if(result === true) {
                vm.success = "Page successfully deleted";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Unable to delete, Page not found";
            }

        }

    }
})();