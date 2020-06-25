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

const db = require('../database/db.js');
app.use('/',router);

app.set('PORT',4000)
app.listen(app.get('PORT'),()=>{
  console.log("Listening on port: "+app.get('PORT'));
})