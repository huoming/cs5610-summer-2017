/*var users = require("./users.mock.json");*/

module.exports = function(app){

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


    // GET Calls.
    //app.get('/api/user?username=username', findUserByUsername);
    //app.get('/api/user?username=username&password=password', findUserByUsername);
    app.get('/api/user', findUserByCredentials);

    app.get('/api/user/:uid', findUserById);

    // POST Calls.
    app.post('/api/user', createUsers);

    // PUT Calls.
    app.put('/api/user/:uid', updateUser);

    // DELETE Calls.
    app.delete('/api/user/:uid', deleteUser);

    /*API implementation*/
    function createUsers(req, res) {
        console.log("create user");
        var user = req.body;

        var newUser = {
            _id: new Date().getTime(),
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
        users.push(newUser);

        if(newUser){
            res.status(200).send(newUser);
        } else {
            res.sendStatus(500);
        }
    }

    function findUserByUsername (req, res) {
        var username = req.query.username;

        for (u in users){
            var user = users[u];
            if(user.username === username){
                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send("not found!");
    }

    function findUserByCredentials (req, res) {
        var username = req.query.username;
        var pswd = req.query.password;

        /*for (u in users){
            var user = users[u];
            if(user.username === username && user.password === pswd){
                res.status(200).send(user);
                return;
            }
        }*/

        var user = users.find(function (u) { return u.username==username && u.password==pswd  });
        res.send(user);
    }

    function findUserById(req, res) {
        var uid = req.params.uid;

        /*for (u in users){
            var user = users[u];
            if(user._id === uid){
                res.status(200).send(user);
                return;
            }
        }*/
        var user = users.find(function (u) { return u._id==uid });
        if(user)
        {
            res.send(user);
        }
        else
        {
            res.status(404).send("not found!");
        }
    }

    function updateUser(req,res) {
        var uid = req.params.id;
        var new_user = req.body;

        for (u in users){
            var user = users[u];
            if(user._id === uid){
                user.firstName = new_user.firstName;
                user.lastName = new_user.lastName;
                user.email = new_user.email;
                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send("not found!");
    }

    function deleteUser(req,res) {
        var uid = req.params.id;

        for (u in users){
            var user = users[u];
            if(user._id === uid){
               users.splice(u,1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("not found!");
    }
};
