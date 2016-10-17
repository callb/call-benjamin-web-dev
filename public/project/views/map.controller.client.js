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


        function init() {
            console.log($rootScope.currentUser);
            if (!$rootScope.currentUser) {
                vm.userMessage = "No one currently logged in"
            } else {
                vm.userMessage = $rootScope.currentUser["username"] + " logged in"
            }
        }
        init();

        function getStateData(event, data) {
            var state = data.name;

            $rootScope.$apply(function() {
                $location.url("/map/" + state);
            })
            
        }
    }



})();