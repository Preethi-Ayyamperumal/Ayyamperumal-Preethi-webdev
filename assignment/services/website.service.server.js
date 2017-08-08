var app = require("../../express");
var websiteModel = require("../models/website/website.model.server");

// http handlers
app.get("/api/user/:userId/website", getUserWebsites);
app.get("/api/website/:wId", getWebsiteById);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/website/:wId", updateWebsite);
app.delete("/api/user/:userId/website/:wId", deleteWebsite);

function updateWebsite(req, res) {
    var websiteId = req.params.wId;
    var website = req.body;

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}

function createWebsite(req, res) {
    var website=req.body;
    var userId=req.params.userId;
    websiteModel
        .createWebsiteForUser(userId,website)
        .then(function (website) {
            res.json(website);
        });
}

function getUserWebsites(req, res) {
    var userId=req.params.userId;
    websiteModel.findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);
        });
}

function getWebsiteById(req, res) {
    var websiteId = req.params.wId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            return res.json(website);
        })
}

function deleteWebsite(req, res) {
    var websiteId = req.params.wId;
    var userId = req.params.userId;
    websiteModel
        .deleteWebsite(userId, websiteId)
        .then(function (status) {
            res.json(status);
        });
}
