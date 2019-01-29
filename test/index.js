'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 5013;

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// ROUTES

app.post('/', async function(req,res) {
    console.log("Работает")
    // res.send(200)
    res.send({type: 1, url: "http://localhost:5012/ss", data: {a: 123}})
})


app.listen(port, function() {
    console.log(`running: ${port}`)
})