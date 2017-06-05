(function () {
    angular
        .module("WhiteBoardApp")
        .controller("courseEdit.controller",courseEditCtrl);
    
    function courseEditCtrl($scope, $routeParams) {
        console.log("load course edit controller!");

        var course_index = $routeParams.index;

        $scope.courseId = "Course: " + course_index;
    }
})();