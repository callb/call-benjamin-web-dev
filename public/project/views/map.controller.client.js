(function() {
    angular
        .module("ElectionCenter")
        .controller("MapController", MapController);


    function MapController($location, $rootScope) {
        var vm = this;


        // Initialize the jQuery map plugin
        function initMap() {
            $(document).ready(function() {
                $('#map').usmap({
                    click: getStateData
                });
            });
            
        }
        initMap();

        function getStateData(event, data) {
            var state = data.name;

            $rootScope.$apply(function() {
                $location.url("/map/" + state);
            })
            
        }
    }



})();