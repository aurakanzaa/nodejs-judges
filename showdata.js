'use strict'

const express = require('express')
// Constants
const PORT = 8080
const HOST = '0.0.0.0'

const fs = require('fs')
// App
const app = express()
const db = require("./sqlite-config");

app.set('views', 'views/')
app.set('view engine', 'pug')

let FILE_NAME = './db/judges_list.db'

// app.get('/datajuri', (req, res) => {
//     let sql="SELECT * FROM judges_list";
//     db.all(sql,(err,rows) =>{
//         console.log(rows);
//         const dataDb = JSON.parse(rows)
//         try {
//             const dataDb = JSON.parse(rows)
//             console.log('Async Read: successful!')
//             console.log(dataDb)
            
//             res.send(alldata);
//             // res.render('viewcsv', { title: 'Hello', data: dataJson })
//         } catch (error) {
//             console.log(error)
//         }
//     });
// });

app.get('/juri', (req, res) => {
    db.serialize(function(){
        db.all('SELECT * FROM judges_list', (err,rows) => {
            console.log(rows)
        });
    });
});


app.get('*', (req, res, next) => {
    res.status(200).send('Sorry, requested page not found.')
    next()
});

app.listen(PORT, HOST);
console.log(`Magic happen on http://${HOST}:${PORT}`);
