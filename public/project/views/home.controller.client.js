(function(){
    angular
        .module("ElectionCenter")
        .controller("HomeController", HomeController);

    function HomeController($location, $rootScope, ProjectUserService) {

        var vm = this;
        
        function init() {
            if (!$rootScope.currentUser) {
                vm.userMessage = "No one currently logged in"
            } else {
                vm.userId = $rootScope.currentUser["_id"];
                vm.userMessage = $rootScope.currentUser["username"] + " logged in"
            }
        }
        init()
    }
})();