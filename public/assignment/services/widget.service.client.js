(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    

    function WidgetService($http) {
        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            createWidget: createWidget,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;


        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }
        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);

        }
        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            var newWidget = {
                type: widget,
            };
            return $http.post(url, newWidget);
        }

    }
})();