(function () {
    angular
        .module("WhiteBoardApp")
        .controller("profile.controller",profileCtrl);
    
    function profileCtrl($scope) {
        /*var vm = this;*/
        $scope.msg = "Hello world!";
    }
})();
