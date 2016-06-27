(function(){
    angular
        .module("ElectionCenter")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, ProjectUserService) {

        var vm = this;

        vm.login = login;

        function login (username, password) {
            if(username == null || password == null) {
                vm.error = "username and password required";

            } else {
                ProjectUserService
                    .login(username, password)
                    .then(
                        function(response) {
                            console.log(response);
                            var user = response.data;
                            if(user) {
                                $rootScope.currentUser = user;
                                var id = user._id;
                                $location.url("/profile/" + id);
                            }
                        },
                        function (error) {
                            vm.error = "User not found";
                        }
                    );
            }

        }
    }
})();