(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {

        var vm = this;

        vm.createUser = createUser;

        function createUser (username, password, verifyPassword) {
            if (password === verifyPassword) {
                var newUser = {
                    _id: null, 
                    username: username, 
                    password: password, 
                    firstName: null,  
                    lastName: null
                }
                
                var result = UserService.createUser(newUser);
                if (result) {
                    $location.url("/user/" + result._id);
                } else {
                    vm.error = "Username already in use. Please choose a different one."
                }

            } else {
                vm.error = "Passwords don't match. Please try again."
            }

        }
    }
})();