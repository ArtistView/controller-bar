import React from 'react';
import axios from 'axios';
import Right from './Right.jsx'
import Left from './Left.jsx'
import Center from './Center.jsx'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      album:["...loading"],
      songs:["...loading"],
      currentIndex:0,
      readyToPlay:new Audio(""),
      songTitle:"Hello World",
      albumTitle:"Hack Reactor",
      coverArt:"https://song-for-fake-spotify.s3-us-west-1.amazonaws.com/Obsidian.png",
      heart:"heart-button icon-heart",
      heartState:false,
      windowState:false,
      window:"window-icon control-button",
      shuffleState:false,
      shuffleWrapper:"control-button-wrapper",
      shuffleIcon:"control-button shuffle-icon",
      skipBackIcon:"control-button skip-back-icon",
      playState:false,
      pauseState:true,
      playIcon:"control-button play-icon play-button-circle",
      skipForwardIcon:"control-button skip-forward-icon",
      repeatState:false,
      repeatOnce: false,
      repeatIcon:"control-button repeat-icon",
      queueState:false,
      queueWrapper:"control-button-wrapper",
      queueIcon:"control-button queue-icon",
      deviceState:false,
      volumeState:false,
      volumeIcon:"control-button speaker-icon",
      volumeValue: 0,
      barMute:false,
      mute:false,
      mid:false,
      loud:true,
      volumeProgress:"linear-gradient(90deg, #1db954 0%, #b3b3b3 0%)",
      saveColor:"linear-gradient(90deg, #1db954 0%, #b3b3b3 0%)",
      playListEnded:false,
      songDuration:"0:00",
      songSecDuration:0,
      currentSongTime:"0:00",
      currentSongProgress:0,
      musicBarProgress:"linear-gradient(90deg, #1db954 0%, #b3b3b3 0%)",
      pause:false,
      repeatAlbumOnce:false,
    }
    //binds all control functions to app
    this.shuffle=this.shuffle.bind(this);
    this.play=this.play.bind(this);
    this.playNext=this.playNext.bind(this);
    this.playPrev=this.playPrev.bind(this);
    this.repeatAlbum=this.repeatAlbum.bind(this);
    this.repeatSong=this.repeatSong.bind(this);
    this.repeatAlbumOnce=this.repeatAlbumOnce.bind(this);
  }
  //compoundDidMount uses axios to make intial call to server
  componentDidMount(){
    //axios call server for album
    axios.get("http://localhost:4000/albums")
      .then((data)=>{
        this.setState({
          album:data.data[0],
          albumTitle:data.data[0].title,
          coverArt:data.data[0].imageUrl,
        })
        var songs=data.data[0].songs;
        var arr=[];
        //call server for each song in album
        for(var i =0; i<songs.length;i++){
          axios.get(`http://localhost:4000/songs/${songs[i]}`)
            .then((data)=>{
              arr.push(data.data)
              this.setState({
                songs:arr,
                songTitle:arr[0].title,
                readyToPlay:new Audio(arr[0].mp3),
                songDuration:arr[0].time,
                songSecDuration:arr[0].duration,
              })

            })
        }

      })

  }
  //repeatAlbumOnce function repeats the album continously once
  repeatAlbumOnce(){
    this.setState({
      repeatState:false,
      repeatOnce:false,
      repeatAlbumOnce:false,
      repeatWrapper:"control-button-wrapper",
      repeatIcon:"control-button repeat-icon",
    })
    this.play(0);
  }
  //repeatAlbum sets the album to be replayed by user once album endes
  repeatAlbum(){
    var index=0;
    var song=this.state.songs[index];
    var songUrl=song.mp3;
    var songToPlay=new Audio(songUrl);
    this.setState({
      playState:false,
      pauseState:true,
      playIcon:"control-button play-icon  play-button-circle",
      currentIndex:index,
      playListEnded:true,
      readyToPlay:songToPlay,
    })
  }
  //repeatSong will repeat the song once
  repeatSong(){
    this.setState({
      repeatState:false,
      repeatOnce:false,
      repeatAlbumOnce:false,
      repeatWrapper:"control-button-wrapper",
      repeatIcon:"control-button repeat-icon",
    })

    this.play(this.state.currentIndex);

  }
  //shuffle shuffles songs
  shuffle(){
    var random=Math.floor(Math.random() * Math.floor(this.state.songs.length));
    this.play(random);
  }
  //main play function. Recieves an index as parameter. Song at that index will be played.
  //if no state change next song will be played continously
  play(index){
    var nextSong=this.state.songs[index];
    //if index reaches end of album album will
    //either play over contiously
    //or be set to play over when user presses play-button
    if(nextSong===undefined && index===this.state.songs.length){
      if(this.state.repeatAlbumOnce===true){
        this.repeatAlbumOnce();
      }else{
        this.repeatAlbum();
      }
    }
    else
    {
      var nextTitle=nextSong.title;
      var nextUrl=nextSong.mp3;
      var nextTime=nextSong.time;
      var nextDuration=nextSong.duration;
      var nextPlay=new Audio(nextUrl);
      nextPlay.play();
      //eventListener listens for song time change
      //converts seconds to minute:second form
      nextPlay.addEventListener("timeupdate",(event)=>{
        var timeChange=nextPlay.currentTime;
          var fixed=timeChange.toFixed(1);
          if(timeChange>1){
            var renderTime="0:00";
            var cutTimeNum=timeChange.toFixed(1);
            var splitNum=cutTimeNum.split('.');
            var duration=Number(splitNum[0]);
            if(duration<10){
              renderTime="0:0"+duration;
            }
            if(duration >= 10 && duration < 60){
              renderTime="0:"+duration;
            }
            if(duration >=60){
              if(duration===60){
                renderTime="1:00";
              }
              else if((duration%60)===0)
              {
                  var min=(duration/60);
                  if(min<10){
                    renderTime=min+":00";
                  }else{
                    renderTime=min+":00";
                  }
              }
              else{
                var findMin=(duration/60);
                if(findMin<10){
                  var min=findMin.toString().split('.')[0]+":";
                  var secSplit=Number('0.'+findMin.toString().split('.')[1]);
                  if(secSplit.toString().length>3){
                    var sec=Math.round(Number('.'+secSplit.toString()[2]+secSplit.toString()[3])*60);
                  }else{
                    var sec=Math.round(Number('.'+secSplit.toString()[2])*60);
                  }
                  if(sec >= 10 && sec < 60){
                  var strSec="0"+sec;
                  renderTime=min+sec;
                  }
                  if(sec<10){
                    renderTime=min+"0"+sec;
                  }
                }
              }
            }
          }
          if(renderTime!=undefined){
            //fill is used as a percentage to set color of prgress bar
            var fill=(nextPlay.currentTime/nextPlay.duration)*100;
            //color is the css from of a linear-gradient
            var color="linear-gradient(90deg, #1db954 "+fill+"%, #b3b3b3 "+fill+"%)";
            this.setState({
              currentSongTime:renderTime,
              currentSongProgress:fill,
              musicBarProgress:color,
            })
        }
      })
      //eventLisent listens for end of song
      nextPlay.addEventListener("ended",(e)=>{
        //if song ends and repeat & shuffle are false next song is played
        if(this.state.repeatOnce===false && this.state.shuffleState===false){
          this.play(index+1);
        };
        //if song ends and repeat is true the song will be repated
        if(this.state.repeatOnce===true && this.state.shuffleState===false){
          nextPlay.pause();
          this.repeatSong();
        };
        //if song ends and shuffle is true next song will be random
        if(this.state.repeatOnce===false &&this.state.shuffleState===true){
          nextPlay.pause();
          this.shuffle();
        };
      })
      //state is set to reflect current song playing
      this.setState({
            songTitle:nextTitle,
            readyToPlay:nextPlay,
            currentIndex:index,
            songDuration:nextTime,
            playState:true,
            playIcon:"control-button pause-icon play-button-circle-active",
            pauseState:false,
            pause:true,
            readyToPlay:nextPlay,
          })
    }
  }
  //play next plays the next song when the next button is clicked
  //if at the end of album but will be disabled
  playNext(){
    if(this.state.currentIndex<this.state.songs.length-1){
      var songPlay=this.state.readyToPlay;
      songPlay.pause();
      this.setState({
        pause:true,
      });
      this.play(this.state.currentIndex+1);
    }
  }
  //playPrev playes the previous song
  //if album is at the beginning button is disabled
  playPrev(){
    if(this.state.currentIndex>0){
      var songPlay=this.state.readyToPlay;
      songPlay.pause();
      this.setState({
        pause:true,
      });
      this.play(this.state.currentIndex-1);
    }
  }
  //song range is a function used for song progress bar
  songRange(event){
    //an input HTML element is used
    //detects change and has a value of 0-100
    //valuse is sent in event
    var songPlay=this.state.readyToPlay;
    //value holds value of where user wants the song to be playing
    var value=event.target.value;
    //calls for total duration of song
    var duration=Math.round(songPlay.duration);
    //duration is divided by 100 to retrieve a proportion that will be mulplied by
    //the value of bar
    var proportion=duration/100;
    //new time is calculated
    var newTime=value*proportion;
    ///song is moved to the new time
    songPlay.currentTime=newTime;
    //state is set to refelect new value
    this.setState({
      currentSongProgress:value,
    })
  }
  //volumeRange is a function used for the volume bar
  volumeRange(event){
    var songPlay=this.state.readyToPlay;
    //green bar holds the value sent from the input HTML element
    var greenBar=event.target.value;
    //color holds the css code of new linea-gradient
    var color="linear-gradient(90deg, #1db954 "+greenBar+"%, #b3b3b3 "+greenBar+"%)";
    //if value is less than one song is muted
    if(greenBar<1){
      songPlay.muted=true;
      this.setState({
        volumeValue:event.target.value,
        currentVolume:event.target.value,
        volumeProgress:color,
        saveColor:color,
        volumeIcon:"control-button speaker-mute-icon",
        barMute:true,
        mute:true,
        mid:false,
        loud:false,
      })
    };
    //if song is between 1 & 50 song is unmuted
    //will display a speaker icon with one bar
    if(greenBar<=50 && greenBar>1){
      songPlay.muted=false;
      this.setState({
        volumeValue:event.target.value,
        currentVolume:event.target.value,
        volumeProgress:color,
        saveColor:color,
        volumeIcon:"control-button speaker-mid-icon",
        mute:false,
        mid:true,
        loud:false,
      })
    }
    //if value is greater than 50
    //song is unmuted
    //full speaker icon is diplayed
    if(greenBar>50){
      songPlay.muted=false;
      this.setState({
        volumeValue:event.target.value,
        currentVolume:event.target.value,
        volumeProgress:color,
        saveColor:color,
        volumeIcon:"control-button speaker-icon",
        mute: false,
        mid:false,
        loud:true,
      })
    }
  }
  //handleVolumeClick handles the click of the speaker icon
  //will to mute and unmute
  //will remember the volume level, before mute
  //will return to past volume level after unmuted
  handleVolumeClick(event){
    event.preventDefault();
    var setVol=this.state.currentVolume;
    var setColor=this.state.saveColor;
    var setIcon=this.state.volumeIcon;
    var songPlay=this.state.readyToPlay;
    
    //Catch in case states trip
    //Two state should never be true
    if(this.state.mute===this.state.mid || this.state.mid===this.state.loud || this.state.mute===this.state.loud){
      if(setVol<1){
        this.setState({
          volumeState:false,
          volumeIcon:"control-button speaker-mute-icon",
          mute:true,
          mid:false,
          loud:false,
        })
      }
      if(setVol>1 && setVol<=50){
        this.setState({
            volumeState:false,
            volumeIcon:"control-button speaker-mid-icon",
            mute:false,
            mid:true,
            loud:false,
          })
      }
      if(setVol>50){
        this.setState({
            volumeState:false,
            volumeIcon:"control-button speaker-icon",
            mute:false,
            mid:false,
            loud:true,
          })
      }
    }
    //mute volume state
    if(this.state.volumeState===false && this.state.mid===false && this.state.loud===false && this.state.mute===true && this.state.barMute===false){
      songPlay.muted=true;
      this.setState({
        volumeState:false,
        volumeIcon:"control-button speaker-icon",
        volumeValue:70,
        volumeProgress:"linear-gradient(90deg, #1db954 70%, #b3b3b3 70%)",
        mute:false,
        mid:false,
        loud:true,
      })
    }
    if(this.state.volumeState===true && this.state.mid===false && this.state.loud===false && this.state.mute===true){
      songPlay.muted=false;
      this.setState({
        volumeState:false,
        volumeIcon:"control-button speaker-icon",
        volumeValue:70,
        volumeProgress:"linear-gradient(90deg, #1db954 70%, #b3b3b3 70%)",
        mute:false,
        mid:false,
        loud:true,
      })
    }
    if(this.state.volumeState===false && this.state.mid===false && this.state.loud===false && this.state.mute===true && this.state.barMute===true){
      songPlay.muted=false;
      this.setState({
        volumeState:false,
        volumeIcon:"control-button speaker-icon",
        volumeValue:70,
        volumeProgress:"linear-gradient(90deg, #1db954 70%, #b3b3b3 70%)",
        barMute:false,
        mute:false,
        mid:false,
        loud:true,
      })
    }
    //mid-level volume state
    if(this.state.volumeState===false && this.state.mid===true && this.state.loud===false && this.state.mute===false){
      songPlay.muted=true;
      this.setState({
        volumeState:true,
        volumeIcon:"control-button speaker-mute-icon",
        volumeValue:0,
        volumeProgress:"linear-gradient(90deg, #1db954 0%, #b3b3b3 0%)",
      })
    }
    if(this.state.volumeState===true && this.state.mid===true && this.state.loud===false && this.state.mute===false){
      songPlay.muted=false;
      this.setState({
        volumeState:false,
        volumeIcon:"control-button speaker-mid-icon",
        volumeValue:setVol,
        volumeProgress:setColor,
      })
    }
    //loud-level volume state
    if(this.state.volumeState===false && this.state.loud===true && this.state.mid===false && this.state.mute===false){
      songPlay.muted=true;
      this.setState({
        volumeState:true,
        volumeIcon:"control-button speaker-mute-icon",
        volumeValue:0,
        volumeProgress:"linear-gradient(90deg, #1db954 0%, #b3b3b3 0%)",
      })
    }
    if(this.state.volumeState===true && this.state.loud===true && this.state.mid===false && this.state.mute===false){
      songPlay.muted=false;
      this.setState({
        volumeState:false,
        volumeIcon:"control-button speaker-icon",
        volumeValue:setVol,
        volumeProgress:setColor,
      })
    }

  }
  //handleDeviceClick displays how to connect to other devices component
  //componenet is eventless and has no functionality
  handleDeviceClick(event){
    event.preventDefault();
    if(this.state.deviceState===false){
      this.setState({
        deviceState:true,
      })
    }
    if(this.state.deviceState===true){
      this.setState({
        deviceState:false,
      })
    }

  }
  //handleQueueClick enables the queue icon but has no functionality
  handleQueueClick(event){
    event.preventDefault();
    if(this.state.queueState===false){
      this.setState({
        queueState:true,
        queueWrapper:"control-button-wrapper control-button--active-dot",
        queueIcon:"control-button queue-icon control-button--active",
      })
    }
    if(this.state.queueState===true){
      this.setState({
        queueState:false,
        queueWrapper:'control-button-wrapper',
        queueIcon:"control-button queue-icon",
      })
    }
  }
  //handleRepeatClick handles the click from user to set into repeat state
  //if clicked once album will be repeated automatically when album ends
  //if clicked two song will be repeated once song ends
  //if clicked a third time repeat is disabled
  handleRepeatClick(event){
    event.preventDefault();
    if(this.state.repeatState===false && this.state.repeatOnce===false && this.state.repeatAlbumOnce===false){
      this.setState({
        repeatState:true,
        repeatOnce:false,
        repeatAlbumOnce: true,
        repeatWrapper:"control-button-wrapper control-button--active-dot",
        repeatIcon:"control-button repeat-icon control-button--active",
      })
    }
    if(this.state.repeatState===true && this.state.repeatOnce===false && this.state.repeatAlbumOnce===true){
      this.setState({
        repeatState:true,
        repeatAlbumOnce:false,
        repeatOnce:true,
        repeatWrapper:"control-button-wrapper control-button--active-dot",
        repeatIcon:"control-button repeat-icon-twice control-button--active",
      })
    }
    if(this.state.repeatState===true && this.state.repeatOnce===true && this.state.repeatAlbumOnce===false){
      this.setState({
        repeatState:false,
        repeatOnce:false,
        repeatAlbumOnce:false,
        repeatWrapper:"control-button-wrapper",
        repeatIcon:"control-button repeat-icon",
      })
    }
  }
  //handleSkipForwardClick plays next song
  handleSkipForwardClick(event){
    event.preventDefault();
    this.playNext();
  }
  //handlePlayClick plays and puases song
  handlePlayClick(event){
    event.preventDefault();
    var songPlay=this.state.readyToPlay;
    //begining of program. User will press play and the first song will play
    if(this.state.playState===false && this.state.pauseState===true && this.state.playListEnded===false && this.state.pause===false){
      this.play(this.state.currentIndex);
    }
    //this play used for all other play clicks after the begining
    if(this.state.playState===false && this.state.pauseState===true && this.state.playListEnded===false && this.state.pause===true){
      songPlay.play();
      this.setState({
        playState:true,
        pauseState:false,
        playIcon:"control-button pause-icon play-button-circle",
        skipBackState:false,
        skipBackIcon:"control-button skip-back-icon",
        skipForwardState:false,
        skipForwardIcon:"control-button skip-forward-icon",
      })
    }
    //used to pause song
    if(this.state.playState===true && this.state.pauseState===false && this.state.playListEnded===false && this.state.pause===true){
      songPlay.pause();
      this.setState({
        playState:false,
        pauseState:true,
        playIcon:"control-button play-icon play-button-circle",
        skipBackState:false,
        skipBackIcon:"control-button skip-back-icon",
        skipForwardState:false,
        skipForwardIcon:"control-button skip-forward-icon",
      })
    }
    //once full album is played state is set to press play
    //when press play and playlist has ended
    //will play first song album
    if(this.state.playState===false && this.state.pauseState===true && this.state.playListEnded===true && this.state.pause===true){
      this.play(this.state.currentIndex);
      this.setState({
        playListEnded:false,
      })
    }
  }
  //handleSkipBackclick plays previous song
  handleSkipBackClick(event){
    event.preventDefault();
    this.playPrev();
  }
  //handlShuffleClick sets shuffle on first click
  //turns off on second click
  handleShuffleClick(event){
    event.preventDefault();
    var songPlay=this.state.readyToPlay;
    if(this.state.shuffleState===false){
      this.setState({
        shuffleState:true,
        shuffleWrapper:"control-button-wrapper control-button--active-dot",
        shuffleIcon:"control-button shuffle-icon control-button--active",
      })
    }
    if(this.state.shuffleState === true){
      this.setState({
        shuffleState:false,
        shuffleWrapper:"control-button-wrapper",
        shuffleIcon:"control-button shuffle-icon",
      })
    }
  }
  //handleWindowClick turns on window icon
  //has no functionality
  //second click turns off
  handleWindowClick(event){
    event.preventDefault();
    if(this.state.windowState===false){
      this.setState({
        window:"window-icon control-button control-button--active",
        windowState:true,
      })
    }
    if(this.state.windowState===true){
      this.setState({
        window:"window-icon control-button",
        windowState:false,
      })
    }
  }
  //handleHeartClick turns heart on
  //two clicks turns heart off
  //on functionality besides light up
  handleHeartClick(event){
    event.preventDefault();
    if(this.state.heartState===false){
    this.setState({
      heart:'heart-button-active icon-heart-active',
      heartState:true,
      })
    }
    if(this.state.heartState === true){
      this.setState({
        heart:'heart-button icon-heart',
        heartState: false,
      })
    }
  }
  render(){
    return (
      <div className= 'controller-components'>
        <Left currentState= {this.state} handleHeartClick={this.handleHeartClick.bind(this)} handleWindowClick={this.handleWindowClick.bind(this)}/>
        <Center currentState={this.state} handleShuffleClick={this.handleShuffleClick.bind(this)} handleSkipBackClick={this.handleSkipBackClick.bind(this)} handlePlayClick={this.handlePlayClick.bind(this)} handleSkipForwardClick={this.handleSkipForwardClick.bind(this)} handleRepeatClick={this.handleRepeatClick.bind(this)} songRange={this.songRange.bind(this)}/>
        <Right currentState={this.state} handleQueueClick={this.handleQueueClick.bind(this)} handleDeviceClick={this.handleDeviceClick.bind(this)} handleVolumeClick={this.handleVolumeClick.bind(this)} volumeRange={this.volumeRange.bind(this)}/>
      </div>
    )
  }
}
export default App