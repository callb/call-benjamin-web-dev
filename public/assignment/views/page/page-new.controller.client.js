(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        vm.createPage = createPage;

        function createPage(websiteId, page) {
            var page = PageService.createPage(websiteId, page);
            vm.pageName = page.name;

            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");

        }

    }


})();