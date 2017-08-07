var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var db = require("/../models.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function updateUser(userId, user) {
    return userModel.update({_id: userId},
        {$set: user});
}

function deleteUser(userId) {
    return userModel.findByIdAndRemove(userId);
}

function createWebsiteForUser(userId, website) {
    return websiteModel.create(website);
}

function findUserById(userId) {
    return userModel.findById(userId);
}


createWebsiteForUser(userId, website)

findAllWebsitesForUser(userId)

findWebsiteById(websiteId)

updateWebsite(websiteId, website)

deleteWebsite(websiteId)