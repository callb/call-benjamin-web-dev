(function(){
    angular
        .module("ElectionCenter")
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
            .when("/map/:state", {
                templateUrl: "views/state.view.client.html",
                controller: "StateController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });

    }
})();