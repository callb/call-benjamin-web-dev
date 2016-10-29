(function() {
    angular
        .module("ElectionCenter")
        .controller("StateController", StateController);


    function StateController($routeParams, StateService, $rootScope, $location, ProjectUserService) {
        var vm = this;
        vm.stateCode = $routeParams.state;
        vm.followState = followState;

        //initializes the state info
        function initState() {
            StateService
                .findStateByCode(vm.stateCode)
                .then(
                    function(response) {
                        vm.state = response.data[0];
                        vm.stateName = vm.state["name"];
                        vm.stateCode = vm.state["code"];
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )

        }
        initState();

        function initUser() {
            if (!$rootScope.currentUser) {
                vm.userMessage = "No one currently logged in"
            } else {
                vm.userMessage = $rootScope.currentUser["username"] + " logged in"
            }
        }
        initUser();
        
        function fetchPollingData() {
            
        }

        function initGraph() {
            vm.chartType = 'bar';
            
            var acData = {
                series: ["Republican", "Democrat", "Other"],
                data: [{
                    x: "",
                    y: [54, 55, 879],
                    tooltip: "This is a tooltip"
                }]
            };
            var config = {
                title: '', // chart title. If this is false, no title element will be created.
                tooltips: true,
                labels: false, // labels on data points
                // exposed events
                mouseover: function() {},
                mouseout: function() {},
                click: function() {},
                // legend config
                legend: {
                    display: true, // can be either 'left' or 'right'.
                    position: 'left',
                    // you can have html in series name
                    htmlEnabled: false
                },
                // override this array if you're not happy with default colors
                colors: ['red', 'blue', 'gray'],
                innerRadius: 0, // Only on pie Charts
                lineLegend: 'lineEnd', // Only on line Charts
                lineCurveType: 'cardinal', // change this as per d3 guidelines to avoid smoothline
                isAnimate: true, // run animations while rendering chart
                xAxisMaxTicks: 7, // Optional: maximum number of X axis ticks to show if data points exceed this number
                yAxisTickFormat: 's', // refer tickFormats in d3 to edit this value
                waitForHeightAndWidth: false // if true, it will not throw an error when the height or width are not defined (e.g. while creating a modal form), and it will be keep watching for valid height and width values
            };
            vm.acData = acData;
            vm.config = config;
        }
        initGraph();
        

        function followState() {
            if (!$rootScope.currentUser) {
                $location.url("/login")
            } else {
                var user = $rootScope.currentUser["_id"];
                ProjectUserService
                    .follow(vm.stateCode, user, "state")
                    .then(
                        function(status) {
                            vm.message = "Following state";
                            $location.url("/profile/" + user + "/follows")
                        },
                        function(error) {
                            vm.error = "Problem following state";
                        }
                    )
            }

        }
        
        
    }



})();