(function () {
    angular
        .module("WhiteBoardApp")
        .factory("CourseService", CourseService);

    function CourseService() {
        var courses = [
            {_id: 000, title: "Java 101", seats: 12, start: new Date()},
            {_id: 111, title: "Node.js 101", seats: 12, start: new Date()},
            {_id: 222, title: "C# 101", seats: 12, start: new Date()},
            {_id: 333, title: "ASP.NET 101", seats: 12, start: new Date()},
        ];

        var service = {
            addCourse: addCourse,
            getAllCourses: getAllCourses,
            getCourseById: getCourseById,
            deleteCourseByTitle: deleteCourseByTitle,
            updateCourse: updateCourse
        };
        return service;


        function deleteCoursesByIndex(index, num) {
            courses.splice(index, num);
        }
        function getCourseByIndex(index) {
            var selected_course = {title: "", seats: 0, start: new Date()};

            selected_course.title = courses[index].title;
            selected_course.seats = courses[index].seats;
            selected_course.start = courses[index].start;

            return selected_course;
        }

        function updateCourse(new_course, index) {

            courses[index].title = new_course.title;
            courses[index].seats = new_course.seats;
            courses[index].start = new_course.start;
        }

        function deleteCourseByTitle(courseTitle) {
            var index = 0;
            for(var c in courses) {
                if (c.title == courseTitle) {
                    courses.splice(index, 1);
                    break;
                }
                index += 1;
            }
        }

        function addCourse(newCourse) {
            courses.push(newCourse);
        }

        function getAllCourses() {
            return courses;
        }

        function getCourseById(course_id){
            for(var c in courses) {
                if (c._id == course_id) {
                    return c;
                }
            }

        }
    }
})();