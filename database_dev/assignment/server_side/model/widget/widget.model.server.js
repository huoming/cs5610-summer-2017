module.exports = function(mongoose, pageModel) {
    var widgetSchema = require('./widget.schema.server.js')(mongoose);
    var widgetModel = mongoose.model('Widget', widgetSchema);

    /*var api = {
        'createWidget': createWidget,
        'findAllWidgetsForPage': findAllWidgetsForPage,
        'findWidgetById': findWidgetById,
        'updateWidget': updateWidget,
        'deleteWidget': deleteWidget,
        'reorderWidget': reorderWidget
    };

    return api;*/
}