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

        function createWidget(userId,websiteId,pageId, widget) {
            widget.pageId = pageId;
            var url="/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
            return $http.post(url,widget)
                .then(function (response) {
                    return response.data;});
        }

        function findWidgetsByPageId(userId,websiteId,pageId) {
            var url="/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;});

        }

        function findWidgetById(userId,websiteId,pageId,widgetId) {
            var url="/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;});

        }

        function updateWidget(userId,websiteId,pageId,widgetId, widget) {
            var url="/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
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