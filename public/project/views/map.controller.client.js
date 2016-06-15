(function() {
    angular
        .module("ProjectApp")
        .controller("MapController", MapController);


    function MapController() {
        var vm = this;


        // Initialize the jQuery map plugin
        function initMap() {
            $(document).ready(function() {
                $('#map').usmap({});
            });
            
        }
        initMap();
    }



})();