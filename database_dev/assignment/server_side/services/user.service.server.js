module.exports = function(app, model){
    var users = [];
    // POST Calls.
    app.post('/api/user', createEntity);

    // GET Calls.
    app.get('/api/user', getUser);
    app.get('/api/user/:uid', getUserById);

    // PUT Calls.
    app.put('/api/user/:uid', updateDetails);

    // DELETE Calls.
    app.delete('/api/user/:uid', deleteFromSystem);

    /* REST Functions */

    function getUser(req, res) {
        var query = req.query;
        // var user = null;
        if(query.username && query.password){
            model
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
    }

    function getUserById(req, res){
        var params = req.params;
        if(params.uid){
            model
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
        model
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
    function updateDetails(req, res){
        var uid = req.params.uid;
        var user = req.body;
        model
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
            model
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