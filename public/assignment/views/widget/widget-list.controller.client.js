(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;

        var userId = $routeParams.userId;
        var websiteId = $routeParams.websiteId;
        var pageId = $routeParams.pageId;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getTrustedUrl = getTrustedUrl;
        vm.sorted = sorted;

        function init() {
            WidgetService
                .findWidgetsByPageId(pageId)
                .then(function (response) {
                    vm.widgets = response.data;
                })
        }
        init();
        
        
        
        function getTrustedUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function getTrustedHtml(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return html;
        }

        function sorted(startIndex, endIndex) {
            console.log(startIndex);
            console.log(endIndex);
            $http.put("/api/reorder?start="+startIndex+"&end="+endIndex);
        }


        $(".widget-container")
            .sortable({axis: "y"});
    }
})();