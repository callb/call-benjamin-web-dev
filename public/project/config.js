(function(){
    angular
        .module("ElectionCenter")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile/:id/follows", {
                templateUrl: "views/user/follows.view.client.html",
                controller: "FollowsController",
                controllerAs: "model"
            })
            .when("/profile/:id", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
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
            .when("/users", {
                templateUrl: "views/users.view.client.html",
                controller: "UsersController",
                controllerAs: "model"
            })
            .when("/users/:username", {
                templateUrl: "views/userInfo.view.client.html",
                controller: "UserInfoController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });


        function checkLoggedin(ProjectUserService, $q, $location, $rootScope) {

            var deferred = $q.defer();

            ProjectUserService
                .checkLoggedin()
                .then(
                    function(response) {
                        var user = response.data;
                        if(user == '0') {
                            deferred.reject();
                            $rootScope.currentuser = null;
                            $location.url("/login");
                        } else {
                            $rootScope.currentUser = user;
                            $location.url("/profile/" + user._id);
                            deferred.resolve();
                        }
                    },
                    function(err) {
                        $rootScope.currentUser = null;
                        deferred.reject();

                    }
                );

            return deferred.promise;
        }

    }
})();