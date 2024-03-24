const express = require("express");
var app = express();
const port = 3001;
var logger = require('morgan');
const mongoose = require('mongoose');

const RES = require('./Common/COMMON');
const uri = RES.uri;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




const database = require('./config/db');
const apiJobMobile = require('./routes/apiJob');
const apiServiceMobile = require('./routes/apiService');

app.use(express.json());
app.use(logger('dev'))

app.use('/apijob',apiJobMobile)
app.use('/apiservice',apiServiceMobile)
database.connect();


app.listen(port, () => {
  console.log("Example app listening on port " + port);
});

app.get('/',(rq,rs)=>{
    rs.send('WEB')
})

module.exports = app;