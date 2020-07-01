const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router.js')


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(__dirname+'/../public'))

//database called
const db = require('../database/db.js');
//router set
app.use('/',router);
//port set to list on 4000
app.set('PORT',4000)
//app set to listen on port 4000
//displays message if connected
app.listen(app.get('PORT'),()=>{
  console.log("Listening on port: "+app.get('PORT'));
})