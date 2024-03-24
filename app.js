const express = require("express");
var app = express();
const port = 3000;
var logger = require('morgan');

const database = require('./config/db');
const apiJobMobile = require('./routes/apiJob');

const apiUserMobile = require('./routes/apiUser');

app.use(express.json());
app.use(logger('dev'))

app.use('/apijob',apiJobMobile)

app.use('/apiUser', apiUserMobile);
database.connect();


app.listen(port, () => {
  console.log("Example app listening on port " + port);
});

app.get('/',(rq,rs)=>{
    rs.send('WEB')
})



app.use(express.json());
app.use('/api', apiJobMobile);
module.exports = app;