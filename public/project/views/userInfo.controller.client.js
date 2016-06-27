
(function(){
    angular
        .module("ElectionCenter")
        .controller("UserInfoController", UserInfoController);

    function UserInfoController($location, $routeParams, $rootScope, ProjectUserService) {

        var vm = this;
        var username = $routeParams["username"];
        vm.followUser = followUser;

        function init() {
            if (!$rootScope.currentUser) {
                vm.userMessage = "No one currently logged in"
            } else {
                vm.userId = $rootScope.currentUser["_id"];
                vm.userMessage = $rootScope.currentUser["username"] + " logged in"
            }

            ProjectUserService
                .findUserByUsername(username)
                .then(
                    function(response) {
                        console.log(response.data);
                        vm.foundUser = response.data;
                        var user = vm.foundUser;
                    }
                )
        }
        init();

        function followUser() {
            if (!$rootScope.currentUser) {
                $location.url("/login")
            } else {
                var user = $rootScope.currentUser["_id"];
                ProjectUserService
                    .follow(vm.foundUser, user, "user")
                    .then(
                        function(status) {
                            vm.message = "Following user";
                            $location.url("/profile/" + user + "/follows")
                        },
                        function(error) {
                            vm.error = "Problem following user";
                        }
                    )
            }

        }
        
        
    }
})();