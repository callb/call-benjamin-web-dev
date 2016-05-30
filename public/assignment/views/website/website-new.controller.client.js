(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;

        vm.createWebsite = createWebsite;
        
        function createWebsite(userId, website) {
            var website = WebsiteService.createWebsite(userId, website);
            vm.websiteName = website.name;
            
            $location.url("/user/" + vm.userId + "/website");

        }
    }


})();