(function() {
    angular
        .module("ElectionCenter")
        .controller("StateController", StateController);


    function StateController($routeParams, StateService) {
        var vm = this;


        //initializes the state info
        function initState() {
            vm.stateCode = $routeParams.state;
            
            StateService
                .findStateByCode(vm.stateCode)
                .then(
                    function(response) {
                        vm.state = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )

        }
        initState();
        
        
    }



})();