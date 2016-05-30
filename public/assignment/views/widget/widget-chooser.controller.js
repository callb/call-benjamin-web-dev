(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController() {
        var vm = this;

        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            var newWidget = {
                _id: (new Date()).getTime(),
                widgetType: widgetType
            };
            widgets.push(newWidget);
        }
    }
})();