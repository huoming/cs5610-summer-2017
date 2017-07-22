module.exports = function(app, models) {
    var websites = [];
    // POST Calls.
    app.post('/api/user/:uid/website', createEntity);

    // GET Calls.
    app.get('/api/user/:uid/website', getAllWebsites);
    app.get('/api/website/:wid', getWebsiteById);

    // PUT Calls.
    app.put('/api/website/:wid', updateDetails);

    // DELETE Calls.
    app.delete('/api/website/:wid', deleteFromSystem);
    app.delete('/api/user/:uid/website', deleteAllFromSystem);

    /* REST Functions */
    function createEntity(req, res){
        var uid = req.params.uid;
        var website = req.body;
        models
            .websiteModel
            .createWebsiteForUser(uid, website)
            .then(
                function(website){
                    res.json(website);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getAllWebsites(req, res){
        var uid = req.params.uid;
        models
            .websiteModel
            .findAllWebsitesForUser(uid)
            .then(
                function(websites){
                    res.json(websites);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getWebsiteById(req, res){
        var wid = req.params.wid;
        models
            .websiteModel
            .findWebsiteById(wid)
            .then(
                function(website){
                    res.json(website);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateDetails(req, res){
        var wid = req.params.wid;
        var website = req.body;
        models
            .websiteModel
            .updateWebsite(wid, website)
            .then(
                function (website){
                    res.json(website);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteFromSystem(req, res){
        var wid = req.params.wid;
        models
            .websiteModel
            .deleteWebsite(wid)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteAllFromSystem(req, res){
        var uid = req.params.uid;
        // TODO - implement delete all websites
    }

};