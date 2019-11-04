"use strict";

const express = require("express");
// Constants
const PORT = 8080;
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

// update
app.post('/update', (req, res) => {
    console.log(req.body.no);
    let sql = "UPDATE judges_list SET code='"+req.body.code+"', nama='"+req.body.nama+"', instansi='"+req.body.instansi+"', telp='"+req.body.telp+"', email='"+req.body.email+"' WHERE no="+req.body.no;
    db.run(sql,
    req.body.no,
    (err)=>{
        if(err)
            res.send(err);
        else
            res.redirect("/juri");
    });
});

// delete
app.post("/delete", (req, res) => {
    console.log(req.body.no);
    let sql = "DELETE FROM judges_list WHERE no=?";
    db.run(sql,
    req.body.no,
    (err) =>{
        if(err)
            res.send(err);
        else
            res.redirect("/juri");
    });
});

app.get("*", (req, res, next) => {
  res.status(200).send("Sorry, requested page not found.");
  next();
});

app.listen(PORT, HOST);
console.log(`Magic happen on http://${HOST}:${PORT}`);
