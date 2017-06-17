(function () {
    angular
        .module("WhiteBoardApp")
        .controller("courseEdit.controller",courseEditCtrl);
    
    function courseEditCtrl($routeParams) {
        console.log("load course edit controller!");

        var vm = this;

        //var course_index = $routeParams.index;
        var course_index = $routeParams['index'];
        var course_title = $routeParams['title'];
        var course_seats = $routeParams['seats'];

        vm.courseId = "Course: " + course_index;
        vm.courseTitle = "Course: " + course_title;

    }
})();