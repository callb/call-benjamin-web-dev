(function(){
    angular
        .module("ElectionCenter")
        .factory("StateService", StateService);

    function StateService($http) {

        var api = {
            findStateByCode : findStateByCode
        };
        return api;
        
        function findStateByCode(state) {
            var url = "/api/state/" + state;
            return $http.get(url);
        }

    }
})();