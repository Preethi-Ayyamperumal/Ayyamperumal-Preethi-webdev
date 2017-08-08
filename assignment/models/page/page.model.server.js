var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("../website/website.model.server");
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId});
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId},
        {$set: page});
}

function deletePage(websiteId,pageId) {
    return pageModel
        .findByIdAndRemove(pageId)
        .then(function (status) {
            return websiteModel.deletePage(websiteId, pageId)
        });
}

function createPage(websiteId, page) {
    page._website=websiteId;
    var pageTmp = null;
    return pageModel
        .create(page)
        .then(function (pageDoc) {
            pageTmp = pageDoc;
            return websiteModel.addPage(websiteId, pageDoc._id)
        })
        .then(function (websiteDoc) {
            return pageTmp;
        })
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}


