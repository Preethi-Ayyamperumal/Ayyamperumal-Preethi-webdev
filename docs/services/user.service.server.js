var app = require("../../express");
var userModel = require("./user.model.server");

// http handlers
app.get("/api/user/:userId", findUserById);
app.get("/api/user", findUser);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).json({ error: 'message' });
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        })
}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;


    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
                return;
            }, function (err) {
                res.status(404).send(err);
                return;
            })
    } else if(username) {
        userModel
        .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
                return;
            }, function (err) {
                res.status(404).send(err);
                return;
            });
    }
    res.status(200).json({ error: 'message' });
}


function findUserById(req, res) {
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.status(404).send(err);
            return;
        });
}