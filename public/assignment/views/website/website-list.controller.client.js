(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            var userId = $routeParams.userId;
            vm.userId = userId;
            WebsiteService
                .findWebsitesForUser(userId)
                .then(function(response) {
                    vm.websites = response.data;
                })

        }
        init();
    }
})();