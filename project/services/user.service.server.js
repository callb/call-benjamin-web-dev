module.exports = function(app, models) {

    process.env['FACEBOOK_CLIENT_ID'] = '574921142688557';
    process.env['FACEBOOK_CLIENT_SECRET'] = 'b623604f28630de0f3d39f5c1577e722';
    process.env['FACEBOOK_CALLBACK_URL'] = 'http://localhost:3000/auth/facebook/callback';

    
    var userModel = models.userModel;
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");


    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.post("/api/project/user", createUser);
    app.post("/api/project/login", passport.authenticate('ec'), login);
    app.post("/api/project/register", register);
    app.post("/api/project/logout", logout);
    app.get ("/api/project/loggedin", loggedin);
    app.get("/api/project/user", getUsers);
    app.get("/api/project/user/:userId", findUserById);
    app.put("/api/project/user/:userId", updateUser);
    app.delete("/api/project/user/:userId", authenticate, deleteUser);
    
    app.post("/api/project/follow", follow);
    app.post("/api/project/findFollows", findFollows);
    app.delete("/api/project/id/:id/user/:user", unfollow);

    passport.use('ec', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        var id = profile.id;
        userModel
            .findFacebookUser(id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var user = {
                            username: profile.displayName.replace(/ /g, ''),
                            facebook: {
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        }
                        return userModel
                            .createUser(user);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                }
            );
    }



    function authenticate(req, res, next) {
        if(req.isAuthenticated()) {
            next();

        } else {
            res.send(403);
        }
    }




    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    function unfollow(req, res) {
        var id = req.params.id;
        var user = req.params.user;

        userModel
            .deleteFollow(id, user)
            .then(
                function(user) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to remove follow with ID: " + id);
                }
            );
    }
    
    
    function findFollows(req, res) {
        var id = req.body;
        userModel
            .findFollows(id)
            .then(
                function(follows) {
                    res.send(follows);
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }
    
    function follow(req, res) {
        var user = req.body.user;
        var object = req.body.object;
        var type = req.body.type;
        userModel
            .follow(object, user, type)
            .then(
                function(user) {
                    res.status(200);
                },
                function(error) {
                    res.status(400).send("Unable to follow state")
                }
            )
    }
    
    
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }


    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user) {
                        res.status(400).send("Username already exists");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(password);
                        //return userModel.createUser(user);

                        return userModel
                            .createUser(req.body);
                    }
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function(user) {
                    if(user) {
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }

                        });
                    }
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }
    
    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function loggedin(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }


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
    }

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, req, res);
        } else if(username) {
            findUserByUsername(username, req, res);
        } else {
            res.send(users);
        }
    }
    function findUserByCredentials(username, password, req, res) {

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

    }
    function findUserByUsername(username, req, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(403).send("Unable to find user");
                }
            )
    }
};