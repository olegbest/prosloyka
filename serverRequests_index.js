'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/route');

const app = express();

const port = 5012;

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ROUTES

let Routes = new routes(app);
Routes.setup();

app.listen(port, function() {
    console.log(`running: ${port}`)
})