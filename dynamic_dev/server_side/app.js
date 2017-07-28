module.exports=function (app) {

    var courses = [
        {_id: 000, title: "Java 101", seats: 12, start: new Date()},
        {_id: 111, title: "Node.js 101", seats: 12, start: new Date()},
        {_id: 222, title: "C# 101", seats: 12, start: new Date()},
        {_id: 333, title: "ASP.NET 101", seats: 12, start: new Date()}
    ];


    app.get('/', function(req, res) {
        res.render('index');
    });

    // GET
    app.get('/api/courses', function (req, res) {
        res.render('index', {courses:courses});
    });
}

