(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($location, $routeParams, WidgetService) {
        var vm = this;


        var userId = $routeParams.userId;
        var websiteId = $routeParams.websiteId;
        var pageId = $routeParams.pageId;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.createWidget = createWidget;

        function createWidget(pageId, widget) {
            WidgetService
                .createWidget(pageId, widget)
                .then(function(response) {
                    vm.widget = response.data;
                    vm.widgetType = vm.widget.type;
                    if(vm.widgetType === "HTML") {
                        $location.url("/user/" + userId + "/website/" + websiteId +
                            "/page/" + pageId + "/widget/" + vm.widget._id + "/html");
                    } else {
                        $location.url("/user/" + userId + "/website/" + websiteId +
                            "/page/" + pageId + "/widget/" + vm.widget._id);
                    }

                });

        }
    }
})();