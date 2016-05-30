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

        function createWidget(pageId, widgetType) {
            var newWidget = WidgetService.createWidget(pageId, widgetType);
            vm.widgetType = widgetType;
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +
                "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }
    }
})();