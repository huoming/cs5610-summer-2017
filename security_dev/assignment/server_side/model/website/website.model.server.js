module.exports = function(mongoose, userModel) {
    var websiteSchema = require('./website.schema.server.js')(mongoose);
    var websiteModel = mongoose.model('Website', websiteSchema);

   /* var api = {
        'createWebsiteForUser': createWebsiteForUser,
        'findAllWebsitesForUser': findAllWebsitesForUser,
        'findWebsiteById': findWebsiteById,
        'updateWebsite': updateWebsite,
        'removePageFromWebsite': removePageFromWebsite,
        'deleteWebsite': deleteWebsite
    };

    return api;*/
}