const mongoose = require('mongoose');
//connects to mongo db
// var dbUrl = process.env.DB || 'mongodb://localhost/fakeSpotify';
//'mongodb+srv://fake_spotify:C@cluster0-ck1u1.mongodb.net/FEC-FakeSpotify?retryWrites=true&w=majority'
mongoose.connect(process.env.DB,
{
  useNewUrlParser:true,
  useUnifiedTopology: true,
});
//if connected displays connect message
//if error on connection error msg displayed
const db= mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>{
  console.log("Database conncected");
})
//artist collection schema
const artistSchema = new mongoose.Schema({
  name: String,
  bio: String,
  relatedArtists: { type: Array, default: [] },
  imageUrl: String,
});
const Artist=mongoose.model('Artist', artistSchema);
//album collection schema
const albumSchema=new mongoose.Schema({
  title: String,
  artistId: String,
  songs: { type: Array, default: [] },
  featuredArtists: { type: Array, default: [] },
  type: String,
  imageUrl: String,
});
const Album = mongoose.model('Album',albumSchema);
//song collection schema
const songSchema=new mongoose.Schema({
  title: String,
  artistId: String,
  albumId: String,
  featuredArtists: { type: Array, default: [] },
  mp3: String,
  duration: Number, // in seconds
  listens: Number,
  explicit: Boolean,
});
const Song = mongoose.model('Song', songSchema);
module.exports={
  Artist: Artist,
  Album: Album,
  Song: Song,
};