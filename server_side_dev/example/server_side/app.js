module.exports = function(app){

    var courses = [
        {_id: 000, title: "Java 101", seats: 12, start: new Date()},
        {_id: 111, title: "Node.js 101", seats: 12, start: new Date()},
        {_id: 222, title: "C# 101", seats: 12, start: new Date()},
        {_id: 333, title: "ASP.NET 101", seats: 12, start: new Date()}
    ];

    // GET
    app.get('/api/courses', getAllCourses);
    app.get('/api/courses/:id', getCourseById);

    app.post('/api/courses/new', createCourse);

    function getAllCourses(req, res) {
        res.send(courses);
    }

    function getCourseById(req, res) {
        var selected_course = null;

        var course_id = req.params.id
        for (c in courses){
            var course = courses[c];
            if(parseInt(course._id) === parseInt(course_id)){
                selected_course = course;
                break;
            }
        }
        res.send(selected_course);
    }

    function createCourse(req, res) {
        /*var new_course = req.body;
        courses.push(new_course);*/
        res.sendStatus(200);
    }
};