(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService );

    function WidgetService () {

        var widgets =[
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];


        var api={
            "createWidget" : createWidget,
            "findWidgetsByPageId" :findWidgetsByPageId ,
            "findWidgetById" :findWidgetById ,
            "updateWidget" :updateWidget ,
            "deleteWidget" : deleteWidget
        };
        return api;

        function createWidget(pageId, widget)  {
            widget._id = (new Date()).getTime() + "";
            widget.pageId=pageId;
            widgets.push(widget);
            return widget;
        }
        function findWidgetsByPageId(pageId)   {
            var pageWidgets=[];
            for(var w in widgets) {
                if(widget[w].pageId === pageId) {
                    pageWidgets.push(widget[w]);
                }
            }
            return pageWidgets;

        }
        function findWidgetById(widgetId)   {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return widgets[w];
                }
            }
            return null;
        }
        function updateWidget(widgetId, widget)    {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets[w]=widget;
                    break;
                }
            }
        }

        function deleteWidget(widgetId)   {
            var index=-1;
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    index = p;
                    break;
                }
            }
            if (index > -1) {
                widgets.splice(index, 1);
            }
        }


    }
})();