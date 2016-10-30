(function() {
    angular
        .module("ElectionCenter")
        .controller("MapController", MapController);


    function MapController($location, $rootScope, StateService) {
        var vm = this;
        getAllStateCodes();
        
        // Initialize the jQuery map plugin
        function initMap() {
            $(document).ready(function() {
                $('#map').usmap({
                    click: getStateData,
                    stateSpecificStyles: {
                        'AL': {fill: getStateColor('AL')}, 'AK': {fill: getStateColor('AK')},
                        'AS': {fill: getStateColor('AS')}, 'AZ': {fill: getStateColor('AZ')},
                        'AR': {fill: getStateColor('AR')}, 'CA': {fill: getStateColor('CA')},
                        'CO': {fill: getStateColor('CO')}, 'CT': {fill: getStateColor('CT')},
                        'DC': {fill: getStateColor('DC')}, 'DE': {fill: getStateColor('DE')},
                        'FL': {fill: getStateColor('FL')}, 'GA': {fill: getStateColor('GA')},
                        'HI': {fill: getStateColor('HI')}, 'ID': {fill: getStateColor('ID')},
                        'IL': {fill: getStateColor('IL')}, 'IN': {fill: getStateColor('IN')},
                        'IA': {fill: getStateColor('IA')}, 'KS': {fill: getStateColor('KS')},
                        'KY': {fill: getStateColor('KY')}, 'LA': {fill: getStateColor('LA')},
                        'ME': {fill: getStateColor('ME')}, 'MD': {fill: getStateColor('MD')},
                        'MA': {fill: getStateColor('MA')}, 'MI': {fill: getStateColor('MI')},
                        'MN': {fill: getStateColor('MN')}, 'MS': {fill: getStateColor('MS')},
                        'MO': {fill: getStateColor('MO')}, 'MT': {fill: getStateColor('MT')},
                        'NE': {fill: getStateColor('NE')}, 'NV': {fill: getStateColor('NV')},
                        'NH': {fill: getStateColor('NH')}, 'NJ': {fill: getStateColor('AK')},
                        'NM': {fill: getStateColor('NM')}, 'NY': {fill: getStateColor('NY')},
                        'NC': {fill: getStateColor('NC')}, 'ND': {fill: getStateColor('ND')},
                        'OH': {fill: getStateColor('OH')}, 'OK': {fill: getStateColor('OK')},
                        'OR': {fill: getStateColor('OR')}, 'PA': {fill: getStateColor('PA')},
                        'RI': {fill: getStateColor('RI')}, 'SC': {fill: getStateColor('SC')},
                        'SD': {fill: getStateColor('SD')}, 'TN': {fill: getStateColor('TN')},
                        'TX': {fill: getStateColor('TX')}, 'UT': {fill: getStateColor('UT')},
                        'VA': {fill: getStateColor('VA')}, 'WA': {fill: getStateColor('WA')},
                        'WV': {fill: getStateColor('WV')}, 'WI': {fill: getStateColor('WI')},
                        'WY': {fill: getStateColor('WY')}, 'VT': {fill: getStateColor('VT')}
                    }
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

        function getAllStateCodes() {
            StateService
                .getAllStateCodes()
                .then(
                    function(codes) {
                        vm.codes = codes;
                        console.log(vm.codes)
                    },
                    function(error) {
                        vm.getAllCodesError = error;
                    }
                )
        }

        function getStateColor() {
            return "teal"
        }
    }



})();