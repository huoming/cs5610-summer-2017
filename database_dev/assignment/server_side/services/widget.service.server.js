module.exports = function (app, model) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    // POST Calls.
    app.post('/api/page/:pid/widget', createEntity);
    app.post ("/api/upload", upload.single('file'), uploadImage);

    // GET Calls.
    app.get('/api/page/:pid/widget', getAllWidgets);
    app.get('/api/widget/:wgid', getWidgetById);

    // PUT Calls.
    app.put('/api/widget/:wgid', updateDetails);
    app.put('/api/page/:pid/widget', sortWidgets);

    // DELETE Calls.
    app.delete('/api/widget/:wgid', deleteFromSystem);
    app.delete('/api/page/:pid/widget', deleteAllFromSystem);


    /* REST Functions */

    function sortWidgets(req, res) {
        var pid = req.params.pid;
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);
        return model
            .pageModel
            .reorderWidget(pid, start, end);
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var uploadDetails = {
            originalname : myFile.originalname,
            filename : myFile.filename,
            fullpath : myFile.path,
            destination : myFile.destination,
            size : myFile.size,
            mimetype : myFile.mimetype
        };
        res.send(uploadDetails);
    }

    function createEntity(req, res){
        var pid = req.params.pid;
        var widget = req.body;
        model
            .widgetModel
            .createWidget(pid, widget)
            .then(
                function (widget){
                    res.sendStatus(200);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getAllWidgets(req, res){
        var pid = req.params.pid;
        model
            .widgetModel
            .findAllWidgetsForPage(pid)
            .then(
                function (widgets){
                    res.json(widgets);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getWidgetById(req, res){
        var wgid = req.params.wgid;
        model
            .widgetModel
            .findWidgetById(wgid)
            .then(
                function (widget){
                    res.json(widget);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
        // var widget = findWidgetById(wgid);
        // res.send(widget);
    }

    function updateDetails(req, res){
        var wgid = req.params.wgid;
        var widget = req.body;
        model
            .widgetModel
            .updateWidget(wgid, widget)
            .then(
                function (widget){
                    res.sendStatus(200);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
        // updateWidget(wgid, widget);
        // res.sendStatus(200);
    }

    function deleteFromSystem(req, res){
        var wgid = req.params.wgid;
        model
            .widgetModel
            .deleteWidget(wgid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
        // deleteWidget(wgid);
        // res.sendStatus(200);
    }

    function deleteAllFromSystem(req, res){
        var pid = parseInt(req.params.pid);
        // deleteWidgetsByPage(pid);
        // res.sendStatus(200);
        // TODO delete all widgets from page
    }

    /*
     * Standard CRUD
     */
    function createWidget(pageId, widget) {
        widgets.push(widget);
        return(findWidgetById(widget._id));
    }

    function findWidgetsByPageId(pageId) {
        results = [];
        function filterByPageId(widget) {
            return parseInt(widget.pageId) === pageId;
        }
        results = widgets.filter(filterByPageId);
        return results;
    }

    function findWidgetById(widgetId) {
        for (wid in widgets) {
            var widget = widgets[wid];
            if (parseInt(widget._id) === widgetId) {
                return widget;
            }
        }
        return null;
    }

    function updateWidget(widgetId, widget) {
        var oldWidget = findWidgetById(widgetId);
        var index = widgets.indexOf(oldWidget);
        if (oldWidget.widgetType !== widget.widgetType) {
            return;
        }
        Object.keys(widget).forEach(function (property) {
            if (property === '_id' || property === 'widgetType' || property === 'pageId') {
                return;
            }
            if (oldWidget.hasOwnProperty(property)) {
                oldWidget[property] = widget[property];
            }
        });
    }

    function deleteWidget(widgetId) {
        var oldWidget = findWidgetById(widgetId);
        var index = widgets.indexOf(oldWidget);
        widgets.splice(index, 1);
    }

};