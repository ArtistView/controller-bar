const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fakeSpotify',
{
  useNewUrlParser:true,
  useUnifiedTopology: true,
});

const db= mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>{
  console.log("Database conncected");
})

const artistSchema = new mongoose.Schema({
  name: String,
  bio: String,
  relatedArtists: { type: Array, default: [] },
  imageUrl: String,
});
const Artist = mongoose.model('Artist', artistSchema);

const albumSchema = new mongoose.Schema({
  title: String,
  artistId: String,
  songs: { type: Array, default: [] },
  featuredArtists: { type: Array, default: [] },
  type: String,
  imageUrl: String,
});
const Album = mongoose.model('Album', albumSchema);

const songSchema = new mongoose.Schema({
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

module.exports = {
  Artist: Artist,
  Album: Album,
  Song: Song,
};