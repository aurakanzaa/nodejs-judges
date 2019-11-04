'use strict'

const express = require('express')
// Constants
const PORT = 8080
const HOST = '0.0.0.0'

const fs = require('fs')
// App
const app = express()

app.set('views', 'views/')
app.set('view engine', 'pug')

let FILE_NAME = './file/judges.json'

app.get('/', (req, res) => {
    fs.readFile(FILE_NAME, (error, data) => {
        console.log('Async Read: starting...')
        if (error) {
            console.log('Async Read: NOT successful!')
            console.log(error)
        } else {
            try {
                const dataJson = JSON.parse(data)
                console.log('Async Read: successful!')
                console.log(dataJson)
                res.render('viewcsv', { title: 'Hello', data: dataJson })
            } catch (error) {
                console.log(error)
            }
        }
    })
})

app.get('*', (req, res, next) => {
    res.status(200).send('Sorry, requested page not found.')
    next()
})

app.listen(PORT, HOST)
console.log(`Magic happen on http://${HOST}:${PORT}`)