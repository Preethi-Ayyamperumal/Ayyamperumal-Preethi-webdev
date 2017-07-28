var app = require("../../express");

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

// http handlers
app.get("/api/user/:userId/website/:wId/page", findPagesByWebsiteId);
app.get("/api/user/:userId/website/:wId/page/:pId", findPageById);
app.post("/api/user/:userId/website/:wId/page", createPage);
app.put("/api/user/:userId/website/:wId/page/:pId", updatePage);

function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(page);
}
function findPagesByWebsiteId(req, res)  {
    var websiteId = req.params.wId;
    var websitePages=[];
    for(var p in pages) {
        if(pages[p].websiteId === websiteId) {
            websitePages.push(pages[p]);
        }
    }
    res.json(websitePages);

}
function findPageById(req, res)   {
    var pageId = req.params.pId;
    for(var p in pages){
        if(pages[p]._id === pageId) {
            res.json(pages[p]);
            return;
        }
    }
    res.status(200).json({ error: 'message' });
}
function updatePage(req, res)   {
    var pageId = req.params.pId;
    var page = req.body;
    for(var p in pages){
        if(pages[p]._id === pageId) {
            pages[p]=page;
            break;
        }
    }
    res.json({});
}

function deletePage(pageId)  {
    var index=-1;
    for(var p in pages){
        if(pages[p]._id === pageId) {
            index = p;
            break;
        }
    }
    if (index > -1) {
        pages.splice(index, 1);
    }
}

