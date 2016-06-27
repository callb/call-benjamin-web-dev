(function(){
    angular
        .module("ElectionCenter")
        .controller("FollowsController", FollowsController);

    function FollowsController($location, $rootScope, ProjectUserService) {
        var vm = this;

        var id = $routeParams["id"];
        
        function init() {
            ProjectUserService
                .findFollowsByUser(id)
                .then(
                    function(follows) {
                        vm.follows = follows
                    },
                    function(error) {
                        vm.error = error;
                    }
                )
        }
    }
})();