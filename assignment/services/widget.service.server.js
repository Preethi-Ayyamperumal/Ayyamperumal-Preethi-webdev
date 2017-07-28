var app = require("../../express");

var widgets = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    }
];
// http handlers
app.get("/api/user/:userId/website/:wId/page/:pId/widget", findWidgetsByPageId);
app.get("/api/user/:userId/website/:wId/page/:pId/widget/:widgetId", findWidgetById);
app.post("/api/user/:userId/website/:wId/page/:pId/widget",createWidget );
app.put("/api/user/:userId/website/:wId/page/:pId/widget/:widgetId", updateWidget);

function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widgets.push(widget);
    res.json(widget);
}

function findWidgetsByPageId(req, res) {
    var pageId=req.params.pId;
    var pageWidgets = [];
    for (var w in widgets) {
        if (widgets[w].pageId === pageId) {
            pageWidgets.push(widgets[w]);
        }
    }
    res.json(pageWidgets);

}

function findWidgetById(req, res) {
    var widgetId=req.params.widgetId;
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            res.json(widgets[w]);
            return;
        }
    }
    res.json({});
}

function updateWidget(req, res) {
    var widgetId=req.params.widgetId;
    var widget = req.body;
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widgets[w] = widget;
            break;
        }
    }
    res.json({});
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


