(function(){
    angular
        .module("ElectionCenter")
        .factory("StateService", StateService);

    function StateService($http) {

        var api = {
            findStateByCode : findStateByCode,
            getAllStateCodes : getAllStateCodes
        };
        return api;
        
        function findStateByCode(state) {
            var url = "/api/state/" + state;
            return $http.get(url);
        }
        
        function getAllStateCodes() {
            var url = "/api/state/all";
            return $http.get(url)
        }

    }
})();