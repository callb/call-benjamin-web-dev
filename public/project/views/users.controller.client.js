(function() {
    angular
        .module("ElectionCenter")
        .controller("UsersController", UsersController);


    function UsersController($location, $rootScope, ProjectUserService) {
        var vm = this;
        vm.searchForUser = searchForUser

        function init() {
            if (!$rootScope.currentUser) {
                vm.userMessage = "No one currently logged in"
            } else {
                vm.userMessage = $rootScope.currentUser["username"] + " logged in"
            }
            
        }
        init();
        
        function searchForUser(desiredUsername) {
            ProjectUserService
                .findUserByUsername(desiredUsername)
                .then(
                    function(response) {
                        console.log(response.data);
                        vm.foundUser = response.data;
                        var user = vm.foundUser;
                        vm.username = user["username"];
                    }
                )
        }
        
    }



})();