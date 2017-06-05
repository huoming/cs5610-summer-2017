/*
(function(){
    angular
        .module("WhiteBoardApp", [])
        .controller("myController",controllerFun);

    function controllerFun($scope)
    {
        $scope.hello = "Angular JS Hello World!";
    }
})();*/
(function () {
    angular
        .module("MyAppName", ["ngRoute"])
        .controller("myController", myController);

    function myController() {
        $scope.hello = "Angular JS Hello World!";
    }
})();
