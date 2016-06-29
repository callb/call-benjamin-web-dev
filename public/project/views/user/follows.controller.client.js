(function(){
    angular
        .module("ElectionCenter")
        .controller("FollowsController", FollowsController);

    function FollowsController($location, $rootScope, $routeParams, ProjectUserService) {
        var vm = this;

        var id = $routeParams["id"];
        vm.unfollow = unfollow;



        function init() {
            if (!$rootScope.currentUser) {
                vm.userMessage = "No one currently logged in"
            } else {
                vm.userId = $rootScope.currentUser["_id"];
                vm.userMessage = $rootScope.currentUser["username"] + " logged in"
            }
        }
        init();
        
        function initFollows() {
            ProjectUserService
                .findUserById(id)
                .then(
                    function(response) {
                        vm.follows = response.data.follows;
                        vm.stateFollows = [];
                        vm.userFollows = [];
                        for(var i = 0; i < vm.follows.length; i++) {
                            follow = vm.follows[i]
                            if(follow["type"] == "state") {
                                vm.stateFollows.push(follow);
                            }
                            if (follow["type"] == "user") {
                                vm.userFollows.push(follow);
                            }
                                
                        }
                    },
                    function(error) {
                        vm.error = error;
                    }
                )
        }
        initFollows();

        function unfollow(follow) {
            var id = follow["object"];
            var user = follow["userId"];
            console.log(follow);
            ProjectUserService
                .removeFollowById(id, user)
                .then(
                    function(response) {
                        $location.url("/profile/" + user);
                    },
                    function(error) {
                        vm.error = error;
                    }
                )
                
        }
    }
})();