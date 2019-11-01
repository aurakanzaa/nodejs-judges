'use strict';

const express = require('express');
const judges = require('./file/judges.json');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

var fs = require('fs');
// App
const app = express();
var router=express.Router();
app.set('views', 'views/');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  var json= require('./file/judges.json');
  res.render('viewcsv', { title: 'Hello', message: 'halo ara'})
});

/* GET Userlist page. */
router.get('/userlist', function (req, res) {
  var json = judges;
  res.render('viewcsv', { viewcsv : json });

});

// read file sample.json file
fs.readFile('./file/judges.json',
    // callback function that is called when reading file is done
    function(err, data) { 
        // json data
        var jsonData = data;
 
        // parse json
        var jsonParsed = JSON.parse(jsonData);
 
        // access elements
        // console.log(jsonParsed.persons[0].name + "'s office phone number is " + jsonParsed.persons[0].phone.office);
        // console.log(jsonParsed.persons[1].name + " is from " + jsonParsed.persons[0].city);
});

app.get('*', (req, res, next) => {
	res.status(200).send('Sorry, requested page not found.');
	next();
});

module.exports = router;
app.listen(PORT, HOST);
console.log(`Magic happen on http://${HOST}:${PORT}`);
