const express = require('express');
const router = express.Router();
const db = require('../database/db.js')

//calls database for album
router.get('/albums',(req,res)=>{
  db.Album.find()
    .then((albums)=>{
      res.json(albums)
    })
})
//calls database of indvidual songs
router.get('/songs/:songId',(req,res)=>{
  db.Song.findOne({_id: req.params.songId})
    .then((song)=>{
      res.json(song)
    })
})


module.exports =router;