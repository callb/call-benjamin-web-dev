(function(){
    angular
        .module("ProjectApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
        // user routes
            .when("/login", {
                templateUrl: "views/user/login.view.client.html"
            })
            .otherwise({
                redirectTo: "/login"
            });

    }
})();