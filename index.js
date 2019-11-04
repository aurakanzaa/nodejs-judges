"use strict";

const express = require("express");
// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

const fs = require("fs");
const db = require("./sqlite-config");
// App
const app = express();

app.set("views", "views/");
app.set("view engine", "pug");

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
        console.log(dataJson);
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
    const {code, nama, instansi, telp, email} = req.body
    con.query(
        `INSERT INTO judges_list SET code='${code}', nama=${nama}, instansi=${instansi}, telp=${telp}, email=${email}`,
        function(err,result){
            res.redirect("/insert")
        }
    )
});

app.get('/insertjudges/insert', function(req, res) {
    res.render("insertjudges")
  });

app.get("*", (req, res, next) => {
  res.status(200).send("Sorry, requested page not found.");
  next();
});

app.listen(PORT, HOST);
console.log(`Magic happen on http://${HOST}:${PORT}`);
