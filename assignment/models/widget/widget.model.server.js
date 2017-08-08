var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require("../page/page.model.server");
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.reorderWidget = reorderWidget;
widgetModel.findAllWidgetsInIDArray = findAllWidgetsInIDArray;
module.exports = widgetModel;

function findAllWidgetsForPage(pageId){
    return  pageModel.findPageById(pageId)
               .then(function (page) {
                   //return widgetModel.findAllWidgetsInIDArray(page.widgets);
                   return page.widgets;
               });


}

function findAllWidgetsInIDArray(widgetIDs){
   var query=[
        {$match:{_id:{$in:widgetIDs}}},
        {$addFields:{"__order": { $indexOfArray : [ widgetIDs, "$_id" ]}}},
        {$sort:{ "__order":1}}];

    return widgetModel.aggregate(query);

   // find({ '_id': { $in : widgetIDs } });

}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId},
        {$set: widget});
}

function deleteWidget(pageId,widgetId){
    return widgetModel
        .findByIdAndRemove(widgetId)
        .then(function (status) {
            return pageModel.deleteWidget( pageId,widgetId)
        });
}

function createWidget(pageId, widget){
    widget._page=pageId;
    var widgetTmp = null;
    return widgetModel
        .create(widget)
        .then(function (widgetDoc) {
            widgetTmp = widgetDoc;
            return pageModel.addWidget(pageId, widgetDoc._id)
        })
        .then(function (pageDoc) {
            return widgetTmp;
        })
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}
function reorderWidget(pageId, start, end){
    return  pageModel.findPageById(pageId)
        .then(function (page) {
            var widgets = page.widgets;
            var item= widgets[start];
            widgets.splice(start,1);
            widgets.splice(end,0,item);
            page.widgets=widgets;
            return pageModel.updatePage(pageId,page);
        });
}


