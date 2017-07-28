(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            var url="/api/page/"+pageId+"/widget";
            return $http.post(url,widget)
                .then(function (response) {
                    return response.data;});
        }

        function findWidgetsByPageId(pageId) {
            var url="/api/page/"+pageId+"/widget/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;});

        }

        function findWidgetById(widgetId) {
            var url="/api/widget/"+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;});

        }

        function updateWidget(widgetId, widget) {
            var url="/api/widget/"+widgetId;
            return $http.put(url,widget)
                .then(function (response) {
                    return response.data;});

        }

        function deleteWidget(widgetId) {
            var index = -1;
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    index = w;
                    break;
                }
            }
            if (index > -1) {
                widgets.splice(index, 1);
            }
        }


    }
})();