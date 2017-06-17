(function () {
    angular
        .module("WhiteBoardApp")
        .factory("CourseService", CourseService);

    function CourseService($http, $q) {
        var courses = [
            {_id: 000, title: "Java 101", seats: 12, start: new Date()},
            {_id: 111, title: "Node.js 101", seats: 12, start: new Date()},
            {_id: 222, title: "C# 101", seats: 12, start: new Date()},
            {_id: 333, title: "ASP.NET 101", seats: 12, start: new Date()}
        ];

        var service = {
            addCourse: addCourse,
            getAllCourses: getAllCourses,
            getCourseById: getCourseById,
            deleteCourseByTitle: deleteCourseByTitle,
            updateCourse: updateCourse,
            getCoursesByIndex: getCoursesByIndex,
            getCourseById: getCourseById
        };
        return service;

        function getCourseById(course_id){
            var url = "/api/course/" + course_id;
            //return $http.get(url);

            var deferred = $q.defer();

            $http.get(url)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                   deferred.reject(error);
                });

            return deferred.promise;
        }

        function getAllCourses(){
            var url = "/api/courses";
            return $http.get(url);
            /*$http
                .get(url)
                .then(function (response) {
                    console.log(response);
                });

            return null;*/
        }

        function getCoursesByIndex (index) {

        }


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
            //courses.push(newCourse);
            return $http.post("/api/courses/new", newCourse);
        }

       /* function getAllCourses() {
            return courses;
        }*/

        function getCourseById(course_id){
            //return courses[course_id];
            return $http.get("/api/courses/"+course_id);
        }
    }
})();