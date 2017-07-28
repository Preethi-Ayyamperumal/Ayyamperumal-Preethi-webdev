var app = require("../../express");

var websites = [
    {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem test"},
    {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
    {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem test"},
    {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
];

// http handlers
app.get("/api/user/:userId/website", getUserWebsites);
app.get("/api/website/:wId", getWebsiteById);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/website/:wId", updateWebsite);
app.delete("/api/website/:wId", deleteWebsite);

function updateWebsite(req, res) {
    var websiteId = req.params.wId;
    var website = req.body;

    for (var w in websites) {
        if (websites[w]._id === websiteId) {
            websites[w] = website;
            break;
        }
    }
    res.status(200).json({});
}

function createWebsite(req, res) {
    var website=req.body;
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.json(website);
}

function getUserWebsites(req, res) {
    var userId=req.params.userId
    var userWebsites = [];
    for (var w in websites) {
        if (websites[w].developerId === userId) {
            userWebsites.push(websites[w]);
        }
    }
    res.json(userWebsites);
}

function getWebsiteById(req, res) {
    for (var w in websites) {
        if (websites[w]._id === req.params.wId) {
            res.json(websites[w]);
            return;
        }
    }
    res.status(200).json({ error: 'message' });
}

function deleteWebsite(req, res) {
    var websiteId = req.params.wId;
    var index = -1;
    for (var w in websites) {
        if (websites[w]._id === websiteId) {
            index = w;
            break;
        }
    }
    if (index > -1) {
        websites.splice(index, 1);
    }
    res.json({});
}
