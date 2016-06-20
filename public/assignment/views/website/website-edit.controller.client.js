(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function(response) {
                    vm.website = response.data;
                })
        }
        init();
        
        function updateWebsite(websiteId, website) {
            if (website == null) {
                vm.error = "website name required"
            } else {
                WebsiteService
                    .updateWebsite(websiteId, vm.website)
                    .then(
                        function(response) {
                            vm.success = "Website successfully updated";
                            $location.url("/user/" + vm.userId + "/website");
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )
            }
        }

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(
                    function(response) {
                        vm.success = "User successfully updated";
                        $location.url("/user/" + vm.userId + "/website");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )

        }

    }
})();