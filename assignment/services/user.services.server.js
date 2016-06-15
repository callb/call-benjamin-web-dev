module.exports = function(app, models) {
    
    var userModel = models.userModel;

    var passport = require('passport');
    LocalStrategy = require('passport-local').Strategy;

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(400).send("Username " + newUser.username + " is already in use");
                }
            );
        // for(var i in users) {
        //     if(users[i].username === newUser.username) {
        //         res.status(400).send("Username " + newUser.username + " is already in use");
        //         return;
        //     }
        // }
        //
        // newUser._id = (new Date()).getTime() + "";
        // users.push(newUser);
        // res.json(newUser);
    }


    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }
    
    function deleteUser(req, res) {
        var id = req.params.userId;
        
        userModel
            .deleteUser(id)
            .then(
                function(user) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to remove user with ID: " + id);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function(user) {
                    res.send(200);
                },
                function() {
                    res.status(404).send("Unable to update user with ID: " + id);
                }
            );
//        var newUser = req.body;
//        for(var i in users) {
//            if(users[i]._id === id) {
//                users[i].firstName = newUser.firstName;
//                users[i].lastName = newUser.lastName;
//                res.send(200);
 //               return;
 //           }
 //       }
//        res.status(400).send("User with ID: "+ id +" not found");
    }

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }
    function findUserByCredentials(username, password, res) {

        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    req.user = user;
                    res.json(user);
                },
                function(error) {
                    res.status(403).send("Unable to login");
                }
            );
 //       for(var u in users) {
 //           if(users[u].username === username && users[u].password === password) {
 //              res.send(users[u]);
 //               return;
 //           }
 //       }
 //       res.send(403);
    }
    function findUserByUsername(username, res) {
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send({});
    }
};