(function(){
    angular
        .module("WhiteBoardApp", [])
        .controller("myController", myController);

    function myController($scope)
    {
        $scope.hello = "some value";
    }
})();