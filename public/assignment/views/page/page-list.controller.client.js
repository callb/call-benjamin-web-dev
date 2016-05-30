(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        function init() {
            var userId = $routeParams.userId;
            var websiteId = $routeParams.websiteId;
            vm.userId = userId;
            vm.websiteId = websiteId;
            vm.pages = PageService.findPagesByWebsiteId(websiteId);
        }
        init();

    }
})();