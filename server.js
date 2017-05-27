//using express with node js
var express = require('express');

//initialize app as an express application
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/'));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});