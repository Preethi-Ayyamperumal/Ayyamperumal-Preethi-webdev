var app = require("../../express");
var pageModel = require("../models/page/page.model.server");

// http handlers
app.get("/api/website/:wId/page", findPagesByWebsiteId);
app.get("/api/page/:pId", findPageById);
app.post("/api/website/:wId/page", createPage);
app.put("/api/page/:pId", updatePage);
app.delete("/api/website/:wId/page/:pId", deletePage);


function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.wId;

    pageModel
        .createPage(websiteId,page)
        .then(function (page) {
            res.json(page);
        });

}
function findPagesByWebsiteId(req, res)  {
    var websiteId = req.params.wId;
    pageModel.findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages);
        });

}
function findPageById(req, res)   {
    var pageId = req.params.pId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            return res.json(page);
        })
}
function updatePage(req, res)   {
    var pageId = req.params.pId;
    var page = req.body;
    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}

function deletePage(req, res)  {
    var pageId = req.params.pId;
    var websiteId = req.params.wId;
    pageModel
        .deletePage(websiteId,pageId)
        .then(function (status) {
            res.json(status);
        });

}

