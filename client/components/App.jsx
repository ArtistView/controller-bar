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
      skipBackState: false,
      skipBackIcon: "control-button skip-back-icon",
      playState: false,
      pauseState:true,
      playIcon: "control-button play-icon play-button-circle",
      skipForwardState:false,
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
      volumeProgress:"linear-gradient(90deg, #1db954 0%, #b3b3b3 0%)",
      saveColor:"linear-gradient(90deg, #1db954 0%, #b3b3b3 0%)",
    }


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
              })

            })
        }

      })

  }

  volumeRange(event){

    var greenBar = event.target.value;
    var color = "linear-gradient(90deg, #1db954 "+greenBar+"%, #b3b3b3 "+greenBar+"%)";
    if(greenBar < 1){
      this.setState({
        volumeValue:event.target.value,
        currentVolume:event.target.value,
        volumeProgress: color,
        saveColor:color,
        volumeIcon: "control-button speaker-mute-icon",
        mute: true,
        mid:false,
        loud:false,
      })
    }

    if(greenBar <= 50 && greenBar > 1){
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
    if(this.state.volumeState === false && this.state.mid ===false && this.state.loud===false && this.state.mute===true){
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
    //mid-level volume state
    if(this.state.volumeState === false && this.state.mid ===true && this.state.loud===false && this.state.mute===false){
      this.setState({
        volumeState:true,
        volumeIcon:"control-button speaker-mute-icon",
        volumeValue: 0,
        volumeProgress:"linear-gradient(90deg, #1db954 0%, #b3b3b3 0%)",
      })
    }
    if(this.state.volumeState===true && this.state.mid===true && this.state.loud===false && this.state.mute===false){
      this.setState({
        volumeState:false,
        volumeIcon:"control-button speaker-mid-icon",
        volumeValue:setVol,
        volumeProgress:setColor,
      })
    }

    //loud-level volume state
    if(this.state.volumeState === false && this.state.loud ===true && this.state.mid===false && this.state.mute===false){
      this.setState({
        volumeState:true,
        volumeIcon:"control-button speaker-mute-icon",
        volumeValue: 0,
        volumeProgress:"linear-gradient(90deg, #1db954 0%, #b3b3b3 0%)",
      })
    }


    if(this.state.volumeState===true && this.state.loud===true && this.state.mid===false && this.state.mute===false){
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

    if(this.state.repeatState===false && this.state.repeatOnce===false){
      this.setState({
        repeatState:true,
        repeatOnce: true,
        repeatWrapper:"control-button-wrapper control-button--active-dot",
        repeatIcon:"control-button repeat-icon control-button--active",
      })
    }
    if(this.state.repeatState===true && this.state.repeatOnce ===true){
      this.setState({
        repeatState:false,
        repeatOnce: true,
        repeatWrapper:"control-button-wrapper control-button--active-dot",
        repeatIcon:"control-button repeat-icon-twice control-button--active",
      })
    }

    if(this.state.repeatState===false && this.state.repeatOnce===true){
      this.setState({
        repeatState:false,
        repeatOnce:false,
        repeatWrapper:"control-button-wrapper",
        repeatIcon:"control-button repeat-icon",
      })
    }
  }


  handleSkipForwardClick(event){
    event.preventDefault();
    var nextIndex = this.state.currentIndex + 1;
    var nextSong = this.state.songs[nextIndex];
    var nextSongDefined = true;

    if(nextSong===undefined && nextIndex=== this.state.songs.length){
      nextSongDefined=false;
      this.setState({
        skipForwardState:false,
        skipForwardIcon:"control-button skip-forward-icon",
        playState: true,
        pauseState:false,
        playIcon: "control-button pause-icon  play-button-circle",
        skipBackState:false,
        skipBackIcon:"control-button skip-back-icon",
        currentIndex:nextIndex-1,
      })
    }


    if(this.state.skipForwardState===false && this.state.playState===false && this.state.skipBackState===false && this.state.pauseState===true && nextSongDefined===true){
      var nextIndex = this.state.currentIndex + 1;
      var nextSong = this.state.songs[nextIndex];

      var nextTitle = nextSong.title;
      var nextUrl = nextSong.mp3;
      var songPlay = new Audio(nextUrl);
      songPlay.play();
      this.setState({
            songTitle:nextTitle,
            skipForwardState:true,
            skipForwardIcon:"control-button skip-forward-icon control-media-button-active",
            playState: true,
            pauseState:false,
            playIcon: "control-button pause-icon play-button-circle",
            skipBackState:false,
            skipBackIcon:"control-button skip-back-icon",
            readyToPlay:songPlay,
            currentIndex:nextIndex,
          })
    }

    if(this.state.skipForwardState===false && this.state.playState===true && this.state.skipBackState===false && this.state.pauseState===false && nextSongDefined===true)
    {
      var nextIndex = this.state.currentIndex + 1;
      var nextSong = this.state.songs[nextIndex];

      var playingSong = this.state.readyToPlay;
      playingSong.pause();
      var nextTitle = nextSong.title;
      var nextUrl = nextSong.mp3;
      var songPlay = new Audio(nextUrl);
      songPlay.play();
      this.setState({
            songTitle:nextTitle,
            skipForwardState:true,
            skipForwardIcon:"control-button skip-forward-icon control-media-button-active",
            playState: true,
            pauseState:false,
            playIcon: "control-button pause-icon play-button-circle",
            skipBackState:false,
            skipBackIcon:"control-button skip-back-icon",
            readyToPlay:songPlay,
            currentIndex:nextIndex,
          })
    }

    if(this.state.skipForwardState===true && this.state.playState===true && this.state.skipBackState===false && this.state.pauseState===false && nextSongDefined===true){

      var nextIndex = this.state.currentIndex + 1;
      var nextSong = this.state.songs[nextIndex];

      var playingSong = this.state.readyToPlay;
      playingSong.pause();

      var nextTitle = nextSong.title;
      var nextUrl = nextSong.mp3;
      var songPlay = new Audio(nextUrl);
      songPlay.play();
      this.setState({
            songTitle:nextTitle,
            skipForwardState:false,
            skipForwardIcon:"control-button skip-forward-icon control-media-button-active",
            playState: true,
            pauseState:false,
            playIcon: "control-button pause-icon play-button-circle",
            skipBackState:false,
            skipBackIcon:"control-button skip-back-icon",
            readyToPlay:songPlay,
            currentIndex:nextIndex,
          })

    }
    if(this.state.skipForwardState===false && this.state.playState===true && this.state.skipBackState===true && this.state.pauseState===false && nextSongDefined===true){

      var nextIndex = this.state.currentIndex + 1;
      var nextSong = this.state.songs[nextIndex];

      var playingSong = this.state.readyToPlay;
      playingSong.pause();

      var nextTitle = nextSong.title;
      var nextUrl = nextSong.mp3;
      var songPlay = new Audio(nextUrl);
      songPlay.play();
      this.setState({
            songTitle:nextTitle,
            skipForwardState:false,
            skipForwardIcon:"control-button skip-forward-icon control-media-button-active",
            playState: true,
            pauseState:false,
            playIcon: "control-button pause-icon play-button-circle",
            skipBackState:false,
            skipBackIcon:"control-button skip-back-icon",
            readyToPlay:songPlay,
            currentIndex:nextIndex,
          })

    }

  }



  handlePlayClick(event){
    event.preventDefault();


    var songPlay = this.state.readyToPlay;


    if(this.state.playState === false && this.state.pauseState === true && this.state.skipForwardState===false && this.state.skipBackState===false){
      songPlay.play();
      this.setState({
        playState:true,
        playIcon:"control-button pause-icon play-button-circle-active control-media-button-active",
        pauseState: false,
        skipBackState:false,
        skipBackIcon:"control-button skip-back-icon",
        skipForwardState:false,
        skipForwardIcon:"control-button skip-forward-icon",
      })

    }
    if(this.state.playState=== true && this.state.pauseState === false && this.state.skipBackState===false && this.state.skipForwardState===false){
      songPlay.pause();
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
    if(this.state.playState=== true && this.state.pauseState === false && this.state.skipBackState===false && this.state.skipForwardState===true){
      songPlay.pause();
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
    if(this.state.playState=== true && this.state.pauseState === false && this.state.skipBackState===true && this.state.skipForwardState===false){
      songPlay.pause();
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
  }

  handleSkipBackClick(event){
    event.preventDefault()
    console.log(this.state.playState+" "+this.state.pauseState+" "+this.state.skipBackState+' '+this.state.skipForwardState)
    var prevIndex = this.state.currentIndex - 1;
    var prevSong = this.state.songs[prevIndex];
    var prevSongDefined = true;

    if(prevSong===undefined && this.state.pauseState===true){
      console.log('works')
      prevSongDefined=false;
      this.setState({
        skipForwardState:false,
        skipForwardIcon:"control-button skip-forward-icon",
        playState: false,
        pauseState:true,
        playIcon: "control-button play-icon  play-button-circle",
        skipBackState:false,
        skipBackIcon:"control-button skip-back-icon",
        currentIndex:0,
      })
    }
    if(prevSong===undefined && this.state.playState===true){
      prevSongDefined=false;
      this.setState({
        skipForwardState:false,
        skipForwardIcon:"control-button skip-forward-icon",
        playState: true,
        pauseState:false,
        playIcon: "control-button pause-icon  play-button-circle",
        skipBackState:false,
        skipBackIcon:"control-button skip-back-icon",
        currentIndex:0,
      })
    }

    if(this.state.skipForwardState===false && this.state.playState===false && this.state.skipBackState===false && this.state.pauseState===true && prevSongDefined===true){
      var playingSong = this.state.readyToPlay;
      playingSong.pause();
      var prevTitle = prevSong.title;
      var prevUrl = prevSong.mp3;
      var songPlay = new Audio(prevUrl);
      songPlay.play();
      this.setState({
            songTitle:prevTitle,
            skipForwardState:false,
            skipForwardIcon:"control-button skip-forward-icon control-media-button-active",
            playState: true,
            pauseState:false,
            playIcon: "control-button pause-icon play-button-circle",
            skipBackState:true,
            skipBackIcon:"control-button skip-back-icon",
            readyToPlay:songPlay,
            currentIndex:prevIndex,
          })
    }

    if(this.state.skipForwardState===false && this.state.playState===true && this.state.skipBackState===false && this.state.pauseState===false && prevSongDefined===true)
    {
      var playingSong = this.state.readyToPlay;
      playingSong.pause();
      var prevTitle = prevSong.title;
      var prevUrl = prevSong.mp3;
      var songPlay = new Audio(prevUrl);
      songPlay.play();
      this.setState({
            songTitle:prevTitle,
            skipForwardState:false,
            skipForwardIcon:"control-button skip-forward-icon control-media-button-active",
            playState: true,
            pauseState:false,
            playIcon: "control-button pause-icon play-button-circle",
            skipBackState:true,
            skipBackIcon:"control-button skip-back-icon",
            readyToPlay:songPlay,
            currentIndex:prevIndex,
          })
    }

    if(this.state.skipForwardState===false && this.state.playState===true && this.state.skipBackState===true && this.state.pauseState===false && prevSongDefined===true){

      var playingSong = this.state.readyToPlay;
      playingSong.pause();
      var prevTitle = prevSong.title;
      var prevUrl = prevSong.mp3;
      var songPlay = new Audio(prevUrl);
      songPlay.play();
      this.setState({
            songTitle:prevTitle,
            skipForwardState:false,
            skipForwardIcon:"control-button skip-forward-icon control-media-button-active",
            playState: true,
            pauseState:false,
            playIcon: "control-button pause-icon play-button-circle",
            skipBackState:false,
            skipBackIcon:"control-button skip-back-icon",
            readyToPlay:songPlay,
            currentIndex:prevIndex,
          })

    }


    if(this.state.skipForwardState===true && this.state.playState===true && this.state.skipBackState===false && this.state.pauseState===false && prevSongDefined===true){

      var playingSong = this.state.readyToPlay;
      playingSong.pause();
      var prevTitle = prevSong.title;
      var prevUrl = prevSong.mp3;
      var songPlay = new Audio(prevUrl);
      songPlay.play();
      this.setState({
            songTitle:prevTitle,
            skipForwardState:false,
            skipForwardIcon:"control-button skip-forward-icon control-media-button-active",
            playState: true,
            pauseState:false,
            playIcon: "control-button pause-icon play-button-circle",
            skipBackState:false,
            skipBackIcon:"control-button skip-back-icon",
            readyToPlay:songPlay,
            currentIndex:prevIndex,
          })

    }

  }


  handleShuffleClick(event){
    event.preventDefault();

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
        <Center currentState={this.state} handleShuffleClick={this.handleShuffleClick.bind(this)} handleSkipBackClick= {this.handleSkipBackClick.bind(this)} handlePlayClick={this.handlePlayClick.bind(this)} handleSkipForwardClick={this.handleSkipForwardClick.bind(this)} handleRepeatClick={this.handleRepeatClick.bind(this)}/>
        <Right currentState={this.state} handleQueueClick={this.handleQueueClick.bind(this)} handleDeviceClick={this.handleDeviceClick.bind(this)} handleVolumeClick={this.handleVolumeClick.bind(this)} volumeRange={this.volumeRange.bind(this)}/>
      </div>
    )
  }
}

export default App