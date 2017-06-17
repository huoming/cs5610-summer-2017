(function () {
    angular
        .module("WhiteBoardApp")
        .controller("courseEdit.controller",courseEditCtrl);
    
    function courseEditCtrl($routeParams, CourseService) {
        console.log("load course edit controller!");

        var vm = this;

        //var course_index = $routeParams.index;
        /*var course_index = $routeParams['index'];
        var course_title = $routeParams['title'];
        var course_seats = $routeParams['seats'];*/

       /* vm.courseId = "Course: " + course_index;
        vm.courseTitle = "Course: " + course_title;*/
        init();

        function init() {
            CourseService
                .getCourseById($routeParams.id)
                .then(function (response) {
                    if (response != null){
                        var course = response.data;

                        vm.courseId = "Course: " + course._id;
                        vm.courseTitle = "Course: " + course.title;
                    }
                    else
                    {
                        console.log("no course found!");
                    }
                }, function (error) {
                    console.log("error: " + error);
                });
        }

    }
})();