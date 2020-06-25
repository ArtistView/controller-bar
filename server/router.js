const express = require('express');
const router = express.Router();
const db = require('../database/db.js')

router.get('/albums',(req,res)=>{
  console.log('hi')
  db.Album.find()
    .then((albums)=>{
      res.json(albums)
    })
})
router.get('/songs/:songId',(req,res)=>{
  //**change to theis --- req.params.songId
  db.Song.findOne({_id: req.params.songId})
    .then((song)=>{
      res.json(song)
    })
})


module.exports =router;