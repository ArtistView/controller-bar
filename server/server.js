const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');




app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('PORT',4000)
app.listen(app.get('PORT'),()=>{
  console.log("Listening on port: "+app.get('PORT'));
})