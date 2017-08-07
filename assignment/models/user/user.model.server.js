var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("/../models.server");
var userModel = mongoose.model("UserModel", userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;

module.exports = userModel;

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

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}