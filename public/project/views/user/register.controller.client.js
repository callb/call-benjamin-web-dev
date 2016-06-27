(function(){
    angular
        .module("ElectionCenter")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, ProjectUserService) {

        var vm = this;
        
        vm.register = register;

        function register (username, password, password2) {
            if (username == null || password == null ||
                password2 == null || password2 !== password) {

                vm.error = "Invalid registration info"

            } else {
                ProjectUserService
                    .register(username, password)
                    .then(
                        function(response){
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/profile/" + user._id);
                        },
                        function(error){
                            vm.error = error.data;
                        }
                    );
            }
        }
    }
})();