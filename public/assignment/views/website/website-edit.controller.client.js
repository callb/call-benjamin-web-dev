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
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();
        
        function updateWebsite(websiteId, website) {
            var result = WebsiteService.updateWebsite(websiteId, website);
            if(result === true) {
                vm.success = "Website successfully updated";
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.error = "Unable to update, Website not found";
            }
        }
        
        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result === true) {
                vm.success = "Website successfully deleted";
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.error = "Unable to delete, Website not found";
            }
            
        }

    }
})();