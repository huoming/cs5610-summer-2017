(function () {
    angular
        .module("WhiteBoardApp")
        .controller("courseList.controller",courseListCtrl);
    
    function courseListCtrl(CourseService) {
        var vm = this;
        init();

        vm.addCourse = addCourse;
        vm.removeCourse = removeCourse;
        vm.selectCourse = selectCourse;
        vm.updateCourse = updateCourse;

        //vm.courses = CourseService.getAllCourses();

       /* CourseService.getAllCourses()
            .success(function (response) {
                vm.courses = response;
            });
*/


       function init() {
           /*var p = CourseService.getAllCourses();
           p
               .then(function (response) {
                   console.log("success");
                   vm.courses = response.data;
               }, function (error) {
                   console.log("error msg: " + error);
               });*/
           CourseService.getAllCourses()
               .then(function (response) {
                   vm.courses = response.data;
                   }
               );
       }

        function updateCourse(course)
        {
           /* var new_course = vm.courses[vm.selectedCourseIndex];
            CourseService.updateCourse(new_course, vm.selectedCourseIndex);
            vm.courses = CourseService.getAllCourses();*/
        }

        function selectCourse(course)//(index)
        {
            console.log("select a course");
            //vm.selectedCourseIndex = index;
            /*vm.newCourse = {
                title: vm.courses[index].title,
                seats: vm.courses[index].seats,
                start: vm.courses[index].start
            };*/

            //vm.newCourse = CourseService.getCourseByIndex(index);
            vm.newCourse = course;
        }

        function removeCourse(course)
        {
            var index = vm.courses.indexOf(course);
            vm.courses.splice(index, 1);
        }

        function addCourse(course)
        {
            console.log("add course: " + course.title);
            var newCourse = {
                _id: new Date().getTime(),
                title: course.title,
                seats: course.seats,
                start: course.start
            };

            CourseService.addCourse(newCourse)
                .then(function (response) {
                    console.log(response);
                }, function (error) {
                    console.log(error);
                });

            //vm.courses.push(newCourse);

            /*CourseService.addCourse(newCourse);
            vm.courses = CourseService.getAllCourses();*/
        }

        /*vm.hello = "Hello from CoursesController";

        var java101 = {
            title: "Java 101",
            seats: 25,
            start: new Date(2015,9,4)
        };

        vm.javaCourse = java101;

        var courses = [
            java101,
            {title: "MEAN", seats: 35, start: new Date()},
            {title: "C#", seats: 45, start: new Date(2016, 1, 15)}
        ];

        vm.courses = courses;*/
    }
})();