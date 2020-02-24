"use strict";

const express = require("express");
// Constants
const PORT = 8181;
const HOST = "0.0.0.0";

const fs = require("fs");
const db = require("./sqlite-config");
const bodyParser = require('body-parser');

// App
const app = express();

app.set("views", "views/");
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let FILE_NAME = "./file/judges.json";

// read file csv
app.get("/", (req, res) => {
  fs.readFile(FILE_NAME, (error, data) => {
    console.log("Async Read: starting...");
    if (error) {
      console.log("Async Read: NOT successful!");
      console.log(error);
    } else {
      try {
        const dataJson = JSON.parse(data);
        console.log("Async Read: successful!");
        //console.log(dataJson);
        res.render("viewcsv", { title: "Hello", data: dataJson });
      } catch (error) {
        console.log(error);
      }
    }
  });
});

// show database judges_list
app.get("/juri", (req, res) => {
  db.all("SELECT * FROM judges_list", (err, rows) => {
    res.render("judgesdata", { data: rows });
  });
});

// insert database judges_list
app.post("/insert", (req,res) =>{
  let { code, nama, instansi, telp, email } = req.body
  let query = `INSERT INTO judges_list (code, nama, instansi, telp, email) VALUES ('${code}','${nama}','${instansi}' ,${telp}, '${email}') `
  db.run(
      query,
      function(err,result){
          if(err){
              console.log(err)
              console.log(query)
          }else {
              console.log('It Works')
              res.redirect('/juri')
          }
      }
  )
});

app.get('/insertjudges/insert', function(req, res) {
    res.render("insertjudges")
});

// get by id 
app.get('/juri/:no', (req,res) => {
    let query = `SELECT * from judges_list where no = ?`;
    db.get(query, req.params.no, (err, row)  => {
      res.render("get_judges", { data: row });
  })
})


// update the data
app.post('/juri/:no/update', (req,res) => {
  let { code, nama, instansi, telp, email } = req.body
  let query = `UPDATE judges_list SET code = '${code}', nama = '${nama}', instansi ='${instansi}' , telp = ${telp}, email ='${email}' WHERE no = ? `
  db.run(query, req.params.no, 
    function(err,result){
    if(err){
        console.log(err)
    }else {
        console.log('Update success')
        res.redirect('/juri')
    }
  })
})

// delete
app.get("/delete/:no", (req, res) => {
    console.log(req.params.no);
    let query = `DELETE FROM judges_list WHERE no=?`;
    db.run(query,
    req.params.no,
    function(err,result){
      if(err){
        console.log(err)
      } else {
          console.log('delete success')
          res.redirect('/juri')
      }
    });
});

app.get("*", (req, res, next) => {
  res.status(200).send("Sorry, requested page not found.");
  next();
});

app.listen(PORT, HOST);
console.log(`Magic happen on http://${HOST}:${PORT}`);
