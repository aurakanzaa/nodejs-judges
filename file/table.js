// include file system module
var fs = require('fs');
// read file sample.json file
fs.readFile('judges.json',
    // callback function that is called when reading file is done
    function(err, data) { 
        // json data
        var jsonData = data;
 
        // parse json
        var jsonParsed = JSON.parse(jsonData);
 
        // access elements
        console.log(jsonParsed.judges[0].email);
        // console.log(jsonParsed.nama + " is from " + jsonParsed.email[0]);
});