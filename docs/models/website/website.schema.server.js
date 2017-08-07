var mongoose = require("mongoose");
var websiteSchema = mongoose.Schema({
    _user: String,
    name: String,
    description: String,
    pages:[],
    dateCreated:{type: Date, default: Date.now}
}, {collection: "websites"});
module.exports = websiteSchema;