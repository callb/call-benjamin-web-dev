(function() {
    angular
        .module("ElectionCenter")
        .controller("MapController", MapController);


    function MapController($location, $rootScope, StateService) {
        var vm = this;
        vm.stateList = [];
        function getAllStateCodesAndData() {
            StateService
                .getAllStateCodes()
                .then(
                    function(codes) {
                        getAllStateData(codes.data);
                    },
                    function(error) {
                        vm.getAllCodesError = error;
                    }
                )
        }

        function getAllStateData(codes) {
            var stateDataList = [];
            for (var index = 0; index < codes.length; index++) {
                StateService
                    .findStateByCode(codes[index])
                    .then(
                        function(response) {
                            stateDataList.push(response.data[0]);
                            if (index == codes.length) {
                                getStateColors(stateDataList)
                            }
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )
            }
        }
        function getStateColors(statesData) {
            var colorMap = {};
            for (var index in statesData) {
                var repPolling = statesData[index]["repPolling"];
                var demPolling = statesData[index]["demPolling"];
                //positive means republican winning, negative means democrat
                var diff = repPolling - demPolling;
                var stateCode = statesData[index]["code"];
                if (!repPolling || !demPolling) {
                    colorMap[stateCode] = "#7B7D7D"
                } else if(diff > 0 && diff < 5) {
                    //republican lean
                    colorMap[stateCode] = "#F1948A"
                } else if(diff >= 5 && diff < 10) {
                    //republican favored
                    colorMap[stateCode] = "#E74C3C"
                } else if (diff >= 10) {
                    //republican safe
                    colorMap[stateCode] = "#922B21"
                } else if (diff < 0 && diff > -5) {
                    //democrat lean
                    colorMap[stateCode] = "#A9CCE3"
                } else if (diff <= -5 && diff >= -10) {
                    //democrat favored
                    colorMap[stateCode] = "#2980B9"
                } else if (diff <= -10) {
                    //democrat safe
                    colorMap[stateCode] = "#1A5276 "

                } else  {
                    //toss-up
                    colorMap[stateCode] = "#FBFCFC";
                }

            }
            if (Object.keys(colorMap).length == "51") {
                initMap(colorMap)
            }
        }
        getAllStateCodesAndData();
        
        // Initialize the jQuery map plugin
        function initMap(colorMap) {
            console.log(colorMap['AL']);
            $(document).ready(function() {
                $('#map').usmap({
                    click: getStateData,
                    stateHoverStyles: {fill: 'black'},
                    stateSpecificStyles: {
                        'AL': {fill: colorMap['AL']}, 'AK': {fill: colorMap['AK']},
                        'AS': {fill: colorMap['AS']}, 'AZ': {fill: colorMap['AZ']},
                        'AR': {fill: colorMap['AR']}, 'CA': {fill: colorMap['CA']},
                        'CO': {fill: colorMap['CO']}, 'CT': {fill: colorMap['CT']},
                        'DC': {fill: colorMap['DC']}, 'DE': {fill: colorMap['DE']},
                        'FL': {fill: colorMap['FL']}, 'GA': {fill: colorMap['GA']},
                        'HI': {fill: colorMap['HI']}, 'ID': {fill: colorMap['ID']},
                        'IL': {fill: colorMap['IL']}, 'IN': {fill: colorMap['IN']},
                        'IA': {fill: colorMap['IA']}, 'KS': {fill: colorMap['KS']},
                        'KY': {fill: colorMap['KY']}, 'LA': {fill: colorMap['LA']},
                        'ME': {fill: colorMap['ME']}, 'MD': {fill: colorMap['MD']},
                        'MA': {fill: colorMap['MA']}, 'MI': {fill: colorMap['MI']},
                        'MN': {fill: colorMap['MN']}, 'MS': {fill: colorMap['MS']},
                        'MO': {fill: colorMap['MO']}, 'MT': {fill: colorMap['MT']},
                        'NE': {fill: colorMap['NE']}, 'NV': {fill: colorMap['NV']},
                        'NH': {fill: colorMap['NH']}, 'NJ': {fill: colorMap['NJ']},
                        'NM': {fill: colorMap['NM']}, 'NY': {fill: colorMap['NY']},
                        'NC': {fill: colorMap['NC']}, 'ND': {fill: colorMap['ND']},
                        'OH': {fill: colorMap['OH']}, 'OK': {fill: colorMap['OK']},
                        'OR': {fill: colorMap['OR']}, 'PA': {fill: colorMap['PA']},
                        'RI': {fill: colorMap['RI']}, 'SC': {fill: colorMap['SC']},
                        'SD': {fill: colorMap['SD']}, 'TN': {fill: colorMap['TN']},
                        'TX': {fill: colorMap['TX']}, 'UT': {fill: colorMap['UT']},
                        'VA': {fill: colorMap['VA']}, 'WA': {fill: colorMap['WA']},
                        'WV': {fill: colorMap['WV']}, 'WI': {fill: colorMap['WI']},
                        'WY': {fill: colorMap['WY']}, 'VT': {fill: colorMap['VT']}
                    }
                });
            });
            
        }


        function init() {
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