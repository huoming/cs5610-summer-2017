(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http){
        var services = {
            'createPage' : createPage,
            'findPageByWebsiteId' : findPageByWebsiteId,
            'findPageById' : findPageById,
            'updatePage' : updatePage,
            'deletePage' : deletePage,
            'deletePagesByWebsite' : deletePagesByWebsite
        };
        return services;

        function createPage(websiteId, page){
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);
        }

        function findPageById(pageId){
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        function updatePage(pageId, page){
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }

        function deletePagesByWebsite(websiteId){
            var url = "/api/website/" + websiteId + "/page";
            return $http.delete(url);
        }
    }
})();