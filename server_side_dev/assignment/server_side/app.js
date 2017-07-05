module.exports = function(app){


  /*  app.get('/api/user/:uid', function (req, res) {
         var uid = req.params.uid;
         console.log("get uri");
         res.sendStatus(200);
     });
*/
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server")(app);
    require("./services/widget.service.server")(app);
};
