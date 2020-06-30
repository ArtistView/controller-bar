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
      readyToPlay: new Audio(''),
      songTitle:"Hello World",
      albumTitle: "Hack Reactor",
      coverArt:"https://song-for-fake-spotify.s3-us-west-1.amazonaws.com/Obsidian.png",
      heart: "heart-button icon-heart",
      heartState: false,
      windowState:false,
      window:"window-icon control-button",
      shuffleState: false,
      shuffleWrapper:"control-button-wrapper",
      shuffleIcon: "control-button shuffle-icon",
      skipBackIcon: "control-button skip-back-icon",
      playState: false,
      pauseState:true,
      playIcon: "control-button play-icon play-button-circle",
      skipForwardIcon: "control-button skip-forward-icon",
      repeatState:false,
      repeatOnce: false,
      repeatIcon:"control-button repeat-icon",
      queueState:false,
      queueWrapper:'control-button-wrapper',
      queueIcon:"control-button queue-icon",
      deviceState:false,
      volumeState:false,
      volumeIcon:"control-button speaker-icon",
      volumeValue: 0,
      barMute:false,
      mute: false,
      mid:false,
      loud:true,
      volumeProgress:"linear-gradient(90deg, #1db954 0%, #b3b3b3 0%)",
      saveColor:"linear-gradient(90deg, #1db954 0%, #b3b3b3 0%)",
      playListEnded:false,
      songDuration:'0:00',
      songSecDuration:0,
      currentSongTime: '0:00',
      currentSongProgress:0,
      musicBarProgress:"linear-gradient(90deg, #1db954 0%, #b3b3b3 0%)",
      pause:false,
      repeatAlbumOnce:false,
    }

    this.shuffle= this.shuffle.bind(this);
    this.play = this.play.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrev = this.playPrev.bind(this);
    this.repeatAlbum = this.repeatAlbum.bind(this);
    this.repeatSong = this.repeatSong.bind(this);
    this.repeatAlbumOnce= this.repeatAlbumOnce.bind(this);
  }

  componentDidMount(){

    axios.get('http://localhost:4000/albums')
      .then((data)=>{
        this.setState({
          album: data.data[0],
          albumTitle: data.data[0].title,
          coverArt: data.data[0].imageUrl,
        })
        var songs = data.data[0].songs
        var arr = [];
        for(var i =0; i<songs.length;i++){
          axios.get(`http://localhost:4000/songs/${songs[i]}`)
            .then((data)=>{
              arr.push(data.data)
              this.setState({
                songs:arr,
                songTitle: arr[0].title,
                readyToPlay: new Audio(arr[0].mp3),
                songDuration: arr[0].time,
                songSecDuration: arr[0].duration,
                songOnDeck: arr[0],
              })

            })
        }

      })

  }
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
  repeatAlbum(){
    var index = 0;
    var song = this.state.songs[index];
    var songUrl = song.mp3;
    var songToPlay = new Audio(songUrl);
    this.setState({
      playState: false,
      pauseState:true,
      playIcon: "control-button play-icon  play-button-circle",
      currentIndex:index,
      playListEnded: true,
      readyToPlay:songToPlay,
    })
  }
  repeatSong(){
    this.setState({
      repeatState:false,
      repeatOnce:false,
      repeatAlbumOnce:false,
      repeatWrapper:"control-button-wrapper",
      repeatIcon:"control-button repeat-icon",
    })

    this.play(this.state.currentIndex)


  }

  shuffle(){
    var random =Math.floor(Math.random() * Math.floor(this.state.songs.length))
    this.play(random);
  }
  play(index){
    var nextSong = this.state.songs[index];
    if(nextSong===undefined && index === this.state.songs.length){
      if(this.state.repeatAlbumOnce===true){
        this.repeatAlbumOnce();
      }else{
        this.repeatAlbum();
      }
    }
    else
    {
      var nextTitle = nextSong.title;
      var nextUrl = nextSong.mp3;
      var nextTime = nextSong.time;
      var nextDuration= nextSong.duration
      var nextPlay = new Audio(nextUrl);
      nextPlay.play();
      nextPlay.addEventListener('timeupdate',(event)=>{
        var timeChange = nextPlay.currentTime
          var fixed = timeChange.toFixed(1)
          if(timeChange > 1){
            var renderTime ="0:00"
            var cutTimeNum= timeChange.toFixed(1)
            var splitNum = cutTimeNum.split('.');
            var duration = Number(splitNum[0]);
            if(duration<10){
              renderTime= "0:0"+duration
            }
            if(duration >= 10 && duration < 60){
              renderTime="0:"+duration
            }
            if(duration >=60){
              if(duration===60){
                renderTime="1:00"
              }
              else if((duration%60)===0)
              {
                  var min = (duration/60)
                  if(min<10){
                    renderTime= min+":00"
                  }else{
                    renderTime= min+":00"
                  }
              }
              else{
                var findMin = (duration/60)

                if(findMin<10){
                  var min= findMin.toString().split('.')[0]+":";
                  var secSplit = Number('0.'+findMin.toString().split('.')[1])
                  if(secSplit.toString().length > 3){
                    var sec = Math.round(Number('.'+secSplit.toString()[2]+secSplit.toString()[3])*60);

                  }else{
                    var sec = Math.round(Number('.'+secSplit.toString()[2])*60)
                  }

                  if(sec >= 10 && sec < 60){
                  var strSec ="0"+sec;
                  renderTime= min+sec;
                  }
                  if(sec<10){
                    renderTime=min+"0"+sec;
                  }

                }

              }

            }
          }
          if(renderTime!=undefined){
            var fill =  (nextPlay.currentTime/nextPlay.duration)*100;
            var color = "linear-gradient(90deg, #1db954 "+fill+"%, #b3b3b3 "+fill+"%)";
            this.setState({
              currentSongTime:renderTime,
              currentSongProgress:fill,
              musicBarProgress:color,
            })
        }

      })
      nextPlay.addEventListener('ended',(e)=>{
        if(this.state.repeatOnce===false && this.state.shuffleState===false){
          this.play(index+1)
        }
        if(this.state.repeatOnce===true && this.state.shuffleState===false){
          console.log('caught')
          nextPlay.pause()
          this.repeatSong();
        }
        if(this.state.repeatOnce===false &&this.state.shuffleState===true){
          console.log('random')
          nextPlay.pause()
          this.shuffle();
        }
      })
      this.setState({
            songTitle:nextTitle,
            readyToPlay:nextPlay,
            currentIndex:index,
            songDuration:nextTime,
            playState:true,
            playIcon:"control-button pause-icon play-button-circle-active",
            pauseState: false,
            pause:true,
            readyToPlay:nextPlay,
          })
    }

  }
  playNext(){
    if(this.state.currentIndex<this.state.songs.length-1){
      var songPlay = this.state.readyToPlay
      songPlay.pause();

      this.setState({
        pause:true,
      })
      this.play(this.state.currentIndex+1)
    }

  }
  playPrev(){
    if(this.state.currentIndex>0){
    var songPlay = this.state.readyToPlay
    songPlay.pause();

    this.setState({
      pause:true,
    })
    this.play(this.state.currentIndex-1)
    }
  }

  songRange(event){
    var songPlay = this.state.readyToPlay;
    var value = event.target.value;

    var duration = Math.round(songPlay.duration);

    var proportion = duration/100;

    var newTime = value*proportion;


    songPlay.currentTime= newTime;


    this.setState({
      currentSongProgress:value,
    })
  }
  volumeRange(event){

    var songPlay = this.state.readyToPlay;
    var greenBar = event.target.value;
    var color = "linear-gradient(90deg, #1db954 "+greenBar+"%, #b3b3b3 "+greenBar+"%)";
    if(greenBar < 1){
      songPlay.muted=true;
      this.setState({
        volumeValue:event.target.value,
        currentVolume:event.target.value,
        volumeProgress: color,
        saveColor:color,
        volumeIcon: "control-button speaker-mute-icon",
        barMute:true,
        mute: true,
        mid:false,
        loud:false,
      })
    }

    if(greenBar <= 50 && greenBar > 1){
      songPlay.muted = false;
      this.setState({
        volumeValue:event.target.value,
        currentVolume:event.target.value,
        volumeProgress: color,
        saveColor:color,
        volumeIcon: "control-button speaker-mid-icon",
        mute: false,
        mid:true,
        loud:false,
      })
    }

    if(greenBar>50){
      songPlay.muted = false;
      this.setState({
        volumeValue:event.target.value,
        currentVolume:event.target.value,
        volumeProgress: color,
        saveColor:color,
        volumeIcon: "control-button speaker-icon",
        mute: false,
        mid:false,
        loud:true,
      })
    }

  }

  handleVolumeClick(event){

    event.preventDefault();
    var setVol= this.state.currentVolume;
    var setColor = this.state.saveColor;
    var setIcon = this.state.volumeIcon;
    var songPlay = this.state.readyToPlay;

    //Catch in case states trip
    if(this.state.mute ===this.state.mid || this.state.mid ===this.state.loud || this.state.mute ===this.state.loud){
      if(setVol < 1){
        this.setState({
          volumeState:false,
          volumeIcon: "control-button speaker-mute-icon",
          mute: true,
          mid:false,
          loud:false,
        })
      }
      if(setVol>1 && setVol<=50){
        this.setState({
            volumeState:false,
            volumeIcon: "control-button speaker-mid-icon",
            mute: false,
            mid:true,
            loud:false,
          })
      }
      if(setVol>50){
        this.setState({
            volumeState:false,
            volumeIcon: "control-button speaker-icon",
            mute: false,
            mid:false,
            loud:true,
          })
      }
    }

    //mute volume state
    if(this.state.volumeState === false && this.state.mid ===false && this.state.loud===false && this.state.mute===true && this.state.barMute===false){
      songPlay.muted= true;
      this.setState({
        volumeState:false,
        volumeIcon:"control-button speaker-icon",
        volumeValue: 70,
        volumeProgress:"linear-gradient(90deg, #1db954 70%, #b3b3b3 70%)",
        mute: false,
        mid:false,
        loud:true,
      })
    }
    if(this.state.volumeState === true && this.state.mid ===false && this.state.loud===false && this.state.mute===true){
      songPlay.muted = false;
      this.setState({
        volumeState:false,
        volumeIcon:"control-button speaker-icon",
        volumeValue: 70,
        volumeProgress:"linear-gradient(90deg, #1db954 70%, #b3b3b3 70%)",
        mute: false,
        mid:false,
        loud:true,
      })
    }

    if(this.state.volumeState === false && this.state.mid ===false && this.state.loud===false && this.state.mute===true && this.state.barMute ===true){
      songPlay.muted= false;
      this.setState({
        volumeState:false,
        volumeIcon:"control-button speaker-icon",
        volumeValue: 70,
        volumeProgress:"linear-gradient(90deg, #1db954 70%, #b3b3b3 70%)",
        barMute:false,
        mute: false,
        mid:false,
        loud:true,
      })
    }
    //mid-level volume state
    if(this.state.volumeState === false && this.state.mid ===true && this.state.loud===false && this.state.mute===false){
      songPlay.muted=true;
      this.setState({
        volumeState:true,
        volumeIcon:"control-button speaker-mute-icon",
        volumeValue: 0,
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
    if(this.state.volumeState === false && this.state.loud ===true && this.state.mid===false && this.state.mute===false){
      songPlay.muted=true;
      this.setState({
        volumeState:true,
        volumeIcon:"control-button speaker-mute-icon",
        volumeValue: 0,
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

  handleQueueClick(event){
    event.preventDefault()
    if(this.state.queueState===false){
      this.setState({
        queueState: true,
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

  handleRepeatClick(event){
    event.preventDefault();

    if(this.state.repeatState===false && this.state.repeatOnce===false && this.state.repeatAlbumOnce===false){
      this.setState({
        repeatState:true,
        repeatOnce: false,
        repeatAlbumOnce: true,
        repeatWrapper:"control-button-wrapper control-button--active-dot",
        repeatIcon:"control-button repeat-icon control-button--active",
      })
    }
    if(this.state.repeatState===true && this.state.repeatOnce ===false && this.state.repeatAlbumOnce===true){
      this.setState({
        repeatState:true,
        repeatAlbumOnce:false,
        repeatOnce: true,
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

  handleSkipForwardClick(event){
    event.preventDefault();
    this.playNext();
  }

  handlePlayClick(event){
    event.preventDefault();
    var songPlay = this.state.readyToPlay;
    if(this.state.playState === false && this.state.pauseState === true && this.state.playListEnded===false && this.state.pause === false){
      this.play(this.state.currentIndex)

    }
    if(this.state.playState === false && this.state.pauseState === true && this.state.playListEnded===false && this.state.pause === true){
      songPlay.play()
      this.setState({
        playState: true,
        pauseState: false,
        playIcon: "control-button pause-icon play-button-circle",
        skipBackState:false,
        skipBackIcon:"control-button skip-back-icon",
        skipForwardState:false,
        skipForwardIcon:"control-button skip-forward-icon",
      })
    }
    if(this.state.playState === true && this.state.pauseState === false && this.state.playListEnded===false && this.state.pause === true){
      songPlay.pause()
      this.setState({
        playState: false,
        pauseState: true,
        playIcon: "control-button play-icon play-button-circle",
        skipBackState:false,
        skipBackIcon:"control-button skip-back-icon",
        skipForwardState:false,
        skipForwardIcon:"control-button skip-forward-icon",
      })
    }

    if(this.state.playState === false && this.state.pauseState === true && this.state.playListEnded===true&& this.state.pause === true){

      this.play(this.state.currentIndex)
      this.setState({
        playListEnded:false,
      })


    }

  }
  handleSkipBackClick(event){
    event.preventDefault()
    this.playPrev();
  }

  handleShuffleClick(event){
    event.preventDefault();
    var songPlay = this.state.readyToPlay;

    if(this.state.shuffleState === false){
      this.setState({
        shuffleState:true,
        shuffleWrapper: "control-button-wrapper control-button--active-dot",
        shuffleIcon:"control-button shuffle-icon control-button--active",
      })
    }
    if(this.state.shuffleState === true){
      this.setState({
        shuffleState:false,
        shuffleWrapper: "control-button-wrapper",
        shuffleIcon:"control-button shuffle-icon",
      })
    }

  }

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

  handleHeartClick(event){

    event.preventDefault();

    if(this.state.heartState === false){
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
        <Center currentState={this.state} handleShuffleClick={this.handleShuffleClick.bind(this)} handleSkipBackClick= {this.handleSkipBackClick.bind(this)} handlePlayClick={this.handlePlayClick.bind(this)} handleSkipForwardClick={this.handleSkipForwardClick.bind(this)} handleRepeatClick={this.handleRepeatClick.bind(this)} songRange={this.songRange.bind(this)}/>
        <Right currentState={this.state} handleQueueClick={this.handleQueueClick.bind(this)} handleDeviceClick={this.handleDeviceClick.bind(this)} handleVolumeClick={this.handleVolumeClick.bind(this)} volumeRange={this.volumeRange.bind(this)}/>
      </div>
    )
  }
}

export default App