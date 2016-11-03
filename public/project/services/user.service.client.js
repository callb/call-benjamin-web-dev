(function () {
    angular
        .module("ElectionCenter")
        .factory("ProjectUserService", ProjectUserService);

    function ProjectUserService($http) {

        var api = {
            login: login,
            register: register,
            logout: logout,
            checkLoggedin: checkLoggedin,
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            follow: follow,
            findFollowsByUser: findFollowsByUser,
            findUserByUsername: findUserByUsername,
            removeFollowById: removeFollowById
        };
        return api;

        
        function removeFollowById(id, user) {
            var url = "/api/project/id/" + id + "/user/" + user;
            return $http.delete(url)
        }
        
        function findUserByUsername(username) {
            var url = "/api/project/user?username="+username;
            return $http.get(url);
        }

        function findFollowsByUser(id) {
            var url = "/api/project/findFollows";

            return $http.post(url, id);
        }

        function follow(object, user, type) {
            var url = "/api/project/follow";
            var follow = {
                user: user,
                object: object,
                type: type
            };
            console.log(follow);
            return $http.post(url, follow)
        }

        function login(username, password) {
            var url = "/api/project/login";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function register(username, password) {
            var url = "/api/project/register";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);

        }

        function logout() {
            return $http.post('/api/project/logout');
        }

        function checkLoggedin() {
            return $http.get("/api/project/loggedin");
        }

        function updateUser(id, newUser) {
            var url = "/api/project/user/"+id;
            return $http.put(url, newUser);
        }
        function createUser(username, password) {
            var url = "/api/project/user";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }
        function deleteUser(id) {
            var url = "/api/project/user/"+id;
            return $http.delete(url);
        }

        function findUserByUsernameAndPassword(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url);
        }
        function findUserById(id) {
            var url = "/api/project/user/" + id;
            return $http.get(url);
        }

    }
})();