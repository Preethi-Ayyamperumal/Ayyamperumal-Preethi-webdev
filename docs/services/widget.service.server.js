var app = require("../../express");
var app2 = require("multer");
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
var upload = app2({ dest:__dirname+'/../../public/uploads' });

// http handlers
app.get("/api/page/:pId/widget", findWidgetsByPageId);
app.get("/api/widget/:widgetId", findWidgetById);
app.post("/api/page/:pId/widget",createWidget );
app.put("/api/page/:pId/widget",sortWidgets);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;
    var widget;

    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widget = widgets[w];
            break;
        }
    }
    widget.url = '/uploads/'+filename;
    console.log(req.file);
    var callbackUrl   = "/assignment/#!/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
    res.redirect(callbackUrl);
}

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

function sortWidgets(req, res) {
    var startIndex = req.query.initial;
    var endIndex = req.query.final;
    if (startIndex === endIndex)
    {
        res.json({});
        return;
    }
    var pageId=req.params.pId;
    var widgetId=req.params.widgetId;
    var newIndex = -1;
    var item = -1;
    var currentIndex = -1;

    var pageWidgets = [];
    var pageIndices = [];

    for (var w in widgets) {
        if (widgets[w].pageId === pageId) {
            pageWidgets.push(widgets[w]);
            pageIndices.push(w);
        }
    }
    widgets = widgets.filter(function (widget) {
        var index = -1;
        index = pageWidgets.indexOf(widget);
        return (index === -1);
    });

    item= pageWidgets[startIndex];
    pageWidgets.splice(startIndex,1);
    pageWidgets.splice(endIndex,0,item);
    widgets=widgets.concat(pageWidgets);
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

function deleteWidget(req, res) {
    var widgetId=req.params.widgetId;
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
    res.json({});
}


