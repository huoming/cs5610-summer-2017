(function () {
    angular
        .module("WebAppMaker")
        .controller("TestController", TestController);

    function TestController ($http, $q) {
        var vm = this;
        vm.widget = {_id: 123, widgetType: "HEADER", pageId: 321, size: 2, text: "GIZMODO"};
        vm.userId = "123";
        vm.websiteId = "456";
        vm.pageId = vm.widget.pageId;
    }

})();