(function(){
    angular
        .module("ElectionCenter")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, $rootScope, ProjectUserService) {
        var vm = this;

        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;

        var id = $routeParams["id"];
        var index = -1;
        function init() {
            ProjectUserService
                .findUserById(id)
                .then(function(response) {
                    vm.user = response.data;
                });


        }
        init();

        function unregister() {
            ProjectUserService
                .deleteUser(id)
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

        function updateUser() {
            ProjectUserService
                .updateUser(id, vm.user)
                .then(
                    function(response) {
                        vm.success = "User successfully updated";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
        
        function logout() {
            ProjectUserService
                .logout()
                .then(
                    function() {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function() {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                )
        }
    }
})();