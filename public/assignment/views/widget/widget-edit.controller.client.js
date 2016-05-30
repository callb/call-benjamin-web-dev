(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;


        var userId = $routeParams.userId;
        var websiteId = $routeParams.websiteId;
        var pageId = $routeParams.pageId;
        var widgetId = $routeParams.widgetId;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.widgetId = widgetId;
        vm.updateWidget = updateWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(widgetId);
        }
        init()

        function updateWidget(widgetId, widget) {
            var newWidget = WidgetService.updateWidget(widgetId, widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +
                "/page/" + vm.pageId + "/widget");
        }
    }
})();