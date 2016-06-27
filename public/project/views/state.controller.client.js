(function() {
    angular
        .module("ElectionCenter")
        .controller("StateController", StateController);


    function StateController($routeParams, StateService, $rootScope, $location, ProjectUserService) {
        var vm = this;
        vm.followState = followState;


        //initializes the state info
        function initState() {
            vm.stateCode = $routeParams.state;
            
            StateService
                .findStateByCode(vm.stateCode)
                .then(
                    function(response) {
                        vm.state = response.data[0];
                        vm.stateName = vm.state["name"];
                        vm.stateCode = vm.state["code"];
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )

        }
        initState();

        function initUser() {
            if (!$rootScope.currentUser) {
                vm.userMessage = "No one currently logged in"
            } else {
                vm.userMessage = $rootScope.currentUser["username"] + " logged in"
            }
        }
        initUser();

        function followState() {
            if (!$rootScope.currentUser) {
                $location.url("/login")
            } else {
                var user = $rootScope.currentUser["_id"];
                ProjectUserService
                    .follow(vm.stateCode, user, "state")
                    .then(
                        function(status) {
                            vm.message = "Following state";
                            $location.url("/profile/" + user + "/follows")
                        },
                        function(error) {
                            vm.error = "Problem following state";
                        }
                    )
            }

        }
        
        
    }



})();