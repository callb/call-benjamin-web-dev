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
        vm.deleteWidget = deleteWidget;

        function init() {
           WidgetService
               .findWidgetById(widgetId)
               .then(function(response) {
                   vm.widget = response.body;
               })
        }
        init();

        function updateWidget(widgetId, widget) {
            WidgetService
                .updateWidget(widgetId, widget)
                .then(function(response) {
                    vm.newWidget = response.body;
                });
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +
                "/page/" + vm.pageId + "/widget");
        }

        function deleteWidget(widgetId) {
            WidgetService
                .deleteWidget(widgetId)
                .then(function(response) {
                    vm.result = response.body;
                });
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +
                "/page/" + vm.pageId + "/widget");
        }
    }
})();