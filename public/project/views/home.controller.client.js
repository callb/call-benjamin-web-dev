(function(){
    angular
        .module("ElectionCenter")
        .controller("HomeController", HomeController);

    function HomeController($location, $rootScope, ProjectUserService) {

        var vm = this;
        
        function init() {
            console.log($rootScope.currentUser);
            if (!$rootScope.currentUser) {
                vm.userMessage = "No one currently logged in"
            } else {
                vm.userMessage = $rootScope.currentUser["username"] + " logged in"
            }
        }
        init()
    }
})();