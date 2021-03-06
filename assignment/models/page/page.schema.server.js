var mongoose = require("mongoose");
var widgetSchema = require("../widget/widget.schema.server");
var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
    name: String,
    title: String,
    description: String,
    widgets:[widgetSchema],
    dateCreated:{type: Date, default: Date.now}
}, {collection: "page"});
module.exports = pageSchema;