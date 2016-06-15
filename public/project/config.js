(function(){
    angular
        .module("ProjectApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home.view.client.html"
            })
            .when("/register", {
                templateUrl: "views/register.view.client.html"
            })
            .when("/map", {
                templateUrl: "views/map.view.client.html",
                controller: "MapController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });

    }
})();