var app = require("../../express");

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", isAdmin: true  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

// http handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", registerUser);
app.put("/api/user/:userId", updateUser);

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    for(var u in users) {
        if(users[u]._id === userId) {
            users[u] = user;
            res.json(user)
            return;
        }
    }
    res.status(404).json({ error: 'message' });
}

function registerUser(req, res) {
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.json(user);
}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;


    if(username && password) {
        for(var u in users) {
            var _user = users[u];
            if(_user.username === username && _user.password === password) {
                res.json(_user);
                return;
            }
        }
    } else if(username) {
        for(var u in users) {
            if(users[u].username === username) {
                res.json(users[u]);
                return;
            }
        }
    }
    res.status(200).json({ error: 'message' });
}

function getAllUsers(req, res) {
    res.json(users);
}

function getUserById(req, res) {
    for(var u in users) {
        if(users[u]._id === req.params.userId) {
            res.json(users[u]);
        }
    }
}