(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;

        vm.createWebsite = createWebsite;
        
        function createWebsite(userId, website) {
            if(website == null) {
                vm.error = "Website Name Required";
            } else {
                WebsiteService
                    .createWebsite(userId, website)
                    .then(function(response) {
                        vm.website = response.body;
                        vm.websiteName = website.name;
                    });

                $location.url("/user/" + vm.userId + "/website");


            }
        }

    }


})();