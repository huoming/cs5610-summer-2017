(function () {
    angular
        .module("WhiteBoardApp")
        .controller("courseList.controller",courseListCtrl);
    
    function courseListCtrl(CourseService) {
        var vm = this;
        
        vm.addCourse = addCourse;
        vm.removeCourse = removeCourse;
        vm.selectCourse = selectCourse;
        vm.updateCourse = updateCourse;

        vm.courses = CourseService.getAllCourses();

        function updateCourse(course)
        {
            var new_course = vm.courses[vm.selectedCourseIndex];
            CourseService.updateCourse(new_course, vm.selectedCourseIndex);
            vm.courses = CourseService.getAllCourses();
        }

        function selectCourse(index)
        {
            vm.selectedCourseIndex = index;
            /*vm.newCourse = {
                title: vm.courses[index].title,
                seats: vm.courses[index].seats,
                start: vm.courses[index].start
            };*/

            vm.newCourse = CourseService.getCourseByIndex(index);
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
                title: course.title,
                seats: course.seats,
                start: course.start
            };

            //vm.courses.push(newCourse);

            CourseService.addCourse(newCourse);
            vm.courses = CourseService.getAllCourses();
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