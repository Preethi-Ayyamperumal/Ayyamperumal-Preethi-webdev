var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("../website/website.model.server");
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
pageModel.updateWidget = updateWidget;

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

function addWidget(pageId,widget) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
                page.widgets.push(widget);
            return page.save();
        });
}

function deleteWidget(pageId,widgetId) {
  /*  return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });*/

    return pageModel.findByIdAndUpdate(pageId,
        {
            '$pull': {
                "widgets": { '_id': widgetId}
            }
        },
        function(err,doc) {
            return doc;
        }
    );
}

function updateWidget(widgetId,widget) {
    // return pageModel
    //     .findById(widget._page)
    //     .then(function (page) {
    //
    //         var index =-1;
    //         for(var w in page.widgets) {
    //                 if(page.widgets[w].id === widgetId )
    //                 {
    //                     index= w;
    //                     break;
    //                 }
    //         }
    //         page.widgets[index]=widget;
    //         return page.save();
    //     });

    return pageModel.findOneAndUpdate(
        {"_id" : widget._page ,"widgets._id" : widgetId},
        {
            "$set": {
                "widgets.$": widget
            }
        },
        function(err,doc) {
            return doc;
        }
    );
}


