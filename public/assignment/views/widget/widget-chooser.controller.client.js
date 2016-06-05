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
                    console.log(response.body);
                    vm.widget = response.body;
                    vm.widgetType = vm.widget.widgetType;
                })
            $location.url("/user/" + userId + "/website/" + websiteId + "/page" + pageId + "/widget/");

        }
    }
})();