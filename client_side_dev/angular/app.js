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
        .controller("myController",myCtrl);

    function myCtrl($scope) {
        $scope.hello="Hello World!";
        $scope.second_hello = "Hello World Second Timee!";
    }
})();
