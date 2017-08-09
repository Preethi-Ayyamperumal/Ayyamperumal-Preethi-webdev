var app = require("../../express");
var app2 = require("multer");
var widgetModel = require("../models/widget/widget.model.server");

var upload = app2({ dest:__dirname+'/../../public/uploads' });

// http handlers
app.get("/api/page/:pId/widget", findWidgetsByPageId);
app.get("/api/widget/:widgetId", findWidgetById);
app.post("/api/page/:pId/widget",createWidget );
app.put("/api/page/:pId/widget",sortWidgets);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/page/:pId/widget/:widgetId", deleteWidget);
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

    widgetModel
        .findWidgetById(widgetId)
        .then(function (_widget) {
            widget = _widget;
            widget.url = '/uploads/'+filename;
            widgetModel.updateWidget(widgetId,widget)
                .then(function (status) {
                    console.log(req.file);
                    var callbackUrl   = "/assignment/#!/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
                    res.redirect(callbackUrl);
                })
        });



}

function createWidget(req, res) {
    var widget = req.body;
    var pageId=req.params.pId;

    widgetModel.createWidget(pageId,widget)
        .then(function (widget) {
            res.json(widget);
        });
}

function findWidgetsByPageId(req, res) {
    var pageId=req.params.pId;
    widgetModel.findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        });

}

function findWidgetById(req, res) {
    var widgetId=req.params.widgetId;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            return res.json(widget);
        })
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
    widgetModel
        .reorderWidget(pageId,startIndex,endIndex)
        .then(function (status) {
            res.json({});
        })

}

function updateWidget(req, res) {
    var widgetId=req.params.widgetId;
    var widget = req.body;

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}

function deleteWidget(req, res) {
    var pageId=req.params.pId;
    var widgetId=req.params.widgetId;
    widgetModel
        .deleteWidget(pageId,widgetId)
        .then(function (status) {
            res.json(status);
        });

}


