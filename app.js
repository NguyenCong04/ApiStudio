const express = require("express");
var app = express();
const port = 3000;
var logger = require('morgan');

const database = require('./config/db');
const apiJobMobile = require('./routes/apiJob');

app.use(express.json());
app.use(logger('dev'))

app.use('/apijob',apiJobMobile)
database.connect();


app.listen(port, () => {
  console.log("Example app listening on port " + port);
});

app.get('/',(rq,rs)=>{
    rs.send('WEB')
})
module.exports = app;