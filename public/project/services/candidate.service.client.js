/**
 * Created by ben on 10/22/16.
 */
(function(){
    angular
        .module("ElectionCenter")
        .factory("CandidateService", CandidateService);

    function CandidateService($http) {

        var api = {
            findCandidateByParty : findCandidateByParty,
            getAllCandidates : getAllCandidates
        };
        return api;

        function findCandidateByParty(party) {
            var url = "/api/candidate/" + party;
            return $http.get(url);
        }
        
        function getAllCandidates() {
            var url = "/api/candidate/all";
            return $http.get(url)
        }

    }
})();