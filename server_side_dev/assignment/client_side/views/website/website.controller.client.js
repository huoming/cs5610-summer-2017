(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        //vm.websites = WebsiteService.findWebsitesByUser(vm.uid);

        WebsiteService.findWebsitesByUser(vm.uid)
            .then(function (response) {
                console.log("service waiting!");

                var websites = response.data;
                if (websites.length > 0) {
                    vm.websites = websites;
                } else {
                    vm.websites = [];
                }
            },function (error) {
                console.log("Error msg: " + error);
            });
    }

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
    }

    function EditWebsiteController($routeParams, $location, $window, WebsiteService, PageService, $timeout) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        init();
        vm.editWebsite = editWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
           WebsiteService.findWebsiteById(vm.wid)
                .then(function (website) {
                    vm.currentWebsite = website;
                    vm.currentWebsiteName = vm.currentWebsite.name;
                    vm.currentWebsiteDesc = vm.currentWebsite.desc;
                }, function (error) {
                    console.log("Error msg: " + error);
                });
           WebsiteService.findWebsitesByUser(vm.uid)
                .then(function (response) {
                    console.log("service waiting!");

                    var websites = response.data;
                    if (websites.length > 0) {
                        vm.websites = websites;
                    } else {
                        vm.websites = [];
                    }
                },function (error) {
                    console.log("Error msg: " + error);
                });
        }

        function editWebsite() {
            if (vm.currentWebsiteName === null || vm.currentWebsiteName === undefined || vm.currentWebsiteName === "") {
                vm.errorText = "Website Name Cannot be Blank";
                $timeout(function () {
                    vm.errorText = null;
                }, 3500);
                return;
            }
            var web_info = {
                name: vm.currentWebsiteName,
                desc: vm.currentWebsiteDesc
            };

            WebsiteService.updateWebsite(vm.wid, web_info)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website");
                },function (error) {
                    console.log("Error msg: " + error);
                });
        }

        function deleteWebsite() {
            /*WebsiteService.deleteWebsite(vm.wid)
                .then(function() {
                    PageService.deletePagesByWebsite(vm.wid)
                        .then(function (response) {
                            $location.url("/user/" + vm.uid + "/website");
                        }, function (error) {
                            console.log("Error msg: " + error);
                        });
                },function (error) {
                    console.log("Error msg: " + error);
                });*/
        }
    }
})();