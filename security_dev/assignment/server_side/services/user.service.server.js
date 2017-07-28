var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");
var cookieParser = require('cookie-parser');
var session = require('express-session');

module.exports = function(app, models){
    var users = [];
    // POST Calls.
    app.post('/api/user', createEntity);
    app.post('/api/test/user', testCreateUser);

    // GET Calls.
    app.get('/api/user', getUser);
    app.get('/api/user/:uid', getUserById);

    // PUT Calls.
    app.put('/api/user/:uid', updateDetails);

    // DELETE Calls.
    app.delete('/api/user/:uid', deleteFromSystem);

    app.use(session({
        secret: 'type something',
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('LocalStrategy', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    //passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  /*  var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'email', 'first_name', 'last_name']
    };*/

   /* function facebookStrategy(token, refreshToken, profile, done) {
        models
            .userModel
            .findUserByFacebookId(profile.id)
            .then(function(user){
                    if(user != null){
                        return done(null, user);
                    }
                    else{ //create a new user in db
                        var newUser={
                            username: profile.emails[0].value.split('@')[0],
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: profile.emails[0].value,
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        UserModel
                            .createUser(newUser)
                            .then(function(user){
                                if(user){
                                    return done(null, user);
                                }
                                else{
                                    return done(null, false);
                                }
                            })
                    }
                },
                function(err){
                    if(err){
                        return done(err);
                    }
                });
    }
*/

    /*Config Passport*/
    app.post('/api/login', passport.authenticate('LocalStrategy'), login);
    app.post('/api/logout', logout);
    app.get ('/api/loggedin', loggedin);

    function serializeUser(user, done) {
        console.log("serializeUser");
        done(null, user);
    }

    function deserializeUser(user, done) {
        console.log("deserializeUser");
        done(null, user);
        /*models
            .userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );*/
    }

    function localStrategy(username, password, done) {
        console.log("localStrategy");
        var user = {username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  };

        if(user.password === password ){
            return done(null, user);
        }
        else
        {
            return done(null, false, {message: 'User not found!'});
        }



        /*models
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user.username === username && bcrypt.compareSync(password, user.password)) {
                        console.log("User found!");
                        return done(null, user);
                    } else {
                        console.log("User not found!");
                        return done(null, false, {message: 'User not found!'});
                    }
                },
                function(err) {if (err) {
                    console.log("error: " + err);
                    return done(err); }
                }
            );*/
    }

    function loggedin(req, res) {
        console.log("check logged in: " + req.isAuthenticated());

        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function login(req, res) {
        console.log("start login: " +  req.isAuthenticated());
        var user = req.user;
        if (user != null){
            delete user.password;
            res.json(user);
        }
        else{
            res.sendStatus(404);
        }
    }

    function logout(req, res) {
        // console.log("Hello from logout");
        req.logOut();
        res.sendStatus(200);
    }

    app.post('/api/adminLogged',checkAdmin);
    function checkAdmin(req, res) {
        if(req.isAuthenticated())
        {
            var user = req.user;
            if(user.role === "Admin"){
                res.send(user);
            }
        }
    }

    /*TEST FUNCTIONS*/
    function testCreateUser(req, res) {
        var new_user = req.body;

        console.log("test create user: " + new_user.firstName + " " + new_user.lastName);

        models
            .userModel
            .createUser(new_user)
            .then(function (user) {
                console.log("test create user success!");
                //res.json(user);
                res.sendStatus(200);
            }, function (err) {
                console.log("test create user error " + err);
                res.send(err);
            });
    }

    /* REST Functions */
    function getUser(req, res) {
        var query = req.query;
        // var user = null;
        if(query.username && query.password){
            models
                .userModel
                .findUserByCredentials(query.username, query.password)
                .then(
                    function(user){
                        if(user){
                            res.json(user);
                        } else {
                            user = null;
                            res.send(user);
                        }
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                );
        }
        else {
            res.send({"error":"Missing username or password!"});
        }
    }

    function getUserById(req, res){
        var params = req.params;
        if(params.uid){
            models
                .userModel
                .findUserById(params.uid)
                .then(
                    function (user){
                        if(user){
                            res.json(user);
                        } else {
                            user = null;
                            res.send(user);
                        }
                    },
                    function (error){
                        res.sendStatus(400).send(error);
                    }
                );
        }
    }

    function createEntity(req, res) {

        var user = req.body;

        console.log("create user: " + user.firstName + " " + user.lastName);

        models
            .userModel
            .findUserByUsername(user.username)
            .then(
                function (response) {
                    if(response){
                        //error username already exist
                        res.sendStatus(400).send(error);
                    }
                    else {
                        models
                            .userModel
                            .createUser(user)
                            .then(
                                function(newUser){
                                    res.json(newUser);
                                },
                                function(error){
                                    res.sendStatus(400).send(error);
                                }
                            );
                    }
                }
            );
    }
    
    function updateDetails(req, res){
        var uid = req.params.uid;
        var user = req.body;
        models
            .userModel
            .updateUser(uid, user)
            .then(
                function (user){
                    res.json(user)
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteFromSystem(req, res){
        var uid = req.params.uid;
        if(uid){
            models
                .userModel
                .deleteUser(uid)
                .then(
                    function (status){
                        res.sendStatus(200);
                    },
                    function (error){
                        res.sendStatus(400).send(error);
                    }
                );
        } else{
            // Precondition Failed. Precondition is that the user exists.
            res.sendStatus(412);
        }
    }
};